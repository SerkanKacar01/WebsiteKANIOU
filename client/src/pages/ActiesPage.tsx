import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, Clock, Gift, Star } from "lucide-react";

const ActiesPage = () => {
  const { t } = useLanguage();

  const currentOffers = [
    {
      id: 1,
      title: "Gratis Montage Service",
      description: "Bij bestelling van raamdecoratie boven €300",
      discount: "Gratis",
      validUntil: "31 December 2024",
      featured: true,
      icon: Gift
    },
    {
      id: 2,
      title: "20% Korting op Plissé Gordijnen",
      description: "Alle kleuren en maten beschikbaar",
      discount: "20%",
      validUntil: "15 December 2024",
      featured: false,
      icon: Percent
    },
    {
      id: 3,
      title: "Seizoenskorting Jaloezieën",
      description: "Houten en aluminium jaloezieën",
      discount: "15%",
      validUntil: "20 December 2024",
      featured: false,
      icon: Percent
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        <Container>
          <div className="py-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Actuele Acties & Kortingen
              </h1>
              <p className="text-lg text-text-medium max-w-2xl mx-auto">
                Profiteer van onze exclusieve aanbiedingen voor premium raamdecoratie. 
                Beperkte tijd beschikbaar!
              </p>
            </div>

            {/* Offers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentOffers.map((offer) => {
                const IconComponent = offer.icon;
                return (
                  <Card key={offer.id} className={`relative overflow-hidden ${offer.featured ? 'ring-2 ring-accent shadow-lg' : ''}`}>
                    {offer.featured && (
                      <Badge className="absolute top-4 right-4 bg-accent text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Populair
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{offer.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {offer.discount} Korting
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {offer.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-text-medium">
                          <Clock className="w-4 h-4" />
                          Geldig t/m {offer.validUntil}
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4 bg-[#D0B378] hover:bg-[#C5A565] text-white"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Profiteer Nu
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="bg-primary/5 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-text-dark mb-4">
                Mis geen enkele actie!
              </h2>
              <p className="text-text-medium mb-6 max-w-xl mx-auto">
                Schrijf je in voor onze nieuwsbrief en ontvang als eerste bericht over nieuwe acties, 
                exclusieve kortingen en seizoensaanbiedingen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#D0B378] hover:bg-[#C5A565] text-white"
                  onClick={() => window.location.href = '/contact'}
                >
                  Nieuwsbrief Aanmelden
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/offerte'}
                >
                  Gratis Offerte Aanvragen
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ActiesPage;