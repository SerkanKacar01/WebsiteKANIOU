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
  School,
  Heart,
  Crown,
  Gem,
  Award,
  Star,
  Palette,
  Cog,
  Factory,
  Layers,
  Hexagon,
  Triangle,
  Square,
  Zap,
} from "lucide-react";

const KunststofLamellenSimplePage = () => {
  const advantages = [
    "Vochtbestendig – perfect voor badkamers en keukens",
    "Eenvoudig schoon te maken met vochtige doek",
    "Zeer lange levensduur",
    "Ideaal voor grote ramen en schuifpuien",
    "Strakke en moderne uitstraling",
    "Lichtdoorlatend of volledig afsluitbaar",
    "Maatwerkoplossing mogelijk in elke ruimte",
  ];

  const personalizationOptions = [
    {
      title: "Lamelbreedte",
      items: [
        "89 mm",
        "127 mm",
      ],
      icon: Layers,
    },
    {
      title: "Kleurmogelijkheden",
      items: [
        "Wit, crème, grijs, antraciet, zwart",
        "Mogelijkheid tot lichte structuren of metallic afwerking",
      ],
      icon: Palette,
    },
    {
      title: "Bedieningsopties",
      items: [
        "Ketting en koord (standaard)",
        "Monocommando systeem",
        "Elektrisch (optioneel)",
      ],
      icon: Cog,
    },
    {
      title: "Montage",
      items: [
        "In de dag of op de dag",
        "Plafond- of wandmontage",
        "Recht of gebogen rails mogelijk",
      ],
      icon: Settings,
    },
  ];

  const applications = [
    { icon: Bath, label: "Badkamers" },
    { icon: ChefHat, label: "Keukens" },
    { icon: Building, label: "Kantoorruimtes" },
    { icon: School, label: "Openbare gebouwen (scholen, ziekenhuizen, etc.)" },
    { icon: Heart, label: "Horeca en zorgsector" },
  ];

  const maintenanceInfo = [
    "Afwasbaar met een vochtige doek of spons",
    "Ideaal voor omgevingen waar hygiëne essentieel is",
    "Lamellen zijn waterafstotend en trekken geen stof aan",
  ];

  const faqs = [
    {
      question: "Zijn kunststof lamellen geschikt voor vochtige ruimtes?",
      answer: "Ja, ze zijn waterbestendig en vervormen niet bij vocht of damp.",
    },
    {
      question: "Wat is het verschil tussen kunststof en textiel lamellen?",
      answer: "Kunststof lamellen zijn steviger, vochtbestendig en makkelijker te reinigen. Textiel is zachter en visueel warmer.",
    },
    {
      question: "Kunnen de lamellen afzonderlijk vervangen worden?",
      answer: "Ja, losse lamellen kunnen eenvoudig vervangen worden zonder het hele systeem te verwijderen.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Premium Kunststof Lamellen – Industriële Elegantie voor Functionele Ruimtes | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze premium kunststof lamellen collectie. Industriële sterkte ontmoet moderne elegantie. Duurzaam, functioneel en perfect voor veeleisende omgevingen."
        />
      </Helmet>

      {/* Luxury Breadcrumb */}
      <div className="bg-gradient-to-r from-[#f2f4f6] via-[#f5f7f9] to-[#f2f4f6] py-6 border-b border-[#dce2e8]/30">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#6B7785] hover:text-[#4A5568] transition-colors duration-300 flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#4A5568]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#6B7785] hover:text-[#4A5568] transition-colors duration-300">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#4A5568]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[#2C3E50] font-medium">Kunststof Lamellen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#fafbfc] via-[#f7f9fa] to-white">
        {/* Luxury Hero Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Sophisticated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f2f4f6] via-[#f5f7f9] to-[#eef2f5]"></div>
          <div 
            className="absolute inset-0 opacity-6" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A5568' fill-opacity='0.3'%3E%3Cpolygon points='30 15 45 30 30 45 15 30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A5568] to-[#6B7785] text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                <Factory className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Industriële Precisie</span>
              </div>
              
              {/* Luxury Heading */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2C3E50] font-light mb-8 tracking-tight leading-none">
                <span className="block">Premium</span>
                <span className="block bg-gradient-to-r from-[#4A5568] via-[#6B7785] to-[#4A5568] bg-clip-text text-transparent font-medium">
                  Kunststof Lamellen
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
                  Industriële Elegantie
                </span>
              </h1>
              
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#4A5568]"></div>
                <Hexagon className="h-6 w-6 text-[#4A5568]" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#4A5568]"></div>
              </div>
              
              <p className="font-light text-2xl md:text-3xl text-[#2C3E50] leading-relaxed mb-12 max-w-4xl mx-auto">
                <span className="font-medium italic">Industriële sterkte</span> ontmoet moderne verfijning. 
                Onze premium kunststof lamellen bieden superieure functionaliteit en tijdloze esthétiek, 
                ontworpen voor de meest veeleisende omgevingen.
              </p>
              
              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#4A5568] mb-2">99%</div>
                  <div className="text-sm text-[#6B7785] uppercase tracking-wider">Onderhoudsvrij</div>
                </div>
                <div className="text-center border-x border-[#dce2e8]">
                  <div className="text-3xl font-light text-[#4A5568] mb-2">5</div>
                  <div className="text-sm text-[#6B7785] uppercase tracking-wider">Jaar Garantie</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#4A5568] mb-2">∞</div>
                  <div className="text-sm text-[#6B7785] uppercase tracking-wider">Configuraties</div>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] hover:from-[#34495e] hover:to-[#2C3E50] text-white px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border border-[#4A5568]/20"
                  >
                    <Factory className="mr-3 h-5 w-5" />
                    Ontdek Industriële Oplossingen
                  </Button>
                </Link>
                <div className="text-sm text-[#6B7785] italic">Gratis functioneel advies & opmeting</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fafbfc] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Triangle className="h-6 w-6 text-[#4A5568]" />
                <span className="text-[#6B7785] uppercase tracking-wider text-sm font-medium">Functionele Superioriteit</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Precisie in elk Aspect
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#4A5568] to-[#6B7785] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fafbfc] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#4A5568] to-[#6B7785] shadow-lg group-hover:scale-110 transition-transform duration-300">
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
        <section className="py-24 bg-gradient-to-br from-[#f2f4f6] via-[#f5f7f9] to-[#eef2f5] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#4A5568]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#6B7785]/10 to-transparent rounded-full blur-3xl"></div>
          
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Square className="h-6 w-6 text-[#4A5568]" />
                <span className="text-[#6B7785] uppercase tracking-wider text-sm font-medium">Functionele Configuratie</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Uw Optimale Configuratie
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#4A5568] to-[#6B7785] mx-auto mb-8"></div>
              <p className="text-lg text-[#6B7785] max-w-3xl mx-auto leading-relaxed">
                Configureer uw premium kunststof lamellen met onze industriële precisie-opties. 
                Elke specificatie wordt zorgvuldig afgestemd op uw functionele vereisten en operationele behoeften.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {personalizationOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4A5568] to-[#6B7785] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#4A5568] to-[#6B7785] mt-2 flex-shrink-0"></div>
                          <p className="text-[#6B7785] leading-relaxed">
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fafbfc] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Building className="h-6 w-6 text-[#4A5568]" />
                <span className="text-[#6B7785] uppercase tracking-wider text-sm font-medium">Professionele Toepassingen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Ideaal voor Veeleisende Sectoren
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#4A5568] to-[#6B7785] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {applications.map((app, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fafbfc] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center group"
                >
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-r from-[#4A5568] to-[#6B7785] shadow-lg group-hover:scale-110 transition-transform duration-300">
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
        <section className="py-24 bg-gradient-to-br from-[#f2f4f6] via-[#f5f7f9] to-[#eef2f5]">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Zap className="h-6 w-6 text-[#4A5568]" />
                <span className="text-[#6B7785] uppercase tracking-wider text-sm font-medium">Onderhoud & Hygiëne</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Superieure Functionaliteit
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#4A5568] to-[#6B7785] mx-auto"></div>
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
                        <div className="p-4 rounded-full bg-gradient-to-r from-[#4A5568] to-[#6B7785] shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {index === 0 && <Sparkles className="h-8 w-8 text-white" />}
                          {index === 1 && <Shield className="h-8 w-8 text-white" />}
                          {index === 2 && <Droplets className="h-8 w-8 text-white" />}
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fafbfc] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <HelpCircle className="h-6 w-6 text-[#4A5568]" />
                <span className="text-[#6B7785] uppercase tracking-wider text-sm font-medium">Functionele Vragen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Technische Ondersteuning
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#4A5568] to-[#6B7785] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none">
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <AccordionTrigger className="text-left text-[#2C3E50] font-medium px-8 py-6 hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gradient-to-r from-[#4A5568] to-[#6B7785] shadow-md">
                            <HelpCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-lg">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#6B7785] px-16 pb-6 text-lg leading-relaxed">
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
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A5568' fill-opacity='0.2'%3E%3Cpolygon points='40 20 60 40 40 60 20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-8">
                <Factory className="h-8 w-8 text-[#4A5568]" />
                <span className="text-[#4A5568] uppercase tracking-wider text-sm font-medium">Start Uw Functionele Transformatie</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight">
                Ontdek de Kracht van
                <span className="block font-medium bg-gradient-to-r from-[#4A5568] to-[#6B7785] bg-clip-text text-transparent">
                  Industriële Elegantie
                </span>
              </h2>
              
              <p className="text-xl mb-12 leading-relaxed text-gray-300 max-w-3xl mx-auto">
                Ontdek onze industriële kunststof collectie en ontvang binnen 24 uur een functioneel voorstel op maat. 
                Inclusief gratis functionele analyse en professionele technische opmeting.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#4A5568] to-[#6B7785] hover:from-[#6B7785] hover:to-[#4A5568] text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105"
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Functionele Analyse Aanvragen
                  </Button>
                </Link>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#4A5568] flex items-center justify-center text-white text-sm font-bold">5</div>
                    <div className="w-8 h-8 rounded-full bg-[#6B7785] flex items-center justify-center text-white">⭐</div>
                  </div>
                  <span className="text-sm">Meer dan 950+ functionele installaties</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default KunststofLamellenSimplePage;