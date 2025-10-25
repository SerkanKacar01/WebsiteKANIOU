import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Star, ExternalLink } from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";
import interiorImageSrc from "@assets/Overgordijnen.jpeg";
import gallery1Src from "@assets/IMG_9192.jpeg";
import gallery2Src from "@assets/IMG_9204.jpeg";
import gallery3Src from "@assets/IMG_9217.jpeg";
import gallery4Src from "@assets/IMG_9219.jpeg";
import gallery5Src from "@assets/IMG_9220.jpeg";
import gallery6Src from "@assets/IMG_9221.jpeg";

const interiorImage = interiorImageSrc;
const gallery1 = gallery1Src;
const gallery2 = gallery2Src;
const gallery3 = gallery3Src;
const gallery4 = gallery4Src;
const gallery5 = gallery5Src;
const gallery6 = gallery6Src;

// Luxury Navigation Component - Minimal & Elegant with Enhanced Hover
const LuxuryNavigation = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collectie", path: "/producten/overgordijnen" },
    { name: "Gallerij", path: "/gallerij" },
    { name: "Over ons", path: "/over-ons" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-white/98 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
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
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setLocation(link.path)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative group"
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>
            ))}
          </div>

          {/* CTA Button - Enhanced Hover */}
          <div className="hidden lg:block">
            <button
              onClick={() => setLocation("/quote")}
              className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase transition-all duration-500 hover:bg-gray-900 hover:shadow-2xl hover:-translate-y-0.5 relative overflow-hidden group"
              data-testid="nav-cta-quote"
            >
              <span className="relative z-10">Offerte aanvragen</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            <span className="text-2xl">{isMobileMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t py-8">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setLocation(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm tracking-widest uppercase text-gray-700"
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setLocation("/quote");
                  setIsMobileMenuOpen(false);
                }}
                className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase text-center"
                data-testid="mobile-cta-quote"
              >
                Offerte aanvragen
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Custom hook for scroll-triggered animations
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

const Home = () => {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);
  
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal hooks for different sections
  const [brandRef, brandVisible] = useScrollReveal(0.2);
  const [productsRef, productsVisible] = useScrollReveal(0.1);
  const [craftsmanshipRef, craftsmanshipVisible] = useScrollReveal(0.2);
  const [galleryRef, galleryVisible] = useScrollReveal(0.1);

  return (
    <>
      <Helmet>
        <title>KANIOU – Premium Raamdecoratie & Maatwerk | 30+ jaar expertise</title>
        <meta
          name="description"
          content="Ontdek de ultieme luxe in raamdecoratie. KANIOU biedt op maat gemaakte gordijnen, jaloezieën en zonwering met meer dan 30 jaar vakmanschap in België."
        />
        <meta property="og:title" content="KANIOU – Premium Raamdecoratie" />
        <meta property="og:description" content="Luxe raamdecoratie op maat | 30+ jaar expertise" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LuxuryNavigation />

      <div className="bg-white">
        {/* HERO SECTION - Full Screen Minimal with Parallax */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img
              src={interiorImage}
              alt="Premium raamdecoratie"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          </div>

          {/* Hero Content with Fade-in Animation */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-[fadeInUp_1.2s_ease-out]">
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tighter leading-[0.85] transition-all duration-700 hover:scale-105" 
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.04em',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}
            >
              Vakmanschap<br/>
              <span className="italic bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text">in elke plooi</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-16 font-light tracking-wide max-w-xl mx-auto animate-[fadeInUp_1.4s_ease-out]">
              Premium raamdecoratie op maat sinds meer dan 30 jaar
            </p>

            <button
              onClick={() => setLocation("/quote")}
              className="group inline-flex items-center px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-700 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 animate-[fadeInUp_1.6s_ease-out] relative overflow-hidden"
              data-testid="button-request-quote"
            >
              <span className="relative z-10 text-xs tracking-widest uppercase mr-3">Ontdek de collectie</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>
          </div>

          {/* Scroll Indicator with Glow */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          </div>
        </section>

        {/* BRAND STATEMENT - Extreme Whitespace with Scroll Animation */}
        <section 
          ref={brandRef}
          className="py-32 md:py-48 bg-white overflow-hidden"
        >
          <div 
            className={`max-w-5xl mx-auto px-6 text-center transition-all duration-1200 ${
              brandVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight leading-tight hover:scale-105 transition-transform duration-700" 
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em'
              }}
            >
              Waar precisie en<br/>schoonheid samenkomen
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto my-12"></div>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Elk project is uniek. Elke millimeter telt. Met meer dan drie decennia ervaring 
              creëren wij raamdecoratie die uw ruimte transformeert.
            </p>
          </div>
        </section>

        {/* PRODUCT GRID - Editorial Style with Stagger Animation */}
        <section 
          ref={productsRef}
          className="py-32 bg-gray-50"
        >
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            {/* Section Header */}
            <div 
              className={`text-center mb-20 transition-all duration-1000 ${
                productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 
                className="text-5xl md:text-6xl font-light text-black mb-6" 
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '-0.02em'
                }}
              >
                Onze collectie
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto"></div>
            </div>

            {/* 2-Column Grid with Stagger */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                { name: "Houten jaloezieën", desc: "Natuurlijke warmte", path: "/producten/houten-jaloezieen" },
                { name: "Textiel lamellen", desc: "Zachte elegantie", path: "/producten/textiel-lamellen" },
                { name: "Plissé gordijnen", desc: "Veelzijdige perfectie", path: "/producten/plisse" },
                { name: "Overgordijnen", desc: "Tijdloze luxe", path: "/producten/overgordijnen" },
              ].map((product, index) => (
                <button
                  key={product.name}
                  onClick={() => setLocation(product.path)}
                  className={`group relative overflow-hidden bg-white p-12 lg:p-16 text-left transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                    productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: productsVisible ? `${index * 150}ms` : '0ms'
                  }}
                  data-testid={`button-product-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <div className="relative z-10">
                    <div 
                      className="text-6xl md:text-7xl font-light mb-6 text-gray-200 group-hover:text-gray-300 transition-all duration-700 group-hover:scale-110" 
                      style={{
                        fontFamily: "'Cormorant Garamond', serif"
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 
                      className="text-3xl md:text-4xl font-light text-black mb-3 group-hover:text-gray-900 transition-colors duration-500" 
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm tracking-wide uppercase mb-8">{product.desc}</p>
                    <div className="inline-flex items-center text-black text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-500">
                      Ontdekken
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
                  }}></div>
                </button>
              ))}
            </div>

            {/* All Products Link */}
            <div 
              className={`text-center mt-20 transition-all duration-1000 delay-600 ${
                productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={() => setLocation("/producten/overgordijnen")}
                className="group inline-flex items-center px-12 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                data-testid="button-view-all"
              >
                <span className="relative z-10 text-xs tracking-widest uppercase mr-3">Volledige collectie</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </button>
            </div>
          </div>
        </section>

        {/* CRAFTSMANSHIP SECTION - 2 Column Editorial with Reveal */}
        <section 
          ref={craftsmanshipRef}
          className="py-32 bg-white"
        >
          <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left: Text */}
              <div 
                className={`transition-all duration-1200 ${
                  craftsmanshipVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              >
                <h2 
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-12 leading-tight hover:scale-105 transition-transform duration-700" 
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '-0.02em'
                  }}
                >
                  30+ jaar<br/>
                  <span className="italic bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">expertise</span>
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-black/20 to-transparent mb-12"></div>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-8">
                  Sinds onze oprichting hebben we meer dan 3500 projecten gerealiseerd, 
                  elk met dezelfde toewijding aan kwaliteit en vakmanschap.
                </p>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-12">
                  Van klassieke elegantie tot modern minimalisme – 
                  wij brengen uw visie tot leven met precisie en zorg.
                </p>
                <button
                  onClick={() => setLocation("/over-ons")}
                  className="group inline-flex items-center text-black text-xs tracking-widest uppercase hover:translate-x-2 transition-all duration-500 hover:text-gray-700"
                  data-testid="button-about"
                >
                  Ons verhaal
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Right: Stats with Stagger */}
              <div 
                className={`grid grid-cols-2 gap-8 transition-all duration-1200 delay-300 ${
                  craftsmanshipVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                {[
                  { number: "30+", label: "Jaren ervaring" },
                  { number: "3500+", label: "Projecten" },
                  { number: "100%", label: "Maatwerk" },
                  { number: "5★", label: "Klantbeoordeling" },
                ].map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="group text-center p-8 bg-gray-50 hover:bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                    style={{
                      transitionDelay: craftsmanshipVisible ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    <div 
                      className="text-5xl md:text-6xl font-light text-black mb-4 group-hover:scale-110 transition-transform duration-500" 
                      style={{
                        fontFamily: "'Cormorant Garamond', serif"
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs tracking-widest uppercase text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW - Masonry Style with Hover Glow */}
        <section 
          ref={galleryRef}
          className="py-32 bg-gray-50"
        >
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            {/* Section Header */}
            <div 
              className={`text-center mb-20 transition-all duration-1000 ${
                galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 
                className="text-5xl md:text-6xl font-light text-black mb-6" 
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '-0.02em'
                }}
              >
                Realisaties
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-6"></div>
              <p className="text-gray-600 tracking-wide">Een selectie uit ons portfolio</p>
            </div>

            {/* 3-Column Gallery Grid with Stagger */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((img, i) => (
                <div 
                  key={i} 
                  className={`relative overflow-hidden group cursor-pointer aspect-[4/5] transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                    galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: galleryVisible ? `${i * 100}ms` : '0ms'
                  }}
                  onClick={() => setLocation("/gallerij")}
                  data-testid={`gallery-item-${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`Project ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)'
                  }}></div>
                </div>
              ))}
            </div>

            {/* Gallery Link */}
            <div 
              className={`text-center mt-20 transition-all duration-1000 delay-600 ${
                galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={() => setLocation("/gallerij")}
                className="group inline-flex items-center px-12 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                data-testid="button-view-gallery"
              >
                <span className="relative z-10 text-xs tracking-widest uppercase mr-3">Bekijk alle projecten</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </button>
            </div>
          </div>
        </section>

        {/* GOOGLE REVIEWS SECTION */}
        <section className="py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
            {/* Section Header with Google Link */}
            <div className="text-center mb-16">
              <h2 
                className="text-5xl md:text-6xl font-light text-black mb-8" 
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '-0.02em'
                }}
              >
                Wat onze klanten zeggen
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-8"></div>
              
              {/* Google Profile Link */}
              <a
                href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 text-sm group"
                data-testid="link-google-reviews"
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'/%3E%3Cpath fill='%2334A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'/%3E%3Cpath fill='%23FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'/%3E%3Cpath fill='%23EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'/%3E%3C/svg%3E"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="font-medium">Bekijk alle reviews op Google</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Google Reviews Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Cardeynaels",
                  rating: 5,
                  text: "Zeer tevreden van de service van Kaniou! Komen de afspraken na, producten zijn dik in orde. De communicatie verloopt vlot en correct. Ook op de plaatsing is niets aan te merken. Zeer prettige samenwerking en zeker een aanrader.",
                  date: "5 maanden geleden"
                },
                {
                  name: "Buelles",
                  rating: 5,
                  text: "Zonder afspraak binnen gewandeld en toen direct netjes geholpen. Thuisbezoek  gehad voor opnemen maten en om te zien of stoffen ook daadwerkelijk passen bij de ruimtes. Steeds netjes contact geweest ; offerte snel gemaakt , afspraken worden nagekomen . Vandaag de gordijnen in onze woonkamer mogen ontvangen en we zijn zo content ! Heel snel en vakkundig werk geleverd . We laten het hele huis doen , bovenverdieping volgende maand . We kijken er naar uit ! Voornaam: Kwaliteit en service voor een eerlijke prijs !",
                  date: "1 jaar geleden"
                },
                {
                  name: "Anedda",
                  rating: 5,
                  text: "Ik heb zeer professionele hulp ontvangen van dit bedrijf bij het installeren van mijn jaloezieën en het ophangen van mijn gordijnen. De medewerker was vriendelijk, kwam alle afspraken keurig na en werkte nauwkeurig. De kwaliteit van de materialen is uitstekend. Kortom, een absolute aanrader voor iedereen – deze vijf sterren zijn méér dan verdiend!"
                  date: "3 maanden geleden"
                },
                {
                  name: "Sophie Vermeulen",
                  rating: 5,
                  text: "Meer dan 30 jaar ervaring is duidelijk merkbaar. Heel blij met onze nieuwe houten jaloezieën. Perfect vakmanschap en persoonlijke service. Bedankt!",
                  date: "3 maanden geleden"
                }
              ].map((review, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-8 hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                  data-testid={`google-review-${index + 1}`}
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 min-h-[120px]">
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-medium text-gray-900 text-sm mb-1">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Rating Summary */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-3 bg-gray-50 px-8 py-4 rounded-full">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-2xl font-light text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    5.0
                  </p>
                  <p className="text-xs text-gray-600">Gemiddelde beoordeling</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION - Minimal with Glow */}
        <section className="py-32 md:py-48 bg-black text-white relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 
              className="text-5xl md:text-7xl font-light mb-12 leading-tight hover:scale-105 transition-transform duration-700" 
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em',
                textShadow: '0 0 40px rgba(255,255,255,0.1)'
              }}
            >
              Klaar om te beginnen?
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light mb-16 max-w-2xl mx-auto">
              Vraag een vrijblijvende offerte aan en ontdek wat wij voor u kunnen betekenen.
            </p>
            <button
              onClick={() => setLocation("/quote")}
              className="group inline-flex items-center px-12 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 relative overflow-hidden"
              data-testid="button-cta-quote"
            >
              <span className="relative z-10 text-xs tracking-widest uppercase mr-3">Offerte aanvragen</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

// Custom keyframe animations for luxury effects
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Home;
