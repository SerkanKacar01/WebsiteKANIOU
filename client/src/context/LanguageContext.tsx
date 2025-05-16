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
  // Get stored language from localStorage or default to 'nl'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') as Language;
      return (storedLang && ['en', 'fr', 'nl', 'tr', 'ar'].includes(storedLang)) ? storedLang : 'nl';
    }
    return 'nl';
  });

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
    
    // Store language preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
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