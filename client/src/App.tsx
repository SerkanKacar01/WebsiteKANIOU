import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { CookiebotSetup } from "@/components/CookiebotSetup";


import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import ProductsPage from "@/pages/ProductsPage";

import ProductCategoryPage from "@/pages/ProductCategoryPage";
import PriceCalculatorPage from "@/pages/PriceCalculatorPage";
import GordijnrailsConfiguratorPage from "@/pages/GordijnrailsConfiguratorPage";
import SquidConfiguratorPage from "@/pages/SquidConfiguratorPage";
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
import { OnboardingWizard } from "@/components/OnboardingWizard";

import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import CookiePolicy from "@/pages/CookiePolicy";
import CookiePreferencesPage from "@/pages/CookiePreferencesPage";
import BusinessPage from "@/pages/BusinessPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
import BedanktPage from "@/pages/BedanktPage";



function Router() {
  const { t } = useLanguage();
  const [location] = useLocation();
  
  // Enable scroll to top on route change
  useScrollToTop();

  // Get page title based on current route
  const getPageTitle = () => {
    if (location === "/") return t("app.title") + " | " + t("app.subtitle");

    if (location === "/producten" || location === "/products" || location === "/shop") return "Premium Raamdecoratie - Shop" + " | " + t("app.title");
    if (location === "/gallery" || location === "/gallerij") return t("gallery.title") + " | " + t("app.title");
    if (location === "/about" || location === "/overons") return t("about.title") + " | " + t("app.title");
    if (location === "/contact") return t("contact.title") + " | " + t("app.title");
    if (location === "/quote") return t("quote.title") + " | " + t("app.title");
    if (location === "/offerte") return "Offerte aanvragen" + " | " + t("app.title");
    if (location === "/acties") return "Acties & Aanbiedingen" + " | " + t("app.title");

    if (location === "/zakelijk" || location === "/business") return "Business Solutions" + " | " + t("app.title");
    if (location === "/privacy-policy") return "Privacy Policy" + " | " + t("app.title");
    if (location === "/cookie-policy") return "Cookie Policy" + " | " + t("app.title");
    if (location === "/cookie-preferences") return "Cookies beheren" + " | " + t("app.title");
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
        {/* Product categories */}
        <Route path="/products" component={ProductsPage} />
        <Route path="/producten" component={ProductsPage} />
        <Route path="/shop" component={ProductsPage} />
        
        {/* All product category routes for both /products/ and /producten/ paths */}
        <Route path="/products/fly-screens" component={ProductCategoryPage} />
        <Route path="/products/rolgordijnen" component={ProductCategoryPage} />
        <Route path="/products/overgordijnen" component={ProductCategoryPage} />
        <Route path="/products/plisse" component={ProductCategoryPage} />
        <Route path="/products/jaloezieen" component={ProductCategoryPage} />
        
        {/* New /producten/ routes for all 20 categories */}
        <Route path="/producten/overgordijnen" component={ProductCategoryPage} />
        <Route path="/producten/vitrages" component={ProductCategoryPage} />
        <Route path="/producten/rolgordijnen" component={ProductCategoryPage} />
        <Route path="/producten/duo-rolgordijnen" component={ProductCategoryPage} />
        <Route path="/producten/textiel-lamellen" component={ProductCategoryPage} />
        <Route path="/producten/kunststof-lamellen" component={ProductCategoryPage} />
        <Route path="/producten/houten-jaloezieen" component={ProductCategoryPage} />
        <Route path="/producten/kunststof-jaloezieen" component={ProductCategoryPage} />
        <Route path="/producten/textiel-raamfolie" component={ProductCategoryPage} />
        <Route path="/producten/houten-shutters" component={ProductCategoryPage} />
        <Route path="/producten/horren" component={ProductCategoryPage} />
        <Route path="/producten/inzethorren" component={ProductCategoryPage} />
        <Route path="/producten/opzethorren" component={ProductCategoryPage} />
        <Route path="/producten/plisse-hordeuren" component={ProductCategoryPage} />
        <Route path="/producten/plisse" component={ProductCategoryPage} />
        <Route path="/producten/duo-plisse" component={ProductCategoryPage} />
        <Route path="/producten/dakraam-zonweringen" component={ProductCategoryPage} />
        <Route path="/producten/gordijnrails" component={ProductCategoryPage} />
        <Route path="/producten/gordijnrails/configurator" component={GordijnrailsConfiguratorPage} />
        <Route path="/gordijnrails-configurator" component={GordijnrailsConfiguratorPage} />
        <Route path="/producten/gordijnroedes" component={ProductCategoryPage} />
        <Route path="/producten/squid" component={ProductCategoryPage} />
        <Route path="/shop/squid-samenstellen" component={SquidConfiguratorPage} />
        <Route path="/squid-configurator" component={SquidConfiguratorPage} />
        
        {/* Handle all other product category routes */}
        <Route path="/products/:category" component={ProductCategoryPage} />
        <Route path="/producten/:category" component={ProductCategoryPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallerij" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/overons" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/zakelijk" component={BusinessPage} />
        <Route path="/business" component={BusinessPage} />
        <Route path="/quote" component={QuotePage} />
        <Route path="/offerte" component={OffertePage} />
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
        <Route path="/onboarding" component={() => {
          // Manual onboarding trigger for testing
          return (
            <OnboardingWizard 
              onComplete={() => {
                localStorage.setItem('kaniou_onboarding_completed', 'true');
                window.location.href = '/';
              }}
              onSkip={() => {
                localStorage.setItem('kaniou_onboarding_skipped', 'true');
                window.location.href = '/';
              }}
            />
          );
        }} />

        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/cookie-preferences" component={CookiePreferencesPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/payment/success" component={PaymentSuccessPage} />
        <Route path="/bedankt" component={BedanktPage} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin" component={Admin} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const { language } = useLanguage();
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  // Check if user should see onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('kaniou_onboarding_completed');
    const hasVisitedBefore = localStorage.getItem('kaniou_has_visited');
    
    // Show onboarding for completely new users
    if (!hasCompletedOnboarding && !hasVisitedBefore) {
      setShouldShowOnboarding(true);
      localStorage.setItem('kaniou_has_visited', 'true');
    }
  }, []);

  // Update language-specific metadata
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const handleOnboardingComplete = () => {
    setShouldShowOnboarding(false);
    localStorage.setItem('kaniou_onboarding_completed', 'true');
  };

  const handleOnboardingSkip = () => {
    setShouldShowOnboarding(false);
    localStorage.setItem('kaniou_onboarding_skipped', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MobileLayoutWrapper>
          <Router />
        </MobileLayoutWrapper>
        <CookieConsentBanner />
        <CookiebotSetup />

        {shouldShowOnboarding && (
          <OnboardingWizard 
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;