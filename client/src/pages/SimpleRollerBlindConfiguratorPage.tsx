import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import SimpleRollerBlindConfigurator from "@/components/configurators/SimpleRollerBlindConfigurator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SimpleRollerBlindConfiguratorPage = () => {
  const handlePriceChange = (price: number) => {
    console.log("Price updated:", price);
  };

  const handleConfigurationChange = (config: any) => {
    console.log("Configuration updated:", config);
  };

  return (
    <>
      <Helmet>
        <title>Rolgordijn Configurator - Eenvoudig & Snel | KANIOU</title>
        <meta
          name="description"
          content="Configureer uw rolgordijn met onze eenvoudige tool. Kies afmetingen en krijg direct de prijs. Breed assortiment met vaste prijzen."
        />
      </Helmet>

      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/producten/rolgordijnen">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar Rolgordijnen
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rolgordijn Configurator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Configureer uw rolgordijn eenvoudig met vaste afmetingen en krijg direct de prijs. 
              Geen handmatige invoer, alleen betrouwbare opties.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Configurator */}
          <div className="lg:col-span-2">
            <SimpleRollerBlindConfigurator
              onPriceChange={handlePriceChange}
              onConfigurationChange={handleConfigurationChange}
            />
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#d5c096]" />
                  Informatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Afmetingen</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Breedte: 40 cm - 300 cm (stappen van 10 cm)</li>
                    <li>• Standaard hoogte: 190 cm</li>
                    <li>• Andere hoogtes: 200 cm - 350 cm</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Voordelen</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Directe prijsberekening</li>
                    <li>• Vaste, betrouwbare afmetingen</li>
                    <li>• Geen meetfouten mogelijk</li>
                    <li>• Compatibel met standaard kozijnen</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Levering</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Standaard levering: 5-7 werkdagen</li>
                    <li>• Gratis verzending vanaf €75</li>
                    <li>• Inclusief montagemateriaal</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maatwerk nodig?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Heeft u specifieke afmetingen nodig die niet in deze configurator staan? 
                  Gebruik dan onze uitgebreide configurator of vraag een offerte aan.
                </p>
                <div className="space-y-2">
                  <Link href="/producten/rolgordijnen/configurator">
                    <Button variant="outline" className="w-full">
                      Uitgebreide Configurator
                    </Button>
                  </Link>
                  <Link href="/offerte">
                    <Button className="w-full bg-[#d5c096] hover:bg-[#c5b086] text-white">
                      Vraag Offerte Aan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hulp nodig?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Onze experts helpen u graag bij het maken van de juiste keuze.
                </p>
                <div className="space-y-2">
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = "tel:+32123456789"}
                  >
                    Bel ons: +32 12 34 56 789
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Information */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Technische specificaties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Configuratie opties</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Afmetingen:</strong> Vast assortiment voor optimale pasvorm</li>
                    <li><strong>Prijsmatrix:</strong> Transparante prijzen per afmeting combinatie</li>
                    <li><strong>Standaard hoogte:</strong> 190 cm (meest voorkomend)</li>
                    <li><strong>Maatwerk hoogtes:</strong> 200-350 cm voor speciale situaties</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Toekomstige uitbreidingen</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Cassette type:</strong> Open of dichte cassette (+15%)</li>
                    <li><strong>Stoftype:</strong> Verduisterend, lichtdoorlatend, screen</li>
                    <li><strong>Bediening:</strong> Ketting, motor met handzender/app</li>
                    <li><strong>Extra opties:</strong> Metalen ketting (+€12,50)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default SimpleRollerBlindConfiguratorPage;