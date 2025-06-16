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

// Create extended schema for the new form structure
const quoteFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  productType: z.string().min(1, "Product type is required"),
  width: z.string().optional(),
  height: z.string().optional(),
  requirements: z.string().optional(),
  website: z.string().max(0, "Invalid submission").optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

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
      productType: "",
      width: "",
      height: "",
      requirements: "",
      website: "", // Honeypot field
    },
  });

  const mutation = useMutation({
    mutationFn: (data: QuoteFormValues) => {
      // Transform the data to match the backend schema
      const transformedData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        productType: data.productType,
        dimensions: data.width && data.height ? `${data.width} x ${data.height} cm` : "",
        requirements: data.requirements || "",
        website: data.website || "",
      };
      return apiRequest("POST", "/api/quote-requests", transformedData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thank you, your quote request has been sent successfully.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was an error sending your request. Please try again.",
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
                <FormLabel>First Name</FormLabel>
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
                <FormLabel>Last Name</FormLabel>
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product type (dropdown menu)</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimensions: Width (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="Width in cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="Height in cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional: Extra notes field</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Please mention any specific requirements or questions..."
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
          className="w-full bg-secondary hover:bg-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Offerte aanvragen"}
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;
