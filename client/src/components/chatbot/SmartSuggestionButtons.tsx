import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  Palette, 
  FileText, 
  ImageIcon, 
  Info, 
  HelpCircle,
  Clock,
  Building2
} from "lucide-react";

interface SmartSuggestionButtonsProps {
  onSuggestionClick: (suggestion: string, action?: string) => void;
  onHide: () => void;
  sessionId: string;
}

interface SuggestionButton {
  id: string;
  text: string;
  action: string;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
}

export function SmartSuggestionButtons({ onSuggestionClick, onHide, sessionId }: SmartSuggestionButtonsProps) {
  const { language } = useLanguage();
  const [showReminderPrompt, setShowReminderPrompt] = useState(false);
  const [buttonClickTracking, setButtonClickTracking] = useState<string[]>([]);

  // Step 4: Core Suggestion Buttons - 6 main actions
  const coreButtons: Record<string, SuggestionButton[]> = {
    nl: [
      {
        id: "free_measurement",
        text: "🪟 Gratis Inmeten",
        action: "appointment_booking",
        icon: Calendar,
        emoji: "🪟"
      },
      {
        id: "style_advice", 
        text: "🎨 Stijladvies",
        action: "style_consultation",
        icon: Palette,
        emoji: "🎨"
      },
      {
        id: "request_quote",
        text: "🧾 Offerte", 
        action: "quote_request",
        icon: FileText,
        emoji: "🧾"
      },
      {
        id: "view_gallery",
        text: "🖼️ Galerij",
        action: "product_gallery",
        icon: ImageIcon,
        emoji: "🖼️"
      },
      {
        id: "product_info",
        text: "📦 Product Info",
        action: "product_information",
        icon: Info,
        emoji: "📦"
      },
      {
        id: "help_choosing", 
        text: "❓ Hulp Kiezen",
        action: "interactive_qa",
        icon: HelpCircle,
        emoji: "❓"
      },
      {
        id: "business_solutions",
        text: "🏢 Zakelijke Oplossingen",
        action: "business_solutions",
        icon: Building2,
        emoji: "🏢"
      }
    ],
    fr: [
      {
        id: "free_measurement",
        text: "🪟 Mesure Gratuite",
        action: "appointment_booking",
        icon: Calendar,
        emoji: "🪟"
      },
      {
        id: "style_advice",
        text: "🎨 Conseils Style",
        action: "style_consultation", 
        icon: Palette,
        emoji: "🎨"
      },
      {
        id: "request_quote",
        text: "🧾 Devis",
        action: "quote_request",
        icon: FileText,
        emoji: "🧾"
      },
      {
        id: "view_gallery",
        text: "🖼️ Galerie",
        action: "product_gallery",
        icon: ImageIcon,
        emoji: "🖼️"
      },
      {
        id: "product_info",
        text: "📦 Info Produit",
        action: "product_information",
        icon: Info,
        emoji: "📦"
      },
      {
        id: "help_choosing",
        text: "❓ Aide Choix",
        action: "interactive_qa",
        icon: HelpCircle,
        emoji: "❓"
      }
    ],
    en: [
      {
        id: "free_measurement", 
        text: "🪟 Free Measurement Appointment",
        action: "appointment_booking",
        icon: Calendar,
        emoji: "🪟"
      },
      {
        id: "style_advice",
        text: "🎨 Get Style Advice",
        action: "style_consultation",
        icon: Palette,
        emoji: "🎨"
      },
      {
        id: "request_quote",
        text: "🧾 Request a Quote",
        action: "quote_request",
        icon: FileText,
        emoji: "🧾"
      },
      {
        id: "view_gallery",
        text: "🖼️ View Product Gallery",
        action: "product_gallery",
        icon: ImageIcon,
        emoji: "🖼️"
      },
      {
        id: "product_info",
        text: "📦 Product Information", 
        action: "product_information",
        icon: Info,
        emoji: "📦"
      },
      {
        id: "help_choosing",
        text: "❓ Need Help Choosing?",
        action: "interactive_qa",
        icon: HelpCircle,
        emoji: "❓"
      }
    ],
    tr: [
      {
        id: "free_measurement",
        text: "🪟 Ücretsiz Ölçüm Randevusu",
        action: "appointment_booking",
        icon: Calendar,
        emoji: "🪟"
      },
      {
        id: "style_advice",
        text: "🎨 Stil Tavsiyesi Al",
        action: "style_consultation",
        icon: Palette,
        emoji: "🎨"
      },
      {
        id: "request_quote",
        text: "🧾 Teklif İste",
        action: "quote_request",
        icon: FileText,
        emoji: "🧾"
      },
      {
        id: "view_gallery",
        text: "🖼️ Ürün Galerisini Görüntüle",
        action: "product_gallery", 
        icon: ImageIcon,
        emoji: "🖼️"
      },
      {
        id: "product_info",
        text: "📦 Ürün Bilgileri",
        action: "product_information",
        icon: Info,
        emoji: "📦"
      },
      {
        id: "help_choosing",
        text: "❓ Seçim Konusunda Yardım?",
        action: "interactive_qa",
        icon: HelpCircle,
        emoji: "❓"
      }
    ]
  };

  const currentButtons = coreButtons[language as keyof typeof coreButtons] || coreButtons.nl;

  // Step 4: Track button clicks for engagement analysis  
  const handleButtonClick = (button: SuggestionButton) => {
    // Track which button was clicked
    const clickData = {
      buttonId: button.id,
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
      language: language
    };
    
    // Save to session storage for tracking
    const existingClicks = JSON.parse(sessionStorage.getItem('kaniou_button_clicks') || '[]');
    existingClicks.push(clickData);
    sessionStorage.setItem('kaniou_button_clicks', JSON.stringify(existingClicks));
    
    // Update local tracking
    setButtonClickTracking(prev => [...prev, button.id]);
    
    // Hide suggestions immediately when user clicks
    onHide();
    
    // Trigger the chatbot action
    onSuggestionClick(button.text, button.action);
    
    // Update last chat time to reset 24-hour timer
    localStorage.setItem('kaniou_last_chat_time', Date.now().toString());
  };

  // Step 4: Show reminder prompt after 30 seconds if no buttons clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonClickTracking.length === 0) {
        setShowReminderPrompt(true);
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [buttonClickTracking.length]);

  return (
    <div className="mb-4 w-full animate-in slide-in-from-bottom-4 duration-500">
      {/* Main Suggestion Interface */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-amber-900">
            {(() => {
              const welcomeTexts = {
                nl: "Welkom bij KANIOU! Waarmee kunnen we u helpen?",
                fr: "Bienvenue chez KANIOU! Comment pouvons-nous vous aider?",
                en: "Welcome to KANIOU! How can we help you today?",
                tr: "KANIOU'ya hoş geldiniz! Size nasıl yardımcı olabiliriz?"
              };
              return welcomeTexts[language as keyof typeof welcomeTexts] || welcomeTexts.nl;
            })()}
          </span>
        </div>
        
        {/* Step 4: Core Suggestion Buttons Grid - Responsive layout for all screen sizes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4 chatbot-suggestion-grid">
          {currentButtons.map((button) => {
            const IconComponent = button.icon;
            return (
              <Button
                key={button.id}
                variant="outline"
                className="h-auto min-h-[80px] md:min-h-[90px] p-4 md:p-6 text-center justify-center bg-white hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 border-amber-200 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-lg rounded-xl group w-full chatbot-suggestion-button"
                onClick={() => handleButtonClick(button)}
              >
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="flex items-center justify-center">
                    <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300">{button.emoji}</span>
                  </div>
                  <div className="flex-1 text-center px-1">
                    <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-amber-800 transition-colors duration-300 leading-snug block break-words">
                      {button.text.replace(button.emoji, '').trim()}
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        {/* Step 4: Reminder Prompt after 30 seconds */}
        {showReminderPrompt && (
          <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-800">
                {(() => {
                  const reminderTexts = {
                    nl: "Hulp nodig om te beginnen? Kies een van de opties hierboven of stel uw vraag!",
                    fr: "Besoin d'aide pour commencer? Choisissez une option ci-dessus ou posez votre question!",
                    en: "Need help getting started? Choose one of the options above or ask your question!",
                    tr: "Başlamak için yardıma mı ihtiyacınız var? Yukarıdaki seçeneklerden birini seçin veya sorunuzu sorun!"
                  };
                  return reminderTexts[language as keyof typeof reminderTexts] || reminderTexts.nl;
                })()}
              </span>
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-amber-200 text-xs text-amber-700 opacity-75 text-center">
          {(() => {
            const hintTexts = {
              nl: "Klik op een knop hierboven of begin te typen voor persoonlijke hulp",
              fr: "Cliquez sur un bouton ci-dessus ou commencez à taper pour une aide personnalisée", 
              en: "Click a button above or start typing for personalized assistance",
              tr: "Kişiselleştirilmiş yardım için yukarıdaki bir düğmeye tıklayın veya yazmaya başlayın"
            };
            return hintTexts[language as keyof typeof hintTexts] || hintTexts.nl;
          })()}
        </div>
      </div>
    </div>
  );
}