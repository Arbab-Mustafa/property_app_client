import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, BarChart3, Users, CheckCircle } from "lucide-react";

const FindYouADeal = () => {
  const exampleDeals = [
    {
      type: "2-Bed Terraced Property",
      location: "Grimsby, Lincolnshire",
      investment: "£25,785",
      monthlyReturn: "£380",
      roi: "17.3%"
    },
    {
      type: "3-Bed HMO Conversion", 
      location: "Grimsby, Lincolnshire",
      investment: "£34,595",
      monthlyReturn: "£498",
      roi: "17.3%"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Find You a Deal | Property Investments</title>
        <meta name="description" content="Professional deal sourcing service for investors who want great opportunities without the time or expertise to find them themselves." />
        <meta property="og:title" content="Find You a Deal | Property Investments" />
        <meta property="og:description" content="Professional deal sourcing service for investors who want great opportunities without the time or expertise to find them themselves." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 pt-24" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1A355E' }}>Find You a Deal</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed" style={{ color: '#6B7280' }}>
            Professional deal sourcing for investors who want great opportunities 
            without the time or expertise to find them themselves.
          </p>
          <div className="flex justify-center">
            <Search className="h-20 w-20" style={{ color: '#F97316' }} />
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              What's Included
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Our comprehensive deal sourcing service covers everything you need for confident investment decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Search className="h-8 w-8" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#1A355E' }}>Deal Sourcing</h3>
              <p className="text-center leading-relaxed" style={{ color: '#6B7280' }}>
                We identify and present carefully vetted property investment opportunities that match your criteria and budget.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <BarChart3 className="h-8 w-8" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#1A355E' }}>Analysis and Risk Review</h3>
              <p className="text-center leading-relaxed" style={{ color: '#6B7280' }}>
                Complete financial analysis, market assessment, and risk evaluation to ensure every deal meets our strict criteria.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Users className="h-8 w-8" style={{ color: '#F97316' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#1A355E' }}>Professional Network Access</h3>
              <p className="text-center leading-relaxed" style={{ color: '#6B7280' }}>
                Connect with our trusted network of estate agents, mortgage brokers, solicitors, and building contractors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Deals Section */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              Example Deals
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              See the types of opportunities we source for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {exampleDeals.map((deal, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1A355E' }}>{deal.type}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Location:</span>
                    <span className="font-medium">{deal.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Total Investment:</span>
                    <span className="font-medium">{deal.investment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Monthly Cashflow:</span>
                    <span className="font-medium" style={{ color: '#F97316' }}>{deal.monthlyReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Annual ROI:</span>
                    <span className="font-bold text-lg" style={{ color: '#F97316' }}>{deal.roi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/case-studies">
              <Button variant="outline" className="text-white px-6 py-3 rounded-md hover:shadow-lg transition-all duration-300" style={{ borderColor: '#F97316', color: '#F97316', backgroundColor: 'transparent' }}>
                View Detailed Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              How to Get Started
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <span className="text-2xl font-bold" style={{ color: '#F97316' }}>1</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A355E' }}>Book a Call</h3>
                <p style={{ color: '#6B7280' }}>Schedule a consultation to discuss your investment goals and criteria.</p>
              </div>

              <div className="text-center">
                <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <span className="text-2xl font-bold" style={{ color: '#F97316' }}>2</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A355E' }}>We Source Deals</h3>
                <p style={{ color: '#6B7280' }}>Our team identifies and analyzes suitable investment opportunities for you.</p>
              </div>

              <div className="text-center">
                <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <span className="text-2xl font-bold" style={{ color: '#F97316' }}>3</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A355E' }}>Make Your Decision</h3>
                <p style={{ color: '#6B7280' }}>Review our comprehensive analysis and decide if the deal is right for you.</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/book-call">
                <Button className="text-white px-8 py-4 rounded-md text-lg hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#F97316' }}>
                  Book a Personal Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindYouADeal;