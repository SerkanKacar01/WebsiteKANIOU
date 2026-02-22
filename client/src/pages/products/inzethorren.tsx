import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  CheckCircle, Ruler, Shield, Settings, Wind, Square,
  Palette, ArrowRight, Star, Wrench, Eye, Zap,
  Repeat, HandMetal, Sparkles, ThumbsUp
} from "lucide-react";

const voordelen = [
  {
    icon: Zap,
    title: "Montage Zonder Schroeven",
    description: "Inzethorren worden met veerclips in de sponning van het kozijn geklemd. Geen boren, geen schroeven, geen beschadiging aan uw kozijn – en toch een stevige bevestiging."
  },
  {
    icon: Repeat,
    title: "Eenvoudig Verwijderbaar",
    description: "In het voorjaar plaatsen, in het najaar verwijderen. Inzethorren zijn in enkele seconden in en uit te nemen, zonder gereedschap. Ideaal voor seizoensgebonden gebruik."
  },
  {
    icon: Wind,
    title: "Ongestoorde Ventilatie",
    description: "Het fijnmazige gaas houdt insecten effectief buiten terwijl frisse lucht vrijelijk kan doorstromen. Uw raam blijft volledig functioneel met de hor geplaatst."
  },
  {
    icon: Shield,
    title: "5 Jaar Garantie",
    description: "Elk product van KANIOU wordt geleverd met 5 jaar fabrieksgarantie. Dit geldt voor het aluminium frame, het gaas én de veerclips – complete zekerheid."
  },
  {
    icon: Palette,
    title: "Naadloze Integratie",
    description: "Het slanke aluminium profiel is verkrijgbaar in wit, crème, antraciet en zwart. Het frame verdwijnt visueel in het kozijn voor een strakke, onopvallende afwerking."
  },
  {
    icon: ThumbsUp,
    title: "Perfecte Pasvorm",
    description: "Elke inzethor wordt tot op de millimeter nauwkeurig op maat gemaakt voor uw specifieke kozijn. Geen standaardmaten – alleen maatwerk dat precies past."
  }
];

const geschiktVoor = [
  {
    title: "Draaikiepramen (kunststof)",
    description: "De meest voorkomende toepassing. Inzethorren passen perfect in de sponning van kunststof draaikiepramen en laten de kiepfunctie ongestoord werken.",
    geschikt: true
  },
  {
    title: "Draairamen (kunststof)",
    description: "Ook voor kunststof draairamen zijn inzethorren een uitstekende oplossing. Het frame wordt in de sponning geklemd en het raam kan normaal geopend worden.",
    geschikt: true
  },
  {
    title: "Aluminium kozijnen",
    description: "Veel aluminium kozijnen hebben een geschikte sponning voor inzethorren. Onze specialist controleert dit bij het inmeten ter plaatse.",
    geschikt: true
  },
  {
    title: "Houten kozijnen",
    description: "Bij houten kozijnen is een inzethor meestal niet mogelijk vanwege het ontbreken van een standaard sponning. Hier adviseren wij een opzethor als alternatief.",
    geschikt: false
  }
];

const specs = [
  { label: "Maximale breedte", value: "160 cm" },
  { label: "Maximale hoogte", value: "220 cm" },
  { label: "Framemateriaal", value: "Geanodiseerd aluminium" },
  { label: "Profielbreedte", value: "16 mm (slank profiel)" },
  { label: "Bevestiging", value: "Veerclips in sponning (schroefvrij)" },
  { label: "Gaastype", value: "Fiberglas standaard (poll/pet optioneel)" },
  { label: "Maaswijdte", value: "1,1 x 1,3 mm" },
  { label: "Standaardkleuren", value: "Wit, crème, antraciet, zwart" },
  { label: "Geschikt voor", value: "Kunststof draai-/kiepramen" },
  { label: "Garantie", value: "5 jaar fabrieksgarantie" },
];

const faq = [
  {
    vraag: "Kan ik mijn raam nog open en dicht doen met een inzethor?",
    antwoord: "Ja, absoluut. De inzethor zit in de sponning van het kozijn en blokkeert het raam niet. Bij draaikiepramen kunt u het raam normaal kiepen. Om het raam volledig te openen (draaistand), neemt u de hor eerst uit – dat is in één beweging gedaan."
  },
  {
    vraag: "Past een inzethor in elk raam?",
    antwoord: "Inzethorren zijn specifiek ontworpen voor kunststof en aluminium kozijnen met een standaard sponning. Bij houten kozijnen of atypische profielen adviseren wij een opzethor. Onze specialist controleert dit altijd bij het inmeten."
  },
  {
    vraag: "Hoe onderhoud ik mijn inzethor?",
    antwoord: "Heel eenvoudig: neem de hor uit het kozijn en was het gaas af met lauw water en een zachte borstel of spons. Het aluminium frame kunt u afnemen met een vochtige doek. Gebruik geen schurende middelen."
  },
  {
    vraag: "Kan ik de inzethor het hele jaar laten zitten?",
    antwoord: "Dat kan zeker. Het gaas en frame zijn UV-bestendig en weerbestendig. Veel klanten laten de horren het hele jaar zitten. Wilt u maximaal licht in de winter? Dan kunt u ze eenvoudig tijdelijk verwijderen en opbergen."
  }
];

export default function InzethorrenPage() {
  return (
    <PageLayout
      title="Inzethorren"
      subtitle="KANIOU Horren Collectie"
      description="De populairste en meest praktische horoplossing voor kunststof draaikiepramen. Inzethorren van KANIOU plaatst u zonder boren of schroeven – eenvoudig, snel en op maat."
      metaDescription="Inzethorren op maat van KANIOU Zilvernaald. Montage zonder schroeven, eenvoudig verwijderbaar, slank aluminium profiel. 5 jaar garantie, professioneel advies en montage."
      breadcrumbs={[{ label: "Producten" }, { label: "Horren", href: "/producten/horren" }, { label: "Inzethorren" }]}
    >
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#D5B992]/10 text-[#D5B992] text-sm font-medium tracking-wider uppercase rounded-full mb-6">
              Meest Populaire Keuze
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Wat is een <span className="font-medium italic text-[#D5B992]">inzethor</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Een inzethor is een lichtgewicht aluminium frame met insectenwerend gaas dat direct in de sponning van 
              uw raamkozijn wordt geklemd. Dankzij de veerclips zit de hor stevig vast zonder dat er geboord of 
              geschroefd hoeft te worden. Dit maakt de inzethor de meest populaire en praktische oplossing voor 
              kunststof draaikiepramen – eenvoudig te plaatsen, eenvoudig te verwijderen, en altijd een perfecte 
              pasvorm dankzij onze maatwerk-productie.
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
              Geschiktheid per <span className="font-medium italic text-[#D5B992]">kozijntype</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Inzethorren zijn niet voor elk kozijn geschikt. Hieronder vindt u een overzicht per type.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {geschiktVoor.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                  item.geschikt
                    ? "bg-white border-green-100 hover:border-green-200"
                    : "bg-white border-orange-100 hover:border-orange-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.geschikt ? "bg-green-100" : "bg-orange-100"
                  }`}>
                    {item.geschikt ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Square className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#2C3E50]">{item.title}</h3>
                  <span className={`ml-auto px-3 py-1 text-xs font-medium rounded-full ${
                    item.geschikt ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                  }`}>
                    {item.geschikt ? "Geschikt" : "Alternatief nodig"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-light mb-6">
              Zo werkt het: <span className="font-medium italic text-[#D5B992]">in 3 stappen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Inklemmen",
                  desc: "Plaats de inzethor in de sponning van het kozijn. De veerclips zorgen ervoor dat het frame stevig op zijn plaats klikt.",
                  icon: Sparkles
                },
                {
                  step: "2",
                  title: "Gebruiken",
                  desc: "Het raam functioneert normaal met de hor geplaatst. Kiep het raam voor ventilatie of neem de hor uit om het raam volledig te openen.",
                  icon: Wind
                },
                {
                  step: "3",
                  title: "Verwijderen",
                  desc: "Druk de veerclips in en neem de hor uit het kozijn. Berg hem op in de winter of laat hem het hele jaar zitten – u kiest.",
                  icon: Repeat
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-medium text-[#D5B992] mb-2">Stap {item.step}</div>
                  <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
              Veelgestelde <span className="font-medium italic text-[#D5B992]">Vragen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="bg-[#faf8f5] rounded-xl p-6 hover:bg-[#f5f0ea] transition-colors duration-300">
                <h3 className="font-display text-lg font-semibold text-[#2C3E50] mb-3">{item.vraag}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.antwoord}</p>
              </div>
            ))}
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
              { step: "01", title: "Adviesgesprek", desc: "Gratis thuisbezoek om uw ramen te bekijken en de geschiktheid voor inzethorren te beoordelen", icon: Eye },
              { step: "02", title: "Inmeten", desc: "Wij meten elke sponning nauwkeurig op – tot op de millimeter voor een perfecte pasvorm", icon: Ruler },
              { step: "03", title: "Productie", desc: "Uw inzethorren worden op maat gemaakt in onze werkplaats met het door u gekozen gaas", icon: Settings },
              { step: "04", title: "Levering & Uitleg", desc: "Wij leveren uw horren aan huis en tonen u hoe u ze eenvoudig plaatst en verwijdert", icon: Wrench },
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
              Klaar voor inzethorren op maat?
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Vraag vrijblijvend een offerte aan of plan een gratis inmeetafspraak. 
              Onze specialist komt bij u thuis om de geschiktheid te controleren en u persoonlijk te adviseren.
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