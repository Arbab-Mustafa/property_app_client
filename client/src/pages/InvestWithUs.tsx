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
      <section className="py-20 pt-40 text-white" style={{ background: 'linear-gradient(135deg, #1A355E 0%, #2B4A7D 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Invest With Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-white/90">
            Earn strong returns through property investment without owning or managing a property. 
            Perfect for investors who want exposure to property without the operational complexities.
          </p>
          <div className="flex justify-center">
            <PiggyBank className="h-20 w-20 text-white/80" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              How It Works
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              A simple three-step process that puts your money to work in property investments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                <span className="text-3xl font-bold" style={{ color: '#F97316' }}>1</span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>You Invest</h3>
              <p style={{ color: '#6B7280' }}>
                Choose your investment amount and review the specific property deal we've sourced and analyzed.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                <span className="text-3xl font-bold" style={{ color: '#F97316' }}>2</span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>We Manage the Deal</h3>
              <p style={{ color: '#6B7280' }}>
                Our team handles everything from purchase to tenant management, renovations, and ongoing property operations.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                <span className="text-3xl font-bold" style={{ color: '#F97316' }}>3</span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>You Receive Regular Returns</h3>
              <p style={{ color: '#6B7280' }}>
                Earn consistent monthly or quarterly returns based on rental income and property appreciation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              Why It Works
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              The benefits that make this investment approach so attractive to our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Users className="h-8 w-8" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#1A355E' }}>Hands-Off Investment</h3>
              <p className="text-center leading-relaxed" style={{ color: '#6B7280' }}>
                No tenant calls, maintenance issues, or property management headaches. We handle all operational aspects while you enjoy the returns.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Shield className="h-8 w-8" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#1A355E' }}>Capital Protected</h3>
              <p className="text-center leading-relaxed" style={{ color: '#6B7280' }}>
                Your investment is secured by the underlying property asset, with transparent legal structures protecting your capital.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <TrendingUp className="h-8 w-8" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#1A355E' }}>Proven Track Record</h3>
              <p className="text-center leading-relaxed" style={{ color: '#6B7280' }}>
                Historical returns of 8-15% annually across our portfolio, significantly outperforming traditional savings and ISAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              What Our Investors Say
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Real feedback from investors who chose our hands-off investment approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 relative shadow-md">
                <div className="absolute top-4 left-4">
                  <Quote className="h-8 w-8" style={{ color: 'rgba(249, 115, 22, 0.2)' }} />
                </div>
                <div className="mt-6">
                  <p className="mb-6 italic leading-relaxed" style={{ color: '#6B7280' }}>
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold mb-1" style={{ color: '#1A355E' }}>
                      – {testimonial.author}
                    </p>
                    <p className="font-medium" style={{ color: '#F97316' }}>
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
      <section className="py-16 text-white" style={{ backgroundColor: '#1A355E' }}>
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
            <Button className="bg-white px-8 py-4 rounded-md text-lg font-semibold hover:shadow-lg transition-all duration-300" style={{ color: '#1A355E' }}>
              Book a Personal Consultation
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default InvestWithUs;