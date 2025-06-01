import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { Building2, Mail, Phone, MessageSquare } from "lucide-react";

const dealerFormSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide a detailed message"),
  businessType: z.string().min(1, "Please select business type"),
});

type DealerFormData = z.infer<typeof dealerFormSchema>;

const DealerContactForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const content = {
    nl: {
      title: "Dealer Informatieaanvraag",
      businessName: "Bedrijfsnaam",
      contactPerson: "Contactpersoon",
      email: "E-mailadres",
      phone: "Telefoonnummer (optioneel)",
      message: "Bericht",
      businessType: "Type bedrijf",
      businessTypes: {
        placeholder: "Selecteer uw bedrijfstype",
        interior: "Interieur",
        retail: "Retail",
        contractor: "Aannemer",
        other: "Anders"
      },
      messagePlaceholder: "Vertel ons meer over uw bedrijf en interesse in ons dealerprogramma...",
      submit: "Verstuur Aanvraag",
      success: "Uw aanvraag is verzonden! We nemen spoedig contact met u op.",
      error: "Er is een fout opgetreden. Probeer het opnieuw."
    },
    en: {
      title: "Dealer Information Request",
      businessName: "Business Name",
      contactPerson: "Contact Person",
      email: "Email Address",
      phone: "Phone Number (optional)",
      message: "Message",
      businessType: "Business Type",
      businessTypes: {
        placeholder: "Select your business type",
        interior: "Interior",
        retail: "Retail",
        contractor: "Contractor",
        other: "Other"
      },
      messagePlaceholder: "Tell us more about your business and interest in our dealer program...",
      submit: "Submit Request",
      success: "Your request has been sent! We will contact you soon.",
      error: "An error occurred. Please try again."
    },
    fr: {
      title: "Demande d'Information Revendeur",
      businessName: "Nom de l'Entreprise",
      contactPerson: "Personne de Contact",
      email: "Adresse Email",
      phone: "Numéro de Téléphone (optionnel)",
      message: "Message",
      businessType: "Type d'Entreprise",
      businessTypes: {
        placeholder: "Sélectionnez votre type d'entreprise",
        interior: "Intérieur",
        retail: "Retail",
        contractor: "Entrepreneur",
        other: "Autre"
      },
      messagePlaceholder: "Parlez-nous de votre entreprise et de votre intérêt pour notre programme de revendeur...",
      submit: "Envoyer la Demande",
      success: "Votre demande a été envoyée! Nous vous contacterons bientôt.",
      error: "Une erreur s'est produite. Veuillez réessayer."
    },
    de: {
      title: "Händler Informationsanfrage",
      businessName: "Firmenname",
      contactPerson: "Ansprechpartner",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer (optional)",
      message: "Nachricht",
      businessType: "Geschäftstyp",
      businessTypes: {
        placeholder: "Wählen Sie Ihren Geschäftstyp",
        interior: "Einrichtung",
        retail: "Einzelhandel",
        contractor: "Auftragnehmer",
        other: "Andere"
      },
      messagePlaceholder: "Erzählen Sie uns mehr über Ihr Unternehmen und Ihr Interesse an unserem Händlerprogramm...",
      submit: "Anfrage Senden",
      success: "Ihre Anfrage wurde gesendet! Wir werden Sie bald kontaktieren.",
      error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
    }
  };

  const currentContent = content[language as keyof typeof content] || content.nl;

  const form = useForm<DealerFormData>({
    resolver: zodResolver(dealerFormSchema),
    defaultValues: {
      businessName: "",
      contactPerson: "",
      email: "",
      phone: "",
      message: "",
      businessType: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: DealerFormData) => {
      const response = await fetch("/api/contact/dealer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          lead_type: "dealer",
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: currentContent.success,
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: currentContent.error,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DealerFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          {currentContent.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {currentContent.businessName}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentContent.contactPerson}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {currentContent.email}
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {currentContent.phone}
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{currentContent.businessType}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={currentContent.businessTypes.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="interior">{currentContent.businessTypes.interior}</SelectItem>
                      <SelectItem value="retail">{currentContent.businessTypes.retail}</SelectItem>
                      <SelectItem value="contractor">{currentContent.businessTypes.contractor}</SelectItem>
                      <SelectItem value="other">{currentContent.businessTypes.other}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {currentContent.message}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={currentContent.messagePlaceholder}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? "Sending..." : currentContent.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DealerContactForm;