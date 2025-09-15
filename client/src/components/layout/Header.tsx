import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sparkles } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import LanguageSelector from "./LanguageSelector";
import NewsletterSignup from "./NewsletterSignup";
import { kaniouLogo } from "@/assets";



const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();

  // Define navigation items with icons for luxury experience
  const navItems = [
    { label: "Galerij", href: "/gallerij", icon: "🖼️" },
    { label: "Over Ons", href: "/overons", icon: "ℹ️" },
    { label: "Contact", href: "/contact", icon: "📞" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('up');
  const lastScrollYRef = useRef(0);
  const ticking = useRef(false);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized scroll handler with requestAnimationFrame throttling
  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const lastScrollY = lastScrollYRef.current;
    
    // Determine scroll direction for advanced animations (only if motion allowed)
    if (!prefersReducedMotion.current) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
    }
    
    lastScrollYRef.current = currentScrollY;
    
    // Enhanced scroll detection with smoother transitions
    if (currentScrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Header visibility based on scroll behavior (respect motion preference)
    if (prefersReducedMotion.current) {
      setIsHeaderVisible(true);
    } else {
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      } else {
        setIsHeaderVisible(true);
      }
    }
    
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  // Single passive scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
      className={`sticky top-0 z-50 w-full transition-all duration-700 ease-out ${
        isScrolled 
          ? "nav-luxury-glass-scrolled md:py-2 py-1.5" 
          : "nav-luxury-glass md:py-3 py-2"
      } ${
        isHeaderVisible 
          ? "translate-y-0 opacity-100" 
          : "-translate-y-full opacity-95"
      }`}
      style={{
        backdropFilter: `blur(${isScrolled ? '32px' : '24px'}) saturate(${isScrolled ? '180%' : '150%'})`
      }}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo with luxury hover effects */}
          <div className="flex items-center nav-staggered-item">
            <Link href="/">
              <div 
                className="logo-luxury flex items-center cursor-pointer group"
                onClick={() => scrollToTop('instant')}
              >
                <img
                  src={kaniouLogo}
                  alt="KANIOU zilvernaald"
                  className={`transition-all duration-500 ease-out ${
                    isScrolled ? "h-8 sm:h-10 md:h-12" : "h-10 sm:h-12 md:h-14"
                  }`}
                />
                {/* Subtle sparkle effect on logo hover */}
                <Sparkles className={`h-4 w-4 ml-2 text-gold-400 opacity-0 group-hover:opacity-70 transition-all duration-500 transform group-hover:rotate-12 ${prefersReducedMotion.current ? 'transition-none transform-none' : ''}`} />
              </div>
            </Link>
          </div>

          {isMobile ? (
            <div className="flex items-center gap-2 nav-staggered-item">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary p-2 min-h-[44px] min-w-[44px] touch-feedback transition-all duration-300 hover:scale-110 hover:bg-gold-50 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:bg-gold-100"
                    aria-label="Open navigation menu"
                    data-testid="button-menu"
                  >
                    <Menu className="h-6 w-6 transition-transform duration-300" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 mobile-sheet-luxury">
                  <div className="flex flex-col space-y-3 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <img
                          src={kaniouLogo}
                          alt="KANIOU zilvernaald"
                          className="h-10 logo-luxury"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCloseSheet}
                        className="touch-feedback transition-all duration-300 hover:scale-110 hover:rotate-90 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                        aria-label="Close navigation menu"
                        data-testid="button-close-menu"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {navItems.map((item, index) => (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={`mobile-nav-item py-4 px-4 border-b border-neutral-200 block text-body font-semibold text-shadow-luxury-soft cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:bg-gold-50 ${
                            isActive(item.href)
                              ? "text-gradient-luxury bg-gold-50"
                              : "text-text-dark hover:text-gradient-subtle"
                          }`}
                          onClick={handleMobileNavClick}
                          style={{
                            animationDelay: prefersReducedMotion.current ? '0s' : `${0.1 + index * 0.1}s`,
                            animation: prefersReducedMotion.current ? 'none' : 'mobile-fade-in-up 0.6s ease-out both'
                          }}
                          data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
                        >
                          <span className="mr-3 text-lg animate-text-glow-pulse">{item.icon}</span>
                          <span className="text-shadow-luxury-soft">{item.label}</span>
                        </div>
                      </Link>
                    ))}

                    <div className="mt-6 space-y-3">
                      <Link href="/offerte">
                        <Button
                          className="btn-luxury w-full min-h-[48px] text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gold-500"
                          onClick={handleMobileNavClick}
                          data-testid="button-offerte-mobile"
                        >
                          <Sparkles className="h-4 w-4 mr-2 animate-text-glow-pulse" />
                          <span className="text-body font-bold text-shadow-luxury-medium">VRIJBLIJVEND OFFERTE</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {/* Desktop Navigation Links with Luxury Effects */}
              {navItems.map((item, index) => (
                <div 
                  key={item.href} 
                  className="nav-staggered-item" 
                  style={{
                    animationDelay: prefersReducedMotion.current ? '0s' : `${0.2 + index * 0.1}s`
                  }}
                >
                  <Link href={item.href}>
                    <div
                      className={`nav-link-luxury text-body font-semibold text-shadow-luxury-soft cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:bg-gold-50 ${
                        isActive(item.href)
                          ? "nav-link-luxury-active text-gradient-luxury"
                          : "text-gray-700 hover:text-gradient-subtle"
                      }`}
                      onClick={handleNavClick}
                      data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
                    >
                      <span className="relative z-10 flex items-center">
                        <span className={`mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-text-glow-pulse ${prefersReducedMotion.current ? 'transition-none' : ''}`}>
                          {item.icon}
                        </span>
                        <span className="text-shadow-luxury-soft">{item.label}</span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}

              {/* Luxury CTA Button with Premium Effects */}
              <div 
                className="flex items-center ml-6 nav-staggered-item" 
                style={{
                  animationDelay: prefersReducedMotion.current ? '0s' : '0.5s'
                }}
              >
                <Link href="/offerte">
                  <Button 
                    className="btn-luxury text-sm font-medium px-6 py-3 group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gold-500"
                    onClick={handleNavClick}
                    data-testid="button-offerte-desktop"
                  >
                    <span className="relative z-10 flex items-center">
                      <Sparkles className={`h-4 w-4 mr-2 animate-text-glow-pulse ${prefersReducedMotion.current ? '' : 'group-hover:animate-spin'}`} />
                      <span className="text-body font-bold text-shadow-luxury-medium">VRIJBLIJVEND OFFERTE</span>
                    </span>
                    {/* Luxury shine effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out ${prefersReducedMotion.current ? 'hidden' : ''}`}></div>
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
