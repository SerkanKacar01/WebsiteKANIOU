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
  Gem,
  Palette,
  Eye,
  EyeOff,
  Layers,
  Shirt,
  WashingMachine,
} from "lucide-react";

const OvergordijnenSimplePage = () => {
  const keyFeatures = [
    "Verduisterend of lichtdimmend mogelijk",
    "Akoestische en isolerende werking",
    "Diverse plooien: enkele, dubbele, wave-plooi",
    "Op maat gemaakt voor elk interieur",
    "Combineerbaar met vitrages of inbetween",
  ];

  const customizationOptions = [
    {
      title: "Velours stoffen",
      description: "Luxueuze velours stoffen voor een rijke uitstraling en warme sfeer.",
      icon: Gem,
    },
    {
      title: "Linnenlook stoffen",
      description: "Natuurlijke linnenlook voor een casual maar elegante uitstraling.",
      icon: Shirt,
    },
    {
      title: "Dimout stoffen",
      description: "Lichtdimmende stoffen die het meeste licht tegenhouden maar niet volledig verduisteren.",
      icon: Eye,
    },
    {
      title: "Blackout stoffen",
      description: "Volledig verduisterende stoffen voor optimale rust en privacy.",
      icon: EyeOff,
    },
    {
      title: "Kleuren: van neutraal tot opvallend",
      description: "Uitgebreide kleurenkeuze van subtiele tinten tot statement kleuren.",
      icon: Palette,
    },
    {
      title: "Bevestiging: rail, roede of ringen",
      description: "Verschillende bevestigingsmogelijkheden voor elke interieurstijl.",
      icon: Settings,
    },
    {
      title: "Voering (optioneel)",
      description: "Extra voering voor verbeterde verduistering en isolatie.",
      icon: Layers,
    },
  ];

  const maintenanceInfo = [
    "Regelmatig uitkloppen of zacht stofzuigen",
    "Sommige stoffen zijn wasbaar of stoomreinbaar",
    "Professionele reiniging voor optimaal resultaat",
    "Vermijd direct zonlicht bij het drogen",
  ];

  const faqs = [
    {
      question: "Wat is het verschil tussen enkele en dubbele plooi?",
      answer: "Enkele plooi geeft een strakke, moderne uitstraling. Dubbele plooi zorgt voor meer volume en een klassieke, luxe uitstraling met meer stofgebruik.",
    },
    {
      question: "Wat zijn wave-plooien?",
      answer: "Wave-plooien geven een elegante, golvende uitstraling die zeer modern en stijlvol is. Ze hangen altijd perfect en geven een luxe uitstraling.",
    },
    {
      question: "Kunnen overgordijnen gecombineerd worden met andere raamdecoratie?",
      answer: "Ja, overgordijnen combineren perfect met vitrages voor overdag of inbetween gordijnen voor extra privacy en lichtregulatie.",
    },
    {
      question: "Hoe verbeteren overgordijnen de akoestiek?",
      answer: "Zware stoffen en plooien in overgordijnen absorberen geluid, waardoor echo en geluidsoverlast worden verminderd voor een aangenamere ruimte.",
    },
  ];

  return (
    <PageLayout
      title="Overgordijnen"
      subtitle="KANIOU Collectie"
      description="Overgordijnen zorgen voor een warme uitstraling in elke ruimte. Ze zijn ideaal voor het creëren van privacy, het tegenhouden van licht én het verbeteren van de akoestiek. Verkrijgbaar in diverse stoffen, kleuren en plooistijlen."
      metaDescription="Overgordijnen zorgen voor een warme uitstraling in elke ruimte. Ze zijn ideaal voor het creëren van privacy, het tegenhouden van licht én het verbeteren van de akoestiek. Verkrijgbaar in diverse stoffen, kleuren en plooistijlen."
      breadcrumbs={[{ label: "Producten" }, { label: "Overgordijnen" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Voordelen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">onze overgordijnen</span>?
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
              Personaliseer <span className="font-medium italic text-[#D5B992]">uw overgordijnen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
              Kies uit verschillende stoffen, kleuren en plooistijlen om uw overgordijnen perfect af te stemmen op uw interieur.
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
                Zorg voor <span className="font-medium italic text-[#D5B992]">langdurige schoonheid</span>
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
                      <WashingMachine className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-display text-xl font-semibold text-[#2C3E50] text-center mb-4">
                      Professionele service
                    </h4>
                    <p className="font-body text-[#8B7355] text-center leading-relaxed">
                      Voor optimaal resultaat adviseren wij professionele reiniging die de kwaliteit en kleur van uw gordijnen behoudt.
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

export default OvergordijnenSimplePage;
