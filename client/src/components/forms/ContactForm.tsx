import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Define the form schema with validation
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minstens 2 tekens bevatten.",
  }),
  email: z.string().email({
    message: "Voer een geldig e-mailadres in.",
  }),
  subject: z.string().min(2, {
    message: "Onderwerp moet minstens 2 tekens bevatten.",
  }),
  message: z.string().min(10, {
    message: "Bericht moet minstens 10 tekens bevatten.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Bericht verzonden",
        description: "Bedankt voor uw bericht. We nemen zo spoedig mogelijk contact met u op.",
        variant: "Succes",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Verzending mislukt",
        description: error.message || "Het verzenden van het bericht is mislukt. Probeer het alstublieft opnieuw.",
        variant: "Fout",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uw naam</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel>E-mail adres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@voorbeeld.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="Onderwerp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Onderwerp</FormLabel>
              <FormControl>
                <Input placeholder="Hoe kunnen wij u helpen?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Bericht"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bericht</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Gelieve de details van uw aanvraag te vermelden...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="Verzenden" 
          className="bg-secondary hover:bg-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Bericht verzenden"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
