import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HomeIcon,
  ChevronRight,
  Check,
  Eye,
  Settings,
  Palette,
  Shield,
  Phone,
  Calculator,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DuoRolgordijnen = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          Duo Rolgordijnen - Slimme Lichtregeling met Stijl | Elegant Drapes
        </title>
        <meta
          name="description"
          content="Duo-rolgordijnen (zebra-gordijnen) voor eenvoudige regeling van lichtinval en privacy. Vanaf €59,95 per stuk, incl. maatwerk en montageprofiel."
        />
        <meta
          property="og:title"
          content="Duo Rolgordijnen - Slimme Lichtregeling met Stijl | Elegant Drapes"
        />
        <meta
          property="og:description"
          content="Duo-rolgordijnen (zebra-gordijnen) voor eenvoudige regeling van lichtinval en privacy. Vanaf €59,95 per stuk, incl. maatwerk en montageprofiel."
        />
        <meta property="og:type" content="product" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
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
                <span className="font-medium">Duo Rolgordijnen</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative group">
            <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-neutral-100 to-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1592492152545-9695d3f473f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Duo Rolgordijnen - Zebra gordijnen voor slimme lichtregeling"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-primary font-bold mb-4 leading-tight">
                Duo Rolgordijnen
              </h1>
              <p className="text-xl text-text-medium font-medium">
                Slimme Lichtregeling met Stijl
              </p>
            </div>

            {/* Price Display */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
              <p className="font-body text-3xl">
                <span className="font-bold text-primary">Vanaf €45 .- </span>
                <span className="text-text-medium ml-2 text-lg">per/m2</span>
              </p>
              <p className="text-sm text-text-medium mt-1">
                Incl. maatwerk en cassette, excl. plaatsing
              </p>
            </div>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-text-medium leading-relaxed">
                Duo-rolgordijnen, ook wel bekend als zebra-gordijnen, bestaan
                uit transparante en niet-transparante stofbanen die afwisselend
                bewegen. Hiermee regelt u eenvoudig de hoeveelheid licht en
                privacy in uw woning. Perfect voor zowel woonkamers als
                kantoren, dankzij het strakke en moderne ontwerp.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Vraag offerte aan
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Plan gratis adviesgesprek
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Key Features Section */}
      <div className="bg-neutral-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Belangrijkste voordelen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold ml-3">
                  Lichtregeling & Privacy
                </h3>
              </div>
              <p className="text-text-medium">
                Eenvoudige regeling van lichtinval en privacy door transparante
                en niet-transparante banen
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold ml-3">
                  Modern Design
                </h3>
              </div>
              <p className="text-text-medium">
                Strakke, horizontale banen met modern uiterlijk die in elke
                ruimte passen
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold ml-3">
                  Veelzijdig
                </h3>
              </div>
              <p className="text-text-medium">
                Geschikt voor elke ruimte en interieurstijl, leverbaar in
                diverse kleuren en texturen
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold ml-3">
                  Verduisterend & Transparant
                </h3>
              </div>
              <p className="text-text-medium">
                Zowel verduisterend als lichtdoorlatend verkrijgbaar voor
                optimaal comfort
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold ml-3">
                  Flexibele Montage
                </h3>
              </div>
              <p className="text-text-medium">
                Keuze uit cassette, open profiel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold ml-3">
                  Op Maat Gemaakt
                </h3>
              </div>
              <p className="text-text-medium">
                Alle gordijnen worden speciaal voor uw raam op maat gemaakt voor
                perfecte pasvorm
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Fabric and Colors Section */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary mb-6">
              Stoffen en kleuren
            </h2>

            <div className="space-y-6">
              <div className="bg-neutral-50 p-6 rounded-xl">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Transparant & semi-transparant
                </h3>
                <p className="text-text-medium">
                  Perfect voor dagelijks gebruik, laat natuurlijk licht door
                  terwijl u privacy behoudt
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Verduisterend
                </h3>
                <p className="text-text-medium">
                  Ideaal voor slaapkamers of situaties waar maximale privacy
                  gewenst is
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Structuurstoffen of effen kleuren
                </h3>
                <p className="text-text-medium">
                  Keuze uit verschillende texturen en structuren voor een unieke
                  uitstraling
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-6">
              Beschikbare kleuren
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
                <div className="w-full h-8 bg-white border border-neutral-300 rounded mb-2"></div>
                <span className="text-sm font-medium">Wit</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
                <div className="w-full h-8 bg-gray-400 rounded mb-2"></div>
                <span className="text-sm font-medium">Grijs</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
                <div className="w-full h-8 bg-amber-100 rounded mb-2"></div>
                <span className="text-sm font-medium">Beige</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
                <div className="w-full h-8 bg-yellow-200 rounded mb-2"></div>
                <span className="text-sm font-medium">Zand</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
                <div className="w-full h-8 bg-black rounded mb-2"></div>
                <span className="text-sm font-medium">Zwart</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
                <div className="w-full h-8 bg-gradient-to-r from-neutral-100 to-neutral-300 rounded mb-2"></div>
                <span className="text-sm font-medium">
                  En nog veel meer kleuren
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Operation and Mounting Section */}
      <div className="bg-primary/5 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Bediening & Montage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-display text-lg font-semibold mb-3">
                Bediening
              </h3>
              <ul className="space-y-2 text-text-medium">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Bediening links of rechts (ketting)
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Elektrisch bedienbaar (optioneel)
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-display text-lg font-semibold mb-3">
                Montage opties
              </h3>
              <ul className="space-y-2 text-text-medium">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Op het kozijn ( met klemsteunen)
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Plafond montage
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Muur montage
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-display text-lg font-semibold mb-3">
                Service
              </h3>
              <ul className="space-y-2 text-text-medium">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Gratis opmeetservice
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Professionele installatie
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Price and CTA Section */}
      <Container className="py-16">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Advies en maatwerk
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Wij bieden gratis opmeetservice en advies bij u thuis of in onze
            showroom. Vraag vrijblijvend een offerte aan of neem contact op met
            onze specialisten.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-primary hover:bg-neutral-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Vraag offerte aan
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Plan gratis adviesgesprek
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DuoRolgordijnen;
