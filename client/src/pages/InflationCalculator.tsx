import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  amount: z.string().min(1, "Please enter an amount"),
  year: z.string().min(1, "Please select a year"),
  month: z.string().min(1, "Please select a month"),
  source: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const years = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const InflationCalculator = () => {
  const [result, setResult] = useState<{
    originalValue: number;
    todayValue: number;
    lossInValue: number;
    percentageLoss: number;
    percentageIncrease: number;
    annualGrowthRate: number;
    startYear: number;
    endYear: number;
    yearsDiff: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  // Load Baserow API token from environment variables
  const token = import.meta.env.VITE_BASEROW_API_TOKEN;

  // Direct function to submit data to Baserow using your suggested approach
  const submitToBaserow = async (formData: FormValues, todayValue: number) => {
    try {
      // Prepare the row data for Baserow
      const rowData = {
        Name: formData.name,
        Email: formData.email,
        Amount: parseFloat(formData.amount.replace(/[^0-9.]/g, "")),
        Month: parseInt(formData.month),
        Year: parseInt(formData.year),
        "Inflation Adjusted Amount": todayValue,
        "Submission Date": new Date().toISOString(),
        "Source/Campaign": formData.source || "Website",
      };
      
      console.log("Submitting row to Baserow:", rowData);
      
      // Submit to Baserow API
      const response = await fetch(
        "https://api.baserow.io/api/database/rows/table/540880/?user_field_names=true",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rowData),
        }
      );
      
      console.log("Baserow response status:", response.status);
      
      // Try to parse as JSON first
      let data;
      try {
        data = await response.json();
        console.log("Baserow response data:", data);
      } catch(err) {
        const text = await response.text();
        console.log("Baserow response text:", text);
      }
      
      if (response.ok) {
        alert("Submitted to Baserow ✅");
      } else {
        alert("Failed to submit to Baserow ❌");
      }
    } catch (error) {
      console.error("Error submitting to Baserow:", error);
      alert("Something went wrong with Baserow submission ❌");
    }
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
      source: "",
    },
  });

  const calculateInflation = async (data: FormValues) => {
    // Prevent duplicate submissions
    if (isSubmittingRef.current) {
      return;
    }
    
    try {
      // Set submission state to prevent multiple submissions
      setIsSubmitting(true);
      isSubmittingRef.current = true;
      
      const response = await fetch("/api/inflation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          amount: data.amount,
          year: data.year,
          month: data.month,
          source: data.source || 'Website'
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate inflation");
      }

      const responseData = await response.json();
      console.log("API response:", responseData);
      
      if (responseData.success && responseData.data) {
        // Update the UI with the enhanced calculation results
        setResult(responseData.data);
        
        // Submit the data to Baserow only once
        await submitToBaserow(data, responseData.data.todayValue);
      } else {
        console.error("API error:", responseData.error);
      }
    } catch (error) {
      console.error("Error calculating inflation:", error);
      // You could add error state handling here
    } finally {
      // Reset submission state
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <>
      <Helmet>
        <title>Inflation Calculator | Property Investments</title>
        <meta
          name="description"
          content="Calculate how inflation affects your savings over time and determine the growth rate needed to keep pace with inflation."
        />
        <meta property="og:title" content="Inflation Calculator | Property Investments" />
        <meta
          property="og:description"
          content="Calculate how inflation affects your savings over time."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="section-anchor py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Inflation Calculator</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Find out the growth rate needed for your savings to have kept up with inflation. 
              This calculator shows the effect of inflation on the real value of your savings 
              and the growth rate you would have needed to keep pace with inflation.
            </p>
          </div>

          <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(calculateInflation)}
                  className="space-y-6"
                >
                  {/* New User Info Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 font-medium">Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 font-medium">Your Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@example.com"
                              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">Campaign Source (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Facebook Ad, Newsletter, etc."
                            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Calculation Form */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2">Show me how much</h3>
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-neutral-700 font-medium">Amount (£)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="10000"
                                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2">in</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="month"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-700 font-medium">Month</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary">
                                    <SelectValue placeholder="Select month" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-700 font-medium">Year</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary">
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem key={year.value} value={year.value}>
                                      {year.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="mb-6 flex flex-col">
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2">is equivalent in today's money</h3>
                      <div className="flex-grow flex items-end">
                        <Button
                          type="submit"
                          className="w-full bg-primary text-white font-semibold py-3 hover:bg-primary/90"
                        >
                          Calculate Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">
                Current UK Inflation Rate
              </h3>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-4">2.6%</div>
                <p className="text-neutral-600">Source: Office for National Statistics</p>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">
                  Calculation Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* First row */}
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-700">Original Value:</div>
                    <div className="text-2xl font-semibold text-neutral-800">
                      £{result.originalValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      {result.startYear}
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-700">Today's Equivalent Value:</div>
                    <div className="text-2xl font-semibold text-primary">
                      £{result.todayValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      As of {result.endYear}
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-700">
                      Loss in Value:
                    </div>
                    <div className="text-2xl font-semibold text-red-500">
                      -£{result.lossInValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Due to inflation
                    </div>
                  </div>
                  
                  {/* Second row */}
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-700">
                      Increase Over Time:
                    </div>
                    <div className="text-2xl font-semibold text-amber-600">
                      {result.percentageIncrease.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}%
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Cost of goods and services
                    </div>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-700">
                      Annual Growth Rate Needed:
                    </div>
                    <div className="text-2xl font-semibold text-secondary">
                      {result.annualGrowthRate.toLocaleString("en-GB", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}%
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      To keep pace with inflation
                    </div>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-700">
                      Time Period:
                    </div>
                    <div className="text-2xl font-semibold text-blue-600">
                      {result.yearsDiff.toLocaleString("en-GB", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })} years
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      From {result.startYear} to {result.endYear}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-5 border border-amber-200 bg-amber-50 rounded-md">
                  <h4 className="text-lg font-medium text-amber-800 mb-2">What this means:</h4>
                  <p className="text-amber-700">
                    Your £{result.originalValue.toLocaleString("en-GB")} from {result.startYear} would need to have grown by an average of <strong>{result.annualGrowthRate.toFixed(1)}%</strong> per year just to have kept pace with inflation. If you achieved a lower rate of growth, the real value of your money would have fallen.
                  </p>
                  <p className="text-amber-700 mt-2">
                    <strong>Property Investments typically provide returns of 8-12% per year</strong>, significantly outpacing inflation and helping you build real wealth over time.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-neutral-800 mb-3">How Your Money Could Have Grown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="font-medium text-neutral-700">Bank Savings (1%)</div>
                      <div className="text-xl font-semibold text-red-600">
                        £{(result.originalValue * Math.pow(1.01, result.yearsDiff)).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-sm text-neutral-600 mt-1">
                        {(Math.pow(1.01, result.yearsDiff) * 100 - 100).toFixed(1)}% growth
                      </div>
                      <div className="text-sm font-medium text-red-700 mt-2">
                        Lost to inflation: -£{(result.todayValue - (result.originalValue * Math.pow(1.01, result.yearsDiff))).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="font-medium text-neutral-700">Cash ISA (2-3%)</div>
                      <div className="text-xl font-semibold text-amber-600">
                        £{(result.originalValue * Math.pow(1.025, result.yearsDiff)).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-sm text-neutral-600 mt-1">
                        {(Math.pow(1.025, result.yearsDiff) * 100 - 100).toFixed(1)}% growth
                      </div>
                      <div className="text-sm font-medium text-amber-700 mt-2">
                        {result.todayValue > (result.originalValue * Math.pow(1.025, result.yearsDiff)) ? (
                          <>Lost to inflation: -£{(result.todayValue - (result.originalValue * Math.pow(1.025, result.yearsDiff))).toLocaleString("en-GB", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}</>
                        ) : (
                          <>Beat inflation by: £{((result.originalValue * Math.pow(1.025, result.yearsDiff)) - result.todayValue).toLocaleString("en-GB", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}</>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-neutral-700">Property Investment (10%)</div>
                      <div className="text-xl font-semibold text-green-600">
                        £{(result.originalValue * Math.pow(1.1, result.yearsDiff)).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-sm text-neutral-600 mt-1">
                        {(Math.pow(1.1, result.yearsDiff) * 100 - 100).toFixed(1)}% growth
                      </div>
                      <div className="text-sm font-medium text-green-700 mt-2">
                        Beat inflation by: £{((result.originalValue * Math.pow(1.1, result.yearsDiff)) - result.todayValue).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <a 
                      href="/invest" 
                      className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Learn More About Our Property Investments
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  );
};

export default InflationCalculator;