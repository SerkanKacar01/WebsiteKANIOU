import { overgordijnenImage, insectScreenImage, curtainRailsImage } from '@/assets';

// Map category names to specific images
export const getCategoryImage = (categoryName: string): string | null => {
  const categoryImageMap: Record<string, string> = {
    'Overgordijnen': overgordijnenImage,
    'Curtains': overgordijnenImage, // English mapping
    'Inzethorren': insectScreenImage,
    'Opzethorren': insectScreenImage,
    'Inset Insect Screens': insectScreenImage, // English mapping
    'Mount-on Insect Screens': insectScreenImage, // English mapping
    'Gordijnrails': curtainRailsImage,
    'Curtain Rails': curtainRailsImage // English mapping
  };
  
  return categoryImageMap[categoryName] || null;
};