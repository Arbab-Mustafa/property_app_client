import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1A355E' }}>Contact Details</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="mr-4">
              <Mail className="h-5 w-5" style={{ color: '#C58B25' }} />
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#1A355E' }}>Email</h4>
              <p style={{ color: '#6B7280' }}>info@kr-properties.co.uk</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4">
              <Phone className="h-5 w-5" style={{ color: '#C58B25' }} />
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#1A355E' }}>Phone</h4>
              <p style={{ color: '#6B7280' }}>020 3633 2783</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4">
              <Clock className="h-5 w-5" style={{ color: '#C58B25' }} />
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#1A355E' }}>Response Time</h4>
              <p style={{ color: '#6B7280' }}>We reply within 1 working day</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
