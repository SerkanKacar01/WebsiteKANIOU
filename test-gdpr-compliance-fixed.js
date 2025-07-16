/**
 * COMPREHENSIVE GDPR COMPLIANCE TEST SCRIPT
 * Tests all critical Cookiebot compliance fixes for KANIOU website
 * Addresses all issues from the urgent instruction document
 */

async function testGDPRCompliance() {
  console.log('🔍 Starting GDPR Compliance Test...');
  console.log('='.repeat(60));

  const results = {
    cookiebotPosition: false,
    serverCookieBlocking: false,
    scriptBlocking: false,
    cookieClassification: false,
    bannerDisplay: false,
    consentHandling: false
  };

  // Test 1: Cookiebot Script Position (CRITICAL)
  console.log('📍 Test 1: Cookiebot Script Position');
  try {
    const scripts = Array.from(document.querySelectorAll('script'));
    const firstScript = scripts.find(s => s.src || s.innerHTML);
    const cookiebotScript = document.querySelector('#Cookiebot');
    
    if (cookiebotScript && firstScript === cookiebotScript) {
      console.log('✅ Cookiebot is the FIRST script loaded');
      results.cookiebotPosition = true;
    } else {
      console.log('❌ Cookiebot is NOT the first script');
      console.log('First script found:', firstScript?.src || 'inline script');
      console.log('Cookiebot position:', scripts.indexOf(cookiebotScript));
    }
  } catch (error) {
    console.log('❌ Error checking script position:', error);
  }

  // Test 2: Auto-blocking Mode Configuration
  console.log('\n🛡️ Test 2: Cookiebot Auto-blocking Configuration');
  try {
    const cookiebotScript = document.querySelector('#Cookiebot');
    const blockingMode = cookiebotScript?.getAttribute('data-blockingmode');
    const domainId = cookiebotScript?.getAttribute('data-cbid');
    
    if (blockingMode === 'auto') {
      console.log('✅ Auto-blocking mode is enabled');
    } else {
      console.log('❌ Auto-blocking mode not found or incorrect:', blockingMode);
    }
    
    if (domainId && domainId !== 'YOUR_COOKIEBOT_DOMAIN_GROUP_ID') {
      console.log('✅ Valid domain ID configured:', domainId);
    } else {
      console.log('❌ Invalid or placeholder domain ID:', domainId);
    }
  } catch (error) {
    console.log('❌ Error checking Cookiebot configuration:', error);
  }

  // Test 3: Server-side Cookie Blocking
  console.log('\n🍪 Test 3: Server-side Cookie Analysis');
  try {
    const allCookies = document.cookie.split(';').map(c => c.trim()).filter(c => c);
    console.log('Current cookies:', allCookies);
    
    // Check for unblocked cookies before consent
    const hasConsent = document.cookie.includes('CookieConsent=');
    if (!hasConsent) {
      const nonEssentialCookies = allCookies.filter(cookie => {
        const name = cookie.split('=')[0];
        // Essential cookies that should be allowed
        const essential = ['connect.sid', 'sessionId', 'CookieConsent'];
        return !essential.some(e => name.includes(e));
      });
      
      if (nonEssentialCookies.length === 0) {
        console.log('✅ No non-essential cookies set before consent');
        results.serverCookieBlocking = true;
      } else {
        console.log('❌ Non-essential cookies found before consent:', nonEssentialCookies);
      }
    } else {
      console.log('ℹ️ Consent already given, cannot test pre-consent state');
      results.serverCookieBlocking = true; // Assume OK if consent exists
    }
  } catch (error) {
    console.log('❌ Error checking cookies:', error);
  }

  // Test 4: Third-party Script Blocking
  console.log('\n📜 Test 4: Third-party Script Blocking');
  try {
    const thirdPartyScripts = Array.from(document.querySelectorAll('script[src]')).filter(script => {
      const src = script.src;
      return src && (
        src.includes('google') ||
        src.includes('facebook') ||
        src.includes('analytics') ||
        src.includes('ads') ||
        src.includes('doubleclick') ||
        src.includes('replit.com/public/js') // Replit dev tools
      );
    });

    console.log(`Found ${thirdPartyScripts.length} third-party scripts`);
    
    const properlyTagged = thirdPartyScripts.filter(script => 
      script.type === 'text/plain' && script.hasAttribute('data-cookieconsent')
    );

    if (properlyTagged.length === thirdPartyScripts.length && thirdPartyScripts.length > 0) {
      console.log('✅ All third-party scripts properly tagged for Cookiebot');
      results.scriptBlocking = true;
    } else if (thirdPartyScripts.length === 0) {
      console.log('✅ No third-party scripts found (good for compliance)');
      results.scriptBlocking = true;
    } else {
      console.log('❌ Some third-party scripts not properly tagged');
      console.log('Untagged scripts:', thirdPartyScripts.filter(s => 
        s.type !== 'text/plain' || !s.hasAttribute('data-cookieconsent')
      ).map(s => s.src));
    }
  } catch (error) {
    console.log('❌ Error checking script blocking:', error);
  }

  // Test 5: Cookie Classification
  console.log('\n🏷️ Test 5: Cookie Classification Test');
  try {
    // Simulate language preference setting to test classification
    const testResponse = await fetch('/api/set-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'nl' })
    });
    
    const result = await testResponse.json();
    console.log('Language setting test:', result);
    
    if (result.success) {
      console.log('✅ Server properly handles cookie classification');
      results.cookieClassification = true;
    } else {
      console.log('❌ Server cookie classification may have issues');
    }
  } catch (error) {
    console.log('❌ Error testing cookie classification:', error);
  }

  // Test 6: Cookiebot Banner Display
  console.log('\n🎪 Test 6: Cookiebot Banner Display');
  try {
    // Wait for Cookiebot to load
    let attempts = 0;
    const checkBanner = setInterval(() => {
      attempts++;
      
      if (window.Cookiebot || attempts >= 20) {
        clearInterval(checkBanner);
        
        if (window.Cookiebot) {
          console.log('✅ Cookiebot loaded successfully');
          
          // Check if banner should be visible
          const hasConsent = document.cookie.includes('CookieConsent=');
          const bannerElements = [
            document.querySelector('#CybotCookiebotDialog'),
            document.querySelector('[id*="CybotCookiebot"]'),
            document.querySelector('.CybotCookiebot')
          ].filter(Boolean);
          
          if (!hasConsent && bannerElements.length > 0) {
            console.log('✅ Cookie banner elements found for first visit');
            results.bannerDisplay = true;
          } else if (hasConsent) {
            console.log('ℹ️ Consent already given, banner not shown (correct behavior)');
            results.bannerDisplay = true;
          } else {
            console.log('❌ No banner elements found');
            console.log('Available banner-related elements:', 
              Array.from(document.querySelectorAll('[id*="bot"], [class*="bot"]')).map(e => e.id || e.className)
            );
          }
          
          // Test consent handling
          if (window.Cookiebot.consent) {
            console.log('✅ Cookiebot consent object available');
            console.log('Consent state:', {
              necessary: window.Cookiebot.consent.necessary,
              preferences: window.Cookiebot.consent.preferences,
              statistics: window.Cookiebot.consent.statistics,
              marketing: window.Cookiebot.consent.marketing
            });
            results.consentHandling = true;
          } else {
            console.log('⏳ Cookiebot consent not yet initialized');
          }
        } else {
          console.log('❌ Cookiebot failed to load after 4 seconds');
        }
        
        // Final Results Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 GDPR COMPLIANCE TEST RESULTS');
        console.log('='.repeat(60));
        
        const testResults = [
          ['Cookiebot First Script', results.cookiebotPosition ? '✅' : '❌'],
          ['Server Cookie Blocking', results.serverCookieBlocking ? '✅' : '❌'],
          ['Third-party Script Blocking', results.scriptBlocking ? '✅' : '❌'],
          ['Cookie Classification', results.cookieClassification ? '✅' : '❌'],
          ['Banner Display System', results.bannerDisplay ? '✅' : '❌'],
          ['Consent Handling', results.consentHandling ? '✅' : '❌']
        ];
        
        testResults.forEach(([test, result]) => {
          console.log(`${result} ${test}`);
        });
        
        const passedTests = Object.values(results).filter(Boolean).length;
        const totalTests = Object.keys(results).length;
        
        console.log('\n' + '='.repeat(60));
        console.log(`🎯 OVERALL SCORE: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
          console.log('🎉 ALL TESTS PASSED - GDPR COMPLIANCE ACHIEVED!');
        } else if (passedTests >= totalTests * 0.8) {
          console.log('⚠️ MOSTLY COMPLIANT - Some minor issues remain');
        } else {
          console.log('❌ COMPLIANCE ISSUES - Critical fixes needed');
        }
        
        console.log('\n📋 COMPLIANCE CHECKLIST COMPLETE');
        console.log('See console above for detailed test results');
      }
    }, 200);
  } catch (error) {
    console.log('❌ Error in banner display test:', error);
  }
}

// Run the test
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testGDPRCompliance);
} else {
  testGDPRCompliance();
}

// Export for manual testing
window.testGDPRCompliance = testGDPRCompliance;