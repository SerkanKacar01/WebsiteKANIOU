import type { Request, Response, NextFunction } from "express";

/**
 * Enhanced GDPR Cookie Consent Middleware with Cookiebot API
 * Prevents setting non-essential cookies before user consent
 */

interface CookieConsentRequest extends Request {
  cookieConsent?: {
    hasConsent: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
  };
}

/**
 * Verify consent using Cookiebot API
 */
async function verifyCookiebotConsent(consentId: string): Promise<any> {
  try {
    const response = await fetch(`https://consent.cookiebot.com/api/v1/consents/${consentId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.COOKIEBOT_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('Cookiebot API verification failed:', error);
  }
  return null;
}

export function cookieConsentMiddleware(req: CookieConsentRequest, res: Response, next: NextFunction) {
  // Check for Cookiebot consent cookie
  const cookieHeader = req.headers['cookie'] || '';
  const consentMatch = cookieHeader.match(/CookieConsent=([^;]+)/);
  
  // Default consent state
  let hasConsent = false;
  let analytics = false;
  let marketing = false;
  let preferences = false;

  if (consentMatch) {
    const consentValue = decodeURIComponent(consentMatch[1]);
    
    try {
      // Parse Cookiebot consent format: {necessary:true,preferences:false,statistics:true,marketing:false}
      const consentObj = JSON.parse(consentValue.replace(/([a-zA-Z]+):/g, '"$1":'));
      
      hasConsent = consentObj.necessary === true;
      analytics = consentObj.statistics === true;
      marketing = consentObj.marketing === true;
      preferences = consentObj.preferences === true;
      
    } catch (error) {
      // Fallback parsing for legacy format
      hasConsent = consentValue.includes('necessary:true') || consentValue.includes('necessary%3Atrue');
      analytics = consentValue.includes('statistics:true') || consentValue.includes('statistics%3Atrue');
      marketing = consentValue.includes('marketing:true') || consentValue.includes('marketing%3Atrue');
      preferences = consentValue.includes('preferences:true') || consentValue.includes('preferences%3Atrue');
    }
  }

  // Attach enhanced consent info to request
  req.cookieConsent = {
    hasConsent,
    analytics,
    marketing,
    preferences
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