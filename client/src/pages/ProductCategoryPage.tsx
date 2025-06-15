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
  { label: "Rolgordijnen", urlPath: "rolgordijnen" },
  { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen" },
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
  { label: "SQUID textiel folie", urlPath: "squid" },
];

const ProductCategoryPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();

  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and products
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["/api/categories"],
  });

  const { data: allProducts = [], isLoading: productsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    if (categories.length > 0 && allProducts.length > 0 && category) {
      setLoading(true);

      // Find matching category based on URL
      // Map specific URL segments to their corresponding categories
      const urlToCategoryMap: Record<string, string> = {
        overgordijnen: "Overgordijnen",
        vitrages: "Vitrages", 
        rolgordijnen: "Rolgordijnen",
        "duo-rolgordijnen": "Duo rolgordijnen",
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
        squid: "SQUID textiel folie",
      };

      // Get the matching category name or default to the first one
      const categoryName = urlToCategoryMap[category as string];

      // Find the category object
      const foundCategory = categories.find(
        (cat: Category) => cat.name === categoryName,
      );

      if (foundCategory) {
        setCategoryData(foundCategory);

        // Filter products by category
        const categoryProducts = allProducts.filter(
          (product: Product) => product.categoryId === foundCategory.id,
        );
        setProducts(categoryProducts);
        setLoading(false);
      } else {
        // Try direct search if mapping doesn't work
        console.log("Available categories:", categories.map(c => c.name));
        console.log("Looking for category:", categoryName);
        console.log("URL category:", category);
        
        // If no mapping found, redirect to home
        setLocation("/", { replace: true });
        setLoading(false);
      }
    } else if (!categoriesLoading && !productsLoading && categories.length === 0) {
      // If no categories loaded at all, redirect to home
      setLocation("/", { replace: true });
      setLoading(false);
    }
  }, [categories, allProducts, category, setLocation, categoriesLoading, productsLoading]);

  // Loading state
  if (loading || categoriesLoading || productsLoading || !categoryData) {
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
        {/* Use the product-specific label or fall back to category name */}
        <title>
          {productCategories.find(
            (pc: { label: string; urlPath: string }) => pc.urlPath === category,
          )?.label || categoryData.name}{" "}
          | Elegant Drapes
        </title>
        <meta
          name="description"
          content={`Discover our premium quality ${categoryData.name.toLowerCase()} collection. ${categoryData.description}. Request a free quote for your ${productCategories.find((pc: { label: string; urlPath: string }) => pc.urlPath === category)?.label.toLowerCase() || categoryData.name.toLowerCase()}.`}
        />
      </Helmet>

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
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {/* Use the label from productCategories or fallback to category data */}
                <BreadcrumbLink>
                  {productCategories.find(
                    (pc: { label: string; urlPath: string }) =>
                      pc.urlPath === category,
                  )?.label || categoryData.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Custom SQUID Page */}
      {category === "squid" ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                SQUID Raamfolie — Elegantie en Privacy met een Natuurlijke Look
              </h1>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  SQUID is een zelfklevende transparante textielfolie die daglicht doorlaat, maar nieuwsgierige blikken van buitenaf tegenhoudt. Het geeft ramen een warme, linnen uitstraling en garandeert overdag privacy. In tegenstelling tot klassieke raamfolie is SQUID ademend, elegant én makkelijk aan te brengen — zonder lijm of boren.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Waarom SQUID?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Stijlvolle linnenstructuur die past in elk interieur</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Privacy overdag, zicht naar buiten</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Zelfklevend: géén lijm, géén schade</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Hitte- en vochtbestendig — ideaal voor keuken, badkamer & dakramen</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Verwijderbaar en herbruikbaar</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Op maat verkrijgbaar</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Perfect voor:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Woonkamers & slaapkamers</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Badkamers & keukens</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Dakramen & lichtkoepels</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                        <span>Etalages & kantoorruimtes</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Beschikbaar in 5 tijdloze kleuren:</h3>
                  <div className="flex flex-wrap gap-4">
                    {['Chalk', 'Oak', 'Ash', 'Rock', 'Coal'].map((color) => (
                      <div key={color} className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-medium">
                        {color}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/producten?filter=squid">
                    <Button className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-8 py-4 text-lg font-semibold rounded-lg">
                      Bestel nu SQUID
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : category === "horren" ? (
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                Horren — Insectenwering & Frisse Lucht
              </h1>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
                  Hoogwaardige horren die insecten buiten houden en tegelijkertijd frisse lucht binnenlaten. Perfect geschikt voor elk type raam of deur.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Inzethorren</h3>
                    <p className="text-2xl font-bold text-[#d5c096] mb-4">vanaf €45</p>
                    <p className="text-gray-600">Eenvoudig te plaatsen zonder boren of schroeven</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Opzethorren</h3>
                    <p className="text-2xl font-bold text-[#d5c096] mb-4">vanaf €45</p>
                    <p className="text-gray-600">Stevige bevestiging op het raamkozijn</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Plissé Hordeur</h3>
                    <p className="text-2xl font-bold text-[#d5c096] mb-4">vanaf €165</p>
                    <p className="text-gray-600">Compacte plooibare oplossing voor deuren</p>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/producten?filter=horren">
                    <Button className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-8 py-4 text-lg font-semibold rounded-lg">
                      Bekijk alle horren
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        /* Default Hero Section for other categories */
        <div
          className="relative bg-cover bg-center py-24"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${categoryData.imageUrl})`,
          }}
        >
          <Container>
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
                {productCategories.find(
                  (pc: { label: string; urlPath: string }) =>
                    pc.urlPath === category,
                )?.label || categoryData.name}
              </h1>
              <p className="font-body text-white text-lg mb-8">
                {categoryData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Request a Quote
                  </Button>
                </Link>
                <a href="#products">
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white hover:bg-white/20"
                  >
                    View Products
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Features Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Premium Quality
              </h3>
              <p className="text-text-medium">
                Crafted with the finest materials to ensure durability and
                elegant appearance
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Custom Options
              </h3>
              <p className="text-text-medium">
                Available in multiple sizes, colors, and styles to perfectly
                match your interior
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">
                Professional Installation
              </h3>
              <p className="text-text-medium">
                Expert installation service available to ensure perfect fit and
                finish
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <div id="products" className="py-16 bg-neutral-50">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-6">
            {productCategories.find(
              (pc: { label: string; urlPath: string }) =>
                pc.urlPath === category,
            )?.label || categoryData.name}{" "}
            Collection
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto text-center mb-12">
            Explore our wide range of{" "}
            {(
              productCategories.find(
                (pc: { label: string; urlPath: string }) =>
                  pc.urlPath === category,
              )?.label || categoryData.name
            ).toLowerCase()}{" "}
            designed to enhance your living space with style and functionality.
          </p>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-medium">
                No products available in this category at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Link
                      href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                    {product.isNewArrival && (
                      <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
                        New Arrival
                      </div>
                    )}
                    {product.isBestSeller && (
                      <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Best Seller
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Link
                      href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <h3 className="font-display text-lg font-medium mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-text-medium text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-accent">
                        <span className="font-semibold text-lg">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-sm font-normal text-text-medium ml-1">
                          per window
                        </span>
                      </div>
                      <Link
                        href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <span className="text-primary text-sm font-medium hover:underline cursor-pointer">
                          View Details
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/quote">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Request a Quote
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Specifications Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Specifications
          </h2>

          <div className="bg-neutral-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  Materials
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Premium quality fabrics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Durable hardware components</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>UV resistant materials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Easy to clean and maintain</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  Available Options
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Multiple color choices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Custom dimensions available</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Various operating mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Different mounting options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="font-body mb-8">
              Contact us today for a personalized consultation and free quote.
              Our experts will help you find the perfect{" "}
              {(
                productCategories.find(
                  (pc: { label: string; urlPath: string }) =>
                    pc.urlPath === category,
                )?.label || categoryData.name
              ).toLowerCase()}{" "}
              solution for your home or business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quote">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Contact Us
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
