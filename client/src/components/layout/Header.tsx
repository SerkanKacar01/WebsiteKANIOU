import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";

interface NavCategory {
  name: string;
  label: string;
  description: string;
  links: { name: string; path: string }[];
}

const Header = () => {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveMega(null);
  }, [location]);

  const categories: NavCategory[] = [
    {
      name: "collectie",
      label: "Collectie",
      description: "Ontdek onze complete collectie raamdecoratie voor elk interieur",
      links: [
        { name: "Kunststof Lamellen", path: "/producten/kunststof-lamellen" },
        { name: "Textiel Lamellen", path: "/producten/textiel-lamellen" },
        { name: "Rolgordijnen", path: "/producten/rolgordijnen" },
        { name: "Duo Rolgordijnen", path: "/producten/duo-rolgordijnen" },
        { name: "Plissés", path: "/producten/plisse" },
        { name: "Duo Plissés", path: "/producten/duo-plisses" },
        { name: "Houten Jaloezieën", path: "/producten/houten-jaloezieen" },
        { name: "Aluminium Jaloezieën", path: "/producten/kunststof-jaloezieen" },
        { name: "Dakraam Zonweringen", path: "/producten/dakraam-zonweringen" },
      ],
    },
    {
      name: "horren",
      label: "Horren",
      description: "Bescherming tegen insecten met stijlvolle horoplossingen",
      links: [
        { name: "Schuifdeur Horren", path: "/producten/horren" },
        { name: "Draai Hordeuren", path: "/producten/horren" },
        { name: "Opzet Horren", path: "/producten/opzethorren" },
        { name: "Inzet Horren", path: "/producten/inzethorren" },
        { name: "Plissé Hordeuren", path: "/producten/plisse-hordeuren" },
      ],
    },
    {
      name: "gordijnen",
      label: "Gordijnen",
      description: "Elegante gordijnen die uw interieur completeren",
      links: [
        { name: "Inbetweens", path: "/producten/vitrages" },
        { name: "Overgordijnen", path: "/producten/overgordijnen" },
        { name: "Vitrages", path: "/producten/vitrages" },
      ],
    },
    {
      name: "ophangsystemen",
      label: "Ophangsystemen",
      description: "Professionele rails en roedes voor een perfecte afwerking",
      links: [
        { name: "Gordijn Rails", path: "/producten/gordijnrails" },
        { name: "Gordijn Roedes", path: "/producten/gordijnroedes" },
      ],
    },
    {
      name: "screens",
      label: "Screens",
      description: "Zonwering en privacy met moderne screen oplossingen",
      links: [
        { name: "Inside Screens", path: "/producten/screens-inside" },
        { name: "Outside Screens", path: "/producten/screens-outside" },
      ],
    },
  ];

  const standaloneLinks = [
    { name: "Vouwgordijnen", path: "/producten/vouwgordijnen" },
    { name: "Shutters", path: "/producten/houten-shutters" },
  ];

  const handleMegaEnter = useCallback((name: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(name);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeout.current = setTimeout(() => {
      setActiveMega(null);
    }, 200);
  }, []);

  const handleMobileNavClick = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobileExpanded = (name: string) => {
    setMobileExpanded(mobileExpanded === name ? null : name);
  };

  const activeCategory = categories.find(c => c.name === activeMega);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" ref={navRef}>
      <div className={`hidden lg:block bg-[#1a1a2e] text-white/90 transition-all duration-500 ${isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-8">
              <a href="tel:+32467856405" className="flex items-center gap-2 text-[11px] tracking-wide hover:text-[#C4A36C] transition-colors duration-300">
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

      <nav
        className={`bg-white transition-all duration-500 ${isScrolled ? "shadow-lg" : "shadow-sm"}`}
        onMouseLeave={handleMegaLeave}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            <button
              onClick={() => setLocation("/")}
              className="transition-all duration-500 hover:opacity-80 flex-shrink-0"
              data-testid="nav-logo"
            >
              <img
                src={kaniouLogo}
                alt="KANIOU Zilvernaald"
                className="h-9 lg:h-10 w-auto"
              />
            </button>

            <div className="hidden lg:flex items-center h-full">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMegaEnter(cat.name)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 xl:px-5 h-full text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 border-b-2 ${
                      activeMega === cat.name
                        ? "text-[#C4A36C] border-[#C4A36C]"
                        : "text-[#2C3E50] border-transparent hover:text-[#C4A36C]"
                    }`}
                    data-testid={`nav-link-${cat.name}`}
                  >
                    {cat.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMega === cat.name ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ))}

              {standaloneLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setLocation(link.path)}
                  onMouseEnter={() => {
                    if (megaTimeout.current) clearTimeout(megaTimeout.current);
                    setActiveMega(null);
                  }}
                  className="px-4 xl:px-5 h-full flex items-center text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300 border-b-2 border-transparent"
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setLocation("/contact")}
                onMouseEnter={() => {
                  if (megaTimeout.current) clearTimeout(megaTimeout.current);
                  setActiveMega(null);
                }}
                className="px-5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2C3E50] border border-[#2C3E50]/20 hover:border-[#2C3E50] hover:bg-[#2C3E50] hover:text-white transition-all duration-300"
                data-testid="nav-cta-contact"
              >
                Contact
              </button>
              <button
                onClick={() => setLocation("/offerte")}
                onMouseEnter={() => {
                  if (megaTimeout.current) clearTimeout(megaTimeout.current);
                  setActiveMega(null);
                }}
                className="px-5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#C4A36C] text-white hover:bg-[#b08f56] transition-all duration-300 shadow-sm hover:shadow-md"
                data-testid="nav-cta-offerte"
              >
                Offerte Aanvragen
              </button>
            </div>

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
                <SheetContent side="right" className="p-0 w-[320px] overflow-y-auto">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-5 border-b border-gray-100">
                      <button onClick={() => handleMobileNavClick("/")} className="flex items-center">
                        <img src={kaniouLogo} alt="KANIOU" className="h-8 w-auto" />
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

                    <div className="flex-1 py-2">
                      {categories.map((cat) => (
                        <div key={cat.name} className="border-b border-gray-50">
                          <button
                            onClick={() => toggleMobileExpanded(cat.name)}
                            className="w-full flex items-center justify-between px-5 py-4 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:bg-gray-50 transition-colors"
                          >
                            <span>{cat.label}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${mobileExpanded === cat.name ? "rotate-180" : ""}`} />
                          </button>
                          <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === cat.name ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="px-5 pb-3 space-y-0.5">
                              <p className="text-[11px] text-gray-400 px-3 pb-2">{cat.description}</p>
                              {cat.links.map((link) => (
                                <button
                                  key={link.name}
                                  onClick={() => handleMobileNavClick(link.path)}
                                  className="w-full text-left px-3 py-2.5 text-[13px] text-gray-600 hover:text-[#C4A36C] hover:bg-[#C4A36C]/5 rounded-lg transition-all duration-200 flex items-center justify-between group"
                                >
                                  <span>{link.name}</span>
                                  <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#C4A36C] transition-colors" />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      {standaloneLinks.map((link) => (
                        <div key={link.name} className="border-b border-gray-50">
                          <button
                            onClick={() => handleMobileNavClick(link.path)}
                            className="w-full flex items-center justify-between px-5 py-4 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:bg-gray-50 transition-colors"
                          >
                            <span>{link.name}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 space-y-3 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => handleMobileNavClick("/contact")}
                        className="w-full border border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white px-6 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        data-testid="mobile-cta-contact"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => handleMobileNavClick("/offerte")}
                        className="w-full bg-[#C4A36C] hover:bg-[#B39356] text-white px-6 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        data-testid="mobile-cta-offerte"
                      >
                        Offerte Aanvragen
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div
          className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-300 ease-out ${
            activeMega ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => {
            if (megaTimeout.current) clearTimeout(megaTimeout.current);
          }}
          onMouseLeave={handleMegaLeave}
        >
          <div className="bg-white border-t border-gray-100 shadow-2xl">
            <div className="max-w-[1400px] mx-auto">
              {activeCategory && (
                <div className="flex">
                  <div className="w-72 bg-gradient-to-b from-[#2C3E50] to-[#1a2634] p-8 flex flex-col justify-between min-h-[280px]">
                    <div>
                      <h3 className="text-white text-xl font-bold mb-3">{activeCategory.label}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{activeCategory.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setLocation("/offerte");
                        setActiveMega(null);
                      }}
                      className="flex items-center gap-2 text-[#C4A36C] text-sm font-semibold hover:text-white transition-colors duration-300 group mt-6"
                    >
                      <span>Offerte aanvragen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="flex-1 p-8">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                      {activeCategory.links.map((link) => (
                        <button
                          key={link.name}
                          onClick={() => {
                            setLocation(link.path);
                            setActiveMega(null);
                          }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-[#f8f6f3] transition-all duration-200"
                          data-testid={`nav-${activeCategory.name}-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C4A36C]/40 group-hover:bg-[#C4A36C] group-hover:scale-125 transition-all duration-200 flex-shrink-0"></div>
                          <span className="text-[14px] text-gray-600 group-hover:text-[#2C3E50] font-medium transition-colors duration-200">
                            {link.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#C4A36C]/30 to-transparent"></div>
        </div>
      </nav>

      {activeMega && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40 hidden lg:block"
          onClick={() => setActiveMega(null)}
        />
      )}
    </header>
  );
};

export default Header;
