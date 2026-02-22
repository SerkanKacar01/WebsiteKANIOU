import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Tag,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Ruler,
  Store,
} from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";

const megaMenuCategories = [
  {
    title: "Gordijnen",
    links: [
      { name: "Inbetweens", path: "/producten/vitrages" },
      { name: "Overgordijnen", path: "/producten/overgordijnen" },
      { name: "Vitrages", path: "/producten/vitrages" },
    ],
  },
  {
    title: "Binnenzonwering",
    links: [
      { name: "Rolgordijnen", path: "/producten/rolgordijnen" },
      { name: "Duo Rolgordijnen", path: "/producten/duo-rolgordijnen" },
      { name: "Plissés", path: "/producten/plisse" },
      { name: "Duo Plissés", path: "/producten/duo-plisses" },
    ],
  },
  {
    title: "Jaloezieën",
    links: [
      { name: "Houten Jaloezieën", path: "/producten/houten-jaloezieen" },
      { name: "Aluminium Jaloezieën", path: "/producten/kunststof-jaloezieen" },
    ],
  },
  {
    title: "Lamellen",
    links: [
      { name: "Textiel Lamellen", path: "/producten/textiel-lamellen" },
      { name: "Kunststof Lamellen", path: "/producten/kunststof-lamellen" },
    ],
  },
  {
    title: "Speciale Toepassingen",
    links: [
      { name: "Dakraam Zonweringen", path: "/producten/dakraam-zonweringen" },
      { name: "Screens Inside", path: "/producten/screens-inside" },
      { name: "Screens Outside", path: "/producten/screens-outside" },
      { name: "Houten Shutters", path: "/producten/houten-shutters" },
    ],
  },
  {
    title: "Vouwgordijnen",
    links: [
      { name: "Vouwgordijnen", path: "/producten/vouwgordijnen" },
      { name: "Gordijnrails", path: "/producten/gordijnrails" },
      { name: "Gordijnroedes", path: "/producten/gordijnroedes" },
    ],
  },
];

const horrenLinks = [
  { name: "Schuifdeur Horren", path: "/producten/horren" },
  { name: "Draai Hordeuren", path: "/producten/horren" },
  { name: "Opzet Horren", path: "/producten/opzethorren" },
  { name: "Inzet Horren", path: "/producten/inzethorren" },
  { name: "Plissé Hordeuren", path: "/producten/plisse-hordeuren" },
];

const Header = () => {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [mobileRaamdecoratieOpen, setMobileRaamdecoratieOpen] = useState(false);
  const [mobileHorrenOpen, setMobileHorrenOpen] = useState(false);
  const [mobileSubCategory, setMobileSubCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    }, 200);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* TOP BAR */}
      <div
        className={`hidden lg:block bg-[#0f172a] text-white/90 transition-all duration-500 ${isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}
      >
        <div className="max-w-[1800px] mx-auto px-8 xl:px-12">
          <div className="flex items-center justify-between h-10">
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
                <span>Ma–Za: 10:00 – 18:00</span>
              </span>
              <div className="h-3 w-px bg-white/20"></div>
              <span className="flex items-center gap-2 text-[11px] tracking-wider text-[#C4A36C] font-medium">
                <CheckCircle className="w-3 h-3" />
                Gratis Inmeting
              </span>
              <div className="h-3 w-px bg-white/20"></div>
              <span className="flex items-center gap-2 text-[11px] tracking-wider text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                Kwaliteitsgarantie
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className={`bg-white transition-all duration-500 ${isScrolled ? "shadow-lg border-b border-gray-100" : "shadow-sm border-b border-gray-100/50"}`}>
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* Logo */}
            <button
              onClick={() => setLocation("/")}
              className="transition-all duration-500 hover:opacity-80 flex-shrink-0"
              data-testid="nav-logo"
            >
              <img src={kaniouLogo} alt="KANIOU Zilvernaald" className="h-9 lg:h-11 w-auto" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* RAAMDECORATIE - Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("raamdecoratie")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-5 text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                    activeDropdown === "raamdecoratie" ? "text-[#C4A36C]" : "text-[#2C3E50] hover:text-[#C4A36C]"
                  }`}
                >
                  Raamdecoratie
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "raamdecoratie" ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu Panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-300 ${
                    activeDropdown === "raamdecoratie" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3"
                  }`}
                >
                  <div className="w-[820px] bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden">
                    <div className="px-8 pt-5 pb-3 border-b border-gray-100 bg-gradient-to-r from-[#fafaf8] to-white">
                      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C4A36C]">Ontdek Onze Collectie</p>
                      <p className="text-[22px] font-bold text-[#2C3E50] mt-1">Raamdecoratie</p>
                    </div>
                    <div className="grid grid-cols-3 gap-0 p-6">
                      {megaMenuCategories.map((cat) => (
                        <div key={cat.title} className="px-3 mb-4">
                          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C4A36C] mb-3 pb-2 border-b border-gray-100">
                            {cat.title}
                          </p>
                          <div className="space-y-1">
                            {cat.links.map((link) => (
                              <button
                                key={link.name}
                                onClick={() => { setLocation(link.path); setActiveDropdown(null); }}
                                className="w-full text-left px-2 py-1.5 text-[13px] text-gray-600 hover:text-[#2C3E50] hover:bg-gray-50 rounded-md hover:pl-4 transition-all duration-200 flex items-center gap-2 group"
                              >
                                <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#C4A36C] transition-colors" />
                                {link.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-8 py-4 bg-gradient-to-r from-[#2C3E50] to-[#1a2332] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Ruler className="w-4 h-4 text-[#C4A36C]" />
                        <span className="text-white/80 text-xs">Gratis inmeting bij u thuis</span>
                      </div>
                      <button
                        onClick={() => { setLocation("/offerte"); setActiveDropdown(null); }}
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#C4A36C] hover:text-white transition-colors flex items-center gap-1"
                      >
                        Offerte Aanvragen
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* HORREN - Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("horren")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-5 text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                    activeDropdown === "horren" ? "text-[#C4A36C]" : "text-[#2C3E50] hover:text-[#C4A36C]"
                  }`}
                >
                  Horren
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "horren" ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-300 ${
                    activeDropdown === "horren" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="w-64 bg-white shadow-2xl border border-gray-100 py-3 rounded-lg">
                    <div className="px-5 pb-2 mb-2 border-b border-gray-100">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C4A36C]">Horren</span>
                    </div>
                    {horrenLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => { setLocation(link.path); setActiveDropdown(null); }}
                        className="w-full px-5 py-2.5 text-left text-[13px] text-gray-600 hover:text-[#2C3E50] hover:bg-gray-50/80 hover:pl-7 transition-all duration-200"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Op maat & Advies */}
              <button
                onClick={() => setLocation("/op-maat-advies")}
                className="px-3 py-5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300 flex items-center gap-1.5"
              >
                <Ruler className="w-3.5 h-3.5" />
                Op Maat & Advies
              </button>

              {/* Showroom */}
              <button
                onClick={() => setLocation("/showroom")}
                className="px-3 py-5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300 flex items-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5" />
                Showroom
              </button>

              {/* Exclusieve Voorwaarden */}
              <button
                onClick={() => setLocation("/acties")}
                className="px-3 py-5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Exclusieve Voorwaarden
              </button>

              {/* Contact */}
              <button
                onClick={() => setLocation("/contact")}
                className="px-3 py-5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300"
              >
                Contact
              </button>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <button
                onClick={() => setLocation("/offerte")}
                className="group relative px-6 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase overflow-hidden rounded-full shadow-md shadow-[#C4A36C]/20 hover:shadow-lg hover:shadow-[#C4A36C]/30 transform hover:scale-105 transition-all duration-300"
                data-testid="nav-cta-offerte"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C4A36C] to-[#D5B992]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D5B992] to-[#e8d5b0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 text-white">Offerte Aanvragen</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2 min-h-[44px] min-w-[44px] text-gray-700 hover:text-black" data-testid="mobile-menu-button">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-[320px] overflow-y-auto">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                      <button onClick={() => setLocation("/")} className="flex items-center">
                        <img src={kaniouLogo} alt="KANIOU" className="h-8 w-auto" />
                      </button>
                      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="h-8 w-8" data-testid="mobile-menu-close">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex-1 p-4 space-y-1">
                      {/* Mobile: Raamdecoratie */}
                      <div className="border-b border-gray-100 pb-2">
                        <button
                          onClick={() => setMobileRaamdecoratieOpen(!mobileRaamdecoratieOpen)}
                          className="w-full flex items-center justify-between py-3 text-sm font-semibold tracking-widest uppercase text-gray-700"
                        >
                          <span>Raamdecoratie</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileRaamdecoratieOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileRaamdecoratieOpen && (
                          <div className="pb-2 space-y-1">
                            {megaMenuCategories.map((cat) => (
                              <div key={cat.title}>
                                <button
                                  onClick={() => setMobileSubCategory(mobileSubCategory === cat.title ? null : cat.title)}
                                  className="w-full flex items-center justify-between py-2 pl-4 pr-2 text-xs font-bold tracking-wider uppercase text-[#C4A36C]"
                                >
                                  <span>{cat.title}</span>
                                  <ChevronDown className={`w-3 h-3 transition-transform ${mobileSubCategory === cat.title ? "rotate-180" : ""}`} />
                                </button>
                                {mobileSubCategory === cat.title && (
                                  <div className="pl-8 pb-1 space-y-0.5">
                                    {cat.links.map((link) => (
                                      <button
                                        key={link.name}
                                        onClick={() => handleMobileNavClick(link.path)}
                                        className="block w-full text-left py-1.5 text-sm text-gray-600 hover:text-black"
                                      >
                                        {link.name}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Mobile: Horren */}
                      <div className="border-b border-gray-100 pb-2">
                        <button
                          onClick={() => setMobileHorrenOpen(!mobileHorrenOpen)}
                          className="w-full flex items-center justify-between py-3 text-sm font-semibold tracking-widest uppercase text-gray-700"
                        >
                          <span>Horren</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileHorrenOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileHorrenOpen && (
                          <div className="pl-4 pb-2 space-y-1">
                            {horrenLinks.map((link) => (
                              <button key={link.name} onClick={() => handleMobileNavClick(link.path)} className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black">
                                {link.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Mobile: Simple links */}
                      <div className="border-b border-gray-100 pb-2">
                        <button onClick={() => handleMobileNavClick("/op-maat-advies")} className="w-full flex items-center gap-2 py-3 text-sm font-semibold tracking-widest uppercase text-gray-700">
                          <Ruler className="w-4 h-4 text-[#C4A36C]" />
                          Op Maat & Advies
                        </button>
                      </div>

                      <div className="border-b border-gray-100 pb-2">
                        <button onClick={() => handleMobileNavClick("/showroom")} className="w-full flex items-center gap-2 py-3 text-sm font-semibold tracking-widest uppercase text-gray-700">
                          <Store className="w-4 h-4 text-[#C4A36C]" />
                          Showroom
                        </button>
                      </div>

                      <div className="border-b border-gray-100 pb-2">
                        <button onClick={() => handleMobileNavClick("/acties")} className="w-full flex items-center gap-2 py-3 text-sm font-semibold tracking-widest uppercase text-gray-700">
                          <Sparkles className="w-4 h-4 text-[#C4A36C]" />
                          Exclusieve Voorwaarden
                        </button>
                      </div>

                      <div className="border-b border-gray-100 pb-2">
                        <button onClick={() => handleMobileNavClick("/contact")} className="w-full flex items-center py-3 text-sm font-semibold tracking-widest uppercase text-gray-700">
                          Contact
                        </button>
                      </div>

                      {/* Mobile CTA */}
                      <div className="pt-4">
                        <button
                          onClick={() => handleMobileNavClick("/offerte")}
                          className="w-full bg-gradient-to-r from-[#C4A36C] to-[#D5B992] hover:from-[#D5B992] hover:to-[#C4A36C] text-white px-6 py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-lg shadow-md"
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
