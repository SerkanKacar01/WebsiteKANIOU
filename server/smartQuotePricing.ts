/**
 * Smart Quote Pricing Engine for KANIOU
 * Calculates dynamic pricing based on dimensions, materials, and installation requirements
 */

export interface PricingTier {
  minSize: number; // in square meters
  maxSize: number;
  basePrice: number; // per square meter
}

export interface ProductPricing {
  name: string;
  pricingTiers: PricingTier[];
  materialMultipliers: Record<string, number>;
  installationCost: number;
}

// Dynamic pricing configuration for all product types
export const PRICING_CONFIG: Record<string, ProductPricing> = {
  'rolgordijn': {
    name: 'Rolgordijn',
    pricingTiers: [
      { minSize: 0, maxSize: 1, basePrice: 65 },
      { minSize: 1, maxSize: 2, basePrice: 55 },
      { minSize: 2, maxSize: 4, basePrice: 45 },
      { minSize: 4, maxSize: 10, basePrice: 40 }
    ],
    materialMultipliers: {
      'screen': 1.0,
      'blackout': 1.3,
      'light_filtering': 1.15,
      'transparent': 0.9
    },
    installationCost: 35
  },
  'plisse': {
    name: 'Plissé',
    pricingTiers: [
      { minSize: 0, maxSize: 1, basePrice: 85 },
      { minSize: 1, maxSize: 2, basePrice: 75 },
      { minSize: 2, maxSize: 4, basePrice: 65 },
      { minSize: 4, maxSize: 10, basePrice: 60 }
    ],
    materialMultipliers: {
      'standard': 1.0,
      'blackout': 1.4,
      'duette': 1.6,
      'light_filtering': 1.2
    },
    installationCost: 45
  },
  'jaloezie_horizontaal': {
    name: 'Jaloezie Horizontaal',
    pricingTiers: [
      { minSize: 0, maxSize: 1, basePrice: 75 },
      { minSize: 1, maxSize: 2, basePrice: 65 },
      { minSize: 2, maxSize: 4, basePrice: 55 },
      { minSize: 4, maxSize: 10, basePrice: 50 }
    ],
    materialMultipliers: {
      'aluminum': 1.0,
      'wood': 1.8,
      'faux_wood': 1.3,
      'pvc': 0.85
    },
    installationCost: 40
  },
  'jaloezie_verticaal': {
    name: 'Jaloezie Verticaal',
    pricingTiers: [
      { minSize: 0, maxSize: 1, basePrice: 70 },
      { minSize: 1, maxSize: 2, basePrice: 60 },
      { minSize: 2, maxSize: 4, basePrice: 50 },
      { minSize: 4, maxSize: 10, basePrice: 45 }
    ],
    materialMultipliers: {
      'fabric': 1.0,
      'pvc': 0.9,
      'aluminum': 1.2,
      'wood': 1.7
    },
    installationCost: 35
  },
  'gordijn': {
    name: 'Gordijn',
    pricingTiers: [
      { minSize: 0, maxSize: 1, basePrice: 95 },
      { minSize: 1, maxSize: 2, basePrice: 85 },
      { minSize: 2, maxSize: 4, basePrice: 75 },
      { minSize: 4, maxSize: 10, basePrice: 70 }
    ],
    materialMultipliers: {
      'cotton': 1.0,
      'linen': 1.4,
      'velvet': 1.8,
      'synthetic': 0.8,
      'blackout': 1.3
    },
    installationCost: 50
  },
  'vouwgordijn': {
    name: 'Vouwgordijn',
    pricingTiers: [
      { minSize: 0, maxSize: 1, basePrice: 110 },
      { minSize: 1, maxSize: 2, basePrice: 95 },
      { minSize: 2, maxSize: 4, basePrice: 85 },
      { minSize: 4, maxSize: 10, basePrice: 80 }
    ],
    materialMultipliers: {
      'fabric': 1.0,
      'linen': 1.3,
      'cotton': 1.1,
      'blackout': 1.4
    },
    installationCost: 55
  }
};

/**
 * Calculate square meters from dimensions (rounds up to nearest 10cm for pricing tiers)
 */
export function calculateSquareMeters(widthCm: number, heightCm: number): number {
  // Round up to nearest 10cm increment for pricing calculations
  const roundedWidth = Math.ceil(widthCm / 10) * 10;
  const roundedHeight = Math.ceil(heightCm / 10) * 10;
  
  return (roundedWidth * roundedHeight) / 10000; // Convert cm² to m²
}

/**
 * Find the appropriate pricing tier based on square meters
 */
export function findPricingTier(squareMeters: number, tiers: PricingTier[]): PricingTier {
  for (const tier of tiers) {
    if (squareMeters >= tier.minSize && squareMeters <= tier.maxSize) {
      return tier;
    }
  }
  // If no tier found, use the highest tier
  return tiers[tiers.length - 1];
}

/**
 * Calculate estimated price for a smart quote request
 */
export function calculateEstimatedPrice(
  productType: string,
  material: string,
  widthCm: number,
  heightCm: number,
  installationRequired: boolean
): number {
  const config = PRICING_CONFIG[productType];
  if (!config) {
    throw new Error(`Unknown product type: ${productType}`);
  }

  // Calculate square meters
  const squareMeters = calculateSquareMeters(widthCm, heightCm);
  
  // Find appropriate pricing tier
  const tier = findPricingTier(squareMeters, config.pricingTiers);
  
  // Get material multiplier
  const materialMultiplier = config.materialMultipliers[material] || 1.0;
  
  // Calculate base price
  let totalPrice = squareMeters * tier.basePrice * materialMultiplier;
  
  // Add installation cost if required
  if (installationRequired) {
    totalPrice += config.installationCost;
  }
  
  // Round to nearest euro
  return Math.round(totalPrice);
}

/**
 * Get available materials for a product type
 */
export function getAvailableMaterials(productType: string): string[] {
  const config = PRICING_CONFIG[productType];
  return config ? Object.keys(config.materialMultipliers) : [];
}

/**
 * Get all available product types
 */
export function getAvailableProductTypes(): string[] {
  return Object.keys(PRICING_CONFIG);
}

/**
 * Validate if dimensions are within acceptable ranges
 */
export function validateDimensions(widthCm: number, heightCm: number): { valid: boolean; error?: string } {
  if (widthCm < 30 || widthCm > 500) {
    return { valid: false, error: "Width must be between 30cm and 500cm" };
  }
  
  if (heightCm < 30 || heightCm > 400) {
    return { valid: false, error: "Height must be between 30cm and 400cm" };
  }
  
  const squareMeters = calculateSquareMeters(widthCm, heightCm);
  if (squareMeters > 10) {
    return { valid: false, error: "Total area cannot exceed 10 square meters" };
  }
  
  return { valid: true };
}

/**
 * Check if material is compatible with product type
 */
export function isMaterialCompatible(productType: string, material: string): boolean {
  const config = PRICING_CONFIG[productType];
  return config ? material in config.materialMultipliers : false;
}