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
  Crown,
  Gem,
  Award,
  Star,
  Palette,
  Wrench,
  Users,
  Zap,
  Home,
  Building,
  Calculator,
  Gauge,
  Ruler,
  CornerDownRight,
  Minimize2,
  Maximize2,
  Square,
  CircleDot,
  Anchor,
  Grid3X3,
  Route,
  Package,
  Cog,
} from "lucide-react";

const GordijnrailsSimplePage = () => {
  const keyFeatures = [
    "Verschillende modellen: standaard, KS-rail, Wave-rail",
    "Verkrijgbaar in wit, zwart of zilver",
    "Stevig materiaal – geschikt voor zware stoffen",
    "Met of zonder bochten (op maat gebogen mogelijk)",
    "Ook beschikbaar met plafondsteunen",
  ];

  const customizationOptions = [
    {
      title: "Geen bocht",
      description: "Rechte rail voor standaard toepassingen en eenvoudige montage.",
      icon: Ruler,
    },
    {
      title: "90° binnenbocht",
      description: "Voor hoekoplossingen waarbij de rail naar binnen buigt.",
      icon: CornerDownRight,
    },
    {
      title: "90° buitenbocht",
      description: "Voor hoekoplossingen waarbij de rail naar buiten buigt.",
      icon: Route,
    },
    {
      title: "Speciale bochten",
      description: "Op maat gemaakte bochten voor unieke situaties en architectuur.",
      icon: Settings,
    },
    {
      title: "Wandmontage",
      description: "Traditionele montage tegen de wand voor sterke bevestiging.",
      icon: Square,
    },
    {
      title: "Plafondmontage",
      description: "Montage tegen het plafond voor moderne uitstraling.",
      icon: Grid3X3,
    },
    {
      title: "Steunen (advies: 2/m)",
      description: "Optimaal aantal steunen voor perfecte stabiliteit.",
      icon: Anchor,
    },
    {
      title: "Toebehoren complete set",
      description: "Eindstop, runners en carriers voor complete installatie.",
      icon: Package,
    },
  ];

  const railModels = [
    {
      title: "Standaard Rail",
      description: "Veelzijdige rail voor alle gangbare gordijntypes en toepassingen.",
      icon: Ruler,
    },
    {
      title: "KS-Rail",
      description: "Professionele rail met superieure glijding en duurzaamheid.",
      icon: Gauge,
    },
    {
      title: "Wave-Rail",
      description: "Speciaal ontwikkeld voor wave-plooien en moderne gordijnstijlen.",
      icon: Route,
    },
  ];

  const maintenanceInfo = [
    "Onderhoudsvrij – enkel afnemen bij stofvorming",
    "Regelmatige controle van bevestigingen",
    "Glijders indien nodig smeren met druppel olie",
    "Bij zware belasting periodieke inspectie",
  ];

  const faqs = [
    {
      question: "Wat is het verschil tussen de verschillende railmodellen?",
      answer: "Standaard rails zijn ideaal voor alle gangbare gordijnen. KS-rails bieden superieure glijding en zijn stiller. Wave-rails zijn speciaal ontworpen voor wave-plooien en geven een moderne uitstraling.",
    },
    {
      question: "Hoeveel steunen heb ik nodig per meter?",
      answer: "Wij adviseren 2 steunen per meter voor optimale stabiliteit. Bij zeer zware gordijnen kunnen meer steunen nodig zijn.",
    },
    {
      question: "Kunnen rails op maat gebogen worden?",
      answer: "Ja, wij kunnen rails op maat buigen voor speciale bochten en unieke architecturale situaties.",
    },
    {
      question: "Wat is het verschil tussen wand- en plafondmontage?",
      answer: "Wandmontage is traditioneel en biedt sterke bevestiging. Plafondmontage geeft een moderne uitstraling en kan ruimte visueel groter maken.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Gordijnrails – De perfecte basis voor jouw gordijnen | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Een goede gordijnrail is de ruggengraat van je raamdecoratie. Onze railsystemen zijn geschikt voor elk type gordijn, van lichte vitrages tot zware overgordijnen. Stevig, elegant en op maat gemaakt."
        />
      </Helmet>

      {/* Luxury Breadcrumb */}
      <div className="bg-gradient-to-r from-[#f8f6f0] via-[#faf8f2] to-[#f8f6f0] py-6 border-b border-[#e8e4dc]/30">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#8B7355] hover:text-[#D5B992] transition-colors duration-300 flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#D5B992]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#8B7355] hover:text-[#D5B992] transition-colors duration-300">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3 text-[#D5B992]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[#2C3E50] font-medium">Gordijnrails</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#fdfcf8] via-[#faf8f2] to-white">
        {/* Luxury Hero Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Sophisticated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed]"></div>
          <div 
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D5B992' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5B992] to-[#E6C988] text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                <Anchor className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Perfecte Basis</span>
              </div>
              
              {/* Luxury Heading */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2C3E50] font-light mb-8 tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-[#D5B992] via-[#E6C988] to-[#D5B992] bg-clip-text text-transparent font-medium">
                  Gordijnrails
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
                  De perfecte basis voor jouw gordijnen
                </span>
              </h1>
              
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D5B992]"></div>
                <Ruler className="h-6 w-6 text-[#D5B992]" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D5B992]"></div>
              </div>
              
              <p className="font-light text-2xl md:text-3xl text-[#2C3E50] leading-relaxed mb-12 max-w-4xl mx-auto">
                Een goede gordijnrail is <span className="font-medium italic">de ruggengraat van je raamdecoratie</span>. 
                Onze railsystemen zijn geschikt voor elk type gordijn, van lichte vitrages tot zware overgordijnen. 
                Stevig, elegant en op maat gemaakt.
              </p>
              
              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#D5B992] mb-2"><Shield className="h-8 w-8 mx-auto" /></div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Stevig Materiaal</div>
                </div>
                <div className="text-center border-x border-[#e8e4dc]">
                  <div className="text-3xl font-light text-[#D5B992] mb-2"><Cog className="h-8 w-8 mx-auto" /></div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Op Maat</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#D5B992] mb-2"><Star className="h-8 w-8 mx-auto" /></div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Elegant Design</div>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/gordijnrails-configurator">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] hover:from-[#34495e] hover:to-[#2C3E50] text-white px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border border-[#D5B992]/20"
                  >
                    <Calculator className="mr-3 h-5 w-5" />
                    Bereken jouw rails
                  </Button>
                </Link>
                <div className="text-sm text-[#8B7355] italic">Gratis consult & opmeting</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Rail Models Section */}
        <section className="py-24 relative">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Modellen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Onze <span className="font-medium italic text-[#D5B992]">railsystemen</span>
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
              <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
                Verschillende modellen voor elke toepassing en stijl.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {railModels.map((model, index) => {
                const IconComponent = model.icon;
                return (
                  <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-4">{model.title}</h3>
                      <p className="font-body text-[#8B7355] leading-relaxed">{model.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed]">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Voordelen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">onze gordijnrails</span>?
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-body text-[#2C3E50] text-lg leading-relaxed">{feature}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Customization Options Section */}
        <section className="py-24">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Opties</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Personaliseer <span className="font-medium italic text-[#D5B992]">uw gordijnrails</span>
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
              <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
                Kies uit verschillende bochten, montage opties en toebehoren voor de perfecte oplossing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customizationOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Card key={index} className="group border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-[#2C3E50] mb-3">{option.title}</h3>
                          <p className="font-body text-[#8B7355] leading-relaxed">{option.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Maintenance Section */}
        <section className="py-24 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Onderhoud</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                  Minimaal <span className="font-medium italic text-[#D5B992]">onderhoud</span>
                </h2>
                <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
              </div>

              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#2C3E50] mb-6">Onderhoudsadvies</h3>
                      <div className="space-y-4">
                        {maintenanceInfo.map((info, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-[#D5B992] flex-shrink-0 mt-0.5" />
                            <span className="font-body text-[#2C3E50]">{info}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#f8f6f0] to-[#faf8f2] rounded-2xl p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Cog className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-display text-xl font-semibold text-[#2C3E50] text-center mb-4">
                        Onderhoudsvrij systeem
                      </h4>
                      <p className="font-body text-[#8B7355] text-center leading-relaxed">
                        Onze gordijnrails zijn ontworpen voor jarenlange zorgeloze werking met minimaal onderhoud.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
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
                  <AccordionItem key={index} value={`item-${index}`} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
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

        {/* Final CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E50] via-[#34495e] to-[#2C3E50]"></div>
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5B992' fill-opacity='0.6'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full mb-8">
                <Crown className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Stabiliteit en elegantie in één rail</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl text-white font-light mb-8 leading-tight">
                Klaar voor <span className="font-medium italic text-[#E6C988]">uw perfecte gordijnrails</span>?
              </h2>
              
              <p className="font-body text-xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
                Vraag vandaag nog jouw gordijnrails-offerte aan en ervaar de perfecte combinatie 
                van stabiliteit en elegantie.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/gordijnrails-configurator">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#D5B992] to-[#E6C988] hover:from-[#E6C988] hover:to-[#D5B992] text-[#2C3E50] px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border-2 border-transparent hover:border-white/20"
                  >
                    <Calculator className="mr-3 h-5 w-5" />
                    Bereken jouw rails
                  </Button>
                </Link>
                <div className="text-white/70 text-lg italic">Gratis advies & persoonlijke service</div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default GordijnrailsSimplePage;