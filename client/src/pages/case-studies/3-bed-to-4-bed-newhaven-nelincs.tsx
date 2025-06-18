import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, DollarSign, TrendingUp, CheckCircle, Quote, FileText } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Custom styles for Swiper pagination
const swiperStyles = `
  .swiper-pagination {
    position: absolute !important;
    bottom: 10px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: auto !important;
  }
  
  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
    margin: 0 4px !important;
  }
  
  .swiper-pagination-bullet-active {
    background: white !important;
  }
`;

const ThreeBedToFourBedNewhavenNelincs = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: "Case Study Visitor",
      email: formData.get("email"),
      message: "Downloaded Deal Checklist from 3-Bed to 4-Bed Newhaven case study",
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

  // Image arrays for before and after carousels
  const beforeImages = [
    { src: "/assets/case-studies/newhaven/before/1.jpg", alt: "Before - Property View 1" },
    { src: "/assets/case-studies/newhaven/before/2.jpg", alt: "Before - Property View 2" },
    { src: "/assets/case-studies/newhaven/before/3.jpg", alt: "Before - Property View 3" },
    { src: "/assets/case-studies/newhaven/before/4.jpg", alt: "Before - Property View 4" },
    { src: "/assets/case-studies/newhaven/before/5.jpg", alt: "Before - Property View 5" },
    { src: "/assets/case-studies/newhaven/before/6.jpg", alt: "Before - Property View 6" },
    { src: "/assets/case-studies/newhaven/before/7.jpg", alt: "Before - Property View 7" },
    { src: "/assets/case-studies/newhaven/before/8.jpg", alt: "Before - Property View 8" },
    { src: "/assets/case-studies/newhaven/before/9.jpg", alt: "Before - Property View 9" },
  ];

  const afterImages = [
    { src: "/assets/case-studies/newhaven/after/1.jpg", alt: "After - Property View 1" },
    { src: "/assets/case-studies/newhaven/after/2.jpg", alt: "After - Property View 2" },
    { src: "/assets/case-studies/newhaven/after/3.jpg", alt: "After - Property View 3" },
    { src: "/assets/case-studies/newhaven/after/4.jpg", alt: "After - Property View 4" },
    { src: "/assets/case-studies/newhaven/after/5.jpg", alt: "After - Property View 5" },
    { src: "/assets/case-studies/newhaven/after/6.jpg", alt: "After - Property View 6" },
    { src: "/assets/case-studies/newhaven/after/7.jpg", alt: "After - Property View 7" },
    { src: "/assets/case-studies/newhaven/after/8.jpg", alt: "After - Property View 8" },
    { src: "/assets/case-studies/newhaven/after/9.jpg", alt: "After - Property View 9" },
  ];

  const timelineEvents = [
    {
      icon: "👀",
      title: "First Viewing",
      date: "Nov 2023",
      description: "Initial assessment and provider match-up completed"
    },
    {
      icon: "🤝",
      title: "Offer Agreed",
      date: "Dec 2023",
      description: "Negotiation completed just before Christmas"
    },
    {
      icon: "🏗️",
      title: "Walkthrough with Builder",
      date: "Dec 2023",
      description: "Pre-completion site visit with builder to scope work"
    },
    {
      icon: "📜",
      title: "Exchange + Completion",
      date: "May 2024",
      description: "Delayed by title issues — resolved and completed in May"
    },
    {
      icon: "🛠️",
      title: "Renovation Completed",
      date: "Late June 2024",
      description: "6-week turnaround: DPC, reconfig, safety compliance"
    },
    {
      icon: "🏠",
      title: "Registered Provider Inspection",
      date: "June 2024",
      description: "Passed all compliance — property certified"
    },
    {
      icon: "💷",
      title: "Tenancy Began",
      date: "Late June 2024",
      description: "5-year social housing lease initiated"
    }
  ];

  return (
    <>
      <Helmet>
        <title>3-Bed to 4-Bed Conversion - Newhaven, North East Lincolnshire | KR Property Investments</title>
        <meta name="description" content="19.16% ROI social housing conversion. 3-bed mid-terrace converted to 4-bed family house with DPC, kitchen reconfig, fire safety compliance. £62k purchase, £750/month rental." />
      </Helmet>

      <style>{swiperStyles}</style>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link href="/case-studies">
            <a className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-6">
              ← Back to Case Studies
            </a>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              3-Bed to 4-Bed Conversion
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Newhaven, North East Lincolnshire
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#C58B25' }}>
              <TrendingUp className="w-4 h-4 mr-2" />
              19.16% ROCE
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#1A355E' }}>
                  Project Overview
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="font-semibold text-gray-700 w-32">Strategy:</div>
                    <div className="text-gray-600">Social Housing</div>
                  </div>
                  <div className="flex items-start">
                    <div className="font-semibold text-gray-700 w-32">Property Type:</div>
                    <div className="text-gray-600">3-bed mid-terrace (converted to 4-bed family house)</div>
                  </div>
                  <div className="flex items-start">
                    <div className="font-semibold text-gray-700 w-32">Location:</div>
                    <div className="text-gray-600">North East Lincolnshire</div>
                  </div>
                  <div className="flex items-start">
                    <div className="font-semibold text-gray-700 w-32">Summary:</div>
                    <div className="text-gray-600">A 3-bed property converted to a 4-bed social housing unit. Renovation included a DPC, reconfiguring the kitchen, installing fire doors, boxing in gas and electrical units to meet fire safety, and fireproofing beneath the stairs.</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#1A355E' }}>
                  Financial Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Purchase Price:</span>
                    <span className="font-semibold">£62,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Estimated Refurb:</span>
                    <span className="font-semibold">£9,500</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Acquisition Costs:</span>
                    <span className="font-semibold">£38,935</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Projected End Value:</span>
                    <span className="font-semibold">£75,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Projected Rental Income:</span>
                    <span className="font-semibold">£750/month</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Annual Income (net):</span>
                    <span className="font-semibold">£5,625</span>
                  </div>
                  <div className="flex justify-between py-3 bg-green-50 px-4 rounded-lg mt-4">
                    <span className="font-bold text-gray-800">ROCE:</span>
                    <span className="font-bold text-green-600 text-xl">19.16%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Comparison Chart */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#1A355E' }}>
              Return Comparison
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">High Street Bank</span>
                  <div className="flex items-center flex-1 mx-4">
                    <div 
                      className="h-8 bg-gray-300 rounded" 
                      style={{ width: '2%', minWidth: '20px' }}
                    ></div>
                    <span className="ml-2 font-semibold">0.2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Cash ISA</span>
                  <div className="flex items-center flex-1 mx-4">
                    <div 
                      className="h-8 bg-blue-400 rounded" 
                      style={{ width: '23.5%', minWidth: '20px' }}
                    ></div>
                    <span className="ml-2 font-semibold">4.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">This Deal</span>
                  <div className="flex items-center flex-1 mx-4">
                    <div 
                      className="h-8 rounded" 
                      style={{ 
                        width: '100%', 
                        background: 'linear-gradient(135deg, #C58B25 0%, #F97316 100%)'
                      }}
                    ></div>
                    <span className="ml-2 font-bold text-xl" style={{ color: '#C58B25' }}>19.16%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before and After Images */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Before Images */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1A355E' }}>
                  Before
                </h3>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                    className="h-80"
                  >
                    {beforeImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* After Images */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1A355E' }}>
                  After
                </h3>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                    className="h-80"
                  >
                    {afterImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Timeline */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#1A355E' }}>
              Project Timeline
            </h2>
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mr-6">
                    {event.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#1A355E' }}>
                        {event.title}
                      </h3>
                      <p className="text-sm font-medium mb-2" style={{ color: '#C58B25' }}>
                        {event.date}
                      </p>
                      <p className="text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Quote className="w-12 h-12 mx-auto mb-6" style={{ color: '#C58B25' }} />
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "This was my first hands-off social housing deal and it ran smoother than expected."
              </blockquote>
              <cite className="font-semibold" style={{ color: '#1A355E' }}>
                — Placeholder, Investor
              </cite>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16" style={{ backgroundColor: '#1A355E' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Build Your Property Portfolio?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book a free strategy call to discover how you can achieve similar returns
            </p>
            <Link href="/book-call">
              <Button 
                size="lg" 
                className="text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mb-8"
                style={{ backgroundColor: '#F97316' }}
              >
                Book a Free Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <div className="border-t border-blue-700 pt-8">
              <p className="text-blue-100 mb-6">
                Not ready yet? Download our Deal Checklist to learn what makes a deal compliant + profitable.
              </p>
              
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Button 
                      type="submit"
                      className="px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200"
                      style={{ backgroundColor: '#C58B25' }}
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Get Checklist
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg max-w-md mx-auto">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Thank you! Check your email for the Deal Checklist.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeBedToFourBedNewhavenNelincs;