import { Helmet } from "react-helmet";
import InvestWithUs from "@/components/InvestPage/InvestWithUs";

const Invest = () => {
  return (
    <>
      <Helmet>
        <title>Invest With Us | Property Investments</title>
        <meta name="description" content="Discover how property investment can outperform traditional saving methods with our 10% annual returns compared to typical Cash ISAs at 4.5%." />
        <meta property="og:title" content="Invest With Us | Property Investments" />
        <meta property="og:description" content="Discover how property investment can outperform traditional saving methods with our 10% annual returns." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <InvestWithUs />
    </>
  );
};

export default Invest;
