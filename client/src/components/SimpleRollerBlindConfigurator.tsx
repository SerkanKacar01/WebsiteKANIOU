import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Loader2, ChevronRight, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const colorSampleSchema = z.object({
  email: z.string().email("Vul een geldig e-mailadres in"),
  selectedColor: z.string().min(1, "Selecteer een kleur"),
  colorName: z.string().min(1, "Kleur naam is verplicht"),
  fabricType: z.string().optional(),
  website: z.string().max(0).optional(), // Honeypot
});

type ConfiguratorFormValues = z.infer<typeof colorSampleSchema>;

// Available color options
const colorOptions = [
  { id: "wit", name: "Wit", color: "#FFFFFF", borderColor: "#E5E7EB" },
  { id: "creme", name: "Crème", color: "#FDF6E3", borderColor: "#E5D3B3" },
  { id: "beige", name: "Beige", color: "#F5F5DC", borderColor: "#D1D5DB" },
  { id: "grijs", name: "Grijs", color: "#9CA3AF", borderColor: "#6B7280" },
  { id: "zwart", name: "Zwart", color: "#1F2937", borderColor: "#111827" },
  { id: "taupe", name: "Taupe", color: "#D2B48C", borderColor: "#B8956A" },
  { id: "zand", name: "Zand", color: "#F4A460", borderColor: "#CD853F" },
  { id: "bruin", name: "Bruin", color: "#8B4513", borderColor: "#654321" },
];

// Product images for the photo section
const productImages = [
  {
    title: "Open profiel (standaard)",
    description: "Eenvoudig en functioneel ontwerp",
    image: "data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='80' fill='%23f3f4f6'/%3E%3Crect x='10' y='10' width='100' height='60' fill='white' stroke='%23d1d5db' stroke-width='2'/%3E%3Ctext x='60' y='45' text-anchor='middle' fill='%23374151' font-size='10'%3EOpen profiel%3C/text%3E%3C/svg%3E"
  },
  {
    title: "Cassette optie (meerprijs)",
    description: "Strakke afwerking met beschermkast",
    image: "data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='80' fill='%23f3f4f6'/%3E%3Crect x='10' y='5' width='100' height='15' fill='%23e5e7eb' stroke='%23d1d5db'/%3E%3Crect x='10' y='20' width='100' height='50' fill='white' stroke='%23d1d5db' stroke-width='2'/%3E%3Ctext x='60' y='50' text-anchor='middle' fill='%23374151' font-size='10'%3ECassette%3C/text%3E%3C/svg%3E"
  },
  {
    title: "Onderlat (wit aluminium)",
    description: "Stevige aluminium afwerking",
    image: "data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='80' fill='%23f3f4f6'/%3E%3Crect x='10' y='10' width='100' height='50' fill='white' stroke='%23d1d5db' stroke-width='2'/%3E%3Crect x='10' y='60' width='100' height='8' fill='%23f9fafb' stroke='%239ca3af'/%3E%3Ctext x='60' y='45' text-anchor='middle' fill='%23374151' font-size='10'%3EAluminium%3C/text%3E%3C/svg%3E"
  },
  {
    title: "Kettingbediening",
    description: "Verkrijgbaar in wit, zwart, grijs",
    image: "data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='80' fill='%23f3f4f6'/%3E%3Crect x='10' y='10' width='100' height='50' fill='white' stroke='%23d1d5db' stroke-width='2'/%3E%3Cline x1='95' y1='20' x2='95' y2='70' stroke='%23374151' stroke-width='3'/%3E%3Ctext x='60' y='45' text-anchor='middle' fill='%23374151' font-size='10'%3EKetting%3C/text%3E%3C/svg%3E"
  },
  {
    title: "Ophangmontage",
    description: "Eenvoudige montage aan muur of plafond",
    image: "data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='80' fill='%23f3f4f6'/%3E%3Crect x='10' y='5' width='100' height='5' fill='%23d1d5db'/%3E%3Crect x='20' y='10' width='5' height='5' fill='%23374151'/%3E%3Crect x='95' y='10' width='5' height='5' fill='%23374151'/%3E%3Crect x='10' y='15' width='100' height='45' fill='white' stroke='%23d1d5db' stroke-width='2'/%3E%3Ctext x='60' y='45' text-anchor='middle' fill='%23374151' font-size='10'%3EMontage%3C/text%3E%3C/svg%3E"
  }
];

const SimpleRollerBlindConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState<typeof colorOptions[0] | null>(null);
  const [fabricType, setFabricType] = useState<string>("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const form = useForm<ConfiguratorFormValues>({
    resolver: zodResolver(colorSampleSchema),
    defaultValues: {
      email: "",
      selectedColor: "",
      colorName: "",
      fabricType: "",
      website: "",
    },
  });

  const emailMutation = useMutation({
    mutationFn: (data: ConfiguratorFormValues) =>
      apiRequest("POST", "/api/color-sample-requests", data),
    onSuccess: () => {
      setEmailSubmitted(true);
      toast({
        title: "Staalverzoek verzonden",
        description: "U ontvangt binnenkort uw gratis stofstalen per post.",
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
    // Don't auto-advance to step 2 yet, wait for email submission
  };

  const handleEmailSubmit = (data: ConfiguratorFormValues) => {
    if (!selectedColor) {
      toast({
        title: "Selecteer eerst een kleur",
        description: "Kies een kleur voordat u uw e-mailadres invult.",
        variant: "destructive",
      });
      return;
    }
    emailMutation.mutate(data);
  };

  const handleFabricTypeSelect = (value: string) => {
    setFabricType(value);
    setCurrentStep(3);
  };

  const handleContinueToFullConfigurator = () => {
    // Navigate to the full configurator with pre-selected options
    window.location.href = "/producten/rolgordijnen/configurator";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Product Photo Section - Always Visible */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Wat u kunt verwachten van onze standaard rolgordijnen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {productImages.map((image, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-2">
                    <img 
                      src={image.image} 
                      alt={image.title}
                      className="w-full h-16 object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-xs text-gray-600">{image.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 1 - Color Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Stap 1: Kies uw favoriete kleur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color)}
                  className={`relative group ${
                    selectedColor?.id === color.id
                      ? "ring-4 ring-blue-500 ring-offset-2"
                      : "hover:scale-105"
                  } transition-all duration-200`}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 mx-auto"
                    style={{ 
                      backgroundColor: color.color,
                      borderColor: color.borderColor 
                    }}
                  ></div>
                  <p className="text-sm font-medium mt-2 text-gray-700">{color.name}</p>
                  {selectedColor?.id === color.id && (
                    <CheckCircle className="w-6 h-6 text-blue-500 absolute -top-2 -right-2 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {selectedColor && !emailSubmitted && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 mb-4 text-center font-medium">
                  U ontvangt gratis stofstalen in deze kleur: <strong>{selectedColor.name}</strong>
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-4">
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
                          <FormLabel className="text-base font-medium">
                            Vul uw e-mailadres in om de stofstalen te ontvangen
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="voorbeeld@email.be"
                              className="text-center"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={emailMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                    >
                      {emailMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Bezig met verzenden...
                        </>
                      ) : (
                        "Stalen aanvragen"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {emailSubmitted && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-800 font-medium">
                  Staalverzoek ontvangen! U ontvangt binnen 2-3 werkdagen uw gratis stofstalen.
                </p>
                <Button 
                  onClick={() => setCurrentStep(2)}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Ga verder met stap 2 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2 - Fabric Type Selection */}
        {(currentStep >= 2 || emailSubmitted) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Stap 2: Kies het type stof
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={fabricType} 
                onValueChange={handleFabricTypeSelect}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="verduisterend" id="verduisterend" />
                  <div className="flex-1">
                    <Label htmlFor="verduisterend" className="text-base font-medium cursor-pointer">
                      Verduisterend (blackout)
                    </Label>
                    <p className="text-sm text-gray-600">
                      Blokkeert licht volledig voor perfecte duisternis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="lichtdoorlatend" id="lichtdoorlatend" />
                  <div className="flex-1">
                    <Label htmlFor="lichtdoorlatend" className="text-base font-medium cursor-pointer">
                      Lichtdoorlatend
                    </Label>
                    <p className="text-sm text-gray-600">
                      Laat zachte lichtinval door voor een aangename sfeer
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Step 3 - Continue to Full Configurator */}
        {currentStep >= 3 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Uitstekend! Nu kunt u uw rolgordijn volledig samenstellen
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Uw keuzes tot nu toe:</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Kleur: <span className="font-medium">{selectedColor?.name}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Stoftype: <span className="font-medium">{fabricType}</span>
                  </p>
                </div>

                <Button 
                  onClick={handleContinueToFullConfigurator}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4"
                >
                  Ga verder met samenstellen van uw rolgordijn
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-sm text-gray-500">
                  In de volgende stap kunt u de afmetingen, cassette opties, bediening en montage specificeren.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-1 ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRollerBlindConfigurator;