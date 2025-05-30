import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PiggyBank, Shield, TrendingUp, Users, Quote } from "lucide-react";

const InvestWithUs = () => {
  const testimonials = [
    {
      quote: "I wanted property exposure without the hassle of being a landlord. This investment approach gives me excellent returns with zero management headaches.",
      author: "Sarah M.",
      returns: "12.5% annual return"
    },
    {
      quote: "The transparency and regular updates give me complete confidence in my investment. I know exactly how my money is working for me.",
      author: "James K.",
      returns: "11.8% annual return"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Invest With Us | Property Investments</title>
        <meta name="description" content="Earn strong returns through property investment without owning or managing property. Hands-off investment opportunities with professional deal management." />
        <meta property="og:title" content="Invest With Us | Property Investments" />
        <meta property="og:description" content="Earn strong returns through property investment without owning or managing property. Hands-off investment opportunities with professional deal management." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Invest With Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Earn strong returns through property investment without owning or managing a property. 
            Perfect for investors who want exposure to property without the operational complexities.
          </p>
          <div className="flex justify-center">
            <PiggyBank className="h-20 w-20 text-white/80" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple three-step process that puts your money to work in property investments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">You Invest</h3>
              <p className="text-gray-600">
                Choose your investment amount and review the specific property deal we've sourced and analyzed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">We Manage the Deal</h3>
              <p className="text-gray-600">
                Our team handles everything from purchase to tenant management, renovations, and ongoing property operations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">You Receive Regular Returns</h3>
              <p className="text-gray-600">
                Earn consistent monthly or quarterly returns based on rental income and property appreciation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why It Works
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The benefits that make this investment approach so attractive to our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Hands-Off Investment</h3>
              <p className="text-gray-600 text-center">
                No tenant calls, maintenance issues, or property management headaches. We handle all operational aspects while you enjoy the returns.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Capital Protected</h3>
              <p className="text-gray-600 text-center">
                Your investment is secured by the underlying property asset, with transparent legal structures protecting your capital.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Proven Track Record</h3>
              <p className="text-gray-600 text-center">
                Historical returns of 8-15% annually across our portfolio, significantly outperforming traditional savings and ISAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Investors Say
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from investors who chose our hands-off investment approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 relative">
                <div className="absolute top-4 left-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>
                <div className="mt-6">
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900 mb-1">
                      – {testimonial.author}
                    </p>
                    <p className="text-primary font-medium">
                      {testimonial.returns}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Earning Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Earning Today
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ready to put your money to work in property investment without the operational complexity? 
            Book a consultation to discuss your investment goals and available opportunities.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">£10K+</div>
                <div className="text-white/80">Minimum Investment</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8-15%</div>
                <div className="text-white/80">Historical Returns</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">0%</div>
                <div className="text-white/80">Management Hassle</div>
              </div>
            </div>
          </div>

          <Link href="/book-call">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold">
              Book a Personal Consultation
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default InvestWithUs;