import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Sun,
  Eye,
  Thermometer,
  Building2,
  Home,
  Bed,
  Square,
  AlertTriangle,
  Sparkles,
  Shield,
  HelpCircle,
  Zap,
  Wind,
  Settings,
  Cog,
} from "lucide-react";

import heroImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.44_1765238134792.png";
import motorizedImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.51_1765238134792.png";
import skyZipImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.59_1765238134791.png";
import manualImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.07_1765238134792.png";
import colorImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.13_1765238134792.png";
import soltis92Image from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.20_1765238134791.png";
import soltis86Image from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.26_1765238134791.png";
import serge600Image from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.33_1765238134792.png";
import petScreenImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.39_1765238134792.png";
import technicalImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.46_1765238134791.png";
import applicationsImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.35.04_1765238134792.png";

const ScreensOutsidePage = () => {
  const benefits = [
    {
      icon: <Thermometer className="h-8 w-8 text-red-500" />,
      title: "Extreem hoge warmtewering (tot ± 90%)",
      description: "Perfect voor zuid- en westgevels met veel zon. Blokkeert de warmte voordat deze het glas bereikt.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-[#C4A35A]" />,
      title: "Strakke, moderne gevellook",
      description: "Screens sluiten mooi aan op elke gevel en verhogen de esthetische waarde van de woning.",
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-500" />,
      title: "Privacy overdag",
      description: "U kijkt naar buiten, maar voorbijgangers kunnen niet naar binnen kijken. (Bij avondverlichting is inkijk wél mogelijk.)",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-500" />,
      title: "Energiebesparing",
      description: "Minder airco nodig, beter binnenklimaat. Vermindert uw energiekosten aanzienlijk.",
    },
    {
      icon: <Square className="h-8 w-8 text-indigo-500" />,
      title: "Ideaal voor grote ramen",
      description: "Perfect voor grote ramen, schuiframen en veranda's. Screens blijven strak hangen en zijn zeer duurzaam.",
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      title: "Beschermt uw interieur",
      description: "Voorkomt verkleuring van meubels en vloeren door UV-straling.",
    },
  ];

  const zipBenefits = [
    "Geen klapperend doek bij wind",
    "Geen lichtspleten aan de zijkanten",
    "Strakkere afwerking",
    "Hogere windbestendigheid",
    "Perfecte pasvorm, ook voor grote ramen",
  ];

  const suitableSpaces = [
    {
      icon: <Square className="h-6 w-6 text-[#C4A35A]" />,
      title: "Grote glaspartijen",
    },
    {
      icon: <Building2 className="h-6 w-6 text-[#C4A35A]" />,
      title: "Moderne nieuwbouw",
    },
    {
      icon: <Sun className="h-6 w-6 text-[#C4A35A]" />,
      title: "Zuid/west georiënteerde gevels",
    },
    {
      icon: <Bed className="h-6 w-6 text-[#C4A35A]" />,
      title: "Slaapkamers die te warm worden",
    },
    {
      icon: <Home className="h-6 w-6 text-[#C4A35A]" />,
      title: "Tuinkamers, veranda's en serres",
    },
  ];

  const limitations = [
    "Geen 100% verduistering",
    "Minder privacy in de avond",
    "Stormweer → screens soms omhoog voor veiligheid",
    "Buitenmontage niet altijd toegestaan in appartementen (VME afhankelijk)",
  ];

  const faqs = [
    {
      question: "Hoeveel warmte weren buitenscreens?",
      answer: "Buitenscreens kunnen tot ± 90% van de warmte weren. Doordat ze aan de buitenzijde van het raam worden geplaatst, blokkeren ze de warmte nog vóór deze het glas bereikt. Dit is veel effectiever dan binnenzonwering.",
    },
    {
      question: "Wat zijn ZIP-screens?",
      answer: "ZIP-screens hebben een ritssysteem dat het doek opspant in de geleiders. Dit zorgt voor een strakkere afwerking, hogere windbestendigheid, geen lichtspleten aan de zijkanten en geen klapperend doek bij wind.",
    },
    {
      question: "Kunnen buitenscreens tegen wind?",
      answer: "Ja, vooral ZIP-screens zijn zeer windbestendig dankzij het ritssysteem. Bij extreme stormweer adviseren we wel om de screens omhoog te doen voor de veiligheid.",
    },
    {
      question: "Bieden buitenscreens privacy?",
      answer: "Overdag bieden buitenscreens uitstekende privacy - u kijkt naar buiten, maar voorbijgangers kunnen niet naar binnen kijken. Let op: 's avonds bij binnenverlichting is inkijk wel mogelijk.",
    },
    {
      question: "Mag ik buitenscreens plaatsen in een appartement?",
      answer: "Dit is afhankelijk van de VME (Vereniging van Mede-Eigenaars). In sommige gebouwen is buitenmontage niet toegestaan. Wij adviseren u om dit eerst na te vragen bij uw VME.",
    },
  ];

  return (
    <PageLayout
      title="Buitenscreens"
      subtitle="KANIOU Collectie"
      description="Onze screens voor buiten zijn de meest effectieve oplossing tegen oververhitting en fel zonlicht. Doordat ze aan de buitenzijde van het raam worden geplaatst, blokkeren buitenscreens de warmte nog vóór deze het glas bereikt."
      metaDescription="Onze buitenscreens zijn de meest effectieve oplossing tegen oververhitting. Tot 90% warmtewering, moderne uitstraling en energiebesparing. Perfect voor nieuwbouw en grote ramen."
      breadcrumbs={[{ label: "Producten" }, { label: "Buitenscreens" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Voordelen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">buitenscreens</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-[#2C3E50] text-xl mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Bedieningssystemen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Kies uw <span className="font-medium italic text-[#D5B992]">bedieningsoptie</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="relative overflow-hidden bg-gray-100">
                <img 
                  src={motorizedImage} 
                  alt="Motorized ZIP Screen Systems" 
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#C4A35A]/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#C4A35A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">Gemotoriseerd</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Gemotoriseerde ZIP screen systemen bieden een moderne zonweringsoplossing die zowel comfort als stijl verbetert. Compatibel met Google Home, Amazon Alexa en Tuya Smart.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="relative overflow-hidden bg-gray-100">
                <img 
                  src={skyZipImage} 
                  alt="SkyZIP Horizontal Shading System" 
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">SkyZip</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  SkyZip is een gemotoriseerd ZIP screen systeem ontworpen voor horizontale zonweringstoepassingen. Ideaal voor serres, pergola's, dakramen en terras daken.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="relative overflow-hidden bg-gray-100">
                <img 
                  src={manualImage} 
                  alt="Manual ZIP Screen Systems" 
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Cog className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">Manueel</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Manuele ZIP systemen bieden een kosteneffectieve oplossing met behoud van de kernvoordelen van ZIP technologie — hoge windweerstand en doekspanning.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Premium Keuze</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                ZIP-Screens – De Premium Keuze
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Onze ZIP-screens hebben een ritssysteem dat het doek opspant in de geleiders. 
                Dit innovatieve systeem biedt superieure prestaties en een perfecte afwerking.
              </p>
              
              <div className="space-y-4">
                {zipBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-[#f8f6f0] shadow-sm rounded-xl"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-[#2C3E50] font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#C4A35A] to-[#B39245] rounded-3xl p-8 text-white">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full opacity-10 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl"></div>
                
                <div className="relative z-10">
                  <Wind className="h-12 w-12 text-white/90 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Maximale Windbestendigheid</h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    Het ZIP-ritssysteem zorgt ervoor dat het doek perfect gespannen blijft, 
                    zelfs bij sterke wind. Geen fladderend doek, geen lichtspleten, alleen 
                    een strakke en professionele afwerking.
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">10 jaar garantie op alle onderdelen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Stoffencollectie</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Premium <span className="font-medium italic text-[#D5B992]">Fabric Types</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Onze screens zijn verkrijgbaar in verschillende hoogwaardige doektypes, elk met unieke eigenschappen voor optimale zonwering en duurzaamheid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img src={soltis92Image} alt="Soltis 92 - Serge Ferrari" className="w-full h-auto" />
            </div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img src={soltis86Image} alt="Soltis 86 - Serge Ferrari" className="w-full h-auto" />
            </div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img src={serge600Image} alt="Serge 600 - Copaco Screenweavers" className="w-full h-auto" />
            </div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img src={petScreenImage} alt="PET Screen" className="w-full h-auto" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Kleuren</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Volledige RAL Kleurencollectie
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Alle ZIP systemen zijn verkrijgbaar in het volledige assortiment van RAL Classic kleuren. Standaard architecturale tinten zoals RAL 7016, RAL 9005 en RAL 9016 worden veel gebruikt in moderne geveltoepassingen.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aangepaste kleuropties zorgen voor naadloze integratie met elk exterieur design of materiaal palet.
              </p>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img src={colorImage} alt="RAL Color Options" className="w-full h-auto" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Technische Details</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Professionele <span className="font-medium italic text-[#D5B992]">Afwerking</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
            <img src={technicalImage} alt="Technical Details" className="w-full h-auto" />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden">
        <img src={applicationsImage} alt="Screen Applications" className="w-full h-auto" />
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Toepassingen</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Waar worden buitenscreens meestal geplaatst?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Buitenscreens zijn ideaal voor woningen met veel glasoppervlak of gevels die op het zuiden of westen gericht zijn.
              </p>
              
              <div className="space-y-4">
                {suitableSpaces.map((space, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-[#f9f7f3] transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center flex-shrink-0">
                      {space.icon}
                    </div>
                    <span className="text-[#2C3E50] font-medium text-lg">{space.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2C3E50] to-[#34495e] rounded-3xl p-8 text-white">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C4A35A] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#C4A35A] rounded-full opacity-20 blur-2xl"></div>
                
                <div className="relative z-10">
                  <Sun className="h-12 w-12 text-[#C4A35A] mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Tot 90% Warmtewering</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Buitenscreens zijn de meest effectieve zonwering omdat ze de warmte blokkeren 
                    voordat deze het glas bereikt. Dit resulteert in tot 90% warmtewering, 
                    wat uw binnenklimaat aanzienlijk verbetert.
                  </p>
                  <div className="flex items-center gap-2 text-[#C4A35A]">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Professionele installatie inbegrepen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Eerlijke beperkingen</h3>
                <p className="text-gray-600 mb-6">
                  Wij geloven in transparante communicatie. Daarom vermelden we ook de beperkingen van buitenscreens:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {limitations.map((limitation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Veelgestelde vragen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Heeft u <span className="font-medium italic text-[#D5B992]">vragen</span>?
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden"
                >
                  <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-[#f8f6f0]/50 transition-colors duration-300">
                    <span className="font-display text-lg font-semibold text-[#2C3E50]">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#8B7355] font-body leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default ScreensOutsidePage;