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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <div className="mt-6">
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">
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