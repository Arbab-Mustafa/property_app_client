import { Helmet } from "react-helmet";
import Hero from "@/components/HomePage/Hero";
import Stats from "@/components/HomePage/Stats";
import StatsCard from "@/components/HomePage/StatsCard";
import WhyInvest from "@/components/HomePage/WhyInvest";
import InstagramFeed from "@/components/HomePage/InstagramFeed";
import Testimonials from "@/components/HomePage/Testimonials";
import CredentialsStats from "@/components/HomePage/CredentialsStats";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Property Investments | Expert Property Investment Opportunities</title>
        <meta name="description" content="Secure your financial future with property investments offering returns higher than traditional banking or ISAs through strategic property investments." />
        <meta property="og:title" content="Property Investments | Expert Property Investment Opportunities" />
        <meta property="og:description" content="Secure your financial future with property investments offering returns higher than traditional banking or ISAs." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="homepage-container" style={{ backgroundColor: '#F9FAFB' }}>
        <Hero />
        <WhyInvest />
        <StatsCard />
        <Testimonials />
        <CredentialsStats />
        <InstagramFeed />
      </div>
    </>
  );
};

export default Home;
