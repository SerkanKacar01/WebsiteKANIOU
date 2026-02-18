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
  Settings,
  Shield,
  Sparkles,
  HelpCircle,
  Gem,
  Ruler,
  PaintBucket,
  FoldHorizontal,
  DoorOpen,
  Move,
  Maximize2,
  Minimize2,
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
    <PageLayout
      title="Houten Shutters"
      subtitle="KANIOU Collectie"
      description="Shutters zijn houten binnenluiken met verstelbare lamellen. Ze bieden optimale controle over lichtinval en privacy, en geven elke ruimte een luxe, mediterrane uitstraling."
      metaDescription="Shutters zijn houten binnenluiken met verstelbare lamellen. Ze bieden optimale controle over lichtinval en privacy, en geven elke ruimte een luxe, mediterrane uitstraling. Onze BD LINE shutters staan bekend om hun topkwaliteit en afwerking."
      breadcrumbs={[{ label: "Producten" }, { label: "Houten Shutters" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
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

      <section className="py-16 lg:py-20">
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

      <section className="py-16 lg:py-20 bg-white">
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

      <section className="py-16 lg:py-20">
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
    </PageLayout>
  );
};

export default HoutenShuttersSimplePage;