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
  Palette,
  Settings,
  Shield,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const VouwgordijnenPage = () => {
  const keyFeatures = [
    "Volledig op maat gemaakt (breedte & hoogte exact afgestemd op jouw ramen)",
    "Verkrijgbaar in verduisterende, lichtdoorlatende en transparante stoffen",
    "Strak vouwmechanisme met kettingbediening of optionele elektrische motor",
    "Afneembare stof voor eenvoudig reinigen",
    "Perfect voor zowel moderne als klassieke interieurs",
    "Keuze uit honderden stoffen, kleuren en texturen",
    "Dubbele voering of thermische isolatie op aanvraag",
  ];

  const fabricTypes = [
    {
      title: "Linnen & katoenmixen",
      description: "Natuurlijke texturering met warme uitstraling",
      icon: Sparkles,
    },
    {
      title: "Velours & luxe geweven stoffen",
      description: "Rijke texturering voor elegante ruimtes",
      icon: Palette,
    },
    {
      title: "Screenstoffen voor zonwering",
      description: "Technische stoffen die zon weren maar uitzicht behouden",
      icon: Shield,
    },
  ];

  const operationOptions = [
    {
      title: "Standaard kettingbediening",
      description: "Links of rechts bediening naar keuze",
      details: "Betrouwbaar en eenvoudig te bedienen",
    },
    {
      title: "Kindveilige systemen",
      description: "Veilig voor gezinnen met kinderen",
      details: "Voldoet aan alle veiligheidsnormen",
    },
    {
      title: "Gemotoriseerde bediening",
      description: "Elektrische bediening via afstandsbediening of app",
      details: "Luxe optie voor modern comfort",
    },
    {
      title: "Montage opties",
      description: "Plafond- of wandmontage mogelijk",
      details: "Professionele installatie door onze monteurs",
    },
  ];

  const faqs = [
    {
      question: "Kan ik zelf de stof kiezen?",
      answer: "Ja, we bieden stalen aan die je thuis kunt bekijken, of je komt langs in onze showroom voor persoonlijk advies.",
    },
    {
      question: "Zijn vouwgordijnen geschikt voor de keuken of badkamer?",
      answer: "Ja, mits je kiest voor vochtbestendige of gemakkelijk reinigbare stoffen. Wij adviseren je hier graag over.",
    },
    {
      question: "Hoe lang duurt de productie?",
      answer: "Gemiddeld tussen de 2 à 3 weken, afhankelijk van de gekozen stof en opties.",
    },
    {
      question: "Kan ik ze later reinigen?",
      answer: "Zeker. De meeste stoffen zijn voorzien van klittenband of haakjes en kunnen worden losgemaakt voor stomerij of handwas (afhankelijk van de stof).",
    },
  ];

  return (
    <PageLayout
      title="Vouwgordijnen"
      subtitle="KANIOU Collectie"
      description="Bij Kaniou Zilvernaald combineren we ambacht met functionaliteit. Onze vouwgordijnen worden volledig op maat gemaakt en zijn ideaal voor wie op zoek is naar stijlvolle, maar praktische raamdecoratie. Dankzij de zachte plooien creëren ze een warme en elegante sfeer in elke ruimte."
      metaDescription="Vouwgordijnen volledig op maat gemaakt met zachte plooien voor elegante raamdecoratie. Keuze uit verduisterende, lichtdoorlatende en transparante stoffen."
      breadcrumbs={[{ label: "Producten" }, { label: "Vouwgordijnen" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Voordelen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Belangrijkste <span className="font-medium italic text-[#D5B992]">kenmerken</span>
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
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Stoffen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Stoffen & <span className="font-medium italic text-[#D5B992]">afwerking</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wij werken met hoogwaardige stoffen van Europese topmerken. Je kunt kiezen uit een uitgebreide stoffenbibliotheek
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {fabricTypes.map((fabric, index) => {
              const IconComponent = fabric.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className="h-6 w-6 text-[#D5B992]" />
                      <h3 className="font-semibold text-[#2C3E50] text-lg">
                        {fabric.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {fabric.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-700 leading-relaxed text-center">
              Elke stof is zorgvuldig geselecteerd op basis van lichtfiltering, valgedrag en kleurechtheid. 
              We bieden ook opties met voering voor extra verduistering of isolatie.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Bediening</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Bediening & <span className="font-medium italic text-[#D5B992]">montage</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Onze vouwgordijnen kunnen worden uitgerust met verschillende bedieningsopties
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {operationOptions.map((option, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Settings className="h-6 w-6 text-[#D5B992] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#2C3E50] text-lg mb-2">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-2">
                        {option.description}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {option.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-700 leading-relaxed">
              Montage gebeurt door onze professionele installateurs, met oog voor precisie en afwerking.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Onze <span className="font-medium italic text-[#D5B992]">belofte</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bij Kaniou Zilvernaald leveren wij maatwerk van topkwaliteit met persoonlijke begeleiding. 
              Elk vouwgordijn wordt speciaal voor jou ontworpen, afgestemd op je interieur, ramen én voorkeuren.
            </p>
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

export default VouwgordijnenPage;