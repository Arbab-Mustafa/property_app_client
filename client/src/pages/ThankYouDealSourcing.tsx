import { Helmet } from "react-helmet";
import { Link } from "wouter";

const ThankYouDealSourcing = () => {
  return (
    <>
      <Helmet>
        <title>Thank You - You're On the List! | KR Property Investments</title>
        <meta name="description" content="Thank you for joining our Deal Sourcing waitlist. Download your free Deal Checklist and get ready for your next investment opportunity." />
        <meta property="og:title" content="Thank You - You're On the List! | KR Property Investments" />
        <meta property="og:description" content="Thank you for joining our Deal Sourcing waitlist. Download your free Deal Checklist and get ready for your next investment opportunity." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-[#F9FAFB] py-20 px-4 text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A355E]">
          Thank You — You're On the List!
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-8">
          You've successfully joined the waitlist for our Deal Sourcing Service. When we reopen, you'll be the first to know.
        </p>

        {/* Bonus Delivery Card */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-8 border border-[#C58B25]">
          <h2 className="text-xl font-bold mb-3 text-[#1A355E]">🎁 Your Free Bonus: The Ultimate Deal Checklist</h2>
          <ul className="text-left text-[#6B7280] list-disc pl-5 space-y-1 text-sm mb-4">
            <li>Know what to ask before buying</li>
            <li>Spot hidden costs and deal-breakers</li>
            <li>10 due diligence checks most investors skip</li>
            <li>Instantly compare ROI across deals</li>
          </ul>
          <a 
            href="https://drive.google.com/file/d/1P_hHhSY2RTOcDxpRuN3egPsff71S3Mtv/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#F97316] text-white px-4 py-2 rounded hover:bg-[#ea580c] font-semibold text-sm"
          >
            👉 Click here to download your checklist
          </a>
        </div>

        {/* Testimonial */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-xl mx-auto mb-8">
          <p className="italic text-[#6B7280] mb-2">
            "KR found my first property deal in 14 days — I'd do it again in a heartbeat."
          </p>
          <p className="font-semibold text-[#1A355E]">— James, Investor</p>
        </div>

        {/* Soft CTA */}
        <div className="max-w-xl mx-auto">
          <p className="text-[#6B7280] mb-3">
            Want to see the kind of deals we've helped investors with?
          </p>
          <Link href="/case-studies">
            <span className="inline-block bg-[#F97316] text-white px-6 py-2 rounded hover:bg-[#ea580c] font-semibold cursor-pointer">
              View Our Case Studies
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ThankYouDealSourcing;