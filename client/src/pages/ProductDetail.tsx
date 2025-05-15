import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ColorSwatch } from "@/lib/types";
import { Product, GalleryItem, Category } from "@shared/schema";
import { HomeIcon, ChevronRight, Check } from "lucide-react";
import { getProductImageUrl } from "@/lib/imageUtils";

const ProductDetail = () => {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id) : null;

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch gallery items to use for image assignment
  const { data: galleryItems = [] } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [enhancedProduct, setEnhancedProduct] = useState<Product | null>(null);

  // Effect to enhance product with window blinds image when needed
  useEffect(() => {
    if (product && galleryItems.length > 0) {
      // Create enhanced product with window blinds image if needed
      const productWithImage = { ...product };
      
      if (!productWithImage.imageUrl || productWithImage.imageUrl.trim() === '') {
        productWithImage.imageUrl = getProductImageUrl(
          productWithImage.id, 
          productWithImage.imageUrl, 
          galleryItems
        );
      }
      
      setEnhancedProduct(productWithImage);
      
      // Initialize selected color if available
      if (!selectedColor && productWithImage.colors && productWithImage.colors.length > 0) {
        setSelectedColor(productWithImage.colors[0]);
      }
    }
  }, [product, galleryItems, selectedColor]);

  // Convert the color hex values to ColorSwatch objects
  const colorSwatches: ColorSwatch[] = enhancedProduct?.colors
    ? enhancedProduct.colors.map((color) => ({ color }))
    : [];

  // Get category name
  const getCategoryName = (categoryId: number | undefined) => {
    if (!categoryId || !categories) return "Category";
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Category";
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 w-1/2 mb-8 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-neutral-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-neutral-200 w-3/4 rounded"></div>
              <div className="h-6 bg-neutral-200 w-1/4 rounded"></div>
              <div className="h-4 bg-neutral-200 w-full rounded mt-6"></div>
              <div className="h-4 bg-neutral-200 w-full rounded"></div>
              <div className="h-4 bg-neutral-200 w-3/4 rounded"></div>
              <div className="h-10 bg-neutral-200 w-1/2 rounded-md mt-8"></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !enhancedProduct) {
    return (
      <Container className="py-12">
        <div className="text-center py-16 bg-neutral-100 rounded-lg">
          <h2 className="text-2xl font-medium mb-2">Product Not Found</h2>
          <p className="text-text-medium mb-6">
            The product you're looking for might have been removed or is temporarily unavailable.
          </p>
          <Link href="/products">
            <Button>Return to Products</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const productPrice = enhancedProduct.price.toFixed(2);
  const totalPrice = (enhancedProduct.price * quantity).toFixed(2);

  return (
    <>
      <Helmet>
        <title>{enhancedProduct.name} | Elegant Drapes</title>
        <meta name="description" content={enhancedProduct.description} />
      </Helmet>

      <Container className="py-8">
        <Breadcrumb className="mb-6">
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
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products?category=${enhancedProduct.categoryId}`}>
                {getCategoryName(enhancedProduct.categoryId)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>{enhancedProduct.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={enhancedProduct.imageUrl}
                alt={enhancedProduct.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {enhancedProduct.isNewArrival && (
              <div className="absolute top-4 right-4 bg-accent text-white text-sm py-1 px-3 rounded-full">
                New Arrival
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl text-primary font-semibold mb-2">
              {enhancedProduct.name}
            </h1>
            <p className="text-accent text-2xl font-semibold mb-4">
              ${productPrice}
            </p>
            
            <p className="text-text-medium mb-6">{enhancedProduct.description}</p>
            
            <div className="space-y-6">
              {enhancedProduct.material && (
                <div>
                  <h3 className="font-medium mb-2">Material</h3>
                  <p className="text-text-medium">{enhancedProduct.material}</p>
                </div>
              )}
              
              {enhancedProduct.dimensions && (
                <div>
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <p className="text-text-medium">{enhancedProduct.dimensions}</p>
                </div>
              )}
              
              {colorSwatches.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Colors</h3>
                  <div className="flex gap-3">
                    {colorSwatches.map((swatch, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-full border relative ${
                          selectedColor === swatch.color
                            ? "border-accent ring-2 ring-offset-1 ring-accent"
                            : "border-neutral-300"
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        onClick={() => setSelectedColor(swatch.color)}
                        aria-label={`Select color ${swatch.color}`}
                      >
                        {selectedColor === swatch.color && (
                          <Check className="absolute inset-0 m-auto text-white h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={increaseQuantity}>
                    +
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/quote">
                    <a className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full bg-secondary hover:bg-accent"
                      >
                        Request Quote
                      </Button>
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Contact for Custom Sizes
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="features">Features & Benefits</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-6">
              <div className="prose max-w-none">
                <p className="mb-4">
                  {enhancedProduct.description}
                </p>
                {enhancedProduct.dimensions && (
                  <>
                    <h3 className="text-lg font-medium mb-2">Dimensions</h3>
                    <p className="mb-4">{enhancedProduct.dimensions}</p>
                  </>
                )}
                {enhancedProduct.material && (
                  <>
                    <h3 className="text-lg font-medium mb-2">Material</h3>
                    <p>{enhancedProduct.material}</p>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="features" className="py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">Key Features</h3>
                {enhancedProduct.features && enhancedProduct.features.length > 0 ? (
                  <ul className="space-y-2">
                    {enhancedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific features listed for this product.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="care" className="py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
                <p className="mb-4">
                  To ensure the longevity and appearance of your {enhancedProduct.name}, please follow these care instructions:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                    <span>Regular dusting with a feather duster or vacuum with upholstery attachment</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                    <span>Spot clean with a mild detergent and water solution</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                    <span>Professional cleaning recommended for deep cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                    <span>Avoid direct exposure to harsh sunlight to prevent fading</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
