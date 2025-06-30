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
  profile: string;
  width: number;
  height: number;
  mounting: string;
  controlType: string;
  controlColor: string;
  operationSide: string;
  quantity: number;
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
    maxHeight: 190,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=200&fit=crop",
    colors: ["wit", "creme", "beige", "grijs", "antraciet", "zwart"]
  },
  {
    id: "lichtdoorlatend",
    name: "Lichtdoorlatend",
    description: "Laat diffuus licht door voor privacy en sfeer",
    price: 40,
    maxHeight: 350,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    colors: ["wit", "creme", "beige", "grijs"]
  },
  {
    id: "screenstof",
    name: "Screenstof",
    description: "Biedt zicht naar buiten met UV-bescherming",
    price: 50,
    maxHeight: 350,
    image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=300&h=200&fit=crop",
    colors: ["wit", "grijs", "antraciet", "zwart"]
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

const profileOptions = [
  {
    id: "open",
    name: "Open profiel",
    description: "Standaard - geen extra kosten",
    price: 0,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200&h=150&fit=crop"
  },
  {
    id: "cassette",
    name: "Dichte cassette",
    description: "Strakke afwerking (+15%)",
    price: 0.15, // 15% surcharge
    image: "https://images.unsplash.com/photo-1615529328677-ac9d21bee59f?w=200&h=150&fit=crop"
  }
];

const mountingOptions = [
  {
    id: "in-dag",
    name: "In de dag",
    description: "In het kozijn gemonteerd",
    price: 0,
  },
  {
    id: "op-dag",
    name: "Op de dag",
    description: "Op de muur/plafond gemonteerd",
    price: 0,
  }
];

const controlTypes = [
  {
    id: "kunststof-ketting",
    name: "Kunststof ketting",
    description: "Standaard bediening",
    price: 0,
    colors: ["wit", "zwart", "grijs"]
  },
  {
    id: "metalen-ketting",
    name: "Metalen ketting",
    description: "Duurzamere optie (+€12,50)",
    price: 12.50,
    colors: []
  },
  {
    id: "gemotoriseerd-handzender",
    name: "Gemotoriseerd - Handzender",
    description: "BREL motor met handzender",
    price: 150,
    colors: []
  },
  {
    id: "gemotoriseerd-app",
    name: "Gemotoriseerd - App",
    description: "BREL motor met app-bediening",
    price: 180,
    colors: []
  },
  {
    id: "gemotoriseerd-beide",
    name: "Gemotoriseerd - Beide",
    description: "BREL motor met handzender én app",
    price: 200,
    colors: []
  }
];

const operationSides = [
  {
    id: "links",
    name: "Links",
    description: "Bediening aan de linkerkant"
  },
  {
    id: "rechts", 
    name: "Rechts",
    description: "Bediening aan de rechterkant"
  }
];

const RolgordijnenConfiguratorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const configuratorRef = useRef<HTMLDivElement>(null);
  const [configuration, setConfiguration] = useState<Configuration>({
    fabricType: "",
    color: "",
    profile: "",
    width: 40,
    height: 40,
    mounting: "",
    controlType: "",
    controlColor: "",
    operationSide: "",
    quantity: 1,
  });

  const steps: ConfigStep[] = [
    {
      id: 1,
      title: "Kies uw stofsoort",
      description: "Selecteer het gewenste stoftype",
      completed: !!configuration.fabricType,
    },
    {
      id: 2,
      title: "Kies uw profiel",
      description: "Open profiel of dichte cassette",
      completed: !!configuration.profile,
    },
    {
      id: 3,
      title: "Voer uw afmetingen in",
      description: "Breedte en hoogte specificeren",
      completed: configuration.width >= 40 && configuration.height >= 40,
    },
    {
      id: 4,
      title: "Montagewijze",
      description: "In de dag of op de dag",
      completed: !!configuration.mounting,
    },
    {
      id: 5,
      title: "Bedieningstype",
      description: "Kies het bedieningstype",
      completed: !!configuration.controlType && (configuration.controlType.includes('gemotoriseerd') || !!configuration.controlColor),
    },
    {
      id: 6,
      title: "Bedieningszijde",
      description: "Links of rechts",
      completed: !!configuration.operationSide,
    },
    {
      id: 7,
      title: "Bestelling afronden",
      description: "Samenvatting en bestellen",
      completed: false,
    },
  ];

  const isValidDimensions = () => {
    if (!configuration.fabricType) return false;
    const fabricType = fabricTypes.find((f) => f.id === configuration.fabricType);
    if (!fabricType) return false;
    
    return configuration.width >= 40 && configuration.width <= 300 && 
           configuration.height >= 40 && configuration.height <= fabricType.maxHeight;
  };

  const getAvailableColors = () => {
    if (!configuration.fabricType) return [];
    const fabricType = fabricTypes.find((f) => f.id === configuration.fabricType);
    if (!fabricType) return [];
    
    return colors.filter(color => fabricType.colors.includes(color.id));
  };

  const calculatePrice = () => {
    const fabricType = fabricTypes.find((f) => f.id === configuration.fabricType);
    if (!fabricType) return 0;

    const area = (configuration.width * configuration.height) / 10000; // Convert to m²
    let basePrice = fabricType.price * area;

    // Add profile surcharge (15% for cassette)
    const profile = profileOptions.find(p => p.id === configuration.profile);
    if (profile && profile.price > 0) {
      basePrice = basePrice * (1 + profile.price);
    }

    // Add control type surcharge
    const controlType = controlTypes.find(c => c.id === configuration.controlType);
    if (controlType && controlType.price > 0) {
      basePrice += controlType.price;
    }

    const totalPrice = basePrice * configuration.quantity;
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
            <h3 className="text-lg font-semibold mb-4">Kies uw stofsoort</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer het gewenste stoftype voor uw rolgordijn. Na uw keuze ziet u alleen de beschikbare kleuren.
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
                  onClick={() => {
                    updateConfiguration("fabricType", fabric.id);
                    // Reset color if not available for new fabric type
                    if (configuration.color && !fabric.colors.includes(configuration.color)) {
                      updateConfiguration("color", "");
                    }
                  }}
                >
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{fabric.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{fabric.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-[#d5c096]">
                        €{fabric.price}/m²
                      </p>
                      <p className="text-xs text-gray-500">
                        max {fabric.maxHeight}cm hoog
                      </p>
                    </div>
                  </div>
                  {configuration.fabricType === fabric.id && (
                    <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {configuration.fabricType && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Beschikbare kleuren voor {fabricTypes.find(f => f.id === configuration.fabricType)?.name}:</h4>
                <div className="flex flex-wrap gap-2">
                  {getAvailableColors().map((color) => (
                    <div key={color.id} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className="text-sm text-blue-800">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Kies uw profiel</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer tussen een open profiel (standaard) of een dichte cassette voor een strakke afwerking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileOptions.map((profile) => (
                <div
                  key={profile.id}
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    configuration.profile === profile.id
                      ? "border-[#d5c096] shadow-lg scale-105"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("profile", profile.id)}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
                    {profile.price > 0 && (
                      <p className="text-sm font-medium text-[#d5c096]">
                        +{(profile.price * 100).toFixed(0)}% meerprijs
                      </p>
                    )}
                  </div>
                  {configuration.profile === profile.id && (
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
        const selectedFabric = fabricTypes.find(f => f.id === configuration.fabricType);
        const maxHeight = selectedFabric ? selectedFabric.maxHeight : 400;
        
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Voer uw afmetingen in</h3>
            <p className="text-sm text-gray-600 mb-6">
              Voer de gewenste afmetingen in centimeters in. Let op de maximale hoogte voor uw gekozen stoftype.
            </p>
            
            {selectedFabric && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>{selectedFabric.name}</strong> heeft een maximale hoogte van <strong>{selectedFabric.maxHeight}cm</strong>
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="width">Breedte (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  min="40"
                  max="300"
                  value={configuration.width}
                  onChange={(e) =>
                    updateConfiguration("width", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum: 40cm, Maximum: 300cm</p>
                {configuration.width > 0 && (configuration.width < 40 || configuration.width > 300) && (
                  <p className="text-xs text-red-500 mt-1">Breedte moet tussen 40cm en 300cm zijn</p>
                )}
              </div>
              <div>
                <Label htmlFor="height">Hoogte (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="40"
                  max={maxHeight}
                  value={configuration.height}
                  onChange={(e) =>
                    updateConfiguration("height", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum: 40cm, Maximum: {maxHeight}cm</p>
                {configuration.height > 0 && (configuration.height < 40 || configuration.height > maxHeight) && (
                  <p className="text-xs text-red-500 mt-1">Hoogte moet tussen 40cm en {maxHeight}cm zijn</p>
                )}
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
            <h3 className="text-lg font-semibold mb-4">Montagewijze</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer hoe u het rolgordijn wilt monteren.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {configuration.mounting === option.id && (
                    <div className="mt-2">
                      <Check className="h-5 w-5 text-[#d5c096]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        const selectedControlType = controlTypes.find(c => c.id === configuration.controlType);
        const showColorOptions = selectedControlType && selectedControlType.colors.length > 0;
        
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Bedieningstype</h3>
            <p className="text-sm text-gray-600 mb-6">
              Kies hoe u het rolgordijn wilt bedienen. Gemotoriseerd betekent dat ketting-opties wegvallen.
            </p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {controlTypes.map((control) => (
                  <div
                    key={control.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.controlType === control.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("controlType", control.id);
                      // Reset color if new control type doesn't have colors
                      if (control.colors.length === 0) {
                        updateConfiguration("controlColor", "");
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold">{control.name}</h5>
                        <p className="text-sm text-gray-600">{control.description}</p>
                      </div>
                      <div className="text-right">
                        {control.price > 0 && (
                          <p className="text-lg font-bold text-[#d5c096]">+€{control.price.toFixed(2)}</p>
                        )}
                        {configuration.controlType === control.id && (
                          <Check className="h-5 w-5 text-[#d5c096] mt-1" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {showColorOptions && (
                <div>
                  <h4 className="font-medium mb-3">Kies kettingkleur</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedControlType.colors.map((colorId) => {
                      const color = colors.find(c => c.id === colorId);
                      if (!color) return null;
                      
                      return (
                        <div
                          key={color.id}
                          className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-300 text-center ${
                            configuration.controlColor === color.id
                              ? "border-[#d5c096] bg-[#d5c096]/5"
                              : "border-gray-200 hover:border-[#d5c096]/50"
                          }`}
                          onClick={() => updateConfiguration("controlColor", color.id)}
                        >
                          <div
                            className="w-8 h-8 rounded-full mx-auto mb-2 border"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <p className="text-sm font-medium">{color.name}</p>
                          {configuration.controlColor === color.id && (
                            <Check className="h-4 w-4 text-[#d5c096] mx-auto mt-1" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Bedieningszijde</h3>
            <p className="text-sm text-gray-600 mb-6">
              Kies aan welke kant u de bediening wilt hebben.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operationSides.map((side) => (
                <div
                  key={side.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    configuration.operationSide === side.id
                      ? "border-[#d5c096] bg-[#d5c096]/5"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("operationSide", side.id)}
                >
                  <h5 className="font-semibold">{side.name}</h5>
                  <p className="text-sm text-gray-600">{side.description}</p>
                  {configuration.operationSide === side.id && (
                    <div className="mt-2">
                      <Check className="h-5 w-5 text-[#d5c096]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Samenvatting</h3>
            <p className="text-sm text-gray-600 mb-6">
              Controleer uw configuratie en voeg toe aan winkelwagen of vraag een offerte aan.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-4">Uw configuratie:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Stofsoort:</span>
                  <span>{fabricTypes.find(f => f.id === configuration.fabricType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profiel:</span>
                  <span>{profileOptions.find(p => p.id === configuration.profile)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Afmetingen:</span>
                  <span>{configuration.width} × {configuration.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Montage:</span>
                  <span>{mountingOptions.find(m => m.id === configuration.mounting)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bediening:</span>
                  <span>{controlTypes.find(c => c.id === configuration.controlType)?.name}</span>
                </div>
                {configuration.controlColor && (
                  <div className="flex justify-between">
                    <span>Kettingkleur:</span>
                    <span>{colors.find(c => c.id === configuration.controlColor)?.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Bedieningszijde:</span>
                  <span>{operationSides.find(s => s.id === configuration.operationSide)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aantal:</span>
                  <span>{configuration.quantity}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Onderlat:</span>
                  <span>Wit aluminium (inbegrepen)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white py-3"
                onClick={() => {
                  // Add to cart logic here
                  alert("Rolgordijn toegevoegd aan winkelwagen!");
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Toevoegen aan winkelmand - €{calculatePrice().toFixed(2)}
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-[#d5c096] text-[#d5c096] hover:bg-[#d5c096] hover:text-white py-3"
                onClick={() => {
                  // Request quote logic here
                  alert("Offerte aangevraagd!");
                }}
              >
                Offerte aanvragen
              </Button>
            </div>
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