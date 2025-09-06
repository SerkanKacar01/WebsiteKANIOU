import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";
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
  CheckCircle,
  HomeIcon,
  ChevronRight,
  Palette,
  Settings,
  Wrench,
  Euro,
  Phone,
  Mail,
  Shield,
  Droplets,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Link } from "wouter";
import houtenJaloezieeenImage from "@assets/image00006.jpeg";

const HoutenJaloezieen = () => {
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
    },
    {
      title: "Ladderband (+10%)",
      description: "Luxere en gedurfde uitstraling. Vergroot de visuele diepte.",
    },
    {
      title: "Bedieningszijde",
      description: "Links of rechts – afhankelijk van uw kamerindeling.",
    },
    {
      title: "Kettingmateriaal",
      description: "Kunststof (wit, zwart of grijs) of metalen ketting (+€12,50)",
    },
    {
      title: "Montagetype",
      description: "In-de-dag (in de raamopening) of op-de-dag (op de muur/kozijn)",
    },
    {
      title: "Zijgeleiders (Optioneel)",
      description: "Voor extra stabiliteit bij draai-kiepramen of deuren (+€35)",
    },
    {
      title: "Gemotoriseerde optie (Optioneel)",
      description: "Bediening via afstandsbediening of app met BREL systeem",
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
        <title>Custom Wooden Venetian Blinds – Timeless, Elegant, and Warm | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Add warmth and sophistication to your interior with made-to-measure wooden Venetian blinds. Crafted from high-quality wood and tailored to your exact window dimensions."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Houten Jaloezieën</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-semibold mb-6">
                Custom Wooden Venetian Blinds – Timeless, Elegant, and Warm
              </h1>
              <div className="w-24 h-0.5 bg-[#D5B992] mx-auto mb-8"></div>
              <p className="font-body text-xl text-[#2C3E50] leading-relaxed">
                Add warmth and sophistication to your interior with made-to-measure wooden Venetian blinds. 
                Crafted from high-quality wood and tailored to your exact window dimensions. 
                Choose your finish, operation, and mounting options — down to the finest detail.
              </p>
            </div>
          </Container>
        </section>

        {/* Key Features & Benefits */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Key Features & Benefits
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Customization Options */}
        <section className="py-16 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Customization Options
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Personalize your wooden Venetian blinds with our extensive range of options
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customizationOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Settings className="h-6 w-6 text-[#D5B992] mt-1 flex-shrink-0" />
                      <h3 className="font-semibold text-[#2C3E50] text-lg">
                        {option.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Maintenance & Durability */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Maintenance & Durability
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {maintenanceInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {index === 0 && <Shield className="h-8 w-8 text-green-600" />}
                        {index === 1 && <Sparkles className="h-8 w-8 text-blue-600" />}
                        {index === 2 && <Droplets className="h-8 w-8 text-red-600" />}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{info}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-[#2C3E50] font-medium">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-[#D5B992]" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-r from-[#2C3E50] to-[#34495e]">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Request Your Free Quote Now
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Get your custom wooden Venetian blinds made to measure. Enter your dimensions 
                and receive a personalized offer — with no obligation.
              </p>
              <Link href="/offerte">
                <Button
                  size="lg"
                  className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Request Your Quote
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default HoutenJaloezieen;
