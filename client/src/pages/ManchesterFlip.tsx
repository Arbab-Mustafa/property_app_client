import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, DollarSign, TrendingUp, CheckCircle, Quote } from "lucide-react";

const ManchesterFlip = () => {
  const timelineEvents = [
    {
      icon: "🔍",
      title: "Deal sourced",
      date: "Jan 2024",
      description: "Property identified and due diligence completed"
    },
    {
      icon: "🛠️",
      title: "Renovation started",
      date: "Feb 2024",
      description: "Full refurbishment project commenced"
    },
    {
      icon: "🏁",
      title: "Refurb completed",
      date: "Apr 2024",
      description: "All renovation work finished to high standard"
    },
    {
      icon: "💷",
      title: "Sold",
      date: "Jun 2024",
      description: "Property successfully sold to end buyer"
    }
  ];

  const financialBreakdown = [
    { label: "Purchase Price", value: "£130,000" },
    { label: "Refurb Cost", value: "£20,000" },
    { label: "Total Investment", value: "£150,000" },
    { label: "Sold Price", value: "£190,000" },
    { label: "Gross Profit", value: "£40,000" },
    { label: "Return", value: "12.2% over 6 months" }
  ];

  return (
    <>
      <Helmet>
        <title>2-Bed Flat Flip – Manchester Case Study | Property Investment Success</title>
        <meta name="description" content="Detailed case study of our Manchester property flip project showing 12.2% return over 6 months. See the complete timeline and financial breakdown." />
        <meta property="og:title" content="2-Bed Flat Flip – Manchester Case Study | Property Investment Success" />
        <meta property="og:description" content="Detailed case study of our Manchester property flip project showing 12.2% return over 6 months. See the complete timeline and financial breakdown." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 pt-20">
            3 Bed Converted to <br />
            4 Bed Family House
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            A successful property renovation project in Manchester's Northern Quarter, delivering strong returns 
            for our investors through strategic refurbishment and quick resale.
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
                  <p className="text-gray-600 font-medium">Original Property Condition</p>
                  <p className="text-sm text-gray-500 mt-2">Dated interiors, worn fixtures, requiring full modernization</p>
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
                  <p className="text-gray-600 font-medium">Fully Renovated Property</p>
                  <p className="text-sm text-gray-500 mt-2">Modern kitchen, bathroom, flooring, and complete redecoration</p>
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
                    item.label === "Return" ? "bg-primary text-white font-bold text-lg" : "bg-white"
                  }`}>
                    <span className="font-medium">{item.label}:</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-green-100 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-green-800 font-bold text-xl">Cash-on-Cash Return: 26.7%</span>
                </div>
                <p className="text-green-700">Annualized return based on 6-month hold period</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Deal Structure
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How Investor Capital Was Used</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>Initial property purchase secured with investor funds</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>Renovation costs funded from the same investment pool</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>All legal and transaction costs included in total investment</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Return Calculation</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Returns calculated on sale completion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>All costs deducted from gross sale price</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Net profit distributed to investors within 30 days</span>
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
              "KR made this process so easy — I just watched the returns roll in."
            </blockquote>
            <p className="text-xl text-white/90">– J. Patel, Investor</p>
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
    </>
  );
};

export default ManchesterFlip;