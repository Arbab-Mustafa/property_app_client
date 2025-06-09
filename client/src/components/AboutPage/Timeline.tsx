import React from "react";
import { CheckCircle, Home, TrendingUp, Users, Rocket } from "lucide-react";

const Timeline = () => {
  const milestones = [
    {
      year: "2017",
      title: "Invested in Our Education",
      icon: CheckCircle,
      description: "We committed £24,000 to learn the fundamentals of property investing — and completed our first mentorship."
    },
    {
      year: "End of 2017",
      title: "First Buy-to-Let Secured",
      icon: Home,
      description: "Our property journey began with a single BTL deal — the result of months of learning, viewing, and persistence."
    },
    {
      year: "2018–2019",
      title: "Refining Strategy, Learning the Market",
      icon: TrendingUp,
      description: "We spent two years actively analysing BMV and HMO opportunities, while adapting to changing market conditions."
    },
    {
      year: "2020",
      title: "Second Deal During COVID",
      icon: Home,
      description: "Despite rising rates and lockdown challenges, we secured another buy-to-let in March and raised £100K to fund projects."
    },
    {
      year: "2021",
      title: "Gaining Momentum",
      icon: TrendingUp,
      description: "Two more BTLs added to the portfolio — slowly but surely building confidence, systems, and investor interest."
    },
    {
      year: "2022",
      title: "Continued Investment + Positioning for Scale",
      icon: Users,
      description: "We added another asset and began setting foundations to scale beyond our own capital."
    },
    {
      year: "2023",
      title: "New Network, New Direction",
      icon: Rocket,
      description: "After joining a new property network, we pivoted into deal sourcing — unlocking access to more opportunities and connections."
    },
    {
      year: "2023–2024",
      title: "20+ Deals Sourced, Model Proven",
      icon: CheckCircle,
      description: "We helped investors secure 20+ deals in under 12 months — proving our ability to find, vet, and deliver value on the ground."
    },
    {
      year: "2024 (So Far)",
      title: "£700K+ Raised, 7 Deals Transacted",
      icon: TrendingUp,
      description: "We've now raised over £700,000 and transacted on 7 property deals, continuing to build a trusted network of private investors and partners."
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
            Our Journey So Far
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
          <p className="text-xl max-w-3xl mx-auto text-base leading-relaxed" style={{ color: '#6B7280' }}>
            From humble beginnings to becoming a trusted property investment partner
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5" style={{ backgroundColor: 'rgba(249, 115, 22, 0.3)' }}></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10" style={{ backgroundColor: '#F97316' }}></div>
                
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                        <milestone.icon className="h-6 w-6" style={{ color: '#F97316' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: '#F97316' }}>{milestone.year}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#1A355E' }}>
                      {milestone.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;