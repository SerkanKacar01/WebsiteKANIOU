import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { X, Plus } from "lucide-react";

const productSchema = z.object({
  type: z.string().min(1, "Producttype is verplicht"),
  width: z.string().optional(),
  height: z.string().optional(),
});

// Create extended schema for the new form structure
const quoteFormSchema = z.object({
  firstName: z.string().min(2, "Voornaam moet minstens 2 tekens bevatten"),
  lastName: z.string().min(2, "Achternaam moet minstens 2 tekens bevatten"),
  email: z.string().email("Gelieve een geldig e-mailadres in te voeren"),
  phone: z.string().min(10, "Telefoonnummer moet minstens 10 cijfers bevatten"),
  products: z.array(productSchema).min(1, "Selecteer minstens 1 product"),
  requirements: z.string()
    .optional()
    .refine((val) => {
      // If field is empty or undefined, it's valid (optional)
      if (!val || val.trim() === "") return true;
      // If field has content, it must be at least 10 characters
      return val.trim().length >= 10;
    }, {
      message: "Gelieve minstens 10 tekens in te vullen bij uw aanvraag",
    }),
  website: z.string().max(0, "Invalid submission").optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const PRODUCT_OPTIONS = [
  { value: "curtains", label: "Gordijnen" },
  { value: "blinds", label: "Inbetweens" },
  { value: "shades", label: "Vouwgordijnen" },
  { value: "drapes", label: "Textiel Lamellen" },
  { value: "kunststof_lamellen", label: "Kunststof lamellen" },
  { value: "kunststof_jaloezieen", label: "Kunststof jaloezieën" },
  { value: "houten_jaloezieen", label: "Houten jaloezieën" },
  { value: "houten_shutters", label: "Houten shutters" },
  { value: "plisse", label: "Plissé" },
  { value: "duo_plisse", label: "Duo-Plissé" },
  { value: "rolgordijnen", label: "Rolgordijnen" },
  { value: "duo_rolgordijnen", label: "Duo-rolgordijnen" },
  { value: "gordijnrails", label: "Gordijnrails" },
  { value: "gordijnroedes", label: "Gordijnroedes" },
  { value: "squid", label: "SQUID" },
  { value: "inzethorren", label: "Inzethorren" },
  { value: "opzethorren", label: "Opzethorren" },
  { value: "plisse_hordeuren", label: "Plissé hordeuren" },
  { value: "dakraam_velux_fakro", label: "Dakraam Velux/Fakro" },
  { value: "screens_outside", label: "Buitenscreens" },
];

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      products: [{ type: "", width: "", height: "" }],
      requirements: "",
      website: "", // Honeypot field
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const mutation = useMutation({
    mutationFn: (data: QuoteFormValues) => {
      // Transform the data to match the backend schema
      const productList = data.products
        .map((p) => {
          const dimensions = p.width && p.height ? `${p.width} x ${p.height} cm` : "";
          return `${p.type}${dimensions ? ` (${dimensions})` : ""}`;
        })
        .join(", ");

      const transformedData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        productType: productList,
        dimensions: "",
        // Only send requirements if it has valid content (10+ chars), otherwise omit it
        ...(data.requirements && data.requirements.trim().length >= 10 
          ? { requirements: data.requirements.trim() } 
          : {}),
        website: data.website || "",
      };
      return apiRequest("POST", "/api/quote-requests", transformedData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description:
          "Thank you, your quote request has been sent successfully.",
        variant: "default",
      });
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        products: [{ type: "", width: "", height: "" }],
        requirements: "",
        website: "",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message ||
          "There was an error sending your request. Please try again.",
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voornaam</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                <FormLabel>Achternaam-</FormLabel>
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
                <FormLabel>E-mail adres</FormLabel>
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
                <FormLabel>Telefoon nummer</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-primary">
              Selecteer producten
            </h3>
            <span className="text-sm text-text-light">
              {fields.length} product{fields.length !== 1 ? "en" : ""}
            </span>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-6 p-4 bg-gradient-to-br from-white to-[#F9F7F3] rounded-xl border border-[#D5B36A]/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-primary">Product {index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    data-testid={`remove-product-${index}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <FormField
                control={form.control}
                name={`products.${index}.type`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Producttype</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRODUCT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`products.${index}.width`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breedte (cm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Breedte in cm"
                          {...field}
                          data-testid={`width-product-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`products.${index}.height`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hoogte (cm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hoogte in cm"
                          {...field}
                          data-testid={`height-product-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({ type: "", width: "", height: "" })
            }
            variant="outline"
            className="w-full border-[#D5B36A]/50 hover:border-[#D5B36A] hover:bg-[#D5B36A]/5 transition-all duration-300 group"
            data-testid="add-product-button"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Nog een product toevoegen
          </Button>
        </div>

        <div className="border-t pt-6">
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => {
              const charCount = field.value?.length || 0;
              const hasError = form.formState.errors.requirements;
              
              return (
                <FormItem>
                  <FormLabel>Optioneel voor evt. opmerkingen</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Geef aan of u specifieke wensen of vragen heeft..."
                      className={`${hasError ? "border-red-500 ring-red-500" : ""}`}
                      {...field}
                      data-testid="textarea-requirements"
                    />
                  </FormControl>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <FormMessage />
                    {charCount > 0 && charCount < 10 && (
                      <span className="text-orange-600">
                        {10 - charCount} tekens nog nodig
                      </span>
                    )}
                    {charCount >= 10 && (
                      <span className="text-green-600">
                        ✓ Voldoende tekens
                      </span>
                    )}
                  </div>
                </FormItem>
              );
            }}
          />
        </div>

        {/* Honeypot field - hidden from users but visible to bots */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
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
          className="luxury-form-button mt-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Versturen..." : "Offerte aanvragen"}
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;
