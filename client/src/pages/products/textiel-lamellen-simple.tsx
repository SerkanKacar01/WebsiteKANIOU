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
  Building,
  Home,
  DoorOpen,
  Bed,
  Users,
  Volume2,
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
    },
    {
      title: "Stofsoort",
      items: [
        "Verduisterend",
        "Lichtdoorlatend",
        "Transparant (screen of voile)",
      ],
    },
    {
      title: "Kleuren & structuren",
      items: [
        "Uni-kleuren, prints, geweven structuren",
        "Natuurtinten, wit, grijs, zwart, kleuraccenten",
      ],
    },
    {
      title: "Bediening",
      items: [
        "Koord + ketting (standaard)",
        "Monocommando (1 stang voor draaien en openen)",
        "Optioneel: elektrisch bedienbaar",
      ],
    },
    {
      title: "Montage",
      items: [
        "Plafond- of wandmontage",
        "In de dag of op de dag",
        "Geschikt voor gebogen rails (bijvoorbeeld erker)",
      ],
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
    <>
      <Helmet>
        <title>Textiel Lamellen – Stijlvolle verticale zonwering op maat | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Textiel lamellen zijn elegant, praktisch én veelzijdig. Ze zorgen voor optimale lichtregulering en zijn ideaal voor zowel grote raampartijen als schuifpuien."
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
                <BreadcrumbLink>Textiel Lamellen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="py-20 bg-[#f9f7f3]">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-semibold mb-6">
                Textiel Lamellen – Stijlvolle verticale zonwering op maat
              </h1>
              <div className="w-24 h-0.5 bg-[#D5B992] mx-auto mb-8"></div>
              <p className="font-body text-xl text-[#2C3E50] leading-relaxed">
                Textiel lamellen zijn elegant, praktisch én veelzijdig. Ze zorgen voor optimale lichtregulering 
                en zijn ideaal voor zowel grote raampartijen als schuifpuien. Dankzij hun verticale vorm ogen ze 
                ruimtelijk en stijlvol in elk interieur – van modern tot klassiek.
              </p>
            </div>
          </Container>
        </section>

        {/* Advantages Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Voordelen op een rij
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{advantage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Personalization Options */}
        <section className="py-16 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Personalisatieopties
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Pas uw textiel lamellen aan met onze uitgebreide keuzemogelijkheden
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizationOptions.map((option, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Settings className="h-6 w-6 text-[#D5B992] mt-1 flex-shrink-0" />
                      <h3 className="font-semibold text-[#2C3E50] text-lg">
                        {option.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {option.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#D5B992] mt-2 flex-shrink-0"></div>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Applications Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Toepassingen
              </h2>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {applications.map((app, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-lg transition-all duration-300 text-center"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <app.icon className="h-8 w-8 text-[#D5B992]" />
                    </div>
                    <p className="text-gray-700 font-medium text-sm">{app.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Maintenance Section */}
        <section className="py-16 bg-[#f9f7f3]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Onderhoud
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
                        {index === 2 && <Droplets className="h-8 w-8 text-purple-600" />}
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
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Veelgestelde vragen
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
                Vraag een vrijblijvende offerte aan
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Kies je voorkeuren en ontvang een maatwerkprijs binnen 24 uur.
              </p>
              <Link href="/offerte">
                <Button
                  size="lg"
                  className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Offerte aanvragen
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default TextielLamellenSimplePage;