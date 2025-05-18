import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Property Investments</title>
        <meta
          name="description"
          content="Terms of Service for Property Investments - Please review these terms before using our site."
        />
        <meta property="og:title" content="Terms of Service | Property Investments" />
        <meta
          property="og:description"
          content="Terms of Service for Property Investments - Please review these terms before using our site."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="section-anchor py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-neutral-800 mb-6">Terms of Service</h1>
              <p className="text-sm text-neutral-500 mb-6">Last Updated: October 1st, 2024</p>
              
              <div className="prose prose-neutral max-w-none">
                <p>
                  Please carefully review these Terms of Service ("Agreement", "Terms") before using our website ("the Site"). 
                  This Agreement outlines the legally binding terms and conditions for your use of the Site.
                </p>
                
                <p>
                  By accessing or using the Site in any way, including browsing or contributing content or other materials, 
                  you agree to be bound by these Terms. Capitalized terms used within this Agreement are defined herein.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Intellectual Property</h2>
                <p>
                  All original content, features, and functionality on the Site are owned by us and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Termination</h2>
                <p>
                  We reserve the right to terminate your access to the Site at any time, without cause or notice. 
                  This may result in the forfeiture and destruction of any associated information. Provisions of this 
                  Agreement that by nature should survive termination, such as ownership rights, warranty disclaimers, 
                  indemnity, and limitations of liability, will remain in effect post-termination.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Links to Third-Party Sites</h2>
                <p>
                  Our Site may contain links to external websites that are not owned or controlled by us. 
                  We have no control over, and assume no responsibility for, the content, privacy policies, 
                  or practices of any third-party sites or services. We strongly recommend reviewing the terms 
                  and privacy policies of any third-party sites you visit.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Governing Law</h2>
                <p>
                  This Agreement, along with any additional rules, policies, or guidelines incorporated by reference, 
                  shall be governed by and construed in accordance with the laws of England & Wales, without regard 
                  to conflict of law principles.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Agreement</h2>
                <p>
                  We reserve the right to modify or replace these Terms of Service at our sole discretion by posting 
                  updated terms on the Site. Your continued use of the Site following any changes constitutes your 
                  acceptance of the revised Terms.
                </p>
                
                <p>
                  Please review this Agreement periodically for updates. If you do not agree with this Agreement or 
                  any modifications, discontinue use of the Site immediately.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p>
                  For any questions regarding this Agreement, please feel free to contact us at{" "}
                  <a href="mailto:info@kr-properties.co.uk" className="text-primary hover:underline">
                    info@kr-properties.co.uk
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;