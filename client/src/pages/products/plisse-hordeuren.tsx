import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  DoorOpen, CheckCircle, Ruler, Shield, Settings, Wind,
  Maximize2, MinusCircle, Palette, ArrowRight, Star, Wrench,
  Home, Building2, Zap, Eye
} from "lucide-react";

const voordelen = [
  {
    icon: Maximize2,
    title: "Ruimtebesparend Design",
    description: "Het plisségaas vouwt elegant samen tot een compact pakket van slechts enkele centimeters, waardoor uw deuropening maximaal vrij blijft."
  },
  {
    icon: Wind,
    title: "Optimale Ventilatie",
    description: "Geniet van frisse lucht zonder ongewenste insecten. Het fijnmazige gaas houdt zelfs de kleinste insecten buiten terwijl de luchtdoorstroming behouden blijft."
  },
  {
    icon: DoorOpen,
    title: "Soepele Bediening",
    description: "Dankzij het geavanceerde geleiderailsysteem schuift de plissé hordeur moeiteloos open en dicht, zonder haperen of weerstand."
  },
  {
    icon: Shield,
    title: "5 Jaar Garantie",
    description: "KANIOU staat achter de kwaliteit van elke hordeur. Wij bieden standaard 5 jaar fabrieksgarantie op het complete systeem inclusief frame, gaas en mechaniek."
  },
  {
    icon: Palette,
    title: "Op Maat & In Kleur",
    description: "Elke plissé hordeur wordt op de millimeter nauwkeurig geproduceerd en is leverbaar in diverse RAL-kleuren die perfect aansluiten bij uw kozijn."
  },
  {
    icon: MinusCircle,
    title: "Drempelvrije Optie",
    description: "Beschikbaar met een vlakke ondergeleiding, ideaal voor rolstoelgebruikers en om struikelgevaar te voorkomen – toegankelijkheid zonder concessies."
  }
];

const toepassingen = [
  {
    icon: Home,
    title: "Schuifpuien",
    description: "De meest populaire toepassing. Plissé hordeuren zijn de perfecte oplossing voor brede schuifpuideuren, beschikbaar in enkel- en dubbelzijdige uitvoering."
  },
  {
    icon: DoorOpen,
    title: "Balkon- & Terrasdeuren",
    description: "Houd insecten buiten terwijl u vrij in en uit kunt lopen. Het compacte systeem past op vrijwel elke balkondeur of terrasdeur."
  },
  {
    icon: Building2,
    title: "Openslaande Deuren",
    description: "Ook voor Franse deuren en openslaande tuindeuren bieden wij op maat gemaakte plissé hordeuren met perfecte afdichting."
  },
  {
    icon: Zap,
    title: "Extra Brede Openingen",
    description: "Met onze dubbelzijdige plissé hordeur overbruggen we openingen tot 5 meter breed – ideaal voor grote schuifpuisystemen en vouwwanden."
  }
];

const specs = [
  { label: "Maximale breedte (enkel)", value: "250 cm" },
  { label: "Maximale breedte (dubbel)", value: "500 cm" },
  { label: "Maximale hoogte", value: "260 cm" },
  { label: "Framemateriaal", value: "Geanodiseerd aluminium" },
  { label: "Gaastype", value: "Fiberglas plisségaas" },
  { label: "Maaswijdte", value: "1,0 x 1,2 mm" },
  { label: "Kleuren frame", value: "Wit, crème, antraciet, zwart, RAL op aanvraag" },
  { label: "Geleiding", value: "Boven- en ondergeleiderail" },
  { label: "Garantie", value: "5 jaar fabrieksgarantie" },
];

export default function PlisseHordeurenPage() {
  return (
    <PageLayout
      title="Plissé Hordeuren"
      subtitle="KANIOU Horren Collectie"
      description="De stijlvolle en ruimtebesparende oplossing voor uw schuifpuien, balkondeuren en terrasdeuren. Plissé hordeuren van KANIOU combineren verfijnd design met maximale insectenbescherming."
      metaDescription="Plissé hordeuren op maat van KANIOU Zilvernaald. Ruimtebesparend, soepele bediening, drempelvrije optie. Tot 5m breed. 5 jaar garantie, professionele montage in Limburg en omstreken."
      breadcrumbs={[{ label: "Producten" }, { label: "Horren", href: "/producten/horren" }, { label: "Plissé Hordeuren" }]}
    >
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#D5B992]/10 text-[#D5B992] text-sm font-medium tracking-wider uppercase rounded-full mb-6">
              Premium Insectenwering
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Wat is een <span className="font-medium italic text-[#D5B992]">plissé hordeur</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Een plissé hordeur is een modern insectenwering-systeem waarbij het gaas in een harmonica-achtige plooistructuur 
              is gevouwen. Dit unieke ontwerp maakt het mogelijk om de deur volledig open te schuiven tot een compact pakket 
              van slechts enkele centimeters. Geen oprolmechanisme, geen scharnieren – alleen een elegant, ruimtebesparend 
              systeem dat naadloos integreert met uw deuropening.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voordelen.map((item, index) => (
              <Card key={index} className="group border-0 shadow-md hover:shadow-xl transition-all duration-500 bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D5B992]/20 to-[#E6C988]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-7 w-7 text-[#D5B992]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#2C3E50] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#faf8f5] to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Enkel of <span className="font-medium italic text-[#D5B992]">dubbel</span> systeem
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Afhankelijk van de breedte van uw deuropening adviseren wij een enkel of dubbel plissé systeem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="absolute -top-4 left-8">
                <span className="px-4 py-2 bg-[#2C3E50] text-white text-sm font-medium rounded-full">Enkelvoudig</span>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-2xl font-semibold text-[#2C3E50] mb-4">Enkel Plissé Systeem</h3>
                <p className="text-gray-600 mb-6">
                  Eén plisségaas dat van de ene zijde naar de andere schuift. Ideaal voor standaard deuropeningen tot 250 cm breed.
                </p>
                <ul className="space-y-3">
                  {["Tot 250 cm breed", "Eénzijdige bediening", "Compact opgevouwen: ±5 cm", "Ideaal voor balkondeuren"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-[#D5B992] flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-[#D5B992]">
              <div className="absolute -top-4 left-8">
                <span className="px-4 py-2 bg-[#D5B992] text-white text-sm font-medium rounded-full">Meest Gekozen</span>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-2xl font-semibold text-[#2C3E50] mb-4">Dubbel Plissé Systeem</h3>
                <p className="text-gray-600 mb-6">
                  Twee plisségaazen die vanuit het midden naar beide zijden openen. De perfecte oplossing voor brede schuifpuien.
                </p>
                <ul className="space-y-3">
                  {["Tot 500 cm breed", "Tweezijdige bediening", "Symmetrisch openvouwend", "Ideaal voor schuifpuien"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-[#D5B992] flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Toepassingen & <span className="font-medium italic text-[#D5B992]">Mogelijkheden</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {toepassingen.map((item, index) => (
              <div key={index} className="flex gap-5 p-6 rounded-xl bg-[#faf8f5] hover:bg-[#f5f0ea] transition-colors duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <item.icon className="h-6 w-6 text-[#D5B992]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#2C3E50] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-[#2C3E50]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6">
              Technische <span className="font-medium italic text-[#D5B992]">Specificaties</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-8 py-4 ${index !== specs.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <span className="text-white/80 text-sm">{spec.label}</span>
                  <span className="text-white font-medium text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Onze <span className="font-medium italic text-[#D5B992]">Werkwijze</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Van eerste contact tot perfecte montage – wij begeleiden u bij elke stap.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Adviesgesprek", desc: "Gratis thuisconsultatie om uw wensen en de mogelijkheden te bespreken", icon: Eye },
              { step: "02", title: "Inmeten", desc: "Onze specialist neemt exact de maten op bij u thuis voor een perfecte pasvorm", icon: Ruler },
              { step: "03", title: "Productie", desc: "Uw plissé hordeur wordt op maat geproduceerd met de door u gekozen specificaties", icon: Settings },
              { step: "04", title: "Montage", desc: "Professionele installatie door ons eigen montageteam, netjes en zonder schade", icon: Wrench },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="text-5xl font-display font-bold text-[#D5B992]/15 mb-4">{item.step}</div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#2C3E50] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2C3E50] to-[#1a252f]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Star className="h-10 w-10 text-[#D5B992] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white font-light mb-6">
              Interesse in een plissé hordeur op maat?
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Vraag vrijblijvend een offerte aan of maak een afspraak voor een gratis inmeetservice bij u thuis. 
              Wij adviseren u graag over de beste oplossing voor uw situatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-[#D5B992] hover:bg-[#c5a97d] text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer">
                  Offerte Aanvragen
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer">
                  Contact Opnemen
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}