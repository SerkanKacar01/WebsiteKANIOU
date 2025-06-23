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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  FileText,
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
    basePrice: 73, // €73 per meter
  },
  {
    id: "opaque",
    name: "Opaque",
    description: "Maximale privacy, beperkt lichtinval",
    basePrice: 79, // €79 per meter
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
  const [showSpecificationModal, setShowSpecificationModal] = useState(false);
  const [lengthError, setLengthError] = useState("");
  const configuratorRef = useRef<HTMLDivElement>(null);
  
  const [configuration, setConfiguration] = useState<SquidConfiguration>({
    transparencyType: "",
    color: "",
    length: 0, // Start with empty input (no default value)
    quantity: 1,
    width: 137, // Fixed width
  });

  const BASE_PRICE_PER_METER = 73; // Base price per running meter

  const getAvailableColors = () => {
    if (configuration.transparencyType === "transparent") {
      return transparentColorOptions;
    } else if (configuration.transparencyType === "opaque") {
      return opaqueColorOptions;
    }
    return [];
  };

  // Reset color selection when transparency type changes
  useEffect(() => {
    if (configuration.transparencyType && configuration.color) {
      const availableColors = getAvailableColors();
      const isColorAvailable = availableColors.some(color => color.id === configuration.color);
      if (!isColorAvailable) {
        setConfiguration(prev => ({ ...prev, color: "" }));
      }
    }
  }, [configuration.transparencyType]);

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
      description: "Geef de gewenste lengte in (cm)",
      completed: configuration.length >= 100 && configuration.length <= 5500,
    },
    {
      id: 4,
      title: "Bestelling afronden",
      description: "Toevoegen aan winkelwagen",
      completed: false,
    },
  ];

  const calculatePrice = () => {
    if (configuration.length < 100) return 0; // Don't calculate price for invalid lengths
    
    const transparencyOption = transparencyOptions.find(t => t.id === configuration.transparencyType);
    const pricePerMeter = transparencyOption?.basePrice || 73;
    
    // Convert cm to meters for calculation: price_per_meter × (length / 100)
    const lengthInMeters = configuration.length / 100;
    const totalPrice = pricePerMeter * lengthInMeters;
    
    return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
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

  const handleMolliePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      const response = await fetch('/api/mollie/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculatePrice(),
          description: `SQUID Textielfolie - ${configuration.transparencyType} ${configuration.color} (${configuration.length}cm)`,
          redirectUrl: `${window.location.origin}/payment/success`,
          webhookUrl: `${window.location.origin}/api/mollie/webhook`,
          metadata: {
            productType: 'squid',
            configuration: JSON.stringify(configuration),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to Mollie checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Payment creation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Er is een fout opgetreden bij het aanmaken van de betaling. Probeer het opnieuw.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const validateLength = (length: number) => {
    if (length < 100) {
      setLengthError("Minimale afname is 100 cm. Voer een lengte in van 100 cm of meer.");
      return false;
    } else if (length > 5500) {
      setLengthError("Maximale lengte is 5500 cm. Voer een kortere lengte in.");
      return false;
    } else {
      setLengthError("");
      return true;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return !!configuration.transparencyType;
      case 2:
        return !!configuration.color;
      case 3:
        return configuration.length >= 100 && configuration.length <= 5500;
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
                                    €{option.basePrice}/meter
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
                              Geef de gewenste lengte in (cm)
                            </Label>
                            <div className="mt-2 flex items-center space-x-2">
                              <Input
                                id="length"
                                type="number"
                                min="100"
                                max="5500"
                                step="1"
                                value={configuration.length || ""}
                                placeholder=""
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0;
                                  setConfiguration({
                                    ...configuration,
                                    length: value,
                                  });
                                  validateLength(value);
                                }}
                                className={`text-lg font-medium ${lengthError ? "border-red-500 focus:border-red-500" : ""}`}
                              />
                              <span className="text-sm text-gray-600 font-medium">cm</span>
                            </div>
                            {lengthError && (
                              <p className="text-sm text-red-600 mt-1">{lengthError}</p>
                            )}
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Ruler className="h-4 w-4 text-blue-600" />
                              <p className="text-sm font-medium text-blue-900">Productspecificaties</p>
                            </div>
                            <p className="text-sm text-blue-700">
                              • Standaard breedte: 137 cm (vaste rolbreedte)<br />
                              • Minimale afname: 100 cm<br />
                              • Maximale afname: 5500 cm<br />
                              • Totale oppervlakte = lengte × 137 cm
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Bestelling afronden</h3>
                        <div className="space-y-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Uw configuratie:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Type:</span>
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
                                <span>Lengte:</span>
                                <span className="font-medium">{configuration.length}cm ({(configuration.length / 100).toFixed(2)}m)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Breedte:</span>
                                <span className="font-medium">137cm (standaard)</span>
                              </div>
                            </div>
                          </div>
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

              {/* Summary & Pricing */}
              <div className="space-y-6">
                {/* Configuration Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Jouw Configuratie
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {configuration.transparencyType && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {transparencyOptions.find(t => t.id === configuration.transparencyType)?.name}
                        </span>
                      </div>
                    )}

                    {configuration.color && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kleur:</span>
                        <span className="font-medium">
                          {getAvailableColors().find(c => c.id === configuration.color)?.name}
                        </span>
                      </div>
                    )}

                    {configuration.length >= 100 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lengte:</span>
                        <span className="font-medium">
                          {configuration.length} cm = {(configuration.length / 100).toFixed(2)}m
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Breedte:</span>
                      <span className="font-medium">137 cm (standaard)</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prijsoverzicht</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {configuration.length >= 100 ? (
                      <>
                        <div className="flex justify-between">
                          <span>
                            SQUID textielfolie ({(configuration.length / 100).toFixed(2)}m × 137cm)
                          </span>
                          <span>€{calculatePrice().toFixed(2)}</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                          <span>Totaalprijs</span>
                          <span className="text-[#d5c096]">
                            €{calculatePrice().toFixed(2)}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-500">
                          Inclusief btw-bedrag: €{(calculatePrice() * 0.21 / 1.21).toFixed(2)} • Levertijd: ±14 werkdagen
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Voer een geldige lengte in om de prijs te berekenen</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {currentStep === 4 && (
                  <div className="space-y-3">
                    {/* Mollie Payment Button */}
                    <Button 
                      onClick={handleMolliePayment}
                      disabled={isProcessingPayment}
                      className="w-full bg-[#cc0000] hover:bg-[#b30000] text-white font-semibold text-lg py-4 px-8 rounded-md"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Bezig met betaling...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Betaal veilig via Mollie
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Je wordt veilig doorgestuurd naar onze betaalpartner Mollie
                    </p>
                    
                    <Dialog
                      open={showSpecificationModal}
                      onOpenChange={setShowSpecificationModal}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Bekijk totaalspecificatie
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Totaalspecificatie van je SQUID configuratie
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Configuratie overzicht
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Type:</span>
                                <p className="font-medium">
                                  {transparencyOptions.find(t => t.id === configuration.transparencyType)?.name || "Niet geselecteerd"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Kleur:</span>
                                <p className="font-medium">
                                  {getAvailableColors().find(c => c.id === configuration.color)?.name || "Niet geselecteerd"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Lengte:</span>
                                <p className="font-medium">
                                  {configuration.length} cm ({(configuration.length / 100).toFixed(2)}m)
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Breedte:</span>
                                <p className="font-medium">137 cm (standaard)</p>
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
                                      Oppervlakte
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Subtotaal
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                      SQUID Textielfolie
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      {transparencyOptions.find(t => t.id === configuration.transparencyType)?.name} - {getAvailableColors().find(c => c.id === configuration.color)?.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                      €{(transparencyOptions.find(t => t.id === configuration.transparencyType)?.basePrice || 73).toFixed(2)}/m²
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                      {((configuration.length * 137) / 10000).toFixed(2)} m²
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                      €{calculatePrice().toFixed(2)}
                                    </td>
                                  </tr>
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
                                      €{calculatePrice().toFixed(2)}
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
                                      €{(calculatePrice() * 0.21 / 1.21).toFixed(2)}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm text-blue-800 font-medium">
                                  Informatie
                                </p>
                                <p className="text-sm text-blue-700 mt-1">
                                  SQUID textielfolie wordt vakkundig op maat gesneden in ons eigen atelier. 
                                  Prijzen zijn inclusief BTW. Levering binnen 14 werkdagen.
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
                    <li>✓ Vakkundig op maat gemaakt in eigen atelier</li>
                    <li>✓ Exclusief, hoogwaardig montagemateriaal</li>
                    <li>✓ 5 jaar garantie op kwaliteit & vakmanschap</li>
                    <li>✓ Snelle, discrete en zorgvuldige levering</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    Veelgestelde vragen over SQUID
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
                          1. Wat is het verschil tussen transparant en opaque?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          <strong>Transparant:</strong> Laat meer licht door en biedt minimale privacy - ideaal voor ruimtes waar je veel daglicht wilt behouden.
                          <br />
                          <strong>Opaque:</strong> Maximale privacy met beperkte lichtinval - perfect voor slaapkamers of kantoorruimtes waar volledige privacy gewenst is.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        <strong>
                          2. Hoe breng ik SQUID textielfolie aan?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          SQUID is zelfklevend en heel eenvoudig aan te brengen. Maak het raam schoon, 
                          verwijder de beschermfolie en plak het textiel vanaf één hoek aan. 
                          Strijk luchtbellen weg met een zachte doek.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        <strong>
                          3. Is SQUID geschikt voor alle raamtypes?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Ja, SQUID is geschikt voor alle gladde glasoppervlakken, inclusief dakramen, 
                          badkamerramen en keukenramen. Het textiel is hitte- en vochtbestendig.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        <strong>
                          4. Kan ik SQUID weer verwijderen zonder schade?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Absoluut! SQUID laat zich eenvoudig verwijderen zonder lijmresten 
                          of schade aan het raam. Het textiel is zelfs herbruikbaar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        <strong>
                          5. Welke afmetingen zijn mogelijk?
                        </strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          SQUID heeft een standaard rolbreedte van 137cm. De lengte is vrij te kiezen 
                          vanaf 100cm. Voor specifieke maatwerk wensen kunt u contact met ons opnemen.
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

export default SquidConfiguratorPage;