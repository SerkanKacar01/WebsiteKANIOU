import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, ArrowRight, Tag, CheckCircle, Filter, Eye, Shield, Baby } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const ActiesPage = () => {
  const [activeFilter, setActiveFilter] = useState("alle");

  const promotions = [
    {
      id: 1,
      title: "Premium Rolgordijnen Actie",
      description: "Ontdek ons complete assortiment rolgordijnen met 20% korting",
      category: "Rolgordijnen",
      productType: "rolgordijn",
      purpose: "privacy",
      featured: true,
      badge: "Topactie",
      discount: "20% korting"
    },
    {
      id: 2,
      title: "Combi-deal: Plissé + Horren",
      description: "Perfecte combinatie voor optimaal comfort en bescherming",
      category: "Combi-deal",
      productType: "plissé",
      purpose: "comfort",
      featured: true,
      badge: "Nieuw",
      discount: "Gratis hor"
    },
    {
      id: 3,
      title: "Vroegboekkorting Zomer 2025",
      description: "Boek nu voor het zomerseizoen en profiteer van extra voordeel",
      category: "Vroegboekkorting",
      productType: "horren",
      purpose: "comfort",
      featured: false,
      discount: "15% extra"
    },
    {
      id: 4,
      title: "Gratis Montage Service",
      description: "Professionele montage door onze ervaren specialisten",
      category: "Service",
      productType: "alle",
      purpose: "service",
      featured: false,
      badge: "Altijd"
    },
    {
      id: 5,
      title: "Kinderveilige Raamdecoratie Actie",
      description: "Speciale korting op kinderveilige oplossingen voor uw woning",
      category: "Premium",
      productType: "rolgordijn",
      purpose: "kinderveilig",
      featured: false,
      discount: "25% korting"
    },
    {
      id: 6,
      title: "Verduisterende Gordijnen Deal",
      description: "Complete verduistering voor perfecte nachtrust",
      category: "Premium",
      productType: "rolgordijn",
      purpose: "verduisterend",
      featured: false,
      discount: "30% korting"
    }
  ];

  const filterOptions = [
    { id: "alle", label: "Alle acties", icon: Gift },
    { id: "rolgordijn", label: "Rolgordijnen", icon: Eye },
    { id: "horren", label: "Horren", icon: Shield },
    { id: "plissé", label: "Plissé", icon: Filter },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "verduisterend", label: "Verduisterend", icon: Eye },
    { id: "kinderveilig", label: "Kinderveilig", icon: Baby }
  ];

  const filteredPromotions = activeFilter === "alle" 
    ? promotions 
    : promotions.filter(promo => 
        promo.productType === activeFilter || promo.purpose === activeFilter
      );

  const scrollToPromotions = () => {
    document.getElementById('promotions-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <Helmet>
        <title>Acties & Aanbiedingen | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Profiteer nu van exclusieve kortingen op premium raamdecoratie. Op = Op. Bekijk onze huidige acties en aanbiedingen."
        />
      </Helmet>

      {/* Full-width Hero Banner */}
      <div 
        className="relative min-h-[70vh] bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600 flex items-center overflow-hidden"
      >
        {/* Elegant background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-6xl text-white font-bold mb-6 leading-tight">
              Acties & Aanbiedingen
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Profiteer nu van exclusieve kortingen op premium raamdecoratie. Op = Op.
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-4 text-lg"
              onClick={scrollToPromotions}
            >
              Bekijk alle promoties
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </Container>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 py-4">
        <Container>
          <div className="flex flex-wrap gap-2 justify-center">
            {filterOptions.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`transition-all duration-200 ${
                    activeFilter === filter.id 
                      ? "bg-secondary hover:bg-secondary/90 text-white" 
                      : "hover:bg-secondary/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Highlight Section - Uitgelichte Acties */}
      <section id="promotions-section" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">
              Uitgelichte Acties
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Onze beste aanbiedingen van dit moment - exclusief voor een beperkte tijd
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {filteredPromotions.filter(promo => promo.featured).map((promo) => (
              <Card 
                key={promo.id} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0"
              >
                {/* Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <Badge className="bg-secondary text-white font-medium px-3 py-1">
                    <Tag className="h-3 w-3 mr-1" />
                    {promo.badge}
                  </Badge>
                </div>
                
                {/* Discount Badge */}
                {promo.discount && (
                  <div className="absolute top-6 right-6 z-10">
                    <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                      {promo.discount}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4 pt-16">
                  <Badge variant="outline" className="mb-3 w-fit">{promo.category}</Badge>
                  <CardTitle className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {promo.title}
                  </CardTitle>
                  <p className="text-text-light text-lg leading-relaxed">{promo.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex justify-end">
                    <Link href="/offerte">
                      <Button className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3">
                        Profiteer nu
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Deals Section - Alle Acties */}
          <div className="mb-12">
            <h3 className="font-display text-3xl font-bold text-primary mb-6">
              Alle Acties
            </h3>
            <p className="text-lg text-text-light">
              Ontdek alle beschikbare promoties en kortingen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPromotions.filter(promo => !promo.featured).map((promo) => (
              <Card 
                key={promo.id} 
                className="group hover:shadow-lg transition-all duration-200 rounded-2xl border border-neutral-200 hover:border-secondary/30"
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-3">{promo.category}</Badge>
                      <CardTitle className="text-xl font-semibold text-primary group-hover:text-secondary transition-colors">
                        {promo.title}
                      </CardTitle>
                    </div>
                    {promo.discount && (
                      <Badge className="bg-red-500 text-white font-medium">
                        {promo.discount}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-text-light mb-6 leading-relaxed">{promo.description}</p>
                  
                  <div className="flex justify-end">
                    <Link href="/offerte">
                      <Button variant="outline" size="sm" className="hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                        Actie bekijken
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-secondary" />
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                  Wil je profiteren van onze acties?
                </h2>
                <p className="text-xl text-text-light mb-10 max-w-2xl mx-auto leading-relaxed">
                  Vraag vrijblijvend een offerte aan en ontdek jouw persoonlijke voordeel.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/offerte">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-4 text-lg">
                      Vraag offerte aan
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline" className="font-medium px-8 py-4 text-lg hover:bg-secondary hover:text-white hover:border-secondary">
                      Bekijk productassortiment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ActiesPage;