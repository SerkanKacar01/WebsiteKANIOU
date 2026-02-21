import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, CheckCircle, Clock, ArrowRight, Percent, Star, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import PageLayout from "@/components/layout/PageLayout";

const promotions = [
  {
    id: 1,
    title: "20% Korting op Alle Horren",
    description: "Bescherm uw huis tegen insecten en geniet van frisse lucht. Alle horren worden op maat gemaakt in een breed scala aan kleuren en afwerkingen.",
    category: "Horren",
    discount: "-20%",
    badge: "Populair",
    validUntil: "Geldig tot 31 augustus 2026",
    features: ["Op maat gemaakt", "Gratis inmeting", "Professionele montage"],
    ctaLink: "/contact",
  },
  {
    id: 2,
    title: "Rolgordijnen Voordeelpakket",
    description: "Bestel 3 of meer rolgordijnen en ontvang een aantrekkelijke bundelkorting. Keuze uit verduisterend, lichtdoorlatend of transparant.",
    category: "Rolgordijnen",
    discount: "-15%",
    badge: "Bundeldeal",
    validUntil: "Geldig tot 30 september 2026",
    features: ["Vanaf 3 stuks", "Alle stoffen", "Inclusief montage"],
    ctaLink: "/contact",
  },
  {
    id: 3,
    title: "Shutters Seizoensactie",
    description: "Geef uw interieur een tijdloze uitstraling met onze premium houten shutters. Nu met een exclusieve seizoenskorting.",
    category: "Shutters",
    discount: "-10%",
    badge: "Exclusief",
    validUntil: "Geldig tot 31 juli 2026",
    features: ["Premium hout", "Op maat gemaakt", "10 jaar garantie"],
    ctaLink: "/contact",
  },
  {
    id: 4,
    title: "Plissé Gordijnen Actie",
    description: "De perfecte oplossing voor draaikiepramen en dakramen. Kies uit honderden stoffen en kleuren voor de ideale lichtregulering.",
    category: "Plissés",
    discount: "-25%",
    badge: "Beste Deal",
    validUntil: "Geldig tot 31 augustus 2026",
    features: ["300+ stoffen", "Alle raammaten", "Energiebesparend"],
    ctaLink: "/contact",
  },
  {
    id: 5,
    title: "Overgordijnen Collectie",
    description: "Luxe overgordijnen in premium stoffen. Creëer warmte en sfeer in elke ruimte met onze nieuwe collectie tegen een actieprijs.",
    category: "Gordijnen",
    discount: "-15%",
    badge: "Nieuw",
    validUntil: "Geldig tot 30 september 2026",
    features: ["Premium stoffen", "Confectie of maatwerk", "Gratis stalen"],
    ctaLink: "/contact",
  },
  {
    id: 6,
    title: "Screens Zomeractie",
    description: "Houd de warmte buiten en geniet van het uitzicht. Inside en outside screens met hoge zonwering en maximale privacy.",
    category: "Screens",
    discount: "-20%",
    badge: "Zomer",
    validUntil: "Geldig tot 31 augustus 2026",
    features: ["UV-bescherming", "Energiebesparend", "Windbestendig"],
    ctaLink: "/contact",
  },
];

const ActiesPage = () => {
  const [, setLocation] = useLocation();

  const handleContactRedirect = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Populair": return "bg-blue-500 text-white";
      case "Bundeldeal": return "bg-purple-500 text-white";
      case "Exclusief": return "bg-amber-600 text-white";
      case "Beste Deal": return "bg-emerald-500 text-white";
      case "Nieuw": return "bg-indigo-500 text-white";
      case "Zomer": return "bg-orange-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <PageLayout
      title="Acties & Korting"
      subtitle="Exclusieve Aanbiedingen"
      description="Profiteer van tijdelijke kortingen op premium raamdecoratie. Vakmanschap tegen de beste prijs."
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
              <div className="p-4 bg-red-500/20 rounded-2xl">
                <Percent className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <p className="text-[#C4A36C] text-xs font-bold tracking-[0.3em] uppercase mb-1">Tijdelijke Acties</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Tot <span className="text-red-400">25% korting</span> op geselecteerde producten
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
            <p className="text-[#C4A36C] text-xs font-bold tracking-[0.3em] uppercase mb-4">Onze Aanbiedingen</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">Huidige Acties</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Ontdek welke producten momenteel in de aanbieding zijn. Alle kortingen zijn geldig zolang de voorraad strekt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
              >
                {/* Discount Badge - Top Left */}
                <div className="absolute top-5 left-5 z-10">
                  <div className="bg-red-600 text-white font-black text-xl px-4 py-2 rounded-xl shadow-lg shadow-red-500/30">
                    {promo.discount}
                  </div>
                </div>

                {/* Category Badge - Top Right */}
                <div className="absolute top-5 right-5 z-10">
                  <Badge className={`${getBadgeColor(promo.badge)} font-bold px-3 py-1 text-[10px] tracking-widest uppercase`}>
                    {promo.badge}
                  </Badge>
                </div>

                {/* Card Header with gradient */}
                <div className="h-32 bg-gradient-to-br from-[#2C3E50] to-[#1a2332] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C4A36C]/10 to-transparent"></div>
                  <div className="absolute bottom-4 left-5">
                    <Badge variant="outline" className="text-white/70 border-white/30 text-[10px] tracking-widest uppercase">
                      {promo.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 pt-5">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#C4A36C] transition-colors leading-tight">
                    {promo.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {promo.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {promo.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 pb-5 border-b border-gray-100">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{promo.validUntil}</span>
                  </div>

                  <Button
                    onClick={handleContactRedirect}
                    className="w-full bg-[#2C3E50] hover:bg-[#C4A36C] text-white font-bold text-xs tracking-widest uppercase py-5 rounded-xl transition-all duration-300 group-hover:bg-[#C4A36C]"
                  >
                    Meer Info
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
                    Al onze actieprijzen zijn inclusief professioneel advies en nauwkeurige inmeting. 
                    Wij geloven in kwaliteit die lang meegaat, daarom bieden wij op al onze producten garantie.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#C4A36C] mb-2">15+</p>
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
                    onClick={handleContactRedirect}
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
