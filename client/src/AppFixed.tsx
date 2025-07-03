import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";

// Import essential components without problematic dependencies
import { useEffect, useState } from "react";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";

// Import pages - using only working ones
import Home from "@/pages/Home";
import ProductCategoryPageMinimal from "@/pages/ProductCategoryPageMinimal";
import ProductsPage from "@/pages/ProductsPage";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import OffertePage from "@/pages/OffertePage";

const AppFixed = () => {
  const [location] = useLocation();

  // Simple page title function
  const getPageTitle = () => {
    if (location === "/") return "KANIOU | Premium Raamdecoratie";
    if (location.startsWith("/producten/")) return "KANIOU | Producten";
    if (location === "/producten") return "KANIOU | Alle Producten";
    if (location === "/gallery" || location === "/gallerij") return "KANIOU | Galerij";
    if (location === "/about" || location === "/overons") return "KANIOU | Over Ons";
    if (location === "/contact") return "KANIOU | Contact";
    if (location === "/quote" || location === "/offerte") return "KANIOU | Offerte";
    return "KANIOU | Premium Raamdecoratie";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Helmet>
          <title>{getPageTitle()}</title>
          <meta name="description" content="Premium raamdecoratie op maat bij KANIOU" />
        </Helmet>

        <MobileLayoutWrapper>
          <Switch>
            <Route path="/" component={Home} />
            
            {/* Product pages */}
            <Route path="/products" component={ProductsPage} />
            <Route path="/producten" component={ProductsPage} />
            
            {/* All individual product category routes */}
            <Route path="/producten/overgordijnen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/vitrages" component={ProductCategoryPageMinimal} />
            <Route path="/producten/rolgordijnen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/duo-rolgordijnen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/textiel-lamellen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/kunststof-lamellen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/houten-jaloezieen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/kunststof-jaloezieen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/textiel-raamfolie" component={ProductCategoryPageMinimal} />
            <Route path="/producten/houten-shutters" component={ProductCategoryPageMinimal} />
            <Route path="/producten/inzethorren" component={ProductCategoryPageMinimal} />
            <Route path="/producten/opzethorren" component={ProductCategoryPageMinimal} />
            <Route path="/producten/plisse-hordeuren" component={ProductCategoryPageMinimal} />
            <Route path="/producten/plisse" component={ProductCategoryPageMinimal} />
            <Route path="/producten/duo-plisse" component={ProductCategoryPageMinimal} />
            <Route path="/producten/dakraam-zonweringen" component={ProductCategoryPageMinimal} />
            <Route path="/producten/gordijnrails" component={ProductCategoryPageMinimal} />
            <Route path="/producten/gordijnroedes" component={ProductCategoryPageMinimal} />
            <Route path="/producten/squid-textile-foil" component={ProductCategoryPageMinimal} />
            
            {/* Dynamic product route as fallback */}
            <Route path="/producten/:category" component={ProductCategoryPageMinimal} />
            
            {/* Other pages */}
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/gallerij" component={GalleryPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/overons" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/quote" component={QuotePage} />
            <Route path="/offerte" component={OffertePage} />
            
            {/* 404 fallback */}
            <Route>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <h1 className="text-2xl font-bold mb-4">Pagina niet gevonden</h1>
                  <p className="text-gray-600 mb-8">
                    De pagina die u zoekt bestaat niet of is tijdelijk niet beschikbaar.
                  </p>
                  <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Terug naar Home
                  </a>
                </div>
              </div>
            </Route>
          </Switch>
        </MobileLayoutWrapper>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppFixed;