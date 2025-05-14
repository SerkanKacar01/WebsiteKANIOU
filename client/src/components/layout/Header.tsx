import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// We'll define product categories with translations for both languages
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
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  
  // Define navigation items
  const navItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.products'), href: "/products", hasDropdown: true },
    { label: t('nav.gallery'), href: "/gallery" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.contact'), href: "/contact" },
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
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="font-display text-2xl md:text-3xl font-semibold text-primary">
                  Elegant<span className="text-secondary">Drapes</span>
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
                  
                  {/* Language Switcher for Mobile */}
                  <div className="mt-6 mb-2 border-t border-neutral-200 pt-4">
                    <p className="text-sm text-text-medium mb-2">{t('common.language')}</p>
                    <div className="flex space-x-2">
                      <Button 
                        variant={language === 'nl' ? "secondary" : "outline"} 
                        size="sm"
                        onClick={() => setLanguage('nl')}
                      >
                        Nederlands
                      </Button>
                      <Button 
                        variant={language === 'en' ? "secondary" : "outline"} 
                        size="sm"
                        onClick={() => setLanguage('en')}
                      >
                        English
                      </Button>
                    </div>
                  </div>
                  
                  <Link href="/quote">
                    <a className="mt-4">
                      <Button
                        className="w-full bg-secondary hover:bg-accent"
                        onClick={handleCloseSheet}
                      >
                        {t('nav.quote')}
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
                        {getProductCategories(t).map((category) => (
                          <div key={category.key} className="dropdown-menu-item">
                            <Link href={category.href}>
                              <div className="block px-4 py-2 text-sm text-text-dark hover:text-accent cursor-pointer">
                                {category.label}
                              </div>
                            </Link>
                          </div>
                        ))}
                        <div className="border-t border-neutral-200 mt-2 pt-2">
                          <div className="dropdown-menu-item">
                            <Link href="/products">
                              <div className="block px-4 py-2 text-sm text-accent font-medium cursor-pointer">
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
                          ? "text-accent font-medium"
                          : "text-text-dark hover:text-accent"
                      } transition-colors cursor-pointer`}
                    >
                      {item.label}
                    </div>
                  </Link>
                )
              )}
              <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => setLanguage('nl')}
                      className={language === 'nl' ? 'bg-accent/10 font-medium' : ''}
                    >
                      Nederlands
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setLanguage('en')}
                      className={language === 'en' ? 'bg-accent/10 font-medium' : ''}
                    >
                      English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link href="/quote">
                  <Button className="bg-secondary hover:bg-accent">
                    {t('nav.quote')}
                  </Button>
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
