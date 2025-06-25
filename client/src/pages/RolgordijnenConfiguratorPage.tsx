import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Package,
  Ruler,
  Palette,
  Settings,
  ShoppingCart,
  Info,
} from "lucide-react";

interface Configuration {
  fabricType: string;
  color: string;
  opacity: string;
  width: number;
  height: number;
  quantity: number;
  mounting: string;
  chain: string;
}

interface ConfigStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const fabricTypes = [
  {
    id: "verduisterend",
    name: "Verduisterend",
    description: "Blokkeert 100% van het licht",
    price: 45,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=200&fit=crop",
  },
  {
    id: "semi-transparant",
    name: "Semi-transparant",
    description: "Laat diffuus licht door",
    price: 40,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
];

const colors = [
  { id: "wit", name: "Wit", hex: "#ffffff" },
  { id: "creme", name: "Crème", hex: "#f5f5dc" },
  { id: "beige", name: "Beige", hex: "#f5deb3" },
  { id: "grijs", name: "Grijs", hex: "#808080" },
  { id: "antraciet", name: "Antraciet", hex: "#2f4f4f" },
  { id: "zwart", name: "Zwart", hex: "#000000" },
];

const mountingOptions = [
  {
    id: "plafond",
    name: "Plafondmontage",
    description: "Bevestiging aan het plafond",
    price: 0,
  },
  {
    id: "wand",
    name: "Wandmontage",
    description: "Bevestiging aan de wand",
    price: 0,
  },
  {
    id: "raam",
    name: "In de sponning",
    description: "Bevestiging in de raamopening",
    price: 0,
  },
];

const chainOptions = [
  {
    id: "rechts",
    name: "Kettingbediening rechts",
    description: "Standaard positie",
    price: 0,
  },
  {
    id: "links",
    name: "Kettingbediening links",
    description: "Links gepositioneerd",
    price: 0,
  },
];

const RolgordijnenConfiguratorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const configuratorRef = useRef<HTMLDivElement>(null);
  const [configuration, setConfiguration] = useState<Configuration>({
    fabricType: "",
    color: "",
    opacity: "",
    width: 100,
    height: 150,
    quantity: 1,
    mounting: "",
    chain: "rechts",
  });

  const steps: ConfigStep[] = [
    {
      id: 1,
      title: "Kies stoftype",
      description: "Selecteer gewenste stoftype",
      completed: !!configuration.fabricType,
    },
    {
      id: 2,
      title: "Kies kleur",
      description: "Selecteer uw gewenste kleur",
      completed: !!configuration.color,
    },
    {
      id: 3,
      title: "Afmetingen",
      description: "Voer breedte en hoogte in",
      completed: configuration.width >= 50 && configuration.height >= 50,
    },
    {
      id: 4,
      title: "Montage & bediening",
      description: "Selecteer montage en bediening",
      completed: !!configuration.mounting,
    },
    {
      id: 5,
      title: "Bestelling afronden",
      description: "Toevoegen aan winkelwagen",
      completed: false,
    },
  ];

  const calculatePrice = () => {
    const fabricType = fabricTypes.find((f) => f.id === configuration.fabricType);
    if (!fabricType) return 0;

    const area = (configuration.width * configuration.height) / 10000; // Convert to m²
    const basePrice = fabricType.price;
    const totalPrice = basePrice * area * configuration.quantity;

    return Math.round(totalPrice * 100) / 100;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => {
        configuratorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setTimeout(() => {
        configuratorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const updateConfiguration = (key: keyof Configuration, value: any) => {
    setConfiguration((prev) => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Kies uw stoftype</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer het gewenste stoftype voor uw rolgordijn.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fabricTypes.map((fabric) => (
                <div
                  key={fabric.id}
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    configuration.fabricType === fabric.id
                      ? "border-[#d5c096] shadow-lg scale-105"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("fabricType", fabric.id)}
                >
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{fabric.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{fabric.description}</p>
                    <p className="text-lg font-bold text-[#d5c096]">
                      vanaf €{fabric.price}
                    </p>
                  </div>
                  {configuration.fabricType === fabric.id && (
                    <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Kies uw kleur</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer de kleur die het beste bij uw interieur past.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    configuration.color === color.id
                      ? "border-[#d5c096] shadow-lg"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("color", color.id)}
                >
                  <div
                    className="w-full h-16 rounded-lg mb-3 border"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="text-center font-medium">{color.name}</p>
                  {configuration.color === color.id && (
                    <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Afmetingen opgeven</h3>
            <p className="text-sm text-gray-600 mb-6">
              Voer de gewenste afmetingen in centimeters in.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="width">Breedte (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  min="50"
                  max="300"
                  value={configuration.width}
                  onChange={(e) =>
                    updateConfiguration("width", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum: 50cm, Maximum: 300cm</p>
              </div>
              <div>
                <Label htmlFor="height">Hoogte (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="50"
                  max="400"
                  value={configuration.height}
                  onChange={(e) =>
                    updateConfiguration("height", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum: 50cm, Maximum: 400cm</p>
              </div>
              <div>
                <Label htmlFor="quantity">Aantal</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={configuration.quantity}
                  onChange={(e) =>
                    updateConfiguration("quantity", parseInt(e.target.value) || 1)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Montage & bediening</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer het montage type en de kettingpositie.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Montage type</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mountingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        configuration.mounting === option.id
                          ? "border-[#d5c096] bg-[#d5c096]/5"
                          : "border-gray-200 hover:border-[#d5c096]/50"
                      }`}
                      onClick={() => updateConfiguration("mounting", option.id)}
                    >
                      <h5 className="font-semibold">{option.name}</h5>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Kettingbediening</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chainOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        configuration.chain === option.id
                          ? "border-[#d5c096] bg-[#d5c096]/5"
                          : "border-gray-200 hover:border-[#d5c096]/50"
                      }`}
                      onClick={() => updateConfiguration("chain", option.id)}
                    >
                      <h5 className="font-semibold">{option.name}</h5>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Bestelling afronden</h3>
            <p className="text-sm text-gray-600 mb-6">
              Controleer uw configuratie en voeg toe aan winkelwagen.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-4">Uw configuratie:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Stoftype:</span>
                  <span>{fabricTypes.find(f => f.id === configuration.fabricType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kleur:</span>
                  <span>{colors.find(c => c.id === configuration.color)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Afmetingen:</span>
                  <span>{configuration.width} × {configuration.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Aantal:</span>
                  <span>{configuration.quantity}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Montage:</span>
                  <span>{mountingOptions.find(m => m.id === configuration.mounting)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kettingpositie:</span>
                  <span>{chainOptions.find(c => c.id === configuration.chain)?.name}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white py-3"
              onClick={() => {
                // Add to cart logic here
                alert("Rolgordijn toegevoegd aan winkelwagen!");
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Toevoegen aan winkelwagen - €{calculatePrice().toFixed(2)}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Rolgordijnen Configurator - Op Maat | KANIOU</title>
        <meta
          name="description"
          content="Configureer je perfecte rolgordijn. Verduisterend, semi-transparant of transparant. Volledig op maat vanaf €59,95."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="pt-8 pb-12">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href="/producten"
                className="inline-flex items-center text-[#d5c096] hover:text-[#c4b183] mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar producten
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Rolgordijnen Configurator
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stel je perfecte rolgordijn samen. Verduisterend, stijlvol en volledig op maat.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center ${
                      index < steps.length - 1 ? "min-w-0" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold ${
                        currentStep === step.id
                          ? "bg-[#d5c096] text-white"
                          : step.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.completed ? <Check className="h-5 w-5" /> : step.id}
                    </div>
                    <div className="ml-3 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          currentStep === step.id
                            ? "text-[#d5c096]"
                            : step.completed
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-300 mx-4 flex-shrink-0" />
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
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Vorige
                      </Button>
                      
                      {currentStep < steps.length && (
                        <Button
                          onClick={nextStep}
                          disabled={!steps[currentStep - 1]?.completed}
                          className="bg-[#d5c096] hover:bg-[#c4b183] text-white flex items-center gap-2"
                        >
                          Volgende
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Panel */}
              <div className="space-y-6">
                <Card className="bg-white shadow-lg sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-[#d5c096]" />
                      Samenvatting
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {configuration.fabricType && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Stoftype</p>
                        <p className="text-lg font-semibold">
                          {fabricTypes.find(f => f.id === configuration.fabricType)?.name}
                        </p>
                      </div>
                    )}
                    
                    {configuration.color && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Kleur</p>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{
                              backgroundColor: colors.find(c => c.id === configuration.color)?.hex
                            }}
                          ></div>
                          <span className="font-semibold">
                            {colors.find(c => c.id === configuration.color)?.name}
                          </span>
                        </div>
                      </div>
                    )}

                    {(configuration.width >= 50 && configuration.height >= 50) && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Afmetingen</p>
                        <p className="text-lg font-semibold">
                          {configuration.width} × {configuration.height} cm
                        </p>
                        {configuration.quantity > 1 && (
                          <p className="text-sm text-gray-600">
                            Aantal: {configuration.quantity}x
                          </p>
                        )}
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <p className="text-lg font-bold text-[#d5c096]">
                        Totaal: €{calculatePrice().toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Inclusief BTW, exclusief verzendkosten
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Waarom kiezen voor KANIOU?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Op maat gemaakt</p>
                        <p className="text-sm text-gray-600">Exact volgens uw afmetingen</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Gratis montage-advies</p>
                        <p className="text-sm text-gray-600">Inclusief montage-instructies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">5 jaar garantie</p>
                        <p className="text-sm text-gray-600">Op alle mechanische onderdelen</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="mt-12">
              <Card className="bg-[#f8f8f8] border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="h-6 w-6 text-[#d5c096] mt-0.5 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Belangrijke productinformatie
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Onze rolgordijnen zijn standaard voorzien van:
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-[#d5c096] font-bold mt-1">•</span>
                          <span>Dichte cassette voor een strakke afwerking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#d5c096] font-bold mt-1">•</span>
                          <span>Aluminium onderlat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#d5c096] font-bold mt-1">•</span>
                          <span>Witte profielkleur (standaard)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#d5c096] font-bold mt-1">•</span>
                          <span>Kunststof eindloze ketting (lengte afhankelijk van hoogte: 75 cm, 100 cm, 125 cm of 150 cm)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#d5c096] font-bold mt-1">•</span>
                          <span>Klik-montagesteunen inbegrepen</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          
                          
                        </li>
                        <li className="flex items-start gap-2">
                          
                          
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RolgordijnenConfiguratorPage;