const AboutUs = () => {
  return (
    <section className="section-anchor py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">About Us</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Get to know the team behind Property Investments.
          </p>
        </div>
        
        <div className="lg:flex items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&h=700" 
              alt="Property Investment Team" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Who We Are</h3>
            <p className="text-neutral-600 mb-4">
              We are Aaron and Stevie, a passionate and driven team with a proven track record in property investment.
            </p>
            
            <h4 className="text-xl font-semibold text-neutral-800 mb-2 mt-6">Active Lifestyles</h4>
            <p className="text-neutral-600 mb-4">
              We thrive on challenge and discipline, with Stevie competing in CrossFit and weightlifting, and Aaron excelling in Brazilian Jiu-Jitsu. These values of perseverance and focus are integral to how we approach our property investments.
            </p>
            
            <h4 className="text-xl font-semibold text-neutral-800 mb-2">Long-Term Vision</h4>
            <p className="text-neutral-600 mb-4">
              Our dream is to live abroad in Cape Town, South Africa, while continuing to grow a thriving property portfolio.
            </p>
            
            <h4 className="text-xl font-semibold text-neutral-800 mb-2">Experience</h4>
            <p className="text-neutral-600 mb-4">
              Since 2017, we've been building a portfolio in the Lincolnshire area, specialising in social housing and collaborating closely with housing providers and charities.
            </p>
            
            <h4 className="text-xl font-semibold text-neutral-800 mb-2">Proven Results</h4>
            <p className="text-neutral-600 mb-4">
              In 2024 alone, we sourced and project-managed 12 successful social housing developments.
            </p>
            
            <h4 className="text-xl font-semibold text-neutral-800 mb-2">Future Goals</h4>
            <p className="text-neutral-600 mb-4">
              We aim to purchase 12 additional properties in 2025, expanding our ability to meet growing demand in the sector.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
