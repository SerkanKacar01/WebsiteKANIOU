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
              Rolgordijnen op Maat
            </h1>
            <p className="font-body text-white text-lg mb-8">
              Elegantie, eenvoud en functionaliteit in één raamoplossing. Onze rolgordijnen combineren tijdloze elegantie met praktische toepasbaarheid.
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

      {/* Introduction */}
      <div className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-text-medium mb-8">
              Ze zijn ideaal voor elk interieur, van modern tot klassiek, en worden volledig op maat gemaakt volgens uw wensen en raamafmetingen.
            </p>
          </div>
        </Container>
      </div>

      {/* Stoffen en lichtdoorlatendheid */}
      <div className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              🌿 Stoffen en lichtdoorlatendheid
            </h2>
            <p className="text-lg mb-6">
              We bieden een breed gamma stoffen aan, van verduisterende tot lichtdoorlatende en transparante varianten:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">Verduisterende stof</h3>
                <p className="text-text-medium">ideaal voor slaapkamers of kinderkamers, volledig zonwerend</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">Lichtdoorlatende stof</h3>
                <p className="text-text-medium">zorgt voor privacy zonder het daglicht volledig te blokkeren</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">Transparante stof</h3>
                <p className="text-text-medium">een subtiele lichtfilter, perfect voor woonkamers of keukens</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">Screenstoffen</h3>
                <p className="text-text-medium">technisch geweven stoffen die zon weren maar uitzicht naar buiten behouden</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Montageopties */}
      <div className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              ⚙️ Montageopties
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-2">In-de-dag montage (in het raamkozijn)</h3>
                  <p className="text-text-medium">strak en minimalistisch</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-2">Op-de-dag montage (op de muur of tegen het plafond)</h3>
                  <p className="text-text-medium">voor volledige raamafdekking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-2">Inclusief stevige metalen montage steunen</h3>
                  <p className="text-text-medium">met wit afdekkapje (standaard)</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Profiel- en cassetteopties */}
      <div className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              🧩 Profiel- en cassetteopties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">1. Standaard open systeem</h3>
                <p className="text-text-medium">zichtbaar buismechanisme, minimalistisch design</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">2. Open profiel</h3>
                <p className="text-text-medium">elegante aluminium afwerking (meerprijs: +15%), standaard in wit</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-display text-xl font-medium mb-3">3. Gesloten cassette</h3>
                <p className="text-text-medium">volledig afgesloten bovenkant (meerprijs: +20%), strak en stofvrij</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Onderlatvarianten */}
      <div className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              🪟 Onderlatvarianten
            </h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-2">Standaard aluminium onderlat</h3>
                  <p className="text-text-medium">(zonder meerprijs)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-2">Onderlat met één zijde bekleed</h3>
                  <p className="text-text-medium">(+10%)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-2">Onderlat met beide zijden bekleed</h3>
                  <p className="text-text-medium">(+15%)</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-display text-lg font-medium mb-3">Afwerkingen:</h3>
              <p className="text-text-medium">wit, zwart, aluminium of stofkleurig</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Bediening */}
      <div className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              ⚙️ Bediening en gebruiksgemak
            </h2>
            <div className="bg-white p-6 rounded-lg mb-6">
              <h3 className="font-display text-xl font-medium mb-4">Standaard:</h3>
              <p className="text-text-medium">Kunststof kettingbediening (wit)</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-display text-xl font-medium mb-4">Opties:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-text-medium">Metalen kettingbediening (+€10)</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-text-medium">Veermechanisme (op aanvraag)</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-text-medium">Elektrisch met afstandsbediening of app (offerte)</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Duurzaam en onderhoudsvriendelijk */}
      <div className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              🛠️ Duurzaam en onderhoudsvriendelijk
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <p className="text-text-medium">UV-bestendige en afwasbare stoffen</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <p className="text-text-medium">Slijtvaste mechanismen</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <p className="text-text-medium">Geschikt voor dagelijks gebruik</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Toepassingen */}
      <div className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-primary font-semibold mb-8">
              📦 Toepassingen
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-text-medium">Woonkamers</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-text-medium">Slaapkamers</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-text-medium">Keukens</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-text-medium">Kantoorruimtes</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-text-medium">Badkamers*</p>
              </div>
            </div>
            <p className="text-sm text-text-medium mt-4 text-center">*met vochtbestendige stof</p>
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