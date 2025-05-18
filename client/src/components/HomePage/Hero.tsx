import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import propertyBgImage from "../../assets/krhomepage.png";

const Hero = () => {
  return (
    <section 
      className="section-anchor relative min-h-[90vh] flex items-center pt-24 pb-20" 
      id="wp-content-hero"
    >
      {/* Background Image - Using img element for better control */}
      <img 
        src={propertyBgImage} 
        alt="Property investment growth chart" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      
      {/* Overlay - reduced opacity to show more of the image */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            <span className="block mb-2">Lasting Wealth,</span>
            <span className="text-amber-400">Built with Property</span>
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md max-w-lg mx-auto sm:mx-0">
            We collaborate with people to deliver returns significantly higher than traditional banking or ISAs through strategic property investments.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/invest">
              <Button className="px-6 py-3 h-auto bg-primary text-white font-semibold hover:bg-primary/90 shadow-md">
                Start Investing
              </Button>
            </Link>
            <Link href="/inflation-calculator">
              <Button className="px-6 py-3 h-auto bg-white text-primary font-semibold hover:bg-gray-100 shadow-md">
                Try Our Inflation Calculator
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
