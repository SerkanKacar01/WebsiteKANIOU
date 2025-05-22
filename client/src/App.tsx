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
import ProductsPage from "@/pages/ProductsPage";
import ProductCategoryPage from "@/pages/ProductCategoryPage";
import PriceCalculatorPage from "@/pages/PriceCalculatorPage";
import GalleryPage from "@/pages/GalleryPage";
import AdminGallery from "@/pages/AdminGallery";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";

import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";

// Product pages with calculators
import RolgordijnenPage from "@/pages/products/rolgordijnen";
import OvergordijnenPage from "@/pages/products/overgordijnen";
import VitragesPage from "@/pages/products/vitrages";
import DuoRolgordijnen from "@/pages/products/duo-rolgordijnen";


// All product category pages
import VouwgordijnenPage from "@/pages/products/vouwgordijnen";
import TextielLamellenPage from "@/pages/products/textiel-lamellen";
import KunststofLamellenPage from "@/pages/products/kunststof-lamellen";
import KunststofJaloezieeenPage from "@/pages/products/kunststof-jaloezieen";
import HoutenShuttersPage from "@/pages/products/houten-shutters";
import InzethorrenPage from "@/pages/products/inzethorren";
import OpzethorrenPage from "@/pages/products/opzethorren";
import PlisseHordeurenPage from "@/pages/products/plisse-hordeuren";
import PlissePage from "@/pages/products/plisse";
import DuoPlissePage from "@/pages/products/duo-plisse";
import DakraamZonweringenPage from "@/pages/products/dakraam-zonweringen";
import GordijnrailsPage from "@/pages/products/gordijnrails";
import GordijnroedesPage from "@/pages/products/gordijnroedes";
import SquidTextielFoliePage from "@/pages/products/squid-textiel-folie";

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
    if (location === "/cookie-policy") return "Cookie Policy" + " | " + t("app.title");
    if (location === "/terms-of-service") return "Terms of Service" + " | " + t("app.title");
    if (location === "/disclaimer") return "Legal Disclaimer" + " | " + t("app.title");
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
        {/* Product pages with calculators - specific routes first */}
        <Route path="/products/rolgordijnen" component={RolgordijnenPage} />
        <Route path="/products/overgordijnen" component={OvergordijnenPage} />
        <Route path="/products/vitrages" component={VitragesPage} />

        {/* All individual product category pages - must come before generic routes */}
        <Route path="/products/vouwgordijnen" component={VouwgordijnenPage} />
        <Route path="/products/duo-rolgordijnen" component={DuoRolgordijnen} />

        {/* Generic routes after specific ones */}
        <Route path="/products" component={ProductsPage} />
        <Route path="/price-calculator" component={PriceCalculatorPage} />
        <Route path="/products/:id(\d+)" component={ProductDetail} />
        <Route path="/products/textiel-lamellen" component={TextielLamellenPage} />
        <Route path="/products/kunststof-lamellen" component={KunststofLamellenPage} />
        <Route path="/products/houten-jaloezieen" component={ProductCategoryPage} />
        <Route path="/products/kunststof-jaloezieen" component={KunststofJaloezieeenPage} />
        <Route path="/products/textiel-raamfolie" component={ProductCategoryPage} />
        <Route path="/products/houten-shutters" component={HoutenShuttersPage} />
        <Route path="/products/inzethorren" component={InzethorrenPage} />
        <Route path="/products/opzethorren" component={OpzethorrenPage} />
        <Route path="/products/plisse-hordeuren" component={PlisseHordeurenPage} />
        <Route path="/products/plisse" component={PlissePage} />
        <Route path="/products/duo-plisse" component={DuoPlissePage} />
        <Route path="/products/dakraam-zonwering" component={DakraamZonweringenPage} />
        <Route path="/products/gordijnrails" component={GordijnrailsPage} />
        <Route path="/products/gordijnroedes" component={GordijnroedesPage} />
        <Route path="/products/squid" component={SquidTextielFoliePage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallerij" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/overons" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/quote" component={QuotePage} />

        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/cookie-policy" component={CookiePolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
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