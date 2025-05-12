import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobile = false, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('English') },
    { code: 'fr', name: t('Française') }, 
    { code: 'nl', name: t('Nederlands') },
    { code: 'tr', name: t('Türkçe') },
    { code: 'ar', name: t('لعربية') }
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setShowDropdown(false);
    if (onClose) onClose();
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mobile variant
  if (isMobile) {
    return (
      <div className="py-2 border-b border-neutral-200">
        <div className="font-body text-text-dark">
          {t('nav.language')}
        </div>
        <div className="mt-3 ml-2 space-y-1 border-l-2 border-neutral-200 pl-3">
          {languages.map((lang) => (
            <div 
              key={lang.code}
              className={`font-body text-sm py-1.5 cursor-pointer ${
                language === lang.code ? "text-accent font-medium" : "text-text-dark hover:text-accent"
              } transition-colors`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center cursor-pointer text-text-dark hover:text-accent transition-colors"
        onClick={toggleDropdown}
        onMouseEnter={() => setShowDropdown(true)}
      >
        <Globe className="h-5 w-5 mr-1" />
        <span className="uppercase text-sm font-medium">{language}</span>
      </div>
      
      {showDropdown && (
        <div 
          className={cn(
            "absolute mt-2 w-32 bg-white rounded-md py-2 z-50 shadow-md",
            language === 'ar' ? 'right-0' : 'left-0'
          )}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`block px-4 py-2 text-sm cursor-pointer ${
                language === lang.code ? "text-accent font-medium" : "text-text-dark hover:text-accent"
              } transition-colors`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;