import { useState, useEffect } from "react";
import { Shield, BarChart3, Target, CheckCircle, XCircle, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";

export default function CookiePreferencesPage() {
  const { consent, acceptCustom, hasConsented } = useCookieConsent();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent.analytics);
  const [marketingEnabled, setMarketingEnabled] = useState(consent.marketing);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Get the referring page from session storage or default to home
  const getReferringPage = () => {
    return sessionStorage.getItem('cookiePreferencesReferrer') || '/';
  };

  // Store current referrer when component mounts
  useEffect(() => {
    // If user came directly to this page, store current referrer
    if (!sessionStorage.getItem('cookiePreferencesReferrer')) {
      sessionStorage.setItem('cookiePreferencesReferrer', document.referrer ? new URL(document.referrer).pathname : '/');
    }
  }, []);

  // Update local state when consent changes
  useEffect(() => {
    setAnalyticsEnabled(consent.analytics);
    setMarketingEnabled(consent.marketing);
  }, [consent]);

  // Track if there are unsaved changes
  useEffect(() => {
    const changes = analyticsEnabled !== consent.analytics || marketingEnabled !== consent.marketing;
    setHasChanges(changes);
  }, [analyticsEnabled, marketingEnabled, consent]);

  const handleSavePreferences = () => {
    acceptCustom(analyticsEnabled, marketingEnabled);
    setHasChanges(false);
    toast({
      title: "Voorkeuren opgeslagen",
      description: "Je cookievoorkeuren zijn succesvol bijgewerkt.",
    });
    
    // Navigate back immediately
    const referringPage = getReferringPage();
    sessionStorage.removeItem('cookiePreferencesReferrer');
    setLocation(referringPage);
  };

  const handleCancel = () => {
    setAnalyticsEnabled(consent.analytics);
    setMarketingEnabled(consent.marketing);
    setHasChanges(false);
    
    // Navigate back immediately on cancel
    const referringPage = getReferringPage();
    sessionStorage.removeItem('cookiePreferencesReferrer');
    setLocation(referringPage);
  };

  const getConsentStatusText = () => {
    if (!hasConsented) {
      return "Je hebt nog geen cookievoorkeuren ingesteld.";
    }
    
    if (consent.status === "accepted") {
      return "Je hebt alle cookies geaccepteerd.";
    } else if (consent.status === "declined") {
      return "Je hebt alleen essentiële cookies geaccepteerd.";
    } else if (consent.status === "customized") {
      const acceptedTypes = [];
      if (consent.analytics) acceptedTypes.push("analytische");
      if (consent.marketing) acceptedTypes.push("marketing");
      
      if (acceptedTypes.length === 0) {
        return "Je hebt alleen essentiële cookies geaccepteerd.";
      } else {
        return `Je hebt essentiële en ${acceptedTypes.join(" en ")} cookies geaccepteerd.`;
      }
    }
    return "Cookiestatus onbekend.";
  };

  const getConsentStatusIcon = () => {
    if (!hasConsented || consent.status === "declined") {
      return <XCircle className="w-5 h-5 text-orange-500" />;
    }
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold text-primary">Cookies beheren</h1>
          </div>
          <p className="text-lg text-text-medium max-w-2xl mx-auto">
            Beheer je cookievoorkeuren en bepaal zelf welke cookies we mogen gebruiken 
            om je ervaring op onze website te verbeteren.
          </p>
        </div>

        {/* Current Status */}
        <Alert className="mb-8 border-neutral-200">
          <div className="flex items-center gap-2">
            {getConsentStatusIcon()}
            <AlertDescription className="text-base font-medium">
              <strong>Huidige status:</strong> {getConsentStatusText()}
            </AlertDescription>
          </div>
        </Alert>

        {/* Cookie Categories */}
        <div className="space-y-6 mb-8">
          {/* Essential Cookies */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <CardTitle className="text-xl text-green-800">
                      Essentiële cookies
                    </CardTitle>
                    <CardDescription className="text-green-700 mt-1">
                      Altijd ingeschakeld - Vereist voor website functionaliteit
                    </CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={true} 
                  disabled={true}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-text-medium leading-relaxed">
                Deze cookies zijn noodzakelijk voor de basisfunctionaliteiten van de website, 
                zoals beveiliging, netwerkbeheer en toegankelijkheid. Ze zorgen ervoor dat je 
                veilig kunt browsen, formulieren kunt versturen en dat de website correct wordt 
                weergegeven. Deze cookies kunnen niet worden uitgeschakeld omdat ze essentieel 
                zijn voor de werking van onze website.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Voorbeelden van essentiële cookies:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Sessie-identificatie en authenticatie</li>
                  <li>• Beveiligings- en fraudepreventie</li>
                  <li>• Taalvoorkeuren en website-instellingen</li>
                  <li>• Winkelmand functionaliteit</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Cookies */}
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl text-primary">
                      Analytische cookies
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Helpen ons de website te verbeteren door gebruiksstatistieken
                    </CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-text-medium leading-relaxed mb-4">
                Deze cookies verzamelen geanonimiseerde informatie over hoe bezoekers onze 
                website gebruiken. We gebruiken deze gegevens om inzicht te krijgen in welke 
                pagina's het meest worden bezocht, hoe lang bezoekers op de site blijven, en 
                welke content het meest interessant is. Dit helpt ons om de gebruikerservaring 
                te verbeteren en onze website beter af te stemmen op uw behoeften.
              </p>
              <div className="p-3 bg-secondary/50 rounded-lg border border-primary/30">
                <h4 className="font-semibold text-primary mb-2">Wat we meten:</h4>
                <ul className="text-sm text-primary/80 space-y-1">
                  <li>• Aantal bezoekers en paginaweergaven</li>
                  <li>• Tijd doorgebracht op verschillende pagina's</li>
                  <li>• Meest bekeken producten en categorieën</li>
                  <li>• Technische prestaties van de website</li>
                  <li>• Populaire zoektermen en navigatiepatronen</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Marketing Cookies */}
          <Card className="border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  <div>
                    <CardTitle className="text-xl text-primary">
                      Marketingcookies
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Voor gepersonaliseerde advertenties en marketingcampagnes
                    </CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={marketingEnabled}
                  onCheckedChange={setMarketingEnabled}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-text-medium leading-relaxed mb-4">
                Deze cookies worden gebruikt om gepersonaliseerde advertenties te tonen op 
                basis van uw surfgedrag en interesses. Ze stellen ons in staat om relevante 
                content en aanbiedingen te presenteren, en om de effectiviteit van onze 
                marketingcampagnes te meten. Deze cookies kunnen ook worden gebruikt door 
                externe advertentiepartners om gerichte advertenties te tonen op andere websites.
              </p>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Hoe we marketing cookies gebruiken:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Gepersonaliseerde productaanbevelingen</li>
                  <li>• Gerichte advertenties op sociale media</li>
                  <li>• Retargeting van eerder bekeken producten</li>
                  <li>• Meting van advertentie-effectiviteit</li>
                  <li>• Segmentatie voor nieuwsbrieven en aanbiedingen</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleSavePreferences}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
          >
            Voorkeuren opslaan
          </Button>
          
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 px-8 py-3 text-lg"
          >
            Annuleren
          </Button>
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Aanvullende informatie
          </h3>
          <div className="space-y-3 text-text-medium">
            <p>
              <strong>Je kunt je voorkeuren op elk moment wijzigen</strong> door terug te keren naar deze pagina 
              via de link in de footer van onze website.
            </p>
            <p>
              <strong>Bewaartermijn:</strong> Je cookievoorkeuren worden 12 maanden bewaard in je browser. 
              Na deze periode vragen we opnieuw om je toestemming.
            </p>
            <p>
              Voor meer informatie over onze privacypraktijken en hoe we omgaan met je gegevens, 
              bekijk ons{" "}
              <Link href="/cookie-policy" className="text-accent hover:underline font-semibold">
                volledige cookiebeleid
              </Link>{" "}
              en onze{" "}
              <Link href="/privacy-policy" className="text-accent hover:underline font-semibold">
                privacyverklaring
              </Link>.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}