import { Helmet } from "react-helmet";
import UpdatesComponent from "@/components/UpdatesPage/Updates";

const Updates = () => {
  return (
    <>
      <Helmet>
        <title>Latest Updates | Property Investments</title>
        <meta name="description" content="Stay informed about our most recent property developments, investment opportunities, and successful projects in the Lincolnshire area." />
        <meta property="og:title" content="Latest Property Investment Updates" />
        <meta property="og:description" content="Stay informed about our most recent property developments and investment opportunities." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <UpdatesComponent />
    </>
  );
};

export default Updates;
