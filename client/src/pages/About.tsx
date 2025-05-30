import { Helmet } from "react-helmet";
import AboutUs from "@/components/AboutPage/AboutUs";
import TeamSection from "@/components/AboutPage/TeamSection";
import Timeline from "@/components/AboutPage/Timeline";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Property Investments</title>
        <meta name="description" content="Learn about our passionate team with a proven track record in property investment, specializing in social housing since 2017." />
        <meta property="og:title" content="About Our Property Investment Team" />
        <meta property="og:description" content="Learn about our passionate team with a proven track record in property investment, specializing in social housing since 2017." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <AboutUs />
      <TeamSection />
      <Timeline />
    </>
  );
};

export default About;
