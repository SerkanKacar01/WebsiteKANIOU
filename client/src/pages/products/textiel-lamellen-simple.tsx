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
  Droplets,
  Sparkles,
  HelpCircle,
  Building,
  Home,
  DoorOpen,
  Bed,
  Users,
  Award,
  Palette,
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
    <PageLayout
      title="Textiel Lamellen"
      subtitle="KANIOU Collectie"
      description="Verfijnde elegantie in elke vezel. Onze exclusieve textiel lamellen transformeren ruimtes met zachte lijnen en luxueuze stoffen, perfect voor de meest veeleisende interieurs."
      metaDescription="Ontdek onze exclusieve collectie textiel lamellen. Handgemaakte elegantie in premium stoffen, volledig op maat voor discerning interieurs. Tijdloze verfijning ontmoet moderne functionaliteit."
      breadcrumbs={[{ label: "Producten" }, { label: "Textiel Lamellen" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Exclusieve Eigenschappen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Verfijning in elk <span className="font-medium italic text-[#D5B992]">detail</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-lg group-hover:scale-110 transition-transform duration-300">
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

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
              <Palette className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Maatwerk Opties</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Uw unieke <span className="font-medium italic text-[#D5B992]">stofcreatie</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
              Componeer uw perfecte textiel lamellen met onze luxueuze stoffencollectie. 
              Elke keuze wordt zorgvuldig afgestemd op uw persoonlijke smaak en interieurstijl.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalizationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="group border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold text-[#2C3E50] mb-3">{option.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {option.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] mt-2 flex-shrink-0"></div>
                          <p className="text-[#8B7355] leading-relaxed">{item}</p>
                        </div>
                      ))}
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <Building className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Premium Toepassingen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Ideaal voor exclusieve <span className="font-medium italic text-[#D5B992]">ruimtes</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {applications.map((app, index) => {
              const AppIcon = app.icon;
              return (
                <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <AppIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-[#2C3E50] font-medium">{app.label}</p>
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
                <span className="text-sm font-medium uppercase tracking-wider">Zorg & Onderhoud</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Duurzame <span className="font-medium italic text-[#D5B992]">elegantie</span>
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {maintenanceInfo.map((info, index) => (
                <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-lg group-hover:scale-110 transition-transform duration-300">
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

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Veelgestelde Vragen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Expertise tot uw <span className="font-medium italic text-[#D5B992]">dienst</span>
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

export default TextielLamellenSimplePage;