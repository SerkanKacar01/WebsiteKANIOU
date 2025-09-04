import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { 
  CheckCircle, 
  Droplets, 
  Shield, 
  Ruler, 
  Palette, 
  Settings, 
  Sparkles,
  HomeIcon,
  ChevronRight,
  Euro,
  Zap,
  Eye
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const KunststofLamellenPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Droplets className="h-6 w-6 text-accent" />,
      title: "Vocht- en schimmelbestendig",
      description: "Perfect voor badkamers, keukens en vochtige ruimtes"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      title: "Eenvoudig te reinigen",
      description: "Afneembaar met vochtige doek of mild schoonmaakmiddel"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Ideaal voor medische praktijken",
      description: "Hygiënisch en geschikt voor professionele omgevingen"
    },
    {
      icon: <Eye className="h-6 w-6 text-accent" />,
      title: "Licht- en privacyregeling",
      description: "Eenvoudige bediening via draaiknop"
    },
    {
      icon: <Ruler className="h-6 w-6 text-accent" />,
      title: "Verschillende breedtes",
      description: "Leverbaar in 89 mm en 127 mm lamelbreedte"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Lange levensduur",
      description: "Robuust materiaal voor jarenlang gebruik"
    }
  ];

  const useCases = [
    {
      title: "Badkamers",
      description: "Waterbestendig en schimmelwerend",
      icon: <Droplets className="h-5 w-5 text-accent" />
    },
    {
      title: "Keukens",
      description: "Eenvoudig schoon te maken bij kookdampen",
      icon: <Sparkles className="h-5 w-5 text-accent" />
    },
    {
      title: "Kantoren",
      description: "Professionele uitstraling en functionaliteit",
      icon: <Shield className="h-5 w-5 text-accent" />
    },
    {
      title: "Medische praktijken",
      description: "Hygiënisch en onderhoudsarm",
      icon: <CheckCircle className="h-5 w-5 text-accent" />
    }
  ];

  const colorOptions = [
    { name: "Wit", description: "Klassiek en tijdloos" },
    { name: "Crème", description: "Warm en uitnodigend" },
    { name: "Antraciet", description: "Modern en stijlvol" },
    { name: "Houtlook textuur", description: "Natuurlijke uitstraling met warmte" }
  ];

  return (
    <>
      <Helmet>
        <title>Kunststof Lamellen - Duurzame en Onderhoudsvriendelijke Oplossing | KANIOU Zilvernaald</title>
        <meta name="description" content="Kunststof lamellen zijn verticale jaloezieën gemaakt van hoogwaardig PVC. Ideaal voor vochtige ruimtes zoals badkamers en keukens. Vanaf €54,95 per m²." />
        <meta property="og:title" content="Kunststof Lamellen - Duurzame en Onderhoudsvriendelijke Oplossing | KANIOU Zilvernaald" />
        <meta property="og:description" content="Kunststof lamellen zijn verticale jaloezieën gemaakt van hoogwaardig PVC. Ideaal voor vochtige ruimtes zoals badkamers en keukens. Vanaf €54,95 per m²." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Container className="py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <HomeIcon className="h-4 w-4" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Producten</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="font-semibold">Kunststof Lamellen</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Kunststof Lamellen
            </h1>
            <h2 className="font-display text-xl md:text-2xl text-text-medium mb-8">
              Duurzame en Onderhoudsvriendelijke Oplossing
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-text-light leading-relaxed">
                Kunststof lamellen zijn verticale jaloezieën gemaakt van hoogwaardig PVC. 
                Ze zijn bijzonder geschikt voor vochtige ruimtes zoals badkamers, keukens en kantoren, 
                dankzij hun waterbestendige en onderhoudsarme eigenschappen.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-semibold text-primary text-center mb-12">
              Voordelen
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-dark mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-text-light text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Material Options & Use Cases */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Color Options */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-8">
                <Palette className="inline-block mr-3 h-8 w-8" />
                Kleuren en Stijlopties
              </h2>
              <div className="space-y-4 mb-6">
                {colorOptions.map((color, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 rounded-full bg-accent flex-shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-text-dark">
                            {color.name}
                          </h3>
                          <p className="text-text-light text-sm">
                            {color.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="text-text-dark font-medium">Mat of licht glanzend oppervlak beschikbaar</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Use Cases */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-8">
                Toepassingen
              </h2>
              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {useCase.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-dark mb-2">
                            {useCase.title}
                          </h3>
                          <p className="text-text-light text-sm">
                            {useCase.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Installation & Operation */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="h-fit">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">
                  <Settings className="inline-block mr-3 h-6 w-6" />
                  Montage & Bediening
                </h2>
                <div className="space-y-4 text-text-light">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Geschikt voor montage op wand of plafond</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Ketting- en koordbediening links of rechts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Ook leverbaar in elektrische uitvoering (optioneel)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">
                  <Sparkles className="inline-block mr-3 h-6 w-6" />
                  Onderhoud
                </h2>
                <div className="space-y-4 text-text-light">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Afneembaar met vochtige doek of mild schoonmaakmiddel</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Geen verkleuring bij langdurig zonlicht (UV-bestendig)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing */}
          <Card className="mb-16 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-primary mb-6">
                <Euro className="inline-block mr-3 h-8 w-8" />
                Prijsindicatie
              </h2>
              <div className="max-w-3xl mx-auto">
                <div className="text-4xl font-bold text-primary mb-4">
                  Vanaf €110,- <span className="text-lg font-normal text-text-medium">per m²</span>
                </div>
                <p className="text-text-light leading-relaxed">
                  Inclusief rail en maatwerk. Prijs afhankelijk van aantal lamellen, 
                  afmetingen en type uitvoering.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary to-accent text-white">
            <CardContent className="p-12 text-center">
              <h2 className="font-display text-3xl font-semibold mb-6">
                Persoonlijk advies
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Vraag een offerte op maat aan of plan een vrijblijvend adviesgesprek bij u thuis 
                of in de showroom. Onze experts helpen u graag verder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-primary hover:text-primary">
                    Vraag een offerte aan
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                    Plan een gratis adviesgesprek
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default KunststofLamellenPage;