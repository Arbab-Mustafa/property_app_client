import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, User, Tag, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Updates = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const blogPosts = [
    {
      id: 1,
      title: "UK Property Market Outlook for 2024: Key Trends to Watch",
      date: "December 15, 2024",
      summary:
        "Interest rates are stabilizing, and regional markets are showing renewed strength. We explore the opportunities emerging in Manchester, Birmingham, and Liverpool for savvy investors.",
      category: "Market Insights",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "5 Essential Tips for First-Time Property Investors",
      date: "December 8, 2024",
      summary:
        "Starting your property investment journey? Our expert team shares the fundamental strategies that help new investors avoid common pitfalls and maximize returns from day one.",
      category: "Investor Tips",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "How We Achieved 18.5% ROI on Our Latest HMO Project",
      date: "December 1, 2024",
      summary:
        "A detailed breakdown of our recent Leeds HMO conversion project, including renovation costs, rental yields, and the strategic decisions that drove exceptional returns.",
      category: "Property Trends",
      readTime: "6 min read",
    },
  ];

  const categories = [
    "Market Insights",
    "Investor Tips",
    "Property Trends",
    "Case Studies",
    "Economic Updates",
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NEWSLETTER}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            source: "updates-page",
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Thank you for subscribing!",
          description: "You'll receive our latest insights and updates.",
        });
        setEmail("");
      } else {
        const errorData = await response.json();
        if (
          errorData.message &&
          errorData.message.includes("already subscribed")
        ) {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw new Error("Failed to subscribe");
        }
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "Failed to subscribe to the newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Latest Insights from KR Property Investments | Blog & Updates
        </title>
        <meta
          name="description"
          content="Stay informed with updates on the UK property market, investor tips, and economic insights. We post regularly to help you grow your knowledge and your wealth."
        />
        <meta
          property="og:title"
          content="Latest Insights from KR Property Investments | Blog & Updates"
        />
        <meta
          property="og:description"
          content="Stay informed with updates on the UK property market, investor tips, and economic insights. We post regularly to help you grow your knowledge and your wealth."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights from KR Property Investments
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Stay informed with updates on the UK property market, investor tips,
            and economic insights. We post regularly to help you grow your
            knowledge and your wealth.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    {/* Category and Date */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors">
                      <Link href="/post.html">
                        <a className="cursor-pointer">{post.title}</a>
                      </Link>
                    </h2>

                    {/* Summary */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.summary}
                    </p>

                    {/* Read More Link */}
                    <Link href="/post.html">
                      <a className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8 py-3">
                Load More Posts
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <div className="text-center mb-6">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get weekly insights and exclusive property opportunities
                    delivered to your inbox.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    Subscribe to Newsletter
                  </Button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href="#"
                      className="block py-2 px-3 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    KR Property Investments Team
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our experienced team of property investment professionals
                    shares insights, market analysis, and proven strategies to
                    help you succeed in property investment.
                  </p>
                  <div className="mt-4">
                    <Link href="/about">
                      <Button variant="outline" size="sm">
                        Learn More About Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Case Studies */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Recent Case Studies
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <Link href="/case-studies/manchester-flip">
                      <a className="text-primary hover:text-primary/80 font-medium text-sm">
                        Manchester Property Flip - 12.2% Return
                      </a>
                    </Link>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <Link href="/case-studies/property-2">
                      <a className="text-primary hover:text-primary/80 font-medium text-sm">
                        Birmingham HMO Conversion - 17.3% ROI
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/case-studies">
                      <a className="text-gray-600 hover:text-primary text-sm">
                        View All Case Studies →
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updates;
