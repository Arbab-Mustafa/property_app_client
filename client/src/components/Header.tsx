import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/Property Investments.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Invest With Us", path: "/invest" },
  { name: "Updates", path: "/updates" },
  { name: "Inflation Calculator", path: "/inflation-calculator" },
  { name: "Book A Call", path: "/book-call" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // WordPress plugin integration hook point
  useEffect(() => {
    if ((window as any).wpData && typeof (window as any).wpData.integratePlugin === 'function') {
      // WordPress menu integration example
      (window as any).wpData.integratePlugin('menu', {
        element: 'header-menu',
        location: 'primary'
      });
    }
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white shadow-md"}`} id="wp-header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <img src={logoPath} alt="Property Investments Logo" className="h-12 cursor-pointer" />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8" id="header-menu">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a className={`font-medium transition hover:text-primary ${location === link.path ? "text-primary" : "text-neutral-700"}`}>
                  {link.name}
                </a>
              </Link>
            ))}
          </nav>

          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a 
                    className={`font-medium py-2 transition hover:text-primary ${location === link.path ? "text-primary" : "text-neutral-700"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
