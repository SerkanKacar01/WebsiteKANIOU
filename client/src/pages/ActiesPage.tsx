import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const ActiesPage = () => {
  const promotions = [
    {
      id: 1,
      title: "Premium Rolgordijnen Actie",
      description: "Ontdek ons complete assortiment rolgordijnen. Inclusief gratis inmeting en montage.",
      category: "Rolgordijnen",
      featured: true,
      image: "/assets/Rolgordijnen.jpeg"
    },
    {
      id: 2,
      title: "Gratis montage service",
      description: "Professionele montage door onze ervaren specialisten.",
      category: "Service",
      featured: false
    },
    {
      id: 3,
      title: "Combi-deal: Plissé + Horren",
      description: "Perfecte combinatie van plissé gordijn en bijpassend hor voor optimaal comfort.",
      category: "Combi-deal",
      featured: true
    },
    {
      id: 4,
      title: "Premium Raamdecoratie",
      description: "Plan je raamdecoratie en profiteer van onze premium kwaliteit op alle producten.",
      category: "Premium",
      featured: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Acties & Aanbiedingen | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Take advantage of our exclusive promotions on premium window coverings. Save on custom curtains, blinds, and insect screens."
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
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-4">
                Uitgelichte Acties
              </h2>
              <p className="text-text-light">
                Onze beste aanbiedingen van dit moment
              </p>
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
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-text-light mb-6">{promo.description}</p>
                  
                  <div className="flex justify-end">
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
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-text-light mb-4">{promo.description}</p>
                  
                  <div className="flex justify-end">
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
              Would you like to benefit from our promotions?
            </h2>
            <p className="text-lg text-text-light mb-8">
              Request a free quote today and discover which promotions apply to your situation.
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