import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import modelAImage from "@assets/Scherm­afbeelding 2025-06-18 om 19.48.41_1750271431612.png";
import modelB1Image from "@assets/Scherm­afbeelding 2025-06-18 om 19.47.58_1750271431612.png";
import modelB2Image from "@assets/Scherm­afbeelding 2025-06-18 om 19.48.24_1750271431612.png";
import modelCImage from "@assets/Scherm­afbeelding 2025-06-18 om 19.49.44_1750271431611.png";
import modelDImage from "@assets/Scherm­afbeelding 2025-06-18 om 19.47.38_1750271431612.png";
import modelEImage from "@assets/Scherm­afbeelding 2025-06-18 om 19.50.05_1750271431612.png";
import ksRailTechnicalImage from "@assets/Scherm­afbeelding 2025-06-18 om 00.26.52_1750370453923.png";
import ksRailPhotoImage from "@assets/Scherm­afbeelding 2025-06-18 om 00.25.39_1750370453924.png";
import ksRailTechnicalImageBlack from "@assets/Scherm­afbeelding 2025-06-18 om 00.26.52_1750371691301.png";
import ksRailBlackPhotoImage from "@assets/Scherm­afbeelding 2025-06-18 om 23.18.07_1750371691300.png";
import dsRailTechnicalImage from "@assets/Scherm­afbeelding 2025-06-18 om 00.27.20_1750370855704.png";
import dsRailPhotoImage from "@assets/Scherm­afbeelding 2025-06-18 om 00.26.08_1750370855704.png";
import dsRailTechnicalImageBlack from "@assets/Scherm­afbeelding 2025-06-18 om 00.27.20_1750371210898.png";
import dsRailBlackPhotoImage from "@assets/Scherm­afbeelding 2025-06-18 om 23.19.08_1750371210898.png";
import { Link } from "wouter";
import { 
  Ruler, 
  Wrench, 
  ArrowLeft, 
  Settings, 
  RotateCcw, 
  Package, 
  CreditCard, 
  FileText,
  Clock,
  CheckCircle 
} from "lucide-react";

interface ConfigStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface CurveModel {
  id: string;
  name: string;
  segments: string[];
  price: number;
}

interface CeilingComponent {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface WallComponent {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface GliderOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  hasColorOptions?: boolean;
  selectedColor?: string;
  quantity: number;
}

interface Configuration {
  profileType: string;
  color: string;
  length: number;
  customLength?: number;
  quantity: number;
  extraRails: number;
  corners: string;
  curveModel?: CurveModel;
  curveMeasurements?: { [key: string]: number };
  mounting: string;
  ceilingComponents: CeilingComponent[];
  wallComponents: WallComponent[];
  selectedGlider?: GliderOption;
  accessories: string[];
  gliderChoiceMade: boolean;
}

const curveModels: CurveModel[] = [
  {
    id: "model-a",
    name: "Model A",
    segments: ["A", "B"],
    price: 3.5,
  },
  {
    id: "model-b1",
    name: "Model B1",
    segments: ["A", "B", "C"],
    price: 7.0,
  },
  {
    id: "model-b2",
    name: "Model B2",
    segments: ["A", "B"],
    price: 3.5,
  },
  {
    id: "model-c",
    name: "Model C",
    segments: ["A", "B", "C", "D"],
    price: 10.5,
  },
  {
    id: "model-d",
    name: "Model D",
    segments: ["A", "B", "C"],
    price: 7.0,
  },
  {
    id: "model-e",
    name: "Model E",
    segments: ["A", "B", "C", "D", "E"],
    price: 14.0,
  },
];

const GordijnrailsConfiguratorPage = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "step-1",
  ]); // Start with step 1 expanded
  const [showAllSections, setShowAllSections] = useState(false);
  const [showSpecificationModal, setShowSpecificationModal] = useState(false);
  const [gliderAdded, setGliderAdded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showRailLimitWarning, setShowRailLimitWarning] = useState(false);
  const configuratorRef = useRef<HTMLDivElement>(null);
  // Initial empty configuration - completely reset on each page load
  const getInitialConfiguration = (): Configuration => ({
    profileType: "",
    color: "",
    length: 0, // Start with 0 instead of 100
    quantity: 0, // Start with 0 instead of 1
    extraRails: 0,
    corners: "", // Start empty instead of "none"
    mounting: "",
    ceilingComponents: [],
    wallComponents: [],
    selectedGlider: undefined,
    accessories: [],
    gliderChoiceMade: false, // Track if user has actively made a glider choice
  });

  const [configuration, setConfiguration] = useState<Configuration>(getInitialConfiguration());

  const steps: ConfigStep[] = [
    {
      id: 1,
      title: "Kies profieltype",
      description: "Selecteer KS of DS rail",
      completed: !!configuration.profileType,
    },
    {
      id: 2,
      title: "Kies lengte",
      description: "Op maat gezaagd",
      completed: configuration.length > 0,
    },
    {
      id: 3,
      title: "Kies aantal",
      description: "Aantal railstukken",
      completed: configuration.quantity > 0,
    },
    {
      id: 4,
      title: "Kies bochten",
      description: "Optioneel",
      completed: !!configuration.corners && (
        configuration.corners === "none" ||
        configuration.corners === "eigen-model" ||
        (configuration.corners === "custom" &&
          !!configuration.curveModel &&
          !!configuration.curveMeasurements &&
          configuration.curveModel.segments.every(
            (segment) =>
              !!configuration.curveMeasurements![segment] &&
              configuration.curveMeasurements![segment] > 0,
          ))
      ),
    },
    {
      id: 5,
      title: "Kies montage",
      description: "Montagemateriaal",
      completed: !!configuration.mounting,
    },
    {
      id: 6,
      title: "Kies accessoires",
      description: "Bediening & extra's",
      completed: configuration.gliderChoiceMade || configuration.accessories.length > 0,
    },
  ];

  // Pricing calculations
  const calculatePrice = () => {
    const effectiveLength = configuration.customLength || configuration.length;

    // Use exact length for pricing calculations - no rounding
    const pricingLength = effectiveLength;

    // Don't calculate price if essential selections are missing
    if (!configuration.profileType || !configuration.color || !configuration.length || !configuration.quantity) {
      return {
        base: 0,
        extras: 0,
        total: 0,
      };
    }

    // Different prices for different rail types and colors
    let pricePerMeter = 0.0; // Default price

    if (configuration.profileType === "KS") {
      if (configuration.color === "white") {
        pricePerMeter = 11.0; // KS Rail - Wit
      } else if (configuration.color === "black") {
        pricePerMeter = 11.0; // KS Rail - Zwart
      }
    } else if (configuration.profileType === "DS") {
      if (configuration.color === "white") {
        pricePerMeter = 12.5; // DS Rail - Wit
      } else if (configuration.color === "black") {
        pricePerMeter = 12.5; // DS Rail - Zwart
      }
    }

    let basePrice =
      pricePerMeter * (pricingLength / 100) * configuration.quantity;
    let extras = 0;

    // Extra rails pricing
    if (configuration.extraRails > 0) {
      extras +=
        pricePerMeter * (pricingLength / 100) * configuration.extraRails;
    }

    // New curve model pricing
    if (configuration.corners === "custom" && configuration.curveModel) {
      extras += configuration.curveModel.price;
    }

    // Mounting pricing
    if (configuration.mounting === "wall") {
      const supports = Math.ceil(effectiveLength / 100) + 1;
      extras += supports * 1.5;
    }

    // Ceiling components pricing
    if (
      configuration.mounting === "ceiling" &&
      configuration.ceilingComponents
    ) {
      const ceilingComponentsTotal = configuration.ceilingComponents.reduce(
        (total, component) => total + component.price * component.quantity,
        0,
      );
      extras += ceilingComponentsTotal;
    }

    // Wall components pricing
    if (configuration.mounting === "wall" && configuration.wallComponents) {
      const wallComponentsTotal = configuration.wallComponents.reduce(
        (total, component) => total + component.price * component.quantity,
        0,
      );
      extras += wallComponentsTotal;
    }

    // Selected glider pricing
    if (configuration.selectedGlider) {
      extras +=
        configuration.selectedGlider.price *
        configuration.selectedGlider.quantity;
    }

    // Accessories pricing
    if (configuration.accessories.includes("cord")) {
      extras += 6.95;
    }

    return {
      base: basePrice,
      extras: extras,
      total: basePrice + extras,
    };
  };

  const price = calculatePrice();

  // Toggle all sections open/closed
  const toggleAllSections = () => {
    if (showAllSections) {
      setExpandedSections(["step-1"]); // Close all except step 1
      setShowAllSections(false);
    } else {
      setExpandedSections([
        "step-1",
        "step-2",
        "step-3",
        "step-4",
        "step-5",
        "step-6",
      ]); // Open all
      setShowAllSections(true);
    }
  };

  // Handle accordion section changes
  const handleSectionChange = (value: string[]) => {
    setExpandedSections(value);
    setShowAllSections(value.length === 6);
  };

  // Function to expand next step and collapse current step
  const goToNextStep = (currentStepId: number) => {
    if (currentStepId < 6) {
      const currentStepKey = `step-${currentStepId}`;
      const nextStepKey = `step-${currentStepId + 1}`;
      
      // Remove current step and add next step to expanded sections
      setExpandedSections(prev => {
        const filtered = prev.filter(key => key !== currentStepKey);
        if (!filtered.includes(nextStepKey)) {
          return [...filtered, nextStepKey];
        }
        return filtered;
      });
    }
  };

  // Removed autoExpandNextStep function - manual step control only

  const updateConfiguration = (key: keyof Configuration, value: any) => {
    setConfiguration((prev) => ({ ...prev, [key]: value }));
  };

  // Complete reset function - clears all selections and UI state
  const resetConfigurator = () => {
    setConfiguration(getInitialConfiguration());
    setExpandedSections(["step-1"]); // Reset to only step 1 expanded
    setShowAllSections(false);
    setGliderAdded(false);
    setShowRailLimitWarning(false);
    setShowSpecificationModal(false);
    setIsProcessingPayment(false);
    
    // Scroll to top of configurator
    if (configuratorRef.current) {
      configuratorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Automatic step advancement disabled - users control step expansion manually

  const updateCeilingComponent = (componentId: string, quantity: number) => {
    setConfiguration((prev) => {
      const existingIndex = prev.ceilingComponents.findIndex(
        (comp) => comp.id === componentId,
      );

      if (quantity === 0) {
        // Remove component if quantity is 0
        return {
          ...prev,
          ceilingComponents: prev.ceilingComponents.filter(
            (comp) => comp.id !== componentId,
          ),
        };
      }

      if (existingIndex >= 0) {
        // Update existing component
        const updated = [...prev.ceilingComponents];
        updated[existingIndex].quantity = quantity;
        return { ...prev, ceilingComponents: updated };
      } else {
        // Add new component
        const newComponent = getAvailableCeilingComponents().find(
          (comp) => comp.id === componentId,
        );
        if (newComponent) {
          return {
            ...prev,
            ceilingComponents: [
              ...prev.ceilingComponents,
              { ...newComponent, quantity },
            ],
          };
        }
      }
      return prev;
    });
  };

  const getAvailableCeilingComponents = (): CeilingComponent[] => [
    {
      id: "standard-ceiling-mount",
      name: "Standaard plafondmontage set",
      description:
        "Deze set wordt standaard meegeleverd. Het benodigde aantal wordt door ons bepaald, zodat de montage altijd passend is. De plafondsteunen met sleuf worden geleverd in dezelfde kleur als de gekozen rail kleur, zodat alles mooi aansluit.",
      price: 0.0,
      image: "Scherm­afbeelding 2025-08-15 om 17.18.14_1757370410570.png",
      quantity: 0,
    },
    {
      id: "double-clip",
      name: "KS-DS smartklick plafondsteun incl. afdekkap zwart",
      description:
        "Premium optie: 2 clips per meter voor een veilige installatie. Luxe afwerking.",
      price: 1.65,
      image: "Scherm­afbeelding 2025-06-18 om 21.00.38_1750277424680.png",
      quantity: 2,
    },
    {
      id: "white-cover-clip",
      name: "KS-DS smartklick plafondsteun met afdekkap wit",
      description:
        "Premium optie: 2 clips per meter voor een veilige installatie. Luxe afwerking.",
      price: 1.65,
      image: "Scherm­afbeelding 2025-06-18 om 21.01.06_1750277424680.png",
      quantity: 2,
    },
  ];

  const getAvailableGliders = (): GliderOption[] => [
    {
      id: "wave-gliders-6cm",
      name: "Wave Glijders 6 cm Wit",
      description: "Voor wave-gordijnplooien met een afstand van 6 cm",
      price: 0.5,
      image: "Scherm­afbeelding 2025-06-18 om 23.21.45_1750282933193.png",
      hasColorOptions: true,
      selectedColor: "white",
      quantity: 0,
    },
  ];

  const getAvailableWallComponents = (): WallComponent[] => [];

  const updateWallComponent = (componentId: string, quantity: number) => {
    setConfiguration((prev) => {
      const existingIndex = prev.wallComponents.findIndex(
        (comp) => comp.id === componentId,
      );

      if (quantity === 0) {
        // Remove component if quantity is 0
        return {
          ...prev,
          wallComponents: prev.wallComponents.filter(
            (comp) => comp.id !== componentId,
          ),
        };
      }

      if (existingIndex >= 0) {
        // Update existing component
        const updated = [...prev.wallComponents];
        updated[existingIndex].quantity = quantity;
        return { ...prev, wallComponents: updated };
      } else {
        // Add new component
        const newComponent = getAvailableWallComponents().find(
          (comp) => comp.id === componentId,
        );
        if (newComponent) {
          return {
            ...prev,
            wallComponents: [
              ...prev.wallComponents,
              { ...newComponent, quantity },
            ],
          };
        }
      }
      return prev;
    });
  };

  const selectGlider = (gliderId: string | null) => {
    setConfiguration((prev) => {
      if (!gliderId) {
        return { ...prev, selectedGlider: undefined, gliderChoiceMade: true };
      }

      const glider = getAvailableGliders().find((g) => g.id === gliderId);
      return { ...prev, selectedGlider: glider, gliderChoiceMade: true };
    });
  };

  const updateGliderQuantity = (quantity: number) => {
    setConfiguration((prev) => {
      if (!prev.selectedGlider) return prev;

      return {
        ...prev,
        selectedGlider: {
          ...prev.selectedGlider,
          quantity: Math.max(0, quantity),
        },
      };
    });
  };

  const updateGliderColor = (gliderId: string, color: string) => {
    setConfiguration((prev) => ({
      ...prev,
      selectedGlider:
        prev.selectedGlider?.id === gliderId
          ? { ...prev.selectedGlider, selectedColor: color }
          : prev.selectedGlider,
    }));
  };

  const toggleAccessory = (accessory: string) => {
    setConfiguration((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter((a) => a !== accessory)
        : [...prev.accessories, accessory],
    }));
  };

  const confirmGliderSelection = () => {
    setGliderAdded(true);
    // Auto-hide the confirmation after 2 seconds
    setTimeout(() => {
      setGliderAdded(false);
    }, 2000);
  };

  const handleMolliePayment = async () => {
    setIsProcessingPayment(true);

    try {
      const paymentData = {
        amount: price.total.toFixed(2),
        description: "Offerte betaling KANIOU – inclusief 21% BTW",
        customerName: "Klant", // Can be extended to collect customer info
        customerEmail: "noreply@kaniou.be", // Can be extended to collect customer info
        productDetails: {
          configuration,
          specificationItems: generateSpecificationItems(),
          totalPrice: price.total,
        },
      };

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": Date.now().toString(),
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success && result.checkoutUrl) {
        // Redirect to Mollie checkout
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error(result.message || "Payment creation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Er is een fout opgetreden bij het verwerken van de betaling. Probeer het opnieuw.",
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const generateSpecificationItems = () => {
    const items = [];
    const effectiveLength = configuration.customLength || configuration.length;
    // Use exact length for pricing - no rounding
    const pricingLength = effectiveLength;

    // Rail pricing
    let pricePerMeter = 8.95;
    if (configuration.profileType === "KS") {
      pricePerMeter =
        configuration.color === "white" || configuration.color === "black"
          ? 8.95
          : 8.95;
    } else if (configuration.profileType === "DS") {
      pricePerMeter =
        configuration.color === "white" || configuration.color === "black"
          ? 10.95
          : 10.95;
    }

    const railName = `${configuration.profileType} Rail - ${configuration.color === "white" ? "Wit" : "Zwart"}`;
    const totalRails = configuration.quantity + configuration.extraRails;
    const railPrice = pricePerMeter * (pricingLength / 100) * totalRails;

    items.push({
      name: railName,
      description: `${effectiveLength} cm × ${totalRails} stuks${configuration.extraRails > 0 ? ` (${configuration.quantity} basis + ${configuration.extraRails} extra)` : ""}`,
      unitPrice: pricePerMeter,
      quantity: (pricingLength / 100) * totalRails,
      total: railPrice,
    });

    // Curve model
    if (configuration.corners === "custom" && configuration.curveModel) {
      items.push({
        name: `Curve Model ${configuration.curveModel.name}`,
        description: "Op maat gemaakte bocht",
        unitPrice: configuration.curveModel.price,
        quantity: 1,
        total: configuration.curveModel.price,
      });
    }

    // Ceiling components
    if (
      configuration.mounting === "ceiling" &&
      configuration.ceilingComponents.length > 0
    ) {
      configuration.ceilingComponents.forEach((comp) => {
        items.push({
          name: comp.name,
          description: "Plafondmontage component",
          unitPrice: comp.price,
          quantity: comp.quantity,
          total: comp.price * comp.quantity,
        });
      });
    }

    // Wall components
    if (
      configuration.mounting === "wall" &&
      configuration.wallComponents.length > 0
    ) {
      configuration.wallComponents.forEach((comp) => {
        items.push({
          name: comp.name,
          description: "Wandmontage component",
          unitPrice: comp.price,
          quantity: comp.quantity,
          total: comp.price * comp.quantity,
        });
      });
    }

    // Gliders
    if (configuration.selectedGlider) {
      const unitText =
        configuration.selectedGlider.id === "ks-silent-gliders"
          ? "strips"
          : "stuks";
      items.push({
        name: configuration.selectedGlider.name,
        description: `${configuration.selectedGlider.selectedColor || "wit"} - ${configuration.selectedGlider.quantity} ${unitText}`,
        unitPrice: configuration.selectedGlider.price,
        quantity: configuration.selectedGlider.quantity,
        total:
          configuration.selectedGlider.price *
          configuration.selectedGlider.quantity,
      });
    }

    // Accessories
    if (configuration.accessories.includes("cord")) {
      items.push({
        name: "Koordbediening",
        description: "Bediening accessoire",
        unitPrice: 6.95,
        quantity: 1,
        total: 6.95,
      });
    }

    return items;
  };

  // Component for next step button
  const NextStepButton = ({ currentStepId }: { currentStepId: number }) => {
    if (currentStepId >= 6) return null; // Don't show on last step
    
    return (
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
        <Button
          onClick={() => goToNextStep(currentStepId)}
          className="bg-[#d5c096] hover:bg-[#c4b183] text-white text-sm px-4 py-2 h-auto font-medium"
          size="sm"
        >
          Volgende →
        </Button>
      </div>
    );
  };

  const renderStepContent = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies je profieltype</h3>
              <p className="text-gray-600">
                KS-profielen zijn stil lopend en functioneel, ideaal voor een
                strakke en discrete afwerking. DS-profielen bieden een open
                design en stijlvolle uitstraling, perfect voor wie visueel net
                dat tikkeltje meer wil. Beide profielen worden volledig op maat
                geleverd met bijpassend professioneel montagemateriaal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* KS Rails */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-center">
                  KS Rail - Stil & Functioneel
                </h4>
                <div className="grid gap-3">
                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "KS" &&
                      configuration.color === "white"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "KS");
                      updateConfiguration("color", "white");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      {/* Dual Image Display */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 justify-center items-center">
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={ksRailTechnicalImage}
                            alt="KS Rail technical drawing - 20mm x 14mm dimensions"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={ksRailPhotoImage}
                            alt="KS Rail with gliders real photo"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                      </div>

                      <p className="font-medium">KS Rail - Wit</p>
                      <p className="text-sm text-gray-600">
                        Laag en strak profiel, ideaal voor een minimalistische
                        afwerking. Geluidloos en betrouwbaar in gebruik.
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "KS" &&
                      configuration.color === "black"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "KS");
                      updateConfiguration("color", "black");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      {/* Dual Image Display */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 justify-center items-center">
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={ksRailTechnicalImageBlack}
                            alt="KS Rail technical drawing - 20mm x 14mm dimensions"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={ksRailBlackPhotoImage}
                            alt="KS Rail black photo perspective view"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                      </div>

                      <p className="font-medium">KS Rail - Zwart</p>
                      <p className="text-sm text-gray-600">
                        Laag en strak profiel, ideaal voor een minimalistische
                        afwerking. Geluidloos en betrouwbaar in gebruik.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* DS Rails */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-center">
                  DS Rail - Design & Stijl
                </h4>
                <div className="grid gap-3">
                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "DS" &&
                      configuration.color === "white"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "DS");
                      updateConfiguration("color", "white");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      {/* Dual Image Display */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 justify-center items-center">
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={dsRailTechnicalImage}
                            alt="DS Rail profile drawing - 24mm x 12mm dimensions"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={dsRailPhotoImage}
                            alt="DS Rail photo with gliders and closed front"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                      </div>

                      <p className="font-medium">DS Rail - Wit</p>
                      <p className="text-sm text-gray-600">
                        Modern open profiel met een luxe uitstraling. Geschikt
                        als zichtbare rail, ook perfect voor plafondmontage.
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "DS" &&
                      configuration.color === "black"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "DS");
                      updateConfiguration("color", "black");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      {/* Dual Image Display */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 justify-center items-center">
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={dsRailTechnicalImageBlack}
                            alt="DS Rail profile drawing - 24mm x 12mm dimensions"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[120px]">
                          <img
                            src={dsRailBlackPhotoImage}
                            alt="DS Rail black photo with open profile"
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                      </div>

                      <p className="font-medium">DS Rail - Zwart</p>
                      <p className="text-sm text-gray-600">
                        Modern open profiel met een luxe uitstraling. Geschikt
                        als zichtbare rail, ook perfect voor plafondmontage.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 text-blue-600 mt-0.5 flex items-center justify-center">ℹ️</span>
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>KS = Stille en functionele rail</strong> |{" "}
                    <strong>DS = Designrail met open profiel</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Beide rails worden nauwkeurig op maat gezaagd en geleverd
                    met professioneel montagemateriaal — klaar voor directe
                    plaatsing. Zo bent u verzekerd van een perfecte pasvorm en
                    een hoogwaardige afwerking.
                  </p>
                </div>
              </div>
            </div>
            <NextStepButton currentStepId={1} />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Bepaal de gewenste lengte
              </h3>
              <p className="text-gray-600">
                Elke rail wordt exact op de door jou opgegeven maat gezaagd,
                zonder extra kosten. Of je nu 150 cm of 400 cm nodig hebt, je
                ontvangt altijd een perfect passende oplossing – kant-en-klaar
                voor montage.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#d5c096] mb-2">
                    {configuration.customLength || (configuration.length > 0 ? configuration.length : 100)} cm
                  </div>
                  <p className="text-gray-600">
                    {configuration.customLength
                      ? "Uw exacte maat wordt gebruikt voor de berekening"
                      : configuration.length > 0 
                        ? "Kies de railmaat die het best past bij uw ruimte." 
                        : "Kies eerst een lengte"}
                  </p>
                </div>

                <div className="px-4">
                  <Slider
                    value={[configuration.customLength || (configuration.length > 0 ? configuration.length : 100)]}
                    onValueChange={([value]) => {
                      updateConfiguration("length", value);
                      updateConfiguration("customLength", undefined);
                    }}
                    min={100}
                    max={700}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>100 cm</span>
                    <span>700 cm</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 700].map(
                    (length) => (
                      <Button
                        key={length}
                        variant={
                          configuration.length === length &&
                          !configuration.customLength
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          updateConfiguration("length", length);
                          updateConfiguration("customLength", undefined);
                        }}
                        className={
                          configuration.length === length &&
                          !configuration.customLength
                            ? "bg-[#d5c096] hover:bg-[#c4b183]"
                            : ""
                        }
                      >
                        {length} cm
                      </Button>
                    ),
                  )}
                </div>

                {/* Custom Length Input */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Of geef je exacte maat op
                    </h4>
                    <p className="text-sm text-gray-600">
                      Voor een perfecte pasvorm kun je ook je exacte maat
                      invoeren
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <div className="relative">
                      <input
                        type="number"
                        min="100"
                        max="700"
                        step="1"
                        placeholder="Bijvoorbeeld: 215"
                        className="w-full px-4 py-3 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                        value={configuration.customLength || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === "") {
                            updateConfiguration("customLength", undefined);
                            updateConfiguration("length", 200); // Reset to default
                            return;
                          }

                          const value = parseInt(inputValue);
                          if (!isNaN(value)) {
                            updateConfiguration("customLength", value);
                            if (value >= 100 && value <= 700) {
                              updateConfiguration("length", value);
                            }
                          }
                        }}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        cm
                      </span>
                    </div>

                    {configuration.customLength &&
                      (configuration.customLength < 100 ||
                        configuration.customLength > 700) && (
                        <p className="text-red-600 text-sm mt-2 text-center">
                          Kies een lengte tussen 100 en 700 cm
                        </p>
                      )}

                    {configuration.customLength &&
                      configuration.customLength >= 100 &&
                      configuration.customLength <= 700 && (
                        <p className="text-green-600 text-sm mt-2 text-center">
                          ✓ Exacte maat: {configuration.customLength} cm
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800">
                  <strong>✅ Gratis op maat gezaagd</strong> Elke rail wordt
                  nauwkeurig op de door u opgegeven maat gezaagd in ons atelier
                  — met zorg en precisie.
                </p>
              </div>
            </div>
            <NextStepButton currentStepId={2} />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Kies aantal railstukken
              </h3>
              <p className="text-gray-600">Hoeveel rails heeft u nodig?</p>
            </div>

            <div className="max-w-xs mx-auto">
              <Select
                value={configuration.quantity > 0 ? configuration.quantity.toString() : ""}
                onValueChange={(value) => {
                  const numValue = parseInt(value);
                  updateConfiguration("quantity", numValue);
                }}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="-- Kies aantal rails --" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} rail{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-center">
              <div className="text-2xl font-semibold text-[#d5c096]">
                {configuration.quantity > 0 && configuration.length > 0 
                  ? `${configuration.quantity} × ${configuration.length} cm`
                  : "Maak eerst je selecties"}
              </div>
              {configuration.quantity > 0 && configuration.length > 0 && (
                <p className="text-gray-600 mt-1">
                  Totale raillengte:{" "}
                  {configuration.quantity * configuration.length} cm
                </p>
              )}
            </div>

            {/* Extra Rails Input Field */}
            <div className="max-w-sm mx-auto space-y-3">
              <div className="text-center">
                <Label htmlFor="extraRails" className="text-base font-medium">
                  Extra rails bestellen (optioneel):
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Aantal extra rails bovenop de standaard keuze
                </p>
              </div>

              <div className="relative">
                <Input
                  id="extraRails"
                  type="number"
                  min="0"
                  max="99"
                  value={configuration.extraRails.toString()}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const value = parseInt(inputValue) || 0;

                    // Show warning if value exceeds 99
                    if (value > 99) {
                      setShowRailLimitWarning(true);
                      // Hide warning after 3 seconds
                      setTimeout(() => {
                        setShowRailLimitWarning(false);
                      }, 3000);
                    } else {
                      setShowRailLimitWarning(false);
                    }

                    // Only update state if within valid range
                    if (value >= 0 && value <= 99) {
                      updateConfiguration("extraRails", value);
                    }
                  }}
                  className="h-12 text-lg text-center"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  rails
                </span>
              </div>

              {/* Warning for exceeding 99 */}
              {showRailLimitWarning && (
                <div className="text-center text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                  ⚠️ Maximaal 99 extra rails per bestelling toegestaan.
                </div>
              )}

              <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                <p>
                  <strong>Advies:</strong> meestal 1 rail per raam, maar u kunt
                  extra rails bestellen voor meerdere ruimtes.
                </p>
              </div>

              {configuration.extraRails > 0 && (
                <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded">
                  ✓ {configuration.extraRails} extra rail
                  {configuration.extraRails > 1 ? "s" : ""} toegevoegd
                </div>
              )}
            </div>
            <NextStepButton currentStepId={3} />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies gewenste bochten</h3>
              <p className="text-gray-600">
                Heb je een raam met een hoek of wil je de rail door laten lopen
                over meerdere wanden? Voeg hier de gewenste bochten toe. Onze
                bochten worden professioneel voorgebogen en passen naadloos aan
                op de rail.
              </p>
            </div>

            <RadioGroup
              value={configuration.corners}
              onValueChange={(value) => updateConfiguration("corners", value)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* No Curve - Keep and remains default */}
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">Geen bocht</p>
                        <p className="text-sm text-gray-600">
                          Rechte rail zonder bochten
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          Gratis
                        </p>
                      </div>
                    </Label>
                  </div>
                </Card>

                {/* Custom Model Selection */}
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">Kies een model</p>
                        <p className="text-sm text-gray-600">
                          Selecteer uit beschikbare modellen
                        </p>
                        <p className="text-sm font-medium text-[#d5c096]">
                          Vanaf €3,50
                        </p>
                      </div>
                    </Label>
                  </div>
                </Card>
              </div>
            </RadioGroup>

            {/* Custom Bent Model Selection */}
            {configuration.corners === "custom" && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-2">
                    Selecteer uw curve model
                  </h4>
                  <p className="text-gray-600">
                    Kies een model dat past bij uw ruimte en voer de exacte
                    maten in.
                  </p>
                </div>

                {/* Curve Models Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {curveModels.map((model) => (
                    <Card
                      key={model.id}
                      className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                        configuration.curveModel?.id === model.id
                          ? "border-[#d5c096] bg-[#d5c096]/5"
                          : "border-gray-200 hover:border-[#d5c096]/50"
                      }`}
                      onClick={() => {
                        updateConfiguration("curveModel", model);
                        // Reset measurements when changing model
                        updateConfiguration("curveMeasurements", {});
                      }}
                    >
                      <CardContent className="p-4 text-center">
                        {/* Model Image */}
                        <div className="w-full h-20 mb-3 flex items-center justify-center bg-white rounded border">
                          {model.id === "model-a" && (
                            <img
                              src={modelAImage}
                              alt="Model A - L-vormige bocht"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                          {model.id === "model-b1" && (
                            <img
                              src={modelB1Image}
                              alt="Model B1 - U-vormige bocht"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                          {model.id === "model-b2" && (
                            <img
                              src={modelB2Image}
                              alt="Model B2 - Gebogen bocht"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                          {model.id === "model-c" && (
                            <img
                              src={modelCImage}
                              alt="Model C - Complexe bocht"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                          {model.id === "model-d" && (
                            <img
                              src={modelDImage}
                              alt="Model D - Uitgebreide bocht"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                          {model.id === "model-e" && (
                            <img
                              src={modelEImage}
                              alt="Model E - Dubbele U-bocht"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                        </div>
                        <p className="font-medium text-sm">{model.name}</p>
                        <p className="text-xs text-gray-600">
                          €{model.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Measurement Inputs for Selected Model */}
                {configuration.curveModel && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h5 className="font-semibold mb-4 text-center">
                      Voer de maten in voor {configuration.curveModel.name}
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {configuration.curveModel.segments.map((segment) => (
                        <div key={segment} className="space-y-2">
                          <Label
                            htmlFor={`segment-${segment}`}
                            className="text-sm font-medium"
                          >
                            Segment {segment} (cm)
                          </Label>
                          <input
                            id={`segment-${segment}`}
                            type="number"
                            min="10"
                            max="600"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                            placeholder="cm"
                            value={
                              configuration.curveMeasurements?.[segment] || ""
                            }
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              updateConfiguration("curveMeasurements", {
                                ...configuration.curveMeasurements,
                                [segment]: value,
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Validation Message */}
                    {configuration.curveModel &&
                      !configuration.curveModel.segments.every(
                        (segment) =>
                          configuration.curveMeasurements?.[segment] &&
                          configuration.curveMeasurements[segment] > 0,
                      ) && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <p className="text-sm text-yellow-800">
                            Vul alle vereiste maten in voordat u doorgaat naar
                            de volgende stap.
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Eigen Model Custom Input */}
            {configuration.corners === "eigen-model" && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-2">
                    Eigen model configureren
                  </h4>
                  <p className="text-gray-600">
                    Beschrijf uw unieke railform en voer de gewenste maten in.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Beschrijving van uw ontwerp
                      </Label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                        rows={4}
                        placeholder="Beschrijf hier uw gewenste railform, bijvoorbeeld: L-vorm, U-vorm, Z-vorm, etc."
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Belangrijkste afmetingen (optioneel)
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-gray-600">
                            Breedte (cm)
                          </Label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                            placeholder="cm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">
                            Hoogte (cm)
                          </Label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                            placeholder="cm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">
                            Diepte (cm)
                          </Label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                            placeholder="cm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">
                            Extra (cm)
                          </Label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                            placeholder="cm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <span className="h-5 w-5 text-blue-600 mt-0.5 flex items-center justify-center">ℹ️</span>
                        <div>
                          <p className="text-sm text-blue-800 font-medium">
                            Offerte op maat
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            Voor eigen ontwerpen maken wij een persoonlijke
                            offerte op basis van uw specificaties. U kunt ook
                            een tekening uploaden tijdens het offerteproces.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <NextStepButton currentStepId={4} />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Kies uw montagemethode
              </h3>
              <p className="text-gray-600">
                Afhankelijk van de situatie kies je voor plafondmontage
                (inclusief clips en schroeven), wandmontage (met steunen), of
                alleen de rail zonder montage-accessoires. Onze materialen zijn
                van hoogwaardige kwaliteit en geschikt voor diverse
                toepassingen.
              </p>
            </div>

            <RadioGroup
              value={configuration.mounting}
              onValueChange={(value) => {
                updateConfiguration("mounting", value);
                // Clear components when switching mounting types
                if (value !== "ceiling") {
                  updateConfiguration("ceilingComponents", []);
                }
                if (value !== "wall") {
                  updateConfiguration("wallComponents", []);
                }
              }}
              className="space-y-4"
            >
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ceiling" id="ceiling" />
                  <Label htmlFor="ceiling" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Plafondmontage</p>
                      <p className="text-sm text-gray-600">
                        Inclusief plafondclips en schroeven van hoge kwaliteit.
                        Geschikt voor directe montage aan het plafond.
                      </p>
                      <p className="text-sm font-medium text-[#d5c096]">
                        Componenten selecteerbaar
                      </p>
                    </div>
                  </Label>
                </div>

                {/* Ceiling Components Selection */}
                {configuration.mounting === "ceiling" && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-4">
                      Choose Your Ceiling Mounting Components
                    </h4>
                    <div className="grid gap-4">
                      {getAvailableCeilingComponents().map((component) => {
                        const selectedComponent =
                          configuration.ceilingComponents.find(
                            (comp) => comp.id === component.id,
                          );
                        const currentQuantity =
                          selectedComponent?.quantity || 0;

                        return (
                          <Card key={component.id} className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <img
                                  src={`/attached_assets/${component.image}`}
                                  alt={component.name}
                                  className="w-full h-full object-contain rounded-lg hover:scale-105 transition-transform"
                                  onError={(e) => {
                                    const img =
                                      e.currentTarget as HTMLImageElement;
                                    const fallback =
                                      img.nextElementSibling as HTMLElement;
                                    img.style.display = "none";
                                    if (fallback) {
                                      fallback.style.display = "flex";
                                    }
                                  }}
                                />
                                <div className="w-full h-full bg-gray-200 rounded-lg items-center justify-center text-gray-500 text-xs hidden">
                                  Component
                                </div>
                              </div>

                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 mb-1">
                                  {component.name}
                                </h5>
                                <p className="text-sm text-gray-600 mb-2">
                                  {component.description}
                                </p>
                                <p className="text-sm font-medium text-[#d5c096]">
                                  €{component.price.toFixed(2)} per piece
                                </p>
                              </div>

                              {component.id === "standard-ceiling-mount" ? (
                                // Standaard plafondmontage set - geen keuze aantal, wordt automatisch berekend
                                <div className="flex items-center">
                                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    ✓ Standaard inbegrepen
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm font-medium">
                                    Quantity:
                                  </Label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    value={currentQuantity}
                                    onChange={(e) => {
                                      const quantity =
                                        parseInt(e.target.value) || 0;
                                      updateCeilingComponent(
                                        component.id,
                                        quantity,
                                      );
                                    }}
                                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d5c096] focus:border-transparent"
                                  />
                                  <span className="text-sm text-gray-500">
                                    = €
                                    {(component.price * currentQuantity).toFixed(
                                      2,
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>

                    {configuration.ceilingComponents.length > 0 && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-green-800">
                            Ceiling Components Subtotal:
                          </span>
                          <span className="font-bold text-green-800">
                            €
                            {configuration.ceilingComponents
                              .reduce(
                                (sum, comp) => sum + comp.price * comp.quantity,
                                0,
                              )
                              .toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rail-only" id="rail-only" />
                  <Label htmlFor="rail-only" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">🚫 Alleen rail</p>
                      <p className="text-sm text-gray-600">
                        U ontvangt enkel de rail, zonder bevestigingsmateriaal.
                        Ideaal wanneer u eigen steunen of clips gebruikt.
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        Basisprijs – geen extra kosten
                      </p>
                    </div>
                  </Label>
                </div>
              </Card>
            </RadioGroup>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Wrench className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-800">
                    <strong>Professioneel montagemateriaal:</strong> Al ons
                    montagemateriaal is duurzaam, getest en geschikt voor
                    diverse wand- en plafondtypes.
                  </p>
                </div>
              </div>
            </div>
            <NextStepButton currentStepId={5} />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Kies bediening & accessoires
              </h3>
              <p className="text-gray-600">
                Maak je rails compleet met optionele accessoires zoals
                eindstoppen, einddeksels of overgangsconnectoren voor meer
                comfort en afwerking. Al onze accessoires zijn afgestemd op het
                gekozen profiel en worden netjes meegeleverd.
              </p>
            </div>

            <div className="space-y-6">
              {/* Glider Selection Section */}
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Kies het gewenste type glijders
                </h4>
                <p className="text-gray-600 mb-4">
                  Kies het type glijders dat het best past bij jouw
                  gordijnstijl. De glijders worden afgestemd op het gekozen
                  profiel en gebruiksklaar meegeleverd.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Wave Gliders 6cm */}
                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.selectedGlider?.id === "wave-gliders-6cm"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => selectGlider("wave-gliders-6cm")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <input
                          type="radio"
                          id="wave-gliders-6cm"
                          name="glider-selection"
                          checked={
                            configuration.selectedGlider?.id ===
                            "wave-gliders-6cm"
                          }
                          onChange={() => selectGlider("wave-gliders-6cm")}
                          className="w-4 h-4 text-[#d5c096] border-gray-300 focus:ring-[#d5c096]"
                        />
                        <label
                          htmlFor="wave-gliders-6cm"
                          className="font-medium cursor-pointer"
                        >
                          Wave Glijders 6 cm Wit
                        </label>
                      </div>

                      <div className="mb-3">
                        <img
                          src="/images/Scherm­afbeelding 2025-06-18 om 23.21.45_1750282933193.png"
                          alt="Wave Gliders 6cm"
                          className="w-full h-24 object-contain bg-gray-50 rounded border"
                        />
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        Voor wave-gordijnplooien met een afstand van 6 cm _
                        Geschikt voor KS-DS gordijnrails.
                      </p>

                      {configuration.selectedGlider?.id ===
                        "wave-gliders-6cm" && (
                        <div className="space-y-3 mb-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Kleur:
                            </label>
                            <select
                              value={
                                configuration.selectedGlider.selectedColor ||
                                "white"
                              }
                              onChange={(e) =>
                                updateGliderColor(
                                  "wave-gliders-6cm",
                                  e.target.value,
                                )
                              }
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#d5c096] focus:border-[#d5c096]"
                            >
                              <option value="white">Wit</option>
                              <option value="black">Zwart</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Aantal stuks:
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={
                                configuration.selectedGlider.quantity || ""
                              }
                              onChange={(e) =>
                                updateGliderQuantity(
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#d5c096] focus:border-[#d5c096]"
                              placeholder="Voer aantal stuks in"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Advies: Breedte in cm ÷ 6, voeg 2 tot 4 extra
                              stuks toe
                            </p>
                          </div>

                          <Button
                            size="sm"
                            className={`w-full mt-3 text-white transition-all ${
                              gliderAdded
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-[#d5c096] hover:bg-[#c4b183]"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmGliderSelection();
                              if (configuration.selectedGlider) {
                                console.log("Wave Glijders added:", {
                                  name: configuration.selectedGlider.name,
                                  color:
                                    configuration.selectedGlider
                                      .selectedColor || "white",
                                  quantity:
                                    configuration.selectedGlider.quantity,
                                  price:
                                    configuration.selectedGlider.price *
                                    configuration.selectedGlider.quantity,
                                });
                              }
                            }}
                          >
                            {gliderAdded ? "✓ Toegevoegd" : "Toevoegen"}
                          </Button>
                        </div>
                      )}

                      <p className="font-medium text-[#d5c096]">
                        € 0.50 per/stuk
                      </p>
                    </CardContent>
                  </Card>

                  {/* No Gliders Option */}
                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      !configuration.selectedGlider
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => selectGlider(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <input
                          type="radio"
                          id="no-glider"
                          name="glider-selection"
                          checked={configuration.gliderChoiceMade && !configuration.selectedGlider}
                          onChange={() => selectGlider(null)}
                          className="w-4 h-4 text-[#d5c096] border-gray-300 focus:ring-[#d5c096]"
                        />
                        <label
                          htmlFor="no-glider"
                          className="font-medium cursor-pointer"
                        >
                          Geen glijders
                        </label>
                      </div>

                      <div className="mb-3">
                        <div className="w-full h-24 bg-gray-100 rounded border flex items-center justify-center">
                          <span className="text-sm text-gray-500">n.v.t</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        Ik voorzie zelf in glijders of plaats ze afzonderlijk
                      </p>

                      <p className="font-medium text-green-600">€ 0.00</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Advies: ( Wave plooi )</strong> Voor een optimale
                    plooiing en soepele werking van de gordijnen, kies je best
                    het juiste type glijder. Wave-glijders worden uitsluitend
                    aanbevolen voor gordijnen met een wave-plooi.
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Advies: ( Andere plooi type )</strong> KS-DS
                    glijders worden geleverd per strip van 10 stuks. Wij
                    adviseren 1 strip (10 stuks) per meter rail voor een
                    optimale verdeling en soepele werking van het gordijn.
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Advies voor Wave Runners (6 cm):</strong> Voor
                    wavegordijnen adviseren wij 1 glijder per 6 cm. De
                    berekening is eenvoudig: deel de totale railbreedte (in cm)
                    door 6. Zorg er altijd voor dat het resultaat een even getal
                    is, zodat de plooien gelijk verdeeld zijn. Voorbeeld:
                    Railbreedte = 300 cm → 300 ÷ 6 = 50 glijders Wij adviseren
                    om voor de zekerheid 2 à 4 extra glijders toe te voegen, dus
                    bestel in dit geval 52 à 54 glijders. Zo ben je zeker van
                    een perfecte afwerking zonder tekort..
                  </p>
                </div>
              </div>

              <Card className="p-4 bg-gray-50 border-gray-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="h-5 w-5 text-green-600 flex items-center justify-center">✅</span>
                        <p className="font-medium text-gray-900">
                          Eindstop met eindkapje (Advies: 2 stuks per rail)
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Voorkomt dat glijders uit de rail lopen. Een essentieel
                        onderdeel dat standaard wordt meegeleverd voor zowel KS
                        als DS rails – voor veiligheid en duurzaamheid.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Standaard inbegrepen
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <img
                        src="/images/eindkapje-los.png"
                        alt="Eindkapje los"
                        className="w-full h-32 object-contain bg-white rounded border mb-2"
                      />
                      <p className="text-xs text-gray-500">Eindkapje los</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="/images/eindkapje-gemonteerd.png"
                        alt="Eindkapje gemonteerd"
                        className="w-full h-32 object-contain bg-white rounded border mb-2"
                      />
                      <p className="text-xs text-gray-500">
                        Eindkapje gemonteerd
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 italic">
                      Wordt standaard meegeleverd bij iedere rail. Voor KS- en
                      DS-profiel.
                    </p>
                  </div>
                </div>
              </Card>
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
        <title>Gordijnrails Configurator - Op Maat | KANIOU</title>
        <meta
          name="description"
          content="Configureer je perfecte gordijnrail. KS & DS profielen in wit en zwart, op maat gezaagd vanaf €8,95 per meter. Inclusief montagemateriaal."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 relative overflow-hidden">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(213,192,150,0.03),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(213,192,150,0.02)_25%,rgba(213,192,150,0.02)_50%,transparent_50%,transparent_75%,rgba(213,192,150,0.02)_75%)] bg-[length:60px_60px]" />
        <Container className="relative z-10">
          <div className="pt-12 pb-16">
            {/* Luxury Header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d5c096]/10 to-transparent blur-3xl" />
              <Link
                href="/producten"
                className="inline-flex items-center text-[#d5c096] hover:text-[#c4b183] mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar producten
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 tracking-tight relative z-10">
                Gordijnrails
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light relative z-10">
                Stel je perfecte gordijnrail samen. KS & DS profielen, volledig
                op maat en inclusief professioneel montagemateriaal.
              </p>
            </div>

            {/* Delivery Time Information Box - Always Visible */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">
                    ⏱ Levertijd
                  </h3>
                </div>
                <p className="text-blue-800 mb-4">
                  Onze gordijnrails worden op maat gezaagd en zorgvuldig gecontroleerd in ons atelier.
                </p>
                <div className="space-y-2 text-sm text-blue-700 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">•</span>
                    <span>Productie & verwerking: 2–4 werkdagen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">•</span>
                    <span>Levering: 1–2 werkdagen (BE & NL)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">•</span>
                    <span><strong>Totale levertijd: gemiddeld 3–6 werkdagen</strong></span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>Snelle, zorgvuldige verzending</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>Discreet verpakt en direct leverbaar uit voorraad</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative"
              ref={configuratorRef}
            >
              {/* Configuration Steps - Luxury Accordion Layout */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100/50 pb-6">
                    <CardTitle className="flex items-center gap-3 justify-between text-2xl font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-[#d5c096] to-[#c4b183] rounded-xl shadow-lg">
                          <Settings className="h-5 w-5 text-white" />
                        </div>
                        Gordijnrails Configurator
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetConfigurator}
                          className="text-xs border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 rounded-xl px-3 py-2 font-medium flex items-center gap-1"
                        >
                          <RotateCcw className="h-3 w-3" />
                          🔄 Alles wissen
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={toggleAllSections}
                          className="text-xs border-[#d5c096]/30 text-[#d5c096] hover:bg-[#d5c096]/10 hover:border-[#d5c096] transition-all duration-300 rounded-xl px-4 py-2 font-medium"
                        >
                          {showAllSections ? "Verberg alles" : "Toon alles"}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Accordion
                      type="multiple"
                      value={expandedSections}
                      onValueChange={handleSectionChange}
                      className="w-full space-y-4"
                    >
                      {steps.map((step, index) => (
                        <AccordionItem
                          key={`step-${step.id}`}
                          value={`step-${step.id}`}
                          className={`border-0 rounded-2xl mb-6 shadow-lg transition-all duration-300 overflow-hidden ${
                            expandedSections.includes(`step-${step.id}`)
                              ? "bg-gradient-to-r from-[#d5c096]/10 to-[#d5c096]/5 shadow-xl scale-[1.02]"
                              : "bg-white hover:shadow-xl hover:scale-[1.01]"
                          }`}
                        >
                          <AccordionTrigger className="px-6 py-5 hover:no-underline group transition-all duration-300">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg ${
                                    step.completed
                                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-200"
                                      : expandedSections.includes(
                                            `step-${step.id}`,
                                          )
                                        ? "bg-gradient-to-br from-[#d5c096] to-[#c4b183] text-white shadow-[#d5c096]/20"
                                        : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 shadow-gray-100 group-hover:from-[#d5c096]/20 group-hover:to-[#d5c096]/10"
                                  }`}
                                >
                                  {step.completed ? (
                                    <span className="h-5 w-5 flex items-center justify-center">✅</span>
                                  ) : (
                                    step.id
                                  )}
                                </div>
                                <div className="text-left">
                                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#d5c096] transition-colors duration-300">
                                    Stap {step.id} – {step.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 font-medium">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  step.completed ? "default" : "secondary"
                                }
                                className={`ml-2 px-3 py-1 rounded-full font-semibold shadow-sm transition-all duration-300 ${
                                  step.completed
                                    ? "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200"
                                    : "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {step.completed
                                  ? "✅ Voltooid"
                                  : "⚠️ Nog niet ingevuld"}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <div className="pt-4 bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 mx-2 mb-2 border border-gray-100/50">
                              {renderStepContent(step.id)}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/* Luxury Summary & Pricing */}
              <div className="space-y-8">
                {/* Configuration Summary */}
                <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#d5c096]/10 to-[#d5c096]/5 border-b border-[#d5c096]/20 pb-6">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-[#d5c096] to-[#c4b183] rounded-xl shadow-lg">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      Jouw Configuratie
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    {configuration.profileType && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">
                          Profiel:
                        </span>
                        <span className="font-bold text-lg bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                          {configuration.profileType} -{" "}
                          {configuration.color === "white" ? "Wit" : "Zwart"}
                        </span>
                      </div>
                    )}

                    {(configuration.length > 0 ||
                      configuration.customLength) && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">
                          Lengte:
                        </span>
                        <span className="font-bold text-lg bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                          {configuration.customLength || configuration.length}{" "}
                          cm
                          {configuration.customLength && (
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full ml-2 font-semibold">
                              exact
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    {configuration.quantity > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">
                          Aantal:
                        </span>
                        <span className="font-bold text-lg bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                          {configuration.quantity} rail
                          {configuration.quantity > 1 ? "s" : ""}
                          {configuration.extraRails > 0 && (
                            <span>
                              {" "}
                              + {configuration.extraRails} extra rail
                              {configuration.extraRails > 1 ? "s" : ""}
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    {configuration.corners && configuration.corners !== "" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bochten:</span>
                        <span className="font-medium">
                          {configuration.corners === "custom" &&
                          configuration.curveModel
                            ? `${configuration.curveModel.name} (€${configuration.curveModel.price.toFixed(2)})`
                            : configuration.corners === "custom"
                              ? "Kies een model"
                              : configuration.corners === "eigen-model"
                                ? "Eigen model (op aanvraag)"
                                : configuration.corners === "none"
                                  ? "Geen bocht"
                                  : "Op maat gebogen"}
                        </span>
                      </div>
                    )}

                    {configuration.corners === "custom" &&
                      configuration.curveModel &&
                      configuration.curveMeasurements && (
                        <div className="space-y-1">
                          <span className="text-gray-600 text-sm">
                            Segmentmaten:
                          </span>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            {configuration.curveModel.segments.map(
                              (segment) => (
                                <div
                                  key={segment}
                                  className="flex justify-between"
                                >
                                  <span>{segment}:</span>
                                  <span>
                                    {configuration.curveMeasurements?.[
                                      segment
                                    ] || 0}{" "}
                                    cm
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {configuration.mounting && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">
                          Montage:
                        </span>
                        <span className="font-bold text-lg bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                          {configuration.mounting === "ceiling"
                            ? "Plafond"
                            : configuration.mounting === "wall"
                              ? "Wand"
                              : "Alleen rail"}
                        </span>
                      </div>
                    )}

                    {configuration.mounting === "ceiling" &&
                      configuration.ceilingComponents.length > 0 && (
                        <div>
                          <span className="text-gray-600">
                            Plafond componenten:
                          </span>
                          <div className="mt-1 space-y-1">
                            {configuration.ceilingComponents.map((comp) => (
                              <div
                                key={comp.id}
                                className="flex justify-between text-sm"
                              >
                                <span>{comp.name}</span>
                                <span>×{comp.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {configuration.mounting === "wall" &&
                      configuration.wallComponents.length > 0 && (
                        <div>
                          <span className="text-gray-600">
                            Wand componenten:
                          </span>
                          <div className="mt-1 space-y-1">
                            {configuration.wallComponents.map((comp) => (
                              <div
                                key={comp.id}
                                className="flex justify-between text-sm"
                              >
                                <span>{comp.name}</span>
                                <span>×{comp.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {configuration.selectedGlider && (
                      <div className="py-3 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">
                            Glijders:
                          </span>
                          <span className="font-bold text-lg bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                            {configuration.selectedGlider.name}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {configuration.selectedGlider.selectedColor || "wit"}{" "}
                          – {configuration.selectedGlider.quantity}{" "}
                          {configuration.selectedGlider.id ===
                          "ks-silent-gliders"
                            ? "strips"
                            : "stuks"}
                        </div>
                      </div>
                    )}

                    {configuration.accessories.length > 0 && (
                      <div>
                        <span className="text-gray-600">Accessoires:</span>
                        <div className="mt-1">
                          {configuration.accessories.map((acc) => (
                            <Badge
                              key={acc}
                              variant="secondary"
                              className="mr-1 mb-1"
                            >
                              {acc === "cord"
                                ? "Koordbediening"
                                : acc === "endstop"
                                  ? "Eindstop"
                                  : acc === "endcap"
                                    ? "Einddeksel"
                                    : acc === "connector"
                                      ? "Connector"
                                      : acc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Luxury Pricing */}
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#d5c096]/20 to-[#d5c096]/10 border-b border-[#d5c096]/30 pb-6">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-[#d5c096] to-[#c4b183] rounded-xl shadow-lg">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      Prijsoverzicht
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    {price.total > 0 ? (
                      <>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                          <div>
                            <span className="font-semibold text-gray-900">
                              Basis rail (
                              {(() => {
                                const effectiveLength =
                                  configuration.customLength ||
                                  configuration.length;
                                return effectiveLength;
                              })()}{" "}
                              cm ×{" "}
                              {configuration.quantity + configuration.extraRails})
                            </span>
                            {configuration.customLength && (
                              <div className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mt-1 inline-block font-semibold">
                                Exact maat: {configuration.customLength} cm
                              </div>
                            )}
                          </div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                            €{price.base.toFixed(2)}
                          </span>
                        </div>

                        {price.extras > 0 && (
                          <>
                            {configuration.corners === "custom" &&
                              configuration.curveModel && (
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>
                                    Curve Model ({configuration.curveModel.name})
                                  </span>
                                  <span>
                                    €{configuration.curveModel.price.toFixed(2)}
                                  </span>
                                </div>
                              )}

                            {configuration.mounting === "ceiling" &&
                              configuration.ceilingComponents.length > 0 && (
                                <>
                                  {configuration.ceilingComponents.map((comp) => (
                                    <div
                                      key={comp.id}
                                      className="flex justify-between text-sm text-gray-600"
                                    >
                                      <span>
                                        {comp.name} (×{comp.quantity})
                                      </span>
                                      <span>
                                        €{(comp.price * comp.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </>
                              )}

                            {configuration.mounting === "wall" &&
                              configuration.wallComponents.length > 0 && (
                                <>
                                  {configuration.wallComponents.map((comp) => (
                                    <div
                                      key={comp.id}
                                      className="flex justify-between text-sm text-gray-600"
                                    >
                                      <span>
                                        {comp.name} (×{comp.quantity})
                                      </span>
                                      <span>
                                        €{(comp.price * comp.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </>
                              )}

                            {configuration.selectedGlider && (
                              <>
                                <div className="text-sm text-gray-600">
                                  <span>
                                    {configuration.selectedGlider.name} –{" "}
                                    {configuration.selectedGlider.selectedColor ||
                                      "wit"}{" "}
                                    ({configuration.selectedGlider.quantity}{" "}
                                    {configuration.selectedGlider.id ===
                                    "ks-silent-gliders"
                                      ? "strips"
                                      : "stuks"}
                                    )
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 ml-4">
                                  <span></span>
                                  <span>
                                    +€
                                    {(
                                      configuration.selectedGlider.price *
                                      configuration.selectedGlider.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </>
                            )}

                            {configuration.accessories.includes("cord") && (
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Cord Accessories</span>
                                <span>€6.95</span>
                              </div>
                            )}

                            <Separator />
                          </>
                        )}

                        <div className="bg-gradient-to-r from-[#d5c096]/20 to-[#d5c096]/10 p-6 rounded-2xl border-2 border-[#d5c096]/30 shadow-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold text-gray-900">
                              Totaalprijs (incl. 21% BTW)
                            </span>
                            <span className="text-3xl font-extrabold bg-gradient-to-r from-[#d5c096] to-[#c4b183] bg-clip-text text-transparent">
                              €{price.total.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 text-right">
                            BTW-bedrag: €{((price.total * 0.21) / 1.21).toFixed(2)}
                          </p>
                        </div>

                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mb-4">
                          <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          Maak eerst je selecties
                        </h3>
                        <p className="text-gray-500">
                          Zodra je alle keuzes hebt gemaakt, verschijnt hier je prijsoverzicht.
                        </p>
                        <div className="mt-6 space-y-2 text-sm text-gray-400">
                          <p>✓ Profieltype en kleur</p>
                          <p>✓ Lengte en aantal</p>
                          <p>✓ Montage en accessoires</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Luxury Action Buttons - Always show when step 6 is completed */}
                {steps[5].completed && (
                  <div className="space-y-4">
                    {/* Premium Mollie Payment Button */}
                    <Button
                      onClick={handleMolliePayment}
                      disabled={isProcessingPayment}
                      className="w-full bg-gradient-to-r from-[#cc0000] via-[#e60000] to-[#cc0000] hover:from-[#b30000] hover:via-[#cc0000] hover:to-[#b30000] text-white font-bold text-xl py-6 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-red-200/50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="h-6 w-6 mr-3 animate-spin flex items-center justify-center">⏳</span>
                          Bezig met betaling...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-6 w-6 mr-3" />
                          Betaal veilig via Mollie
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Je wordt veilig doorgestuurd naar onze betaalpartner
                      Mollie
                    </p>

                    <Dialog
                      open={showSpecificationModal}
                      onOpenChange={setShowSpecificationModal}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-[#d5c096]/30 text-[#d5c096] hover:bg-[#d5c096]/10 hover:border-[#d5c096] transition-all duration-300 rounded-xl py-3 font-semibold"
                        >
                          <FileText className="h-5 w-5 mr-2" />
                          Bekijk totaalspecificatie
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Totaalspecificatie van je configuratie
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Configuratie overzicht
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Profiel:</span>
                                <p className="font-medium">
                                  {configuration.profileType} -{" "}
                                  {configuration.color === "white"
                                    ? "Wit"
                                    : "Zwart"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Lengte:</span>
                                <p className="font-medium">
                                  {configuration.customLength ||
                                    configuration.length}{" "}
                                  cm
                                  {configuration.customLength && " (exact)"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Aantal:</span>
                                <p className="font-medium">
                                  {configuration.quantity} rail
                                  {configuration.quantity > 1 ? "s" : ""}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Montage:</span>
                                <p className="font-medium">
                                  {configuration.mounting === "ceiling"
                                    ? "Plafond"
                                    : configuration.mounting === "wall"
                                      ? "Wand"
                                      : "Niet geselecteerd"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-3 border-b">
                              <h4 className="font-semibold text-gray-900">
                                Gedetailleerde specificatie
                              </h4>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Product
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Beschrijving
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Eenheidsprijs
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Aantal
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Subtotaal
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {generateSpecificationItems().map(
                                    (item, index) => (
                                      <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                      >
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                          {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                          {item.description}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                          €{item.unitPrice.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                          {item.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                          €{item.total.toFixed(2)}
                                        </td>
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="px-4 py-3 text-sm font-bold text-gray-900 text-right"
                                    >
                                      Subtotaal (incl. 21% BTW):
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold text-[#d5c096] text-right">
                                      €{price.total.toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="px-4 py-3 text-sm font-bold text-gray-600 text-right"
                                    >
                                      Inclusief btw-bedrag:
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold text-gray-600 text-right">
                                      €
                                      {((price.total * 0.21) / 1.21).toFixed(2)}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <span className="h-5 w-5 text-blue-600 mt-0.5 flex items-center justify-center">ℹ️</span>
                              <div>
                                <p className="text-sm text-blue-800 font-medium">
                                  Informatie
                                </p>
                                <p className="text-sm text-blue-700 mt-1">
                                  Alle producten worden vakkundig op maat
                                  gezaagd in ons eigen atelier. Prijzen zijn
                                  exclusief BTW en verzendkosten. Levering
                                  binnen 5-7 werkdagen.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-[#d5c096]/10 border border-[#d5c096]/30 rounded-lg p-4">
                  <h4 className="font-semibold text-[#d5c096] mb-2">
                    Waarom KANIOU?
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Vakkundig op maat gezaagd in eigen atelier</li>
                    <li>✓ Inclusief exclusief, hoogwaardig montagemateriaal</li>
                    <li>✓ <strong>5 jaar</strong> premium garantie op kwaliteit & werking
                      <br /><small className="text-gray-500 ml-4">op de geselecteerde collectie</small></li>
                    <li>✓ Snelle, discrete en zorgvuldige levering</li>
                  </ul>
                </div>
                {/* Info Box */}
                <div className="bg-[#d5c096]/10 border border-[#d5c096]/30 rounded-lg p-4">
                  <h4 className="font-semibold text-[#d5c096] mb-2">
                    Waarom KANIOU?
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Vakkundig op maat gezaagd in eigen atelier</li>
                    <li>✓ Inclusief exclusief, hoogwaardig montagemateriaal</li>
                    <li>✓ <strong>5 jaar</strong> premium garantie op kwaliteit & werking
                      <br /><small className="text-gray-500 ml-4">op de geselecteerde collectie</small></li>
                    <li>✓ Snelle, discrete en zorgvuldige levering</li>
                  </ul>
                </div>
                {/* FAQ Section */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    Veelgestelde vragen over gordijnrails
                  </h2>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                    className="w-full"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        <strong>
                          1. Welk profiel moet ik kiezen: KS of DS?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Beide profielen zijn van hoge kwaliteit.
                          <br />– <strong>KS Rail</strong>: Stil, functioneel en
                          geschikt voor een minimalistische afwerking.
                          <br />– <strong>DS Rail</strong>: Luxueus open
                          profiel, perfect zichtbaar en ideaal voor
                          plafondmontage.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        <strong>
                          2. Is plafondmontage of wandmontage beter?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Plafondmontage zorgt voor een strakke, onzichtbare
                          afwerking. Wandmontage is geschikt wanneer directe
                          plafondmontage niet mogelijk is of extra ondersteuning
                          vereist is.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        <strong>
                          3. Hoeveel steunen of clips heb ik nodig?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Wij adviseren gemiddeld 2 steunen per meter voor een
                          veilige en stabiele bevestiging.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        <strong>4. Hoeveel glijders heb ik nodig?</strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          <strong>KS glijders:</strong> 10 stuks per meter (1
                          strip).
                          <br />
                          <strong>Wave glijders:</strong> Deel de breedte in cm
                          door 6. Voeg voor zekerheid altijd 2–4 extra glijders
                          toe.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        <strong>5. Kan ik de rail zelf monteren?</strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Ja, alle rails worden geleverd met professioneel
                          montagemateriaal. De montage is eenvoudig uit te
                          voeren met standaard gereedschap.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left">
                        <strong>
                          6. Kan ik achteraf nog aanpassingen maken?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Ja, het is altijd mogelijk om achteraf accessoires bij
                          te bestellen of aanpassingen te doen. Contacteer onze
                          service voor advies.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                      <AccordionTrigger className="text-left">
                        <strong>7. Is alles echt op maat gemaakt?</strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Absoluut. Iedere rail wordt nauwkeurig op maat gezaagd
                          in ons eigen atelier volgens de door jou ingevoerde
                          afmetingen.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GordijnrailsConfiguratorPage;
