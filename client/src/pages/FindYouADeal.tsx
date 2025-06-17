import { Helmet } from "react-helmet";
import { useState } from "react";

const FindYouADeal = () => {
  const [submitted, setSubmitted] = useState(false);

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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A355E]">
          Deal Sourcing Service Temporarily Paused
        </h1>
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-8">
          We're currently not taking on new deal sourcing clients. When we reopen, you'll be the first to know.
        </p>

        {submitted ? (
          <div className="text-green-600 font-semibold text-xl">
            ✅ Lead submitted successfully! You'll be the first to hear when we reopen.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
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
              Notify Me When It Reopens
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default FindYouADeal;