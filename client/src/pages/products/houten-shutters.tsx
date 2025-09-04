import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  Thermometer,
  Eye,
  Palette,
  Settings,
  Home,
  Droplets,
  CheckCircle,
  Ruler,
  TreePine,
  Wrench,
  Euro,
  ChevronRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const HoutenShuttersPage = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Volledig op maat gemaakt",
      description:
        "Geschikt voor standaard ramen, draaikiepramen, ronde ramen en dakramen",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Regelbare lichtinval en privacy",
      description: "Dankzij verstelbare lamellen",
    },
    {
      icon: <Thermometer className="h-6 w-6" />,
      title: "Hoge isolerende waarde",
      description: "Zowel thermisch als akoestisch",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Robuust en duurzaam",
      description: "Eenvoudig te reinigen",
    },
  ];

  const materials = [
    "Massief lindehout",
    "Eikenhout",
    "Vochtbestendige variant voor badkamers",
    "Tientallen kleuren, beitsen en lakafwerkingen",
    "Matte, zijdeglans of natuurlijke houtnerf",
  ];

  const slatSizes = [
    "47 mm lamellen",
    "63 mm lamellen",
    "76 mm lamellen",
    "89 mm lamellen",
    "Vaste of scharnierende panelen",
    "Vouw- of schuifpanelen bij brede oppervlakken",
  ];

  const mountingOptions = [
    "Montage in het kozijn (in-de-dag)",
    "Montage erbuiten (op-de-dag)",
    "Bedienbaar via tuimelstang",
    "Verborgen bediening",
    "Geschikt voor ramen, deuren, schuifpuien en dakkapellen",
  ];

  const maintenancePoints = [
    "Stofvrij maken met plumeau of licht vochtige doek",
    "Geen verkleuring bij gebruik van UV-bestendige lakken",
    "Minimaal onderhoud vereist",
  ];

  return (
    <>
      <Helmet>
        <title>
          Houten Shutters – Luxe Maatwerk voor Elke Raamvorm | KANIOU
          Zilvernaald
        </title>
        <meta
          name="description"
          content="Houten shutters zijn stijlvolle en tijdloze raamdecoratie, gemaakt van duurzaam hout. Optimale lichtregulatie, privacy en isolatie vanaf €189 per m²."
        />
        <meta
          property="og:title"
          content="Houten Shutters – Luxe Maatwerk voor Elke Raamvorm | KANIOU Zilvernaald"
        />
        <meta
          property="og:description"
          content="Houten shutters zijn stijlvolle en tijdloze raamdecoratie, gemaakt van duurzaam hout. Optimale lichtregulatie, privacy en isolatie vanaf €189 per m²."
        />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
        {/* Breadcrumb */}
        <div className="bg-neutral-100 py-4">
          <Container>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
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
                  <BreadcrumbLink>Houten Shutters</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Container>
        </div>
        
        <Container>
          {/* Hero Section */}
          <div className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4 px-4 py-2">
                  <TreePine className="h-4 w-4 mr-2" />
                  Premium Houtwerk
                </Badge>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                  Houten Shutters
                </h1>
                <p className="font-display text-xl md:text-2xl text-secondary mb-4">
                  Luxe Maatwerk voor Elke Raamvorm
                </p>
                <p className="text-lg text-text-medium max-w-3xl mx-auto leading-relaxed">
                  Houten shutters zijn stijlvolle en tijdloze raamdecoratie,
                  gemaakt van duurzaam hout. Ze bieden optimale lichtregulatie,
                  privacy en isolatie, en zijn een echte meerwaarde voor elk
                  interieur – van klassiek tot modern.
                </p>
              </div>

              {/* Unique Benefits */}
              <div className="mb-16">
                <h2 className="font-display text-3xl font-bold text-primary text-center mb-12">
                  Unieke Voordelen
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {benefits.map((benefit, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                          <div className="text-primary">{benefit.icon}</div>
                        </div>
                        <h3 className="font-semibold text-text-dark mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-text-medium text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Materials & Finishes */}
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-6 w-6 mr-3 text-primary" />
                      Materialen & Afwerkingen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {materials.map((material, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-text-medium">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-6 w-6 mr-3 text-primary" />
                      Lamelbreedtes & Paneelindeling
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {slatSizes.map((size, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-text-medium">{size}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Mounting & Operation */}
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wrench className="h-6 w-6 mr-3 text-primary" />
                      Montage & Bediening
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mountingOptions.map((option, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-text-medium">{option}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets className="h-6 w-6 mr-3 text-primary" />
                      Onderhoud
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {maintenancePoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-text-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Price Section */}
              <Card className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center text-2xl">
                    <Euro className="h-7 w-7 mr-3 text-primary" />
                    Prijsindicatie
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-primary mb-4">
                    Vanaf €350{" "}
                    <span className="text-lg font-normal text-text-medium">
                      per m²
                    </span>
                  </div>
                  <p className="text-text-medium max-w-2xl mx-auto leading-relaxed">
                    Inclusief maatwerk, afwerking en standaard montageprofiel.
                    Prijs varieert op basis van houtsoort, afwerking en
                    raamvorm.
                  </p>
                </CardContent>
              </Card>

              {/* Advice Section */}
              <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center text-2xl">
                    <Home className="h-7 w-7 mr-3 text-primary" />
                    Advies op Maat
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                    Onze interieurspecialisten helpen u graag bij de keuze van
                    de juiste shutters. Plan een gratis consult of vraag een
                    vrijblijvende offerte aan.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Link href="/quote">
                      <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Vraag een offerte aan
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg font-semibold transition-all"
                      >
                        Plan een gratis adviesgesprek
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HoutenShuttersPage;
