// This file adds some additional types for the frontend that are derived from the schema
// but with some additional frontend-specific needs

// Color swatch type for product colors
export interface ColorSwatch {
  color: string;
  name?: string;
}

// Filter options for product filtering
export interface ProductFilterOptions {
  categoryId?: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  priceRange?: [number, number];
  searchQuery?: string;
}

// Form submission result for handling async operations with forms
export interface FormSubmissionResult {
  success: boolean;
  message: string;
}
