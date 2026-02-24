import { useState } from "react";
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
  ArrowRight,
  Eye,
  Sun,
  Blinds,
  Layers,
  Grip,
  ChevronUp,
  Calculator,
  Minus,
  Plus
} from "lucide-react";
import { Link } from "wouter";
import PageLayout from "@/components/layout/PageLayout";

const PLEAT_FACTORS: Record<string, number> = {
  "Enkele plooi": 2,
  "Dubbele plooi": 2.5,
  "Triplooi": 3,
  "Wave plooi": 3,
};

const PLEAT_TYPES = ["Enkele plooi", "Dubbele plooi", "Triplooi", "Wave plooi"];
const PANEL_OPTIONS = ["1 deel links", "1 deel rechts", "Stel"];
const ROOM_OPTIONS = ["Slaapkamer", "Woonkamer", "Keuken", "Badkamer", "Zolder", "Anders"];
const PRICE_PER_M2 = 35;

function InbetweensCalculator() {
  const [breedte, setBreedte] = useState(150);
  const [hoogte, setHoogte] = useState(250);
  const [plooiType, setPlooiType] = useState("Enkele plooi");
  const [aantalDelen, setAantalDelen] = useState("Stel");
  const [ruimte, setRuimte] = useState("Woonkamer");

  const plooiFactor = PLEAT_FACTORS[plooiType];
  const stoffenMeters = (breedte / 100) * plooiFactor * (hoogte / 100);
  const totaalPrijs = stoffenMeters * PRICE_PER_M2;

  function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
  }

  return (
    <div className="mt-5 pt-5 border-t border-[#C8A85B]/20 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <Calculator className="w-4 h-4 text-[#C8A85B]" />
        <span className="text-xs font-bold text-[#2C3E50]/70 uppercase tracking-widest">Prijscalculator</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/50 mb-1.5">
            Breedte (cm)
          </label>
          <div className="flex items-center border border-[#C8A85B]/30 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setBreedte(clamp(breedte - 1, 50, 999))}
              className="px-2.5 py-2 text-[#C8A85B] hover:bg-[#C8A85B]/10 transition-colors border-r border-[#C8A85B]/20"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              type="number"
              min={50}
              max={999}
              step={1}
              value={breedte}
              onChange={(e) => setBreedte(clamp(parseInt(e.target.value) || 50, 50, 999))}
              className="flex-1 text-center text-sm font-bold text-[#2C3E50] py-2 outline-none w-0 min-w-0"
            />
            <button
              onClick={() => setBreedte(clamp(breedte + 1, 50, 999))}
              className="px-2.5 py-2 text-[#C8A85B] hover:bg-[#C8A85B]/10 transition-colors border-l border-[#C8A85B]/20"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[9px] text-[#2C3E50]/40 mt-1">min. 50 — max. 999 cm</p>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/50 mb-1.5">
            Hoogte (cm)
          </label>
          <div className="flex items-center border border-[#C8A85B]/30 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setHoogte(clamp(hoogte - 1, 40, 285))}
              className="px-2.5 py-2 text-[#C8A85B] hover:bg-[#C8A85B]/10 transition-colors border-r border-[#C8A85B]/20"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              type="number"
              min={40}
              max={285}
              step={1}
              value={hoogte}
              onChange={(e) => setHoogte(clamp(parseInt(e.target.value) || 40, 40, 285))}
              className="flex-1 text-center text-sm font-bold text-[#2C3E50] py-2 outline-none w-0 min-w-0"
            />
            <button
              onClick={() => setHoogte(clamp(hoogte + 1, 40, 285))}
              className="px-2.5 py-2 text-[#C8A85B] hover:bg-[#C8A85B]/10 transition-colors border-l border-[#C8A85B]/20"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[9px] text-[#2C3E50]/40 mt-1">min. 40 — max. 285 cm</p>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/50 mb-2">
          Plooi type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {PLEAT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setPlooiType(type)}
              className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                plooiType === type
                  ? "bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white border-transparent shadow-md"
                  : "bg-white text-[#2C3E50]/70 border-[#C8A85B]/25 hover:border-[#C8A85B]/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="text-[9px] text-[#2C3E50]/40 mt-1.5">
          Factor: ×{plooiFactor} — benodigd stof: {stoffenMeters.toFixed(2)} m²
        </p>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/50 mb-2">
          Aantal delen
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {PANEL_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setAantalDelen(opt)}
              className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                aantalDelen === opt
                  ? "bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white border-transparent shadow-md"
                  : "bg-white text-[#2C3E50]/70 border-[#C8A85B]/25 hover:border-[#C8A85B]/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/50 mb-2">
          Ruimte
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {ROOM_OPTIONS.map((room) => (
            <button
              key={room}
              onClick={() => setRuimte(room)}
              className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                ruimte === room
                  ? "bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white border-transparent shadow-md"
                  : "bg-white text-[#2C3E50]/70 border-[#C8A85B]/25 hover:border-[#C8A85B]/50"
              }`}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#C8A85B]/10 to-[#D4AF37]/10 rounded-xl p-4 border border-[#C8A85B]/20">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/50">
            Prijsindicatie
          </span>
          <span className="text-[9px] text-[#2C3E50]/40">incl. confectie</span>
        </div>
        <p className="font-display text-2xl font-black text-[#C8A85B]">
          ± €{totaalPrijs.toFixed(0)}
        </p>
        <p className="text-[10px] text-[#2C3E50]/50 mt-1">
          {breedte} × {hoogte} cm · {plooiType} · {aantalDelen} · {ruimte}
        </p>
        <p className="text-[9px] text-[#2C3E50]/40 mt-2 leading-relaxed">
          Dit is een richtprijs. De exacte prijs wordt bepaald na gratis opmeting.
        </p>
      </div>

      <Link href="/offerte" className="block">
        <Button className="w-full bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] hover:from-[#B8975A] hover:to-[#C4A882] text-white text-xs font-bold rounded-lg shadow-md py-2.5">
          Offerte aanvragen
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </Link>
    </div>
  );
}

const productCategories = [
  {
    category: "Gordijnen",
    icon: <Layers className="w-6 h-6" />,
    products: [
      {
        title: "Inbetweens",
        description: "Lichtdoorlatende gordijnen die privacy combineren met zachte, natuurlijke lichtinval.",
        priceFrom: "€75",
        priceTo: "€195",
        unit: "per m²",
        features: ["Lichtdoorlatend", "Privacy behoud", "Diverse stoffen", "Op maat gemaakt"],
        path: "/producten/vitrages",
        popular: false,
        hasCalculator: true,
      },
      {
        title: "Overgordijnen",
        description: "Op maat gemaakte overgordijnen voor optimale verduistering, isolatie en luxe uitstraling.",
        priceFrom: "€150",
        priceTo: "€600",
        unit: "per m²",
        features: ["Premium stoffen", "Handgemaakt", "Diverse ophangingen", "Verduisterend"],
        path: "/producten/overgordijnen",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Vitrages",
        description: "Transparante raamdecoratie die daglicht filtert en een verfijnde sfeer creëert.",
        priceFrom: "€55",
        priceTo: "€160",
        unit: "per m²",
        features: ["Transparant", "Lichtfilterend", "Verfijnd design", "Op maat"],
        path: "/producten/vitrages",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Vouwgordijnen",
        description: "Stijlvolle vouwgordijnen die textiel en functionaliteit harmonieus samenbrengen.",
        priceFrom: "€120",
        priceTo: "€350",
        unit: "per stuk",
        features: ["Stijlvol opvouwbaar", "Diverse stoffen", "Lichtregulering", "Compact design"],
        path: "/producten/vouwgordijnen",
        popular: false,
        hasCalculator: false,
      },
    ],
  },
  {
    category: "Binnenzonwering",
    icon: <Sun className="w-6 h-6" />,
    products: [
      {
        title: "Rolgordijnen",
        description: "Strakke rolgordijnen op maat voor gecontroleerde lichtregulering in elke ruimte.",
        priceFrom: "€85",
        priceTo: "€250",
        unit: "per stuk",
        features: ["Diverse stoffen", "Motorisatie mogelijk", "UV-bescherming", "Eenvoudige bediening"],
        path: "/producten/rolgordijnen",
        popular: true,
        hasCalculator: false,
      },
      {
        title: "Duo Rolgordijnen",
        description: "Transparante en verduisterende banen voor flexibele lichtbeheersing overdag en 's nachts.",
        priceFrom: "€110",
        priceTo: "€290",
        unit: "per stuk",
        features: ["Dag/nacht functie", "Dubbele stofbaan", "Modern design", "Op maat"],
        path: "/producten/duo-rolgordijnen",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Plissé Gordijnen",
        description: "Elegant geplooide plisségordijnen, geschikt voor diverse raamvormen inclusief dakramen.",
        priceFrom: "€120",
        priceTo: "€380",
        unit: "per stuk",
        features: ["Dubbel plissé", "Dag/nacht combinatie", "Isolerend", "Alle raamvormen"],
        path: "/producten/plisse",
        popular: true,
        hasCalculator: false,
      },
      {
        title: "Duo Plissés",
        description: "Honingraatstructuur voor verbeterde energie-efficiëntie en optimaal wooncomfort.",
        priceFrom: "€145",
        priceTo: "€420",
        unit: "per stuk",
        features: ["Honingraatstructuur", "Energiebesparend", "Geluidsisolerend", "Premium kwaliteit"],
        path: "/producten/duo-plisses",
        popular: false,
        hasCalculator: false,
      },
    ],
  },
  {
    category: "Jaloezieën",
    icon: <Blinds className="w-6 h-6" />,
    products: [
      {
        title: "Houten Jaloezieën",
        description: "Warmte, karakter en natuurlijke uitstraling voor een tijdloos interieur.",
        priceFrom: "€130",
        priceTo: "€380",
        unit: "per stuk",
        features: ["Massief hout", "Diverse houtsoorten", "50mm lamellen", "Warmte-isolerend"],
        path: "/producten/houten-jaloezieen",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Aluminium Jaloezieën",
        description: "Nauwkeurige lichtregeling met een moderne, strakke afwerking in elke kleur.",
        priceFrom: "€95",
        priceTo: "€280",
        unit: "per stuk",
        features: ["Aluminium lamellen", "25/50mm breedtes", "Waterbestendig", "Onderhoudsvriendelijk"],
        path: "/producten/kunststof-jaloezieen",
        popular: false,
        hasCalculator: false,
      },
    ],
  },
  {
    category: "Lamellen",
    icon: <Grip className="w-6 h-6" />,
    products: [
      {
        title: "Textiel Lamellen",
        description: "Verticale textiellamellen die grote raampartijen elegant structureren en zonlicht reguleren.",
        priceFrom: "€95",
        priceTo: "€260",
        unit: "per m²",
        features: ["Verticaal draaibaar", "Grote raampartijen", "Diverse dessins", "Lichtregulering"],
        path: "/producten/textiel-lamellen",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Kunststof Lamellen",
        description: "Praktisch onderhoud gecombineerd met een strakke, moderne uitstraling.",
        priceFrom: "€75",
        priceTo: "€210",
        unit: "per m²",
        features: ["Kunststof lamellen", "Vochtbestendig", "Eenvoudig reinigen", "Duurzaam"],
        path: "/producten/kunststof-lamellen",
        popular: false,
        hasCalculator: false,
      },
    ],
  },
  {
    category: "Speciale Toepassingen",
    icon: <Eye className="w-6 h-6" />,
    products: [
      {
        title: "Dakraam Zonweringen",
        description: "Perfecte pasvorm en optimale verduistering voor dakramen van alle merken.",
        priceFrom: "€140",
        priceTo: "€350",
        unit: "per stuk",
        features: ["Alle dakraammerken", "Verduisterend", "Perfecte pasvorm", "Isolerend"],
        path: "/producten/dakraam-zonweringen",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Screens Inside",
        description: "Zonlicht temperen zonder het zicht naar buiten te belemmeren. Ideaal voor kantoren.",
        priceFrom: "€110",
        priceTo: "€320",
        unit: "per m²",
        features: ["Zicht behoud", "UV-bescherming", "Warmtewering", "Motoriseerbaar"],
        path: "/producten/screens-inside",
        popular: false,
        hasCalculator: false,
      },
      {
        title: "Screens Outside",
        description: "Warmte en zoninstraling effectief reduceren aan de buitenkant voor maximaal comfort.",
        priceFrom: "€180",
        priceTo: "€450",
        unit: "per m²",
        features: ["Buitenmontage", "Warmtewering tot 90%", "Windbestendig", "Motoriseerbaar"],
        path: "/producten/screens-outside",
        popular: false,
        hasCalculator: false,
      },
    ],
  },
];

const services = [
  {
    title: "Gratis Opmeting",
    description: "Professionele opmeting bij u thuis voor perfecte pasvorm",
    icon: <Ruler className="w-7 h-7" />,
    included: true,
  },
  {
    title: "Deskundig Advies",
    description: "Persoonlijk advies over kleuren, materialen en functionaliteit",
    icon: <Palette className="w-7 h-7" />,
    included: true,
  },
  {
    title: "Installatie Service",
    description: "Vakkundige montage door onze ervaren technici",
    icon: <Settings className="w-7 h-7" />,
    price: "€25 - €75",
  },
  {
    title: "5 Jaar Garantie",
    description: "Uitgebreide garantie op alle producten en werkmanschap",
    icon: <Shield className="w-7 h-7" />,
    included: true,
  },
];

const PrijzenPage = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (title: string) => {
    setExpandedCard(prev => prev === title ? null : title);
  };

  return (
    <PageLayout
      title="Prijzen & Collecties"
      subtitle="Raamdecoratie Prijsindicaties"
      description="Ontdek onze transparante prijsindicaties voor maatwerk raamdecoratie. Kwaliteit en vakmanschap tegen eerlijke prijzen."
      metaDescription="Transparante prijsindicaties voor maatwerk raamdecoratie. Rolgordijnen, plissé, overgordijnen, jaloezieën, lamellen en meer. Gratis opmeting en advies bij KANIOU Zilvernaald."
      breadcrumbs={[{ label: "Prijzen & Collecties" }]}
      showCTA={true}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-[#C8A85B]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#2C3E50] font-black mb-5 tracking-tight leading-tight">
              Onze <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">Raamdecoratie</span> Collectie
            </h2>
            <p className="text-lg text-[#2C3E50]/70 font-light leading-relaxed max-w-3xl mx-auto">
              Alle vermelde prijzen zijn richtprijzen inclusief BTW. De exacte prijs wordt bepaald na een gratis opmeting bij u thuis.
            </p>
          </div>

          {productCategories.map((cat, catIdx) => (
            <div key={catIdx} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] p-2.5 rounded-xl text-white shadow-md">
                  {cat.icon}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[#2C3E50] font-black tracking-tight">
                  {cat.category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[#C8A85B]/30 to-transparent ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                {cat.products.map((product, prodIdx) => {
                  const isExpanded = expandedCard === product.title;
                  return (
                    <div key={prodIdx} className="group relative">
                      <Card className={`bg-white rounded-2xl shadow-lg transition-all duration-300 border ${
                        product.popular 
                          ? 'border-[#C8A85B]/40 ring-1 ring-[#C8A85B]/20' 
                          : isExpanded
                            ? 'border-[#C8A85B]/50 shadow-xl ring-1 ring-[#C8A85B]/15'
                            : 'border-gray-100 hover:border-[#C8A85B]/30'
                      } ${!isExpanded ? 'hover:-translate-y-1' : ''}`}>
                        
                        {product.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Populair
                            </div>
                          </div>
                        )}
                        
                        <CardContent className="p-6">
                          <h4 className="font-display text-lg text-[#2C3E50] font-black mb-2 tracking-tight group-hover:text-[#C8A85B] transition-colors">
                            {product.title}
                          </h4>
                          
                          <p className="text-sm text-[#2C3E50]/65 leading-relaxed mb-4 min-h-[3rem]">
                            {product.description}
                          </p>
                          
                          <div className="bg-gradient-to-r from-[#C8A85B]/8 to-[#D4AF37]/8 rounded-xl p-3 mb-4">
                            <p className="text-[10px] uppercase tracking-widest text-[#2C3E50]/50 mb-1 font-semibold">Prijsindicatie {product.unit}</p>
                            <p className="font-display text-xl font-black text-[#C8A85B]">
                              {product.priceFrom} <span className="text-sm font-normal text-[#2C3E50]/40">-</span> {product.priceTo}
                            </p>
                          </div>
                          
                          <div className="space-y-2 mb-5">
                            {product.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-[#C8A85B] flex-shrink-0" />
                                <span className="text-xs text-[#2C3E50]/70">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            {product.hasCalculator ? (
                              <button
                                onClick={() => toggleCard(product.title)}
                                className="flex-1 flex items-center justify-center gap-1.5 border border-[#C8A85B]/30 text-[#C8A85B] hover:bg-[#C8A85B]/5 text-xs font-semibold rounded-lg py-2 px-3 transition-colors"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    Sluiten
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3 h-3" />
                                    Bekijken
                                  </>
                                )}
                              </button>
                            ) : (
                              <Link href={product.path} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full border-[#C8A85B]/30 text-[#C8A85B] hover:bg-[#C8A85B]/5 text-xs font-semibold rounded-lg">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Bekijken
                                </Button>
                              </Link>
                            )}
                            <Link href="/offerte">
                              <Button size="sm" className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] hover:from-[#B8975A] hover:to-[#C4A882] text-white text-xs font-semibold rounded-lg shadow-md">
                                <ArrowRight className="w-3 h-3" />
                              </Button>
                            </Link>
                          </div>

                          {product.hasCalculator && isExpanded && (
                            <InbetweensCalculator />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-[#FAFAF8]">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-black mb-5 tracking-tight">
              <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">Service</span> & Garantie
            </h2>
            <p className="text-lg text-[#2C3E50]/70 font-light leading-relaxed max-w-3xl mx-auto">
              Bij KANIOU krijgt u meer dan alleen een product. Ontdek onze uitgebreide service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-400 border border-gray-100 hover:border-[#C8A85B]/20 group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] p-3 rounded-xl inline-flex mb-5 shadow-md group-hover:scale-105 transition-transform">
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="font-display text-lg text-[#2C3E50] font-black mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-sm text-[#2C3E50]/65 leading-relaxed mb-4">{service.description}</p>
                  {service.included ? (
                    <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Inbegrepen
                    </div>
                  ) : (
                    <div className="bg-[#C8A85B]/10 text-[#C8A85B] px-3 py-1.5 rounded-full text-xs font-bold">
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
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-black mb-5 tracking-tight">
                Belangrijke <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">Prijsinformatie</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="bg-gradient-to-br from-[#C8A85B]/5 to-[#D4AF37]/5 border-[#C8A85B]/15 rounded-2xl">
                <CardContent className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-[#C8A85B]" />
                    <h3 className="font-display text-lg font-black text-[#2C3E50]">Wat bepaalt de prijs?</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {["Afmetingen van het raam", "Gekozen materiaal en afwerking", "Type bediening (handmatig/motorisch)", "Complexiteit van de montage"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#C8A85B] flex-shrink-0" />
                        <span className="text-sm text-[#2C3E50]/75">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#D4AF37]/5 to-[#C8A85B]/5 border-[#D4AF37]/15 rounded-2xl">
                <CardContent className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-display text-lg font-black text-[#2C3E50]">Altijd inbegrepen</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {["Gratis adviesgesprek", "Professionele opmeting", "Offerte op maat", "5 jaar garantie"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm text-[#2C3E50]/75">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-[#C8A85B]/8 via-[#D4AF37]/8 to-[#C8A85B]/8 rounded-xl p-5 text-center">
              <p className="text-sm text-[#2C3E50]/65 leading-relaxed">
                <strong className="text-[#2C3E50]/80">Let op:</strong> De vermelde prijzen zijn richtprijzen inclusief BTW. 
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
