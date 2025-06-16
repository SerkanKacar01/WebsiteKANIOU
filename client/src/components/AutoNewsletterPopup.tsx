import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Mail, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertNewsletterSubscriptionSchema, type InsertNewsletterSubscription } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { useNewsletterPopup } from "@/hooks/useNewsletterPopup";

interface AutoNewsletterPopupProps {
  enableTimeTrigger?: boolean;
  enableScrollTrigger?: boolean;
  customDelay?: number;
}

const AutoNewsletterPopup = ({
  enableTimeTrigger = false,
  enableScrollTrigger = false,
  customDelay = 30000
}: AutoNewsletterPopupProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const {
    shouldShow,
    closePopup,
    markSubscribed,
  } = useNewsletterPopup({
    enableTimeTrigger,
    enableScrollTrigger,
    customDelay
  });

  const form = useForm<InsertNewsletterSubscription>({
    resolver: zodResolver(insertNewsletterSubscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
      language: language,
      website: "", // Honeypot field
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: InsertNewsletterSubscription) => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify(data),
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
      setIsSuccess(true);
      form.reset();
      
      // Mark as subscribed in localStorage
      markSubscribed();
      
      toast({
        title: "Bedankt voor je inschrijving!",
        description: "Je ontvangt binnenkort onze aanbiedingen en exclusieve acties.",
        variant: "default",
      });
      
      // Close modal after showing success for 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2500);
    },
    onError: (error: any) => {
      console.error("Newsletter signup error:", error);
      
      // Handle specific error cases
      if (error.message?.includes("al ingeschreven") || error.message?.includes("already exists") || error.message?.includes("duplicate")) {
        toast({
          title: "E-mailadres al geregistreerd",
          description: "Dit e-mailadres is al ingeschreven voor onze nieuwsbrief.",
          variant: "destructive",
        });
      } else if (error.message?.includes("rate limit") || error.message?.includes("te veel")) {
        toast({
          title: "Te veel verzoeken",
          description: "Probeer het over enkele minuten opnieuw.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Inschrijving mislukt",
          description: "Er is een fout opgetreden. Probeer het opnieuw.",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data: InsertNewsletterSubscription) => {
    // Check honeypot field
    if (data.website && data.website.length > 0) {
      console.log("Spam attempt blocked");
      return;
    }

    signupMutation.mutate({
      ...data,
      language: language,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSuccess) {
      closePopup();
    }
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Dialog open={shouldShow} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md mx-4 rounded-xl border-0 shadow-2xl bg-[#FDFCF9]">
        <DialogHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-neutral-800">
            🎁 Exclusieve Aanbiedingen Wachten!
          </DialogTitle>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Mis geen enkele deal! Ontvang onze nieuwsbrief en krijg direct toegang tot kortingen tot 30% op premium raamdecoratie.
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-green-700">Bedankt voor je inschrijving!</h3>
              <p className="text-neutral-600">Je ontvangt binnenkort onze exclusieve aanbiedingen.</p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Honeypot field - hidden from users */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <div style={{ display: "none" }}>
                    <Input {...field} tabIndex={-1} autoComplete="off" />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 font-medium">
                      Naam (optioneel)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Je voornaam"
                        {...field}
                        className="border-neutral-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 font-medium">
                      E-mailadres *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jouw@email.com"
                        {...field}
                        className="border-neutral-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-neutral-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs text-neutral-600 leading-relaxed">
                        Ik ga akkoord met het ontvangen van nieuwsbrieven en promotionele content van KANIOU.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={signupMutation.isPending}
                className="w-full bg-[#EAD488] hover:bg-[#E6C973] text-black font-medium h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {signupMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Inschrijven...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>Ja, ik wil korting ontvangen!</span>
                  </div>
                )}
              </Button>

              <p className="text-xs text-center text-neutral-500 mt-4">
                Geen spam, alleen de beste deals. Uitschrijven kan altijd.
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AutoNewsletterPopup;