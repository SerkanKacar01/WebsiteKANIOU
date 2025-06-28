import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  FileText, 
  Phone, 
  Ruler, 
  HelpCircle,
  X,
  Search
} from "lucide-react";

// Callback form modal component
const CallbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          type: 'callback'
        }),
      });

      if (response.ok) {
        setShowConfirmation(true);
        setFormData({ firstName: "", lastName: "", phone: "" });
        setTimeout(() => {
          setShowConfirmation(false);
          onClose();
        }, 3000);
      } else {
        toast({
          title: "Er is iets misgegaan",
          description: "Probeer het later opnieuw of bel ons direct.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Er is iets misgegaan",
        description: "Controleer uw internetverbinding en probeer opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-[#D0B378]" />
            Bel ons terug
          </DialogTitle>
        </DialogHeader>
        {showConfirmation ? (
          <div className="text-center py-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verzoek ontvangen!</h3>
            <p className="text-gray-600">
              Uw terugbelverzoek is ontvangen. We contacteren u zo snel mogelijk.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="callback-firstName">Voornaam *</Label>
                <Input
                  id="callback-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Voornaam"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="callback-lastName">Achternaam *</Label>
                <Input
                  id="callback-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Achternaam"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-phone">Telefoonnummer *</Label>
              <Input
                id="callback-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+32 xxx xx xx xx"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1"
                disabled={isSubmitting}
              >
                Annuleren
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wordt verstuurd..." : "Verzoek indienen"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Contact form modal component
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          type: 'question'
        }),
      });

      if (response.ok) {
        setShowConfirmation(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowConfirmation(false);
          onClose();
        }, 3000);
      } else {
        toast({
          title: "Er is iets misgegaan",
          description: "Probeer het later opnieuw.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Er is iets misgegaan",
        description: "Controleer uw internetverbinding en probeer opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#D0B378]" />
            Stel je vraag
          </DialogTitle>
        </DialogHeader>
        {showConfirmation ? (
          <div className="text-center py-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vraag verzonden!</h3>
            <p className="text-gray-600">
              Dank je wel voor je vraag. We nemen zo snel mogelijk contact met je op.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Naam *</Label>
              <Input
                id="contact-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Uw naam"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">E-mailadres *</Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="uw@email.be"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Bericht *</Label>
              <Textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Stel hier je vraag..."
                rows={4}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1"
                disabled={isSubmitting}
              >
                Annuleren
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wordt verzonden..." : "Verzend vraag"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Measuring instructions modal component
const MeasuringModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-[#D0B378]" />
            Meetinstructies
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Video embed placeholder */}
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D0B378] rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white ml-1" />
              </div>
              <p className="text-gray-600">Video: Zo meet je correct op</p>
              <p className="text-sm text-gray-500 mt-2">
                YouTube instructievideo wordt hier geladen
              </p>
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stap-voor-stap instructies:</h3>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">1. Gereedschap voorbereiden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Zorg voor een goede rolmeter (minimaal 3 meter) en eventueel hulp bij grote ramen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">2. Breedte meten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Meet de breedte van het raam op 3 punten: boven, midden en onder. 
                  Neem altijd de kleinste maat en rond af naar beneden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">3. Hoogte meten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Meet de hoogte links, midden en rechts. Ook hier de kleinste maat aanhouden 
                  en naar beneden afronden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">4. Montage type bepalen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Bepaal of u binnen of buiten de sponning wilt monteren. 
                  Dit beïnvloedt de benodigde afmetingen.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Tip:</strong> Bij twijfel over de juiste maten? 
              Onze monteurs kunnen altijd langskomen voor een gratis opmeting.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// FAQ preview component
const FAQPreview = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const faqs = [
    {
      question: "Hoe lang duurt de levering?",
      answer: "Standaard producten worden binnen 2-3 weken geleverd. Maatwerk kan 4-6 weken duren."
    },
    {
      question: "Bieden jullie ook montage aan?",
      answer: "Ja, wij bieden professionele montage door ervaren monteurs in heel België."
    },
    {
      question: "Kan ik eerst stalen ontvangen?",
      answer: "Natuurlijk! Wij sturen gratis stalen op zodat u thuis de perfecte kleur kunt kiezen."
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[340px] right-5 w-80 max-w-[calc(100vw-40px)] bg-white border border-gray-200 rounded-lg shadow-xl z-[10001]">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-[#D0B378]" />
          Veelgestelde vragen
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
        {faqs.map((faq, index) => (
          <Card key={index} className="border-l-4 border-l-[#D0B378]">
            <CardContent className="p-3">
              <h4 className="font-medium text-sm text-gray-900 mb-1">
                {faq.question}
              </h4>
              <p className="text-xs text-gray-600">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <Link href="/contact">
          <Button 
            size="sm" 
            className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white text-xs"
            onClick={onClose}
          >
            Bekijk alle FAQ's
          </Button>
        </Link>
      </div>
    </div>
  );
};

const FloatingActionButtons = () => {
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [measuringModalOpen, setMeasuringModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [faqPreviewVisible, setFaqPreviewVisible] = useState(false);

  const buttons = [
    {
      id: "contact",
      icon: MessageCircle,
      emoji: "💬",
      tooltip: "Stel je vraag",
      onClick: () => setContactModalOpen(true),
    },
    {
      id: "quote",
      icon: FileText,
      emoji: "📄",
      tooltip: "Vraag een offerte aan",
      href: "/offerte",
    },
    {
      id: "callback",
      icon: Phone,
      emoji: "📞",
      tooltip: "Bel ons terug",
      onClick: () => setCallbackModalOpen(true),
    },
    {
      id: "measuring",
      icon: Ruler,
      emoji: "🛠",
      tooltip: "Bekijk meetinstructies",
      onClick: () => setMeasuringModalOpen(true),
    },
    {
      id: "faq",
      icon: HelpCircle,
      emoji: "📚",
      tooltip: "Veelgestelde vragen",
      onClick: () => setFaqPreviewVisible(!faqPreviewVisible),
    }
  ];

  return (
    <>
      {/* Track Order Button - Desktop Only */}
      <div className="hidden lg:block fixed bottom-[340px] right-5 z-[9999]">
        <Link href="/volg-bestelling">
          <Button
            className="bg-[#D0B378] hover:bg-[#C5A565] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium"
            size="lg"
          >
            <Search className="h-4 w-4" />
            Volg uw bestelling
          </Button>
        </Link>
      </div>

      {/* Floating Action Buttons - Desktop & Mobile */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">
        {buttons.map((button, index) => {
          const IconComponent = button.icon;
          
          const ButtonContent = (
            <button
              className="
                /* Base styles */
                rounded-full bg-[#fdf4e3] text-gray-800 
                shadow-[0_2px_8px_rgba(0,0,0,0.15)] 
                transition-all duration-300 
                flex items-center justify-center
                /* Desktop: 50x50px */
                w-[50px] h-[50px]
                /* Mobile: 40x40px */
                max-[1023px]:w-[40px] max-[1023px]:h-[40px]
                /* Hover effects (desktop only) */
                hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                active:scale-95
                /* Focus styles */
                focus:outline-none focus:ring-2 focus:ring-[#D0B378] focus:ring-opacity-50
              "
              onClick={button.onClick}
            >
              {/* Show emoji on mobile, icon on desktop */}
              <span className="lg:hidden text-lg">
                {button.emoji}
              </span>
              <IconComponent className="hidden lg:block h-5 w-5" />
            </button>
          );

          return (
            <Tooltip key={button.id}>
              <TooltipTrigger asChild>
                {button.href ? (
                  <Link href={button.href}>
                    {ButtonContent}
                  </Link>
                ) : (
                  ButtonContent
                )}
              </TooltipTrigger>
              <TooltipContent 
                side="left" 
                className="bg-gray-900 text-white border-gray-700 hidden lg:block"
              >
                <p className="text-sm font-medium">{button.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Modals */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      
      <CallbackModal 
        isOpen={callbackModalOpen} 
        onClose={() => setCallbackModalOpen(false)} 
      />
      
      <MeasuringModal 
        isOpen={measuringModalOpen} 
        onClose={() => setMeasuringModalOpen(false)} 
      />

      {/* FAQ Preview Popup */}
      <FAQPreview 
        isVisible={faqPreviewVisible} 
        onClose={() => setFaqPreviewVisible(false)} 
      />
    </>
  );
};

export default FloatingActionButtons;