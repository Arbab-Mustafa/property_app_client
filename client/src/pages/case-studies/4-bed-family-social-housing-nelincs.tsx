import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, DollarSign, TrendingUp, CheckCircle, Quote, FileText } from "lucide-react";
import { useState } from "react";

const FourBedFamilySocialHousingNelincs = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: "Case Study Visitor",
      email: formData.get("email"),
      message: "Downloaded Deal Checklist from 4-Bed Family Social Housing case study",
    };

    const res = await fetch("/api/send-deal-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setEmailSubmitted(true);
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const timelineEvents = [
    {
      icon: "👀",
      title: "First viewing",
      date: "Nov 2023",
      description: "Property identified and initial assessment completed"
    },
    {
      icon: "🤝",
      title: "Offer agreed",
      date: "Dec 2023",
      description: "Purchase price negotiated and agreed with vendor"
    },
    {
      icon: "🔄",
      title: "Exchanged + refurb started",
      date: "Mar 2024",
      description: "Exchange completed and full refurbishment commenced"
    },
    {
      icon: "🏠",
      title: "Registered Provider walkthrough",
      date: "May 2024",
      description: "Social housing compliance inspection and approval"
    },
    {
      icon: "💷",
      title: "Rental income begins",
      date: "June 2024",
      description: "5-year social housing tenancy commenced"
    }
  ];

  const financialBreakdown = [
    { label: "Purchase Price", value: "£XXX" },
    { label: "Refurb Cost", value: "£XXX" },
    { label: "Total Investment", value: "£XXX" },
    { label: "Annual Rental Income", value: "£XXX" },
    { label: "Projected ROI", value: "17.67%" },
    { label: "Status", value: "Buy & Hold, 5-Year Let Agreed" }
  ];

  return (
    <>
      <Helmet>
        <title>4-Bed Family Social Housing – North East Lincolnshire Case Study | BRR Investment Success</title>
        <meta name="description" content="Detailed case study of our 4-bed family social housing project in North East Lincolnshire showing 17.67% ROI through BRR strategy and conversion." />
        <meta property="og:title" content="4-Bed Family Social Housing – North East Lincolnshire Case Study | BRR Investment Success" />
        <meta property="og:description" content="Detailed case study of our 4-bed family social housing project in North East Lincolnshire showing 17.67% ROI through BRR strategy and conversion." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 pt-20">
            4-Bed Family Social Housing<br />
            North East Lincolnshire
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            A successful BRR social housing project converting a 3-bed to 4-bed property, 
            delivering strong returns through strategic refurbishment and 5-year social housing tenancy.
          </p>
        </div>
      </section>

      {/* Project Overview - Before/After Images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Project Overview
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Before Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-red-500 text-white p-4 text-center">
                <h3 className="text-xl font-bold">BEFORE</h3>
              </div>
              <div className="aspect-video bg-gray-200 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-10 w-10 text-gray-500" />
                  </div>
                  <p className="text-gray-600 font-medium">Original 3-Bed Configuration</p>
                  <p className="text-sm text-gray-500 mt-2">Two reception rooms, converted one into a bedroom. Layout not suitable for tenants. Outdated safety standards and compliance.</p>
                </div>
              </div>
            </div>

            {/* After Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-green-500 text-white p-4 text-center">
                <h3 className="text-xl font-bold">AFTER</h3>
              </div>
              <div className="aspect-video bg-gray-200 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-gray-500" />
                  </div>
                  <p className="text-gray-600 font-medium">Compliant 4-Bed Social Housing Unit</p>
                  <p className="text-sm text-gray-500 mt-2">Full refurbishment: redecoration, carpets, damp proofing, kitchen fire door, boxed boiler/gas, fireboarded under stairs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Project Timeline
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary hidden md:block"></div>
              
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow hidden md:block"></div>
                  
                  {/* Content */}
                  <div className={`bg-white rounded-lg shadow-md p-6 w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{event.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                        <p className="text-primary font-semibold">{event.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Breakdown */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Financial Breakdown
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                {financialBreakdown.map((item, index) => (
                  <div key={index} className={`flex justify-between items-center p-4 rounded-lg ${
                    item.label === "Projected ROI" ? "bg-primary text-white font-bold text-lg" : "bg-white"
                  }`}>
                    <span className="font-medium">{item.label}:</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-green-100 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-green-800 font-bold text-xl">Annual ROI: 17.67%</span>
                </div>
                <p className="text-green-700">5-year social housing tenancy secured with registered provider</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Comparison Chart */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ROI Comparison
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* High Street Bank Savings */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">High Street Bank Savings</h3>
                  <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-end justify-center">
                    <div className="bg-red-400 rounded-t w-16 flex items-center justify-center text-white font-bold text-sm" style={{ height: '8px' }}>
                      0.2%
                    </div>
                  </div>
                </div>

                {/* Cash ISA */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Cash ISA</h3>
                  <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-end justify-center">
                    <div className="bg-yellow-400 rounded-t w-16 flex items-center justify-center text-white font-bold text-sm" style={{ height: '25%' }}>
                      4.5%
                    </div>
                  </div>
                </div>

                {/* KR Social Housing Deal */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">KR Social Housing Deal</h3>
                  <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-end justify-center">
                    <div className="bg-green-500 rounded-t w-16 flex items-center justify-center text-white font-bold text-sm" style={{ height: '100%' }}>
                      17.67%
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500 italic">
                Illustrative returns based on current UK averages — for educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Deal Structure & Returns
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">BRR Strategy Implementation</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>Buy: Property purchased below market value</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>Refurbish: Full compliance upgrade and conversion</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>Refinance: Secured against improved rental value</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Social Housing Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>5-year guaranteed tenancy agreement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Zero tenant management required</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Stable, predictable rental income stream</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-16 w-16 text-white/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium mb-6 italic">
              "The social housing route gives me peace of mind with guaranteed income and no tenant headaches."
            </blockquote>
            <p className="text-xl text-white/90">– M. Thompson, Investor</p>
          </div>
        </div>
      </section>

      {/* Soft CTA Block with Download Option */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              📄 Not quite ready to book a call?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start by reviewing our Deal Checklist — the same tool our investors use to evaluate deals like this one.
            </p>
            <p className="text-md text-gray-600 mb-8">
              Get it free by entering your email below.
            </p>

            {emailSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-green-600 font-semibold text-lg mb-2">
                  ✅ Checklist sent to your inbox!
                </div>
                <p className="text-gray-600">
                  <a 
                    href="https://drive.google.com/file/d/1P_hHhSY2RTOcDxpRuN3egPsff71S3Mtv/view?usp=sharing" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    Click here
                  </a> to download it directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email to get the checklist"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button 
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold whitespace-nowrap"
                  >
                    🎁 Send Me the Checklist
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Want to invest in deals like this?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our network of investors and get access to similar high-return property investment opportunities. 
            Book a free consultation to discuss your investment goals.
          </p>
          <Link href="/book-call">
            <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-semibold">
              Book a Free Call
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FourBedFamilySocialHousingNelincs;