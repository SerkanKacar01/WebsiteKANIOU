import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingCart, 
  FileText, 
  Info,
  Ruler,
  Settings,
  Wrench,
  Package
} from "lucide-react";
import { Link } from "wouter";

interface ConfigStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface Configuration {
  profileType: string;
  color: string;
  length: number;
  quantity: number;
  corners: string;
  mounting: string;
  accessories: string[];
}

const GordijnrailsConfiguratorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuration, setConfiguration] = useState<Configuration>({
    profileType: "",
    color: "",
    length: 200,
    quantity: 1,
    corners: "none",
    mounting: "",
    accessories: []
  });

  const steps: ConfigStep[] = [
    { id: 1, title: "Kies profieltype", description: "Selecteer KS of DS rail", completed: !!configuration.profileType },
    { id: 2, title: "Kies lengte", description: "Op maat gezaagd", completed: configuration.length > 0 },
    { id: 3, title: "Kies aantal", description: "Aantal railstukken", completed: configuration.quantity > 0 },
    { id: 4, title: "Kies bochten", description: "Optioneel", completed: !!configuration.corners },
    { id: 5, title: "Kies montage", description: "Montagemateriaal", completed: !!configuration.mounting },
    { id: 6, title: "Kies accessoires", description: "Bediening & extra's", completed: true }
  ];

  // Pricing calculations
  const calculatePrice = () => {
    let basePrice = 8.95 * (configuration.length / 100) * configuration.quantity;
    let extras = 0;

    // Corner pricing
    if (configuration.corners === "inner" || configuration.corners === "outer") {
      extras += 14.95;
    }

    // Mounting pricing
    if (configuration.mounting === "wall") {
      const supports = Math.ceil(configuration.length / 100) + 1;
      extras += supports * 1.50;
    }

    // Accessories pricing
    if (configuration.accessories.includes("cord")) {
      extras += 6.95;
    }

    return {
      base: basePrice,
      extras: extras,
      total: basePrice + extras
    };
  };

  const price = calculatePrice();

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateConfiguration = (key: keyof Configuration, value: any) => {
    setConfiguration(prev => ({ ...prev, [key]: value }));
  };

  const toggleAccessory = (accessory: string) => {
    setConfiguration(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies je profieltype</h3>
              <p className="text-gray-600">Selecteer het gewenste railprofiel en kleur</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* KS Rails */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-center">KS Rail - Stil & Functioneel</h4>
                <div className="grid gap-3">
                  <Card 
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "KS" && configuration.color === "white"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "KS");
                      updateConfiguration("color", "white");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-white border rounded-lg mb-3 flex items-center justify-center">
                        <div className="w-12 h-2 bg-gray-100 rounded"></div>
                      </div>
                      <p className="font-medium">KS Rail - Wit</p>
                      <p className="text-sm text-gray-600">Stil lopend, functioneel profiel</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "KS" && configuration.color === "black"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "KS");
                      updateConfiguration("color", "black");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-gray-800 border rounded-lg mb-3 flex items-center justify-center">
                        <div className="w-12 h-2 bg-gray-700 rounded"></div>
                      </div>
                      <p className="font-medium">KS Rail - Zwart</p>
                      <p className="text-sm text-gray-600">Stil lopend, functioneel profiel</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* DS Rails */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-center">DS Rail - Design & Stijl</h4>
                <div className="grid gap-3">
                  <Card 
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "DS" && configuration.color === "white"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "DS");
                      updateConfiguration("color", "white");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-white border rounded-lg mb-3 flex items-center justify-center">
                        <div className="w-12 h-3 bg-gray-100 rounded border-2 border-gray-200"></div>
                      </div>
                      <p className="font-medium">DS Rail - Wit</p>
                      <p className="text-sm text-gray-600">Design rail met open profiel</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 transition-all ${
                      configuration.profileType === "DS" && configuration.color === "black"
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => {
                      updateConfiguration("profileType", "DS");
                      updateConfiguration("color", "black");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-gray-800 border rounded-lg mb-3 flex items-center justify-center">
                        <div className="w-12 h-3 bg-gray-700 rounded border-2 border-gray-600"></div>
                      </div>
                      <p className="font-medium">DS Rail - Zwart</p>
                      <p className="text-sm text-gray-600">Design rail met open profiel</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>KS = Stil en functioneel</strong> | <strong>DS = Design rail met open profiel</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Beide rails worden volledig op maat gezaagd en geleverd met professioneel montagemateriaal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies de lengte</h3>
              <p className="text-gray-600">Op maat gezaagd zonder extra kosten</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#d5c096] mb-2">
                    {configuration.length} cm
                  </div>
                  <p className="text-gray-600">Gewenste raillengte</p>
                </div>

                <div className="px-4">
                  <Slider
                    value={[configuration.length]}
                    onValueChange={([value]) => updateConfiguration("length", value)}
                    min={100}
                    max={600}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>100 cm</span>
                    <span>600 cm</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[150, 200, 250, 300, 350, 400].map((length) => (
                    <Button
                      key={length}
                      variant={configuration.length === length ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateConfiguration("length", length)}
                      className={configuration.length === length ? "bg-[#d5c096] hover:bg-[#c4b183]" : ""}
                    >
                      {length} cm
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800">
                  <strong>Gratis op maat zagen:</strong> Elke rail wordt precies op de door u opgegeven maat gezaagd.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies aantal railstukken</h3>
              <p className="text-gray-600">Hoeveel rails heeft u nodig?</p>
            </div>

            <div className="max-w-xs mx-auto">
              <Select
                value={configuration.quantity.toString()}
                onValueChange={(value) => updateConfiguration("quantity", parseInt(value))}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Selecteer aantal" />
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
                {configuration.quantity} × {configuration.length} cm
              </div>
              <p className="text-gray-600 mt-1">Totale raillengte: {configuration.quantity * configuration.length} cm</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies gewenste bochten</h3>
              <p className="text-gray-600">Optioneel - voor hoeken en bochten</p>
            </div>

            <RadioGroup
              value={configuration.corners}
              onValueChange={(value) => updateConfiguration("corners", value)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">Geen bocht</p>
                        <p className="text-sm text-gray-600">Rechte rail zonder bochten</p>
                        <p className="text-sm font-medium text-green-600">Gratis</p>
                      </div>
                    </Label>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inner" id="inner" />
                    <Label htmlFor="inner" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">Binnenbocht 90°</p>
                        <p className="text-sm text-gray-600">Voor binnen hoeken</p>
                        <p className="text-sm font-medium text-[#d5c096]">+ €14,95</p>
                      </div>
                    </Label>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outer" id="outer" />
                    <Label htmlFor="outer" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">Buitenbocht 90°</p>
                        <p className="text-sm text-gray-600">Voor buiten hoeken</p>
                        <p className="text-sm font-medium text-[#d5c096]">+ €14,95</p>
                      </div>
                    </Label>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">Op maat gebogen</p>
                        <p className="text-sm text-gray-600">Speciale bocht op aanvraag</p>
                        <p className="text-sm font-medium text-blue-600">Op aanvraag</p>
                      </div>
                    </Label>
                  </div>
                </Card>
              </div>
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies montagemateriaal</h3>
              <p className="text-gray-600">Hoe wilt u de rail bevestigen?</p>
            </div>

            <RadioGroup
              value={configuration.mounting}
              onValueChange={(value) => updateConfiguration("mounting", value)}
              className="space-y-4"
            >
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ceiling" id="ceiling" />
                  <Label htmlFor="ceiling" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Plafondmontage</p>
                      <p className="text-sm text-gray-600">Inclusief plafondclips en schroeven</p>
                      <p className="text-sm font-medium text-green-600">Inclusief</p>
                    </div>
                  </Label>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wall" id="wall" />
                  <Label htmlFor="wall" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Wandmontage</p>
                      <p className="text-sm text-gray-600">Met wandsteunen en bevestigingsmateriaal</p>
                      <p className="text-sm font-medium text-[#d5c096]">+ €{(Math.ceil(configuration.length / 100) + 1) * 1.50}</p>
                    </div>
                  </Label>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rail-only" id="rail-only" />
                  <Label htmlFor="rail-only" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Alleen rail</p>
                      <p className="text-sm text-gray-600">Zonder montagemateriaal</p>
                      <p className="text-sm font-medium text-green-600">Basis prijs</p>
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
                    <strong>Professioneel montagemateriaal:</strong> Al onze bevestigingsmaterialen zijn van hoge kwaliteit en geschikt voor verschillende wandtypes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Kies bediening & accessoires</h3>
              <p className="text-gray-600">Optionele toevoegingen voor extra gemak</p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-[#d5c096] rounded flex items-center justify-center">
                      {configuration.accessories.includes("cord") && (
                        <Check className="h-3 w-3 text-[#d5c096]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Koordbediening</p>
                      <p className="text-sm text-gray-600">Links of rechts bedienbaar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#d5c096]">+ €6,95</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAccessory("cord")}
                      className={configuration.accessories.includes("cord") ? "bg-[#d5c096]/10 border-[#d5c096]" : ""}
                    >
                      {configuration.accessories.includes("cord") ? "Toegevoegd" : "Toevoegen"}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-[#d5c096] rounded flex items-center justify-center">
                      {configuration.accessories.includes("endstop") && (
                        <Check className="h-3 w-3 text-[#d5c096]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Eindstop</p>
                      <p className="text-sm text-gray-600">Voorkomt het van de rail lopen</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Inclusief</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAccessory("endstop")}
                      className={configuration.accessories.includes("endstop") ? "bg-[#d5c096]/10 border-[#d5c096]" : ""}
                    >
                      {configuration.accessories.includes("endstop") ? "Toegevoegd" : "Toevoegen"}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-[#d5c096] rounded flex items-center justify-center">
                      {configuration.accessories.includes("endcap") && (
                        <Check className="h-3 w-3 text-[#d5c096]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Einddeksel</p>
                      <p className="text-sm text-gray-600">Nette afwerking van de raileinden</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Inclusief</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAccessory("endcap")}
                      className={configuration.accessories.includes("endcap") ? "bg-[#d5c096]/10 border-[#d5c096]" : ""}
                    >
                      {configuration.accessories.includes("endcap") ? "Toegevoegd" : "Toevoegen"}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-[#d5c096] rounded flex items-center justify-center">
                      {configuration.accessories.includes("connector") && (
                        <Check className="h-3 w-3 text-[#d5c096]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Overgangsconnector</p>
                      <p className="text-sm text-gray-600">Voor het verbinden van meerdere rails</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Inclusief</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAccessory("connector")}
                      className={configuration.accessories.includes("connector") ? "bg-[#d5c096]/10 border-[#d5c096]" : ""}
                    >
                      {configuration.accessories.includes("connector") ? "Toegevoegd" : "Toevoegen"}
                    </Button>
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
        <meta name="description" content="Configureer je perfecte gordijnrail. KS & DS profielen in wit en zwart, op maat gezaagd vanaf €8,95 per meter. Inclusief montagemateriaal." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="pt-8 pb-12">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/producten" className="inline-flex items-center text-[#d5c096] hover:text-[#c4b183] mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar producten
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Gordijnrails Configurator
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stel je perfecte gordijnrail samen. KS & DS profielen, volledig op maat en inclusief professioneel montagemateriaal.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.id === currentStep
                        ? "bg-[#d5c096] text-white"
                        : step.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {step.completed && step.id !== currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${
                        step.id === currentStep ? "text-[#d5c096]" : "text-gray-600"
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`absolute h-px w-16 ${
                        step.completed ? "bg-green-500" : "bg-gray-200"
                      }`} style={{ 
                        left: `${((index + 1) / steps.length) * 100 - 5}%`,
                        top: "20px"
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Configuration Steps */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Stap {currentStep} van 6
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderStep()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Vorige
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={currentStep === 6}
                        className="bg-[#d5c096] hover:bg-[#c4b183]"
                      >
                        Volgende
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
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
                    {configuration.profileType && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profiel:</span>
                        <span className="font-medium">
                          {configuration.profileType} - {configuration.color === "white" ? "Wit" : "Zwart"}
                        </span>
                      </div>
                    )}
                    
                    {configuration.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lengte:</span>
                        <span className="font-medium">{configuration.length} cm</span>
                      </div>
                    )}
                    
                    {configuration.quantity > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aantal:</span>
                        <span className="font-medium">{configuration.quantity} rail{configuration.quantity > 1 ? "s" : ""}</span>
                      </div>
                    )}
                    
                    {configuration.corners !== "none" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bochten:</span>
                        <span className="font-medium">
                          {configuration.corners === "inner" ? "Binnenbocht 90°" :
                           configuration.corners === "outer" ? "Buitenbocht 90°" :
                           configuration.corners === "custom" ? "Op maat gebogen" : "Geen"}
                        </span>
                      </div>
                    )}
                    
                    {configuration.mounting && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montage:</span>
                        <span className="font-medium">
                          {configuration.mounting === "ceiling" ? "Plafond" :
                           configuration.mounting === "wall" ? "Wand" : "Alleen rail"}
                        </span>
                      </div>
                    )}
                    
                    {configuration.accessories.length > 0 && (
                      <div>
                        <span className="text-gray-600">Accessoires:</span>
                        <div className="mt-1">
                          {configuration.accessories.map((acc) => (
                            <Badge key={acc} variant="secondary" className="mr-1 mb-1">
                              {acc === "cord" ? "Koordbediening" :
                               acc === "endstop" ? "Eindstop" :
                               acc === "endcap" ? "Einddeksel" :
                               acc === "connector" ? "Connector" : acc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prijsoverzicht</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Basis rail ({configuration.length} cm × {configuration.quantity})</span>
                      <span>€{price.base.toFixed(2)}</span>
                    </div>
                    
                    {price.extras > 0 && (
                      <>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Extra opties</span>
                          <span>€{price.extras.toFixed(2)}</span>
                        </div>
                        <Separator />
                      </>
                    )}
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Totaalprijs</span>
                      <span className="text-[#d5c096]">€{price.total.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Excl. BTW en verzendkosten
                    </p>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {currentStep === 6 && (
                  <div className="space-y-3">
                    <Button className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Voeg toe aan offerte
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Bekijk totaalspecificatie
                    </Button>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-[#d5c096]/10 border border-[#d5c096]/30 rounded-lg p-4">
                  <h4 className="font-semibold text-[#d5c096] mb-2">Waarom KANIOU?</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Gratis op maat zagen</li>
                    <li>✓ Professioneel montagemateriaal</li>
                    <li>✓ 5 jaar garantie</li>
                    <li>✓ Snelle levering</li>
                  </ul>
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