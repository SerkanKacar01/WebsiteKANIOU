import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const productCategories = [
  { label: "Overgordijnen", href: "/products/overgordijnen" },
  { label: "Vitrages", href: "/products/vitrages" },
  { label: "Rolgordijnen", href: "/products/rolgordijnen" },
  { label: "Duo rolgordijnen", href: "/products/duo-rolgordijnen" },
  { label: "Textiel lamellen", href: "/products/textiel-lamellen" },
  { label: "Kunststof lamellen", href: "/products/kunststof-lamellen" },
  { label: "Houten jaloezieën", href: "/products/houten-jaloezieën" },
  { label: "Kunststof jaloezieën", href: "/products/kunststof-jaloezieën" },
  { label: "Textiel raamfolie", href: "/products/textiel-raamfolie" },
  { label: "Houten shutters", href: "/products/houten-shutters" },
  { label: "Inzethorren", href: "/products/inzethorren" },
  { label: "Opzethorren", href: "/products/opzethorren" },
  { label: "Plissé hordeuren", href: "/products/plissé-hordeuren" },
  { label: "Plissé", href: "/products/plissé" },
  { label: "Duo plissé", href: "/products/duo-plissé" },
  { label: "Duo plissé voor dakramen", href: "/products/duo-plissé-voor-dakramen" },
  { label: "Dakraam zonweringen (Fakro, Velux)", href: "/products/dakraam-zonweringen" },
  { label: "Gordijnrails", href: "/products/gordijnrails" },
  { label: "Gordijnroedes", href: "/products/gordijnroedes" },
  { label: "Horren", href: "/products/horren" },
  { label: "SQUID textiel folie", href: "/products/squid-textiel-folie" },
];

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();
  
  // Define navigation items directly with proper translations
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setShowMobileSubmenu(false);
  };

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileSubmenu = () => {
    setShowMobileSubmenu(!showMobileSubmenu);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <span className="font-display text-2xl md:text-3xl font-semibold text-primary">
                  Elegant<span className="text-secondary">Drapes</span>
                </span>
              </a>
            </Link>
          </div>

          {isMobile ? (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col space-y-3 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-xl font-semibold text-primary">
                      Elegant<span className="text-secondary">Drapes</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseSheet}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <LanguageSelector isMobile={true} onClose={handleCloseSheet} />
                
                  {navItems.map((item) => 
                    item.hasDropdown ? (
                      <div key={item.href} className="py-2 border-b border-neutral-200">
                        <div 
                          className={`font-body flex items-center justify-between ${
                            isActive(item.href) ? "text-accent font-medium" : "text-text-dark"
                          } cursor-pointer`}
                          onClick={toggleMobileSubmenu}
                        >
                          {item.label}
                          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showMobileSubmenu ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {showMobileSubmenu && (
                          <div className="mt-3 ml-2 space-y-1 max-h-80 overflow-y-auto border-l-2 border-neutral-200 pl-3">
                            {productCategories.map((category) => (
                              <div key={category.href}>
                                <Link href={category.href}>
                                  <a 
                                    className="font-body text-sm block py-1.5 text-text-dark hover:text-accent transition-colors"
                                    onClick={handleCloseSheet}
                                  >
                                    {category.label}
                                  </a>
                                </Link>
                              </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-neutral-200">
                              <div>
                                <Link href="/products">
                                  <a 
                                    className="font-body text-sm block py-1.5 text-accent font-medium"
                                    onClick={handleCloseSheet}
                                  >
                                    View All Products
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href}>
                        <a
                          className={`font-body py-2 border-b border-neutral-200 ${
                            isActive(item.href)
                              ? "text-accent font-medium"
                              : "text-text-dark"
                          }`}
                          onClick={handleCloseSheet}
                        >
                          {item.label}
                        </a>
                      </Link>
                    )
                  )}
                  
                  <Link href="/quote">
                    <a className="mt-4">
                      <Button
                        className="w-full bg-secondary hover:bg-accent"
                        onClick={handleCloseSheet}
                      >
                        Get Quote
                      </Button>
                    </a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => 
                item.hasDropdown ? (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <div 
                      className={`font-body flex items-center cursor-pointer ${
                        isActive(item.href) || showDropdown
                          ? "text-accent font-medium"
                          : "text-text-dark hover:text-accent"
                      } transition-colors`}
                      onClick={toggleDropdown}
                      onMouseEnter={() => setShowDropdown(true)}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {showDropdown && (
                      <div 
                        className="absolute left-0 mt-2 w-64 bg-white rounded-md py-2 z-50 max-h-96 overflow-y-auto dropdown-menu"
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        {productCategories.map((category) => (
                          <div key={category.href} className="dropdown-menu-item">
                            <Link href={category.href}>
                              <a className="block px-4 py-2 text-sm text-text-dark hover:text-accent">
                                {category.label}
                              </a>
                            </Link>
                          </div>
                        ))}
                        <div className="border-t border-neutral-200 mt-2 pt-2">
                          <div className="dropdown-menu-item">
                            <Link href="/products">
                              <a className="block px-4 py-2 text-sm text-accent font-medium">
                                View All Products
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`font-body ${
                        isActive(item.href)
                          ? "text-accent font-medium"
                          : "text-text-dark hover:text-accent"
                      } transition-colors`}
                    >
                      {item.label}
                    </a>
                  </Link>
                )
              )}
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <Link href="/quote">
                  <a>
                    <Button className="bg-secondary hover:bg-accent">
                      Get Quote
                    </Button>
                  </a>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
