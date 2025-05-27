import { useState, useEffect } from "react";

// Import all language files
import nlTranslations from "@/locales/nl.json";
import frTranslations from "@/locales/fr.json";
import trTranslations from "@/locales/tr.json";
import enTranslations from "@/locales/en.json";

export type SupportedLanguage = "nl" | "fr" | "tr" | "en";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

const translations = {
  nl: nlTranslations,
  fr: frTranslations,
  tr: trTranslations,
  en: enTranslations,
};

export const languageOptions: LanguageOption[] = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

const STORAGE_KEY = "kaniou-chatbot-language";

export function useLanguage() {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Get language from localStorage or default to Dutch
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Object.keys(translations).includes(stored)) {
      return stored as SupportedLanguage;
    }
    return "nl";
  });

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(STORAGE_KEY, newLanguage);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to Dutch if key not found
        current = translations.nl;
        for (const fallbackKey of keys) {
          if (current && typeof current === "object" && fallbackKey in current) {
            current = current[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof current === "string" ? current : key;
  };

  return {
    language,
    changeLanguage,
    t,
    languageOptions,
  };
}