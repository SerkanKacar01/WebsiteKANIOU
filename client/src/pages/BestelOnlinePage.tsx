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
  Truck,
  Trophy,
  Phone,
  MessageCircle,
  Mail,
  Star,
  Award,
  Shield,
  Package,
  Ruler,
  Settings,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BestelOnlinePage = () => {
  // Why Order Online benefits
  const onlineAdvantages = [
    {
      icon: ShoppingCart,
      emoji: "🪡",
      title: "100% Maatwerk",
      description: "volledig op maat van jouw raam",
    },
    {
      icon: Truck,
      emoji: "🚛",
      title: "Thuisgeleverd",
      description: "veilig & professioneel verpakt",
    },
    {
      icon: Trophy,
      emoji: "🏆",
      title: "Showroomkwaliteit",
      description: "zonder in te boeten aan stijl",
    },
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      number: "1",
      title: "Kies je product",
      description: "rolgordijn, jaloezie, hor, …",
    },
    {
      number: "2",
      title: "Geef je afmetingen en voorkeuren door",
      description: "nauwkeurige maten voor perfect maatwerk",
    },
    {
      number: "3",
      title: "Kies opties",
      description: "zoals bediening, kleur en montage",
    },
    {
      number: "4",
      title: "Ontvang bevestiging",
      description: "wij starten met jouw maatwerk",
    },
  ];

  // Featured products for online ordering
  const featuredProducts = [
    {
      id: "rolgordijnen",
      name: "Rolgordijnen",
      href: "/rolgordijnen-configurator",
      icon: Package,
    },
    {
      id: "overgordijnen",
      name: "Overgordijnen",
      href: "/producten/overgordijnen",
      icon: Settings,
    },
    {
      id: "inzethorren",
      name: "Inzethorren",
      href: "/producten/inzethorren",
      icon: Shield,
    },
    {
      id: "gordijnrails",
      name: "Gordijnrails",
      href: "/gordijnrails-configurator",
      icon: Ruler,
    },
    {
      id: "jaloezieen",
      name: "Jaloezieën",
      href: "/producten/houten-jaloezieen",
      icon: Settings,
    },
  ];

  // Contact options
  const contactOptions = [
    {
      icon: Phone,
      emoji: "📞",
      title: "Bel ons",
      href: "tel:+3246785640",
    },
    {
      icon: MessageCircle,
      emoji: "💬",
      title: "WhatsApp",
      href: "https://wa.me/3246785640",
    },
    {
      icon: Mail,
      emoji: "📧",
      title: "Stuur een e-mail",
      href: "mailto:info@kaniou.be",
    },
  ];

  // Trust indicators
  const trustIndicators = [
    {
      icon: Star,
      emoji: "⭐⭐⭐⭐⭐",
      title: "Meer dan 3500 tevreden klanten",
    },
    {
      icon: Trophy,
      emoji: "🏆",
      title: "30 jaar ervaring in maatwerk gordijnen",
    },
    {
      icon: Shield,
      emoji: "🛡️",
      title: "100% vertrouwensgarantie",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bestel Online – Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald. Maatwerk, kwaliteit en comfort – nu ook eenvoudig vanop afstand."
        />
        <meta property="og:title" content="Bestel Online – Kaniou Zilvernaald" />
        <meta
          property="og:description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald. Maatwerk, kwaliteit en comfort – nu ook eenvoudig vanop afstand."
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
      <div className="relative bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#C8A85B] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <Container>
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="font-display text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
                Bestel exclusieve raamdecoratie online
              </h1>
              <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
                Maatwerk, kwaliteit en comfort – nu ook eenvoudig vanop afstand.
              </p>
              <Link href="#featured-products">
                <Button
                  size="lg"
                  aria-label="Bestel nu online bij Kaniou Zilvernaald"
                  className="bg-[#C8A85B] hover:bg-[#B8985B] text-white px-10 py-6 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
                >
                  Begin Nu
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Why Order Online Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-bold mb-6">
              Waarom kiezen voor online bestellen?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {onlineAdvantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#B8985B] p-6 rounded-full inline-flex mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-3xl" role="img" aria-label={advantage.title}>
                      {advantage.emoji}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-[#2C3E50] font-bold mb-3">
                    {advantage.title}
                  </h3>
                  <p className="font-body text-lg text-[#2C3E50]/70 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-[#f9f7f3] to-[#f1ede6]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-bold mb-6">
              Hoe werkt het?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#B8985B] w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-white text-2xl font-bold">
                      {step.number}
                    </span>
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-20 w-full h-0.5 bg-[#C8A85B]/30"></div>
                  )}
                </div>
                <h3 className="font-display text-lg text-[#2C3E50] font-bold mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-[#2C3E50]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Featured Products Section */}
      <div id="featured-products" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-bold mb-6">
              Wat je nu al online kunt bestellen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border hover:border-[#C8A85B]"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="bg-gradient-to-br from-[#C8A85B] to-[#B8985B] p-6 rounded-full inline-flex mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="font-display text-lg text-[#2C3E50] group-hover:text-[#C8A85B] transition-colors">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={product.href}>
                      <Button className="w-full bg-gradient-to-r from-[#C8A85B] to-[#B8985B] text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Bestel dit product
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Help & Contact Section */}
      <div className="py-20 bg-gradient-to-br from-[#C8A85B]/10 to-[#B8985B]/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-[#2C3E50] font-bold mb-4">
              Liever persoonlijk contact?
            </h2>
            <p className="font-body text-lg text-[#2C3E50]/80">
              Wij staan voor je klaar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <a
                  key={index}
                  href={option.href}
                  className="flex items-center justify-center gap-3 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border hover:border-[#C8A85B]"
                >
                  <span className="text-2xl" role="img" aria-label={option.title}>
                    {option.emoji}
                  </span>
                  <span className="font-display text-[#2C3E50] font-semibold group-hover:text-[#C8A85B] transition-colors">
                    {option.title}
                  </span>
                </a>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Trust Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="mb-4">
                    <span className="text-3xl block mb-2" role="img" aria-label={indicator.title}>
                      {indicator.emoji}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-[#2C3E50] font-bold leading-relaxed group-hover:text-[#C8A85B] transition-colors duration-300">
                    {indicator.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
};

export default BestelOnlinePage;