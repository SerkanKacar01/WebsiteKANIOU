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
  Magnet,
  Calendar,
  Euro,
  MapPin,
  Wrench,
} from "lucide-react";

const OvergordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Overgordijnen op Maat - Warmte, Stijl en Functionaliteit | KANIOU
          zilvernaald
        </title>
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
                Onze overgordijnen zijn ontworpen om niet alleen sfeer en stijl
                aan uw interieur toe te voegen, maar ook praktische voordelen te
                bieden zoals verduistering en extra isolatie. Ze zijn perfect
                geschikt voor slaapkamers, woonkamers en ruimtes waar comfort en
                privacy centraal staan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/quote">Vraag offerte aan</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="text-lg px-8 py-6"
                >
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
                <div className="text-2xl font-bold text-primary">
                  Vanaf €35 per/meter
                </div>
                <div className="text-text-medium">
                  Inclusief Confectie & Materialen
                </div>
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
              Stoffen & Kwaliteiten
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Verkrijgbaar in een ruime selectie van hoogwaardige stoffen met
              duurzame eigenschappen
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
                Natuurlijk en ademend materiaal voor een warme, huiselijke
                sfeer.
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
                Optimale balans tussen natuurlijke en synthetische
                eigenschappen.
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
                Speciale behandeling voor professionele en
                veiligheidstoepassingen.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Plooien Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Plooien (Enkel, Dubbel, Triple, Wave)
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
                <h3 className="font-display text-xl font-semibold mb-2">
                  Enkelvoudige plooi
                </h3>
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Standaard
                </span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Strak en minimalistisch. Klassieke, tijdloze uitstraling voor
                elke interieurstijl.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Dubbele plooi
                </h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Populair
                </span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Voor een rijkere en vollere uitstraling. Meer volume en
                elegantie.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Driedubbele plooi
                </h3>
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Luxe
                </span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Luxe afwerking met extra volume voor een indrukwekkende
                uitstraling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Wave plooi
                </h3>
                <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                  Modern
                </span>
              </div>
              <p className="text-text-medium text-center mb-4">
                Moderne, vloeiende lijnen met een eigentijdse look.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Voeringen Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Voeringen (Verduisterend, Akoestisch, Isolerend)
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Verbeter comfort en functionaliteit met professionele voeringen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-indigo-900">
                Verduisterend
              </h3>
              <p className="text-indigo-700 mb-4">
                Blokkeer tot 99% van het licht voor optimale rust en privacy.
              </p>
              <ul className="space-y-2 text-sm text-indigo-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Ideaal voor slaapkamers
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Verbetert slaapkwaliteit
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-emerald-900">
                Akoestisch
              </h3>
              <p className="text-emerald-700 mb-4">
                Vermindert geluid van buitenaf en verbetert de akoestiek binnen.
              </p>
              <ul className="space-y-2 text-sm text-emerald-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Rustiger woonklimaat
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Betere privacy
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-orange-900">
                Thermisch Isolerend
              </h3>
              <p className="text-orange-700 mb-4">
                Houdt warmte binnen in de winter en koelte binnen in de zomer.
              </p>
              <ul className="space-y-2 text-sm text-orange-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Lagere energiekosten
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Betere wooncomfort
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Montage Opties Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Montage Opties (Rails, Roedes)
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Kies het perfecte ophangssysteem voor uw overgordijnen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ruler className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-center">
                Gordijnrails
              </h3>
              <p className="text-text-medium mb-6 text-center">
                Modern en strak. Ideaal voor minimalistische interieurs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Geruisloze bediening</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Plafond- of wandmontage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Geschikt voor zware gordijnen</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Verschillende kleuren</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-center">
                Gordijnroedes
              </h3>
              <p className="text-text-medium mb-6 text-center">
                Klassiek en elegant. Perfect voor traditionele en moderne
                stijlen.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Decoratieve eindkappen</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Verschillende materialen</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Makkelijk te bedienen</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Sterke constructie</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bediening en Afwerking Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Bediening en Afwerking
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Comfortabele bediening en professionele afwerking voor langdurig
              gebruiksplezier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Magnet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Handmatige bediening
              </h3>
              <p className="text-text-medium">
                Eenvoudig en betrouwbaar systeem voor dagelijks gebruik.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Koordloos systeem</h3>
              <p className="text-text-medium">
                Veilig en kindvriendelijk zonder losse koorden.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Perfecte pasvorm</h3>
              <p className="text-text-medium">
                Op maat gemaakt voor elke raam- en deuropening.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Prijsindicaties Section */}
      <div className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Prijsindicaties
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Transparante prijzen voor overgordijnen van topkwaliteit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">
                  Basis
                </h3>
                <div className="text-3xl font-bold text-primary">€ 245 ,-</div>
                <div className="text-text-medium">per raam (350x260cm)</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Enkelvoudige plooi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Polyester</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Standaard kleuren</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Gratis inmeting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Excl. Gordijn rails</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                  Populair
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">
                  Premium
                </h3>
                <div className="text-3xl font-bold text-primary">€307 ,-</div>
                <div className="text-text-medium">per raam (350x260cm)</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Dubbele plooi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Polyster</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Diverse soorten</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Professionele montage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Excl. Gordijn rails</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">
                  Luxe
                </h3>
                <div className="text-3xl font-bold text-primary">€368</div>
                <div className="text-text-medium">per raam (350x260cm)</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Wave plooi en/of Triplooi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Polyester</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Premium kwaliteit </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Professionele montage service</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Excl. Gordijn rails</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-medium mb-4">
              * Prijzen zijn inclusief BTW en gebaseerd op standaardafmetingen
            </p>
            <Button size="lg" asChild>
              <Link href="/quote">Krijg een persoonlijke offerte</Link>
            </Button>
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
              Onze experts staan klaar om u te adviseren over de beste keuzes
              voor uw interieur. Van stofkeuze tot montage, wij zorgen voor een
              perfect resultaat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/quote">Vraag offerte aan</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8 py-6"
              >
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
