import React from "react";
import { Building, TrendingUp, Landmark, Scale, Building2 } from "lucide-react";

const WhyInvest = () => {
  const features = [
    {
      title: "A Market Backed by Fundamentals — Not Hype",
      description: "The UK property market isn't just resilient — it's driven by one of the most basic economic principles: supply and demand. The UK has faced a chronic housing shortage for years, with new builds struggling to keep pace with population growth.",
      icon: Building,
    },
    {
      title: "Predictable Income in Uncertain Times",
      description: "While stock markets fluctuate and inflation eats away at savings, UK property continues to deliver consistent, inflation-beating returns. In regions like North East Lincolnshire, rental demand remains high — supported by local industry, affordability, and strong tenant retention.",
      icon: TrendingUp,
    },
    {
      title: "Affordability Meets Opportunity",
      description: "Many regions outside of London and the South East offer exceptional value for money. Lower entry prices mean better yield potential and reduced risk, particularly for new or portfolio investors.",
      icon: Building2,
    },
    {
      title: "Legal Clarity and Investor Protection",
      description: "The UK has one of the world's most transparent and robust legal systems for property ownership. Clear title, defined landlord-tenant regulations, and a wide network of professionals make investing smoother and more secure.",
      icon: Scale,
    },
    {
      title: "Global Recognition, Local Performance",
      description: "UK real estate is trusted worldwide. But its strength lies not just in capital cities — it's in the regions where smart investors go looking for value. With regeneration projects and infrastructure investment, these areas can often outperform the usual hotspots.",
      icon: Landmark,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Invest in the UK Property Market?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The UK property market offers stability, growth potential, and protection against inflation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mt-2 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 font-medium italic">
            "You're not just buying property — you're buying into a high-demand rental market without the premium price tag."
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;