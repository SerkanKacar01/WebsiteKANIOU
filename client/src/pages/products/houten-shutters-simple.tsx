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
  Eye,
  EyeOff,
  Sun,
  Moon,
  TreePine,
  Ruler,
  Layers,
  PaintBucket,
  FoldHorizontal,
  DoorOpen,
  Move,
  Maximize2,
  Minimize2,
  Target,
  Medal,
} from "lucide-react";

const HoutenShuttersSimplePage = () => {
  const keyFeatures = [
    "Gemaakt van hoogwaardig hout",
    "Verstelbare lamellen voor lichtregeling",
    "Beschikbaar in wit, crème en houttinten",
    "Perfect voor ramen, deuren en erkers",
    "Op maat gemaakt met millimeterprecisie",
  ];

  const customizationOptions = [
    {
      title: "Lamelbreedte: 63 mm",
      description: "Klassieke lamelbreedte voor een tijdloze uitstraling.",
      icon: Ruler,
    },
    {
      title: "Lamelbreedte: 76 mm",
      description: "Populaire standaard lamelbreedte met optimale lichtcontrole.",
      icon: Ruler,
    },
    {
      title: "Lamelbreedte: 89 mm",
      description: "Brede lamellen voor een moderne, luxe uitstraling.",
      icon: Ruler,
    },
    {
      title: "Afwerking: mat",
      description: "Elegante matte afwerking voor een natuurlijke uitstraling.",
      icon: PaintBucket,
    },
    {
      title: "Afwerking: zijdeglans",
      description: "Subtiele glans voor een verfijnde, luxueuze look.",
      icon: Gem,
    },
    {
      title: "Afwerking: gelakt",
      description: "Hoogglans gelakte afwerking voor maximale bescherming.",
      icon: Shield,
    },
    {
      title: "Vouwsysteem",
      description: "Traditioneel vouwsysteem voor compacte opberging.",
      icon: FoldHorizontal,
    },
    {
      title: "Scharniersysteem",
      description: "Klassieke scharniers voor eenvoudige bediening.",
      icon: DoorOpen,
    },
    {
      title: "Schuifsysteem",
      description: "Modern schuifsysteem voor ruimtebesparende oplossingen.",
      icon: Move,
    },
    {
      title: "Montage: in-de-dag",
      description: "Montage binnen de raamopening voor strakke afwerking.",
      icon: Minimize2,
    },
    {
      title: "Montage: op-de-dag",
      description: "Montage op de muur voor flexibele plaatsing.",
      icon: Maximize2,
    },
  ];

  const maintenanceInfo = [
    "Stofvrij maken met plumeau of droge doek",
    "Hout nooit nat reinigen",
    "Gebruik geen agressieve middelen",
    "Regelmatige controle van scharnieren en mechanisme",
  ];

  const faqs = [
    {
      question: "Wat is het verschil tussen de verschillende lamelbreedtes?",
      answer: "63mm geeft een klassieke look, 76mm is de populaire standaard met goede lichtcontrole, en 89mm biedt een moderne, luxe uitstraling met maximale lichtregeling.",
    },
    {
      question: "Welke afwerking kies ik het beste?",
      answer: "Mat geeft een natuurlijke uitstraling, zijdeglans is elegant en verfijnd, gelakt biedt de beste bescherming tegen vocht en slijtage.",
    },
    {
      question: "Wat is het verschil tussen in-de-dag en op-de-dag montage?",
      answer: "In-de-dag montage plaatst shutters binnen de raamopening voor een strakke look. Op-de-dag montage bevestigt ze aan de muur voor meer flexibiliteit.",
    },
    {
      question: "Zijn BD LINE shutters geschikt voor badkamers?",
      answer: "Houten shutters kunnen in badkamers gebruikt worden, maar vereisen extra bescherming tegen vocht. Overleg dit altijd met onze specialisten.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Houten Shutters – Tijdloze klasse en controle over licht | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Shutters zijn houten binnenluiken met verstelbare lamellen. Ze bieden optimale controle over lichtinval en privacy, en geven elke ruimte een luxe, mediterrane uitstraling. Onze BD LINE shutters staan bekend om hun topkwaliteit en afwerking."
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
                <BreadcrumbLink className="text-[#2C3E50] font-medium">Houten Shutters</BreadcrumbLink>
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
                <Medal className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">BD LINE Kwaliteit</span>
              </div>
              
              {/* Luxury Heading */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2C3E50] font-light mb-8 tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-[#D5B992] via-[#E6C988] to-[#D5B992] bg-clip-text text-transparent font-medium">
                  Houten Shutters
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
                  Tijdloze klasse en controle over licht
                </span>
              </h1>
              
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D5B992]"></div>
                <TreePine className="h-6 w-6 text-[#D5B992]" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D5B992]"></div>
              </div>
              
              <p className="font-light text-2xl md:text-3xl text-[#2C3E50] leading-relaxed mb-12 max-w-4xl mx-auto">
                Shutters zijn <span className="font-medium italic">houten binnenluiken met verstelbare lamellen</span>. 
                Ze bieden optimale controle over lichtinval en privacy, en geven elke ruimte een luxe, mediterrane uitstraling. 
                Onze BD LINE shutters staan bekend om hun topkwaliteit en afwerking.
              </p>
              
              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#D5B992] mb-2"><TreePine className="h-8 w-8 mx-auto" /></div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Hoogwaardig Hout</div>
                </div>
                <div className="text-center border-x border-[#e8e4dc]">
                  <div className="text-3xl font-light text-[#D5B992] mb-2"><Settings className="h-8 w-8 mx-auto" /></div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Verstelbare Lamellen</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#D5B992] mb-2"><Target className="h-8 w-8 mx-auto" /></div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Millimeterprecisie</div>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] hover:from-[#34495e] hover:to-[#2C3E50] text-white px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border border-[#D5B992]/20"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    Gratis offerte aanvragen
                  </Button>
                </Link>
                <div className="text-sm text-[#8B7355] italic">Gratis consult & opmeting</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 relative">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Voordelen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">BD LINE shutters</span>?
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
        <section className="py-24 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed]">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Opties</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Personaliseer <span className="font-medium italic text-[#D5B992]">uw shutters</span>
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
              <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
                Kies uit verschillende lamelbreedtes, afwerkingen en openingssystemen voor de perfecte shutters.
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
        <section className="py-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Onderhoud</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                  Zorg voor <span className="font-medium italic text-[#D5B992]">uw shutters</span>
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
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-display text-xl font-semibold text-[#2C3E50] text-center mb-4">
                        Bescherm uw investering
                      </h4>
                      <p className="font-body text-[#8B7355] text-center leading-relaxed">
                        Met juist onderhoud blijven uw BD LINE shutters jarenlang mooi en functioneel.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
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
                <span className="text-sm font-medium tracking-wide uppercase">Een tijdloze investering in stijl en functionaliteit</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl text-white font-light mb-8 leading-tight">
                Klaar voor <span className="font-medium italic text-[#E6C988]">uw BD LINE shutters</span>?
              </h2>
              
              <p className="font-body text-xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
                Vraag een gratis offerte aan voor BD LINE shutters op maat en ervaar 
                de perfecte combinatie van tijdloze elegantie en functionele lichtcontrole.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#D5B992] to-[#E6C988] hover:from-[#E6C988] hover:to-[#D5B992] text-[#2C3E50] px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border-2 border-transparent hover:border-white/20"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    Gratis offerte aanvragen
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

export default HoutenShuttersSimplePage;