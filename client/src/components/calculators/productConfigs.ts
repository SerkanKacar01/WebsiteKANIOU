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
  basePrice: 40, // Base price per linear meter including confection
  minWidth: 30,
  maxWidth: 600,
  minHeight: 40,
  maxHeight: 350,
  defaultWidth: 150,
  defaultHeight: 250,
  features: [
    { id: "enkelevoudige_plooi", label: "Enkelvoudige plooi (standaard)", price: 0, description: "Standaard plooien zonder meerprijs" },
    { id: "dubbele_plooi", label: "Dubbele plooi", price: 0, description: "Elegante dubbele plooien (+10%)" },
    { id: "driedubbele_plooi", label: "Driedubbele plooi", price: 0, description: "Luxe driedubbele plooien (+15%)" },
    { id: "wave_plooi", label: "Wave plooi", price: 0, description: "Moderne wave plooien (+20%)" },
    sharedFeatures.thermal,
    sharedFeatures.blackout,
    sharedFeatures.sound_dampening,
    sharedFeatures.custom_color,
    { id: "lining", label: "Luxe voering", price: 30, description: "Extra voering voor betere isolatie" },
    sharedFeatures.installation,
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