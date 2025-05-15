import { Helmet } from "react-helmet";
import ContactForm from "@/components/ContactPage/ContactForm";
import ContactInfo from "@/components/ContactPage/ContactInfo";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Property Investments</title>
        <meta name="description" content="Get in touch with our property investment experts today to discuss how we can help you achieve your investment goals with higher returns." />
        <meta property="og:title" content="Contact Property Investments" />
        <meta property="og:description" content="Get in touch with our property investment experts today to discuss how we can help you achieve your investment goals." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="section-anchor py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Contact Us</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Interested in investing with us? Get in touch today to discuss how we can help you achieve your investment goals.
            </p>
          </div>
          
          <div className="lg:flex">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <ContactForm />
            </div>
            
            <div className="lg:w-1/2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
