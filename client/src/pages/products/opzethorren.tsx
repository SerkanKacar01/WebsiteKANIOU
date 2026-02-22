import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  CheckCircle, Ruler, Shield, Settings, Wind, Square,
  Palette, ArrowRight, Star, Wrench, Eye, Layers,
  Frame, Lock, Sun, Droplets
} from "lucide-react";

const voordelen = [
  {
    icon: Frame,
    title: "Vast Gemonteerd Frame",
    description: "De opzethor wordt stevig op het kozijn bevestigd met een duurzaam aluminium frame. Eenmaal geplaatst, zit het vast en biedt permanente bescherming tegen insecten."
  },
  {
    icon: Wind,
    title: "Ongehinderde Ventilatie",
    description: "Het fijnmazige gaas laat frisse lucht vrijelijk doorstromen terwijl het zelfs de kleinste insecten, pollen en stof effectief buitenhoudt."
  },
  {
    icon: Lock,
    title: "Stevige Bevestiging",
    description: "Door middel van schroefbevestiging op het kozijn zit de opzethor rotsvast. Geschikt voor ramen zonder draaifunctie en vaste raampartijen."
  },
  {
    icon: Shield,
    title: "5 Jaar Garantie",
    description: "Al onze opzethorren worden geleverd met 5 jaar fabrieksgarantie op frame, gaas en montageonderdelen. Kwaliteit die u kunt vertrouwen."
  },
  {
    icon: Palette,
    title: "Kleur op Maat",
    description: "Verkrijgbaar in standaardkleuren wit, crème, antraciet en zwart, of in elke gewenste RAL-kleur voor een naadloze integratie met uw gevel."
  },
  {
    icon: Sun,
    title: "UV- & Weerbestendig",
    description: "Onze opzethorren zijn vervaardigd uit materialen die bestand zijn tegen zonlicht, regen en temperatuurschommelingen – jarenlang zonder onderhoud."
  }
];

const gaasTypes = [
  {
    title: "Standaard Fiberglas",
    description: "Het meest gekozen gaas voor dagelijks gebruik. Uitstekende luchtdoorstroming, goede zichtbaarheid en zeer duurzaam.",
    features: ["Lichtdoorlatend", "Onderhoudsarm", "Kostenefficiënt"]
  },
  {
    title: "Pollengaas",
    description: "Speciaal fijnmazig gaas dat naast insecten ook pollen en fijnstof tegenhoudt. Ideaal voor hooikoortslijders en mensen met luchtwegklachten.",
    features: ["Pollenwerend", "Anti-allergeen", "Fijnmazig weefsel"]
  },
  {
    title: "Pet Screen",
    description: "Extra sterk gaas dat bestand is tegen krabben van huisdieren. Verstevigd polyester weefsel dat niet scheurt of uitrekt.",
    features: ["Krasbestendig", "Extra sterk", "Huisdiervriendelijk"]
  },
  {
    title: "RVS Gaas",
    description: "Roestvrijstalen gaas voor maximale duurzaamheid en veiligheid. Onverwoestbaar en biedt tevens inbraakwering.",
    features: ["Onverwoestbaar", "Inbraakwerend", "Levenslange duurzaamheid"]
  }
];

const specs = [
  { label: "Maximale breedte", value: "200 cm" },
  { label: "Maximale hoogte", value: "250 cm" },
  { label: "Framemateriaal", value: "Geanodiseerd aluminium" },
  { label: "Framedikte", value: "20 mm / 25 mm / 32 mm" },
  { label: "Gaasopties", value: "Fiberglas, pollen, pet screen, RVS" },
  { label: "Standaardkleuren", value: "Wit, crème, antraciet, zwart" },
  { label: "Montage", value: "Opbouw op kozijn (schroefbevestiging)" },
  { label: "Geschikt voor", value: "Vaste ramen, kiepramen, draairamen" },
  { label: "Garantie", value: "5 jaar fabrieksgarantie" },
];

export default function OpzethorrenPage() {
  return (
    <PageLayout
      title="Opzethorren"
      subtitle="KANIOU Horren Collectie"
      description="De klassieke en betrouwbare insectenwering voor vaste montage op uw kozijn. Opzethorren van KANIOU bieden permanente bescherming met een strak en onopvallend design."
      metaDescription="Opzethorren op maat van KANIOU Zilvernaald. Vaste montage op kozijn, diverse gaasopties inclusief pollengaas. 5 jaar garantie, professionele montage in België."
      breadcrumbs={[{ label: "Producten" }, { label: "Horren", href: "/producten/horren" }, { label: "Opzethorren" }]}
    >
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#D5B992]/10 text-[#D5B992] text-sm font-medium tracking-wider uppercase rounded-full mb-6">
              Betrouwbare Bescherming
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Wat is een <span className="font-medium italic text-[#D5B992]">opzethor</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Een opzethor is een vast horrenframe dat op de buitenzijde van het kozijn wordt gemonteerd. 
              Het aluminium frame wordt met schroeven bevestigd en vormt een permanente barrière tegen insecten. 
              Dit type hor is bijzonder geschikt voor ramen waar een inzethor niet mogelijk is, bijvoorbeeld bij 
              ramen zonder draaifunctie of ramen met een onregelmatig kozijnprofiel. De opzethor biedt een strakke, 
              professionele uitstraling en is verkrijgbaar met diverse gaassoorten voor specifieke behoeften.
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
              Gaassoorten & <span className="font-medium italic text-[#D5B992]">Toepassingen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Kies het gaas dat het beste past bij uw situatie. Van standaard insectenwering tot gespecialiseerde oplossingen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {gaasTypes.map((gaas, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-[#D5B992]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#D5B992]/10 rounded-xl flex items-center justify-center">
                    <Layers className="h-5 w-5 text-[#D5B992]" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#2C3E50]">{gaas.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{gaas.description}</p>
                <div className="flex flex-wrap gap-2">
                  {gaas.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1 bg-[#faf8f5] text-[#2C3E50] text-xs font-medium rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Wanneer een <span className="font-medium italic text-[#D5B992]">opzethor</span> kiezen?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-4">Ideaal voor:</h3>
                {[
                  "Ramen zonder draaifunctie (vast glas)",
                  "Ramen met onregelmatige kozijnprofielen",
                  "Houten kozijnen waar inklemmen niet kan",
                  "Situaties waar permanente montage gewenst is",
                  "Combinatie met pollengaas of pet screen",
                  "Ramen op moeilijk bereikbare plaatsen"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#D5B992] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#faf8f5] rounded-2xl p-8">
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-4">Opzethor vs. Inzethor</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50] mb-1">Montage</p>
                    <p className="text-gray-600 text-sm">Opzethor: op het kozijn met schroeven. Inzethor: in het kozijn met veerclips (schroefvrij).</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50] mb-1">Geschiktheid</p>
                    <p className="text-gray-600 text-sm">Opzethor: alle raamtypen. Inzethor: alleen kunststof draaikiepramen met standaard sponning.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50] mb-1">Verwijderbaarheid</p>
                    <p className="text-gray-600 text-sm">Opzethor: semi-permanent. Inzethor: eenvoudig in en uit te nemen zonder gereedschap.</p>
                  </div>
                </div>
              </div>
            </div>
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
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Adviesgesprek", desc: "Wij komen gratis bij u langs om de mogelijkheden te bekijken en u te adviseren", icon: Eye },
              { step: "02", title: "Inmeten", desc: "Onze vakman meet elk raam nauwkeurig op voor een perfecte pasvorm", icon: Ruler },
              { step: "03", title: "Productie", desc: "Uw opzethorren worden op maat gemaakt met het door u gekozen gaas en kleur", icon: Settings },
              { step: "04", title: "Montage", desc: "Professionele plaatsing door ons eigen team – netjes, snel en zonder schade", icon: Wrench },
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
              Interesse in opzethorren op maat?
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Neem contact op voor een vrijblijvend adviesgesprek of vraag direct een offerte aan. 
              Wij helpen u graag bij het kiezen van de juiste hor en het juiste gaas voor uw situatie.
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