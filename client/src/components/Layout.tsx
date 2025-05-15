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
      <main className="flex-grow pt-24">{children}</main> {/* Added padding top to prevent content from being hidden behind the header */}
      <Footer />
    </div>
  );
};

export default Layout;
