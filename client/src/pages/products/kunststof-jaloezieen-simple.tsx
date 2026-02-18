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
  Bath,
  ChefHat,
  Building,
  Sun,
  Wrench,
  Award,
  Palette,
  Zap,
  Layers,
} from "lucide-react";

const KunststofJaloezieeenSimplePage = () => {
  const advantages = [
    "Vocht- en waterbestendig – ideaal voor badkamer of keuken",
    "Verkrijgbaar in 50 mm lamelbreedte",
    "Onderhoudsvriendelijk en krasbestendig",
    "Houtlook of effen kleuren",
    "Eenvoudige bediening en lichtregeling",
    "Betaalbaar alternatief voor houten jaloezieën",
    "Perfect op maat gemaakt",
  ];

  const personalizationOptions = [
    {
      title: "Lamelbreedte",
      items: [
        "50 mm (klassiekere uitstraling)",
      ],
      icon: Layers,
    },
    {
      title: "Kleuren",
      items: [
        "Wit, grijs, zwart, houtkleuren, beige",
        "Keuze uit matte of glanzende afwerking",
      ],
      icon: Palette,
    },
    {
      title: "Bedieningsopties",
      items: [
        "Koord + tuimelstok (standaard)",
        "Optioneel: kettingbediening",
        "Optioneel: elektrische bediening (met afstandsbediening of app)",
      ],
      icon: Zap,
    },
    {
      title: "Montage",
      items: [
        "In de dag (binnen het kozijn)",
        "Op de dag (op de muur of het plafond)",
      ],
      icon: Settings,
    },
    {
      title: "Extra opties",
      items: [
        "Ladderband voor een textiele afwerking",
        "Bijpassende afdeklijst (koof)",
      ],
      icon: Award,
    },
  ];

  const applications = [
    { icon: Bath, label: "Badkamers" },
    { icon: ChefHat, label: "Keukens" },
    { icon: Sparkles, label: "Wasruimtes" },
    { icon: Building, label: "Kantoren" },
    { icon: Sun, label: "Ramen met veel zonlicht of vocht" },
  ];

  const maintenanceInfo = [
    "Eenvoudig schoon te maken met een vochtige doek",
    "Antistatische afwerking voorkomt stofophoping",
    "Zeer duurzaam en kleurvast",
  ];

  const faqs = [
    {
      question: "Zijn kunststof jaloezieën hittebestendig?",
      answer: "Ja, ze zijn ontworpen om hoge temperaturen en vocht te weerstaan.",
    },
    {
      question: "Kunnen ze in een douche worden gebruikt?",
      answer: "Ja, ze zijn ideaal voor zeer vochtige ruimtes.",
    },
    {
      question: "Wat is het verschil met houten jaloezieën?",
      answer: "Kunststof is vochtbestendig, lichter en onderhoudsvriendelijker. Hout is natuurlijk, maar gevoelig voor vocht.",
    },
    {
      question: "Is elektrische bediening mogelijk?",
      answer: "Ja, optioneel verkrijgbaar met afstandsbediening of app.",
    },
  ];

  return (
    <PageLayout
      title="Aluminium Jaloezieën"
      subtitle="KANIOU Collectie"
      description="Geavanceerde technologie ontmoet tijdloze stijl. Onze premium kunststof jaloezieën combineren innovatieve vochtbestendigheid met verfijnde esthetiek, perfect voor de moderne levensstijl."
      metaDescription="Ontdek onze premium kunststof jaloezieën collectie. Geavanceerde technologie ontmoet stijlvolle vormgeving. Vochtbestendig, onderhoudsvriendelijk en perfect voor moderne interieurs."
      breadcrumbs={[{ label: "Producten" }, { label: "Aluminium Jaloezieën" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Technische Superioriteit</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Innovatie in elk <span className="font-medium italic text-[#D5B992]">detail</span>
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
              <span className="text-sm font-medium uppercase tracking-wider">Technische Configuratie</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Uw perfecte <span className="font-medium italic text-[#D5B992]">specificatie</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
              Configureer uw premium kunststof jaloezieën met onze geavanceerde opties. 
              Elke specificatie wordt zorgvuldig afgestemd op uw functionele eisen en esthetische voorkeuren.
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
              <span className="text-sm font-medium uppercase tracking-wider">Optimale Toepassingen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Ideaal voor veeleisende <span className="font-medium italic text-[#D5B992]">omgevingen</span>
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
                <span className="text-sm font-medium uppercase tracking-wider">Onderhoud & Duurzaamheid</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Langdurige <span className="font-medium italic text-[#D5B992]">prestaties</span>
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {maintenanceInfo.map((info, index) => (
                <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {index === 0 && <Sparkles className="h-8 w-8 text-white" />}
                        {index === 1 && <Shield className="h-8 w-8 text-white" />}
                        {index === 2 && <Wrench className="h-8 w-8 text-white" />}
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
                <span className="text-sm font-medium uppercase tracking-wider">Technische Vragen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Expertise & <span className="font-medium italic text-[#D5B992]">ondersteuning</span>
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

export default KunststofJaloezieeenSimplePage;