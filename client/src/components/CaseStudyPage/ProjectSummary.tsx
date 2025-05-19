import React from "react";

interface ProjectSummaryProps {
  items: string[];
  backgroundColor?: string;
  textColor?: string;
  title?: string;
}

const ProjectSummary = ({ 
  items,
  backgroundColor = "bg-black",
  textColor = "text-white",
  title = "Summary"
}: ProjectSummaryProps) => {
  return (
    <div className={`${backgroundColor} ${textColor} p-8 shadow-md my-8 w-full`}>
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectSummary;