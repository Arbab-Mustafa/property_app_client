import React from "react";

interface ScopeOfWorksProps {
  workItems: string[];
  backgroundColor?: string;
  textColor?: string;
}

const ScopeOfWorks = ({ 
  workItems,
  backgroundColor = "bg-cream-100",
  textColor = "text-black"
}: ScopeOfWorksProps) => {
  return (
    <div className={`${backgroundColor} p-8 shadow-md my-8 w-full`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>Scope Of Works</h2>
        
        <ul className="space-y-2 max-w-4xl mx-auto">
          {workItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-primary font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScopeOfWorks;