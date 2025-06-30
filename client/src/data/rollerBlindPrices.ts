/**
 * Roller Blind Price Matrix Configuration
 * This file contains all width-height price combinations for the simple configurator
 * Easy to update and maintain pricing structure
 */

export interface PriceEntry {
  width: number;
  height: number;
  price: number;
}

// Standard pricing structure for roller blinds
// Width: 40cm - 300cm (steps of 10cm)
// Heights: 190cm (standard) + 200cm - 350cm (custom, steps of 10cm)
export const ROLLER_BLIND_PRICES: PriceEntry[] = [
  // Standard height 190cm - Most common option
  { width: 40, height: 190, price: 45.95 },
  { width: 50, height: 190, price: 49.95 },
  { width: 60, height: 190, price: 54.95 },
  { width: 70, height: 190, price: 59.95 },
  { width: 80, height: 190, price: 64.95 },
  { width: 90, height: 190, price: 69.95 },
  { width: 100, height: 190, price: 74.95 },
  { width: 110, height: 190, price: 79.95 },
  { width: 120, height: 190, price: 84.95 },
  { width: 130, height: 190, price: 89.95 },
  { width: 140, height: 190, price: 94.95 },
  { width: 150, height: 190, price: 99.95 },
  { width: 160, height: 190, price: 104.95 },
  { width: 170, height: 190, price: 109.95 },
  { width: 180, height: 190, price: 114.95 },
  { width: 190, height: 190, price: 119.95 },
  { width: 200, height: 190, price: 124.95 },
  { width: 210, height: 190, price: 129.95 },
  { width: 220, height: 190, price: 134.95 },
  { width: 230, height: 190, price: 139.95 },
  { width: 240, height: 190, price: 144.95 },
  { width: 250, height: 190, price: 149.95 },
  { width: 260, height: 190, price: 154.95 },
  { width: 270, height: 190, price: 159.95 },
  { width: 280, height: 190, price: 164.95 },
  { width: 290, height: 190, price: 169.95 },
  { width: 300, height: 190, price: 174.95 },

  // Height 200cm - Small premium over standard
  { width: 40, height: 200, price: 49.95 },
  { width: 50, height: 200, price: 54.95 },
  { width: 60, height: 200, price: 59.95 },
  { width: 70, height: 200, price: 64.95 },
  { width: 80, height: 200, price: 69.95 },
  { width: 90, height: 200, price: 74.95 },
  { width: 100, height: 200, price: 79.95 },
  { width: 110, height: 200, price: 84.95 },
  { width: 120, height: 200, price: 89.95 },
  { width: 130, height: 200, price: 94.95 },
  { width: 140, height: 200, price: 99.95 },
  { width: 150, height: 200, price: 104.95 },
  { width: 160, height: 200, price: 109.95 },
  { width: 170, height: 200, price: 114.95 },
  { width: 180, height: 200, price: 119.95 },
  { width: 190, height: 200, price: 124.95 },
  { width: 200, height: 200, price: 129.95 },
  { width: 210, height: 200, price: 134.95 },
  { width: 220, height: 200, price: 139.95 },
  { width: 230, height: 200, price: 144.95 },
  { width: 240, height: 200, price: 149.95 },
  { width: 250, height: 200, price: 154.95 },
  { width: 260, height: 200, price: 159.95 },
  { width: 270, height: 200, price: 164.95 },
  { width: 280, height: 200, price: 169.95 },
  { width: 290, height: 200, price: 174.95 },
  { width: 300, height: 200, price: 179.95 },

  // Popular widths for taller heights - can be expanded as needed
  // Height 250cm
  { width: 120, height: 250, price: 109.95 },
  { width: 150, height: 250, price: 119.95 },
  { width: 180, height: 250, price: 129.95 },
  { width: 200, height: 250, price: 139.95 },
  { width: 250, height: 250, price: 169.95 },
  { width: 300, height: 250, price: 199.95 },

  // Height 300cm
  { width: 120, height: 300, price: 129.95 },
  { width: 150, height: 300, price: 139.95 },
  { width: 180, height: 300, price: 149.95 },
  { width: 200, height: 300, price: 159.95 },
  { width: 250, height: 300, price: 189.95 },
  { width: 300, height: 300, price: 219.95 },

  // Height 350cm - Maximum height
  { width: 120, height: 350, price: 149.95 },
  { width: 150, height: 350, price: 159.95 },
  { width: 180, height: 350, price: 169.95 },
  { width: 200, height: 350, price: 179.95 },
  { width: 250, height: 350, price: 209.95 },
  { width: 300, height: 350, price: 239.95 },
];

// Convert price entries to a lookup map for faster access
export const PRICE_MATRIX: Record<string, number> = ROLLER_BLIND_PRICES.reduce(
  (acc, entry) => {
    const key = `${entry.width}_${entry.height}`;
    acc[key] = entry.price;
    return acc;
  },
  {} as Record<string, number>
);

// Helper functions for price management
export const getRollerBlindPrice = (width: number, height: number): number => {
  const key = `${width}_${height}`;
  return PRICE_MATRIX[key] || 0;
};

export const isValidDimension = (width: number, height: number): boolean => {
  return getRollerBlindPrice(width, height) > 0;
};

export const getAvailableWidths = (): number[] => {
  const widths = new Set<number>();
  ROLLER_BLIND_PRICES.forEach(entry => widths.add(entry.width));
  return Array.from(widths).sort((a, b) => a - b);
};

export const getAvailableHeights = (): number[] => {
  const heights = new Set<number>();
  ROLLER_BLIND_PRICES.forEach(entry => heights.add(entry.height));
  return Array.from(heights).sort((a, b) => a - b);
};

export const getHeightsForWidth = (width: number): number[] => {
  return ROLLER_BLIND_PRICES
    .filter(entry => entry.width === width)
    .map(entry => entry.height)
    .sort((a, b) => a - b);
};

// Configuration for future extensions
export const FUTURE_OPTIONS = {
  cassetteTypes: [
    { id: 'open', name: 'Open profiel', priceMultiplier: 1.0 },
    { id: 'closed', name: 'Dichte cassette', priceMultiplier: 1.15 } // +15%
  ],
  fabricTypes: [
    { id: 'blackout', name: 'Verduisterend', priceMultiplier: 1.0 },
    { id: 'dimout', name: 'Lichtdoorlatend', priceMultiplier: 0.95 }, // -5%
    { id: 'screen', name: 'Screen', priceMultiplier: 1.1 } // +10%
  ],
  controlOptions: [
    { id: 'chain', name: 'Kunststof ketting', price: 0 },
    { id: 'metal-chain', name: 'Metalen ketting', price: 12.50 },
    { id: 'motor-remote', name: 'Gemotoriseerd - Handzender', price: 150 },
    { id: 'motor-app', name: 'Gemotoriseerd - App', price: 180 },
    { id: 'motor-both', name: 'Gemotoriseerd - Beide', price: 200 }
  ]
};

export default PRICE_MATRIX;