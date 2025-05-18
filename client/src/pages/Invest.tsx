import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, DollarSign } from "lucide-react";

const Invest = () => {
  return (
    <>
      <Helmet>
        <title>What We Do | Property Investments</title>
        <meta 
          name="description" 
          content="Discover how we provide end-to-end solutions for cash-flowing properties without the hassle of negotiating with agents, coordinating with builders, or sourcing solicitors." 
        />
        <meta property="og:title" content="What We Do | Property Investments" />
        <meta 
          property="og:description" 
          content="Discover how we provide end-to-end solutions for cash-flowing properties without the hassle of negotiating with agents, coordinating with builders, or sourcing solicitors." 
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero Section with Green Background */}
      <section className="bg-emerald-600 text-white py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">What We Do?</h1>
          <div className="flex justify-center mb-8">
            <TrendingUp size={48} className="text-cream-100" />
          </div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12">
            <span className="font-semibold">Attention Investors & High Net-Worth Individuals:</span>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Discover how we provide end-to-end solutions for cash-flowing properties—
            no need for you to spend time negotiating with agents, coordinating with
            builders, or sourcing solicitors and mortgage brokers.
          </p>
        </div>
      </section>

      {/* City Skyline Graphic - Using divs to create a simplified version */}
      <div className="h-24 bg-emerald-600 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-cream-100"></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-around">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="bg-cream-100" 
              style={{
                height: `${Math.floor(Math.random() * 80) + 20}px`,
                width: `${Math.floor(Math.random() * 30) + 20}px`,
                marginRight: '8px'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Services Section with Cream Background */}
      <section className="bg-cream-100 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Find You A Deal */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-white p-6 border-2 border-emerald-600">
                  <Search className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">Find You A Deal</h2>
              <p className="text-gray-700 mb-6">
                If you haven't got the time or experience to find yourself a good investment, 
                we can help you with that.
              </p>
              <Button 
                variant="outline" 
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full"
              >
                Find Out More
              </Button>
            </div>

            {/* Invest With Us */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-white p-6 border-2 border-emerald-600">
                  <DollarSign className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">Invest With Us</h2>
              <p className="text-gray-700 mb-6">
                If you like the idea of earning a return from property, but not having the headache of 
                purchasing one you can earn great returns from investing in our deals.
              </p>
              <Button 
                className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full"
              >
                Find Out More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream-100 pb-16 pt-8">
        <div className="container mx-auto text-center">
          <hr className="border-emerald-600/30 mb-12 max-w-2xl mx-auto" />
          <Link href="/book-call">
            <Button 
              className="border-2 border-emerald-600 bg-transparent text-emerald-600 hover:bg-emerald-600 hover:text-white px-12 py-6 rounded-full text-lg"
            >
              Book A Call
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Invest;
