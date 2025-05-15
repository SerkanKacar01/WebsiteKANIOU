import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
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
import { HomeIcon, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    // Main product page displaying one representative product per category
    
    // Create an array to hold one product per category
    const oneProductPerCategory = officialCategories.map((categoryName) => {
      // Find the category object matching this category name
      const categoryObject = categories.find(cat => cat.name === categoryName);
      
      if (!categoryObject) {
        return null;
      }
      
      // Find the first product in this category
      const categoryProduct = enhancedProducts.find(product => product.categoryId === categoryObject.id);
      
      // If we found a product, return it along with its category
      if (categoryProduct) {
        return {
          product: categoryProduct,
          category: categoryObject
        };
      }
      
      // If no product found, return a placeholder
      return {
        product: null,
        category: categoryObject
      };
    }).filter(Boolean); // Filter out any null entries
    
    return (
      <>
        <Helmet>
          <title>Onze Producten | Elegant Drapes</title>
          <meta
            name="description"
            content="Bekijk één selectie uit elke productcategorie – klik door voor het volledige aanbod. Premium raambehandelingen voor elk interieur."
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
                Onze Producten
              </h1>
              <p className="font-body text-text-medium max-w-2xl mx-auto">
                Bekijk één selectie uit elke productcategorie – klik door voor het volledige aanbod.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-text-medium">Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {oneProductPerCategory.filter((item): item is NonNullable<typeof item> => item !== null).map((item) => {
                  // Now TypeScript knows item cannot be null
                  const categoryName = item.category.name;
                  const categoryUrl = categoryName.toLowerCase().replace(/\s+/g, '-');
                  
                  if (item.product) {
                    // We have a product, show the product card with category badge
                    return (
                      <div key={item.category.id} className="flex flex-col h-full">
                        <Card className="group overflow-hidden shadow-md transition-shadow hover:shadow-lg h-full">
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white text-sm py-1 px-3 rounded-full">
                              {categoryName}
                            </div>
                            {item.product.isBestSeller && (
                              <div className="absolute top-4 right-4 bg-secondary text-white text-sm py-1 px-3 rounded-full">
                                Best Seller
                              </div>
                            )}
                            {item.product.isNewArrival && (
                              <div className="absolute top-4 right-4 bg-accent text-white text-sm py-1 px-3 rounded-full">
                                Nieuw
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-display text-xl text-primary font-medium">
                                {item.product.name}
                              </h3>
                            </div>
                            <p className="font-body text-text-medium text-sm mb-4 flex-grow">
                              {item.product.description}
                            </p>
                            <Link href={`/products/${categoryUrl}`}>
                              <div className="w-full bg-primary hover:bg-accent text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center cursor-pointer">
                                Bekijk meer <ArrowRight className="ml-2 h-4 w-4" />
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  } else {
                    // No product for this category, show a placeholder
                    return (
                      <div key={item.category.id} className="flex flex-col h-full">
                        <Card className="group overflow-hidden shadow-md transition-shadow hover:shadow-lg h-full">
                          <div className="relative h-64 overflow-hidden bg-gradient-to-r from-primary/50 to-accent/50">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-white text-center p-6">
                                <h3 className="font-display text-xl mb-2">{categoryName}</h3>
                                <p>Ontdek binnenkort onze nieuwe collectie</p>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-display text-xl text-primary font-medium">
                                {categoryName}
                              </h3>
                            </div>
                            <p className="font-body text-text-medium text-sm mb-4 flex-grow">
                              Ontdek ons uitgebreide assortiment {categoryName.toLowerCase()} voor elk interieur en budget.
                            </p>
                            <Link href={`/products/${categoryUrl}`}>
                              <div className="w-full bg-primary hover:bg-accent text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center cursor-pointer">
                                Bekijk meer <ArrowRight className="ml-2 h-4 w-4" />
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  }
                })}
              </div>
            )}
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
