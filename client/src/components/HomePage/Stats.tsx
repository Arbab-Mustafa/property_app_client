import { stats } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Credentials</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We bring experience, professional training, and proven results to every investment opportunity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="stat-card bg-white rounded-lg shadow-lg border-t-4 border-primary overflow-hidden"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
