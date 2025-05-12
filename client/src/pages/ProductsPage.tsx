import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilter from "@/components/products/ProductFilter";
import { ProductFilterOptions } from "@/lib/types";
import { Product } from "@shared/schema";

const ProductsPage = () => {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [filters, setFilters] = useState<ProductFilterOptions>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
      
      // Parse filters from URL
      const initialFilters: ProductFilterOptions = {};
      
      if (params.has("category")) {
        const categoryId = parseInt(params.get("category") || "");
        if (!isNaN(categoryId)) {
          initialFilters.categoryId = categoryId;
        }
      }
      
      if (params.has("featured") && params.get("featured") === "true") {
        initialFilters.isFeatured = true;
      }
      
      if (params.has("bestseller") && params.get("bestseller") === "true") {
        initialFilters.isBestSeller = true;
      }
      
      if (params.has("newarrival") && params.get("newarrival") === "true") {
        initialFilters.isNewArrival = true;
      }
      
      if (params.has("search")) {
        initialFilters.searchQuery = params.get("search") || "";
      }
      
      setFilters(initialFilters);
    }
  }, []);

  // Fetch all products and apply filters client-side
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["/api/products"],
  });

  const handleFilterChange = (newFilters: ProductFilterOptions) => {
    setFilters(newFilters);
    
    // Update URL with filters
    const params = new URLSearchParams();
    
    if (newFilters.categoryId) {
      params.set("category", newFilters.categoryId.toString());
    }
    
    if (newFilters.isFeatured) {
      params.set("featured", "true");
    }
    
    if (newFilters.isBestSeller) {
      params.set("bestseller", "true");
    }
    
    if (newFilters.isNewArrival) {
      params.set("newarrival", "true");
    }
    
    if (newFilters.searchQuery) {
      params.set("search", newFilters.searchQuery);
    }
    
    setLocation(`/products?${params.toString()}`, { replace: true });
  };

  // Apply filters to products
  const filteredProducts = products
    ? products.filter((product: Product) => {
        // Category filter
        if (filters.categoryId && product.categoryId !== filters.categoryId) {
          return false;
        }
        
        // Special filters
        if (filters.isFeatured && !product.isFeatured) {
          return false;
        }
        
        if (filters.isBestSeller && !product.isBestSeller) {
          return false;
        }
        
        if (filters.isNewArrival && !product.isNewArrival) {
          return false;
        }
        
        // Price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          if (product.price < min || product.price > max) {
            return false;
          }
        }
        
        // Search query
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            (product.material && product.material.toLowerCase().includes(query))
          );
        }
        
        return true;
      })
    : [];

  return (
    <>
      <Helmet>
        <title>Products | Elegant Drapes</title>
        <meta
          name="description"
          content="Browse our extensive collection of premium curtains, blinds, drapes, and window treatments for any style and budget."
        />
      </Helmet>
      
      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Our Premium Products
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Discover our extensive range of high-quality window treatments designed to
              enhance your interior space with elegance and functionality.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <ProductFilter 
                onFilterChange={handleFilterChange} 
                initialFilters={filters}
              />
            </div>
            
            <div className="w-full lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-text-medium">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              
              <ProductGrid 
                products={filteredProducts} 
                isLoading={isLoading} 
                error={error as Error}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;
