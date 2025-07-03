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
import { BASEROW_API_TOKEN } from "@/config/api";

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

  // Submit contact form data to Baserow
  const submitToBaserow = async (formData: FormValues) => {
    if (!BASEROW_API_TOKEN) {
      console.warn("Baserow API token not found, skipping submission");
      throw new Error("Baserow API token not found");
    }

    const baserowData = {
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone || "",
      "Investment Amount": formData.investmentAmount,
      Interest: formData.interest,
      Message: formData.message,
      "Submission Date": new Date().toISOString(),
      "Source/Campaign": "Contact Form",
    };

    console.log("Submitting contact form to Baserow:", baserowData);

    const response = await fetch(
      "https://api.baserow.io/api/database/rows/table/383509/?user_field_names=true",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${BASEROW_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(baserowData),
      }
    );

    console.log("Baserow response status:", response.status);

    if (response.ok) {
      const responseData = await response.json();
      console.log("Baserow response data:", responseData);
      return responseData;
    } else {
      const errorText = await response.text();
      console.error("Baserow error:", errorText);
      throw new Error(
        `Baserow submission failed: ${response.status} - ${errorText}`
      );
    }
  };

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
    let baserowSuccess = false;
    let neonSuccess = false;

    try {
      // Submit to Baserow first (primary storage)
      try {
        await submitToBaserow(data);
        baserowSuccess = true;
        console.log("✅ Contact form submitted to Baserow successfully");
      } catch (baserowError) {
        console.error("❌ Baserow submission failed:", baserowError);
      }

      // Submit to backend API (Neon database) as secondary storage
      try {
        await apiRequest("POST", "/api/contact", data);
        neonSuccess = true;
        console.log("✅ Contact form submitted to Neon database successfully");
      } catch (neonError) {
        console.error("❌ Neon database submission failed:", neonError);
      }

      // Show success if at least one storage worked
      if (baserowSuccess || neonSuccess) {
        toast({
          title: "Message sent",
          description:
            "Thank you for contacting us. We'll be in touch shortly.",
        });
        form.reset();
      } else {
        // Both failed
        toast({
          title: "Something went wrong",
          description: "Failed to send your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Contact form submission error:", error);
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
