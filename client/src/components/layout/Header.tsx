import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
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

import { kaniouLogo } from "@/assets";



const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();
  const { summary, openCart } = useCart();

  // Define product categories for dropdown - Updated list per user requirements
  const productCategories = [
    { label: "Overgordijnen", href: "/producten/overgordijnen" },
    { label: "Vitrages", href: "/producten/vitrages" },
    { label: "Duo rolgordijnen", href: "/producten/duo-rolgordijnen" },
    { label: "Textiel lamellen", href: "/producten/textiel-lamellen" },
    { label: "Kunststof lamellen", href: "/producten/kunststof-lamellen" },
    { label: "Houten jaloezieën", href: "/producten/houten-jaloezieen" },
    { label: "Kunststof jaloezieën", href: "/producten/kunststof-jaloezieen" },
    { label: "Textiel raamfolie", href: "/producten/textiel-raamfolie" },
    { label: "Houten shutters", href: "/producten/houten-shutters" },
    { label: "Inzethorren", href: "/producten/inzethorren" },
    { label: "Opzethorren", href: "/producten/opzethorren" },
    { label: "Plissé hordeuren", href: "/producten/plisse-hordeuren" },
    { label: "Plissé", href: "/producten/plisse" },
    { label: "Duo plissé", href: "/producten/duo-plisse" },
    { label: "Dakraam zonweringen", href: "/producten/dakraam-zonweringen" },
    { label: "Gordijnrails", href: "/producten/gordijnrails" },
    { label: "Gordijnroedes", href: "/producten/gordijnroedes" },
  ];

  // Define navigation items
  const navItems = [
    { label: t("GALLERIJ"), href: "/gallerij" },
    { label: "ZAKELIJK", href: "/zakelijk" },
    { label: t("OVER ONS"), href: "/overons" },
    { label: t("CONTACT"), href: "/contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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
    if (href === "/producten" && (location.startsWith("/producten") || location.startsWith("/products") || location.startsWith("/shop"))) return true;
    if (href !== "/" && href !== "/producten" && location.startsWith(href)) return true;
    return false;
  };

  const isProductsActive = () => {
    return location.startsWith("/producten") || location.startsWith("/products") || location.startsWith("/shop");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white md:py-1.5 py-1 ${
        isScrolled ? "shadow-md" : ""
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
              {/* Cart Icon for Mobile */}
              <Link href="/winkelwagen">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-primary p-2 min-h-[44px] min-w-[44px]"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {summary.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#E6C988] text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                      {summary.totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary p-2 min-h-[44px] min-w-[44px]"
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

                  {/* Products section with dropdown items */}
                  <div className="border-b border-neutral-200 pb-3">
                    <div className={`font-body py-3 text-base font-medium ${
                      isProductsActive() ? "text-accent" : "text-text-dark"
                    }`}>
                      PRODUCTEN
                    </div>
                    <div className="pl-4 space-y-2 max-h-64 overflow-y-auto">
                      {productCategories.map((category) => (
                        <Link key={category.href} href={category.href}>
                          <a
                            className="font-body text-sm text-text-medium hover:text-accent transition-colors cursor-pointer block py-1"
                            onClick={handleMobileNavClick}
                          >
                            {category.label}
                          </a>
                        </Link>
                      ))}
                    </div>
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
                    <Link href="/acties">
                      <Button
                        className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors min-h-[44px] text-base"
                        onClick={handleMobileNavClick}
                      >
                        Acties
                      </Button>
                    </Link>
                    <Link href="/offerte">
                      <Button
                        className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors min-h-[44px] text-base"
                        onClick={handleMobileNavClick}
                      >
                        Offerte
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button
                        className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors min-h-[44px] text-base"
                        onClick={handleMobileNavClick}
                      >
                        Shop
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          ) : (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {/* Products dropdown menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-body text-sm bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0 ${
                        isProductsActive()
                          ? "text-accent font-medium"
                          : "text-text-dark hover:text-accent"
                      } transition-colors`}
                    >
                      PRODUCTEN
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white shadow-lg border border-neutral-200 rounded-lg p-4 min-w-[280px] max-h-[80vh] overflow-y-auto">
                      <div className="grid gap-2">
                        {productCategories.map((category) => (
                          <NavigationMenuLink key={category.href} asChild>
                            <Link href={category.href}>
                              <a 
                                className="block px-3 py-2 text-sm text-text-dark hover:text-accent hover:bg-neutral-50 rounded-md transition-colors cursor-pointer"
                                onClick={handleNavClick}
                              >
                                {category.label}
                              </a>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`font-body text-sm ${
                      isActive(item.href)
                        ? "text-accent font-medium"
                        : "text-text-dark hover:text-accent"
                    } transition-colors cursor-pointer`}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="flex items-center gap-3">
                {/* Cart Icon for Desktop */}
                <Link href="/winkelwagen">
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="relative text-primary hover:text-accent transition-colors h-8 w-8"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {summary.totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#E6C988] text-gray-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                        {summary.totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
                
                <Link href="/acties">
                  <Button 
                    className="bg-[#D0B378] hover:bg-[#C5A565] text-white text-xs md:text-xs px-3 py-1 h-8 transition-colors"
                    onClick={handleNavClick}
                  >
                    Acties
                  </Button>
                </Link>
                <Link href="/offerte">
                  <Button 
                    className="bg-[#D0B378] hover:bg-[#C5A565] text-white text-xs md:text-xs px-3 py-1 h-8 transition-colors"
                    onClick={handleNavClick}
                  >
                    Offerte
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button 
                    className="bg-[#D0B378] hover:bg-[#C5A565] text-white text-xs md:text-xs px-3 py-1 h-8 transition-colors"
                    onClick={handleNavClick}
                  >
                    Shop
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
