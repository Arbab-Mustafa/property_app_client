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

  // Image arrays for before and after carousels
  const beforeImages = [
    { src: "/assets/case-study-before/1.jpg", alt: "Before - Property View 1" },
    { src: "/assets/case-study-before/2.jpg", alt: "Before - Property View 2" },
    { src: "/assets/case-study-before/3.jpg", alt: "Before - Property View 3" },
    { src: "/assets/case-study-before/4.jpg", alt: "Before - Property View 4" },
    { src: "/assets/case-study-before/5.jpg", alt: "Before - Property View 5" },
    { src: "/assets/case-study-before/6.jpg", alt: "Before - Property View 6" },
    { src: "/assets/case-study-before/7.jpg", alt: "Before - Property View 7" },
  ];

  const afterImages = [
    { src: "/assets/case-study-after/1.jpg", alt: "After - Property View 1" },
    { src: "/assets/case-study-after/2.jpg", alt: "After - Property View 2" },
    { src: "/assets/case-study-after/3.jpg", alt: "After - Property View 3" },
    { src: "/assets/case-study-after/4.jpg", alt: "After - Property View 4" },
    { src: "/assets/case-study-after/5.jpg", alt: "After - Property View 5" },
    { src: "/assets/case-study-after/6.jpg", alt: "After - Property View 6" },
    { src: "/assets/case-study-after/7.jpg", alt: "After - Property View 7" },
  ];

  const timelineEvents = [
    {
      icon: "👀",
      title: "Initial Viewing + Provider Approval",
      date: "Nov 2023",
      description: "Property viewed and assessed for social housing suitability. Submitted to provider — pre-approved within 2 weeks."
    },
    {
      icon: "🤝",
      title: "Offer Accepted",
      date: "Dec 2023",
      description: "Negotiated and agreed with the vendor just before Christmas. Provider confirmed interest subject to compliance."
    },
    {
      icon: "🔍",
      title: "Builder Walkthrough + Costing",
      date: "Jan 2024",
      description: "Gained early access to allow builder inspection and received refurbishment cost estimates before exchange."
    },
    {
      icon: "🔄",
      title: "Exchange + Completion",
      date: "Mar 2024",
      description: "Title issues delayed legal progress. Completed in March and handed to build team for immediate start."
    },
    {
      icon: "🛠️",
      title: "Full Refurbishment Works",
      date: "Mar–May 2024",
      description: "2-month renovation: layout adjustment, redecoration, damp proofing, compliance works, and furnishings installed."
    },
    {
      icon: "🏠",
      title: "Registered Provider Compliance Check",
      date: "May 2024",
      description: "Final inspection by provider. Approved for 5-year tenancy — property handed over immediately."
    },
    {
      icon: "💷",
      title: "Rental Income Begins",
      date: "Jun 2024",
      description: "First rent payment received. 5-year social housing lease agreement officially underway."
    },
    {
      icon: "🏦",
      title: "Remortgage Completed",
      date: "Oct 2024",
      description: "Refinanced to release equity and improve return metrics. Achieved projected annual ROI target."
    },
    {
      icon: "📈",
      title: "Year 1: Fully Let + Operational",
      date: "Jun 2025 (Now)",
      description: "Approaching Year 1 of tenancy. Property running smoothly with full occupancy and secure rental income."
    }
  ];

  const financialBreakdown = [
    { label: "Purchase Price", value: "£62,000" },
    { label: "Refurb Cost", value: "£17,950" },
    { label: "Acquisition Cost", value: "£48,230" },
    { label: "Projected End Value", value: "£75,000" },
    { label: "Annual Rental Income", value: "£5,985" },
    { label: "Monthly Rental", value: "£780" }
  ];

  return (
    <>
      <style>{swiperStyles}</style>
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
            {/* Before Carousel */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-red-500 text-white p-4 text-center">
                <h3 className="text-xl font-bold">BEFORE</h3>
              </div>
              <div className="aspect-video bg-gray-200">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
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
              <div className="p-4 text-center">
                <p className="text-gray-600 font-medium">Original 3-Bed Configuration</p>
                <p className="text-sm text-gray-500 mt-2">Two reception rooms, converted one into a bedroom. Layout not suitable for tenants. Outdated safety standards and compliance.</p>
              </div>
            </div>

            {/* After Carousel */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-green-500 text-white p-4 text-center">
                <h3 className="text-xl font-bold">AFTER</h3>
              </div>
              <div className="aspect-video bg-gray-200">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
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
              <div className="p-4 text-center">
                <p className="text-gray-600 font-medium">Compliant 4-Bed Social Housing Unit</p>
                <p className="text-sm text-gray-500 mt-2">Full refurbishment: redecoration, carpets, damp proofing, kitchen fire door, boxed boiler/gas, fireboarded under stairs</p>
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
                    item.label === "Acquisition Cost" || item.label === "Annual Rental Income" ? 
                    "bg-white border-2 border-orange-500" : "bg-white"
                  }`}>
                    <span className="font-medium">{item.label}:</span>
                    <span className={`font-bold ${
                      item.label === "Acquisition Cost" || item.label === "Annual Rental Income" ? 
                      "text-orange-600" : ""
                    }`}>{item.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-green-100 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-green-800 font-bold text-xl">Annual ROI: 15.48%</span>
                </div>
                <p className="text-green-700">5-year social housing tenancy secured with registered provider</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Investment Returns Comparison Chart */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Comparing Investment Returns
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Chart Title and Labels */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">Annual Return (%)</h3>
                
                {/* Chart Bars */}
                <div className="space-y-6">
                  {/* High Street Bank Savings */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4">
                      <span className="text-sm font-medium text-gray-700">High Street Bank Savings</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative max-w-md">
                      <div 
                        className="bg-red-400 h-8 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold"
                        style={{ width: '1%', minWidth: '60px' }}
                      >
                        0.2%
                      </div>
                    </div>
                  </div>

                  {/* Cash ISA */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4">
                      <span className="text-sm font-medium text-gray-700">Cash ISA</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative max-w-md">
                      <div 
                        className="bg-yellow-400 h-8 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold"
                        style={{ width: '25%' }}
                      >
                        4.5%
                      </div>
                    </div>
                  </div>

                  {/* KR Social Housing Deal */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4">
                      <span className="text-sm font-medium text-gray-700">KR Property Investments</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative max-w-md">
                      <div 
                        className="bg-green-500 h-8 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold"
                        style={{ width: '100%' }}
                      >
                        17.67%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2 font-medium">Investment Type</p>
                <p className="text-sm text-gray-500 italic">
                  For illustrative purposes only. Based on UK averages as of 2025.
                </p>
              </div>
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
                      <span className="text-primary mr-3 mt-0.5 text-lg">£</span>
                      <span>Buy: Property purchased below market value</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-0.5 text-lg">£</span>
                      <span>Refurbish: Full compliance upgrade and conversion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-0.5 text-lg">£</span>
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
      {/* CTA Section */}
      <section className="py-16 bg-white">
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
      {/* Soft CTA Block with Download Option */}
      <section className="py-16 bg-gray-50">
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
                    className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold whitespace-nowrap pl-[24px] pr-[24px] pt-[26px] pb-[26px]"
                  >
                    🎁 Send Me the Checklist
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FourBedFamilySocialHousingNelincs;