import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, Shield, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

const FindYouADeal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Submit to newsletter endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You're on the waitlist! Check your email for the Deal Checklist.",
        });
        form.reset();
      } else {
        throw new Error('Failed to join waitlist');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Deal Sourcing Waitlist | KR Property Investments</title>
        <meta name="description" content="Join our exclusive waitlist for deal sourcing services. Get our free Ultimate Deal Checklist while you wait for the next intake." />
        <meta property="og:title" content="Deal Sourcing Waitlist | KR Property Investments" />
        <meta property="og:description" content="Join our exclusive waitlist for deal sourcing services. Get our free Ultimate Deal Checklist while you wait for the next intake." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12 pt-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#1A355E' }}>
              Our Deal Sourcing Service Is Currently Paused — But You Can Still Get on the Waitlist.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              We're at full capacity — but when a spot opens, you'll be the first to know. Plus, get our free Deal Checklist to prepare like a pro.
            </p>
          </div>

          {/* Lead Magnet Banner */}
          <Card className="mb-12 shadow-lg border-2" style={{ borderColor: '#C58B25' }}>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <FileText className="h-16 w-16" style={{ color: '#C58B25' }} />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>
                The Ultimate Deal Checklist for Property Investors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#F97316' }} />
                  <span style={{ color: '#6B7280' }}>Know what to ask before buying</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#F97316' }} />
                  <span style={{ color: '#6B7280' }}>Spot hidden costs and deal-breakers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#F97316' }} />
                  <span style={{ color: '#6B7280' }}>10 due diligence checks most investors skip</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#F97316' }} />
                  <span style={{ color: '#6B7280' }}>Instantly compare ROI across deals</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Opt-in Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your best email..."
                          className="text-lg py-4 px-6 rounded-lg border-2"
                          style={{ borderColor: '#C58B25' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full text-white font-bold text-xl py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#F97316' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EA580C';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F97316';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {isSubmitting ? "Joining Waitlist..." : "Get the Checklist + Join the Waitlist"}
                </Button>
              </form>
            </Form>
            
            <p className="text-center mt-4 text-sm" style={{ color: '#6B7280' }}>
              <strong>Next Intake Expected: Autumn 2025</strong>
            </p>
          </div>

          {/* Testimonial */}
          <div className="mb-12">
            <Card className="max-w-2xl mx-auto border-2" style={{ borderColor: '#C58B25' }}>
              <CardContent className="p-6 text-center">
                <p className="text-lg italic mb-4" style={{ color: '#6B7280' }}>
                  "KR found my first property deal in 14 days — I'd do it again in a heartbeat."
                </p>
                <p className="font-semibold" style={{ color: '#1A355E' }}>
                  — James, Investor
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trust + Scarcity Icons Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: '#F97316' }} />
              <p className="font-semibold" style={{ color: '#1A355E' }}>
                Only 10 sourcing clients per quarter
              </p>
            </div>
            
            <div className="text-center p-6">
              <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: '#F97316' }} />
              <p className="font-semibold" style={{ color: '#1A355E' }}>
                All deals vetted and secured legally
              </p>
            </div>
            
            <div className="text-center p-6">
              <TrendingUp className="h-12 w-12 mx-auto mb-4" style={{ color: '#F97316' }} />
              <p className="font-semibold" style={{ color: '#1A355E' }}>
                17.3% average ROI (see case studies)
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FindYouADeal;