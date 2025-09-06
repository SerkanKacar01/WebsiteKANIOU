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
  Building,
  Home,
  DoorOpen,
  Bed,
  Users,
  Volume2,
  Crown,
  Gem,
  Award,
  Star,
  Palette,
  Scissors,
  Feather,
  Waves,
  Eye,
  Layers,
} from "lucide-react";

const TextielLamellenSimplePage = () => {
  const advantages = [
    "Perfect voor grote ramen en schuifdeuren",
    "Verkrijgbaar in 89 mm of 127 mm breedte",
    "Verduisterend, lichtdoorlatend of transparant",
    "Veel keuze in kleuren en structuren",
    "Geluidsabsorberend en warmtewerend",
    "Geschikt voor kantoren én woningen",
    "Op maat gemaakt voor elke ruimte",
  ];

  const personalizationOptions = [
    {
      title: "Lamelbreedte",
      items: [
        "89 mm (meest gekozen)",
        "127 mm (grotere doorkijk)",
      ],
      icon: Layers,
    },
    {
      title: "Stofsoort",
      items: [
        "Verduisterend",
        "Lichtdoorlatend",
        "Transparant (screen of voile)",
      ],
      icon: Eye,
    },
    {
      title: "Kleuren & structuren",
      items: [
        "Uni-kleuren, prints, geweven structuren",
        "Natuurtinten, wit, grijs, zwart, kleuraccenten",
      ],
      icon: Palette,
    },
    {
      title: "Bediening",
      items: [
        "Koord + ketting (standaard)",
        "Monocommando (1 stang voor draaien en openen)",
        "Optioneel: elektrisch bedienbaar",
      ],
      icon: Settings,
    },
    {
      title: "Montage",
      items: [
        "Plafond- of wandmontage",
        "In de dag of op de dag",
        "Geschikt voor gebogen rails (bijvoorbeeld erker)",
      ],
      icon: Award,
    },
  ];

  const applications = [
    { icon: Building, label: "Kantoorruimtes" },
    { icon: Home, label: "Woonkamers met hoge ramen" },
    { icon: DoorOpen, label: "Schuifdeuren en serres" },
    { icon: Bed, label: "Slaapkamers (verduisterende variant)" },
    { icon: Users, label: "Gezinswoningen met grote glaspartijen" },
  ];

  const maintenanceInfo = [
    "Textiel lamellen zijn stofwerend behandeld",
    "Regelmatig afstoffen of met een plumeau",
    "Sommige stoffen zijn afneembaar of wasbaar",
  ];

  const faqs = [
    {
      question: "Zijn textiel lamellen geschikt voor schuine ramen?",
      answer: "Ja, met speciale systemen kunnen ze ook schuin worden gemonteerd.",
    },
    {
      question: "Kan ik ze gebruiken in een kantooromgeving?",
      answer: "Zeker, textiel lamellen hebben vaak een akoestische werking en geven een professionele uitstraling.",
    },
    {
      question: "Zijn er brandvertragende stoffen beschikbaar?",
      answer: "Ja, wij bieden ook stoffen met brandvertragende certificering aan – ideaal voor projecten en openbare ruimtes.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Luxe Textiel Lamellen – Elegante Stofkunst voor Exclusieve Interieurs | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze exclusieve collectie textiel lamellen. Handgemaakte elegantie in premium stoffen, volledig op maat voor discerning interieurs. Tijdloze verfijning ontmoet moderne functionaliteit."
        />
      </Helmet>

      {/* Luxury Breadcrumb */}
      <div className="bg-gradient-to-r from-[#f5f3f8] via-[#f8f6fa] to-[#f5f3f8] py-6 border-b border-[#e6e0ea]/30">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#8B7B85] hover:text-[#B8A8C8] transition-colors duration-300 flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#B8A8C8]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#8B7B85] hover:text-[#B8A8C8] transition-colors duration-300">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#B8A8C8]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[#2C3E50] font-medium">Textiel Lamellen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#fdfcfe] via-[#faf8fc] to-white">
        {/* Luxury Hero Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Sophisticated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f3f8] via-[#f8f6fa] to-[#f2f0f5]"></div>
          <div 
            className="absolute inset-0 opacity-4" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8A8C8' fill-opacity='0.3'%3E%3Cpath d='M40 40c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                <Feather className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Premium Textiel Kunst</span>
              </div>
              
              {/* Luxury Heading */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2C3E50] font-light mb-8 tracking-tight leading-none">
                <span className="block">Luxe</span>
                <span className="block bg-gradient-to-r from-[#B8A8C8] via-[#D4C7DD] to-[#B8A8C8] bg-clip-text text-transparent font-medium">
                  Textiel Lamellen
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
                  Elegante Stofkunst
                </span>
              </h1>
              
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B8A8C8]"></div>
                <Scissors className="h-6 w-6 text-[#B8A8C8]" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B8A8C8]"></div>
              </div>
              
              <p className="font-light text-2xl md:text-3xl text-[#2C3E50] leading-relaxed mb-12 max-w-4xl mx-auto">
                <span className="font-medium italic">Verfijnde elegantie</span> in elke vezel. 
                Onze exclusieve textiel lamellen transformeren ruimtes met zachte lijnen en luxueuze stoffen, 
                perfect voor de meest veeleisende interieurs.
              </p>
              
              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#B8A8C8] mb-2">500+</div>
                  <div className="text-sm text-[#8B7B85] uppercase tracking-wider">Premium Stoffen</div>
                </div>
                <div className="text-center border-x border-[#e6e0ea]">
                  <div className="text-3xl font-light text-[#B8A8C8] mb-2">100%</div>
                  <div className="text-sm text-[#8B7B85] uppercase tracking-wider">Op Maat</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#B8A8C8] mb-2">∞</div>
                  <div className="text-sm text-[#8B7B85] uppercase tracking-wider">Design Mogelijkheden</div>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] hover:from-[#34495e] hover:to-[#2C3E50] text-white px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border border-[#B8A8C8]/20"
                  >
                    <Feather className="mr-3 h-5 w-5" />
                    Ontdek Uw Perfecte Stof
                  </Button>
                </Link>
                <div className="text-sm text-[#8B7B85] italic">Gratis stofadvies & opmeting</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fdfcfe] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Waves className="h-6 w-6 text-[#B8A8C8]" />
                <span className="text-[#8B7B85] uppercase tracking-wider text-sm font-medium">Exclusieve Eigenschappen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Verfijning in elk Detail
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fdfcfe] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] shadow-lg group-hover:scale-110 transition-transform duration-300">
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
        <section className="py-24 bg-gradient-to-br from-[#f5f3f8] via-[#f8f6fa] to-[#f2f0f5] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B8A8C8]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D4C7DD]/10 to-transparent rounded-full blur-3xl"></div>
          
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Palette className="h-6 w-6 text-[#B8A8C8]" />
                <span className="text-[#8B7B85] uppercase tracking-wider text-sm font-medium">Maatwerk Opties</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Uw Unieke Stofcreatie
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] mx-auto mb-8"></div>
              <p className="text-lg text-[#8B7B85] max-w-3xl mx-auto leading-relaxed">
                Componeer uw perfecte textiel lamellen met onze luxueuze stoffencollectie. 
                Elke keuze wordt zorgvuldig afgestemd op uw persoonlijke smaak en interieurstijl.
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
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] mt-2 flex-shrink-0"></div>
                          <p className="text-[#8B7B85] leading-relaxed">
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fdfcfe] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Building className="h-6 w-6 text-[#B8A8C8]" />
                <span className="text-[#8B7B85] uppercase tracking-wider text-sm font-medium">Premium Toepassingen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Ideaal voor Exclusieve Ruimtes
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {applications.map((app, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fdfcfe] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center group"
                >
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] shadow-lg group-hover:scale-110 transition-transform duration-300">
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
        <section className="py-24 bg-gradient-to-br from-[#f5f3f8] via-[#f8f6fa] to-[#f2f0f5]">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Shield className="h-6 w-6 text-[#B8A8C8]" />
                <span className="text-[#8B7B85] uppercase tracking-wider text-sm font-medium">Zorg & Onderhoud</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Duurzame Elegantie
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] mx-auto"></div>
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
                        <div className="p-4 rounded-full bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {index === 0 && <Shield className="h-8 w-8 text-white" />}
                          {index === 1 && <Sparkles className="h-8 w-8 text-white" />}
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fdfcfe] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <HelpCircle className="h-6 w-6 text-[#B8A8C8]" />
                <span className="text-[#8B7B85] uppercase tracking-wider text-sm font-medium">Veelgestelde Vragen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Expertise tot Uw Dienst
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none">
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <AccordionTrigger className="text-left text-[#2C3E50] font-medium px-8 py-6 hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] shadow-md">
                            <HelpCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-lg">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#8B7B85] px-16 pb-6 text-lg leading-relaxed">
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
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8A8C8' fill-opacity='0.1'%3E%3Cpath d='M60 60c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-8">
                <Feather className="h-8 w-8 text-[#B8A8C8]" />
                <span className="text-[#B8A8C8] uppercase tracking-wider text-sm font-medium">Begin Uw Stoffenreis</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight">
                Transformeer Uw Ruimte met
                <span className="block font-medium bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] bg-clip-text text-transparent">
                  Luxueuze Textiel Elegantie
                </span>
              </h2>
              
              <p className="text-xl mb-12 leading-relaxed text-gray-300 max-w-3xl mx-auto">
                Ontdek onze exclusieve stoffencollectie en ontvang binnen 24 uur een gepersonaliseerd voorstel. 
                Inclusief gratis stofadvies en professionele opmeting door onze textielspecialisten.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#B8A8C8] to-[#D4C7DD] hover:from-[#D4C7DD] hover:to-[#B8A8C8] text-[#2C3E50] px-12 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105"
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Exclusieve Stofconsultatie
                  </Button>
                </Link>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#B8A8C8] flex items-center justify-center text-white text-sm font-bold">5</div>
                    <div className="w-8 h-8 rounded-full bg-[#D4C7DD] flex items-center justify-center text-white">⭐</div>
                  </div>
                  <span className="text-sm">Meer dan 750+ exclusieve projecten</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default TextielLamellenSimplePage;