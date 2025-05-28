import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, FileText, Calculator, Phone, Mail } from "lucide-react";

interface QuickReplyOption {
  id: string;
  text: string;
  icon?: React.ReactNode;
  action: string;
  metadata?: any;
}

interface QuickReplyButtonsProps {
  options: QuickReplyOption[];
  onSelect: (option: QuickReplyOption) => void;
  disabled?: boolean;
  className?: string;
}

export function QuickReplyButtons({ options, onSelect, disabled, className }: QuickReplyButtonsProps) {
  const getIconForAction = (action: string) => {
    switch (action) {
      case 'request_offer_yes':
        return <CheckCircle className="h-4 w-4" />;
      case 'request_offer_no':
        return <XCircle className="h-4 w-4" />;
      case 'view_products':
        return <FileText className="h-4 w-4" />;
      case 'calculate_price':
        return <Calculator className="h-4 w-4" />;
      case 'contact_info':
        return <Phone className="h-4 w-4" />;
      case 'newsletter_signup':
        return <Mail className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col gap-2 mt-3 animate-in fade-in-50 duration-300 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          size="sm"
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="justify-start text-left h-auto p-3 border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-sm font-medium"
        >
          <div className="flex items-center gap-2 w-full">
            {option.icon || getIconForAction(option.action)}
            <span className="flex-1">{option.text}</span>
          </div>
        </Button>
      ))}
    </div>
  );
}

// Common quick reply option sets
export const PRICE_REQUEST_OPTIONS = (language: string = 'nl'): QuickReplyOption[] => {
  const options = {
    nl: [
      {
        id: 'offer_yes',
        text: '🔘 Ja, vraag een offerte aan',
        action: 'request_offer_yes',
        metadata: { type: 'price_request', flow: 'offer_yes' }
      },
      {
        id: 'offer_no',
        text: '🔘 Nee, misschien later',
        action: 'request_offer_no',
        metadata: { type: 'price_request', flow: 'offer_no' }
      }
    ],
    en: [
      {
        id: 'offer_yes',
        text: '🔘 Yes, request an offer',
        action: 'request_offer_yes',
        metadata: { type: 'price_request', flow: 'offer_yes' }
      },
      {
        id: 'offer_no',
        text: '🔘 No, maybe later',
        action: 'request_offer_no',
        metadata: { type: 'price_request', flow: 'offer_no' }
      }
    ],
    fr: [
      {
        id: 'offer_yes',
        text: '🔘 Oui, demander un devis',
        action: 'request_offer_yes',
        metadata: { type: 'price_request', flow: 'offer_yes' }
      },
      {
        id: 'offer_no',
        text: '🔘 Non, peut-être plus tard',
        action: 'request_offer_no',
        metadata: { type: 'price_request', flow: 'offer_no' }
      }
    ],
    tr: [
      {
        id: 'offer_yes',
        text: '🔘 Evet, teklif iste',
        action: 'request_offer_yes',
        metadata: { type: 'price_request', flow: 'offer_yes' }
      },
      {
        id: 'offer_no',
        text: '🔘 Hayır, belki daha sonra',
        action: 'request_offer_no',
        metadata: { type: 'price_request', flow: 'offer_no' }
      }
    ]
  };
  
  return options[language as keyof typeof options] || options.nl;
};

export const GENERAL_HELP_OPTIONS = (language: string = 'nl'): QuickReplyOption[] => {
  const options = {
    nl: [
      {
        id: 'products',
        text: '📋 Bekijk onze producten',
        action: 'view_products',
        metadata: { type: 'navigation' }
      },
      {
        id: 'calculator',
        text: '🧮 Prijscalculator',
        action: 'calculate_price',
        metadata: { type: 'navigation' }
      },
      {
        id: 'contact',
        text: '📞 Contactgegevens',
        action: 'contact_info',
        metadata: { type: 'information' }
      }
    ],
    en: [
      {
        id: 'products',
        text: '📋 View our products',
        action: 'view_products',
        metadata: { type: 'navigation' }
      },
      {
        id: 'calculator',
        text: '🧮 Price calculator',
        action: 'calculate_price',
        metadata: { type: 'navigation' }
      },
      {
        id: 'contact',
        text: '📞 Contact information',
        action: 'contact_info',
        metadata: { type: 'information' }
      }
    ],
    fr: [
      {
        id: 'products',
        text: '📋 Voir nos produits',
        action: 'view_products',
        metadata: { type: 'navigation' }
      },
      {
        id: 'calculator',
        text: '🧮 Calculateur de prix',
        action: 'calculate_price',
        metadata: { type: 'navigation' }
      },
      {
        id: 'contact',
        text: '📞 Informations de contact',
        action: 'contact_info',
        metadata: { type: 'information' }
      }
    ],
    tr: [
      {
        id: 'products',
        text: '📋 Ürünlerimizi görüntüle',
        action: 'view_products',
        metadata: { type: 'navigation' }
      },
      {
        id: 'calculator',
        text: '🧮 Fiyat hesaplayıcı',
        action: 'calculate_price',
        metadata: { type: 'navigation' }
      },
      {
        id: 'contact',
        text: '📞 İletişim bilgileri',
        action: 'contact_info',
        metadata: { type: 'information' }
      }
    ]
  };
  
  return options[language as keyof typeof options] || options.nl;
};