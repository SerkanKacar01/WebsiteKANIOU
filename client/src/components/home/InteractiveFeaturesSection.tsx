import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Link } from "wouter";
import { Palette, Wand2, ArrowRight, Sparkles, Camera, Settings } from "lucide-react";

const InteractiveFeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/30">
      <Container>
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-primary to-blue-600">
            <Sparkles className="h-4 w-4 mr-2" />
            Nieuw & Innovatief
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Ontdek Uw Perfecte Raambekleding
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto text-lg">
            Gebruik onze geavanceerde tools om de ideale kleuren en producten voor uw interieur te vinden. 
            Gratis, snel en op maat gemaakt voor uw wensen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Matcher Feature */}
          <Card className="relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 group hover:shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  AI-Powered
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                Interactieve Kleur Matcher
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Upload een foto van uw kamer en ontvang binnen seconden gepersonaliseerde 
                kleuradvies voor uw rolgordijnen, lamellen en gordijnen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Hoe het werkt:</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary font-semibold">1</div>
                    Upload een foto van uw kamer
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary font-semibold">2</div>
                    AI analyseert kleuren en stijl
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary font-semibold">3</div>
                    Ontvang gepersonaliseerde kleuradvies
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-primary">Functies:</span>
                  <Palette className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['Kleuranalyse', 'Productadvies', 'Stijlmatching'].map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs border-primary/20 text-primary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <Link href="/kleur-matcher">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-transform">
                  Kleur Matcher Proberen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Customization Wizard Feature */}
          <Card className="relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 group hover:shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Wand2 className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Interactief
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                Maatwerk Wizard
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Volg onze stap-voor-stap gids en ontdek welke raambekleding 
                perfect bij uw ruimte, stijl en budget past.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">6 Eenvoudige Stappen:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Ruimte kiezen
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Functie bepalen
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Stijl selecteren
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Budget aangeven
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Extra opties
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Resultaten
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-primary">U krijgt:</span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['Productadvies', 'Prijsindicatie', 'Offertelink'].map((benefit) => (
                    <Badge key={benefit} variant="outline" className="text-xs border-primary/20 text-primary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <Link href="/maatwerk-wizard">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-transform">
                  Wizard Starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">
              Nog niet zeker welke tool u nodig heeft?
            </h3>
            <p className="text-gray-600 mb-4">
              Geen probleem! Onze experts staan klaar om u persoonlijk te adviseren over de beste oplossing voor uw situatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button variant="outline" size="lg">
                  Gratis Adviesgesprek
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Direct Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default InteractiveFeaturesSection;