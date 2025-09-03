import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Truck, Users, Award, Clock, ArrowRight, Eye, Quote, Star, Menu, X } from "lucide-react";
import React from "react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";
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
    { name: 'Gallerij', path: '/gallerij' },
    { name: 'Over ons', path: '/over-ons' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`nav-luxury ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <div className="nav-logo">
            <button 
              onClick={() => setLocation('/')}
              className="hover-elegant"
            >
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
              onClick={() => setLocation('/quote')}
              className="btn-luxury"
            >
              VRIJBLIJVEND OFFERTE
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
    setLocation("/producten");
  };

  const handleRequestQuote = () => {
    setLocation("/quote");
  };

  return (
    <>
      <Helmet>
        <title>KANIOU ZILVERNAALD – Premium Raamdecoratie & Maatwerk Gordijnen | Meer dan 30 jaar ervaring</title>
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
            Exquise raamdecoratie
            <span className="block gradient-text-luxury mt-4 text-glow">Artistry</span>
          </h1>
          
          {/* Luxury Subtitle */}
          <p className="text-subtitle text-white/85 mb-16 max-w-5xl mx-auto leading-relaxed font-light">
            Waar vakmanschap en verfijning samenkomen.
            <span className="block mt-3 text-white/70">Breng stijl, comfort en maatwerk samen in uw interieur met exclusieve raamdecoratie.
            Ontdek de perfecte oplossing voor elke ruimte – vandaag nog.</span>
          </p>

          {/* Ultra-Premium CTA */}
          <div className="flex justify-center mb-20">
            <button
              onClick={handleRequestQuote}
              className="btn-luxury-primary text-lg px-20 py-6 min-w-[360px] group"
            >
              VANDAAG NOG OFFERTE
              <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Elegant Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-luxury-xl max-w-5xl mx-auto">
            <div className="text-center animate-float-luxury stagger-1">
              <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">30+</div>
              <div className="text-white/70 text-body font-light tracking-wider uppercase">Jarenlange Vakmanschap</div>
            </div>
            <div className="text-center animate-float-luxury stagger-2">
              <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">3500+</div>
              <div className="text-white/70 text-body font-light tracking-wider uppercase">Eisvolle Klanten</div>
            </div>
            <div className="text-center animate-float-luxury stagger-3">
              <div className="text-5xl md:text-6xl font-luxury-display gradient-text-luxury mb-4">100%</div>
              <div className="text-white/70 text-body font-light tracking-wider uppercase">Maatwerk tot in Perfectie</div>
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

        {/* Product Categories Section */}
        <section className="section-spacing-luxury bg-gradient-to-b from-white to-gray-50">
          <div className="container-golden">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="divider-luxury w-32 mx-auto mb-8"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-6">
                Ontdek onze collectie
              </h2>
              <p className="text-body text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                Kies uit onze uitgebreide collectie premium raamdecoratie. 
                Elk product wordt met de grootste zorg vervaardigd voor uw unieke interieur.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {/* Product Category Buttons */}
              <button
                onClick={() => setLocation("/producten/houten-jaloezieen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Houten jaloezieën
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/aluminium-jaloezieen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Aluminium jaloezieën
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/kunststof-jaloezieen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Kunststof jaloezieën
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/verticale-lamellen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Verticaal lamellen
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/plisses")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Plissés
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/duo-plisses")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Duo plissés
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/rolgordijnen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Rolgordijnen
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/duo-rolgordijnen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Duo rolgordijnen
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/gordijnen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Gordijnen
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/rails-en-roedes")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Rails & roedes
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/vouwgordijnen")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Vouwgordijnen
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLocation("/producten/houten-shutters")}
                className="group bg-white hover:bg-[#F8F6F0] border border-[#E6C988] hover:border-[#D5B36A] rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#D5B36A] transition-colors">
                    Houten shutters
                  </div>
                </div>
              </button>
            </div>

            {/* View All Products Button */}
            <div className="text-center">
              <button
                onClick={() => setLocation("/producten")}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#D5B36A] to-[#E6C988] hover:from-[#C5A565] hover:to-[#D5B36A] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Bekijk alle producten
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury"></div>

        {/* Why Choose KANIOU - Ultra-Luxury USP Section */}
        <section className="section-spacing-luxury bg-texture-luxury">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-40 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                De Kunst van Perfectie
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Ervaar het toppunt van Belgisch vakmanschap – waar drie decennia toewijding aan perfectie samensmelten met hedendaagse luxe in elk met zorg vervaardigd detail.
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
                  Vakkundig Op Maat
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Elk stuk wordt nauwkeurig opgemeten en vervaardigd met Zwitserse precisie voor uw unieke interieur.
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
                  Uitmuntende Levering
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Snelle levering, zorgvuldig gecoördineerd met compromisloze aandacht voor elk detail. Mits beschikbaarheid van de materialen.
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
                  Meesterlijk Advies
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Persoonlijke begeleiding door vakmensen met meer dan dertig jaar verfijnde expertise.
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
                   Luxueuze Materialen
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Geselecteerde stoffen en hoogwaardige materialen voor blijvende schoonheid en verfijning.

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
                  Traditie in Perfectie
                </h3>
                <p className="text-body text-gray-600 leading-relaxed font-light">
                  Dertig jaar onafgebroken toewijding aan de kunst van raamdecoratie op maat.

                </p>
              </div>
          </div>
        </div>
      </section>

        {/* Animated Section Divider */}
        <div className="section-divider-luxury"></div>

        {/* Product Showcase - World-Class Design */}
        <section className="section-spacing-luxury gradient-luxury-subtle">
          <div className="container-golden">
            {/* Luxury Section Header */}
            <div className="text-center mb-24">
              <div className="divider-luxury w-40 mx-auto mb-12"></div>
              <h2 className="font-display text-headline gradient-text-subtle mb-8">
                Geselecteerde Collecties
              </h2>
              <p className="text-body text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Ontdek onze zorgvuldig samengestelde collectie premium raamdecoratie – elk stuk ontworpen om uw interieur te transformeren tot een oase van verfijnde elegantie.
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
                          Ervaar de kunst van maatwerk <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Duo Plissé Innovatie
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Revolutionaire dubbel-laagse technologie voor optimale lichtregeling.
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
                          Ervaar de kunst van maatwerk <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                     Duo Rolgordijn Meesterschap
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Veelzijdige lichtregeling met een moderne en verfijnde uitstraling.
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
                          Ervaar de kunst van maatwerk <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Couture Gordijnen
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Tijdloze elegantie, verweven tot op maat gemaakte meesterwerken van verfijning.
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
                          Ervaar de kunst van maatwerk <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Plissé Perfectie
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Verfijnde geplooide precisie, ontworpen voor architectonische schoonheid.
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
                          Ervaar de kunst van maatwerk <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Rolgordijn Excellentie

                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Minimalistische precisie voor eigentijdse interieurwensen.
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
                          Ervaar de kunst van maatwerk <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-title font-display gradient-text-subtle mb-4">
                      Onzichtbare Bescherming
                    </h3>
                    <p className="text-body text-gray-600 font-light leading-relaxed">
                      Naadloze ventilatie-oplossingen met compromisloze esthetiek.
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
                Ontdek Alle Collecties
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
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
                Veeleisende klanten delen hun ervaringen van transformatie, waarbij het vakmanschap van KANIOU hun meest gekoesterde ruimtes heeft verheven tot ware oases van verfijnde schoonheid.
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
                <p className="text-sm text-gray-500 mt-1">(Link opent in een nieuw tabblad)</p>
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
                    <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "Duidelijke correcte afspraken, snelle levering, kwaliteitsvol werk."
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">SLEDSENS</p>
                  <p className="text-body text-gray-600 font-light">België</p>
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
                  "Ik heb zeer professionele hulp ontvangen van dit bedrijf bij het installeren van mijn jaloezieën en het ophangen van mijn gordijnen. De medewerker was vriendelijk, kwam alle afspraken keurig na en werkte nauwkeurig. De kwaliteit van de materialen is uitstekend. Kortom, een absolute aanrader voor iedereen – deze vijf sterren zijn méér dan verdiend!"
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
                    <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
                  ))}
                </div>

                {/* Premium Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed font-light text-body italic">
                  "Een echte aanrader. Goede service, kwaliteit en prachtig resultaat. Wij zijn tevreden."
                </p>

                {/* Distinguished Customer Info */}
                <div className="pt-4 border-t border-gold-200">
                  <p className="font-semibold text-gray-900 text-lg">Marolt</p>
                  <p className="text-body text-gray-600 font-light">Bekgië</p>
                </div>
              </div>
          </div>

        </div>
      </section>

      {/* Premium Footer */}
      <footer className="footer-luxury">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Bedrijf */}
            <div className="footer-column">
              <h3 className="footer-heading">Bedrijf</h3>
              <div className="footer-content">
                <p className="text-lg font-semibold text-gray-900 mb-2">KANIOU zilvernaald</p>
                <p className="text-gray-700 mb-6">Premium Gordijnen & Zonweringen</p>
                
                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a href="#" className="footer-social-icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Producten */}
            <div className="footer-column">
              <h3 className="footer-heading">Producten</h3>
              <div className="footer-content">
                <ul className="footer-links">
                  <li><a href="/producten/vliegenramen" className="footer-link">Vliegenramen</a></li>
                  <li><a href="/producten/rolgordijnen" className="footer-link">Rolgordijnen</a></li>
                  <li><a href="/producten/overgordijnen" className="footer-link">Overgordijnen</a></li>
                  <li><a href="/quote" className="footer-link footer-link-special">Offerte aanvragen</a></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Klantenservice */}
            <div className="footer-column">
              <h3 className="footer-heading">Klantenservice</h3>
              <div className="footer-content">
                <ul className="footer-links">
                  <li><a href="/meet-instructies" className="footer-link">Meet instructies</a></li>
                  <li><a href="/installatie-instructies" className="footer-link">Installatie instructies</a></li>
                  <li><a href="/onderhouds-instructies" className="footer-link">Onderhouds instructies</a></li>
                  <li><a href="/retour-beleid" className="footer-link">Retour beleid</a></li>
                  <li><a href="/garantie-voorwaarden" className="footer-link">Garantie voorwaarden</a></li>
                  <li><a href="/veelgestelde-vragen" className="footer-link">Veelgestelde vragen</a></li>
                  <li><a href="/bestelling-volgen" className="footer-link">Bestelstatus volgen</a></li>
                  <li><a href="/contact" className="footer-link">Contact opnemen</a></li>
                  <li><a href="/service-en-herstellingen" className="footer-link">Service & Herstellingen</a></li>
                </ul>
              </div>
            </div>

            {/* Column 4: Nieuwsbrief */}
            <div className="footer-column">
              <h3 className="footer-heading">Nieuwsbrief</h3>
              <div className="footer-content">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Blijf op de hoogte van nieuwe collecties, aanbiedingen en inspiratie voor uw interieur.
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
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Aanmelden
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="footer-legal">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
              </p>
              
              {/* Enhanced Legal Links */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm mb-4">
                <a href="/privacybeleid" className="footer-legal-link">Privacybeleid</a>
                <span className="text-gray-400">|</span>
                <a href="/algemene-voorwaarden" className="footer-legal-link">Algemene voorwaarden</a>
                <span className="text-gray-400">|</span>
                <a href="/cookiebeleid" className="footer-legal-link">Cookiebeleid</a>
                <span className="text-gray-400">|</span>
                <a href="/disclaimer" className="footer-legal-link">Disclaimer</a>
                <span className="text-gray-400">|</span>
                <a href="/gebruiksvoorwaarden" className="footer-legal-link">Gebruiksvoorwaarden</a>
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
        </div>
      </footer>

      </div>
    </>
  );
};

export default Home;
