import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { NotepadTextDashed, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Twitter, Mail } from "lucide-react";
import logoPath from "@assets/Property Investments.png";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  // WordPress plugin integration hook
  useEffect(() => {
    if ((window as any).wpData && typeof (window as any).wpData.integratePlugin === 'function') {
      // WordPress footer widget integration
      (window as any).wpData.integratePlugin('widgets', {
        area: 'footer-widgets',
        location: 'footer'
      });
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to subscribe to the newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-neutral-800 text-white py-12" id="wp-footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex justify-between mb-8">
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <img src={logoPath} alt="Property Investments Logo" className="h-12 mb-4" />
            <p className="text-neutral-400 mb-4">
              Property investment experts helping you achieve higher returns through strategic real estate investments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-neutral-400 hover:text-white transition">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-neutral-400 hover:text-white transition">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/invest">
                  <a className="text-neutral-400 hover:text-white transition">What We Do</a>
                </Link>
              </li>
              <li>
                <Link href="/updates">
                  <a className="text-neutral-400 hover:text-white transition">Updates</a>
                </Link>
              </li>
              <li>
                <Link href="/inflation-calculator">
                  <a className="text-neutral-400 hover:text-white transition">Inflation Calculator</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-neutral-400 hover:text-white transition">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-neutral-400 h-5 w-5 mr-2 mt-1" />
                <span className="text-neutral-400">info@kr-propertries.co.uk</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-neutral-400 h-5 w-5 mr-2 mt-1" />
                <span className="text-neutral-400">02036332783</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-neutral-400 h-5 w-5 mr-2 mt-1" />
                <span className="text-neutral-400">Lincolnshire, United Kingdom</span>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-neutral-400 mb-4">
              Subscribe to our newsletter for the latest investment opportunities.
            </p>
            <form className="flex" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Your email"
                className="bg-neutral-700 text-white border-neutral-600 rounded-r-none focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-primary text-white rounded-l-none hover:bg-opacity-90">
                <NotepadTextDashed className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-700 text-center text-neutral-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} KR Property Investments. All rights reserved.</p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/terms">
              <a className="text-neutral-400 hover:text-white transition">Terms & Conditions</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
