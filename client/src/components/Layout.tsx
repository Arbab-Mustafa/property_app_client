import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">{children}</main> {/* Reduced padding to minimize gap while still preventing content from being hidden */}
      <Footer />
    </div>
  );
};

export default Layout;
