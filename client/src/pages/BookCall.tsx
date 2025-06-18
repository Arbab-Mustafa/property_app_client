import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { CheckIcon, PhoneIcon } from "lucide-react";

const BookCall = () => {
  return (
    <>
      <Helmet>
        <title>Book A Free Strategy Call | KR Property Investments</title>
        <meta
          name="description"
          content="Book a free 15-minute strategy call to learn how our investors are beating inflation with UK property investments. Discover 8-12% annual returns."
        />
        <meta property="og:title" content="Book A Free Strategy Call | KR Property Investments" />
        <meta
          property="og:description"
          content="Discover how you could earn 8-12% returns annually with UK property investments in just 15 minutes."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center mt-28 mb-4" style={{ color: '#1A355E' }}>
              Book a Free Strategy Call to Learn How Our Investors Are Beating Inflation with UK Property
            </h1>
            <p className="text-lg text-center mb-8 max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              In just 15 minutes, discover how you could earn 8–12% returns annually — secured against real property, and without becoming a landlord.
            </p>
          </div>

          {/* Call to Action Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Primary CTA - Calendly */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>
                  Schedule Your Free Call
                </h2>
                <p className="mb-6" style={{ color: '#6B7280' }}>
                  Choose a convenient time for your 15-minute strategy call
                </p>
                <a 
                  href="https://calendly.com/kr-property-investments/5-10-min-discovery-call-clone" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    className="w-full py-3 text-white font-medium rounded transition-colors"
                    style={{ backgroundColor: '#F97316' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EA580C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F97316'}
                  >
                    🟠 Book My Free Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Secondary CTA - Phone */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>
                  Prefer to Speak Now?
                </h2>
                <p className="mb-6 pt-[12px] pb-[12px]" style={{ color: '#6B7280' }}>
                  Call us directly for immediate assistance
                </p>
                <a 
                  href="tel:02036332783"
                  className="block w-full"
                >
                  <Button 
                    className="w-full py-3 font-medium rounded border-2 transition-colors"
                    style={{ 
                      color: '#F97316', 
                      borderColor: '#F97316',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F97316';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#F97316';
                    }}
                  >
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    020 3633 2783
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Why Book a Call Section */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#1A355E' }}>What To Expect On Our Call</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckIcon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#C58B25' }} />
                <div>
                  <h3 className="font-bold mb-2" style={{ color: '#1A355E' }}>
                    Discover how to make your money work harder
                  </h3>
                  <p style={{ color: '#6B7280' }}>
                    Learn strategies that outpace inflation and traditional savings
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckIcon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#C58B25' }} />
                <div>
                  <h3 className="font-bold mb-2" style={{ color: '#1A355E' }}>
                    See how others earn passive returns backed by property
                  </h3>
                  <p style={{ color: '#6B7280' }}>
                    Real case studies and returns from our investor community
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckIcon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#C58B25' }} />
                <div>
                  <h3 className="font-bold mb-2" style={{ color: '#1A355E' }}>
                    No pressure — just clear numbers and options
                  </h3>
                  <p style={{ color: '#6B7280' }}>
                    Transparent discussion about risks, returns, and requirements
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckIcon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#C58B25' }} />
                <div>
                  <h3 className="font-bold mb-2" style={{ color: '#1A355E' }}>
                    Just 15 minutes to rethink your financial path
                  </h3>
                  <p style={{ color: '#6B7280' }}>
                    Quick, focused conversation that could change your financial future
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Soft CTA */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>
                Not ready to talk?
              </h3>
              <p className="mb-6" style={{ color: '#6B7280' }}>
                Try our Free Inflation Calculator to see how much your money is losing sitting in the bank.
              </p>
              <a href="/inflation-calculator" className="inline-block">
                <Button 
                  className="font-medium px-6 py-2 rounded border-2 transition-colors"
                  style={{ 
                    color: '#C58B25', 
                    borderColor: '#C58B25',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C58B25';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#C58B25';
                  }}
                >
                  Try Free Inflation Calculator
                </Button>
              </a>
            </div>
          </div>

          {/* Trust Testimonial */}
          <div className="bg-white p-8 rounded-lg shadow-md border-2 max-w-2xl mx-auto" style={{ borderColor: '#C58B25' }}>
            <blockquote className="text-center">
              <p className="text-lg italic mb-4" style={{ color: '#6B7280' }}>
                After just one call, I felt confident investing. Now I'm earning 10% and sleeping better at night.
              </p>
              <cite className="font-semibold" style={{ color: '#1A355E' }}>
                — Sarah R., Private Lender
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCall;