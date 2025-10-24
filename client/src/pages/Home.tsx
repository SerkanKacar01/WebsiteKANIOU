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
    { name: "Contact", path: "/contact" },
  ];

  // Debug: Log navigation links to console
  console.log("🔍 NAVIGATION DEBUG: Rendering", navigationLinks.length, "navigation items:", navigationLinks.map(l => l.name).join(", "));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg" 
        : "bg-transparent"
    }`} style={{
      background: isScrolled 
        ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(237,214,147,0.05) 50%, rgba(255,255,255,0.95) 100%)'
        : 'transparent'
    }}>
      <div className="quantum-container">
        <div className="flex items-center justify-between py-4">
          {/* 2040 Crystalline Logo */}
          <div className="relative">
            <button 
              onClick={() => setLocation("/")} 
              className="crystalline-card spacing-quantum-sm transition-all duration-700 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.1) 100%)',
                backdropFilter: 'blur(10px)',
                animation: 'quantum-pulse 4s ease-in-out infinite'
              }}
            >
              <img
                src={kaniouLogo}
                alt="KANIOU - Professional Window Treatments"
                className="h-12 w-auto transition-all duration-700 group-hover:brightness-110"
              />
            </button>
          </div>

          {/* 2040 Prismatic Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => setLocation(link.path)}
                className="crystalline-card group px-6 py-3 text-sm font-crystalline-header text-gray-700 hover:text-gray-900 tracking-wide uppercase transition-all duration-700 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.1) 100%)',
                  backdropFilter: 'blur(10px)',
                  animation: `quantum-pulse ${3.5 + index * 0.2}s ease-in-out infinite`
                }}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                <span className="relative z-10 text-liquid-morph">{link.name}</span>
              </button>
            ))}
          </div>

          {/* 2040 Quantum CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setLocation("/quote")}
              className="crystalline-card group px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-crystalline-header text-sm tracking-wider uppercase transition-all duration-700 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #2c3e50 0%, #edd693 50%, #2c3e50 100%)',
                backdropFilter: 'blur(10px)',
                animation: 'quantum-pulse 3s ease-in-out infinite'
              }}
              data-testid="nav-cta-quote"
            >
              <span className="relative z-10">Vrijblijvend offerte</span>
            </button>
          </div>

          {/* 2040 Mobile Prismatic Menu Button */}
          <button
            className={`md:hidden crystalline-card p-3 transition-all duration-700 hover:scale-105 ${
              mobileMenuNeedsContrast
                ? "bg-black/90 text-white"
                : "text-gray-700"
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? (
              <span className="text-2xl transition-transform duration-300 rotate-180">×</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* 2040 Liquid Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 animate-fade-in-up transition-all duration-700">
            <div className="crystalline-card mx-4 spacing-quantum-lg" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              animation: 'quantum-pulse 4s ease-in-out infinite'
            }}>
              <div className="flex flex-col space-y-4">
                {navigationLinks.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setLocation(link.path);
                      setIsMenuOpen(false);
                    }}
                    className="crystalline-card text-left font-crystalline-header py-4 px-6 text-gray-700 hover:text-gray-900 tracking-wide uppercase transition-all duration-700 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.1) 100%)',
                      backdropFilter: 'blur(10px)',
                      animation: `quantum-pulse ${4 + index * 0.3}s ease-in-out infinite`
                    }}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  >
                    <span className="text-liquid-morph">{link.name}</span>
                  </button>
                ))}
                
                <div className="prisma-divider my-4"></div>
                
                <button
                  onClick={() => {
                    setLocation("/quote");
                    setIsMenuOpen(false);
                  }}
                  className="crystalline-card text-center font-crystalline-header py-4 px-6 text-white tracking-wider uppercase transition-all duration-700 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #2c3e50 0%, #edd693 50%, #2c3e50 100%)',
                    backdropFilter: 'blur(10px)',
                    animation: 'quantum-pulse 3s ease-in-out infinite'
                  }}
                  data-testid="mobile-cta-quote"
                >
                  <span className="relative z-10">Vrijblijvend offerte</span>
                </button>
              </div>
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
        {/* 2040 CRYSTALLINE HERO SECTION - Faceted Luxury Design */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Liquid Crystal Background Matrix */}
          <div className="absolute inset-0">
            <img
              src={interiorImage}
              alt="Premium raamdecoratie vakmanschap door KANIOU"
              className="w-full h-full object-cover"
            />
            {/* 2040 Prismatic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Crystalline Refractive Layer */}
            <div className="absolute inset-0 opacity-20" style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(237, 214, 147, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                linear-gradient(45deg, transparent 30%, rgba(237, 214, 147, 0.1) 50%, transparent 70%)
              `
            }}></div>
          </div>

          {/* Liquid Precision Content Container */}
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-6 py-16 md:pt-16 pt-24">
            {/* 2040 Morphing Liquid Display Title */}
            <h1 className="font-liquid-display text-6xl md:text-8xl text-white mb-8 text-liquid-morph text-crystalline-glow">
              <span className="block">
                Professionele
              </span>
              <span className="block mt-4" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #edd693 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'liquid-flow 4s ease-in-out infinite'
              }}>
                raamdecoratie
              </span>
            </h1>

            {/* Quantum Precision Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-20 max-w-3xl mx-auto font-crystalline-header spacing-quantum-md">
              Waar precisie en vakmanschap een nieuwe dimensie ontmoeten.
            </p>

            {/* 2040 Crystalline CTA Matrix */}
            <div className="flex flex-col items-center mb-24 spacing-quantum-xl">
              <button
                onClick={handleRequestQuote}
                className="crystalline-card group px-12 py-4 border-2 border-white/20 hover:border-white/60 text-white hover:bg-white/10 font-crystalline-header text-lg tracking-wider uppercase transition-all duration-700 hover:shadow-2xl hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.1) 100%)',
                  backdropFilter: 'blur(10px)'
                }}
                data-testid="button-request-quote"
              >
                <span className="relative z-10">Vrijblijvend offerte</span>
              </button>
              <p className="mt-6 text-white/70 text-base font-crystalline-header">
                30+ jaren expertise • 3500+ succesvolle projecten
              </p>
            </div>

            {/* 2040 Quantum Trust Matrix */}
            <div className="hidden md:grid quantum-grid-3 max-w-5xl mx-auto">
              <div className="crystalline-card text-center spacing-quantum-lg">
                <div className="text-5xl font-liquid-display text-white mb-3 text-crystalline-glow">
                  30+
                </div>
                <div className="text-white/70 text-sm font-crystalline-header tracking-widest uppercase">
                  Jaren expertise
                </div>
              </div>
              <div className="crystalline-card text-center spacing-quantum-lg">
                <div className="text-5xl font-liquid-display text-white mb-3 text-crystalline-glow">
                  3500+
                </div>
                <div className="text-white/70 text-sm font-crystalline-header tracking-widest uppercase">
                  Tevreden klanten
                </div>
              </div>
              <div className="crystalline-card text-center spacing-quantum-lg">
                <div className="text-5xl font-liquid-display text-white mb-3 text-crystalline-glow">
                  100%
                </div>
                <div className="text-white/70 text-sm font-crystalline-header tracking-widest uppercase">
                  Maatwerk
                </div>
              </div>
            </div>

            {/* 2040 Prismatic Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
              <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent mb-2"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* 2040 Floating Geometric Elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/10 rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 border border-white/20 rotate-12" style={{animation: 'prisma-rotation 15s linear infinite'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
        </div>

        {/* 2040 MORPHING PRODUCT COLLECTION - Liquid Precision */}
        <section className="liquid-section">
          <div className="quantum-container">
            {/* 2040 Crystalline Section Header */}
            <div className="text-center spacing-quantum-2xl">
              <h2 className="font-liquid-display text-5xl md:text-7xl font-light text-black mb-8 text-liquid-morph">
                <span style={{
                  background: 'linear-gradient(135deg, #2c3e50 0%, #edd693 50%, #2c3e50 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'liquid-flow 6s ease-in-out infinite'
                }}>
                  Onze collectie
                </span>
              </h2>
              <div className="prisma-divider"></div>
              <p className="text-xl font-crystalline-header text-gray-700 max-w-3xl mx-auto spacing-quantum-lg">
                Precisie-engineered raamdecoratie waar elke millimeter telt in 2040 perfection.
              </p>
            </div>

            {/* 2040 MORPHING LIQUID PRODUCT GRID - Geometric Precision */}
            <div className="quantum-grid spacing-quantum-2xl">
              {/* Houten jaloezieën - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/houten-jaloezieen")}
                data-testid="button-product-houten-jaloezieen"
                type="button"
                aria-label="Houten jaloezieën - Natuurlijke elegantie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 3s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">☰</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Houten jaloezieën</h3>
                <p className="text-base text-gray-600 font-light">Natuurlijke elegantie</p>
              </button>

              {/* Textiel lamellen - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/textiel-lamellen")}
                data-testid="button-product-textiel-lamellen"
                type="button"
                aria-label="Textiel lamellen - Zachte elegantie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 3.2s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">|</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Textiel lamellen</h3>
                <p className="text-base text-gray-600 font-light">Zachte elegantie</p>
              </button>

              {/* Kunststof jaloezieën - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/kunststof-jaloezieen")}
                data-testid="button-product-kunststof-jaloezieen"
                type="button"
                aria-label="Kunststof jaloezieën - Praktische perfectie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 3.4s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">≡</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Kunststof jaloezieën</h3>
                <p className="text-base text-gray-600 font-light">Praktische perfectie</p>
              </button>

              {/* Kunststof lamellen - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/kunststof-lamellen")}
                data-testid="button-product-kunststof-lamellen"
                type="button"
                aria-label="Kunststof lamellen - Praktische perfectie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 3.6s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">||</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Kunststof lamellen</h3>
                <p className="text-base text-gray-600 font-light">Praktische perfectie</p>
              </button>

              {/* Plissés - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/plisse")}
                data-testid="button-product-plisse"
                type="button"
                aria-label="Plissés - Gevouwen elegantie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 3.8s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">△</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Plissés</h3>
                <p className="text-base text-gray-600 font-light">Gevouwen elegantie</p>
              </button>

              {/* Duo plissés - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/duo-plisse")}
                data-testid="button-product-duo-plisse"
                type="button"
                aria-label="Duo plissés - Dubbele perfectie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 4s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">◇</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Duo plissés</h3>
                <p className="text-base text-gray-600 font-light">Dubbele perfectie</p>
              </button>

              {/* Rolgordijnen - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/rolgordijnen")}
                data-testid="button-product-rolgordijnen"
                type="button"
                aria-label="Rolgordijnen - Strakke simpliciteit"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 4.2s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">○</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Rolgordijnen</h3>
                <p className="text-base text-gray-600 font-light">Strakke simpliciteit</p>
              </button>

              {/* Duo rolgordijnen - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/duo-rolgordijnen")}
                data-testid="button-product-duo-rolgordijnen"
                type="button"
                aria-label="Duo rolgordijnen - Innovatieve functionaliteit"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 4.4s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">◎</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Duo rolgordijnen</h3>
                <p className="text-base text-gray-600 font-light">Innovatieve functionaliteit</p>
              </button>

              {/* Overgordijnen - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/overgordijnen")}
                data-testid="button-product-overgordijnen"
                type="button"
                aria-label="Overgordijnen - Klassieke grandeur"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 4.6s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">〜</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Overgordijnen</h3>
                <p className="text-base text-gray-600 font-light">Klassieke grandeur</p>
              </button>

              {/* Gordijnrails - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/gordijnrails")}
                data-testid="button-product-gordijnrails"
                type="button"
                aria-label="Gordijnrails - Perfecte mechaniek"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 4.8s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">─</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Gordijnrails</h3>
                <p className="text-base text-gray-600 font-light">Perfecte mechaniek</p>
              </button>

              {/* Vitrages - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/vitrages")}
                data-testid="button-product-vitrages"
                type="button"
                aria-label="Vitrages - Lichte elegantie"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 5s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">◦</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Vitrages</h3>
                <p className="text-base text-gray-600 font-light">Lichte elegantie</p>
              </button>

              {/* Houten shutters - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/producten/houten-shutters")}
                data-testid="button-product-houten-shutters"
                type="button"
                aria-label="Houten shutters - Tijdloze klasse"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 5.2s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">▓</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Houten shutters</h3>
                <p className="text-base text-gray-600 font-light">Tijdloze klasse</p>
              </button>

              {/* Vouwgordijnen - 2040 Liquid Card */}
              <button
                className="crystalline-card group text-left liquid-responsive spacing-quantum-lg"
                onClick={() => setLocation("/vouwgordijnen")}
                data-testid="button-product-vouwgordijnen"
                type="button"
                aria-label="Vouwgordijnen - Zachte plooien, strakke lijnen"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,214,147,0.1) 50%, rgba(255,255,255,0.9) 100%)',
                  animation: 'quantum-pulse 5.4s ease-in-out infinite'
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                    <span className="text-gray-700 text-2xl group-hover:scale-110 transition-transform duration-500">▭</span>
                  </div>
                </div>
                <h3 className="font-crystalline-header text-xl text-gray-900 mb-3 text-liquid-morph">Vouwgordijnen</h3>
                <p className="text-base text-gray-600 font-light">Zachte plooien, strakke lijnen</p>
              </button>
            </div>

            {/* 2040 PRISMATIC DIVIDER - End of Grid */}
            <div className="prisma-divider"></div>
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
