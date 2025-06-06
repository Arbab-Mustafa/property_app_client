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
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#C58B25' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-center mt-10 mb-4" style={{ color: '#1A355E' }}>
              Is Your Money Shrinking While You Sleep?
            </h1>
            <p className="text-lg text-center mb-6 max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Find out how much inflation is secretly eroding your savings and learn how to protect your wealth.
            </p>
          </div>

          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                <div className="text-sm font-semibold" style={{ color: '#1A355E' }}>FCA Compliant</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Regulated</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                <div className="text-sm font-semibold" style={{ color: '#1A355E' }}>Since 2017</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>8+ Years</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                <div className="text-sm font-semibold" style={{ color: '#1A355E' }}>£1.2M+ Raised</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Capital</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                <div className="text-sm font-semibold" style={{ color: '#1A355E' }}>100+ Deals</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Completed</div>
              </div>
            </div>
          </div>

          <div className="py-10">
            {/* Visual Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#F97316' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z"/>
                  <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                </svg>
              </div>
              <p className="text-sm mt-2" style={{ color: '#C58B25' }}>Your money is shrinking</p>
            </div>

            <div className="p-8 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto border border-gray-200" style={{ backgroundColor: '#FAF9F6' }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A355E' }}>Inflation Impact Calculator</h2>
                <p style={{ color: '#6B7280' }}>
                  See exactly how much purchasing power you've lost over time
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateInflation)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium" style={{ color: '#1A355E' }}>Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              className="h-12 text-lg border border-gray-300 rounded-md"
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
                          <FormLabel className="text-lg font-medium" style={{ color: '#1A355E' }}>Your Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@example.com" 
                              className="h-12 text-lg border border-gray-300 rounded-md"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium" style={{ color: '#1A355E' }}>Amount (£)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 10000" 
                              className="h-12 text-lg border border-gray-300 rounded-md"
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
                          <FormLabel className="text-lg font-medium" style={{ color: '#1A355E' }}>Month</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full h-12 text-lg border border-gray-300 bg-background px-3 py-2 rounded-md"
                              {...field}
                            >
                              <option value="">Select month</option>
                              {months.map((month) => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium" style={{ color: '#1A355E' }}>Year</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full h-12 text-lg border border-gray-300 bg-background px-3 py-2 rounded-md"
                              {...field}
                            >
                              <option value="">Select year</option>
                              {years.map((year) => (
                                <option key={year.value} value={year.value}>{year.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="text-white font-semibold px-6 py-3 rounded-lg w-full transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#F97316' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EA580C';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F97316';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isSubmitting ? "Calculating..." : "Reveal My Losses"}
                  </Button>
                </form>
              </Form>

              <div className="text-center mt-6 pt-4" style={{ borderTop: '1px solid #C58B25' }}>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  📈 <strong>Current UK Inflation Rate:</strong> 2.6% (Latest ONS data)<br />
                  <a 
                    href="https://www.ons.gov.uk/economy/inflationandpriceindices" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                    style={{ color: '#F97316' }}
                  >
                    Source: Office for National Statistics (ONS)
                  </a>
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto mt-8 p-4 bg-white border rounded-lg" style={{ borderColor: '#C58B25' }}>
              <p className="italic text-center" style={{ color: '#1A355E' }}>
                <strong>Did you know?</strong> £10,000 in 2010 would need to be worth over £17,000 today just to keep its value.
              </p>
            </div>

            <div className="py-8 text-center">
              <blockquote className="bg-gray-50 p-6 rounded-lg shadow-sm border max-w-2xl mx-auto" style={{ borderColor: '#C58B25' }}>
                <p className="text-lg italic mb-3" style={{ color: '#6B7280' }}>
                  "I had no idea I was losing that much — now I'm earning 10% instead."
                </p>
                <cite className="text-sm font-semibold" style={{ color: '#1A355E' }}>
                  – James, Private Investor
                </cite>
              </blockquote>
            </div>
          </div>



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
                    Want to stop losing value to inflation?
                  </h4>
                  <p className="mb-6" style={{ color: '#6B7280' }}>
                    Learn how our investors are earning 8-12% annually, backed by real UK property assets that grow with inflation.
                  </p>
                  <Button 
                    className="text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#F97316' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EA580C';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F97316';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => window.open('/contact', '_blank')}
                  >
                    Book your free 15-min consultation
                  </Button>
                </div>

                {/* Post-Submit Call to Action */}
                <div className="py-8">
                  <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto border-2" style={{ borderColor: '#C58B25' }}>
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>
                        Want to protect your savings and earn more?
                      </h3>
                      <p className="mb-6" style={{ color: '#6B7280' }}>
                        Book a free strategy call to learn how our investors are earning 8-12% annually.
                      </p>
                      <Button 
                        className="text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        style={{ backgroundColor: '#C58B25' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#B8761F';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#C58B25';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        onClick={() => window.open('/book-call', '_blank')}
                      >
                        Book My Free Call
                      </Button>
                    </div>
                  </div>
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