import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CredentialsStats = () => {
  const stats = [
    {
      value: "16+",
      label: "Clients"
    },
    {
      value: "£700k+",
      label: "Capital Raised"
    },
    {
      value: "30+",
      label: "Property Deals"
    },
    {
      value: "Since 2017",
      label: "Operating"
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
            Our Track Record
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
            Years of experience delivering consistent results for our investors.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ background: `linear-gradient(135deg, #F97316 0%, #EA580C 100%)` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="font-medium text-sm lg:text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialsStats;