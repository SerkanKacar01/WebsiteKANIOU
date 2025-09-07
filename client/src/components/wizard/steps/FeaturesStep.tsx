import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WizardData } from "../CustomizationWizard";
import { Zap, Smartphone, Timer, Shield, Leaf, Wrench, Palette, Star } from "lucide-react";

interface FeaturesStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const FEATURES = [
  {
    id: 'motorized',
    name: 'Motorisatie',
    description: 'Elektrisch bedienbaar met afstandsbediening',
    icon: Zap,
    premium: true,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'smart_home',
    name: 'Smart Home',
    description: 'Bestuurbaar via app en spraakcommandos',
    icon: Smartphone,
    premium: true,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'timer',
    name: 'Timer Functie',
    description: 'Automatisch openen en sluiten op tijden',
    icon: Timer,
    premium: true,
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'child_safety',
    name: 'Kindveiligheid',
    description: 'Veilige bediening zonder losse koorden',
    icon: Shield,
    premium: false,
    color: 'bg-red-50 hover:bg-red-100 border-red-200'
  },
  {
    id: 'eco_friendly',
    name: 'Duurzaam',
    description: 'Milieuvriendelijke materialen',
    icon: Leaf,
    premium: false,
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'easy_clean',
    name: 'Onderhoudsvriendelijk',
    description: 'Makkelijk schoon te maken',
    icon: Wrench,
    premium: false,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  },
  {
    id: 'custom_colors',
    name: 'Kleur op Maat',
    description: 'Exacte kleurmatching mogelijk',
    icon: Palette,
    premium: false,
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
  },
  {
    id: 'warranty_plus',
    name: 'Uitgebreide Garantie',
    description: '5 jaar volledige garantie (op de geselecteerde collectie)',
    icon: Star,
    premium: true,
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  }
];

const FeaturesStep = ({ data, updateData }: FeaturesStepProps) => {
  const handleFeatureToggle = (featureId: string) => {
    const currentFeatures = data.features || [];
    const updatedFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(f => f !== featureId)
      : [...currentFeatures, featureId];
    
    updateData({ features: updatedFeatures });
  };

  const selectedFeatures = data.features || [];
  const premiumFeatures = selectedFeatures.filter(f => 
    FEATURES.find(feature => feature.id === f)?.premium
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Welke extra functies wilt u?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Selecteer de extra functies die u belangrijk vindt. Deze stap is optioneel - 
          u kunt altijd voor de basisconfiguratie kiezen en later upgraden.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const isSelected = selectedFeatures.includes(feature.id);
          
          return (
            <Card
              key={feature.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : feature.color
              }`}
              onClick={() => handleFeatureToggle(feature.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`h-6 w-6 ${
                    isSelected ? 'text-primary' : 'text-gray-600'
                  }`} />
                  {feature.premium && (
                    <Badge variant="secondary" className="text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold mb-1">{feature.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                {isSelected && (
                  <Badge className="w-full justify-center text-xs">
                    Geselecteerd
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedFeatures.length > 0 && (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              Geselecteerde functies ({selectedFeatures.length}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedFeatures.map((featureId) => {
                const feature = FEATURES.find(f => f.id === featureId);
                return feature ? (
                  <Badge key={featureId} variant="secondary">
                    {feature.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>

          {premiumFeatures.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                Premium functies geselecteerd:
              </h4>
              <p className="text-blue-700 text-sm">
                U heeft {premiumFeatures.length} premium functie(s) geselecteerd. 
                Deze bieden extra comfort en gemak, en kunnen uw totaalprijs beïnvloeden.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 text-sm">
          <strong>💡 Tip:</strong> U kunt deze functies later nog wijzigen tijdens het 
          adviesgesprek. Onze experts helpen u de beste keuzes te maken voor uw situatie.
        </p>
      </div>
    </div>
  );
};

export default FeaturesStep;