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
            <span>Lasting Wealth, Built with Property</span>
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            We collaborate with investors to deliver returns significantly higher than traditional banking or ISAs through strategic property investments.
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
          
          {/* Property Stats Card */}
          <div className="mt-12 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Our Property Investment Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">8-12%</div>
                <div className="text-sm text-neutral-600">Annual Returns</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">100%</div>
                <div className="text-sm text-neutral-600">Asset-Backed</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">£5M+</div>
                <div className="text-sm text-neutral-600">Under Management</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">15+ Yrs</div>
                <div className="text-sm text-neutral-600">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
