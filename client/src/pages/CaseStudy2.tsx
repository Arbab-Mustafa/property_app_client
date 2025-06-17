import { Helmet } from "react-helmet";
import React from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import FinancialTable from "@/components/CaseStudyPage/FinancialTable";
import ProjectSummary from "@/components/CaseStudyPage/ProjectSummary";
import ScopeOfWorks from "@/components/CaseStudyPage/ScopeOfWorks";
import GoogleMapEmbed from "@/components/CaseStudyPage/GoogleMapEmbed";

// Import the case study images
import propertyImage from "../assets/case-studies/18.jpg";
import floorplansImage from "../assets/case-studies/20.jpg";

const CaseStudy2 = () => {
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
        <title>3 Bed Converted to 4 Bed HMO | KR Property Investments</title>
        <meta name="description" content="Detailed case study of our HMO property investment in Grimsby with complete financial breakdown and returns analysis." />
        <meta property="og:title" content="3 Bed Converted to 4 Bed HMO | KR Property Investments" />
        <meta property="og:description" content="Detailed case study of our HMO property investment in Grimsby with complete financial breakdown and returns analysis." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-white">
        {/* Hero/Header Section */}
        <div className="relative">
          <div className="w-full h-[500px] overflow-hidden">
            <img 
              src={propertyImage}
              alt="3 Bed Converted to 4 Bed HMO" 
              className="w-full h-full object-cover object-center scale-110"
            />
          </div>
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/70 to-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-bold text-white mb-6">
                  3 Bed Converted to 4 Bed HMO
                </h1>
                <p className="text-xl text-white mb-8">
                  A detailed case study of our successful HMO conversion in Grimsby.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back to Case Studies Button */}
          <div className="mb-10">
            <Link href="/case-studies">
              <a className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </a>
            </Link>
          </div>
          
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
                  This property is located in Grimsby, Lincolnshire, an area with strong rental demand and excellent investment potential for both family homes and HMOs.
                </p>
                <p className="text-white mb-4">
                  The location offers good transport links, with access to local amenities and schools, making it an attractive option for families and tenants.
                </p>
                <p className="text-white mb-4">
                  Property prices in this area remain affordable, allowing for higher yields compared to many other parts of the UK.
                </p>
              </div>
              <div className="md:w-1/2">
                <GoogleMapEmbed 
                  address="Grimsby, Lincolnshire, UK" 
                  height="350px" 
                  borderRadius="8px"
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
          
          {/* HMO Strategy Section */}
          <div className="bg-blue-500 p-8 rounded-lg shadow-md mb-10 text-white">
            <h2 className="text-3xl font-bold mb-4">
              HMO Strategy & Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Increased Rental Income</h3>
                <p className="mb-4">
                  By converting this property to a 4-bedroom HMO, we've maximized the rental income potential compared to a single-let property, resulting in stronger cash flow and returns.
                </p>
                <h3 className="text-xl font-bold mb-2">Reduced Void Risk</h3>
                <p>
                  Multiple tenants mean if one room becomes vacant, you still have rental income from the other rooms, reducing the financial impact of void periods.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Long-Term Security</h3>
                <p className="mb-4">
                  Our 10-year lease with a Registered Provider offers exceptional security compared to typical 6-12 month assured shorthold tenancies.
                </p>
                <h3 className="text-xl font-bold mb-2">Professional Management</h3>
                <p>
                  All tenant management is handled by the Registered Provider, eliminating the typical day-to-day landlord responsibilities and hassles of HMO management.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="flex justify-center my-16">
            <Link href="/contact" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 shadow-lg">
              Join To See Property Deals 1st
            </Link>
          </div>
          
          {/* Back to Case Studies Button */}
          <div className="flex justify-center mb-10">
            <Link href="/case-studies">
              <a className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudy2;