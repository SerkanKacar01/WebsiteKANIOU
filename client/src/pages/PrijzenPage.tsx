import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Star, 
  CheckCircle, 
  Ruler,
  Shield,
  Clock,
  Palette,
  Settings,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import PageLayout from "@/components/layout/PageLayout";

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
    <PageLayout
      title="Prijsoverzicht"
      subtitle="Transparante Prijzen"
      description="Ontdek onze transparante prijzen voor maatwerk raamdecoratie. Kwaliteit en vakmanschap tegen eerlijke prijzen."
      metaDescription="Transparante prijzen voor maatwerk raamdecoratie. Rolgordijnen, plissé, overgordijnen, jaloeziëen en meer. Gratis opmeting en advies bij KANIOU Zilvernaald."
      breadcrumbs={[{ label: "Prijzen" }]}
      showCTA={true}
    >
      <section className="py-16 lg:py-20 bg-white">
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
                  
                  {category.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Populair
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    
                    <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 tracking-tight group-hover:text-[#C8A85B] transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="font-body text-[#2C3E50]/70 leading-relaxed mb-6">
                      {category.description}
                    </p>
                    
                    <div className="bg-gradient-to-r from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-2xl p-4 mb-6">
                      <p className="text-sm text-[#2C3E50]/60 mb-1">Prijsrange per m²</p>
                      <p className="font-display text-2xl font-black text-[#C8A85B]">{category.priceRange}</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                          <span className="text-sm text-[#2C3E50]/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/quote">
                      <Button className="w-full bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] hover:from-[#B8975A] hover:to-[#C4A882] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 group/btn">
                        <span>Offerte aanvragen</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-[#FAFAF8]">
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
      </section>

      <section className="py-16 lg:py-20 bg-white">
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

            <div className="bg-gradient-to-r from-[#C8A85B]/10 via-[#D4AF37]/10 to-[#C8A85B]/10 rounded-2xl p-6 text-center">
              <p className="text-[#2C3E50]/70 font-body leading-relaxed">
                <strong>Let op:</strong> De vermelde prijzen zijn richtprijzen per m² inclusief BTW. 
                De exacte prijs wordt bepaald na de gratis opmeting en is afhankelijk van uw specifieke wensen en situatie.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default PrijzenPage;
