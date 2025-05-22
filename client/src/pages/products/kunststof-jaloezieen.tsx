import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Droplets, Thermometer, Wrench, Palette, Settings } from "lucide-react";

const KunststofJaloezieeenPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Kunststof Jaloezieën - Praktisch, Stijlvol en Vochtbestendig | KANIOU Zilvernaald</title>
        <meta name="description" content="Kunststof jaloezieën zijn een ideale keuze voor wie op zoek is naar een onderhoudsvriendelijke en vochtbestendige oplossing met een moderne uitstraling. Perfect voor keukens, badkamers of bedrijfsruimtes." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
                  Kunststof Jaloezieën
                </h1>
                <h2 className="text-xl md:text-2xl text-accent mb-6 font-medium">
                  Praktisch, Stijlvol en Vochtbestendig
                </h2>
                <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
                  Kunststof jaloezieën zijn een ideale keuze voor wie op zoek is naar een onderhoudsvriendelijke 
                  en vochtbestendige oplossing met een moderne uitstraling. Perfect voor keukens, badkamers of bedrijfsruimtes.
                </p>
              </div>

              {/* Benefits Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Voordelen</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-semibold text-text-dark">Duurzaam Materiaal</h3>
                      </div>
                      <p className="text-text-light">Gemaakt van duurzaam PVC of kunststof</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Droplets className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-semibold text-text-dark">Vochtbestendig</h3>
                      </div>
                      <p className="text-text-light">Bestand tegen vocht en temperatuurschommelingen</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Wrench className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-semibold text-text-dark">Onderhoudsvriendelijk</h3>
                      </div>
                      <p className="text-text-light">Eenvoudig schoon te maken</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Settings className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-semibold text-text-dark">Meerdere Maten</h3>
                      </div>
                      <p className="text-text-light">Beschikbaar in 25 mm, 35 mm en 50 mm lamelbreedte</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-semibold text-text-dark">Budgetvriendelijk</h3>
                      </div>
                      <p className="text-text-light">Budgetvriendelijk alternatief voor houten jaloezieën</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Palette className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-semibold text-text-dark">Diverse Stijlen</h3>
                      </div>
                      <p className="text-text-light">Leverbaar in effen kleuren en houtlook prints</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Materials & Colors Section */}
              <div className="mb-16">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold text-text-dark mb-6">Materialen & Kleuren</h2>
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-text-dark mb-3">Materiaal</h3>
                        <p className="text-text-light">Kunststof in mat of glanzende afwerking</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-text-dark mb-3">Kleuren</h3>
                        <p className="text-text-light">Wit, grijs, zwart, taupe, houtlook</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-text-dark mb-6">Bediening & Opties</h2>
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-text-dark mb-3">Bediening</h3>
                        <ul className="space-y-2 text-text-light">
                          <li>• Handmatige bediening via koord of ketting</li>
                          <li>• Elektrische uitvoering mogelijk (optioneel)</li>
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-text-dark mb-3">Opties</h3>
                        <p className="text-text-light">Ladderkoord (standaard) of ladderband (meerprijs)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation & Maintenance Section */}
              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h2 className="text-2xl font-bold text-text-dark mb-6">Montage</h2>
                  <ul className="space-y-3 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      In-de-dag of op-de-dag montage
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Inclusief bevestigingsmateriaal en handleiding
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h2 className="text-2xl font-bold text-text-dark mb-6">Onderhoud</h2>
                  <ul className="space-y-3 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Afneembaar met vochtige doek of mild schoonmaakmiddel
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ideaal voor vochtige omgevingen
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-secondary to-accent text-white p-8 rounded-lg mb-16">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Prijsindicatie</h2>
                  <p className="text-xl mb-2">Vanaf €49,95 per m²</p>
                  <p className="text-lg opacity-90">
                    Inclusief maatwerk en standaard montage. Prijs afhankelijk van breedte, kleur en bedieningsoptie.
                  </p>
                </div>
              </div>

              {/* Call to Action Section */}
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">Advies op maat</h2>
                  <p className="text-lg text-text-light max-w-2xl mx-auto">
                    Vraag vandaag nog een vrijblijvende offerte aan of plan een persoonlijk adviesgesprek 
                    bij u thuis of in onze showroom.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Link href="/quote">
                    <Button className="w-full bg-secondary hover:bg-accent text-white py-3 text-lg font-semibold transition-colors duration-300">
                      Vraag een offerte aan
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3 text-lg font-semibold transition-colors duration-300">
                      Plan een gratis adviesgesprek
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default KunststofJaloezieeenPage;