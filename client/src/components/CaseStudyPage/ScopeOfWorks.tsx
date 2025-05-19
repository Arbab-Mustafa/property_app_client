import React from "react";

interface ScopeOfWorksProps {
  workItems: string[];
  backgroundColor?: string;
  textColor?: string;
}

const ScopeOfWorks: React.FC<ScopeOfWorksProps> = ({ 
  workItems,
  backgroundColor = "bg-cream-100",
  textColor = "text-black"
}) => {
  return (
    <div className={`${backgroundColor} p-8 rounded-lg shadow-md my-8`}>
      <h2 className={`text-3xl font-bold mb-6 ${textColor}`}>Scope Of Works</h2>
      
      <ul className="space-y-2 max-w-3xl mx-auto">
        {workItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-primary font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScopeOfWorks;