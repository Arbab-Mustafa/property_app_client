import { Helmet } from "react-helmet";
import React from "react";
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

const CaseStudies = () => {
  // Upfront cost data
  const upfrontCostItems = [
    { label: "Purchase Price", value: 62000 },
    { label: "Deposit (25%)", value: 15500 },
    { label: "Stamp Duty", value: 1860 },
    { label: "Mortgage Loan", value: 46500 },
    { label: "Refurb", value: 14730 },
    { label: "Survey", value: 500 },
    { label: "Broker Fees", value: 500 },
    { label: "Legal Fee", value: 1500 },
  ];

  // Cashflow numbers data
  const cashflowItems = [
    { label: "GDV (estimated)", value: 75000 },
    { label: "Mortgage Loan", value: 56250 },
    { label: "Mortgage Payment (6% I/O)", value: 281.25 },
    { label: "Rent in", value: 780 },
    { label: "Management (0%)", value: 0 },
  ];

  // Return on investment data
  const roiItems = [
    { label: "Money Left In", value: 34590 },
    { label: "Money Back In The Bank", value: 9575 },
    { label: "Cash Flow Per Annum", value: 5985 },
  ];

  // Summary points
  const summaryPoints = [
    "Projected Revaluation: £80,000",
    "Actual Refinanced Value (6 months later): £75,000",
    "Funds Left in the Deal: £34,590",
    "Cash Back to Bank: £9,575"
  ];

  // Scope of works
  const scopeItems = [
    "Full rewire including Install Grade D1 or D2 LD1 Fire Alarm System",
    "Fire doors x 5",
    "New Boiler",
    "Double Glazing – fire escape windows x 3",
    "New Kitchen",
    "Bathroom – part replace suite",
    "Damp Proof Course",
    "Part Plaster and Part Skim",
    "Stud wall bedroom 3 – false divider room 2",
    "External door x 1",
    "Gutters replace front and rear",
    "Roof ridging tiles and chimney pointing and + lead flashing",
    "Decor throughout",
    "Flooring throughout",
    "Secure units in rear yard"
  ];

  return (
    <>
      <Helmet>
        <title>Case Studies | Property Investments</title>
        <meta name="description" content="Review our successful property investments case studies with detailed financial breakdowns and returns analysis." />
        <meta property="og:title" content="Property Investment Case Studies" />
        <meta property="og:description" content="Review our successful property investments with detailed financial breakdowns and returns analysis." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-white">
        {/* Hero/Header Section */}
        <div className="relative">
          <img 
            src={propertyImage}
            alt="3 Bed Converted to 4 Bed Family House" 
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-bold text-white mb-6">
                  3 Bed Converted to 4 Bed Family House
                </h1>
                <p className="text-xl text-white mb-8">
                  A detailed case study of our successful property investment in Grimsby.
                </p>
              </div>
            </div>
          </div>
        </div>
        
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
            <a 
              href="/contact" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 shadow-lg"
            >
              Join To See Property Deals 1st
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;