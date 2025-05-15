import { useState } from "react";
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
  amount: z.string().min(1, "Please enter an amount"),
  year: z.string().min(1, "Please select a year"),
  month: z.string().min(1, "Please select a month"),
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
    growthRate: number;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
    },
  });

  const calculateInflation = (data: FormValues) => {
    const amount = parseFloat(data.amount.replace(/[^0-9.]/g, ""));
    const year = parseInt(data.year);
    const month = parseInt(data.month);

    // Simple inflation calculation (sample calculation - would be replaced with actual calculation)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    // Calculate years difference
    const yearsDiff = (currentYear - year) + ((currentMonth - month) / 12);
    
    // Using 2.6% annual inflation rate
    const inflationRate = 0.026;
    const todayValue = amount * Math.pow(1 + inflationRate, yearsDiff);
    const growthRate = (Math.pow(todayValue / amount, 1 / yearsDiff) - 1) * 100;
    
    setResult({
      originalValue: amount,
      todayValue: todayValue,
      growthRate: growthRate,
    });
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

          <div className="lg:flex items-start">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(calculateInflation)}
                      className="space-y-6"
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                          Show me how much
                        </h3>
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-700 font-medium">
                                Amount (£)
                              </FormLabel>
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
                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                          in
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="month"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-neutral-700 font-medium">
                                  Month
                                </FormLabel>
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
                                <FormLabel className="text-neutral-700 font-medium">
                                  Year
                                </FormLabel>
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

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                          is equivalent in today's money
                        </h3>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-3 hover:bg-primary/90"
                      >
                        Calculate Now
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-1/2">
              <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
                    Current UK Inflation Rate
                  </h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-4">2.6%</div>
                    <p className="text-neutral-600">
                      Source: Office for National Statistics
                    </p>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
                      Calculation Results
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <div className="font-medium text-neutral-700">Original Value:</div>
                        <div className="text-2xl font-semibold text-neutral-800">
                          £{result.originalValue.toLocaleString("en-GB", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
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
                      </div>

                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <div className="font-medium text-neutral-700">
                          Growth Rate Needed to Match Inflation:
                        </div>
                        <div className="text-2xl font-semibold text-secondary">
                          {result.growthRate.toLocaleString("en-GB", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InflationCalculator;