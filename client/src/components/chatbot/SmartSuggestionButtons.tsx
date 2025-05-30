import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { MessageSquare, Calculator, Palette, FileText, HelpCircle, Home } from "lucide-react";

interface SmartSuggestionButtonsProps {
  onSuggestionClick: (suggestion: string, action?: string) => void;
  onHide: () => void;
}

interface SuggestionButton {
  text: string;
  action?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SmartSuggestionButtons({ onSuggestionClick, onHide }: SmartSuggestionButtonsProps) {
  const { language } = useLanguage();

  // Multilingual suggestion buttons
  const suggestions: Record<string, SuggestionButton[]> = {
    nl: [
      {
        text: "Gratis inmeten aanvragen",
        action: "request_quote",
        icon: Calculator
      },
      {
        text: "Stijladvies krijgen",
        action: "style_consultation", 
        icon: Palette
      },
      {
        text: "Offerte aanvragen",
        action: "request_quote",
        icon: FileText
      },
      {
        text: "Productvoorbeelden bekijken",
        action: "view_gallery",
        icon: Home
      },
      {
        text: "Wat voor producten bieden jullie aan?",
        icon: HelpCircle
      },
      {
        text: "Help me de juiste raambekleding te kiezen",
        action: "style_consultation",
        icon: MessageSquare
      }
    ],
    fr: [
      {
        text: "Demander une mesure gratuite",
        action: "request_quote",
        icon: Calculator
      },
      {
        text: "Obtenir des conseils de style",
        action: "style_consultation",
        icon: Palette
      },
      {
        text: "Demander un devis",
        action: "request_quote", 
        icon: FileText
      },
      {
        text: "Voir des exemples de produits",
        action: "view_gallery",
        icon: Home
      },
      {
        text: "Quels types de produits proposez-vous?",
        icon: HelpCircle
      },
      {
        text: "Aidez-moi à choisir le bon store",
        action: "style_consultation",
        icon: MessageSquare
      }
    ],
    en: [
      {
        text: "Request free measurement",
        action: "request_quote",
        icon: Calculator
      },
      {
        text: "Get style advice", 
        action: "style_consultation",
        icon: Palette
      },
      {
        text: "Request a quote",
        action: "request_quote",
        icon: FileText
      },
      {
        text: "View product examples",
        action: "view_gallery",
        icon: Home
      },
      {
        text: "What kind of products do you offer?",
        icon: HelpCircle
      },
      {
        text: "Help me choose the right window treatment",
        action: "style_consultation",
        icon: MessageSquare
      }
    ],
    tr: [
      {
        text: "Ücretsiz ölçüm talep et",
        action: "request_quote",
        icon: Calculator
      },
      {
        text: "Stil tavsiyesi al",
        action: "style_consultation",
        icon: Palette
      },
      {
        text: "Teklif iste",
        action: "request_quote",
        icon: FileText
      },
      {
        text: "Ürün örneklerini görüntüle",
        action: "view_gallery", 
        icon: Home
      },
      {
        text: "Ne tür ürünler sunuyorsunuz?",
        icon: HelpCircle
      },
      {
        text: "Doğru perde seçiminde yardım et",
        action: "style_consultation",
        icon: MessageSquare
      }
    ]
  };

  const currentSuggestions = suggestions[language as keyof typeof suggestions] || suggestions.nl;

  const handleSuggestionClick = (suggestion: SuggestionButton) => {
    onHide(); // Hide the suggestions immediately
    onSuggestionClick(suggestion.text, suggestion.action);
  };

  return (
    <div className="mb-4 w-full animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-900">
            {(() => {
              const welcomeTexts = {
                nl: "Welkom bij KANIOU! Hoe kunnen we u vandaag helpen?",
                fr: "Bienvenue chez KANIOU! Comment pouvons-nous vous aider aujourd'hui?",
                en: "Welcome to KANIOU! How can we assist you today?",
                tr: "KANIOU'ya hoş geldiniz! Bugün size nasıl yardımcı olabiliriz?"
              };
              return welcomeTexts[language as keyof typeof welcomeTexts] || welcomeTexts.nl;
            })()}
          </span>
        </div>
        
        <div className="grid gap-2">
          {currentSuggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 text-left justify-start bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <IconComponent className="h-4 w-4 mr-3 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 break-words flex-1 text-left">
                  {suggestion.text}
                </span>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-3 text-xs text-blue-600 opacity-75 text-center">
          {(() => {
            const hintTexts = {
              nl: "Klik op een suggestie of typ uw eigen vraag",
              fr: "Cliquez sur une suggestion ou tapez votre propre question", 
              en: "Click a suggestion or type your own question",
              tr: "Bir öneri seçin veya kendi sorunuzu yazın"
            };
            return hintTexts[language as keyof typeof hintTexts] || hintTexts.nl;
          })()}
        </div>
      </div>
    </div>
  );
}