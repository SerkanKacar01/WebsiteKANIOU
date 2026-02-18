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
  Bath,
  ChefHat,
  Building,
  School,
  Heart,
  Award,
  Palette,
  Cog,
  Layers,
} from "lucide-react";

const KunststofLamellenSimplePage = () => {
  const advantages = [
    "Vochtbestendig – perfect voor badkamers en keukens",
    "Eenvoudig schoon te maken met vochtige doek",
    "Zeer lange levensduur",
    "Ideaal voor grote ramen en schuifpuien",
    "Strakke en moderne uitstraling",
    "Lichtdoorlatend of volledig afsluitbaar",
    "Maatwerkoplossing mogelijk in elke ruimte",
  ];

  const personalizationOptions = [
    {
      title: "Lamelbreedte",
      items: [
        "89 mm",
        "127 mm",
      ],
      icon: Layers,
    },
    {
      title: "Kleurmogelijkheden",
      items: [
        "Wit, crème, grijs, antraciet, zwart",
        "Mogelijkheid tot lichte structuren of metallic afwerking",
      ],
      icon: Palette,
    },
    {
      title: "Bedieningsopties",
      items: [
        "Ketting en koord (standaard)",
        "Monocommando systeem",
        "Elektrisch (optioneel)",
      ],
      icon: Cog,
    },
    {
      title: "Montage",
      items: [
        "In de dag of op de dag",
        "Plafond- of wandmontage",
        "Recht of gebogen rails mogelijk",
      ],
      icon: Settings,
    },
  ];

  const applications = [
    { icon: Bath, label: "Badkamers" },
    { icon: ChefHat, label: "Keukens" },
    { icon: Building, label: "Kantoorruimtes" },
    { icon: School, label: "Openbare gebouwen (scholen, ziekenhuizen, etc.)" },
    { icon: Heart, label: "Horeca en zorgsector" },
  ];

  const maintenanceInfo = [
    "Afwasbaar met een vochtige doek of spons",
    "Ideaal voor omgevingen waar hygiëne essentieel is",
    "Lamellen zijn waterafstotend en trekken geen stof aan",
  ];

  const faqs = [
    {
      question: "Zijn kunststof lamellen geschikt voor vochtige ruimtes?",
      answer: "Ja, ze zijn waterbestendig en vervormen niet bij vocht of damp.",
    },
    {
      question: "Wat is het verschil tussen kunststof en textiel lamellen?",
      answer: "Kunststof lamellen zijn steviger, vochtbestendig en makkelijker te reinigen. Textiel is zachter en visueel warmer.",
    },
    {
      question: "Kunnen de lamellen afzonderlijk vervangen worden?",
      answer: "Ja, losse lamellen kunnen eenvoudig vervangen worden zonder het hele systeem te verwijderen.",
    },
  ];

  return (
    <PageLayout
      title="Kunststof Lamellen"
      subtitle="KANIOU Collectie"
      description="Industriële sterkte ontmoet moderne verfijning. Onze premium kunststof lamellen bieden superieure functionaliteit en tijdloze esthetiek, ontworpen voor de meest veeleisende omgevingen."
      metaDescription="Ontdek onze premium kunststof lamellen collectie. Industriële sterkte ontmoet moderne elegantie. Duurzaam, functioneel en perfect voor veeleisende omgevingen."
      breadcrumbs={[{ label: "Producten" }, { label: "Kunststof Lamellen" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Functionele Superioriteit</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Precisie in elk <span className="font-medium italic text-[#D5B992]">aspect</span>
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
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Functionele Configuratie</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Uw optimale <span className="font-medium italic text-[#D5B992]">configuratie</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
              Configureer uw premium kunststof lamellen met onze industriële precisie-opties. 
              Elke specificatie wordt zorgvuldig afgestemd op uw functionele vereisten en operationele behoeften.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <span className="text-sm font-medium uppercase tracking-wider">Professionele Toepassingen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Ideaal voor veeleisende <span className="font-medium italic text-[#D5B992]">sectoren</span>
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
                <span className="text-sm font-medium uppercase tracking-wider">Onderhoud & Hygiëne</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Superieure <span className="font-medium italic text-[#D5B992]">functionaliteit</span>
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
                <span className="text-sm font-medium uppercase tracking-wider">Functionele Vragen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Technische <span className="font-medium italic text-[#D5B992]">ondersteuning</span>
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

export default KunststofLamellenSimplePage;