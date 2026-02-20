import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Clock } from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";

const Header = () => {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [mobileCollectieOpen, setMobileCollectieOpen] = useState(false);
  const [mobileHorrenOpen, setMobileHorrenOpen] = useState(false);
  const [mobileGordijnenOpen, setMobileGordijnenOpen] = useState(false);
  const [mobileOphangsystemenOpen, setMobileOphangsystemenOpen] = useState(false);
  const [mobileScreensOpen, setMobileScreensOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  let dropdownTimeout: ReturnType<typeof setTimeout>;

  const handleDropdownEnter = (name: string) => {
    clearTimeout(dropdownTimeout);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const DropdownMenu = ({ name, label, links }: { name: string; label: string; links: { name: string; path: string }[] }) => (
    <div
      className="relative"
      onMouseEnter={() => handleDropdownEnter(name)}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        className={`flex items-center gap-1.5 py-6 text-[13px] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
          activeDropdown === name ? "text-[#C4A36C]" : "text-[#2C3E50] hover:text-[#C4A36C]"
        }`}
        data-testid={`nav-link-${name}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === name ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-300 ${
          activeDropdown === name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="w-72 bg-white shadow-2xl border border-gray-100 py-3">
          <div className="px-5 pb-2 mb-2 border-b border-gray-100">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C4A36C]">{label}</span>
          </div>
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                setLocation(link.path);
                setActiveDropdown(null);
              }}
              className="w-full px-5 py-2.5 text-left text-[13px] text-gray-600 hover:text-[#2C3E50] hover:bg-gray-50/80 hover:pl-7 transition-all duration-200"
              data-testid={`nav-${name}-${link.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* TOP BAR - Enterprise info bar (desktop only) */}
      <div className={`hidden lg:block bg-[#1a1a2e] text-white/90 transition-all duration-500 ${isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
        <div className="max-w-[1800px] mx-auto px-8 xl:px-12">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-8">
              <a href="tel:+32468292953" className="flex items-center gap-2 text-[11px] tracking-wide hover:text-[#C4A36C] transition-colors duration-300">
                <Phone className="w-3 h-3" />
                <span>+32 467 85 64 05</span>
              </a>
              <a href="mailto:info@kaniou.be" className="flex items-center gap-2 text-[11px] tracking-wide hover:text-[#C4A36C] transition-colors duration-300">
                <Mail className="w-3 h-3" />
                <span>info@kaniou.be</span>
              </a>
              <span className="flex items-center gap-2 text-[11px] tracking-wide text-white/60">
                <MapPin className="w-3 h-3" />
                <span>Maasmechelen, België</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[11px] tracking-wide text-white/60">
                <Clock className="w-3 h-3" />
                <span>Ma-Za: 10:00 - 18:00</span>
              </span>
              <div className="h-3 w-px bg-white/20"></div>
              <span className="text-[11px] tracking-wider text-[#C4A36C] font-medium">Gratis Inmeting</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <nav className={`bg-white transition-all duration-500 ${isScrolled ? "shadow-lg border-b border-gray-100" : "shadow-sm border-b border-gray-100/50"}`}>
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => setLocation("/")}
              className="transition-all duration-500 hover:opacity-80 flex-shrink-0"
              data-testid="nav-logo"
            >
              <img
                src={kaniouLogo}
                alt="KANIOU Zilvernaald"
                className="h-9 lg:h-11 w-auto"
              />
            </button>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <DropdownMenu name="collectie" label="Collectie" links={productLinks} />
              <DropdownMenu name="horren" label="Horren" links={horrenLinks} />
              <DropdownMenu name="gordijnen" label="Gordijnen" links={gordijnenLinks} />
              <DropdownMenu name="ophangsystemen" label="Ophangsystemen" links={ophangsystemenLinks} />
              <DropdownMenu name="screens" label="Screens" links={screensLinks} />

              <button
                onClick={() => setLocation("/producten/vouwgordijnen")}
                className="py-6 text-[13px] font-medium tracking-[0.15em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300"
                data-testid="nav-link-vouwgordijnen"
              >
                Vouwgordijnen
              </button>

              <button
                onClick={() => setLocation("/producten/houten-shutters")}
                className="py-6 text-[13px] font-medium tracking-[0.15em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300"
                data-testid="nav-link-houten-shutters"
              >
                Shutters
              </button>
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setLocation("/contact")}
                className="px-5 py-2.5 text-[12px] font-medium tracking-[0.15em] uppercase text-[#2C3E50] border border-[#2C3E50]/20 hover:border-[#2C3E50] hover:bg-[#2C3E50] hover:text-white transition-all duration-400"
                data-testid="nav-cta-contact"
              >
                Contact
              </button>
              <button
                onClick={() => setLocation("/offerte")}
                className="px-6 py-2.5 text-[12px] font-medium tracking-[0.15em] uppercase bg-[#C4A36C] text-white hover:bg-[#b08f56] transition-all duration-400 shadow-sm hover:shadow-md"
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

                    <div className="flex-1 p-4 space-y-2">
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

                      <div className="border-b border-gray-100 pb-2">
                        <button
                          onClick={() => handleMobileNavClick("/producten/vouwgordijnen")}
                          className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                        >
                          <span>Vouwgordijnen</span>
                        </button>
                      </div>

                      <div className="border-b border-gray-100 pb-2">
                        <button
                          onClick={() => handleMobileNavClick("/producten/houten-shutters")}
                          className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700"
                        >
                          <span>Houten Shutters</span>
                        </button>
                      </div>

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
    </header>
  );
};

export default Header;
