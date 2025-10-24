import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import React from "react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";
import interiorImageSrc from "@assets/Overgordijnen.jpeg";
import { ArrowRight, Sparkles, Zap, Shield, Award } from "lucide-react";

const interiorImage = interiorImageSrc;

// Ultra-Futuristic Navigation Component
const HyperloopNavigation = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'glass-morphism-light shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => setLocation("/")}
            className="magnetic-hover"
          >
            <img
              src={kaniouLogo}
              alt="KANIOU"
              className="h-12 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setLocation("/gallerij")}
              className={`font-hyperloop text-sm uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-[#C5A565]' : 'text-white hover:text-[#C5A565]'
              }`}
              data-testid="nav-link-gallerij"
            >
              Gallerij
            </button>
            <button
              onClick={() => setLocation("/over-ons")}
              className={`font-hyperloop text-sm uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-[#C5A565]' : 'text-white hover:text-[#C5A565]'
              }`}
              data-testid="nav-link-over-ons"
            >
              Over ons
            </button>
            <button
              onClick={() => setLocation("/contact")}
              className={`font-hyperloop text-sm uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-[#C5A565]' : 'text-white hover:text-[#C5A565]'
              }`}
              data-testid="nav-link-contact"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setLocation("/quote")}
              className="relative group px-8 py-3 bg-black text-white font-hyperloop text-sm uppercase tracking-wider overflow-hidden light-ray-effect magnetic-hover"
              data-testid="nav-cta-quote"
            >
              <span className="relative z-10">Vrijblijvend Offerte</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            data-testid="mobile-menu-toggle"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>KANIOU ZILVERNAALD – Ultra-Premium Raamdecoratie | 30+ Jaar Vakmanschap</title>
        <meta
          name="description"
          content="Ontdek de toekomst van raamdecoratie. KANIOU combineert Nederlandse precisie met futuristisch design. 30+ jaar expertise in maatwerk gordijnen, jaloezieën en zonwering."
        />
      </Helmet>

      <HyperloopNavigation />

      {/* CINEMATISCHE HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={interiorImage}
            alt="Premium Interior"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Animated Light Beams */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#C5A565]/0 via-[#C5A565]/40 to-[#C5A565]/0 animate-pulse"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-40 text-center">
          {/* Overline */}
          <div className="inline-block mb-6 px-6 py-2 glass-morphism-dark rounded-full">
            <p className="font-hyperloop text-xs md:text-sm uppercase tracking-[0.3em] text-white/90">
              Sinds 1990 • Premium Vakmanschap
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-hyperloop-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-8 leading-none">
            <span className="block">De Toekomst</span>
            <span className="block mt-4 bg-gradient-to-r from-white via-[#C5A565] to-white bg-clip-text text-transparent">
              Van Raamdecoratie
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-spatial text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Waar Nederlandse precisie en futuristisch design samenkomen. 
            Elk project is een meesterwerk van vakmanschap en innovatie.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => setLocation("/quote")}
              className="group relative px-10 py-5 bg-white text-black font-hyperloop text-sm uppercase tracking-wider overflow-hidden magnetic-hover light-ray-effect"
              data-testid="button-request-quote"
            >
              <span className="relative z-10 flex items-center gap-3">
                Vraag Offerte Aan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => setLocation("/gallerij")}
              className="group px-10 py-5 glass-morphism-dark text-white font-hyperloop text-sm uppercase tracking-wider magnetic-hover"
              data-testid="button-view-gallery"
            >
              <span className="flex items-center gap-3">
                Bekijk Gallerij
                <Sparkles className="w-5 h-5" />
              </span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="glass-morphism-dark p-6 rounded-lg cursor-glow" data-testid="stat-experience">
              <div className="font-hyperloop-bold text-4xl md:text-5xl text-white mb-2">30+</div>
              <div className="font-spatial text-sm text-white/70 uppercase tracking-wider">Jaar Expertise</div>
            </div>
            <div className="glass-morphism-dark p-6 rounded-lg cursor-glow" data-testid="stat-projects">
              <div className="font-hyperloop-bold text-4xl md:text-5xl text-white mb-2">3500+</div>
              <div className="font-spatial text-sm text-white/70 uppercase tracking-wider">Projecten</div>
            </div>
            <div className="glass-morphism-dark p-6 rounded-lg cursor-glow" data-testid="stat-custom">
              <div className="font-hyperloop-bold text-4xl md:text-5xl text-white mb-2">100%</div>
              <div className="font-spatial text-sm text-white/70 uppercase tracking-wider">Maatwerk</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 opacity-60">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE SECTION */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-black/5 rounded-full">
              <p className="font-hyperloop text-xs uppercase tracking-[0.3em] text-black/60">
                Premium Collectie
              </p>
            </div>
            <h2 className="font-hyperloop-bold text-5xl md:text-7xl text-black mb-6">
              Onze Expertise
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A565] to-transparent mx-auto"></div>
          </div>

          {/* 3D Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Houten Jaloezieën", desc: "Natuurlijke warmte", path: "/producten/houten-jaloezieen", icon: "☰" },
              { name: "Textiel Lamellen", desc: "Zachte elegantie", path: "/producten/textiel-lamellen", icon: "|" },
              { name: "Kunststof Jaloezieën", desc: "Moderne praktijk", path: "/producten/kunststof-jaloezieen", icon: "≡" },
              { name: "Kunststof Lamellen", desc: "Duurzame kwaliteit", path: "/producten/kunststof-lamellen", icon: "||" },
              { name: "Plissés", desc: "Verfijnde filtering", path: "/producten/plisse", icon: "⋮" },
              { name: "Duo Plissé", desc: "Dubbele functie", path: "/producten/duo-plisse", icon: "⫴" },
            ].map((product, index) => (
              <button
                key={product.name}
                onClick={() => setLocation(product.path)}
                className="group relative p-8 bg-white border border-black/5 hover:border-[#C5A565]/30 transition-all duration-500 cursor-glow magnetic-hover"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                data-testid={`button-product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Icon Container */}
                <div className="mb-6 w-16 h-16 flex items-center justify-center bg-black/5 group-hover:bg-[#C5A565]/10 transition-all duration-500">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{product.icon}</span>
                </div>

                {/* Content */}
                <h3 className="font-hyperloop-bold text-xl md:text-2xl text-black mb-3 text-left">
                  {product.name}
                </h3>
                <p className="font-spatial text-sm text-black/60 text-left mb-6">
                  {product.desc}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-[#C5A565] opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-hyperloop text-xs uppercase tracking-wider">Ontdek meer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A565]/0 via-[#C5A565]/0 to-[#C5A565]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 glass-morphism-dark rounded-full">
              <p className="font-hyperloop text-xs uppercase tracking-[0.3em] text-white/60">
                Waarom KANIOU
              </p>
            </div>
            <h2 className="font-hyperloop-bold text-5xl md:text-7xl text-white mb-6">
              Premium Garantie
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Snelle Levering", desc: "Precisie planning voor elke deadline" },
              { icon: Shield, title: "Garantie", desc: "Langdurige kwaliteitsgarantie op elk project" },
              { icon: Award, title: "Vakmanschap", desc: "30+ jaar meesterlijke expertise" },
              { icon: Sparkles, title: "Maatwerk", desc: "100% op maat gemaakt voor uw ruimte" },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="glass-morphism-dark p-8 cursor-glow kinetic-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <feature.icon className="w-12 h-12 text-[#C5A565] mb-6" />
                <h3 className="font-hyperloop-bold text-xl mb-3">{feature.title}</h3>
                <p className="font-spatial text-sm text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-black/5 rounded-full">
              <p className="font-hyperloop text-xs uppercase tracking-[0.3em] text-black/60">
                Klantervaring
              </p>
            </div>
            <h2 className="font-hyperloop-bold text-5xl md:text-7xl text-black">
              Wat Klanten Zeggen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ramadani", location: "België", text: "Enorme kwaliteit en precisie. Elk detail perfect afgewerkt." },
              { name: "Anedda", location: "België", text: "Professionele service van A tot Z. Zeer tevreden met het eindresultaat." },
              { name: "Albrecht", location: "België", text: "Meesterlijk vakmanschap. De gordijnen overtreffen alle verwachtingen." },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-8 border border-black/5 hover:border-[#C5A565]/30 transition-all duration-500 cursor-glow"
                data-testid={`testimonial-${testimonial.name.toLowerCase()}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#C5A565] text-xl">★</span>
                  ))}
                </div>
                <p className="font-spatial text-black/80 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-hyperloop-bold text-sm text-black">{testimonial.name}</p>
                  <p className="font-spatial text-xs text-black/50">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C5A565]/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-hyperloop-bold text-5xl md:text-7xl mb-8">
            Start Uw Project
          </h2>
          <p className="font-spatial text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Transformeer uw ruimte met precisie-engineered raamdecoratie. 
            Vrijblijvende offerte binnen 24 uur.
          </p>
          <button
            onClick={() => setLocation("/quote")}
            className="px-12 py-6 bg-white text-black font-hyperloop text-sm uppercase tracking-wider magnetic-hover light-ray-effect"
            data-testid="button-final-cta"
          >
            Vraag Nu Offerte Aan
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
