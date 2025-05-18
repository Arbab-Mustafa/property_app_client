import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import skylineImage from "../assets/skyline1.png";
import chartIcon from "../assets/icons3/chart.png";
import findDealIcon from "../assets/icons2/13.png";
import investWithUsIcon from "../assets/icons2/14.png";

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
      <section className="bg-emerald-600 text-white px-4 text-center pt-24 pb-0 relative">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">What We Do?</h1>
          <div className="flex justify-center mb-12">
            <img src={chartIcon} alt="Chart icon" className="h-36 w-36" />
          </div>
          <p className="text-xl md:text-2xl max-w-lg mx-auto mb-16">
            <span className="font-semibold">Working with people that simply want a higher return on their money</span>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-20">
            Discover how we provide end-to-end solutions for cash-flowing properties—
            no need for you to spend time negotiating with agents, coordinating with
            builders, or sourcing solicitors and mortgage brokers.
          </p>
        </div>
        
        {/* Skyline with overlaid services section */}
        <div className="w-screen relative left-1/2 -translate-x-1/2" style={{ marginBottom: "-1px" }}>
          {/* Skyline as background */}
          <img 
            src={skylineImage} 
            alt="City skyline" 
            className="w-full h-auto translate-y-1 min-w-[100vw]"
          />
          
          {/* Services Section overlaid on skyline */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 pt-8 pb-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Find You A Deal */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <img src={findDealIcon} alt="Find you a deal icon" className="h-36 w-36" />
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-600 mb-4">Find You A Deal</h2>
                  <p className="text-emerald-600 mb-6 max-w-[150px] mx-auto">
                    If you haven't got the time or experience to find yourself a good investment, we can help you with that.
                  </p>
                  <Button 
                    className="bg-emerald-600 text-cream-100 hover:bg-emerald-700 rounded-full"
                  >
                    Find Out More
                  </Button>
                </div>

                {/* Invest With Us */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <img src={investWithUsIcon} alt="Invest with us icon" className="h-36 w-36" />
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-600 mb-4">Invest With Us</h2>
                  <p className="text-emerald-600 mb-6 max-w-[150px] mx-auto">
                    If you like the idea of earning a return from Property, but not having the headache of purchasing one you can earn great returns from investing in our deals.
                  </p>
                  <Button 
                    className="bg-emerald-600 text-cream-100 hover:bg-emerald-700 rounded-full"
                  >
                    Find Out More
                  </Button>
                </div>
              </div>
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
