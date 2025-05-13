import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { t } = useLanguage();
  
  // Create the category name function with the translation function using useMemo
  const getCategoryNameById = useMemo(() => {
    return (categoryId: number) => {
      const categoryMap: Record<number, string> = {
        1: t('products.categories.curtains'),
        2: t('products.categories.blinds'),
        3: t('products.categories.shades'),
        4: t('products.categories.drapes'),
      };
      
      return categoryMap[categoryId] || t('products.categories');
    };
  }, [t]);
  
  const { data: featuredProducts, isLoading, error } = useQuery({
    queryKey: ["/api/products", { featured: true }],
  });

  // Get all unique categories from featured products for filtering
  const categories = featuredProducts 
    ? [...new Set(featuredProducts.map((product: Product) => product.categoryId))]
    : [];

  const filteredProducts = featuredProducts
    ? activeFilter === "all"
      ? featuredProducts
      : featuredProducts.filter(
          (product: Product) => product.categoryId.toString() === activeFilter
        )
    : [];

  return (
    <section id="products" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            {t('products.title')}
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={
                activeFilter === "all"
                  ? "bg-primary text-white hover:bg-accent"
                  : "bg-neutral-200 text-text-dark hover:bg-secondary hover:text-white"
              }
            >
              {t('products.viewAll')}
            </Button>
            
            {categories.map((categoryId) => (
              <Button
                key={categoryId}
                variant={activeFilter === categoryId.toString() ? "default" : "outline"}
                onClick={() => setActiveFilter(categoryId.toString())}
                className={
                  activeFilter === categoryId.toString()
                    ? "bg-primary text-white hover:bg-accent"
                    : "bg-neutral-200 text-text-dark hover:bg-secondary hover:text-white"
                }
              >
                {getCategoryNameById(categoryId)}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-neutral-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {t('common.error')}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products">
                <a>
                  <Button size="lg" className="bg-primary hover:bg-accent">
                    {t('products.viewAll')}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Button>
                </a>
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};



export default ProductShowcase;
