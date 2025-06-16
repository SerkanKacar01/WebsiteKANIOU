import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function CookiebotSetup() {
  const [cookiebotLoaded, setCookiebotLoaded] = useState(false);
  const [domainIdConfigured, setDomainIdConfigured] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    // Check if Cookiebot is properly configured
    const checkCookiebot = () => {
      if (window.Cookiebot) {
        setCookiebotLoaded(true);
        // Check if domain ID is configured (not placeholder)
        const scripts = document.querySelectorAll('script[data-cbid]');
        const hasValidId = Array.from(scripts).some(script => {
          const cbid = script.getAttribute('data-cbid');
          return cbid && cbid !== 'YOUR_COOKIEBOT_DOMAIN_GROUP_ID' && cbid.length > 10;
        });
        setDomainIdConfigured(hasValidId);
      }
    };

    checkCookiebot();
    const interval = setInterval(checkCookiebot, 1000);
    
    // Show setup panel if not properly configured
    setTimeout(() => {
      if (!cookiebotLoaded || !domainIdConfigured) {
        setShowSetup(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Only show for developers/admins when not properly configured
  if (!showSetup || (cookiebotLoaded && domainIdConfigured)) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 max-w-md z-50 bg-white border border-red-200 rounded-lg shadow-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-2">
            Cookiebot GDPR Setup Required
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              {cookiebotLoaded ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
              <span>Cookiebot Script</span>
              <Badge variant={cookiebotLoaded ? "default" : "destructive"}>
                {cookiebotLoaded ? "Loaded" : "Loading..."}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {domainIdConfigured ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
              <span>Domain ID</span>
              <Badge variant={domainIdConfigured ? "default" : "destructive"}>
                {domainIdConfigured ? "Configured" : "Placeholder"}
              </Badge>
            </div>

            {!domainIdConfigured && (
              <Alert>
                <AlertDescription className="text-xs">
                  <strong>Action Required:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Get Domain ID from Cookiebot dashboard</li>
                    <li>Replace placeholder in client/index.html</li>
                    <li>Enable Auto-blocking mode</li>
                  </ol>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open('https://manage.cookiebot.com/', '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Dashboard
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard('data-cbid="YOUR_ACTUAL_DOMAIN_GROUP_ID"')}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Fix
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowSetup(false)}
              >
                Hide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}