import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Mail, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertNewsletterSubscriptionSchema, type InsertNewsletterSubscription } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";

interface NewsletterSignupProps {
  children?: React.ReactNode;
  variant?: "default" | "header" | "footer";
  onModalOpen?: () => void;
}

const NewsletterSignup = ({ children, variant = "default", onModalOpen }: NewsletterSignupProps) => {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

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
      toast({
        title: "Bedankt voor je inschrijving!",
        description: "Je ontvangt binnenkort onze aanbiedingen en exclusieve acties.",
        variant: "default",
      });
      
      // Close modal after showing success for 2 seconds
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
      }, 2500);
    },
    onError: (error: any) => {
      console.error("Newsletter signup error:", error);
      
      // Handle specific error cases
      if (error.message?.includes("already exists") || error.message?.includes("duplicate")) {
        toast({
          title: "E-mailadres al geregistreerd",
          description: "Dit e-mailadres is al ingeschreven voor onze nieuwsbrief.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Er ging iets mis",
          description: "Probeer het later opnieuw of neem contact met ons op.",
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

  const getButtonVariant = () => {
    if (variant === "header") return "default";
    if (variant === "footer") return "outline";
    return "default";
  };

  const getButtonClassName = () => {
    if (variant === "header") {
      return "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105";
    }
    return "";
  };

  const DefaultTrigger = (
    <Button 
      variant={getButtonVariant()} 
      className={getButtonClassName()}
      size={variant === "header" ? "sm" : "default"}
    >
      <Gift className="w-4 h-4 mr-2" />
      Acties & Kortingen
    </Button>
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && onModalOpen) {
      onModalOpen();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || DefaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4 rounded-xl border-0 shadow-2xl bg-[#FAF9F6]">
        <DialogHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-neutral-800">
            Blijf op de hoogte van exclusieve acties!
          </DialogTitle>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Ontvang als eerste onze nieuwste aanbiedingen, kortingen en productnieuws rechtstreeks in je mailbox.
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-green-700">Bedankt voor je inschrijving!</h3>
              <p className="text-neutral-600">Je ontvangt binnenkort onze aanbiedingen.</p>
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
                        placeholder="je@email.com"
                        {...field}
                        className="border-neutral-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg h-11"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-start space-x-3 p-4 bg-[#F5F4F0] rounded-lg border border-neutral-200">
                <Checkbox 
                  id="privacy-consent" 
                  className="mt-0.5 border-neutral-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500" 
                  required 
                />
                <label htmlFor="privacy-consent" className="text-xs text-neutral-600 leading-relaxed cursor-pointer">
                  Ik ga akkoord met het ontvangen van marketing e-mails van KANIOU en begrijp dat ik me op elk moment kan uitschrijven. 
                  Meer info in ons <a href="/privacy" className="text-amber-600 hover:text-amber-700 underline">privacybeleid</a>.
                </label>
              </div>

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
                    <span>Inschrijven voor aanbiedingen</span>
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

export default NewsletterSignup;