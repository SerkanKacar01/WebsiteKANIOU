import { useState, useEffect } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'declined' | 'customized';

export interface CookieConsentData {
  status: ConsentStatus;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

// Cookiebot integration
declare global {
  interface Window {
    Cookiebot?: {
      consent: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
      show: () => void;
      hide: () => void;
      renew: () => void;
      getScript: (src: string, async?: boolean, callback?: () => void) => void;
    };
    CookiebotCallback_OnAccept?: () => void;
    CookiebotCallback_OnDecline?: () => void;
    CookiebotCallback_OnDialogInit?: () => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

const STORAGE_KEY = 'cookie_consent';

const defaultConsent: CookieConsentData = {
  status: 'pending',
  essential: true, // Always true - required for site functionality
  analytics: false,
  marketing: false,
  timestamp: 0,
};

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentData>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Initialize Cookiebot callbacks with error handling
    const initializeCookiebot = () => {
      try {
        if (window.Cookiebot) {
          // Update our state based on Cookiebot consent
          const updateConsentFromCookiebot = () => {
            try {
              const cookiebotConsent = window.Cookiebot?.consent;
              if (cookiebotConsent) {
                const newConsent: CookieConsentData = {
                  status: 'accepted',
                  essential: cookiebotConsent.necessary,
                  analytics: cookiebotConsent.statistics,
                  marketing: cookiebotConsent.marketing,
                  timestamp: Date.now(),
                };
                setConsent(newConsent);
                setShowBanner(false);
                
                // Load scripts based on consent
                if (cookiebotConsent.statistics && !consent.analytics) {
                  loadAnalytics();
                }
                if (cookiebotConsent.marketing && !consent.marketing) {
                  loadMarketingScripts();
                }
              }
            } catch (error) {
              console.warn('Error updating consent from Cookiebot:', error);
            }
          };

          // Set up Cookiebot callbacks with error handling
          window.CookiebotCallback_OnAccept = updateConsentFromCookiebot;
          window.CookiebotCallback_OnDecline = updateConsentFromCookiebot;
          window.CookiebotCallback_OnDialogInit = () => {
            setShowBanner(false); // Hide our custom banner when Cookiebot is active
          };

          // Initial check
          updateConsentFromCookiebot();
        } else {
          // Fallback to localStorage if Cookiebot is not available
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            try {
              const parsedConsent = JSON.parse(stored) as CookieConsentData;
              setConsent(parsedConsent);
              setShowBanner(false);
            } catch (error) {
              console.error('Error parsing stored consent:', error);
              localStorage.removeItem(STORAGE_KEY);
              setShowBanner(true);
            }
          } else {
            setShowBanner(false); // Let Cookiebot handle the banner
          }
        }
      } catch (error) {
        console.warn('Error initializing Cookiebot:', error);
        // Fallback to localStorage if Cookiebot fails
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsedConsent = JSON.parse(stored) as CookieConsentData;
            setConsent(parsedConsent);
            setShowBanner(false);
          } catch (parseError) {
            localStorage.removeItem(STORAGE_KEY);
            setShowBanner(true);
          }
        } else {
          setShowBanner(true);
        }
      }
    };

    // Wait for Cookiebot to load
    if (window.Cookiebot) {
      initializeCookiebot();
    } else {
      // Poll for Cookiebot availability
      const checkCookiebot = setInterval(() => {
        if (window.Cookiebot) {
          clearInterval(checkCookiebot);
          initializeCookiebot();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkCookiebot), 10000);
    }
  }, []);

  const saveConsent = (newConsent: Partial<CookieConsentData>) => {
    // If Cookiebot is available, let it handle consent
    if (window.Cookiebot) {
      // Use Cookiebot's renew function to show preferences
      window.Cookiebot.renew();
      return;
    }

    // Fallback to localStorage for testing/development
    const updatedConsent: CookieConsentData = {
      ...consent,
      ...newConsent,
      essential: true, // Always true
      timestamp: Date.now(),
    };
    
    setConsent(updatedConsent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConsent));
    setShowBanner(false);

    // Trigger analytics loading if accepted
    if (updatedConsent.analytics && !consent.analytics) {
      loadAnalytics();
    }

    // Trigger marketing scripts loading if accepted
    if (updatedConsent.marketing && !consent.marketing) {
      loadMarketingScripts();
    }
  };

  const acceptAll = () => {
    if (window.Cookiebot) {
      // Cookiebot handles this through its UI
      window.Cookiebot.show();
      return;
    }
    
    saveConsent({
      status: 'accepted',
      analytics: true,
      marketing: true,
    });
  };

  const declineAll = () => {
    if (window.Cookiebot) {
      // Cookiebot handles this through its UI
      window.Cookiebot.show();
      return;
    }
    
    saveConsent({
      status: 'declined',
      analytics: false,
      marketing: false,
    });
  };

  const acceptCustom = (analytics: boolean, marketing: boolean) => {
    if (window.Cookiebot) {
      // Show Cookiebot preferences dialog
      window.Cookiebot.renew();
      return;
    }
    
    saveConsent({
      status: 'customized',
      analytics,
      marketing,
    });
  };

  const resetConsent = () => {
    if (window.Cookiebot) {
      // Use Cookiebot's renew function
      window.Cookiebot.renew();
      return;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    setConsent(defaultConsent);
    setShowBanner(true);
  };

  // Force show banner for new visitors or testing
  const forceShowBanner = () => {
    if (window.Cookiebot) {
      window.Cookiebot.show();
      return;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    setConsent(defaultConsent);
    setShowBanner(true);
  };

  return {
    consent,
    showBanner,
    acceptAll,
    declineAll,
    acceptCustom,
    resetConsent,
    forceShowBanner,
    hasConsented: consent.status !== 'pending',
  };
}

// Load Google Analytics with Cookiebot compliance
function loadAnalytics() {
  // Check if already loaded or if Cookiebot doesn't allow statistics
  if (window.gtag || (window.Cookiebot && !window.Cookiebot.consent.statistics)) return;

  const GA_ID = import.meta.env.VITE_GA_ID;
  
  if (GA_ID) {
    // Use Cookiebot's getScript method for GDPR compliance if available
    if (window.Cookiebot && window.Cookiebot.getScript) {
      window.Cookiebot.getScript(
        `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        true,
        () => {
          const script = document.createElement('script');
          script.type = 'text/plain';
          script.setAttribute('data-cookieconsent', 'statistics');
          script.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `;
          document.head.appendChild(script);
        }
      );
    } else {
      // Fallback method with proper data attributes
      const script1 = document.createElement('script');
      script1.type = 'text/plain';
      script1.setAttribute('data-cookieconsent', 'statistics');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.type = 'text/plain';
      script2.setAttribute('data-cookieconsent', 'statistics');
      script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(script2);
    }
  }
}

// Load marketing scripts with Cookiebot compliance
function loadMarketingScripts() {
  // Check if Cookiebot doesn't allow marketing
  if (window.Cookiebot && !window.Cookiebot.consent.marketing) return;

  const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;
  
  if (FB_PIXEL_ID) {
    // Load Facebook Pixel with proper data attributes for Cookiebot
    const baseScript = document.createElement('script');
    baseScript.type = 'text/plain';
    baseScript.setAttribute('data-cookieconsent', 'marketing');
    baseScript.textContent = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      if (window.fbq) {
        window.fbq('init', '${FB_PIXEL_ID}');
        window.fbq('track', 'PageView');
      }
    `;
    document.head.appendChild(baseScript);
  }
}