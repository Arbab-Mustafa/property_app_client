import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Building2, Home, Mail } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: "2-bed-social-housing-nelincs",
      title: "2-Bed Social Housing – North East Lincolnshire",
      type: "Mid-Terrace",
      strategy: "Light Modernisation / Social Housing",
      location: "North East Lincolnshire",
      summary: "Light refurb including paint, carpets, cooker installation and boundary work readied this mid-terrace for social housing tenancy.",
      roi: "33.13% ROI",
      link: "/case-studies/2-bed-social-housing-nelincs"
    },
    {
      id: "3-bed-to-4-bed-newhaven-nelincs",
      title: "3-Bed to 4-Bed Conversion – Newhaven, North East Lincolnshire",
      type: "Mid-Terrace",
      strategy: "Social Housing",
      location: "North East Lincolnshire",
      summary: "A 3-bed property converted to a 4-bed social housing unit. Renovation included a DPC, reconfiguring the kitchen, installing fire doors, boxing in gas and electrical units to meet fire safety, and fireproofing beneath the stairs.",
      roi: "19.16% ROI",
      link: "/case-studies/3-bed-to-4-bed-newhaven-nelincs"
    },
    {
      id: "4-bed-family-social-housing-nelincs",
      title: "4-Bed Family Social Housing – North East Lincolnshire",
      type: "Mid-Terrace",
      strategy: "BRR / Social Housing",
      location: "North East Lincolnshire",
      summary: "Converted from 3 to 4 bedrooms and furnished to social housing standards. Full compliance works and layout upgrades secured a 5-year tenancy.",
      roi: "17.67% ROI",
      link: "/case-studies/4-bed-family-social-housing-nelincs"
    }
  ];

  const getPropertyIcon = (type: string) => {
    if (type.includes("Victorian") || type.includes("Townhouse")) return Home;
    if (type.includes("Modern") || type.includes("Development")) return Building2;
    if (type.includes("HMO") || type.includes("Student")) return Building2;
    if (type.includes("Commercial") || type.includes("Mixed")) return Building2;
    if (type.includes("Portfolio")) return TrendingUp;
    return Building2;
  };

  return (
    <>
      <Helmet>
        <title>Our Property Investment Case Studies | Real Returns & Success Stories</title>
        <meta name="description" content="Explore real-world examples of how we help investors achieve strong returns through property. Each case study includes timelines, financial breakdowns, and insights." />
        <meta property="og:title" content="Our Property Investment Case Studies | Real Returns & Success Stories" />
        <meta property="og:description" content="Explore real-world examples of how we help investors achieve strong returns through property. Each case study includes timelines, financial breakdowns, and insights." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header Section */}
      <section className="py-16 pt-40 border-b" style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1A355E' }}>
            Our Property Investment Case Studies
          </h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
            Explore real-world examples of how we help investors achieve strong returns through property. 
            Each case study includes timelines, financial breakdowns, and insights from our successful investments.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {caseStudies.map((study) => {
              const IconComponent = getPropertyIcon(study.type);
              return (
                <div key={study.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
                  {/* Icon Header */}
                  <div className="p-6 text-center border-b border-gray-100" style={{ backgroundColor: '#FEF9F3' }}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#F3E8D1' }}>
                      <IconComponent className="h-8 w-8" style={{ color: '#C58B25' }} />
                    </div>
                    <div className="text-sm mb-1" style={{ color: '#6B7280' }}>{study.type}</div>
                    <h3 className="text-lg font-bold" style={{ color: '#1A355E' }}>{study.title}</h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="mb-4 leading-relaxed text-sm" style={{ color: '#6B7280' }}>
                      {study.summary}
                    </p>

                    {/* ROI Badge */}
                    <div className="mb-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm text-white" style={{ backgroundColor: '#C58B25' }}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {study.roi}
                      </span>
                    </div>

                    {/* CTA Button */}
                    {study.link !== "#" ? (
                      <Link href={study.link}>
                        <Button className="w-full text-white hover:opacity-90 group-hover:opacity-90 transition-all" style={{ backgroundColor: '#F97316' }}>
                          View Case Study
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full cursor-not-allowed" style={{ backgroundColor: '#E5E7EB', color: '#6B7280' }}>
                        Coming Soon
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ backgroundColor: '#1A355E' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Mail className="h-16 w-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to see deals first?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join our exclusive investor list to get early access to new property opportunities 
              and case studies before they're made public.
            </p>
            <Link href="/contact">
              <Button className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors" style={{ color: '#1A355E' }}>
                Join Our Investor List
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;