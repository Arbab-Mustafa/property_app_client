import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Auto-scroll to top on route changes
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>{" "}
      {/* Removed padding to eliminate the gap */}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
