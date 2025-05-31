import { Helmet } from "react-helmet";
import ContactForm from "@/components/ContactPage/ContactForm";
import ContactInfo from "@/components/ContactPage/ContactInfo";
import { ShieldCheckIcon, TrendingUpIcon, BuildingIcon } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | KR Property Investments</title>
        <meta name="description" content="Start the conversation about making your money work smarter. Contact our property investment experts for lending, joint ventures, and deal sourcing opportunities." />
        <meta property="og:title" content="Contact KR Property Investments" />
        <meta property="og:description" content="Contact us for property investment opportunities including lending for fixed returns, joint ventures, and deal sourcing." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1A355E' }}>
              Start the Conversation About Making Your Money Work Smarter
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-center mb-6" style={{ color: '#6B7280' }}>
              Whether you're looking to earn passive income through secured property lending, co-invest on a project, or just want access to high-performing deals — we're here to help. Drop us a message and we'll get back to you within 1 working day.
            </p>
          </div>

          {/* Trust Badge Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: '#6B7280' }}>
              <ShieldCheckIcon className="w-5 h-5" style={{ color: '#C58B25' }} />
              <span>All investments secured against UK property</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: '#6B7280' }}>
              <TrendingUpIcon className="w-5 h-5" style={{ color: '#C58B25' }} />
              <span>£1.2M+ raised from private investors</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: '#6B7280' }}>
              <BuildingIcon className="w-5 h-5" style={{ color: '#C58B25' }} />
              <span>100+ property transactions since 2017</span>
            </div>
          </div>
          
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <ContactForm />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <ContactInfo />
              
              {/* Testimonial */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2" style={{ borderColor: '#C58B25' }}>
                <blockquote className="text-center">
                  <p className="text-lg italic mb-4" style={{ color: '#6B7280' }}>
                    "I had a few simple questions and got a clear, honest answer — now I'm earning 10% returns, completely passively."
                  </p>
                  <cite className="font-semibold" style={{ color: '#1A355E' }}>
                    — James, Investor since 2022
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
