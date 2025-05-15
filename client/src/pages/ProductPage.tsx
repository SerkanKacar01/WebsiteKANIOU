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
import { useLanguage } from "@/context/LanguageContext";
import { Product, Category } from "@shared/schema";
import { HomeIcon, ChevronRight, Check } from "lucide-react";

const ProductPage = () => {
  // Get the product name from the URL
  const [, params] = useRoute("/products/:productName");
  const productName = params?.productName;
  const { t } = useLanguage();

  // Fetch all products
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Fetch all categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Find the product that matches the URL name
  const [product, setProduct] = useState<Product | null>(null);
  const [productCategory, setProductCategory] = useState<Category | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Initialize with sample features (these will be replaced with actual product features)
  const features = [
    "Premium quality materials",
    "Easy installation process",
    "Available in multiple sizes",
    "Customizable to your needs",
    "Durable and long-lasting",
  ];

  useEffect(() => {
    if (products.length > 0 && productName) {
      // Convert the URL product name to a more searchable format
      const searchableName = productName.replace(/-/g, ' ').toLowerCase();
      
      // Find the product with a name that matches the URL parameter
      const foundProduct = products.find(prod => 
        prod.name.toLowerCase().includes(searchableName) || 
        searchableName.includes(prod.name.toLowerCase())
      );
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set initial selected color if available
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      }
    }
  }, [products, productName]);

  // Find the category once we have the product and categories
  useEffect(() => {
    if (product && categories.length > 0) {
      const foundCategory = categories.find(cat => cat.id === product.categoryId);
      if (foundCategory) {
        setProductCategory(foundCategory);
      }
    }
  }, [product, categories]);

  // Loading state
  if (productsLoading || categoriesLoading || !product) {
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

  // Not found state
  if (!product) {
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

  // Format the price
  const productPrice = product.price.toFixed(2);

  return (
    <>
      <Helmet>
        <title>{product.name} | Elegant Drapes</title>
        <meta name="description" content={`${product.description} Available in multiple colors and sizes. Request a free quote today.`} />
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
                <BreadcrumbLink href="/products">
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              {productCategory && (
                <>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/products?category=${productCategory.id}`}>
                      {productCategory.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  {product.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>


          </div>

          <div>
            <h1 className="font-display text-3xl text-primary font-semibold mb-2">
              {product.name}
            </h1>
            <p className="text-accent text-2xl font-semibold mb-4">
              ${productPrice}
            </p>
            
            <p className="text-text-medium mb-6">{product.description}</p>
            
            <div className="space-y-6">
              {product.material && (
                <div>
                  <h3 className="font-medium mb-2">Material</h3>
                  <p className="text-text-medium">{product.material}</p>
                </div>
              )}
              
              {product.dimensions && (
                <div>
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <p className="text-text-medium">{product.dimensions}</p>
                </div>
              )}
              
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Available Colors</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-full border relative ${
                          selectedColor === color
                            ? "border-accent ring-2 ring-offset-1 ring-accent"
                            : "border-neutral-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                      >
                        {selectedColor === color && (
                          <Check className="absolute inset-0 m-auto text-white h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/quote">
                    <Button
                      size="lg"
                      className="w-full bg-secondary hover:bg-accent"
                    >
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Contact for Custom Sizes
                    </Button>
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
                  {product.description}
                </p>
                {product.dimensions && (
                  <>
                    <h3 className="text-lg font-medium mb-2">Dimensions</h3>
                    <p className="mb-4">{product.dimensions}</p>
                  </>
                )}
                {product.material && (
                  <>
                    <h3 className="text-lg font-medium mb-2">Material</h3>
                    <p>{product.material}</p>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="features" className="py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">Key Features</h3>
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>
            <TabsContent value="care" className="py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
                <p className="mb-4">
                  To ensure the longevity and appearance of your {product.name}, please follow these care instructions:
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

export default ProductPage;