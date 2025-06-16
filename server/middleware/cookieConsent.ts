import type { Request, Response, NextFunction } from "express";

/**
 * GDPR Cookie Consent Middleware
 * Prevents setting non-essential cookies before user consent
 */

interface CookieConsentRequest extends Request {
  cookieConsent?: {
    hasConsent: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

export function cookieConsentMiddleware(req: CookieConsentRequest, res: Response, next: NextFunction) {
  // Check for Cookiebot consent cookie
  const cookiebotConsent = req.headers['cookie']?.includes('CookieConsent=') || false;
  
  // Parse Cookiebot consent if available
  let hasConsent = false;
  let analytics = false;
  let marketing = false;

  if (cookiebotConsent) {
    const cookieHeader = req.headers['cookie'] || '';
    const consentMatch = cookieHeader.match(/CookieConsent=([^;]+)/);
    
    if (consentMatch) {
      try {
        // Cookiebot stores consent as encoded values
        const consentValue = decodeURIComponent(consentMatch[1]);
        
        // Basic parsing - in production, you'd use Cookiebot's server-side API
        hasConsent = consentValue.includes('necessary:true');
        analytics = consentValue.includes('statistics:true');
        marketing = consentValue.includes('marketing:true');
      } catch (error) {
        console.warn('Failed to parse cookie consent:', error);
      }
    }
  }

  // Attach consent info to request
  req.cookieConsent = {
    hasConsent,
    analytics,
    marketing
  };

  // Override res.cookie to respect consent
  const originalCookie = res.cookie.bind(res);
  res.cookie = function(name: string, value: any, options: any = {}) {
    // Allow essential cookies always
    const essentialCookies = ['session', 'csrf', 'auth', 'language', 'currency'];
    const isEssential = essentialCookies.some(essential => name.includes(essential));
    
    if (isEssential || req.cookieConsent?.hasConsent) {
      return originalCookie(name, value, options);
    }
    
    // Block non-essential cookies without consent
    console.log(`Blocked cookie '${name}' - no user consent`);
    return res;
  };

  next();
}

/**
 * Utility function to check if analytics cookies are allowed
 */
export function canSetAnalyticsCookies(req: CookieConsentRequest): boolean {
  return req.cookieConsent?.analytics || false;
}

/**
 * Utility function to check if marketing cookies are allowed
 */
export function canSetMarketingCookies(req: CookieConsentRequest): boolean {
  return req.cookieConsent?.marketing || false;
}