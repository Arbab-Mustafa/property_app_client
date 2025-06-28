import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import {
  NotepadTextDashed,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import footerLogo from "@assets/krfooterlogo_1749285109638.png";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WordPress plugin integration hook
  useEffect(() => {
    if (
      (window as any).wpData &&
      typeof (window as any).wpData.integratePlugin === "function"
    ) {
      // WordPress footer widget integration
      (window as any).wpData.integratePlugin("widgets", {
        area: "footer-widgets",
        location: "footer",
      });
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("📧 Submitting newsletter subscription for:", email);

      const response = await apiRequest("POST", "/api/newsletter", {
        email: email.trim(),
        source: "footer-newsletter",
      });

      console.log("✅ Newsletter subscription successful");

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error: any) {
      console.error("❌ Newsletter subscription error:", error);

      // More specific error handling
      let errorMessage =
        "Failed to subscribe to the newsletter. Please try again.";

      if (error.message) {
        if (error.message.includes("already subscribed")) {
          errorMessage = "This email is already subscribed to our newsletter.";
        } else if (error.message.includes("Invalid email")) {
          errorMessage = "Please enter a valid email address.";
        } else if (error.message.includes("Network")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-neutral-800 text-white py-12" id="wp-footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex justify-between gap-10 mb-8">
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="h-16 mb-4 flex items-center">
              <img
                src={footerLogo}
                alt="KR Property Investments"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-neutral-400 mb-4">
              Helping You Achieve Stronger Returns Through Strategic Property
              Investments — Since 2017
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/5 mb-8 lg:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/invest"
                  className="text-neutral-400 hover:text-white transition"
                >
                  What We Do
                </Link>
              </li>
              <li>
                <Link
                  href="/updates"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/inflation-calculator"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Inflation Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/financial-literacy"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Financial Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/5 mb-8 lg:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-neutral-400 h-5 w-5 mr-2 mt-1" />
                <span className="text-neutral-400">
                  info@kr-propertries.co.uk
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="text-neutral-400 h-5 w-5 mr-2 mt-1" />
                <span className="text-neutral-400">02036332783</span>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-neutral-400 mb-4">
              Subscribe to our newsletter for the latest investment
              opportunities.
            </p>
            <form className="flex" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Your email"
                className="bg-neutral-700 text-white border-neutral-600 rounded-r-none focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <Button
                type="submit"
                className="bg-primary text-white rounded-l-none hover:bg-opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <NotepadTextDashed className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-700">
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-white mb-3">
              Want to see our real results?
            </p>
            <Link
              href="/case-studies"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              View Our Case Studies
            </Link>
          </div>

          <div className="text-center text-neutral-400">
            <p className="mb-2">
              &copy; {new Date().getFullYear()} KR Property Investments. All
              rights reserved.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link
                href="/terms"
                className="text-neutral-400 hover:text-white transition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
