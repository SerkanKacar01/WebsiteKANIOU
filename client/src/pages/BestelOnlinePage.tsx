import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HomeIcon,
  ChevronRight,
  ShoppingCart,
  Sparkles,
  Settings,
  Package,
  Ruler,
  FileText,
  Wrench,
  CheckCircle,
  ArrowRight,
  Star,
  Crown,
  Palette,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BestelOnlinePage = () => {
  const productCategories = [
    {
      id: "rolgordijnen",
      name: "Rolgordijnen",
      description: "Stijlvolle rolgordijnen op maat",
      href: "/producten/rolgordijnen",
      configuratorHref: "/rolgordijnen-configurator",
      icon: Package,
      featured: true,
      features: ["Maatwerk", "100+ stoffen", "Professionele montage"],
    },
    {
      id: "plisse",
      name: "Plissé gordijnen", 
      description: "Elegante plissé gordijnen",
      href: "/producten/plisse",
      icon: Settings,
      features: ["Isolerend", "Lichtfiltering", "Geruisloos"],
    },
    {
      id: "jaloezieen",
      name: "Jaloezieeën",
      description: "Houten & aluminium jaloezieeën",
      href: "/producten/houten-jaloezieen",
      icon: Ruler,
      features: ["Verschillende materialen", "Uitstekende kwaliteit", "Duurzaam"],
    },
    {
      id: "lamellen",
      name: "Verticale lamellen",
      description: "Praktische verticale lamellen",
      href: "/producten/textiel-lamellen",
      icon: FileText,
      features: ["Kantoor & thuis", "Eenvoudig onderhoud", "Breed assortiment"],
    },
    {
      id: "shutters",
      name: "Houten shutters",
      description: "Luxe houten shutters op maat",
      href: "/producten/houten-shutters",
      icon: Crown,
      features: ["Premium hout", "Handgemaakt", "Tijdloos design"],
    },
    {
      id: "gordijnrails",
      name: "Gordijnrails",
      description: "Professionele gordijnrails systemen",
      href: "/producten/gordijnrails",
      configuratorHref: "/gordijnrails-configurator",
      icon: Wrench,
      features: ["Verschillende systemen", "Op maat gemaakt", "Professionele montage"],
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Kwaliteitsgarantie",
      description: "5 jaar garantie op alle producten en montage",
    },
    {
      icon: Ruler,
      title: "Professioneel maatwerk",
      description: "Nauwkeurige opmeting en perfecte pasvorm",
    },
    {
      icon: Star,
      title: "Vakkundige montage",
      description: "Ervaren monteurs voor een perfecte afwerking",
    },
    {
      icon: Palette,
      title: "Uitgebreid assortiment",
      description: "Duizenden stoffen, kleuren en modellen",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bestel Online – Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald. Maatwerk, luxe en vakmanschap – nu ook online verkrijgbaar."
        />
        <meta property="og:title" content="Bestel Online – Kaniou Zilvernaald" />
        <meta
          property="og:description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald. Maatwerk, luxe en vakmanschap – nu ook online verkrijgbaar."
        />
        <meta property="og:type" content="website" />
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
                <BreadcrumbLink>Bestel Online</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#f9f7f3] to-[#f1ede6] py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative inline-flex items-center gap-2 mb-6">
              <ShoppingCart className="w-8 h-8 text-[#E67E22]" />
              <h1 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-semibold">
                Bestel Online
              </h1>
              <Sparkles className="w-6 h-6 text-[#D5B992]" />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-[#E67E22] to-[#D5B992] mx-auto mb-8 rounded-full"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed mb-8">
              Ontdek onze exclusieve collectie raamdecoratie en bestel eenvoudig online. 
              Van maatwerk rolgordijnen tot luxe shutters – alles met de kwaliteit en service waar KANIOU voor staat.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-[#E67E22]/10 text-[#E67E22] px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Premium kwaliteit
              </Badge>
              <Badge variant="secondary" className="bg-[#D5B992]/10 text-[#2C3E50] px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                5 jaar garantie
              </Badge>
              <Badge variant="secondary" className="bg-[#E67E22]/10 text-[#E67E22] px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Vakkundige montage
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      {/* Product Categories Grid */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-semibold mb-6">
              Onze Productcategorieën
            </h2>
            <p className="font-body text-lg text-[#2C3E50]/80 max-w-3xl mx-auto leading-relaxed">
              Kies uit ons uitgebreide assortiment van hoogwaardige raamdecoratie. 
              Elk product wordt op maat gemaakt en professioneel geïnstalleerd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#D5B992] ${
                    category.featured
                      ? "bg-gradient-to-br from-[#f9f7f3] to-white border-[#E67E22]/20 shadow-lg"
                      : "hover:bg-[#f9f7f3]/30"
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative mb-4">
                      <div className="bg-gradient-to-br from-[#E67E22] to-[#D5B992] p-4 rounded-full inline-flex mx-auto">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      {category.featured && (
                        <Badge className="absolute -top-2 -right-2 bg-[#E67E22] text-white text-xs px-2 py-1">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Populair
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="font-display text-xl text-[#2C3E50] group-hover:text-[#E67E22] transition-colors">
                      {category.name}
                    </CardTitle>
                    <p className="font-body text-[#2C3E50]/70 text-sm">
                      {category.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-6">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#D5B992]" />
                          <span className="font-body text-sm text-[#2C3E50]/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Link href={category.href}>
                        <Button
                          variant="outline"
                          className="w-full border-[#D5B992] text-[#2C3E50] hover:bg-[#D5B992] hover:text-white group transition-all duration-300"
                        >
                          Meer informatie
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>

                      {category.configuratorHref && (
                        <Link href={category.configuratorHref}>
                          <Button className="w-full bg-gradient-to-r from-[#E67E22] to-[#D5B992] text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                            <Settings className="w-4 h-4 mr-2" />
                            Online configureren
                          </Button>
                        </Link>
                      )}

                      {!category.configuratorHref && (
                        <Link href="/offerte">
                          <Button className="w-full bg-gradient-to-r from-[#E67E22] to-[#D5B992] text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                            <FileText className="w-4 h-4 mr-2" />
                            Offerte aanvragen
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Why Choose KANIOU Section */}
      <div className="py-20 bg-gradient-to-br from-[#f9f7f3] to-[#f1ede6]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-semibold mb-6">
              Waarom kiezen voor KANIOU?
            </h2>
            <p className="font-body text-lg text-[#2C3E50]/80 max-w-3xl mx-auto leading-relaxed">
              Met meer dan 25 jaar ervaring leveren wij raamdecoratie van de hoogste kwaliteit. 
              Ontdek waarom klanten voor KANIOU kiezen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-br from-[#E67E22] to-[#D5B992] p-4 rounded-full inline-flex mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg text-[#2C3E50] font-semibold mb-3">
                    {advantage.title}
                  </h3>
                  <p className="font-body text-[#2C3E50]/70 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-2xl p-12 text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <Star className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                  Hulp nodig bij uw keuze?
                </h2>
                <p className="font-body text-lg leading-relaxed mb-8 opacity-90">
                  Onze specialisten helpen u graag bij het maken van de perfecte keuze voor uw raamdecoratie. 
                  Vraag een vrijblijvende offerte aan of neem contact met ons op voor persoonlijk advies.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/offerte">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#E67E22] to-[#D5B992] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Vrijblijvende offerte
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#2C3E50] px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                    >
                      Neem contact op
                      <ArrowRight className="w-5 h-5 ml-2" />
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

export default BestelOnlinePage;