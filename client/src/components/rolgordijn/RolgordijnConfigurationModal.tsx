import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, ShoppingCart, X } from "lucide-react";

interface RolgordijnConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (configuration: RolgordijnConfiguration) => void;
}

export interface RolgordijnConfiguration {
  color: string;
  width: number;
  height: number;
  systemType: string;
  bottomBarType: string;
  operationSide: string;
  chainType: string;
  mountingType: string;
  sideGuiding: boolean;
  totalPrice: number;
}

const colors = [
  { name: "Wit", value: "white", color: "#FFFFFF", border: "#E5E5E5" },
  { name: "Creme", value: "cream", color: "#F5F5DC" },
  { name: "Beige", value: "beige", color: "#F5F5DC" },
  { name: "Grijs", value: "gray", color: "#808080" },
  { name: "Antraciet", value: "anthracite", color: "#36454F" },
  { name: "Zwart", value: "black", color: "#000000" },
  { name: "Blauw", value: "blue", color: "#4A90E2" },
  { name: "Groen", value: "green", color: "#7ED321" },
];

const systemTypes = [
  { name: "Montage steunen", value: "mounting-brackets", description: "Standaard", priceMultiplier: 1 },
  { name: "Open profiel", value: "open-profile", description: "+15%", priceMultiplier: 1.15 },
  { name: "Cassette", value: "cassette", description: "+20%", priceMultiplier: 1.20 },
];

const bottomBarTypes = [
  { name: "Aluminium", value: "aluminium", description: "Standaard", priceMultiplier: 1 },
  { name: "Onderlat – één zijde bedekt", value: "bottom-bar-one-side", description: "+10%", priceMultiplier: 1.10 },
  { name: "Onderlat – beide zijden bedekt", value: "bottom-bar-both-sides", description: "+15%", priceMultiplier: 1.15 },
];

const chainTypes = [
  { name: "Kunststof ketting (wit)", value: "plastic-white", description: "Standaard", price: 0 },
  { name: "Metalen ketting", value: "metal", description: "+€10", price: 10 },
];

export const RolgordijnConfigurationModal = ({ isOpen, onClose, onComplete }: RolgordijnConfigurationModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [configuration, setConfiguration] = useState<Partial<RolgordijnConfiguration>>({});

  const steps = [
    "Afmetingen",
    "Systeemtype", 
    "Onderlat type",
    "Bedieningszijde",
    "Kettingtype",
    "Montage keuze",
    "Zijgeleiding"
  ];

  const calculatePrice = (config: Partial<RolgordijnConfiguration>) => {
    const basePrice = 89.95;
    const area = (config.width || 100) * (config.height || 150) / 10000; // m²
    
    let price = basePrice * area;
    
    // Apply multipliers
    const systemType = systemTypes.find(s => s.value === config.systemType);
    if (systemType) price *= systemType.priceMultiplier;
    
    const bottomBarType = bottomBarTypes.find(b => b.value === config.bottomBarType);
    if (bottomBarType) price *= bottomBarType.priceMultiplier;
    
    // Add chain price
    const chainType = chainTypes.find(c => c.value === config.chainType);
    if (chainType) price += chainType.price;
    
    // Add side guiding
    if (config.sideGuiding) price += 35;
    
    return Math.round(price * 100) / 100;
  };

  const updateConfiguration = (updates: Partial<RolgordijnConfiguration>) => {
    const newConfig = { ...configuration, ...updates };
    setConfiguration(newConfig);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 0: return configuration.width && configuration.height;
      case 1: return configuration.systemType;
      case 2: return configuration.bottomBarType;
      case 3: return configuration.operationSide;
      case 4: return configuration.chainType;
      case 5: return configuration.mountingType;
      case 6: return configuration.sideGuiding !== undefined;
      default: return true;
    }
  };

  const handleComplete = () => {
    const finalConfig = {
      ...configuration,
      totalPrice: calculatePrice(configuration)
    } as RolgordijnConfiguration;
    onComplete(finalConfig);
    onClose();
  };

  const renderColorSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Kies uw kleur</h3>
        <p className="text-gray-600">Selecteer de kleur die het beste bij uw interieur past</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => updateConfiguration({ color: color.value })}
            className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
              configuration.color === color.value 
                ? 'border-primary shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div 
              className="w-full h-12 rounded-md mb-2"
              style={{ 
                backgroundColor: color.color,
                border: color.border ? `1px solid ${color.border}` : undefined
              }}
            />
            <p className="text-sm font-medium">{color.name}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Dimensions
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Afmetingen</h3>
              <p className="text-gray-600">Vul exacte maten in. Wij doen de rest.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Breedte (cm)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={configuration.width || ''}
                  onChange={(e) => updateConfiguration({ width: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hoogte (cm)</label>
                <input
                  type="number"
                  placeholder="150"
                  value={configuration.height || ''}
                  onChange={(e) => updateConfiguration({ height: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 1: // System Type
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Systeemtype</h3>
              <p className="text-gray-600">Kies het type profiel dat het beste bij uw wensen past</p>
            </div>
            <div className="space-y-4">
              {systemTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    configuration.systemType === type.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => updateConfiguration({ systemType: type.value })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{type.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                      <Badge variant={type.value === 'mounting-brackets' ? 'default' : 'secondary'}>
                        {type.description}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2: // Bottom Bar Type
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Onderlat type</h3>
              <p className="text-gray-600">Selecteer de gewenste onderlat afwerking</p>
            </div>
            <div className="space-y-4">
              {bottomBarTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    configuration.bottomBarType === type.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => updateConfiguration({ bottomBarType: type.value })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{type.name}</h4>
                      </div>
                      <Badge variant={type.value === 'aluminium' ? 'default' : 'secondary'}>
                        {type.description}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3: // Operation Side
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Bedieningszijde</h3>
              <p className="text-gray-600">Aan welke kant wilt u de bediening?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Links', 'Rechts'].map((side) => (
                <Card 
                  key={side}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    configuration.operationSide === side.toLowerCase() ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => updateConfiguration({ operationSide: side.toLowerCase() })}
                >
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold text-lg">{side}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4: // Chain Type
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Kettingtype</h3>
              <p className="text-gray-600">Kies het type bediening</p>
            </div>
            <div className="space-y-4">
              {chainTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    configuration.chainType === type.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => updateConfiguration({ chainType: type.value })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{type.name}</h4>
                      </div>
                      <Badge variant={type.value === 'plastic-white' ? 'default' : 'secondary'}>
                        {type.description}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5: // Mounting Type
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Montage keuze</h3>
              <p className="text-gray-600">Hoe wilt u het rolgordijn monteren?</p>
            </div>
            <div className="space-y-4">
              {['In-de-dag', 'Op-de-dag'].map((mount) => (
                <Card 
                  key={mount}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    configuration.mountingType === mount.toLowerCase() ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => updateConfiguration({ mountingType: mount.toLowerCase() })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{mount}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {mount === 'In-de-dag' 
                            ? 'Geïnstalleerd in het raamkozijn voor een strakke uitstraling'
                            : 'Gemonteerd op de muur of tegen het plafond voor volledige raamafdekking'
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6: // Side Guiding
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Zijgeleiding (optioneel)</h3>
              <p className="text-gray-600">Wilt u zijgeleiding voor extra stabiliteit?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  configuration.sideGuiding === true ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => updateConfiguration({ sideGuiding: true })}
              >
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-lg mb-2">Ja</h4>
                  <Badge variant="secondary">+€35</Badge>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  configuration.sideGuiding === false ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => updateConfiguration({ sideGuiding: false })}
              >
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-lg">Nee</h4>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Stel je rolgordijn samen</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Color Selection - Always visible at top */}
        {configuration.color && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: colors.find(c => c.value === configuration.color)?.color }}
              />
              <span className="font-medium">
                Kleur: {colors.find(c => c.value === configuration.color)?.name}
              </span>
            </div>
          </div>
        )}

        {!configuration.color ? renderColorSelection() : (
          <>
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Stap {currentStep + 1} van {steps.length}</span>
                <span className="text-sm text-gray-500">{steps[currentStep]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <div className="min-h-[400px]">
              {renderStep()}
            </div>

            {/* Price display */}
            {configuration.width && configuration.height && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Geschatte prijs:</span>
                  <span className="text-xl font-bold text-primary">€{calculatePrice(configuration)}</span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Vorige
              </Button>

              <div className="flex gap-3">
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedFromStep(currentStep)}
                    className="flex items-center gap-2"
                  >
                    Volgende
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    disabled={!canProceedFromStep(currentStep)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Toevoegen aan winkelwagen
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RolgordijnConfigurationModal;