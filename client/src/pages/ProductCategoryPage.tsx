import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, Check, ArrowRight } from "lucide-react";
import { Product, Category, GalleryItem } from "@shared/schema";
import { getProductImageUrl } from "@/lib/imageUtils";
import { getCategoryImage } from "@/lib/categoryImages";
import { ShareLink } from "@/components/ui/share-link";

// Product categories with their display labels and URL paths
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },
  { label: "Rolgordijnen", urlPath: "rolgordijnen" },
  { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen" },
  { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
  { label: "Houten shutters", urlPath: "houten-shutters" },
  { label: "Inzethorren", urlPath: "inzethorren" },
  { label: "Opzethorren", urlPath: "opzethorren" },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
  { label: "Plissé", urlPath: "plisse" },
  { label: "Duo plissé", urlPath: "duo-plisse" },
  { label: "Duo plissé dakramen", urlPath: "duo-plisse-dakramen" },
  { label: "Dakraam zonwering", urlPath: "dakraam-zonwering" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
  { label: "SQUID", urlPath: "squid" },
];

const ProductCategoryPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and products
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: allProducts = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Fetch gallery items to use for image assignment
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  useEffect(() => {
    if (categories.length > 0 && allProducts.length > 0 && galleryItems.length > 0 && category) {
      setLoading(true);
      
      // Find matching category based on URL
      // Create a more robust mapping system that handles all categories
      // This is a more complete mapping that covers all possible URL paths
      const urlToCategoryName: Record<string, string> = {};
      
      // First, map all categories by their exact name (case-insensitive)
      categories.forEach((cat: Category) => {
        // Create a URL-friendly version of the name
        const urlFriendlyName = cat.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        urlToCategoryName[urlFriendlyName] = cat.name;
      });
      
      // Add additional mappings that might be used in the UI
      const additionalMappings: Record<string, string> = {
        'overgordijnen': 'Curtains',
        'vitrages': 'Sheer Drapes',
        'rolgordijnen': 'Sunblinds',
        'duo-rolgordijnen': 'Duo Blinds',
        'textiel-lamellen': 'Textile Vertical Blinds',
        'kunststof-lamellen': 'Plastic Vertical Blinds',
        'houten-jaloezieen': 'Wooden Blinds',
        'kunststof-jaloezieen': 'Plastic Blinds',
        'textiel-raamfolie': 'Textile Window Film',
        'houten-shutters': 'Wooden Shutters',
        'inzethorren': 'Inset Insect Screens',
        'opzethorren': 'Mount-on Insect Screens',
        'plisse-hordeuren': 'Pleated Insect Doors',
        'plisse': 'Pleated Blinds',
        'duo-plisse': 'Duo Pleated Blinds',
        'duo-plisse-dakramen': 'Duo Pleated Roof Window Blinds',
        'dakraam-zonwering': 'Roof Window Shading',
        'gordijnrails': 'Curtain Rails',
        'gordijnroedes': 'Curtain Rods',
        'horren': 'Insect Screens',
        'squid': 'SQUID'
      };
      
      // Merge the additional mappings into our URL-to-category mapping
      Object.entries(additionalMappings).forEach(([url, name]) => {
        urlToCategoryName[url] = urlToCategoryName[url] || name;
      });
      
      // Get the matching category name or default to an empty string
      const categoryName = urlToCategoryName[category as string] || '';
      
      console.log(`URL path: ${category}, Mapped category name: ${categoryName}`);
      
      // Find the category object by name - doing a case-insensitive match to be more forgiving
      const foundCategory = categories.find((cat: Category) => 
        cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      
      if (foundCategory) {
        // Check if we have a custom image for this category
        const categoryImage = getCategoryImage(foundCategory.name);
        
        // If we have a custom image, use it
        if (categoryImage) {
          setCategoryData({
            ...foundCategory,
            imageUrl: categoryImage
          });
        } else {
          setCategoryData(foundCategory);
        }
        
        // Filter products by category
        const categoryProducts = allProducts.filter(
          (product: Product) => product.categoryId === foundCategory.id
        );
        
        // Enhance products with window blinds image for those without an image
        const enhancedProducts = categoryProducts.map(product => {
          // Clone the product
          const enhancedProduct = { ...product };
          
          // Replace the imageUrl with our window blinds image if needed
          if (!enhancedProduct.imageUrl || enhancedProduct.imageUrl.trim() === '') {
            enhancedProduct.imageUrl = getProductImageUrl(
              product.id, 
              product.imageUrl, 
              galleryItems
            );
          }
          
          return enhancedProduct;
        });
        
        setProducts(enhancedProducts);
      } else {
        // Redirect to products page if category not found
        setLocation("/products", { replace: true });
      }
      
      setLoading(false);
    }
  }, [categories, allProducts, category, galleryItems, setLocation]);

  // Loading state
  if (loading || categoriesLoading || productsLoading || galleryLoading || !categoryData) {
    return (
      <Container className="py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-medium">Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        {/* Use the product-specific label or fall back to category name */}
        <title>
          {productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name} | Elegant Drapes
        </title>
        <meta
          name="description"
          content={`Discover our premium quality ${categoryData.name.toLowerCase()} collection. ${categoryData.description}. Request a free quote for your ${productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label.toLowerCase() || categoryData.name.toLowerCase()}.`}
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
                <BreadcrumbLink href="/products">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {/* Use the label from productCategories or fallback to category data */}
                <BreadcrumbLink>
                  {productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-24" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${categoryData.imageUrl})` 
        }}
      >
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
              {productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name}
            </h1>
            <p className="font-body text-white text-lg mb-8">
              {categoryData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Offerte Aanvragen
                </Button>
              </Link>
              <a href="#products">
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white hover:bg-white/20"
                >
                  Bekijk Producten
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Belangrijkste Kenmerken
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">Premium Kwaliteit</h3>
              <p className="text-text-medium">
                Gemaakt van de beste materialen om duurzaamheid en een elegante uitstraling te garanderen
              </p>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">Aanpasbare Opties</h3>
              <p className="text-text-medium">
                Beschikbaar in meerdere maten, kleuren en stijlen om perfect bij uw interieur te passen
              </p>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">Professionele Installatie</h3>
              <p className="text-text-medium">
                Deskundige installatieservice beschikbaar voor een perfecte pasvorm en afwerking
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <div id="products" className="py-16 bg-neutral-50">
        <Container className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-6">
            {productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name} Collection
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto text-center mb-4">
            Ontdek ons uitgebreide assortiment {(productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name).toLowerCase()} ontworpen om uw leefruimte te verfraaien met stijl en functionaliteit.
          </p>
          
          {/* Share button for the entire category */}
          <div className="flex justify-center mb-8">
            <ShareLink 
              url={`/products/${category}`}
              title={`${productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name} Collection`}
              className="mx-auto"
            />
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-medium">Er zijn momenteel geen producten beschikbaar in deze categorie.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                    
                    {/* Category tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs py-1 px-3 rounded-full font-medium">
                      {productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name}
                    </div>
                    
                    {/* Share button */}
                    <div className="absolute top-4 right-4 z-10">
                      <ShareLink 
                        url={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                        title={`${product.name} - ${productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name}`}
                      />
                    </div>

                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-semibold mb-2 hover:text-primary transition-colors">
                      <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-muted text-sm mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#C8A165] text-lg font-semibold">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-[#1F2937] hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center cursor-pointer">
                      <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center justify-center w-full text-white">
                        Bekijk meer <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/quote">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Offerte Aanvragen
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Specifications Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Specifications
          </h2>
          
          <div className="bg-neutral-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-medium mb-4">Materials</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Premium quality fabrics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Durable hardware components</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>UV resistant materials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Easy to clean and maintain</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-medium mb-4">Available Options</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Multiple color choices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Custom dimensions available</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Various operating mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Different mounting options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="font-body mb-8">
              Contact us today for a personalized consultation and free quote. Our experts will help you find the perfect {(productCategories.find((pc: {label: string, urlPath: string}) => pc.urlPath === category)?.label || categoryData.name).toLowerCase()} solution for your home or business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quote">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductCategoryPage;