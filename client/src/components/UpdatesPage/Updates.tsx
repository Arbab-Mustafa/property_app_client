import { updates } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Updates = () => {
  return (
    <section className="section-anchor py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Latest Updates</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Stay informed about our most recent property developments and investment opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {updates.map((update) => (
            <Card key={update.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img 
                src={update.imageUrl} 
                alt={update.title} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="text-sm text-primary font-semibold mb-2">{update.date}</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{update.title}</h3>
                <p className="text-neutral-600 mb-4">{update.summary}</p>
                <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                  Read more 
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            View all updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Updates;
