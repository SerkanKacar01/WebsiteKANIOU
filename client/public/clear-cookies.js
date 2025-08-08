// Script to clear all cookie consent and force banner to show
console.log('🍪 Clearing all cookie consent data...');

// Clear all possible cookie names
const cookieNames = ['CookieConsent', 'CookieConsentBulkSetting', 'CookieConsentBulkTicket'];
const domain = window.location.hostname;

cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
});

// Clear localStorage and sessionStorage
localStorage.clear();
sessionStorage.clear();

console.log('✅ All cookies cleared! Reloading page...');

// Reload page
window.location.reload();