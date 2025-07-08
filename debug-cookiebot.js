/**
 * Debug script to test Cookiebot functionality
 * This will help identify why the cookie banner isn't showing
 */

console.log('=== COOKIEBOT DEBUG SCRIPT ===');

// Check if Cookiebot script is loaded
setTimeout(() => {
  console.log('1. Checking Cookiebot script loading...');
  const cookiebotScript = document.getElementById('Cookiebot');
  console.log('Cookiebot script element:', cookiebotScript);
  
  if (cookiebotScript) {
    console.log('✓ Cookiebot script found');
    console.log('Script src:', cookiebotScript.src);
    console.log('Data-cbid:', cookiebotScript.getAttribute('data-cbid'));
    console.log('Data-blockingmode:', cookiebotScript.getAttribute('data-blockingmode'));
  } else {
    console.log('✗ Cookiebot script NOT found');
  }

  // Check if Cookiebot global object exists
  console.log('2. Checking Cookiebot global object...');
  console.log('window.Cookiebot:', window.Cookiebot);
  
  if (window.Cookiebot) {
    console.log('✓ Cookiebot object available');
    console.log('Cookiebot consent:', window.Cookiebot.consent);
    
    // Try to manually show the banner
    try {
      console.log('3. Attempting to manually show banner...');
      window.Cookiebot.show();
      console.log('✓ Banner show() called successfully');
    } catch (error) {
      console.log('✗ Error calling show():', error);
    }
  } else {
    console.log('✗ Cookiebot object NOT available');
  }

  // Check for existing cookies
  console.log('4. Checking existing cookies...');
  console.log('All cookies:', document.cookie);
  
  const cookiebotCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('CookieConsent='));
  
  if (cookiebotCookie) {
    console.log('✓ CookieConsent cookie found:', cookiebotCookie);
    // Clear it to test fresh banner
    document.cookie = 'CookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('Cookie cleared for testing');
  } else {
    console.log('✓ No existing CookieConsent cookie (good for testing)');
  }

  // Check CSS that might hide the banner
  console.log('5. Checking for elements that might be hiding banner...');
  const potentialBanners = document.querySelectorAll('[id*="cookie"], [class*="cookie"], [id*="Cookiebot"], [class*="Cookiebot"]');
  console.log('Found potential cookie elements:', potentialBanners);
  
  potentialBanners.forEach((el, index) => {
    const styles = window.getComputedStyle(el);
    console.log(`Element ${index}:`, {
      element: el,
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
      zIndex: styles.zIndex,
      position: styles.position
    });
  });

}, 2000); // Wait 2 seconds for scripts to load

// Also check network requests
console.log('6. Monitoring network for Cookiebot requests...');
if (window.performance && window.performance.getEntriesByType) {
  setTimeout(() => {
    const entries = window.performance.getEntriesByType('resource');
    const cookiebotRequests = entries.filter(entry => 
      entry.name.includes('cookiebot') || entry.name.includes('consent')
    );
    console.log('Cookiebot-related network requests:', cookiebotRequests);
  }, 3000);
}