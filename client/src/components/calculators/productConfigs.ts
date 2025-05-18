import { ProductCalculatorConfig, CalculatorValues, CalculatorFeature } from './BaseCalculator';

// Feature creator functions to ensure unique objects for each product
// This prevents shared references that would cause updates to one product to affect others
const createFeature = (id: string, label: string, price: number, description: string): CalculatorFeature => {
  return { id, label, price, description };
};

// Overgordijnen (Curtains) Calculator Config
export const overgordijnenConfig: ProductCalculatorConfig = {
  productId: "overgordijnen",
  productName: "Overgordijnen",
  basePrice: 40, // Base price per linear meter including confection
  minWidth: 30,
  maxWidth: 600,
  minHeight: 40,
  maxHeight: 350,
  defaultWidth: 150,
  defaultHeight: 250,
  features: [
    createFeature("enkelevoudige_plooi", "Enkelvoudige plooi (standaard)", 0, "Standaard plooien zonder meerprijs"),
    createFeature("dubbele_plooi", "Dubbele plooi", 0, "Elegante dubbele plooien (+10%)"),
    createFeature("driedubbele_plooi", "Driedubbele plooi", 0, "Luxe driedubbele plooien (+15%)"),
    createFeature("wave_plooi", "Wave plooi", 0, "Moderne wave plooien (+20%)"),
    createFeature("thermal", "Thermisch isolerend", 40, "Verbeterde isolatiewaarde"),
    createFeature("blackout", "Verduisterend", 35, "Volledig lichtdicht materiaal"),
    createFeature("sound_dampening", "Geluiddempend", 45, "Verbeterde akoestiek"),
    createFeature("custom_color", "Kleur op maat", 25, "Speciale kleuren op aanvraag"),
    createFeature("lining", "Luxe voering", 30, "Extra voering voor betere isolatie"),
    createFeature("installation", "Professionele installatie", 80, "Inclusief montage"),
  ],
  calculatePrice: (values: CalculatorValues, config: ProductCalculatorConfig) => {
    // Apply minimum width rule (100 cm)
    const effectiveWidth = Math.max(values.width, 100);
    
    // Calculate base price: width in meters × €40
    const finalWidth = effectiveWidth / 100; // Convert to meters
    let totalPrice = config.basePrice * finalWidth;
    
    // Apply pleat adjustment percentages
    if (values.features.includes("dubbele_plooi")) {
      totalPrice *= 1.10; // 10% increase for double pleats
    } else if (values.features.includes("driedubbele_plooi")) {
      totalPrice *= 1.15; // 15% increase for triple pleats
    } else if (values.features.includes("wave_plooi")) {
      totalPrice *= 1.20; // 20% increase for wave pleats
    }
    
    // Add optional features
    values.features.forEach((featureId) => {
      const feature = config.features.find((f) => f.id === featureId);
      if (feature && feature.price > 0) { // Skip pleat types as they're already calculated
        // Add fixed-price features
        totalPrice += feature.price;
      }
    });

    return totalPrice;
  }
};

// Rolgordijnen (Roller Blinds) Calculator Config
export const rolgordijnenConfig: ProductCalculatorConfig = {
  productId: "rolgordijnen",
  productName: "Rolgordijnen",
  basePrice: 40, // Base price per square meter
  minWidth: 30,
  maxWidth: 300,
  minHeight: 30,
  maxHeight: 300,
  defaultWidth: 100,
  defaultHeight: 180,
  features: [
    createFeature("motorized", "Gemotoriseerd", 120, "Elektrische bediening voor gemak"),
    createFeature("remote", "Afstandsbediening", 35, "Draadloze afstandsbediening"),
    createFeature("blackout", "Verduisterend", 35, "Volledig lichtdicht materiaal"),
    createFeature("thermal", "Thermisch isolerend", 40, "Verbeterde isolatiewaarde"),
    createFeature("uv_protection", "UV bescherming", 25, "Beschermt tegen schadelijke UV-stralen"),
    createFeature("chain_control", "Kettingbediening", 10, "Bediening met ketting ipv koord"),
    createFeature("child_safety", "Kind-veilige bediening", 15, "Extra veiligheidsopties"),
    createFeature("installation", "Professionele installatie", 80, "Inclusief montage"),
  ],
  calculatePrice: (values: CalculatorValues, config: ProductCalculatorConfig) => {
    // Calculate area in square meters (convert from cm)
    const area = (values.width / 100) * (values.height / 100);
    
    // Base calculation (minimum 0.5 sq meter)
    const effectiveArea = Math.max(area, 0.5);
    let totalPrice = config.basePrice * effectiveArea;
    
    // Add optional features
    values.features.forEach((featureId) => {
      const feature = config.features.find((f) => f.id === featureId);
      if (feature) {
        if (featureId === "blackout" || featureId === "thermal") {
          // These features scale with area
          totalPrice += feature.price * effectiveArea * 0.8; // 80% of the area cost
        } else {
          // Fixed price features
          totalPrice += feature.price;
        }
      }
    });

    return totalPrice;
  }
};

// Function to get calculator config by product ID
// We create a deep clone of the configuration to ensure each instance is unique
// This prevents shared state issues where changes to one product affect others
export function getCalculatorConfig(productId: string): ProductCalculatorConfig {
  // Helper function to deep clone a calculator config
  const cloneConfig = (config: ProductCalculatorConfig): ProductCalculatorConfig => {
    // Clone features array with new objects for each feature
    const clonedFeatures = config.features.map(feature => ({
      ...feature,  // Create a new object with the same properties
    }));
    
    // Return a new config object with the cloned features
    return {
      ...config,   // Spread all the base properties
      features: clonedFeatures,  // Use the cloned features array
    };
  };
  
  // Return a clone of the appropriate configuration
  switch (productId) {
    case 'overgordijnen':
      return cloneConfig(overgordijnenConfig);
    case 'rolgordijnen':
      return cloneConfig(rolgordijnenConfig);
    // Add more cases as you implement additional calculators
    default:
      // Default to overgordijnen if no specific config is found
      return cloneConfig(overgordijnenConfig);
  }
}