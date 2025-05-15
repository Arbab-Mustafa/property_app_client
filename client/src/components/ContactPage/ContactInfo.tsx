import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const ContactInfo = () => {
  return (
    <>
      <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Contact Information</h3>
          
          <div className="mb-6 flex items-start">
            <div className="text-primary mr-4">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-700 mb-1">Email</h4>
              <p className="text-neutral-600">info@propertyinvestments.com</p>
            </div>
          </div>
          
          <div className="mb-6 flex items-start">
            <div className="text-primary mr-4">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-700 mb-1">Phone</h4>
              <p className="text-neutral-600">+44 (0) 1234 567890</p>
            </div>
          </div>
          
          <div className="mb-6 flex items-start">
            <div className="text-primary mr-4">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-700 mb-1">Location</h4>
              <p className="text-neutral-600">Lincolnshire, United Kingdom</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="text-primary mr-4">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-700 mb-1">Office Hours</h4>
              <p className="text-neutral-600">Monday - Friday: 9am - 5pm</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Follow Us</h3>
          
          <div className="flex space-x-4">
            <a href="#" className="text-primary hover:text-primary/80 transition">
              <Instagram className="h-8 w-8" />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition">
              <Facebook className="h-8 w-8" />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition">
              <Linkedin className="h-8 w-8" />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition">
              <Twitter className="h-8 w-8" />
            </a>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactInfo;
