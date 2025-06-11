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
import { ChatbotWidget } from "@/components/chatbot/ChatWidget";

import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";

import ProductCategoryPage from "@/pages/ProductCategoryPage";
import PriceCalculatorPage from "@/pages/PriceCalculatorPage";
import GalleryPage from "@/pages/GalleryPage";
import AdminGallery from "@/pages/AdminGallery";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
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
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import CookiePreferencesPage from "@/pages/CookiePreferencesPage";
import BusinessPage from "@/pages/BusinessPage";

// Product pages with calculators
import RolgordijnenPage from "@/pages/products/rolgordijnen";
import OvergordijnenPage from "@/pages/products/overgordijnen";
import VitragesPage from "@/pages/products/vitrages";
import DuoRolgordijnen from "@/pages/products/duo-rolgordijnen";
import FlyScreenProduct from "@/pages/FlyScreenProduct";

// All product category pages
import VouwgordijnenPage from "@/pages/products/vouwgordijnen";
import TextielLamellenPage from "@/pages/products/textiel-lamellen";
import KunststofLamellenPage from "@/pages/products/kunststof-lamellen";
import HoutenJaloezieeenPage from "@/pages/products/houten-jaloezieen";
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
  
  // Enable scroll to top on route change
  useScrollToTop();

  // Get page title based on current route
  const getPageTitle = () => {
    if (location === "/") return t("app.title") + " | " + t("app.subtitle");
    if (location === "/products/clamp-mounted-fly-screen") return "Clamp-Mounted Fly Screen" + " | " + t("app.title");
    if (location === "/gallery") return t("gallery.title") + " | " + t("app.title");
    if (location === "/about") return t("about.title") + " | " + t("app.title");
    if (location === "/contact") return t("contact.title") + " | " + t("app.title");
    if (location === "/quote") return t("quote.title") + " | " + t("app.title");

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
        {/* Redirect all product routes to the main product */}
        <Route path="/products" component={() => { window.location.href = '/products/clamp-mounted-fly-screen'; return null; }} />
        <Route path="/producten" component={() => { window.location.href = '/products/clamp-mounted-fly-screen'; return null; }} />
        <Route path="/shop" component={() => { window.location.href = '/products/clamp-mounted-fly-screen'; return null; }} />
        {/* Product pages with calculators - specific routes first */}
        <Route path="/products/rolgordijnen" component={RolgordijnenPage} />
        <Route path="/products/overgordijnen" component={OvergordijnenPage} />
        <Route path="/products/vitrages" component={VitragesPage} />

        {/* All individual product category pages - must come before generic routes */}
        <Route path="/products/vouwgordijnen" component={VouwgordijnenPage} />
        <Route path="/products/duo-rolgordijnen" component={DuoRolgordijnen} />
        <Route path="/products/clamp-mounted-fly-screen" component={FlyScreenProduct} />
        <Route path="/products/fly-screen-clamp-frame" component={() => { window.location.href = '/products/clamp-mounted-fly-screen'; return null; }} />

        {/* Specific product pages first, then generic routes */}
        <Route path="/price-calculator" component={PriceCalculatorPage} />
        <Route path="/products/textiel-lamellen" component={TextielLamellenPage} />
        <Route path="/products/kunststof-lamellen" component={KunststofLamellenPage} />
        <Route path="/products/houten-jaloezieen" component={HoutenJaloezieeenPage} />
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
        <Route path="/products/:id(\d+)" component={ProductDetail} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallerij" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/overons" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/zakelijk" component={BusinessPage} />
        <Route path="/business" component={BusinessPage} />
        <Route path="/quote" component={QuotePage} />
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
        <Route path="/cookie-policy" component={CookiePolicyPage} />
        <Route path="/cookie-preferences" component={CookiePreferencesPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin/chatbot" component={Admin} />

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
        <ChatbotWidget />
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