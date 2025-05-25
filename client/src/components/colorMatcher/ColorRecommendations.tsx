import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Lightbulb, Palette, Eye, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ColorRecommendation {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorName: string;
  description: string;
  reasoning: string;
  confidence: number;
  productTypes: string[];
}

interface RoomAnalysis {
  dominantColors: string[];
  lightingType: string;
  roomStyle: string;
  recommendations: ColorRecommendation[];
}

interface ColorRecommendationsProps {
  analysis: RoomAnalysis;
}

const ColorRecommendations = ({ analysis }: ColorRecommendationsProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-orange-600";
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return "Hoge Match";
    if (confidence >= 0.6) return "Goede Match";
    return "Basis Match";
  };

  const translateProductType = (type: string) => {
    const translations: Record<string, string> = {
      'rolgordijnen': 'Rolgordijnen',
      'venetiaanse lamellen': 'Venetiaanse Lamellen',
      'verticale lamellen': 'Verticale Lamellen',
      'gordijnen': 'Gordijnen',
      'plissé gordijnen': 'Plissé Gordijnen',
      'vouwgordijnen': 'Vouwgordijnen'
    };
    return translations[type.toLowerCase()] || type;
  };

  return (
    <div className="space-y-6">
      {/* Room Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Kameranalyse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Dominante Kleuren</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.dominantColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-600">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lichttype</h4>
              <Badge variant="outline">{analysis.lightingType}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Kamer Stijl</h4>
              <Badge variant="outline">{analysis.roomStyle}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Recommendations */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          Aanbevolen Kleuren
        </h2>
        
        <div className="grid gap-6">
          {analysis.recommendations.map((recommendation, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{recommendation.colorName}</CardTitle>
                    <CardDescription className="mt-1">
                      {recommendation.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(recommendation.confidence * 5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={getConfidenceColor(recommendation.confidence)}
                    >
                      {getConfidenceBadge(recommendation.confidence)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Color Palette */}
                <div>
                  <h4 className="font-semibold mb-3">Kleurenpalet</h4>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm mb-2"
                        style={{ backgroundColor: recommendation.primaryColor }}
                      />
                      <p className="text-xs text-gray-600">Primair</p>
                      <p className="text-xs font-mono">{recommendation.primaryColor}</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm mb-2"
                        style={{ backgroundColor: recommendation.secondaryColor }}
                      />
                      <p className="text-xs text-gray-600">Secundair</p>
                      <p className="text-xs font-mono">{recommendation.secondaryColor}</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm mb-2"
                        style={{ backgroundColor: recommendation.accentColor }}
                      />
                      <p className="text-xs text-gray-600">Accent</p>
                      <p className="text-xs font-mono">{recommendation.accentColor}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Reasoning */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Waarom deze kleur werkt
                  </h4>
                  <p className="text-gray-700">{recommendation.reasoning}</p>
                </div>

                {/* Product Types */}
                <div>
                  <h4 className="font-semibold mb-2">Aanbevolen Producten</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.productTypes.map((type, typeIndex) => (
                      <Badge key={typeIndex} variant="outline">
                        {translateProductType(type)}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Link href="/quote">
                    <Button className="w-full sm:w-auto">
                      Vraag Offerte Aan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Klaar om uw nieuwe raambekleding te bestellen?</h3>
            <p className="text-gray-600">
              Onze experts helpen u graag verder met maatwerk oplossingen die perfect bij uw interieur passen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button size="lg">
                  Offerte Aanvragen
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Opnemen
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorRecommendations;