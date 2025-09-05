import { useState } from "react";
import { Link, useLocation } from "wouter";
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
 
  HelpCircle,
  X,
  Package,
  MapPin
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


// Order tracking modal component
const TrackingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      toast({
        title: "Bestelnummer vereist",
        description: "Voer uw bestelnummer in om uw bestelling te volgen.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/orders/track/bonnummer/${orderNumber.trim()}`);
      
      if (response.ok) {
        const order = await response.json();
        onClose();
        navigate(`/bestelling-status/${order.id}`);
      } else if (response.status === 404) {
        toast({
          title: "Bestelling niet gevonden",
          description: "Er is geen bestelling gevonden met dit bestelnummer. Controleer het nummer en probeer opnieuw.",
          variant: "destructive",
        });
      } else {
        throw new Error("Network error");
      }
    } catch (error) {
      console.error("Error tracking order:", error);
      toast({
        title: "Fout bij het opzoeken",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[#D0B378]" />
            Volg uw bestelling
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleTrackOrder} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="order-number">Bestelnummer *</Label>
            <Input
              id="order-number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Voer uw bestelnummer in..."
              required
              disabled={isLoading}
              className="text-center font-mono"
            />
            <p className="text-xs text-gray-500 text-center">
              U vindt uw bestelnummer in uw bevestigingsmail
            </p>
          </div>
          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isLoading}
            >
              Annuleren
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]"
              disabled={isLoading || !orderNumber.trim()}
            >
              {isLoading ? "Zoeken..." : "Volg bestelling"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FloatingActionButtons = () => {
  const [location] = useLocation();
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);


  // Only show floating buttons on homepage
  if (location !== "/") {
    return null;
  }

  const buttons = [
    {
      id: "track-order",
      icon: Package,
      emoji: "📦",
      tooltip: "Volg uw bestelling",
      onClick: () => setTrackingModalOpen(true),
    },
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
  ];

  return (
    <>
      {/* Mid-Screen "Ook Online" Floating Button - Desktop Only */}
      <div className="hidden md:block fixed right-5 top-1/2 transform -translate-y-1/2 z-[9998]">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {/* Placeholder action */}}
              className="
                px-5 py-[10px] bg-white border-2 border-[#D6B36A] text-[#D6B36A] 
                font-semibold text-[16px] rounded-[30px] 
                shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                hover:bg-[#D6B36A] hover:text-white hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-[#D6B36A] focus:ring-opacity-50
                font-['Inter',sans-serif] tracking-wide
                transform hover:scale-105 active:scale-95
              "
            >
              Ook Online
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="left" 
            className="bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg px-3 py-2"
            sideOffset={15}
          >
            <p className="text-sm font-medium">Online tools en services</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Floating Action Buttons - Desktop & Mobile */}
      <div className="flex fixed bottom-6 right-6 z-[9999] flex-col gap-3">
        {buttons.map((button, index) => {
          const IconComponent = button.icon;
          
          const ButtonContent = (
            <button
              className="
                /* Base styles */
                rounded-full bg-[#E9C882] text-gray-800 
                shadow-[0_2px_8px_rgba(0,0,0,0.15)] 
                transition-all duration-300 
                flex items-center justify-center
                /* Updated size: max 48x48px as requested */
                w-12 h-12
                /* Mobile: slightly smaller */
                max-[1023px]:w-10 max-[1023px]:h-10
                /* Enhanced hover effects */
                hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]
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
                className="bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg px-3 py-2"
                sideOffset={10}
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
      
      
      <TrackingModal 
        isOpen={trackingModalOpen} 
        onClose={() => setTrackingModalOpen(false)} 
      />
    </>
  );
};

export default FloatingActionButtons;