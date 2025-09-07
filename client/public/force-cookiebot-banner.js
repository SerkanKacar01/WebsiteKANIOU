// AGGRESSIVE Cookiebot banner force script - MUST SHOW BANNER!
(function() {
    console.log('🚨 AGGRESSIVE COOKIEBOT BANNER FORCE LOADING...');
    
    // Completely WIPE all Cookiebot data
    function completelyWipeCookiebot() {
        console.log('🧹 WIPING ALL COOKIEBOT DATA...');
        
        // Clear ALL possible Cookiebot cookies with all possible domains/paths
        const allCookieNames = [
            'CookieConsent',
            'CookieConsentBulkSetting', 
            'CookieConsentBulkTicket',
            'CookieConsentStatisticsConsent',
            'CookieConsentMarketingConsent',
            'CookieConsentPreferencesConsent',
            'CookieConsentNecessaryConsent',
            'cookiebot',
            'cookieconsent'
        ];
        
        const domains = [
            '',
            '.' + window.location.hostname,
            window.location.hostname,
            '.replit.dev',
            '.janeway.replit.dev'
        ];
        
        const paths = ['/', '//', ''];
        
        allCookieNames.forEach(cookieName => {
            domains.forEach(domain => {
                paths.forEach(path => {
                    document.cookie = cookieName + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
                    document.cookie = cookieName + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
                });
            });
        });
        
        // Clear ALL localStorage
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.toLowerCase().includes('cookie') || key.toLowerCase().includes('consent') || key.toLowerCase().includes('bot')) {
                    localStorage.removeItem(key);
                    console.log('🗑️ Removed localStorage:', key);
                }
            });
        } catch (e) {
            console.log('localStorage clear error:', e);
        }
        
        // Clear ALL sessionStorage
        try {
            Object.keys(sessionStorage).forEach(key => {
                if (key.toLowerCase().includes('cookie') || key.toLowerCase().includes('consent') || key.toLowerCase().includes('bot')) {
                    sessionStorage.removeItem(key);
                    console.log('🗑️ Removed sessionStorage:', key);
                }
            });
        } catch (e) {
            console.log('sessionStorage clear error:', e);
        }
        
        console.log('🧹 COOKIEBOT DATA WIPED!');
    }
    
    // FORCE the banner to appear
    function FORCE_BANNER_NOW() {
        console.log('🚨 FORCING COOKIEBOT BANNER NOW!');
        
        if (typeof window.Cookiebot !== 'undefined') {
            console.log('✅ Cookiebot found, forcing banner...');
            
            try {
                // Reset hasResponse to force banner
                window.Cookiebot.hasResponse = false;
                console.log('🔄 Reset hasResponse to false');
                
                // Reset consent object completely
                if (window.Cookiebot.consent) {
                    window.Cookiebot.consent.stamp = '';
                    window.Cookiebot.consent.necessary = false;
                    window.Cookiebot.consent.preferences = false;
                    window.Cookiebot.consent.statistics = false;
                    window.Cookiebot.consent.marketing = false;
                    window.Cookiebot.consent.method = null;
                    console.log('🔄 Reset consent object');
                }
                
                // Call ALL possible show methods
                const showMethods = [
                    'show',
                    'forceShow', 
                    'openDialog',
                    'renewConsent',
                    'showDeclaration'
                ];
                
                showMethods.forEach(method => {
                    try {
                        if (window.Cookiebot[method]) {
                            console.log(`🍪 Trying Cookiebot.${method}()`);
                            window.Cookiebot[method]();
                        }
                        if (window.Cookiebot.dialog && window.Cookiebot.dialog[method]) {
                            console.log(`🍪 Trying Cookiebot.dialog.${method}()`);
                            window.Cookiebot.dialog[method]();
                        }
                    } catch (e) {
                        console.log(`Method ${method} failed:`, e);
                    }
                });
                
                // Force banner via CSS manipulation if it exists but is hidden
                setTimeout(() => {
                    const bannerElements = document.querySelectorAll('[id*="cookie"], [class*="cookie"], [id*="Cookiebot"], [class*="Cookiebot"]');
                    bannerElements.forEach(el => {
                        el.style.display = 'block !important';
                        el.style.visibility = 'visible !important';
                        el.style.opacity = '1 !important';
                        el.style.zIndex = '999999 !important';
                        console.log('👁️ Made element visible:', el);
                    });
                }, 500);
                
                console.log('✅ ALL FORCE METHODS ATTEMPTED!');
                
            } catch (error) {
                console.error('❌ Error in force banner:', error);
            }
            
        } else {
            console.log('❌ Cookiebot not found, retrying...');
            setTimeout(FORCE_BANNER_NOW, 300);
        }
    }
    
    // Execute the force
    function executeForce() {
        completelyWipeCookiebot();
        setTimeout(FORCE_BANNER_NOW, 500);
        setTimeout(FORCE_BANNER_NOW, 1000);
        setTimeout(FORCE_BANNER_NOW, 2000);
    }
    
    // Run immediately and on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executeForce);
    } else {
        executeForce();
    }
    
    // Also run on window load
    window.addEventListener('load', executeForce);
    
    // Run periodically to ensure banner appears
    setInterval(FORCE_BANNER_NOW, 5000);
    
    console.log('🚨 AGGRESSIVE COOKIEBOT FORCE SCRIPT LOADED!');
})();