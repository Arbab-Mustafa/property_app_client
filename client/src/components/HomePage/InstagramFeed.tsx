import { instagramPosts } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const InstagramFeed = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }} id="wp-content-why-invest">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>Why We Invest In Property</h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
            Property investment offers security, passive income, and long-term growth potential.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1A355E' }}>Long-Term Wealth</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#6B7280' }}>
                Property investment is one of the most reliable ways to build long-term wealth. Unlike other investment types, property has historically maintained value through market fluctuations and provides both capital growth and income opportunities.
              </p>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1A355E' }}>Inflation Protection</h3>
              <p className="leading-relaxed" style={{ color: '#6B7280' }}>
                Property is a tangible asset that typically appreciates at or above the rate of inflation, protecting your wealth from devaluation over time. While cash savings lose purchasing power, property investments often gain value.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1A355E' }}>Steady Cash Flow</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#6B7280' }}>
                Our social housing focused properties provide reliable monthly income from both rental payments and government schemes. This creates a more stable investment compared to stock market volatility.
              </p>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1A355E' }}>Social Impact</h3>
              <p className="leading-relaxed" style={{ color: '#6B7280' }}>
                By investing in social housing, we're not just creating financial returns but also making a positive impact on communities by providing quality housing where it's needed most. This investment approach offers both financial and social returns.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <Card key={post.id} className="instagram-post overflow-hidden rounded-lg shadow-md hover:shadow-lg transition">
              <img 
                src={post.imageUrl} 
                alt="Property investment project" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-3 bg-white">
                <p className="text-sm truncate" style={{ color: '#6B7280' }}>{post.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="#" 
            className="inline-flex items-center font-semibold hover:underline transition-colors duration-200"
            style={{ color: '#F97316' }}
          >
            View our property portfolio
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
