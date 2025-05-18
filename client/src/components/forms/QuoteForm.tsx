import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/context/LanguageContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { insertQuoteRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Extend the schema with additional validation
const quoteFormSchema = insertQuoteRequestSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(7, { message: "Please enter a valid phone number" }),
  productType: z.string().min(1, { message: "Please select a product type" }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productType: "",
      dimensions: "",
      requirements: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: QuoteFormValues) =>
      apiRequest("POST", "/api/quote-requests", data),
    onSuccess: () => {
      toast({
        title: t("quote.form.success"),
        description: t("quote.form.successMessage"),
        variant: "success" as any,
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: t("quote.form.error"),
        description: error.message || t("quote.form.errorMessage"),
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: QuoteFormValues) => {
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
                <FormLabel>Voor - en Achternaam</FormLabel>
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
                <FormLabel>E-mail Adres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="" {...field} />
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
                <FormLabel>Mobiel nummer</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kies je raamdecoratie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="curtains">Gordijnen</SelectItem>
                    <SelectItem value="blinds">Inbetweens</SelectItem>
                    <SelectItem value="shades">Vouwgordijnen</SelectItem>
                    <SelectItem value="drapes">Textiel Lamellen</SelectItem>
                    <SelectItem value="kunststof_lamellen">
                      Kunststof lamellen
                    </SelectItem>
                    <SelectItem value="kunststof_jaloezieen">
                      Kunststof jaloezieën
                    </SelectItem>
                    <SelectItem value="houten_jaloezieen">
                      Houten jaloezieën
                    </SelectItem>
                    <SelectItem value="houten_shutters">Houten shutters</SelectItem>
                    <SelectItem value="plisse">Plissé</SelectItem>
                    <SelectItem value="duo_plisse">Duo-Plissé</SelectItem>
                    <SelectItem value="rolgordijnen">Rolgordijnen</SelectItem>
                    <SelectItem value="duo_rolgordijnen">
                      Duo-rolgordijnen
                    </SelectItem>
                    <SelectItem value="gordijnrails">Gordijnrails</SelectItem>
                    <SelectItem value="gordijnroedes">Gordijnroedes</SelectItem>
                    <SelectItem value="squid">SQUID</SelectItem>
                    <SelectItem value="inzethorren">Inzethorren</SelectItem>
                    <SelectItem value="opzethorren">Opzethorren</SelectItem>
                    <SelectItem value="plisse_hordeuren">
                      Plissé hordeuren
                    </SelectItem>
                    <SelectItem value="dakraam_velux_fakro">
                      Dakraam Velux/Fakro
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Afmetingen van het raam (indien bekend)</FormLabel>
              <FormControl>
                <Input placeholder="Breedte x Hoogte in cm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aanvullende vereisten</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Gelieve eventuele specifieke vereisten of vragen te vermelden…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Offerteaanvraag verzenden"}
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;
