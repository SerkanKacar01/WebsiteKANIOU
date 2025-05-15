import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { Category } from "@shared/schema";

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();
  
  // Fetch categories from API
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Get the product categories for the navigation menu
  const getProductCategories = () => {
    // Official list of product categories with their paths
    const productCategories = [
      { label: "Overgordijnen", urlPath: "overgordijnen" },
      { label: "Vitrages", urlPath: "vitrages" },
      { label: "Rolgordijnen", urlPath: "rolgordijnen" },
      { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen" },
      { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
      { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
      { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
      { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
      { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
      { label: "Houten shutters", urlPath: "houten-shutters" },
      { label: "Inzethorren", urlPath: "inzethorren" },
      { label: "Opzethorren", urlPath: "opzethorren" },
      { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
      { label: "Plissé", urlPath: "plisse" },
      { label: "Duo plissé", urlPath: "duo-plisse" },
      { label: "Duo plissé dakramen", urlPath: "duo-plisse-dakramen" },
      { label: "Dakraam zonwering", urlPath: "dakraam-zonwering" },
      { label: "Gordijnrails", urlPath: "gordijnrails" },
      { label: "Gordijnroedes", urlPath: "gordijnroedes" },
      { label: "SQUID", urlPath: "squid" }
    ];
    
    return productCategories.map(category => {
      return {
        label: category.label,
        href: `/products/${category.urlPath}`,
        key: category.urlPath
      };
    });
  };
  
  // Define navigation items based on requirements
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Browse Collection", href: "/browse-collection" },
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
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center cursor-pointer" aria-label="KANIOU ZILVERNAALD Home">
                <span className="font-display text-2xl font-semibold text-primary">
                  KANIOU <span className="text-secondary">ZILVERNAALD</span>
                </span>
              </a>
            </Link>
          </div>

          {isMobile ? (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary"
                  aria-label="Open Menu"
                  aria-expanded={sheetOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col space-y-3 p-6" id="mobile-menu" role="navigation">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-xl font-semibold text-primary">
                      KANIOU <span className="text-secondary">ZILVERNAALD</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseSheet}
                      aria-label="Close Menu"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                
                  {navItems.map((item) => 
                    item.hasDropdown ? (
                      <div key={item.href} className="py-2 border-b border-neutral-200">
                        <div className="flex items-center justify-between">
                          <Link href={item.href}>
                            <a 
                              className={`font-body ${
                                isActive(item.href) ? "text-accent font-medium" : "text-text-dark"
                              } cursor-pointer`}
                              onClick={handleCloseSheet}
                            >
                              {item.label}
                            </a>
                          </Link>
                          <button
                            className="p-2 cursor-pointer"
                            onClick={toggleMobileSubmenu}
                            aria-expanded={showMobileSubmenu}
                            aria-label={showMobileSubmenu ? `Hide ${item.label} Menu` : `Show ${item.label} Menu`}
                            aria-controls={`mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${showMobileSubmenu ? 'rotate-180' : ''}`} 
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        
                        {showMobileSubmenu && (
                          <div 
                            className="mt-3 ml-2 space-y-1 max-h-80 overflow-y-auto border-l-2 border-neutral-200 pl-3"
                            id={`mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                            role="menu"
                          >
                            {getProductCategories().map((category) => (
                              <div key={category.key} role="menuitem">
                                <Link href={category.href}>
                                  <a 
                                    className="font-body text-sm block py-1.5 text-text-dark hover:text-accent transition-colors cursor-pointer"
                                    onClick={handleCloseSheet}
                                  >
                                    {category.label}
                                  </a>
                                </Link>
                              </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-neutral-200">
                              {/* Category navigation links are already shown above, no need for "Browse All Categories" */}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href}>
                        <a
                          className={`font-body py-2 border-b border-neutral-200 block ${
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
                    <a className="mt-4 block">
                      <Button
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium"
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
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main Navigation">
              {navItems.map((item) => 
                item.hasDropdown ? (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <button
                      className={`font-body flex items-center cursor-pointer ${
                        isActive(item.href) || showDropdown
                          ? "font-medium"
                          : "hover:text-primary"
                      } transition-colors bg-transparent border-none p-0`}
                      onMouseEnter={() => setShowDropdown(true)}
                      onClick={toggleDropdown}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleDropdown();
                        } else if (e.key === 'Escape' && showDropdown) {
                          e.preventDefault();
                          setShowDropdown(false);
                        }
                      }}
                      aria-expanded={showDropdown}
                      aria-haspopup="true"
                      aria-controls={`dropdown-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                      <ChevronDown 
                        className={`h-4 w-4 ml-1 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    
                    {showDropdown && (
                      <div 
                        id={`dropdown-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50 max-h-96 overflow-y-auto dropdown-menu"
                        onMouseLeave={() => setShowDropdown(false)}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`dropdown-button-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {getProductCategories().map((category) => (
                          <div key={category.key} className="dropdown-menu-item" role="menuitem">
                            <Link href={category.href}>
                              <a className="block px-4 py-2 text-sm hover:text-primary cursor-pointer">
                                {category.label}
                              </a>
                            </Link>
                          </div>
                        ))}
                        <div className="border-t border-neutral-200 mt-2 pt-2" role="menuitem">
                          <Link href="/browse-collection">
                            <a className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent cursor-pointer">
                              Bekijk alle categorieën
                            </a>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`font-body ${
                        isActive(item.href)
                          ? "font-medium"
                          : "hover:text-primary"
                      } transition-colors cursor-pointer`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  </Link>
                )
              )}
              <Link href="/quote">
                <a>
                  <Button className="bg-secondary text-white hover:bg-secondary/90 font-medium">
                    Get Quote
                  </Button>
                </a>
              </Link>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
