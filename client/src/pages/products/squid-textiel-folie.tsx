import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
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
  Shield,
  Palette,
  Settings,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle,
  Sun,
  Eye,
  Droplets,
  Scissors,
  Euro,
  Star,
} from "lucide-react";
import { Link } from "wouter";

const SquidTextielFoliePage = () => {
  const colors = [
    { name: "Chalk", colorClass: "bg-slate-100" },
    { name: "Oak", colorClass: "bg-amber-200" },
    { name: "Ash", colorClass: "bg-gray-300" },
    { name: "Rock", colorClass: "bg-slate-500" },
    { name: "Coal", colorClass: "bg-gray-800" },
    { name: "Bone", colorClass: "bg-stone-200" },
  ];

  return (
    <>
      <Helmet>
        <title>
          SQUID – Zelfklevend Raamtextiel voor Privacy & Design | KANIOU
          Zilvernaald
        </title>
        <meta
          name="description"
          content="SQUID is een innovatief zelfklevend raamtextiel dat zorgt voor privacy en zonwering, zonder het uitzicht of de lichtinval volledig weg te nemen. Vanaf €42,50 per lopende meter."
        />
        <meta
          property="og:title"
          content="SQUID – Zelfklevend Raamtextiel voor Privacy & Design | KANIOU Zilvernaald"
        />
        <meta
          property="og:description"
          content="SQUID is een innovatief zelfklevend raamtextiel dat zorgt voor privacy en zonwering, zonder het uitzicht of de lichtinval volledig weg te nemen. Vanaf €42,50 per lopende meter."
        />
        <meta property="og:type" content="product" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-50 py-4">
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
                <BreadcrumbLink href="/products">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="font-medium">SQUID Textiel Folie</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <Container>
          <div className="py-16">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                Innovatief Raamtextiel
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                SQUID – Zelfklevend Raamtextiel
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
                voor Privacy & Design
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                SQUID is een innovatief zelfklevend raamtextiel dat zorgt voor
                privacy en zonwering, zonder het uitzicht of de lichtinval
                volledig weg te nemen. Het is toepasbaar op elk type raam en is
                een perfect alternatief voor folie of gordijnen.
              </p>
            </div>

            {/* Features Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Belangrijkste kenmerken
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Eye className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Semi-transparant
                    </h3>
                    <p className="text-gray-600">
                      Semi-transparant textiel met moderne uitstraling
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Settings className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Veelzijdig toepasbaar
                    </h3>
                    <p className="text-gray-600">
                      Geschikt voor standaardramen, draai-kiepramen, dakramen en
                      schuifpuien
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Eenvoudige montage
                    </h3>
                    <p className="text-gray-600">
                      Zelfklevend en eenvoudig zelf aan te brengen
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Sun className="w-12 h-12 text-yellow-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Optimale lichtinval
                    </h3>
                    <p className="text-gray-600">
                      Laat licht door, maar houdt inkijk tegen overdag
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Shield className="w-12 h-12 text-red-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      UV- en vochtbestendig
                    </h3>
                    <p className="text-gray-600">Ook geschikt voor badkamers</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Colors Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Kleuren
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                {colors.map((color) => (
                  <div key={color.name} className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto rounded-full border-2 border-gray-200 shadow-md ${color.colorClass} mb-3`}
                    ></div>
                    <p className="font-medium text-gray-700">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Scissors className="w-12 h-12 text-blue-600 mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Montage
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Droog en stofvrij oppervlak noodzakelijk
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Eenvoudig aan te brengen zonder luchtbellen
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Kan op maat worden gesneden
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Geen montageaccessoires nodig
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Droplets className="w-12 h-12 text-blue-600 mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Onderhoud
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Droog afnemen met zachte doek of plumeau
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Geen schurende of natte reiniging
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
              <div className="text-center">
                <Euro className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Prijsindicatie
                </h2>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  Vanaf €73
                </div>
                <p className="text-xl text-gray-700 mb-4">
                  per lopende meter (breedte: 130 cm)
                </p>
                <p className="text-gray-600">
                  Prijs afhankelijk van kleur en hoeveelheid
                </p>
              </div>
            </div>

            {/* Advice Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Advies
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Onze adviseurs demonstreren SQUID graag in onze showroom of
                  bij u thuis. Vraag nu uw offerte aan of maak een afspraak.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Link href="/quote">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Vraag een offerte aan
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-4 text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Plan een gratis adviesgesprek
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SquidTextielFoliePage;
