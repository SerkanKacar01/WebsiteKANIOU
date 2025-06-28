import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  X,
  Search,
} from "lucide-react";

// Mobile Tooltip Component
interface MobileTooltipProps {
  text: string;
  children: React.ReactNode;
  isVisible: boolean;
  onShow: () => void;
  onHide: () => void;
}

const MobileTooltip = ({ text, children, isVisible, onShow, onHide }: MobileTooltipProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    onShow();
    // Auto-hide after 3 seconds
    timeoutRef.current = setTimeout(() => {
      onHide();
    }, 3000);
  };

  const handleClick = () => {
    // Clear tooltip on actual button click
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onHide();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-[10000] bg-white text-gray-800 text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-gray-200">
          {text}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
        </div>
      )}
    </div>
  );
};

// Contact Modal Component (reused from main floating buttons)
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          type: 'question'
        }),
      });

      if (response.ok) {
        toast({
          title: "Vraag verzonden!",
          description: "We nemen binnen 24 uur contact met u op.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        onClose();
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
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#E9C882]" />
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
              disabled={isSubmitting}
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#E9C882] hover:bg-[#D5B992] text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Bezig..." : "Verstuur vraag"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Callback Modal Component
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        toast({
          title: "Terugbelverzoek verzonden!",
          description: "We bellen u vandaag nog terug.",
        });
        setFormData({ firstName: "", lastName: "", phone: "" });
        onClose();
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
            <Phone className="h-5 w-5 text-[#E9C882]" />
            Terugbelverzoek
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Voornaam *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="Voornaam"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Achternaam *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Achternaam"
                required
              />
            </div>
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
              className="flex-1 bg-[#E9C882] hover:bg-[#D5B992] text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Bezig..." : "Verstuur verzoek"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Measuring Modal Component
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
            <Ruler className="h-5 w-5 text-[#E9C882]" />
            Meetinstructies
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Video embed placeholder */}
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E9C882] rounded-full flex items-center justify-center mx-auto mb-4">
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

const MobileFloatingButtons = () => {
  const [location] = useLocation();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [measuringModalOpen, setMeasuringModalOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  // Only show floating buttons on homepage
  if (location !== "/") {
    return null;
  }

  const circularButtons = [
    {
      id: "contact",
      emoji: "💬",
      tooltip: "Stel je vraag",
      onClick: () => setContactModalOpen(true),
    },
    {
      id: "quote",
      emoji: "📄",
      tooltip: "Vraag een offerte aan",
      href: "/offerte",
    },
    {
      id: "callback",
      emoji: "📞",
      tooltip: "Bel ons terug",
      onClick: () => setCallbackModalOpen(true),
    },
    {
      id: "measuring",
      emoji: "🛠",
      tooltip: "Meetinstructies",
      onClick: () => setMeasuringModalOpen(true),
    },
  ];

  const showTooltip = (id: string) => setTooltipVisible(id);
  const hideTooltip = () => setTooltipVisible(null);

  return (
    <>
      {/* Only show on mobile screens (max-width: 1023px) */}
      <div className="lg:hidden">
        {/* Primary "Volg uw bestelling" Button */}
        <div className="fixed bottom-20 left-0 right-0 z-[9998] px-4">
          <Link href="/volg-bestelling">
            <Button className="w-full bg-[#E9C882] hover:bg-[#D5B992] text-black font-medium py-3 rounded-xl shadow-lg border border-[#D5B992]/30 flex items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              Volg uw bestelling
            </Button>
          </Link>
        </div>

        {/* Four Circular Floating Buttons */}
        <div className="fixed bottom-[140px] right-4 z-[9999] flex flex-col gap-3">
          {circularButtons.map((button) => {
            const buttonElement = (
              <button
                className="w-12 h-12 bg-[#E9C882] hover:bg-[#D5B992] text-black rounded-full shadow-lg border border-[#D5B992]/30 flex items-center justify-center text-lg transition-all duration-200 active:scale-95"
                onClick={button.onClick}
              >
                {button.emoji}
              </button>
            );

            return (
              <MobileTooltip
                key={button.id}
                text={button.tooltip}
                isVisible={tooltipVisible === button.id}
                onShow={() => showTooltip(button.id)}
                onHide={hideTooltip}
              >
                {button.href ? (
                  <Link href={button.href}>{buttonElement}</Link>
                ) : (
                  buttonElement
                )}
              </MobileTooltip>
            );
          })}
        </div>
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
    </>
  );
};

export default MobileFloatingButtons;