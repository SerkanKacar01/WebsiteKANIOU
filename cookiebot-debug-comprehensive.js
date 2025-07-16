/**
 * Comprehensive Cookiebot Debug Script
 * This will identify exactly why the cookie banner isn't showing
 */

console.log('=== COMPREHENSIVE COOKIEBOT DEBUG ===');
console.log('Time:', new Date().toISOString());

// Function to wait for element
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    
    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

// Debug function
async function debugCookiebot() {
  console.log('\n1. CHECKING COOKIEBOT SCRIPT LOADING...');
  
  const cookiebotScript = document.getElementById('Cookiebot');
  if (cookiebotScript) {
    console.log('✓ Cookiebot script element found');
    console.log('  - src:', cookiebotScript.src);
    console.log('  - data-cbid:', cookiebotScript.getAttribute('data-cbid'));
    console.log('  - data-blockingmode:', cookiebotScript.getAttribute('data-blockingmode'));
    console.log('  - script loaded:', cookiebotScript.readyState || 'unknown');
  } else {
    console.log('✗ Cookiebot script element NOT found');
    return;
  }
  
  console.log('\n2. CHECKING COOKIEBOT OBJECT...');
  
  // Wait for Cookiebot to load
  let cookiebotLoaded = false;
  let attempts = 0;
  
  while (!cookiebotLoaded && attempts < 50) {
    if (window.Cookiebot) {
      cookiebotLoaded = true;
      console.log('✓ Cookiebot object loaded');
      console.log('  - Cookiebot.consent:', window.Cookiebot.consent);
      console.log('  - Cookiebot.hasResponse:', window.Cookiebot.hasResponse);
      console.log('  - Cookiebot.show function:', typeof window.Cookiebot.show);
      console.log('  - Cookiebot.withdraw function:', typeof window.Cookiebot.withdraw);
    } else {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  if (!cookiebotLoaded) {
    console.log('✗ Cookiebot object failed to load after 5 seconds');
    return;
  }
  
  console.log('\n3. CHECKING CURRENT CONSENT STATE...');
  
  // Check cookies
  const allCookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});
  
  console.log('All cookies:', allCookies);
  
  if (allCookies.CookieConsent) {
    console.log('✓ CookieConsent cookie exists:', allCookies.CookieConsent);
    console.log('  - This might prevent banner from showing');
  } else {
    console.log('✓ No CookieConsent cookie found (good for banner display)');
  }
  
  console.log('\n4. CHECKING DOM FOR COOKIEBOT ELEMENTS...');
  
  // Look for Cookiebot elements
  const cookiebotElements = document.querySelectorAll('[id*="Cookiebot"], [class*="Cookiebot"], [id*="cookiebot"], [class*="cookiebot"], [data-cookiebot]');
  
  console.log('Found Cookiebot DOM elements:', cookiebotElements.length);
  
  cookiebotElements.forEach((el, index) => {
    const styles = window.getComputedStyle(el);
    console.log(`Element ${index}:`, {
      tagName: el.tagName,
      id: el.id,
      className: el.className,
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
      zIndex: styles.zIndex,
      position: styles.position,
      top: styles.top,
      left: styles.left,
      width: styles.width,
      height: styles.height,
      innerHTML: el.innerHTML.substring(0, 200) + '...'
    });
  });
  
  console.log('\n5. TESTING BANNER DISPLAY...');
  
  // Clear any existing consent
  console.log('Clearing existing consent...');
  
  // Clear cookies
  ['CookieConsent', 'CookieConsentBulkSetting', 'CookieConsentBulkTicket'].forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
  });
  
  // Clear localStorage
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('cookie') || key.toLowerCase().includes('consent')) {
      localStorage.removeItem(key);
      console.log('Removed localStorage item:', key);
    }
  });
  
  // Try to withdraw consent
  try {
    if (window.Cookiebot.withdraw) {
      window.Cookiebot.withdraw();
      console.log('✓ Cookiebot.withdraw() called');
    }
  } catch (error) {
    console.log('Cookiebot.withdraw() error:', error.message);
  }
  
  // Try to show banner
  try {
    console.log('Attempting to show banner...');
    window.Cookiebot.show();
    console.log('✓ Cookiebot.show() called successfully');
    
    // Check if banner appeared
    setTimeout(() => {
      const bannerElements = document.querySelectorAll('[id*="Cookiebot"], [class*="Cookiebot"], [id*="cookiebot"], [class*="cookiebot"]');
      console.log('Banner elements after show():', bannerElements.length);
      
      bannerElements.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        if (styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0') {
          console.log(`Visible banner element ${index}:`, {
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            zIndex: styles.zIndex
          });
        }
      });
    }, 1000);
    
  } catch (error) {
    console.log('✗ Error calling Cookiebot.show():', error.message);
  }
  
  console.log('\n6. CHECKING NETWORK REQUESTS...');
  
  // Monitor network requests
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    console.log('Fetch request:', args[0]);
    return originalFetch.apply(this, args);
  };
  
  console.log('\n7. CHECKING FOR CONFLICTING SCRIPTS...');
  
  // Check for other consent management scripts
  const scripts = document.querySelectorAll('script[src]');
  const consentScripts = Array.from(scripts).filter(script => {
    const src = script.src.toLowerCase();
    return src.includes('consent') || src.includes('cookie') || src.includes('gdpr');
  });
  
  console.log('Found consent-related scripts:', consentScripts.length);
  consentScripts.forEach(script => {
    console.log('Script:', script.src);
  });
  
  console.log('\n=== DEBUG COMPLETE ===');
}

// Run debug
debugCookiebot().catch(console.error);