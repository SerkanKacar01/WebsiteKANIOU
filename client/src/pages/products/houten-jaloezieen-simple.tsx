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
  Award,
  Star,
  Wrench,
  Users,
  Zap,
} from "lucide-react";

const HoutenJaloezieeenSimplePage = () => {
  const keyFeatures = [
    "Natuurlijke look en feel met echt hout",
    "Beschikbaar in 25 mm , 50 mm en 65 mm lamellen",
    "Keuze uit ladderkoord of ladderband",
    "Links of rechts bediening – handmatig of gemotoriseerd",
    "Geschikt voor in-de-dag of op-de-dag montage",
    "Breed kleurenpalet: wit, zwart, grijs, houttinten",
    "Volledig op maat gemaakt en nauwkeurig opgemeten",
    "Perfect voor lichtregulatie en privacy",
  ];

  const customizationOptions = [
    {
      title: "Ladderkoord (Standaard)",
      description: "Dunne en subtiele afwerking. Past bij elk interieur.",
      icon: Wrench,
    },
    {
      title: "Ladderband (+10%)",
      description: "Luxere en gedurfde uitstraling. Vergroot de visuele diepte.",
      icon: Star,
    },
    {
      title: "Bedieningszijde",
      description: "Links of rechts – afhankelijk van uw kamerindeling.",
      icon: Settings,
    },
    {
      title: "Kettingmateriaal",
      description: "Kunststof (wit, zwart of grijs) of metalen ketting (+€12,50)",
      icon: Award,
    },
    {
      title: "Montagetype",
      description: "In-de-dag (in de raamopening) of op-de-dag (op de muur/kozijn)",
      icon: Users,
    },
    {
      title: "Zijgeleiders (Optioneel)",
      description: "Voor extra stabiliteit bij draai-kiepramen of deuren (+€35)",
      icon: Shield,
    },
    {
      title: "Gemotoriseerde optie (Optioneel)",
      description: "Bediening via afstandsbediening of app met BREL systeem of MOTIONBLINDS met app",
      icon: Zap,
    },
  ];

  const maintenanceInfo = [
    "Gemaakt van duurzaam echt hout",
    "Eenvoudig schoon te maken met droge of licht vochtige doek",
    "Niet geschikt voor ruimtes met hoge luchtvochtigheid (bijv. badkamers)",
  ];

  const faqs = [
    {
      question: "Wat is het verschil tussen ladderkoord en ladderband?",
      answer: "Ladderkoord is dunner en minimalistischer. Ladderband is breder en geeft een luxere visuele uitstraling.",
    },
    {
      question: "Zijn houten jaloezieën geschikt voor badkamers?",
      answer: "Wij raden houten jaloezieën niet aan in vochtige ruimtes. Overweeg in plaats daarvan PVC jaloezieën voor dergelijke ruimtes.",
    },
    {
      question: "Kunnen de jaloezieën gemotoriseerd worden?",
      answer: "Ja, elektrische bediening via afstandsbediening of mobiele app (BREL) is beschikbaar.",
    },
  ];

  return (
    <PageLayout
      title="Houten Jaloezieën"
      subtitle="KANIOU Collectie"
      description="Tijdloze elegantie ontmoet moderne verfijning. Handgemaakt van premium hout, elke jaloezie is een meesterwerk op maat gemaakt voor uw exacte specificaties."
      metaDescription="Ontdek onze exclusieve collectie houten jaloezieën. Handgemaakt van premium hout, volledig op maat en afgewerkt tot in het kleinste detail. Tijdloze elegantie voor uw interieur."
      breadcrumbs={[{ label: "Producten" }, { label: "Houten Jaloezieën" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Exclusieve Kenmerken</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Vakmanschap in elk <span className="font-medium italic text-[#D5B992]">detail</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[#2C3E50] leading-relaxed font-medium">{feature}</p>
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
              <span className="text-sm font-medium uppercase tracking-wider">Personalisatie Opties</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Uw perfecte <span className="font-medium italic text-[#D5B992]">combinatie</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
              Personaliseer uw houten jaloezieën met onze uitgebreide keuzemogelijkheden. 
              Elk detail is instelbaar voor uw unieke smaak en interieur.
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
                <span className="text-sm font-medium uppercase tracking-wider">Onderhoud & Duurzaamheid</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Ontworpen voor <span className="font-medium italic text-[#D5B992]">eeuwigheid</span>
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

      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Veelgestelde Vragen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Uw vragen <span className="font-medium italic text-[#D5B992]">beantwoord</span>
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

export default HoutenJaloezieeenSimplePage;