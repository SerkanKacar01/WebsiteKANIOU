import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WizardData } from "../CustomizationWizard";
import { CheckCircle, Star, ArrowRight, RotateCcw, Download, Share2 } from "lucide-react";
import { Link } from "wouter";

interface ResultStepProps {
  data: WizardData;
  onReset: () => void;
}

// Product recommendations based on user selections
const getRecommendations = (data: WizardData) => {
  const recommendations = [];

  // Determine primary product based on room type and purpose
  if (data.purpose.includes('blackout') || data.roomType === 'bedroom') {
    recommendations.push({
      type: 'Rolgordijnen',
      title: 'Verduisterende Rolgordijnen',
      description: 'Perfect voor optimale verduistering en privacy',
      features: ['100% lichtdicht', 'Geluidsdemping', 'Kindveilig'],
      price: '€125 - €280 per m²',
      match: 95
    });
  }

  if (data.purpose.includes('light_control') || data.roomType === 'living') {
    recommendations.push({
      type: 'Duo Rolgordijnen',
      title: 'Dag & Nacht Rolgordijnen',
      description: 'Flexibele lichtregeling door de dag heen',
      features: ['Variabele lichtinval', 'Privacy behoud', 'Modern design'],
      price: '€165 - €320 per m²',
      match: 90
    });
  }

  if (data.purpose.includes('moisture') || data.roomType === 'bathroom') {
    recommendations.push({
      type: 'Kunststof Lamellen',
      title: 'Vochtbestendige Lamellen',
      description: 'Ideaal voor vochtige ruimtes zoals badkamer en keuken',
      features: ['Waterbestendig', 'Makkelijk schoon te maken', 'Duurzaam'],
      price: '€85 - €180 per m²',
      match: 88
    });
  }

  if (data.style === 'classic' || data.roomType === 'dining') {
    recommendations.push({
      type: 'Overgordijnen',
      title: 'Elegante Overgordijnen',
      description: 'Klassieke uitstraling met moderne functionaliteit',
      features: ['Luxe materialen', 'Warmte-isolerend', 'Geluidsdempend'],
      price: '€95 - €250 per m²',
      match: 85
    });
  }

  // Ensure at least 2 recommendations
  if (recommendations.length < 2) {
    recommendations.push({
      type: 'Venetiaanse Lamellen',
      title: 'Stijlvolle Venetiaanse Lamellen',
      description: 'Klassieke elegantie met perfecte lichtcontrole',
      features: ['Precieze lichtregeling', 'Tijdloos design', 'Onderhoudsarm'],
      price: '€110 - €220 per m²',
      match: 82
    });
  }

  return recommendations.slice(0, 3); // Max 3 recommendations
};

const getStyleDescription = (style: string) => {
  const styles: Record<string, string> = {
    modern: 'Strakke lijnen en neutrale kleuren',
    classic: 'Tijdloze elegantie en warme tinten',
    rustic: 'Natuurlijke materialen en gezellige sfeer',
    industrial: 'Stoere uitstraling met karakteristieke details',
    scandinavian: 'Lichte kleuren en functioneel design',
    contemporary: 'Trendy en veelzijdig met moderne accenten'
  };
  return styles[style] || 'Uw gekozen stijl';
};

const ResultStep = ({ data, onReset }: ResultStepProps) => {
  const recommendations = getRecommendations(data);
  const topRecommendation = recommendations[0];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Uw Perfecte Raambekleding
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Op basis van uw voorkeuren hebben we de ideale oplossingen voor u geselecteerd. 
          Deze producten passen perfect bij uw wensen en budget.
        </p>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-50">
        <CardHeader>
          <CardTitle>Uw Selectie Samenvatting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Ruimte:</span>
              <p className="font-semibold">{data.roomType}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Stijl:</span>
              <p className="font-semibold">{data.style}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Budget:</span>
              <p className="font-semibold">{data.budget}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Functies:</span>
              <p className="font-semibold">{data.purpose.length} geselecteerd</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Recommendation */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2">Beste Match</Badge>
              <CardTitle className="text-2xl">{topRecommendation.title}</CardTitle>
              <CardDescription className="text-base mt-1">
                {topRecommendation.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-bold">{topRecommendation.match}% match</span>
              </div>
              <p className="text-lg font-bold text-primary">{topRecommendation.price}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold mb-2">Waarom perfect voor u:</h5>
              <div className="flex flex-wrap gap-2">
                {topRecommendation.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <Link href="/quote">
                <Button size="lg" className="w-full sm:w-auto">
                  Direct Offerte Aanvragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Andere Geschikte Opties</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.slice(1).map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{rec.match}%</span>
                  </div>
                </div>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Kenmerken:</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {rec.features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <p className="font-semibold text-primary">{rec.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Volgende Stappen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <Link href="/quote">
              <Button variant="outline" className="w-full h-auto p-4">
                <div className="text-center">
                  <ArrowRight className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Offerte Aanvragen</div>
                  <div className="text-xs text-gray-600">Vrijblijvend advies</div>
                </div>
              </Button>
            </Link>
            
            <Link href="/kleur-matcher">
              <Button variant="outline" className="w-full h-auto p-4">
                <div className="text-center">
                  <Star className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Kleur Matcher</div>
                  <div className="text-xs text-gray-600">Upload kamerfoto</div>
                </div>
              </Button>
            </Link>

            <Button variant="outline" className="w-full h-auto p-4" onClick={onReset}>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Opnieuw Beginnen</div>
                <div className="text-xs text-gray-600">Andere keuzes</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h4 className="font-semibold text-blue-800 mb-2">
          Heeft u vragen over uw aanbevelingen?
        </h4>
        <p className="text-blue-700 text-sm mb-4">
          Onze experts staan klaar om u persoonlijk te adviseren over de beste keuze voor uw situatie.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <Button variant="outline">
              Contact Opnemen
            </Button>
          </Link>
          <Link href="/quote">
            <Button>
              Adviesgesprek Inplannen
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultStep;