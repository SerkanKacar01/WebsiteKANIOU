import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
  Info,
  Ruler,
  Package,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";

interface ConfigStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface SquidConfiguration {
  transparencyType: string;
  color: string;
  length: number;
  quantity: number;
  width: number; // Fixed at 137cm
}

const transparencyOptions = [
  {
    id: "transparent",
    name: "Transparant",
    description: "Laat meer licht door, minimale privacy",
    priceMultiplier: 1.0,
  },
  {
    id: "opaque",
    name: "Opaque",
    description: "Maximum privacy, beperkt licht",
    priceMultiplier: 1.2,
  },
];

const transparentColorOptions = [
  { id: "coal", name: "Coal", hex: "#36454F" },
  { id: "rock", name: "Rock", hex: "#696969" },
  { id: "oak", name: "Oak", hex: "#D2B48C" },
  { id: "ash", name: "Ash", hex: "#B2BEB5" },
  { id: "bone", name: "Bone", hex: "#F9F6EE" },
  { id: "chalk", name: "Chalk", hex: "#F5F5F0" },
];

const opaqueColorOptions = [
  { id: "caviar", name: "Caviar", hex: "#1C1C1C" },
  { id: "iron", name: "Iron", hex: "#4A4A4A" },
  { id: "sand", name: "Sand", hex: "#C2B280" },
  { id: "mist", name: "Mist", hex: "#D3D3D3" },
  { id: "cream", name: "Cream", hex: "#FDF6E3" },
  { id: "snow", name: "Snow", hex: "#FFFAFA" },
];

const SquidConfiguratorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const configuratorRef = useRef<HTMLDivElement>(null);
  
  const [configuration, setConfiguration] = useState<SquidConfiguration>({
    transparencyType: "",
    color: "",
    length: 1,
    quantity: 1,
    width: 137, // Fixed width
  });

  const BASE_PRICE_PER_METER = 73; // Base price per running meter

  const steps: ConfigStep[] = [
    {
      id: 1,
      title: "Kies transparantie",
      description: "Selecteer gewenste transparantie",
      completed: !!configuration.transparencyType,
    },
    {
      id: 2,
      title: "Kies kleur",
      description: "Selecteer uw gewenste kleur",
      completed: !!configuration.color,
    },
    {
      id: 3,
      title: "Bepaal lengte",
      description: "Strekkende meters (breedte: 137cm)",
      completed: configuration.length > 0,
    },
    {
      id: 4,
      title: "Aantal rollen",
      description: "Hoeveel rollen wilt u bestellen",
      completed: configuration.quantity > 0,
    },
    {
      id: 5,
      title: "Bestelling afronden",
      description: "Toevoegen aan winkelwagen",
      completed: false,
    },
  ];

  const getAvailableColors = () => {
    if (configuration.transparencyType === "transparent") {
      return transparentColorOptions;
    } else if (configuration.transparencyType === "opaque") {
      return opaqueColorOptions;
    }
    return [];
  };

  const calculatePrice = () => {
    const transparencyOption = transparencyOptions.find(t => t.id === configuration.transparencyType);
    const transparencyMultiplier = transparencyOption?.priceMultiplier || 1.0;
    
    const basePrice = BASE_PRICE_PER_METER * configuration.length;
    const adjustedPrice = basePrice * transparencyMultiplier;
    
    return adjustedPrice * configuration.quantity;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      configuratorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      configuratorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAddToCart = async () => {
    setIsProcessingPayment(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally add to cart and redirect to checkout
    alert(`SQUID textielfolie toegevoegd aan winkelwagen!\n\nDetails:\n- Type: ${configuration.transparencyType}\n- Kleur: ${configuration.color}\n- Lengte: ${configuration.length}m\n- Aantal: ${configuration.quantity}\n- Totaalprijs: €${calculatePrice().toFixed(2)}`);
    
    setIsProcessingPayment(false);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return !!configuration.transparencyType;
      case 2:
        return !!configuration.color;
      case 3:
        return configuration.length > 0;
      case 4:
        return configuration.quantity > 0;
      default:
        return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>SQUID Textielfolie Configurator | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Configureer uw SQUID textielfolie op maat. Kies transparantie, kleur en afmetingen voor de perfecte raamfolie."
        />
      </Helmet>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                SQUID Textielfolie Configurator
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Configureer uw SQUID textielfolie op maat voor de perfecte pasvorm en privacy
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep === step.id
                            ? "border-[#d5c096] bg-[#d5c096] text-white"
                            : step.completed
                            ? "border-green-500 bg-green-500 text-white"
                            : currentStep > step.id
                            ? "border-[#d5c096] bg-[#d5c096] text-white"
                            : "border-gray-300 bg-white text-gray-500"
                        }`}
                      >
                        {step.completed || currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-xs font-medium text-gray-900 hidden sm:block">
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 hidden md:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-16 h-0.5 bg-gray-300 mx-4 hidden sm:block"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div ref={configuratorRef} className="grid lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="lg:col-span-2">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-[#d5c096]" />
                      Stap {currentStep}: {steps[currentStep - 1]?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentStep === 1 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Kies transparantie type</h3>
                        <RadioGroup
                          value={configuration.transparencyType}
                          onValueChange={(value) =>
                            setConfiguration({ ...configuration, transparencyType: value })
                          }
                        >
                          {transparencyOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                              <RadioGroupItem value={option.id} id={option.id} />
                              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                <div>
                                  <p className="font-medium">{option.name}</p>
                                  <p className="text-sm text-gray-500">{option.description}</p>
                                  <p className="text-sm text-[#d5c096] font-medium">
                                    {option.priceMultiplier === 1.0 ? "Standaardprijs" : `+${((option.priceMultiplier - 1) * 100).toFixed(0)}%`}
                                  </p>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Kies kleur</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Beschikbare kleuren voor {configuration.transparencyType === "transparent" ? "Transparant" : "Opaque"}:
                        </p>
                        <RadioGroup
                          value={configuration.color}
                          onValueChange={(value) =>
                            setConfiguration({ ...configuration, color: value })
                          }
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {getAvailableColors().map((color) => (
                              <div key={color.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem value={color.id} id={color.id} />
                                <Label htmlFor={color.id} className="flex-1 cursor-pointer">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                                      style={{ backgroundColor: color.hex }}
                                    ></div>
                                    <div>
                                      <p className="font-medium">{color.name}</p>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Bepaal lengte</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="length" className="text-sm font-medium">
                              Lengte in strekkende meters
                            </Label>
                            <div className="mt-2">
                              <Input
                                id="length"
                                type="number"
                                min="1"
                                max="50"
                                value={configuration.length}
                                onChange={(e) =>
                                  setConfiguration({
                                    ...configuration,
                                    length: Math.max(1, parseInt(e.target.value) || 1),
                                  })
                                }
                                className="text-lg font-medium"
                              />
                            </div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Ruler className="h-4 w-4 text-blue-600" />
                              <p className="text-sm font-medium text-blue-900">Productspecificaties</p>
                            </div>
                            <p className="text-sm text-blue-700">
                              • Standaard breedte: 137 cm (vast)<br />
                              • Lengte: {configuration.length} meter(s)<br />
                              • Totale oppervlakte: {(configuration.length * 1.37).toFixed(2)} m²
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Aantal rollen</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="quantity" className="text-sm font-medium">
                              Hoeveel rollen wilt u bestellen?
                            </Label>
                            <div className="mt-2">
                              <Input
                                id="quantity"
                                type="number"
                                min="1"
                                max="10"
                                value={configuration.quantity}
                                onChange={(e) =>
                                  setConfiguration({
                                    ...configuration,
                                    quantity: Math.max(1, parseInt(e.target.value) || 1),
                                  })
                                }
                                className="text-lg font-medium"
                              />
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="h-4 w-4 text-yellow-600" />
                              <p className="text-sm font-medium text-yellow-900">Levertijd</p>
                            </div>
                            <p className="text-sm text-yellow-700">
                              Standaard levertijd: 14 werkdagen<br />
                              Voor grotere bestellingen: mogelijk iets langer
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Bestelling afronden</h3>
                        <div className="space-y-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Uw configuratie:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Transparantie:</span>
                                <span className="font-medium">
                                  {transparencyOptions.find(t => t.id === configuration.transparencyType)?.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Kleur:</span>
                                <span className="font-medium">
                                  {getAvailableColors().find(c => c.id === configuration.color)?.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Afmetingen:</span>
                                <span className="font-medium">{configuration.length}m × 137cm</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Aantal rollen:</span>
                                <span className="font-medium">{configuration.quantity}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={handleAddToCart}
                            disabled={isProcessingPayment}
                            className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white py-3 text-lg font-semibold"
                          >
                            {isProcessingPayment ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                Toevoegen aan winkelwagen...
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Toevoegen aan winkelwagen - €{calculatePrice().toFixed(2)}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <Separator />
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Vorige
                      </Button>

                      {currentStep < 5 ? (
                        <Button
                          onClick={nextStep}
                          disabled={!canProceedToNext()}
                          className="bg-[#d5c096] hover:bg-[#c4b183] text-white flex items-center gap-2"
                        >
                          Volgende
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Link href="/producten">
                          <Button variant="outline" className="flex items-center gap-2">
                            Verder winkelen
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Price Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[#d5c096]" />
                        Prijsoverzicht
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Basisprijs per meter:</span>
                          <span>€{BASE_PRICE_PER_METER}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Lengte:</span>
                          <span>{configuration.length}m</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Aantal rollen:</span>
                          <span>{configuration.quantity}</span>
                        </div>
                        {configuration.transparencyType && (
                          <div className="flex justify-between text-sm">
                            <span>Transparantie toeslag:</span>
                            <span>
                              {transparencyOptions.find(t => t.id === configuration.transparencyType)?.priceMultiplier === 1.0 
                                ? "€0" 
                                : `+${((transparencyOptions.find(t => t.id === configuration.transparencyType)?.priceMultiplier || 1) - 1) * 100}%`}
                            </span>
                          </div>
                        )}
                        {configuration.color && (
                          <div className="flex justify-between text-sm">
                            <span>Kleur:</span>
                            <span>
                              {getAvailableColors().find(c => c.id === configuration.color)?.name || "Niet geselecteerd"}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Totaalprijs:</span>
                        <span className="text-[#d5c096]">€{calculatePrice().toFixed(2)}</span>
                      </div>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>• Prijzen zijn inclusief BTW</p>
                        <p>• Gratis verzending vanaf €100</p>
                        <p>• 14 werkdagen levertijd</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SquidConfiguratorPage;