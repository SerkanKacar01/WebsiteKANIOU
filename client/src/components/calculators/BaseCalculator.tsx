import React, { useState } from "react";
import { Link } from "wouter";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ChevronsUp, ChevronsDown } from "lucide-react";

// Types for calculator features and options
export interface CalculatorFeature {
  id: string;
  label: string;
  price: number;
  appliesTo?: string[]; // Optional array of product types this feature applies to
  description?: string;
}

export interface ProductCalculatorConfig {
  productId: string;
  productName: string;
  basePrice: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  defaultWidth: number;
  defaultHeight: number;
  features: CalculatorFeature[];
  calculatePrice: (values: CalculatorValues, config: ProductCalculatorConfig) => number;
  additionalFormFields?: React.ReactNode;
}

export interface CalculatorValues {
  width: number;
  height: number;
  features: string[];
  [key: string]: any; // For additional custom fields
}

interface BaseCalculatorProps {
  config: ProductCalculatorConfig;
  onCalculate?: (price: number, values: CalculatorValues) => void;
}

const BaseCalculator: React.FC<BaseCalculatorProps> = ({ config, onCalculate }) => {
  const { toast } = useToast();
  
  // Form state with defaults from config
  const [values, setValues] = useState<CalculatorValues>({
    width: config.defaultWidth,
    height: config.defaultHeight,
    features: [],
  });
  
  // Calculation result
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    setValues({
      ...values,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    setValues((prev) => {
      const newFeatures = prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId];
      
      return {
        ...prev,
        features: newFeatures,
      };
    });
  };

  const calculatePrice = () => {
    if (values.width <= 0 || values.height <= 0) {
      toast({
        title: "Ontbrekende gegevens",
        description: "Vul alle verplichte velden in om een schatting te krijgen.",
        variant: "destructive",
      });
      return;
    }

    // Use the custom calculation function from config
    const price = config.calculatePrice(values, config);
    
    // Set the calculated price (round to nearest whole number)
    const roundedPrice = Math.round(price);
    setCalculatedPrice(roundedPrice);
    setShowResult(true);
    
    // If onCalculate callback is provided, call it
    if (onCalculate) {
      onCalculate(roundedPrice, values);
    }
  };

  return (
    <div>
      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>Bereken uw {config.productName} prijs</CardTitle>
          <CardDescription>
            Geef de afmetingen en voorkeuren op om een prijsindicatie te krijgen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Width */}
            <div className="space-y-2">
              <Label htmlFor="width">Breedte (cm)</Label>
              <div className="flex items-center">
                <Input
                  id="width"
                  name="width"
                  type="number"
                  min={config.minWidth}
                  max={config.maxWidth}
                  value={values.width}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="flex flex-col ml-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setValues(prev => ({...prev, width: Math.min(config.maxWidth, prev.width + 1)}))}
                  >
                    <ChevronsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 mt-1"
                    onClick={() => setValues(prev => ({...prev, width: Math.max(config.minWidth, prev.width - 1)}))}
                  >
                    <ChevronsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label htmlFor="height">Hoogte (cm)</Label>
              <div className="flex items-center">
                <Input
                  id="height"
                  name="height"
                  type="number"
                  min={config.minHeight}
                  max={config.maxHeight}
                  value={values.height}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="flex flex-col ml-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setValues(prev => ({...prev, height: Math.min(config.maxHeight, prev.height + 1)}))}
                  >
                    <ChevronsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 mt-1"
                    onClick={() => setValues(prev => ({...prev, height: Math.max(config.minHeight, prev.height - 1)}))}
                  >
                    <ChevronsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Additional custom form fields if provided */}
            {config.additionalFormFields}

            {/* Optional Features */}
            {config.features.length > 0 && (
              <div className="space-y-2 md:col-span-2">
                <Label>Optionele kenmerken</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {config.features.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={values.features.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="cursor-pointer text-sm">
                        {feature.label} (+€{feature.price})
                        {feature.description && (
                          <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            type="button"
            onClick={calculatePrice}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
          >
            Bereken richtprijs
          </Button>
        </CardFooter>
      </Card>

      {/* Price Result */}
      {showResult && calculatedPrice !== null && (
        <Card className="border-neutral-200 shadow-sm mt-8 bg-neutral-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">Uw prijsindicatie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Geschatte prijs:</p>
                <p className="text-4xl font-bold text-primary">€{calculatedPrice}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Prijs inclusief confectie, exclusief ophangsysteem en installatiekosten.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Deze prijs is een indicatie en kan variëren afhankelijk van specifieke vereisten.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                    Vrijblijvende offerte aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BaseCalculator;