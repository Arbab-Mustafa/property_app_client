import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Helmet } from "react-helmet";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  amount: z.string().min(1, "Please enter an amount"),
  year: z.string().min(4, "Please enter a valid year"),
  month: z.string().min(1, "Please select a month"),
  source: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function InflationLanding() {
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
  const [showResults, setShowResults] = useState(false);
  const isSubmittingRef = useRef(false);
  const chartRef = useRef<any>(null);

  const token = import.meta.env.VITE_BASEROW_API_TOKEN;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
      source: "Landing Page",
    },
  });

  // Generate chart image after results are set and send email with chart
  useEffect(() => {
    if (result && chartRef.current) {
      const timer = setTimeout(async () => {
        if (chartRef.current && chartRef.current.canvas) {
          const chartImageBase64 = chartRef.current.toBase64Image();
          setChartImage(chartImageBase64);
          console.log('Chart image generated:', chartImageBase64 ? 'Success' : 'Failed');
          
          if (lastFormData && lastFormData.email && chartImageBase64) {
            try {
              const emailResponse = await fetch("/api/inflation-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: lastFormData.name,
                  email: lastFormData.email,
                  amount: lastFormData.amount,
                  year: lastFormData.year,
                  month: lastFormData.month,
                  chartImage: chartImageBase64,
                  calculationData: result
                }),
              });
              
              if (emailResponse.ok) {
                console.log('Chart email sent successfully');
              } else {
                console.error('Failed to send chart email');
              }
            } catch (emailError) {
              console.error("Error sending chart email:", emailError);
            }
          }
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [result, lastFormData]);

  const submitToBaserow = async (formData: FormValues, todayValue: number) => {
    try {
      if (!token) {
        console.warn("Baserow API token not found, skipping submission");
        return;
      }

      const baserowData = {
        "Name": formData.name,
        "Email": formData.email,
        "Amount": parseFloat(formData.amount),
        "Month": formData.month,
        "Year": formData.year,
        "Inflation Adjusted Amount": todayValue,
        "Submission Date": new Date().toISOString(),
        "Source/Campaign": formData.source || 'Landing Page'
      };

      console.log("Submitting row to Baserow:", baserowData);

      const response = await fetch("https://api.baserow.io/api/database/rows/table/383509/?user_field_names=true", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(baserowData)
      });

      console.log("Baserow response status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Baserow response data:", responseData);
      } else {
        const errorText = await response.text();
        console.error("Baserow error:", errorText);
      }
    } catch (error) {
      console.error("Error submitting to Baserow:", error);
    }
  };

  const calculateInflation = async (data: FormValues) => {
    if (isSubmittingRef.current) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      isSubmittingRef.current = true;
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
          source: data.source || 'Landing Page'
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate inflation");
      }

      const responseData = await response.json();
      console.log("API response:", responseData);
      
      if (responseData.success && responseData.data) {
        setResult(responseData.data);
        setShowResults(true);
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
        label: 'Value (£)',
        data: [result.originalValue, result.todayValue],
        backgroundColor: ['#008e6d', '#dc2626'],
        borderColor: ['#006d54', '#b91c1c'],
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
        text: 'Inflation Impact on Your Money',
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
        <title>Is Your Money Shrinking While You Sleep? | KR Property Investments</title>
        <meta
          name="description"
          content="Discover how inflation is secretly eroding your savings and learn how smart investors are earning 8-12% annually with UK property investments."
        />
        <meta property="og:title" content="Is Your Money Shrinking While You Sleep? | KR Property Investments" />
        <meta
          property="og:description"
          content="Find out how much inflation is costing you and how to protect your wealth with property investment."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Is Your Money <span className="text-red-600">Shrinking</span> While You Sleep?
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find out how much inflation is secretly eroding your savings — and how smart investors are 
              <span className="text-emerald-600 font-semibold"> flipping the script</span>.
            </p>
          </div>

          {!showResults ? (
            /* Calculator Form */
            <Card className="mb-8 shadow-xl border-0">
              <CardHeader className="text-center bg-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl md:text-3xl">Inflation Impact Calculator</CardTitle>
                <CardDescription className="text-emerald-100 text-lg">
                  See exactly how much purchasing power you've lost
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(calculateInflation)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Your Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your name" 
                                className="h-12 text-lg"
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
                            <FormLabel className="text-lg font-medium">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your email" 
                                type="email"
                                className="h-12 text-lg"
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
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium">Investment Amount (£)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 50000" 
                              type="number"
                              className="h-12 text-lg"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Year You Had This Money</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., 2015" 
                                type="number"
                                min="1987"
                                max={new Date().getFullYear()}
                                className="h-12 text-lg"
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
                            <FormLabel className="text-lg font-medium">Month</FormLabel>
                            <FormControl>
                              <select 
                                className="w-full h-12 text-lg border border-input bg-background px-3 py-2 rounded-md"
                                {...field}
                              >
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
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
                      className="w-full h-14 text-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg"
                    >
                      {isSubmitting ? "Calculating..." : "🔍 Reveal My Losses"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            /* Results Section */
            <div className="space-y-8">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-red-600 text-white rounded-t-lg text-center">
                  <CardTitle className="text-2xl md:text-3xl">Your Inflation Impact Report</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Original Amount ({result?.startYear})</h3>
                      <p className="text-3xl font-bold text-emerald-600">
                        £{result?.originalValue.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Needed Today ({result?.endYear})</h3>
                      <p className="text-3xl font-bold text-red-600">
                        £{result?.todayValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Real Value Lost to Inflation</h3>
                    <p className="text-4xl font-bold text-red-600">
                      -£{result?.lossInValue.toLocaleString()}
                    </p>
                    <p className="text-xl text-gray-600 mt-2">
                      ({result?.percentageIncrease}% increase in cost of living)
                    </p>
                  </div>

                  {chartData && (
                    <div className="mb-8">
                      <Bar ref={chartRef} data={chartData} options={chartOptions} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Call to Action Section */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Your Money Doesn't Have to Shrink
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                    Learn how our investors are earning <strong>8–12% annually</strong>, 
                    backed by real UK property assets that grow with inflation.
                  </p>
                  <Button 
                    size="lg"
                    className="h-16 px-8 text-xl font-bold bg-white text-emerald-600 hover:bg-gray-100 shadow-lg"
                    onClick={() => window.open('/contact', '_blank')}
                  >
                    📞 Book a Free 15-Min Strategy Call
                  </Button>
                  <p className="text-emerald-100 mt-4 text-lg">
                    No obligation • Personalized advice • Proven strategies
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="text-center mt-12 text-gray-600">
            <p className="text-lg">
              Trusted by 65+ investors • £1.2M+ capital raised • Since 2017
            </p>
          </div>
        </div>
      </div>
    </>
  );
}