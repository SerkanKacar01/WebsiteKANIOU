import { useState } from "react";
import { X, Cookie, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

export function CookieConsentBanner() {
  const { showBanner, acceptAll, declineAll, acceptCustom } =
    useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const { t } = useLanguage();

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    acceptCustom(analyticsEnabled, marketingEnabled);
    setShowPreferences(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            <Cookie className="w-6 h-6 text-accent mt-1 flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text-dark mb-2">
                {t("Wij gebruiken cookies") ||
                  "Wij hechten waarde aan uw privacy"}
              </h3>
              <p className="text-sm text-text-light mb-4 leading-relaxed">
                {t(
                  "We gebruiken cookies om je ervaring te verbeteren, websiteverkeer te analyseren en gepersonaliseerde inhoud te tonen. Je kunt zelf kiezen welke cookies je toestaat.",
                ) || ""}{" "}
                <Link
                  href="/cookie-policy"
                  className="text-accent hover:underline inline-flex items-center gap-1"
                >
                  {t("Meer informatie in ons cookiebeleid") || "Learn more"}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={acceptAll}
                  className="bg-accent hover:bg-accent/90 text-white px-6"
                >
                  {t("Alles accepteren") || "Accept All"}
                </Button>

                <Button
                  onClick={declineAll}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  {t("Weigeren") || "Decline"}
                </Button>

                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 inline-flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  {t("Voorkeuren beheren") || "Manage Preferences"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-accent" />
              {t("Cookievoorkeuren") || "Cookie Preferences"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-text-dark">
                    {t("Essentiële cookies") || "Essential Cookies"}
                  </h4>
                  <p className="text-sm text-text-light">
                    {t(
                      "Noodzakelijk voor de correcte werking van de website. Deze cookies kunnen niet worden uitgeschakeld.",
                    ) ||
                      "Required for the website to function properly. Cannot be disabled."}
                  </p>
                </div>
                <Switch checked={true} disabled className="ml-3" />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-text-dark">
                    {t("nalytische cookies") || "Analytics Cookies"}
                  </h4>
                  <p className="text-sm text-text-light">
                    {t("cookies.preferences.analytics.description") ||
                      "Deze cookies verzamelen geanonimiseerde gegevens over het gebruik van de website met als doel de functionaliteit en efficiëntie van onze online dienstverlening te verbeteren."}
                  </p>
                </div>
                <Switch
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="ml-3"
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-text-dark">
                    {t("Marketingcookies") || "Marketing Cookies"}
                  </h4>
                  <p className="text-sm text-text-light">
                    {t("cookies.preferences.marketing.description") ||
                      "Deze cookies stellen ons in staat om advertenties af te stemmen op uw interesses en om inzicht te krijgen in de effectiviteit van onze promotionele activiteiten."}
                  </p>
                </div>
                <Switch
                  checked={marketingEnabled}
                  onCheckedChange={setMarketingEnabled}
                  className="ml-3"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-accent hover:bg-accent/90 text-white"
            >
              {t("cookies.preferences.savePreferences") || "Voorkeuren opslaan"}
            </Button>
            <Button
              onClick={() => setShowPreferences(false)}
              variant="outline"
              className="flex-1"
            >
              {t("cookies.preferences.cancel") || "Annuleren"}
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-text-light text-center">
              {t("cookies.preferences.footer") ||
                "U kunt deze instellingen op elk moment aanpassen via onze cookie-instellingenpagina."}{" "}
              <Link
                href="/cookie-policy"
                className="text-accent hover:underline"
              >
                {t("cookies.preferences.cookiePolicy") || "Cookie Beleid"}
              </Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
