import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HomeIcon,
  ChevronRight,
  ShoppingCart,
  Truck,
  Trophy,
  Phone,
  MessageCircle,
  Mail,
  Star,
  Award,
  Shield,
  Package,
  Ruler,
  Settings,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BestelOnlinePage = () => {
  // Why Order Online benefits
  const onlineAdvantages = [
    {
      icon: ShoppingCart,
      emoji: "🪡",
      title: "100% Maatwerk",
      description: "volledig op maat van jouw raam",
    },
    {
      icon: Truck,
      emoji: "🚛",
      title: "Thuisgeleverd",
      description: "veilig & professioneel verpakt",
    },
    {
      icon: Trophy,
      emoji: "🏆",
      title: "Showroomkwaliteit",
      description: "zonder in te boeten aan stijl",
    },
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      number: "1",
      title: "Kies je product",
      description: "rolgordijn, jaloezie, hor, …",
    },
    {
      number: "2",
      title: "Geef je afmetingen en voorkeuren door",
      description: "nauwkeurige maten voor perfect maatwerk",
    },
    {
      number: "3",
      title: "Kies opties",
      description: "zoals bediening, kleur en montage",
    },
    {
      number: "4",
      title: "Ontvang bevestiging",
      description: "wij starten met jouw maatwerk",
    },
  ];

  // Featured products for online ordering
  const featuredProducts = [
    {
      id: "rolgordijnen",
      name: "Rolgordijnen",
      href: "/rolgordijnen-configurator",
      icon: Package,
      available: false,
    },
    {
      id: "overgordijnen",
      name: "Overgordijnen",
      href: "/producten/overgordijnen",
      icon: Settings,
      available: true,
    },
    {
      id: "inzethorren",
      name: "Inzethorren",
      href: "/producten/inzethorren",
      icon: Shield,
      available: false,
    },
    {
      id: "gordijnrails",
      name: "Gordijnrails",
      href: "/gordijnrails-configurator",
      icon: Ruler,
      available: true,
    },
    {
      id: "jaloezieen",
      name: "Jaloezieën",
      href: "/producten/houten-jaloezieen",
      icon: Settings,
      available: false,
    },
  ];

  // Contact options
  const contactOptions = [
    {
      icon: Phone,
      emoji: "📞",
      title: "Bel ons",
      href: "tel:+3246785640",
    },
    {
      icon: MessageCircle,
      emoji: "💬",
      title: "WhatsApp",
      href: "https://wa.me/3246785640",
    },
    {
      icon: Mail,
      emoji: "📧",
      title: "Stuur een e-mail",
      href: "mailto:info@kaniou.be",
    },
  ];

  // Trust indicators
  const trustIndicators = [
    {
      icon: Star,
      emoji: "⭐⭐⭐⭐⭐",
      title: "Meer dan 3500 tevreden klanten",
    },
    {
      icon: Trophy,
      emoji: "🏆",
      title: "30 jaar ervaring in maatwerk gordijnen",
    },
    {
      icon: Shield,
      emoji: "🛡️",
      title: "100% vertrouwensgarantie",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bestel Online – Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald. Maatwerk, kwaliteit en comfort – nu ook eenvoudig vanop afstand."
        />
        <meta property="og:title" content="Bestel Online – Kaniou Zilvernaald" />
        <meta
          property="og:description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald. Maatwerk, kwaliteit en comfort – nu ook eenvoudig vanop afstand."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Bestel Online</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C3E50] to-[#1a1a1a] py-32 overflow-hidden">
        {/* Premium background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C8A85B]/5 via-transparent to-[#C8A85B]/5"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#C8A85B]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#D4AF37]/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#C8A85B]/5 to-transparent rounded-full"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#C8A85B] rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#C8A85B] rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <Container>
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <div className="animate-fade-in-up">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A85B]/20 to-[#D4AF37]/20 backdrop-blur-sm border border-[#C8A85B]/30 rounded-full px-6 py-2 mb-8">
                <Crown className="w-4 h-4 text-[#C8A85B]" />
                <span className="text-[#C8A85B] text-sm font-semibold tracking-wide uppercase">Premium Collection</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-black mb-8 leading-none tracking-tight">
                <span className="bg-gradient-to-r from-white via-[#C8A85B] to-white bg-clip-text text-transparent animate-shimmer">
                  Bestel exclusieve
                </span>
                <br />
                <span className="text-white">
                  raamdecoratie online
                </span>
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#C8A85B] to-transparent mx-auto mb-8 rounded-full"></div>
              
              <p className="font-body text-xl md:text-3xl text-white/80 leading-relaxed font-light tracking-wide">
                <span className="text-[#C8A85B] font-medium">Maatwerk</span>, 
                <span className="text-[#D4AF37] font-medium">kwaliteit</span> en 
                <span className="text-[#C8A85B] font-medium">comfort</span> 
                <br className="hidden md:block" />
                – nu ook eenvoudig vanop afstand.
              </p>
            </div>
          </div>
        </Container>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Why Order Online Section */}
      <div className="py-32 bg-gradient-to-b from-white via-[#fafafa] to-white relative overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8A85B] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C8A85B]"></div>
              <Star className="w-5 h-5 text-[#C8A85B]" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C8A85B] to-transparent"></div>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-[#2C3E50] font-black mb-8 tracking-tight">
              Waarom kiezen voor 
              <span className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] bg-clip-text text-transparent">
                online bestellen?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {onlineAdvantages.map((advantage, index) => {
              return (
                <div
                  key={index}
                  className="text-center group relative"
                >
                  {/* Premium card background */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#C8A85B]/10 hover:border-[#C8A85B]/30 group-hover:transform group-hover:scale-105 relative overflow-hidden">
                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] p-8 rounded-2xl inline-flex mb-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-110">
                        <span className="text-4xl" role="img" aria-label={advantage.title}>
                          {advantage.emoji}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 tracking-tight">
                        {advantage.title}
                      </h3>
                      
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-4"></div>
                      
                      <p className="font-body text-lg text-[#2C3E50]/80 leading-relaxed font-medium">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* How It Works Section */}
      <div className="py-32 bg-gradient-to-br from-[#2C3E50] via-[#1a2332] to-[#2C3E50] relative overflow-hidden">
        {/* Luxury background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C8A85B]/10 via-transparent to-[#D4AF37]/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C8A85B]/5 to-transparent"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#C8A85B]"></div>
              <Crown className="w-6 h-6 text-[#C8A85B]" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-transparent"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl text-white font-black mb-8 tracking-tight">
              Hoe werkt het?
            </h2>
            
            <p className="text-white/70 text-xl font-light max-w-2xl mx-auto">
              Vier eenvoudige stappen naar uw perfecte raamdecoratie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group relative"
              >
                <div className="relative mb-8">
                  {/* Premium number circle */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-4 border-white/20 group-hover:scale-110 group-hover:rotate-12">
                      <span className="text-white text-2xl font-black">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Connecting line */}
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-24 w-full">
                        <div className="h-0.5 bg-gradient-to-r from-[#C8A85B]/50 via-[#D4AF37]/30 to-transparent"></div>
                        <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-[#C8A85B]/50 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-full w-32 h-32 mx-auto -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-[#C8A85B]/30 transition-all duration-500">
                  <h3 className="font-display text-xl text-white font-bold mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-4"></div>
                  
                  <p className="font-body text-white/80 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Featured Products Section */}
      <div id="featured-products" className="py-32 bg-gradient-to-b from-white via-[#fafafa] to-white relative overflow-hidden">
        {/* Luxury background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-[#C8A85B]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-20">
            {/* Premium section header */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A85B] to-[#D4AF37]"></div>
              <Package className="w-6 h-6 text-[#C8A85B]" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#C8A85B] to-transparent"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl text-[#2C3E50] font-black mb-8 tracking-tight leading-tight">
              Wat je nu al 
              <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">
                online kunt bestellen
              </span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-[#2C3E50]/70 font-light leading-relaxed">
                Ontdek onze exclusieve collectie van premium raamdecoratie, 
                vakkundig vervaardigd en perfect op maat voor uw ruimte
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {featuredProducts.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <div
                  key={product.id}
                  className={`group relative ${
                    product.available ? "" : "opacity-80"
                  }`}
                >
                  {/* Premium card container */}
                  <div className={`relative bg-white rounded-3xl transition-all duration-700 border-2 overflow-hidden ${
                    product.available
                      ? "shadow-xl hover:shadow-2xl border-[#C8A85B]/20 hover:border-[#C8A85B]/60 group-hover:-translate-y-3 group-hover:scale-105"
                      : "shadow-lg border-gray-200"
                  }`}>
                    {/* Luxury background gradient */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ${
                      product.available
                        ? "bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100"
                        : "bg-gradient-to-br from-gray-50 to-gray-100/50"
                    }`}></div>
                    
                    {/* Available badge */}
                    {product.available && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Beschikbaar</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative z-10 p-8">
                      {/* Premium icon container */}
                      <div className="text-center mb-6">
                        <div className={`relative inline-flex p-6 rounded-2xl transition-all duration-500 ${
                          product.available
                            ? "bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] shadow-2xl group-hover:shadow-3xl group-hover:scale-110 group-hover:rotate-6"
                            : "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-400 shadow-lg"
                        }`}>
                          <IconComponent className="w-10 h-10 text-white" />
                          
                          {/* Glowing effect */}
                          {product.available && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* Product title */}
                      <div className="text-center mb-6">
                        <h3 className={`font-display text-xl font-black tracking-tight mb-3 transition-colors duration-300 ${
                          product.available
                            ? "text-[#2C3E50] group-hover:text-[#C8A85B]"
                            : "text-[#2C3E50]"
                        }`}>
                          {product.name}
                        </h3>
                        
                        {/* Premium divider */}
                        <div className={`w-16 h-0.5 mx-auto transition-all duration-500 ${
                          product.available
                            ? "bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] group-hover:w-20"
                            : "bg-gray-300"
                        }`}></div>
                        
                        {/* Coming soon label */}
                        {!product.available && (
                          <div className="mt-3">
                            <p
                              className="font-medium text-sm text-[#777] text-center"
                              aria-label="Product binnenkort beschikbaar"
                            >
                              Binnenkort online
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Action button */}
                      <div className="text-center">
                        {product.available ? (
                          <Link href={product.href}>
                            <Button className="luxury-order-button">
                              <span className="luxury-order-button-content">
                                <Package className="luxury-order-button-icon" />
                                BESTEL DIT PRODUCT
                              </span>
                            </Button>
                          </Link>
                        ) : (
                          <div className="h-16 flex items-center justify-center">
                            <div className="text-gray-400 text-sm font-medium">
                              Binnenkort beschikbaar
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Luxury card shadow */}
                  {product.available && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 scale-110"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Premium call-to-action */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#2C3E50] to-[#1a2332] text-white px-8 py-4 rounded-2xl shadow-2xl">
              <Crown className="w-6 h-6 text-[#C8A85B]" />
              <span className="font-display font-bold text-lg">
                Exclusief maatwerk voor de meest veeleisende klanten
              </span>
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </Container>
      </div>

      {/* Help & Contact Section */}
      <div className="py-32 bg-gradient-to-br from-[#C8A85B]/20 via-[#D4AF37]/10 to-[#C8A85B]/20 relative overflow-hidden">
        {/* Luxury background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/50 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-16">
            {/* Premium header */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#C8A85B]"></div>
              <MessageCircle className="w-6 h-6 text-[#C8A85B]" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-transparent"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-black mb-6 tracking-tight">
              Liever 
              <span className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] bg-clip-text text-transparent">
                persoonlijk contact?
              </span>
            </h2>
            
            <p className="font-body text-xl text-[#2C3E50]/70 font-light max-w-2xl mx-auto leading-relaxed">
              Onze experts staan klaar om u persoonlijk te adviseren en te begeleiden 
              naar de perfecte raamdecoratie voor uw ruimte.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
            {contactOptions.map((option, index) => {
              return (
                <a
                  key={index}
                  href={option.href}
                  className="flex-1 group relative"
                >
                  {/* Premium contact card */}
                  <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-2 border-[#C8A85B]/20 hover:border-[#C8A85B]/60 relative overflow-hidden">
                    {/* Luxury background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 text-center">
                      {/* Premium icon */}
                      <div className="bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-3xl" role="img" aria-label={option.title}>
                          {option.emoji}
                        </span>
                      </div>
                      
                      {/* Contact method title */}
                      <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 group-hover:text-[#C8A85B] transition-colors duration-300 tracking-tight">
                        {option.title}
                      </h3>
                      
                      {/* Premium divider */}
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-4 group-hover:w-20 transition-all duration-500"></div>
                      
                      {/* CTA text */}
                      <p className="text-[#2C3E50]/70 font-medium">
                        Direct contact opnemen
                      </p>
                      
                      {/* Hover arrow */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-6 h-6 text-[#C8A85B] mx-auto group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                  </div>
                </a>
              );
            })}
          </div>
          
          {/* Premium guarantee badge */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#2C3E50] to-[#1a2332] text-white px-8 py-4 rounded-2xl shadow-2xl">
              <Shield className="w-6 h-6 text-[#C8A85B]" />
              <span className="font-display font-bold text-lg">
                100% persoonlijke service & vakkundige begeleiding
              </span>
              <Star className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </Container>
      </div>

      {/* Trust Section */}
      <div className="py-32 bg-gradient-to-b from-white via-[#fafafa] to-white relative overflow-hidden">
        {/* Elegant background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8A85B]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          {/* Premium section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C8A85B] to-[#D4AF37]"></div>
              <Award className="w-6 h-6 text-[#C8A85B]" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#C8A85B] to-transparent"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-black mb-8 tracking-tight">
              Waarom duizenden klanten 
              <span className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] bg-clip-text text-transparent">
                voor KANIOU kiezen
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {trustIndicators.map((indicator, index) => {
              return (
                <div
                  key={index}
                  className="text-center group relative"
                >
                  {/* Premium trust card */}
                  <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#C8A85B]/10 hover:border-[#C8A85B]/30 group-hover:transform group-hover:scale-105 relative overflow-hidden">
                    {/* Luxury background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Premium emoji display */}
                      <div className="mb-8">
                        <div className="bg-gradient-to-br from-[#C8A85B]/10 to-[#D4AF37]/10 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                          <span className="text-4xl block" role="img" aria-label={indicator.title}>
                            {indicator.emoji}
                          </span>
                        </div>
                      </div>
                      
                      {/* Trust statement */}
                      <h3 className="font-display text-xl text-[#2C3E50] font-black leading-relaxed group-hover:text-[#C8A85B] transition-colors duration-300 tracking-tight">
                        {indicator.title}
                      </h3>
                      
                      {/* Premium divider */}
                      <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mt-4 group-hover:w-16 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                </div>
              );
            })}
          </div>
          
          {/* Final premium statement */}
          <div className="text-center mt-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#2C3E50] via-[#1a2332] to-[#2C3E50] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/10 via-transparent to-[#D4AF37]/10"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Crown className="w-8 h-8 text-[#C8A85B]" />
                    <h3 className="font-display text-3xl text-white font-black tracking-tight">
                      KANIOU Zilvernaald
                    </h3>
                    <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  
                  <p className="text-white/80 text-xl font-light leading-relaxed">
                    Uw partner voor exclusieve raamdecoratie op maat. 
                    Van ontwerp tot installatie, alles in eigen beheer voor gegarandeerde kwaliteit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BestelOnlinePage;