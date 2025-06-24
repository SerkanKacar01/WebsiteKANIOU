// Color matching service - temporarily disabled OpenAI integration

export interface ColorRecommendation {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorName: string;
  description: string;
  reasoning: string;
  confidence: number;
  productTypes: string[];
}

export interface RoomAnalysis {
  dominantColors: string[];
  lightingType: string;
  roomStyle: string;
  recommendations: ColorRecommendation[];
}

/**
 * Analyzes a room photo and provides color recommendations for window treatments
 * Note: AI analysis temporarily disabled - returns predefined recommendations
 */
export async function analyzeRoomForColorMatching(base64Image: string): Promise<RoomAnalysis> {
  // Return predefined color recommendations
  return getFallbackColorRecommendations();
}

/**
 * Provides fallback color recommendations when AI analysis is unavailable
 */
function getFallbackColorRecommendations(): RoomAnalysis {
  return {
    dominantColors: ["#F5F5F5", "#8B7355", "#4A4A4A"],
    lightingType: "natural",
    roomStyle: "modern",
    recommendations: [
      {
        primaryColor: "#F8F8FF",
        secondaryColor: "#E6E6FA", 
        accentColor: "#9370DB",
        colorName: "Soft Lavender White",
        description: "Clean and calming neutral tones",
        reasoning: "Neutral colors work well in any room style and lighting",
        confidence: 0.75,
        productTypes: ["rolgordijnen", "venetiaanse lamellen"]
      },
      {
        primaryColor: "#F5F5DC",
        secondaryColor: "#DEB887",
        accentColor: "#8FBC8F", 
        colorName: "Warm Beige",
        description: "Natural earth tones for warmth",
        reasoning: "Earth tones create a cozy, welcoming atmosphere",
        confidence: 0.70,
        productTypes: ["gordijnen", "verticale lamellen"]
      },
      {
        primaryColor: "#E0E0E0",
        secondaryColor: "#C0C0C0",
        accentColor: "#708090", 
        colorName: "Modern Grey",
        description: "Contemporary neutral palette",
        reasoning: "Grey tones complement modern interior design",
        confidence: 0.80,
        productTypes: ["rolgordijnen", "plisse gordijnen"]
      }
    ]
  };
}

/**
 * Converts uploaded file to base64 for image processing
 */
export function convertImageToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}