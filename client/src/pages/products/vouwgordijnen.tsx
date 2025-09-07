import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Palette,
  Settings,
  Phone,
  Mail,
  Shield,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Link } from "wouter";

const VouwgordijnenPage = () => {
  const keyFeatures = [
    "Volledig op maat gemaakt (breedte & hoogte exact afgestemd op jouw ramen)",
    "Verkrijgbaar in verduisterende, lichtdoorlatende en transparante stoffen",
    "Strak vouwmechanisme met kettingbediening of optionele elektrische motor",
    "Afneembare stof voor eenvoudig reinigen",
    "Perfect voor zowel moderne als klassieke interieurs",
    "Keuze uit honderden stoffen, kleuren en texturen",
    "Dubbele voering of thermische isolatie op aanvraag",
  ];

  const fabricTypes = [
    {
      title: "Linnen & katoenmixen",
      description: "Natuurlijke texturering met warme uitstraling",
      icon: <Sparkles className="h-6 w-6 text-[#D5B992]" />,
    },
    {
      title: "Velours & luxe geweven stoffen",
      description: "Rijke texturering voor elegante ruimtes",
      icon: <Palette className="h-6 w-6 text-[#D5B992]" />,
    },
    {
      title: "Screenstoffen voor zonwering",
      description: "Technische stoffen die zon weren maar uitzicht behouden",
      icon: <Shield className="h-6 w-6 text-[#D5B992]" />,
    },
  ];

  const operationOptions = [
    {
      title: "Standaard kettingbediening",
      description: "Links of rechts bediening naar keuze",
      details: "Betrouwbaar en eenvoudig te bedienen",
    },
    {
      title: "Kindveilige systemen",
      description: "Veilig voor gezinnen met kinderen",
      details: "Voldoet aan alle veiligheidsnormen",
    },
    {
      title: "Gemotoriseerde bediening",
      description: "Elektrische bediening via afstandsbediening of app",
      details: "Luxe optie voor modern comfort",
    },
    {
      title: "Montage opties",
      description: "Plafond- of wandmontage mogelijk",
      details: "Professionele installatie door onze monteurs",
    },
  ];

  const faqs = [
    {
      question: "Kan ik zelf de stof kiezen?",
      answer: "Ja, we bieden stalen aan die je thuis kunt bekijken, of je komt langs in onze showroom voor persoonlijk advies.",
    },
    {
      question: "Zijn vouwgordijnen geschikt voor de keuken of badkamer?",
      answer: "Ja, mits je kiest voor vochtbestendige of gemakkelijk reinigbare stoffen. Wij adviseren je hier graag over.",
    },
    {
      question: "Hoe lang duurt de productie?",
      answer: "Gemiddeld tussen de 2 à 3 weken, afhankelijk van de gekozen stof en opties.",
    },
    {
      question: "Kan ik ze later reinigen?",
      answer: "Zeker. De meeste stoffen zijn voorzien van klittenband of haakjes en kunnen worden losgemaakt voor stomerij of handwas (afhankelijk van de stof).",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Vouwgordijnen op Maat – Tijdloze elegantie met moderne afwerking | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Vouwgordijnen volledig op maat gemaakt met zachte plooien voor elegante raamdecoratie. Keuze uit verduisterende, lichtdoorlatende en transparante stoffen."
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
                <BreadcrumbLink>Vouwgordijnen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white w-full">
        {/* Hero Section */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="text-4xl mb-4 block">🪡</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-semibold mb-6">
                Vouwgordijnen op Maat
              </h1>
              <div className="w-24 h-0.5 bg-[#D5B992] mx-auto mb-8"></div>
              <p className="font-body text-xl text-[#2C3E50] leading-relaxed mb-6">
                Tijdloze elegantie met een moderne afwerking
              </p>
              <p className="font-body text-lg text-[#2C3E50] leading-relaxed">
                Bij Kaniou Zilvernaald combineren we ambacht met functionaliteit. Onze vouwgordijnen worden volledig op maat gemaakt en zijn ideaal voor wie op zoek is naar stijlvolle, maar praktische raamdecoratie. Dankzij de zachte plooien creëren ze een warme en elegante sfeer in elke ruimte — van woonkamer tot kantoor.
              </p>
            </div>
          </Container>
        </section>

        {/* Key Features & Benefits */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Belangrijkste kenmerken
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Stoffen & afwerking */}
        <section className="py-16 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                🎨 Stoffen & afwerking
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Wij werken met hoogwaardige stoffen van Europese topmerken. Je kunt kiezen uit een uitgebreide stoffenbibliotheek
              </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {fabricTypes.map((fabric, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {fabric.icon}
                      <h3 className="font-semibold text-[#2C3E50] text-lg">
                        {fabric.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {fabric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-700 leading-relaxed text-center">
                Elke stof is zorgvuldig geselecteerd op basis van lichtfiltering, valgedrag en kleurechtheid. 
                We bieden ook opties met voering voor extra verduistering of isolatie.
              </p>
            </div>
          </Container>
        </section>

        {/* Bediening & montage */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                ⚙️ Bediening & montage
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Onze vouwgordijnen kunnen worden uitgerust met verschillende bedieningsopties
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {operationOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Settings className="h-6 w-6 text-[#D5B992] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#2C3E50] text-lg mb-2">
                          {option.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-2">
                          {option.description}
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          {option.details}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-700 leading-relaxed">
                Montage gebeurt door onze professionele installateurs, met oog voor precisie en afwerking.
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                ℹ️ Veelgestelde vragen
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-[#2C3E50] font-medium">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-[#D5B992]" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* Onze belofte */}
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                📦 Onze belofte
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Bij Kaniou Zilvernaald leveren wij maatwerk van topkwaliteit met persoonlijke begeleiding. 
                Elk vouwgordijn wordt speciaal voor jou ontworpen, afgestemd op je interieur, ramen én voorkeuren.
              </p>
            </div>
          </Container>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-r from-[#2C3E50] to-[#34495e]">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                📞 Interesse?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Vraag vandaag nog een vrijblijvende offerte aan of maak een afspraak met een van onze specialisten.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-lg">
                    <span>📍</span>
                    <span>Showroom: Pauwengraaf 66, Maasmechelen</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>info@kaniou.be</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>+32 467 85 64 05</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Vraag vrijblijvende offerte aan
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

export default VouwgordijnenPage;