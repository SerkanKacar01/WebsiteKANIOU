import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const ProductShowcase = () => {
  const { t } = useLanguage();

  const { data: featuredProducts = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });
    
  // Display at most 6 products
  const filteredProducts = featuredProducts.slice(0, 6);

  return (
    <section id="products" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            {t('title')}
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Product filters removed as requested */}

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
                    View All
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