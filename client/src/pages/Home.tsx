import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Truck, Users, Award, Clock, ArrowRight, Eye, Quote, Star, Menu, X } from "lucide-react";
import React from "react";
// Product and gallery images
const interiorImage = "/images/Overgordijnen.jpeg";
const duoPlisseImage = "/images/Duoplisse.jpeg";
const duoRolgordijnenImage = "/images/Duorolgordijnen.jpeg";
const overgordijnenImage = "/images/Overgordijnen.jpeg";
const plisseImage = "/images/Plisse.jpeg";
const rolgordijnenImage = "/images/Rolgordijnen.jpeg";
const opzethorrenImage = "/images/Opzethorren.jpeg";
// Gallery images for real installations
const gallery1 = "/images/IMG_9192.jpeg";
const gallery2 = "/images/IMG_9204.jpeg";
const gallery3 = "/images/IMG_9217.jpeg";
const gallery4 = "/images/IMG_9219.jpeg";
const gallery5 = "/images/IMG_9220.jpeg";
const gallery6 = "/images/IMG_9221.jpeg";

// Premium Navigation Component
const PremiumNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/producten' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`nav-luxury ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="nav-logo">
            <button 
              onClick={() => setLocation('/')}
              className="text-3xl font-display font-bold text-gradient hover:scale-105 transition-transform duration-300"
            >
              KANIOU
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
              onClick={() => setLocation('/quote')}
              className="btn-luxury"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#D5B36A] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setLocation(link.path);
                    setIsMenuOpen(false);
                  }}
                  className="nav-link text-left"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setLocation('/quote');
                  setIsMenuOpen(false);
                }}
                className="btn-luxury mt-4"
              >
                Get Quote
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
    setLocation("/producten");
  };

  const handleRequestQuote = () => {
    setLocation("/quote");
  };

  return (
    <>
      <Helmet>
        <title>KANIOU - Premium Window Treatments & Custom Curtains | 30+ Years Experience</title>
        <meta name="description" content="KANIOU offers premium custom curtains, blinds, and window treatments in Belgium. 30+ years of expertise in tailor-made solutions for your home and business." />
        <meta property="og:title" content="KANIOU - Premium Window Treatments & Custom Curtains" />
        <meta property="og:description" content="Transform your space with our premium custom window treatments. Professional installation and 30+ years of expertise in Belgium." />
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
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-16">
          {/* Ultra-Luxury Title */}
          <h1 className="font-luxury-display text-hero text-white mb-8 leading-[0.9] tracking-tight text-shadow-luxury">
            Exquisite Window
            <span className="block gradient-text-luxury mt-4 text-glow">Artistry</span>
          </h1>
          
          {/* Luxury Subtitle */}
          <p className="text-subtitle text-white/85 mb-16 max-w-5xl mx-auto leading-relaxed font-light">
            Where Belgian craftsmanship meets timeless elegance.
            <span className="block mt-3 text-white/70">Transform your sanctuary with bespoke window treatments.</span>
          </p>

          {/* Ultra-Premium CTA */}
          <div className="flex justify-center mb-20">
            <button
              onClick={handleRequestQuote}
              className="btn-luxury-primary text-lg px-20 py-6 min-w-[360px] group"
            >
              Begin Your Journey
              <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Elegant Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl max-w-5xl mx-auto">
            <div className="text-center animate-float-luxury stagger-1">
              <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">30+</div>
              <div className="text-white/70 text-body font-light tracking-wider uppercase">Years of Mastery</div>
            </div>
            <div className="text-center animate-float-luxury stagger-2">
              <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">5000+</div>
              <div className="text-white/70 text-body font-light tracking-wider uppercase">Discerning Clients</div>
            </div>
            <div className="text-center animate-float-luxury stagger-3">
              <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">100%</div>
              <div className="text-white/70 text-body font-light tracking-wider uppercase">Bespoke Creation</div>
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

        {/* Why Choose KANIOU - Ultra-Luxury USP Section */}
        <section className="section-spacing-luxury bg-texture-luxury">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-40 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                The Art of Excellence
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Experience the pinnacle of Belgian craftsmanship, where three decades of devotion to perfection 
                meets contemporary luxury in every meticulously crafted detail.
              </p>
            </div>

            {/* Luxury USP Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-luxury-xl">
              {/* Perfect Fit - Ultra Luxury */}
              <div className="text-center group hover-elegant animate-fade-in-up stagger-1">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 gradient-luxury-gold rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-luxury-hover transition-luxury animate-glow">
                    <Shield className="w-9 h-9 text-white" />
                  </div>
                </div>
                <h3 className="text-title font-display text-gray-900 mb-4">
                  Precision Crafted
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Every piece measured and crafted with Swiss precision for your unique space
                </p>
              </div>

              {/* Express Service - Ultra Luxury */}
              <div className="text-center group hover-elegant animate-fade-in-up stagger-2">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 gradient-luxury-gold rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-luxury-hover transition-luxury animate-glow">
                    <Truck className="w-9 h-9 text-white" />
                  </div>
                </div>
                <h3 className="text-title font-display text-gray-900 mb-4">
                  Express Excellence
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Swift delivery orchestrated with uncompromising attention to detail
                </p>
              </div>

              {/* Master Consultation - Ultra Luxury */}
              <div className="text-center group hover-elegant animate-fade-in-up stagger-3">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 gradient-luxury-gold rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-luxury-hover transition-luxury animate-glow">
                    <Users className="w-9 h-9 text-white" />
                  </div>
                </div>
                <h3 className="text-title font-display text-gray-900 mb-4">
                  Master Consultation
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Personalized guidance from artisans with three decades of refined expertise
                </p>
              </div>

              {/* Luxury Materials - Ultra Luxury */}
              <div className="text-center group hover-elegant animate-fade-in-up stagger-4">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 gradient-luxury-gold rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-luxury-hover transition-luxury animate-glow">
                    <Award className="w-9 h-9 text-white" />
                  </div>
                </div>
                <h3 className="text-title font-display text-gray-900 mb-4">
                  Luxury Materials
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Curated finest fabrics and materials for enduring beauty and sophistication
                </p>
              </div>

              {/* Heritage Excellence - Ultra Luxury */}
              <div className="text-center group hover-elegant animate-fade-in-up stagger-5">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 gradient-luxury-gold rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-luxury-hover transition-luxury animate-glow">
                    <Clock className="w-9 h-9 text-white" />
                  </div>
                </div>
                <h3 className="text-title font-display text-gray-900 mb-4">
                  Heritage Excellence
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Three decades of unwavering dedication to the art of window couture
                </p>
              </div>
          </div>
        </div>
      </section>

        {/* Product Showcase - World-Class Design */}
        <section className="section-spacing-luxury gradient-luxury-subtle">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-40 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                Curated Collections
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Discover our meticulously curated range of premium window treatments, 
                each piece designed to transform your space into a sanctuary of refined elegance.
              </p>
            </div>

            {/* World-Class Product Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-luxury-xl mb-20">
              {/* Duo Plissé - Ultra Luxury Card */}
              <div className="group cursor-pointer hover-luxury animate-fade-in-up stagger-1" onClick={() => setLocation("/producten/duo-plisse")}>
                <div className="card-showcase">
                  <div className="relative overflow-hidden">
                    <img 
                      src={duoPlisseImage}
                      alt="Duo Plissé Innovation"
                      className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-luxury">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center text-gray-800 font-semibold">
                          Discover Innovation <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Duo Plissé Innovation
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Revolutionary dual-layer engineering for supreme light orchestration
                    </p>
                  </div>
                </div>
              </div>

              {/* Duo Rolgordijnen - Ultra Luxury Card */}
              <div className="group cursor-pointer hover-luxury animate-fade-in-up stagger-2" onClick={() => setLocation("/producten/duo-rolgordijnen")}>
                <div className="card-showcase">
                  <div className="relative overflow-hidden">
                    <img 
                      src={duoRolgordijnenImage}
                      alt="Luxury Duo Roller Blinds"
                      className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-luxury">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center text-gray-800 font-semibold">
                          Explore Excellence <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Duo Roller Mastery
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Versatile light orchestration crafted with contemporary elegance
                    </p>
                  </div>
                </div>
              </div>

              {/* Overgordijnen - Ultra Luxury Card */}
              <div className="group cursor-pointer hover-luxury animate-fade-in-up stagger-3" onClick={() => setLocation("/producten/overgordijnen")}>
                <div className="card-showcase">
                  <div className="relative overflow-hidden">
                    <img 
                      src={overgordijnenImage}
                      alt="Premium Curtain Couture"
                      className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-luxury">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center text-gray-800 font-semibold">
                          Enter Collection <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Couture Curtains
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Timeless elegance woven into bespoke masterpieces of sophistication
                    </p>
                  </div>
                </div>
              </div>

              {/* Plissé - Ultra Luxury Card */}
              <div className="group cursor-pointer hover-luxury animate-fade-in-up stagger-4" onClick={() => setLocation("/producten/plisse")}>
                <div className="card-showcase">
                  <div className="relative overflow-hidden">
                    <img 
                      src={plisseImage}
                      alt="Luxury Plissé Artistry"
                      className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-luxury">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center text-gray-800 font-semibold">
                          Discover Artistry <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Plissé Perfection
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Sophisticated pleated precision engineered for architectural beauty
                    </p>
                  </div>
                </div>
              </div>

              {/* Rolgordijnen - Ultra Luxury Card */}
              <div className="group cursor-pointer hover-luxury animate-fade-in-up stagger-5" onClick={() => setLocation("/producten/rolgordijnen")}>
                <div className="card-showcase">
                  <div className="relative overflow-hidden">
                    <img 
                      src={rolgordijnenImage}
                      alt="Premium Roller Excellence"
                      className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-luxury">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center text-gray-800 font-semibold">
                          View Collection <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Roller Excellence
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Minimalist precision meeting contemporary architectural demands
                    </p>
                  </div>
                </div>
              </div>

              {/* Opzethorren - Ultra Luxury Card */}
              <div className="group cursor-pointer hover-luxury animate-fade-in-up stagger-6" onClick={() => setLocation("/producten/opzethorren")}>
                <div className="card-showcase">
                  <div className="relative overflow-hidden">
                    <img 
                      src={opzethorrenImage}
                      alt="Invisible Protection Systems"
                      className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-luxury">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center text-gray-800 font-semibold">
                          Experience Protection <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Invisible Protection
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Seamless air circulation systems with uncompromising aesthetic integrity
                    </p>
                  </div>
                </div>
              </div>
          </div>

            {/* Luxury CTA Button */}
            <div className="text-center">
              <button
                onClick={() => setLocation("/producten")}
                className="btn-luxury-secondary group"
              >
                Explore All Collections
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
        </div>
      </section>

        {/* Inspiration Gallery - Ultra-Luxury Showcase */}
        <section className="section-spacing-luxury bg-white bg-texture-luxury">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-48 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                Masterpieces in Residence
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Witness the transformative power of our artistry in the most discerning homes, 
                where every window becomes a statement of refined taste and architectural harmony.
              </p>
            </div>

            {/* Ultra-Luxury Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-luxury-lg mb-20">
              {/* Gallery Showcase 1 - Ultra Luxury */}
              <div className="group relative overflow-hidden card-ultra-luxury p-0 animate-fade-in-up stagger-1 hover-luxury">
                <img 
                  src={gallery1}
                  alt="KANIOU luxury installation masterpiece"
                  className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                
                {/* Sophisticated overlay with premium button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-luxury">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Gallery Showcase 2 - Ultra Luxury */}
              <div className="group relative overflow-hidden card-ultra-luxury p-0 animate-fade-in-up stagger-2 hover-luxury">
                <img 
                  src={gallery2}
                  alt="KANIOU exquisite installation artistry"
                  className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-luxury">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Gallery Showcase 3 - Ultra Luxury */}
              <div className="group relative overflow-hidden card-ultra-luxury p-0 animate-fade-in-up stagger-3 hover-luxury">
                <img 
                  src={gallery3}
                  alt="KANIOU premium residential showcase"
                  className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-luxury">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Gallery Showcase 4 - Ultra Luxury */}
              <div className="group relative overflow-hidden card-ultra-luxury p-0 animate-fade-in-up stagger-4 hover-luxury">
                <img 
                  src={gallery4}
                  alt="KANIOU couture transformation"
                  className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-luxury">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Gallery Showcase 5 - Ultra Luxury */}
              <div className="group relative overflow-hidden card-ultra-luxury p-0 animate-fade-in-up stagger-5 hover-luxury">
                <img 
                  src={gallery5}
                  alt="KANIOU architectural excellence"
                  className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-luxury">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Gallery Showcase 6 - Ultra Luxury */}
              <div className="group relative overflow-hidden card-ultra-luxury p-0 animate-fade-in-up stagger-6 hover-luxury">
                <img 
                  src={gallery6}
                  alt="KANIOU bespoke sophistication"
                  className="w-full h-80 object-cover transition-luxury group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-luxury-overlay opacity-0 group-hover:opacity-100 transition-luxury"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-luxury">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>
          </div>

            {/* Luxury Gallery CTA */}
            <div className="text-center">
              <button
                onClick={() => setLocation("/gallery")}
                className="btn-luxury-secondary group"
              >
                Experience Full Portfolio
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
        </div>
      </section>

        {/* Client Testimonials - Ultra-Luxury Social Proof */}
        <section className="section-spacing-luxury gradient-luxury-subtle">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-44 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                Voices of Distinction
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Distinguished clients share their experiences of transformation, where KANIOU's artistry 
                has elevated their most treasured spaces into sanctuaries of refined beauty.
              </p>
            </div>

            {/* Ultra-Luxury Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl">
              {/* Testimonial 1 - Ultra Luxury */}
              <div className="card-ultra-luxury animate-fade-in-up stagger-1 hover-elegant">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40" />
                
                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "An extraordinary experience from consultation to completion. The precision of craftsmanship and attention to detail exceeded our highest expectations. KANIOU has transformed our home into a masterpiece."
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">Maria Van Der Berg</p>
                  <p className="text-body text-gray-600 font-light">Brussels • Interior Designer</p>
                </div>
              </div>

              {/* Testimonial 2 - Ultra Luxury */}
              <div className="card-ultra-luxury animate-fade-in-up stagger-2 hover-elegant">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40" />
                
                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "The artistry and sophistication of KANIOU's work speaks volumes. Our plissé collection has become the crown jewel of our residence. Three decades of mastery is evident in every detail."
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">Johan Pieters</p>
                  <p className="text-body text-gray-600 font-light">Antwerp • Architect</p>
                </div>
              </div>

              {/* Testimonial 3 - Ultra Luxury */}
              <div className="card-ultra-luxury animate-fade-in-up stagger-3 hover-elegant">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-300 opacity-40" />
                
                {/* Luxury Star Rating */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "Impeccable service and breathtaking results. The bespoke curtains have redefined luxury in our home. KANIOU's commitment to excellence is unmatched in Belgian craftsmanship."
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">Sophie Martens</p>
                  <p className="text-body text-gray-600 font-light">Ghent • Art Collector</p>
                </div>
              </div>
          </div>

            {/* Ultra-Luxury CTA */}
            <div className="text-center mt-20">
              <p className="text-body text-gray-600 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
                Ready to embark on a journey of transformation? 
                <span className="block mt-2">Let our artisans create your bespoke window masterpiece.</span>
              </p>
              <button
                onClick={() => setLocation("/quote")}
                className="btn-luxury-primary group"
              >
                Commence Your Journey
                <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
        </div>
      </section>

      </div>
    </>
  );
};

export default Home;
