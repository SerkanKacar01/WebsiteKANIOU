import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@shared/schema";

const FeaturedProducts = () => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  
  // Fetch all products
  const { data: allProducts = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Select 6 random products when allProducts changes or on component mount
  useEffect(() => {
    if (allProducts.length > 0) {
      // Get a shuffled copy of the products array
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      // Take the first 6 products (or all products if there are fewer than 6)
      const selected = shuffled.slice(0, Math.min(6, shuffled.length));
      setRandomProducts(selected);
    }
  }, [allProducts]);

  return (
    <section id="featured-products" className="py-16 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Uitgelichte Producten
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Ontdek onze zorgvuldig geselecteerde collectie raambehandelingen die stijl en functionaliteit combineren.
          </p>
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
            Er is een fout opgetreden bij het laden van de producten.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {randomProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-accent">
                  Bekijk Alle Producten
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
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;