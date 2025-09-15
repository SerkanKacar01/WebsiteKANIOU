import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Palette, Wrench, CheckCircle } from "lucide-react";
import { overgordijnenImage } from "@/assets";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Over ons | Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Ontdek het verhaal achter Kaniou Zilvernaald – specialist in gordijnen, zonweringen en maatwerkoplossingen met meer dan 30 jaar ervaring."
        />
      </Helmet>

      {/* Sophisticated Asymmetrical Hero Section */}
      <div className="section-asymmetrical-top bg-gradient-to-br from-[#fafaf9] via-[#f9f7f3] to-[#fdfcf8] relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#D5B36A]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-[#E0C188]/3 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container-luxury-wide relative z-10">
          <div className="grid-asymmetrical-hero items-center min-h-[85vh]">
            {/* Left Column - Premium Typography */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="luxury-section-badge">
                  <div className="luxury-badge-glow"></div>
                  <div className="luxury-badge-text flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span className="text-caption">Premium Verhaal</span>
                  </div>
                </div>
                
                <h1 className="text-display-1 text-[#2C3E50] font-black leading-none animate-text-reveal-scale">
                  <span className="text-gradient-elegant text-glow-hero block mb-4">Wie wij</span>
                  <span className="text-gradient-luxury text-shadow-luxury-strong">zijn</span>
                </h1>
                
                <div className="w-32 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A] rounded-full my-luxury-lg"></div>
              </div>
              
              <div className="space-y-6 max-w-xl">
                <p className="text-subtitle text-[#2C3E50] leading-relaxed animate-text-reveal-up text-reveal-delay-1">
                  Bij <span className="text-gradient-luxury font-semibold text-glow-premium">Kaniou Zilvernaald</span> draait alles om perfectie in <span className="text-gradient-subtle font-semibold">maatwerk raamdecoratie</span>.
                </p>
                
                <p className="text-body text-[#2C3E50]/80 leading-relaxed animate-text-reveal-up text-reveal-delay-2">
                  Een verhaal van <span className="text-gradient-premium font-medium">vakmanschap</span>, <span className="text-gradient-elegant font-medium">elegantie</span> en ongeëvenaarde <span className="text-gradient-luxury font-medium">kwaliteit</span>.
                </p>
              </div>
            </div>
            
            {/* Right Column - Premium Visual Element */}
            <div className="relative animate-fade-in-up text-reveal-delay-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/10 to-[#E0C188]/5 rounded-3xl transform rotate-3 scale-105"></div>
                <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-luxury-xl border border-[#D5B36A]/20 shadow-professional">
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full mb-6 shadow-professional">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                        </svg>
                      </div>
                      <h3 className="text-title-lg text-gradient-luxury font-bold text-shadow-luxury-soft mb-4">30+ Jaar Expertise</h3>
                      <p className="text-body text-[#2C3E50]/70 leading-relaxed">Van traditioneel vakmanschap tot moderne innovatie</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-title-xl font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">1000+</div>
                        <div className="text-caption text-[#2C3E50]/60">Tevreden Klanten</div>
                      </div>
                      <div className="text-center">
                        <div className="text-title-xl font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">100%</div>
                        <div className="text-caption text-[#2C3E50]/60">Maatwerk</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Story Section with Asymmetrical Layout */}
      <div className="section-luxury bg-white relative">
        <div className="container-luxury">
          <div className="grid-asymmetrical-showcase items-center">
            {/* Enhanced Image Column */}
            <div className="order-2 lg:order-1 relative animate-fade-in-up text-reveal-delay-1">
              <div className="relative">
                {/* Premium Image Frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#D5B36A]/10 via-transparent to-[#E0C188]/5 rounded-3xl transform -rotate-2"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-professional group">
                  <img
                    src={overgordijnenImage}
                    alt="Kaniou Zilvernaald premium atelier"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full flex items-center justify-center shadow-professional animate-float-luxury">
                  <span className="text-white font-bold text-lg">30+</span>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-professional border border-[#D5B36A]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full animate-pulse"></div>
                    <span className="text-caption text-[#2C3E50] font-medium">Premium Kwaliteit</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Content Column */}
            <div className="order-1 lg:order-2 space-y-8 animate-fade-in-up text-reveal-delay-2">
              <div className="space-y-6">
                <div className="luxury-section-badge">
                  <div className="luxury-badge-glow"></div>
                  <div className="luxury-badge-text flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span className="text-caption">Ons Verhaal</span>
                  </div>
                </div>
                
                <h2 className="text-display-2 text-[#2C3E50] font-bold leading-tight animate-text-reveal-scale">
                  <span className="text-gradient-subtle text-glow-premium block mb-2">Meer dan 30 jaar</span>
                  <span className="text-gradient-luxury text-shadow-luxury-strong">ervaring in elegantie</span>
                  <span className="block text-gradient-elegant mt-2">en vakmanschap</span>
                </h2>
              </div>
              
              <div className="space-y-8 max-w-2xl">
                <div className="card-luxury p-luxury-lg">
                  <p className="text-body-lg text-[#2C3E50] leading-relaxed mb-6">
                    <span className="text-gradient-premium font-semibold text-glow-subtle">Kaniou Zilvernaald</span> is opgericht vanuit een passie voor stoffen, lichtinval en interieurarchitectuur.
                    Wat begon als een kleine atelier is uitgegroeid tot een vertrouwd adres voor <span className="text-gradient-subtle font-medium">verfijnde raamdecoratie</span> 
                    in heel België en Nederland.
                  </p>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mb-6"></div>
                  
                  <p className="text-body text-[#2C3E50] leading-relaxed">
                    Wij combineren <span className="text-gradient-elegant font-medium">traditioneel vakmanschap</span> met moderne technieken om unieke oplossingen op maat te bieden – 
                    van klassieke overgordijnen tot <span className="text-gradient-luxury font-medium">innovatieve zonweringssystemen</span>.
                  </p>
                </div>
                
                {/* Premium Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">1000+</div>
                    <div className="text-caption text-[#2C3E50]/60">Projecten</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">100%</div>
                    <div className="text-caption text-[#2C3E50]/60">Tevredenheid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">24/7</div>
                    <div className="text-caption text-[#2C3E50]/60">Service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Mission & Vision Section with Feature Grid */}
      <div className="section-luxury bg-gradient-to-br from-[#fafaf9] via-[#f9f7f3] to-[#fdfcf8] relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-gradient-radial from-[#D5B36A]/8 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/5 w-48 h-48 bg-gradient-radial from-[#E0C188]/6 to-transparent rounded-full blur-xl"></div>
        </div>
        
        <div className="container-luxury relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-luxury-2xl">
            <div className="luxury-section-badge mb-8">
              <div className="luxury-badge-glow"></div>
              <div className="luxury-badge-text flex items-center gap-2">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <span className="text-caption">Onze Waarden</span>
              </div>
            </div>
            
            <h2 className="text-display-2 text-[#2C3E50] font-bold mb-8 text-center animate-text-reveal-scale">
              <span className="text-gradient-luxury text-glow-premium">Waar we voor</span>
              <span className="block text-gradient-elegant text-shadow-luxury-strong mt-2">staan</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A] rounded-full mx-auto mb-12"></div>
          </div>
          
          {/* Enhanced Feature Grid */}
          <div className="grid-feature-showcase mb-luxury-2xl">
            {/* Main Feature Card */}
            <div className="card-ultra-luxury text-center animate-fade-in-up">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full mb-6 shadow-professional">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-title-xl text-gradient-luxury font-bold text-shadow-luxury-soft mb-4">
                  Precisie
                </h3>
                <p className="text-body-lg text-[#2C3E50] leading-relaxed max-w-md mx-auto">
                  Elk detail telt bij ons. Van de eerste meting tot de finale installatie, wij streven naar perfectie in elke fase van het proces.
                </p>
              </div>
            </div>
            
            {/* Secondary Feature Cards */}
            <div className="card-luxury text-center animate-fade-in-up text-reveal-delay-1">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#E0C188] to-[#D5B36A] rounded-full mb-4 shadow-professional">
                  <Palette className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-title-lg text-gradient-elegant font-bold text-shadow-luxury-soft mb-3">
                  Stijlvol Advies
                </h3>
                <p className="text-body text-[#2C3E50] leading-relaxed">
                  Wij helpen u kiezen wat <span className="text-gradient-luxury font-medium">écht bij uw ruimte past</span>.
                </p>
              </div>
            </div>
            
            <div className="card-luxury text-center animate-fade-in-up text-reveal-delay-2">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full mb-4 shadow-professional">
                  <Wrench className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-title-lg text-gradient-premium font-bold text-shadow-luxury-soft mb-3">
                  Maatwerk
                </h3>
                <p className="text-body text-[#2C3E50] leading-relaxed">
                  Geen standaardoplossingen, enkel <span className="text-gradient-premium font-medium">uniek resultaat</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Premium Vision Section */}
          <div className="container-luxury-narrow">
            <div className="card-showcase p-luxury-2xl text-center animate-fade-in-up text-reveal-delay-3">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-title-xl text-gradient-elegant font-bold text-shadow-luxury-medium">
                    Visie
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mx-auto"></div>
                </div>
                
                <p className="text-body-lg text-[#2C3E50] leading-relaxed max-w-2xl mx-auto">
                  Onze missie is om <span className="text-gradient-luxury font-semibold text-glow-subtle">luxe en functionaliteit</span> samen te brengen.
                  We willen dat elke klant trots kan zijn op zijn interieur, dankzij <span className="text-gradient-premium font-medium">perfecte lichtregeling, sfeer en afwerking</span>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">Kwaliteit</div>
                    <div className="text-caption text-[#2C3E50]/60">Eerste Prioriteit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">Service</div>
                    <div className="text-caption text-[#2C3E50]/60">Van A tot Z</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">Resultaat</div>
                    <div className="text-caption text-[#2C3E50]/60">Altijd Perfect</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Why Choose Section with Asymmetrical Grid */}
      <div className="section-luxury bg-white relative">
        <div className="container-luxury">
          <div className="grid-asymmetrical-content items-start">
            {/* Left Column - Premium Header */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="luxury-section-badge">
                  <div className="luxury-badge-glow"></div>
                  <div className="luxury-badge-text flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span className="text-caption">Premium Voordelen</span>
                  </div>
                </div>
                
                <h2 className="text-display-2 text-[#2C3E50] font-bold leading-tight animate-text-reveal-scale">
                  <span className="text-gradient-luxury text-glow-premium block mb-2">Waarom kiezen</span>
                  <span className="text-gradient-elegant text-shadow-luxury-strong">voor Kaniou?</span>
                </h2>
                
                <div className="w-32 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A] rounded-full"></div>
              </div>
              
              <div className="card-luxury p-luxury-lg">
                <p className="text-body-lg text-[#2C3E50] leading-relaxed mb-6">
                  Bij <span className="text-gradient-premium font-semibold">Kaniou Zilvernaald</span> staat uw tevredenheid centraal. Ontdek waarom duizenden klanten ons vertrouwen voor hun raamdecoratie.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-1">30+</div>
                    <div className="text-caption text-[#2C3E50]/60">Jaar Ervaring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-1">5⭐</div>
                    <div className="text-caption text-[#2C3E50]/60">Klantenwaardering</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Premium Benefits Grid */}
            <div className="space-y-6 animate-fade-in-up text-reveal-delay-1">
              <div className="grid-luxury-2 gap-6">
                <div className="card-showcase p-luxury-lg group hover:shadow-professional transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-title-lg text-gradient-luxury font-bold text-shadow-luxury-soft mb-2">
                        Persoonlijke Aanpak
                      </h3>
                      <p className="text-body text-[#2C3E50] leading-relaxed">
                        Gratis advies op maat met persoonlijke begeleiding van A tot Z
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="card-showcase p-luxury-lg group hover:shadow-professional transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E0C188] to-[#D5B36A] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-title-lg text-gradient-elegant font-bold text-shadow-luxury-soft mb-2">
                        Snelle Service
                      </h3>
                      <p className="text-body text-[#2C3E50] leading-relaxed">
                        Eigen ateliers & ervaren monteurs voor optimale kwaliteit
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="card-showcase p-luxury-lg group hover:shadow-professional transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-title-lg text-gradient-premium font-bold text-shadow-luxury-soft mb-2">
                        Premium Materialen
                      </h3>
                      <p className="text-body text-[#2C3E50] leading-relaxed">
                        Enkel kwaliteitsmaterialen en duurzame stoffen van topmerken
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="card-showcase p-luxury-lg group hover:shadow-professional transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E0C188] to-[#D5B36A] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-title-lg text-gradient-luxury font-bold text-shadow-luxury-soft mb-2">
                        Perfecte Afwerking
                      </h3>
                      <p className="text-body text-[#2C3E50] leading-relaxed">
                        Elegante afwerking op maat met jarenlange garantie
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Call to Action Section */}
      <div className="section-asymmetrical-bottom bg-gradient-to-br from-[#1a1a2e] via-[#2C3E50] to-[#0f3460] relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#D5B36A]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-[#E0C188]/8 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#C8A85B]/5 via-transparent to-[#C8A85B]/5"></div>
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-8 animate-fade-in-up">
              {/* Premium Badge */}
              <div className="luxury-section-badge">
                <div className="luxury-badge-glow"></div>
                <div className="luxury-badge-text flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <span className="text-caption">Start Uw Project</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
              </div>
              
              {/* Premium Headlines */}
              <div className="space-y-6">
                <h2 className="text-display-1 text-white font-black leading-none animate-text-reveal-scale">
                  <span className="text-gradient-hero text-glow-hero block mb-4">Maak kennis met</span>
                  <span className="bg-gradient-to-r from-white to-[#F9F2E7] bg-clip-text text-transparent">Kaniou Zilvernaald</span>
                </h2>
                
                <div className="w-32 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A] rounded-full mx-auto"></div>
              </div>
              
              <p className="text-subtitle text-white/90 leading-relaxed max-w-3xl mx-auto animate-text-reveal-up text-reveal-delay-1">
                Wij staan klaar om uw visie tot leven te brengen. Vraag vandaag nog vrijblijvend advies aan en ontdek de mogelijkheden van <span className="text-gradient-hero font-semibold">premium maatwerk raamdecoratie</span>.
              </p>
              
              {/* Premium CTA Button */}
              <div className="pt-8 animate-fade-in-up text-reveal-delay-2">
                <Link href="/quote">
                  <button className="btn-luxury-primary group relative">
                    <span className="relative z-10 flex items-center gap-3">
                      <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                      </svg>
                      Vrijblijvend Offerte aanvragen
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
              
              {/* Premium Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 animate-fade-in-up text-reveal-delay-3">
                <div className="text-center">
                  <div className="text-title-xl font-bold text-gradient-hero text-glow-premium mb-2">30+</div>
                  <div className="text-caption text-white/70">Jaar Ervaring</div>
                </div>
                <div className="text-center">
                  <div className="text-title-xl font-bold text-gradient-hero text-glow-premium mb-2">1000+</div>
                  <div className="text-caption text-white/70">Tevreden Klanten</div>
                </div>
                <div className="text-center">
                  <div className="text-title-xl font-bold text-gradient-hero text-glow-premium mb-2">100%</div>
                  <div className="text-caption text-white/70">Kwaliteitsgarantie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;