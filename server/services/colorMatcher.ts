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
 */
export async function analyzeRoomForColorMatching(base64Image: string): Promise<RoomAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert interior design consultant specializing in window treatments. 
          Analyze room photos and recommend blind/curtain colors that complement the existing decor.
          Always respond with valid JSON in this exact format:
          {
            "dominantColors": ["color1", "color2", "color3"],
            "lightingType": "natural/warm/cool/mixed",
            "roomStyle": "modern/traditional/rustic/minimalist/eclectic/other",
            "recommendations": [
              {
                "primaryColor": "#hexcode",
                "secondaryColor": "#hexcode", 
                "accentColor": "#hexcode",
                "colorName": "descriptive name",
                "description": "brief description",
                "reasoning": "why this color works",
                "confidence": 0.85,
                "productTypes": ["rolgordijnen", "venetiaanse lamellen"]
              }
            ]
          }`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this room photo and recommend 3-4 ideal blind/curtain colors that would complement the existing decor. Consider the room's color palette, lighting, style, and mood. Focus on colors that would work well for rolgordijnen (roller blinds), venetiaanse lamellen (venetian blinds), verticale lamellen (vertical blinds), or gordijnen (curtains)."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500,
    });

    const analysis = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate and ensure we have the expected structure
    return {
      dominantColors: analysis.dominantColors || [],
      lightingType: analysis.lightingType || "natural",
      roomStyle: analysis.roomStyle || "modern",
      recommendations: analysis.recommendations || []
    };

  } catch (error) {
    console.error("Error analyzing room for color matching:", error);
    throw new Error("Failed to analyze room image. Please try again.");
  }
}

/**
 * Converts uploaded file to base64 for OpenAI analysis
 */
export function convertImageToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}