import React from "react";

interface CaseStudyHeaderProps {
  title: string;
  image: string;
  description: string;
}

const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({ title, image, description }) => {
  return (
    <div className="relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/90 text-lg max-w-3xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyHeader;