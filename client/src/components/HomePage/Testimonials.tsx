import React from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I was unsure where to invest, but KR guided me every step of the way. I'm now seeing 10% returns on my first project.",
      author: "Maya D."
    },
    {
      quote: "Hands-off, honest, and effective. My savings are finally growing.",
      author: "Thomas R."
    },
    {
      quote: "As someone with no property experience, I felt supported and informed throughout the process.",
      author: "Angela K."
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
            Real results from real people who trusted us with their investments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <div className="absolute top-4 left-4">
                <Quote className="h-8 w-8" style={{ color: '#C58B25', opacity: 0.3 }} />
              </div>
              <div className="mt-6">
                <p className="mb-6 italic leading-relaxed" style={{ color: '#6B7280' }}>
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4" style={{ borderColor: '#C58B25', opacity: 0.2 }}>
                  <p className="font-semibold" style={{ color: '#1A355E' }}>
                    – {testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;