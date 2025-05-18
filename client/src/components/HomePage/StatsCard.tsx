import React from "react";

const StatsCard = () => {
  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          {/* Property Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Our Property Investment Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">8-12%</div>
                <div className="text-sm text-neutral-600">Annual Returns</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">100%</div>
                <div className="text-sm text-neutral-600">Asset-Backed</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">£5M+</div>
                <div className="text-sm text-neutral-600">Under Management</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="font-bold text-2xl text-primary">15+ Yrs</div>
                <div className="text-sm text-neutral-600">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCard;