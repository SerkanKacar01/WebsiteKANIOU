import React from "react";
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
import { 
  HomeIcon, 
  ChevronRight, 
  Check, 
  Palette, 
  Ruler, 
  Shield, 
  Phone, 
  Layers, 
  Home, 
  Thermometer, 
  Volume2, 
  Settings, 
  Calendar, 
  Euro, 
  MapPin, 
  Wrench,
  Eye,
  Sun,
  Moon,
  Sparkles,
  Zap
} from "lucide-react";

const VouwgordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>Vouwgordijnen op Maat - Stijlvolle en Functionele Raamdecoratie | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Vouwgordijnen combineren elegantie van gordijnen met gebruiksgemak van jaloezieën. Diverse stoffen en transparanties, op maat gemaakt vanaf €29,99 per lopende meter."
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
                <BreadcrumbLink>Vouwgordijnen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Vouwgordijnen
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 mb-4 leading-relaxed">
              Stijlvolle en Functionele Raamdecoratie
            </p>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Vouwgordijnen combineren de elegantie van gordijnen met het gebruiksgemak van jaloezieën. 
              Ze zijn ideaal voor wie op zoek is naar een stijlvolle en functionele raamdecoratie die past 
              in zowel klassieke als moderne interieurs.
            </p>
          </div>
        </Container>
      </section>

      {/* Advantages Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              Voordelen van Vouwgordijnen
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Esthetiek</h3>
                </div>
                <p className="text-neutral-700">
                  Strakke en moderne uitstraling die warmte en sfeer toevoegt aan elke ruimte.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Sun className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Lichtregulering</h3>
                </div>
                <p className="text-neutral-700">
                  Eenvoudig aan te passen voor optimale lichtinval en privacy.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Home className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Ruimtebesparend</h3>
                </div>
                <p className="text-neutral-700">
                  Nemen weinig ruimte in beslag wanneer opgetrokken.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Thermometer className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Isolerend</h3>
                </div>
                <p className="text-neutral-700">
                  Bieden thermische en akoestische isolatie, afhankelijk van de stofkeuze.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Onderhoudsvriendelijk</h3>
                </div>
                <p className="text-neutral-700">
                  Veel stoffen zijn afneembaar en wasbaar.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Fabric Options Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              Stoffen en Transparantie
            </h2>
            <p className="text-lg text-neutral-600 text-center mb-12 max-w-3xl mx-auto">
              Vouwgordijnen zijn verkrijgbaar in diverse stoffen en transparanties:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Transparant</h3>
                </div>
                <p className="text-neutral-700">
                  Voor een zachte lichtinval en subtiele privacy.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Sun className="h-8 w-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Lichtdoorlatend</h3>
                </div>
                <p className="text-neutral-700">
                  Bieden meer privacy terwijl ze natuurlijk licht binnenlaten.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Moon className="h-8 w-8 text-indigo-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">Verduisterend</h3>
                </div>
                <p className="text-neutral-700">
                  Ideaal voor slaapkamers of ruimtes waar volledige duisternis gewenst is.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-neutral-700 text-center">
                Materialen variëren van linnen en katoen tot synthetische stoffen, 
                beschikbaar in een breed scala aan kleuren en patronen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Customization Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              Maatwerk en Afwerking
            </h2>
            <p className="text-lg text-neutral-600 text-center mb-12 max-w-3xl mx-auto">
              Elk vouwgordijn wordt op maat gemaakt met diverse afwerkingsopties:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Layers className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-neutral-900">Baleinen</h3>
                </div>
                <p className="text-neutral-700">
                  Keuze uit baleinen aan de voor- of achterzijde voor een strakke of klassieke look.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Ruler className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-neutral-900">Zoomafwerking</h3>
                </div>
                <p className="text-neutral-700">
                  Standaard blindzoom of decoratieve afwerkingen zoals schulpranden.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-neutral-900">Voering</h3>
                </div>
                <p className="text-neutral-700">
                  Optioneel voor extra isolatie of verduistering.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Operation & Mounting Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              Bediening en Montage
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <Settings className="h-6 w-6 text-blue-600 mr-3" />
                  Bedieningsopties
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">Handmatige kettingbediening (links of rechts)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">Elektrische bediening met afstandsbediening of via smart home systemen</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
                  <Wrench className="h-6 w-6 text-orange-600 mr-3" />
                  Montagemogelijkheden
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">In de dag (binnen het kozijn)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">Op de dag (op de muur of het plafond)</span>
                  </li>
                </ul>
                <p className="text-neutral-600 mt-4">
                  Montageprofielen en bevestigingsmaterialen worden standaard meegeleverd.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Maintenance Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              Onderhoud
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-neutral-700">
                  Veel stoffen zijn afneembaar en geschikt voor machinewas of chemische reiniging.
                </p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-neutral-700">
                  Regelmatig stofvrij maken met een plumeau of stofzuiger met zachte borstel wordt aanbevolen.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Price Indication */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              Prijsindicatie
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <Euro className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600 mb-4">
                Vanaf €29,99 per lopende meter
              </p>
              <p className="text-neutral-700 mb-4">
                Inclusief maatwerk en standaard afwerking
              </p>
              <p className="text-sm text-neutral-600">
                Exacte prijs afhankelijk van stofkeuze, afmetingen en extra opties zoals voering of elektrische bediening.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Advice Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              Advies en Offerte
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto">
              Onze specialisten staan klaar om u te adviseren over de beste keuze voor uw interieur. 
              Maak gebruik van onze gratis inmeetservice en ontvang een vrijblijvende offerte op maat.
            </p>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Klaar voor uw nieuwe vouwgordijnen?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Neem contact met ons op voor persoonlijk advies en een vrijblijvende offerte op maat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                >
                  Vraag vrijblijvend een offerte aan
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                >
                  Neem contact met ons op
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default VouwgordijnenPage;