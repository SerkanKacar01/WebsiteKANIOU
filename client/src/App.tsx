import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetail from "@/pages/ProductDetail";
import ProductPage from "@/pages/ProductPage";
import ProductCategoryPage from "@/pages/ProductCategoryPage";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";

function Router() {
  const [location] = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    if (location === "/") return "Elegant Drapes | Premium Gordijnen & Raambehandelingen";
    if (location === "/products") return "Browse Collection | Elegant Drapes";
    if (location === "/gallery") return "Inspiratie Galerij | Elegant Drapes";
    if (location === "/about") return "Over Ons | Elegant Drapes";
    if (location === "/contact") return "Neem Contact Op | Elegant Drapes";
    if (location === "/quote") return "Offerte Aanvragen | Elegant Drapes";
    if (location === "/privacy-policy") return "Privacybeleid | Elegant Drapes";
    if (location === "/terms-of-service") return "Servicevoorwaarden | Elegant Drapes";
    return "Elegant Drapes | Premium Gordijnen & Raambehandelingen";
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Premium Gordijnen & Raambehandelingen" />
      </Helmet>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products/:id(\d+)" component={ProductDetail} />
        
        {/* Specific product pages */}
        <Route path="/products/milano-linen-curtains" component={ProductPage} />
        <Route path="/products/nordic-roller-blinds" component={ProductPage} />
        <Route path="/products/tuscany-roman-blinds" component={ProductPage} />
        <Route path="/products/aria-sheer-curtains" component={ProductPage} />
        
        {/* Product category pages with exact URLs as specified */}
        <Route path="/products/overgordijnen" component={ProductCategoryPage} />
        <Route path="/products/vitrages" component={ProductCategoryPage} />
        <Route path="/products/rolgordijnen" component={ProductCategoryPage} />
        <Route path="/products/duo-rolgordijnen" component={ProductCategoryPage} />
        <Route path="/products/textiel-lamellen" component={ProductCategoryPage} />
        <Route path="/products/kunststof-lamellen" component={ProductCategoryPage} />
        <Route path="/products/houten-jaloezieen" component={ProductCategoryPage} />
        <Route path="/products/kunststof-jaloezieen" component={ProductCategoryPage} />
        <Route path="/products/textiel-raamfolie" component={ProductCategoryPage} />
        <Route path="/products/houten-shutters" component={ProductCategoryPage} />
        <Route path="/products/inzethorren" component={ProductCategoryPage} />
        <Route path="/products/opzethorren" component={ProductCategoryPage} />
        <Route path="/products/plisse-hordeuren" component={ProductCategoryPage} />
        <Route path="/products/plisse" component={ProductCategoryPage} />
        <Route path="/products/duo-plisse" component={ProductCategoryPage} />
        <Route path="/products/duo-plisse-dakramen" component={ProductCategoryPage} />
        <Route path="/products/dakraam-zonwering" component={ProductCategoryPage} />
        <Route path="/products/gordijnrails" component={ProductCategoryPage} />
        <Route path="/products/gordijnroedes" component={ProductCategoryPage} />
        <Route path="/products/squid" component={ProductCategoryPage} />
        
        {/* Products main page */}
        <Route path="/products" component={ProductsPage} />
        
        {/* The following handles product category pages */}
        <Route path="/products/:category" component={ProductCategoryPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/quote" component={QuotePage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  // Set Dutch as the fixed language
  useEffect(() => {
    document.documentElement.lang = 'nl';
    document.documentElement.dir = 'ltr';
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
