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
      <section className="bg-emerald-600 text-white px-4 text-center pt-24 pb-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">What We Do</h1>
          <div className="flex justify-center mb-12">
            <img src={chartIcon} alt="Chart icon" className="h-36 w-36" />
          </div>
          <p className="text-xl md:text-2xl max-w-lg mx-auto mb-8">
            <span className="font-semibold">Hands-free, end-to-end property investment solutions</span>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We handle everything from deal sourcing to completion, so you can earn higher returns 
            without the hassle of managing agents, builders, solicitors, or mortgage brokers.
          </p>
        </div>
      </section>

      {/* Services Selection */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose the option that fits your goals
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Find You A Deal Card */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex justify-center mb-6">
                <img src={findDealIcon} alt="Find you a deal icon" className="h-24 w-24" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Find You A Deal</h3>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Complete deal sourcing and market analysis
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Risk assessment and investment review
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Access to our professional network
                </li>
              </ul>
              <div className="text-center">
                <Link href="/find-you-a-deal">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Invest With Us Card */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex justify-center mb-6">
                <img src={investWithUsIcon} alt="Invest with us icon" className="h-24 w-24" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Invest With Us</h3>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Hands-off property investment opportunities
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Earn returns without property ownership
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Professional deal management included
                </li>
              </ul>
              <div className="text-center">
                <Link href="/invest-with-us">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book a consultation to discuss which option is right for your investment goals.
          </p>
          <Link href="/book-call">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg"
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
