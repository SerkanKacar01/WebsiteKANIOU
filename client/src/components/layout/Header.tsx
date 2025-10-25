import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
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

import { kaniouLogo } from "@/assets";



const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();


  // Define navigation items
  const navItems = [
    { label: "Galerij", href: "/gallerij" },
    { label: "Over Ons", href: "/overons" },
    { label: "Contact", href: "/contact" },
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
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 md:py-1.5 py-1 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-gradient-to-b from-black/50 via-black/30 to-transparent backdrop-blur-sm"
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
                    className={`p-2 min-h-[44px] min-w-[44px] transition-colors ${
                      isScrolled ? "text-gray-700" : "text-white drop-shadow-lg"
                    }`}
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

              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`font-body text-sm transition-colors cursor-pointer ${
                      isActive(item.href)
                        ? isScrolled 
                          ? "text-[#D5B992] font-semibold" 
                          : "text-[#E6C988] font-semibold drop-shadow-lg"
                        : isScrolled
                          ? "text-gray-700 hover:text-[#D5B992]"
                          : "text-white hover:text-[#E6C988] drop-shadow-md"
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
                    className={`text-sm font-medium px-4 py-2 h-10 transition-all duration-300 rounded-md ${
                      isScrolled
                        ? "bg-[#D5B992] hover:bg-[#C5A565] text-white shadow-md"
                        : "bg-white/90 hover:bg-white text-[#2C3E50] shadow-xl backdrop-blur-sm"
                    }`}
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
