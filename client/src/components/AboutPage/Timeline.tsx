import React from "react";
import { CheckCircle, Home, TrendingUp, Users, Rocket } from "lucide-react";

const Timeline = () => {
  const milestones = [
    {
      year: "2017",
      title: "KR Property Investments founded",
      icon: CheckCircle,
      description: "Started our journey in property investment"
    },
    {
      year: "2018",
      title: "First investment deal completed",
      icon: Home,
      description: "Successfully completed our first property investment"
    },
    {
      year: "2020",
      title: "Over £500K in capital raised",
      icon: TrendingUp,
      description: "Reached significant capital milestone"
    },
    {
      year: "2022",
      title: "Reached 50+ private clients",
      icon: Users,
      description: "Built strong client base and trust"
    },
    {
      year: "2024",
      title: "£1.2M+ total capital raised and 100+ deals done",
      icon: Rocket,
      description: "Achieved major growth milestones"
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