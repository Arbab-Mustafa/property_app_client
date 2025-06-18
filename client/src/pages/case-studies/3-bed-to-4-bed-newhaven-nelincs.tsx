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

  const financialBreakdown = [
    { label: "Purchase Price", value: "£62,000" },
    { label: "Estimated Refurb", value: "£9,500" },
    { label: "Acquisition Costs", value: "£38,935" },
    { label: "Projected End Value", value: "£75,000" },
    { label: "Projected Rental Income", value: "£750/month" },
    { label: "Annual Income (net)", value: "£5,625" },
    { label: "ROCE", value: "19.16%" }
  ];

  return (
    <>
      <Helmet>
        <title>3-Bed to 4-Bed Conversion – Newhaven, North East Lincolnshire Case Study | Property Investment Success</title>
        <meta name="description" content="Detailed case study of our Newhaven property conversion project showing 19.16% ROCE. See the complete timeline and financial breakdown." />
        <meta property="og:title" content="3-Bed to 4-Bed Conversion – Newhaven, North East Lincolnshire Case Study | Property Investment Success" />
        <meta property="og:description" content="Detailed case study of our Newhaven property conversion project showing 19.16% ROCE. See the complete timeline and financial breakdown." />
        <meta property="og:type" content="website" />
      </Helmet>

      <style>{swiperStyles}</style>

      {/* Page Header */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 pt-20">
            3-Bed Converted to <br />
            4-Bed Family House
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            A successful property conversion project in Newhaven, North East Lincolnshire, delivering strong returns 
            for our investors through strategic refurbishment and social housing compliance.
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
              <div className="relative h-80">
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
                  className="h-full"
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

            {/* After Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-green-500 text-white p-4 text-center">
                <h3 className="text-xl font-bold">AFTER</h3>
              </div>
              <div className="relative h-80">
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
                  className="h-full"
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
                    item.label === "ROCE" ? "bg-primary text-white font-bold text-lg" : "bg-white"
                  }`}>
                    <span className="font-medium">{item.label}:</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-green-100 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-green-800 font-bold text-xl">Return on Capital Employed: 19.16%</span>
                </div>
                <p className="text-green-700">Annual return on invested capital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Comparison Chart */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Return Comparison
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 w-32">High Street Bank</span>
                  <div className="flex items-center flex-1 mx-4">
                    <div 
                      className="h-8 bg-gray-300 rounded" 
                      style={{ width: '1%', minWidth: '20px' }}
                    ></div>
                    <span className="ml-2 font-semibold">0.2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 w-32">Cash ISA</span>
                  <div className="flex items-center flex-1 mx-4">
                    <div 
                      className="h-8 bg-blue-400 rounded" 
                      style={{ width: '23.5%', minWidth: '20px' }}
                    ></div>
                    <span className="ml-2 font-semibold">4.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 w-32">This Deal</span>
                  <div className="flex items-center flex-1 mx-4">
                    <div 
                      className="h-8 rounded" 
                      style={{ 
                        width: '100%', 
                        background: 'linear-gradient(135deg, #C58B25 0%, #F97316 100%)'
                      }}
                    ></div>
                    <span className="ml-2 font-bold text-xl text-primary">19.16%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-8 text-center">
              <Quote className="w-12 h-12 mx-auto mb-6 text-primary" />
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "This was my first hands-off social housing deal and it ran smoother than expected."
              </blockquote>
              <cite className="font-semibold text-gray-900">
                — Placeholder, Investor
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Property Portfolio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a free strategy call to discover how you can achieve similar returns
          </p>
          
          <Link href="/book-call">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mb-8"
            >
              Book a Free Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="border-t border-blue-700 pt-8 max-w-2xl mx-auto">
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
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-gray-900"
                  />
                  <Button 
                    type="submit"
                    className="bg-accent hover:bg-accent/90 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Get Checklist
                  </Button>
                </div>
              </form>
            ) : (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg max-w-md mx-auto">
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Thank you! Check your email for the Deal Checklist.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ThreeBedToFourBedNewhavenNelincs;