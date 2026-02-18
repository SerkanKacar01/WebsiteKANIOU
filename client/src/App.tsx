import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";

import { useEffect } from "react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import Footer from "@/components/layout/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";

import Home from "@/pages/Home";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import OffertePage from "@/pages/OffertePage";
import ActiesPage from "@/pages/ActiesPage";
import PrijzenPage from "@/pages/PrijzenPage";
import BusinessPage from "@/pages/BusinessPage";
import CleaningProductsPage from "@/pages/CleaningProductsPage";
import AfspraakPage from "@/pages/AfspraakPage";
import BedanktPage from "@/pages/BedanktPage";

import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import DisclaimerPage from "@/pages/DisclaimerPage";

import AdminLoginPage from "@/pages/AdminLoginPage";
import EntrepreneurDashboardPage from "@/pages/EntrepreneurDashboardPage";
import AdminGallery from "@/pages/AdminGallery";
import SecureOrderTrackingPage from "@/pages/SecureOrderTrackingPage";

import PlissesPage from "@/pages/products/plisses";
import DuoPlissesPage from "@/pages/products/duo-plisses";
import RolgordijnenPage from "@/pages/products/rolgordijnen-simple";
import DuoRolgordijnenPage from "@/pages/products/duo-rolgordijnen-simple";
import OvergordijnenPage from "@/pages/products/overgordijnen-simple";
import GordijnrailsPage from "@/pages/products/gordijnrails-simple";
import VitragesPage from "@/pages/products/vitrages-simple";
import HoutenShuttersPage from "@/pages/products/houten-shutters-simple";
import HoutenJaloezieeenPage from "@/pages/products/houten-jaloezieen-simple";
import TextielLamellenPage from "@/pages/products/textiel-lamellen-simple";
import KunststofJaloezieeenPage from "@/pages/products/kunststof-jaloezieen-simple";
import KunststofLamellenPage from "@/pages/products/kunststof-lamellen-simple";
import SquidTextielFoliePage from "@/pages/products/squid-textiel-folie";
import VouwgordijnenPage from "@/pages/products/vouwgordijnen";
import GordijnroedesPage from "@/pages/products/gordijnroedes";
import HorrenPage from "@/pages/products/horren";
import ScreenPage from "@/pages/products/screen";
import ScreensInsidePage from "@/pages/products/screens-inside";
import ScreensOutsidePage from "@/pages/products/screens-outside";

function Router() {
  const { t } = useLanguage();
  const [location] = useLocation();

  useScrollToTop();

  const getPageTitle = () => {
    if (location === "/") return t("app.title") + " | " + t("app.subtitle");
    if (location === "/gallery" || location === "/gallerij") return "Galerij | KANIOU Zilvernaald";
    if (location === "/about" || location === "/over-ons") return "Over Ons | KANIOU Zilvernaald";
    if (location === "/contact") return "Contact | KANIOU Zilvernaald";
    if (location === "/offerte") return "Offerte Aanvragen | KANIOU Zilvernaald";
    if (location === "/prijzen") return "Prijsoverzicht | KANIOU Zilvernaald";
    if (location === "/acties") return "Acties & Aanbiedingen | KANIOU Zilvernaald";
    if (location === "/zakelijk") return "Zakelijk | KANIOU Zilvernaald";
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

        {/* Product Pages */}
        <Route path="/producten/overgordijnen" component={OvergordijnenPage} />
        <Route path="/producten/vitrages" component={VitragesPage} />
        <Route path="/producten/rolgordijnen" component={RolgordijnenPage} />
        <Route path="/producten/duo-rolgordijnen" component={DuoRolgordijnenPage} />
        <Route path="/producten/plisse" component={PlissesPage} />
        <Route path="/producten/duo-plisses" component={DuoPlissesPage} />
        <Route path="/producten/textiel-lamellen" component={TextielLamellenPage} />
        <Route path="/producten/kunststof-lamellen" component={KunststofLamellenPage} />
        <Route path="/producten/houten-jaloezieen" component={HoutenJaloezieeenPage} />
        <Route path="/producten/kunststof-jaloezieen" component={KunststofJaloezieeenPage} />
        <Route path="/producten/houten-shutters" component={HoutenShuttersPage} />
        <Route path="/producten/vouwgordijnen" component={VouwgordijnenPage} />
        <Route path="/producten/gordijnrails" component={GordijnrailsPage} />
        <Route path="/producten/gordijnroedes" component={GordijnroedesPage} />
        <Route path="/producten/horren" component={HorrenPage} />
        <Route path="/producten/screen" component={ScreenPage} />
        <Route path="/producten/screens-inside" component={ScreensInsidePage} />
        <Route path="/producten/screens-outside" component={ScreensOutsidePage} />
        <Route path="/producten/squid-textiel-folie" component={SquidTextielFoliePage} />
        <Route path="/producten/reiniging" component={CleaningProductsPage} />

        {/* Main Pages */}
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallerij" component={GalleryPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/over-ons" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/zakelijk" component={BusinessPage} />
        <Route path="/quote" component={QuotePage} />
        <Route path="/offerte" component={OffertePage} />
        <Route path="/prijzen" component={PrijzenPage} />
        <Route path="/afspraak" component={AfspraakPage} />
        <Route path="/acties" component={ActiesPage} />
        <Route path="/bedankt" component={BedanktPage} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/privacybeleid" component={PrivacyPolicyPage} />
        <Route path="/cookiebeleid" component={CookiePolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/gebruiksvoorwaarden" component={TermsOfServicePage} />
        <Route path="/algemene-voorwaarden" component={TermsOfServicePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />

        {/* Admin Routes */}
        <Route path="/admin-login" component={AdminLoginPage} />
        <Route path="/kaniouzilvernaald-dashboard" component={AdminLoginPage} />
        <Route path="/entrepreneur-dashboard" component={EntrepreneurDashboardPage} />
        <Route path="/admin/gallery" component={AdminGallery} />

        {/* Order Tracking */}
        <Route path="/bestelling-volgen" component={SecureOrderTrackingPage} />
        <Route path="/order-tracking" component={SecureOrderTrackingPage} />

        <Route component={NotFound} />
      </Switch>
      <FloatingActionButtons />
      <Footer />
    </>
  );
}

function App() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <MobileLayoutWrapper>
            <Router />
          </MobileLayoutWrapper>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
