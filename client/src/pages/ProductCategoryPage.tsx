import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, Check } from "lucide-react";
import { Product, Category } from "@shared/schema";

// Product categories with their display labels and URL paths
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },
  { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
  { label: "Houten shutters", urlPath: "houten-shutters" },
  { label: "Fly Screens", urlPath: "fly-screens" },
  { label: "Inzethorren", urlPath: "inzethorren" },
  { label: "Opzethorren", urlPath: "opzethorren" },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
  { label: "Plissé", urlPath: "plisse" },
  { label: "Duo plissé", urlPath: "duo-plisse" },
  { label: "Dakraam zonweringen (Fakro, Velux)", urlPath: "dakraam-zonwering" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
  { label: "Horren", urlPath: "horren" },
];

const ProductCategoryPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();

  // Check if the current category is valid
  const isValidCategory = productCategories.some(cat => cat.urlPath === category);

  // If category doesn't exist, redirect to shop
  useEffect(() => {
    if (!isValidCategory && category) {
      setLocation('/shop');
    }
  }, [category, isValidCategory, setLocation]);

  // Fetch categories and products
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // If no valid category, return null (will redirect)
  if (!isValidCategory || !category) {
    return null;
  }

  // Map specific URL segments to their corresponding categories
  const urlToCategoryMap: Record<string, string> = {
    overgordijnen: "Overgordijnen",
    vitrages: "Vitrages", 
    "textiel-lamellen": "Textiel lamellen",
    "kunststof-lamellen": "Kunststof lamellen",
    "houten-jaloezieen": "Houten jaloezieën",
    "kunststof-jaloezieen": "Kunststof jaloezieën",
    "textiel-raamfolie": "Textiel raamfolie",
    "houten-shutters": "Houten shutters",
    "fly-screens": "Fly Screens",
    inzethorren: "Inzethorren",
    opzethorren: "Opzethorren",
    "plisse-hordeuren": "Plissé hordeuren",
    plisse: "Plissé",
    "duo-plisse": "Duo plissé",
    "dakraam-zonwering": "Dakraam zonweringen (Fakro, Velux)",
    gordijnrails: "Gordijnrails",
    gordijnroedes: "Gordijnroedes",
    horren: "Horren",
  };

  // Get the matching category name or default to the first one
  const categoryName = urlToCategoryMap[category as string];

  // Find category data
  const foundCategory = categories.find(
    (cat: Category) => cat.name === categoryName,
  );

  // If category not found in database, create a default one
  const categoryData = foundCategory || {
    id: 0,
    name: categoryName || productCategories[0].label,
    description: `Ontdek onze uitgebreide collectie ${categoryName || productCategories[0].label}`,
    imageUrl: "/placeholder-category.jpg",
  };

  // Filter products for this category
  const categoryProducts = foundCategory
    ? products.filter(
        (product: Product) => product.categoryId === foundCategory.id,
      )
    : [];

  return (
    <>
      <Helmet>
        <title>{categoryData.name} - KANIOU</title>
        <meta
          name="description"
          content={`${categoryData.description} - Premium kwaliteit raamdecoratie van KANIOU`}
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
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
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/products/${category}`}>
                  {productCategories.find(
                    (cat) => cat.urlPath === category,
                  )?.label || categoryData.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Standard Category Hero Section */}
      <div
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${categoryData.imageUrl})`,
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {categoryData.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {categoryData.description}
            </p>
            <Button
              size="lg"
              className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
            >
              Bekijk Collectie
            </Button>
          </div>
        </Container>
      </div>

      {/* Products Grid Section */}
      <div className="py-16 bg-gray-50">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Onze {categoryData.name} Collectie
          </h2>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={product.imageUrl || "/placeholder-product.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-primary mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text-medium mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        €{product.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                      >
                        Bekijk Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Binnenkort beschikbaar
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                We werken hard aan het toevoegen van producten voor deze categorie.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                >
                  Neem Contact Op
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Waarom Kiezen voor KANIOU?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">
                Premium Kwaliteit
              </h3>
              <p className="text-text-medium">
                Alleen de beste materialen en vakmanschap voor duurzame raamdecoratie.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">
                Op Maat Gemaakt
              </h3>
              <p className="text-text-medium">
                Elke bestelling wordt perfect afgestemd op uw specifieke wensen en afmetingen.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">
                Professionele Service
              </h3>
              <p className="text-text-medium">
                Van advies tot installatie, wij begeleiden u door het hele proces.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Specifications Section */}
      <div className="py-16 bg-gray-50">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Specificaties
          </h2>

          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  Materialen
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Hoogwaardige stoffen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Duurzame hardware componenten</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>UV bestendige materialen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Gemakkelijk te reinigen</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  Beschikbare Opties
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Verschillende kleuren en patronen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Handmatige of elektrische bediening</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Op maat gemaakte afmetingen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Professionele installatieservice</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold mb-6">
              Klaar om uw interieur te transformeren?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Neem vandaag nog contact met ons op voor een vrijblijvende offerte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Vraag Offerte Aan
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Contact Opnemen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductCategoryPage;