import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Check, Settings, Palette, Ruler, Package, Cog, ChevronRight } from "lucide-react";

// Configuration schema for the complete configurator
const configuratorSchema = z.object({
  fabricType: z.string().min(1, "Selecteer een stofsoort"),
  selectedColor: z.string().min(1, "Selecteer een kleur"),
  colorName: z.string().min(1, "Kleur naam is verplicht"),
  width: z.number().min(40, "Minimum breedte is 40cm").max(300, "Maximum breedte is 300cm"),
  height: z.number().min(50, "Minimum hoogte is 50cm").max(350, "Maximum hoogte is 350cm"),
  profileType: z.string().min(1, "Selecteer een profieltype"),
  bottomRail: z.string().min(1, "Selecteer een onderlat"),
  mounting: z.string().min(1, "Selecteer een montage optie"),
  operationType: z.string().min(1, "Selecteer een bediening"),
  operationSide: z.string().min(1, "Selecteer een zijde"),
  motorized: z.boolean().optional(),
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
    priceAdd: 20,
  },
  {
    id: "lichtdoorlatend",
    name: "Lichtdoorlatend",
    description: "Laat zachte lichtinval door voor een aangename sfeer",
    priceAdd: 0,
  },
  {
    id: "screenstof",
    name: "Screenstof",
    description: "Perfecte balans tussen licht en privacy",
    priceAdd: 15,
  }
];

// Base colors available for all fabric types (7 colors in specified order)
const baseColors = [
  { id: "wit", name: "White", color: "#FFFFFF", borderColor: "#E5E7EB" },
  { id: "creme", name: "Crème", color: "#FDF6E3", borderColor: "#E5D3B3" },
  { id: "beige", name: "Beige", color: "#F5F5DC", borderColor: "#D1D5DB" },
  { id: "grijs", name: "Gray", color: "#9CA3AF", borderColor: "#6B7280" },
  { id: "taupe", name: "Taupe", color: "#D2B48C", borderColor: "#B8956A" },
  { id: "zwart", name: "Black", color: "#1F2937", borderColor: "#111827" },
  { id: "bruin", name: "Brown", color: "#8B4513", borderColor: "#654321" },
];

const ModernRollerBlindConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [configuration, setConfiguration] = useState<Partial<ConfiguratorFormValues>>({
    width: 100,
    height: 190,
    motorized: false,
  });
  
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
    },
  });

  // Helper functions
  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const goToStep = (step: number) => {
    if (step <= Math.max(...completedSteps, 0) + 1 || completedSteps.includes(step)) {
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
    // Return all 7 base colors for any fabric type
    return baseColors;
  };

  const calculatePrice = () => {
    let basePrice = 89.95;
    
    // Add fabric type pricing
    const fabricType = fabricTypes.find(f => f.id === configuration.fabricType);
    if (fabricType) basePrice += fabricType.priceAdd;
    
    // Add size pricing (area calculation)
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
          const isAccessible = step.id <= Math.max(...completedSteps, 0) + 1 || completedSteps.includes(step.id);
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
            const isAccessible = step.id <= Math.max(...completedSteps, 0) + 1 || completedSteps.includes(step.id);
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

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Stap 1: Kies uw stofsoort</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={configuration.fabricType || ""} 
          onValueChange={(value) => {
            setConfiguration({...configuration, fabricType: value});
            // Reset color when fabric type changes
            setConfiguration(prev => ({...prev, fabricType: value, selectedColor: "", colorName: ""}));
          }}
          className="space-y-4"
        >
          {fabricTypes.map((fabric) => (
            <div key={fabric.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value={fabric.id} id={fabric.id} />
              <div className="flex-1">
                <Label htmlFor={fabric.id} className="text-base font-medium cursor-pointer">
                  {fabric.name} {fabric.priceAdd > 0 && <span className="text-sm text-green-600">(+€{fabric.priceAdd})</span>}
                </Label>
                <p className="text-sm text-gray-600">{fabric.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        {configuration.fabricType && (
          <div className="mt-6 text-center">
            <Button onClick={nextStep} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Ga verder naar kleur selectie <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => {
    const colors = getCurrentColors();
    const topRowColors = colors.slice(0, 4); // First 4 colors
    const bottomRowColors = colors.slice(4, 7); // Last 3 colors
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Stap 2: Kies uw kleur</CardTitle>
          <p className="text-gray-600">Beschikbare kleuren voor {configuration.fabricType}</p>
        </CardHeader>
        <CardContent>
          {/* 2-row layout: 4 colors top, 3 colors bottom */}
          <div className="mb-6">
            {/* Top row - 4 colors */}
            <div className="grid grid-cols-4 gap-4 mb-4 justify-items-center">
              {topRowColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => {
                    setConfiguration({
                      ...configuration, 
                      selectedColor: color.id, 
                      colorName: color.name
                    });
                  }}
                  className={`relative group ${
                    configuration.selectedColor === color.id
                      ? "ring-4 ring-yellow-500 ring-offset-2"
                      : "hover:scale-105"
                  } transition-all duration-200`}
                  title="Gratis stalen beschikbaar"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-4 mx-auto"
                    style={{ 
                      backgroundColor: color.color,
                      borderColor: color.borderColor 
                    }}
                  ></div>
                  <p className="text-sm font-medium mt-2 text-gray-700">{color.name}</p>
                  {configuration.selectedColor === color.id && (
                    <CheckCircle className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 bg-white rounded-full" />
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                    Gratis stalen beschikbaar
                  </div>
                </button>
              ))}
            </div>
            
            {/* Bottom row - 3 colors (centered) */}
            <div className="flex justify-center gap-4">
              {bottomRowColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => {
                    setConfiguration({
                      ...configuration, 
                      selectedColor: color.id, 
                      colorName: color.name
                    });
                  }}
                  className={`relative group ${
                    configuration.selectedColor === color.id
                      ? "ring-4 ring-yellow-500 ring-offset-2"
                      : "hover:scale-105"
                  } transition-all duration-200`}
                  title="Gratis stalen beschikbaar"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-4 mx-auto"
                    style={{ 
                      backgroundColor: color.color,
                      borderColor: color.borderColor 
                    }}
                  ></div>
                  <p className="text-sm font-medium mt-2 text-gray-700">{color.name}</p>
                  {configuration.selectedColor === color.id && (
                    <CheckCircle className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 bg-white rounded-full" />
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                    Gratis stalen beschikbaar
                  </div>
                </button>
              ))}
            </div>
          </div>

          {configuration.selectedColor && (
            <div className="text-center">
              <Button onClick={nextStep} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Ga verder naar afmetingen <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Stap 3: Afmetingen</CardTitle>
        <p className="text-gray-600">Voer de exacte afmetingen van uw rolgordijn in</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="width" className="text-base font-medium">Breedte (cm)</Label>
            <Input
              id="width"
              type="number"
              min={40}
              max={300}
              value={configuration.width || 100}
              onChange={(e) => setConfiguration({...configuration, width: parseInt(e.target.value) || 100})}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">Min: 40cm, Max: 300cm</p>
          </div>
          
          <div>
            <Label htmlFor="height" className="text-base font-medium">Hoogte (cm)</Label>
            <Input
              id="height"
              type="number"
              min={50}
              max={350}
              value={configuration.height || 190}
              onChange={(e) => setConfiguration({...configuration, height: parseInt(e.target.value) || 190})}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">Min: 50cm, Max: 350cm</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium">
            Afmetingen: {configuration.width} × {configuration.height} cm
          </p>
          <p className="text-blue-600 text-sm">
            Geschatte prijs: €{calculatePrice().toFixed(2)}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={nextStep} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Ga verder naar opties <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Stap 4: Opties</CardTitle>
        <p className="text-gray-600">Kies uw profiel, onderlat en montage</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium">Profieltype</Label>
          <RadioGroup 
            value={configuration.profileType || ""} 
            onValueChange={(value) => setConfiguration({...configuration, profileType: value})}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="open" id="open" />
              <Label htmlFor="open">Open profiel (standaard)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cassette" id="cassette" />
              <Label htmlFor="cassette">Cassette (+€35)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base font-medium">Onderlat</Label>
          <Select value={configuration.bottomRail || ""} onValueChange={(value) => setConfiguration({...configuration, bottomRail: value})}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Selecteer onderlat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aluminum">Wit aluminium (standaard)</SelectItem>
              <SelectItem value="wooden">Houten onderlat (+€15)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium">Montage</Label>
          <RadioGroup 
            value={configuration.mounting || ""} 
            onValueChange={(value) => setConfiguration({...configuration, mounting: value})}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wall" id="wall" />
              <Label htmlFor="wall">Muur montage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ceiling" id="ceiling" />
              <Label htmlFor="ceiling">Plafond montage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recess" id="recess" />
              <Label htmlFor="recess">In de dag</Label>
            </div>
          </RadioGroup>
        </div>

        {configuration.profileType && configuration.bottomRail && configuration.mounting && (
          <div className="text-center">
            <Button onClick={nextStep} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Ga verder naar bediening <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Stap 5: Bediening</CardTitle>
        <p className="text-gray-600">Kies uw bediening en positie</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium">Type bediening</Label>
          <RadioGroup 
            value={configuration.operationType || ""} 
            onValueChange={(value) => setConfiguration({...configuration, operationType: value})}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="chain-plastic" id="chain-plastic" />
              <Label htmlFor="chain-plastic">Kunststof ketting</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="chain-metal" id="chain-metal" />
              <Label htmlFor="chain-metal">Metalen ketting (+€10)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="motorized" id="motorized" />
              <Label htmlFor="motorized">Gemotoriseerd (+€150)</Label>
            </div>
          </RadioGroup>
        </div>

        {configuration.operationType !== "motorized" && (
          <div>
            <Label className="text-base font-medium">Positie ketting</Label>
            <RadioGroup 
              value={configuration.operationSide || ""} 
              onValueChange={(value) => setConfiguration({...configuration, operationSide: value})}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id="left" />
                <Label htmlFor="left">Links</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id="right" />
                <Label htmlFor="right">Rechts</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {(configuration.operationType && (configuration.operationSide || configuration.operationType === "motorized")) && (
          <div className="text-center">
            <Button onClick={nextStep} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Ga verder naar samenvatting <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep6 = () => {
    const finalPrice = calculatePrice();
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Stap 6: Samenvatting</CardTitle>
          <p className="text-gray-600">Controleer uw configuratie</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Product Details</h3>
                <p><strong>Stofsoort:</strong> {fabricTypes.find(f => f.id === configuration.fabricType)?.name}</p>
                <p><strong>Kleur:</strong> {configuration.colorName}</p>
                <p><strong>Afmetingen:</strong> {configuration.width} × {configuration.height} cm</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Opties</h3>
                <p><strong>Profiel:</strong> {configuration.profileType === "cassette" ? "Cassette" : "Open profiel"}</p>
                <p><strong>Onderlat:</strong> {configuration.bottomRail === "wooden" ? "Houten onderlat" : "Wit aluminium"}</p>
                <p><strong>Montage:</strong> {configuration.mounting === "wall" ? "Muur" : configuration.mounting === "ceiling" ? "Plafond" : "In de dag"}</p>
                <p><strong>Bediening:</strong> {
                  configuration.operationType === "motorized" ? "Gemotoriseerd" :
                  configuration.operationType === "chain-metal" ? "Metalen ketting" : "Kunststof ketting"
                } {configuration.operationSide && `(${configuration.operationSide === "left" ? "Links" : "Rechts"})`}</p>
              </div>
            </div>

            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-yellow-800 mb-2">
                Totaalprijs: €{finalPrice.toFixed(2)}
              </h3>
              <p className="text-yellow-700">Inclusief BTW, exclusief montage</p>
            </div>

            <div className="text-center space-y-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                Offerte aanvragen
              </Button>
              <p className="text-sm text-gray-500">
                Of <button className="text-blue-600 hover:underline">vraag een offerte aan</button> voor maatwerk
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rolgordijnen op Maat
          </h1>
          <p className="text-gray-600">
            Samenstellen in 6 eenvoudige stappen
          </p>
        </div>

        {renderStepIndicator()}

        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>
      </div>
    </div>
  );
};

export default ModernRollerBlindConfigurator;