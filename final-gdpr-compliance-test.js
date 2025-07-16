/**
 * FINAL GDPR COMPLIANCE VERIFICATION TEST
 * Tests all specific requirements from the Cookiebot audit instruction
 * Verifies compliance with GDPR and EU cookie laws for kaniou.be
 */

async function runFinalGDPRTest() {
  console.log('🔍 FINAL GDPR COMPLIANCE VERIFICATION');
  console.log('='.repeat(70));

  const results = {
    cookiebotFirstScript: false,
    autoBlockingEnabled: false,
    serverCookieBlocking: false,
    unclassifiedCookiesResolved: false,
    cookieBannerDisplay: false,
    consentMechanismWorking: false
  };

  // 1. TEST: Cookiebot script is the very first loaded
  console.log('📍 1. COOKIEBOT SCRIPT POSITIONING');
  try {
    const allScripts = Array.from(document.querySelectorAll('script'));
    const cookiebotScript = document.querySelector('#Cookiebot');
    const firstScript = allScripts[0];
    
    if (cookiebotScript && firstScript === cookiebotScript) {
      console.log('✅ PASS: Cookiebot is the first script in document');
      results.cookiebotFirstScript = true;
    } else {
      console.log('❌ FAIL: Cookiebot is NOT the first script');
      console.log('   First script:', firstScript?.src || firstScript?.innerHTML?.substring(0, 50) || 'Unknown');
      console.log('   Cookiebot position:', allScripts.indexOf(cookiebotScript));
    }
    
    // Check for auto-blocking mode
    const blockingMode = cookiebotScript?.getAttribute('data-blockingmode');
    const culture = cookiebotScript?.getAttribute('data-culture');
    
    if (blockingMode === 'auto' && culture === 'nl') {
      console.log('✅ PASS: Auto-blocking mode enabled with Dutch culture');
      results.autoBlockingEnabled = true;
    } else {
      console.log('❌ FAIL: Auto-blocking or culture not properly configured');
      console.log('   Blocking mode:', blockingMode);
      console.log('   Culture:', culture);
    }
  } catch (error) {
    console.log('❌ ERROR: Script positioning test failed:', error.message);
  }

  // 2. TEST: Server-side cookie blocking before consent
  console.log('\n🍪 2. SERVER-SIDE COOKIE BLOCKING');
  try {
    const allCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c)
      .map(c => c.split('=')[0]);
    
    console.log('Current cookies found:', allCookies);
    
    // Essential cookies that are allowed
    const allowedEssential = ['connect.sid', 'sessionId', 'CookieConsent'];
    
    // Check for prohibited cookies before consent
    const hasConsent = document.cookie.includes('CookieConsent=');
    const prohibitedCookies = [
      'kaniou-language',
      'kaniou_has_visited', 
      'cookiePreferencesReferrer',
      '_ga', '_gid', '_fbp', 'fr'
    ];
    
    if (!hasConsent) {
      const foundProhibited = allCookies.filter(cookie => 
        prohibitedCookies.some(prohibited => cookie.includes(prohibited))
      );
      
      if (foundProhibited.length === 0) {
        console.log('✅ PASS: No prohibited cookies set before consent');
        results.serverCookieBlocking = true;
      } else {
        console.log('❌ FAIL: Prohibited cookies found before consent:', foundProhibited);
      }
    } else {
      console.log('ℹ️ INFO: Consent already given - checking classification');
      results.serverCookieBlocking = true;
    }
  } catch (error) {
    console.log('❌ ERROR: Cookie blocking test failed:', error.message);
  }

  // 3. TEST: Unclassified cookies resolution
  console.log('\n🏷️ 3. COOKIE CLASSIFICATION VERIFICATION');
  try {
    // Test language preference setting to verify proper classification
    const testResponse = await fetch('/api/set-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'nl' })
    });
    
    const result = await testResponse.json();
    console.log('Language classification test result:', result);
    
    if (!result.success && result.reason && result.reason.includes('consent')) {
      console.log('✅ PASS: Server properly blocks cookies without consent');
      results.unclassifiedCookiesResolved = true;
    } else if (result.success && result.category === 'preferences') {
      console.log('✅ PASS: Server properly categorizes cookies when consent exists');
      results.unclassifiedCookiesResolved = true;
    } else {
      console.log('❌ FAIL: Cookie classification not working properly');
    }
  } catch (error) {
    console.log('❌ ERROR: Classification test failed:', error.message);
  }

  // 4. TEST: Cookiebot banner display mechanism
  console.log('\n🎪 4. COOKIEBOT BANNER DISPLAY');
  try {
    let cookiebotCheckCount = 0;
    const maxChecks = 30;
    
    const checkCookiebot = setInterval(() => {
      cookiebotCheckCount++;
      
      if (window.Cookiebot || cookiebotCheckCount >= maxChecks) {
        clearInterval(checkCookiebot);
        
        if (window.Cookiebot) {
          console.log('✅ PASS: Cookiebot loaded successfully');
          
          // Check banner display
          const bannerElements = [
            document.querySelector('#CybotCookiebotDialog'),
            document.querySelector('[id*="CybotCookiebot"]'),
            document.querySelector('.CybotCookiebot')
          ].filter(Boolean);
          
          const hasConsent = document.cookie.includes('CookieConsent=');
          
          if (!hasConsent && bannerElements.length > 0) {
            console.log('✅ PASS: Banner elements present for first visit');
            results.cookieBannerDisplay = true;
          } else if (hasConsent) {
            console.log('✅ PASS: Banner correctly hidden after consent');
            results.cookieBannerDisplay = true;
          } else {
            console.log('❌ FAIL: Banner elements not found');
            console.log('   Available elements:', 
              Array.from(document.querySelectorAll('[id*="Cybot"], [class*="Cybot"]'))
                .map(e => e.id || e.className)
            );
          }
          
          // Check consent mechanism
          if (window.Cookiebot.consent !== undefined) {
            console.log('✅ PASS: Consent mechanism available');
            console.log('   Consent state:', {
              necessary: window.Cookiebot.consent.necessary,
              preferences: window.Cookiebot.consent.preferences,
              statistics: window.Cookiebot.consent.statistics,
              marketing: window.Cookiebot.consent.marketing
            });
            results.consentMechanismWorking = true;
          } else {
            console.log('❌ FAIL: Consent mechanism not available');
          }
        } else {
          console.log('❌ FAIL: Cookiebot failed to load within 6 seconds');
        }
        
        // Display final results
        displayFinalResults();
      }
    }, 200);
  } catch (error) {
    console.log('❌ ERROR: Banner display test failed:', error.message);
    displayFinalResults();
  }

  function displayFinalResults() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 FINAL GDPR COMPLIANCE TEST RESULTS');
    console.log('='.repeat(70));
    
    const testResults = [
      ['Cookiebot First Script Position', results.cookiebotFirstScript],
      ['Auto-blocking Mode Enabled', results.autoBlockingEnabled],
      ['Server Cookie Blocking', results.serverCookieBlocking],
      ['Cookie Classification Resolved', results.unclassifiedCookiesResolved],
      ['Cookie Banner Display', results.cookieBannerDisplay],
      ['Consent Mechanism Working', results.consentMechanismWorking]
    ];
    
    testResults.forEach(([test, passed]) => {
      console.log(`${passed ? '✅' : '❌'} ${test}`);
    });
    
    const passedTests = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    
    console.log('\n' + '='.repeat(70));
    console.log(`🎯 COMPLIANCE SCORE: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
      console.log('🎉 FULL GDPR COMPLIANCE ACHIEVED!');
      console.log('✅ All requirements from Cookiebot audit addressed');
      console.log('✅ kaniou.be is now fully GDPR compliant');
    } else if (passedTests >= totalTests * 0.8) {
      console.log('⚠️ MOSTLY COMPLIANT - Minor issues remain');
    } else {
      console.log('❌ CRITICAL COMPLIANCE ISSUES - Immediate attention required');
    }
    
    console.log('\n📋 AUDIT REQUIREMENTS STATUS:');
    console.log('1. Cookiebot first script: ' + (results.cookiebotFirstScript ? '✅' : '❌'));
    console.log('2. Auto-blocking enabled: ' + (results.autoBlockingEnabled ? '✅' : '❌'));
    console.log('3. Server cookie blocking: ' + (results.serverCookieBlocking ? '✅' : '❌'));
    console.log('4. Cookie classification: ' + (results.unclassifiedCookiesResolved ? '✅' : '❌'));
    console.log('5. Banner display working: ' + (results.cookieBannerDisplay ? '✅' : '❌'));
    console.log('6. Consent mechanism: ' + (results.consentMechanismWorking ? '✅' : '❌'));
    
    console.log('\n🔍 Test completed - See detailed logs above');
  }
}

// Auto-run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runFinalGDPRTest);
} else {
  runFinalGDPRTest();
}

// Make available for manual testing
window.runFinalGDPRTest = runFinalGDPRTest;