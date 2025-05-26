import { useState, useEffect } from "react";
import { X, Cookie, Shield, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CookiePreferencesModal({ open, onOpenChange }: CookiePreferencesModalProps) {
  const { consent, acceptAll, declineAll, acceptCustom } = useCookieConsent();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent.analytics);
  const [marketingEnabled, setMarketingEnabled] = useState(consent.marketing);

  // Update local state when consent changes
  useEffect(() => {
    setAnalyticsEnabled(consent.analytics);
    setMarketingEnabled(consent.marketing);
  }, [consent]);

  const handleAcceptAll = () => {
    acceptAll();
    onOpenChange(false);
  };

  const handleDeclineAll = () => {
    declineAll();
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    onOpenChange(false);
  };

  const handleSavePreferences = () => {
    acceptCustom(analyticsEnabled, marketingEnabled);
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to current consent state
    setAnalyticsEnabled(consent.analytics);
    setMarketingEnabled(consent.marketing);
    onOpenChange(false);
  };

  // Focus trap and accessibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleCancel();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-neutral-200 shadow-xl"
        aria-describedby="cookie-preferences-description"
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-primary">
            <Cookie className="w-6 h-6 text-accent" />
            Cookievoorkeuren
          </DialogTitle>
        </DialogHeader>

        <div id="cookie-preferences-description" className="space-y-6">
          {/* Introduction */}
          <div className="text-text-medium leading-relaxed">
            <p>
              Wij gebruiken cookies om uw ervaring te verbeteren, het verkeer op onze website te analyseren 
              en u relevante inhoud en advertenties aan te bieden. U kunt hieronder aangeven welke soorten 
              cookies u toestaat. Essentiële cookies zijn altijd actief, omdat ze noodzakelijk zijn voor 
              de werking van de website.
            </p>
          </div>

          <Separator className="bg-neutral-200" />

          {/* Essential Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-primary">
                  Essentiële cookies
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium">Altijd ingeschakeld</span>
                <Switch 
                  checked={true} 
                  disabled={true}
                  aria-label="Essentiële cookies - altijd ingeschakeld"
                />
              </div>
            </div>
            <p className="text-text-medium text-sm leading-relaxed pl-8">
              Noodzakelijk voor de basisfunctionaliteiten van de website, zoals beveiliging, 
              netwerkbeheer en toegankelijkheid. Deze cookies kunnen niet worden uitgeschakeld.
            </p>
          </div>

          <Separator className="bg-neutral-100" />

          {/* Analytics Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-primary">
                  Analytische cookies
                </h3>
              </div>
              <Switch 
                checked={analyticsEnabled}
                onCheckedChange={setAnalyticsEnabled}
                aria-label="Analytische cookies in- of uitschakelen"
              />
            </div>
            <p className="text-text-medium text-sm leading-relaxed pl-8">
              Helpen ons te begrijpen hoe bezoekers onze website gebruiken door anonieme informatie 
              te verzamelen. Zo kunnen we onze site verbeteren en beter afstemmen op uw behoeften.
            </p>
          </div>

          <Separator className="bg-neutral-100" />

          {/* Marketing Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-primary">
                  Marketingcookies
                </h3>
              </div>
              <Switch 
                checked={marketingEnabled}
                onCheckedChange={setMarketingEnabled}
                aria-label="Marketingcookies in- of uitschakelen"
              />
            </div>
            <p className="text-text-medium text-sm leading-relaxed pl-8">
              Worden gebruikt om gepersonaliseerde advertenties te tonen op basis van uw surfgedrag, 
              en om de effectiviteit van advertentiecampagnes te meten.
            </p>
          </div>

          <Separator className="bg-neutral-200" />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <Button
              onClick={handleAcceptAll}
              className="bg-accent hover:bg-accent/90 text-white font-medium"
              aria-label="Alle cookies accepteren"
            >
              Alles accepteren
            </Button>
            
            <Button
              onClick={handleDeclineAll}
              variant="outline"
              className="border-neutral-300 hover:bg-neutral-50 font-medium"
              aria-label="Alle optionele cookies weigeren"
            >
              Alles weigeren
            </Button>
            
            <Button
              onClick={handleSavePreferences}
              className="bg-primary hover:bg-primary/90 text-white font-medium"
              aria-label="Huidige voorkeuren opslaan"
            >
              Voorkeuren opslaan
            </Button>
            
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="hover:bg-neutral-100 font-medium"
              aria-label="Annuleren zonder wijzigingen op te slaan"
            >
              Annuleren
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}