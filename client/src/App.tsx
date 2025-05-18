import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import ProductCategoryPage from "@/pages/ProductCategoryPage";
import GalleryPage from "@/pages/GalleryPage";
import AdminGallery from "@/pages/AdminGallery";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import PriceCalculatorPage from "@/pages/PriceCalculatorPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";

// Product pages with calculators
import OvergordijnenPage from "@/pages/products/overgordijnen";
import RolgordijnenPage from "@/pages/products/rolgordijnen";

function Router() {
  const { t } = useLanguage();
  const [location] = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    if (location === "/") return t("app.title") + " | " + t("app.subtitle");
    if (location === "/gallery") return t("gallery.title") + " | " + t("app.title");
    if (location === "/about") return t("about.title") + " | " + t("app.title");
    if (location === "/contact") return t("contact.title") + " | " + t("app.title");
    if (location === "/quote") return t("quote.title") + " | " + t("app.title");
    if (location === "/privacy-policy") return "Privacy Policy" + " | " + t("app.title");
    if (location === "/terms-of-service") return "Terms of Service" + " | " + t("app.title");
    return t("app.title") + " | " + t("app.subtitle");
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={t("app.subtitle")} />
      </Helmet>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products/:id(\d+)" component={ProductDetail} />
        
        {/* Product pages with calculators */}
        <Route path="/products/overgordijnen" component={OvergordijnenPage} />
        <Route path="/products/rolgordijnen" component={RolgordijnenPage} />
        
        {/* Other product category pages */}
        <Route path="/products/vitrages" component={ProductCategoryPage} />
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
        <Route path="/products/horren" component={ProductCategoryPage} />
        <Route path="/products/squid" component={ProductCategoryPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallerij" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/overons" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/quote" component={QuotePage} />
        <Route path="/price-calculator" component={PriceCalculatorPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const { language } = useLanguage();
  
  // Update language-specific metadata
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16 md:pt-12">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
