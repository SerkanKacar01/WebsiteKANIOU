import { useState } from "react";
import { Cookie, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

interface CookieSettingsProps {
  trigger?: React.ReactNode;
  className?: string;
}

export function CookieSettings({
  trigger,
  className = "",
}: CookieSettingsProps) {
  const { consent, acceptCustom, hasConsented } = useCookieConsent();
  const [open, setOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent.analytics);
  const [marketingEnabled, setMarketingEnabled] = useState(consent.marketing);
  const { t } = useLanguage();

  const handleSavePreferences = () => {
    acceptCustom(analyticsEnabled, marketingEnabled);
    setOpen(false);
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className={`text-neutral-400 hover:text-secondary transition-colors text-sm p-0 h-auto font-normal ${className}`}
    >
      <Settings className="w-3 h-3 mr-1" />
      {t("cookies.settings.trigger") || "Cookie-instellingen"}
    </Button>
  );

  if (!hasConsented) {
    return null; // Don't show settings if user hasn't made initial consent choice
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-accent" />
            {t("Cookie - instellingen") || "Cookie-instellingen"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Status */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-text-light">
              <strong>
                {t("Huidige status:") || "Huidige status:"}
              </strong>{" "}
              {consent.status === "accepted" &&
                (t("Alle cookies zijn geaccepteerd") ||
                  "Alle cookies zijn geaccepteerd")}
              {consent.status === "declined" &&
                (t("Essentiële cookies") ||
                  "Alleen essentiële cookies zijn toegestaan")}
              {consent.status === "customized" &&
                (t("cookies.settings.customized") ||
                  "Aangepaste cookievoorkeuren actief")}
            </p>
          </div>

          {/* Essential Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-text-dark">
                  {t("Essentiële cookies") ||
                    "Essentiële Cookies"}
                </h4>
                <p className="text-sm text-text-light">
                  {t("Deze cookies zijn noodzakelijk voor het correct functioneren van de website en kunnen niet worden uitgeschakeld.") ||
                    "Noodzakelijk voor de correcte werking van de website. Deze cookies kunnen niet worden uitgeschakeld."}
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
                  {t("Analysecookies") ||
                    "Analytische cookies"}
                </h4>
                <p className="text-sm text-text-light">
                  {t("Deze cookies helpen ons te begrijpen hoe bezoekers de website gebruiken, zodat we de gebruikerservaring kunnen verbeteren.") ||
                    "Helpen ons inzicht te krijgen in hoe bezoekers met onze website omgaan, zodat we de prestaties en gebruikerservaring kunnen verbeteren."}
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
                  {t("Marketingcookies") ||
                    "Marketingcookies"}
                </h4>
                <p className="text-sm text-text-light">
                  {t("Deze cookies worden gebruikt om gepersonaliseerde advertenties te tonen en om de effectiviteit van marketingcampagnes te meten.") ||
                    "Worden gebruikt om gepersonaliseerde advertenties te tonen en de prestaties van marketingcampagnes te meten."}
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
            {t("Voorkeuren opslaan") || "Save Changes"}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="flex-1"
          >
            {t("Weigeren") || "Cancel"}
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-text-light text-center">
            {t("Je kunt je cookievoorkeuren op elk moment wijzigen via de link hieronder.") || "Read more in our"}{" "}
            <Link href="/cookie-policy" className="text-accent hover:underline">
              {t("Bekijk ons cookiebeleid") || "Cookie Policy"}
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
