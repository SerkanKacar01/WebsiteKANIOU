import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Product, GalleryItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { getProductImageUrl } from "@/lib/imageUtils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, ArrowRight } from "lucide-react";

const ProductsPage = () => {
  // Fetch all products
  const { 
    data: products = [], 
    isLoading: productsLoading,
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Fetch gallery items to use for image assignment if needed
  const { 
    data: galleryItems = [], 
    isLoading: galleryLoading 
  } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  // Determine if we're in a loading state
  const isLoading = productsLoading || galleryLoading;

  // For scalability, we'll use filter to show only products with complete data
  // For now, we'll just display the first valid product as required
  const validProducts = products
    .filter(product => 
      product && 
      product.name && 
      product.description && 
      product.price
    )
    .map(product => {
      // Clone the product
      const enhancedProduct = { ...product };
      
      // Ensure it has an image
      if (!enhancedProduct.imageUrl || enhancedProduct.imageUrl.trim() === '') {
        enhancedProduct.imageUrl = getProductImageUrl(
          product.id, 
          product.imageUrl, 
          galleryItems
        );
      }
      
      return enhancedProduct;
    });

  // For the demo, we'll only display the first valid product (as per requirements)
  // This allows the structure to be scalable for future additions
  const demoProduct = validProducts.length > 0 ? validProducts[0] : null;

  return (
    <>
      <Helmet>
        <title>Onze Producten | Elegant Drapes</title>
        <meta
          name="description"
          content="Bekijk ons assortiment van premium raambehandelingen op maat. Vind de perfecte oplossing voor elke stijl en budget."
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
              Bekijk hier onze zorgvuldig gemaakte raamdecoratie op maat.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-text-medium">Loading...</p>
            </div>
          ) : !demoProduct ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="font-display text-xl mb-2">Geen producten beschikbaar</h3>
              <p className="text-text-medium">
                Er zijn momenteel geen producten beschikbaar. Bekijk onze categorieën voor meer opties.
              </p>
              <div className="mt-6">
                <Link href="/products/categories">
                  <Button className="bg-primary hover:bg-primary/90">
                    Bekijk Categorieën
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This is structured as a map for scalability, but currently only shows one product */}
              {[demoProduct].map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isBestSeller && (
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs py-1 px-2 rounded">
                        Bestseller
                      </div>
                    )}
                    {product.isNewArrival && (
                      <div className="absolute top-4 right-4 bg-accent text-white text-xs py-1 px-2 rounded">
                        Nieuw Binnen
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl font-medium text-primary">
                        {product.name}
                      </h3>
                      <div className="text-accent font-semibold">€{product.price.toFixed(2)}</div>
                    </div>
                    <p className="font-body text-text-medium text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <div className="flex justify-end">
                        <Button variant="link" className="text-primary hover:text-accent p-0">
                          Bekijk Product <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Info section for future products */}
          {demoProduct && (
            <div className="mt-16 text-center">
              <p className="font-body text-text-medium max-w-2xl mx-auto mb-8">
                Binnenkort breiden we ons assortiment uit met meer hoogwaardige producten.
                Neem contact met ons op voor meer informatie over maatwerk en beschikbaarheid.
              </p>
              <Link href="/contact">
                <Button className="bg-secondary hover:bg-secondary/90">
                  Neem Contact Op
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;
