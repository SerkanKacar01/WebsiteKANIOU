import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";

// Product categories for the dropdown menu
const getProductCategories = (t: (key: string) => string) => [
  { 
    label: t('products.category.curtains'), 
    href: "/products/overgordijnen",
    key: "overgordijnen" 
  },
  { 
    label: t('products.category.sheers'), 
    href: "/products/vitrages",
    key: "vitrages" 
  },
  { 
    label: t('products.category.rollerBlinds'), 
    href: "/products/rolgordijnen",
    key: "rolgordijnen" 
  },
  { 
    label: t('products.category.duoRollerBlinds'), 
    href: "/products/duo-rolgordijnen",
    key: "duo-rolgordijnen" 
  },
  { 
    label: t('products.category.verticalTextileBlinds'), 
    href: "/products/textiel-lamellen",
    key: "textiel-lamellen" 
  },
  { 
    label: t('products.category.verticalPlasticBlinds'), 
    href: "/products/kunststof-lamellen",
    key: "kunststof-lamellen" 
  },
  { 
    label: t('products.category.woodenBlinds'), 
    href: "/products/houten-jaloezieen",
    key: "houten-jaloezieen" 
  },
  { 
    label: t('products.category.plasticBlinds'), 
    href: "/products/kunststof-jaloezieen",
    key: "kunststof-jaloezieen" 
  },
  { 
    label: t('products.category.textileWindowFilm'), 
    href: "/products/textiel-raamfolie",
    key: "textiel-raamfolie" 
  },
  { 
    label: t('products.category.woodenShutters'), 
    href: "/products/houten-shutters",
    key: "houten-shutters" 
  },
  { 
    label: t('products.category.insetScreens'), 
    href: "/products/inzethorren",
    key: "inzethorren" 
  },
  { 
    label: t('products.category.mountedScreens'), 
    href: "/products/opzethorren",
    key: "opzethorren" 
  },
  { 
    label: t('products.category.pleatScreenDoors'), 
    href: "/products/plisse-hordeuren",
    key: "plisse-hordeuren" 
  },
  { 
    label: t('products.category.pleatedBlinds'), 
    href: "/products/plisse",
    key: "plisse" 
  },
  { 
    label: t('products.category.duoPleatedBlinds'), 
    href: "/products/duo-plisse",
    key: "duo-plisse" 
  },
  { 
    label: t('products.category.duoPleatedRoofBlinds'), 
    href: "/products/duo-plisse-dakramen",
    key: "duo-plisse-dakramen" 
  },
  { 
    label: t('products.category.roofWindowBlinds'), 
    href: "/products/dakraam-zonwering",
    key: "dakraam-zonwering" 
  },
  { 
    label: t('products.category.curtainRails'), 
    href: "/products/gordijnrails",
    key: "gordijnrails" 
  },
  { 
    label: t('products.category.curtainRods'), 
    href: "/products/gordijnroedes",
    key: "gordijnroedes" 
  },
  { 
    label: t('products.category.screens'), 
    href: "/products/horren",
    key: "horren" 
  },
  { 
    label: t('products.category.squidFilm'), 
    href: "/products/squid",
    key: "squid" 
  },
];

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();
  
  // Define navigation items based on requirements
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
                            {getProductCategories(t).map((category) => (
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
                                    {t('common.viewAll')}
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
                        {getProductCategories(t).map((category) => (
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
                                {t('common.viewAll')}
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
