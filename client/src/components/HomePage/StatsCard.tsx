import React from "react";

const StatsCard = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          {/* Property Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A355E' }}>Our Property Investment Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-md" style={{ backgroundColor: '#FFF7ED' }}>
                <div className="font-bold text-2xl text-[#f97316]" style={{ color: '#F97316' }}>6-10%</div>
                <div className="text-sm" style={{ color: '#6B7280' }}>Annual Returns</div>
              </div>
              <div className="p-3 rounded-md" style={{ backgroundColor: '#FFF7ED' }}>
                <div className="font-bold text-2xl" style={{ color: '#F97316' }}>100%</div>
                <div className="text-sm" style={{ color: '#6B7280' }}>Asset-Backed</div>
              </div>
              <div className="p-3 rounded-md" style={{ backgroundColor: '#FFF7ED' }}>
                <div className="font-bold text-2xl text-[#f97316]" style={{ color: '#F97316' }}>£2M</div>
                <div className="text-sm" style={{ color: '#6B7280' }}>Under Management</div>
              </div>
              <div className="p-3 rounded-md" style={{ backgroundColor: '#FFF7ED' }}>
                <div className="font-bold text-2xl" style={{ color: '#F97316' }}>15+ Yrs</div>
                <div className="text-sm" style={{ color: '#6B7280' }}>Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCard;