import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home as HomeIcon, Thermometer, Shield, Volume2, Wrench, Droplets, Euro } from "lucide-react";

const DuoPlissePage = () => {
  return (
    <>
      <Helmet>
        <title>Duo Plissé – Elegantie én Isolatie in Eén Gordijn | KANIOU Zilvernaald</title>
        <meta name="description" content="Duo Plissé gordijnen combineren stijlvolle uitstraling met isolatie en privacy. Dubbele stoflaag met honingraatstructuur vanaf €84,95 per m²." />
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
                <BreadcrumbLink>Duo Plissé</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Hero Section */}
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6">
                  Duo Plissé – Elegantie én Isolatie in Eén Gordijn
                </h1>
                <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
                  Duo Plissé gordijnen combineren de stijlvolle uitstraling van plisségordijnen met de functionele voordelen van isolatie en privacy. Dankzij de dubbele stoflaag met honingraatstructuur ontstaat een luchtbuffer die warmte binnenhoudt in de winter en buiten houdt in de zomer.
                </p>
              </div>

              {/* Key Advantages */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-8 text-center">
                  Belangrijkste voordelen
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Thermometer className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Thermisch & Akoestisch Comfort</h3>
                      <p className="text-text-light text-sm">Verhoogt thermisch en akoestisch comfort</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                      <Euro className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Energiebesparend</h3>
                      <p className="text-text-light text-sm">Energiebesparend door isolerende werking</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Maximale Flexibiliteit</h3>
                      <p className="text-text-light text-sm">Top-down/bottom-up bediening voor maximale flexibiliteit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                      <Volume2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Compact Systeem</h3>
                      <p className="text-text-light text-sm">Compact systeem – ook geschikt voor kleine ramen</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                      <Wrench className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Duurzame Materialen</h3>
                      <p className="text-text-light text-sm">Duurzame en onderhoudsvriendelijke materialen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fabric & Colors */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-6">
                  Stoffen & Kleuren
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Lichtdoorlatendheid</h3>
                    <ul className="space-y-2 text-text-light">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Transparant
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Lichtdoorlatend
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Verduisterend
                      </li>
                    </ul>
                    <p className="text-text-light mt-4 text-sm">
                      Honingraatstructuur met luchtkamers voor isolatie
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Beschikbare Kleuren</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white border border-gray-300 rounded-full"></div>
                        <span className="text-text-light text-sm">Wit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-50 border border-gray-300 rounded-full"></div>
                        <span className="text-text-light text-sm">Crème</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-100 border border-gray-300 rounded-full"></div>
                        <span className="text-text-light text-sm">Taupe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-400 border border-gray-300 rounded-full"></div>
                        <span className="text-text-light text-sm">Grijs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-700 border border-gray-300 rounded-full"></div>
                        <span className="text-text-light text-sm">Antraciet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-black border border-gray-300 rounded-full"></div>
                        <span className="text-text-light text-sm">Zwart</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operation & Mounting */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-6">
                  Bediening & Montage
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Bedieningsopties</h3>
                    <ul className="space-y-2 text-text-light">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Handgreep
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Koord
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Elektrische bediening
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Montagemogelijkheden</h3>
                    <ul className="space-y-2 text-text-light">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        In het kozijn te monteren
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Op het kozijn te monteren
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        EasyFix (zonder boren) mogelijk voor kunststof ramen
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Maintenance */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-6 flex items-center gap-3">
                  <Droplets className="h-8 w-8 text-primary" />
                  Onderhoud
                </h2>
                <div className="space-y-4">
                  <p className="text-text-light flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Stofvrij maken met plumeau of zachte borstel
                  </p>
                  <p className="text-text-light flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Reiniging met licht vochtige doek indien nodig
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg border">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-6 text-center">
                  Prijsindicatie
                </h2>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    Vanaf €84,95 per m²
                  </div>
                  <p className="text-text-light">
                    Inclusief maatwerk. Prijs afhankelijk van type stof, afmeting en bedieningsoptie.
                  </p>
                </div>
              </div>

              {/* Personal Advice & CTA */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-6 text-center">
                  Persoonlijk advies
                </h2>
                <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
                  Onze specialisten geven u graag advies op maat. Vraag nu een vrijblijvende offerte aan of plan een gratis consult in onze showroom.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <Link href="/quote">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Vraag een offerte aan
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      Plan een gratis adviesgesprek
                    </Button>
                  </Link>
                </div>
              </div>



            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DuoPlissePage;