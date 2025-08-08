import { useState, useEffect } from "react";
import { Cookie, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";
import { useLanguage } from "@/context/LanguageContext";

export function CookieConsentBanner() {
  const { showBanner, acceptAll, declineAll } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [cookiebotLoaded, setCookiebotLoaded] = useState(false);
  const { t } = useLanguage();

  // Force banner to show if no consent exists
  useEffect(() => {
    const checkCookiebot = () => {
      if (window.Cookiebot) {
        setCookiebotLoaded(true);
        // Check if there's existing consent
        const hasConsent = document.cookie.includes('CookieConsent=');
        if (!hasConsent) {
          // Force show Cookiebot banner if no consent
          try {
            if (window.Cookiebot.show) {
              window.Cookiebot.show();
            }
          } catch (error) {
            console.log('Could not show Cookiebot banner, showing fallback');
            setCookiebotLoaded(false); // Show our custom banner instead
          }
        }
      }
    };

    checkCookiebot();
    
    // Poll for Cookiebot
    const interval = setInterval(checkCookiebot, 500);
    
    // Cleanup after 10 seconds
    setTimeout(() => clearInterval(interval), 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Force show banner for testing - remove this line in production
  // Always show our banner if no consent exists, regardless of Cookiebot status
  const hasConsent = document.cookie.includes('CookieConsent=');
  
  // TEMPORARY: Force show banner for testing (remove after testing)
  const forceShow = window.location.search.includes('show-cookie-banner') || !hasConsent;
  
  if (hasConsent && !forceShow) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="cookie-consent-banner-mobile fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4 md:gap-4 flex-col md:flex-row">
            <Cookie className="w-6 h-6 text-accent mt-1 flex-shrink-0 hidden md:block" />
            <div className="flex-1 w-full">
              <h3 className="font-semibold text-lg mb-2 text-primary">
                {t("Wij respecteren uw privacy") || "Wij gebruiken cookies"}
              </h3>
              <p className="text-text-medium mb-4 leading-relaxed text-sm md:text-base">
                {t(
                  "Deze website maakt gebruik van cookies om uw surfervaring te verbeteren, statistieken te verzamelen en u relevante content te tonen. U kunt uw voorkeuren op elk moment aanpassen.",
                ) ||
                  "Wij gebruiken cookies om uw ervaring op onze website te verbeteren. Sommige cookies zijn essentieel voor de werking van de website, terwijl andere ons helpen de site te verbeteren en gepersonaliseerde content aan te bieden."}{" "}
                <a
                  href="/cookie-policy"
                  className="text-accent hover:underline"
                >
                  {t("Meer informatie vindt u in ons cookiebeleid.") ||
                    "Lees meer"}
                </a>
              </p>
              <div className="flex flex-wrap gap-3 md:flex-row flex-col">
                <Button
                  onClick={acceptAll}
                  className="bg-accent hover:bg-accent/90 text-white w-full md:w-auto min-h-[48px] md:min-h-auto"
                >
                  {t("Alle cookies accepteren") || "Alles accepteren"}
                </Button>
                <Button
                  onClick={declineAll}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 w-full md:w-auto min-h-[48px] md:min-h-auto"
                >
                  {t("Alleen essentiële cookies toestaan") || "Alles weigeren"}
                </Button>
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 inline-flex items-center gap-2 w-full md:w-auto min-h-[48px] md:min-h-auto justify-center"
                >
                  <Settings className="w-4 h-4" />
                  {t("Beheer cookievoorkeuren") || "Beheer voorkeuren"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        open={showPreferences}
        onOpenChange={setShowPreferences}
      />
    </>
  );
}
