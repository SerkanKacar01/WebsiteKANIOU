import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/context/LanguageContext";

const newsletterSchema = z.object({
  name: z.string()
    .min(2, "Naam moet minstens 2 karakters bevatten")
    .max(100, "Naam mag maximaal 100 karakters bevatten")
    .optional(),
  email: z.string()
    .email("Gelieve een geldig e-mailadres in te voeren")
    .max(254, "E-mailadres mag maximaal 254 karakters bevatten"),
  website: z.string().max(0, "Ongeldige inzending").optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const subscribeMutation = useMutation({
    mutationFn: (data: NewsletterFormData) => 
      apiRequest("/api/newsletter/subscribe", "POST", {
        ...data,
        language,
      }),
    onSuccess: () => {
      toast({
        title: language === "nl" ? "Bedankt voor je inschrijving!" : "Thank you for subscribing!",
        description: language === "nl" 
          ? "Je ontvangt binnenkort onze nieuwsbrief met de laatste trends en aanbiedingen."
          : "You'll receive our newsletter with the latest trends and offers soon.",
      });
      reset();
      setIsDismissed(true);
    },
    onError: (error: any) => {
      const message = error?.message || (language === "nl" ? "Er is een fout opgetreden" : "An error occurred");
      toast({
        title: language === "nl" ? "Inschrijving mislukt" : "Subscription failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    subscribeMutation.mutate(data);
  };

  const getContent = () => {
    switch (language) {
      case "fr":
        return {
          title: "Abonnez-vous à notre newsletter",
          description: "Restez informé de nos derniers produits, tendances et offres spéciales.",
          namePlaceholder: "Votre nom (optionnel)",
          emailPlaceholder: "Votre adresse e-mail",
          submitButton: "S'abonner",
          dismissButton: "Fermer",
        };
      case "en":
        return {
          title: "Subscribe to our newsletter",
          description: "Stay updated with our latest products, trends, and special offers.",
          namePlaceholder: "Your name (optional)",
          emailPlaceholder: "Your email address",
          submitButton: "Subscribe",
          dismissButton: "Close",
        };
      default:
        return {
          title: "Inschrijven voor onze nieuwsbrief",
          description: "Blijf op de hoogte van onze nieuwste producten, trends en speciale aanbiedingen.",
          namePlaceholder: "Uw naam (optioneel)",
          emailPlaceholder: "Uw e-mailadres",
          submitButton: "Inschrijven",
          dismissButton: "Sluiten",
        };
    }
  };

  if (isDismissed) {
    return null;
  }

  const content = getContent();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="shadow-2xl border-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => setIsDismissed(true)}
            aria-label={content.dismissButton}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-full">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {content.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {content.description}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot field */}
            <input
              {...register("website")}
              type="text"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="newsletter-name" className="text-sm font-medium text-gray-700">
                {content.namePlaceholder}
              </Label>
              <Input
                id="newsletter-name"
                type="text"
                placeholder={content.namePlaceholder}
                {...register("name")}
                className="h-10"
              />
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="newsletter-email" className="text-sm font-medium text-gray-700">
                {content.emailPlaceholder} *
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder={content.emailPlaceholder}
                required
                {...register("email")}
                className="h-10"
              />
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
              disabled={subscribeMutation.isPending}
            >
              {subscribeMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {language === "nl" ? "Bezig..." : "Loading..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {content.submitButton}
                </div>
              )}
            </Button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 mt-3 text-center">
            {language === "nl" 
              ? "We respecteren uw privacy. U kunt zich op elk moment uitschrijven."
              : language === "fr"
              ? "Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment."
              : "We respect your privacy. You can unsubscribe at any time."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterBanner;