import { Card, CardContent } from "@/components/ui/card";
import ReturnChart from "./ReturnChart";
import { investmentReturns } from "@/lib/data";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const InvestWithUs = () => {
  return (
    <section className="section-anchor py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Invest With Us</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover how property investment can outperform traditional saving methods.
          </p>
        </div>
        
        <div className="lg:flex items-start">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-6">How We Work</h3>
            
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-primary mb-4">Our Investment Process</h4>
                
                <div className="mb-6 flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                  <div className="ml-4">
                    <h5 className="font-semibold text-neutral-700 mb-1">Initial Consultation</h5>
                    <p className="text-neutral-600">We meet to understand your investment goals and requirements.</p>
                  </div>
                </div>
                
                <div className="mb-6 flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                  <div className="ml-4">
                    <h5 className="font-semibold text-neutral-700 mb-1">Property Selection</h5>
                    <p className="text-neutral-600">We identify suitable properties based on your investment criteria.</p>
                  </div>
                </div>
                
                <div className="mb-6 flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                  <div className="ml-4">
                    <h5 className="font-semibold text-neutral-700 mb-1">Legal Framework</h5>
                    <p className="text-neutral-600">We establish a secure legal agreement to protect your investment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                  <div className="ml-4">
                    <h5 className="font-semibold text-neutral-700 mb-1">Returns Distribution</h5>
                    <p className="text-neutral-600">You receive regular returns based on the agreed terms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-primary mb-4">Why Choose Us?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-green-600 h-5 w-5 mt-1 mr-2" />
                    <span className="text-neutral-600">Proven track record in property investment</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 h-5 w-5 mt-1 mr-2" />
                    <span className="text-neutral-600">Focused on social housing with stable returns</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 h-5 w-5 mt-1 mr-2" />
                    <span className="text-neutral-600">Transparent investment process</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 h-5 w-5 mt-1 mr-2" />
                    <span className="text-neutral-600">Regular updates on your investment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Annual Returns on £100,000</h3>
                
                {/* Chart Container */}
                <div className="mb-8 h-[300px]">
                  <ReturnChart />
                </div>
                
                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Option</th>
                        <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Annual Rate</th>
                        <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Return in £</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      {investmentReturns.map((item, index) => (
                        <tr key={index} className={item.name === "Property Investment Fund" ? "font-medium text-primary" : (item.name === "Inflation (as cost)" ? "text-destructive" : "")}>
                          <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.rate}</td>
                          <td className="px-4 py-3 whitespace-nowrap">£{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h4 className="text-lg font-semibold text-neutral-800 mb-3">The Cost of Doing Nothing</h4>
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Where Your Money Is</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Annual Interest Rate</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">£ Earned (or Lost)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">Current Account</td>
                        <td className="px-4 py-2">0.1%</td>
                        <td className="px-4 py-2 text-green-600">£100</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Inflation (Purchasing Power)</td>
                        <td className="px-4 py-2">-2.6%</td>
                        <td className="px-4 py-2 text-destructive">-£2,600</td>
                      </tr>
                      <tr className="bg-neutral-100">
                        <td className="px-4 py-2 font-semibold">Net Effect</td>
                        <td className="px-4 py-2">—</td>
                        <td className="px-4 py-2 font-semibold text-destructive">You're losing £2,500/year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 text-center">
                  <Link href="/contact">
                    <Button className="px-6 py-3 h-auto bg-primary text-white font-semibold hover:bg-primary/90">
                      Start Investing Today
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestWithUs;
