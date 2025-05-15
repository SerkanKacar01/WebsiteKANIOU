import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Category, GalleryItem, Product } from "@shared/schema";
import { getProductImageUrl, getAssetUrl } from "@/lib/imageUtils";
import { getCategoryImage } from "@/lib/categoryImages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, ArrowRight } from "lucide-react";
import { ShareLink } from "@/components/ui/share-link";

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
                  <HomeIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink aria-current="page">Browse Collection</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>
      
      <main className="py-12 bg-neutral-100">
        <Container className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Doorblader onze collectie
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto mb-4">
              Ontdek onze uitgebreide collectie hoogwaardige raambekleding en vind de ideale oplossing die aansluit bij uw interieurwensen. Onze producten zijn ontworpen om uw ruimte te veredelen en te beschermen tegen het zonlicht.
            </p>
            <div className="flex justify-center mb-4">
              <ShareLink 
                url="/browse-collection"
                title="Kaniou Zilvernaald Collection"
                className="mx-auto"
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-text-medium">Loading categories...</p>
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="region"
              aria-label="Product Categories"
            >
              {oneProductPerCategory.map((item, index) => {
                if (item.product) {
                  // We have a product, show the product card with category badge
                  return (
                    <div key={`${item.category.id}-${index}`} className="flex flex-col h-full">
                      <Card className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Link href={`/products/${item.urlPath}`}>
                            <a className="block h-full">
                              <img
                                src={getAssetUrl(item.product.imageUrl)}
                                alt={`${item.product.name} - ${item.displayName} product`}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                              />
                              {/* Overlay effect on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <span className="sr-only">View {item.product.name} in {item.displayName} category</span>
                            </a>
                          </Link>
                          
                          {/* Category tag */}
                          <div 
                            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs py-1 px-3 rounded-full font-medium transform transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/95"
                            aria-hidden="true"
                          >
                            {item.displayName}
                          </div>
                          
                          {/* Share button */}
                          <div className="absolute top-4 right-4 z-10 opacity-90 hover:opacity-100 transition-opacity">
                            <ShareLink 
                              url={`/products/${item.urlPath}`}
                              title={`${item.displayName} Collection`}
                            />
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                            <Link href={`/products/${item.urlPath}`}>
                              <a>{item.product.name}</a>
                            </Link>
                          </h2>
                          <p className="text-muted text-sm mb-4 line-clamp-2 flex-grow">
                            {item.product.description}
                          </p>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[#C8A165] text-lg font-semibold transform group-hover:scale-105 transition-transform duration-300">${item.product.price.toFixed(2)}</span>
                          </div>
                          <Link href={`/products/${item.urlPath}`}>
                            <a className="w-full bg-[#1F2937] hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center group-hover:shadow-md group-hover:translate-y-[-2px]">
                              <span className="relative inline-flex items-center">
                                <span>Bekijk meer</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                              </span>
                            </a>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  );
                } else {
                  // No product for this category, show a placeholder
                  return (
                    <div key={`${item.category.id}-${index}`} className="flex flex-col h-full">
                      <Card className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/60 to-accent/60 group-hover:from-primary/70 group-hover:to-accent/70 transition-colors duration-500">
                          <Link href={`/products/${item.urlPath}`}>
                            <a className="absolute inset-0 flex items-center justify-center">
                              <div className="text-white text-center p-6 transform transition-transform duration-300 group-hover:scale-105">
                                <h2 className="font-display text-xl mb-2 group-hover:text-white/95">{item.displayName}</h2>
                                <p className="transition-all duration-300 group-hover:text-white/90">Er zijn momenteel geen producten beschikbaar in deze categorie.</p>
                              </div>
                              <span className="sr-only">Browse {item.displayName} category</span>
                            </a>
                          </Link>
                          
                          {/* Animated pattern overlay */}
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDR2MWgtNHYtMXptMC00aDR2MWgtNFYyOHptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMjQtMTJWNGgtNHYtMWg1djVoLTF6bS0yIDBoMXYtNGgxdjVoLTV2LTFoM3ptLTQtNnYtM2gtNHYxaC0xdi0yaDZ2NWgtMXYtMXptLTgtMWg0djFoLTR2LTF6bTAtMmg0djFoLTR2LTF6bS0yNCAxMmg0djFoLTR2LTF6bTAtMmg0djFoLTR2LTF6bTAtNGg0djFoLTRWMjh6bTAtNGg0djFoLTR2LTF6bTAtNGg0djFoLTR2LTF6TTE0IDRoMXY1aC01di0xaDR2LTR6bS00IDdoNXYxaC01di0xem0yLTZoLTN2NWgtMXYtNmg0djF6bS00IDE1aDR2MWgtNHYtMXptMC0yaDR2MWgtNHYtMXptMC00aDR2MWgtNFYxNHptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNFY2em0tNiA1aDR2MUgzdi0xem0wLTJoNHYxSDN2LTF6bTAtNGg0djFIM1Y1em0wLTRoNHYxSDN2LTF6bTIwIDhoNHYxaC00di0xem0wLTJoNHYxaC00di0xem0wLTRoNHYxaC00VjN6TTMgMmg0djFIM3YtMXptMTcgMTNoNHYxaC00di0xem0wLTJoNHYxaC00di0xem0wLTRoNHYxaC00VjloNHYxaC00djF6bTAgMGg0di0xaC00djF6bTAtNGg0VjRoLTR2MXptLTE0IDJoNFY4SDZ2MXptMC0yaDRWNkg2djF6bTAtNGg0VjJINnYxeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                          
                          {/* Category tag */}
                          <div 
                            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs py-1 px-3 rounded-full font-medium transform transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/95"
                            aria-hidden="true"
                          >
                            {item.displayName}
                          </div>
                          
                          {/* Share button */}
                          <div className="absolute top-4 right-4 z-10 opacity-90 hover:opacity-100 transition-opacity">
                            <ShareLink 
                              url={`/products/${item.urlPath}`}
                              title={`${item.displayName} Collection`}
                            />
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                            <Link href={`/products/${item.urlPath}`}>
                              <a>{item.displayName}</a>
                            </Link>
                          </h2>
                          <p className="text-muted text-sm mb-4 line-clamp-2 flex-grow">
                            Ontdek ons uitgebreide assortiment {item.displayName.toLowerCase()} voor elk interieur en budget.
                          </p>
                          <Link href={`/products/${item.urlPath}`}>
                            <a className="w-full bg-[#1F2937] hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center group-hover:shadow-md group-hover:translate-y-[-2px]">
                              <span className="relative inline-flex items-center">
                                <span>Bekijk meer</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                              </span>
                            </a>
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
      </main>
    </>
  );
};

export default BrowseCollectionPage;