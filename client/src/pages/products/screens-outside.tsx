import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  HomeIcon,
  ChevronRight,
  Sun,
  Eye,
  Thermometer,
  Building2,
  Home,
  Bed,
  Square,
  AlertTriangle,
  Phone,
  Mail,
  Sparkles,
  Shield,
  HelpCircle,
  Zap,
  Wind,
  Smartphone,
  Settings,
} from "lucide-react";
import { Link } from "wouter";

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

  const controlOptions = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Handmatige bediening",
      description: "Eenvoudige en betrouwbare handmatige bediening",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Somfy motor",
      description: "Premium gemotoriseerde bediening",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Afstandsbediening",
      description: "Bedien uw screens op afstand",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Smart home app-bediening",
      description: "Integratie met uw smart home systeem",
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
    <>
      <Helmet>
        <title>Screens voor Buiten – De Beste Warmtewerende Zonwering | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Onze buitenscreens zijn de meest effectieve oplossing tegen oververhitting. Tot 90% warmtewering, moderne uitstraling en energiebesparing. Perfect voor nieuwbouw en grote ramen."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Screens Outside</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2C3E50] to-[#1a252f] py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <Container>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Thermometer className="h-5 w-5 text-[#C4A35A]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">Premium Buitenzonwering</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight">
                Screens voor Buiten
              </h1>
              <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                De Beste Warmte-werende Zonwering voor uw Woning
              </p>
              <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
                Onze screens voor buiten zijn de meest effectieve oplossing tegen oververhitting en fel zonlicht. 
                Doordat ze aan de buitenzijde van het raam worden geplaatst, blokkeren buitenscreens de warmte nog 
                vóór deze het glas bereikt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-[#C4A35A] hover:bg-[#B39245] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Gratis Offerte Aanvragen
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Buitenscreens combineren moderne architecturale uitstraling met hoogwaardige functionaliteit, 
                waardoor ze ideaal zijn voor nieuwbouwwoningen, appartementen, veranda's en grote glaspartijen. 
                Dit zorgt voor merkbaar koelere ruimtes in de zomer en voorkomt verkleuring van meubels en vloeren.
              </p>
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-[#f9f7f3] to-white">
          <Container>
            <div className="text-center mb-16">
              <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Voordelen</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Waarom kiezen voor buitenscreens?
              </h2>
              <div className="w-16 h-1 bg-[#C4A35A] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden"
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

        {/* ZIP-Screens Section */}
        <section className="py-20 bg-white">
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
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl"
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

        {/* Suitable Spaces */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-[#2C3E50] to-[#34495e] rounded-3xl p-8 text-white">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C4A35A] rounded-full opacity-20 blur-2xl"></div>
                  
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

              <div className="order-1 lg:order-2">
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
                      className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="w-12 h-12 bg-[#C4A35A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {space.icon}
                      </div>
                      <span className="text-[#2C3E50] font-medium text-lg">{space.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Control Options */}
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-16">
              <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">Bediening</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Bedieningsopties
              </h2>
              <div className="w-16 h-1 bg-[#C4A35A] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {controlOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white text-center"
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#C4A35A]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C4A35A]">
                      {option.icon}
                    </div>
                    <h3 className="font-bold text-[#2C3E50] text-lg mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Honest Limitations */}
        <section className="py-16 bg-amber-50/50">
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

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-16">
              <span className="inline-block text-[#C4A35A] text-sm font-semibold tracking-wider uppercase mb-4">FAQ</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Veelgestelde Vragen
              </h2>
              <div className="w-16 h-1 bg-[#C4A35A] mx-auto rounded-full"></div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#2C3E50] hover:text-[#C4A35A] py-5">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-[#C4A35A] flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-5 pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* Conclusion CTA */}
        <section className="py-20 bg-gradient-to-br from-[#2C3E50] to-[#1a252f]">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                De ultieme zonwering voor Belgische en Nederlandse woningen
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Onze buitenscreens op maat zijn de ideale keuze voor wie warmte, zonlicht en inkijk wil verminderen 
                zonder in te leveren op stijl. Duurzaam, modern, efficiënt én perfect afgestemd op uw woning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-[#C4A35A] hover:bg-[#B39245] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Gratis Offerte Aanvragen
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#2C3E50] px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Opnemen
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default ScreensOutsidePage;
