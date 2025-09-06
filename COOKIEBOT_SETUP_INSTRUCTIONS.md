# 🍪 Fresh Cookiebot GDPR Implementation Setup Guide

## ✅ COMPLETED IMPLEMENTATION

### What Has Been Done
- ✅ **Complete Removal**: All old Cookiebot code, scripts, and configurations have been completely removed
- ✅ **Fresh Installation**: New Cookiebot script integration added to `client/index.html`
- ✅ **Clean Integration**: Updated `useCookieConsent.ts` hook for proper Cookiebot integration
- ✅ **GDPR Compliance**: Auto-blocking mode enabled with proper data attributes
- ✅ **Mobile Optimized**: Script configured for Dutch language with auto-blocking

### Implementation Details
- **Script Location**: `client/index.html` (lines 3-12)
- **Integration Hook**: `client/src/hooks/useCookieConsent.ts` (completely rewritten)
- **Configuration**: Auto-blocking mode, Dutch language, async loading

## 🔧 REQUIRED: Get Your Cookiebot Domain Group ID

**IMPORTANT**: The current implementation uses a placeholder "YOUR-DOMAIN-GROUP-ID" that must be replaced.

### Step 1: Create Cookiebot Account
1. Go to https://manage.cookiebot.com/
2. Sign up for a free account (free for websites with <50 pages and <1000 monthly sessions)
3. Verify your email address

### Step 2: Add Your Domain
1. In the Cookiebot dashboard, click "Add Domain"
2. Enter your domain: `kaniou.be` (or your Replit domain if testing)
3. Configure settings:
   - **Language**: Dutch (nl)
   - **GDPR Region**: Belgium
   - **Auto-blocking**: Enabled (recommended)

### Step 3: Get Domain Group ID
1. After adding your domain, go to the "Implementation" section
2. Copy the Domain Group ID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
3. Replace `YOUR-DOMAIN-GROUP-ID` in `client/index.html` line 7

### Step 4: Configure Cookie Categories
In Cookiebot dashboard:
- **Necessary**: Always allowed (website functionality)
- **Preferences**: User preferences and settings
- **Statistics**: Google Analytics and similar tracking
- **Marketing**: Facebook Pixel, advertising cookies

## 📝 Configuration Example

Replace this line in `client/index.html`:
```html
data-cbid="YOUR-DOMAIN-GROUP-ID"
```

With your actual Domain Group ID:
```html
data-cbid="abcd1234-5678-9012-3456-789012345678"
```

## 🧪 Testing the Implementation

### After Configuration:
1. Open your website in an incognito/private window
2. You should see the Cookiebot consent banner
3. Test accepting/declining cookies
4. Verify that scripts are blocked until consent is given
5. Check that analytics only load after accepting statistics cookies

### Verification Checklist:
- [ ] Cookiebot banner appears on first visit
- [ ] Banner is mobile-responsive (bottom sheet style)
- [ ] Accept/Decline buttons work properly
- [ ] Cookie preferences can be changed
- [ ] Google Analytics only loads with statistics consent
- [ ] Facebook Pixel only loads with marketing consent
- [ ] Banner respects user choice on subsequent visits

## 🔧 Troubleshooting

### Banner Not Showing:
1. Check browser console for script errors
2. Verify Domain Group ID is correct
3. Ensure domain is added in Cookiebot dashboard
4. Clear browser cookies and reload

### Scripts Not Blocking:
1. Verify `data-blockingmode="auto"` is set
2. Check that marketing scripts have `data-cookieconsent="marketing"`
3. Ensure statistics scripts have `data-cookieconsent="statistics"`

### Console Errors:
- `Script error.` messages are normal from external domains
- They are suppressed and don't affect functionality

## 📊 GDPR Compliance Features

### ✅ Implemented:
- **Prior Consent**: Scripts blocked until user consent
- **Granular Control**: Separate categories for different cookie types
- **Easy Withdrawal**: Users can change preferences anytime
- **Secure Storage**: Consent stored securely for 12 months
- **Mobile Optimized**: Bottom sheet design for mobile devices
- **Multi-language**: Configured for Dutch (nl) locale

### 🔄 Automatic Features:
- **Cookie Scanning**: Cookiebot automatically scans your site monthly
- **Cookie Declaration**: Auto-generated cookie policy content
- **Consent Logging**: All consent choices logged for GDPR compliance
- **Script Management**: Automatic blocking/allowing based on consent

## 🚀 Next Steps

1. **Replace Domain Group ID** in `client/index.html`
2. **Test thoroughly** on different devices and browsers
3. **Add cookie declaration** to privacy policy pages if needed
4. **Monitor compliance** via Cookiebot dashboard
5. **Review monthly** scan reports for new cookies

## 📧 Support

For technical issues with this implementation, contact the development team.
For Cookiebot-specific questions, visit: https://support.cookiebot.com/