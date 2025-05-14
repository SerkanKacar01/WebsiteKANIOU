import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define translations
const translations = {
  en: {
    // Common
    "common.learnMore": "Learn More",
    "common.viewDetails": "View Details",
    "common.requestQuote": "Request Quote",
    "common.contactUs": "Contact Us",
    "common.showMore": "Show More",
    "common.showAll": "Show All",
    "common.viewAll": "View All Products",
    "common.language": "Language",
    
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Get a Quote",
    
    // Home Page
    "hero.title": "Transform Your Windows with Elegant Solutions",
    "hero.subtitle": "Premium window treatments tailored to your style and needs",
    "hero.cta": "Explore Our Collection",
    
    // Categories
    "categories.title": "Browse by Category",
    "categories.subtitle": "Discover our range of premium window treatments",
    
    // Products
    "products.title": "Our Products",
    "products.subtitle": "Browse our full collection of premium window treatments for any style",
    "products.featured": "Featured Products",
    "products.new": "New Arrivals",
    "products.bestsellers": "Best Sellers",
    "products.filter.category": "Category",
    "products.filter.price": "Price Range",
    "products.filter.features": "Features",
    "products.filter.search": "Search Products",
    "products.filter.featured": "Featured",
    "products.filter.bestseller": "Best Seller",
    "products.filter.new": "New Arrival",
    "products.filter.apply": "Apply Filters",
    "products.filter.reset": "Reset",
    "products.notFound": "No products found",
    
    // Gallery
    "gallery.title": "Our Gallery",
    "gallery.subtitle": "Get inspired by our past installations and projects",
    "gallery.categories.all": "All",
    "gallery.notFound": "No gallery items found",
    
    // About
    "about.title": "About Us",
    "about.subtitle": "Premium window treatment solutions since 1995",
    "about.history.title": "Our Story",
    "about.mission.title": "Our Mission",
    "about.values.title": "Our Values",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "We would love to hear from you. Get in touch with us.",
    "contact.form.name": "Your Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.message": "Your Message",
    "contact.form.submit": "Send Message",
    "contact.success": "Thank you! Your message has been sent.",
    "contact.error": "There was an error sending your message. Please try again.",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Business Hours",
    
    // Quote
    "quote.title": "Request a Free Quote",
    "quote.subtitle": "Fill out the form below and we will get back to you with a personalized quote",
    "quote.form.name": "Your Name",
    "quote.form.email": "Email Address",
    "quote.form.phone": "Phone Number",
    "quote.form.address": "Installation Address",
    "quote.form.productType": "Product Type",
    "quote.form.roomType": "Room Type",
    "quote.form.windowCount": "Number of Windows",
    "quote.form.windowMeasurements": "Window Measurements",
    "quote.form.additionalInfo": "Additional Information",
    "quote.form.submit": "Submit Quote Request",
    "quote.success": "Thank you! Your quote request has been submitted.",
    "quote.error": "There was an error submitting your request. Please try again.",
    
    // Testimonials
    "testimonials.title": "What Our Customers Say",
    "testimonials.subtitle": "Read reviews from our satisfied customers",
    
    // Footer
    "footer.about": "About Us",
    "footer.products": "Products",
    "footer.services": "Services",
    "footer.support": "Support",
    "footer.contact": "Contact",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.copyright": "© 2023 Elegant Drapes. All rights reserved.",
  },
  nl: {
    // Common
    "common.learnMore": "Meer Informatie",
    "common.viewDetails": "Details Bekijken",
    "common.requestQuote": "Offerte Aanvragen",
    "common.contactUs": "Contact Opnemen",
    "common.showMore": "Meer Tonen",
    "common.showAll": "Alles Tonen",
    "common.viewAll": "Alle Producten Bekijken",
    "common.language": "Taal",
    
    // Navigation
    "nav.home": "Home",
    "nav.products": "Producten",
    "nav.gallery": "Galerij",
    "nav.about": "Over Ons",
    "nav.contact": "Contact",
    "nav.quote": "Offerte Aanvragen",
    
    // Home Page
    "hero.title": "Transformeer Uw Ramen met Elegante Oplossingen",
    "hero.subtitle": "Premium raambehandelingen op maat gemaakt voor uw stijl en behoeften",
    "hero.cta": "Ontdek Onze Collectie",
    
    // Categories
    "categories.title": "Blader per Categorie",
    "categories.subtitle": "Ontdek ons assortiment premium raambehandelingen",
    
    // Products
    "products.title": "Onze Producten",
    "products.subtitle": "Blader door onze volledige collectie premium raambehandelingen voor elke stijl",
    "products.featured": "Uitgelichte Producten",
    "products.new": "Nieuwe Artikelen",
    "products.bestsellers": "Bestsellers",
    "products.filter.category": "Categorie",
    "products.filter.price": "Prijsklasse",
    "products.filter.features": "Eigenschappen",
    "products.filter.search": "Producten Zoeken",
    "products.filter.featured": "Uitgelicht",
    "products.filter.bestseller": "Bestseller",
    "products.filter.new": "Nieuw",
    "products.filter.apply": "Filters Toepassen",
    "products.filter.reset": "Resetten",
    "products.notFound": "Geen producten gevonden",
    
    // Gallery
    "gallery.title": "Onze Galerij",
    "gallery.subtitle": "Laat u inspireren door onze eerdere installaties en projecten",
    "gallery.categories.all": "Alles",
    "gallery.notFound": "Geen galerij-items gevonden",
    
    // About
    "about.title": "Over Ons",
    "about.subtitle": "Premium raambehandelingsoplossingen sinds 1995",
    "about.history.title": "Ons Verhaal",
    "about.mission.title": "Onze Missie",
    "about.values.title": "Onze Waarden",
    
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "We horen graag van u. Neem contact met ons op.",
    "contact.form.name": "Uw Naam",
    "contact.form.email": "E-mailadres",
    "contact.form.phone": "Telefoonnummer",
    "contact.form.message": "Uw Bericht",
    "contact.form.submit": "Bericht Versturen",
    "contact.success": "Bedankt! Uw bericht is verzonden.",
    "contact.error": "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het opnieuw.",
    "contact.info.title": "Contactgegevens",
    "contact.info.address": "Adres",
    "contact.info.phone": "Telefoon",
    "contact.info.email": "E-mail",
    "contact.info.hours": "Openingstijden",
    
    // Quote
    "quote.title": "Vraag een Gratis Offerte Aan",
    "quote.subtitle": "Vul het onderstaande formulier in en we nemen contact met u op met een persoonlijke offerte",
    "quote.form.name": "Uw Naam",
    "quote.form.email": "E-mailadres",
    "quote.form.phone": "Telefoonnummer",
    "quote.form.address": "Installatieadres",
    "quote.form.productType": "Producttype",
    "quote.form.roomType": "Kamertype",
    "quote.form.windowCount": "Aantal Ramen",
    "quote.form.windowMeasurements": "Raamafmetingen",
    "quote.form.additionalInfo": "Aanvullende Informatie",
    "quote.form.submit": "Offerteaanvraag Indienen",
    "quote.success": "Bedankt! Uw offerteaanvraag is ingediend.",
    "quote.error": "Er is een fout opgetreden bij het indienen van uw aanvraag. Probeer het opnieuw.",
    
    // Testimonials
    "testimonials.title": "Wat Onze Klanten Zeggen",
    "testimonials.subtitle": "Lees reviews van onze tevreden klanten",
    
    // Footer
    "footer.about": "Over Ons",
    "footer.products": "Producten",
    "footer.services": "Diensten",
    "footer.support": "Ondersteuning",
    "footer.contact": "Contact",
    "footer.terms": "Algemene Voorwaarden",
    "footer.privacy": "Privacybeleid",
    "footer.copyright": "© 2023 Elegant Drapes. Alle rechten voorbehouden.",
  }
};

// Default language - auto-detect from browser or default to Dutch
const getBrowserLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'nl' ? 'nl' : 'en';
  }
  return 'nl'; // Default to Dutch as requested
};

// Create the context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: string[];
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'nl',
  setLanguage: () => {},
  t: () => '',
  availableLanguages: ['en', 'nl'],
});

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('nl');

  // Set initial language based on browser locale or local storage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'nl'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const detectedLanguage = getBrowserLanguage();
      setLanguage(detectedLanguage);
      localStorage.setItem('preferredLanguage', detectedLanguage);
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations['nl'];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      availableLanguages: ['en', 'nl']
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;