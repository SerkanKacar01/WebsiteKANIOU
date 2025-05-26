import { useState, useEffect } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'declined' | 'customized';

export interface CookieConsentData {
  status: ConsentStatus;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
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
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedConsent = JSON.parse(stored) as CookieConsentData;
        setConsent(parsedConsent);
        setShowBanner(false);
      } catch (error) {
        console.error('Error parsing stored consent:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newConsent: Partial<CookieConsentData>) => {
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

  const acceptCustom = (analytics: boolean, marketing: boolean) => {
    saveConsent({
      status: 'customized',
      analytics,
      marketing,
    });
  };

  const resetConsent = () => {
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
    hasConsented: consent.status !== 'pending',
  };
}

// Load Google Analytics or other analytics scripts
function loadAnalytics() {
  // Check if already loaded
  if (window.gtag) return;

  // Replace with your actual Google Analytics ID
  const GA_ID = import.meta.env.VITE_GA_ID;
  
  if (GA_ID) {
    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(script2);
  }
}

// Load marketing scripts (Facebook Pixel, etc.)
function loadMarketingScripts() {
  // Example: Facebook Pixel
  const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;
  
  if (FB_PIXEL_ID) {
    const script = document.createElement('script');
    script.innerHTML = `
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
    document.head.appendChild(script);
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}