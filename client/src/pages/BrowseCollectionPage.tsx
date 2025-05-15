import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Category, GalleryItem, Product } from "@shared/schema";
import { getProductImageUrl } from "@/lib/imageUtils";
import { getCategoryImage } from "@/lib/categoryImages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, ArrowRight } from "lucide-react";

// Official list of 20 product categories
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

// Map of official Dutch category names to their English database equivalents
const categoryNameMap: Record<string, string> = {
  "Overgordijnen": "Curtains",
  "Vitrages": "Sheer Drapes",
  "Rolgordijnen": "Sunblinds",
  "Duo rolgordijnen": "Duo Blinds", 
  "Textiel lamellen": "Textile Vertical Blinds",
  "Kunststof lamellen": "Plastic Vertical Blinds",
  "Houten jaloezieën": "Wooden Blinds",
  "Kunststof jaloezieën": "Plastic Blinds",
  "Textiel raamfolie": "Textile Window Film",
  "Houten shutters": "Wooden Shutters",
  "Inzethorren": "Inset Insect Screens", 
  "Opzethorren": "Mount-on Insect Screens",
  "Plissé hordeuren": "Pleated Insect Doors",
  "Plissé": "Pleated Blinds",
  "Duo plissé": "Duo Pleated Blinds",
  "Duo plissé dakramen": "Duo Pleated Roof Window Blinds",
  "Dakraam zonwering": "Roof Window Shading",
  "Gordijnrails": "Curtain Rails",
  "Gordijnroedes": "Curtain Rods",
  "SQUID": "SQUID",
};

const BrowseCollectionPage = () => {
  // Fetch all categories
  const { 
    data: categoriesFromDb = [], 
    isLoading: categoriesLoading 
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
    isLoading: productsLoading 
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
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

  // Create a mapping from English database category names to their details
  const categoryDetailsMap = categoriesFromDb.reduce((acc, category) => {
    acc[category.name] = category;
    return acc;
  }, {} as Record<string, Category>);

  // Create one product per category mapping
  const oneProductPerCategory = officialCategories.map((dutchCategoryName, index) => {
    // Find the English category name equivalent
    const englishCategoryName = categoryNameMap[dutchCategoryName] || dutchCategoryName;
    
    // Find the category ID from the database
    const dbCategory = categoriesFromDb.find(c => c.name === englishCategoryName);
    
    let categoryObject: Category;
    
    if (dbCategory) {
      // If we have a specific image for this category, use it
      const categoryImage = getCategoryImage(dbCategory.name);
      if (categoryImage) {
        categoryObject = {
          ...dbCategory,
          imageUrl: categoryImage
        };
      } else {
        categoryObject = dbCategory;
      }
    } else {
      // If we don't have a database category, create a placeholder
      // Check if we have a custom image for this category
      const categoryImage = getCategoryImage(englishCategoryName);
      
      if (categoryImage) {
        categoryObject = {
          id: 1000 + index, // Use high IDs to avoid conflicts
          name: englishCategoryName,
          description: `Ontdek onze collectie ${dutchCategoryName.toLowerCase()} voor elk interieur en budget.`,
          imageUrl: categoryImage,
        } as Category;
      } else {
        // If not found, create a placeholder with gallery image
        const randomIndex = index % galleryItems.length;
        const galleryItem = galleryItems[randomIndex > 0 ? randomIndex : 0];
        
        categoryObject = {
          id: 1000 + index, // Use high IDs to avoid conflicts
          name: englishCategoryName,
          description: `Ontdek onze collectie ${dutchCategoryName.toLowerCase()} voor elk interieur en budget.`,
          imageUrl: galleryItem?.imageUrl || '',
        } as Category;
      }
    }

    // Find the first product in this category
    const categoryProduct = enhancedProducts.find(product => product.categoryId === categoryObject.id);
    
    // Create the URL-friendly category path
    const categoryUrl = dutchCategoryName.toLowerCase().replace(/\s+/g, '-');
    
    // If we found a product, return it along with its category
    if (categoryProduct) {
      return {
        product: categoryProduct,
        category: categoryObject,
        displayName: dutchCategoryName,
        urlPath: categoryUrl
      };
    }
    
    // If no product found, return null for this placeholder
    return {
      product: null,
      category: categoryObject,
      displayName: dutchCategoryName,
      urlPath: categoryUrl
    };
  });

  // Determine if we're in a loading state
  const isLoading = categoriesLoading || galleryLoading || productsLoading;

  return (
    <>
      <Helmet>
        <title>Browse Collection | Elegant Drapes</title>
        <meta
          name="description"
          content="Bekijk onze uitgebreide collectie van premium raambehandelingen, gordijnen, jaloezieën en meer. Vind de perfecte oplossing voor elke stijl en budget."
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
                <BreadcrumbLink>Browse Collection</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>
      
      <div className="py-12 bg-neutral-100">
        <Container className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Browse Our Collection
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Bekijk onze uitgebreide collectie premium raambehandelingen en vind de perfecte oplossing voor uw interieur.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-text-medium">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {oneProductPerCategory.map((item, index) => {
                if (item.product) {
                  // We have a product, show the product card with category badge
                  return (
                    <div key={`${item.category.id}-${index}`} className="flex flex-col h-full">
                      <Card className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Link href={`/products/${item.urlPath}`}>
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </Link>
                          
                          {/* Category tag */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs py-1 px-3 rounded-full font-medium">
                            {item.displayName}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-display text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            <Link href={`/products/${item.urlPath}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-muted text-sm mb-4 line-clamp-2 flex-grow">
                            {item.product.description}
                          </p>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[#C8A165] text-lg font-semibold">${item.product.price.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-[#1F2937] hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center cursor-pointer">
                            <Link href={`/products/${item.urlPath}`} className="flex items-center justify-center w-full text-white">
                              Bekijk meer <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                } else {
                  // No product for this category, show a placeholder
                  return (
                    <div key={`${item.category.id}-${index}`} className="flex flex-col h-full">
                      <Card className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-r from-primary/50 to-accent/50">
                          <Link href={`/products/${item.urlPath}`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-white text-center p-6">
                                <h3 className="font-display text-xl mb-2">{item.displayName}</h3>
                                <p>Er zijn momenteel geen producten beschikbaar in deze categorie.</p>
                              </div>
                            </div>
                          </Link>
                          
                          {/* Category tag */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs py-1 px-3 rounded-full font-medium">
                            {item.displayName}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-display text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            <Link href={`/products/${item.urlPath}`}>
                              {item.displayName}
                            </Link>
                          </h3>
                          <p className="text-muted text-sm mb-4 line-clamp-2 flex-grow">
                            Ontdek ons uitgebreide assortiment {item.displayName.toLowerCase()} voor elk interieur en budget.
                          </p>
                          <div className="w-full bg-[#1F2937] hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center cursor-pointer">
                            <Link href={`/products/${item.urlPath}`} className="flex items-center justify-center w-full text-white">
                              Bekijk meer <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
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
};

export default BrowseCollectionPage;