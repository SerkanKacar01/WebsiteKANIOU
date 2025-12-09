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
} from "lucide-react";
import { Link } from "wouter";

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
        {/* Hero Section - Text Only */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2C3E50] via-[#34495e] to-[#2C3E50] py-20 md:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#D5B992] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#D5B992] rounded-full blur-3xl"></div>
          </div>
          <Container>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
                <Sun className="h-5 w-5 text-[#D5B992]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">Premium Binnenzonwering</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight">
                Screens voor Binnen
              </h1>
              <p className="font-body text-xl md:text-2xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
                Luxe Lichtfiltering en Privacy, Perfect op Maat Gemaakt voor Uw Interieur
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-testid="hero-cta-button"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Gratis Offerte Aanvragen
                  </Button>
                </Link>
                <Link href="tel:+32123456789">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                    data-testid="hero-phone-button"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Bel Ons
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
                  data-testid={`benefit-card-${index}`}
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

        {/* Features Highlight Section */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-[#D5B992]/10 to-[#D5B992]/5 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-[#D5B992]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sun className="h-8 w-8 text-[#D5B992]" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Lichtfiltering</h3>
                <p className="text-gray-600 leading-relaxed">
                  Subtiele filtering van daglicht voor een aangename sfeer zonder volledige verduistering.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Privacy Overdag</h3>
                <p className="text-gray-600 leading-relaxed">
                  Uitstekende privacy overdag - u kijkt naar buiten, buitenstaanders kijken niet naar binnen.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Palette className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Op Maat Gemaakt</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kies uit een breed scala aan kleuren en transparanties, perfect afgestemd op uw interieur.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Suitable Spaces */}
        <section className="py-20 bg-[#f9f7f3]">
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
                      className="flex items-center gap-4 p-4 bg-white shadow-sm rounded-xl hover:shadow-md transition-all duration-300"
                      data-testid={`space-item-${index}`}
                    >
                      <div className="w-12 h-12 bg-[#D5B992]/10 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Eerlijk advies</h3>
                  <p className="text-gray-600 mb-6">
                    Wij geloven in transparante communicatie. Daarom vermelden we ook de beperkingen van binnenscreens:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#D5B992]/10 px-4 py-2 rounded-full mb-4">
                  <HelpCircle className="h-5 w-5 text-[#D5B992]" />
                  <span className="text-[#D5B992] text-sm font-medium">Veelgestelde vragen</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50]">
                  Alles wat u wilt weten
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-gray-50 rounded-xl px-6 border-none"
                    data-testid={`faq-item-${index}`}
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#2C3E50] hover:text-[#D5B992] hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#2C3E50] to-[#34495e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D5B992] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D5B992] rounded-full blur-3xl"></div>
          </div>
          
          <Container>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Klaar voor uw gratis offerte?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Onze experts helpen u graag bij het kiezen van de perfecte binnenscreens voor uw woning. 
                Vraag vandaag nog een vrijblijvende offerte aan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-testid="cta-offerte-button"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Gratis Offerte Aanvragen
                  </Button>
                </Link>
                <Link href="tel:+32123456789">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                    data-testid="cta-phone-button"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Bel Ons Direct
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

export default ScreensInsidePage;
