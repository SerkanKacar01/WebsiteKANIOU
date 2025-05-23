import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { textiellamellenHeroImage } from "@/assets";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import {
  CheckCircle,
  Eye,
  Shield,
  Ruler,
  Palette,
  Settings,
  Sparkles,
  HomeIcon,
  ChevronRight,
  Euro,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TextielLamellenPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Functioneel én decoratief",
      description: "Perfect voor dagelijks gebruik met elegante uitstraling",
    },
    {
      icon: <Ruler className="h-6 w-6 text-accent" />,
      title: "Ideaal voor grote raampartijen",
      description: "Speciaal geschikt voor hoge ramen en brede glaspartijen",
    },
    {
      icon: <Eye className="h-6 w-6 text-accent" />,
      title: "Lichtinval eenvoudig regelbaar",
      description: "Met draaiknop voor optimale lichtregeling",
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Zachte, warme uitstraling",
      description: "Textiel zorgt voor gezellige sfeer in uw interieur",
    },
    {
      icon: <Settings className="h-6 w-6 text-accent" />,
      title: "Geluidsabsorberend effect",
      description: "Verbetert de akoestiek van uw ruimte",
    },
    {
      icon: <Ruler className="h-6 w-6 text-accent" />,
      title: "Verschillende breedtes",
      description: "Leverbaar in 89 mm en 127 mm lamelbreedtes",
    },
  ];

  const fabricTypes = [
    {
      type: "Transparante stoffen",
      description: "Voor subtiel daglicht en open gevoel",
      icon: <Eye className="h-5 w-5 text-accent" />,
    },
    {
      type: "Lichtdoorlatende stoffen",
      description: "Ideaal voor meer privacy met natuurlijk licht",
      icon: <Shield className="h-5 w-5 text-accent" />,
    },
    {
      type: "Verduisterende stoffen",
      description: "Perfect voor slaapkamer of kantoor",
      icon: <CheckCircle className="h-5 w-5 text-accent" />,
    },
  ];

  const colors = ["wit", "crème", "grijs", "taupe", "zwart"];

  return (
    <>
      <Helmet>
        <title>
          Textiel Lamellen - Tijdloze Verticale Stoffen Jaloezieën | Elegant
          Drapes
        </title>
        <meta
          name="description"
          content="Textiel lamellen zijn verticale stroken stof die elegant langs elkaar bewegen. Ideaal voor grote raampartijen en schuifpuien. Vanaf €69,95 per m²."
        />
        <meta
          property="og:title"
          content="Textiel Lamellen - Tijdloze Verticale Stoffen Jaloezieën | Elegant Drapes"
        />
        <meta
          property="og:description"
          content="Textiel lamellen zijn verticale stroken stof die elegant langs elkaar bewegen. Ideaal voor grote raampartijen en schuifpuien. Vanaf €69,95 per m²."
        />
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
                  <Link href="/products">Producten</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="font-semibold">Textiel Lamellen</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Section */}
          {/* Hero Image */}
          <div className="mb-8">
            <img
              src={textiellamellenHeroImage}
              alt="Textiel Lamellen"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Textiel Lamellen
            </h1>
            <h2 className="font-display text-xl md:text-2xl text-text-medium mb-8">
              Tijdloze Verticale Stoffen Jaloezieën
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-text-light leading-relaxed">
                Textiel lamellen zijn verticale stroken stof die elegant langs
                elkaar bewegen. Ze zijn uitermate geschikt voor grote
                raampartijen en schuifpuien. Dankzij hun flexibiliteit regelt u
                eenvoudig het binnenvallende licht en behoudt u uw privacy.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-semibold text-primary text-center mb-12">
              Belangrijkste voordelen
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{feature.icon}</div>
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

          {/* Fabric Types & Colors */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Fabric Types */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-8">
                <Palette className="inline-block mr-3 h-8 w-8" />
                Stoffen & Kleuren
              </h2>
              <div className="space-y-6">
                {fabricTypes.map((fabric, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">{fabric.icon}</div>
                        <div>
                          <h3 className="font-semibold text-text-dark mb-2">
                            {fabric.type}
                          </h3>
                          <p className="text-text-light text-sm">
                            {fabric.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-6">
                Beschikbare kleuren
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border"
                  >
                    <div className="w-4 h-4 rounded-full bg-accent"></div>
                    <span className="text-text-dark font-medium capitalize">
                      {color}
                    </span>
                  </div>
                ))}
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border col-span-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-text-dark font-medium">
                    En nog veel meer kleuren beschikbaar
                  </span>
                </div>
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
                    <span>Links of rechts bedienbaar met ketting en koord</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Montage op plafond of wand mogelijk</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Geschikt voor rechte en schuine ramen</span>
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
                    <span>Stofvrij maken met plumeau of zachte borstel</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      Sommige stoffen zijn wasbaar of reinigbaar met vochtige
                      doek
                    </span>
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
                  Vanaf €75{" "}
                  <span className="text-lg font-normal text-text-medium">
                    per m²
                  </span>
                </div>
                <p className="text-text-light leading-relaxed">
                  Inclusief maatwerk en standaard rail. Prijs varieert op basis
                  van stof, bedieningszijde en breedte van de lamel.
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
                Vraag nu vrijblijvend een offerte aan of plan een gratis
                adviesgesprek met één van onze specialisten bij u thuis of in de
                showroom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto text-primary hover:text-primary"
                  >
                    Vraag een offerte aan
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                  >
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

export default TextielLamellenPage;
