import { useState } from 'react';
import { Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';

interface CookieSettingsProps {
  trigger?: React.ReactNode;
  className?: string;
}

export function CookieSettings({ trigger, className = "" }: CookieSettingsProps) {
  const { consent, acceptCustom, hasConsented } = useCookieConsent();
  const [open, setOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent.analytics);
  const [marketingEnabled, setMarketingEnabled] = useState(consent.marketing);
  const { t } = useLanguage();

  const handleSavePreferences = () => {
    acceptCustom(analyticsEnabled, marketingEnabled);
    setOpen(false);
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className={`text-neutral-400 hover:text-secondary transition-colors text-sm p-0 h-auto font-normal ${className}`}
    >
      <Settings className="w-3 h-3 mr-1" />
      {t('cookies.settings.trigger') || 'Cookie Settings'}
    </Button>
  );

  if (!hasConsented) {
    return null; // Don't show settings if user hasn't made initial consent choice
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-accent" />
            {t('cookies.settings.title') || 'Cookie Settings'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Status */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-text-light">
              <strong>{t('cookies.settings.currentStatus') || 'Current status:'}</strong>{' '}
              {consent.status === 'accepted' && (t('cookies.settings.allAccepted') || 'All cookies accepted')}
              {consent.status === 'declined' && (t('cookies.settings.onlyEssential') || 'Only essential cookies')}
              {consent.status === 'customized' && (t('cookies.settings.customized') || 'Custom preferences')}
            </p>
          </div>

          {/* Essential Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-text-dark">
                  {t('cookies.preferences.essential.title') || 'Essential Cookies'}
                </h4>
                <p className="text-sm text-text-light">
                  {t('cookies.preferences.essential.description') || 'Required for the website to function properly. Cannot be disabled.'}
                </p>
              </div>
              <Switch checked={true} disabled className="ml-3" />
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-text-dark">
                  {t('cookies.preferences.analytics.title') || 'Analytics Cookies'}
                </h4>
                <p className="text-sm text-text-light">
                  {t('cookies.preferences.analytics.description') || 'Help us understand how visitors interact with our website.'}
                </p>
              </div>
              <Switch 
                checked={analyticsEnabled} 
                onCheckedChange={setAnalyticsEnabled}
                className="ml-3"
              />
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-text-dark">
                  {t('cookies.preferences.marketing.title') || 'Marketing Cookies'}
                </h4>
                <p className="text-sm text-text-light">
                  {t('cookies.preferences.marketing.description') || 'Used to deliver personalized advertisements and track campaign performance.'}
                </p>
              </div>
              <Switch 
                checked={marketingEnabled} 
                onCheckedChange={setMarketingEnabled}
                className="ml-3"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSavePreferences}
            className="flex-1 bg-accent hover:bg-accent/90 text-white"
          >
            {t('cookies.settings.saveChanges') || 'Save Changes'}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="flex-1"
          >
            {t('cookies.preferences.cancel') || 'Cancel'}
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-text-light text-center">
            {t('cookies.settings.footer') || 'Read more in our'}{' '}
            <Link href="/cookie-policy" className="text-accent hover:underline">
              {t('cookies.settings.cookiePolicy') || 'Cookie Policy'}
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}