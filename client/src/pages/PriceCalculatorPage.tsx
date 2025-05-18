import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, ArrowRight } from "lucide-react";
import { Category, Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const PriceCalculatorPage = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();
  
  // Fetch all categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch all products to calculate the minimum prices per category
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Calculate the minimum price for each category
  const getMinPriceForCategory = (categoryId: number) => {
    const categoryProducts = products.filter(product => product.categoryId === categoryId);
    
    if (categoryProducts.length === 0) return null;
    
    return Math.min(...categoryProducts.map(product => product.price));
  };

  // Define the calculators available
  const availableCalculators = [
    { 
      name: "Overgordijnen",
      path: "/products/overgordijnen",
      description: "Bereken de prijs voor uw op maat gemaakte overgordijnen",
      imageUrl: "https://images.unsplash.com/photo-1518012312832-96aea3c91144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      startingPrice: 129.99
    },
    { 
      name: "Rolgordijnen",
      path: "/products/rolgordijnen",
      description: "Bereken de prijs voor uw op maat gemaakte rolgordijnen",
      imageUrl: "https://images.unsplash.com/photo-1592492152545-9695d3f473f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      startingPrice: 79.99
    }
  ];

  // Loading states
  if (categoriesLoading || productsLoading) {
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
        <title>Bekijk onze  ||  Producten & Prijzen </title>
        <meta name="description" content="Calculate custom prices for our premium window treatments" />
        <meta property="og:title" content="Price Calculator | Elegant Drapes" />
        <meta property="og:description" content="Calculate custom prices for our premium window treatments" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container className="py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="font-semibold">Bekijk onze Producten & Prijzen</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4">
           Onze collecties & prijzen
          </h1>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Select a product category below to calculate a custom price based on your specific measurements and preferences.
          </p>
        </div>

        {/* Available Calculators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {availableCalculators.map((calculator, index) => (
            <div key={index} className="group h-full bg-white overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={calculator.imageUrl}
                  alt={calculator.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl text-primary font-medium mb-2 flex items-center">
                  {calculator.name}
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="font-body text-text-medium text-sm mb-4">
                  {calculator.description}
                </p>
                
                <p className="font-body text-lg font-semibold text-accent">
                  <span className="text-sm font-normal">From </span>
                  €{calculator.startingPrice.toFixed(2)}
                  <span className="text-sm font-normal"> per window</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-neutral-50 p-6 rounded-lg">
          <h2 className="font-display text-xl text-primary font-medium mb-4">
            About Our Price Calculator
          </h2>
          <p className="mb-4">
            Our calculators provide an approximate price based on your measurements and selected options. For the most accurate quote, please request a free consultation where our experts can assess your specific needs.
          </p>
          <p>
            All prices include made-to-measure fabrication but exclude installation costs unless specified.
          </p>
        </div>
      </Container>
    </>
  );
};

export default PriceCalculatorPage;