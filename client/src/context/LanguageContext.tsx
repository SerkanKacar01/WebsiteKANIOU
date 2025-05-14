import React, { createContext, useContext, useState, ReactNode } from 'react';

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
};

// Default to English
const defaultLanguage = 'en';

// Create the context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: () => '',
});

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations[defaultLanguage];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;