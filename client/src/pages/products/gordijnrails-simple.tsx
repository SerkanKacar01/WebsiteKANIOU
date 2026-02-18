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
  Sparkles,
  HelpCircle,
  Shield,
  Ruler,
  CornerDownRight,
  Minimize2,
  Maximize2,
  Square,
  Anchor,
  Grid3X3,
  Route,
  Package,
  Cog,
  Gauge,
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
    <PageLayout
      title="Gordijnrails"
      subtitle="KANIOU Collectie"
      description="Een goede gordijnrail is de ruggengraat van je raamdecoratie. Onze railsystemen zijn geschikt voor elk type gordijn, van lichte vitrages tot zware overgordijnen. Stevig, elegant en op maat gemaakt."
      metaDescription="Een goede gordijnrail is de ruggengraat van je raamdecoratie. Onze railsystemen zijn geschikt voor elk type gordijn, van lichte vitrages tot zware overgordijnen. Stevig, elegant en op maat gemaakt."
      breadcrumbs={[{ label: "Producten" }, { label: "Gordijnrails" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
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

      <section className="py-16 lg:py-20">
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

      <section className="py-16 lg:py-20 bg-white">
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

      <section className="py-16 lg:py-20">
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

      <section className="py-16 lg:py-20 bg-white">
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
    </PageLayout>
  );
};

export default GordijnrailsSimplePage;
