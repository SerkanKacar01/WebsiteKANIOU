// Cookiebot Helper Script - Only for New Visitors
(function() {
    console.log('🍪 Cookiebot Helper Script Loading...');
    
    // Check if user has already made a choice
    function hasUserAlreadyConsented() {
        // Check for Cookiebot consent cookies
        if (document.cookie.includes('CookieConsent')) {
            console.log('✅ User has already consented, banner should not appear');
            return true;
        }
        
        // Check localStorage for consent data
        try {
            const consentKeys = Object.keys(localStorage).filter(key => 
                key.toLowerCase().includes('cookie') || 
                key.toLowerCase().includes('consent') || 
                key.toLowerCase().includes('bot')
            );
            if (consentKeys.length > 0) {
                console.log('✅ User consent found in localStorage, banner should not appear');
                return true;
            }
        } catch (e) {
            console.log('localStorage check failed:', e);
        }
        
        return false;
    }
    
    // Only show debug info for troubleshooting
    function showCookiebotDebugInfo() {
        console.log('==== COOKIEBOT DEBUG INFO ====');
        console.log('Current URL:', window.location.href);
        console.log('Domain:', window.location.hostname);
        
        // Check if Cookiebot script is loaded
        const cookiebotScript = document.getElementById('Cookiebot');
        if (cookiebotScript) {
            console.log('✅ Cookiebot script element found');
            console.log('CBID:', cookiebotScript.dataset.cbid);
            console.log('Blocking mode:', cookiebotScript.dataset.blockingmode);
            console.log('Script src:', cookiebotScript.src);
        } else {
            console.log('❌ Cookiebot script element NOT found');
        }
        
        // Check if Cookiebot object exists
        if (typeof window.Cookiebot !== 'undefined') {
            console.log('✅ Cookiebot object exists');
            console.log('Current consent status:', window.Cookiebot.consent);
            console.log('Has user responded to banner:', window.Cookiebot.hasResponse);
        } else {
            console.log('❌ Cookiebot object does NOT exist');
        }
        
        console.log('Current cookies:', document.cookie);
        console.log('==== END COOKIEBOT DEBUG ====');
    }
    
    // Wait for Cookiebot to load and show debug info
    function initCookiebotHelper() {
        showCookiebotDebugInfo();
        
        // If user has already consented, don't interfere
        if (hasUserAlreadyConsented()) {
            console.log('🚫 User has already made a choice, not showing banner again');
            return;
        }
        
        console.log('👤 New user detected, banner should appear automatically via Cookiebot');
        
        // For new users, Cookiebot should work automatically
        // We don't force anything, just let it work naturally
        if (typeof window.Cookiebot !== 'undefined') {
            console.log('✅ Cookiebot ready for new user');
        }
    }
    
    // Run when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookiebotHelper);
    } else {
        initCookiebotHelper();
    }
    
    console.log('🍪 Cookiebot Helper Script Loaded - Respecting User Choices');
})();