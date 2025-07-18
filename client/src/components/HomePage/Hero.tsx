import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import propertyBgImage from "../../assets/kr-homepage.png";

const Hero = () => {
  return (
    <section 
      className="section-anchor relative min-h-[100vh] flex items-center py-20 pt-24" 
      id="wp-content-hero"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 home-hero-bg" 
        style={{ 
          backgroundImage: `url(${propertyBgImage})`,
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            <span className="block mb-2">Lasting Wealth,</span>
            <span style={{ color: '#f7ba29' }}>Built with Property</span>
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md max-w-lg mx-auto sm:mx-0 leading-relaxed">
            We collaborate with people to deliver returns significantly higher than traditional banking or ISAs through strategic property investments.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/invest">
              <Button 
                className="px-6 py-3 h-auto text-white font-semibold hover:shadow-lg shadow-md transition-all duration-200" 
                style={{ backgroundColor: '#F97316' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EA580C'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F97316'}
              >
                Start Investing
              </Button>
            </Link>
            <Link href="/inflation-calculator">
              <Button 
                className="px-6 py-3 h-auto font-semibold hover:bg-gray-100 shadow-md transition-all duration-200"
                style={{ backgroundColor: 'white', color: '#1A355E' }}
              >
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
