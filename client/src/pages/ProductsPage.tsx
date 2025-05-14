import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilter from "@/components/products/ProductFilter";
import { ProductFilterOptions } from "@/lib/types";
import { Product, Category, GalleryItem } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import { getProductImageUrl, resetProductImageAssignments } from "@/lib/imageUtils";

const ProductsPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [filters, setFilters] = useState<ProductFilterOptions>({});
  const [pageTitle, setPageTitle] = useState(t("products.title"));
  
  // Fetch categories to match the URL category with category ID
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setSearchParams(urlParams);
      
      // Parse filters from URL query parameters
      const initialFilters: ProductFilterOptions = {};
      
      if (urlParams.has("category")) {
        const categoryId = parseInt(urlParams.get("category") || "");
        if (!isNaN(categoryId)) {
          initialFilters.categoryId = categoryId;
        }
      }
      
      if (urlParams.has("featured") && urlParams.get("featured") === "true") {
        initialFilters.isFeatured = true;
      }
      
      if (urlParams.has("bestseller") && urlParams.get("bestseller") === "true") {
        initialFilters.isBestSeller = true;
      }
      
      if (urlParams.has("newarrival") && urlParams.get("newarrival") === "true") {
        initialFilters.isNewArrival = true;
      }
      
      if (urlParams.has("search")) {
        initialFilters.searchQuery = urlParams.get("search") || "";
      }
      
      // Handle category from URL path (e.g., /products/overgordijnen)
      if (category && categories) {
        // Find matching category to get the ID
        const foundCategory = categories.find((cat: Category) => {
          const slugifiedName = cat.name.toLowerCase().replace(/\s+/g, '-');
          return slugifiedName === category || 
                 category === `${slugifiedName}s` || // Handle plural forms
                 category.replace(/-/g, '') === slugifiedName.replace(/\s+/g, ''); // Handle dashes
        });
        
        if (foundCategory) {
          initialFilters.categoryId = foundCategory.id;
          setPageTitle(foundCategory.name);
        }
      }
      
      setFilters(initialFilters);
    }
  }, [category, categories]);

  // Fetch all products and apply filters client-side
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Fetch gallery items to use for random image assignment
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });
  
  // Reset image assignments when component mounts
  useEffect(() => {
    resetProductImageAssignments();
  }, []);
  
  // Enhance products with random images when gallery items are available
  const productsWithRandomImages = products.map(product => {
    // Clone the product
    const enhancedProduct = { ...product };
    
    // Replace the imageUrl with a random one if needed
    if (!enhancedProduct.imageUrl || enhancedProduct.imageUrl.trim() === '') {
      enhancedProduct.imageUrl = getProductImageUrl(
        product.id, 
        product.imageUrl, 
        galleryItems
      );
    }
    
    return enhancedProduct;
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

  // Apply filters to products using our enhanced products with random images
  const filteredProducts = productsWithRandomImages.filter((product: Product) => {
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
  });

  // Determine if we're in a loading state
  const isLoading = productsLoading || galleryLoading;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Elegant Drapes</title>
        <meta
          name="description"
          content={`Browse our extensive collection of premium ${pageTitle.toLowerCase()}, window treatments, and other home decor products for any style and budget.`}
        />
      </Helmet>
      
      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              {pageTitle}
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              {t("products.subtitle")}
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
                {!isLoading && (
                  <button 
                    onClick={() => {
                      resetProductImageAssignments();
                      // Force re-render
                      setFilters({...filters});
                    }}
                    className="text-sm text-primary hover:text-accent underline"
                  >
                    Randomize Images
                  </button>
                )}
              </div>
              
              <ProductGrid 
                products={filteredProducts} 
                isLoading={isLoading} 
                error={productsError as Error}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;
