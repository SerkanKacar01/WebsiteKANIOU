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
  Palette,
  Zap,
  Minimize2,
  Maximize2,
  Link2 as Chain,
} from "lucide-react";

const RolgordijnenSimplePage = () => {
  const keyFeatures = [
    "Strak design voor elk interieur",
    "Keuze uit verduisterend, lichtdoorlatend of screen",
    "Perfect voor slaapkamers, woonkamers of kantoren",
    "Eenvoudige bediening en montage",
    "Beschikbaar met cassette of open profiel",
  ];

  const customizationOptions = [
    {
      title: "Stoffen: wit, crème, grijs, zwart en meer",
      description: "Ruime keuze aan kleuren voor elke interieurstijl.",
      icon: Palette,
    },
    {
      title: "Bedieningsketting: kunststof of metaal",
      description: "Keuze tussen kunststof en hoogwaardige metalen ketingen.",
      icon: Chain,
    },
    {
      title: "Montage: in-de-dag",
      description: "Montage binnen de raamopening voor een strakke afwerking.",
      icon: Minimize2,
    },
    {
      title: "Montage: op-de-dag",
      description: "Montage op de muur of kozijn voor meer flexibiliteit.",
      icon: Maximize2,
    },
    {
      title: "Zijgeleiding (optioneel)",
      description: "Extra stabiliteit en geleiding voor perfecte werking.",
      icon: Settings,
    },
    {
      title: "Motorisering (optioneel)",
      description: "Elektrische bediening voor ultiem gemak en comfort.",
      icon: Zap,
    },
  ];

  const maintenanceInfo = [
    "Regelmatig afstoffen",
    "Stof voorzichtig afnemen met droge doek",
    "Vermijd natte reiniging",
    "Bij vlekken professionele reiniging aanbevolen",
  ];

  const faqs = [
    {
      question: "Wat is het verschil tussen verduisterend en lichtdoorlatend?",
      answer: "Verduisterende rolgordijnen blokkeren bijna al het licht en zijn ideaal voor slaapkamers. Lichtdoorlatende gordijnen filteren licht en bieden privacy terwijl ze natuurlijk licht doorlaten.",
    },
    {
      question: "Wat zijn screen rolgordijnen?",
      answer: "Screen rolgordijnen zijn gemaakt van opengeweven stof die zonwering biedt terwijl u nog naar buiten kunt kijken. Perfect voor kantoren en woonkamers.",
    },
    {
      question: "Wat is het voordeel van een cassette?",
      answer: "Een cassette beschermt het doek tegen stof en zorgt voor een nettere afwerking. Het geeft ook een luxere uitstraling aan uw rolgordijn.",
    },
    {
      question: "Kunnen rolgordijnen gemotoriseerd worden?",
      answer: "Ja, rolgordijnen kunnen worden uitgerust met een motor voor elektrische bediening via afstandsbediening of app.",
    },
  ];

  return (
    <PageLayout
      title="Rolgordijnen"
      subtitle="KANIOU Collectie"
      description="Rolgordijnen zijn dé klassieker in raamdecoratie: strak, functioneel en geschikt voor elke ruimte. Ze zijn beschikbaar in verschillende stoffen en afwerkingen, van lichtdoorlatend tot verduisterend."
      metaDescription="Rolgordijnen zijn dé klassieker in raamdecoratie: strak, functioneel en geschikt voor elke ruimte. Ze zijn beschikbaar in verschillende stoffen en afwerkingen, van lichtdoorlatend tot verduisterend."
      breadcrumbs={[{ label: "Producten" }, { label: "Rolgordijnen" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Voordelen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">onze rolgordijnen</span>?
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
              Personaliseer <span className="font-medium italic text-[#D5B992]">uw rolgordijnen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
              Kies uit verschillende opties om uw rolgordijnen perfect af te stemmen op uw wensen en interieur.
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
                Eenvoudig <span className="font-medium italic text-[#D5B992]">onderhoud</span>
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
                      Lange levensduur
                    </h4>
                    <p className="font-body text-[#8B7355] text-center leading-relaxed">
                      Met minimaal onderhoud behouden uw rolgordijnen jarenlang hun strakke uitstraling en functionaliteit.
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

export default RolgordijnenSimplePage;
