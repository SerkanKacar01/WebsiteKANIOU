import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search, ShoppingBag, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import { kaniouLogo } from "@/assets";

const MobileHeader = () => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Quick access items for mobile
  const quickActions = [
    { icon: Phone, label: "Bellen", href: "/contact", color: "text-green-600" },
    { icon: MessageCircle, label: "Chat", action: "openChat", color: "text-blue-600" },
    { icon: Search, label: "Zoeken", href: "/products", color: "text-purple-600" },
    { icon: ShoppingBag, label: "Offerte", href: "/quote", color: "text-orange-600" },
  ];

  // Product categories for mobile menu (matching desktop)
  const productCategories = [
    { label: "Overgordijnen", href: "/producten/overgordijnen" },
    { label: "Vitrages", href: "/producten/vitrages" },
    { label: "Rolgordijnen", href: "/producten/rolgordijnen" },
    { label: "Duo rolgordijnen", href: "/producten/duo-rolgordijnen" },
    { label: "Jaloezieën", href: "/producten/jaloezieen" },
    { label: "Shutters", href: "/producten/shutters" },
    { label: "Plissés & Horren", href: "/producten/plisse-horren" },
    { label: "SQUID textile foil", href: "/producten/squid" },
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

  const openChatbot = () => {
    // Trigger chatbot opening
    const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
    handleCloseSheet();
  };

  const handleQuickAction = (action: string, href?: string) => {
    if (action === "openChat") {
      openChatbot();
    } else if (href) {
      window.location.href = href;
    }
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
            <SheetContent side="left" className="p-0 w-80">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
                  <div className="flex items-center space-x-3">
                    <img src={kaniouLogo} alt="KANIOU" className="h-8 brightness-0 invert" />
                    <span className="font-semibold">Menu</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCloseSheet} className="text-white hover:bg-white/20">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 p-4 border-b">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex flex-col items-center py-3 h-auto space-y-1"
                      onClick={() => handleQuickAction(action.action || '', action.href)}
                    >
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {/* PRODUCTEN section with dropdown items */}
                    <div className="border-b border-neutral-200 pb-3">
                      <div className="font-body py-3 text-base font-medium text-text-dark">
                        PRODUCTEN
                      </div>
                      <div className="pl-4 space-y-2">
                        {productCategories.map((category) => (
                          <Link key={category.href} href={category.href}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-left py-2 h-auto text-sm text-text-medium hover:text-accent transition-colors"
                              onClick={handleNavClick}
                            >
                              {category.label}
                            </Button>
                          </Link>
                        ))}
                        <Link href="/shop">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-left py-2 h-auto text-sm text-accent hover:text-accent-dark transition-colors font-medium"
                            onClick={handleNavClick}
                          >
                            Alle Producten →
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <Link href="/gallerij">
                      <Button variant="ghost" className="w-full justify-start text-left py-3 border-b border-neutral-200" onClick={handleNavClick}>
                        {t("GALLERIJ")}
                      </Button>
                    </Link>
                    
                    <Link href="/zakelijk">
                      <Button variant="ghost" className="w-full justify-start text-left py-3 border-b border-neutral-200" onClick={handleNavClick}>
                        ZAKELIJK
                      </Button>
                    </Link>
                    
                    <Link href="/overons">
                      <Button variant="ghost" className="w-full justify-start text-left py-3 border-b border-neutral-200" onClick={handleNavClick}>
                        {t("OVER ONS")}
                      </Button>
                    </Link>
                    
                    <Link href="/contact">
                      <Button variant="ghost" className="w-full justify-start text-left py-3 border-b border-neutral-200" onClick={handleNavClick}>
                        {t("CONTACT")}
                      </Button>
                    </Link>

                    <div className="mt-4 space-y-3">
                      <Link href="/acties">
                        <Button
                          className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors"
                          onClick={handleNavClick}
                        >
                          Acties
                        </Button>
                      </Link>
                      <Link href="/offerte">
                        <Button
                          className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors"
                          onClick={handleNavClick}
                        >
                          Offerte
                        </Button>
                      </Link>
                      <Link href="/shop">
                        <Button
                          className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white transition-colors"
                          onClick={handleNavClick}
                        >
                          Shop
                        </Button>
                      </Link>
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
          
          <div 
            className="flex flex-col items-center justify-center space-y-1 h-full text-gray-600 cursor-pointer"
            onClick={openChatbot}
          >
            <div className="text-lg">💬</div>
            <span className="text-xs font-medium">Chat</span>
          </div>
          
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