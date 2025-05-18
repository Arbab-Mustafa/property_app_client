import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PhoneCallIcon, InfoIcon } from "lucide-react";

const BookCall = () => {
  return (
    <>
      <Helmet>
        <title>Book A Call | Property Investments</title>
        <meta
          name="description"
          content="Schedule a consultation call with our property investment experts to learn how we can help you build wealth through real estate."
        />
        <meta property="og:title" content="Book A Call | Property Investments" />
        <meta
          property="og:description"
          content="Schedule a consultation with our property investment experts."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="section-anchor py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-neutral-800 mb-4">Book A Consultation Call</h1>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Take the first step towards building your property investment portfolio
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-12">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Information */}
                <div className="p-8 bg-primary text-white">
                  <h2 className="text-2xl font-bold mb-6">Why Book A Call With Us?</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full">
                        <InfoIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1">Want to find out how you can get into property?</h3>
                        <p className="text-white text-opacity-90">
                          Learn about our investment opportunities and how they can work for you.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full">
                        <PhoneCallIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1">Need some advice?</h3>
                        <p className="text-white text-opacity-90">
                          Our experts can provide personalized guidance based on your financial goals.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full">
                        <CalendarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1">Want to find out how we work?</h3>
                        <p className="text-white text-opacity-90">
                          Discover our investment process, returns, and how we protect your investment.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                    <h3 className="font-bold text-xl mb-3">What to expect:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <span className="text-amber-300">•</span>
                        <span>A brief 5-10 minute discovery call</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-amber-300">•</span>
                        <span>Discussion about your investment goals</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-amber-300">•</span>
                        <span>Overview of our property investment options</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-amber-300">•</span>
                        <span>No pressure, just information</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Right Side - Call to Action */}
                <div className="p-8 flex flex-col items-center justify-center bg-neutral-50">
                  <div className="text-center max-w-md">
                    <h2 className="text-3xl font-bold text-neutral-800 mb-4">Book A Call Now!</h2>
                    <p className="text-neutral-600 mb-8">
                      Select a convenient time for your 5-10 minute discovery call with our property investment experts.
                    </p>
                    
                    <a 
                      href="https://calendly.com/kr-property-investments/5-10-min-discovery-call-clone" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full py-6 text-lg bg-primary text-white hover:bg-primary/90">
                        Schedule Your Call
                      </Button>
                    </a>
                    
                    <p className="mt-4 text-sm text-neutral-500">
                      You'll be redirected to our Calendly scheduling page
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Not ready to book a call yet?
              </h3>
              <p className="text-neutral-600 mb-4">
                Try our inflation calculator to see how inflation affects your savings over time.
              </p>
              <a href="/inflation-calculator" className="inline-block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Try Our Inflation Calculator
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookCall;