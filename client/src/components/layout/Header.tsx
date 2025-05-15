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
    { label: "Browse Collection", href: "/products", hasDropdown: true },
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
              <div className="flex items-center cursor-pointer">
                <span className="font-display text-2xl font-semibold text-primary">
                  KANIOU <span className="text-secondary">ZILVERNAALD</span>
                </span>
              </div>
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
                      KANIOU <span className="text-secondary">ZILVERNAALD</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseSheet}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                
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
                            {getProductCategories().map((category) => (
                              <div key={category.key}>
                                <Link href={category.href}>
                                  <div 
                                    className="font-body text-sm block py-1.5 text-text-dark hover:text-accent transition-colors cursor-pointer"
                                    onClick={handleCloseSheet}
                                  >
                                    {category.label}
                                  </div>
                                </Link>
                              </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-neutral-200">
                              <div>
                                <Link href="/products">
                                  <div 
                                    className="font-body text-sm block py-1.5 text-accent font-medium cursor-pointer"
                                    onClick={handleCloseSheet}
                                  >
                                    Browse All Categories
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={`font-body py-2 border-b border-neutral-200 ${
                            isActive(item.href)
                              ? "text-accent font-medium"
                              : "text-text-dark"
                          }`}
                          onClick={handleCloseSheet}
                        >
                          {item.label}
                        </div>
                      </Link>
                    )
                  )}
                  
                  <Link href="/quote">
                    <div className="mt-4">
                      <Button
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium"
                        onClick={handleCloseSheet}
                      >
                        Get Quote
                      </Button>
                    </div>
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
                          ? "font-medium"
                          : "hover:text-primary"
                      } transition-colors`}
                      onClick={toggleDropdown}
                      onMouseEnter={() => setShowDropdown(true)}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {showDropdown && (
                      <div 
                        className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50 max-h-96 overflow-y-auto dropdown-menu"
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        {getProductCategories().map((category) => (
                          <div key={category.key} className="dropdown-menu-item">
                            <Link href={category.href}>
                              <div className="block px-4 py-2 text-sm hover:text-primary cursor-pointer">
                                {category.label}
                              </div>
                            </Link>
                          </div>
                        ))}
                        <div className="border-t border-neutral-200 mt-2 pt-2">
                          <div className="dropdown-menu-item">
                            <Link href="/products">
                              <div className="block px-4 py-2 text-sm text-primary font-medium cursor-pointer">
                                Browse All Categories
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`font-body ${
                        isActive(item.href)
                          ? "font-medium"
                          : "hover:text-primary"
                      } transition-colors cursor-pointer`}
                    >
                      {item.label}
                    </div>
                  </Link>
                )
              )}
              <Link href="/quote">
                <div>
                  <Button className="bg-secondary text-white hover:bg-secondary/90 font-medium">
                    Get Quote
                  </Button>
                </div>
              </Link>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
