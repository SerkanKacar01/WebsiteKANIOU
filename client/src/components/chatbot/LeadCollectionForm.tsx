import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Loader2, User, Mail, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface LeadCollectionFormProps {
  onSubmit: (data: { name: string; email: string; gdprConsent: boolean }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export function LeadCollectionForm({ onSubmit, onCancel, isSubmitting, className }: LeadCollectionFormProps) {
  const [step, setStep] = useState<'name' | 'email' | 'consent'>('name');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gdprConsent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { language, t } = useLanguage();

  const getStepTitle = () => {
    const titles = {
      nl: {
        name: "Wat is uw naam?",
        email: "Wat is uw e-mailadres?",
        consent: "Bevestig uw gegevens"
      },
      en: {
        name: "What is your name?",
        email: "What is your email address?",
        consent: "Confirm your details"
      },
      fr: {
        name: "Quel est votre nom?",
        email: "Quelle est votre adresse e-mail?",
        consent: "Confirmez vos détails"
      },
      tr: {
        name: "Adınız nedir?",
        email: "E-posta adresiniz nedir?",
        consent: "Bilgilerinizi onaylayın"
      }
    };
    return titles[language as keyof typeof titles]?.[step] || titles.nl[step];
  };

  const getMessages = () => {
    const messages = {
      nl: {
        nameHelper: "Dit helpt ons uw offerte te personaliseren",
        emailHelper: "Hier sturen we uw persoonlijke offerte naartoe",
        gdprText: "Ik ga akkoord met het delen van mijn contactgegevens voor het ontvangen van een offerte.",
        privacyNote: "We gebruiken uw e-mail alleen voor offerteaanvragen en respecteren uw privacy.",
        submitButton: "Offerte aanvragen",
        nextButton: "Volgende",
        backButton: "Terug",
        cancelButton: "Annuleren"
      },
      en: {
        nameHelper: "This helps us personalize your offer",
        emailHelper: "We'll send your personalized offer here",
        gdprText: "I agree to share my contact details for the purpose of receiving an offer.",
        privacyNote: "We only use your email for offer requests and respect your privacy.",
        submitButton: "Request offer",
        nextButton: "Next",
        backButton: "Back",
        cancelButton: "Cancel"
      },
      fr: {
        nameHelper: "Cela nous aide à personnaliser votre offre",
        emailHelper: "Nous enverrons votre offre personnalisée ici",
        gdprText: "J'accepte de partager mes coordonnées dans le but de recevoir une offre.",
        privacyNote: "Nous utilisons votre e-mail uniquement pour les demandes d'offres et respectons votre vie privée.",
        submitButton: "Demander une offre",
        nextButton: "Suivant",
        backButton: "Retour",
        cancelButton: "Annuler"
      },
      tr: {
        nameHelper: "Bu, teklifinizi kişiselleştirmemize yardımcı olur",
        emailHelper: "Kişiselleştirilmiş teklifinizi buraya göndereceğiz",
        gdprText: "Teklif almak amacıyla iletişim bilgilerimi paylaşmayı kabul ediyorum.",
        privacyNote: "E-postanızı yalnızca teklif talepleri için kullanırız ve gizliliğinize saygı duyarız.",
        submitButton: "Teklif iste",
        nextButton: "İleri",
        backButton: "Geri",
        cancelButton: "İptal"
      }
    };
    return messages[language as keyof typeof messages] || messages.nl;
  };

  const messages = getMessages();

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 'name' && !formData.name.trim()) {
      newErrors.name = language === 'nl' ? 'Naam is verplicht' : 
                      language === 'en' ? 'Name is required' :
                      language === 'fr' ? 'Le nom est requis' :
                      'Ad gereklidir';
    }

    if (step === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = language === 'nl' ? 'E-mailadres is verplicht' :
                         language === 'en' ? 'Email address is required' :
                         language === 'fr' ? 'L\'adresse e-mail est requise' :
                         'E-posta adresi gereklidir';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = language === 'nl' ? 'Ongeldig e-mailadres' :
                         language === 'en' ? 'Invalid email address' :
                         language === 'fr' ? 'Adresse e-mail invalide' :
                         'Geçersiz e-posta adresi';
      }
    }

    if (step === 'consent' && !formData.gdprConsent) {
      newErrors.consent = language === 'nl' ? 'Toestemming is verplicht' :
                         language === 'en' ? 'Consent is required' :
                         language === 'fr' ? 'Le consentement est requis' :
                         'Onay gereklidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step === 'name') {
      setStep('email');
    } else if (step === 'email') {
      setStep('consent');
    }
  };

  const handleBack = () => {
    if (step === 'email') {
      setStep('name');
    } else if (step === 'consent') {
      setStep('email');
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    onSubmit(formData);
  };

  return (
    <div className={`bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-300 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          {step === 'name' ? <User className="h-4 w-4 text-white" /> :
           step === 'email' ? <Mail className="h-4 w-4 text-white" /> :
           <Shield className="h-4 w-4 text-white" />}
        </div>
        <h3 className="font-semibold text-gray-800">{getStepTitle()}</h3>
      </div>

      {/* Progress indicator */}
      <div className="flex gap-1 mb-4">
        <div className={`flex-1 h-1 rounded ${step === 'name' ? 'bg-primary' : 'bg-primary/30'}`}></div>
        <div className={`flex-1 h-1 rounded ${step === 'email' ? 'bg-primary' : step === 'consent' ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 h-1 rounded ${step === 'consent' ? 'bg-primary' : 'bg-gray-200'}`}></div>
      </div>

      {step === 'name' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              {language === 'nl' ? 'Uw naam' : 
               language === 'en' ? 'Your name' :
               language === 'fr' ? 'Votre nom' :
               'Adınız'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={language === 'nl' ? 'Bijv. Jan Janssen' :
                          language === 'en' ? 'e.g. John Doe' :
                          language === 'fr' ? 'p.ex. Jean Dupont' :
                          'örn. Ahmet Yılmaz'}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <p className="text-xs text-gray-600">{messages.nameHelper}</p>
        </div>
      )}

      {step === 'email' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              {language === 'nl' ? 'Uw e-mailadres' :
               language === 'en' ? 'Your email address' :
               language === 'fr' ? 'Votre adresse e-mail' :
               'E-posta adresiniz'}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={language === 'nl' ? 'voorbeeld@email.com' :
                          language === 'en' ? 'example@email.com' :
                          language === 'fr' ? 'exemple@email.com' :
                          'ornek@email.com'}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <p className="text-xs text-gray-600">{messages.emailHelper}</p>
        </div>
      )}

      {step === 'consent' && (
        <div className="space-y-4">
          <div className="bg-white p-3 rounded border border-amber-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong>{language === 'nl' ? 'Uw gegevens:' :
                       language === 'en' ? 'Your details:' :
                       language === 'fr' ? 'Vos détails:' :
                       'Bilgileriniz:'}</strong>
            </p>
            <p className="text-sm"><strong>{language === 'nl' ? 'Naam:' : language === 'en' ? 'Name:' : language === 'fr' ? 'Nom:' : 'Ad:'}</strong> {formData.name}</p>
            <p className="text-sm"><strong>Email:</strong> {formData.email}</p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="gdpr-consent"
              checked={formData.gdprConsent}
              onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: !!checked })}
              disabled={isSubmitting}
            />
            <Label htmlFor="gdpr-consent" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
              {messages.gdprText}
            </Label>
          </div>
          {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
          
          <div className="bg-blue-50 border border-blue-200 p-3 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {language === 'nl' ? 'Privacy Bescherming' :
                 language === 'en' ? 'Privacy Protection' :
                 language === 'fr' ? 'Protection de la vie privée' :
                 'Gizlilik Koruması'}
              </span>
            </div>
            <p className="text-xs text-blue-700">{messages.privacyNote}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        {step !== 'name' && (
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isSubmitting}
            className="flex-1"
          >
            {messages.backButton}
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          {messages.cancelButton}
        </Button>

        <Button
          onClick={step === 'consent' ? handleSubmit : handleNext}
          disabled={isSubmitting}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : step === 'consent' ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" />
              {messages.submitButton}
            </>
          ) : (
            messages.nextButton
          )}
        </Button>
      </div>
    </div>
  );
}