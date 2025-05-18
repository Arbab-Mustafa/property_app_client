import { Dumbbell, GalleryThumbnails, Mountain, BadgeCheck, Target, Clock3 } from "lucide-react";
import teamImage from "../../assets/team/aaron-stevie.png";

const AboutUs = () => {
  return (
    <section className="section-anchor py-16 bg-white" id="wp-content-about-us">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">About Us</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
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
            <figcaption className="mt-4 text-center text-sm text-neutral-600">
              Aaron and Stevie, founders of KR Property Investments
            </figcaption>
          </figure>
          
          <div className="max-w-2xl text-center mb-10">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Who We Are</h3>
            <p className="text-neutral-600 mb-4">
              We are Aaron and Stevie, a passionate and driven team with a proven track record in property investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Active Lifestyles</h4>
              <p className="text-neutral-600 text-center">
                We thrive on challenge and discipline, with Stevie competing in CrossFit and weightlifting, and Aaron excelling in Brazilian Jiu-Jitsu. These values of perseverance and focus are integral to how we approach our property investments.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mountain className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Long-Term Vision</h4>
              <p className="text-neutral-600 text-center">
                Our dream is to live abroad in Cape Town, South Africa, while continuing to grow a thriving property portfolio.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Experience</h4>
              <p className="text-neutral-600 text-center">
                Since 2017, we've been building a portfolio in the Lincolnshire area, specialising in social housing and collaborating closely with housing providers and charities.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h4 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Proven Results</h4>
            <p className="text-neutral-600 text-center">
              In 2024 alone, we sourced and project-managed 12 successful social housing developments.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h4 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Future Goals</h4>
            <p className="text-neutral-600 text-center">
              We aim to purchase 12 additional properties in 2025, expanding our ability to meet growing demand in the sector.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <GalleryThumbnails className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h4 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Our Portfolio</h4>
            <p className="text-neutral-600 text-center">
              Our growing portfolio includes a mix of residential properties and social housing developments across Lincolnshire and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
