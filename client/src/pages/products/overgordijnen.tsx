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
import { HomeIcon, ChevronRight, Check, Palette, Ruler, Shield, Phone, Layers, Home } from "lucide-react";

const OvergordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>Overgordijnen op Maat | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Luxueuze overgordijnen op maat van KANIOU zilvernaald. Verduisterend, inbetween, velours en linnenlook stoffen. Professionele confectie vanaf €40 per lopende meter."
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
                Overgordijnen op maat
              </h1>
              <p className="text-xl text-text-medium mb-8 leading-relaxed">
                Onze overgordijnen zijn de perfecte keuze voor wie op zoek is naar warmte, luxe en een elegante uitstraling in huis. Ze worden volledig op maat gemaakt en afgestemd op uw interieurstijl en persoonlijke voorkeuren.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/quote">Vraag offerte aan</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Gratis advies</Link>
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
                <div className="text-2xl font-bold text-primary">Vanaf €40</div>
                <div className="text-text-medium">per lopende meter</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stoffen & Materialen Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Stoffen & materialen
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Wij bieden een uitgebreide selectie hoogwaardige stoffen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-blue-900">
                Verduisterende stoffen
              </h3>
              <p className="text-blue-700">
                Ideaal voor slaapkamers en ruimtes waar u lichtinval wilt blokkeren.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-green-900">
                Inbetween stoffen
              </h3>
              <p className="text-green-700">
                Voor een luchtige, elegante sfeer met gedeeltelijke lichtfiltering.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-purple-900">
                Velours stoffen
              </h3>
              <p className="text-purple-700">
                Luxueuze, zachte texturen met een rijke uitstraling.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4 text-amber-900">
                Linnenlook stoffen
              </h3>
              <p className="text-amber-700">
                Een natuurlijke, moderne uitstraling met structuur.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-neutral-50 p-8 rounded-xl">
            <p className="text-lg text-text-medium text-center">
              Alle stoffen zijn beschikbaar in diverse kleuren en patronen, met brandvertragende opties voor professionele toepassingen.
            </p>
          </div>
        </Container>
      </div>

      {/* Confectie Opties Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Confectie opties (plooitypes)
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              U kunt kiezen uit verschillende confectiemethoden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Enkelvoudige plooi</h3>
                <span className="text-sm text-green-600 font-medium">Standaard</span>
              </div>
              <p className="text-text-medium text-sm">
                Klassieke, tijdloze uitstraling voor elke interieurstijl.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Dubbele plooi</h3>
                <span className="text-sm text-primary font-medium">+10%</span>
              </div>
              <p className="text-text-medium text-sm">
                Meer volume en elegantie voor een luxueuze uitstraling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Driedubbele plooi</h3>
                <span className="text-sm text-primary font-medium">+15%</span>
              </div>
              <p className="text-text-medium text-sm">
                Maximum volume en luxe voor een indrukwekkende uitstraling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Wave plooi</h3>
                <span className="text-sm text-primary font-medium">+20%</span>
              </div>
              <p className="text-text-medium text-sm">
                Moderne golvende plooien voor een eigentijdse look.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-text-medium">
              Elke plooi beïnvloedt het valgedrag en de luxe uitstraling van de overgordijnstof.
            </p>
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

      {/* Ophangsysteem Section */}
      <div className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Ophangsysteem
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Onze overgordijnen zijn compatibel met verschillende ophangsystemen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-display text-2xl font-semibold mb-6 text-primary">
                Railsysteem
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Inclusief runners</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Wand-/plafondmontage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Soepele bediening</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-display text-2xl font-semibold mb-6 text-primary">
                Gordijnroedes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Met ringen</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Ingestikte plooien</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Klassieke uitstraling</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-text-medium bg-white p-6 rounded-lg shadow-sm">
              Montage steunen zijn standaard inbegrepen. Onze adviseurs begeleiden u in de keuze voor het juiste systeem.
            </p>
          </div>
        </Container>
      </div>

      {/* Maatvoering Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Ruler className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Maatvoering
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Wij leveren overgordijnen op maat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">40 cm</div>
              <div className="text-blue-700 font-medium">Minimale breedte</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-900 mb-2">600 cm</div>
              <div className="text-green-700 font-medium">Maximale breedte</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-900 mb-2">320 cm</div>
              <div className="text-purple-700 font-medium">Maximale hoogte</div>
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

      {/* Prijsindicatie Section */}
      <div className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold mb-8">
              Prijsindicatie
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl max-w-2xl mx-auto">
              <div className="text-6xl font-bold mb-4">
                Vanaf €40
              </div>
              <div className="text-2xl mb-6 opacity-90">
                per lopende meter inclusief confectie
              </div>
              <p className="text-lg opacity-80 mb-8">
                Exacte prijs afhankelijk van gekozen stof, confectie en voering.
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
              Gebruik onze offertepagina voor een vrijblijvende berekening.
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