import React, { useState } from "react";
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
import { HomeIcon, ChevronRight, Check, Smartphone, Settings } from "lucide-react";
import ProductCalculator from "@/components/calculators/ProductCalculator";
import { textiellamellenHeroImage } from "@/assets";
import rolgordijnImage1 from "@assets/IMG_9301.jpg";
import RolgordijnConfigurationModal, { RolgordijnConfiguration } from "@/components/rolgordijn/RolgordijnConfigurationModal";
import RolgordijnIntroModal from "@/components/rolgordijn/RolgordijnIntroModal";

const RolgordijnenPage = () => {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleConfigurationComplete = (configuration: RolgordijnConfiguration) => {
    console.log('Rolgordijn configuration:', configuration);
    // Here you would typically add to cart or save the configuration
  };

  const openIntroModal = () => {
    setShowIntroModal(true);
  };

  const startConfiguration = () => {
    setShowIntroModal(false);
    setShowConfigModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Rolgordijnen op Maat | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Elegante rolgordijnen op maat. Van verduisterend tot transparant, met verschillende montage- en bedieningsopties. Volledig maatwerk voor uw interieur."
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
                <BreadcrumbLink>Rolgordijnen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${textiellamellenHeroImage})`,
        }}
      >
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
              Rolgordijnen op Maat
            </h1>
            <p className="font-body text-white text-lg mb-8">
              Elegantie, eenvoud en functionaliteit in één raamoplossing. Onze
              rolgordijnen combineren tijdloze elegantie met praktische
              toepasbaarheid.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={openIntroModal}
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Stel je rolgordijn samen
              </Button>
              <Link href="/quote">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Vrijblijvende offerte aanvragen
                </Button>
              </Link>
              <a href="#measurement-guide">
                <Button
                  variant="outline"
                  className="bg-blue-500/90 text-white border-blue-400 hover:bg-blue-600/90"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  AR Meting starten
                </Button>
              </a>
              <a href="#calculator">
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white hover:bg-white/20"
                >
                  Bereken prijs
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-text-medium mb-8 animate-fade-in">
              Ze zijn ideaal voor elk interieur, van modern tot klassiek, en
              worden volledig op maat gemaakt volgens uw wensen en
              raamafmetingen.
            </p>
          </div>
        </Container>
      </div>

      {/* Stoffen en lichtdoorlatendheid */}
      <div className="py-20 bg-neutral-50 overflow-hidden">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-primary font-semibold mb-6 animate-fade-in">
                Stoffen en lichtdoorlatendheid
              </h2>
              <p className="text-xl text-text-medium max-w-3xl mx-auto animate-fade-in">
                We bieden een breed gamma stoffen aan, van verduisterende tot
                lichtdoorlatende en transparante varianten
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-6 h-6 bg-primary rounded opacity-80"></div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                  Verduisterende stof
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Ideaal voor slaapkamers of kinderkamers, volledig zonwerend
                  voor optimale rust
                </p>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-6 h-6 bg-primary/60 rounded opacity-80"></div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                  Lichtdoorlatende stof
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Zorgt voor privacy zonder het daglicht volledig te blokkeren
                </p>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-6 h-6 bg-primary/30 rounded opacity-80"></div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                  Transparante stof
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Een subtiele lichtfilter, perfect voor woonkamers of keukens
                </p>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-6 h-6 border-2 border-primary rounded opacity-80"></div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                  Screenstoffen
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Technisch geweven stoffen die zon weren maar uitzicht naar
                  buiten behouden
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Montageopties */}
      <div className="py-20 bg-white relative">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl text-primary font-semibold mb-8">
                  Montageopties
                </h2>
                <div className="space-y-8">
                  <div className="group p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                          In-de-dag montage
                        </h3>
                        <p className="text-text-medium leading-relaxed">
                          Geïnstalleerd in het raamkozijn voor een strakke,
                          minimalistische uitstraling
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="group p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                          Op-de-dag montage
                        </h3>
                        <p className="text-text-medium leading-relaxed">
                          Gemonteerd op de muur of tegen het plafond voor
                          volledige raamafdekking
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="group p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                          Professionele montage
                        </h3>
                        <p className="text-text-medium leading-relaxed">
                          Inclusief stevige metalen montage steunen met wit
                          afdekkapje (standaard)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img
                  src={rolgordijnImage1}
                  alt="Professionele rolgordijn montage"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Profiel- en cassetteopties */}
      <div className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-primary font-semibold mb-6">
                Profiel- en cassetteopties
              </h2>
              <p className="text-xl text-text-medium max-w-3xl mx-auto">
                Kies de afwerking die het beste past bij uw interieur en budget
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">
                    Standaard open systeem
                  </h3>
                </div>
                <p className="text-text-medium leading-relaxed text-center">
                  Zichtbaar buismechanisme voor een minimalistisch en
                  kosteneffectief design
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Standaard prijs
                  </span>
                </div>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">
                    Open profiel
                  </h3>
                </div>
                <p className="text-text-medium leading-relaxed text-center">
                  Elegante aluminium afwerking, standaard in wit
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    +15% meerprijs
                  </span>
                </div>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">
                    Gesloten cassette
                  </h3>
                </div>
                <p className="text-text-medium leading-relaxed text-center">
                  Volledig afgesloten bovenkant voor een strakke, stofvrije
                  uitstraling
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    +20% meerprijs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Onderlatvarianten */}
      <div className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
                <img
                  src={rolgordijnImage1}
                  alt="Rolgordijn onderlatvarianten detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-display text-4xl text-primary font-semibold mb-8">
                  Onderlatvarianten
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="group p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                          Standaard aluminium onderlat
                        </h3>
                        <p className="text-text-medium leading-relaxed">
                          Functioneel en neutraal design
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
                          Zonder meerprijs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="group p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                          Onderlat met één zijde bekleed
                        </h3>
                        <p className="text-text-medium leading-relaxed">
                          Visueel verfijnde uitstraling
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
                          +10% meerprijs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="group p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                          Onderlat met beide zijden bekleed
                        </h3>
                        <p className="text-text-medium leading-relaxed">
                          Volledig geïntegreerd in de stof
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mt-2">
                          +15% meerprijs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-neutral-50 to-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="font-display text-lg font-semibold mb-3 text-primary">
                    Beschikbare afwerkingen:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-sm border border-neutral-200">
                      Wit
                    </span>
                    <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm">
                      Zwart
                    </span>
                    <span className="px-3 py-1 bg-gray-300 rounded-full text-sm">
                      Aluminium
                    </span>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      Stofkleurig
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bediening en gebruiksgemak */}
      <div className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-primary font-semibold mb-6">
                Bediening en gebruiksgemak
              </h2>
              <p className="text-xl text-text-medium max-w-3xl mx-auto">
                Kies de bedieningsoptie die het beste bij uw levensstijl past
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    Standaard
                  </h3>
                </div>
                <p className="text-lg text-text-medium leading-relaxed">
                  Kunststof kettingbediening in wit, betrouwbaar en eenvoudig te
                  bedienen
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Inbegrepen
                  </span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">+</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    Upgrade opties
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">
                      Metalen kettingbediening
                    </span>
                    <span className="text-primary font-semibold">+€10</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">Veermechanisme</span>
                    <span className="text-primary font-semibold">
                      Op aanvraag
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                    <span className="font-medium">Elektrische bediening</span>
                    <span className="text-primary font-semibold">Offerte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Duurzaam en onderhoudsvriendelijk */}
      <div className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Duurzaam en onderhoudsvriendelijk
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto mb-12">
              Ontworpen voor jarenlang gebruiksplezier met minimaal onderhoud
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                  UV-bestendig
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Afwasbare stoffen die hun kleur behouden, zelfs bij intensieve
                  zonlichtblootstelling
                </p>
              </div>
              <div className="group p-8 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                  Slijtvast
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Hoogwaardige mechanismen getest voor langdurig dagelijks
                  gebruik
                </p>
              </div>
              <div className="group p-8 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                  Onderhoudsarm
                </h3>
                <p className="text-text-medium leading-relaxed">
                  Eenvoudig schoon te maken met een droge doek of licht vochtige
                  spons
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Toepassingen */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-primary/5">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Ideale toepassingen
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto mb-12">
              Rolgordijnen zijn veelzijdig en geschikt voor elke ruimte in huis
              of kantoor
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-lg">🏠</span>
                </div>
                <p className="font-medium text-primary">Woonkamers</p>
              </div>
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-lg">🛏️</span>
                </div>
                <p className="font-medium text-primary">Slaapkamers</p>
              </div>
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-lg">🍳</span>
                </div>
                <p className="font-medium text-primary">Keukens</p>
              </div>
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-lg">💼</span>
                </div>
                <p className="font-medium text-primary">Kantoren</p>
              </div>
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-lg">🛁</span>
                </div>
                <p className="font-medium text-primary">Badkamers*</p>
              </div>
            </div>
            <p className="text-sm text-text-medium mt-8 opacity-75">
              *met vochtbestendige stoffen voor optimale duurzaamheid
            </p>
          </div>
        </Container>
      </div>

      {/* Smart Measurement Guide Section */}
      <div
        id="measurement-guide"
        className="py-20 bg-gradient-to-br from-blue-50 to-primary/5"
      >
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Smart Meetgids met AR
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Gebruik de nieuwste augmented reality technologie om uw raam
              automatisch en nauwkeurig op te meten
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              AR Meetfunctie komt binnenkort!
            </h3>
            <p className="text-gray-600 mb-6">
              We werken aan een revolutionaire augmented reality meetfunctie.
              Binnenkort kunt u uw raam automatisch opmeten met uw smartphone
              camera.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Preview:</strong> Camera toegang → Automatische
                kalibratie → AR window detection → Nauwkeurige metingen
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Calculator Section */}
      <div id="calculator" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Prijscalculator
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Bereken direct de prijs voor uw rolgordijnen op maat
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ProductCalculator productId="rolgordijnen" />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-4">
              Klaar om uw ramen te verfraaien?
            </h2>
            <p className="font-body mb-8">
              Neem vandaag nog contact met ons op voor een persoonlijk
              adviesgesprek en een vrijblijvende offerte. Onze experts helpen u
              de perfecte rolgordijnen te vinden voor uw woning of bedrijf.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quote">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Offerte aanvragen
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Contact opnemen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Rolgordijn Intro Modal */}
      <RolgordijnIntroModal
        isOpen={showIntroModal}
        onClose={() => setShowIntroModal(false)}
        onStartConfiguration={startConfiguration}
      />

      {/* Rolgordijn Configuration Modal */}
      <RolgordijnConfigurationModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onComplete={handleConfigurationComplete}
      />
    </>
  );
};

export default RolgordijnenPage;
