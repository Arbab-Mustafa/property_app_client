import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="section-anchor pt-28 pb-16 bg-gradient-to-b from-white to-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Invest in property. <span className="text-primary">Secure your future.</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              We collaborate with investors to achieve higher returns than traditional banking or ISAs through strategic property investments.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/invest">
                <Button className="px-6 py-3 h-auto bg-primary text-white font-semibold hover:bg-primary/90">
                  Start Investing
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="px-6 py-3 h-auto text-primary border-primary font-semibold hover:bg-neutral-50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&h=700" 
              alt="Modern Property Investment Building" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
