import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import desktopLogo from "../assets/desktop-Property-Investments.png";
import mobileLogo from "../assets/mobile-Property-Investments.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  {
    name: "What We Do",
    path: "/invest",
    isDropdown: true,
    dropdownItems: [
      { name: "Find You A Deal", path: "/find-you-a-deal" },
      { name: "Invest With Us", path: "/invest-with-us" },
    ],
  },
  { name: "Case Studies", path: "/case-studies" },
  // { name: "Updates", path: "/updates" },
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
    if (
      (window as any).wpData &&
      typeof (window as any).wpData.integratePlugin === "function"
    ) {
      // WordPress menu integration example
      (window as any).wpData.integratePlugin("menu", {
        element: "header-menu",
        location: "primary",
      });
    }
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white shadow-md"
      }`}
      id="wp-header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              {/* Desktop Logo */}
              <img
                src={desktopLogo}
                alt="KR Property Investments"
                className="h-10 cursor-pointer hidden md:block"
              />
              {/* Mobile Logo */}
              <img
                src={mobileLogo}
                alt="KR Property Investments"
                className="h-10 cursor-pointer block md:hidden"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8" id="header-menu">
            {navLinks.map((link) =>
              link.isDropdown ? (
                <DropdownMenu key={link.path}>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href={link.path}
                      className="flex items-center font-medium transition hover:text-primary"
                    >
                      {link.name} <ChevronDown className="h-4 w-4 ml-1" />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.dropdownItems?.map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          href={item.path}
                          className="w-full cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-medium transition hover:text-primary ${
                    location === link.path ? "text-primary" : "text-neutral-700"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
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
              {navLinks.map((link) =>
                link.isDropdown ? (
                  <div key={link.path} className="space-y-2">
                    <a
                      href={link.path}
                      className="font-medium text-neutral-700 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                    <div className="pl-4 space-y-2">
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.path}
                          href={item.path}
                          className="font-medium py-1 block transition hover:text-primary text-neutral-600"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.path}
                    href={link.path}
                    className={`font-medium py-2 transition hover:text-primary ${
                      location === link.path
                        ? "text-primary"
                        : "text-neutral-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
