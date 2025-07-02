import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import SinglePageConfigurator from "@/components/SinglePageConfigurator";
import { ArrowLeft } from "lucide-react";

const RolgordijnenConfiguratorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Rolgordijnen Configurator - Op Maat | KANIOU</title>
        <meta
          name="description"
          content="Stel uw rolgordijn op maat samen met onze uitgebreide configurator. Kies uit verschillende stoffen, profielen en bedieningsmogelijkheden."
        />
      </Helmet>

      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/producten/rolgordijnen">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar Rolgordijnen
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rolgordijn Configurator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stel uw rolgordijn volledig naar wens samen. Alle opties zijn direct zichtbaar 
              en de prijs wordt live bijgewerkt.
            </p>
          </div>
        </div>

        {/* Single Page Configurator */}
        <SinglePageConfigurator />
      </Container>
    </>
  );
};

export default RolgordijnenConfiguratorPage;