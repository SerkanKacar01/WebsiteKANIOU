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
  controlCategory: string; // "manual" or "motorized"
  controlType: string;
  controlColor: string;
  motorOptions: string; // "remote-only" or "remote-app"
  includeHub: boolean;
  mounting: string;
  bottomBar: string;
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
    description: "Blokkeert 100% van het licht voor volledige duisternis",
    detailedInfo: "Perfect voor slaapkamers en ruimtes waar totale duisternis gewenst is. Blokkeert alle lichtinval en biedt maximale privacy.",
    price: 45,
    maxHeight: 190,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=200&fit=crop",
    colors: ["wit", "creme", "beige", "grijs", "antraciet", "zwart"]
  },
  {
    id: "lichtdoorlatend",
    name: "Lichtdoorlatend", 
    description: "Laat diffuus licht door voor privacy en sfeer",
    detailedInfo: "Ideaal voor woonkamers en kantoren. Filtert het licht en biedt privacy zonder de ruimte volledig te verduisteren.",
    price: 40,
    maxHeight: 350,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    colors: ["wit", "creme", "beige", "grijs"]
  },
  {
    id: "screenstof",
    name: "Screenstof",
    description: "Biedt zicht naar buiten met UV-bescherming",
    detailedInfo: "Houdt de warmte buiten en beschermt tegen UV-straling terwijl u naar buiten kunt kijken. Perfect voor kantoren en woonkamers.",
    price: 50,
    maxHeight: 350,
    image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=300&h=200&fit=crop",
    colors: ["wit", "grijs", "antraciet", "zwart"]
  },
];

const colors = [
  { id: "white", name: "White", hex: "#ffffff" },
  { id: "creme", name: "Crème", hex: "#f5f5dc" },
  { id: "beige", name: "Beige", hex: "#f5deb3" },
  { id: "gray", name: "Gray", hex: "#808080" },
  { id: "taupe", name: "Taupe", hex: "#8b7355" },
  { id: "black", name: "Black", hex: "#000000" },
  { id: "brown", name: "Brown", hex: "#964b00" },
];

const profileOptions = [
  {
    id: "cassette",
    name: "Closed cassette",
    description: "(standard) – included at no extra cost",
    price: 0,
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

const bottomBarOptions = [
  {
    id: "standard",
    name: "White aluminium bar",
    description: "Standard – included at no extra cost",
    details: "The aluminium bar ensures your roller blind hangs straight and has a professional look. Always white and perfectly matched with our fabrics.",
    pricePercentage: 0,
    image: "https://images.unsplash.com/photo-1615529328677-ac9d21bee59f?w=200&h=150&fit=crop"
  },
  {
    id: "one-side",
    name: "White aluminium bar – one side covered",
    description: "One side of the bar is wrapped in matching fabric for a softer look, ideal for modern interiors. Adds 10% to the total price.",
    details: "",
    pricePercentage: 10,
    image: "https://images.unsplash.com/photo-1615529328677-ac9d21bee59f?w=200&h=150&fit=crop"
  },
  {
    id: "both-sides",
    name: "White aluminium bar – both sides covered",
    description: "The bar is wrapped in matching fabric on both front and back for a seamless and luxurious finish. Adds 15% to the total price.",
    details: "",
    pricePercentage: 15,
    image: "https://images.unsplash.com/photo-1615529328677-ac9d21bee59f?w=200&h=150&fit=crop"
  }
];

const manualControlOptions = [
  {
    id: "kunststof-ketting",
    name: "Kunststof ketting",
    description: "Standaard inbegrepen",
    detailedInfo: "Duurzame kunststof ketting voor handmatige bediening. Verkrijgbaar in verschillende kleuren.",
    price: 0,
    colors: ["wit", "zwart", "grijs"]
  },
  {
    id: "metalen-ketting",
    name: "Metalen ketting",
    description: "Duurzamere optie (+€12,50)",
    detailedInfo: "Roestvrije metalen ketting voor extra duurzaamheid en een premium uitstraling.",
    price: 12.50,
    colors: []
  }
];

const motorOptions = [
  {
    id: "remote-only",
    name: "Alleen afstandsbediening",
    description: "BREL BLE20 motor + afstandsbediening",
    detailedInfo: "Elektrische motor van BREL met draadloze afstandsbediening. Eenvoudige bediening op afstand.",
    price: 150,
    includesHub: false
  },
  {
    id: "remote-app",
    name: "Afstandsbediening + App-bediening",
    description: "BREL BLE20 motor + afstandsbediening + HUB-04",
    detailedInfo: "Complete smart oplossing: zowel afstandsbediening als app-bediening via BREL Matter App.",
    price: 200,
    includesHub: true
  }
];

const controlTypes = [
  {
    id: "kunststof-ketting",
    name: "Kunststof ketting",
    description: "Standaard bediening - eindeloze ketting",
    detailedInfo: "Duurzame kunststof ketting voor handmatige bediening. Verkrijgbaar in verschillende kleuren.",
    price: 0,
    colors: ["wit", "zwart", "grijs"]
  },
  {
    id: "metalen-ketting",
    name: "Metalen ketting",
    description: "Duurzamere optie (+€12,50)",
    detailedInfo: "Roestvrije metalen ketting voor extra duurzaamheid en een premium uitstraling.",
    price: 12.50,
    colors: []
  },
  {
    id: "gemotoriseerd-handzender",
    name: "Gemotoriseerd - Handzender",
    description: "BREL motor met handzender (+€150)",
    detailedInfo: "Elektrische motor van BREL met draadloze handzender. Eenvoudige bediening op afstand.",
    price: 150,
    colors: []
  },
  {
    id: "gemotoriseerd-app",
    name: "Gemotoriseerd - App",
    description: "BREL motor met app-bediening (+€180)",
    detailedInfo: "Smart motor van BREL bestuurd via smartphone app. Timers en automatisering mogelijk.",
    price: 180,
    colors: []
  },
  {
    id: "gemotoriseerd-beide",
    name: "Gemotoriseerd - Beide",
    description: "BREL motor met handzender én app (+€200)",
    detailedInfo: "Complete smart oplossing: zowel handzender als app-bediening. Maximale flexibiliteit.",
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
    profile: "cassette", // Pre-select closed cassette as default
    width: 40,
    height: 40,
    controlCategory: "manual", // Default to manual control
    controlType: "",
    controlColor: "",
    motorOptions: "remote-only", // Default motor option
    includeHub: false,
    mounting: "",
    bottomBar: "standard", // Default to standard white aluminium bar
    operationSide: "",
    quantity: 1,
  });

  const steps: ConfigStep[] = [
    {
      id: 1,
      title: "Stofsoort",
      description: "🧵 Stofsoort",
      completed: !!configuration.fabricType,
    },
    {
      id: 2,
      title: "Kleur",
      description: "🎨 Kleur", 
      completed: !!configuration.color,
    },
    {
      id: 3,
      title: "Afmetingen",
      description: "📏 Afmetingen",
      completed: configuration.width >= 40 && configuration.height >= 40,
    },
    {
      id: 4,
      title: "Bediening",
      description: "⚙️ Bediening",
      completed: !!configuration.controlCategory && (configuration.controlCategory === "motorized" ? !!configuration.motorOptions : !!configuration.controlType),
    },
    {
      id: 5,
      title: "Profiel",
      description: "🧩 Profiel",
      completed: true, // Always completed - cassette is pre-selected
    },
    {
      id: 6,
      title: "Montage",
      description: "🛠️ Montage",
      completed: !!configuration.mounting,
    },
    {
      id: 7,
      title: "Onderlat",
      description: "📐 Onderlat",
      completed: !!configuration.bottomBar,
    },

    {
      id: 8,
      title: "Bedieningszijde", 
      description: "↔️ Bedieningszijde",
      completed: !!configuration.operationSide,
    },
    {
      id: 9,
      title: "Overzicht & Bestellen",
      description: "🧾 Overzicht & Bestellen",
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
    if (configuration.controlCategory === "manual") {
      const manualControl = manualControlOptions.find(c => c.id === configuration.controlType);
      if (manualControl && manualControl.price > 0) {
        basePrice += manualControl.price;
      }
    } else if (configuration.controlCategory === "motorized") {
      const motorOption = motorOptions.find(m => m.id === configuration.motorOptions);
      if (motorOption && motorOption.price > 0) {
        basePrice += motorOption.price;
      }
    }

    // Add bottom bar percentage surcharge
    const bottomBar = bottomBarOptions.find(b => b.id === configuration.bottomBar);
    if (bottomBar && bottomBar.pricePercentage > 0) {
      basePrice = basePrice * (1 + bottomBar.pricePercentage / 100);
    }

    const totalPrice = basePrice * configuration.quantity;
    return Math.round(totalPrice * 100) / 100;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      let nextStepNumber = currentStep + 1;
      // Skip step 5 (profile selection) since cassette is pre-selected
      if (nextStepNumber === 5) {
        nextStepNumber = 6;
      }
      setCurrentStep(nextStepNumber);
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
      let prevStepNumber = currentStep - 1;
      // Skip step 5 (profile selection) when going backwards too
      if (prevStepNumber === 5) {
        prevStepNumber = 4;
      }
      setCurrentStep(prevStepNumber);
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
      case 1: // Fabric Type Selection
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Kies uw stofsoort</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer het gewenste stoftype voor uw rolgordijn. Elk type heeft specifieke eigenschappen en maximale afmetingen.
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
                    <div className="text-xs text-gray-500 mb-3 bg-gray-50 p-2 rounded">
                      {fabric.detailedInfo}
                    </div>
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
          </div>
        );

      case 2: // Color Selection
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Kies uw kleur</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer de gewenste kleur uit onze basiskleurencollectie. Gratis kleurstalen zijn beschikbaar.
            </p>
            
            {/* Top row - 4 colors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {colors.slice(0, 4).map((color) => (
                <div
                  key={color.id}
                  className={`group relative border-2 rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    configuration.color === color.id
                      ? "border-[#d5c096] shadow-lg ring-2 ring-[#d5c096]/30"
                      : "border-gray-200 hover:border-[#d5c096]/50 hover:shadow-md"
                  }`}
                  onClick={() => updateConfiguration("color", color.id)}
                  title="Gratis stalen beschikbaar"
                >
                  <div
                    className="w-full h-20 rounded-lg mb-2 border shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="text-center font-medium text-sm">{color.name}</p>
                  
                  {/* Selection indicator */}
                  {configuration.color === color.id && (
                    <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Gratis stalen beschikbaar
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom row - 3 colors */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {colors.slice(4, 7).map((color) => (
                <div
                  key={color.id}
                  className={`group relative border-2 rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    configuration.color === color.id
                      ? "border-[#d5c096] shadow-lg ring-2 ring-[#d5c096]/30"
                      : "border-gray-200 hover:border-[#d5c096]/50 hover:shadow-md"
                  }`}
                  onClick={() => updateConfiguration("color", color.id)}
                  title="Gratis stalen beschikbaar"
                >
                  <div
                    className="w-full h-20 rounded-lg mb-2 border shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="text-center font-medium text-sm">{color.name}</p>
                  
                  {/* Selection indicator */}
                  {configuration.color === color.id && (
                    <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Gratis stalen beschikbaar
                  </div>
                </div>
              ))}
            </div>
            
            {configuration.color && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Geselecteerde kleur: {colors.find(c => c.id === configuration.color)?.name}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Gratis kleurstalen kunnen worden aangevraagd voor deze kleur
                </p>
              </div>
            )}
          </div>
        );

      case 3: // Dimensions Input
        const selectedFabric = fabricTypes.find(f => f.id === configuration.fabricType);
        const maxHeight = selectedFabric ? selectedFabric.maxHeight : 400;
        
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Voer uw afmetingen in</h3>
            <p className="text-sm text-gray-600 mb-6">
              Voer de exacte breedte en hoogte van uw rolgordijn in centimeters in. Meet zorgvuldig op voor het beste resultaat.
            </p>
            
            {!configuration.fabricType ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Selecteer eerst een stoftype om de maximale afmetingen te zien.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Maximum hoogte voor <strong>{selectedFabric?.name}</strong>: {maxHeight}cm
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="width" className="text-base font-medium text-gray-700">
                      Breedte (cm)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      min={40}
                      max={300}
                      value={configuration.width}
                      onChange={(e) => updateConfiguration("width", parseInt(e.target.value) || 40)}
                      className="mt-2"
                      placeholder="40"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum: 40cm, Maximum: 300cm
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="height" className="text-base font-medium text-gray-700">
                      Hoogte (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      min={40}
                      max={maxHeight}
                      value={configuration.height}
                      onChange={(e) => updateConfiguration("height", parseInt(e.target.value) || 40)}
                      className="mt-2"
                      placeholder="40"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum: 40cm, Maximum: {maxHeight}cm
                    </p>
                  </div>
                </div>

                {isValidDimensions() && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-800">
                          Afmetingen: {configuration.width} × {configuration.height} cm
                        </p>
                        <p className="text-sm text-green-600">
                          Oppervlakte: {((configuration.width * configuration.height) / 10000).toFixed(2)} m²
                        </p>
                      </div>
                      <p className="text-lg font-bold text-green-700">
                        €{calculatePrice().toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );

      case 4: // Control Selection
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Bedieningstype</h3>
            <p className="text-sm text-gray-600 mb-6">
              Maak een keuze tussen handmatige bediening of elektrische bediening voor uw rolgordijn.
            </p>
            
            {/* Control Category Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                  configuration.controlCategory === "manual"
                    ? "border-[#d5c096] bg-[#d5c096]/5"
                    : "border-gray-200 hover:border-[#d5c096]/50"
                }`}
                onClick={() => {
                  updateConfiguration("controlCategory", "manual");
                  updateConfiguration("controlType", "");
                  updateConfiguration("motorOptions", "");
                  updateConfiguration("includeHub", false);
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🔗</div>
                  <h4 className="font-medium">Handmatige bediening</h4>
                  <p className="text-sm text-gray-500 mt-1">Bediening met ketting</p>
                </div>
              </button>
              
              <button
                className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                  configuration.controlCategory === "motorized"
                    ? "border-[#d5c096] bg-[#d5c096]/5"
                    : "border-gray-200 hover:border-[#d5c096]/50"
                }`}
                onClick={() => {
                  updateConfiguration("controlCategory", "motorized");
                  updateConfiguration("controlType", "");
                  updateConfiguration("motorOptions", "remote-only");
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-medium">Elektrische bediening</h4>
                  <p className="text-sm text-gray-500 mt-1">Gemotoriseerd (+€150)</p>
                </div>
              </button>
            </div>

            {/* Manual Control Options */}
            {configuration.controlCategory === "manual" && (
              <div className="space-y-4">
                <h4 className="font-medium">Kies uw kettingtype:</h4>
                {manualControlOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.controlType === option.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => updateConfiguration("controlType", option.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        configuration.controlType === option.id
                          ? "border-[#d5c096] bg-[#d5c096]"
                          : "border-gray-300"
                      }`}>
                        {configuration.controlType === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{option.name}</h5>
                          {option.price > 0 && (
                            <span className="text-sm font-medium text-[#d5c096]">
                              +€{option.price}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        
                        {/* Color options for plastic chain */}
                        {option.colors.length > 0 && configuration.controlType === option.id && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-2">Kies een kleur:</p>
                            <div className="flex gap-2">
                              {option.colors.map((color) => (
                                <button
                                  key={color}
                                  className={`px-3 py-1 text-xs border rounded ${
                                    configuration.controlColor === color
                                      ? "border-[#d5c096] bg-[#d5c096] text-white"
                                      : "border-gray-300 hover:border-[#d5c096]"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateConfiguration("controlColor", color);
                                  }}
                                >
                                  {color.charAt(0).toUpperCase() + color.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Motorized Control Options */}
            {configuration.controlCategory === "motorized" && (
              <div className="space-y-4">
                {/* Motor Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-xl">⚡</div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">BREL BLE20 Motor</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Ingebouwde batterij</li>
                        <li>• USB-C oplaadbaar</li>
                        <li>• Radio gestuurd</li>
                        <li>• Inclusief afstandsbediening</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium">Bedieningsopties:</h4>
                {motorOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.motorOptions === option.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("motorOptions", option.id);
                      updateConfiguration("includeHub", option.includesHub);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        configuration.motorOptions === option.id
                          ? "border-[#d5c096] bg-[#d5c096]"
                          : "border-gray-300"
                      }`}>
                        {configuration.motorOptions === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{option.name}</h5>
                          <span className="text-sm font-medium text-[#d5c096]">
                            +€{option.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        
                        {option.includesHub && (
                          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded">
                            <p className="text-sm text-orange-800">
                              <Info className="inline h-4 w-4 mr-1" />
                              BREL HUB-04 wordt automatisch toegevoegd voor app-bediening
                            </p>
                          </div>
                        )}
                        
{/* Detailed breakdown for Remote control only option - temporarily commented */}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Expanded Motor Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium mb-3">Technische specificaties:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <h6 className="font-medium text-gray-900 mb-1">🔌 BREL BLE20 Motor</h6>
                      <ul className="space-y-1">
                        <li>• Radio gestuurd (RF)</li>
                        <li>• Ingebouwde Li-ion batterij</li>
                        <li>• Stil en energiezuinig</li>
                        <li>• Vermogen: 0,5Nm / 8V / 2A</li>
                        <li>• Lengte motor: 450 mm</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-900 mb-1">🌐 BREL HUB-04</h6>
                      <ul className="space-y-1">
                        <li>• BREL Matter App compatible</li>
                        <li>• Android & iOS ondersteuning</li>
                        <li>• Compact ontwerp</li>
                        <li>• Vereist voor app-integratie</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Selection Summary */}
            {(configuration.controlCategory === "manual" && configuration.controlType) && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Geselecteerd: {manualControlOptions.find(c => c.id === configuration.controlType)?.name}
                  {configuration.controlColor && ` (${configuration.controlColor})`}
                </p>
              </div>
            )}

            {(configuration.controlCategory === "motorized" && configuration.motorOptions) && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Geselecteerd: {motorOptions.find(m => m.id === configuration.motorOptions)?.name}
                </p>
                {configuration.includeHub && (
                  <p className="text-xs text-green-600 mt-1">
                    HUB-04 inbegrepen voor app-bediening
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case 5: // Profile Selection        
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
                    <div className="text-xs text-gray-500 mb-2 bg-gray-50 p-2 rounded">
                      {profile.id === 'open' ? 
                        'Het open profiel is de standaard optie met zichtbare bevestigingspunten.' :
                        'De dichte cassette zorgt voor een strakke, moderne uitstraling zonder zichtbare bevestigingen.'
                      }
                    </div>
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

      case 6: // Mounting Type
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Montagewijze</h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecteer hoe u het rolgordijn wilt monteren. Dit beïnvloedt de manier van meten en installeren.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mountingOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                    configuration.mounting === option.id
                      ? "border-[#d5c096] bg-[#d5c096]/5"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("mounting", option.id)}
                >
                  <h5 className="font-semibold text-lg mb-2">{option.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                    {option.id === 'in-dag' ? 
                      'Het rolgordijn wordt in de raamopening gemonteerd. Meet de exacte binnenmaat van het kozijn.' :
                      'Het rolgordijn wordt op de muur of plafond gemonteerd. Het gordijn hangt voor het raam.'
                    }
                  </div>
                  {configuration.mounting === option.id && (
                    <div className="mt-3 flex items-center text-[#d5c096]">
                      <Check className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Geselecteerd</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 7: // Bottom Bar Selection
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Onderlat opties</h3>
            <p className="text-sm text-gray-600 mb-6">
              Kies het type onderlat voor uw rolgordijn. De standaard witte aluminium lat is inbegrepen, of kies voor een luxere afwerking met stoffering.
            </p>
            
            <div className="space-y-4">
              {bottomBarOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    configuration.bottomBar === option.id
                      ? "border-[#d5c096] bg-[#d5c096]/5"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("bottomBar", option.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio button indicator */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                      configuration.bottomBar === option.id
                        ? "border-[#d5c096] bg-[#d5c096]"
                        : "border-gray-300"
                    }`}>
                      {configuration.bottomBar === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{option.name}</h4>
                        {option.pricePercentage > 0 && (
                          <span className="text-sm font-medium text-[#d5c096]">
                            +{option.pricePercentage}%
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                      
                      {option.details && (
                        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                          {option.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {configuration.bottomBar && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Geselecteerde onderlat: {bottomBarOptions.find(b => b.id === configuration.bottomBar)?.name}
                </p>
                {configuration.bottomBar !== 'standard' && (
                  <p className="text-xs text-green-600 mt-1">
                    Prijs wordt aangepast met {bottomBarOptions.find(b => b.id === configuration.bottomBar)?.pricePercentage}%
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case 8: // Operation Side
        const controlType = controlTypes.find(c => c.id === configuration.controlType);
        const isMotorizedControl = controlType && controlType.id.includes('gemotoriseerd');
        
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Bedieningszijde</h3>
            <p className="text-sm text-gray-600 mb-6">
              Kies aan welke kant u de bediening wilt hebben. {isMotorizedControl ? 'Bij gemotoriseerde rolgordijnen bepaalt dit de positie van de schakelaar.' : 'Dit bepaalt aan welke kant de ketting hangt.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {operationSides.map((side) => (
                <div
                  key={side.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                    configuration.operationSide === side.id
                      ? "border-[#d5c096] bg-[#d5c096]/5"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => updateConfiguration("operationSide", side.id)}
                >
                  <h5 className="font-semibold text-lg mb-2">{side.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{side.description}</p>
                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                    {side.id === 'links' ? 
                      isMotorizedControl ? 'De schakelaar wordt links van het raam geplaatst.' : 'De ketting hangt aan de linkerkant van het rolgordijn.' :
                      isMotorizedControl ? 'De schakelaar wordt rechts van het raam geplaatst.' : 'De ketting hangt aan de rechterkant van het rolgordijn.'
                    }
                  </div>
                  {configuration.operationSide === side.id && (
                    <div className="mt-3 flex items-center text-[#d5c096]">
                      <Check className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Geselecteerd</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 9: // Summary
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Samenvatting</h3>
            <p className="text-sm text-gray-600 mb-6">
              Toon alle gemaakte keuzes, controleer de totaalprijs en voeg toe aan winkelwagen of vraag een offerte aan.
            </p>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Uw configuratie:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stofsoort:</span>
                    <span className="font-medium">{fabricTypes.find(f => f.id === configuration.fabricType)?.name}</span>
                  </div>
                  {configuration.color && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kleur:</span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: colors.find(c => c.id === configuration.color)?.hex }}
                        ></div>
                        <span className="font-medium">{colors.find(c => c.id === configuration.color)?.name}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profiel:</span>
                    <span className="font-medium">{profileOptions.find(p => p.id === configuration.profile)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Afmetingen:</span>
                    <span className="font-medium">{configuration.width} × {configuration.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Oppervlakte:</span>
                    <span className="font-medium">{((configuration.width * configuration.height) / 10000).toFixed(2)} m²</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montage:</span>
                    <span className="font-medium">{mountingOptions.find(m => m.id === configuration.mounting)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Onderlat:</span>
                    <span className="font-medium">Wit aluminium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bediening:</span>
                    <span className="font-medium">{controlTypes.find(c => c.id === configuration.controlType)?.name}</span>
                  </div>
                  {configuration.controlColor && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kettingkleur:</span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: colors.find(c => c.id === configuration.controlColor)?.hex }}
                        ></div>
                        <span className="font-medium">{colors.find(c => c.id === configuration.controlColor)?.name}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedieningszijde:</span>
                    <span className="font-medium">{operationSides.find(s => s.id === configuration.operationSide)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aantal:</span>
                    <span className="font-medium">{configuration.quantity}x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white border-2 border-[#d5c096] rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-lg mb-4 text-[#d5c096]">Prijsopbouw:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basisprijs ({((configuration.width * configuration.height) / 10000).toFixed(2)} m² × €{fabricTypes.find(f => f.id === configuration.fabricType)?.price || 0}/m²):</span>
                  <span>€{((fabricTypes.find(f => f.id === configuration.fabricType)?.price || 0) * ((configuration.width * configuration.height) / 10000)).toFixed(2)}</span>
                </div>
                
                {configuration.profile === 'cassette' && (
                  <div className="flex justify-between text-[#d5c096]">
                    <span>Dichte cassette (+15%):</span>
                    <span>+€{(((fabricTypes.find(f => f.id === configuration.fabricType)?.price || 0) * ((configuration.width * configuration.height) / 10000)) * 0.15).toFixed(2)}</span>
                  </div>
                )}
                
                {controlTypes.find(c => c.id === configuration.controlType)?.price && (controlTypes.find(c => c.id === configuration.controlType)?.price || 0) > 0 && (
                  <div className="flex justify-between text-[#d5c096]">
                    <span>{controlTypes.find(c => c.id === configuration.controlType)?.name}:</span>
                    <span>+€{(controlTypes.find(c => c.id === configuration.controlType)?.price || 0).toFixed(2)}</span>
                  </div>
                )}
                
                {configuration.quantity > 1 && (
                  <div className="flex justify-between">
                    <span>Aantal ({configuration.quantity}x):</span>
                    <span>×{configuration.quantity}</span>
                  </div>
                )}
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-[#d5c096]">
                    <span>Totaal (incl. BTW):</span>
                    <span>€{calculatePrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white py-4 text-lg font-semibold"
                onClick={() => {
                  // Add to cart logic here
                  alert("Rolgordijn toegevoegd aan winkelwagen!");
                }}
              >
                <ShoppingCart className="h-6 w-6 mr-2" />
                Toevoegen aan winkelwagen
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-2 border-[#d5c096] text-[#d5c096] hover:bg-[#d5c096] hover:text-white py-4 text-lg font-semibold"
                onClick={() => {
                  // Request quote logic here
                  alert("Offerte aangevraagd!");
                }}
              >
                Offerte aanvragen
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Verzendkosten worden berekend bij het afrekenen. Gratis verzending vanaf €75.
              </p>
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

            {/* Modern Progress Steps */}
            <div className="mb-8">
              {/* Desktop: Horizontal layout */}
              <div className="hidden md:block">
                <div className="flex items-start justify-between max-w-7xl mx-auto px-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center relative flex-1">
                      {/* Step circle */}
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 z-10 bg-white ${
                          currentStep === step.id
                            ? "border-[#d5c096] bg-[#d5c096] text-white shadow-lg scale-110"
                            : step.completed
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <span className="text-lg">{step.description.split(' ')[0]}</span>
                        )}
                      </div>
                      
                      {/* Step label */}
                      <div className="mt-3 text-center max-w-[80px]">
                        <p
                          className={`text-xs font-medium leading-tight ${
                            currentStep === step.id
                              ? "text-[#d5c096]"
                              : step.completed
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                      
                      {/* Connection line */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-6 left-1/2 w-full h-0.5 -translate-y-0.5">
                          <div 
                            className={`ml-6 mr-6 h-full ${
                              step.completed ? "bg-green-500" : "bg-gray-200"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile: Current step indicator */}
              <div className="md:hidden bg-[#d5c096] text-white p-4 rounded-lg mx-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{steps[currentStep - 1]?.description.split(' ')[0]}</span>
                    <div>
                      <p className="font-medium">Stap {currentStep} van {steps.length}</p>
                      <p className="text-sm opacity-90">{steps[currentStep - 1]?.title}</p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <span className="text-sm font-medium">{Math.round((currentStep / steps.length) * 100)}%</span>
                </div>
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
                        <p className="text-sm font-medium text-gray-700">Stofsoort</p>
                        <p className="text-lg font-semibold">
                          {fabricTypes.find(f => f.id === configuration.fabricType)?.name}
                        </p>
                      </div>
                    )}
                    
                    {configuration.profile && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Profiel</p>
                        <p className="text-lg font-semibold">
                          {profileOptions.find(p => p.id === configuration.profile)?.name}
                        </p>
                      </div>
                    )}

                    {(configuration.width >= 40 && configuration.height >= 40) && (
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

                    {configuration.mounting && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Montage</p>
                        <p className="text-lg font-semibold">
                          {mountingOptions.find(m => m.id === configuration.mounting)?.name}
                        </p>
                      </div>
                    )}

                    {configuration.controlType && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Bediening</p>
                        <p className="text-lg font-semibold">
                          {controlTypes.find(c => c.id === configuration.controlType)?.name}
                        </p>
                        {configuration.controlColor && (
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="w-4 h-4 rounded border"
                              style={{
                                backgroundColor: colors.find(c => c.id === configuration.controlColor)?.hex
                              }}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {colors.find(c => c.id === configuration.controlColor)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {configuration.operationSide && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Bedieningszijde</p>
                        <p className="text-lg font-semibold">
                          {operationSides.find(s => s.id === configuration.operationSide)?.name}
                        </p>
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