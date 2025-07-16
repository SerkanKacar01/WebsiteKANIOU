/**
 * Test script to verify Cookiebot banner visibility
 * This will help verify that the banner now appears correctly
 */

console.log('=== TESTING COOKIEBOT BANNER VISIBILITY ===');

// Function to test banner visibility
function testCookiebotBanner() {
  console.log('🧪 Starting Cookiebot banner test...');
  
  // 1. Clear all consent data to simulate first visit
  console.log('1. Clearing all consent data...');
  
  // Clear cookies
  const domain = window.location.hostname;
  ['CookieConsent', 'CookieConsentBulkSetting', 'CookieConsentBulkTicket'].forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
  });
  
  // Clear localStorage
  ['cookie_consent'].forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
  
  console.log('✓ Consent data cleared');
  
  // 2. Wait for Cookiebot to load
  console.log('2. Waiting for Cookiebot to load...');
  
  let attempts = 0;
  const maxAttempts = 30;
  
  const checkCookiebot = setInterval(() => {
    attempts++;
    
    if (window.Cookiebot) {
      console.log('✓ Cookiebot loaded successfully');
      clearInterval(checkCookiebot);
      
      // 3. Check if banner is visible
      setTimeout(() => {
        console.log('3. Checking banner visibility...');
        
        const bannerElements = document.querySelectorAll('#CybotCookiebotDialog, [id*="CybotCookiebot"], [class*="CybotCookiebot"]');
        
        if (bannerElements.length > 0) {
          console.log(`✓ Found ${bannerElements.length} Cookiebot banner elements`);
          
          bannerElements.forEach((el, index) => {
            const styles = window.getComputedStyle(el);
            const isVisible = styles.display !== 'none' && 
                            styles.visibility !== 'hidden' && 
                            styles.opacity !== '0';
            
            console.log(`Banner element ${index}:`, {
              id: el.id,
              className: el.className,
              display: styles.display,
              visibility: styles.visibility,
              opacity: styles.opacity,
              zIndex: styles.zIndex,
              isVisible: isVisible
            });
          });
        } else {
          console.log('❌ No Cookiebot banner elements found');
        }
        
        // 4. Test banner functionality
        console.log('4. Testing banner functionality...');
        
        if (window.Cookiebot.show) {
          try {
            window.Cookiebot.show();
            console.log('✓ Cookiebot.show() executed successfully');
          } catch (error) {
            console.log('❌ Error calling Cookiebot.show():', error);
          }
        } else {
          console.log('❌ Cookiebot.show() function not available');
        }
        
        // 5. Final check after 2 seconds
        setTimeout(() => {
          console.log('5. Final visibility check...');
          
          const finalCheck = document.querySelector('#CybotCookiebotDialog');
          if (finalCheck) {
            const styles = window.getComputedStyle(finalCheck);
            const isVisible = styles.display !== 'none' && 
                            styles.visibility !== 'hidden' && 
                            styles.opacity !== '0';
            
            console.log('🎯 Final result:', {
              bannerFound: !!finalCheck,
              isVisible: isVisible,
              display: styles.display,
              visibility: styles.visibility,
              opacity: styles.opacity,
              zIndex: styles.zIndex,
              position: styles.position
            });
            
            if (isVisible) {
              console.log('🎉 SUCCESS: Cookiebot banner is visible!');
            } else {
              console.log('❌ FAILURE: Cookiebot banner is not visible');
            }
          } else {
            console.log('❌ FAILURE: Cookiebot banner element not found');
          }
          
          console.log('=== TEST COMPLETE ===');
        }, 2000);
        
      }, 1000);
      
    } else if (attempts >= maxAttempts) {
      console.log('❌ Cookiebot failed to load after maximum attempts');
      clearInterval(checkCookiebot);
    }
  }, 200);
}

// Run the test
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testCookiebotBanner);
} else {
  testCookiebotBanner();
}

// Export for manual testing
window.testCookiebotBanner = testCookiebotBanner;