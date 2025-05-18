import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import propertyBgImage from "../../assets/kr-homepage.png";

const Hero = () => {
  return (
    <section 
      className="section-anchor relative min-h-[90vh] flex items-center py-20" 
      id="wp-content-hero"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${propertyBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
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
          
          {/* Handwriting style arrow and text */}
          <div className="relative mt-6 ml-8 sm:ml-32">
            <div className="flex items-center">
              <div className="transform -rotate-45">
                <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 20 L40 20 L30 10 M40 20 L30 30" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white text-lg italic font-bold ml-3" style={{ fontFamily: 'cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                How hard is your money working for you?
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
