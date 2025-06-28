import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search, ShoppingBag, Phone, MessageCircle, ChevronRight } from "lucide-react";
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

  // Quick access items for mobile
  const quickActions = [
    { icon: Phone, label: "Bellen", href: "/contact", color: "text-green-600" },
    { icon: MessageCircle, label: "Contact", href: "/contact", color: "text-blue-600" },
    { icon: Search, label: "Zoeken", href: "/products", color: "text-purple-600" },
    { icon: ShoppingBag, label: "Offerte", href: "/quote", color: "text-orange-600" },
  ];

  // Organized product categories matching desktop layout exactly
  const mobileCategories = [
    {
      title: "Gordijnen",
      items: [
        { label: "Overgordijnen", href: "/producten/overgordijnen" },
        { label: "Vitrages", href: "/producten/vitrages" },
        { label: "Rolgordijnen", href: "/producten/rolgordijnen" },
        { label: "Duo rolgordijnen", href: "/producten/duo-rolgordijnen" },
      ]
    },
    {
      title: "Lamellen & Jaloezieën",
      items: [
        { label: "Textiel lamellen", href: "/producten/textiel-lamellen" },
        { label: "Kunststof lamellen", href: "/producten/kunststof-lamellen" },
        { label: "Houten jaloezieën", href: "/producten/houten-jaloezieen" },
        { label: "Kunststof jaloezieën", href: "/producten/kunststof-jaloezieen" },
      ]
    },
    {
      title: "Zonwering",
      items: [
        { label: "Plissé", href: "/producten/plisse" },
        { label: "Duo plissé", href: "/producten/duo-plisse" },
        { label: "Dakraam zonweringen", href: "/producten/dakraam-zonweringen" },
        { label: "Houten shutters", href: "/producten/houten-shutters" },
        { label: "Textiel raamfolie", href: "/producten/textiel-raamfolie" },
      ]
    },
    {
      title: "Horren",
      items: [
        { label: "Inzethorren", href: "/producten/inzethorren" },
        { label: "Opzethorren", href: "/producten/opzethorren" },
        { label: "Plissé hordeuren", href: "/producten/plisse-hordeuren" },
      ]
    },
    {
      title: "Accessoires",
      items: [
        { label: "Gordijnrails", href: "/producten/gordijnrails" },
        { label: "Gordijnroedes", href: "/producten/gordijnroedes" },
        { label: "SQUID textile foil", href: "/producten/squid" },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSheet = () => {
    setSheetOpen(false);
  };

  const handleNavClick = () => {
    scrollToTop('instant');
    handleCloseSheet();
  };

  const handleQuickAction = (href: string) => {
    window.location.href = href;
    handleCloseSheet();
  };

  return (
    <>
      {/* Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-lg py-2" : "py-3"
      }`}>
        <div className="flex items-center justify-between px-4">
          {/* Menu Button */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2">
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-primary/90 text-white">
                  <div className="flex items-center space-x-3">
                    <img src={kaniouLogo} alt="KANIOU" className="h-8 brightness-0 invert" />
                    <span className="font-semibold text-lg">Menu</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCloseSheet} className="text-white hover:bg-white/20 rounded-full transition-all duration-200">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 p-4 border-b bg-gray-50/50">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex flex-col items-center py-3 h-auto space-y-1 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 min-h-[60px]"
                      onClick={() => handleQuickAction(action.href)}
                    >
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  ))}
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    <Link href="/producten">
                      <Button variant="ghost" className="w-full justify-start text-left" onClick={handleNavClick}>
                        🛍️ SHOP
                      </Button>
                    </Link>
                    
                    <Link href="/gallerij">
                      <Button variant="ghost" className="w-full justify-start text-left" onClick={handleNavClick}>
                        📸 {t("GALLERIJ")}
                      </Button>
                    </Link>
                    
                    <Link href="/zakelijk">
                      <Button variant="ghost" className="w-full justify-start text-left" onClick={handleNavClick}>
                        🏢 Zakelijk
                      </Button>
                    </Link>
                    
                    <Link href="/overons">
                      <Button variant="ghost" className="w-full justify-start text-left" onClick={handleNavClick}>
                        ℹ️ {t("OVER ONS")}
                      </Button>
                    </Link>
                    
                    <Link href="/contact">
                      <Button variant="ghost" className="w-full justify-start text-left" onClick={handleNavClick}>
                        📞 {t("CONTACT")}
                      </Button>
                    </Link>
                  </div>

                  {/* Product Categories */}
                  <div className="border-t bg-gradient-to-b from-gray-50 to-white">
                    <div className="p-4">
                      <h3 className="font-semibold text-primary mb-4 text-lg flex items-center">
                        🛍️ Producten
                      </h3>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto mobile-nav-scroll pr-2">
                        {mobileCategories.map((category, categoryIndex) => (
                          <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                            <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3 border-b border-gray-100">
                              <h4 className="font-semibold text-sm text-primary uppercase tracking-wide flex items-center">
                                {category.title}
                              </h4>
                            </div>
                            <div className="p-2 space-y-1">
                              {category.items.map((item, itemIndex) => (
                                <Link key={itemIndex} href={item.href}>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full justify-between text-left py-3 h-auto text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 min-h-[44px] rounded-md group active:scale-[0.98] hover:shadow-sm"
                                    onClick={handleNavClick}
                                  >
                                    <span className="truncate">{item.label}</span>
                                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="border-t bg-gray-50 p-4">
                  <Link href="/quote">
                    <Button className="w-full bg-primary hover:bg-accent" onClick={handleNavClick}>
                      🎯 Gratis Offerte Aanvragen
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/">
            <div className="flex-1 flex justify-center" onClick={() => scrollToTop('instant')}>
              <img
                src={kaniouLogo}
                alt="KANIOU zilvernaald"
                className={`transition-all duration-300 ${isScrolled ? "h-8" : "h-10"}`}
              />
            </div>
          </Link>

          {/* Quick Contact */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-2"
            onClick={() => window.location.href = '/contact'}
          >
            <Phone className="h-5 w-5 text-green-600" />
          </Button>
        </div>
      </header>

      {/* Order Tracking Button - Above Bottom Navigation */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <MobileTooltip text="Volg uw bestelling">
          <Link href="/volg-bestelling">
            <button className="w-full bg-[#E6C988] text-white font-medium py-3 px-5 rounded-xl shadow-lg hover:bg-[#D5B992] transition-all duration-200 active:scale-[0.98]">
              Volg uw bestelling
            </button>
          </Link>
        </MobileTooltip>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
        <div className="grid grid-cols-4 h-16">
          <Link href="/">
            <div className={`flex flex-col items-center justify-center space-y-1 h-full ${
              location === "/" ? "text-primary bg-primary/10" : "text-gray-600"
            }`}>
              <div className="text-lg">🏠</div>
              <span className="text-xs font-medium">Home</span>
            </div>
          </Link>
          
          <Link href="/producten">
            <div className={`flex flex-col items-center justify-center space-y-1 h-full ${
              location.startsWith("/producten") || location.startsWith("/products") || location.startsWith("/shop") ? "text-primary bg-primary/10" : "text-gray-600"
            }`}>
              <div className="text-lg">🛍️</div>
              <span className="text-xs font-medium">Shop</span>
            </div>
          </Link>
          
          <Link href="/contact">
            <div className="flex flex-col items-center justify-center space-y-1 h-full text-gray-600 cursor-pointer">
              <div className="text-lg">💬</div>
              <span className="text-xs font-medium">Contact</span>
            </div>
          </Link>
          
          <Link href="/quote">
            <div className={`flex flex-col items-center justify-center space-y-1 h-full ${
              location === "/quote" ? "text-primary bg-primary/10" : "text-gray-600"
            }`}>
              <div className="text-lg">📋</div>
              <span className="text-xs font-medium">Offerte</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;