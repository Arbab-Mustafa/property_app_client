import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import heroImagePath from "@assets/inflation calculator .png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Mail,
  Download,
} from "lucide-react";
import { API_CONFIG, BASEROW_API_TOKEN } from "../config/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
  const [emailSent, setEmailSent] = useState(false);
  const isSubmittingRef = useRef(false);
  const chartRef = useRef<any>(null);
  const emailSentRef = useRef(false); // Use ref to track email sending state

  const token = BASEROW_API_TOKEN;

  // Send email automatically when chart is rendered and data is available
  useEffect(() => {
    if (result && lastFormData && chartRef.current && !emailSentRef.current) {
      const sendEmail = async () => {
        // Double-check to prevent race conditions
        if (emailSentRef.current) {
          console.log("⚠️ Email already sent, skipping...");
          return;
        }

        try {
          // Mark as sending to prevent duplicate sends
          emailSentRef.current = true;

          // Check if chart is properly rendered
          if (!chartRef.current || !chartRef.current.canvas) {
            console.log("⚠️ Chart not ready yet, skipping email");
            emailSentRef.current = false; // Reset if chart not ready
            return;
          }

          const canvas = chartRef.current.canvas;

          // Additional safety check
          if (!canvas || !canvas.toDataURL) {
            console.log("⚠️ Canvas not ready, skipping email");
            emailSentRef.current = false; // Reset if canvas not ready
            return;
          }

          // Reduce image quality to minimize payload size
          const chartImageData = canvas.toDataURL("image/jpeg", 0.7); // 70% quality JPEG

          console.log("📧 Sending inflation email with chart...");

          const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLATION_EMAIL}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: lastFormData.name,
                email: lastFormData.email,
                amount: parseFloat(lastFormData.amount),
                month: parseInt(lastFormData.month),
                year: parseInt(lastFormData.year),
                chartImage: chartImageData,
                calculationData: result,
              }),
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("✅ Email sent successfully:", responseData);
            setEmailSent(true); // Update state for UI
          } else {
            const errorData = await response.json();
            console.error("❌ Failed to send email:", errorData);
            emailSentRef.current = false; // Reset on error
          }
        } catch (emailError) {
          console.error("❌ Failed to send email:", emailError);
          emailSentRef.current = false; // Reset on error
        }
      };

      // Increased delay to ensure chart is fully rendered
      setTimeout(sendEmail, 1000);
    }
  }, [result, lastFormData]); // Removed emailSent from dependencies to prevent double execution

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
      // Store in our backend database
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLATION}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            amount: parseFloat(formData.amount.replace(/[^0-9.]/g, "")),
            month: parseInt(formData.month),
            year: parseInt(formData.year),
            source: formData.source || "inflation-calculator",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store calculation");
      }

      const responseData = await response.json();
      console.log("✅ Calculation stored successfully:", responseData);

      return responseData;
    } catch (error) {
      console.error("❌ Failed to store calculation:", error);
      throw error;
    }
  };

  const calculateInflation = async (data: FormValues) => {
    if (isSubmittingRef.current) return;

    setIsSubmitting(true);
    isSubmittingRef.current = true;

    try {
      setLastFormData(data);
      setEmailSent(false); // Reset email sent state for new calculation
      emailSentRef.current = false; // Reset ref for new calculation

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLATION}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            amount: data.amount,
            year: data.year,
            month: data.month,
            source: data.source || "inflation-calculator",
          }),
        }
      );

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

  const chartData = result
    ? {
        labels: [`${result.startYear}`, `${result.endYear}`],
        datasets: [
          {
            label: "Value",
            data: [result.originalValue, result.todayValue],
            backgroundColor: ["#1A355E", "#F97316"],
            borderColor: ["#1A355E", "#F97316"],
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Inflation Impact Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "£" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>UK Inflation Calculator | KR Property Investments</title>
        <meta
          name="description"
          content="Calculate how inflation affects your savings over time and determine the growth rate needed to keep pace with inflation."
        />
        <meta
          property="og:title"
          content="UK Inflation Calculator | KR Property Investments"
        />
        <meta
          property="og:description"
          content="Calculate how inflation affects your savings over time."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen pt-20 pb-12 hero-bg"
        style={{
          backgroundImage: `url(${heroImagePath})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white bg-opacity-80"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="pt-32 pb-12">
              <h1
                className="text-4xl lg:text-6xl font-bold mb-6"
                style={{ color: "#1A355E" }}
              >
                Is Your Money Shrinking While You Sleep?
              </h1>
              <p
                className="text-xl mb-8 max-w-2xl mx-auto"
                style={{ color: "#6B7280" }}
              >
                Find out how much inflation is secretly eroding your savings and
                learn how to protect your wealth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto">
          <div className="py-10">
            <div
              className="p-8 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto border border-gray-200"
              style={{ backgroundColor: "#FAF9F6" }}
            >
              <div className="text-center mb-8">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#1A355E" }}
                >
                  Inflation Impact Calculator
                </h2>
                <p style={{ color: "#6B7280" }}>
                  See exactly how much purchasing power you've lost over time
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(calculateInflation)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="text-lg font-medium"
                            style={{ color: "#1A355E" }}
                          >
                            Your Name
                          </FormLabel>
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
                          <FormLabel
                            className="text-lg font-medium"
                            style={{ color: "#1A355E" }}
                          >
                            Your Email
                          </FormLabel>
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
                          <FormLabel
                            className="text-lg font-medium"
                            style={{ color: "#1A355E" }}
                          >
                            Amount (£)
                          </FormLabel>
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
                          <FormLabel
                            className="text-lg font-medium"
                            style={{ color: "#1A355E" }}
                          >
                            Month
                          </FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-12 text-lg border border-gray-300 bg-background px-3 py-2 rounded-md"
                              {...field}
                            >
                              <option value="">Select month</option>
                              {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                  {month.label}
                                </option>
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
                          <FormLabel
                            className="text-lg font-medium"
                            style={{ color: "#1A355E" }}
                          >
                            Year
                          </FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-12 text-lg border border-gray-300 bg-background px-3 py-2 rounded-md"
                              {...field}
                            >
                              <option value="">Select year</option>
                              {years.map((year) => (
                                <option key={year.value} value={year.value}>
                                  {year.label}
                                </option>
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
                    style={{ backgroundColor: "#F97316" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#EA580C";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#F97316";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {isSubmitting
                      ? "Calculating..."
                      : "Has Your Money Decreased Or Increased?"}
                  </Button>
                </form>
              </Form>

              <div
                className="text-center mt-6 pt-4"
                style={{ borderTop: "1px solid #C58B25" }}
              >
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  📈 <strong>Current UK Inflation Rate:</strong> 2.6% (Latest
                  ONS data)
                  <br />
                  <a
                    href="https://www.ons.gov.uk/economy/inflationandpriceindices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                    style={{ color: "#F97316" }}
                  >
                    Source: Office for National Statistics (ONS)
                  </a>
                </p>
              </div>
            </div>

            <div
              className="max-w-2xl mx-auto mt-8 p-4 bg-white border rounded-lg"
              style={{ borderColor: "#C58B25" }}
            >
              <p className="italic text-center" style={{ color: "#1A355E" }}>
                <strong>Did you know?</strong> £10,000 in 2010 would need to be
                worth over £17,000 today just to keep its value.
              </p>
            </div>

            <div className="py-8 text-center">
              <blockquote
                className="bg-gray-50 p-6 rounded-lg shadow-sm border max-w-2xl mx-auto"
                style={{ borderColor: "#C58B25" }}
              >
                <p className="text-lg italic mb-3" style={{ color: "#6B7280" }}>
                  "I had no idea I was losing that much — now I'm earning 10%
                  instead."
                </p>
                <cite
                  className="text-sm font-semibold"
                  style={{ color: "#1A355E" }}
                >
                  – James, Private Investor
                </cite>
              </blockquote>
            </div>
          </div>

          {result && (
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <h3
                  className="text-2xl font-bold text-center mb-6"
                  style={{ color: "#1A355E" }}
                >
                  Calculation Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 rounded-lg border border-gray-200">
                    <div
                      className="font-medium mb-2"
                      style={{ color: "#6B7280" }}
                    >
                      Original Value:
                    </div>
                    <div
                      className="text-2xl font-semibold"
                      style={{ color: "#1A355E" }}
                    >
                      £
                      {result.originalValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm mt-1" style={{ color: "#6B7280" }}>
                      {result.startYear}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200">
                    <div
                      className="font-medium mb-2"
                      style={{ color: "#6B7280" }}
                    >
                      Today's Equivalent Value:
                    </div>
                    <div
                      className="text-2xl font-semibold"
                      style={{ color: "#F97316" }}
                    >
                      £
                      {result.todayValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm mt-1" style={{ color: "#6B7280" }}>
                      As of {result.endYear}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200">
                    <div
                      className="font-medium mb-2"
                      style={{ color: "#6B7280" }}
                    >
                      Loss in Value:
                    </div>
                    <div className="text-2xl font-semibold text-red-500">
                      -£
                      {result.lossInValue.toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm mt-1" style={{ color: "#6B7280" }}>
                      Due to inflation
                    </div>
                  </div>
                </div>

                {chartData && (
                  <div className="mb-8">
                    <Bar
                      ref={chartRef}
                      data={chartData}
                      options={chartOptions}
                    />
                  </div>
                )}

                <div
                  className="text-center p-6 rounded-lg border-2"
                  style={{ borderColor: "#C58B25" }}
                >
                  <h4
                    className="text-xl font-bold mb-4"
                    style={{ color: "#1A355E" }}
                  >
                    Want to stop losing value to inflation?
                  </h4>
                  <p className="mb-6" style={{ color: "#6B7280" }}>
                    Learn how our investors are earning 8-12% annually, backed
                    by real UK property assets that grow with inflation.
                  </p>
                  <Button
                    className="text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: "#F97316" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#EA580C";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#F97316";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    onClick={() => window.open("/contact", "_blank")}
                  >
                    Book your free 15-min consultation
                  </Button>
                </div>

                {/* Post-Submit Call to Action */}
                <div className="py-8">
                  <div
                    className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto border-2"
                    style={{ borderColor: "#C58B25" }}
                  >
                    <div className="text-center">
                      <h3
                        className="text-xl font-bold mb-4"
                        style={{ color: "#1A355E" }}
                      >
                        Want to protect your savings and earn more?
                      </h3>
                      <p className="mb-6" style={{ color: "#6B7280" }}>
                        Book a free strategy call to learn how our investors are
                        earning 8-12% annually.
                      </p>
                      <Button
                        className="text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        style={{ backgroundColor: "#C58B25" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#B8761F";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#C58B25";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                        onClick={() => window.open("/book-call", "_blank")}
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
