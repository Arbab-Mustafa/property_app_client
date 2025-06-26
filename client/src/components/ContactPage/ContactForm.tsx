import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  investmentAmount: z.string().min(1, "Please select an investment amount"),
  interest: z.string().min(1, "Please select what you're interested in"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      investmentAmount: "",
      interest: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Transform data to match backend schema
      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        investmentAmount: data.investmentAmount,
        message: `Interest: ${data.interest}\n\n${data.message}`,
      };

      console.log("Submitting contact form:", contactData);
      await apiRequest("POST", "/api/contact", contactData);
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll be in touch shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-6" style={{ color: "#1A355E" }}>
          Send Us a Message
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-medium"
                    style={{ color: "#1A355E" }}
                  >
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
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
                  <FormLabel
                    className="font-medium"
                    style={{ color: "#1A355E" }}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-medium"
                    style={{ color: "#1A355E" }}
                  >
                    Phone (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Your phone number"
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
              name="investmentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-medium"
                    style={{ color: "#1A355E" }}
                  >
                    Investment Amount
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="25k-50k">£25k–50k</SelectItem>
                      <SelectItem value="50k-100k">£50k–100k</SelectItem>
                      <SelectItem value="100k-250k">£100k–250k</SelectItem>
                      <SelectItem value="250k+">£250k+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-medium"
                    style={{ color: "#1A355E" }}
                  >
                    What are you interested in?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lending">
                        Lending for fixed returns
                      </SelectItem>
                      <SelectItem value="joint-venture">
                        Joint venture opportunities
                      </SelectItem>
                      <SelectItem value="sourcing">Sourcing deals</SelectItem>
                      <SelectItem value="questions">
                        Just asking questions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-medium"
                    style={{ color: "#1A355E" }}
                  >
                    Tell us a little about your goals or questions...
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What would you like to know about property investing?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-white font-semibold py-3 rounded transition-colors"
              style={{ backgroundColor: "#F97316" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#EA580C")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#F97316")
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
