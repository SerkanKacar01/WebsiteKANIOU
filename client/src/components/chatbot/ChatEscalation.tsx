import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  UserPlus,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Headphones,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    type?: string;
    confidence?: number;
  };
}

interface ChatEscalationProps {
  conversationHistory: ChatMessage[];
  currentUserMessage: string;
  onEscalate: (escalationData: EscalationData) => void;
  onCancel: () => void;
  isEscalating?: boolean;
}

interface EscalationData {
  userName: string;
  userEmail: string;
  userPhone?: string;
  escalationReason: string;
  urgency: string;
  category: string;
  userMessage: string;
  preferredContact: string;
  userLocation?: string;
}

export function ChatEscalation({ 
  conversationHistory, 
  currentUserMessage, 
  onEscalate, 
  onCancel,
  isEscalating = false 
}: ChatEscalationProps) {
  const { language } = useLanguage();
  
  const [escalationData, setEscalationData] = useState<EscalationData>({
    userName: '',
    userEmail: '',
    userPhone: '',
    escalationReason: 'complex_query',
    urgency: 'medium',
    category: 'general',
    userMessage: currentUserMessage,
    preferredContact: 'email',
    userLocation: ''
  });

  const escalationReasons = [
    { value: 'pricing_request', label: 'Prijsinformatie & Offerte', icon: '💰', description: 'Ik wil een specifieke prijsopgave' },
    { value: 'complex_query', label: 'Complexe Vraag', icon: '🤔', description: 'Mijn vraag heeft persoonlijke expertise nodig' },
    { value: 'technical_issue', label: 'Technisch Probleem', icon: '⚙️', description: 'Montage, installatie of technische ondersteuning' },
    { value: 'custom_solution', label: 'Maatwerk Oplossing', icon: '🎨', description: 'Ik zoek een specifieke maatwerkoplossing' },
    { value: 'complaint', label: 'Klacht of Probleem', icon: '⚠️', description: 'Ik heb een klacht of probleem te melden' },
    { value: 'user_request', label: 'Persoonlijk Contact', icon: '👤', description: 'Ik wil gewoon met een mens spreken' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Laag', description: 'Geen haast', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Normaal', description: 'Binnen een dag', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'Hoog', description: 'Vandaag nog', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Dringend', description: 'Direct nodig', color: 'bg-red-100 text-red-800' }
  ];

  const categories = [
    { value: 'rolgordijnen', label: 'Rolgordijnen' },
    { value: 'overgordijnen', label: 'Overgordijnen' },
    { value: 'jaloezieen', label: 'Jaloezieën' },
    { value: 'plisse', label: 'Plissé gordijnen' },
    { value: 'shutters', label: 'Shutters' },
    { value: 'horren', label: 'Horren' },
    { value: 'montage', label: 'Montage & Installatie' },
    { value: 'algemeen', label: 'Algemene vraag' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEscalate(escalationData);
  };

  const isValid = escalationData.userName && escalationData.userEmail && escalationData.userMessage;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Doorverbinden naar Support</CardTitle>
              <p className="text-sm text-muted-foreground">
                Onze specialisten helpen u graag persoonlijk verder
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Uw contactgegevens
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Naam *</Label>
                  <Input
                    id="name"
                    value={escalationData.userName}
                    onChange={(e) => setEscalationData(prev => ({ ...prev, userName: e.target.value }))}
                    placeholder="Uw volledige naam"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mailadres *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={escalationData.userEmail}
                    onChange={(e) => setEscalationData(prev => ({ ...prev, userEmail: e.target.value }))}
                    placeholder="uw@email.be"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefoonnummer (optioneel)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={escalationData.userPhone}
                    onChange={(e) => setEscalationData(prev => ({ ...prev, userPhone: e.target.value }))}
                    placeholder="+32 123 456 789"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Locatie (optioneel)</Label>
                  <Input
                    id="location"
                    value={escalationData.userLocation}
                    onChange={(e) => setEscalationData(prev => ({ ...prev, userLocation: e.target.value }))}
                    placeholder="Stad of postcode"
                  />
                </div>
              </div>
            </div>

            {/* Reason for Escalation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Waarom wilt u doorverbonden worden?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {escalationReasons.map((reason) => (
                  <Button
                    key={reason.value}
                    type="button"
                    variant={escalationData.escalationReason === reason.value ? 'default' : 'outline'}
                    className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                    onClick={() => setEscalationData(prev => ({ ...prev, escalationReason: reason.value }))}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <span>{reason.icon}</span>
                      <span>{reason.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-normal">
                      {reason.description}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Urgency Level */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Hoe urgent is uw vraag?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {urgencyLevels.map((level) => (
                  <Button
                    key={level.value}
                    type="button"
                    variant={escalationData.urgency === level.value ? 'default' : 'outline'}
                    className="h-auto p-3 flex flex-col items-center gap-2"
                    onClick={() => setEscalationData(prev => ({ ...prev, urgency: level.value }))}
                  >
                    <Badge className={cn(
                      level.color,
                      escalationData.urgency === level.value && "bg-primary text-primary-foreground"
                    )}>
                      {level.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {level.description}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-4">
              <Label htmlFor="category">Product categorie</Label>
              <Select 
                value={escalationData.category} 
                onValueChange={(value) => setEscalationData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een categorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* User Message */}
            <div className="space-y-4">
              <Label htmlFor="message">Uw bericht *</Label>
              <Textarea
                id="message"
                value={escalationData.userMessage}
                onChange={(e) => setEscalationData(prev => ({ ...prev, userMessage: e.target.value }))}
                placeholder="Beschrijf hier uw vraag of probleem in detail..."
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">
                Geef zo veel mogelijk details zodat onze specialist u optimaal kan helpen.
              </p>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Hoe wilt u gecontacteerd worden?</h3>
              <RadioGroup 
                value={escalationData.preferredContact} 
                onValueChange={(value) => setEscalationData(prev => ({ ...prev, preferredContact: value }))}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email" className="flex items-center gap-2 cursor-pointer">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone" className="flex items-center gap-2 cursor-pointer">
                    <Phone className="h-4 w-4" />
                    Telefonisch
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="chat" id="contact-chat" />
                  <Label htmlFor="contact-chat" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    Live chat
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conversation Preview */}
            {conversationHistory.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Uw gesprek wordt meegestuurd</h3>
                <div className="bg-muted p-4 rounded-lg max-h-40 overflow-y-auto">
                  <p className="text-sm text-muted-foreground mb-2">
                    Laatste {Math.min(3, conversationHistory.length)} berichten:
                  </p>
                  {conversationHistory.slice(-3).map((message, index) => (
                    <div key={index} className="text-sm mb-2">
                      <strong>{message.role === 'user' ? 'U' : 'AI Assistant'}:</strong>
                      <span className="ml-2">{message.content.substring(0, 100)}...</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isEscalating}
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!isValid || isEscalating}
              >
                {isEscalating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Doorverbinden...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Doorverbinden naar Support
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Information Box */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Wat gebeurt er nu?</p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Een specialist ontvangt uw aanvraag direct</li>
                  <li>• U krijgt een bevestiging per e-mail</li>
                  <li>• We nemen binnen 30 minuten (kantooruren) contact op</li>
                  <li>• Uw volledige gesprek wordt meegestuurd voor context</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Success component shown after escalation
export function EscalationSuccess({ 
  escalationResponse, 
  onClose 
}: { 
  escalationResponse: any; 
  onClose: () => void; 
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-2">Doorverbinding Succesvol!</h2>
              <p className="text-muted-foreground">
                Uw aanvraag is doorgestuurd naar onze specialisten.
              </p>
            </div>

            {escalationResponse.supportTicketNumber && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-medium">Ticketnummer:</p>
                <p className="text-lg font-mono">{escalationResponse.supportTicketNumber}</p>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <p className="font-medium mb-2">Geschatte responstijd:</p>
              <p className="text-blue-700">{escalationResponse.estimatedWaitTime}</p>
              
              {escalationResponse.nextSteps && (
                <div className="mt-3">
                  <p className="font-medium mb-1">Volgende stappen:</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {escalationResponse.nextSteps.map((step: string, index: number) => (
                      <li key={index}>• {step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button onClick={onClose} className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Terug naar Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}