import { GalleryItem } from "@shared/schema";

// Function to get a random gallery item
const getRandomItem = (items: GalleryItem[]): GalleryItem | null => {
  if (!items || items.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

// Map to store assigned image URLs for each product ID
// This ensures the same product gets the same image on re-renders
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

  // Get a random gallery item
  const randomItem = getRandomItem(galleryItems);
  
  // If no gallery items are available, use a fallback URL
  const imageUrl = randomItem?.imageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600";
  
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