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
import { HomeIcon, ChevronRight, Check } from "lucide-react";
import ProductCalculator from "@/components/calculators/ProductCalculator";

const OvergordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>Overgordijnen | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze premium overgordijnen collectie. Verkrijgbaar in verschillende stoffen, kleuren en maten. Vraag een vrijblijvende offerte aan."
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
      <div
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
        }}
      >
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
              Overgordijnen
            </h1>
            <p className="font-body text-white text-lg mb-8">
              Onze overgordijnen combineren functionaliteit met stijl en zijn verkrijgbaar in talloze designs, stoffen en kleuren. Perfect om uw interieur compleet te maken.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Vrijblijvende offerte aanvragen
                </Button>
              </Link>
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

      {/* Features Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Kenmerken
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Premium Kwaliteit
              </h3>
              <p className="text-text-medium">
                Vervaardigd van de beste materialen voor duurzaamheid en uitstraling
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Maatwerk Opties
              </h3>
              <p className="text-text-medium">
                Verkrijgbaar in verschillende maten, kleuren en stijlen om perfect aan te sluiten bij uw interieur
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Professionele Installatie
              </h3>
              <p className="text-text-medium">
                Deskundige installatie beschikbaar om een perfecte pasvorm en afwerking te garanderen
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Product Description */}
      <div className="py-16 bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl text-primary font-semibold mb-6">
                Stijlvolle overgordijnen voor elk interieur
              </h2>
              <p className="mb-4">
                Overgordijnen zijn niet alleen functioneel voor het reguleren van licht en privacy, maar vormen ook een belangrijk stijlelement in uw interieur. Met de juiste keuze in stof, kleur en plooien kunt u de sfeer in een ruimte aanzienlijk beïnvloeden.
              </p>
              <p className="mb-4">
                Onze collectie biedt een breed scala aan mogelijkheden, van luxe velours en jacquards tot lichtere stoffen die een zachte lichtval creëren. Ook kunt u kiezen uit verschillende plooitypen zoals wave, potlood of vouwgordijnen.
              </p>
              <p>
                Voor een optimale isolatie kunt u kiezen voor een thermische voering, terwijl verduisterende voeringen ideaal zijn voor slaapkamers. Laat u adviseren over de beste opties voor uw specifieke situatie.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Elegante overgordijnen in woonkamer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Calculator Section */}
      <div id="calculator" className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ProductCalculator productId="overgordijnen" />
          </div>
        </Container>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-4">
              Klaar om uw ruimte te transformeren?
            </h2>
            <p className="font-body mb-8">
              Neem vandaag nog contact met ons op voor een persoonlijk adviesgesprek en een vrijblijvende offerte.
              Onze experts helpen u de perfecte overgordijnen te vinden voor uw woning of bedrijf.
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
    </>
  );
};

export default OvergordijnenPage;