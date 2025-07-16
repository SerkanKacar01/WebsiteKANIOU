import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Import translation files
import enTranslations from '../translations/en.json';
import frTranslations from '../translations/fr.json';
import nlTranslations from '../translations/nl.json';
import trTranslations from '../translations/tr.json';
import arTranslations from '../translations/ar.json';

// Define available languages
export type Language = 'en' | 'fr' | 'nl' | 'tr' | 'ar';

// Define language context properties
interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, any>;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'nl',
  setLanguage: () => {},
  translations: {},
  t: (key: string) => key,
});

// Language translations from imported JSON files
const translations: Record<Language, Record<string, any>> = {
  en: enTranslations,
  fr: frTranslations,
  nl: nlTranslations,
  tr: trTranslations,
  ar: arTranslations,
};

// Provider component that wraps your app and provides the language context
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check for GDPR-compliant language storage
  const getStoredLanguage = (): Language => {
    if (typeof window === 'undefined') return 'nl';
    
    // First check for cookie-based preference (GDPR compliant)
    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(c => c.trim().startsWith('kaniou-language='));
    if (langCookie) {
      const cookieLang = langCookie.split('=')[1] as Language;
      if (['en', 'fr', 'nl', 'tr', 'ar'].includes(cookieLang)) {
        return cookieLang;
      }
    }
    
    // Fallback to browser language detection (no storage)
    const browserLang = navigator.language.slice(0, 2) as Language;
    return (['en', 'fr', 'nl', 'tr', 'ar'].includes(browserLang)) ? browserLang : 'nl';
  };

  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  // Current translations based on selected language
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, any>>(
    translations[language] || translations.en
  );

  // Update translations when language changes
  useEffect(() => {
    setCurrentTranslations(translations[language] || translations.en);
    
    // Add RTL direction for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
      document.documentElement.classList.remove('rtl');
    }
    
    // GDPR-compliant language storage - no cookies without consent
    if (typeof window !== 'undefined') {
      // Only attempt to store if user has given explicit preferences consent
      if (window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.preferences) {
        // Set language cookie via API to respect server-side GDPR controls
        fetch('/api/set-language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language })
        }).then(response => response.json())
        .then(result => {
          if (!result.success) {
            console.log('🚫 Language cookie blocked:', result.reason);
          }
        })
        .catch(err => console.warn('Language API error:', err));
      } else {
        // Do NOT store language preference without consent (GDPR requirement)
        console.log('🚫 Language preference not stored - consent required');
      }
      
      // Remove any legacy localStorage entries to ensure GDPR compliance
      localStorage.removeItem('language');
      sessionStorage.removeItem('language');
    }
  }, [language]);

  // GDPR-compliant language setting function - blocks cookies without consent
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Only attempt to store if explicit consent is available
    if (typeof window !== 'undefined') {
      if (window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.preferences) {
        fetch('/api/set-language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: lang })
        }).then(response => response.json())
        .then(result => {
          if (result.success) {
            console.log(`✅ Language preference stored: ${lang}`);
          } else {
            console.log(`🚫 Language blocked: ${result.reason}`);
          }
        })
        .catch(err => console.warn('Language API error:', err));
      } else {
        console.log(`🚫 Language ${lang} not stored - preferences consent required`);
      }
    }
  };

  // Translation function that handles nested keys
  const t = (key: string): string => {
    if (!key) return '';

    // Handle nested keys like 'nav.home'
    const keys = key.split('.');
    let result: any = currentTranslations;

    // Navigate through the nested objects
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Key not found in current language, try English
        if (language !== 'en') {
          let enResult = translations.en;
          let found = true;
          
          for (const k2 of keys) {
            if (enResult && typeof enResult === 'object' && k2 in enResult) {
              enResult = enResult[k2];
            } else {
              found = false;
              break;
            }
          }
          
          if (found && typeof enResult === 'string') {
            return enResult;
          }
        }
        
        // If still not found, return last part of the key
        return key.split('.').pop() || key;
      }
    }

    // If the result is a string, return it
    if (typeof result === 'string') {
      return result;
    }

    // Otherwise return last part of the key
    return key.split('.').pop() || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;