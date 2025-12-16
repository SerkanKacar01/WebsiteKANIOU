import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import { kaniouLogo } from "@/assets";

const MobileHeader = () => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile submenu states
  const [mobileCollectieOpen, setMobileCollectieOpen] = useState(false);
  const [mobileHorrenOpen, setMobileHorrenOpen] = useState(false);
  const [mobileGordijnenOpen, setMobileGordijnenOpen] = useState(false);
  const [mobileOphangsystemenOpen, setMobileOphangsystemenOpen] = useState(false);
  const [mobileScreensOpen, setMobileScreensOpen] = useState(false);

  const productLinks = [
    { name: "Kunststof lamellen", path: "/producten/kunststof-lamellen" },
    { name: "Textiel lamellen", path: "/producten/textiel-lamellen" },
    { name: "Rolgordijnen", path: "/producten/rolgordijnen" },
    { name: "Duo Rolgordijnen", path: "/producten/duo-rolgordijnen" },
    { name: "Plissés", path: "/producten/plisse" },
    { name: "Duo Plissés", path: "/producten/duo-plisses" },
    { name: "Houten Jaloezieën", path: "/producten/houten-jaloezieen" },
    { name: "Aluminium Jaloezieën", path: "/producten/kunststof-jaloezieen" },
    { name: "Dakraam Zonweringen", path: "/producten/dakraam-zonweringen" },
  ];

  const horrenLinks = [
    { name: "Schuif deur horren", path: "/producten/horren" },
    { name: "Draai hordeuren", path: "/producten/horren" },
    { name: "Opzet horren", path: "/producten/opzethorren" },
    { name: "Inzet horren", path: "/producten/inzethorren" },
    { name: "Plisse hordeuren", path: "/producten/plisse-hordeuren" },
  ];

  const gordijnenLinks = [
    { name: "Inbetweens", path: "/producten/vitrages" },
    { name: "Overgordijnen", path: "/producten/overgordijnen" },
    { name: "Vitrages", path: "/producten/vitrages" },
  ];

  const ophangsystemenLinks = [
    { name: "Gordijn rails", path: "/producten/gordijnrails" },
    { name: "Gordijn roedes", path: "/producten/gordijnroedes" },
  ];

  const screensLinks = [
    { name: "Inside", path: "/producten/screens-inside" },
    { name: "Outside", path: "/producten/screens-outside" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = (path: string) => {
    scrollToTop('instant');
    setSheetOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300 ${
        isScrolled ? "shadow-md py-2" : "py-3"
      }`}>
        <div className="flex items-center justify-between px-4">
          {/* Menu Button */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2 min-h-[44px] min-w-[44px] text-gray-700 hover:text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[320px] overflow-y-auto">
              <div className="flex flex-col h-full bg-white">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <button onClick={() => { handleMobileNavClick("/"); setSheetOpen(false); }} className="flex items-center transition-all hover:opacity-70">
                    <img src={kaniouLogo} alt="KANIOU" className="h-8 w-auto" />
                  </button>
                  <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)} className="h-8 w-8 text-gray-700 hover:text-black">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-1">
                    {/* Collectie */}
                    <div className="border-b border-gray-100">
                      <button
                        onClick={() => setMobileCollectieOpen(!mobileCollectieOpen)}
                        className="w-full flex items-center justify-between py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <span>Collectie</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileCollectieOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileCollectieOpen && (
                        <div className="pl-4 pb-2 space-y-2 bg-gray-50/50">
                          {productLinks.map((product) => (
                            <Link key={product.name} href={product.path}>
                              <button
                                onClick={() => handleMobileNavClick(product.path)}
                                className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-200"
                              >
                                {product.name}
                              </button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Horren */}
                    <div className="border-b border-gray-100">
                      <button
                        onClick={() => setMobileHorrenOpen(!mobileHorrenOpen)}
                        className="w-full flex items-center justify-between py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <span>Horren</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileHorrenOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileHorrenOpen && (
                        <div className="pl-4 pb-2 space-y-2 bg-gray-50/50">
                          {horrenLinks.map((product) => (
                            <Link key={product.name} href={product.path}>
                              <button
                                onClick={() => handleMobileNavClick(product.path)}
                                className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-200"
                              >
                                {product.name}
                              </button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Gordijnen */}
                    <div className="border-b border-gray-100">
                      <button
                        onClick={() => setMobileGordijnenOpen(!mobileGordijnenOpen)}
                        className="w-full flex items-center justify-between py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <span>Gordijnen</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileGordijnenOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileGordijnenOpen && (
                        <div className="pl-4 pb-2 space-y-2 bg-gray-50/50">
                          {gordijnenLinks.map((product) => (
                            <Link key={product.name} href={product.path}>
                              <button
                                onClick={() => handleMobileNavClick(product.path)}
                                className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-200"
                              >
                                {product.name}
                              </button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Ophangsystemen */}
                    <div className="border-b border-gray-100">
                      <button
                        onClick={() => setMobileOphangsystemenOpen(!mobileOphangsystemenOpen)}
                        className="w-full flex items-center justify-between py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <span>Ophangsystemen</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileOphangsystemenOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileOphangsystemenOpen && (
                        <div className="pl-4 pb-2 space-y-2 bg-gray-50/50">
                          {ophangsystemenLinks.map((product) => (
                            <Link key={product.name} href={product.path}>
                              <button
                                onClick={() => handleMobileNavClick(product.path)}
                                className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-200"
                              >
                                {product.name}
                              </button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Screens */}
                    <div className="border-b border-gray-100">
                      <button
                        onClick={() => setMobileScreensOpen(!mobileScreensOpen)}
                        className="w-full flex items-center justify-between py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <span>Screens</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileScreensOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileScreensOpen && (
                        <div className="pl-4 pb-2 space-y-2 bg-gray-50/50">
                          {screensLinks.map((product) => (
                            <Link key={product.name} href={product.path}>
                              <button
                                onClick={() => handleMobileNavClick(product.path)}
                                className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-200"
                              >
                                {product.name}
                              </button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vouwgordijnen */}
                    <div className="border-b border-gray-100">
                      <Link href="/producten/vouwgordijnen">
                        <button
                          onClick={() => handleMobileNavClick("/producten/vouwgordijnen")}
                          className="w-full py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium text-left"
                        >
                          Vouwgordijnen
                        </button>
                      </Link>
                    </div>

                    {/* Houten Shutters */}
                    <div className="border-b border-gray-100">
                      <Link href="/producten/houten-shutters">
                        <button
                          onClick={() => handleMobileNavClick("/producten/houten-shutters")}
                          className="w-full py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium text-left"
                        >
                          Houten Shutters
                        </button>
                      </Link>
                    </div>

                    {/* Other Pages */}
                    <div className="border-b border-gray-100">
                      <Link href="/gallerij">
                        <button
                          onClick={() => handleMobileNavClick("/gallerij")}
                          className="w-full py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium text-left"
                        >
                          {t("GALLERIJ")}
                        </button>
                      </Link>
                    </div>

                    <div className="border-b border-gray-100">
                      <Link href="/zakelijk">
                        <button
                          onClick={() => handleMobileNavClick("/zakelijk")}
                          className="w-full py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium text-left"
                        >
                          Zakelijk
                        </button>
                      </Link>
                    </div>

                    <div className="border-b border-gray-100">
                      <Link href="/overons">
                        <button
                          onClick={() => handleMobileNavClick("/overons")}
                          className="w-full py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium text-left"
                        >
                          {t("OVER ONS")}
                        </button>
                      </Link>
                    </div>

                    <div>
                      <Link href="/contact">
                        <button
                          onClick={() => handleMobileNavClick("/contact")}
                          className="w-full py-4 px-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium text-left"
                        >
                          {t("CONTACT")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Footer - CTA Buttons */}
                <div className="border-t border-gray-100 bg-white p-4 space-y-3">
                  <Link href="/contact">
                    <button
                      onClick={() => handleMobileNavClick("/contact")}
                      className="w-full border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-3 text-xs tracking-widest uppercase transition-all duration-500 font-medium"
                    >
                      Contact
                    </button>
                  </Link>
                  <Link href="/offerte">
                    <button
                      onClick={() => handleMobileNavClick("/offerte")}
                      className="w-full bg-[#C4A36C] hover:bg-[#B39356] text-white px-6 py-3 text-xs tracking-widest uppercase transition-all duration-500 font-medium hover:shadow-lg"
                    >
                      Offerte Aanvragen
                    </button>
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
          <Link href="/contact">
            <Button variant="ghost" size="icon" className="p-2 min-h-[44px] min-w-[44px] text-gray-700 hover:text-black">
              <Phone className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg">
        <div className="grid grid-cols-4 h-16">
          <Link href="/">
            <div className={`flex flex-col items-center justify-center space-y-1 h-full transition-all ${
              location === "/" ? "text-black bg-gray-50" : "text-gray-600"
            }`}>
              <div className="text-xl">🏠</div>
              <span className="text-xs font-medium">Home</span>
            </div>
          </Link>
          
          <Link href="/gallerij">
            <div className={`flex flex-col items-center justify-center space-y-1 h-full transition-all ${
              location.startsWith("/gallerij") ? "text-black bg-gray-50" : "text-gray-600"
            }`}>
              <div className="text-xl">📸</div>
              <span className="text-xs font-medium">Gallerij</span>
            </div>
          </Link>
          
          <Link href="/contact">
            <div className="flex flex-col items-center justify-center space-y-1 h-full text-gray-600 cursor-pointer hover:text-black hover:bg-gray-50 transition-all">
              <div className="text-xl">💬</div>
              <span className="text-xs font-medium">Contact</span>
            </div>
          </Link>
          
          <Link href="/offerte">
            <div className={`flex flex-col items-center justify-center space-y-1 h-full transition-all ${
              location === "/offerte" ? "text-black bg-gray-50" : "text-gray-600"
            }`}>
              <div className="text-xl">📋</div>
              <span className="text-xs font-medium">Offerte</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
