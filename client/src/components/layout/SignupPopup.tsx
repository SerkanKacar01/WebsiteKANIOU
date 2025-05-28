import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface SignupFormData {
  name?: string;
  email: string;
  consent: boolean;
}

export function SignupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    consent: false
  });
  const { toast } = useToast();

  // Check if popup should be shown
  useEffect(() => {
    const checkShowPopup = () => {
      const hasSeenPopup = localStorage.getItem('kaniou-signup-popup-seen');
      const hasClosedPopup = localStorage.getItem('kaniou-signup-popup-closed');
      const lastClosedDate = localStorage.getItem('kaniou-signup-popup-last-closed');
      
      // Don't show if user has already signed up or permanently dismissed
      if (hasSeenPopup === 'completed') {
        return false;
      }

      // If user closed without signing up, check if 7 days have passed
      if (hasClosedPopup === 'true' && lastClosedDate) {
        const daysSinceClose = (Date.now() - parseInt(lastClosedDate)) / (1000 * 60 * 60 * 24);
        if (daysSinceClose < 7) {
          return false;
        }
      }

      return true;
    };

    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      if (checkShowPopup()) {
        setIsOpen(true);
      }
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, []);

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify({
          name: data.name || undefined,
          email: data.email,
          language: 'nl'
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to subscribe");
      }
      
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      localStorage.setItem('kaniou-signup-popup-seen', 'completed');
      
      // Hide success message and close popup after 4 seconds
      setTimeout(() => {
        setIsOpen(false);
        setShowSuccess(false);
      }, 4000);
    },
    onError: (error) => {
      console.error('Signup error:', error);
      toast({
        title: "Er is een fout opgetreden",
        description: "Probeer het later opnieuw of neem contact met ons op.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast({
        title: "E-mailadres vereist",
        description: "Voer een geldig e-mailadres in.",
        variant: "destructive"
      });
      return;
    }

    signupMutation.mutate(formData);
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('kaniou-signup-popup-closed', 'true');
    localStorage.setItem('kaniou-signup-popup-last-closed', Date.now().toString());
  };

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md mx-auto bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 shadow-2xl">
          <DialogTitle className="sr-only">Inschrijving succesvol</DialogTitle>
          <DialogDescription className="sr-only">Bevestiging van uw succesvolle inschrijving voor onze nieuwsbrief</DialogDescription>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">
              Bedankt voor je inschrijving!
            </h3>
            <p className="text-amber-700">
              We houden je op de hoogte van onze acties.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg mx-4 sm:mx-auto bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 border-2 border-yellow-400 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Inschrijven voor aanbiedingen</DialogTitle>
        <DialogDescription className="sr-only">Formulier om u in te schrijven voor exclusieve aanbiedingen en kortingen van KANIOU Zilvernaald</DialogDescription>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Sluiten</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <h2 className="text-2xl font-bold text-yellow-900 mb-2">
            Blijf op de hoogte van acties & kortingen
          </h2>
          <p className="text-yellow-800 text-sm leading-relaxed">
            Schrijf je in en ontvang exclusieve aanbiedingen van KANIOU Zilvernaald.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field (optional) */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-yellow-900 font-medium">
              Naam (optioneel)
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Uw naam"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white/80 backdrop-blur-sm h-12"
            />
          </div>

          {/* Email field (required) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-yellow-900 font-medium">
              E-mailadres *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="uw.email@voorbeeld.nl"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white/80 backdrop-blur-sm h-12"
              required
            />
          </div>

          {/* Consent checkbox */}
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
              className="border-yellow-500 data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600"
            />
            <Label htmlFor="consent" className="text-sm text-yellow-800 leading-relaxed">
              Ik ga akkoord met het ontvangen van e-mails
            </Label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-semibold py-4 h-14 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-2xl"
          >
            {signupMutation.isPending ? 'Bezig met inschrijven...' : 'Inschrijven'}
          </Button>
        </form>

        {/* Footer note */}
        <p className="text-xs text-yellow-700 text-center mt-4 leading-relaxed">
          U kunt zich altijd uitschrijven via de link in onze e-mails.
        </p>
      </DialogContent>
    </Dialog>
  );
}