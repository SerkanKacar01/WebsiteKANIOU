import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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

  // Intersection observer for entrance animations
  const { elementRef: formRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

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
    <div 
      ref={formRef}
      className={`relative glass-luxury-medium rounded-3xl p-luxury-xl shadow-depth-4 gpu-accelerated mobile-optimized ${
        isIntersecting ? 'animate-luxury-fade-in' : 'opacity-0'
      }`}
      data-testid="form-contact"
      role="form"
      aria-label="Contact form"
    >
      {/* Consolidated Performance-Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/6 via-white/95 to-[#E0C188]/6 rounded-3xl backdrop-blur-md mobile-reduced-blur" aria-hidden="true"></div>
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="relative z-10 space-y-luxury-lg"
          noValidate
          data-testid="form-contact-inner"
        >
          {/* Premium Header Section */}
          <div className="text-center mb-luxury-xl" data-testid="form-header">
            <div className="w-16 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mx-auto mb-6" aria-hidden="true"></div>
            <h2 className="text-title-xl text-gradient-luxury font-bold text-shadow-luxury-medium mb-4" data-testid="form-title">
              Stuur ons een bericht
            </h2>
            <p className="text-body text-[#2C3E50]/70 max-w-lg mx-auto leading-relaxed" data-testid="form-description">
              Vul onderstaand formulier in en onze experts nemen binnen 24 uur contact met u op
            </p>
          </div>
          
          {/* Enhanced Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-luxury-lg" data-testid="form-fields-grid">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-body font-semibold text-gradient-elegant text-shadow-luxury-soft flex items-center gap-2" data-testid="label-name">
                    <svg className="w-4 h-4 text-[#D5B36A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Voor - en Achternaam
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input 
                        placeholder="Uw volledige naam" 
                        className="glass-luxury-light border-[#D5B36A]/20 bg-white/70 mobile-reduced-blur transition-all duration-300 group-hover:shadow-gold-soft focus:shadow-gold-medium focus:border-[#D5B36A]/50 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#D5B36A]/30" 
                        {...field}
                        data-testid="input-name"
                        aria-required="true"
                        aria-describedby={field.name + '-error'}
                        autoComplete="name"
                      />
                      {/* Simplified overlay for better performance */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D5B36A]/6 to-[#E0C188]/6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gpu-accelerated" aria-hidden="true"></div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-caption" id={field.name + '-error'} data-testid="error-name" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-body font-semibold text-gradient-elegant text-shadow-luxury-soft flex items-center gap-2" data-testid="label-email">
                    <svg className="w-4 h-4 text-[#D5B36A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    E-mail adres
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input 
                        type="email" 
                        placeholder="voorbeeld@email.com" 
                        className="luxury-input mobile-reduced-blur transition-all duration-300 group-hover:shadow-professional focus:shadow-professional focus:outline-none focus:ring-2 focus:ring-[#D5B36A]/30" 
                        {...field}
                        data-testid="input-email"
                        aria-required="true"
                        aria-describedby={field.name + '-error'}
                        autoComplete="email"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D5B36A]/4 to-[#E0C188]/4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gpu-accelerated" aria-hidden="true"></div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-caption" id={field.name + '-error'} data-testid="error-email" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-body font-semibold text-gradient-elegant text-shadow-luxury-soft flex items-center gap-2" data-testid="label-subject">
                  <svg className="w-4 h-4 text-[#D5B36A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Onderwerp
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Waarmee kunnen wij u van dienst zijn?"
                      className="luxury-input mobile-reduced-blur transition-all duration-300 group-hover:shadow-professional focus:shadow-professional focus:outline-none focus:ring-2 focus:ring-[#D5B36A]/30"
                      {...field}
                      data-testid="input-subject"
                      aria-required="true"
                      aria-describedby={field.name + '-error'}
                      autoComplete="off"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D5B36A]/4 to-[#E0C188]/4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gpu-accelerated" aria-hidden="true"></div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-caption" id={field.name + '-error'} data-testid="error-subject" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-body font-semibold text-gradient-elegant text-shadow-luxury-soft flex items-center gap-2" data-testid="label-message">
                  <svg className="w-4 h-4 text-[#D5B36A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Bericht
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Textarea
                      rows={6}
                      placeholder="Gelieve de details van uw aanvraag zo volledig mogelijk te vermelden. Vermeld bijvoorbeeld de gewenste producten, afmetingen, kleuren en eventuele speciale wensen..."
                      className="luxury-textarea mobile-reduced-blur transition-all duration-300 group-hover:shadow-professional focus:shadow-professional resize-none focus:outline-none focus:ring-2 focus:ring-[#D5B36A]/30"
                      {...field}
                      data-testid="input-message"
                      aria-required="true"
                      aria-describedby={field.name + '-error'}
                      autoComplete="off"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D5B36A]/4 to-[#E0C188]/4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gpu-accelerated" aria-hidden="true"></div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-caption" id={field.name + '-error'} data-testid="error-message" />
              </FormItem>
            )}
          />

          {/* Honeypot field - hidden from users but visible to bots */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Please leave this field empty"
                      tabIndex={-1}
                      autoComplete="off"
                      {...field}
                      data-testid="honeypot-website"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />

          {/* Enhanced Premium Submit Button */}
          <div className="pt-luxury-lg" data-testid="form-submit-section">
            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-luxury-medium bg-gradient-to-r from-[#D5B36A] to-[#C4A55A] text-white font-bold px-luxury-xl py-luxury-lg rounded-2xl shadow-gold-strong hover:shadow-gold-strong hover:translate-y-[-3px] hover:scale-[1.02] active:translate-y-[-1px] active:scale-[1.01] transition-all duration-300 group relative overflow-hidden w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#D5B36A] gpu-accelerated"
              data-testid="button-submit-contact"
              aria-label={isSubmitting ? "Formulier wordt verzonden" : "Bericht verzenden"}
            >
              {/* Optimized shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 gpu-accelerated" aria-hidden="true" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Versturen...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Bericht verzenden</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Premium Social Media Contact Options */}
          <div className="mt-luxury-2xl pt-luxury-lg border-t border-gradient-to-r from-[#D5B36A]/20 via-[#E0C188]/20 to-[#D5B36A]/20" data-testid="form-social-section">
            <div className="text-center mb-luxury-lg">
              <h3 className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-4" data-testid="social-title">
                Andere contact mogelijkheden
              </h3>
              <div className="w-24 h-0.5 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mx-auto" aria-hidden="true"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-testid="social-links">
              <a
                href="https://wa.me/+32467856405"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 rounded-2xl"
                aria-label="Contact ons via WhatsApp"
                data-testid="link-whatsapp"
              >
                <div className="bg-gradient-to-r from-[#25D366] to-[#20B358] hover:from-[#20B358] hover:to-[#1DA049] text-white rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border border-white/20 gpu-accelerated">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-body font-bold text-shadow-luxury-soft">Stel je vraag via WhatsApp</span>
                  </div>
                </div>
              </a>
              
              <a
                href="https://www.instagram.com/kanioubvbazilvernaald/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl"
                aria-label="Volg ons op Instagram"
                data-testid="link-instagram"
              >
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border border-white/20 gpu-accelerated">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                    </svg>
                    <span className="text-body font-bold text-shadow-luxury-soft">Volg ons op Instagram</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
