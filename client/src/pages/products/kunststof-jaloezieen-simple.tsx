import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
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
  HomeIcon,
  ChevronRight,
  CheckCircle,
  Settings,
  Shield,
  Droplets,
  Sparkles,
  HelpCircle,
  Mail,
  Bath,
  ChefHat,
  Building,
  Sun,
  Wrench,
  Crown,
  Gem,
  Award,
  Star,
  Palette,
  Zap,
  Clock,
  ShowerHead,
  Thermometer,
  Layers,
  Diamond,
} from "lucide-react";

const KunststofJaloezieeenSimplePage = () => {
  const advantages = [
    "Vocht- en waterbestendig – ideaal voor badkamer of keuken",
    "Verkrijgbaar in 50 mm lamelbreedte",
    "Onderhoudsvriendelijk en krasbestendig",
    "Houtlook of effen kleuren",
    "Eenvoudige bediening en lichtregeling",
    "Betaalbaar alternatief voor houten jaloezieën",
    "Perfect op maat gemaakt",
  ];

  const personalizationOptions = [
    {
      title: "Lamelbreedte",
      items: [
        "50 mm (klassiekere uitstraling)",
      ],
      icon: Layers,
    },
    {
      title: "Kleuren",
      items: [
        "Wit, grijs, zwart, houtkleuren, beige",
        "Keuze uit matte of glanzende afwerking",
      ],
      icon: Palette,
    },
    {
      title: "Bedieningsopties",
      items: [
        "Koord + tuimelstok (standaard)",
        "Optioneel: kettingbediening",
        "Optioneel: elektrische bediening (met afstandsbediening of app)",
      ],
      icon: Zap,
    },
    {
      title: "Montage",
      items: [
        "In de dag (binnen het kozijn)",
        "Op de dag (op de muur of het plafond)",
      ],
      icon: Settings,
    },
    {
      title: "Extra opties",
      items: [
        "Ladderband voor een textiele afwerking",
        "Bijpassende afdeklijst (koof)",
      ],
      icon: Award,
    },
  ];

  const applications = [
    { icon: Bath, label: "Badkamers" },
    { icon: ChefHat, label: "Keukens" },
    { icon: Sparkles, label: "Wasruimtes" },
    { icon: Building, label: "Kantoren" },
    { icon: Sun, label: "Ramen met veel zonlicht of vocht" },
  ];

  const maintenanceInfo = [
    "Eenvoudig schoon te maken met een vochtige doek",
    "Antistatische afwerking voorkomt stofophoping",
    "Zeer duurzaam en kleurvast",
  ];

  const faqs = [
    {
      question: "Zijn kunststof jaloezieën hittebestendig?",
      answer: "Ja, ze zijn ontworpen om hoge temperaturen en vocht te weerstaan.",
    },
    {
      question: "Kunnen ze in een douche worden gebruikt?",
      answer: "Ja, ze zijn ideaal voor zeer vochtige ruimtes.",
    },
    {
      question: "Wat is het verschil met houten jaloezieën?",
      answer: "Kunststof is vochtbestendig, lichter en onderhoudsvriendelijker. Hout is natuurlijk, maar gevoelig voor vocht.",
    },
    {
      question: "Is elektrische bediening mogelijk?",
      answer: "Ja, optioneel verkrijgbaar met afstandsbediening of app.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Premium Kunststof Jaloezieën – Innovatieve Vochtbestendige Elegantie | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze premium kunststof jaloezieën collectie. Geavanceerde technologie ontmoet stijlvolle vormgeving. Vochtbestendig, onderhoudsvriendelijk en perfect voor moderne interieurs."
        />
      </Helmet>

      {/* Luxury Breadcrumb */}
      <div className="bg-gradient-to-r from-[#f0f4f8] via-[#f3f7fb] to-[#f0f4f8] py-6 border-b border-[#dde7ef]/30">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#7B8FA3] hover:text-[#5A7A95] transition-colors duration-300 flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#5A7A95]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#7B8FA3] hover:text-[#5A7A95] transition-colors duration-300">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#5A7A95]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[#2C3E50] font-medium">Kunststof Jaloezieën</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#fafcfd] via-[#f7fafb] to-white">
        {/* Luxury Hero Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Sophisticated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4f8] via-[#f3f7fb] to-[#edf2f7]"></div>
          <div 
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235A7A95' fill-opacity='0.3'%3E%3Crect x='0' y='0' width='50' height='2'/%3E%3Crect x='0' y='10' width='50' height='2'/%3E%3Crect x='0' y='20' width='50' height='2'/%3E%3Crect x='0' y='30' width='50' height='2'/%3E%3Crect x='0' y='40' width='50' height='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                <Diamond className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Premium Innovatie</span>
              </div>
              
              {/* Luxury Heading */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2C3E50] font-light mb-8 tracking-tight leading-none">
                <span className="block">Premium</span>
                <span className="block bg-gradient-to-r from-[#5A7A95] via-[#7B8FA3] to-[#5A7A95] bg-clip-text text-transparent font-medium">
                  Kunststof Jaloezieën
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
                  Innovatieve Elegantie
                </span>
              </h1>
              
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#5A7A95]"></div>
                <Thermometer className="h-6 w-6 text-[#5A7A95]" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#5A7A95]"></div>
              </div>
              
              <p className="font-light text-2xl md:text-3xl text-[#2C3E50] leading-relaxed mb-12 max-w-4xl mx-auto">
                <span className="font-medium italic">Geavanceerde technologie</span> ontmoet tijdloze stijl. 
                Onze premium kunststof jaloezieën combineren innovatieve vochtbestendigheid met verfijnde esthétiek, 
                perfect voor de moderne levensstijl.
              </p>
              
              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#5A7A95] mb-2">100%</div>
                  <div className="text-sm text-[#7B8FA3] uppercase tracking-wider">Vochtbestendig</div>
                </div>
                <div className="text-center border-x border-[#dde7ef]">
                  <div className="text-3xl font-light text-[#5A7A95] mb-2">5</div>
                  <div className="text-sm text-[#7B8FA3] uppercase tracking-wider">Jaar Garantie</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#5A7A95] mb-2">∞</div>
                  <div className="text-sm text-[#7B8FA3] uppercase tracking-wider">Stijl Opties</div>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] hover:from-[#34495e] hover:to-[#2C3E50] text-white px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border border-[#5A7A95]/20"
                  >
                    <Diamond className="mr-3 h-5 w-5" />
                    Ontdek Innovatieve Oplossingen
                  </Button>
                </Link>
                <div className="text-sm text-[#7B8FA3] italic">Gratis technisch advies & opmeting</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fafcfd] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <ShowerHead className="h-6 w-6 text-[#5A7A95]" />
                <span className="text-[#7B8FA3] uppercase tracking-wider text-sm font-medium">Technische Superioriteit</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Innovatie in elk Detail
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fafcfd] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[#2C3E50] leading-relaxed font-medium">{advantage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Luxury Customization Section */}
        <section className="py-24 bg-gradient-to-br from-[#f0f4f8] via-[#f3f7fb] to-[#edf2f7] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#5A7A95]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#7B8FA3]/10 to-transparent rounded-full blur-3xl"></div>
          
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Palette className="h-6 w-6 text-[#5A7A95]" />
                <span className="text-[#7B8FA3] uppercase tracking-wider text-sm font-medium">Technische Configuratie</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Uw Perfecte Specificatie
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] mx-auto mb-8"></div>
              <p className="text-lg text-[#7B8FA3] max-w-3xl mx-auto leading-relaxed">
                Configureer uw premium kunststof jaloezieën met onze geavanceerde opties. 
                Elke specificatie wordt zorgvuldig afgestemd op uw functionele eisen en esthetische voorkeuren.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalizationOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <option.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#2C3E50] text-xl mb-3">
                          {option.title}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {option.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] mt-2 flex-shrink-0"></div>
                          <p className="text-[#7B8FA3] leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Applications Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fafcfd] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Building className="h-6 w-6 text-[#5A7A95]" />
                <span className="text-[#7B8FA3] uppercase tracking-wider text-sm font-medium">Optimale Toepassingen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Ideaal voor Veeleisende Omgevingen
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {applications.map((app, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fafcfd] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center group"
                >
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <app.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-[#2C3E50] font-medium">{app.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Maintenance Section */}
        <section className="py-24 bg-gradient-to-br from-[#f0f4f8] via-[#f3f7fb] to-[#edf2f7]">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Clock className="h-6 w-6 text-[#5A7A95]" />
                <span className="text-[#7B8FA3] uppercase tracking-wider text-sm font-medium">Onderhoud & Duurzaamheid</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Langdurige Prestaties
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {maintenanceInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-full bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {index === 0 && <Sparkles className="h-8 w-8 text-white" />}
                          {index === 1 && <Shield className="h-8 w-8 text-white" />}
                          {index === 2 && <Wrench className="h-8 w-8 text-white" />}
                        </div>
                      </div>
                      <p className="text-[#2C3E50] leading-relaxed font-medium text-lg">{info}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fafcfd] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <HelpCircle className="h-6 w-6 text-[#5A7A95]" />
                <span className="text-[#7B8FA3] uppercase tracking-wider text-sm font-medium">Technische Vragen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Expertise & Ondersteuning
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none">
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <AccordionTrigger className="text-left text-[#2C3E50] font-medium px-8 py-6 hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] shadow-md">
                            <HelpCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-lg">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#7B8FA3] px-16 pb-6 text-lg leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* Luxury Call-to-Action Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] via-[#34495e] to-[#2C3E50]"></div>
          <div 
            className="absolute inset-0 opacity-15" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235A7A95' fill-opacity='0.2'%3E%3Crect x='0' y='0' width='120' height='4'/%3E%3Crect x='0' y='20' width='120' height='4'/%3E%3Crect x='0' y='40' width='120' height='4'/%3E%3Crect x='0' y='60' width='120' height='4'/%3E%3Crect x='0' y='80' width='120' height='4'/%3E%3Crect x='0' y='100' width='120' height='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-8">
                <Diamond className="h-8 w-8 text-[#5A7A95]" />
                <span className="text-[#5A7A95] uppercase tracking-wider text-sm font-medium">Start Uw Innovatieve Transformatie</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight">
                Ervaar de Toekomst van
                <span className="block font-medium bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] bg-clip-text text-transparent">
                  Vochtbestendige Elegantie
                </span>
              </h2>
              
              <p className="text-xl mb-12 leading-relaxed text-gray-300 max-w-3xl mx-auto">
                Ontdek onze geavanceerde kunststof collectie en ontvang binnen 24 uur een technisch voorstel op maat. 
                Inclusief gratis technische consultatie en professionele precisie-opmeting.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#5A7A95] to-[#7B8FA3] hover:from-[#7B8FA3] hover:to-[#5A7A95] text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105"
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Technische Consultatie Aanvragen
                  </Button>
                </Link>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#5A7A95] flex items-center justify-center text-white text-sm font-bold">5</div>
                    <div className="w-8 h-8 rounded-full bg-[#7B8FA3] flex items-center justify-center text-white">⭐</div>
                  </div>
                  <span className="text-sm">Meer dan 1200+ technische installaties</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default KunststofJaloezieeenSimplePage;