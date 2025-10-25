import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import LanguageSelector from "./LanguageSelector";
import NewsletterSignup from "./NewsletterSignup";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

import { kaniouLogo } from "@/assets";

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();

  // Fetch products dynamically from the database
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Convert product names to URL-friendly slugs and create dropdown items
  const productCategories = products.map(product => {
    const slug = product.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    
    return {
      label: product.name,
      href: `/producten/${slug}`,
      id: product.id
    };
  });

  // Define navigation items (without Collectie - that's now a dropdown)
  const navItems = [
    { label: "Galerij", href: "/gallerij" },
    { label: "Over Ons", href: "/overons" },
    { label: "Contact", href: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobileCollectieOpen, setMobileCollectieOpen] = useState(false);

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

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setMobileCollectieOpen(false);
  };

  const handleNavClick = () => {
    scrollToTop('instant');
  };

  const handleMobileNavClick = () => {
    scrollToTop('instant');
    handleCloseSheet();
  };

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const isCollectieActive = () => {
    return productCategories.some(product => location.startsWith(product.href));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 md:py-1.5 py-1 bg-white ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => scrollToTop('instant')}
              >
                <img
                  src={kaniouLogo}
                  alt="KANIOU zilvernaald"
                  className="h-10 sm:h-12 md:h-14 w-auto"
                />
              </div>
            </Link>
          </div>

          {isMobile ? (
            <div className="flex items-center gap-2">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 min-h-[44px] min-w-[44px] text-gray-700 hover:text-[#D5B992]"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col space-y-3 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <img
                        src={kaniouLogo}
                        alt="KANIOU zilvernaald"
                        className="h-10"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseSheet}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Collectie Dropdown */}
                  <div className="border-b border-neutral-200">
                    <button
                      onClick={() => setMobileCollectieOpen(!mobileCollectieOpen)}
                      className={`w-full flex items-center justify-between py-3 text-base font-body ${
                        isCollectieActive() ? "text-accent font-medium" : "text-text-dark"
                      }`}
                    >
                      <span>Collectie</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileCollectieOpen ? "rotate-180" : ""
                        }`} 
                      />
                    </button>
                    {mobileCollectieOpen && (
                      <div className="pl-4 pb-3 space-y-2">
                        {productCategories.map((product) => (
                          <Link key={product.href} href={product.href}>
                            <a
                              className={`block py-2 text-sm ${
                                isActive(product.href)
                                  ? "text-accent font-medium"
                                  : "text-text-dark/80 hover:text-accent"
                              }`}
                              onClick={handleMobileNavClick}
                            >
                              {product.label}
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`font-body py-3 border-b border-neutral-200 block text-base ${
                          isActive(item.href)
                            ? "text-accent font-medium"
                            : "text-text-dark"
                        }`}
                        onClick={handleMobileNavClick}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}

                  <div className="mt-4 space-y-3">
                    <Link href="/offerte">
                      <Button
                        className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors min-h-[44px] text-base"
                        onClick={handleMobileNavClick}
                      >
                        VRIJBLIJVEND OFFERTE
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          ) : (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {/* Desktop COLLECTIE Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-body text-sm transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${
                        isCollectieActive()
                          ? "text-[#D5B992] font-semibold" 
                          : "text-gray-700 hover:text-[#D5B992]"
                      }`}
                    >
                      Collectie
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-1 p-4 w-[500px] bg-white shadow-xl rounded-lg">
                        {productCategories.map((product) => (
                          <Link key={product.href} href={product.href}>
                            <NavigationMenuLink
                              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent ${
                                isActive(product.href)
                                  ? "bg-accent/5 text-accent font-medium"
                                  : "text-text-dark"
                              }`}
                              onClick={handleNavClick}
                            >
                              <div className="text-sm font-medium leading-none">
                                {product.label}
                              </div>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`font-body text-sm transition-colors cursor-pointer ${
                      isActive(item.href)
                        ? "text-[#D5B992] font-semibold" 
                        : "text-gray-700 hover:text-[#D5B992]"
                    }`}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <Link href="/offerte">
                  <Button 
                    className="bg-[#D5B992] hover:bg-[#C5A565] text-white text-sm font-medium px-4 py-2 h-10 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
                    onClick={handleNavClick}
                  >
                    VRIJBLIJVEND OFFERTE
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
