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
} from "lucide-react";

const HoutenJaloezieeenSimplePage = () => {
  const keyFeatures = [
    "Natuurlijke look en feel met echt hout",
    "Beschikbaar in 25 mm en 50 mm lamellen",
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
      description: "Bediening via afstandsbediening of app met BREL systeem",
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
    <>
      <Helmet>
        <title>Luxe Houten Jaloezieën – Handgemaakte Elegantie op Maat | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze exclusieve collectie houten jaloezieën. Handgemaakt van premium hout, volledig op maat en afgewerkt tot in het kleinste detail. Tijdloze elegantie voor uw interieur."
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
                <BreadcrumbLink className="text-[#2C3E50] font-medium">Houten Jaloezieën</BreadcrumbLink>
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
                <Crown className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Premium Craftsmanship</span>
              </div>
              
              {/* Luxury Heading */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2C3E50] font-light mb-8 tracking-tight leading-none">
                <span className="block">Luxe</span>
                <span className="block bg-gradient-to-r from-[#D5B992] via-[#E6C988] to-[#D5B992] bg-clip-text text-transparent font-medium">
                  Houten Jaloezieën
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
                  Handgemaakte Elegantie
                </span>
              </h1>
              
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D5B992]"></div>
                <Gem className="h-6 w-6 text-[#D5B992]" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D5B992]"></div>
              </div>
              
              <p className="font-light text-2xl md:text-3xl text-[#2C3E50] leading-relaxed mb-12 max-w-4xl mx-auto">
                <span className="font-medium italic">Tijdloze elegantie</span> ontmoet moderne verfijning. 
                Handgemaakt van premium hout, elke jaloezie is een meesterwerk op maat gemaakt voor uw exacte specificaties.
              </p>
              
              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#D5B992] mb-2">25+</div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Jaar Ervaring</div>
                </div>
                <div className="text-center border-x border-[#e8e4dc]">
                  <div className="text-3xl font-light text-[#D5B992] mb-2">100%</div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Op Maat</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#D5B992] mb-2">∞</div>
                  <div className="text-sm text-[#8B7355] uppercase tracking-wider">Design Opties</div>
                </div>
              </div>
              
              {/* Premium CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] hover:from-[#34495e] hover:to-[#2C3E50] text-white px-12 py-6 text-lg font-medium rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border border-[#D5B992]/20"
                  >
                    <Crown className="mr-3 h-5 w-5" />
                    Begin Uw Reis naar Perfectie
                  </Button>
                </Link>
                <div className="text-sm text-[#8B7355] italic">Gratis consult & opmeting</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fdfcf8] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-[#D5B992]" />
                <span className="text-[#8B7355] uppercase tracking-wider text-sm font-medium">Exclusieve Kenmerken</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Vakmanschap in elk Detail
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#D5B992] to-[#E6C988] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl bg-gradient-to-br from-white to-[#fdfcf8] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                >
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

        {/* Luxury Customization Section */}
        <section className="py-24 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#D5B992]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#E6C988]/10 to-transparent rounded-full blur-3xl"></div>
          
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Palette className="h-6 w-6 text-[#D5B992]" />
                <span className="text-[#8B7355] uppercase tracking-wider text-sm font-medium">Personalisatie Opties</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Uw Perfecte Combinatie
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#D5B992] to-[#E6C988] mx-auto mb-8"></div>
              <p className="text-lg text-[#8B7355] max-w-3xl mx-auto leading-relaxed">
                Personaliseer uw houten jaloezieën met onze uitgebreide keuzemogelijkheden. 
                Elk detail is instelbaar voor uw unieke smaak en interieur.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customizationOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <option.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#2C3E50] text-xl mb-3">
                          {option.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[#8B7355] leading-relaxed">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Maintenance & Durability Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-[#fdfcf8] to-white"></div>
          <Container className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <Shield className="h-6 w-6 text-[#D5B992]" />
                <span className="text-[#8B7355] uppercase tracking-wider text-sm font-medium">Onderhoud & Duurzaamheid</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Ontworpen voor Eeuwigheid
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#D5B992] to-[#E6C988] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {maintenanceInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-xl bg-gradient-to-br from-white to-[#fdfcf8] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                  >
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

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-[#f8f6f0] via-[#faf8f2] to-[#f5f3ed]">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <HelpCircle className="h-6 w-6 text-[#D5B992]" />
                <span className="text-[#8B7355] uppercase tracking-wider text-sm font-medium">Veelgestelde Vragen</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#2C3E50] mb-6">
                Uw Vragen Beantwoord
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-[#D5B992] to-[#E6C988] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none">
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <AccordionTrigger className="text-left text-[#2C3E50] font-medium px-8 py-6 hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gradient-to-r from-[#D5B992] to-[#E6C988] shadow-md">
                            <HelpCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-lg">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#8B7355] px-16 pb-6 text-lg leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* Luxury Call-to-Action Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] via-[#34495e] to-[#2C3E50]"></div>
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23D5B992' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <Container className="relative">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-8">
                <Crown className="h-8 w-8 text-[#D5B992]" />
                <span className="text-[#D5B992] uppercase tracking-wider text-sm font-medium">Begin Uw Transformatie</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight">
                Laat Uw Ramen Spreken met
                <span className="block font-medium bg-gradient-to-r from-[#D5B992] to-[#E6C988] bg-clip-text text-transparent">
                  Tijdloze Elegantie
                </span>
              </h2>
              
              <p className="text-xl mb-12 leading-relaxed text-gray-300 max-w-3xl mx-auto">
                Vraag vrijblijvend een offerte aan en ontvang binnen 24 uur een volledig gepersonaliseerd voorstel. 
                Inclusief gratis consult en professionele opmeting aan huis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/offerte">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#D5B992] to-[#E6C988] hover:from-[#E6C988] hover:to-[#D5B992] text-[#2C3E50] px-12 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105"
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Exclusieve Offerte Aanvragen
                  </Button>
                </Link>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#D5B992] flex items-center justify-center text-white text-sm font-bold">5</div>
                    <div className="w-8 h-8 rounded-full bg-[#E6C988] flex items-center justify-center text-white">⭐</div>
                  </div>
                  <span className="text-sm">Meer dan 1000+ tevreden klanten</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default HoutenJaloezieeenSimplePage;