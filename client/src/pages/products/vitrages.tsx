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
import { HomeIcon, ChevronRight, Check, Palette, Ruler, Shield, Phone, Layers, Home, Thermometer, Volume2, Magnet, Calendar, Euro, MapPin, Wrench, Lightbulb, Eye, Sun } from "lucide-react";

const VitragesPage = () => {
  return (
    <>
      <Helmet>
        <title>Vitrages op Maat - Elegante Lichtinval en Privacy | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Transparante vitrages op maat voor elegante lichtinval en subtiele privacy. Voile, inbetween en organza stoffen. Vanaf €19,99 per lopende meter. Gratis opmeten."
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
                Vitrages op maat
              </h1>
              <p className="text-xl text-text-medium mb-8 leading-relaxed">
                Vitrages zijn transparante gordijnen die zorgen voor een elegante lichtinval en subtiele privacy. Ze creëren een zachte sfeer in de ruimte en worden vaak gecombineerd met overgordijnen of jaloezieën.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/quote">Vraag offerte aan</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Gratis adviesgesprek</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Elegante vitrages met zachte lichtinval"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-primary">Vanaf €19,99</div>
                <div className="text-text-medium">per lopende meter - inclusief confectie</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stoffen en lichtdoorlatendheid Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Sun className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Stoffen en lichtdoorlatendheid
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Onze vitrages zijn vervaardigd uit hoogwaardige stoffen met een luchtige structuur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-blue-900">
                Voile
              </h3>
              <p className="text-blue-700">
                Glad, fijn geweven, klassiek en elegant voor een tijdloze uitstraling.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-green-900">
                Inbetween
              </h3>
              <p className="text-green-700">
                Iets dikker, semi-transparant, modern en decoratief voor hedendaagse interieurs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-purple-900">
                Organza of linnenlook
              </h3>
              <p className="text-purple-700">
                Structuur en luxe uitstraling met verfijnde textuur en elegantie.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-8 rounded-xl">
            <h3 className="font-display text-2xl font-semibold mb-4 text-center">Beschikbare kleuren</h3>
            <p className="text-text-medium text-center mb-6">
              Beschikbaar in wit, gebroken wit, naturel, grijs- en zandtinten. Patronen zoals streepmotieven of geweven structuur kunnen ook geselecteerd worden.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="bg-white px-4 py-2 rounded-full border border-gray-200">Wit</span>
              <span className="bg-stone-100 px-4 py-2 rounded-full border border-gray-200">Gebroken wit</span>
              <span className="bg-amber-50 px-4 py-2 rounded-full border border-gray-200">Naturel</span>
              <span className="bg-gray-200 px-4 py-2 rounded-full border border-gray-300">Grijstinten</span>
              <span className="bg-yellow-50 px-4 py-2 rounded-full border border-gray-200">Zandtinten</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Confectiemogelijkheden Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Confectiemogelijkheden
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              U kunt kiezen uit verschillende plooisoorten, afhankelijk van de gewenste uitstraling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Enkelvoudige plooi</h3>
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Standaard</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Klassieke, strakke uitstraling voor een minimalistisch effect.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Dubbele plooi</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">+10%</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Meer volume en rijkere uitstraling met elegante plooivorming.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Driedubbele plooi</h3>
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">+15%</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Luxe afwerking met extra volume voor een indrukwekkende uitstraling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Wave plooi</h3>
                <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">+20%</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Voor een strak en golvend effect met moderne uitstraling.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Afwerking en montage Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Afwerking en montage
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Professionele afwerking en montage voor een perfecte installatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-4 text-blue-900">Afwerking opties</h3>
              <ul className="space-y-3 text-blue-700">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600" />
                  Machinale blindzoom (standaard)
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600" />
                  Handgenaaide afwerking (optioneel)
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-4 text-green-900">Montage mogelijkheden</h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  Combinatie mogelijk met overgordijnen of gordijnrails
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  Geschikt voor plaatsing met rails, roedes of spansystemen
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Maatvoering Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Ruler className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Maatvoering
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Onze vitrages worden volledig op maat geconfectioneerd. Indien gewenst komen wij gratis bij u opmeten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Minimale breedte</h3>
              <p className="text-3xl font-bold text-primary mb-2">40 cm</p>
              <p className="text-text-medium">Kleinste afmeting mogelijk</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Maximale breedte</h3>
              <p className="text-3xl font-bold text-primary mb-2">600 cm</p>
              <p className="text-text-medium">Voor grote raampartijen</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Maximale hoogte</h3>
              <p className="text-3xl font-bold text-primary mb-2">320 cm</p>
              <p className="text-text-medium">Voor hoge ruimtes</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Voordelen Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Voordelen van vitrages
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Ontdek waarom vitrages de perfecte keuze zijn voor uw interieur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-amber-900">Zachte lichtinval</h3>
              <p className="text-sm text-amber-700">Verzachten lichtinval zonder volledige afscherming</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-900">Sfeervol interieur</h3>
              <p className="text-sm text-blue-700">Creëren een sfeervol interieur zonder inkijk</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-green-900">Perfect combineerbaar</h3>
              <p className="text-sm text-green-700">Perfect te combineren met andere raamdecoratie</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-purple-900">Onderhoudsvriendelijk</h3>
              <p className="text-sm text-purple-700">Onderhoudsvriendelijk en kleurvast</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Euro className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Prijsindicatie
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Transparante prijzen voor maatwerk vitrages
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">Vanaf €19,99</div>
                <div className="text-lg text-text-medium">per lopende meter</div>
                <div className="text-sm text-text-light">(inclusief confectie, exclusief montage)</div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-text-medium">Confectie</span>
                  <span className="font-semibold text-green-600">✓ Inbegrepen</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-text-medium">Gratis opmeten</span>
                  <span className="font-semibold text-green-600">✓ Beschikbaar</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-text-medium">Montage</span>
                  <span className="font-semibold text-text-medium">Op aanvraag</span>
                </div>
              </div>

              <p className="text-sm text-text-medium text-center mb-6">
                De uiteindelijke prijs is afhankelijk van de stofkeuze en afwerking.
              </p>

              <div className="text-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/quote">Vraag vrijblijvend een offerte aan</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-primary text-white">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold mb-6">
              Klaar voor uw nieuwe vitrages?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Neem contact met ons op voor een vrijblijvende offerte of persoonlijk adviesgesprek. 
              Wij helpen u graag bij het maken van de perfecte keuze voor uw interieur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/quote">Offerte aanvragen</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Contact opnemen</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default VitragesPage;