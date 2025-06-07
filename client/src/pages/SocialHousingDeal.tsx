import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, DollarSign, TrendingUp, CheckCircle, Quote, Home, Shield, Users } from "lucide-react";

const SocialHousingDeal = () => {
  const timelineEvents = [
    {
      icon: "🔍",
      title: "First Viewing",
      date: "Nov 2023",
      description: "Property identified and initial assessment completed"
    },
    {
      icon: "🤝",
      title: "Sale Agreed",
      date: "Dec 2023",
      description: "Purchase terms negotiated and agreed with seller"
    },
    {
      icon: "🏠",
      title: "Completion & Renovation Start",
      date: "Mar 2024",
      description: "Property purchase completed and refurbishment commenced"
    },
    {
      icon: "✅",
      title: "Registered Provider Check-In & Handover",
      date: "May 2024",
      description: "Property inspected and approved by registered provider"
    },
    {
      icon: "💷",
      title: "Rent Begins on 5-Year Lease",
      date: "May 2024",
      description: "Tenant moved in and rental income commenced"
    }
  ];

  const financialBreakdown = [
    { label: "Purchase Price", value: "£120,000" },
    { label: "Refurb Cost", value: "£25,000" },
    { label: "Total Investment", value: "£145,000" },
    { label: "Monthly Rent", value: "£1,425" },
    { label: "Annual Income", value: "£17,100" },
    { label: "Cash-on-Cash Return", value: "27%" }
  ];

  const beforeConditions = [
    "Originally a 3-bedroom, 2-reception house",
    "One large open-plan reception space (wall had been knocked through)",
    "Outdated layout for HMO/social standards",
    "Damp issues present",
    "No furnishings, no blinds/curtains",
    "Exposed boiler, consumer unit, and gas meter"
  ];

  const renovationWork = [
    "Rebuilt wall to convert receptions back to 2 rooms",
    "Created 4th bedroom",
    "DPC to address damp",
    "Fireboarded under stairs, boiler, gas meter, and consumer unit",
    "Fire safety kitchen door installed",
    "Lockable bedroom doors (thumb turn locks)",
    "Fully furnished with blinds and curtains",
    "Decorated and carpeted throughout"
  ];

  const dealStructure = [
    "100% investor-funded (purchase + refurb)",
    "All legal/compliance included",
    "Lease fully managed by registered provider",
    "No tenant contact required by investor"
  ];

  return (
    <>
      <Helmet>
        <title>Long-Term Social Housing Case Study | 3-Bed to 4-Bed Conversion</title>
        <meta name="description" content="See how we converted a 3-bed house to 4-bed social housing with a 5-year lease, delivering 27% cash-on-cash returns with zero tenant management." />
        <meta property="og:title" content="Long-Term Social Housing Case Study | 3-Bed to 4-Bed Conversion" />
        <meta property="og:description" content="See how we converted a 3-bed house to 4-bed social housing with a 5-year lease, delivering 27% cash-on-cash returns with zero tenant management." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 pt-24 text-white" style={{ background: 'linear-gradient(135deg, #1A355E 0%, #2B4A7D 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Home className="h-12 w-12 text-white/80" />
              <Shield className="h-12 w-12 text-white/80" />
              <Users className="h-12 w-12 text-white/80" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Long-Term Social Housing
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 text-white/90">
            3-Bed to 4-Bed Conversion in North East Lincolnshire
          </h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-white/80">
            A secure, long-term investment backed by a 5-year lease with a registered provider. 
            This buy-and-hold project delivers consistent returns and requires zero tenant management.
          </p>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>Investment Overview</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Complete financial breakdown of this social housing investment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {financialBreakdown.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="text-center">
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#6B7280' }}>{item.label}</h4>
                  <div className="text-2xl font-bold" style={{ color: '#F97316' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>Before & After Transformation</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Complete renovation and compliance work required for social housing standards
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Before Section */}
            <div className="bg-red-50 p-8 rounded-lg border border-red-100">
              <h3 className="text-2xl font-bold mb-6 text-red-800">Before</h3>
              <ul className="space-y-3">
                {beforeConditions.map((condition, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-red-700">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Section */}
            <div className="bg-green-50 p-8 rounded-lg border border-green-100">
              <h3 className="text-2xl font-bold mb-6 text-green-800">Compliance & Renovation Work</h3>
              <ul className="space-y-3">
                {renovationWork.map((work, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-green-700">{work}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>Project Timeline</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              From initial viewing to rental income in 6 months
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
              
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: '#FFF7ED' }}>
                        <span className="text-2xl">{event.icon}</span>
                      </div>
                      <h4 className="text-lg font-bold mb-2" style={{ color: '#1A355E' }}>{event.title}</h4>
                      <p className="text-sm font-medium mb-2" style={{ color: '#F97316' }}>{event.date}</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: '#F97316' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deal Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>Deal Structure</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Hassle-free investment with professional management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {dealStructure.map((item, index) => (
              <div key={index} className="flex items-center p-6 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" style={{ color: '#F97316' }} />
                <span className="text-lg" style={{ color: '#1A355E' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-12 w-12 mx-auto mb-6" style={{ color: '#C58B25' }} />
            <blockquote className="text-2xl md:text-3xl font-medium mb-6 italic" style={{ color: '#1A355E' }}>
              "Stable income and genuine social impact — exactly what I was looking for."
            </blockquote>
            <cite className="text-lg font-medium" style={{ color: '#6B7280' }}>
              — A. Begum, Investor
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ backgroundColor: '#1A355E' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to invest in social housing projects like this?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Discover more secure, long-term investment opportunities with guaranteed rental income 
              and zero tenant management required.
            </p>
            <Link href="/book-call">
              <Button className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors" style={{ color: '#1A355E' }}>
                Book a Free Call
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialHousingDeal;