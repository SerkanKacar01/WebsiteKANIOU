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
import { HomeIcon, ChevronRight, Check, Palette, Ruler, Shield, Phone, Layers, Home, Thermometer, Volume2, Magnet, Calendar, Euro, MapPin, Wrench } from "lucide-react";

const OvergordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>Overgordijnen op Maat - Warmte, Stijl en Functionaliteit | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Overgordijnen met verduistering en extra isolatie. Katoen, linnen, velours stoffen op maat. Professionele montage vanaf €129,99. Gratis advies en opmeting."
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
                <BreadcrumbLink>Overgordijnen</BreadcrumbLink>
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
                Overgordijnen – Warmte, Stijl en Functionaliteit in Één
              </h1>
              <p className="text-xl text-text-medium mb-8 leading-relaxed">
                Onze overgordijnen zijn ontworpen om niet alleen sfeer en stijl aan uw interieur toe te voegen, maar ook praktische voordelen te bieden zoals verduistering en extra isolatie. Ze zijn perfect geschikt voor slaapkamers, woonkamers en ruimtes waar comfort en privacy centraal staan.
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
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Elegante overgordijnen in luxe interieur"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-primary">Vanaf €129,99</div>
                <div className="text-text-medium">per raam - inclusief maatwerk</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stofkeuze en Afwerking Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Stofkeuze en Afwerking
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Verkrijgbaar in een ruime selectie van hoogwaardige stoffen met duurzame eigenschappen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-blue-900">
                Katoen
              </h3>
              <p className="text-blue-700">
                Natuurlijk en ademend materiaal voor een warme, huiselijke sfeer.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-green-900">
                Linnen
              </h3>
              <p className="text-green-700">
                Natuurlijke textuur met elegante uitstraling en duurzaamheid.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-purple-900">
                Velours
              </h3>
              <p className="text-purple-700">
                Luxueuze, zachte texturen met een rijke en warme uitstraling.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-amber-900">
                Polyester
              </h3>
              <p className="text-amber-700">
                Onderhoudsarm en kreukbestendig voor praktisch gebruik.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-teal-900">
                Gemengde weefsels
              </h3>
              <p className="text-teal-700">
                Optimale balans tussen natuurlijke en synthetische eigenschappen.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-gray-900">
                Brandvertragend
              </h3>
              <p className="text-gray-700">
                Speciale behandeling voor professionele en veiligheidstoepassingen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-8 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                Transparante varianten
              </h3>
              <p className="text-text-medium">
                Voor een luchtige sfeer met zachte lichtfiltering, perfect voor woonkamers en eetkamers.
              </p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                Volledig verduisterend
              </h3>
              <p className="text-text-medium">
                Ideaal voor slaapkamers en ruimtes waar complete privacy en duisternis gewenst is.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-primary/5 p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-medium">UV-bestendigheid</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Check className="w-6 h-6 text-primary" />
                <span className="font-medium">Kreukherstellend vermogen</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-medium">Duurzame kwaliteit</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Plooien en Confectie Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Plooien en Confectie
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Kies de perfecte plooi voor uw gewenste stijl en volume
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
                Strak en minimalistisch. Klassieke, tijdloze uitstraling voor elke interieurstijl.
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
                Voor een rijkere en vollere uitstraling. Meer volume en elegantie.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Driedubbele plooi</h3>
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Luxe</span>
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
                <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">Modern</span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Moderne, vloeiende lijnen met een eigentijdse look.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-lg text-text-medium">
                Elke plooi beïnvloedt het valgedrag en de luxe uitstraling van uw overgordijnen. 
                Onze specialisten adviseren u graag over de beste keuze voor uw interieur.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Voering & Afwerking Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl text-primary font-semibold mb-8">
                Voering & afwerking
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Met voering</h3>
                    <p className="text-text-medium">
                      Thermisch isolerend, lichtwerend en geluidsdempend.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Zonder voering</h3>
                    <p className="text-text-medium">
                      Meer lichtdoorlatend en soepel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Zoomafwerking</h3>
                    <p className="text-text-medium">
                      Standaard blindzoom of decoratieve boord.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Voering en afwerking details van overgordijnen"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Ophangsystemen Section */}
      <div className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Ophangsystemen
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Te combineren met diverse rails en roedes voor elke situatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">Standaard rails</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Wandmontage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Met of zonder runners</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Soepele bediening</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">Elektrische systemen</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Automatische bediening</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Afstandsbediening</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Smart home integratie</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">Inbouw systemen</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Verborgen montage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Clean design</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Plafondmontage</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">Met ringen</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Klassieke uitstraling</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Verschillende materialen</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Eenvoudige montage</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">Met haakjes</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Onzichtbare bevestiging</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Soepel glijden</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Modern systeem</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">Met runners</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Zeer soepele werking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Duurzaam systeem</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Professionele kwaliteit</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-lg text-text-medium">
                Verkrijgbaar met of zonder ringen, haakjes of runners. Onze adviseurs begeleiden u in de keuze voor het juiste ophangsysteem.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Montagemogelijkheden Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Montagemogelijkheden
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Flexibele montage-opties voor elke situatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-blue-900 mb-4">
                  In-de-dag
                </h3>
              </div>
              <p className="text-blue-700 text-lg text-center mb-4">
                Montage tussen de muren of kozijnen voor een strakke, ingebouwde look.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Minimaal zichtbare hardware</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Clean, moderne uitstraling</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Maximale ruimtebesparing</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-green-900 mb-4">
                  Op-de-dag
                </h3>
              </div>
              <p className="text-green-700 text-lg text-center mb-4">
                Montage boven het raam of op de muur voor maximale flexibiliteit.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Eenvoudige installatie</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Geschikt voor elke raamopening</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Meer lichtinval mogelijk</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Afmetingen op maat */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Ruler className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Afmetingen op maat
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Inclusief afwerking en versteviging voor extra duurzaamheid
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">40 cm - 700 cm</div>
              <div className="text-blue-700 font-medium text-lg">Breedte</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-900 mb-2">Tot 350 cm</div>
              <div className="text-green-700 font-medium text-lg">Hoogte</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl text-center">
            <p className="text-lg text-text-dark mb-4">
              Wij zorgen voor professionele confectie op basis van uw doorgegeven maten of komen gratis opmeten bij u thuis.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Gratis opmeetafspraak
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Optionele Toevoegingen Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Optionele Toevoegingen
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Extra functionaliteiten voor optimaal comfort en privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-4">
                  Geluidswerende voering
                </h3>
              </div>
              <p className="text-text-medium text-center mb-4">
                Vermindert geluidshinder van buitenaf voor een rustigere leefomgeving.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Tot 30% geluidsreductie</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Ideaal voor drukke straten</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Thermometer className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-4">
                  Thermisch isolerende backing
                </h3>
              </div>
              <p className="text-text-medium text-center mb-4">
                Helpt warmte binnen te houden en zorgt voor energiebesparing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Energiebesparend</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Koude tegenhouden</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Magnet className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-4">
                  Magnetische sluiting
                </h3>
              </div>
              <p className="text-text-medium text-center mb-4">
                Voor maximale verduistering met overlappanelen.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">100% lichtdicht</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Ideaal voor slaapkamers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Onderhoud Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
            <h3 className="font-display text-2xl font-semibold text-primary mb-6 text-center">
              Onderhoud
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">Wasbare stoffen</h4>
                <p className="text-text-medium mb-4">
                  Veel stoffen zijn wasbaar of chemisch reinigbaar voor eenvoudig onderhoud.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Machinewasbaarheid bij 30°C</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Chemische reiniging mogelijk</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Onderhoudsadvies</h4>
                <p className="text-text-medium mb-4">
                  Inclusief onderhoudsadvies per stofkeuze voor langdurige schoonheid.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Persoonlijke adviesgids</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Onderhoudstips per materiaal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plaatsing en Service Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-primary mb-6 text-center">
              Plaatsing en Service
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Professionele opmeting</h4>
                <p className="text-text-medium text-sm">
                  Gratis en nauwkeurige opmeting bij u thuis voor perfecte pasvorm.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Vakkundige plaatsing</h4>
                <p className="text-text-medium text-sm">
                  Professionele montage door ervaren specialisten.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Gratis advies</h4>
                <p className="text-text-medium text-sm">
                  Persoonlijk advies bij u thuis of in onze showroom.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium text-primary">Snelle levertijd: gemiddeld 3 tot 4 weken</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Prijsindicatie Section */}
      <div className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold mb-8">
              Prijsindicatie
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl max-w-2xl mx-auto">
              <div className="text-6xl font-bold mb-4">
                Vanaf €129,99
              </div>
              <div className="text-2xl mb-6 opacity-90">
                per raam – inclusief maatwerk en confectie
              </div>
              <div className="text-lg opacity-80 mb-2">
                Exclusief montagekosten
              </div>
              <p className="text-lg opacity-80 mb-8">
                Exacte prijs afhankelijk van gekozen stof, afmetingen, confectie en voering.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                  <Link href="/quote">Vrijblijvende offerte</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/contact">Persoonlijk advies</Link>
                </Button>
              </div>
            </div>
            
            <p className="text-lg opacity-80 mt-8">
              Gebruik onze offertepagina voor een vrijblijvende berekening op maat.
            </p>
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Klaar om uw overgordijnen op maat te laten maken?
            </h2>
            <p className="text-xl text-text-medium mb-8 max-w-3xl mx-auto">
              Onze experts staan klaar om u te adviseren over de beste keuzes voor uw interieur. 
              Van stofkeuze tot montage, wij zorgen voor een perfect resultaat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/quote">Vraag offerte aan</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/contact">Gratis adviesgesprek</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default OvergordijnenPage;
import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const OvergordijnenPage = () => {
  return (
    <ProductDetailTemplate
      productName="Overgordijnen"
      productDescription="Premium overgordijnen die warmte, stijl en functionaliteit combineren. Perfect voor het creëren van een elegante sfeer met optimale lichtcontrole."
      imageUrl="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      startingPrice={129.99}
      priceUnit="per raam"
      features={[
        "Thermische isolatie",
        "Lichtcontrole en privacy",
        "Diverse stofkeuzes",
        "Op maat gemaakt",
        "Professionele montage",
        "Gratis inmeting"
      ]}
      categoryName="Overgordijnen"
      categoryPath="overgordijnen"
    />
  );
};

export default OvergordijnenPage;
