import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'fr' | 'nl' | 'tr' | 'ar';

// Define language context properties
interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  translations: {},
  t: (key: string) => key,
});

// Language translations - currently a placeholder to be filled with proper translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    'nav.viewAllProducts': 'View All Products',
    'nav.language': 'Language',
    
    // Language names in their own language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.nl': 'Nederlands',
    'language.tr': 'Türkçe',
    'language.ar': 'العربية',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.gallery': 'Galerie',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.quote': 'Demander un Devis',
    'nav.viewAllProducts': 'Voir Tous les Produits',
    'nav.language': 'Langue',
    
    // Language names in their own language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.nl': 'Nederlands',
    'language.tr': 'Türkçe',
    'language.ar': 'العربية',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Producten',
    'nav.gallery': 'Galerij',
    'nav.about': 'Over Ons',
    'nav.contact': 'Contact',
    'nav.quote': 'Offerte Aanvragen',
    'nav.viewAllProducts': 'Alle Producten Bekijken',
    'nav.language': 'Taal',
    
    // Language names in their own language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.nl': 'Nederlands',
    'language.tr': 'Türkçe',
    'language.ar': 'العربية',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.products': 'Ürünler',
    'nav.gallery': 'Galeri',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.quote': 'Teklif Al',
    'nav.viewAllProducts': 'Tüm Ürünleri Görüntüle',
    'nav.language': 'Dil',
    
    // Language names in their own language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.nl': 'Nederlands',
    'language.tr': 'Türkçe',
    'language.ar': 'العربية',
  },
  ar: {
    // Navigation (RTL language)
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.gallery': 'المعرض',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.quote': 'طلب عرض سعر',
    'nav.viewAllProducts': 'عرض جميع المنتجات',
    'nav.language': 'اللغة',
    
    // Language names in their own language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.nl': 'Nederlands',
    'language.tr': 'Türkçe',
    'language.ar': 'العربية',
  },
};

// Provider component that wraps your app and provides the language context
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get stored language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') as Language;
      return storedLang || 'en';
    }
    return 'en';
  });

  // Current translations based on selected language
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>(
    translations[language] || translations.en
  );

  // Update translations when language changes
  useEffect(() => {
    setCurrentTranslations(translations[language] || translations.en);
    
    // Add RTL direction for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
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

  // Translation function
  const t = (key: string): string => {
    if (!key) return '';
    // Check if the translation exists
    if (currentTranslations && currentTranslations[key]) {
      return currentTranslations[key];
    }
    // Fallback to English if the current language doesn't have the translation
    if (language !== 'en' && translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    // Return key without the prefix as last resort
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