import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "@/components/ui/container";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Calendar,
  Star,
  Video,
  Shield,
  ChevronDown,
  ChevronUp,
  Quote,
  Building2,
  Send,
  Users,
  Ruler,
  Wrench,
  Sparkles,
  MessageSquare,
  MessageCircle,
  FileText,
  PhoneCall,
  HelpCircle,
  Paperclip,
} from "lucide-react";
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
import PageLayout from "@/components/layout/PageLayout";
import { Testimonial } from "@shared/schema";

const requestTypes = [
  { id: "Adviesgesprek", label: "Adviesgesprek", icon: MessageCircle },
  { id: "Offerte aanvraag", label: "Offerte aanvraag", icon: FileText },
  { id: "Terugbelverzoek", label: "Terugbelverzoek", icon: PhoneCall },
  { id: "Algemene vraag", label: "Algemene vraag", icon: HelpCircle },
] as const;

const contactFormSchema = z.object({
  requestType: z.string().min(1, "Selecteer een type aanvraag"),
  firstName: z.string().min(2, "Voornaam is verplicht"),
  lastName: z.string().min(2, "Achternaam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().optional(),
  message: z.string().min(5, "Toelichting is verplicht").max(2000),
  callbackTime: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, "U moet akkoord gaan met het privacybeleid"),
  website: z.string().max(0, "Invalid").optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fallbackTestimonials = [
  {
    id: 1,
    name: "Jan de Vries",
    content: "We hebben Zilvernaald ingeschakeld voor nieuwe gordijnen in onze woonkamer. Het resultaat is prachtig! Perfecte pasvorm en de stof is van uitstekende kwaliteit.",
    rating: 5,
    location: "Maasmechelen",
  },
  {
    id: 2,
    name: "Marieke Jansen",
    content: "Onze nieuwe rolgordijnen zijn perfect geïnstalleerd door het team van KANIOU. Ze gaven uitstekend advies over welke stoffen het beste zouden werken.",
    rating: 5,
    location: "Hasselt",
  },
  {
    id: 3,
    name: "Peter Bakker",
    content: "Na lang zoeken eindelijk de perfecte oplossing gevonden bij KANIOU voor onze lastige dakramen. De plissé zonwering werkt perfect.",
    rating: 5,
    location: "Genk",
  },
];

const faqItems = [
  {
    question: "Hoe snel ontvangt u een offerte?",
    answer: "Na een adviesgesprek of opmeting ontvangt u binnen 2 werkdagen een gedetailleerde offerte op maat. Bij dringende projecten proberen we dit sneller te verzorgen.",
  },
  {
    question: "Bieden jullie gratis opmeting aan?",
    answer: "Ja, wij bieden een gratis en vrijblijvende opmeting aan huis aan. Onze specialist komt bij u langs om alles nauwkeurig op te meten en advies te geven.",
  },
  {
    question: "Werken jullie ook voor zakelijke projecten?",
    answer: "Absoluut. Wij werken samen met architecten, projectontwikkelaars en interieurontwerpers voor zowel residentiële als commerciële projecten.",
  },
  {
    question: "Wat is de gemiddelde levertermijn?",
    answer: "De gemiddelde levertermijn bedraagt 2 tot 4 weken, afhankelijk van het gekozen product en de complexiteit van het project. Bij speciale bestellingen kan dit langer duren.",
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const displayTestimonials = testimonials && testimonials.length > 0
    ? testimonials
    : fallbackTestimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      requestType: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      callbackTime: "",
      privacy: false,
      website: "",
    },
  });

  const selectedType = form.watch("requestType");

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      let messageBody = data.message;
      if (data.callbackTime) {
        messageBody += `\n\nBeste moment om te bellen: ${data.callbackTime}`;
      }
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || "",
        subject: data.requestType,
        message: messageBody,
        type: "contact",
        website: data.website || "",
      };
      return apiRequest("POST", "/api/contact", payload);
    },
    onSuccess: () => {
      toast({
        title: "Bericht verzonden",
        description: "Bedankt! Onze specialisten nemen binnen 24 uur contact met u op.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Verzending mislukt",
        description: error.message || "Probeer het later opnieuw.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <PageLayout
      title="Persoonlijke begeleiding op het hoogste niveau"
      subtitle="Contact"
      description="Of u nu advies wenst voor één ruimte of een volledig project, ons team van interieurspecialisten staat klaar om u professioneel te begeleiden."
      metaDescription="Neem contact op met KANIOU Zilvernaald voor premium maatwerk raamdecoratie. Professioneel advies, gratis opmeting en persoonlijke service."
      breadcrumbs={[{ label: "Contact" }]}
      showCTA={false}
    >
      {/* Contact Form + Info Sidebar */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-[#f8f6f1] to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Form - Left (2 cols) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-[#C8A85B]/10 h-full">
                <div className="mb-8">
                  <h2 className="font-display text-2xl md:text-3xl text-[#2C3E50] font-bold mb-3">
                    Persoonlijk advies of terugbelverzoek
                  </h2>
                  <p className="text-[#2C3E50]/60">
                    Onze specialisten nemen binnen 24 uur persoonlijk contact met u op.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="requestType"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {requestTypes.map((type) => {
                              const Icon = type.icon;
                              const isSelected = field.value === type.id;
                              return (
                                <button
                                  key={type.id}
                                  type="button"
                                  onClick={() => field.onChange(type.id)}
                                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                                    isSelected
                                      ? "border-[#C8A85B] bg-[#C8A85B]/5 shadow-md"
                                      : "border-gray-200 hover:border-[#C8A85B]/40 hover:bg-gray-50"
                                  }`}
                                >
                                  <Icon className={`w-5 h-5 ${isSelected ? "text-[#C8A85B]" : "text-[#2C3E50]/50"}`} />
                                  <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-[#C8A85B]" : "text-[#2C3E50]/70"}`}>
                                    {type.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2C3E50] font-medium text-sm">Voornaam</FormLabel>
                            <FormControl>
                              <Input className="border-gray-200 focus:border-[#C8A85B] focus:ring-[#C8A85B]/20 h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2C3E50] font-medium text-sm">Achternaam</FormLabel>
                            <FormControl>
                              <Input className="border-gray-200 focus:border-[#C8A85B] focus:ring-[#C8A85B]/20 h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2C3E50] font-medium text-sm">E-mail</FormLabel>
                            <FormControl>
                              <Input type="email" className="border-gray-200 focus:border-[#C8A85B] focus:ring-[#C8A85B]/20 h-11" {...field} />
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
                            <FormLabel className="text-[#2C3E50] font-medium text-sm">Telefoonnummer</FormLabel>
                            <FormControl>
                              <Input type="tel" className="border-gray-200 focus:border-[#C8A85B] focus:ring-[#C8A85B]/20 h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#2C3E50] font-medium text-sm">Korte toelichting</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Beschrijf kort uw vraag of project (ruimte, type raamdecoratie of gewenste planning)."
                              className="border-gray-200 focus:border-[#C8A85B] focus:ring-[#C8A85B]/20 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedType === "Terugbelverzoek" && (
                      <FormField
                        control={form.control}
                        name="callbackTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2C3E50] font-medium text-sm">Beste moment om te bellen</FormLabel>
                            <div className="flex gap-3">
                              {["Ochtend", "Namiddag", "Avond"].map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => field.onChange(time)}
                                  className={`flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                                    field.value === time
                                      ? "border-[#C8A85B] bg-[#C8A85B]/5 text-[#C8A85B]"
                                      : "border-gray-200 text-[#2C3E50]/60 hover:border-[#C8A85B]/40"
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div>
                      <label className="inline-flex items-center gap-2 text-sm text-[#2C3E50]/50 hover:text-[#C8A85B] cursor-pointer transition-colors">
                        <Paperclip className="w-4 h-4" />
                        <span>Foto toevoegen (optioneel)</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>

                    <FormField
                      control={form.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-start gap-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#C8A85B] focus:ring-[#C8A85B]"
                              />
                            </FormControl>
                            <span className="text-sm text-[#2C3E50]/60">
                              Ik ga akkoord met het{" "}
                              <a href="/privacy" className="text-[#C8A85B] underline hover:text-[#D4AF37]">
                                privacybeleid
                              </a>
                              .
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input tabIndex={-1} autoComplete="off" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] hover:from-[#b8983b] hover:to-[#c49f27] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {mutation.isPending ? (
                        "Verzenden..."
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Persoonlijk contact aanvragen
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Info Cards - Right (1 col) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#C8A85B]/10 hover:border-[#C8A85B]/30 text-center h-full flex flex-col">
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] p-3 rounded-xl inline-flex mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg text-[#2C3E50] font-bold mb-3">
                    Bezoek onze showroom
                  </h3>
                  <div className="space-y-0.5 mb-3 text-[#2C3E50]/80 text-sm">
                    <p>Pauwengraaf 66</p>
                    <p>3630 Maasmechelen, België</p>
                  </div>
                  <div className="border-t border-[#C8A85B]/15 pt-3 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="text-[#C8A85B] h-3.5 w-3.5" />
                      <span className="font-semibold text-[#2C3E50] text-xs">Openingstijden</span>
                    </div>
                    <p className="text-[#2C3E50]/70 text-xs">Ma – Za: 10:00 – 18:00</p>
                    <p className="text-[#2C3E50]/70 text-xs">Zondag: Gesloten</p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://www.google.com/maps/dir//KANIOU+bvba+ZILVERNAALD,+Pauwengraaf+66,+3630+Maasmechelen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#C8A85B] font-semibold hover:text-[#D4AF37] transition-colors text-sm"
                    >
                      Route plannen
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#C8A85B]/10 hover:border-[#C8A85B]/30 text-center h-full flex flex-col">
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] p-3 rounded-xl inline-flex mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg text-[#2C3E50] font-bold mb-3">
                    Bel ons direct
                  </h3>
                  <a
                    href="tel:+32467856405"
                    className="text-xl font-bold text-[#C8A85B] hover:text-[#D4AF37] transition-colors mb-3"
                  >
                    +32 467 85 64 05
                  </a>
                  <div className="border-t border-[#C8A85B]/15 pt-3 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="text-[#C8A85B] h-3.5 w-3.5" />
                      <span className="font-semibold text-[#2C3E50] text-xs">Bereikbaar</span>
                    </div>
                    <p className="text-[#2C3E50]/70 text-xs">Ma – Za: 10:00 – 18:00</p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="tel:+32467856405"
                      className="inline-flex items-center gap-2 text-[#C8A85B] font-semibold hover:text-[#D4AF37] transition-colors text-sm"
                    >
                      Nu bellen
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#C8A85B]/10 hover:border-[#C8A85B]/30 text-center h-full flex flex-col">
                  <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] p-3 rounded-xl inline-flex mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg text-[#2C3E50] font-bold mb-3">
                    Stuur ons een e-mail
                  </h3>
                  <a
                    href="mailto:info@kaniou.be"
                    className="text-lg font-bold text-[#C8A85B] hover:text-[#D4AF37] transition-colors mb-3"
                  >
                    info@kaniou.be
                  </a>
                  <div className="border-t border-[#C8A85B]/15 pt-3 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Shield className="text-[#C8A85B] h-3.5 w-3.5" />
                      <span className="font-semibold text-[#2C3E50] text-xs">Responsietijd</span>
                    </div>
                    <p className="text-[#2C3E50]/70 text-xs">Binnen 24 uur op werkdagen</p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="mailto:info@kaniou.be"
                      className="inline-flex items-center gap-2 text-[#C8A85B] font-semibold hover:text-[#D4AF37] transition-colors text-sm"
                    >
                      E-mail sturen
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 6: Zakelijke Projecten */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2C3E50] via-[#1a2a3a] to-[#2C3E50] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Building2 className="w-6 h-6 text-[#C8A85B]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">
              Zakelijke projecten of samenwerkingen
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Bent u architect, projectontwikkelaar of interieurontwerper?
              Ons team ondersteunt u bij residentiële en commerciële projecten.
            </p>
            <a
              href="mailto:info@kaniou.be?subject=Zakelijk%20project"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Neem contact op voor zakelijke projecten
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </Container>
      </section>

      {/* Section 7: Social Proof / Testimonials */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-bold mb-4">
              Wat klanten zeggen
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#f8f6f1] to-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#C8A85B]/10">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-[#C8A85B]/20" />
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < ((displayTestimonials[currentTestimonial] as any)?.rating || 5)
                          ? "text-[#C8A85B] fill-[#C8A85B]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg text-[#2C3E50]/80 leading-relaxed mb-6 italic min-h-[80px]">
                  "{displayTestimonials[currentTestimonial]?.content}"
                </p>
                <div>
                  <p className="font-bold text-[#2C3E50]">
                    {displayTestimonials[currentTestimonial]?.name}
                  </p>
                  <p className="text-[#2C3E50]/60 text-sm">
                    {(displayTestimonials[currentTestimonial] as any)?.location || ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-8">
                {displayTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial
                        ? "bg-[#C8A85B] w-6"
                        : "bg-[#C8A85B]/30 hover:bg-[#C8A85B]/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-[#f8f6f1] to-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-bold mb-4">
                Veelgestelde vragen
              </h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#C8A85B]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-[#2C3E50] pr-4">{item.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-[#C8A85B] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#C8A85B] shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5">
                      <p className="text-[#2C3E50]/70 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 9: Footer CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2C3E50] via-[#1a2a3a] to-[#2C3E50] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5" />
        <Container>
          <div className="relative z-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6">
              Klaar om uw interieur te transformeren?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="/quote"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Gratis adviesgesprek
              </a>
              <a
                href="/quote"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                Offerte aanvragen
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
