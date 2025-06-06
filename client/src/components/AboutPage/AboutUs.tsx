import { Dumbbell, GalleryThumbnails, Mountain, BadgeCheck, Target, Clock3 } from "lucide-react";
import teamImage from "../../assets/team/aaron-stevie.png";

const AboutUs = () => {
  return (
    <section className="section-anchor py-16 pt-24" style={{ backgroundColor: '#F9FAFB' }} id="wp-content-about-us">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>About Us</h2>
          <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: '#6B7280' }}>
            Get to know the team behind KR Property Investments.
          </p>
        </div>
        
        {/* Centered image section */}
        <div className="flex flex-col items-center mb-16">
          <figure className="relative mb-10">
            <img 
              src={teamImage}
              alt="Aaron and Stevie - Property Investment Team" 
              className="rounded-full shadow-lg w-64 h-64 object-cover mx-auto"
            />
            <figcaption className="mt-4 text-center text-sm" style={{ color: '#6B7280' }}>
              Aaron and Stevie, founders of KR Property Investments
            </figcaption>
          </figure>
          
          <div className="max-w-2xl text-center mb-10">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1A355E' }}>Who We Are</h3>
            <p className="mb-4 text-base leading-relaxed" style={{ color: '#6B7280' }}>
              We are Aaron and Stevie,<br>a passionate and driven team with a proven track record in property investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                  <Dumbbell className="h-6 w-6" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-center" style={{ color: '#1A355E' }}>Active Lifestyles</h4>
              <p className="text-center text-base leading-relaxed" style={{ color: '#6B7280' }}>
                We thrive on challenge and discipline, with Stevie competing in CrossFit and weightlifting, and Aaron excelling in Brazilian Jiu-Jitsu. These values of perseverance and focus are integral to how we approach our property investments.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                  <Mountain className="h-6 w-6" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-center" style={{ color: '#1A355E' }}>Long-Term Vision</h4>
              <p className="text-center text-base leading-relaxed" style={{ color: '#6B7280' }}>
                Our dream is to live abroad in Cape Town, South Africa, while continuing to grow a thriving property portfolio.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                  <Clock3 className="h-6 w-6" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-center" style={{ color: '#1A355E' }}>Experience</h4>
              <p className="text-center text-base leading-relaxed" style={{ color: '#6B7280' }}>
                Since 2017, we've been building a portfolio in the Lincolnshire area, specialising in social housing and collaborating closely with housing providers and charities.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                <BadgeCheck className="h-6 w-6" style={{ color: '#F97316' }} />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center" style={{ color: '#1A355E' }}>Proven Results</h4>
            <p className="text-center text-base leading-relaxed" style={{ color: '#6B7280' }}>
              In 2024 alone, we sourced and project-managed 12 successful social housing developments.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                <Target className="h-6 w-6" style={{ color: '#F97316' }} />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center" style={{ color: '#1A355E' }}>Future Goals</h4>
            <p className="text-center text-base leading-relaxed" style={{ color: '#6B7280' }}>
              We aim to purchase 12 additional properties in 2025, expanding our ability to meet growing demand in the sector.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F97316', opacity: 0.1 }}>
                <GalleryThumbnails className="h-6 w-6" style={{ color: '#F97316' }} />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center" style={{ color: '#1A355E' }}>Our Portfolio</h4>
            <p className="text-center text-base leading-relaxed" style={{ color: '#6B7280' }}>
              Our growing portfolio includes a mix of residential properties and social housing developments across Lincolnshire and beyond.
            </p>
          </div>
        </div>

        {/* Credentials Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              Our Track Record
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
            <p className="text-xl max-w-3xl mx-auto text-base leading-relaxed" style={{ color: '#6B7280' }}>
              Years of experience delivering consistent results for our investors.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
              <div className="p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">65+</div>
                <div className="font-medium text-sm lg:text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Clients</div>
              </div>
            </div>
            <div className="text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
              <div className="p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">£1.2M+</div>
                <div className="font-medium text-sm lg:text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Capital Raised</div>
              </div>
            </div>
            <div className="text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
              <div className="p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">100+</div>
                <div className="font-medium text-sm lg:text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Property Deals</div>
              </div>
            </div>
            <div className="text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
              <div className="p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">Since 2017</div>
                <div className="font-medium text-sm lg:text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Operating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
