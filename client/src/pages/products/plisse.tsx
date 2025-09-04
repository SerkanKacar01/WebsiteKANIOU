import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
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
  Moon,
  Home as HomeIconFilled,
  Wrench,
  Euro
} from "lucide-react";
import { Link } from "wouter";

const PlissePage = () => {
  return (
    <>
      <Helmet>
        <title>Plissé Gordijnen – Elegante Lichtfiltering met Veelzijdige Toepassing | KANIOU Zilvernaald</title>
        <meta name="description" content="Plissé gordijnen zijn stijlvolle raamdecoratie bestaande uit gevouwen stof die zich als een harmonica opent en sluit. Vanaf €74,95 per m², inclusief maatwerk." />
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
                <BreadcrumbLink>Plissé Gordijnen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Introduction Section */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
                  Plissé Gordijnen – Elegante Lichtfiltering met Veelzijdige Toepassing
                </h1>
                <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
                  Plissé gordijnen zijn stijlvolle raamdecoratie bestaande uit gevouwen stof die zich als een harmonica opent en sluit. 
                  Ze zijn geschikt voor vrijwel elk raamtype en geven een zachte uitstraling aan uw interieur.
                </p>
              </div>

              {/* Key Advantages Section */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 text-center">
                  Voordelen
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Sun className="h-6 w-6 text-primary mr-3" />
                        <h3 className="font-semibold text-text-dark">Veelzijdige Transparantie</h3>
                      </div>
                      <p className="text-text-light">
                        Beschikbaar in transparante, lichtdoorlatende en verduisterende stoffen
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <HomeIconFilled className="h-6 w-6 text-primary mr-3" />
                        <h3 className="font-semibold text-text-dark">Universeel Toepasbaar</h3>
                      </div>
                      <p className="text-text-light">
                        Geschikt voor rechte ramen, dakramen, draaikiepramen en serres
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="h-6 w-6 text-primary mr-3" />
                        <h3 className="font-semibold text-text-dark">Duoplissé Variant</h3>
                      </div>
                      <p className="text-text-light">
                        Duoplissé-variant beschikbaar voor isolatie en privacy
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Settings className="h-6 w-6 text-primary mr-3" />
                        <h3 className="font-semibold text-text-dark">Flexibele Bediening</h3>
                      </div>
                      <p className="text-text-light">
                        Top-down/bottom-up bediening mogelijk
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary mr-3" />
                        <h3 className="font-semibold text-text-dark">Ruimtebesparend</h3>
                      </div>
                      <p className="text-text-light">
                        Compact en ruimtebesparend ontwerp
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Fabric Types Section */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 text-center">
                  Stoffen & Kleuren
                </h2>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center mb-4">
                          <Palette className="h-6 w-6 text-primary mr-3" />
                          <h3 className="text-xl font-semibold text-text-dark">Stoffenassortiment</h3>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-text-light">Grote keuze uit stoffen met structuur of effen</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-text-light">Ook leverbaar met honingraatstructuur (voor betere isolatie)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-dark mb-4">Beschikbare Kleuren</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">Wit</Badge>
                          <Badge variant="outline">Grijs</Badge>
                          <Badge variant="outline">Zand</Badge>
                          <Badge variant="outline">Beige</Badge>
                          <Badge variant="outline">Antraciet</Badge>
                          <Badge variant="outline">En meer...</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Operation & Mounting Section */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 text-center">
                  Montage & Bediening
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Wrench className="h-6 w-6 text-primary mr-3" />
                        <h3 className="text-xl font-semibold text-text-dark">Montage Opties</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-text-light">In of op het kozijn te monteren</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-text-light">Ook geschikt voor plisségordijnen zonder boren (EasyFix)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Settings className="h-6 w-6 text-primary mr-3" />
                        <h3 className="text-xl font-semibold text-text-dark">Bedienings Opties</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-text-light">Bedienbaar met koord</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-text-light">Handgreep bediening</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-text-light">Elektrisch (optioneel)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Maintenance Section */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 text-center">
                  Onderhoud
                </h2>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Sparkles className="h-6 w-6 text-primary mr-3" />
                      <h3 className="text-xl font-semibold text-text-dark">Eenvoudig Onderhoud</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-text-light">Regelmatig afstoffen met plumeau of borstel</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-text-light">Eventueel licht vochtig reinigen met doek</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Section */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 text-center">
                  Prijsindicatie
                </h2>
                <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Euro className="h-8 w-8 text-primary mr-3" />
                      <span className="text-3xl md:text-4xl font-bold text-text-dark">Vanaf €74,95</span>
                      <span className="text-lg text-text-light ml-2">per m²</span>
                    </div>
                    <p className="text-text-light max-w-2xl mx-auto">
                      Prijs afhankelijk van type stof, afmeting en montageoptie. Inclusief maatwerk.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Personal Advice & CTA Section */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 text-center">
                  Persoonlijk Advies
                </h2>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8 text-center">
                    <p className="text-lg text-text-light mb-8 max-w-3xl mx-auto">
                      Onze adviseurs helpen u graag bij de keuze van het juiste plisségordijn. 
                      Vraag een vrijblijvende offerte aan of maak een afspraak in onze showroom.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        asChild
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                      >
                        <Link href="/contact">
                          <Phone className="h-5 w-5 mr-2" />
                          Vraag een offerte aan
                        </Link>
                      </Button>
                      
                      <Button 
                        asChild
                        variant="outline" 
                        size="lg" 
                        className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
                      >
                        <Link href="/contact">
                          <Calendar className="h-5 w-5 mr-2" />
                          Plan een gratis adviesgesprek
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>


            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PlissePage;