import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight } from "lucide-react";
import { Category, Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const ProductsPage = () => {
  const { t, language } = useLanguage();

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
        <title>{t("Diverse Raamdecoraties")} | KANIOU</title>
        <meta name="description" content={t("Diverse Raamdecoraties")} />
        <meta
          property="og:title"
          content={`${t("Diverse Raamdecoraties")} | KANIOU`}
        />
        <meta
          property="og:description"
          content={t(
            "Ontdek ons volledige aanbod op maat gemaakte raamdecoratieproducten.",
          )}
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
                {t("Diverse raamdecoraties")}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4">
            {t("Diverse Raamdecoraties")}
          </h1>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            {t(
              "Ontdek ons volledige assortiment aan hoogwaardige, op maat gemaakte raamdecoratieproducten – perfect afgestemd op uw stijl, ruimte en functionaliteit. Of u nu op zoek bent naar verduisterende gordijnen, elegante jaloezieën of innovatieve zonwering, bij KANIOU vindt u de ideale oplossing voor elk interieur.",
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const minPrice = getMinPriceForCategory(category.id);
            const urlPath = category.name.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link key={category.id} href={`/products/${urlPath}`}>
                <div className="group h-full bg-white overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl text-primary font-medium mb-2">
                      {category.name}
                    </h2>
                    <p className="font-body text-text-medium text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {minPrice && (
                      <p className="font-body text-lg font-semibold text-accent">
                        <span className="text-sm font-normal">From </span>€
                        {minPrice.toFixed(2)}
                        <span className="text-sm font-normal"> per window</span>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default ProductsPage;
