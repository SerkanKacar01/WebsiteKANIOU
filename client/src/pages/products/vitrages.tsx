import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import vitrageImage1 from "@assets/IMG_9298.jpg";
import vitrageImage2 from "@assets/IMG_9304.jpg";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, Check, Palette, Sun, Eye, Layers, Home, Shield, Ruler, Calendar, Euro, MapPin, Wrench, MessageCircle } from "lucide-react";

const VitragesPage = () => {
  return (
    <>
      <Helmet>
        <title>Vitrages op Maat - Elegantie en Lichtinval | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Vitrages voor zachte lichtfiltering en subtiele privacy. Verkrijgbaar in verschillende transparantiegraden en structuren. Professioneel op maat vanaf €19,99 per lopende meter."
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
                <BreadcrumbLink href="/products">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Vitrages</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Vitrages - Elegantie en Lichtinval
              </h1>
              <p className="text-xl text-text-medium mb-8 leading-relaxed">
                Vitrages zijn transparante gordijnen die een zachte lichtinval en subtiele privacy creëren. Ze vormen een stijlvolle en lichte toevoeging aan elke ruimte. Ideaal voor woonkamers, eetruimtes en slaapkamers waarin sfeer en daglicht samenkomen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/quote">Vraag vrijblijvend offerte aan</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Meer info of advies aanvragen</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={vitrageImage1}
                alt="Elegante vitrages met zachte lichtinval"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-primary">Vanaf €19,99</div>
                <div className="text-text-medium">per lopende meter - inclusief maatwerk</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Voordelen van Vitrages Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Sun className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Voordelen van Vitrages
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Ontdek waarom vitrages de perfecte keuze zijn voor uw interieur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-amber-900">
                Zachte lichtfiltering
              </h3>
              <p className="text-primary">
                Zonder het daglicht volledig te blokkeren voor een natuurlijke, warme sfeer.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-blue-900">
                Privacy overdag
              </h3>
              <p className="text-blue-700">
                Bieden privacy overdag zonder zwaar aan te voelen in uw interieur.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-green-900">
                Verschillende transparantiegraden
              </h3>
              <p className="text-green-700">
                Verkrijgbaar in verschillende transparantiegraden en structuren naar uw wens.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-purple-900">
                Combineerbaar met overgordijnen
              </h3>
              <p className="text-purple-700">
                Voor extra isolatie en stijl, perfect te combineren met andere raamdecoratie.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-teal-900">
                Diverse plooivormen
              </h3>
              <p className="text-teal-700">
                Keuze uit enkele plooi, dubbele plooi, wave plooi voor uw gewenste stijl.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-rose-900">
                Professioneel maatwerk
              </h3>
              <p className="text-rose-700">
                Verkrijgbaar in wit, gebroken wit, grijstinten en moderne pastels.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Plooivormen Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Plooivormen - Keuze uit Diverse Stijlen
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Kies de perfecte plooi voor uw gewenste stijl en uitstraling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Enkele plooi</h3>
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Klassiek</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Strak en minimalistisch voor een tijdloze, elegante uitstraling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Dubbele plooi</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Populair</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Voor meer volume en een rijkere, vollere uitstraling in uw interieur.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Wave plooi</h3>
                <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">Modern</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Moderne, vloeiende lijnen met een eigentijdse, dynamische look.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Afwerking en Montage Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Afwerking en Montage
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Professionele afwerking en service voor het perfecte resultaat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Plooien naar keuze</h3>
                    <p className="text-text-medium">Afgestemd op jouw interieurstijl en persoonlijke voorkeuren.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Kwaliteitsafwerking</h3>
                    <p className="text-text-medium">Wordt afgewerkt met kwaliteitsband en professionele zomen.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Flexibele montage</h3>
                    <p className="text-text-medium">Geschikt voor zowel rails als roedes, naar uw voorkeur.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Gratis service</h3>
                    <p className="text-text-medium">Inclusief gratis inmeetservice en professioneel plaatsingsadvies.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={vitrageImage2}
                alt="Professionele montage van vitrages"
                className="rounded-lg shadow-xl w-full h-[350px] object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Prijsinformatie Section */}
      <div className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Euro className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Prijsinformatie
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Transparante prijzen voor maatwerk vitrages van hoge kwaliteit
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-primary mb-4">€19,99</div>
                <div className="text-xl text-text-medium mb-6">per lopende meter (incl. maatwerk, excl. plaatsing)</div>
                <p className="text-text-medium">
                  Prijs afhankelijk van stofkeuze, hoogte en gewenste afwerking
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Ruler className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Maatwerk</h3>
                  <p className="text-sm text-text-medium">Precies op maat</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Kwaliteit</h3>
                  <p className="text-sm text-text-medium">Hoogwaardige stoffen</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Service</h3>
                  <p className="text-sm text-text-medium">Gratis inmeting</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Waarom kiezen voor onze vitrages Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Waarom kiezen voor onze vitrages?
            </h2>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-text-medium mb-8 leading-relaxed">
              Wij combineren kwaliteit met vakmanschap. Elke vitrage wordt individueel geconfectioneerd op basis van uw ramen en voorkeuren. Ons team komt indien gewenst gratis bij u thuis opmeten en adviseren.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-blue-900 mb-2">Ervaring</h3>
                <p className="text-blue-700">Jarenlange ervaring in maatwerk raamdecoratie</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-green-900 mb-2">Kwaliteit</h3>
                <p className="text-green-700">Alleen de beste materialen en vakmanschap</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-purple-900 mb-2">Service</h3>
                <p className="text-purple-700">Persoonlijk advies en professionele begeleiding</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-primary to-secondary">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-display text-4xl font-semibold mb-6">
              Offerte & Contact
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Klaar om uw ruimte te transformeren met onze prachtige vitrages? Vraag vandaag nog een vrijblijvende offerte aan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link href="/quote">Vraag vrijblijvend offerte aan</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Meer info of advies aanvragen</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default VitragesPage;