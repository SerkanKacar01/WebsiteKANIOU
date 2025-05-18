import { ProductCalculatorConfig, CalculatorValues } from './BaseCalculator';

// Shared features that can be reused across different product types
const sharedFeatures = {
  motorized: { id: "motorized", label: "Gemotoriseerd", price: 120, description: "Elektrische bediening voor gemak" },
  remote: { id: "remote", label: "Afstandsbediening", price: 35, description: "Draadloze afstandsbediening" },
  blackout: { id: "blackout", label: "Verduisterend", price: 35, description: "Volledig lichtdicht materiaal" },
  thermal: { id: "thermal", label: "Thermisch isolerend", price: 40, description: "Verbeterde isolatiewaarde" },
  premium_fabric: { id: "premium_fabric", label: "Premium stof", price: 50, description: "Hoogwaardige stoffen" },
  custom_color: { id: "custom_color", label: "Kleur op maat", price: 25, description: "Speciale kleuren op aanvraag" },
  installation: { id: "installation", label: "Professionele installatie", price: 80, description: "Inclusief montage" },
  sound_dampening: { id: "sound_dampening", label: "Geluiddempend", price: 45, description: "Verbeterde akoestiek" },
  anti_dust: { id: "anti_dust", label: "Anti-stof behandeling", price: 30, description: "Stofwerende eigenschappen" },
  uv_protection: { id: "uv_protection", label: "UV bescherming", price: 25, description: "Beschermt tegen schadelijke UV-stralen" },
};

// Overgordijnen (Curtains) Calculator Config
export const overgordijnenConfig: ProductCalculatorConfig = {
  productId: "overgordijnen",
  productName: "Overgordijnen",
  basePrice: 35, // Base price per square meter
  minWidth: 30,
  maxWidth: 600,
  minHeight: 40,
  maxHeight: 350,
  defaultWidth: 150,
  defaultHeight: 250,
  features: [
    sharedFeatures.premium_fabric,
    sharedFeatures.thermal,
    sharedFeatures.blackout,
    sharedFeatures.sound_dampening,
    sharedFeatures.custom_color,
    sharedFeatures.anti_dust,
    { id: "wave_pleat", label: "Wave plooien", price: 25, description: "Elegante golf plooien" },
    { id: "pencil_pleat", label: "Potlood plooien", price: 15, description: "Klassieke potlood plooien" },
    { id: "lining", label: "Luxe voering", price: 30, description: "Extra voering voor betere isolatie" },
    sharedFeatures.installation,
  ],
  calculatePrice: (values: CalculatorValues, config: ProductCalculatorConfig) => {
    // Calculate area in square meters (convert from cm)
    const area = (values.width / 100) * (values.height / 100);
    
    // Base calculation (minimum 1 sq meter)
    const effectiveArea = Math.max(area, 1);
    let totalPrice = config.basePrice * effectiveArea;

    // Extra charge for extra large curtains
    if (values.width > 300) {
      totalPrice *= 1.15; // 15% extra for very wide curtains
    }
    
    // Add optional features
    values.features.forEach((featureId) => {
      const feature = config.features.find((f) => f.id === featureId);
      if (feature) {
        if (featureId === "premium_fabric" || featureId === "thermal" || featureId === "blackout") {
          // These features scale with area
          totalPrice += feature.price * effectiveArea;
        } else {
          // Fixed price features
          totalPrice += feature.price;
        }
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
    sharedFeatures.motorized,
    sharedFeatures.remote,
    sharedFeatures.blackout,
    sharedFeatures.thermal,
    sharedFeatures.uv_protection,
    { id: "chain_control", label: "Kettingbediening", price: 10, description: "Bediening met ketting ipv koord" },
    { id: "child_safety", label: "Kind-veilige bediening", price: 15, description: "Extra veiligheidsopties" },
    sharedFeatures.installation,
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
export function getCalculatorConfig(productId: string): ProductCalculatorConfig {
  switch (productId) {
    case 'overgordijnen':
      return overgordijnenConfig;
    case 'rolgordijnen':
      return rolgordijnenConfig;
    // Add more cases as you implement additional calculators
    default:
      // Default to overgordijnen if no specific config is found
      return overgordijnenConfig;
  }
}