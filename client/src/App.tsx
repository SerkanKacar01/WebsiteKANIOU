import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";

import { useEffect, useState } from "react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import Footer from "@/components/layout/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";


import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";

import ProductCategoryPage from "@/pages/ProductCategoryPage";
import PriceCalculatorPage from "@/pages/PriceCalculatorPage";

import GalleryPage from "@/pages/GalleryPage";
import AdminGallery from "@/pages/AdminGallery";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import OffertePage from "@/pages/OffertePage";
import ActiesPage from "@/pages/ActiesPage";
import SmartQuote from "@/pages/SmartQuote";
import ColorMatcherPage from "@/pages/ColorMatcherPage";
import CustomizationWizardPage from "@/pages/CustomizationWizardPage";
import VirtualRoomPreview from "@/pages/VirtualRoomPreview";
import InventoryAlerts from "@/pages/InventoryAlerts";
import Admin from "@/pages/Admin";
import { Product360Demo } from "@/components/Product360Demo";
import { RewardsSystem } from "@/components/RewardsSystem";
import { SmartRecommendationEngine } from "@/components/SmartRecommendationEngine";

import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import BusinessPage from "@/pages/BusinessPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
import CleaningProductsPage from "@/pages/CleaningProductsPage";
import BedanktPage from "@/pages/BedanktPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminLoginTest from "@/pages/AdminLoginTest";
import EntrepreneurDashboardPage from "@/pages/EntrepreneurDashboardPage";
import SecureOrderTrackingPage from "@/pages/SecureOrderTrackingPage";
import AfspraakPage from "@/pages/AfspraakPage";

// Simple Product Pages
import PlissesPage from "@/pages/products/plisses";
import DuoPlissesPage from "@/pages/products/duo-plisses";
import RolgordijnenSimplePage from "@/pages/products/rolgordijnen-simple";
import DuoRolgordijnenPage from "@/pages/products/duo-rolgordijnen-simple";
import OvergordijnenSimplePage from "@/pages/products/overgordijnen-simple";
import GordijnrailsSimplePage from "@/pages/products/gordijnrails-simple";
import VitragesSimplePage from "@/pages/products/vitrages-simple";
import HoutenShuttersSimplePage from "@/pages/products/houten-shutters-simple";
import HoutenJaloezieeenSimplePage from "@/pages/products/houten-jaloezieen-simple";
import TextielLamellenSimplePage from "@/pages/products/textiel-lamellen-simple";
import KunststofJaloezieeenSimplePage from "@/pages/products/kunststof-jaloezieen-simple";
import KunststofLamellenSimplePage from "@/pages/products/kunststof-lamellen-simple";
import SquidTextielFoliePage from "@/pages/products/squid-textiel-folie";
import VouwgordijnenPage from "@/pages/products/vouwgordijnen";
import GordijnroedesPage from "@/pages/products/gordijnroedes";
import HorrenPage from "@/pages/products/horren";
import ScreenPage from "@/pages/products/screen";




function Router() {
  const { t } = useLanguage();
  const [location] = useLocation();
  
  // Enable scroll to top on route change
  useScrollToTop();

  // Get page title based on current route
  const getPageTitle = () => {
    if (location === "/") return t("app.title") + " | " + t("app.subtitle");

    if (location === "/gallery" || location === "/gallerij") return t("gallery.title") + " | " + t("app.title");
    if (location === "/about" || location === "/overons" || location === "/over-ons") return "Over ons | Kaniou Zilvernaald";
    if (location === "/contact") return t("contact.title") + " | " + t("app.title");
    if (location === "/quote") return t("quote.title") + " | " + t("app.title");
    if (location === "/offerte") return "Offerte aanvragen" + " | " + t("app.title");
    if (location === "/acties") return "Acties & Aanbiedingen" + " | " + t("app.title");

    if (location === "/zakelijk" || location === "/business") return "Business Solutions" + " | " + t("app.title");
    if (location === "/privacy-policy") return "Privacy Policy" + " | " + t("app.title");
    if (location === "/privacybeleid") return "📄 Privacybeleid" + " | " + t("app.title");
    if (location === "/terms-of-service") return "Terms of Service" + " | " + t("app.title");
    if (location === "/gebruiksvoorwaarden") return "📄 Gebruiksvoorwaarden" + " | " + t("app.title");
    if (location === "/algemene-voorwaarden") return "📄 Algemene Voorwaarden" + " | " + t("app.title");
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
        {/* Product categories - Disabled */}
        {/* Disabled shop route - redirect to home */}
        <Route path="/shop" component={() => {
          window.location.href = '/';
          return <div>Deze pagina is niet beschikbaar.</div>;
        }} />
        
        {/* All product category routes for both /products/ and /producten/ paths */}
        <Route path="/products/fly-screens" component={ProductCategoryPage} />

        <Route path="/products/overgordijnen" component={ProductCategoryPage} />
        <Route path="/products/squid-textiel-folie" component={SquidTextielFoliePage} />
        <Route path="/products/squid-textile-foil" component={SquidTextielFoliePage} />
        <Route path="/products/squid" component={SquidTextielFoliePage} />
        <Route path="/products/plisse" component={ProductCategoryPage} />
        <Route path="/products/jaloezieen" component={ProductCategoryPage} />
        
        {/* New /producten/ routes for all categories */}
        <Route path="/producten/overgordijnen" component={OvergordijnenSimplePage} />
        <Route path="/producten/vitrages" component={VitragesSimplePage} />
        <Route path="/producten/rolgordijnen" component={RolgordijnenSimplePage} />
        <Route path="/producten/duo-rolgordijnen" component={DuoRolgordijnenPage} />
        <Route path="/producten/textiel-lamellen" component={TextielLamellenSimplePage} />
        <Route path="/producten/kunststof-lamellen" component={KunststofLamellenSimplePage} />
        <Route path="/producten/jaloezieen" component={ProductCategoryPage} />
        <Route path="/producten/houten-jaloezieen" component={HoutenJaloezieeenSimplePage} />
        <Route path="/producten/kunststof-jaloezieen" component={KunststofJaloezieeenSimplePage} />
        <Route path="/producten/textiel-raamfolie" component={ProductCategoryPage} />
        <Route path="/producten/houten-shutters" component={HoutenShuttersSimplePage} />
        <Route path="/producten/inzethorren" component={ProductCategoryPage} />
        <Route path="/producten/opzethorren" component={ProductCategoryPage} />
        <Route path="/producten/plisse-hordeuren" component={ProductCategoryPage} />
        <Route path="/producten/plisse" component={PlissesPage} />
        <Route path="/producten/duo-plisse" component={DuoPlissesPage} />
        <Route path="/producten/vouwgordijnen" component={VouwgordijnenPage} />
        <Route path="/vouwgordijnen" component={VouwgordijnenPage} />
        <Route path="/producten/gordijnroedes" component={GordijnroedesPage} />
        <Route path="/gordijnroedes" component={GordijnroedesPage} />
        <Route path="/producten/horren" component={HorrenPage} />
        <Route path="/horren" component={HorrenPage} />
        <Route path="/producten/screen" component={ScreenPage} />
        <Route path="/screen" component={ScreenPage} />
        <Route path="/producten/dakraam-zonweringen" component={ProductCategoryPage} />
        <Route path="/producten/gordijnrails" component={GordijnrailsSimplePage} />

        <Route path="/producten/squid-textiel-folie" component={SquidTextielFoliePage} />
        <Route path="/producten/squid-textile-foil" component={SquidTextielFoliePage} />
        <Route path="/producten/squid" component={SquidTextielFoliePage} />
        <Route path="/squid" component={SquidTextielFoliePage} />
        <Route path="/producten/reiniging" component={CleaningProductsPage} />
        <Route path="/reiniging" component={CleaningProductsPage} />

        
        {/* Handle all other product category routes */}
        <Route path="/products/:category" component={ProductCategoryPage} />
        <Route path="/producten/:category" component={ProductCategoryPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallerij" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/overons" component={AboutPage} />
        <Route path="/over-ons" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/zakelijk" component={BusinessPage} />
        <Route path="/business" component={BusinessPage} />
        <Route path="/quote" component={QuotePage} />
        <Route path="/offerte" component={OffertePage} />
        <Route path="/afspraak" component={AfspraakPage} />
        <Route path="/acties" component={ActiesPage} />
        <Route path="/smart-quote" component={SmartQuote} />
        <Route path="/slimme-offerte" component={SmartQuote} />
        <Route path="/kleur-matcher" component={ColorMatcherPage} />
        <Route path="/color-matcher" component={ColorMatcherPage} />
        <Route path="/maatwerk-wizard" component={CustomizationWizardPage} />
        <Route path="/customization-wizard" component={CustomizationWizardPage} />
        <Route path="/virtual-room-preview" component={VirtualRoomPreview} />
        <Route path="/kamer-preview" component={VirtualRoomPreview} />
        <Route path="/inventory-alerts" component={InventoryAlerts} />
        <Route path="/voorraad-alerts" component={InventoryAlerts} />

        <Route path="/product-360-demo" component={Product360Demo} />
        <Route path="/rewards" component={RewardsSystem} />
        <Route path="/recommendations" component={SmartRecommendationEngine} />

        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/privacybeleid" component={PrivacyPolicyPage} />
        <Route path="/cookiebeleid" component={CookiePolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/gebruiksvoorwaarden" component={TermsOfServicePage} />
        <Route path="/algemene-voorwaarden" component={TermsOfServicePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/payment/success" component={PaymentSuccessPage} />
        <Route path="/bedankt" component={BedanktPage} />
        
        
        {/* Hidden Admin Routes */}
        <Route path="/kaniouzilvernaald-dashboard" component={AdminLoginPage} />
        <Route path="/admin-login" component={AdminLoginPage} />
        <Route path="/test-login" component={AdminLoginTest} />
        <Route path="/entrepreneur-dashboard" component={EntrepreneurDashboardPage} />
        
        {/* Secure Order Tracking for Customers */}
        <Route path="/bestelling-volgen" component={SecureOrderTrackingPage} />
        <Route path="/order-tracking" component={SecureOrderTrackingPage} />
        <Route path="/track-order" component={SecureOrderTrackingPage} />
        
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin" component={Admin} />

        <Route component={NotFound} />
      </Switch>
      <FloatingActionButtons />
      <Footer />
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
    <div className="min-h-screen bg-white">
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <MobileLayoutWrapper>
              <Router />
            </MobileLayoutWrapper>
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;