import { GalleryItem } from "@shared/schema";
import { overgordijnenImage, overgordijnenNewImage, insectScreenImage, curtainRailsImage } from '@/assets';

// Function to get a random gallery item
const getRandomItem = (items: GalleryItem[]): GalleryItem | null => {
  if (!items || items.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

// Custom window blinds image for products without images
const WINDOW_BLINDS_IMAGE = "/assets/window-blinds.jpg";

// Map to store assigned image URLs for each product ID
// This ensures the same product gets the same image on re-renders

// Map for asset paths to imported assets
const assetMap: Record<string, string> = {
  '/assets/overgordijnen.jpeg': overgordijnenImage,
  '/assets/overgordijnen_new.jpeg': overgordijnenNewImage,
  '/assets/insect_screen.jpeg': insectScreenImage,
  '/assets/curtain_rails.jpeg': curtainRailsImage
};

/**
 * Convert asset path to imported asset URL if needed
 * @param url - The image URL to process
 * @returns The appropriate URL to use
 */
export const getAssetUrl = (url: string | undefined): string => {
  if (!url) return WINDOW_BLINDS_IMAGE;
  
  // If it's an asset path, return the imported asset
  if (url.startsWith('/assets/') && assetMap[url]) {
    return assetMap[url];
  }
  
  return url;
};
const productImageMap = new Map<number, string>();

/**
 * Get an image URL for a product
 * If the product already has an image URL, use that
 * Otherwise, assign a random image from the gallery
 * The assignment is consistent for the same session (via Map)
 * 
 * @param productId - The ID of the product
 * @param productImageUrl - The current image URL of the product (if any)
 * @param galleryItems - Array of gallery items to use as image sources
 * @param forceRandom - Force random image assignment even if product has image
 * @returns The image URL to use
 */
export const getProductImageUrl = (
  productId: number, 
  productImageUrl: string | undefined, 
  galleryItems: GalleryItem[],
  forceRandom: boolean = false
): string => {
  // If product already has an image and we're not forcing random, use that
  if (productImageUrl && !forceRandom && productImageUrl.trim() !== '') {
    return productImageUrl;
  }

  // If this product already has an assigned random image, use that
  if (productImageMap.has(productId)) {
    return productImageMap.get(productId)!;
  }

  // Use our window blinds image instead of random gallery images
  const imageUrl = WINDOW_BLINDS_IMAGE;
  
  // Store the assigned image URL for this product
  productImageMap.set(productId, imageUrl);
  
  return imageUrl;
};

/**
 * Reset the image assignment for all products
 * Call this when you want to generate a new set of random images
 */
export const resetProductImageAssignments = (): void => {
  productImageMap.clear();
};