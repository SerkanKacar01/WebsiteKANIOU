import { useState, useEffect } from 'react';

export interface CookieConsentData {
  status: 'pending' | 'accepted' | 'declined';
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

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
    // Update consent state from Cookiebot
    const updateConsentFromCookiebot = () => {
      try {
        if (window.Cookiebot?.consent) {
          const cookiebotConsent = window.Cookiebot.consent;
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
          if (cookiebotConsent.statistics) {
            loadAnalytics();
          }
          if (cookiebotConsent.marketing) {
            loadMarketingScripts();
          }
        }
      } catch (error) {
        console.warn('🍪 Error updating consent from Cookiebot:', error);
      }
    };

    // Set up Cookiebot callbacks
    window.CookiebotCallback_OnAccept = updateConsentFromCookiebot;
    window.CookiebotCallback_OnDecline = updateConsentFromCookiebot;
    window.CookiebotCallback_OnDialogInit = () => {
      console.log('🍪 Cookiebot dialog initialized');
    };

    // Check for existing consent or wait for Cookiebot
    const initializeCookieConsent = () => {
      if (window.Cookiebot?.consent) {
        updateConsentFromCookiebot();
      } else {
        // Fallback to localStorage if Cookiebot not available
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsedConsent = JSON.parse(stored) as CookieConsentData;
            setConsent(parsedConsent);
            setShowBanner(false);
          } else {
            console.log('🍪 No consent found - consent required');
            setShowBanner(false); // Let Cookiebot handle banner display
          }
        } catch (error) {
          console.warn('🍪 Error accessing localStorage:', error);
          setShowBanner(false); // Let Cookiebot handle banner display
        }
      }
    };

    // Initialize immediately if Cookiebot is ready
    if (window.Cookiebot) {
      initializeCookieConsent();
    } else {
      // Poll for Cookiebot availability
      const checkCookiebot = setInterval(() => {
        if (window.Cookiebot) {
          clearInterval(checkCookiebot);
          initializeCookieConsent();
        }
      }, 200);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkCookiebot);
        if (!window.Cookiebot) {
          console.warn('🍪 Cookiebot failed to load, using fallback');
          initializeCookieConsent();
        }
      }, 10000);
    }
  }, []);

  const saveConsent = (newConsent: Partial<CookieConsentData>) => {
    // If Cookiebot is available, let it handle consent
    if (window.Cookiebot) {
      // Use Cookiebot's renew function to show preferences
      try {
        window.Cookiebot.renew();
      } catch (error) {
        console.warn('🍪 Error showing Cookiebot preferences:', error);
      }
      return;
    }

    // Fallback implementation
    const updatedConsent: CookieConsentData = {
      ...consent,
      ...newConsent,
      timestamp: Date.now(),
    };

    setConsent(updatedConsent);
    setShowBanner(false);

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConsent));
    } catch (error) {
      console.warn('🍪 Error saving consent to localStorage:', error);
    }

    // Load scripts based on consent
    if (updatedConsent.analytics) {
      loadAnalytics();
    }
    if (updatedConsent.marketing) {
      loadMarketingScripts();
    }
  };

  const acceptAll = () => {
    saveConsent({
      status: 'accepted',
      analytics: true,
      marketing: true,
    });
  };

  const declineAll = () => {
    saveConsent({
      status: 'declined',
      analytics: false,
      marketing: false,
    });
  };

  const resetConsent = () => {
    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('🍪 Error clearing consent from localStorage:', error);
    }

    // Reset state
    setConsent(defaultConsent);
    setShowBanner(true);

    // If Cookiebot is available, show its dialog
    if (window.Cookiebot) {
      try {
        window.Cookiebot.renew();
      } catch (error) {
        console.warn('🍪 Error showing Cookiebot dialog:', error);
      }
    }
  };

  const openCookieSettings = () => {
    if (window.Cookiebot) {
      try {
        window.Cookiebot.show();
      } catch (error) {
        console.warn('🍪 Error showing Cookiebot settings:', error);
      }
    } else {
      // Fallback: show our banner
      setShowBanner(true);
    }
  };

  return {
    consent,
    showBanner,
    saveConsent,
    acceptAll,
    declineAll,
    resetConsent,
    openCookieSettings,
  };
}

// Script loading functions
function loadAnalytics() {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (GA_MEASUREMENT_ID) {
    // Load Google Analytics with proper data attributes for Cookiebot
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    gtagScript.async = true;
    gtagScript.type = 'text/plain';
    gtagScript.setAttribute('data-cookieconsent', 'statistics');
    document.head.appendChild(gtagScript);

    // Initialize gtag
    const gtagConfig = document.createElement('script');
    gtagConfig.type = 'text/plain';
    gtagConfig.setAttribute('data-cookieconsent', 'statistics');
    gtagConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(gtagConfig);
  }
}

function loadMarketingScripts() {
  // Prevent multiple loading
  if (window.Cookiebot && !window.Cookiebot.consent.marketing) return;

  const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;
  
  if (FB_PIXEL_ID) {
    // Load Facebook Pixel with proper data attributes for Cookiebot
    const baseScript = document.createElement('script');
    baseScript.type = 'text/plain';
    baseScript.setAttribute('data-cookieconsent', 'marketing');
    baseScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(baseScript);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);
  }
}