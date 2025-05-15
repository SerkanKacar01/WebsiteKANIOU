import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Category, GalleryItem, Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import CategoryGrid from "@/components/categories/CategoryGrid";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { useState, useEffect } from "react";
import { ProductFilterOptions } from "@/lib/types";
import { getProductImageUrl } from "@/lib/imageUtils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight } from "lucide-react";

// Official list of 20 product categories from the requirements
const officialCategories = [
  "Overgordijnen",
  "Vitrages",
  "Rolgordijnen",
  "Duo rolgordijnen",
  "Textiel lamellen",
  "Kunststof lamellen",
  "Houten jaloezieën",
  "Kunststof jaloezieën",
  "Textiel raamfolie",
  "Houten shutters",
  "Inzethorren",
  "Opzethorren",
  "Plissé hordeuren",
  "Plissé",
  "Duo plissé",
  "Duo plissé dakramen",
  "Dakraam zonwering",
  "Gordijnrails",
  "Gordijnroedes",
  "SQUID"
];

const ProductsPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();
  const [location] = useLocation();
  const [filters, setFilters] = useState<ProductFilterOptions>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Determine if we're on the main products page or a category page
  const isMainProductsPage = location === "/products";
  
  // Fetch all categories for the browse collection page
  const { 
    data: categoriesFromDb = [], 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch gallery items to use as fallback for categories without images
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });
  
  // Fetch all products
  const { 
    data: allProducts = [], 
    isLoading: productsLoading, 
    error: productsError 
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Create a mapping from Dutch category names to their details
  const categoryDetailsMap = categoriesFromDb.reduce((acc, category) => {
    acc[category.name] = category;
    return acc;
  }, {} as Record<string, Category>);
  
  // Create categories array based on the official list
  const categories = officialCategories.map((categoryName: string, index: number) => {
    // Look for an existing category with this name
    const existingCategory = categoriesFromDb.find(
      c => c.name === categoryName || 
           categoryName === categoryDetailsMap[c.name]?.name
    );
    
    if (existingCategory) {
      return existingCategory;
    }
    
    // If not found, create a placeholder with gallery image
    const randomIndex = index % galleryItems.length;
    const galleryItem = galleryItems[randomIndex] || galleryItems[0];
    
    return {
      id: 1000 + index, // Use high IDs to avoid conflicts
      name: categoryName,
      description: `Ontdek onze collectie ${categoryName.toLowerCase()} voor elk interieur en budget.`,
      imageUrl: galleryItem?.imageUrl || '',
    } as Category;
  });

  // Enhance products with images if needed
  const enhancedProducts = allProducts.map(product => {
    // Clone the product
    const enhancedProduct = { ...product };
    
    // Replace the imageUrl with our image if needed
    if (!enhancedProduct.imageUrl || enhancedProduct.imageUrl.trim() === '') {
      enhancedProduct.imageUrl = getProductImageUrl(
        product.id, 
        product.imageUrl, 
        galleryItems
      );
    }
    
    return enhancedProduct;
  });
  
  // Filter products based on the selected filters
  useEffect(() => {
    let result = enhancedProducts;
    
    if (filters.categoryId) {
      result = result.filter(product => product.categoryId === filters.categoryId);
    }
    
    if (filters.isFeatured) {
      result = result.filter(product => product.isFeatured);
    }
    
    if (filters.isBestSeller) {
      result = result.filter(product => product.isBestSeller);
    }
    
    if (filters.isNewArrival) {
      result = result.filter(product => product.isNewArrival);
    }
    
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      result = result.filter(product => 
        product.price >= min && product.price <= max
      );
    }
    
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [filters, enhancedProducts]);

  // Determine if we're in a loading state
  const isLoading = categoriesLoading || galleryLoading || productsLoading;

  // Handle filter changes
  const handleFilterChange = (newFilters: ProductFilterOptions) => {
    setFilters(newFilters);
  };

  if (isMainProductsPage) {
    // Main product page displaying all products
    return (
      <>
        <Helmet>
          <title>Alle Producten | Elegant Drapes</title>
          <meta
            name="description"
            content="Bekijk ons volledige assortiment van premium raambehandelingen, gordijnen, jaloezieën en meer. Vind de perfecte oplossing voor elke stijl en budget."
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
                  <BreadcrumbLink>Producten</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Container>
        </div>
        
        <div className="py-12 bg-neutral-100">
          <Container>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
                Alle Producten
              </h1>
              <p className="font-body text-text-medium max-w-2xl mx-auto">
                Bekijk ons uitgebreide assortiment premium raambehandelingen en oplossingen voor elke ruimte in uw huis
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                  <h2 className="font-display text-xl font-medium mb-4">Filters</h2>
                  <ProductFilter 
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-text-medium">Loading...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <h3 className="font-display text-xl mb-2">Geen producten gevonden</h3>
                    <p className="text-text-medium">
                      Probeer andere filtercriteria of bekijk onze productcategorieën hieronder.
                    </p>
                    <div className="mt-8">
                      <h4 className="font-display text-lg font-medium mb-4">Productcategorieën</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.slice(0, 6).map(category => (
                          <div 
                            key={category.id}
                            className="bg-neutral-50 p-4 rounded-md hover:bg-neutral-100 transition-colors"
                          >
                            <a 
                              href={`/products/${officialCategories.findIndex(c => c === category.name) >= 0 
                                ? officialCategories[officialCategories.findIndex(c => c === category.name)]
                                  .toLowerCase()
                                  .replace(/\s+/g, '-')
                                : category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block text-text-dark hover:text-primary transition-colors"
                            >
                              {category.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex justify-between items-center">
                      <p className="text-text-medium">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'producten'} gevonden
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Show categories at the bottom */}
            <div className="mt-16">
              <h2 className="font-display text-2xl text-primary font-semibold text-center mb-8">
                Ontdek onze productcategorieën
              </h2>
              <CategoryGrid 
                categories={categories}
                isLoading={isLoading}
                error={categoriesError as Error}
              />
            </div>
          </Container>
        </div>
      </>
    );
  } else {
    // Category page (showing the list of categories)
    return (
      <>
        <Helmet>
          <title>Onze Productcategorieën | Elegant Drapes</title>
          <meta
            name="description"
            content="Bekijk onze uitgebreide collectie van premium raambehandelingen, gordijnen, jaloezieën en meer. Vind de perfecte oplossing voor elke stijl en budget."
          />
        </Helmet>
        
        <div className="py-12 bg-neutral-100">
          <Container>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
                Onze Productcategorieën
              </h1>
              <p className="font-body text-text-medium max-w-2xl mx-auto">
                Ontdek ons uitgebreide assortiment premium raambehandelingen en oplossingen voor elke ruimte in uw huis
              </p>
            </div>
            
            <CategoryGrid 
              categories={categories} 
              isLoading={isLoading} 
              error={categoriesError as Error}
            />
          </Container>
        </div>
      </>
    );
  }
};

export default ProductsPage;
