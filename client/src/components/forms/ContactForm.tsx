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
import { insertContactSubmissionSchema } from "@shared/schema";

// Use the enhanced schema from backend with all validation rules
const contactFormSchema = insertContactSubmissionSchema;

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
      website: "", // Honeypot field
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Bericht verzonden",
        description:
          "Bedankt voor uw bericht. We nemen zo spoedig mogelijk contact met u op.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description:
          error.message || "Failed to send message. Please try again.",
        variant: "destructive",
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
                <FormLabel className="text-body font-semibold text-gradient-subtle text-shadow-luxury-soft">Voor - en Achternaam</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                <FormLabel className="text-body font-semibold text-gradient-subtle text-shadow-luxury-soft">E-mail adres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-body font-semibold text-gradient-subtle text-shadow-luxury-soft">Onderwerp</FormLabel>
              <FormControl>
                <Input
                  placeholder="Waarmee kunnen wij u van dienst zijn?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-body font-semibold text-gradient-subtle text-shadow-luxury-soft">Bericht</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Gelieve de details van uw aanvraag zo volledig mogelijk te vermelden…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot field - hidden from users but visible to bots */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Please leave this field empty"
                    tabIndex={-1}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            </div>
          )}
        />

        <Button
          type="submit"
          className="bg-secondary hover:bg-accent text-body font-bold text-shadow-luxury-soft transition-all duration-300"
          disabled={isSubmitting}
        >
          <span className="text-glow-subtle">{isSubmitting ? "Versturen..." : "Bericht verzenden"}</span>
        </Button>

        {/* Social Media Contact Options */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <h3 className="text-title-lg font-bold text-primary mb-6 animate-text-reveal-up">
            <span className="text-gradient-elegant text-shadow-luxury-medium">Andere contact mogelijkheden</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/+32467856405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#20B358] text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
<span className="text-body font-semibold text-shadow-luxury-soft">Stel je vraag via WhatsApp</span>
            </a>
            
            <a
              href="https://www.instagram.com/kanioubvbazilvernaald/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
<span className="text-body font-semibold text-shadow-luxury-soft">Volg ons op Instagram</span>
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
