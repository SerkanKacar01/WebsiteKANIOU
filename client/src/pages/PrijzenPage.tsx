import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calculator,
  Home,
  Ruler,
  Shield,
  Clock,
  Palette,
  Settings,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const PrijzenPage = () => {
  const productCategories = [
    {
      title: "Rolgordijnen",
      description: "Op maat gemaakte rolgordijnen voor elk interieur",
      priceRange: "€85 - €250",
      features: ["Diverse stoffen", "Motorisatie mogelijk", "UV-bescherming", "Eenvoudige bediening"],
      icon: "🪟",
      popular: false
    },
    {
      title: "Plissé Gordijnen",
      description: "Elegant gevouwen zonwering met perfecte lichtregeling",
      priceRange: "€120 - €380",
      features: ["Dubbel plissé", "Dag/nacht combinatie", "Isolerend", "Maatwerk"],
      icon: "📐",
      popular: true
    },
    {
      title: "Overgordijnen",
      description: "Luxe overgordijnen voor een warme, stijlvolle uitstraling",
      priceRange: "€150 - €600",
      features: ["Premium stoffen", "Handgemaakt", "Diverse ophangingen", "Perfecte pasvorm"],
      icon: "🎭",
      popular: false
    },
    {
      title: "Jaloeziëen",
      description: "Precisie zonwering in hout, aluminium of kunststof",
      priceRange: "€95 - €320",
      features: ["Hout & aluminium", "Diverse kleuren", "Waterbestendig", "Duurzaam"],
      icon: "📏",
      popular: false
    },
    {
      title: "Houten Shutters",
      description: "Traditionele elegantie met moderne functionaliteit",
      priceRange: "€300 - €800",
      features: ["Massief hout", "Verschillende houtsoorten", "Isolatie", "Tijdloos design"],
      icon: "🪵",
      popular: false
    },
    {
      title: "Horren",
      description: "Praktische bescherming tegen insecten",
      priceRange: "€45 - €180",
      features: ["Inzet- en opzethorren", "Plissé hordeuren", "UV-bestendig", "Eenvoudige montage"],
      icon: "🦟",
      popular: false
    }
  ];

  const services = [
    {
      title: "Gratis Opmeting",
      description: "Professionele opmeting bij u thuis voor perfecte pasvorm",
      icon: <Ruler className="w-8 h-8" />,
      included: true
    },
    {
      title: "Deskundig Advies",
      description: "Persoonlijk advies over kleuren, materialen en functionaliteit",
      icon: <Palette className="w-8 h-8" />,
      included: true
    },
    {
      title: "Installatie Service",
      description: "Vakkundige montage door onze ervaren technici",
      icon: <Settings className="w-8 h-8" />,
      price: "€25 - €75"
    },
    {
      title: "5 Jaar Garantie",
      description: "Uitgebreide garantie op alle producten en werkmanschap",
      icon: <Shield className="w-8 h-8" />,
      included: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>Prijsoverzicht – Maatwerk Raamdecoratie | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Transparante prijzen voor maatwerk raamdecoratie. Rolgordijnen, plissé, overgordijnen, jaloeziëen en meer. Gratis opmeting en advies bij KANIOU Zilvernaald."
        />
        <meta property="og:title" content="Prijsoverzicht – Maatwerk Raamdecoratie | KANIOU Zilvernaald" />
        <meta property="og:description" content="Transparante prijzen voor maatwerk raamdecoratie. Rolgordijnen, plissé, overgordijnen, jaloeziëen en meer. Gratis opmeting en advies bij KANIOU Zilvernaald." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Luxury Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C3E50] to-[#1a1a1a] overflow-hidden">
        {/* Premium background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C8A85B]/5 via-transparent to-[#C8A85B]/5"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#C8A85B]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#D4AF37]/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C8A85B]/5 to-transparent rounded-full"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#C8A85B] rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#C8A85B] rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <Container className="py-20 md:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A85B]/20 to-[#D4AF37]/20 backdrop-blur-sm border border-[#C8A85B]/30 rounded-full px-6 py-2 mb-8">
                <Calculator className="w-4 h-4 text-[#C8A85B]" />
                <span className="text-[#C8A85B] text-sm font-semibold tracking-wide uppercase">Transparante Prijzen</span>
                <Star className="w-4 h-4 text-[#D4AF37]" />
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-black mb-6 leading-none tracking-tight">
                <span className="bg-gradient-to-r from-white via-[#C8A85B] to-white bg-clip-text text-transparent animate-shimmer">
                  Prijsoverzicht
                </span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-8 rounded-full"></div>
              
              <p className="font-body text-xl md:text-2xl text-white/80 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
                Ontdek onze <span className="text-[#C8A85B] font-medium">transparante prijzen</span> voor maatwerk raamdecoratie. 
                <br className="hidden md:block" />
                Kwaliteit en vakmanschap tegen <span className="text-[#D4AF37] font-medium">eerlijke prijzen</span>.
              </p>
            </div>
          </div>
        </Container>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Product Categories Pricing Section */}
      <div className="py-20 bg-gradient-to-b from-white via-[#fafafa] to-white relative overflow-hidden">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <Crown className="w-6 h-6 text-[#C8A85B]" />
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl text-[#2C3E50] font-black mb-6 tracking-tight leading-tight">
              Onze <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">Producten</span> & Prijzen
            </h2>
            
            <p className="text-xl text-[#2C3E50]/70 font-light leading-relaxed max-w-3xl mx-auto">
              Kwaliteitsvolle raamdecoratie op maat tegen transparante prijzen. Alle vermelde prijzen zijn inclusief BTW.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <div key={index} className="group relative">
                <Card className={`h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                  category.popular 
                    ? 'border-[#C8A85B]/30 hover:border-[#C8A85B]/50' 
                    : 'border-[#C8A85B]/10 hover:border-[#C8A85B]/30'
                } group-hover:-translate-y-2 relative overflow-hidden`}>
                  
                  {/* Popular badge */}
                  {category.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Populair
                      </div>
                    </div>
                  )}
                  
                  {/* Luxury background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Icon */}
                    <div className="text-4xl mb-4">{category.icon}</div>
                    
                    <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 tracking-tight group-hover:text-[#C8A85B] transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="font-body text-[#2C3E50]/70 leading-relaxed mb-6">
                      {category.description}
                    </p>
                    
                    {/* Price range */}
                    <div className="bg-gradient-to-r from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-2xl p-4 mb-6">
                      <p className="text-sm text-[#2C3E50]/60 mb-1">Prijsrange per m²</p>
                      <p className="font-display text-2xl font-black text-[#C8A85B]">{category.priceRange}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                          <span className="text-sm text-[#2C3E50]/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Link href="/quote">
                      <Button className="w-full bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] hover:from-[#B8975A] hover:to-[#C4A882] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 group/btn">
                        <span>Offerte aanvragen</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                  
                  {/* Luxury card shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 scale-110"></div>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Services & What's Included Section */}
      <div className="py-20 bg-[#f9f7f3] relative overflow-hidden">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-[#2C3E50] font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">Service</span> & Garantie
            </h2>
            <p className="text-xl text-[#2C3E50]/70 font-light leading-relaxed max-w-3xl mx-auto">
              Bij KANIOU krijgt u meer dan alleen een product. Ontdek onze uitgebreide service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#C8A85B]/10 hover:border-[#C8A85B]/30 group hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] p-4 rounded-2xl inline-flex mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl text-[#2C3E50] font-black mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="font-body text-[#2C3E50]/70 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {service.included ? (
                    <div className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Inbegrepen
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-[#C8A85B]/10 to-[#D4AF37]/10 text-[#C8A85B] px-4 py-2 rounded-full text-sm font-semibold">
                      {service.price}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* Price Information Section */}
      <div className="py-20 bg-white relative overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl text-[#2C3E50] font-black mb-6 tracking-tight">
                Belangrijke <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">Prijsinformatie</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-[#C8A85B]/5 to-[#D4AF37]/5 border-[#C8A85B]/20 rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[#C8A85B]" />
                    <h3 className="font-display text-xl font-black text-[#2C3E50]">Wat beïnvloedt de prijs?</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Afmetingen van het raam</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Gekozen materiaal en afwerking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Type bediening (handmatig/motorisch)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Complexiteit van de montage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#D4AF37]/5 to-[#C8A85B]/5 border-[#D4AF37]/20 rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="font-display text-xl font-black text-[#2C3E50]">Altijd inbegrepen</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Gratis adviesgesprek</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Professionele opmeting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">Offerte op maat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="text-[#2C3E50]/80">5 jaar garantie</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Price note */}
            <div className="bg-gradient-to-r from-[#C8A85B]/10 via-[#D4AF37]/10 to-[#C8A85B]/10 rounded-2xl p-6 text-center">
              <p className="text-[#2C3E50]/70 font-body leading-relaxed">
                <strong>Let op:</strong> De vermelde prijzen zijn richtprijzen per m² inclusief BTW. 
                De exacte prijs wordt bepaald na de gratis opmeting en is afhankelijk van uw specifieke wensen en situatie.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#C8A85B]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#D4AF37]/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl text-white font-black mb-6 tracking-tight leading-tight">
              Klaar voor een <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">gratis offerte</span>?
            </h2>
            
            <p className="font-body text-xl text-white/80 leading-relaxed mb-10">
              Ontdek wat uw droomraamdecoratie kost. Geheel vrijblijvend en op maat berekend.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] hover:from-[#B8975A] hover:to-[#C4A882] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 group"
                >
                  <Calculator className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Gratis offerte aanvragen
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Direct contact
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Gratis opmeting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Geen verplichtingen</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Snelle respons</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrijzenPage;