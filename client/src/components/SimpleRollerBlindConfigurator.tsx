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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, ChevronRight, ArrowRight, Check, Settings, Palette, Ruler, Package, Cog } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Configuration schema for the complete configurator
const configuratorSchema = z.object({
  // Step 1: Fabric type
  fabricType: z.string().min(1, "Selecteer een stofsoort"),
  
  // Step 2: Color
  selectedColor: z.string().min(1, "Selecteer een kleur"),
  colorName: z.string().min(1, "Kleur naam is verplicht"),
  
  // Step 3: Dimensions
  width: z.number().min(40, "Minimum breedte is 40cm").max(300, "Maximum breedte is 300cm"),
  height: z.number().min(50, "Minimum hoogte is 50cm").max(350, "Maximum hoogte is 350cm"),
  
  // Step 4: Options
  profileType: z.string().min(1, "Selecteer een profieltype"),
  bottomRail: z.string().min(1, "Selecteer een onderlat"),
  mounting: z.string().min(1, "Selecteer een montage optie"),
  
  // Step 5: Operation
  operationType: z.string().min(1, "Selecteer een bediening"),
  operationSide: z.string().min(1, "Selecteer een zijde"),
  motorized: z.boolean().optional(),
  
  // Step 6: Customer info (for ordering)
  email: z.string().email("Vul een geldig e-mailadres in").optional(),
  website: z.string().max(0).optional(), // Honeypot
});

type ConfiguratorFormValues = z.infer<typeof configuratorSchema>;

// Step definitions
const steps = [
  { id: 1, title: "Stofsoort", icon: Palette, description: "Kies de gewenste lichtdoorlatendheid" },
  { id: 2, title: "Kleur", icon: Settings, description: "Selecteer uw favoriete kleur" },
  { id: 3, title: "Afmetingen", icon: Ruler, description: "Voer de exacte maten in" },
  { id: 4, title: "Opties", icon: Package, description: "Profiel, onderlat en montage" },
  { id: 5, title: "Bediening", icon: Cog, description: "Ketting en positie" },
  { id: 6, title: "Samenvatting", icon: Check, description: "Overzicht en bestellen" },
];

// Fabric type options
const fabricTypes = [
  {
    id: "verduisterend",
    name: "Verduisterend (Blackout)",
    description: "Blokkeert licht volledig voor perfecte duisternis",
    image: "data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='40' fill='%23374151'/%3E%3C/svg%3E"
  },
  {
    id: "lichtdoorlatend",
    name: "Lichtdoorlatend",
    description: "Laat zachte lichtinval door voor een aangename sfeer",
    image: "data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='40' fill='%23F3F4F6'/%3E%3C/svg%3E"
  },
  {
    id: "screenstof",
    name: "Screenstof",
    description: "Perfecte balans tussen licht en privacy",
    image: "data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='40' fill='%23E5E7EB'/%3E%3Cg opacity='0.6'%3E%3Cline x1='0' y1='8' x2='60' y2='8' stroke='%23374151'/%3E%3Cline x1='0' y1='16' x2='60' y2='16' stroke='%23374151'/%3E%3Cline x1='0' y1='24' x2='60' y2='24' stroke='%23374151'/%3E%3Cline x1='0' y1='32' x2='60' y2='32' stroke='%23374151'/%3E%3C/g%3E%3C/svg%3E"
  }
];

// Color options per fabric type
const colorOptions = {
  verduisterend: [
    { id: "wit", name: "Wit", color: "#FFFFFF", borderColor: "#E5E7EB" },
    { id: "creme", name: "Crème", color: "#FDF6E3", borderColor: "#E5D3B3" },
    { id: "beige", name: "Beige", color: "#F5F5DC", borderColor: "#D1D5DB" },
    { id: "grijs", name: "Grijs", color: "#9CA3AF", borderColor: "#6B7280" },
    { id: "zwart", name: "Zwart", color: "#1F2937", borderColor: "#111827" },
    { id: "taupe", name: "Taupe", color: "#D2B48C", borderColor: "#B8956A" },
  ],
  lichtdoorlatend: [
    { id: "wit", name: "Wit", color: "#FFFFFF", borderColor: "#E5E7EB" },
    { id: "creme", name: "Crème", color: "#FDF6E3", borderColor: "#E5D3B3" },
    { id: "beige", name: "Beige", color: "#F5F5DC", borderColor: "#D1D5DB" },
    { id: "zand", name: "Zand", color: "#F4A460", borderColor: "#CD853F" },
    { id: "grijs", name: "Lichtgrijs", color: "#D1D5DB", borderColor: "#9CA3AF" },
  ],
  screenstof: [
    { id: "wit", name: "Wit", color: "#FFFFFF", borderColor: "#E5E7EB" },
    { id: "creme", name: "Crème", color: "#FDF6E3", borderColor: "#E5D3B3" },
    { id: "grijs", name: "Grijs", color: "#9CA3AF", borderColor: "#6B7280" },
    { id: "zwart", name: "Zwart", color: "#1F2937", borderColor: "#111827" },
    { id: "bruin", name: "Bruin", color: "#8B4513", borderColor: "#654321" },
  ]
};

const SimpleRollerBlindConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [configuration, setConfiguration] = useState<Partial<ConfiguratorFormValues>>({});
  
  const form = useForm<ConfiguratorFormValues>({
    resolver: zodResolver(configuratorSchema),
    defaultValues: {
      fabricType: "",
      selectedColor: "",
      colorName: "",
      width: 100,
      height: 190,
      profileType: "",
      bottomRail: "",
      mounting: "",
      operationType: "",
      operationSide: "",
      motorized: false,
      email: "",
      website: "",
    },
  });

  // Helper functions
  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const goToStep = (step: number) => {
    if (step <= Math.max(...completedSteps) + 1) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    markStepComplete(currentStep);
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getCurrentColors = () => {
    if (!configuration.fabricType) return [];
    return colorOptions[configuration.fabricType as keyof typeof colorOptions] || [];
  };

  const calculatePrice = () => {
    let basePrice = 89.95;
    
    // Add fabric type pricing
    if (configuration.fabricType === "verduisterend") basePrice += 20;
    if (configuration.fabricType === "screenstof") basePrice += 15;
    
    // Add size pricing
    const area = (configuration.width || 100) * (configuration.height || 190) / 10000;
    basePrice += area * 25;
    
    // Add profile type pricing
    if (configuration.profileType === "cassette") basePrice += 35;
    
    // Add motorization pricing
    if (configuration.motorized) basePrice += 150;
    
    return Math.round(basePrice * 100) / 100;
  };

  // Step component renderers
  const renderStepIndicator = () => (
    <div className="mb-8">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isAccessible = step.id <= Math.max(...completedSteps) + 1;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => goToStep(step.id)}
                disabled={!isAccessible}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-yellow-500 border-yellow-500 text-white"
                    : isAccessible
                    ? "bg-white border-gray-300 text-gray-600 hover:border-yellow-400"
                    : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </button>
              <div className="ml-3 flex-1">
                <div className={`text-sm font-medium ${
                  isActive ? "text-yellow-600" : isCompleted ? "text-green-600" : "text-gray-600"
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-4 ${
                  completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-200"
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            const isAccessible = step.id <= Math.max(...completedSteps) + 1;
            const Icon = step.icon;
            
            return (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                disabled={!isAccessible}
                className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-50 border border-green-200"
                    : isActive
                    ? "bg-yellow-50 border border-yellow-200"
                    : isAccessible
                    ? "bg-white border border-gray-200 hover:bg-gray-50"
                    : "bg-gray-50 border border-gray-100 opacity-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-yellow-500 border-yellow-500 text-white"
                    : "border-gray-300 text-gray-600"
                }`}>
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-xs font-medium text-center ${
                  isActive ? "text-yellow-600" : isCompleted ? "text-green-600" : "text-gray-600"
                }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

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