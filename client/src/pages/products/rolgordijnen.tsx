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

const RolgordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>Rolgordijnen | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze collectie rolgordijnen. Eenvoudig te bedienen, praktisch en stijlvol. Verkrijgbaar in vele kleuren en transparanties."
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1565315868674-b9a710178a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
        }}
      >
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
              Rolgordijnen
            </h1>
            <p className="font-body text-white text-lg mb-8">
              Onze rolgordijnen bieden de perfecte balans tussen functionaliteit en stijl. Ideaal voor elke kamer en eenvoudig te bedienen.
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
                Gebruiksgemak
              </h3>
              <p className="text-text-medium">
                Eenvoudig te openen en te sluiten, ideaal voor dagelijks gebruik
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Lichtregulering
              </h3>
              <p className="text-text-medium">
                In diverse transparanties verkrijgbaar, van lichtdoorlatend tot volledig verduisterend
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Ruimtebesparend
              </h3>
              <p className="text-text-medium">
                Neemt minimale ruimte in beslag, ideaal voor kleinere kamers of bij beperkte vensterruimte
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
                Praktische en stijlvolle rolgordijnen
              </h2>
              <p className="mb-4">
                Rolgordijnen zijn een van de meest praktische en veelzijdige raambekleding opties. Ze zijn perfect voor mensen die een minimalistische look prefereren en bieden tegelijkertijd uitstekende functionaliteit.
              </p>
              <p className="mb-4">
                Onze rolgordijnen zijn verkrijgbaar in verschillende stoffen, van lichtdoorlatend tot volledig verduisterend. Ze kunnen worden bediend met een koord, ketting, of zelfs gemotoriseerd worden voor extra comfort.
              </p>
              <p>
                De compacte aard van rolgordijnen maakt ze ideaal voor kleinere ruimtes, of voor ramen waar andere gordijntypes niet praktisch zijn. Ze zijn ook eenvoudig schoon te maken en te onderhouden.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Moderne rolgordijnen in een woonkamer"
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
              Neem vandaag nog contact met ons op voor een persoonlijk adviesgesprek en een vrijblijvende offerte.
              Onze experts helpen u de perfecte rolgordijnen te vinden voor uw woning of bedrijf.
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

export default RolgordijnenPage;