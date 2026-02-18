import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";

const Header = () => {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectieDropdownOpen, setIsCollectieDropdownOpen] = useState(false);
  const [isHorrenDropdownOpen, setIsHorrenDropdownOpen] = useState(false);
  const [isGordijnenDropdownOpen, setIsGordijnenDropdownOpen] = useState(false);
  const [isOphangsystemenDropdownOpen, setIsOphangsystemenDropdownOpen] = useState(false);
  const [isScreensDropdownOpen, setIsScreensDropdownOpen] = useState(false);

  // Mobile submenu states
  const [mobileCollectieOpen, setMobileCollectieOpen] = useState(false);
  const [mobileHorrenOpen, setMobileHorrenOpen] = useState(false);
  const [mobileGordijnenOpen, setMobileGordijnenOpen] = useState(false);
  const [mobileOphangsystemenOpen, setMobileOphangsystemenOpen] = useState(false);
  const [mobileScreensOpen, setMobileScreensOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleMobileNavClick = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm"
    >
      <div className="max-w-full mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <button 
            onClick={() => setLocation("/")}
            className="transition-all duration-500 hover:opacity-70 hover:scale-105"
            data-testid="nav-logo"
          >
            <img
              src={kaniouLogo}
              alt="KANIOU"
              className="h-10 lg:h-12 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Collectie Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsCollectieDropdownOpen(true)}
                onMouseLeave={() => setIsCollectieDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-collectie"
              >
                Collectie
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>

              {isCollectieDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsCollectieDropdownOpen(true)}
                  onMouseLeave={() => setIsCollectieDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {productLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsCollectieDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-product-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Horren Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsHorrenDropdownOpen(true)}
                onMouseLeave={() => setIsHorrenDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-horren"
              >
                Horren
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>

              {isHorrenDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsHorrenDropdownOpen(true)}
                  onMouseLeave={() => setIsHorrenDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {horrenLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsHorrenDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-horren-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Gordijnen Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsGordijnenDropdownOpen(true)}
                onMouseLeave={() => setIsGordijnenDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-gordijnen"
              >
                Gordijnen
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>

              {isGordijnenDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsGordijnenDropdownOpen(true)}
                  onMouseLeave={() => setIsGordijnenDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {gordijnenLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsGordijnenDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-gordijnen-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ophangsystemen Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsOphangsystemenDropdownOpen(true)}
                onMouseLeave={() => setIsOphangsystemenDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-ophangsystemen"
              >
                Ophangsystemen
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>

              {isOphangsystemenDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsOphangsystemenDropdownOpen(true)}
                  onMouseLeave={() => setIsOphangsystemenDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {ophangsystemenLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsOphangsystemenDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-ophangsystemen-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Screens Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsScreensDropdownOpen(true)}
                onMouseLeave={() => setIsScreensDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-screens"
              >
                Screens
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>

              {isScreensDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsScreensDropdownOpen(true)}
                  onMouseLeave={() => setIsScreensDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {screensLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsScreensDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-screens-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vouwgordijnen Link */}
            <button
              onClick={() => setLocation("/producten/vouwgordijnen")}
              className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative group"
              data-testid="nav-link-vouwgordijnen"
            >
              Vouwgordijnen
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
            </button>

            {/* Houten Shutters Link */}
            <button
              onClick={() => setLocation("/producten/houten-shutters")}
              className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative group"
              data-testid="nav-link-houten-shutters"
            >
              Houten Shutters
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLocation("/contact")}
              className="border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-3 text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-lg"
              data-testid="nav-cta-contact"
            >
              Contact
            </button>
            <button
              onClick={() => setLocation("/offerte")}
              className="bg-[#C4A36C] hover:bg-[#B39356] text-white px-8 py-3 text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-lg hover:scale-105"
              data-testid="nav-cta-offerte"
            >
              Offerte Aanvragen
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 min-h-[44px] min-w-[44px] text-gray-700 hover:text-black"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-[300px] overflow-y-auto">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <button onClick={() => setLocation("/")} className="flex items-center">
                      <img
                        src={kaniouLogo}
                        alt="KANIOU"
                        className="h-8 w-auto"
                      />
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="h-8 w-8"
                      data-testid="mobile-menu-close"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 p-4 space-y-2">
                    {/* Collectie */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setMobileCollectieOpen(!mobileCollectieOpen)}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Collectie</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileCollectieOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileCollectieOpen && (
                        <div className="pl-4 pb-2 space-y-1">
                          {productLinks.map((product) => (
                            <button
                              key={product.name}
                              onClick={() => handleMobileNavClick(product.path)}
                              className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black"
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Horren */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setMobileHorrenOpen(!mobileHorrenOpen)}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Horren</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileHorrenOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileHorrenOpen && (
                        <div className="pl-4 pb-2 space-y-1">
                          {horrenLinks.map((product) => (
                            <button
                              key={product.name}
                              onClick={() => handleMobileNavClick(product.path)}
                              className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black"
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Gordijnen */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setMobileGordijnenOpen(!mobileGordijnenOpen)}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Gordijnen</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileGordijnenOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileGordijnenOpen && (
                        <div className="pl-4 pb-2 space-y-1">
                          {gordijnenLinks.map((product) => (
                            <button
                              key={product.name}
                              onClick={() => handleMobileNavClick(product.path)}
                              className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black"
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Ophangsystemen */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setMobileOphangsystemenOpen(!mobileOphangsystemenOpen)}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Ophangsystemen</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileOphangsystemenOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileOphangsystemenOpen && (
                        <div className="pl-4 pb-2 space-y-1">
                          {ophangsystemenLinks.map((product) => (
                            <button
                              key={product.name}
                              onClick={() => handleMobileNavClick(product.path)}
                              className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black"
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Screens */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setMobileScreensOpen(!mobileScreensOpen)}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Screens</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileScreensOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileScreensOpen && (
                        <div className="pl-4 pb-2 space-y-1">
                          {screensLinks.map((product) => (
                            <button
                              key={product.name}
                              onClick={() => handleMobileNavClick(product.path)}
                              className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black"
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vouwgordijnen */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => handleMobileNavClick("/producten/vouwgordijnen")}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Vouwgordijnen</span>
                      </button>
                    </div>

                    {/* Houten Shutters */}
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => handleMobileNavClick("/producten/houten-shutters")}
                        className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                      >
                        <span>Houten Shutters</span>
                      </button>
                    </div>

                    {/* Mobile CTA */}
                    <div className="pt-4 space-y-3">
                      <button
                        onClick={() => handleMobileNavClick("/contact")}
                        className="w-full border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300"
                        data-testid="mobile-cta-contact"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => handleMobileNavClick("/offerte")}
                        className="w-full bg-[#C4A36C] hover:bg-[#B39356] text-white px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300"
                        data-testid="mobile-cta-offerte"
                      >
                        Offerte Aanvragen
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
