import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  Sun,
  Maximize2,
  Home,
  Palette,
  Eye,
  ChevronRight,
  CheckCircle,
  Clock,
  Award,
  MapPin,
  ShieldCheck,
  Ruler,
  MessageCircle,
  FileText,
  Settings,
  Wrench,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/container";
import PageLayout from "@/components/layout/PageLayout";

const procesSteps = [
  { icon: MessageCircle, title: "Kennismakingsgesprek en advies", desc: "Persoonlijke bespreking van uw wensen en interieurstijl" },
  { icon: Ruler, title: "Gratis opmeting ter plaatse", desc: "Nauwkeurige meting van al uw ramen" },
  { icon: FileText, title: "Heldere offerte op maat", desc: "Transparante prijsopgave zonder verrassingen" },
  { icon: Settings, title: "Productie in premium materialen", desc: "Vakkundige vervaardiging met zorg voor detail" },
  { icon: Wrench, title: "Professionele installatie", desc: "Perfecte montage door onze specialisten" },
  { icon: HeartHandshake, title: "Nazorg en kwaliteitsgarantie", desc: "Duurzame tevredenheid gegarandeerd" },
];

const adviesItems = [
  { icon: Sun, label: "Lichtinval en oriëntatie" },
  { icon: Maximize2, label: "Raamtypes en technische mogelijkheden" },
  { icon: Home, label: "Plafondhoogte en architectuur" },
  { icon: Palette, label: "Interieurstijl en kleurharmonie" },
  { icon: Eye, label: "Privacy- en verduisteringsbehoefte" },
];

const producten = [
  "Overgordijnen, vitrages en inbetweens",
  "Rolgordijnen en duo rolgordijnen",
  "Plissés en duo plissés",
  "Houten en aluminium jaloezieën",
  "Binnen- en buitenzonwering",
];

const voordelen = [
  { icon: Award, text: "Meer dan 30 jaar ervaring in raamdecoratie" },
  { icon: Ruler, text: "Gratis en nauwkeurige inmeting" },
  { icon: CheckCircle, text: "Persoonlijke begeleiding van A tot Z" },
  { icon: MapPin, text: "Showroom in Maasmechelen" },
  { icon: ShieldCheck, text: "Kwaliteitsgarantie op alle producten" },
];

const faqItems = [
  {
    q: "Wat kost raamdecoratie op maat?",
    a: "De prijs hangt af van het gekozen product, de stof en de afmetingen. Na opmeting ontvangt u een duidelijke offerte zonder verrassingen.",
  },
  {
    q: "Is de inmeting gratis?",
    a: "Ja, wij bieden een gratis en vrijblijvende opmeting aan.",
  },
  {
    q: "Hoe lang duurt de productie?",
    a: "De productietijd varieert per producttype. Tijdens het adviesgesprek ontvangt u een realistische planning.",
  },
];

const OpMaatAdviesPage = () => {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageLayout
      title="Op Maat & Advies"
      subtitle="Persoonlijk Interieuradvies"
      description="Professioneel advies en maatwerk tot in detail — afgestemd op uw ruimte, stijl en wensen."
      metaDescription="Professioneel interieuradvies en raamdecoratie op maat in Maasmechelen. Gratis inmeting, premium stoffen en volledige begeleiding van ontwerp tot plaatsing."
      breadcrumbs={[{ label: "Op Maat & Advies" }]}
      showCTA={false}
    >
      <Helmet>
        <title>Raamdecoratie op maat & professioneel interieuradvies | KANIOU Maasmechelen</title>
        <meta name="description" content="Professioneel interieuradvies en raamdecoratie op maat in Maasmechelen. Gratis inmeting, premium stoffen en volledige begeleiding van ontwerp tot plaatsing." />
      </Helmet>

      {/* H1 + Intro */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-[#2C3E50] mb-8 leading-tight">
              Raamdecoratie op maat met persoonlijk interieuradvies
            </h1>
            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                Raamdecoratie bepaalt de sfeer, lichtbeleving en uitstraling van uw volledige interieur. Daarom kiest u bij KANIOU niet voor standaardoplossingen, maar voor <strong className="text-[#2C3E50]">professioneel advies en maatwerk tot in detail</strong>.
              </p>
              <p>
                Wij begeleiden u persoonlijk bij het kiezen van de juiste gordijnen, zonwering of raamafwerking — afgestemd op uw ruimte, stijl en functionele wensen.
              </p>
              <p className="text-[#C4A36C] font-semibold">
                Van eerste consultatie tot perfecte plaatsing: elk project wordt met zorg en expertise uitgevoerd.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* H2 - Persoonlijk interieuradvies */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#C4A36C] rounded-full"></div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C4A36C]">Advies aan huis</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
              Persoonlijk interieuradvies bij u thuis
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-3xl">
              Onze adviseurs nemen uitgebreid de tijd om uw ruimte te analyseren. Wij bekijken onder andere:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {adviesItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C4A36C]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#C4A36C]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#C4A36C]" />
                  </div>
                  <span className="text-[14px] font-medium text-[#2C3E50]">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-600 text-base leading-relaxed">
                Tijdens dit bezoek ontvangt u professioneel kleur- en stofadvies en meten wij uw ramen nauwkeurig op.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                De inmeting is volledig vrijblijvend
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* H2 - Hoogwaardig maatwerk */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#C4A36C] rounded-full"></div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C4A36C]">Maatwerk</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
              Hoogwaardig maatwerk zonder compromissen
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-3xl">
              Elke raamdecoratie wordt volledig op maat geproduceerd. Dit garandeert een perfecte pasvorm, strakke afwerking en duurzame kwaliteit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {producten.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-[#C4A36C]/5 transition-colors duration-200">
                  <ChevronRight className="w-4 h-4 text-[#C4A36C] flex-shrink-0" />
                  <span className="text-[15px] text-[#2C3E50]">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-base mb-6">
              U kiest uit honderden stoffen, structuren en kleuren. Wij zorgen voor een technisch correcte uitvoering en hoogwaardige afwerking.
            </p>

            <div className="flex flex-wrap gap-4">
              {["Geen standaardmaten", "Geen concessies", "Enkel maatwerk"].map((t) => (
                <span key={t} className="px-5 py-2.5 bg-[#2C3E50] text-white text-[12px] font-bold tracking-[0.1em] uppercase rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* H2 - Transparant proces */}
      <section className="py-16 lg:py-20 bg-[#0f172a]">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#C4A36C] rounded-full"></div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C4A36C]">Ons Proces</span>
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                Transparant proces van ontwerp tot plaatsing
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Bij KANIOU hanteren wij een duidelijke en professionele werkwijze:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {procesSteps.map((step, idx) => (
                <div key={step.title} className="group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#C4A36C]/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#C4A36C]/20 flex items-center justify-center text-[#C4A36C] text-sm font-bold">
                      {idx + 1}
                    </div>
                    <step.icon className="w-5 h-5 text-[#C4A36C]" />
                  </div>
                  <h3 className="text-white font-semibold text-[15px] mb-2">{step.title}</h3>
                  <p className="text-white/50 text-[13px]">{step.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-white/40 text-sm mt-10">
              Deze gestructureerde aanpak zorgt voor rust, duidelijkheid en een duurzaam eindresultaat.
            </p>
          </div>
        </Container>
      </section>

      {/* H2 - Waarom KANIOU */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#C4A36C] rounded-full"></div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C4A36C]">Onze kracht</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#2C3E50] mb-10">
              Waarom kiezen voor maatwerk van KANIOU?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {voordelen.map((v) => (
                <div key={v.text} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[#C4A36C]/10 flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-5 h-5 text-[#C4A36C]" />
                  </div>
                  <p className="text-[14px] font-medium text-[#2C3E50] pt-2">{v.text}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-base italic">
              Wij combineren vakmanschap met esthetiek en technische precisie.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#C4A36C] rounded-full"></div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C4A36C]">FAQ</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#2C3E50]">
                Veelgestelde vragen over raamdecoratie op maat
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <span className="text-[15px] font-semibold text-[#2C3E50] pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#C4A36C] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? "max-h-40 pb-5" : "max-h-0"}`}>
                    <p className="px-5 text-gray-600 text-[14px] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Block */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2C3E50] to-[#1a2332]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
              Klaar om uw project professioneel aan te pakken?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Ontvang persoonlijk advies, een nauwkeurige opmeting en een offerte op maat — volledig afgestemd op uw interieur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => setLocation("/afspraak")}
                className="px-8 py-3.5 bg-[#C4A36C] hover:bg-[#D5B992] text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Plan een adviesgesprek
              </button>
              <button
                onClick={() => setLocation("/offerte")}
                className="px-8 py-3.5 border-2 border-white/30 hover:border-white text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                Vraag een offerte aan
              </button>
            </div>

            <p className="text-white/40 text-sm">
              Of bezoek onze showroom in Maasmechelen voor inspiratie en deskundige begeleiding.
            </p>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default OpMaatAdviesPage;
