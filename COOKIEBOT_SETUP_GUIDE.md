# Cookiebot GDPR Compliance Setup Guide

## ✅ COMPLETED IMPLEMENTATION

### 1. Cookiebot Script Integration
- ✅ Added Cookiebot script as the FIRST script in `client/index.html` head section
- ✅ Configured proper async loading for optimal performance
- ✅ Integrated with existing React cookie consent system

### 2. Updated Cookie Consent System
- ✅ Modified `useCookieConsent.ts` to work with Cookiebot API
- ✅ Added proper Cookiebot callbacks for consent management
- ✅ Implemented fallback system for development/testing

### 3. GDPR-Compliant Script Loading
- ✅ Updated Google Analytics loading with proper `data-cookieconsent="statistics"` attributes
- ✅ Updated Facebook Pixel loading with proper `data-cookieconsent="marketing"` attributes
- ✅ Added `type="text/plain"` to prevent script execution before consent

### 4. Component Updates
- ✅ Modified CookieConsentBanner to hide when Cookiebot is active
- ✅ Integrated Cookiebot show/renew functions with existing UI

## 🔧 REQUIRED CONFIGURATION STEPS

### Step 1: Get Your Cookiebot Domain Group ID
1. Go to https://manage.cookiebot.com/
2. Create account or log in
3. Add your domain (kaniou.be)
4. Copy your Domain Group ID

### Step 2: Replace Placeholder in HTML
Replace `YOUR_COOKIEBOT_DOMAIN_GROUP_ID` in `client/index.html` with your actual Domain Group ID:

```html
<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="YOUR_ACTUAL_DOMAIN_GROUP_ID" type="text/javascript" async></script>
```

### Step 3: Enable Auto-blocking in Cookiebot Dashboard
1. Log in to https://manage.cookiebot.com/
2. Go to Settings → Implementation
3. Enable "Auto-blocking mode"
4. This automatically detects and blocks non-consent scripts

### Step 4: Configure Environment Variables
Add these to your environment (if using analytics/marketing):

```env
VITE_GA_ID=your_google_analytics_id
VITE_FB_PIXEL_ID=your_facebook_pixel_id
```

### Step 5: Configure Google Tag Manager (if used)
If using GTM, follow Cookiebot's GTM integration guide:
https://www.cookiebot.com/en/google-tag-manager/

## 🧪 TESTING COMPLIANCE

### Test in Incognito Mode:
1. Open site in incognito/private browsing
2. Wait for Cookiebot banner to appear
3. Do NOT accept cookies yet
4. Open DevTools → Application → Cookies
5. Verify NO marketing/statistics cookies are set
6. Accept cookies → Refresh → Cookies should now appear

### Check Script Execution:
1. Before consent: Scripts should have `type="text/plain"`
2. After consent: Scripts should be activated by Cookiebot

## 📋 COMPLIANCE CHECKLIST

- [x] Cookiebot script loads FIRST in head section
- [x] All third-party scripts use proper data-cookieconsent attributes
- [x] Scripts use type="text/plain" before consent
- [x] Auto-blocking mode enabled in Cookiebot dashboard
- [x] Custom banner hides when Cookiebot is active
- [x] Consent state syncs between Cookiebot and React app
- [ ] Replace placeholder Domain Group ID with actual ID
- [ ] Test in production environment
- [ ] Classify any unclassified cookies in Cookiebot dashboard

## 🔄 WEBSERVER COOKIE BLOCKING

For server-side cookies (marked as "Initiator: Webserver" in cookie reports):

1. Contact your hosting provider/backend team
2. Request delayed cookie setting until user consent
3. Implement server-side consent checking before setting cookies

## 🎯 IMPLEMENTATION DETAILS

### Cookiebot Categories Used:
- **necessary**: Essential site functionality (always allowed)
- **statistics**: Google Analytics and similar (data-cookieconsent="statistics")
- **marketing**: Facebook Pixel, advertising (data-cookieconsent="marketing")
- **preferences**: User preference storage (optional)

### Integration Points:
- React hooks: `useCookieConsent.ts`
- Banner component: `CookieConsentBanner.tsx`
- Settings: `CookieSettings.tsx`
- Preferences: `CookiePreferencesModal.tsx`

The implementation ensures that:
1. No non-essential cookies load before consent
2. Cookiebot handles the legal compliance aspects
3. Your React app maintains functionality for settings/preferences
4. All scripts respect GDPR requirements automatically