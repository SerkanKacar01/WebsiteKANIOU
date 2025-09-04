import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  ArrowRight,
  Eye,
  Quote,
  Star,
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react";
import React from "react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";
// Product and gallery images
import interiorImageSrc from "@assets/Overgordijnen.jpeg";
import duoPlisseImageSrc from "@assets/Duoplisse.jpeg";
import duoRolgordijnenImageSrc from "@assets/Duorolgordijnen.jpeg";
import overgordijnenImageSrc from "@assets/Overgordijnen.jpeg";
import plisseImageSrc from "@assets/Plisse.jpeg";
import rolgordijnenImageSrc from "@assets/Rolgordijnen.jpeg";
import opzethorrenImageSrc from "@assets/Opzethorren.jpeg";
// Gallery images for real installations
import gallery1Src from "@assets/IMG_9192.jpeg";
import gallery2Src from "@assets/IMG_9204.jpeg";
import gallery3Src from "@assets/IMG_9217.jpeg";
import gallery4Src from "@assets/IMG_9219.jpeg";
import gallery5Src from "@assets/IMG_9220.jpeg";
import gallery6Src from "@assets/IMG_9221.jpeg";

const interiorImage = interiorImageSrc;
const duoPlisseImage = duoPlisseImageSrc;
const duoRolgordijnenImage = duoRolgordijnenImageSrc;
const overgordijnenImage = overgordijnenImageSrc;
const plisseImage = plisseImageSrc;
const rolgordijnenImage = rolgordijnenImageSrc;
const opzethorrenImage = opzethorrenImageSrc;
const gallery1 = gallery1Src;
const gallery2 = gallery2Src;
const gallery3 = gallery3Src;
const gallery4 = gallery4Src;
const gallery5 = gallery5Src;
const gallery6 = gallery6Src;

// Premium Navigation Component
const PremiumNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuNeedsContrast, setMobileMenuNeedsContrast] =
    React.useState(false);
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Only check background for mobile menu when it's open
      if (isMenuOpen && window.innerWidth < 768) {
        // Simple logic: if scrolled past hero section (assumed to be dark),
        // we're likely on a light background
        const isOnLightBackground = scrollY > window.innerHeight * 0.8;
        setMobileMenuNeedsContrast(isOnLightBackground);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Reset contrast when menu closes
  React.useEffect(() => {
    if (!isMenuOpen) {
      setMobileMenuNeedsContrast(false);
    }
  }, [isMenuOpen]);

  const navigationLinks = [
    { name: "Gallerij", path: "/gallerij" },
    { name: "Over ons", path: "/over-ons" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`nav-luxury ${isScrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <div className="nav-logo">
            <button onClick={() => setLocation("/")} className="hover-elegant">
              <img
                src={kaniouLogo}
                alt="KANIOU - Premium Window Treatments"
                className="h-12 w-auto transition-luxury hover:scale-105"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setLocation(link.path)}
                className="nav-link"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setLocation("/quote")}
              className="btn-luxury"
            >
              VRIJBLIJVEND OFFERTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-all duration-300 rounded-lg ${
              mobileMenuNeedsContrast
                ? "bg-black/80 text-white hover:bg-black/90 backdrop-blur-sm shadow-lg"
                : "text-white hover:text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 animate-fade-in-up transition-all duration-300 rounded-lg ${
              mobileMenuNeedsContrast
                ? "bg-black/90 backdrop-blur-sm mx-2 px-4 py-3 shadow-xl"
                : ""
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setLocation(link.path);
                    setIsMenuOpen(false);
                  }}
                  className={`transition-all duration-300 text-left font-medium py-3 px-4 rounded-lg border border-gold-300/30 ${
                    mobileMenuNeedsContrast
                      ? "text-white hover:bg-white/10 hover:border-gold-400/50"
                      : "nav-link"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setLocation("/quote");
                  setIsMenuOpen(false);
                }}
                className={`mt-4 transition-all duration-300 ${
                  mobileMenuNeedsContrast
                    ? "bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    : "btn-luxury"
                }`}
              >
                VRIJBLIJVEND OFFERTE
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Home = () => {
  const [, setLocation] = useLocation();

  // Mobile footer accordion state - default: Nieuwsbrief open, others closed
  const [expandedSections, setExpandedSections] = React.useState({
    bedrijf: false,
    producten: false,
    klantenservice: false,
    nieuwsbrief: true,
    legal: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleExploreProducts = () => {
    setLocation("/producten/overgordijnen");
  };

  const handleRequestQuote = () => {
    setLocation("/quote");
  };

  return (
    <>
      <Helmet>
        <title>
          KANIOU ZILVERNAALD – Premium Raamdecoratie & Maatwerk Gordijnen | Meer
          dan 30 jaar ervaring
        </title>
        <meta
          name="description"
          content="KANIOU offers premium custom curtains, blinds, and window treatments in Belgium. 30+ years of expertise in tailor-made solutions for your home and business."
        />
        <meta
          property="og:title"
          content="KANIOU - Premium Window Treatments & Custom Curtains"
        />
        <meta
          property="og:description"
          content="Transform your space with our premium custom window treatments. Professional installation and 30+ years of expertise in Belgium."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Premium Navigation */}
      <PremiumNavigation />

      <div className="content-offset">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={interiorImage}
              alt="Modern interior with elegant window treatments"
              className="w-full h-full object-cover"
            />
            {/* Elegant transparent overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
            {/* Additional mobile overlay for better text readability */}
            <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6 py-16 md:pt-16 pt-24">
            {/* Ultra-Luxury Title */}
            <h1 className="font-luxury-display text-hero text-white mb-8 leading-[0.9] tracking-tight text-shadow-luxury drop-shadow-2xl">
              <span className="block text-4xl md:text-hero">
                Exquise raamdecoratie
              </span>
              <span className="block gradient-text-luxury mt-2 md:mt-4 text-glow text-3xl md:text-hero">
                Artistry
              </span>
            </h1>

            {/* Luxury Subtitle */}
            <p className="text-lg md:text-subtitle text-white/90 mb-12 md:mb-16 max-w-5xl mx-auto leading-relaxed font-light drop-shadow-xl font-luxury-display">
              <span className="block text-xl md:text-3xl font-medium tracking-wide">
                Waar vakmanschap en verfijning samenkomen.
              </span>
              <span className="block mt-4 text-white/75 text-base md:text-xl font-light tracking-wide">
                Breng stijl, comfort en maatwerk samen in uw interieur met
                exclusieve raamdecoratie. Ontdek de perfecte oplossing voor elke
                ruimte – vandaag nog.
              </span>
            </p>

            {/* Ultra-Premium CTA */}
            <div className="flex justify-center mb-12 md:mb-20">
              <button
                onClick={handleRequestQuote}
                className="ultra-luxury-cta-button group"
              >
                <div className="ultra-luxury-cta-bg"></div>
                <div className="ultra-luxury-cta-glow"></div>
                <div className="ultra-luxury-cta-content">
                  <span className="ultra-luxury-cta-text">
                    VANDAAG NOG OFFERTE
                  </span>
                  <div className="ultra-luxury-cta-icon">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </button>
            </div>

            {/* Elegant Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl max-w-5xl mx-auto">
              <div className="text-center animate-float-luxury stagger-1">
                <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">
                  30+
                </div>
                <div className="text-white/70 text-body font-light tracking-wider uppercase">
                  Jarenlange Vakmanschap
                </div>
              </div>
              <div className="text-center animate-float-luxury stagger-2">
                <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">
                  3500+
                </div>
                <div className="text-white/70 text-body font-light tracking-wider uppercase">
                  Eisvolle Klanten
                </div>
              </div>
              <div className="text-center animate-float-luxury stagger-3">
                <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">
                  100%
                </div>
                <div className="text-white/70 text-body font-light tracking-wider uppercase">
                  Maatwerk tot in Perfectie
                </div>
              </div>
            </div>

            {/* Sophisticated Scroll Indicator */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="w-px h-20 bg-gradient-to-b from-white/40 to-transparent relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border border-white/50 rounded-full animate-pulse">
                  <div className="w-1 h-1 bg-white/60 rounded-full m-0.5 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories Section - Ultra Luxury Design */}
        <section className="section-spacing-luxury relative overflow-hidden">
          {/* Luxury Background with Animated Particles */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-[#FBF8F3]">
            <div className="absolute inset-0 opacity-60">
              <div className="luxury-particles"></div>
            </div>
          </div>

          <div className="container-golden relative z-10">
            {/* Ultra-Premium Section Header */}
            <div className="text-center mb-20">
              <div className="luxury-section-badge">
                <div className="luxury-badge-glow"></div>
                <span className="luxury-badge-text">PREMIUM COLLECTIE</span>
              </div>
              <h2 className="luxury-mega-title mb-8">
                <span className="luxury-title-line">Ontdek onze</span>
                <span className="luxury-title-emphasis">collectie</span>
              </h2>
              <p className="luxury-subtitle max-w-4xl mx-auto">
                Verken onze exclusieve collectie van artisanaal vervaardigde
                raamdecoratie. Elk meesterwerk wordt met uitzonderlijke precisie
                en devotie gecreëerd voor uw verfijnde interieur.
              </p>
            </div>

            {/* Revolutionary Product Showcase Grid */}
            <div className="luxury-product-grid mb-16">
              {/* Houten jaloezieën - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/houten-jaloezieen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/jaloezieen-icon.png"
                        alt="Houten jaloezieën"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Houten jaloezieën</h3>
                  <p className="luxury-card-subtitle">Natuurlijke elegantie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Aluminium jaloezieën - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/textiel-lamellen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/verticaal-lamellen-icon.png"
                        alt="Textiel lamellen"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Textiel lamellen</h3>
                  <p className="luxury-card-subtitle">Zachte elegantie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Kunststof jaloezieën - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/kunststof-jaloezieen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/jaloezieen-icon.png"
                        alt="Kunststof jaloezieën"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Kunststof jaloezieën</h3>
                  <p className="luxury-card-subtitle">Praktische perfectie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Verticaal lamellen - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/kunststof-lamellen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/verticaal-lamellen-icon.png"
                        alt="Kunststof lamellen"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Kunststof lamellen</h3>
                  <p className="luxury-card-subtitle">Praktische perfectie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Plissés - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/plisse")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/plisse-icon.png"
                        alt="Plissés"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Plissés</h3>
                  <p className="luxury-card-subtitle">Gevouwen elegantie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Duo plissés - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/duo-plisse")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/plisse-icon.png"
                        alt="Duo plissé"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Duo plissés</h3>
                  <p className="luxury-card-subtitle">Dubbele perfectie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Rolgordijnen - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/rolgordijnen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/rolgordijnen-icon.png"
                        alt="Rolgordijnen"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Rolgordijnen</h3>
                  <p className="luxury-card-subtitle">Strakke simpliciteit</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Duo rolgordijnen - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/duo-rolgordijnen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/duo-rolgordijnen-icon.png"
                        alt="Duo rolgordijnen"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Duo rolgordijnen</h3>
                  <p className="luxury-card-subtitle">
                    Innovatieve functionaliteit
                  </p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Gordijnen - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/overgordijnen")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/gordijnen-icon.png"
                        alt="Overgordijnen"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Overgordijnen</h3>
                  <p className="luxury-card-subtitle">Klassieke grandeur</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Rails & roedes - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/gordijnrails")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/rails-roedes-icon.png"
                        alt="Gordijnrails"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Gordijnrails</h3>
                  <p className="luxury-card-subtitle">Perfecte mechaniek</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Vouwgordijnen - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/vitrages")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/vouwgordijnen-icon.png"
                        alt="Vitrages"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Vitrages</h3>
                  <p className="luxury-card-subtitle">Lichte elegantie</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>

              {/* Houten shutters - Premium Card */}
              <div
                className="luxury-product-card group"
                onClick={() => setLocation("/producten/houten-shutters")}
              >
                <div className="luxury-card-background"></div>
                <div className="luxury-card-glow"></div>
                <div className="luxury-card-content">
                  <div className="luxury-icon-container">
                    <div className="luxury-icon-glow"></div>
                    <div className="luxury-icon">
                      <img
                        src="/images/houten-shutters-icon.png"
                        alt="Houten shutters"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="luxury-card-title">Houten shutters</h3>
                  <p className="luxury-card-subtitle">Tijdloze klasse</p>
                  <div className="luxury-card-arrow">→</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury"></div>

        {/* Why Choose KANIOU - Ultra-Luxury USP Section */}
        <section className="ultra-luxury-features-section">
          <div className="absolute inset-0 luxury-gradient-bg"></div>
          <div className="absolute inset-0 luxury-texture-overlay"></div>
          <div className="container-golden relative z-10">
            {/* Ultra-Premium Section Header */}
            <div className="text-center mb-32">
              <div className="luxury-section-badge-premium mb-16">
                <div className="luxury-badge-glow-premium"></div>
                <span className="luxury-badge-text-premium">
                  HAUTE COUTURE EXCELLENCE
                </span>
              </div>
              <h2 className="ultra-luxury-title mb-12">
                <span className="ultra-luxury-title-line">De Kunst van</span>
                <span className="ultra-luxury-title-emphasis">Perfectie</span>
              </h2>
              <p className="ultra-luxury-subtitle max-w-5xl mx-auto">
                Ervaar het toppunt van Belgisch vakmanschap – waar drie decennia
                toewijding aan perfectie samensmelten met hedendaagse luxe in
                elk met zorg vervaardigd detail.
              </p>
            </div>

            {/* Ultra-Luxury Features Grid */}
            <div className="ultra-luxury-features-grid">
              {/* Perfect Fit - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-luxury-card-glow"></div>
                <div className="ultra-luxury-card-content">
                  <div className="ultra-luxury-icon-container mb-8">
                    <div className="ultra-luxury-icon-bg"></div>
                    <div className="ultra-luxury-icon-glow"></div>
                    <Shield className="ultra-luxury-icon" />
                  </div>
                  <h3 className="ultra-luxury-feature-title">
                    Vakkundig Op Maat
                  </h3>
                  <p className="ultra-luxury-feature-description">
                    Elk stuk wordt nauwkeurig opgemeten en vervaardigd met
                    Zwitserse precisie voor uw unieke interieur.
                  </p>
                </div>
              </div>

              {/* Express Service - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-luxury-card-glow"></div>
                <div className="ultra-luxury-card-content">
                  <div className="ultra-luxury-icon-container mb-8">
                    <div className="ultra-luxury-icon-bg"></div>
                    <div className="ultra-luxury-icon-glow"></div>
                    <Truck className="ultra-luxury-icon" />
                  </div>
                  <h3 className="ultra-luxury-feature-title">
                    Uitmuntende Levering
                  </h3>
                  <p className="ultra-luxury-feature-description">
                    Snelle levering, zorgvuldig gecoördineerd met compromisloze
                    aandacht voor elk detail. Mits beschikbaarheid van de
                    materialen.
                  </p>
                </div>
              </div>

              {/* Master Consultation - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-luxury-card-glow"></div>
                <div className="ultra-luxury-card-content">
                  <div className="ultra-luxury-icon-container mb-8">
                    <div className="ultra-luxury-icon-bg"></div>
                    <div className="ultra-luxury-icon-glow"></div>
                    <Users className="ultra-luxury-icon" />
                  </div>
                  <h3 className="ultra-luxury-feature-title">
                    Meesterlijk Advies
                  </h3>
                  <p className="ultra-luxury-feature-description">
                    Persoonlijke begeleiding door vakmensen met meer dan dertig
                    jaar verfijnde expertise.
                  </p>
                </div>
              </div>

              {/* Luxury Materials - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-luxury-card-glow"></div>
                <div className="ultra-luxury-card-content">
                  <div className="ultra-luxury-icon-container mb-8">
                    <div className="ultra-luxury-icon-bg"></div>
                    <div className="ultra-luxury-icon-glow"></div>
                    <Award className="ultra-luxury-icon" />
                  </div>
                  <h3 className="ultra-luxury-feature-title">
                    Luxueuze Materialen
                  </h3>
                  <p className="ultra-luxury-feature-description">
                    Geselecteerde stoffen en hoogwaardige materialen voor
                    blijvende schoonheid en verfijning.
                  </p>
                </div>
              </div>

              {/* Heritage Excellence - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-luxury-card-glow"></div>
                <div className="ultra-luxury-card-content">
                  <div className="ultra-luxury-icon-container mb-8">
                    <div className="ultra-luxury-icon-bg"></div>
                    <div className="ultra-luxury-icon-glow"></div>
                    <Clock className="ultra-luxury-icon" />
                  </div>
                  <h3 className="ultra-luxury-feature-title">
                    Traditie in Perfectie
                  </h3>
                  <p className="ultra-luxury-feature-description">
                    Dertig jaar onafgebroken toewijding aan de kunst van
                    raamdecoratie op maat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury"></div>

        {/* Ultra-Modern Luxury Collections Showcase */}
        <section className="haute-couture-collections">
          <div className="collections-ethereal-header">
            <div className="collections-prestige-badge">
              <span className="collections-prestige-badge-text">
                CURATED EXCELLENCE
              </span>
            </div>
            <h2 className="collections-majestic-title">
              <span className="collections-title-primary">Geselecteerde</span>
              <span className="collections-title-accent">Collecties</span>
            </h2>
            <p className="collections-refined-subtitle">
              Ontdek onze zorgvuldig samengestelde collectie premium
              raamdecoratie – elk stuk ontworpen om uw interieur te
              transformeren tot een oase van verfijnde elegantie.
            </p>
          </div>

          <div className="collections-sovereign-grid">
            {/* Plissé Perfectie */}
            <div
              className="collections-masterpiece-card"
              onClick={() => setLocation("/producten/plisse")}
            >
              <div className="collections-artwork-container">
                <img
                  src={plisseImage}
                  alt="Plissé Perfectie - Verfijnde geplooide precisie"
                  className="collections-artwork-image"
                />
                <div className="collections-artwork-overlay"></div>
                <div className="collections-prestige-indicator"></div>
              </div>
              <div className="collections-content-sanctuary">
                <h3 className="collections-elite-title">Plissé Perfectie</h3>
                <p className="collections-sophisticated-description">
                  Verfijnde geplooide precisie, ontworpen voor architectonische
                  schoonheid.
                </p>
              </div>
            </div>

            {/* Rolgordijn Excellentie */}
            <div
              className="collections-masterpiece-card"
              onClick={() => setLocation("/producten/rolgordijnen")}
            >
              <div className="collections-artwork-container">
                <img
                  src={rolgordijnenImage}
                  alt="Rolgordijn Excellentie - Minimalistische precisie"
                  className="collections-artwork-image"
                />
                <div className="collections-artwork-overlay"></div>
                <div className="collections-prestige-indicator"></div>
              </div>
              <div className="collections-content-sanctuary">
                <h3 className="collections-elite-title">
                  Rolgordijn Excellentie
                </h3>
                <p className="collections-sophisticated-description">
                  Minimalistische precisie voor eigentijdse interieurwensen.
                </p>
              </div>
            </div>

            {/* Onzichtbare Bescherming */}
            <div
              className="collections-masterpiece-card"
              onClick={() => setLocation("/producten/opzethorren")}
            >
              <div className="collections-artwork-container">
                <img
                  src={opzethorrenImage}
                  alt="Onzichtbare Bescherming - Naadloze ventilatie-oplossingen"
                  className="collections-artwork-image"
                />
                <div className="collections-artwork-overlay"></div>
                <div className="collections-prestige-indicator"></div>
              </div>
              <div className="collections-content-sanctuary">
                <h3 className="collections-elite-title">
                  Onzichtbare Bescherming
                </h3>
                <p className="collections-sophisticated-description">
                  Naadloze ventilatie-oplossingen met compromisloze esthetiek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury"></div>

        {/* Client Testimonials - Ultra-Luxury Social Proof */}
        <section className="section-spacing-luxury gradient-luxury-subtle">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-44 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                Stemmen van Klasse
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Veeleisende klanten delen hun ervaringen van transformatie,
                waarbij het vakmanschap van KANIOU hun meest gekoesterde ruimtes
                heeft verheven tot ware oases van verfijnde schoonheid.
              </p>

              {/* Google Reviews Link */}
              <div className="text-center mt-6">
                <a
                  href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.9886857,5.6914029,17z/data=!4m16!1m9!3m8!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!2sKANIOU+bvba+ZILVERNAALD!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn!3m5!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!16s%2Fg%2F11snz4psjn?authuser=4&entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-body font-semibold text-gold-500 hover:text-gold-600 transition-colors duration-300 hover:underline"
                >
                  <span className="mr-2">⭐</span>
                  Bekijk onze Google reviews
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  (Link opent in een nieuw tabblad)
                </p>
              </div>
            </div>

            {/* Ultra-Luxury Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl">
              {/* Testimonial 1 - Ultra Luxury */}
              <div className="card-ultra-luxury animate-fade-in-up stagger-1 hover-elegant">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40" />

                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-gold-500 fill-current"
                    />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "We stellen enorm op prijs dat je tijd hebt genomen om jouw
                  ervaring te delen. Het doet ons plezier te horen dat je
                  tevreden bent - jouw vertrouwen en postieve woorden motiveren
                  ons elke dag opnieuw om de beste mogelijke service te blijven
                  bieden. Hartelijk dank"
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">
                    Ramadani
                  </p>
                  <p className="text-body text-gray-600 font-light">België</p>
                </div>
              </div>

              {/* Testimonial 2 - Ultra Luxury */}
              <div className="card-ultra-luxury animate-fade-in-up stagger-2 hover-elegant">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40" />

                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-gold-500 fill-current"
                    />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "Ik heb zeer professionele hulp ontvangen van dit bedrijf bij
                  het installeren van mijn jaloezieën en het ophangen van mijn
                  gordijnen. De medewerker was vriendelijk, kwam alle afspraken
                  keurig na en werkte nauwkeurig. De kwaliteit van de materialen
                  is uitstekend. Kortom, een absolute aanrader voor iedereen –
                  deze vijf sterren zijn méér dan verdiend!"
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">Anedda</p>
                  <p className="text-body text-gray-600 font-light">België</p>
                </div>
              </div>

              {/* Testimonial 3 - Ultra Luxury */}
              <div className="card-ultra-luxury animate-fade-in-up stagger-3 hover-elegant">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40" />

                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-gold-500 fill-current"
                    />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "Zeer goed materiaal en diens na verkoop is voor mij
                  belangrijk en goede levering ik ben heel tevreden van de
                  jaloeziekes en de rolgordijn wat kaniou geplaatst heeft Zeer
                  goede kwaliteit en afwerking doe zo voort groetjes guske en
                  yvonneke"
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">Abrecht</p>
                  <p className="text-body text-gray-600 font-light">België</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ultra-Luxury Footer */}
        <footer className="ultra-luxury-footer">
          <div className="ultra-luxury-footer-bg"></div>
          <div className="ultra-luxury-footer-texture"></div>
          <div className="ultra-luxury-footer-container">
            {/* Luxury Divider */}
            <div className="ultra-luxury-footer-divider"></div>

            {/* Main Footer Content */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
              {/* Column 1: Bedrijf */}
              <div className="ultra-luxury-footer-column">
                <h3 className="ultra-luxury-footer-heading">Bedrijf</h3>
                <div className="ultra-luxury-footer-content">
                  <div className="ultra-luxury-brand-container">
                    <p className="ultra-luxury-brand-name">
                      KANIOU zilvernaald
                    </p>
                    <p className="ultra-luxury-brand-tagline">
                      Premium Gordijnen & Zonweringen
                    </p>
                  </div>

                  {/* Ultra-Luxury Social Media */}
                  <div className="ultra-luxury-social-container">
                    <a href="#" className="ultra-luxury-social-icon">
                      <div className="ultra-luxury-social-bg"></div>
                      <svg
                        className="ultra-luxury-social-svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 2: Producten */}
              <div className="ultra-luxury-footer-column">
                <h3 className="ultra-luxury-footer-heading">Producten</h3>
                <div className="ultra-luxury-footer-content">
                  <ul className="ultra-luxury-footer-links">
                    <li>
                      <a
                        href="/producten/vliegenramen"
                        className="ultra-luxury-footer-link"
                      >
                        Vliegenramen
                      </a>
                    </li>
                    <li>
                      <a
                        href="/producten/rolgordijnen"
                        className="ultra-luxury-footer-link"
                      >
                        Rolgordijnen
                      </a>
                    </li>
                    <li>
                      <a
                        href="/producten/overgordijnen"
                        className="ultra-luxury-footer-link"
                      >
                        Overgordijnen
                      </a>
                    </li>
                    <li>
                      <a
                        href="/quote"
                        className="ultra-luxury-footer-link ultra-luxury-footer-link-special"
                      >
                        Offerte aanvragen
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 3: Klantenservice */}
              <div className="ultra-luxury-footer-column">
                <h3 className="ultra-luxury-footer-heading">Klantenservice</h3>
                <div className="ultra-luxury-footer-content">
                  <ul className="ultra-luxury-footer-links">
                    <li>
                      <a
                        href="/meet-instructies"
                        className="ultra-luxury-footer-link"
                      >
                        Meet instructies
                      </a>
                    </li>
                    <li>
                      <a
                        href="/installatie-instructies"
                        className="ultra-luxury-footer-link"
                      >
                        Installatie instructies
                      </a>
                    </li>
                    <li>
                      <a
                        href="/onderhouds-instructies"
                        className="ultra-luxury-footer-link"
                      >
                        Onderhouds instructies
                      </a>
                    </li>
                    <li>
                      <a
                        href="/retour-beleid"
                        className="ultra-luxury-footer-link"
                      >
                        Retour beleid
                      </a>
                    </li>
                    <li>
                      <a
                        href="/garantie-voorwaarden"
                        className="ultra-luxury-footer-link"
                      >
                        Garantie voorwaarden
                      </a>
                    </li>
                    <li>
                      <a
                        href="/veelgestelde-vragen"
                        className="ultra-luxury-footer-link"
                      >
                        Veelgestelde vragen
                      </a>
                    </li>
                    <li>
                      <a
                        href="/bestelling-volgen"
                        className="ultra-luxury-footer-link"
                      >
                        Bestelstatus volgen
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="ultra-luxury-footer-link">
                        Contact opnemen
                      </a>
                    </li>
                    <li>
                      <a
                        href="/service-en-herstellingen"
                        className="ultra-luxury-footer-link"
                      >
                        Service & Herstellingen
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4: Nieuwsbrief */}
              <div className="ultra-luxury-footer-column">
                <h3 className="ultra-luxury-footer-heading">Nieuwsbrief</h3>
                <div className="ultra-luxury-footer-content">
                  <p className="ultra-luxury-newsletter-description">
                    Blijf op de hoogte van nieuwe collecties, aanbiedingen en
                    inspiratie voor uw interieur.
                  </p>

                  {/* Ultra-Luxury Newsletter Signup */}
                  <form className="ultra-luxury-newsletter-form">
                    <div className="ultra-luxury-newsletter-container">
                      <div className="ultra-luxury-input-wrapper">
                        <input
                          type="email"
                          placeholder="E-mail"
                          className="ultra-luxury-newsletter-input"
                          required
                        />
                        <div className="ultra-luxury-input-glow"></div>
                      </div>
                      <button
                        type="submit"
                        className="ultra-luxury-newsletter-button"
                      >
                        <div className="ultra-luxury-button-bg"></div>
                        <div className="ultra-luxury-button-content">
                          <svg
                            className="ultra-luxury-button-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="ultra-luxury-button-text">
                            Aanmelden
                          </span>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Mobile Accordion Footer */}
            <div className="md:hidden space-y-1 mb-12">
              {/* Bedrijf Section */}
              <div className="border-b border-gold-200/30">
                <button
                  onClick={() => toggleSection("bedrijf")}
                  className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
                >
                  <h3 className="footer-heading text-lg font-semibold text-gray-900">
                    Bedrijf
                  </h3>
                  <div className="ml-2 transition-transform duration-300">
                    {expandedSections.bedrijf ? (
                      <Minus className="w-5 h-5 text-gold-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gold-600" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections.bedrijf
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-2 pb-4">
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      KANIOU zilvernaald
                    </p>
                    <p className="text-gray-700 mb-4">
                      Premium Gordijnen & Zonweringen
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                      <a href="#" className="footer-social-icon">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Producten Section */}
              <div className="border-b border-gold-200/30">
                <button
                  onClick={() => toggleSection("producten")}
                  className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
                >
                  <h3 className="footer-heading text-lg font-semibold text-gray-900">
                    Producten
                  </h3>
                  <div className="ml-2 transition-transform duration-300">
                    {expandedSections.producten ? (
                      <Minus className="w-5 h-5 text-gold-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gold-600" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections.producten
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-2 pb-4">
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="/producten/vliegenramen"
                          className="footer-link"
                        >
                          Vliegenramen
                        </a>
                      </li>
                      <li>
                        <a
                          href="/producten/rolgordijnen"
                          className="footer-link"
                        >
                          Rolgordijnen
                        </a>
                      </li>
                      <li>
                        <a
                          href="/producten/overgordijnen"
                          className="footer-link"
                        >
                          Overgordijnen
                        </a>
                      </li>
                      <li>
                        <a
                          href="/quote"
                          className="footer-link footer-link-special"
                        >
                          Offerte aanvragen
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Klantenservice Section */}
              <div className="border-b border-gold-200/30">
                <button
                  onClick={() => toggleSection("klantenservice")}
                  className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
                >
                  <h3 className="footer-heading text-lg font-semibold text-gray-900">
                    Klantenservice
                  </h3>
                  <div className="ml-2 transition-transform duration-300">
                    {expandedSections.klantenservice ? (
                      <Minus className="w-5 h-5 text-gold-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gold-600" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections.klantenservice
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-2 pb-4">
                    <ul className="space-y-3">
                      <li>
                        <a href="/meet-instructies" className="footer-link">
                          Meet instructies
                        </a>
                      </li>
                      <li>
                        <a
                          href="/installatie-instructies"
                          className="footer-link"
                        >
                          Installatie instructies
                        </a>
                      </li>
                      <li>
                        <a
                          href="/onderhouds-instructies"
                          className="footer-link"
                        >
                          Onderhouds instructies
                        </a>
                      </li>
                      <li>
                        <a href="/retour-beleid" className="footer-link">
                          Retour beleid
                        </a>
                      </li>
                      <li>
                        <a href="/garantie-voorwaarden" className="footer-link">
                          Garantie voorwaarden
                        </a>
                      </li>
                      <li>
                        <a href="/veelgestelde-vragen" className="footer-link">
                          Veelgestelde vragen
                        </a>
                      </li>
                      <li>
                        <a href="/bestelling-volgen" className="footer-link">
                          Bestelstatus volgen
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="footer-link">
                          Contact opnemen
                        </a>
                      </li>
                      <li>
                        <a
                          href="/service-en-herstellingen"
                          className="footer-link"
                        >
                          Service & Herstellingen
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Nieuwsbrief Section */}
              <div className="border-b border-gold-200/30">
                <button
                  onClick={() => toggleSection("nieuwsbrief")}
                  className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
                >
                  <h3 className="footer-heading text-lg font-semibold text-gray-900">
                    Nieuwsbrief
                  </h3>
                  <div className="ml-2 transition-transform duration-300">
                    {expandedSections.nieuwsbrief ? (
                      <Minus className="w-5 h-5 text-gold-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gold-600" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections.nieuwsbrief
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-2 pb-4">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Blijf op de hoogte van nieuwe collecties, aanbiedingen en
                      inspiratie voor uw interieur.
                    </p>

                    {/* Newsletter Signup */}
                    <form className="newsletter-form">
                      <div className="newsletter-input-group">
                        <input
                          type="email"
                          placeholder="E-mail"
                          className="newsletter-input"
                          required
                        />
                        <button type="submit" className="newsletter-button">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                            />
                          </svg>
                          Aanmelden
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Legal Section - Collapsible */}
            <div className="md:hidden border-b border-gold-200/30">
              <button
                onClick={() => toggleSection("legal")}
                className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
              >
                <h3 className="footer-heading text-lg font-semibold text-gray-900">
                  Wettelijke documenten
                </h3>
                <div className="ml-2 transition-transform duration-300">
                  {expandedSections.legal ? (
                    <Minus className="w-5 h-5 text-gold-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gold-600" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.legal
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-2 pb-4">
                  <ul className="space-y-3 mb-4">
                    <li>
                      <a href="/privacybeleid" className="footer-legal-link">
                        Privacybeleid
                      </a>
                    </li>
                    <li>
                      <a
                        href="/algemene-voorwaarden"
                        className="footer-legal-link"
                      >
                        Algemene voorwaarden
                      </a>
                    </li>
                    <li>
                      <a href="/cookiebeleid" className="footer-legal-link">
                        Cookiebeleid
                      </a>
                    </li>
                    <li>
                      <a href="/disclaimer" className="footer-legal-link">
                        Disclaimer
                      </a>
                    </li>
                    <li>
                      <a
                        href="/gebruiksvoorwaarden"
                        className="footer-legal-link"
                      >
                        Gebruiksvoorwaarden
                      </a>
                    </li>
                  </ul>

                  {/* Google Reviews Link */}
                  <div className="text-center">
                    <a
                      href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.9886857,5.6914029,17z/data=!4m16!1m9!3m8!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!2sKANIOU+bvba+ZILVERNAALD!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn!3m5!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!16s%2Fg%2F11snz4psjn?authuser=4&entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors duration-300 hover:underline"
                    >
                      <span className="mr-1">⭐</span>
                      Bekijk onze Google Reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Legal Section - Always visible */}
            <div className="hidden md:block footer-legal">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-4">
                  © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
                </p>

                {/* Enhanced Legal Links */}
                <div className="flex flex-wrap justify-center lg:justify-between items-center gap-x-4 gap-y-2 text-sm mb-4 lg:max-w-none lg:w-full">
                  <a href="/privacybeleid" className="footer-legal-link">
                    Privacybeleid
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="/algemene-voorwaarden" className="footer-legal-link">
                    Algemene voorwaarden
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="/cookiebeleid" className="footer-legal-link">
                    Cookiebeleid
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="/disclaimer" className="footer-legal-link">
                    Disclaimer
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="/gebruiksvoorwaarden" className="footer-legal-link">
                    Gebruiksvoorwaarden
                  </a>
                </div>

                {/* Google Reviews Link */}
                <div className="text-center">
                  <a
                    href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.9886857,5.6914029,17z/data=!4m16!1m9!3m8!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!2sKANIOU+bvba+ZILVERNAALD!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn!3m5!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!16s%2Fg%2F11snz4psjn?authuser=4&entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors duration-300 hover:underline"
                  >
                    <span className="mr-1">⭐</span>
                    Bekijk onze Google Reviews
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Copyright - Always visible */}
            <div className="md:hidden text-center mt-6">
              <p className="text-gray-600 text-sm">
                © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
