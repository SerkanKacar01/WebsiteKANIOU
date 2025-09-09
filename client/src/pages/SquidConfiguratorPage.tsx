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
import coalImage from "@assets/COAL_1750708862088.png";
import boneImage from "@assets/BONE_1750708862088.png";
import chalkImage from "@assets/CHALK_1750708862088.png";
import oakImage from "@assets/OAK_1750708862089.png";
import rockImage from "@assets/ROCK_1750708862089.png";
import ashImage from "@assets/ASH_1750708862089.png";
import squidHeroImage from "@assets/SQUID cover_1750792481675.png";
import squidSampleImage from "@assets/SQUID_1750711425584.jpg";
import installationStep1 from "@assets/Installatie deel 1_1750712733656.jpg";
import installationStep2 from "@assets/Installatie deel 2_1750712733656.jpg";
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
    basePrice: 69.9, // €69.90 per meter
  },
  {
    id: "opaque",
    name: "Opaque",
    description: "Maximale privacy, beperkt lichtinval",
    basePrice: 79.9, // €79.90 per meter
  },
];

const colorOptions = [
  { id: "coal", name: "Coal", image: coalImage },
  { id: "rock", name: "Rock", image: rockImage },
  { id: "oak", name: "Oak", image: oakImage },
  { id: "ash", name: "Ash", image: ashImage },
  { id: "bone", name: "Bone", image: boneImage },
  { id: "chalk", name: "Chalk", image: chalkImage },
];

const SquidConfiguratorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showSpecificationModal, setShowSpecificationModal] = useState(false);
  const [lengthError, setLengthError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showInstallationGuide, setShowInstallationGuide] = useState(false);
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
    // All colors are available for both transparency types
    return colorOptions;
  };

  // No need to reset color selection since all colors are available for both types

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
      description: "Offerte aanvragen",
      completed: false,
    },
  ];

  const calculatePrice = () => {
    if (configuration.length < 100) return 0; // Don't calculate price for invalid lengths

    const transparencyOption = transparencyOptions.find(
      (t) => t.id === configuration.transparencyType,
    );
    const pricePerMeter = transparencyOption?.basePrice || 69.9;

    // Convert cm to meters for calculation: price_per_meter × (length / 100)
    const lengthInMeters = configuration.length / 100;
    const totalPrice = pricePerMeter * lengthInMeters;

    return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      configuratorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      configuratorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleMolliePayment = async () => {
    setIsProcessingPayment(true);

    try {
      const response = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: calculatePrice(),
          description: `SQUID Textielfolie - ${configuration.transparencyType} ${configuration.color} (${configuration.length}cm)`,
          redirectUrl: `${window.location.origin}/payment/success`,
          webhookUrl: `${window.location.origin}/api/mollie/webhook`,
          metadata: {
            productType: "squid",
            configuration: JSON.stringify(configuration),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to Mollie checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Payment creation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Er is een fout opgetreden bij het aanmaken van de betaling. Probeer het opnieuw.",
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const validateLength = (length: number) => {
    if (length < 100) {
      setLengthError("De lengte moet minimaal 100 cm zijn");
      return false;
    } else if (length > 5500) {
      setLengthError("De lengte mag maximaal 5500 cm zijn");
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

      {/* SQUID Hero Image Section */}
      <div className="w-full">
        <img
          src={squidHeroImage}
          alt="SQUID textielfolie toegepast op ramen en schuifdeuren – collage"
          className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
          key="squid-hero-image-updated"
        />
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                SQUID Textielfolie Configurator
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Configureer uw SQUID textielfolie op maat voor de perfecte
                pasvorm en privacy
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
                        <h3 className="text-lg font-semibold mb-4">
                          Kies transparantie type
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                          Klik op een afbeelding om de transparantie te
                          selecteren. Klik nogmaals voor een grotere preview.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {transparencyOptions.map((option) => (
                            <div
                              key={option.id}
                              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                configuration.transparencyType === option.id
                                  ? "border-[#d5c096] ring-2 ring-[#d5c096] ring-opacity-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => {
                                if (
                                  configuration.transparencyType === option.id
                                ) {
                                  // Open preview if already selected
                                  setPreviewImage(squidSampleImage);
                                } else {
                                  // Select this option
                                  setConfiguration({
                                    ...configuration,
                                    transparencyType: option.id,
                                  });
                                }
                              }}
                            >
                              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                <img
                                  src={squidSampleImage}
                                  alt="SQUID sample image – transparency options"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4 bg-white">
                                <h4 className="font-semibold text-lg mb-2">
                                  {option.name}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {option.description}
                                </p>
                                <p className="text-sm font-medium text-[#d5c096]">
                                  €{option.basePrice}/meter
                                </p>
                              </div>
                              {configuration.transparencyType === option.id && (
                                <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Kies kleur
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                          Klik op een kleur om deze te selecteren. Klik nogmaals
                          voor een grotere preview.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {getAvailableColors().map((color) => (
                            <div
                              key={color.id}
                              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                configuration.color === color.id
                                  ? "border-[#d5c096] ring-2 ring-[#d5c096] ring-opacity-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => {
                                if (configuration.color === color.id) {
                                  // Open preview if already selected
                                  setPreviewImage(color.image);
                                } else {
                                  // Select this color
                                  setConfiguration({
                                    ...configuration,
                                    color: color.id,
                                  });
                                }
                              }}
                            >
                              <div className="aspect-square bg-gray-100">
                                <img
                                  src={color.image}
                                  alt={`${color.name} kleur voorbeeld`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3 bg-white">
                                <p className="font-medium text-center">
                                  {color.name}
                                </p>
                              </div>
                              {configuration.color === color.id && (
                                <div className="absolute top-2 right-2 bg-[#d5c096] text-white rounded-full p-1">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Bepaal lengte
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="length"
                              className="text-sm font-medium"
                            >
                              Geef de gewenste lengte in (cm)
                            </Label>
                            <div className="mt-2 flex items-center space-x-2">
                              <Input
                                id="length"
                                type="number"
                                min="100"
                                max="5500"
                                step="1"
                                value={
                                  configuration.length > 0
                                    ? configuration.length
                                    : ""
                                }
                                placeholder=""
                                onChange={(e) => {
                                  const value = e.target.value
                                    ? parseInt(e.target.value)
                                    : 0;
                                  setConfiguration({
                                    ...configuration,
                                    length: value,
                                  });
                                  if (e.target.value) {
                                    validateLength(value);
                                  } else {
                                    setLengthError("");
                                  }
                                }}
                                className={`text-lg font-medium ${lengthError ? "border-red-500 focus:border-red-500" : ""}`}
                              />
                              <span className="text-sm text-gray-600 font-medium">
                                cm
                              </span>
                            </div>
                            {lengthError && (
                              <p className="text-sm text-red-600 mt-1">
                                {lengthError}
                              </p>
                            )}
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Ruler className="h-4 w-4 text-blue-600" />
                              <p className="text-sm font-medium text-blue-900">
                                Productspecificaties
                              </p>
                            </div>
                            <p className="text-sm text-blue-700">
                              • Standaard breedte: 137 cm (vaste rolbreedte)
                              <br />
                              • Minimale afname: 100 cm
                              <br />
                              • Maximale afname: 5500 cm
                              <br />• Totale oppervlakte = lengte × 137 cm
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Bestelling afronden
                        </h3>
                        <div className="space-y-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">
                              Uw configuratie:
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Type:</span>
                                <span className="font-medium">
                                  {
                                    transparencyOptions.find(
                                      (t) =>
                                        t.id === configuration.transparencyType,
                                    )?.name
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Kleur:</span>
                                <span className="font-medium">
                                  {
                                    getAvailableColors().find(
                                      (c) => c.id === configuration.color,
                                    )?.name
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lengte:</span>
                                <span className="font-medium">
                                  {configuration.length}cm (
                                  {(configuration.length / 100).toFixed(2)}m)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Breedte:</span>
                                <span className="font-medium">
                                  137cm (standaard)
                                </span>
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

                      {currentStep < 4 ? (
                        <Button
                          onClick={nextStep}
                          disabled={!canProceedToNext()}
                          className="bg-[#d5c096] hover:bg-[#c4b183] text-white flex items-center gap-2"
                        >
                          Volgende
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Gebruik de betalingsopties hiernaast →
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Resources Section - Moved from right sidebar */}
                <div className="mt-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Aanvullende productinformatie
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Installation Instructions */}
                      <div className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="text-blue-600">🔧</div>
                        <div className="flex-1">
                          <a
                            href="https://squid-textiles.com/nl-be/pages/installatie-textiel-raamfolie"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                          >
                            Bekijk installatie-instructies op Squid's officiële
                            website
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            Stap-voor-stap handleiding voor het aanbrengen van
                            SQUID
                          </p>
                        </div>
                      </div>

                      {/* Technical Datasheet - Transparent */}
                      <div className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="text-green-600">📄</div>
                        <div className="flex-1">
                          <a
                            href="https://cdn.shopify.com/s/files/1/0568/1971/2157/files/Squid-EN_TechDS_v319.pdf?v=1623600584"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 font-medium hover:underline"
                          >
                            Download technische specificaties - Transparant
                            (PDF)
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            Volledige technische informatie voor transparante
                            versie
                          </p>
                        </div>
                      </div>

                      {/* Technical Datasheet - Opaque */}
                      <div className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors md:col-span-2">
                        <div className="text-purple-600">📄</div>
                        <div className="flex-1">
                          <a
                            href="https://cdn.shopify.com/s/files/1/0568/1971/2157/files/Squid_Opaque-EN_TechDS_v01_00.pdf?v=1671813986"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                          >
                            Download technische specificaties - Opaque (PDF)
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            Volledige technische informatie voor opaque versie
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                          {
                            transparencyOptions.find(
                              (t) => t.id === configuration.transparencyType,
                            )?.name
                          }
                        </span>
                      </div>
                    )}

                    {configuration.color && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kleur:</span>
                        <span className="font-medium">
                          {
                            getAvailableColors().find(
                              (c) => c.id === configuration.color,
                            )?.name
                          }
                        </span>
                      </div>
                    )}

                    {configuration.length >= 100 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lengte:</span>
                        <span className="font-medium">
                          {configuration.length} cm ={" "}
                          {(configuration.length / 100).toFixed(2)}m
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Breedte:</span>
                      <span className="font-medium">130 cm (standaard)</span>
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
                            SQUID textielfolie (
                            {(configuration.length / 100).toFixed(2)}m × 137cm)
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
                          Inclusief btw-bedrag: €
                          {((calculatePrice() * 0.21) / 1.21).toFixed(2)} •
                          Levertijd: ±14 werkdagen
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">
                          Voer een geldige lengte in om de prijs te berekenen
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons - Always visible */}
                <div className="space-y-3">
                  {/* Mollie Payment Button */}
                  <Button
                    onClick={handleMolliePayment}
                    disabled={isProcessingPayment || !canProceedToNext()}
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
                                {transparencyOptions.find(
                                  (t) =>
                                    t.id === configuration.transparencyType,
                                )?.name || "Niet geselecteerd"}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Kleur:</span>
                              <p className="font-medium">
                                {getAvailableColors().find(
                                  (c) => c.id === configuration.color,
                                )?.name || "Niet geselecteerd"}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Lengte:</span>
                              <p className="font-medium">
                                {configuration.length >= 100
                                  ? `${configuration.length} cm (${(configuration.length / 100).toFixed(2)}m)`
                                  : "Niet ingevuld"}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Breedte:</span>
                              <p className="font-medium">137 cm (standaard)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Waarom KANIOU? info box */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Waarom KANIOU?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Vakkundig op maat gemaakt in eigen atelier</li>
                      <li>✓ Exclusief hoogwaardige materialen</li>
                      <li>✓ <strong>5 jaar</strong> garantie op kwaliteit & materialen
                        <br /><small className="text-gray-500 ml-4">op de geselecteerde collectie</small></li>
                      <li>✓ Snelle, discrete en zorgvuldige levering</li>
                    </ul>
                  </CardContent>
                </Card>

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
                          <strong>Transparant:</strong> Laat meer licht door en
                          biedt minimale privacy - ideaal voor ruimtes waar je
                          veel daglicht wilt behouden.
                          <br />
                          <strong>Opaque:</strong> Maximale privacy met beperkte
                          lichtinval - perfect voor slaapkamers of
                          kantoorruimtes waar volledige privacy gewenst is.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        <strong>2. Hoe eenvoudig is de installatie?</strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          SQUID is zelfklevend en zeer eenvoudig aan te brengen.
                          Het vereist geen gereedschap en kan door iedereen
                          worden geïnstalleerd. De folie plakt direct op het
                          glas en is perfect repositioneerbaar tijdens het
                          aanbrengen.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        <strong>3. Wat zijn de voordelen van SQUID?</strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          SQUID biedt warmtereflectie, UV-bescherming, privacy
                          overdag met zicht naar buiten, en heeft een elegante
                          linnenstructuur. Het is geschikt voor alle raamtypen
                          inclusief dakramen en vochtige ruimtes zoals
                          badkamers.
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
                          Absoluut! SQUID laat zich eenvoudig verwijderen zonder
                          lijmresten of schade aan het raam. Het textiel is
                          zelfs herbruikbaar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        <strong>5. Welke afmetingen zijn mogelijk?</strong>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          SQUID heeft een standaard rolbreedte van 137cm. De
                          lengte is vrij te kiezen vanaf 100cm tot 5500cm. Voor
                          specifieke maatwerk wensen kunt u contact met ons
                          opnemen.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Installation Guide Section */}
                <div className="mt-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      SQUID zelf installeren?
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Bekijk stap voor stap hoe u SQUID textielfolie eenvoudig zelf aanbrengt.
                    </p>
                    <Button
                      onClick={() => setShowInstallationGuide(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
                    >
                      📋 Bekijk de Installatiegids
                    </Button>
                  </div>
                </div>

                {/* Installation Guide Modal */}
                <Dialog open={showInstallationGuide} onOpenChange={setShowInstallationGuide}>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">
                        SQUID Installatiegids
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      {/* Installation Step 1 */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-center">Stap 1: Voorbereiding en bevestiging</h3>
                        <img 
                          src={installationStep1}
                          alt="SQUID installatiegids stap 1 – voorbereiding en bevestiging"
                          className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => window.open(installationStep1, '_blank')}
                        />
                      </div>
                      
                      {/* Installation Step 2 */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-center">Stap 2: Afwerking en tips</h3>
                        <img 
                          src={installationStep2}
                          alt="SQUID installatiegids stap 2 – afwerking en tips"
                          className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => window.open(installationStep2, '_blank')}
                        />
                      </div>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-600">
                      <p>💡 Tip: Klik op een afbeelding om deze in volledig scherm te bekijken</p>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Image Preview Modal */}
                <Dialog
                  open={!!previewImage}
                  onOpenChange={() => setPreviewImage(null)}
                >
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Preview</DialogTitle>
                    </DialogHeader>
                    {previewImage && (
                      <div className="aspect-square">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SquidConfiguratorPage;
