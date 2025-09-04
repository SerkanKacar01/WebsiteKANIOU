import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, Check, MessageCircle, Calculator, Shield, Settings, Palette, Wrench, Droplets, Euro } from "lucide-react";

const OpzethorrenPage = () => {
  return (
    <>
      <Helmet>
        <title>Opzethorren - Eenvoudig Plaatsbare Raamhorren voor Buitenmontage | Elegant Drapes</title>
        <meta name="description" content="Opzethorren ideaal voor naar buiten draaiende ramen. Robuuste aluminium profielen, in vele kleuren leverbaar. Vanaf €49 per stuk, volledig op maat gemaakt." />
        <meta property="og:title" content="Opzethorren - Eenvoudig Plaatsbare Raamhorren voor Buitenmontage | Elegant Drapes" />
        <meta property="og:description" content="Opzethorren voor buitenmontage. Robuust, duurzaam en effectief tegen insecten. Vanaf €49 per stuk." />
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
                <span className="font-semibold">Opzethorren</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                Opzethorren – Eenvoudig Plaatsbare Raamhorren voor Buitenmontage
              </h1>
              <p className="text-lg md:text-xl text-text-medium max-w-4xl mx-auto leading-relaxed">
                Opzethorren zijn ideaal voor ramen zonder ruimte binnen het kozijn of voor situaties waar een inzethor niet mogelijk is. Ze worden aan de buitenzijde van het raam geplaatst en zijn robuust, duurzaam en zeer effectief tegen insecten.
              </p>
            </div>

            {/* Features Section */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Voordelen
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Geschikt voor naar buiten draaiende ramen</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Robuuste aluminium profielen</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">In vele standaard- en RAL-kleuren leverbaar</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Eenvoudige bevestiging met schroeven</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Volledig op maat gemaakt</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Keuze uit diverse gaastypen</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Frame & Mesh Options */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Frame- & Gaasopties
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-text-dark mb-4 flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-primary" />
                    Framekleuren
                  </h3>
                  <p className="text-text-medium leading-relaxed">
                    Wit, antraciet, zwart, crème of RAL op kleur
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-text-dark mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Gaasopties
                  </h3>
                  <ul className="space-y-2 text-text-medium">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      Standaard grijs/zwart gaas
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      Petscreen (extra stevig)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      Pollenfiltergaas (anti-allergie)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Installation Details */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Montage
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">Schroefmontage aan buitenzijde raamkozijn</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">Voor vaste ramen of buiten openslaande ramen</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">Inclusief bevestigingsmateriaal en handleiding</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Tips */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Onderhoud
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Droplets className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Eenvoudig schoon te maken</h3>
                      <p className="text-text-medium">Met doek of stofzuiger</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-2">Gaas afspoelbaar</h3>
                      <p className="text-text-medium">Met water en zachte borstel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Indication */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Prijsindicatie
              </h2>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg border max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                  <Euro className="h-8 w-8 text-primary mr-2" />
                  <span className="text-3xl font-bold text-primary">Vanaf €49</span>
                  <span className="text-lg text-text-medium ml-2">per stuk</span>
                </div>
                <p className="text-text-medium">
                  Afhankelijk van maat, gaaskeuze en kleur. Inclusief maatwerk en standaard bevestiging.
                </p>
              </div>
            </div>

            {/* Advice Section */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Advies op maat
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto text-center">
                <p className="text-lg text-text-medium mb-8">
                  Voor vragen of hulp bij uw keuze staan onze specialisten voor u klaar. Vraag direct een offerte aan of plan een adviesgesprek in de showroom.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-lg text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Klaar voor uw Opzethorren op maat?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Ontvang een persoonlijke offerte of plan een gratis adviesgesprek in onze showroom.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quote">
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-3">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Vraag een offerte aan
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3">
                      <Calculator className="h-5 w-5 mr-2" />
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

export default OpzethorrenPage;