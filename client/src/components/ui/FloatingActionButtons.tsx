import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  FileText, 
  Phone, 
  Ruler, 
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Callback form modal component
const CallbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Callback request:", formData);
    onClose();
    // Reset form
    setFormData({ name: "", phone: "", message: "" });
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+32 xxx xx xx xx"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="callback-message">Bericht (optioneel)</Label>
            <Textarea
              id="callback-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Waar kunnen we u mee helpen?"
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuleren
            </Button>
            <Button type="submit" className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]">
              Verstuur verzoek
            </Button>
          </div>
        </form>
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
    <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-[10001]">
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

// Contact modal component
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+32 xxx xx xx xx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-subject">Onderwerp *</Label>
            <Input
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Waar gaat uw vraag over?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Bericht *</Label>
            <Textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Beschrijf uw vraag in detail..."
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuleren
            </Button>
            <Button type="submit" className="flex-1 bg-[#D0B378] hover:bg-[#C5A565]">
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

  const buttons = [
    {
      id: "contact",
      icon: MessageCircle,
      tooltip: "Stel je vraag",
      onClick: () => setContactModalOpen(true),
      className: "bg-[#D0B378] hover:bg-[#C5A565] text-white shadow-lg hover:shadow-xl"
    },
    {
      id: "quote",
      icon: FileText,
      tooltip: "Vraag een offerte aan",
      href: "/offerte",
      className: "bg-[#E6C988] hover:bg-[#D0B378] text-gray-800 shadow-lg hover:shadow-xl"
    },
    {
      id: "callback",
      icon: Phone,
      tooltip: "Bel ons terug",
      onClick: () => setCallbackModalOpen(true),
      className: "bg-[#2C3E50] hover:bg-[#34495E] text-white shadow-lg hover:shadow-xl"
    },
    {
      id: "measuring",
      icon: Ruler,
      tooltip: "Bekijk meetinstructies",
      onClick: () => setMeasuringModalOpen(true),
      className: "bg-[#3498DB] hover:bg-[#2980B9] text-white shadow-lg hover:shadow-xl"
    },
    {
      id: "faq",
      icon: HelpCircle,
      tooltip: "Veelgestelde vragen",
      onClick: () => setFaqPreviewVisible(!faqPreviewVisible),
      className: "bg-[#E67E22] hover:bg-[#D35400] text-white shadow-lg hover:shadow-xl"
    }
  ];

  return (
    <>
      {/* Floating Action Buttons - Desktop Only */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-[10000]">
        <div className="flex flex-col gap-3">
          {buttons.map((button, index) => {
            const IconComponent = button.icon;
            
            const ButtonContent = (
              <Button
                className={`w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 transform ${button.className}`}
                size="sm"
                onClick={button.onClick}
              >
                <IconComponent className="h-5 w-5" />
              </Button>
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
                <TooltipContent side="left" className="bg-gray-900 text-white border-gray-700">
                  <p className="text-sm font-medium">{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
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

      {/* FAQ Preview Popup */}
      <FAQPreview 
        isVisible={faqPreviewVisible} 
        onClose={() => setFaqPreviewVisible(false)} 
      />
    </>
  );
};

export default FloatingActionButtons;