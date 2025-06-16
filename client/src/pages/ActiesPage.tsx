import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Percent, Gift, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const ActiesPage = () => {
  const promotions = [
    {
      id: 1,
      title: "20% korting op alle rolgordijnen",
      description: "Profiteer van 20% korting op ons complete assortiment rolgordijnen. Inclusief gratis inmeting en montage.",
      discount: "20%",
      validUntil: "31 maart 2024",
      category: "Rolgordijnen",
      featured: true,
      originalPrice: "€299",
      newPrice: "€239",
      image: "/assets/Rolgordijnen.jpeg"
    },
    {
      id: 2,
      title: "Gratis montage bij aankoop vanaf €500",
      description: "Bij elke bestelling vanaf €500 krijg je gratis professionele montage ter waarde van €75.",
      discount: "Gratis montage",
      validUntil: "30 april 2024",
      category: "Service",
      featured: false,
      value: "€75 besparing"
    },
    {
      id: 3,
      title: "Combi-deal: Plissé + Horren",
      description: "Koop een plissé gordijn en krijg 50% korting op een bijpassend hor. Perfecte combinatie voor comfort.",
      discount: "50%",
      validUntil: "15 april 2024",
      category: "Combi-deal",
      featured: true,
      originalPrice: "€450",
      newPrice: "€337,50"
    },
    {
      id: 4,
      title: "Vroegboek korting 2024",
      description: "Plan je raamdecoratie voor 2024 en profiteer van 15% vroegboek korting op alle producten.",
      discount: "15%",
      validUntil: "31 december 2024",
      category: "Vroegboek",
      featured: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Acties & Aanbiedingen | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze actuele acties en aanbiedingen op premium raamdecoratie. Bespaar op gordijnen, jaloezieen, plissé en horren bij KANIOU zilvernaald."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
              <Gift className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Exclusieve aanbiedingen</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-6">
              Acties & Aanbiedingen
            </h1>
            <p className="font-body text-xl text-white/90 max-w-2xl mx-auto">
              Profiteer van onze exclusieve acties op premium raamdecoratie. 
              Bespaar op maatwerk gordijnen, jaloezieen en horren.
            </p>
          </div>
        </Container>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-white/5 to-transparent"></div>
      </div>

      {/* Featured Promotions */}
      <section className="py-16 bg-white">
        <Container>
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-primary mb-4">
                  Uitgelichte Acties
                </h2>
                <p className="text-text-light">
                  Onze beste aanbiedingen van dit moment
                </p>
              </div>
              <div className="hidden md:flex items-center text-sm text-text-light">
                <Clock className="h-4 w-4 mr-2" />
                Geldig tot einde actieperiode
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {promotions.filter(promo => promo.featured).map((promo) => (
              <Card key={promo.id} className="relative overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Topactie
                  </Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-3">{promo.category}</Badge>
                      <CardTitle className="text-xl font-bold text-primary mb-2">
                        {promo.title}
                      </CardTitle>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-secondary">{promo.discount}</div>
                      <div className="text-sm text-text-light">korting</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-text-light mb-6">{promo.description}</p>
                  
                  {promo.originalPrice && promo.newPrice && (
                    <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-text-light line-through">{promo.originalPrice}</div>
                          <div className="text-2xl font-bold text-secondary">{promo.newPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-text-light">Je bespaart</div>
                          <div className="text-lg font-semibold text-green-600">
                            €{(parseFloat(promo.originalPrice.replace('€', '')) - parseFloat(promo.newPrice.replace('€', ''))).toFixed(0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-text-light">
                      <Calendar className="h-4 w-4 mr-2" />
                      Geldig tot {promo.validUntil}
                    </div>
                    <Link href="/offerte">
                      <Button className="bg-secondary hover:bg-secondary/90">
                        Profiteer nu
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Promotions */}
          <div className="mb-8">
            <h3 className="font-display text-2xl font-bold text-primary mb-6">
              Alle Acties
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.filter(promo => !promo.featured).map((promo) => (
              <Card key={promo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">{promo.category}</Badge>
                      <CardTitle className="text-lg font-semibold text-primary">
                        {promo.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center">
                      <Percent className="h-5 w-5 text-secondary mr-1" />
                      <span className="text-lg font-bold text-secondary">{promo.discount}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-text-light mb-4">{promo.description}</p>
                  
                  {promo.value && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="text-sm font-medium text-green-800">{promo.value}</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-text-light">
                      <Calendar className="h-4 w-4 mr-2" />
                      Tot {promo.validUntil}
                    </div>
                    <Link href="/offerte">
                      <Button variant="outline" size="sm">
                        Meer info
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-primary mb-6">
              Wil je profiteren van onze acties?
            </h2>
            <p className="text-lg text-text-light mb-8">
              Vraag vandaag nog een vrijblijvende offerte aan en ontdek welke acties van toepassing zijn op jouw situatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                  Offerte aanvragen
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact opnemen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ActiesPage;