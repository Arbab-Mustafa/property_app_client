import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  roi?: string;
  value?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  id, 
  title, 
  image, 
  description, 
  roi, 
  value 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {roi && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold text-sm">
            ROI: {roi}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {value && (
          <div className="bg-orange-100 p-3 rounded-md mb-4">
            <p className="text-sm font-medium">Current Value: <span className="font-bold">{value}</span></p>
          </div>
        )}
        
        <Link href={`/case-studies/${id}`}>
          <a className="inline-flex items-center font-medium text-primary hover:text-primary/80">
            View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CaseStudyCard;