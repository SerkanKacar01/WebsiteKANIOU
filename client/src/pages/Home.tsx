import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
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
const ProfessionalNavigation = () => {
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
    { name: "Prijzen", path: "/prijzen" },
    { name: "Contact", path: "/contact" },
  ];

  // Debug: Log navigation links to console
  console.log("🔍 NAVIGATION DEBUG: Rendering", navigationLinks.length, "navigation items:", navigationLinks.map(l => l.name).join(", "));

  return (
    <nav className={`nav-professional ${isScrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <div className="nav-logo">
            <button onClick={() => setLocation("/")} className="transition-elegant-fast hover-lift">
              <img
                src={kaniouLogo}
                alt="KANIOU - Professional Window Treatments"
                className="h-12 w-auto transition-elegant"
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setLocation("/quote")}
              className="btn-luxury btn-elegant"
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
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-2xl">☰</span>
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
          content="Transform your space with our professional custom window treatments. Expert installation and 30+ years of expertise in Belgium."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Professional Navigation */}
      <ProfessionalNavigation />

      <div className="content-offset">
        {/* Hero Section - Ultra High-End Minimalistic */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Clean Background Image */}
          <div className="absolute inset-0">
            <img
              src={interiorImage}
              alt="Premium raamdecoratie vakmanschap door KANIOU"
              className="w-full h-full object-cover"
            />
            {/* Minimal Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6 py-16 md:pt-16 pt-24">
            {/* Ultra High-End Minimalistic Title */}
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-[0.9] tracking-tight">
              <span className="block font-light">
                Professionele
              </span>
              <span className="block font-normal mt-2">
                raamdecoratie
              </span>
            </h1>

            {/* Refined Subtitle */}
            <p className="text-lg md:text-xl text-white/85 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
              Waar kwaliteit en vakmanschap samenkomen.
            </p>

            {/* Ultra High-End Minimalistic CTA */}
            <div className="flex flex-col items-center mb-20">
              <button
                onClick={handleRequestQuote}
                className="group px-8 py-3 border border-white/30 hover:border-white/60 text-white hover:bg-white/5 btn-elegant transition-elegant font-light tracking-wide text-sm uppercase"
              >
                Vrijblijvend offerte
              </button>
              <p className="mt-4 text-white/60 text-sm font-light">
                30+ jaren ervaring • 3500+ tevreden klanten
              </p>
            </div>

            {/* Ultra High-End Trust Indicators */}
            <div className="hidden md:grid grid-cols-3 gap-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-serif font-light text-white mb-2">
                  30+
                </div>
                <div className="text-white/60 text-sm font-light tracking-wide">
                  Jaren ervaring
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-light text-white mb-2">
                  3500+
                </div>
                <div className="text-white/60 text-sm font-light tracking-wide">
                  Tevreden klanten
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-light text-white mb-2">
                  100%
                </div>
                <div className="text-white/60 text-sm font-light tracking-wide">
                  Maatwerk
                </div>
              </div>
            </div>

            {/* Minimal Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="w-px h-8 bg-white/30"></div>
            </div>
          </div>
        </div>

        {/* Product Collection Section - Ultra High-End Minimalistic */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {/* Ultra High-End Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Onze collectie
              </h2>
              <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Professionele raamdecoratie op maat, 
                gemaakt met precisie en vakmanschap.
              </p>
            </div>

            {/* Ultra High-End Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
              {/* Houten jaloezieën - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/houten-jaloezieen")}
                data-testid="button-product-houten-jaloezieen"
                type="button"
                aria-label="Houten jaloezieën - Natuurlijke elegantie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">☰</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Houten jaloezieën</h3>
                <p className="text-sm font-light text-gray-600">Natuurlijke elegantie</p>
              </button>

              {/* Textiel lamellen - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/textiel-lamellen")}
                data-testid="button-product-textiel-lamellen"
                type="button"
                aria-label="Textiel lamellen - Zachte elegantie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">|</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Textiel lamellen</h3>
                <p className="text-sm font-light text-gray-600">Zachte elegantie</p>
              </button>

              {/* Kunststof jaloezieën - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/kunststof-jaloezieen")}
                data-testid="button-product-kunststof-jaloezieen"
                type="button"
                aria-label="Kunststof jaloezieën - Praktische perfectie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">≡</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Kunststof jaloezieën</h3>
                <p className="text-sm font-light text-gray-600">Praktische perfectie</p>
              </button>

              {/* Kunststof lamellen - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/kunststof-lamellen")}
                data-testid="button-product-kunststof-lamellen"
                type="button"
                aria-label="Kunststof lamellen - Praktische perfectie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">||</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Kunststof lamellen</h3>
                <p className="text-sm font-light text-gray-600">Praktische perfectie</p>
              </button>

              {/* Plissés - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/plisse")}
                data-testid="button-product-plisse"
                type="button"
                aria-label="Plissés - Gevouwen elegantie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">△</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Plissés</h3>
                <p className="text-sm font-light text-gray-600">Gevouwen elegantie</p>
              </button>

              {/* Duo plissés - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/duo-plisse")}
                data-testid="button-product-duo-plisse"
                type="button"
                aria-label="Duo plissés - Dubbele perfectie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">◇</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Duo plissés</h3>
                <p className="text-sm font-light text-gray-600">Dubbele perfectie</p>
              </button>

              {/* Rolgordijnen - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/rolgordijnen")}
                data-testid="button-product-rolgordijnen"
                type="button"
                aria-label="Rolgordijnen - Strakke simpliciteit"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">○</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Rolgordijnen</h3>
                <p className="text-sm font-light text-gray-600">Strakke simpliciteit</p>
              </button>

              {/* Duo rolgordijnen - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/duo-rolgordijnen")}
                data-testid="button-product-duo-rolgordijnen"
                type="button"
                aria-label="Duo rolgordijnen - Innovatieve functionaliteit"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">◎</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Duo rolgordijnen</h3>
                <p className="text-sm font-light text-gray-600">Innovatieve functionaliteit</p>
              </button>

              {/* Overgordijnen - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/overgordijnen")}
                data-testid="button-product-overgordijnen"
                type="button"
                aria-label="Overgordijnen - Klassieke grandeur"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">〜</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Overgordijnen</h3>
                <p className="text-sm font-light text-gray-600">Klassieke grandeur</p>
              </button>

              {/* Gordijnrails - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/gordijnrails")}
                data-testid="button-product-gordijnrails"
                type="button"
                aria-label="Gordijnrails - Perfecte mechaniek"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">─</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Gordijnrails</h3>
                <p className="text-sm font-light text-gray-600">Perfecte mechaniek</p>
              </button>

              {/* Vitrages - Ultra High-End Card */}
              <button
                className="group bg-white border border-gray-100 rounded-lg p-6 text-left hover:shadow-sm transition-all duration-200 hover:-translate-y-1"
                onClick={() => setLocation("/producten/vitrages")}
                data-testid="button-product-vitrages"
                type="button"
                aria-label="Vitrages - Lichte elegantie"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">◦</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-normal text-gray-900 mb-2">Vitrages</h3>
                <p className="text-sm font-light text-gray-600">Lichte elegantie</p>
              </button>

              {/* Houten shutters - Premium Card */}
              <button
                className="professional-product-card group"
                onClick={() => setLocation("/producten/houten-shutters")}
                data-testid="button-product-houten-shutters"
                type="button"
                aria-label="Houten shutters - Tijdloze klasse"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/houten-shutters-icon.png"
                        alt="Houten shutters"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Houten shutters</h3>
                  <p className="professional-card-subtitle">Tijdloze klasse</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </button>

              {/* Vouwgordijnen - Premium Card */}
              <button
                className="professional-product-card group"
                onClick={() => setLocation("/vouwgordijnen")}
                data-testid="button-product-vouwgordijnen"
                type="button"
                aria-label="Vouwgordijnen - Zachte plooien, strakke lijnen"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/vouwgordijnen-icon.png"
                        alt="Vouwgordijnen"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Vouwgordijnen</h3>
                  <p className="professional-card-subtitle">Zachte plooien, strakke lijnen</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </button>

              {/* Gordijnroedes - Premium Card */}
              <button
                className="professional-product-card group"
                onClick={() => setLocation("/gordijnroedes")}
                data-testid="button-product-gordijnroedes"
                type="button"
                aria-label="Gordijnroedes - Sterke ondersteuning"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <span className="text-white text-2xl">−</span>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Gordijnroedes</h3>
                  <p className="professional-card-subtitle">Sterke ondersteuning</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </button>

              {/* Squid - Premium Card */}
              <button
                className="professional-product-card group"
                onClick={() => setLocation("/squid")}
                data-testid="button-product-squid"
                type="button"
                aria-label="Squid - Moderne privacy"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <span className="text-white text-2xl">×</span>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Squid</h3>
                  <p className="professional-card-subtitle">Moderne privacy</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </button>

              {/* Horren - Premium Card */}
              <button
                className="professional-product-card group"
                onClick={() => setLocation("/horren")}
                data-testid="button-product-horren"
                type="button"
                aria-label="Horren - Insectvrij comfort"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <span className="text-white text-2xl">🛏️</span>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Horren</h3>
                  <p className="professional-card-subtitle">Insectvrij comfort</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </button>

              {/* Screen - Buiten Zonwering - Premium Card */}
              <button
                className="professional-product-card group"
                onClick={() => setLocation("/screen")}
                data-testid="button-product-screen"
                type="button"
                aria-label="Screen - Buiten zonwering"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <div className="relative">
                        <span className="text-white text-2xl">⛄</span>
                        <div className="absolute -top-2 -right-2 bg-[#E67E22] text-white text-xs px-2 py-1 rounded-full font-bold">
                          BUITEN ZONWERING
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Screen</h3>
                  <p className="professional-card-subtitle">Buiten zonwering</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury"></div>

        {/* Why Choose KANIOU - Revolutionary Ultra-Luxury USP Section */}
        <section className="ultra-luxury-features-section ultra-premium-interactive">
          <div className="absolute inset-0 luxury-gradient-bg ultra-premium-glass"></div>
          <div className="absolute inset-0 luxury-texture-overlay"></div>
          <div className="ultra-particle-system"></div>
          <div className="container-golden relative z-10">
            {/* Ultra-Premium Section Header with Revolutionary Effects */}
            <div className="text-center mb-32">
              <div className="luxury-section-badge-premium mb-16 ultra-sophisticated-glow ultra-micro-interaction">
                <div className="luxury-badge-glow-premium"></div>
                <span className="luxury-badge-text-premium ultra-luxury-text-effect">
                  HAUTE COUTURE EXCELLENCE
                </span>
              </div>
              <h2 className="ultra-luxury-title mb-12 ultra-sophisticated-glow">
                <span className="ultra-luxury-title-line ultra-luxury-text-effect">De Kunst van</span>
                <span className="ultra-luxury-title-emphasis ultra-luxury-text-effect animate-pulse">Perfectie</span>
              </h2>
              <p className="ultra-luxury-subtitle max-w-5xl mx-auto hover:scale-105 transition-transform duration-700">
                Ervaar het toppunt van Belgisch vakmanschap – waar drie decennia
                toewijding aan perfectie samensmelten met hedendaagse luxe in
                elk met zorg vervaardigd detail.
              </p>
            </div>

            {/* Ultra-Luxury Features Grid */}
            <div className="ultra-luxury-features-grid">
              {/* Perfect Fit - Revolutionary Ultra Luxury */}
              <div className="ultra-luxury-feature-card group ultra-premium-interactive ultra-micro-interaction ultra-sophisticated-glow">
                <div className="ultra-luxury-card-bg ultra-premium-glass"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow animate-pulse"></div>
                    <span className="ultra-professional-icon text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">⛄</span>
                  </div>
                  <h3 className="ultra-luxury-feature-title ultra-luxury-text-effect">
                    Vakkundig Op Maat
                  </h3>
                  <p className="ultra-luxury-feature-description group-hover:text-gold-600 transition-colors duration-500">
                    Elk stuk wordt nauwkeurig opgemeten en vervaardigd met
                    Zwitserse precisie voor uw unieke interieur.
                  </p>
                </div>
              </div>

              {/* Express Service - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group ultra-premium-interactive ultra-micro-interaction ultra-sophisticated-glow">
                <div className="ultra-luxury-card-bg ultra-premium-glass"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow animate-pulse"></div>
                    <span className="ultra-professional-icon text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🚚</span>
                  </div>
                  <h3 className="ultra-luxury-feature-title ultra-luxury-text-effect">
                    Uitmuntende Levering
                  </h3>
                  <p className="ultra-luxury-feature-description group-hover:text-gold-600 transition-colors duration-500">
                    Snelle levering, zorgvuldig gecoördineerd met compromisloze
                    aandacht voor elk detail. Mits beschikbaarheid van de
                    materialen.
                  </p>
                </div>
              </div>

              {/* Master Consultation - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group ultra-premium-interactive ultra-micro-interaction ultra-sophisticated-glow">
                <div className="ultra-luxury-card-bg ultra-premium-glass"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow animate-pulse"></div>
                    <span className="ultra-professional-icon text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">👥</span>
                  </div>
                  <h3 className="ultra-luxury-feature-title ultra-luxury-text-effect">
                    Meesterlijk Advies
                  </h3>
                  <p className="ultra-luxury-feature-description group-hover:text-gold-600 transition-colors duration-500">
                    Persoonlijke begeleiding door vakmensen met meer dan dertig
                    jaar verfijnde expertise.
                  </p>
                </div>
              </div>

              {/* Luxury Materials - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group ultra-premium-interactive ultra-micro-interaction ultra-sophisticated-glow">
                <div className="ultra-luxury-card-bg ultra-premium-glass"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow animate-pulse"></div>
                    <span className="ultra-professional-icon text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🏆</span>
                  </div>
                  <h3 className="ultra-luxury-feature-title ultra-luxury-text-effect">
                    Luxueuze Materialen
                  </h3>
                  <p className="ultra-luxury-feature-description group-hover:text-gold-600 transition-colors duration-500">
                    Geselecteerde stoffen en hoogwaardige materialen voor
                    blijvende schoonheid en verfijning.
                  </p>
                </div>
              </div>

              {/* Heritage Excellence - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group ultra-premium-interactive ultra-micro-interaction ultra-sophisticated-glow">
                <div className="ultra-luxury-card-bg ultra-premium-glass"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow animate-pulse"></div>
                    <span className="ultra-professional-icon text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">⏰</span>
                  </div>
                  <h3 className="ultra-luxury-feature-title ultra-luxury-text-effect">
                    Traditie in Perfectie
                  </h3>
                  <p className="ultra-luxury-feature-description group-hover:text-gold-600 transition-colors duration-500">
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
                <span className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40 text-2xl flex items-center justify-center">"</span>

                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 text-gold-500 text-lg flex items-center justify-center"
                    >★</span>
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
                <span className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40 text-2xl flex items-center justify-center">"</span>

                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 text-gold-500 text-lg flex items-center justify-center"
                    >★</span>
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
                <span className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40 text-2xl flex items-center justify-center">"</span>

                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 text-gold-500 text-lg flex items-center justify-center"
                    >★</span>
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
      </div>
    </>
  );
};

export default Home;
