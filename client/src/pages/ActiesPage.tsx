import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, CheckCircle, Clock, ArrowRight, Percent, Star, ShieldCheck, Bell, Lock } from "lucide-react";
import { useLocation } from "wouter";
import PageLayout from "@/components/layout/PageLayout";

const promotions = [
  {
    id: 1,
    title: "Vouwgordijnen",
    description: "Stijlvolle vouwgordijnen voor een warme, elegante uitstraling. Verkrijgbaar in honderden stoffen en op maat gemaakt voor elk raam.",
    category: "Vouwgordijnen",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["Op maat gemaakt", "Grote stofkeuze", "Gratis inmeting"],
    ctaLink: "/contact",
  },
  {
    id: 2,
    title: "Gordijnen",
    description: "Inbetweens en overgordijnen in premium stoffen. Creëer warmte, sfeer en privacy in elke ruimte met onze uitgebreide collectie.",
    category: "Inbetweens & Overgordijnen",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["Inbetweens & overgordijnen", "Premium stoffen", "Confectie of maatwerk"],
    ctaLink: "/contact",
  },
  {
    id: 3,
    title: "Binnen Zonweringen",
    description: "Rolgordijnen, duo rolgordijnen, plissés, jaloezieën en lamellen. Volledige controle over lichtinval en privacy in uw interieur.",
    category: "Zonwering",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["Rolgordijnen & plissés", "Jaloezieën & lamellen", "Verduisterend of transparant"],
    ctaLink: "/contact",
  },
  {
    id: 4,
    title: "Buiten Screens",
    description: "Inside en outside screens voor optimale zonwering en maximale privacy. Houd de warmte buiten en geniet van het uitzicht.",
    category: "Screens",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["UV-bescherming", "Energiebesparend", "Windbestendig"],
    ctaLink: "/contact",
  },
  {
    id: 5,
    title: "Houten Shutters",
    description: "Geef uw interieur een tijdloze, luxe uitstraling met onze premium houten shutters. Duurzaam, stijlvol en op maat gemaakt.",
    category: "Shutters",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["Premium hout", "Op maat gemaakt", "10 jaar garantie"],
    ctaLink: "/contact",
  },
  {
    id: 6,
    title: "Horren",
    description: "Alle soorten horren: schuifdeuren, draaihorren, opzet-, inzet- en plissé hordeuren. Bescherm uw huis en geniet van frisse lucht.",
    category: "Alle Horren",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["Alle typen horren", "Op maat gemaakt", "Professionele montage"],
    ctaLink: "/contact",
  },
  {
    id: 7,
    title: "Ophangsystemen",
    description: "Gordijnrails en gordijnroedes voor een perfecte afwerking. Strak, modern of klassiek — altijd passend bij uw interieur.",
    category: "Rails & Roedes",
    discount: null,
    active: false,
    badge: "Voorwaarden volgen op korte termijn",
    validUntil: "Wordt binnenkort aangekondigd",
    features: ["Gordijnrails", "Gordijnroedes", "Elektrisch mogelijk"],
    ctaLink: "/contact",
  },
];

const ActiesPage = () => {
  const [, setLocation] = useLocation();

  const handleContactRedirect = (category?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (category) {
      setLocation(`/contact?type=exclusieve-voorwaarden&product=${encodeURIComponent(category)}`);
    } else {
      setLocation("/contact");
    }
  };

  const hasActivePromotions = promotions.some(p => p.active);

  return (
    <PageLayout
      title="Exclusieve voorwaarden voor geselecteerde collecties"
      subtitle="Exclusieve Aanbiedingen"
      description="Binnen specifieke periodes bieden wij bijzondere voorwaarden op een selectie van onze premium raamdecoratie.
      Ontdek de mogelijkheden via persoonlijk advies.
"
      metaDescription="Bekijk de actuele acties en kortingen bij KANIOU Zilvernaald. Premium raamdecoratie tegen scherpe prijzen. Horren, rolgordijnen, shutters en meer."
      breadcrumbs={[{ label: "Acties & Korting" }]}
      showCTA={true}
    >
      {/* Highlight Banner */}
      <section className="py-8 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C4A36C]/10 via-transparent to-transparent"></div>
        <Container>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#C4A36C]/15 rounded-2xl border border-[#C4A36C]/20">
                <Bell className="w-10 h-10 text-[#C4A36C]" />
              </div>
              <div>
                <p className="text-[#C4A36C] text-xs font-bold tracking-[0.3em] uppercase mb-1">Aankomende exclusieve voorwaarden</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Binnen afzienbare termijn introduceren wij nieuwe,<span className="text-[#C4A36C]"> zorgvuldig samengestelde</span> voorwaarden op geselecteerde collecties.
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-white/80 text-sm">Kwaliteitsgarantie op alle producten</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <Container>
          <div className="text-center mb-16">
            <p className="text-[#C4A36C] text-xs font-bold tracking-[0.3em] uppercase mb-4">Binnen afzienbare termijn</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">Exclusieve voorwaarden op geselecteerde collecties</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Op dit moment gelden bijzondere voorwaarden op een selectie van onze premium raamdecoratie.
              Ontvang hoogwaardige kwaliteit en professioneel maatwerk met extra voordeel..</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                className={`group relative overflow-hidden rounded-2xl border-0 transition-all duration-500 ${
                  promo.active
                    ? "shadow-lg hover:shadow-2xl transform hover:-translate-y-2 bg-white"
                    : "shadow-md bg-white/60 hover:bg-white/80 hover:shadow-lg"
                }`}
              >
                {/* Inactive overlay */}
                {!promo.active && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100/40 via-transparent to-gray-100/30 mix-blend-multiply"></div>
                  </div>
                )}

                {/* Discount or Coming Soon Badge - Top Left */}
                <div className="absolute top-5 left-5 z-30">
                  {promo.active && promo.discount ? (
                    <div className="bg-red-600 text-white font-black text-xl px-4 py-2 rounded-xl shadow-lg shadow-red-500/30">
                      {promo.discount}
                    </div>
                  ) : (
                    <div className="bg-gray-400/80 backdrop-blur-sm text-white font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5" />
                      Voorwaarden korte termijn
                    </div>
                  )}
                </div>

                {/* Status Badge - Top Right */}
                <div className="absolute top-5 right-5 z-30">
                  {promo.active ? (
                    <Badge className="bg-emerald-500 text-white font-bold px-3 py-1 text-[10px] tracking-widest uppercase">
                      Actief
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-400/70 backdrop-blur-sm text-white font-semibold px-3 py-1 text-[10px] tracking-widest uppercase border border-white/10">
                      Inactief
                    </Badge>
                  )}
                </div>

                {/* Card Header with gradient */}
                <div className={`h-32 relative ${
                  promo.active
                    ? "bg-gradient-to-br from-[#2C3E50] to-[#1a2332]"
                    : "bg-gradient-to-br from-[#64748b] to-[#475569]"
                }`}>
                  {promo.active && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C4A36C]/10 to-transparent"></div>
                  )}
                  {!promo.active && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-px bg-white/10 absolute"></div>
                      <div className="w-px h-24 bg-white/10 absolute"></div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-5">
                    <Badge variant="outline" className={`text-[10px] tracking-widest uppercase ${
                      promo.active
                        ? "text-white/70 border-white/30"
                        : "text-white/40 border-white/15"
                    }`}>
                      {promo.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 pt-5 relative z-10">
                  <h3 className={`text-xl font-bold mb-3 leading-tight transition-colors ${
                    promo.active
                      ? "text-[#2C3E50] group-hover:text-[#C4A36C]"
                      : "text-gray-400"
                  }`}>
                    {promo.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 ${
                    promo.active ? "text-gray-500" : "text-gray-400"
                  }`}>
                    {promo.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {promo.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                          promo.active ? "text-emerald-500" : "text-gray-300"
                        }`} />
                        <span className={promo.active ? "text-gray-600" : "text-gray-400"}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`flex items-center gap-2 text-xs mb-5 pb-5 border-b ${
                    promo.active ? "text-gray-400 border-gray-100" : "text-gray-300 border-gray-100/60"
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{promo.validUntil}</span>
                  </div>

                  {promo.active ? (
                    <Button
                      onClick={() => handleContactRedirect(promo.category)}
                      className="w-full bg-[#2C3E50] hover:bg-[#C4A36C] text-white font-bold text-xs tracking-widest uppercase py-5 rounded-xl transition-all duration-300 group-hover:bg-[#C4A36C]"
                    >
                      Meer Info
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleContactRedirect(promo.category)}
                      variant="outline"
                      className="w-full border-2 border-dashed border-gray-200 text-gray-400 font-bold text-xs tracking-widest uppercase py-5 rounded-xl hover:border-[#C4A36C]/50 hover:text-[#C4A36C] hover:bg-[#C4A36C]/5 transition-all duration-300 bg-gray-50/50"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Houd Mij Op De Hoogte
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl overflow-hidden">
              <CardContent className="p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A36C]/5 rounded-full -translate-y-32 translate-x-32 blur-[80px]"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#C4A36C] fill-current" />
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Waarom KANIOU Zilvernaald?</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                    Al onze producten worden geleverd met professioneel advies en nauwkeurige inmeting. 
                    Wij geloven in kwaliteit die lang meegaat, daarom bieden wij op al onze producten garantie.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#C4A36C] mb-2">30+</p>
                      <p className="text-gray-400 text-sm uppercase tracking-widest">Jaar Ervaring</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#C4A36C] mb-2">100%</p>
                      <p className="text-gray-400 text-sm uppercase tracking-widest">Maatwerk</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#C4A36C] mb-2">Gratis</p>
                      <p className="text-gray-400 text-sm uppercase tracking-widest">Inmeting</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleContactRedirect()}
                    className="bg-gradient-to-r from-[#C4A36C] to-[#D5B992] hover:from-[#D5B992] hover:to-[#C4A36C] text-white font-bold text-xs tracking-[0.2em] uppercase px-10 py-6 rounded-xl shadow-lg shadow-[#C4A36C]/20 transition-all duration-300 transform hover:scale-105"
                  >
                    Neem Contact Op
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default ActiesPage;
