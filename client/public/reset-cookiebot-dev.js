// Reset Cookiebot on Development/Preview Domains
(function() {
    console.log('🍪 Cookiebot Reset Script for Development...');
    
    // Check if we're on a dev/preview domain (Replit, localhost, etc.)
    const isDevelopment = window.location.hostname.includes('localhost') || 
                         window.location.hostname.includes('replit.dev') ||
                         window.location.hostname.includes('127.0.0.1');
    
    if (isDevelopment) {
        console.log('🔧 Development environment detected - resetting Cookiebot consent...');
        
        // Clear any existing consent data
        document.cookie = 'CookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Clear localStorage consent data
        Object.keys(localStorage).forEach(key => {
            if (key.toLowerCase().includes('cookie') || 
                key.toLowerCase().includes('consent') || 
                key.toLowerCase().includes('bot')) {
                console.log('Clearing localStorage:', key);
                localStorage.removeItem(key);
            }
        });
        
        // Clear sessionStorage consent data
        Object.keys(sessionStorage).forEach(key => {
            if (key.toLowerCase().includes('cookie') || 
                key.toLowerCase().includes('consent') || 
                key.toLowerCase().includes('bot')) {
                console.log('Clearing sessionStorage:', key);
                sessionStorage.removeItem(key);
            }
        });
        
        console.log('✅ Cookiebot consent cleared - banner should now appear for development');
        
        // Force Cookiebot to show the banner
        setTimeout(function() {
            if (typeof window.Cookiebot !== 'undefined' && window.Cookiebot.forceShow) {
                console.log('🔔 Forcing Cookiebot banner to show...');
                window.Cookiebot.forceShow();
            }
        }, 1500);
    }
})();
