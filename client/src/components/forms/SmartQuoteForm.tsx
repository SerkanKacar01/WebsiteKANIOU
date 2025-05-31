import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { insertSmartQuoteRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Calculator, Euro, Info, CheckCircle, AlertCircle } from "lucide-react";

// Use the enhanced schema from backend with all validation rules
const smartQuoteFormSchema = insertSmartQuoteRequestSchema;

type SmartQuoteFormValues = z.infer<typeof smartQuoteFormSchema>;

interface PriceEstimate {
  estimatedPrice: number;
  dimensions: { width: number; height: number };
  productType: string;
  material: string;
  installationRequired: boolean;
}

interface QuoteConfig {
  productTypes: string[];
  config: Record<string, {
    name: string;
    materials: string[];
    installationCost: number;
  }>;
}

const SmartQuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  // Fetch quote configuration
  const { data: quoteConfig, isLoading: configLoading } = useQuery<QuoteConfig>({
    queryKey: ['/api/smart-quotes/config'],
    enabled: true
  });

  // Form setup
  const form = useForm<SmartQuoteFormValues>({
    resolver: zodResolver(smartQuoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      roomType: "",
      productType: "",
      material: "",
      width: 100,
      height: 150,
      colorPreference: "",
      stylePreference: "",
      installationRequired: false,
      additionalNotes: "",
      language: language,
      website: "", // Honeypot field
    },
  });

  // Watch form values for real-time price calculation
  const watchedValues = form.watch();

  // Calculate price estimate when relevant fields change
  useEffect(() => {
    const { productType, material, width, height, installationRequired } = watchedValues;
    
    if (productType && material && width >= 30 && height >= 30) {
      calculatePriceEstimate(productType, material, width, height, installationRequired);
    } else {
      setPriceEstimate(null);
    }
  }, [watchedValues.productType, watchedValues.material, watchedValues.width, watchedValues.height, watchedValues.installationRequired]);

  // Price calculation function
  const calculatePriceEstimate = async (
    productType: string,
    material: string,
    width: number,
    height: number,
    installationRequired: boolean
  ) => {
    if (isCalculatingPrice) return;
    
    setIsCalculatingPrice(true);
    try {
      const response = await apiRequest("POST", "/api/smart-quotes/estimate", {
        productType,
        material,
        width,
        height,
        installationRequired
      });
      
      if (response.success) {
        setPriceEstimate(response);
      }
    } catch (error) {
      console.error("Price calculation error:", error);
      setPriceEstimate(null);
    } finally {
      setIsCalculatingPrice(false);
    }
  };

  // Submit mutation
  const mutation = useMutation({
    mutationFn: (data: SmartQuoteFormValues) =>
      apiRequest("POST", "/api/smart-quotes", data),
    onSuccess: (response) => {
      toast({
        title: t("smartQuote.form.success"),
        description: t("smartQuote.form.successMessage"),
        variant: "success" as any,
      });
      setShowSuccessMessage(true);
      form.reset();
      setPriceEstimate(null);
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: t("smartQuote.form.error"),
        description: error.message || t("smartQuote.form.errorMessage"),
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: SmartQuoteFormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  // Translations
  const translations = {
    nl: {
      title: "Slimme Offerte Generator",
      subtitle: "Krijg direct een geschatte prijs op basis van uw wensen",
      personalInfo: "Persoonlijke Gegevens",
      productSpecs: "Productspecificaties",
      preferences: "Voorkeuren",
      estimate: "Geschatte Prijs",
      estimateDisclaimer: "*Dit is een automatisch berekende schatting. De definitieve prijs kan afwijken.",
      submit: "Offerteaanvraag Verzenden",
      submitting: "Verzenden...",
      calculating: "Berekenen...",
      success: "Bedankt voor uw aanvraag!",
      successMessage: "U ontvangt binnen 24 uur een gepersonaliseerde offerte per e-mail.",
      
      // Form fields
      name: "Volledige Naam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      roomType: "Type Ruimte",
      productType: "Product Type",
      material: "Materiaal",
      width: "Breedte (cm)",
      height: "Hoogte (cm)",
      colorPreference: "Kleurvoorkeur",
      stylePreference: "Stijlvoorkeur",
      installation: "Installatie gewenst",
      additionalNotes: "Aanvullende Opmerkingen",
      
      // Room types
      living_room: "Woonkamer",
      bedroom: "Slaapkamer",
      kitchen: "Keuken",
      bathroom: "Badkamer",
      office: "Kantoor",
      children_room: "Kinderkamer",
      dining_room: "Eetkamer",
      other: "Andere",
      
      // Materials
      screen: "Screen",
      blackout: "Blackout",
      light_filtering: "Lichtfilterend",
      transparent: "Transparant",
      standard: "Standaard",
      duette: "Duette",
      aluminum: "Aluminium",
      wood: "Hout",
      faux_wood: "Kunsthout",
      pvc: "PVC",
      fabric: "Stof",
      cotton: "Katoen",
      linen: "Linnen",
      velvet: "Fluweel",
      synthetic: "Synthetisch"
    },
    fr: {
      title: "Générateur de Devis Intelligent",
      subtitle: "Obtenez immédiatement un prix estimé selon vos souhaits",
      personalInfo: "Informations Personnelles",
      productSpecs: "Spécifications du Produit",
      preferences: "Préférences",
      estimate: "Prix Estimé",
      estimateDisclaimer: "*Ceci est une estimation automatique. Le prix final peut différer.",
      submit: "Envoyer la Demande de Devis",
      submitting: "Envoi...",
      calculating: "Calcul...",
      success: "Merci pour votre demande!",
      successMessage: "Vous recevrez un devis personnalisé par e-mail dans les 24 heures.",
      
      name: "Nom Complet",
      email: "Adresse E-mail",
      phone: "Numéro de Téléphone",
      roomType: "Type de Pièce",
      productType: "Type de Produit",
      material: "Matériau",
      width: "Largeur (cm)",
      height: "Hauteur (cm)",
      colorPreference: "Préférence de Couleur",
      stylePreference: "Préférence de Style",
      installation: "Installation souhaitée",
      additionalNotes: "Remarques Supplémentaires",
      
      living_room: "Salon",
      bedroom: "Chambre",
      kitchen: "Cuisine",
      bathroom: "Salle de Bain",
      office: "Bureau",
      children_room: "Chambre d'Enfant",
      dining_room: "Salle à Manger",
      other: "Autre"
    },
    en: {
      title: "Smart Quote Generator",
      subtitle: "Get instant price estimates based on your preferences",
      personalInfo: "Personal Information",
      productSpecs: "Product Specifications",
      preferences: "Preferences",
      estimate: "Estimated Price",
      estimateDisclaimer: "*This is an automatically calculated estimate. Final price may vary.",
      submit: "Submit Quote Request",
      submitting: "Submitting...",
      calculating: "Calculating...",
      success: "Thank you for your request!",
      successMessage: "You will receive a personalized quote by email within 24 hours.",
      
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      roomType: "Room Type",
      productType: "Product Type",
      material: "Material",
      width: "Width (cm)",
      height: "Height (cm)",
      colorPreference: "Color Preference",
      stylePreference: "Style Preference",
      installation: "Installation desired",
      additionalNotes: "Additional Notes",
      
      living_room: "Living Room",
      bedroom: "Bedroom",
      kitchen: "Kitchen",
      bathroom: "Bathroom",
      office: "Office",
      children_room: "Children's Room",
      dining_room: "Dining Room",
      other: "Other"
    },
    tr: {
      title: "Akıllı Teklif Üretici",
      subtitle: "Tercihlerinize göre anında fiyat tahmini alın",
      personalInfo: "Kişisel Bilgiler",
      productSpecs: "Ürün Özellikleri",
      preferences: "Tercihler",
      estimate: "Tahmini Fiyat",
      estimateDisclaimer: "*Bu otomatik hesaplanmış bir tahmindir. Nihai fiyat değişebilir.",
      submit: "Teklif Talebini Gönder",
      submitting: "Gönderiliyor...",
      calculating: "Hesaplanıyor...",
      success: "Talebiniz için teşekkürler!",
      successMessage: "24 saat içinde e-posta ile kişiselleştirilmiş teklif alacaksınız.",
      
      name: "Ad Soyad",
      email: "E-posta Adresi",
      phone: "Telefon Numarası",
      roomType: "Oda Tipi",
      productType: "Ürün Tipi",
      material: "Malzeme",
      width: "Genişlik (cm)",
      height: "Yükseklik (cm)",
      colorPreference: "Renk Tercihi",
      stylePreference: "Stil Tercihi",
      installation: "Kurulum isteniyor",
      additionalNotes: "Ek Notlar",
      
      living_room: "Oturma Odası",
      bedroom: "Yatak Odası",
      kitchen: "Mutfak",
      bathroom: "Banyo",
      office: "Ofis",
      children_room: "Çocuk Odası",
      dining_room: "Yemek Odası",
      other: "Diğer"
    }
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations[language as keyof typeof translations] || translations.nl;
    for (const k of keys) {
      value = (value as any)[k];
    }
    return value || key;
  };

  if (showSuccessMessage) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("success")}</h2>
          <p className="text-gray-600 mb-6">{t("successMessage")}</p>
          <Button onClick={() => setShowSuccessMessage(false)} variant="outline">
            Nieuwe Offerte Aanvragen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    {t("personalInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("name")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Jan Janssen" {...field} />
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
                          <FormLabel>{t("email")}</FormLabel>
                          <FormControl>
                            <Input placeholder="jan@voorbeeld.be" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phone")}</FormLabel>
                          <FormControl>
                            <Input placeholder="+32 123 456 789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("roomType")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecteer ruimte" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="living_room">{t("living_room")}</SelectItem>
                              <SelectItem value="bedroom">{t("bedroom")}</SelectItem>
                              <SelectItem value="kitchen">{t("kitchen")}</SelectItem>
                              <SelectItem value="bathroom">{t("bathroom")}</SelectItem>
                              <SelectItem value="office">{t("office")}</SelectItem>
                              <SelectItem value="children_room">{t("children_room")}</SelectItem>
                              <SelectItem value="dining_room">{t("dining_room")}</SelectItem>
                              <SelectItem value="other">{t("other")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Product Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    {t("productSpecs")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="productType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("productType")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecteer product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {quoteConfig?.config && Object.entries(quoteConfig.config).map(([key, config]) => (
                                <SelectItem key={key} value={key}>{config.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="material"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("material")}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={!watchedValues.productType}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecteer materiaal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {watchedValues.productType && quoteConfig?.config[watchedValues.productType]?.materials.map((material) => (
                                <SelectItem key={material} value={material}>{t(material)}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("width")}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="30" 
                              max="500" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
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
                          <FormLabel>{t("height")}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="30" 
                              max="400" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="installationRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{t("installation")}</FormLabel>
                          {watchedValues.productType && quoteConfig?.config[watchedValues.productType] && (
                            <p className="text-sm text-muted-foreground">
                              +€{quoteConfig.config[watchedValues.productType].installationCost}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("preferences")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="colorPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("colorPreference")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Wit, beige, antraciet..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stylePreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("stylePreference")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Modern, klassiek, minimalistisch..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("additionalNotes")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Eventuele extra wensen of opmerkingen..." 
                            className="resize-none" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

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
                {isSubmitting ? t("submitting") : t("submit")}
              </Button>
            </form>
          </Form>
        </div>

        {/* Price Estimate Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="w-5 h-5" />
                {t("estimate")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {priceEstimate ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">
                      €{priceEstimate.estimatedPrice}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("estimateDisclaimer")}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Product:</span>
                      <Badge variant="outline">{quoteConfig?.config[priceEstimate.productType]?.name}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Materiaal:</span>
                      <Badge variant="outline">{t(priceEstimate.material)}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Afmetingen:</span>
                      <span>{priceEstimate.dimensions.width} × {priceEstimate.dimensions.height} cm</span>
                    </div>
                    {priceEstimate.installationRequired && (
                      <div className="flex justify-between text-sm">
                        <span>Installatie:</span>
                        <span>Inbegrepen</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : isCalculatingPrice ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">{t("calculating")}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Vul de productgegevens in voor een geschatte prijs
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartQuoteForm;