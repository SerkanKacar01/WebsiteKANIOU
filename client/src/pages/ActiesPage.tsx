import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clock, Info, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSubscriptionSchema, type InsertNewsletterSubscription } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const ActiesPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form for newsletter subscription
  const form = useForm<InsertNewsletterSubscription>({
    resolver: zodResolver(insertNewsletterSubscriptionSchema),
    defaultValues: {
      email: "",
      language: "nl",
      website: "", // Honeypot field
    },
  });

  // Newsletter subscription mutation
  const newsletterMutation = useMutation({
    mutationFn: async (data: InsertNewsletterSubscription) => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to subscribe to newsletter");
      }
      
      return response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Succesvol ingeschreven!",
        description: "Je ontvangt binnenkort een bevestigingsmail.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Inschrijving mislukt",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertNewsletterSubscription) => {
    // Check honeypot field
    if (data.website) {
      return; // Spam submission
    }
    newsletterMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Actuele Promoties & Aanbiedingen
            </h1>
            <p className="text-lg text-text-medium max-w-2xl mx-auto">
              Momenteel zijn er geen lopende acties, maar houd onze pagina in de gaten voor exclusieve aanbiedingen!
            </p>
          </div>

          {/* No Active Promotions Placeholder */}
          <div className="flex justify-center mb-12">
            <Card className="max-w-lg w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#D9C29C]/10 rounded-full w-fit">
                  <Clock className="w-8 h-8 text-[#D9C29C]" />
                </div>
                <CardTitle className="text-xl text-text-dark">
                  Geen Actieve Kortingen
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-medium mb-6">
                  Er zijn momenteel geen actieve kortingen. Onze aanbiedingen worden regelmatig bijgewerkt.
                </p>
                <Button 
                  disabled
                  className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  Nieuwe acties binnenkort beschikbaar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter Subscription Section */}
          <div className="bg-[#D9C29C]/5 rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto mb-4 p-3 bg-[#D9C29C]/20 rounded-full w-fit">
                <Mail className="w-8 h-8 text-[#D9C29C]" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark mb-4">
                Blijf op de Hoogte
              </h2>
              <p className="text-text-medium mb-6 max-w-xl mx-auto">
                Blijf als eerste op de hoogte van nieuwe promoties en exclusieve kortingen.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="max-w-md mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot field - hidden from users */}
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">E-mailadres</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Jouw e-mailadres"
                            type="email"
                            className="text-center"
                            disabled={newsletterMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#D9C29C] hover:bg-[#D0B378] text-white"
                    disabled={newsletterMutation.isPending}
                  >
                    {newsletterMutation.isPending ? "Bezig..." : "Schrijf je in voor de nieuwsbrief"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ActiesPage;