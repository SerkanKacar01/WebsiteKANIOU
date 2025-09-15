import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import React from "react";

// Ultra-luxury scroll animations hook
const useScrollAnimations = () => {
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

// Optimized parallax scroll effect hook with performance improvements
const useParallaxEffect = () => {
  const elementsRef = React.useRef([]);
  const rafRef = React.useRef();
  const isMobileRef = React.useRef(false);
  const prefersReducedMotionRef = React.useRef(false);

  React.useEffect(() => {
    // Check for mobile and reduced motion preferences
    const checkMobile = () => window.innerWidth < 768;
    const checkReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    isMobileRef.current = checkMobile();
    prefersReducedMotionRef.current = checkReducedMotion();

    // Cache parallax elements once
    elementsRef.current = Array.from(document.querySelectorAll('.parallax-bg')).map(element => ({
      element,
      speed: parseFloat(element.getAttribute('data-speed')) || 0.5
    }));

    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = () => {
      // Skip parallax on mobile or reduced motion
      if (isMobileRef.current || prefersReducedMotionRef.current) return;
      
      if (rafRef.current) return; // Already scheduled
      
      rafRef.current = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        elementsRef.current.forEach(({ element, speed }) => {
          const yPos = -(scrolled * speed);
          element.style.transform = `translateZ(-20px) scale(1.2) translateY(${yPos}px)`;
        });
        
        rafRef.current = null;
      });
    };

    // Optimized resize handler
    const handleResize = () => {
      isMobileRef.current = checkMobile();
      
      // Reset transforms on mobile
      if (isMobileRef.current) {
        elementsRef.current.forEach(({ element }) => {
          element.style.transform = '';
        });
      }
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
};
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

  return (
    <nav className={`nav-professional ${isScrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <div className="nav-logo">
            <button onClick={() => setLocation("/")} className="hover-elegant">
              <img
                src={kaniouLogo}
                alt="KANIOU - Professional Window Treatments"
                className="h-12 w-auto transition-professional hover:scale-105"
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
  
  // Initialize ultra-luxury effects
  useScrollAnimations();
  useParallaxEffect();

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
        {/* Hero Section - Ultra Luxury with Parallax */}
        <div className="hero-luxury parallax-container">
          {/* Parallax Background with Ultra Luxury Effects */}
          <div className="parallax-bg hero-bg-luxury" data-speed="0.3" style={{backgroundImage: `url(${interiorImage})`}}></div>
          
          {/* Ultra Luxury Overlay System */}
          <div className="hero-overlay-luxury"></div>
          <div className="absolute inset-0">
            {/* Advanced gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/35"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
            {/* Premium mobile overlay */}
            <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
            {/* Luxury texture overlay */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-gold-500/5 to-transparent"></div>
          </div>

          {/* Ultra Luxury Content Container */}
          <div className="hero-content-luxury parallax-content max-w-5xl mx-auto px-4 md:px-8 py-20 md:pt-20 pt-28 fade-in-up">
            {/* Ultra Premium Title with Advanced Effects */}
            <h1 className="font-professional-display text-hero text-white mb-12 leading-[0.85] tracking-tight luxury-float">
              <span className="block text-4xl md:text-8xl xl:text-9xl text-visible-fallback text-shadow-luxury mb-4">
                Professionele raamdecoratie
              </span>
              <span className="block text-shimmer text-glow-premium mt-6 md:mt-8 text-4xl md:text-8xl xl:text-9xl text-visible-fallback luxury-float-delayed">
                Expertise
              </span>
            </h1>

            {/* Ultra Premium Subtitle */}
            <div className="fade-in-up luxury-float-slow" style={{animationDelay: '0.3s'}}>
              <p className="text-lg md:text-subtitle text-white/95 mb-16 md:mb-20 max-w-6xl mx-auto leading-relaxed font-light font-professional-display">
                <span className="block text-2xl md:text-4xl xl:text-5xl font-medium tracking-wide text-shadow-luxury mb-6">
                  Waar kwaliteit en vakmanschap samenkomen.
                </span>
                <span className="block text-white/80 text-lg md:text-2xl xl:text-3xl font-light tracking-wide text-shadow-professional leading-relaxed">
                  Transformeer uw ruimte met hoogwaardige, op maat gemaakte raamdecoratie.
                  Ontdek de perfecte oplossing voor elke ruimte – professioneel advies
                  en installatie inbegrepen.
                </span>
              </p>
            </div>

            {/* Ultra Luxury CTA */}
            <div className="flex justify-center mb-16 md:mb-24 fade-in-up" style={{animationDelay: '0.6s'}}>
              <button
                onClick={handleRequestQuote}
                className="professional-cta-button group scale-in"
                data-testid="button-quote-hero"
              >
                <div className="professional-cta-bg"></div>
                <div className="professional-cta-glow"></div>
                <div className="professional-cta-content">
                  <span className="professional-cta-text">
                    VANDAAG NOG OFFERTE
                  </span>
                  <div className="professional-cta-icon">
                    →
                  </div>
                </div>
              </button>
            </div>

            {/* Ultra Luxury Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl max-w-6xl mx-auto fade-in-up" style={{animationDelay: '0.9s'}}>
              <div className="text-center luxury-float scale-in" style={{animationDelay: '1s'}} data-testid="stat-experience">
                <div className="text-6xl md:text-7xl xl:text-8xl font-professional-display text-shimmer mb-6 text-visible-fallback text-glow-premium">
                  30+
                </div>
                <div className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase text-shadow-professional">
                  Jarenlange Vakmanschap
                </div>
              </div>
              <div className="text-center luxury-float-delayed scale-in" style={{animationDelay: '1.2s'}} data-testid="stat-clients">
                <div className="text-6xl md:text-7xl xl:text-8xl font-professional-display text-shimmer mb-6 text-visible-fallback text-glow-premium">
                  3500+
                </div>
                <div className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase text-shadow-professional">
                  Eisvolle Klanten
                </div>
              </div>
              <div className="text-center luxury-float-slow scale-in" style={{animationDelay: '1.4s'}} data-testid="stat-quality">
                <div className="text-6xl md:text-7xl xl:text-8xl font-professional-display text-shimmer mb-6 text-visible-fallback text-glow-premium">
                  100%
                </div>
                <div className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase text-shadow-professional">
                  Maatwerk tot in Perfectie
                </div>
              </div>
            </div>

            {/* Ultra Sophisticated Scroll Indicator */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 hidden md:block fade-in-up" style={{animationDelay: '1.6s'}}>
              <div className="w-px h-24 bg-gradient-to-b from-white/50 via-gold-300/30 to-transparent relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-white/60 rounded-full animate-pulse">
                  <div className="w-1.5 h-1.5 bg-gradient-to-br from-white to-gold-200 rounded-full m-0.5 animate-bounce shadow-lg"></div>
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest font-light">
                  Scroll
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories Section - Ultra Luxury Design */}
        <section className="section-spacing-luxury relative overflow-hidden luxury-texture-bg luxury-pattern">
          {/* Ultra Luxury Background with Advanced Effects */}
          <div className="absolute inset-0 luxury-texture-bg">
            <div className="absolute inset-0 opacity-70">
              <div className="luxury-particles"></div>
            </div>
          </div>

          <div className="container-golden relative z-10 parallax-content">
            {/* Ultra-Premium Section Header */}
            <div className="text-center mb-24 fade-in-up">
              <div className="luxury-section-badge mb-8 scale-in">
                <div className="luxury-badge-glow"></div>
                <span className="luxury-badge-text">PREMIUM COLLECTIE</span>
              </div>
              <h2 className="luxury-mega-title mb-12 fade-in-up" style={{animationDelay: '0.2s'}}>
                <span className="luxury-title-line">Ontdek onze</span>
                <span className="luxury-title-emphasis text-shimmer">collectie</span>
              </h2>
              <p className="luxury-subtitle max-w-5xl mx-auto fade-in-up" style={{animationDelay: '0.4s'}}>
                Verken onze exclusieve collectie van artisanaal vervaardigde
                raamdecoratie. Elk meesterwerk wordt met uitzonderlijke precisie
                en devotie gecreëerd voor uw verfijnde interieur.
              </p>
            </div>

            {/* Revolutionary Product Showcase Grid */}
            <div className="luxury-product-grid mb-20 fade-in-up" style={{animationDelay: '0.6s'}}>
              {/* Houten jaloezieën - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.1s'}}
                onClick={() => setLocation("/producten/houten-jaloezieen")}
                data-testid="card-product-houten-jaloezieen"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <span className="text-white text-2xl">☰</span>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Houten jaloezieën</h3>
                  <p className="professional-card-subtitle">Natuurlijke elegantie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Textiel lamellen - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.2s'}}
                onClick={() => setLocation("/producten/textiel-lamellen")}
                data-testid="card-product-textiel-lamellen"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float-delayed">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/verticaal-lamellen-icon.png"
                        alt="Textiel lamellen"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Textiel lamellen</h3>
                  <p className="professional-card-subtitle">Zachte elegantie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Kunststof jaloezieën - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.3s'}}
                onClick={() => setLocation("/producten/kunststof-jaloezieen")}
                data-testid="card-product-kunststof-jaloezieen"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float-slow">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/jaloezieen-icon.png"
                        alt="Kunststof jaloezieën"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Kunststof jaloezieën</h3>
                  <p className="professional-card-subtitle">Praktische perfectie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Kunststof lamellen - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.4s'}}
                onClick={() => setLocation("/producten/kunststof-lamellen")}
                data-testid="card-product-kunststof-lamellen"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/verticaal-lamellen-icon.png"
                        alt="Kunststof lamellen"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Kunststof lamellen</h3>
                  <p className="professional-card-subtitle">Praktische perfectie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Plissés - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.5s'}}
                onClick={() => setLocation("/producten/plisse")}
                data-testid="card-product-plisse"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float-delayed">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/plisse-icon.png"
                        alt="Plissés"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Plissés</h3>
                  <p className="professional-card-subtitle">Gevouwen elegantie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Duo plissés - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.6s'}}
                onClick={() => setLocation("/producten/duo-plisse")}
                data-testid="card-product-duo-plisse"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float-slow">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/plisse-icon.png"
                        alt="Duo plissé"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Duo plissés</h3>
                  <p className="professional-card-subtitle">Dubbele perfectie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Rolgordijnen - Ultra Luxury Card */}
              <div
                className="professional-product-card group fade-in-up"
                style={{animationDelay: '0.7s'}}
                onClick={() => setLocation("/producten/rolgordijnen")}
                data-testid="card-product-rolgordijnen"
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container luxury-float">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <span className="text-white text-2xl">☰</span>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Rolgordijnen</h3>
                  <p className="professional-card-subtitle">Strakke simpliciteit</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Duo rolgordijnen - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/producten/duo-rolgordijnen")}
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/duo-rolgordijnen-icon.png"
                        alt="Duo rolgordijnen"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Duo rolgordijnen</h3>
                  <p className="professional-card-subtitle">
                    Innovatieve functionaliteit
                  </p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Gordijnen - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/producten/overgordijnen")}
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <span className="text-white text-2xl">☄</span>
                    </div>
                  </div>
                  <h3 className="professional-card-title">Overgordijnen</h3>
                  <p className="professional-card-subtitle">Klassieke grandeur</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Rails & roedes - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/producten/gordijnrails")}
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
                  <h3 className="professional-card-title">Gordijnrails</h3>
                  <p className="professional-card-subtitle">Perfecte mechaniek</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Vouwgordijnen - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/producten/vitrages")}
              >
                <div className="professional-card-background"></div>
                <div className="professional-card-glow"></div>
                <div className="professional-card-content">
                  <div className="professional-icon-container">
                    <div className="professional-icon-glow"></div>
                    <div className="professional-icon">
                      <img
                        src="/images/vouwgordijnen-icon.png"
                        alt="Vitrages"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="professional-card-title">Vitrages</h3>
                  <p className="professional-card-subtitle">Lichte elegantie</p>
                  <div className="professional-card-arrow">→</div>
                </div>
              </div>

              {/* Houten shutters - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/producten/houten-shutters")}
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
              </div>

              {/* Vouwgordijnen - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/vouwgordijnen")}
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
              </div>

              {/* Gordijnroedes - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/gordijnroedes")}
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
              </div>

              {/* Squid - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/squid")}
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
              </div>

              {/* Horren - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/horren")}
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
              </div>

              {/* Screen - Buiten Zonwering - Premium Card */}
              <div
                className="professional-product-card group"
                onClick={() => setLocation("/screen")}
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
              </div>
            </div>
          </div>
        </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury fade-in-up"></div>

        {/* Why Choose KANIOU - Ultra-Luxury USP Section */}
        <section className="ultra-luxury-features-section parallax-container">
          <div className="absolute inset-0 luxury-gradient-bg"></div>
          <div className="absolute inset-0 luxury-texture-overlay"></div>
          <div className="container-golden relative z-10 parallax-content">
            {/* Ultra-Premium Section Header */}
            <div className="text-center mb-36 fade-in-up">
              <div className="luxury-section-badge-premium mb-20 scale-in">
                <div className="luxury-badge-glow-premium"></div>
                <span className="luxury-badge-text-premium">
                  HAUTE COUTURE EXCELLENCE
                </span>
              </div>
              <h2 className="ultra-luxury-title mb-16 fade-in-up" style={{animationDelay: '0.2s'}}>
                <span className="ultra-luxury-title-line">De Kunst van</span>
                <span className="ultra-luxury-title-emphasis text-shimmer">Perfectie</span>
              </h2>
              <p className="ultra-luxury-subtitle max-w-6xl mx-auto fade-in-up" style={{animationDelay: '0.4s'}}>
                Ervaar het toppunt van Belgisch vakmanschap – waar drie decennia
                toewijding aan perfectie samensmelten met hedendaagse luxe in
                elk met zorg vervaardigd detail.
              </p>
            </div>

            {/* Ultra-Luxury Features Grid */}
            <div className="ultra-luxury-features-grid fade-in-up" style={{animationDelay: '0.6s'}}>
              {/* Perfect Fit - Ultra Luxury */}
              <div className="ultra-luxury-feature-card group fade-in-up" style={{animationDelay: '0.1s'}} data-testid="feature-custom-fit">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8 luxury-float">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow"></div>
                    <span className="ultra-professional-icon text-2xl">⛄</span>
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
              <div className="ultra-luxury-feature-card group fade-in-up" style={{animationDelay: '0.2s'}} data-testid="feature-delivery">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8 luxury-float-delayed">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow"></div>
                    <span className="ultra-professional-icon text-2xl">🚚</span>
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
              <div className="ultra-luxury-feature-card group fade-in-up" style={{animationDelay: '0.3s'}} data-testid="feature-consultation">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8 luxury-float-slow">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow"></div>
                    <span className="ultra-professional-icon text-2xl">👥</span>
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
              <div className="ultra-luxury-feature-card group fade-in-up" style={{animationDelay: '0.4s'}} data-testid="feature-materials">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8 luxury-float">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow"></div>
                    <span className="ultra-professional-icon text-2xl">🏆</span>
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
              <div className="ultra-luxury-feature-card group fade-in-up" style={{animationDelay: '0.5s'}} data-testid="feature-heritage">
                <div className="ultra-luxury-card-bg"></div>
                <div className="ultra-professional-card-glow"></div>
                <div className="ultra-professional-card-content">
                  <div className="ultra-professional-icon-container mb-8 luxury-float-delayed">
                    <div className="ultra-professional-icon-bg"></div>
                    <div className="ultra-professional-icon-glow"></div>
                    <span className="ultra-professional-icon text-2xl">⏰</span>
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
        <div className="section-divider-luxury fade-in-up"></div>

        {/* Client Testimonials - Ultra-Luxury Social Proof */}
        <section className="section-spacing-luxury luxury-texture-bg luxury-pattern parallax-container">
          <div className="container-golden parallax-content">
            {/* Ultra Luxury Section Header */}
            <div className="text-center mb-28 fade-in-up">
              <div className="divider-luxury w-48 mx-auto mb-16 scale-in"></div>
              <h2 className="font-display text-6xl md:text-7xl xl:text-8xl font-professional-display text-shimmer mb-12 fade-in-up" style={{animationDelay: '0.2s'}}>
                Stemmen van Klasse
              </h2>
              <p className="text-lg md:text-2xl xl:text-3xl text-gray-600 max-w-5xl mx-auto font-light leading-relaxed luxury-subtitle fade-in-up" style={{animationDelay: '0.4s'}}>
                Veeleisende klanten delen hun ervaringen van transformatie,
                waarbij het vakmanschap van KANIOU hun meest gekoesterde ruimtes
                heeft verheven tot ware oases van verfijnde schoonheid.
              </p>

              {/* Ultra Luxury Google Reviews Link */}
              <div className="text-center mt-12 fade-in-up" style={{animationDelay: '0.6s'}}>
                <a
                  href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.9886857,5.6914029,17z/data=!4m16!1m9!3m8!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!2sKANIOU+bvba+ZILVERNAALD!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn!3m5!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!16s%2Fg%2F11snz4psjn?authuser=4&entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg md:text-xl font-semibold text-shimmer hover:text-gold-600 transition-all duration-500 hover:underline hover:scale-105 luxury-float"
                  data-testid="link-google-reviews"
                >
                  <span className="mr-3 text-2xl">⭐</span>
                  Bekijk onze Google reviews
                </a>
                <p className="text-gray-500 mt-3 text-lg">
                  (Link opent in een nieuw tabblad)
                </p>
              </div>
            </div>

            {/* Ultra-Luxury Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl fade-in-up" style={{animationDelay: '0.8s'}}>
              {/* Testimonial 1 - Ultra Luxury */}
              <div className="ultra-glass fade-in-up luxury-float" style={{animationDelay: '0.1s', padding: '2rem', borderRadius: '1.5rem'}} data-testid="testimonial-ramadani">
                <span className="absolute top-8 right-8 w-12 h-12 text-shimmer opacity-60 text-3xl flex items-center justify-center font-serif">"</span>

                {/* Ultra Luxury Star Rating */}
                <div className="flex mb-8 gap-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 text-shimmer text-xl flex items-center justify-center luxury-float-delayed"
                      style={{animationDelay: `${0.1 + i * 0.1}s`}}
                    >★</span>
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-10 leading-relaxed font-light text-lg md:text-xl italic">
                  "We stellen enorm op prijs dat je tijd hebt genomen om jouw
                  ervaring te delen. Het doet ons plezier te horen dat je
                  tevreden bent - jouw vertrouwen en postieve woorden motiveren
                  ons elke dag opnieuw om de beste mogelijke service te blijven
                  bieden. Hartelijk dank"
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-6 border-t border-gold-300/30">
                  <p className="font-semibold text-gray-900 text-xl font-professional-display">
                    Ramadani
                  </p>
                  <p className="text-gray-600 font-light text-lg">België</p>
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
