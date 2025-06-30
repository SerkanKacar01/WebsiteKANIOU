import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Package, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PRICE_MATRIX, getRollerBlindPrice, getAvailableWidths } from "@/data/rollerBlindPrices";

// Generate width options - now using data from external file
const generateWidthOptions = (): number[] => {
  return getAvailableWidths();
};

// Generate custom height options (200cm - 350cm in steps of 10cm)
const generateCustomHeightOptions = (): number[] => {
  const options: number[] = [];
  for (let height = 200; height <= 350; height += 10) {
    options.push(height);
  }
  return options;
};

interface SimpleRollerBlindConfiguratorProps {
  onPriceChange?: (price: number) => void;
  onConfigurationChange?: (config: ConfigurationState) => void;
}

interface ConfigurationState {
  width: number | null;
  heightType: "standard" | "custom";
  customHeight: number | null;
  price: number;
  priceKey: string;
}

const SimpleRollerBlindConfigurator: React.FC<SimpleRollerBlindConfiguratorProps> = ({
  onPriceChange,
  onConfigurationChange,
}) => {
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    width: null,
    heightType: "standard",
    customHeight: null,
    price: 0,
    priceKey: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const widthOptions = generateWidthOptions();
  const customHeightOptions = generateCustomHeightOptions();

  // Calculate price based on current configuration
  const calculatePrice = (config: ConfigurationState): { price: number; priceKey: string } => {
    if (!config.width) return { price: 0, priceKey: "" };
    
    const height = config.heightType === "standard" ? 190 : config.customHeight;
    if (!height) return { price: 0, priceKey: "" };
    
    const priceKey = `${config.width}_${height}`;
    const price = getRollerBlindPrice(config.width, height);
    
    return { price, priceKey };
  };

  // Update configuration and trigger callbacks
  const updateConfiguration = (updates: Partial<ConfigurationState>) => {
    setError(null);
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const newConfig = { ...configuration, ...updates };
      const { price, priceKey } = calculatePrice(newConfig);
      
      const finalConfig = {
        ...newConfig,
        price,
        priceKey,
      };
      
      setConfiguration(finalConfig);
      
      // Check if combination is valid
      if (finalConfig.width && (finalConfig.heightType === "standard" || finalConfig.customHeight)) {
        if (price === 0) {
          setError("Deze afmetingen zijn niet beschikbaar. Kies een andere combinatie.");
        } else {
          onPriceChange?.(price);
          onConfigurationChange?.(finalConfig);
        }
      }
      
      setIsLoading(false);
    }, 300);
  };

  const getSelectedHeight = (): number | null => {
    return configuration.heightType === "standard" ? 190 : configuration.customHeight;
  };

  const isConfigurationComplete = (): boolean => {
    return !!(
      configuration.width &&
      (configuration.heightType === "standard" || configuration.customHeight) &&
      configuration.price > 0
    );
  };

  const handleAddToCart = () => {
    if (!isConfigurationComplete()) {
      toast({
        title: "Configuratie onvolledig",
        description: "Selecteer eerst alle afmetingen voordat u het product toevoegt.",
        variant: "destructive",
      });
      return;
    }

    const height = getSelectedHeight();
    toast({
      title: "Toegevoegd aan winkelwagen",
      description: `Rolgordijn ${configuration.width}cm × ${height}cm voor €${configuration.price.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[#d5c096]" />
            Rolgordijn Configurator
          </CardTitle>
          <p className="text-sm text-gray-600">
            Kies uw gewenste afmetingen voor een directe prijsberekening
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Width Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Kies de gewenste breedte</Label>
            <Select
              value={configuration.width?.toString() || ""}
              onValueChange={(value) => updateConfiguration({ width: parseInt(value) })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecteer breedte..." />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {widthOptions.map((width) => (
                  <SelectItem key={width} value={width.toString()}>
                    {width} cm
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Height Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Kies de gewenste hoogte</Label>
            <RadioGroup
              value={configuration.heightType}
              onValueChange={(value: "standard" | "custom") => 
                updateConfiguration({ 
                  heightType: value, 
                  customHeight: value === "standard" ? null : configuration.customHeight 
                })
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="cursor-pointer font-medium">
                  Standaard hoogte 190 cm
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer font-medium">
                  Andere hoogte kiezen
                </Label>
              </div>
            </RadioGroup>

            {/* Custom Height Dropdown */}
            {configuration.heightType === "custom" && (
              <div className="ml-6 space-y-2">
                <Label className="text-sm text-gray-600">Selecteer gewenste hoogte:</Label>
                <Select
                  value={configuration.customHeight?.toString() || ""}
                  onValueChange={(value) => updateConfiguration({ customHeight: parseInt(value) })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecteer hoogte..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {customHeightOptions.map((height) => (
                      <SelectItem key={height} value={height.toString()}>
                        {height} cm
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Price Display */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Totaalprijs:</p>
                {configuration.width && getSelectedHeight() && (
                  <p className="text-xs text-gray-500">
                    {configuration.width}cm × {getSelectedHeight()}cm
                  </p>
                )}
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-500">Berekenen...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-[#d5c096]">
                    €{configuration.price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!isConfigurationComplete() || isLoading}
            className="w-full bg-[#d5c096] hover:bg-[#c5b086] text-white"
            size="lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isConfigurationComplete() 
              ? `Toevoegen aan winkelwagen - €${configuration.price.toFixed(2)}`
              : "Selecteer alle afmetingen"
            }
          </Button>

          {/* Configuration Summary */}
          {isConfigurationComplete() && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium text-gray-900">Configuratie overzicht:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Breedte: {configuration.width} cm</p>
                <p>• Hoogte: {getSelectedHeight()} cm</p>
                <p>• Prijs matrix code: {configuration.priceKey}</p>
                <p>• Totale prijs: €{configuration.price.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleRollerBlindConfigurator;