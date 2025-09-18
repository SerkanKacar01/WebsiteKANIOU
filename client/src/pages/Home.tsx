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

// Ultra-Futuristic Floating Navigation Component
const ProfessionalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuNeedsContrast, setMobileMenuNeedsContrast] = React.useState(false);
  const [scrollVelocity, setScrollVelocity] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = React.useState('');
  const [isIdle, setIsIdle] = React.useState(false);
  const [proximityStates, setProximityStates] = React.useState<Record<string, number>>({});
  const [isMobile, setIsMobile] = React.useState(false);
  const [, setLocation] = useLocation();
  const navRef = React.useRef<HTMLElement>(null);
  const lastScrollY = React.useRef(0);
  const lastScrollTime = React.useRef(Date.now());
  const idleTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const scrollVelocityRef = React.useRef(0);

  // Mobile detection with matchMedia
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);
  
  // Advanced scroll velocity detection for predictive animations
  React.useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY.current;
      const deltaTime = now - lastScrollTime.current;
      
      // Calculate scroll velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;
      setScrollVelocity(velocity);
      scrollVelocityRef.current = velocity;
      
      // Enhanced scroll state detection
      setIsScrolled(scrollY > 50);
      
      // Section-aware highlighting - map to actual page sections
      const sectionMapping = {
        'hero': 'hero',
        'products': 'products',
        'gallery': 'gallery', 
        'contact': 'contact',
        'about': 'about'
      };
      
      const sections = Object.keys(sectionMapping);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
      
      // Mobile menu contrast detection
      if (isMenuOpen && isMobile) {
        const isOnLightBackground = scrollY > window.innerHeight * 0.8;
        setMobileMenuNeedsContrast(isOnLightBackground);
      }
      
      lastScrollY.current = scrollY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isMobile]);
  
  // Consolidated mouse position tracking and proximity detection with requestAnimationFrame throttling
  React.useEffect(() => {
    let navItemCenters: Array<{ name: string; x: number; y: number }> = [];
    
    const precomputeItemCenters = () => {
      const items = document.querySelectorAll('.magnetic-nav-items');
      navItemCenters = Array.from(items).map((item) => {
        const rect = item.getBoundingClientRect();
        const name = item.getAttribute('data-testid')?.replace('nav-link-', '') || '';
        return {
          name,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        if (navRef.current) {
          const rect = navRef.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
          
          // Set CSS custom properties for liquid morph with proper typing
          const style = navRef.current.style as React.CSSProperties & Record<string, string>;
          style['--mouse-x'] = `${x}%`;
          style['--mouse-y'] = `${y}%`;
          style['--scroll-velocity'] = scrollVelocityRef.current.toString();
          
          // Update proximity states for all nav items in one pass
          const newProximityStates: Record<string, number> = {};
          navItemCenters.forEach(({ name, x: centerX, y: centerY }) => {
            const distance = Math.sqrt(
              Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
            );
            newProximityStates[name] = distance;
          });
          setProximityStates(newProximityStates);
        }
      });
    };
    
    // Precompute item centers on mount and window resize
    precomputeItemCenters();
    const handleResize = () => precomputeItemCenters();
    
    if (navRef.current) {
      navRef.current.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      return () => {
        if (navRef.current) {
          navRef.current.removeEventListener('mousemove', handleMouseMove);
        }
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, []);
  
  // Idle state detection for breathing navigation with proper cleanup
  React.useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      idleTimer.current = setTimeout(() => setIsIdle(true), 3000);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'] as const;
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, []);
  
  // Keyboard support and accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);
  
  // Focus trap for mobile menu
  React.useEffect(() => {
    if (isMenuOpen && isMobile) {
      const focusableElements = document.querySelectorAll(
        'button[data-testid^="orbital-menu-"], button[data-testid^="mobile-menu-"]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isMenuOpen, isMobile]);

  // Proximity detection for magnetic navigation items (now handled in consolidated mouse handler)
  const handleNavItemProximity = React.useCallback((itemName: string, distance: number) => {
    setProximityStates(prev => ({ ...prev, [itemName]: distance }));
  }, []);

  // Reset contrast when menu closes
  React.useEffect(() => {
    if (!isMenuOpen) {
      setMobileMenuNeedsContrast(false);
    }
  }, [isMenuOpen]);

  const navigationLinks = [
    { 
      name: "Gallerij", 
      path: "/gallerij",
      tooltip: "Bekijk onze prachtige realisaties",
      important: true
    },
    { 
      name: "Over ons", 
      path: "/over-ons",
      tooltip: "Ontdek ons verhaal en expertise",
      important: false
    },
    { 
      name: "Contact", 
      path: "/contact",
      tooltip: "Neem contact op voor advies",
      important: true
    },
  ];

  // Optimized Magnetic proximity detection for navigation items
  const MagneticNavItem = ({ link, index }: { link: any, index: number }) => {
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const [proximity, setProximity] = React.useState('far');
    
    // Use the global proximity state instead of individual listeners
    React.useEffect(() => {
      const linkName = link.name.toLowerCase().replace(' ', '-');
      const distance = proximityStates[linkName] || Infinity;
      
      if (distance < 50) {
        setProximity('close');
      } else if (distance < 100) {
        setProximity('near');
      } else {
        setProximity('far');
      }
    }, [proximityStates, link.name]);

    const getClassNames = () => {
      let classes = 'magnetic-nav-items proximity-detection-system contextual-tooltips predictive-hover-zones';
      
      if (proximity !== 'far') {
        classes += ` proximity-${proximity}`;
      }
      
      if (link.important) {
        classes += ' adaptive-sizing important';
      }
      
      if (proximity === 'close') {
        classes += ' adaptive-sizing proximity-active';
      }
      
      // Map navigation paths to section IDs for highlighting
      const pathToSection: Record<string, string> = {
        '/gallerij': 'gallery',
        '/over-ons': 'about',
        '/contact': 'contact'
      };
      
      if (activeSection === pathToSection[link.path]) {
        classes += ' contextual-glow-system active';
      }
      
      if (scrollVelocity > 2) {
        classes += ' anticipating';
      }
      
      return classes;
    };

    return (
      <button
        ref={itemRef}
        key={link.name}
        onClick={() => {
          // Intelligent preloading hint
          if (link.path !== window.location.pathname) {
            const link_element = document.createElement('link');
            link_element.rel = 'prefetch';
            link_element.href = link.path;
            document.head.appendChild(link_element);
          }
          setLocation(link.path);
        }}
        className={getClassNames()}
        data-tooltip={link.tooltip}
        data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
        aria-label={`Navigate to ${link.name}: ${link.tooltip}`}
      >
        {link.name}
      </button>
    );
  };

  // Get navigation container classes
  const getNavContainerClasses = () => {
    let classes = 'floating-navigation-system context-aware-positioning morphing-nav-container liquid-background-morph';
    
    if (isScrolled) {
      classes += ' floating-nav-morphed intelligent-transparency';
    }
    
    if (activeSection) {
      classes += ' contextual-glow-system active';
    }
    
    if (isIdle) {
      classes += ' breathing-navigation';
    }
    
    if (isMobile) {
      classes += ' adaptive-mobile-positioning';
    }
    
    return classes;
  };

  return (
    <>
      {/* Desktop Ultra-Futuristic Floating Navigation */}
      <nav
        ref={navRef}
        className={getNavContainerClasses()}
        role="navigation"
        aria-label="Main navigation"
        style={{
          '--scroll-velocity': scrollVelocity,
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        } as React.CSSProperties & Record<string, string>}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Holographic Logo */}
            <div className="holographic-logo">
              <button 
                onClick={() => setLocation("/")} 
                className="hover-elegant"
                data-testid="nav-logo"
                aria-label="Go to homepage"
              >
                <img
                  src={kaniouLogo}
                  alt="KANIOU - Professional Window Treatments"
                  className="h-12 w-auto transition-professional hover:scale-105"
                />
              </button>
            </div>

            {/* Desktop Magnetic Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link, index) => (
                <MagneticNavItem key={link.name} link={link} index={index} />
              ))}
            </div>

            {/* Magnetic CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setLocation("/quote")}
                className="magnetic-cta-button"
                data-testid="nav-cta-button"
                aria-label="Request free quote"
              >
                VRIJBLIJVEND OFFERTE
              </button>
            </div>

            {/* Desktop Mobile Menu Button (hidden on mobile) */}
            <button
              className="md:hidden floating-action-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Orbital Menu System with improved accessibility */}
      {isMobile && (
        <div className={`orbital-menu-system ${isMenuOpen ? 'active' : ''}`}>
          <div className="orbital-menu-items">
            {navigationLinks.map((link, index) => (
              <button
                key={link.name}
                className="orbital-menu-item"
                onClick={() => {
                  setLocation(link.path);
                  setIsMenuOpen(false);
                }}
                data-testid={`orbital-menu-${link.name.toLowerCase().replace(' ', '-')}`}
                aria-label={`${link.name} - ${link.tooltip}`}
                title={link.name}
                style={{ '--item-index': index } as React.CSSProperties & Record<string, string>}
              >
                <span className="sr-only">{link.name}</span>
                <span aria-hidden="true">{link.name.charAt(0)}</span>
              </button>
            ))}
            <button
              className="orbital-menu-item"
              onClick={() => {
                setLocation("/quote");
                setIsMenuOpen(false);
              }}
              data-testid="orbital-menu-quote"
              aria-label="Vrijblijvend offerte - Request quote"
              title="Vrijblijvend offerte"
              style={{ '--item-index': navigationLinks.length } as React.CSSProperties & Record<string, string>}
            >
              <span className="sr-only">Offerte</span>
              <span aria-hidden="true">€</span>
            </button>
          </div>
        </div>
      )}

      {/* Fallback Mobile Menu for non-touch devices */}
      {!isMobile && isMenuOpen && (
        <div
          className={`liquid-menu-animations opening md:hidden mt-4 pb-4 transition-all duration-300 rounded-lg ${
            mobileMenuNeedsContrast
              ? "bg-black/90 backdrop-blur-sm mx-2 px-4 py-3 shadow-xl"
              : ""
          }`}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col space-y-4 gesture-responsive-nav">
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
                data-testid={`mobile-menu-${link.name.toLowerCase().replace(' ', '-')}`}
                role="menuitem"
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
              data-testid="mobile-menu-cta"
              role="menuitem"
            >
              VRIJBLIJVEND OFFERTE
            </button>
          </div>
        </div>
      )}
    </>
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
        {/* Hero Section - Ultra Luxury Enhanced */}
        <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden ultra-premium-interactive perspective-container cinematic-entrance-sequence">
          {/* Cinematic Particle Galaxy System */}
          <div className="cinematic-particle-galaxy magnetic-hover">
            <div className="absolute inset-0 opacity-70">
              <div className="luxury-particles ultra-premium-transitions"></div>
            </div>
          </div>
          
          {/* Multi-Layer Parallax System */}
          <div className="parallax-layer-system absolute inset-0">
            {/* Depth Layer 1 - Background Image */}
            <div className="depth-layer-1">
              <img
                src={interiorImage}
                alt="Modern interior with elegant window treatments"
                className="w-full h-full object-cover ultra-premium-transitions magnetic-hover"
              />
            </div>
            
            {/* Depth Layer 2 - Ultra-Premium Glassmorphism */}
            <div className="depth-layer-2">
              <div className="absolute inset-0 ultra-premium-glass ultra-premium-transitions"></div>
            </div>
            
            {/* Depth Layer 3 - Gradient Overlays */}
            <div className="depth-layer-3">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 ultra-premium-transitions"></div>
              {/* Advanced Mobile Overlay */}
              <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/40 via-black/20 to-black/50 ultra-premium-transitions"></div>
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6 py-16 md:pt-16 pt-24 cinematic-entrance-sequence delay-1">
            {/* Cinematic Hero Title with Breathing Effects */}
            <h1 className="cinematic-hero-title font-professional-display text-hero text-white mb-8 leading-[0.9] tracking-tight text-shadow-professional drop-shadow-2xl ultra-sophisticated-glow magnetic-hover">
              <span className="block text-4xl md:text-hero text-visible-fallback ultra-luxury-text-effect breathing-text-glow">
                Professionele raamdecoratie
              </span>
              <span className="block gradient-text-professional mt-2 md:mt-4 text-glow text-3xl md:text-hero text-visible-fallback ultra-luxury-text-effect breathing-text-glow">
                Expertise
              </span>
            </h1>

            {/* Professional Subtitle */}
            <p className="text-lg md:text-subtitle text-white/90 mb-12 md:mb-16 max-w-5xl mx-auto leading-relaxed font-light drop-shadow-xl font-professional-display">
              <span className="block text-xl md:text-3xl font-medium tracking-wide">
                Waar kwaliteit en vakmanschap samenkomen.
              </span>
              <span className="block mt-4 text-white/75 text-base md:text-xl font-light tracking-wide">
                Transformeer uw ruimte met hoogwaardige, op maat gemaakte raamdecoratie.
                Ontdek de perfecte oplossing voor elke ruimte – professioneel advies
                en installatie inbegrepen.
              </span>
            </p>

            {/* Floating CTA Container with Cinematic Effects */}
            <div className="floating-cta-container flex justify-center mb-12 md:mb-20 cinematic-entrance-sequence delay-2">
              <button
                onClick={handleRequestQuote}
                className="professional-cta-button group ultra-micro-interaction ultra-sophisticated-glow magnetic-hover ultra-premium-transitions"
              >
                <div className="professional-cta-bg"></div>
                <div className="professional-cta-glow"></div>
                <div className="professional-cta-content">
                  <span className="professional-cta-text ultra-luxury-text-effect breathing-text-glow">
                    VANDAAG NOG OFFERTE
                  </span>
                  <div className="professional-cta-icon transform group-hover:rotate-45 transition-transform duration-500">
                    →
                  </div>
                </div>
              </button>
            </div>

            {/* Golden Ratio Trust Indicators with Breathing Animations */}
            <div className="golden-grid-container responsive-golden-layout cinematic-entrance-sequence delay-3">
              <div className="breathing-stats text-center animate-float-professional stagger-1 ultra-micro-interaction magnetic-hover">
                <div className="text-5xl md:text-6xl font-professional-display gradient-text-professional mb-4 text-visible-fallback ultra-luxury-text-effect breathing-text-glow">
                  30+
                </div>
                <div className="text-white/70 text-body font-light tracking-wider uppercase hover:text-white ultra-premium-transitions">
                  Jarenlange Vakmanschap
                </div>
              </div>
              <div className="breathing-stats text-center animate-float-professional stagger-2 ultra-micro-interaction magnetic-hover">
                <div className="text-5xl md:text-6xl font-professional-display gradient-text-professional mb-4 text-visible-fallback ultra-luxury-text-effect breathing-text-glow">
                  3500+
                </div>
                <div className="text-white/70 text-body font-light tracking-wider uppercase hover:text-white ultra-premium-transitions">
                  Eisvolle Klanten
                </div>
              </div>
              <div className="breathing-stats text-center animate-float-professional stagger-3 ultra-micro-interaction magnetic-hover">
                <div className="text-5xl md:text-6xl font-professional-display gradient-text-professional mb-4 text-visible-fallback ultra-luxury-text-effect breathing-text-glow">
                  100%
                </div>
                <div className="text-white/70 text-body font-light tracking-wider uppercase hover:text-white ultra-premium-transitions">
                  Maatwerk tot in Perfectie
                </div>
              </div>
            </div>

            {/* Cinematic Scroll Indicator */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 hidden md:block cinematic-entrance-sequence delay-4">
              <div className="w-px h-20 bg-gradient-to-b from-white/40 to-transparent relative magnetic-hover ultra-premium-transitions">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border border-white/50 rounded-full animate-pulse breathing-text-glow">
                  <div className="w-1 h-1 bg-white/60 rounded-full m-0.5 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories Section - Revolutionary Ultra Luxury Design */}
        <section id="products" className="section-spacing-luxury relative overflow-hidden ultra-premium-interactive">
          {/* Ultra-Advanced Particle System */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-[#FBF8F3] ultra-premium-glass">
            <div className="ultra-particle-system">
              <div className="absolute inset-0 opacity-60">
                <div className="luxury-particles"></div>
              </div>
            </div>
          </div>

          <div className="container-golden relative z-10">
            {/* Ultra-Premium Section Header with Revolutionary Effects */}
            <div className="text-center mb-20">
              <div className="luxury-section-badge ultra-sophisticated-glow ultra-micro-interaction">
                <div className="luxury-badge-glow"></div>
                <span className="luxury-badge-text ultra-luxury-text-effect">PREMIUM COLLECTIE</span>
              </div>
              <h2 className="luxury-mega-title mb-8 ultra-sophisticated-glow">
                <span className="luxury-title-line ultra-luxury-text-effect">Ontdek onze</span>
                <span className="luxury-title-emphasis ultra-luxury-text-effect animate-pulse">collectie</span>
              </h2>
              <p className="luxury-subtitle max-w-4xl mx-auto hover:scale-105 transition-transform duration-700">
                Verken onze exclusieve collectie van artisanaal vervaardigde
                raamdecoratie. Elk meesterwerk wordt met uitzonderlijke precisie
                en devotie gecreëerd voor uw verfijnde interieur.
              </p>
            </div>

            {/* ULTRA-MAGNETIC Futuristic Product Grid with Advanced Effects */}
            <div 
              className="magnetic-product-grid perspective-grid-container depth-perception-system mb-16"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                
                // Fix: Set CSS variables for custom cursor positioning (not pseudo-element querying)
                e.currentTarget.style.setProperty('--cursor-x', `${e.clientX}px`);
                e.currentTarget.style.setProperty('--cursor-y', `${e.clientY}px`);
              }}
              onPointerMove={(e) => {
                // Touch/pointer support for mobile devices
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                e.currentTarget.style.setProperty('--cursor-x', `${e.clientX}px`);
                e.currentTarget.style.setProperty('--cursor-y', `${e.clientY}px`);
              }}
              onTouchMove={(e) => {
                // Touch-specific support with passive event listeners
                if (e.touches.length > 0) {
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((touch.clientX - rect.left) / rect.width) * 100;
                  const y = ((touch.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                }
              }}
              style={{ touchAction: 'none' }} // Enable passive touch events
            >
              {/* Houten jaloezieën - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/houten-jaloezieen")}
                  data-testid="button-product-houten-jaloezieen"
                  type="button"
                  aria-label="Houten jaloezieën - Natuurlijke elegantie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <span className="text-white text-2xl">☰</span>
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Houten jaloezieën">Houten jaloezieën</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Natuurlijke elegantie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Textiel lamellen - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/textiel-lamellen")}
                  data-testid="button-product-textiel-lamellen"
                  type="button"
                  aria-label="Textiel lamellen - Zachte elegantie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/verticaal-lamellen-icon.png"
                          alt="Textiel lamellen"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Textiel lamellen">Textiel lamellen</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Zachte elegantie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Kunststof jaloezieën - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/kunststof-jaloezieen")}
                  data-testid="button-product-kunststof-jaloezieen"
                  type="button"
                  aria-label="Kunststof jaloezieën - Praktische perfectie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/jaloezieen-icon.png"
                          alt="Kunststof jaloezieën"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Kunststof jaloezieën">Kunststof jaloezieën</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Praktische perfectie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Kunststof lamellen - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/kunststof-lamellen")}
                  data-testid="button-product-kunststof-lamellen"
                  type="button"
                  aria-label="Kunststof lamellen - Praktische perfectie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/verticaal-lamellen-icon.png"
                          alt="Kunststof lamellen"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Kunststof lamellen">Kunststof lamellen</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Praktische perfectie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Plissés - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/plisse")}
                  data-testid="button-product-plisse"
                  type="button"
                  aria-label="Plissés - Gevouwen elegantie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/plisse-icon.png"
                          alt="Plissés"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Plissés">Plissés</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Gevouwen elegantie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Duo plissés - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/duo-plisse")}
                  data-testid="button-product-duo-plisse"
                  type="button"
                  aria-label="Duo plissés - Dubbele perfectie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/plisse-icon.png"
                          alt="Duo plissé"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Duo plissés">Duo plissés</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Dubbele perfectie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Rolgordijnen - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/rolgordijnen")}
                  data-testid="button-product-rolgordijnen"
                  type="button"
                  aria-label="Rolgordijnen - Strakke simpliciteit"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <span className="text-white text-2xl">☰</span>
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Rolgordijnen">Rolgordijnen</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Strakke simpliciteit</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Duo rolgordijnen - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/duo-rolgordijnen")}
                  data-testid="button-product-duo-rolgordijnen"
                  type="button"
                  aria-label="Duo rolgordijnen - Innovatieve functionaliteit"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/duo-rolgordijnen-icon.png"
                          alt="Duo rolgordijnen"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Duo rolgordijnen">Duo rolgordijnen</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">
                      Innovatieve functionaliteit
                    </p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Overgordijnen - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/overgordijnen")}
                  data-testid="button-product-overgordijnen"
                  type="button"
                  aria-label="Overgordijnen - Klassieke grandeur"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <span className="text-white text-2xl">☄</span>
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Overgordijnen">Overgordijnen</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Klassieke grandeur</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Gordijnrails - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/gordijnrails")}
                  data-testid="button-product-gordijnrails"
                  type="button"
                  aria-label="Gordijnrails - Perfecte mechaniek"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <span className="text-white text-2xl">−</span>
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Gordijnrails">Gordijnrails</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Perfecte mechaniek</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Vitrages - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/vitrages")}
                  data-testid="button-product-vitrages"
                  type="button"
                  aria-label="Vitrages - Lichte elegantie"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/vouwgordijnen-icon.png"
                          alt="Vitrages"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Vitrages">Vitrages</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Lichte elegantie</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

              {/* Houten shutters - ULTRA-MAGNETIC Card */}
              <div className="magnetic-card-container touch-responsive-animations universal-interaction-states momentum-based-animations">
                <div className="magnetic-hover-zone"></div>
                <button
                  className="liquid-morphing-card group floating-card-layer"
                  onClick={() => setLocation("/producten/houten-shutters")}
                  data-testid="button-product-houten-shutters"
                  type="button"
                  aria-label="Houten shutters - Tijdloze klasse"
                >
                  <div className="morphing-background dynamic-border-radius"></div>
                  <div className="liquid-glow-effects"></div>
                  <div className="adaptive-depth-glow"></div>
                  <div className="swipe-detection-zone"></div>
                  <div className="relative z-10">
                    <div className="professional-icon-container">
                      <div className="contextual-icon-animations">
                        <img
                          src="/images/houten-shutters-icon.png"
                          alt="Houten shutters"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="morphing-title adaptive-text-glow" data-text="Houten shutters">Houten shutters</h3>
                    <p className="professional-card-subtitle group-hover:text-gold-600 transition-colors duration-300">Tijdloze klasse</p>
                    <div className="magnetic-arrow">→</div>
                  </div>
                </button>
              </div>

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
        <section id="about" className="ultra-luxury-features-section ultra-premium-interactive">
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
        <section id="contact" className="section-spacing-luxury gradient-luxury-subtle">
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
