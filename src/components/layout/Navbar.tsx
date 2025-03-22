
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-shaheen-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
          <div className="font-semibold text-xl text-shaheen-900">
            <span>Shaheen</span>
            <span className="text-shaheen-500"> Installment</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "font-medium relative py-2 transition-colors duration-200",
                  isActive 
                    ? "text-shaheen-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-shaheen-500" 
                    : "text-foreground/80 hover:text-shaheen-600"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button className="bg-shaheen-500 hover:bg-shaheen-600 text-white rounded-lg transition-all duration-300 hover:shadow-md">
            Call Now
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-shaheen-900 p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "top-[72px] opacity-100" : "top-[-490px] opacity-0"
        )}
      >
        <nav className="flex flex-col py-4 px-6 max-w-7xl mx-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "py-3 font-medium border-b border-gray-100 transition-colors duration-200",
                  isActive ? "text-shaheen-600" : "text-foreground/80 hover:text-shaheen-600"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button className="bg-shaheen-500 hover:bg-shaheen-600 text-white rounded-lg mt-4 transition-all duration-300">
            Call Now
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
