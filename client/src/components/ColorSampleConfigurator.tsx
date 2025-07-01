import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Loader2, Mail, Palette } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const colorSampleSchema = z.object({
  email: z.string().email("Vul een geldig e-mailadres in"),
  selectedColor: z.string().min(1, "Selecteer een kleur"),
  colorName: z.string().min(1, "Kleur naam is verplicht"),
  website: z.string().max(0).optional(), // Honeypot
});

type ColorSampleFormValues = z.infer<typeof colorSampleSchema>;

// Available color options with visual samples
const colorOptions = [
  {
    id: "wit",
    name: "Wit",
    description: "Klassiek wit voor heldere ruimtes",
    color: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  {
    id: "beige",
    name: "Beige",
    description: "Warme neutrale tint",
    color: "#F5F5DC",
    borderColor: "#D1D5DB",
  },
  {
    id: "lichtgrijs",
    name: "Lichtgrijs",
    description: "Modern en veelzijdig",
    color: "#F3F4F6",
    borderColor: "#D1D5DB",
  },
  {
    id: "donkergrijs",
    name: "Donkergrijs",
    description: "Elegant en tijdloos",
    color: "#6B7280",
    borderColor: "#4B5563",
  },
  {
    id: "taupe",
    name: "Taupe",
    description: "Warme grijsbruine tint",
    color: "#D2B48C",
    borderColor: "#B8956A",
  },
  {
    id: "zwart",
    name: "Zwart",
    description: "Stijlvol en modern",
    color: "#1F2937",
    borderColor: "#111827",
  },
  {
    id: "donkerblauw",
    name: "Donkerblauw",
    description: "Luxe maritime uitstraling",
    color: "#1E3A8A",
    borderColor: "#1E40AF",
  },
  {
    id: "warmgroen",
    name: "Warmgroen",
    description: "Natuurlijke groene tint",
    color: "#065F46",
    borderColor: "#047857",
  },
];

const ColorSampleConfigurator = () => {
  const [selectedColor, setSelectedColor] = useState<typeof colorOptions[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ColorSampleFormValues>({
    resolver: zodResolver(colorSampleSchema),
    defaultValues: {
      email: "",
      selectedColor: "",
      colorName: "",
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ColorSampleFormValues) =>
      apiRequest("POST", "/api/color-sample-requests", data),
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Staalverzoek verzonden",
        description: "Bedankt! U ontvangt binnenkort uw gratis stalen per post.",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij verzenden",
        description: error.message || "Er is een fout opgetreden. Probeer het opnieuw.",
        variant: "destructive",
      });
    },
  });

  const handleColorSelect = (color: typeof colorOptions[0]) => {
    setSelectedColor(color);
    form.setValue("selectedColor", color.id);
    form.setValue("colorName", color.name);
  };

  const onSubmit = (data: ColorSampleFormValues) => {
    if (!selectedColor) {
      toast({
        title: "Selecteer een kleur",
        description: "Kies eerst een kleur voordat u het formulier verzendt.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Staalverzoek ontvangen!
            </h2>
            <p className="text-gray-600 mb-4">
              Bedankt voor uw interesse in KANIOU rolgordijnen.
            </p>
            <p className="text-gray-600 mb-6">
              Binnen 2-3 werkdagen ontvangt u per post enkele gratis stofstalen 
              in de kleur <strong>{selectedColor?.name}</strong> zodat u thuis de perfecte keuze kunt maken.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setSelectedColor(null);
                form.reset();
              }}
              variant="outline"
            >
              Nieuwe aanvraag
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Rolgordijnen op maat – Kies uw kleur & ontvang gratis stalen
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kies hieronder een basiskleur. U ontvangt gratis enkele stofstalen in deze kleur. 
          Zo kunt u thuis het juiste type kiezen vóór uw bestelling.
        </p>
      </div>

      {/* Product Visuals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Standaard Rolgordijn Specificaties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Wat u ontvangt:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Cassette type:</strong> Open profiel (standaard)</li>
                  <li>• <strong>Onderlat:</strong> Wit aluminium</li>
                  <li>• <strong>Bediening:</strong> Wit kunststof ketting (standaard)</li>
                  <li>• <strong>Buisdikte:</strong> 25mm</li>
                  <li>• <strong>Verkrijgbaar in:</strong> Verduisterend en lichtdoorlatend</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-32 bg-white border-2 border-gray-300 rounded mx-auto mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400"></div>
                </div>
                <p className="text-sm text-gray-600">Voorbeeld rolgordijn profiel</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selecteer uw gewenste basiskleur</CardTitle>
          <CardDescription>
            Klik op een kleur om deze te selecteren voor uw gratis stalen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  selectedColor?.id === color.id
                    ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className="w-full h-16 rounded-md mb-3 border"
                  style={{ 
                    backgroundColor: color.color,
                    borderColor: color.borderColor 
                  }}
                ></div>
                <h3 className="font-medium text-sm">{color.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{color.description}</p>
                {selectedColor?.id === color.id && (
                  <CheckCircle className="w-4 h-4 text-blue-500 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>
          
          {selectedColor && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Geselecteerd:</strong> {selectedColor.name} - {selectedColor.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Uw contactgegevens
          </CardTitle>
          <CardDescription>
            Vul uw e-mailadres in om uw gratis stalen te ontvangen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    style={{ display: 'none' }}
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
                    <FormLabel>E-mailadres *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="voorbeeld@e-mail.be"
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={mutation.isPending || !selectedColor}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Bezig met verzenden...
                  </>
                ) : (
                  "Vraag gratis stalen aan"
                )}
              </Button>
              
              {!selectedColor && (
                <p className="text-sm text-amber-600">
                  Selecteer eerst een kleur hierboven voordat u het formulier verzendt.
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <p className="text-xs text-gray-600 text-center">
            Uw gegevens worden enkel gebruikt voor het verzenden van stalen en worden niet gedeeld met derden. 
            Na het verzenden van uw stalen wordt uw e-mailadres automatisch verwijderd uit ons systeem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorSampleConfigurator;