import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  Palette,
  Sofa,
  Monitor,
  Building2,
  Home,
  Laptop,
  Square,
  AlertTriangle,
  Phone,
  Mail,
  Sparkles,
  Shield,
  HelpCircle,
  ArrowRight,
  X,
  Settings,
  Zap,
  Cog,
} from "lucide-react";
import { Link } from "wouter";

import heroImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.44_1765236931741.png";
import motorizedImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.51_1765236931741.png";
import skyZipImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.59_1765236931741.png";
import manualImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.07_1765236931742.png";
import colorImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.13_1765236931742.png";
import soltis92Image from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.20_1765236931742.png";
import soltis86Image from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.26_1765236931740.png";
import serge600Image from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.33_1765236931741.png";
import petScreenImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.39_1765236931741.png";
import technicalImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.34.46_1765236931741.png";
import applicationsImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.35.04_1765236931741.png";

const ScreensInsidePage = () => {
  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8 text-[#D5B992]" />,
      title: "Moderne, minimalistische uitstraling",
      description: "De vlak hangende screens zorgen voor een strakke en elegante look in elke ruimte.",
    },
    {
      icon: <Sun className="h-8 w-8 text-amber-500" />,
      title: "Zachte lichtfiltering zonder verduistering",
      description: "Ze temperen fel licht maar verduisteren nooit 100%. Ideaal voor woonkamers, bureaus en keukens.",
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-500" />,
      title: "Goede privacy overdag",
      description: "Overdag kunt u naar buiten kijken, maar buitenstaanders kunnen minder goed naar binnen kijken.",
    },
    {
      icon: <Monitor className="h-8 w-8 text-indigo-500" />,
      title: "Verbeterd wooncomfort",
      description: "Vermindert verblinding bij beeldschermen en TV's en zorgt voor rust in de ruimte.",
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-500" />,
      title: "Veel doekkleuren en transparanties",
      description: "Semi-transparant, privacydoek of lichtdoorlatend — volledig afgestemd op uw interieur.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Betaalbare oplossing",
      description: "Een voordelig alternatief voor buitenzonwering, zonder ingreep aan de gevel.",
    },
  ];

  const suitableSpaces = [
    {
      icon: <Sofa className="h-6 w-6 text-[#D5B992]" />,
      title: "Woonkamers met veel licht",
    },
    {
      icon: <Home className="h-6 w-6 text-[#D5B992]" />,
      title: "Keukens en leefruimtes",
    },
    {
      icon: <Laptop className="h-6 w-6 text-[#D5B992]" />,
      title: "Thuiskantoren / home office",
    },
    {
      icon: <Building2 className="h-6 w-6 text-[#D5B992]" />,
      title: "Appartementen waar geen buitenzonwering mag",
    },
    {
      icon: <Square className="h-6 w-6 text-[#D5B992]" />,
      title: "Grote ramen met behoefte aan zachte lichtinval",
    },
  ];

  const limitations = [
    "Geen volledige verduistering",
    "Geen volledige privacy in de avond",
    "Minder warmtewerend dan buitenscreens",
    "Niet ideaal voor natte ruimtes zoals badkamers",
  ];

  const faqs = [
    {
      question: "Bieden binnenscreens volledige privacy?",
      answer: "Overdag bieden ze goede privacy doordat u naar buiten kunt kijken terwijl buitenstaanders minder goed naar binnen kunnen kijken. Let op: 's avonds, bij binnenverlichting, bieden binnenscreens geen volledige privacy.",
    },
    {
      question: "Kunnen binnenscreens de kamer volledig verduisteren?",
      answer: "Nee, binnenscreens zijn ontworpen om licht te filteren, niet om volledig te verduisteren. Voor volledige verduistering raden we andere oplossingen aan zoals rolgordijnen met verduisterende stof.",
    },
    {
      question: "Zijn binnenscreens geschikt voor vochtige ruimtes?",
      answer: "Binnenscreens zijn niet ideaal voor natte ruimtes zoals badkamers. Voor deze ruimtes adviseren we vochtbestendige alternatieven.",
    },
    {
      question: "Hoeveel warmte weren binnenscreens?",
      answer: "Binnenscreens bieden enige warmtewering, maar zijn minder effectief dan buitenscreens. Ze zijn vooral gericht op lichtfiltering en privacy.",
    },
    {
      question: "Kan ik de kleur en transparantie zelf kiezen?",
      answer: "Absoluut! We bieden een uitgebreide collectie doekkleuren en transparanties. Van semi-transparant tot privacydoek — volledig afgestemd op uw interieur en wensen.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Screens voor Binnen – Luxe Lichtfiltering en Privacy op Maat | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Onze binnenscreens bieden elegante lichtfiltering en privacy. Modern, minimalistisch design met zachte lichtinval. Perfect voor woonkamers, thuiskantoren en appartementen."
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
                <BreadcrumbLink>Screens Inside</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-full">
        {/* Hero Section with Image */}
        <section className="relative overflow-hidden">
          <div className="relative w-full">
            <img 
              src={heroImage} 
              alt="Built to shade. Engineered to lead." 
              className="w-full h-[60vh] md:h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <Container>
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                    <Sun className="h-5 w-5 text-[#D5B992]" />
                    <span className="text-white/90 text-sm font-medium tracking-wide">Premium Binnenzonwering</span>
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight">
                    Screens voor Binnen
                  </h1>
                  <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
                    Luxe Lichtfiltering en Privacy, Perfect op Maat
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/offerte">
                      <Button
                        size="lg"
                        className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        Gratis Offerte Aanvragen
                      </Button>
                    </Link>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Onze screens voor binnen bieden een elegante en moderne manier om licht te filteren en meer privacy te creëren in uw woning. Dankzij het fijn geweven doek laten binnenscreens het natuurlijke daglicht binnen, terwijl hinderlijke schittering en inkijk worden verminderd. Ze zijn ideaal voor wie een strak interieur wil combineren met functionele raamdecoratie.
              </p>
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-[#f9f7f3] to-white">
          <Container>
            <div className="text-center mb-16">
              <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">Voordelen</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Waarom kiezen voor binnenscreens?
              </h2>
              <div className="w-16 h-1 bg-[#D5B992] mx-auto rounded-full"></div>
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

        {/* Operating Systems Section */}
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-16">
              <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">Bedieningssystemen</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Kies uw bedieningsoptie
              </h2>
              <div className="w-16 h-1 bg-[#D5B992] mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Motorized */}
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className="relative overflow-hidden bg-gray-100">
                  <img 
                    src={motorizedImage} 
                    alt="Motorized ZIP Screen Systems" 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#D5B992]/10 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-[#D5B992]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C3E50]">Gemotoriseerd</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Gemotoriseerde ZIP screen systemen bieden een moderne zonweringsoplossing die zowel comfort als stijl verbetert. Compatibel met Google Home, Amazon Alexa en Tuya Smart.
                  </p>
                </CardContent>
              </Card>

              {/* SkyZip */}
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
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

              {/* Manual */}
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
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

        {/* Fabric Types Section */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-16">
              <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">Stoffencollectie</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Premium Fabric Types
              </h2>
              <div className="w-16 h-1 bg-[#D5B992] mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                Onze screens zijn verkrijgbaar in verschillende hoogwaardige doektypes, elk met unieke eigenschappen voor optimale lichtfiltering en duurzaamheid.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Soltis 92 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={soltis92Image} 
                  alt="Soltis 92 - Serge Ferrari" 
                  className="w-full h-auto"
                />
              </div>

              {/* Soltis 86 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={soltis86Image} 
                  alt="Soltis 86 - Serge Ferrari" 
                  className="w-full h-auto"
                />
              </div>

              {/* Serge 600 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={serge600Image} 
                  alt="Serge 600 - Copaco Screenweavers" 
                  className="w-full h-auto"
                />
              </div>

              {/* PET Screen */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={petScreenImage} 
                  alt="PET Screen" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* RAL Colors Section */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">Kleuren</span>
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
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={colorImage} 
                  alt="RAL Color Options" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Technical Details */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">Technische Details</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Professionele Afwerking
              </h2>
              <div className="w-16 h-1 bg-[#D5B992] mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={technicalImage} 
                alt="Technical Details" 
                className="w-full h-auto"
              />
            </div>
          </Container>
        </section>

        {/* Applications Section */}
        <section className="relative overflow-hidden">
          <img 
            src={applicationsImage} 
            alt="Screen Applications" 
            className="w-full h-auto"
          />
        </section>

        {/* Suitable Spaces */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">Toepassingen</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                  Waar zijn binnenscreens het meest geschikt?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Binnenscreens zijn veelzijdig en passen perfect in verschillende ruimtes. Ze combineren functionaliteit met een moderne uitstraling.
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
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D5B992] rounded-full opacity-20 blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#D5B992] rounded-full opacity-20 blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <Sun className="h-12 w-12 text-[#D5B992] mb-6" />
                    <h3 className="text-2xl font-bold mb-4">De Perfecte Balans</h3>
                    <p className="text-white/80 leading-relaxed mb-6">
                      Binnenscreens creëren de ideale balans tussen natuurlijk daglicht en privacy. 
                      Het fijn geweven doek filtert het licht subtiel, waardoor een aangename sfeer ontstaat zonder volledig af te sluiten.
                    </p>
                    <div className="flex items-center gap-2 text-[#D5B992]">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Professionele installatie inbegrepen</span>
                    </div>
                  </div>
                </div>
              </div>
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
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-4">
                    Eerlijke beperkingen
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Wij geloven in transparante communicatie. Daarom vermelden we ook de beperkingen van binnenscreens:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <X className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <span className="inline-block text-[#D5B992] text-sm font-semibold tracking-wider uppercase mb-4">FAQ</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Veelgestelde vragen
              </h2>
              <div className="w-16 h-1 bg-[#D5B992] mx-auto rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white rounded-xl shadow-sm border-none px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left text-[#2C3E50] font-semibold hover:no-underline py-5">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-[#D5B992] flex-shrink-0" />
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

        {/* Conclusion */}
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-[#D5B992] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                Conclusie
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Onze binnenscreens op maat zijn de perfecte keuze voor wie stijl, comfort en privacy wil combineren. Ze creëren een luxueuze sfeer in huis en passen prachtig in moderne interieurs. Een elegante oplossing waarmee u uw lichtinval subtiel regelt — precies zoals u het wilt.
              </p>
            </div>
          </Container>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 bg-gradient-to-br from-[#2C3E50] via-[#34495e] to-[#1a252f] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#D5B992] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <Container className="relative z-10">
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Klaar om te beginnen?
              </h2>
              <p className="text-xl mb-10 text-white/80 leading-relaxed">
                Vraag vandaag nog een vrijblijvende offerte aan of maak een afspraak met een van onze specialisten voor persoonlijk advies.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Vraag Offerte Aan
                  </Button>
                </Link>
                <Link href="/afspraak">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#2C3E50] px-10 py-5 text-lg font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Plan Afspraak
                  </Button>
                </Link>
              </div>
              
              <Separator className="bg-white/20 mb-8" />
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-[#D5B992]" />
                  </div>
                  <span className="text-lg">+32 467 85 64 05</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-[#D5B992]" />
                  </div>
                  <span className="text-lg">info@kaniou.be</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default ScreensInsidePage;
