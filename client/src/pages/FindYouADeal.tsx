import { Helmet } from "react-helmet";
import { useState } from "react";
import { useLocation } from "wouter";

const FindYouADeal = () => {
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/send-deal-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
      // Redirect to thank you page after successful submission
      setTimeout(() => {
        setLocation("/thank-you-deal-sourcing");
      }, 1000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Deal Sourcing Service Paused | KR Property Investments</title>
        <meta name="description" content="Our deal sourcing service is temporarily paused. Join the waitlist to be notified when we reopen for new clients." />
        <meta property="og:title" content="Deal Sourcing Service Paused | KR Property Investments" />
        <meta property="og:description" content="Our deal sourcing service is temporarily paused. Join the waitlist to be notified when we reopen for new clients." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-[#F9FAFB] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A355E]">
          Our Deal Sourcing Service Is Temporarily Paused
        </h1>
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-6">
          We're currently at full capacity — but you can join the waitlist and get our <strong>Free Deal Checklist</strong> to prepare for your next investment.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6 border border-[#C58B25]">
          <h2 className="text-xl font-bold mb-2 text-[#1A355E]">🎁 Free Bonus: The Ultimate Deal Checklist</h2>
          <ul className="text-left text-[#6B7280] list-disc pl-5 space-y-1 text-sm">
            <li>Know what to ask before buying</li>
            <li>Spot hidden costs and deal-breakers</li>
            <li>10 due diligence checks most investors skip</li>
            <li>Instantly compare ROI across deals</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm text-[#6B7280] max-w-2xl mx-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl">✅</span>
            <span>Only 10 sourcing clients per quarter</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">🔐</span>
            <span>All deals legally secured + vetted</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">📈</span>
            <span>17.3% average ROI (see case studies)</span>
          </div>
        </div>

        {submitted ? (
          <div className="text-green-600 font-semibold text-xl">
            ✅ Lead submitted successfully! You'll be the first to hear when we reopen.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 mt-[51px] mb-[51px]">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full border rounded px-4 py-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full border rounded px-4 py-3"
            />
            <textarea
              name="message"
              placeholder="Optional: What type of deals are you looking for?"
              className="w-full border rounded px-4 py-3"
              rows={4}
            />
            <button
              type="submit"
              className="bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] w-full font-semibold"
            >
              Get the Checklist + Join the Waitlist
            </button>
          </form>
        )}

        <div className="border border-[#C58B25] bg-white p-4 rounded-lg mt-10 max-w-xl mx-auto">
          <p className="italic text-[#6B7280] mb-2">
            "KR found my first property deal in 14 days — I'd do it again in a heartbeat."
          </p>
          <p className="font-semibold text-[#1A355E]">— James, Investor</p>
        </div>
      </div>
    </>
  );
};

export default FindYouADeal;