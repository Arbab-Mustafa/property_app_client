import { Helmet } from "react-helmet";
import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import CaseStudyHeader from "@/components/CaseStudyPage/CaseStudyHeader";
import FinancialTable from "@/components/CaseStudyPage/FinancialTable";
import ProjectSummary from "@/components/CaseStudyPage/ProjectSummary";
import ScopeOfWorks from "@/components/CaseStudyPage/ScopeOfWorks";

// Import the case study images
import propertyImage from "../assets/case-studies/18.jpg";
import locationImage from "../assets/case-studies/19.jpg";
import floorplansImage from "../assets/case-studies/20.jpg";
import upfrontCostImage from "../assets/case-studies/24.jpg";
import cashflowImage from "../assets/case-studies/25.jpg";
import roiImage from "../assets/case-studies/26.jpg";
import caseStudy1Image from "../assets/case-studies/case-study-1.jpg";

const CaseStudies = () => {
  // Upfront cost data
  const upfrontCostItems = [
    { label: "Purchase Price:", value: "£27,500.00" },
    { label: "Stamp Duty:", value: "£825.00" },
    { label: "Legal Fees:", value: "£1,500.00" },
    { label: "Survey Fees:", value: "£440.00" },
    { label: "Initial Refurbishment:", value: "£13,900.00" }
  ];

  // Cashflow data
  const cashflowItems = [
    { label: "Annual Rental Income:", value: "£15,600.00" },
    { label: "Mortgage Interest:", value: "-£3,780.00" },
    { label: "Service Charge:", value: "-£480.00" },
    { label: "Property Management:", value: "-£1,560.00" },
    { label: "Annual Net Cashflow:", value: "£5,985.00" }
  ];

  // ROI data
  const roiItems = [
    { label: "Money Left In:", value: "£34,595.00" },
    { label: "Annual Rental Income:", value: "£15,600.00" },
    { label: "Annual Expenses:", value: "£5,820.00" },
    { label: "Annual Net Cashflow:", value: "£5,985.00" },
    { label: "Return On Investment:", value: "17.30%" }
  ];

  // Scope of work items
  const scopeItems = [
    "Full property refurbishment",
    "New kitchen installation",
    "New bathroom installation",
    "Complete redecoration throughout",
    "New flooring throughout",
    "New windows and external doors",
    "Electrical rewire and certification",
    "Gas safety certification",
    "Convert one room to create a 4th bedroom",
    "Garden landscaping and fencing"
  ];

  // Project summary points
  const summaryPoints = [
    "Purchase price: £27,500",
    "Total renovation costs: £13,900",
    "Post-renovation value: £75,000",
    "Equity created: £33,600",
    "10-year commercial lease with Registered Provider",
    "Annual rental income: £15,600",
    "Net annual cashflow: £5,985",
    "ROI: 17.30%"
  ];

  return (
    <>
      <Helmet>
        <title>Case Studies | KR Property Investments</title>
        <meta name="description" content="Review our successful property investments with detailed financial breakdowns and returns analysis." />
        <meta property="og:title" content="Case Studies | KR Property Investments" />
        <meta property="og:description" content="Review our successful property investments with detailed financial breakdowns and returns analysis." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-white">
        {/* Hero/Header Section */}
        <div className="relative">
          <img 
            src={caseStudy1Image}
            alt="Property Investment Case Studies" 
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Our Property Investment Case Studies
                </h1>
                <p className="text-xl text-white mb-8">
                  Explore our successful property investments with detailed financial breakdowns and returns analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Case Studies Overview Section */}
        <div className="bg-gray-50 py-16 w-full">
          <div className="w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Recent Property Deals</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                <div className="relative">
                  <img 
                    src={caseStudy1Image} 
                    alt="3 Bed Mid-Terraced Property" 
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold text-sm">
                    ROI: 15.2%
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">3 Bed Mid-Terraced Property</h3>
                  <p className="text-gray-600 mb-4">A mid-terraced property in Grimsby converted to provide housing for a family with long-term commercial lease.</p>
                  
                  <div className="bg-orange-100 p-3 rounded-md mb-4">
                    <p className="text-sm font-medium">Current Value: <span className="font-bold">£68,500</span></p>
                  </div>
                  
                  <button onClick={() => document.getElementById('featured-case-study')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                    View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Case Study 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                <div className="relative">
                  <img 
                    src={propertyImage} 
                    alt="3 Bed Converted to 4 Bed" 
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold text-sm">
                    ROI: 17.3%
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">3 Bed Converted to 4 Bed HMO</h3>
                  <p className="text-gray-600 mb-4">A 3 bedroom mid-terraced property requiring modernisation, converted into a 4 bedroom HMO with excellent returns.</p>
                  
                  <div className="bg-orange-100 p-3 rounded-md mb-4">
                    <p className="text-sm font-medium">Current Value: <span className="font-bold">£75,000</span></p>
                  </div>
                  
                  <button onClick={() => document.getElementById('featured-case-study')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                    View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Case Study 3 - Coming Soon */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 opacity-75">
                <div className="relative">
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">New Case Study Coming Soon</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">New Property Investment</h3>
                  <p className="text-gray-600 mb-4">We're working on our next successful property investment. Contact us to learn about upcoming opportunities.</p>
                  
                  <div className="mt-10">
                    <Link href="/contact">
                      <a className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Case Study */}
        <div id="featured-case-study">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Project Background Section */}
            <div className="bg-orange-400 p-8 rounded-lg shadow-md mb-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">
                    Project Background & Deal Structure
                  </h2>
                  <p className="mb-4">
                    A 3 bedroom mid-terraced property requiring modernisation, ideally suited for conversion into a 4 bedroom house of multiple occupancy (HMO) and leased to a Registered Provider on a long-term commercial lease.
                  </p>
                  <p className="mb-4">
                    We have an established relationship with a Registered Provider (RP) who expressed interest in this property, after passing all their criteria checks.
                  </p>
                  <p className="mb-4">
                    The RP offered a 10 year lease on this unit, following renovation and having onboarded the property.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src={propertyImage} 
                    alt="Property front view" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Location Section */}
            <div className="bg-green-500 p-8 rounded-lg shadow-md mb-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Location
                  </h2>
                  <p className="text-white mb-4">
                    A 3 bedroom mid-terraced property requiring modernisation, ideally suited for conversion into a 4 bedroom house of multiple occupancy (HMO) and leased to a Registered Provider on a long-term commercial lease.
                  </p>
                  <p className="text-white mb-4">
                    We have an established relationship with a Registered Provider (RP) who expressed interest in this property, after passing all their criteria checks.
                  </p>
                  <p className="text-white mb-4">
                    The RP offered a 10 year lease on this unit, following renovation and having onboarded the property.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src={locationImage} 
                    alt="Property location map" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Floorplans Section */}
            <div className="bg-black p-8 rounded-lg shadow-md mb-10">
              <h2 className="text-3xl font-bold mb-6 text-white text-center">
                Floorplans
              </h2>
              <div className="flex justify-center">
                <img 
                  src={floorplansImage} 
                  alt="Property floorplans" 
                  className="w-full max-w-3xl h-auto rounded-lg"
                />
              </div>
            </div>
            
            {/* Scope of Works */}
            <ScopeOfWorks workItems={scopeItems} />
            
            {/* Financial Data */}
            <FinancialTable 
              title="Upfront Cost" 
              items={upfrontCostItems} 
              summary={{ label: "Acquisition Costs", value: 44165.00 }}
              backgroundColor="bg-orange-400"
            />
            
            <FinancialTable 
              title="Cashflow Numbers" 
              items={cashflowItems} 
              summary={{ label: "Cashflow", value: "£498.75 PCM" }}
              backgroundColor="bg-cream-100"
              textColor="text-black"
            />
            
            <FinancialTable 
              title="Return On Investment" 
              items={roiItems} 
              summary={{ label: "Return On Money Left In", value: "17.30%" }}
              backgroundColor="bg-orange-400"
            />
            
            {/* Deal Summary */}
            <ProjectSummary items={summaryPoints} />
            
            {/* Call to Action */}
            <div className="flex justify-center my-16">
              <Link href="/contact">
                <a className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 shadow-lg">
                  Join To See Property Deals 1st
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;