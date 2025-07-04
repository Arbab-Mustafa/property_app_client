import { Helmet } from "react-helmet";
import React from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import FinancialTable from "@/components/CaseStudyPage/FinancialTable";
import ProjectSummary from "@/components/CaseStudyPage/ProjectSummary";
import ScopeOfWorks from "@/components/CaseStudyPage/ScopeOfWorks";
import GoogleMapEmbed from "@/components/CaseStudyPage/GoogleMapEmbed";

// Import the case study images
import caseStudy1Image from "@assets/Screenshot 2025-05-19 at 13.07.54.png";
import floorplansImage from "../assets/case-studies/floorplan.png";

const CaseStudy1 = () => {
  // Property overview data
  const propertyOverviewItems = [
    { label: "GDV (estimated):", value: "£72,000.00" },
    { label: "Mortgage Loan (75%):", value: "£54,000.00" },
    { label: "Mortgage Payment (6%):", value: "£270.00 per month" },
    { label: "Rent:", value: "£650.00 per month" },
    { label: "Management:", value: "£0.00" },
    { label: "Monthly Cashflow:", value: "£380.00" }
  ];

  // Upfront cost data
  const upfrontCostItems = [
    { label: "Purchase Price:", value: "£55,700.00" },
    { label: "Mortgage Loan (75%):", value: "£41,775.00" },
    { label: "Deposit (25%):", value: "£13,925.00" },
    { label: "Refurbishment:", value: "£5,000.00" },
    { label: "White Goods:", value: "£1,000.00" },
    { label: "Stamp Duty:", value: "£2,785.00" },
    { label: "Survey:", value: "£500.00" },
    { label: "Legal Fees:", value: "£2,000.00" },
    { label: "Broker Fees:", value: "£500.00" },
    { label: "Other Fees:", value: "£200.00" }
  ];

  // ROI data
  const roiItems = [
    { label: "Back in the Bank (after 6-12 months):", value: "£12,100.00" },
    { label: "Estimated Money Left In:", value: "£13,685.00" },
    { label: "Potential Cash Flow Per Annum:", value: "£4,560.00" },
    { label: "Return On Money Left In:", value: "33.32%" }
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
    "Improved insulation and energy efficiency",
    "Garden landscaping and fencing"
  ];

  // Project summary points
  const summaryPoints = [
    "Purchase price: £55,700",
    "Total renovation costs: £5,000",
    "Post-renovation value: £72,000",
    "Equity created: £16,300",
    "Monthly rental income: £650",
    "Monthly cashflow: £380",
    "Annual net cashflow: £4,560",
    "ROI: 33.32%"
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>2 Bed Mid-Terraced Property | KR Property Investments</title>
        <meta name="description" content="Detailed case study of our mid-terraced property investment in Grimsby with complete financial breakdown and returns analysis." />
        <meta property="og:title" content="2 Bed Mid-Terraced Property | KR Property Investments" />
        <meta property="og:description" content="Detailed case study of our mid-terraced property investment in Grimsby with complete financial breakdown and returns analysis." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Property Image with Overlay */}
      <div className="relative">
        <img 
          src={caseStudy1Image}
          alt="2 Bed Mid-Terraced Property" 
          className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end">
              <div className="bg-primary/80 p-6 rounded-lg max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Social Housing 2 Bedroom family house
                  </h1>
                </div>

                <Link href="/case-studies">
                  <a className="inline-flex items-center font-medium text-white hover:text-white/80">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Background Section */}
      <div className="bg-orange-400 p-8 shadow-md w-full">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="md:w-1/2 self-start pt-0">
            <h2 className="text-3xl leading-tight mt-0">
              <span className="font-normal">Project</span><br />
              <span className="font-bold">Background &<br />
              Deal Structure</span>
            </h2>
          </div>
          <div className="md:w-1/2">
            <p className="mb-4">
              A 2 bedroom mid-terraced property requiring modernisation, suited to provide housing for a family and leased to a charity on a long-term commercial lease.
            </p>
            <p className="mb-4">
              We have an established relationship with a charity who expressed interest in this property, after passing all their criteria checks.
            </p>
            <p className="mb-4">
              The charity offered a 5 year lease on this unit, following renovation and having onboarded the property.
            </p>
          </div>
        </div>
      </div>
      
      {/* Location Section */}
      <div className="bg-green-500 p-8 shadow-md w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Location
          </h2>
          
          <div className="mb-6">
            <GoogleMapEmbed 
              address="Grimsby, Lincolnshire, UK" 
              height="350px" 
              borderRadius="8px"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <p className="text-white mb-4">
                This property is located in Grimsby, Lincolnshire, an area with strong rental demand and excellent investment potential for family homes.
              </p>
            </div>
            <div className="md:w-1/3">
              <p className="text-white mb-4">
                The location offers good transport links, with access to local amenities and schools, making it an attractive option for families and tenants.
              </p>
            </div>
            <div className="md:w-1/3">
              <p className="text-white mb-4">
                Property prices in this area remain affordable, allowing for higher yields compared to many other parts of the UK.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floorplans Section */}
      <div className="bg-black p-8 shadow-md w-full">
        <div className="max-w-6xl mx-auto">
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
      </div>
      
      {/* Property Overview */}
      <FinancialTable 
        title="Property Overview" 
        items={propertyOverviewItems} 
        summary={{ label: "Monthly Cashflow", value: "£380.00" }}
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />
      
      {/* Scope of Works */}
      <ScopeOfWorks workItems={scopeItems} />
      
      {/* Financial Data */}
      <FinancialTable 
        title="Upfront Cost" 
        items={upfrontCostItems} 
        summary={{ label: "Total Acquisition Costs", value: "£25,785.00" }}
        backgroundColor="bg-orange-400"
      />
      
      <FinancialTable 
        title="Return On Investment" 
        items={roiItems} 
        summary={{ label: "Return On Money Left In", value: "33.32%" }}
        backgroundColor="bg-green-500"
        textColor="text-white"
      />
      
      {/* Deal Summary */}
      <ProjectSummary items={summaryPoints} />
      
      <div className="bg-white p-8 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Call to Action */}
          <div className="flex justify-center my-8">
            <Link href="/contact">
              <a className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 shadow-lg">
                Join To See Property Deals 1st
              </a>
            </Link>
          </div>
          
          {/* Back to Case Studies Button */}
          <div className="flex justify-center mt-4">
            <Link href="/case-studies">
              <a className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy1;