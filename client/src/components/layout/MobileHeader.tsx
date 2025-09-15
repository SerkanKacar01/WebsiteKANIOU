import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search, Phone, MessageCircle, ChevronRight, FileText, Sparkles, Star, Zap, Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import { kaniouLogo } from "@/assets";

// Mobile Tooltip Component for track order button
const MobileTooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleTouchStart = () => {
    setShowTooltip(true);
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  const handleTouchEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setTimeout(() => setShowTooltip(false), 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipClasses = `
    absolute z-[9999] bg-[#f9f3e6] text-[#333] px-2.5 py-1.5 rounded-md
    transition-opacity duration-200 ease-in-out whitespace-nowrap max-w-[180px] text-center
    shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
    bottom-full mb-2 left-1/2 -translate-x-1/2
  `;

  return (
    <div className="relative">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
      <div className={tooltipClasses} style={{ fontSize: '13px' }}>
        {text}
      </div>
    </div>
  );
};

const MobileHeader = () => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const ticking = useRef(false);
  const prefersReducedMotion = useRef(false);

  // Enhanced quick access items with luxury styling
  const quickActions = [
    { 
      icon: Phone, 
      label: "Bellen", 
      href: "/contact", 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      hoverBg: "hover:bg-emerald-100",
      emoji: "📞"
    },
    { 
      icon: MessageCircle, 
      label: "Contact", 
      href: "/contact", 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      emoji: "💬"
    },
    { 
      icon: Camera, 
      label: "Gallerij", 
      href: "/gallerij", 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
      emoji: "📸"
    },
    { 
      icon: Sparkles, 
      label: "Offerte", 
      href: "/offerte", 
      color: "text-gold-600",
      bgColor: "bg-gold-50",
      hoverBg: "hover:bg-gold-100",
      emoji: "✨"
    },
  ];

  // Navigation items with luxury styling
  const navItems = [
    { label: "Galerij", href: "/gallerij", icon: "📸", color: "text-purple-600" },
    { label: "Zakelijk", href: "/zakelijk", icon: "🏢", color: "text-blue-600" },
    { label: "Over Ons", href: "/overons", icon: "ℹ️", color: "text-green-600" },
    { label: "Contact", href: "/contact", icon: "📞", color: "text-orange-600" },
  ];

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
    
    // Enhanced scroll detection
    if (currentScrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Smart header visibility (respect motion preference)
    if (prefersReducedMotion.current) {
      setIsHeaderVisible(true);
    } else {
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      } else {
        setIsHeaderVisible(true);
      }
    }
    
    lastScrollYRef.current = currentScrollY;
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCloseSheet = () => {
    setSheetOpen(false);
  };

  const handleNavClick = () => {
    scrollToTop('instant');
    handleCloseSheet();
  };

  const handleQuickAction = () => {
    // Use proper SPA navigation handled by Link components
    handleCloseSheet();
  };

  return (
    <>
      {/* Luxury Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "nav-luxury-glass-scrolled py-2" : "nav-luxury-glass py-3"
      } ${
        isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-90"
      }`}>
        <div className="flex items-center justify-between px-4">
          {/* Luxury Menu Button */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-2 touch-feedback nav-link-luxury rounded-xl group hover:scale-110 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:bg-gold-100"
                aria-label="Open navigation menu"
                data-testid="button-menu-mobile"
              >
                <Menu className={`h-6 w-6 text-gold-700 transition-all duration-300 ${
                  sheetOpen ? "rotate-180" : (prefersReducedMotion.current ? '' : "group-hover:rotate-12")
                }`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 mobile-sheet-luxury shadow-2xl border-r border-gold-200">
              <div className="flex flex-col h-full backdrop-blur-xl">
                {/* Luxury Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gold-200 bg-gradient-to-r from-gold-50 to-gold-100">
                  <div className="flex items-center space-x-3">
                    <img src={kaniouLogo} alt="KANIOU" className="h-8 logo-luxury" />
                    <div className="flex flex-col">
                      <span className="text-title-lg font-bold text-gold-800 text-shadow-luxury-medium">Menu</span>
                      <span className="text-caption text-gold-600 text-shadow-luxury-soft">Luxe Raamdecoratie</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleCloseSheet} 
                    className="touch-feedback text-gold-700 hover:bg-gold-200/50 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                    aria-label="Close navigation menu"
                    data-testid="button-close-menu-mobile"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Luxury Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4 p-6 border-b border-gold-100 bg-gradient-to-b from-white to-gold-50/30">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`quick-action-luxury flex flex-col items-center py-4 h-auto space-y-2 ${action.bgColor} ${action.hoverBg} border-gold-200 min-h-[70px] group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 w-full`}
                        onClick={handleQuickAction}
                        style={{
                          animationDelay: prefersReducedMotion.current ? '0s' : `${0.1 + index * 0.1}s`,
                          animation: prefersReducedMotion.current ? 'none' : 'mobile-fade-in-up 0.6s ease-out both'
                        }}
                        data-testid={`button-${action.label.toLowerCase()}`}
                      >
                        <div className="relative z-10 flex flex-col items-center space-y-1">
                          <div className={`text-xl group-hover:scale-125 transition-transform duration-300 ${prefersReducedMotion.current ? 'transform-none transition-none' : ''}`}>
                            {action.emoji}
                          </div>
                          <action.icon className={`h-4 w-4 ${action.color} opacity-80`} />
                          <span className="text-caption font-bold text-gray-700 text-shadow-luxury-soft">{action.label}</span>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>

                {/* Luxury Main Navigation */}
                <div className="flex-1 overflow-y-auto mobile-nav-scroll">
                  <div className="p-4 space-y-2">
                    {navItems.map((item, index) => (
                      <Link key={item.href} href={item.href}>
                        <div
                          className="mobile-nav-item py-4 px-4 cursor-pointer rounded-lg transition-all duration-300 hover:bg-gold-50 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:bg-gold-50"
                          onClick={handleNavClick}
                          style={{
                            animationDelay: prefersReducedMotion.current ? '0s' : `${0.3 + index * 0.1}s`,
                            animation: prefersReducedMotion.current ? 'none' : 'mobile-slide-in 0.6s ease-out both'
                          }}
                          data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`text-2xl group-hover:scale-125 transition-transform duration-300 ${prefersReducedMotion.current ? 'transform-none transition-none' : ''}`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className={`text-body font-semibold text-gray-800 group-hover:${item.color} text-shadow-luxury-soft`}>
                                <span className="text-gradient-subtle">{item.label}</span>
                              </div>
                              <div className={`text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${prefersReducedMotion.current ? 'transition-none' : ''}`}>
                                {item.href === "/gallerij" && "Bekijk onze portfolio"}
                                {item.href === "/zakelijk" && "Business oplossingen"}
                                {item.href === "/overons" && "Ons verhaal"}
                                {item.href === "/contact" && "Neem contact op"}
                              </div>
                            </div>
                            <ChevronRight className={`h-4 w-4 text-gray-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300 ${prefersReducedMotion.current ? 'transform-none transition-none' : ''}`} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Luxury Mobile Menu Footer */}
                <div className="border-t border-gold-100 bg-gradient-to-r from-gold-50 to-white p-6">
                  <Link href="/offerte">
                    <Button 
                      className="btn-luxury w-full min-h-[52px] text-base group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gold-500"
                      onClick={handleNavClick}
                      data-testid="button-offerte-mobile-menu"
                    >
                      <span className="relative z-10 flex items-center">
                        <Sparkles className={`h-5 w-5 mr-3 ${prefersReducedMotion.current ? '' : 'group-hover:animate-pulse'}`} />
<span className="text-body font-bold text-shadow-luxury-medium text-glow-subtle">Gratis Offerte Aanvragen</span>
                        <Star className={`h-4 w-4 ml-3 opacity-70 group-hover:opacity-100 ${prefersReducedMotion.current ? '' : 'group-hover:animate-bounce'}`} />
                      </span>
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-gray-500 mt-3">
<span className="text-caption text-shadow-luxury-soft">Binnen 24 uur een persoonlijk advies</span>
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Luxury Logo */}
          <Link href="/">
            <div className="flex-1 flex justify-center group" onClick={() => scrollToTop('instant')}>
              <div className="logo-luxury flex items-center">
                <img
                  src={kaniouLogo}
                  alt="KANIOU zilvernaald"
                  className={`transition-all duration-500 ease-out ${
                    isScrolled ? "h-8" : "h-10"
                  } group-hover:scale-105`}
                />
                <Sparkles className={`h-3 w-3 ml-2 text-gold-400 opacity-0 group-hover:opacity-70 transition-all duration-500 transform group-hover:rotate-12 ${prefersReducedMotion.current ? 'transition-none transform-none' : ''}`} />
              </div>
            </div>
          </Link>

          {/* Luxury Quick Contact */}
          <Link href="/contact">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2 touch-feedback nav-link-luxury rounded-xl group hover:scale-110 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:bg-gold-100"
              aria-label="Contact us"
              data-testid="button-contact-quick"
            >
              <Phone className={`h-5 w-5 text-emerald-600 ${prefersReducedMotion.current ? '' : 'group-hover:animate-pulse'}`} />
            </Button>
          </Link>
        </div>
      </header>



      {/* Luxury Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bottom-nav-luxury backdrop-blur-xl">
        <div className="grid grid-cols-4 h-20 px-2 py-2">
          {/* Home */}
          <Link href="/">
            <div className={`bottom-nav-item flex flex-col items-center justify-center space-y-2 h-full rounded-xl transition-all duration-300 group ${
              location === "/" 
                ? "bottom-nav-item-active bg-gradient-to-b from-gold-100 to-gold-50 text-gold-700" 
                : "text-gray-600 hover:bg-gold-50/50 hover:text-gold-600"
            }`}>
              <div className="relative">
                <div className={`text-xl transition-all duration-300 ${
                  location === "/" ? "scale-125" : (prefersReducedMotion.current ? '' : "group-hover:scale-110")
                }`}>
                  🏠
                </div>
                {location === "/" && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className={`text-xs font-semibold transition-all duration-300 ${
                location === "/" ? "text-gold-800" : "text-gray-600 group-hover:text-gold-700"
              }`}>
<span className="text-caption font-bold text-shadow-luxury-soft">Home</span>
              </span>
            </div>
          </Link>
          
          {/* Gallery */}
          <Link href="/gallerij">
            <div className={`bottom-nav-item flex flex-col items-center justify-center space-y-2 h-full rounded-xl transition-all duration-300 group ${
              location.startsWith("/gallerij") 
                ? "bottom-nav-item-active bg-gradient-to-b from-purple-100 to-purple-50 text-purple-700" 
                : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600"
            }`}>
              <div className="relative">
                <div className={`text-xl transition-all duration-300 ${
                  location.startsWith("/gallerij") ? "scale-125" : (prefersReducedMotion.current ? '' : "group-hover:scale-110")
                }`}>
                  📸
                </div>
                {location.startsWith("/gallerij") && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className={`text-xs font-semibold transition-all duration-300 ${
                location.startsWith("/gallerij") ? "text-purple-800" : "text-gray-600 group-hover:text-purple-700"
              }`}>
<span className="text-caption font-bold text-shadow-luxury-soft">Gallerij</span>
              </span>
            </div>
          </Link>
          
          {/* Contact */}
          <Link href="/contact">
            <div className={`bottom-nav-item flex flex-col items-center justify-center space-y-2 h-full rounded-xl transition-all duration-300 group ${
              location.startsWith("/contact") 
                ? "bottom-nav-item-active bg-gradient-to-b from-blue-100 to-blue-50 text-blue-700" 
                : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-600"
            }`}>
              <div className="relative">
                <div className={`text-xl transition-all duration-300 ${
                  location.startsWith("/contact") ? (prefersReducedMotion.current ? "scale-125" : "scale-125 animate-pulse") : (prefersReducedMotion.current ? '' : "group-hover:scale-110")
                }`}>
                  💬
                </div>
                {location.startsWith("/contact") && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className={`text-xs font-semibold transition-all duration-300 ${
                location.startsWith("/contact") ? "text-blue-800" : "text-gray-600 group-hover:text-blue-700"
              }`}>
<span className="text-caption font-bold text-shadow-luxury-soft">Contact</span>
              </span>
            </div>
          </Link>
          
          {/* Quote */}
          <Link href="/offerte">
            <div className={`bottom-nav-item flex flex-col items-center justify-center space-y-2 h-full rounded-xl transition-all duration-300 group relative ${
              location.startsWith("/offerte") || location.startsWith("/quote")
                ? "bottom-nav-item-active bg-gradient-to-b from-gold-200 to-gold-100 text-gold-800" 
                : "text-gray-600 hover:bg-gold-100/50 hover:text-gold-700"
            }`}>
              <div className="relative">
                <div className={`text-xl transition-all duration-300 ${
                  location.startsWith("/offerte") || location.startsWith("/quote") 
                    ? "scale-125" : (prefersReducedMotion.current ? '' : "group-hover:scale-110")
                }`}>
                  ✨
                </div>
                {(location.startsWith("/offerte") || location.startsWith("/quote")) && (
                  <>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                    <Sparkles className="absolute -top-2 -left-2 h-3 w-3 text-gold-400 animate-pulse opacity-70" />
                  </>
                )}
                {/* Floating glow effect for CTA */}
                {!(location.startsWith("/offerte") || location.startsWith("/quote")) && (
                  <div className="absolute inset-0 bg-gold-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping pointer-events-none"></div>
                )}
              </div>
              <span className={`text-xs font-bold transition-all duration-300 ${
                location.startsWith("/offerte") || location.startsWith("/quote") 
                  ? "text-gold-900" : "text-gray-600 group-hover:text-gold-800"
              }`}>
<span className="text-caption font-bold text-shadow-luxury-soft text-gradient-luxury">Offerte</span>
              </span>
              
              {/* Premium CTA pulse indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
          </Link>
        </div>
        
        {/* Elegant bottom bar indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"></div>
      </div>
    </>
  );
};

export default MobileHeader;