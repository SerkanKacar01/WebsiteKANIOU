// Debug Cookiebot implementation
console.log('🍪 COOKIEBOT DEBUG SCRIPT STARTING...');

// Function to check Cookiebot status
function checkCookiebotStatus() {
    console.log('==== COOKIEBOT DEBUG INFO ====');
    console.log('Current URL:', window.location.href);
    console.log('Domain:', window.location.hostname);
    
    // Check if Cookiebot script is loaded
    const cookiebotScript = document.getElementById('Cookiebot');
    if (cookiebotScript) {
        console.log('✅ Cookiebot script element found');
        console.log('CBID:', cookiebotScript.getAttribute('data-cbid'));
        console.log('Blocking mode:', cookiebotScript.getAttribute('data-blockingmode'));
        console.log('Script src:', cookiebotScript.src);
    } else {
        console.log('❌ Cookiebot script element NOT found');
    }
    
    // Check if Cookiebot object exists
    if (typeof window.Cookiebot !== 'undefined') {
        console.log('✅ Cookiebot object exists');
        console.log('Cookiebot methods available:', Object.keys(window.Cookiebot));
        
        if (window.Cookiebot.consent) {
            console.log('Current consent status:', window.Cookiebot.consent);
        }
        
        if (window.Cookiebot.hasResponse !== undefined) {
            console.log('Has user responded to banner:', window.Cookiebot.hasResponse);
        }
        
    } else {
        console.log('❌ Cookiebot object NOT available');
    }
    
    // Check for consent cookies
    console.log('Current cookies:', document.cookie);
    
    // Check consent in localStorage
    const consentKeys = Object.keys(localStorage).filter(key => 
        key.includes('Cookiebot') || key.includes('cookie') || key.includes('consent')
    );
    if (consentKeys.length > 0) {
        console.log('Consent data in localStorage:', consentKeys.map(key => 
            `${key}: ${localStorage.getItem(key)}`
        ));
    } else {
        console.log('No consent data found in localStorage');
    }
    
    console.log('==== END COOKIEBOT DEBUG ====');
}

// Run debug check multiple times to catch loading states
setTimeout(checkCookiebotStatus, 500);
setTimeout(checkCookiebotStatus, 1500);
setTimeout(checkCookiebotStatus, 3000);

// Check when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkCookiebotStatus);
} else {
    checkCookiebotStatus();
}

window.addEventListener('load', checkCookiebotStatus);