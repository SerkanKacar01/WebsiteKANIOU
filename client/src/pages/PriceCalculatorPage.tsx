import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { HomeIcon, ChevronRight, ArrowRight } from "lucide-react";
import { Category, Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const PriceCalculatorPage = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("all"); // Default to showing all products

  // Fetch all categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["/api/categories"],
  });

  // Fetch all products to calculate the minimum prices per category
  const { data: products = [], isLoading: productsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["/api/products"],
  });

  // Calculate the minimum price for each category
  const getMinPriceForCategory = (categoryId: number) => {
    const categoryProducts = products.filter(
      (product) => product.categoryId === categoryId,
    );

    if (categoryProducts.length === 0) return null;

    return Math.min(...categoryProducts.map((product) => product.price));
  };

  // Define all product categories
  const productCategories = [
    { id: "all", name: "All Products" },
    { id: "overgordijnen", name: "Overgordijnen" },
    { id: "vitrages", name: "Vitrages" },
    { id: "rolgordijnen", name: "Rolgordijnen" },
    { id: "vouwgordijnen", name: "Vouwgordijnen" },
    { id: "duo-rolgordijnen", name: "Duo rolgordijnen" },
    { id: "textiel-lamellen", name: "Textiel lamellen" },
    { id: "kunststof-lamellen", name: "Kunststof lamellen" },
    { id: "houten-jaloezieën", name: "Houten jaloezieën" },
    { id: "kunststof-jaloezieën", name: "Kunststof jaloezieën" },
    { id: "textiel-raamfolie", name: "Textiel raamfolie" },
    { id: "houten-shutters", name: "Houten shutters" },
    { id: "inzethorren", name: "Inzethorren" },
    { id: "opzethorren", name: "Opzethorren" },
    { id: "plissé-hordeuren", name: "Plissé hordeuren" },
    { id: "plissé", name: "Plissé" },
    { id: "duo-plissé", name: "Duo plissé" },
    { id: "dakraam-zonweringen", name: "Dakraam zonweringen (Fakro, Velux)" },
    { id: "gordijnrails", name: "Gordijnrails" },
    { id: "gordijnroedes", name: "Gordijnroedes" },
    { id: "squid-textiel-folie", name: "SQUID textiel folie" },
  ];

  // Define the calculators available
  const availableCalculators = [
    {
      name: "Overgordijnen",
      path: "/products/overgordijnen",
      category: "overgordijnen",
      description:
        "Creëer een warme en elegante sfeer met onze volledig op maat gemaakte overgordijnen. Verkrijgbaar in diverse stoffen, kleuren en plooitypes — afgestemd op uw interieur.",
      imageUrl:
        "https://images.unsplash.com/photo-1518012312832-96aea3c91144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      startingPrice: 40,
    },
    {
      name: "Rolgordijnen",
      path: "/products/rolgordijnen",
      category: "rolgordijnen",
      description:
        "Strakke en praktische oplossing voor lichtinval en privacy. Ideaal voor elke ruimte dankzij een breed scala aan stoffen en bedieningstypes.",
      imageUrl:
        "https://images.unsplash.com/photo-1592492152545-9695d3f473f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      startingPrice: 55,
    },
  ];

  // Loading states
  if (categoriesLoading || productsLoading) {
    return (
      <Container className="py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-medium">Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bekijk onze || Producten & Prijzen </title>
        <meta
          name="description"
          content="Calculate custom prices for our premium window treatments"
        />
        <meta
          property="og:title"
          content="Price Calculator | KANIOU zilvernaald"
        />
        <meta
          property="og:description"
          content="Calculate custom prices for our premium window treatments"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container className="py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="font-semibold">
                Bekijk onze Producten & Prijzen
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4">
            Onze collecties & prijzen
          </h1>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Selecteer hieronder een productcategorie om een prijsberekening op
            maat te ontvangen, afgestemd op uw specifieke afmetingen en
            voorkeuren.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          {/* Desktop & Tablet - Multi-row grid layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {productCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={cn(
                  activeFilter === category.id
                    ? "bg-primary text-white"
                    : "bg-white",
                  "transition-all duration-200 text-sm h-auto py-2",
                )}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Mobile - Horizontal scrollable with indicators */}
          <div className="sm:hidden relative">
            {/* Scroll hint - left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="bg-gradient-to-r from-white to-transparent w-8 h-10 flex items-center justify-start">
                <ChevronRight className="h-4 w-4 text-muted-foreground rotate-180 opacity-70" />
              </div>
            </div>
            
            {/* Mobile scrollable buttons */}
            <div className="overflow-x-auto">
              <div className="flex flex-nowrap gap-2 pb-2 pl-6 pr-6">
                {productCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeFilter === category.id ? "default" : "outline"}
                    className={cn(
                      "whitespace-nowrap flex-shrink-0",
                      activeFilter === category.id
                        ? "bg-primary text-white"
                        : "bg-white",
                      "transition-all duration-200 text-sm",
                    )}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Scroll hint - right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="bg-gradient-to-l from-white to-transparent w-8 h-10 flex items-center justify-end">
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-70" />
              </div>
            </div>
          </div>
        </div>

        {/* Available Calculators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* If filtered calculators exist, show them */}
          {availableCalculators
            .filter(
              (calculator) =>
                activeFilter === "all" || calculator.category === activeFilter,
            )
            .map((calculator, index) => (
              <Link key={index} href={calculator.path}>
                <div className="group h-full bg-white overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={calculator.imageUrl}
                      alt={calculator.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl text-primary font-medium mb-2 flex items-center">
                      {calculator.name}
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    <p className="font-body text-text-medium text-sm mb-4">
                      {calculator.description}
                    </p>

                    <p className="font-body text-lg font-semibold text-accent">
                      <span className="text-sm font-normal">vanaf </span>€
                      {calculator.startingPrice.toFixed(2)}
                      <span className="text-sm font-normal"> </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}

          {/* If no calculators match the filter and it's not "all", show placeholder */}
          {activeFilter !== "all" &&
            availableCalculators.filter(
              (calc) => calc.category === activeFilter,
            ).length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
                <div className="aspect-video w-full max-w-md bg-neutral-100 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-24 h-24 text-neutral-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-display text-xl text-primary font-medium mb-2 text-center">
                  {
                    productCategories.find((cat) => cat.id === activeFilter)
                      ?.name
                  }
                </h3>
                <p className="font-body text-text-medium text-center mb-4">
                  Meer details en prijsberekening binnenkort beschikbaar.
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  We werken aan deze berekening. Kom binnenkort terug voor meer
                  informatie.
                </p>
              </div>
            )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-neutral-50 p-6 rounded-lg">
          <h2 className="font-display text-xl text-primary font-medium mb-4">
            Over onze collecties & prijzen
          </h2>
          <p className="mb-4">
            <>
              Onze raamdecoratiecollecties zijn zorgvuldig samengesteld om zowel
              esthetiek als functionaliteit te combineren.
              <br />
              Elk product wordt volledig op maat gemaakt, met oog voor detail en
              afgestemd op uw persoonlijke voorkeuren en interieureisen.
              <br />
              <br />
              De vermelde prijzen in onze calculator zijn richtprijzen gebaseerd
              op de door u ingevoerde afmetingen en geselecteerde opties.
              <br />
              Ze geven een eerste indicatie van het kostenplaatje voor uw
              gewenste raamoplossing.
              <br />
              Houd er rekening mee dat deze prijzen inclusief maatwerk zijn,
              maar exclusief plaatsingskosten, tenzij anders vermeld.
              <br />
              <br />
              Voor een volledig transparant en accuraat prijsvoorstel raden wij
              aan een vrijblijvende consultatie aan te vragen.
              <br />
              Onze specialisten komen indien gewenst bij u langs om
              professioneel advies te geven, exacte maten op te nemen en u te
              begeleiden in uw keuze voor materiaal, afwerking en
              montagemethode.
              <br />
              Zo bent u verzekerd van een oplossing die perfect aansluit op uw
              wensen én uw ruimte.
            </>
          </p>
        </div>
      </Container>
    </>
  );
};

export default PriceCalculatorPage;
