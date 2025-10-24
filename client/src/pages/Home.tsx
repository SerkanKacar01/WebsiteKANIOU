import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
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

// Luxury Navigation Component - Minimal & Elegant
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
            className="transition-all duration-500 hover:opacity-70"
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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => setLocation("/quote")}
              className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase transition-all duration-500 hover:bg-gray-900"
              data-testid="nav-cta-quote"
            >
              Offerte aanvragen
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

const Home = () => {
  const [, setLocation] = useLocation();

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
        {/* HERO SECTION - Full Screen Minimal */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={interiorImage}
              alt="Premium raamdecoratie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tighter leading-[0.85]" style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '-0.04em'
            }}>
              Vakmanschap<br/>
              <span className="italic">in elke plooi</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-16 font-light tracking-wide max-w-xl mx-auto">
              Premium raamdecoratie op maat sinds meer dan 30 jaar
            </p>

            <button
              onClick={() => setLocation("/quote")}
              className="group inline-flex items-center px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-700"
              data-testid="button-request-quote"
            >
              <span className="text-xs tracking-widest uppercase mr-3">Ontdek de collectie</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </div>
        </section>

        {/* BRAND STATEMENT - Extreme Whitespace */}
        <section className="py-32 md:py-48 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight leading-tight" style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '-0.02em'
            }}>
              Waar precisie en<br/>schoonheid samenkomen
            </h2>
            <div className="w-16 h-px bg-black/20 mx-auto my-12"></div>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Elk project is uniek. Elke millimeter telt. Met meer dan drie decennia ervaring 
              creëren wij raamdecoratie die uw ruimte transformeert.
            </p>
          </div>
        </section>

        {/* PRODUCT GRID - Editorial Style */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-light text-black mb-6" style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em'
              }}>
                Onze collectie
              </h2>
              <div className="w-16 h-px bg-black/20 mx-auto"></div>
            </div>

            {/* 2-Column Grid */}
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
                  className="group relative overflow-hidden bg-white p-12 lg:p-16 text-left transition-all duration-700 hover:shadow-2xl"
                  data-testid={`button-product-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <div className="relative z-10">
                    <div className="text-6xl md:text-7xl font-light mb-6 text-gray-200 group-hover:text-gray-300 transition-colors duration-700" style={{
                      fontFamily: "'Cormorant Garamond', serif"
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light text-black mb-3" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: '-0.01em'
                    }}>
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm tracking-wide uppercase mb-8">{product.desc}</p>
                    <div className="inline-flex items-center text-black text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-500">
                      Ontdekken
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </button>
              ))}
            </div>

            {/* All Products Link */}
            <div className="text-center mt-20">
              <button
                onClick={() => setLocation("/producten/overgordijnen")}
                className="inline-flex items-center px-12 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-500"
                data-testid="button-view-all"
              >
                <span className="text-xs tracking-widest uppercase mr-3">Volledige collectie</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* CRAFTSMANSHIP SECTION - 2 Column Editorial */}
        <section className="py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left: Text */}
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-12 leading-tight" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '-0.02em'
                }}>
                  30+ jaar<br/>
                  <span className="italic">expertise</span>
                </h2>
                <div className="w-16 h-px bg-black/20 mb-12"></div>
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
                  className="inline-flex items-center text-black text-xs tracking-widest uppercase hover:translate-x-2 transition-transform duration-500"
                  data-testid="button-about"
                >
                  Ons verhaal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "30+", label: "Jaren ervaring" },
                  { number: "3500+", label: "Projecten" },
                  { number: "100%", label: "Maatwerk" },
                  { number: "5★", label: "Klantbeoordeling" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-8 bg-gray-50">
                    <div className="text-5xl md:text-6xl font-light text-black mb-4" style={{
                      fontFamily: "'Cormorant Garamond', serif"
                    }}>
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

        {/* GALLERY PREVIEW - Masonry Style */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-light text-black mb-6" style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em'
              }}>
                Realisaties
              </h2>
              <div className="w-16 h-px bg-black/20 mx-auto mb-6"></div>
              <p className="text-gray-600 tracking-wide">Een selectie uit ons portfolio</p>
            </div>

            {/* 3-Column Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((img, i) => (
                <div 
                  key={i} 
                  className="relative overflow-hidden group cursor-pointer aspect-[4/5]"
                  onClick={() => setLocation("/gallerij")}
                  data-testid={`gallery-item-${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`Project ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>

            {/* Gallery Link */}
            <div className="text-center mt-20">
              <button
                onClick={() => setLocation("/gallerij")}
                className="inline-flex items-center px-12 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-500"
                data-testid="button-view-gallery"
              >
                <span className="text-xs tracking-widest uppercase mr-3">Bekijk alle projecten</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA SECTION - Minimal */}
        <section className="py-32 md:py-48 bg-black text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight" style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '-0.02em'
            }}>
              Klaar om te beginnen?
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light mb-16 max-w-2xl mx-auto">
              Vraag een vrijblijvende offerte aan en ontdek wat wij voor u kunnen betekenen.
            </p>
            <button
              onClick={() => setLocation("/quote")}
              className="inline-flex items-center px-12 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-500"
              data-testid="button-cta-quote"
            >
              <span className="text-xs tracking-widest uppercase mr-3">Offerte aanvragen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
