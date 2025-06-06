import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<FormValues | null>(null);
  const isSubmittingRef = useRef(false);
  const chartRef = useRef<any>(null);

  const token = import.meta.env.VITE_BASEROW_API_TOKEN;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      year: "",
      month: "",
      source: "Website",
    },
  });

  const submitToBaserow = async (formData: FormValues, todayValue: number) => {
    try {
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
      
      const response = await fetch(
        "https://api.baserow.io/api/database/rows/table/540880/?user_field_names=true",
        {
          method: "POST",
          headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rowData),
        }
      );

      console.log("Baserow response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Baserow API error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Baserow response data:", responseData);
      
      return responseData;
    } catch (error) {
      console.error("Error submitting to Baserow:", error);
      throw error;
    }
  };

  const calculateInflation = async (data: FormValues) => {
    if (isSubmittingRef.current) return;
    
    setIsSubmitting(true);
    isSubmittingRef.current = true;

    try {
      setLastFormData(data);
      
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
        setResult(responseData.data);
        await submitToBaserow(data, responseData.data.todayValue);
      } else {
        console.error("API error:", responseData.error);
      }
    } catch (error) {
      console.error("Error calculating inflation:", error);
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const chartData = result ? {
    labels: [`${result.startYear}`, `${result.endYear}`],
    datasets: [
      {
        label: 'Value',
        data: [result.originalValue, result.todayValue],
        backgroundColor: ['#1A355E', '#F97316'],
        borderColor: ['#1A355E', '#F97316'],
        borderWidth: 1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Inflation Impact Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '£' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>UK Inflation Calculator | KR Property Investments</title>
        <meta
          name="description"
          content="Calculate how inflation affects your savings over time and determine the growth rate needed to keep pace with inflation."
        />
        <meta property="og:title" content="UK Inflation Calculator | KR Property Investments" />
        <meta
          property="og:description"
          content="Calculate how inflation affects your savings over time."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>UK Inflation Calculator</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Find out the growth rate needed for your savings to have kept up with inflation. 
              This calculator shows the effect of inflation on the real value of your savings 
              and the growth rate you would have needed to keep pace with inflation.
            </p>
          </div>

          <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateInflation)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium" style={{ color: '#1A355E' }}>Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                          <FormLabel className="font-medium" style={{ color: '#1A355E' }}>Your Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@example.com"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-6" style={{ color: '#1A355E' }}>Calculate Your Inflation Impact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium" style={{ color: '#1A355E' }}>Amount (£)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 10000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium" style={{ color: '#1A355E' }}>Month</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md">
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
                            <FormLabel className="font-medium" style={{ color: '#1A355E' }}>Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md">
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

                    <div className="mb-6">
                      <Button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 text-white font-semibold rounded transition-colors"
                        style={{ backgroundColor: '#F97316' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EA580C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F97316'}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Calculating..." : "Calculate Now"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: '#1A355E' }}>
                Current UK Inflation Rate
              </h3>
              <div className="text-center">
                <div className="text-5xl font-bold mb-4" style={{ color: '#F97316' }}>2.6%</div>
                <p style={{ color: '#6B7280' }}>Source: Office for National Statistics</p>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-6" style={{ color: '#1A355E' }}>
                  Calculation Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 rounded-lg border border-gray-200">
                    <div className="font-medium mb-2" style={{ color: '#6B7280' }}>Original Value:</div>
                    <div className="text-2xl font-semibold" style={{ color: '#1A355E' }}>
                      £{result.originalValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#6B7280' }}>
                      {result.startYear}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200">
                    <div className="font-medium mb-2" style={{ color: '#6B7280' }}>Today's Equivalent Value:</div>
                    <div className="text-2xl font-semibold" style={{ color: '#F97316' }}>
                      £{result.todayValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#6B7280' }}>
                      As of {result.endYear}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200">
                    <div className="font-medium mb-2" style={{ color: '#6B7280' }}>
                      Loss in Value:
                    </div>
                    <div className="text-2xl font-semibold text-red-500">
                      -£{result.lossInValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#6B7280' }}>
                      Due to inflation
                    </div>
                  </div>
                </div>

                {chartData && (
                  <div className="mb-8">
                    <Bar ref={chartRef} data={chartData} options={chartOptions} />
                  </div>
                )}

                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: '#C58B25' }}>
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>
                    Don't let inflation erode your wealth
                  </h4>
                  <p className="mb-6" style={{ color: '#6B7280' }}>
                    Our property investment opportunities typically return 8-12% annually, 
                    helping you stay ahead of inflation while your money is secured against real UK property.
                  </p>
                  <a 
                    href="/contact" 
                    className="inline-block px-6 py-3 text-white font-semibold rounded-md transition-colors"
                    style={{ backgroundColor: '#F97316' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EA580C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F97316'}
                  >
                    Learn More About Our Property Investments
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default InflationCalculator;