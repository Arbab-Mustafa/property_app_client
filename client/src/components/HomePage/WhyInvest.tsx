import React, { useState } from "react";
import { Building, TrendingUp, Landmark, Scale, Building2, Plus, Minus } from "lucide-react";

const WhyInvest = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };
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
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
            Why Invest in the UK Property Market?
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
            The UK property market offers stability, growth potential, and protection against inflation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-12 space-y-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              style={{ backgroundColor: '#F9FAFB' }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                aria-expanded={openItems.includes(index)}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg mr-4 bg-[1A355E]" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                    <feature.icon className="h-5 w-5" style={{ color: '#F97316' }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: '#1A355E' }}>
                    {feature.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openItems.includes(index) ? (
                    <Minus className="h-5 w-5" style={{ color: '#1A355E' }} />
                  ) : (
                    <Plus className="h-5 w-5" style={{ color: '#1A355E' }} />
                  )}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-medium italic leading-relaxed" style={{ color: '#6B7280' }}>
            "You're not just buying property — you're buying into a high-demand rental market without the premium price tag."
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;