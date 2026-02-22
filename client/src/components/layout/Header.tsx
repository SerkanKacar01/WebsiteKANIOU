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
  Ruler,
  Store,
  Sparkles,
} from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";

const megaMenuColumns = [
  {
    title: "Gordijnen",
    links: [
      { name: "Inbetweens", path: "/producten/vitrages" },
      { name: "Overgordijnen", path: "/producten/overgordijnen" },
      { name: "Vitrages", path: "/producten/vitrages" },
      { name: "Vouwgordijnen", path: "/producten/vouwgordijnen" },
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
];

const horrenColumns = [
  {
    title: "Schuifhorren",
    links: [
      { name: "Schuifdeur Horren", path: "/producten/horren" },
    ],
  },
  {
    title: "Draaihorren",
    links: [
      { name: "Draai Hordeuren", path: "/producten/horren" },
      { name: "Plissé Hordeuren", path: "/producten/plisse-hordeuren" },
    ],
  },
  {
    title: "Raamhorren",
    links: [
      { name: "Opzet Horren", path: "/producten/opzethorren" },
      { name: "Inzet Horren", path: "/producten/inzethorren" },
    ],
  },
];

const ophangsystemenColumns = [
  {
    title: "Rails",
    links: [
      { name: "Gordijnrails", path: "/producten/gordijnrails" },
    ],
  },
  {
    title: "Roedes",
    links: [
      { name: "Gordijnroedes", path: "/producten/gordijnroedes" },
    ],
  },
];

const Header = () => {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [mobileRaamdecoratieOpen, setMobileRaamdecoratieOpen] = useState(false);
  const [mobileHorrenOpen, setMobileHorrenOpen] = useState(false);

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

  const MegaMenu = ({ name, label, columns }: { name: string; label: string; columns: typeof megaMenuColumns }) => (
    <div
      className="relative"
      onMouseEnter={() => handleDropdownEnter(name)}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        className={`flex items-center gap-1.5 py-5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
          activeDropdown === name ? "text-[#C4A36C]" : "text-[#2C3E50] hover:text-[#C4A36C]"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === name ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-0 z-[60] transition-all duration-300 ${
          activeDropdown === name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3"
        }`}
        style={{ width: "100vw", left: "50%", marginLeft: "-50vw" }}
      >
        <div className="bg-white shadow-2xl border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-8 xl:px-12 py-10">
            <div className="flex items-center gap-3 mb-8 pb-5 border-b border-gray-100">
              <div className="w-1 h-6 bg-[#C4A36C] rounded-full"></div>
              <h3 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C4A36C]">{label}</h3>
            </div>

            <div className={`grid gap-10 ${columns.length >= 5 ? "grid-cols-5" : columns.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2C3E50] mb-4 pb-2 border-b border-gray-100">
                    {col.title}
                  </h4>
                  <div className="space-y-1">
                    {col.links.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => {
                          setLocation(link.path);
                          setActiveDropdown(null);
                        }}
                        className="group w-full flex items-center gap-2 py-2 text-[13px] text-gray-500 hover:text-[#2C3E50] transition-all duration-200"
                      >
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#C4A36C] group-hover:translate-x-0.5 transition-all duration-200" />
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NavLink = ({ label, path, icon }: { label: string; path: string; icon?: any }) => {
    const Icon = icon;
    return (
      <button
        onClick={() => setLocation(path)}
        className="flex items-center gap-1.5 py-5 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#2C3E50] hover:text-[#C4A36C] transition-all duration-300"
      >
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* TOP BAR */}
      <div className={`hidden lg:block bg-[#0f172a] text-white/90 transition-all duration-500 ${isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
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

      {/* MAIN NAVIGATION BAR */}
      <nav className={`bg-white transition-all duration-500 ${isScrolled ? "shadow-lg border-b border-gray-100" : "shadow-sm border-b border-gray-100/50"}`}>
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            <button
              onClick={() => setLocation("/")}
              className="transition-all duration-500 hover:opacity-80 flex-shrink-0"
              data-testid="nav-logo"
            >
              <img src={kaniouLogo} alt="KANIOU Zilvernaald" className="h-9 lg:h-11 w-auto" />
            </button>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center gap-10 xl:gap-14 flex-1">
              <MegaMenu name="raamdecoratie" label="Raamdecoratie" columns={megaMenuColumns} />
              <MegaMenu name="horren" label="Horren" columns={horrenColumns} />
              <NavLink label="Op Maat & Advies" path="/offerte" icon={Ruler} />
              <NavLink label="Showroom" path="/contact" icon={Store} />
            </div>

            {/* Plan Je Project - CTA Dropdown */}
            <div
              className="hidden lg:block relative flex-shrink-0"
              onMouseEnter={() => handleDropdownEnter("planproject")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`flex items-center gap-2 px-5 py-2 text-[11px] font-bold tracking-[0.12em] uppercase rounded-lg transition-all duration-300 ${
                  activeDropdown === "planproject"
                    ? "bg-[#C4A36C] text-white shadow-md"
                    : "bg-gradient-to-r from-[#C4A36C] to-[#D5B992] text-white hover:shadow-md"
                }`}
              >
                Plan Je Project
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "planproject" ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute top-full right-0 pt-2 z-[60] transition-all duration-300 ${
                  activeDropdown === "planproject" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="w-64 bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 bg-gradient-to-r from-[#1a2332] to-[#2C3E50]">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C4A36C]">Plan Je Project</span>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { setLocation("/acties"); setActiveDropdown(null); }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-red-50/80 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Tag className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#2C3E50] group-hover:text-red-600 transition-colors">Exclusieve Voorwaarden</p>
                        <p className="text-[10px] text-gray-400">Bekijk onze acties</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setLocation("/contact"); setActiveDropdown(null); }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2C3E50] to-[#3d5166] flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#2C3E50] group-hover:text-[#C4A36C] transition-colors">Contact</p>
                        <p className="text-[10px] text-gray-400">Neem contact op</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setLocation("/offerte"); setActiveDropdown(null); }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-amber-50/80 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C4A36C] to-[#D5B992] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#2C3E50] group-hover:text-[#C4A36C] transition-colors">Offerte Aanvragen</p>
                        <p className="text-[10px] text-gray-400">Gratis & vrijblijvend</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
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
                      {/* Raamdecoratie Accordion */}
                      <div className="border-b border-gray-100 pb-1">
                        <button
                          onClick={() => setMobileRaamdecoratieOpen(!mobileRaamdecoratieOpen)}
                          className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700 font-semibold"
                        >
                          <span>Raamdecoratie</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileRaamdecoratieOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileRaamdecoratieOpen && (
                          <div className="pb-3 space-y-3">
                            {megaMenuColumns.map((col) => (
                              <div key={col.title}>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C4A36C] mb-1 px-3">{col.title}</p>
                                {col.links.map((link) => (
                                  <button key={link.name} onClick={() => handleMobileNavClick(link.path)} className="block w-full text-left py-1.5 px-3 text-sm text-gray-600 hover:text-black">
                                    {link.name}
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Horren Accordion */}
                      <div className="border-b border-gray-100 pb-1">
                        <button
                          onClick={() => setMobileHorrenOpen(!mobileHorrenOpen)}
                          className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-gray-700 font-semibold"
                        >
                          <span>Horren</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileHorrenOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileHorrenOpen && (
                          <div className="pb-3 space-y-3">
                            {horrenColumns.map((col) => (
                              <div key={col.title}>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C4A36C] mb-1 px-3">{col.title}</p>
                                {col.links.map((link) => (
                                  <button key={link.name} onClick={() => handleMobileNavClick(link.path)} className="block w-full text-left py-1.5 px-3 text-sm text-gray-600 hover:text-black">
                                    {link.name}
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Simple links */}
                      <div className="border-b border-gray-100">
                        <button onClick={() => handleMobileNavClick("/offerte")} className="w-full flex items-center gap-2 py-3 text-sm tracking-widest uppercase text-gray-700 font-semibold">
                          <Ruler className="w-4 h-4 text-[#C4A36C]" />
                          <span>Op Maat & Advies</span>
                        </button>
                      </div>
                      <div className="border-b border-gray-100">
                        <button onClick={() => handleMobileNavClick("/contact")} className="w-full flex items-center gap-2 py-3 text-sm tracking-widest uppercase text-gray-700 font-semibold">
                          <Store className="w-4 h-4 text-[#C4A36C]" />
                          <span>Showroom</span>
                        </button>
                      </div>
                      <div className="border-b border-gray-100">
                        <button onClick={() => handleMobileNavClick("/acties")} className="w-full flex items-center gap-2 py-3 text-sm tracking-widest uppercase text-gray-700 font-semibold">
                          <Sparkles className="w-4 h-4 text-[#C4A36C]" />
                          <span>Exclusieve Voorwaarden</span>
                        </button>
                      </div>

                      {/* CTA Buttons */}
                      <div className="pt-5 space-y-3">
                        <button
                          onClick={() => handleMobileNavClick("/acties")}
                          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 rounded-lg"
                        >
                          <Tag className="w-4 h-4" />
                          Exclusieve Voorwaarden
                        </button>
                        <button
                          onClick={() => handleMobileNavClick("/contact")}
                          className="w-full bg-[#C4A36C] hover:bg-[#B39356] text-white px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 rounded-lg"
                        >
                          Contact
                        </button>
                        <button
                          onClick={() => handleMobileNavClick("/offerte")}
                          className="w-full bg-gradient-to-r from-[#C4A36C] to-[#D5B992] hover:from-[#D5B992] hover:to-[#C4A36C] text-white px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 rounded-lg"
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
