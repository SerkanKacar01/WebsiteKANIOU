import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@shared/schema";

const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Function to get Dutch category names by ID
  const getCategoryNameById = useMemo(() => {
    return (categoryId: number) => {
      const categoryMap: Record<number, string> = {
        1: 'Gordijnen',
        2: 'Jaloezieën',
        3: 'Rolluiken',
        4: 'Overgordijnen',
      };

      return categoryMap[categoryId] || '';
    };
  }, []);

  const { data: featuredProducts = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  // Get all unique categories from featured products for filtering
  const categoryIds = featuredProducts.map(product => product.categoryId);
  const categories = Array.from(new Set(categoryIds)) as number[];

  const filteredProducts = activeFilter === "all"
    ? featuredProducts
    : featuredProducts.filter(
        product => product.categoryId.toString() === activeFilter
      );

  return (
    <section 
      id="products" 
      className="py-16"
      aria-labelledby="product-showcase-heading"
    >
      <Container>
        <div className="text-center mb-12">
          <h2 
            id="product-showcase-heading"
            className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4"
          >
            Bladeren op Categorie
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Vind de perfecte raambehandeling door hieronder een productcategorie te selecteren.
          </p>
        </div>

        <div className="mb-8">
          <div 
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            role="tablist"
            aria-label="Filter products by category"
          >
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={
                activeFilter === "all"
                  ? "bg-primary text-white hover:bg-accent"
                  : "bg-neutral-200 text-text-dark hover:bg-secondary hover:text-white"
              }
              role="tab"
              aria-selected={activeFilter === "all"}
              aria-controls="product-grid"
              id="tab-all"
            >
              Bekijk Alles
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
                role="tab"
                aria-selected={activeFilter === categoryId.toString()}
                aria-controls="product-grid"
                id={`tab-category-${categoryId}`}
              >
                {getCategoryNameById(categoryId)}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="status"
            aria-live="polite"
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-neutral-200 rounded-lg animate-pulse"
                aria-hidden="true"
              ></div>
            ))}
            <div className="sr-only">Producten worden geladen</div>
          </div>
        ) : error ? (
          <div 
            className="text-center text-red-500"
            role="alert"
            aria-live="assertive"
          >
            Er is een fout opgetreden bij het laden van de producten.
          </div>
        ) : (
          <>
            <div 
              id="product-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="tabpanel"
              aria-labelledby={activeFilter === "all" ? "tab-all" : `tab-category-${activeFilter}`}
            >
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/browse-collection">
                <a className="inline-block">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-accent group focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <span>Bekijk Alle Categorieën</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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