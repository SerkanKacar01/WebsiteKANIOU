import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

// Custom Tooltip Component for floating action buttons
interface CustomTooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "left" | "top";
}

const CustomTooltip = ({ text, children, position = "left" }: CustomTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowTooltip(false);
    }
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setShowTooltip(true);
      // Auto-hide after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      // Small delay before hiding to ensure visibility
      setTimeout(() => setShowTooltip(false), 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipClasses = `
    absolute z-[9999] bg-[#f9f3e6] text-[#333] text-xs px-2.5 py-1.5 rounded-md
    transition-opacity duration-200 ease-in-out whitespace-nowrap max-w-[180px] text-center
    shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
    ${isMobile ? 
      'bottom-full mb-2 left-1/2 -translate-x-1/2' : 
      'right-full mr-2 top-1/2 -translate-y-1/2'
    }
  `;

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="inline-block"
      >
        {children}
      </div>
      <div className={tooltipClasses} style={{ fontSize: '13px' }}>
        {text}
      </div>
    </div>
  );
};

// Callback form modal component
const CallbackModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    name: "",
    message: ""
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
        setFormData({ firstName: "", lastName: "", phone: "", name: "", message: "" });
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
            Terugbelverzoek
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="callback-name">Uw naam *</Label>
            <Input
              id="callback-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Voornaam en achternaam"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="callback-phone">Telefoonnummer *</Label>
            <Input
              id="callback-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+32 xxx xx xx xx"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="callback-message">Bericht (optioneel)</Label>
            <Textarea
              id="callback-message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Waar kunnen we u mee helpen?"
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]"
            >
              Verstuur verzoek
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Measuring instructions modal component
const MeasuringModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
            <h3 className="font-semibold text-lg">
              Stap-voor-stap instructies:
            </h3>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  1. Gereedschap voorbereiden
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Zorg voor een goede rolmeter (minimaal 3 meter) en eventueel
                  hulp bij grote ramen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">2. Breedte meten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Meet de breedte van het raam op 3 punten: boven, midden en
                  onder. Neem altijd de kleinste maat en rond af naar beneden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">3. Hoogte meten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Meet de hoogte links, midden en rechts. Ook hier de kleinste
                  maat aanhouden en naar beneden afronden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  4. Montage type bepalen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Bepaal of u binnen of buiten de sponning wilt monteren. Dit
                  beïnvloedt de benodigde afmetingen.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Tip:</strong> Bij twijfel over de juiste maten? Onze
              monteurs kunnen altijd langskomen voor een gratis opmeting.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// FAQ preview component
const FAQPreview = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const faqs = [
    {
      question: "Hoe lang duurt de levering?",
      answer:
        "Standaard producten worden binnen 2-3 weken geleverd. Maatwerk kan 4-6 weken duren.",
    },
    {
      question: "Bieden jullie ook montage aan?",
      answer:
        "Ja, wij bieden professionele montage door ervaren monteurs in heel België.",
    },
    {
      question: "Kan ik eerst stalen ontvangen?",
      answer:
        "Natuurlijk! Wij sturen gratis stalen op zodat u thuis de perfecte kleur kunt kiezen.",
    },
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
        <Link href="https://54ca87fe-f094-4763-9137-6a31f2c28cd1-00-uqsrparzx25r.janeway.replit.dev/about#faq">
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

// Contact modal component
const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form:", formData);
    onClose();
    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#D0B378]" />
            Stel je vraag
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Naam *</Label>
              <Input
                id="contact-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Uw naam"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">E-mail *</Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="uw@email.be"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Telefoon</Label>
            <Input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+32 xxx xx xx xx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-subject">Onderwerp *</Label>
            <Input
              id="contact-subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Waar gaat uw vraag over?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Bericht *</Label>
            <Textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Beschrijf uw vraag in detail..."
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]"
            >
              Verstuur vraag
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FloatingActionButtons = () => {
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [measuringModalOpen, setMeasuringModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [faqPreviewVisible, setFaqPreviewVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    },
  ];

  return (
    <>
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
              <span className="lg:hidden text-lg">{button.emoji}</span>
              <IconComponent className="hidden lg:block h-5 w-5" />
            </button>
          );

          return (
            <CustomTooltip key={button.id} text={button.tooltip}>
              {button.href ? (
                <Link href={button.href}>{ButtonContent}</Link>
              ) : (
                ButtonContent
              )}
            </CustomTooltip>
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
