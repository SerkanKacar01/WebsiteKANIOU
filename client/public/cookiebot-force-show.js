/**
 * Cookiebot Force Show Script
 * This script forces Cookiebot to show the banner for testing
 */

// Function to force clear all Cookiebot data and show banner
function forceCookiebotBanner() {
  console.log('🍪 Forcing Cookiebot banner display...');
  
  // 1. Clear all possible consent cookies
  const domain = window.location.hostname;
  const cookieNames = [
    'CookieConsent',
    'CookieConsentBulkSetting', 
    'CookieConsentBulkTicket'
  ];
  
  cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
  });
  
  // 2. Clear localStorage and sessionStorage
  ['localStorage', 'sessionStorage'].forEach(storage => {
    Object.keys(window[storage]).forEach(key => {
      if (key.toLowerCase().includes('cookie') || key.toLowerCase().includes('consent')) {
        window[storage].removeItem(key);
      }
    });
  });
  
  // 3. Wait for Cookiebot to load and force show
  let attempts = 0;
  const maxAttempts = 20;
  
  const checkAndShow = setInterval(() => {
    attempts++;
    
    if (window.Cookiebot) {
      console.log('✅ Cookiebot loaded, forcing banner display');
      
      // Clear any existing consent
      try {
        window.Cookiebot.withdraw();
      } catch (e) {
        console.log('Withdraw not available, continuing...');
      }
      
      // Force show banner
      try {
        window.Cookiebot.show();
        console.log('✅ Banner show() called successfully');
      } catch (e) {
        console.error('❌ Error calling show():', e);
      }
      
      clearInterval(checkAndShow);
    } else if (attempts >= maxAttempts) {
      console.error('❌ Cookiebot failed to load after', maxAttempts, 'attempts');
      clearInterval(checkAndShow);
    }
  }, 200);
}

// Auto-run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', forceCookiebotBanner);
} else {
  forceCookiebotBanner();
}

// Export for manual use
window.forceCookiebotBanner = forceCookiebotBanner;