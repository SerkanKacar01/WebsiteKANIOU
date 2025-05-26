import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";
import { useLanguage } from "@/context/LanguageContext";

interface CookieSettingsProps {
  trigger?: React.ReactNode;
  className?: string;
}

export function CookieSettings({
  trigger,
  className = "",
}: CookieSettingsProps) {
  const { hasConsented } = useCookieConsent();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className={`text-neutral-400 hover:text-secondary transition-colors text-sm p-0 h-auto font-normal ${className}`}
      onClick={() => setOpen(true)}
    >
      <Settings className="w-3 h-3 mr-1" />
      {t("cookies.settings.trigger") || "Cookie-instellingen"}
    </Button>
  );

  // Show settings even if user hasn't consented initially, as they should be able to access it from footer
  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>
          {trigger}
        </div>
      ) : (
        defaultTrigger
      )}
      
      <CookiePreferencesModal 
        open={open} 
        onOpenChange={setOpen} 
      />
    </>
  );
}