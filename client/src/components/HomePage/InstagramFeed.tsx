import { instagramPosts } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const InstagramFeed = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Follow Our Journey</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Stay updated with our latest property projects and investments.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <Card key={post.id} className="instagram-post overflow-hidden rounded-lg shadow-md hover:shadow-lg transition">
              <img 
                src={post.imageUrl} 
                alt="Instagram post" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-3 bg-white">
                <p className="text-sm text-neutral-600 truncate">{post.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="#" 
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            View our Instagram feed
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
