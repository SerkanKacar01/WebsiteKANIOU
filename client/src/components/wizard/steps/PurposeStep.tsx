import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WizardData } from "../CustomizationWizard";
import { Sun, Moon, Eye, Shield, Volume2, Thermometer, Droplets, Wind } from "lucide-react";

interface PurposeStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const PURPOSES = [
  {
    id: 'privacy',
    name: 'Privacy',
    description: 'Inkijk voorkomen',
    icon: Eye,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'light_control',
    name: 'Lichtregeling',
    description: 'Zonlicht dimmen',
    icon: Sun,
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  },
  {
    id: 'blackout',
    name: 'Verduistering',
    description: 'Compleet donker',
    icon: Moon,
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    id: 'insulation',
    name: 'Isolatie',
    description: 'Warmte/koude tegenhouden',
    icon: Thermometer,
    color: 'bg-red-50 hover:bg-red-100 border-red-200'
  },
  {
    id: 'sound',
    name: 'Geluiddemping',
    description: 'Geluid verminderen',
    icon: Volume2,
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'moisture',
    name: 'Vochtbestendig',
    description: 'Voor badkamer/keuken',
    icon: Droplets,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'uv_protection',
    name: 'UV Bescherming',
    description: 'Meubels beschermen',
    icon: Shield,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  },
  {
    id: 'ventilation',
    name: 'Ventilatie',
    description: 'Luchtcirculatie behouden',
    icon: Wind,
    color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200'
  }
];

const PurposeStep = ({ data, updateData }: PurposeStepProps) => {
  const handlePurposeToggle = (purposeId: string) => {
    const currentPurposes = data.purpose || [];
    const updatedPurposes = currentPurposes.includes(purposeId)
      ? currentPurposes.filter(p => p !== purposeId)
      : [...currentPurposes, purposeId];
    
    updateData({ purpose: updatedPurposes });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Wat is het hoofddoel van uw raambekleding?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Selecteer alle functies die belangrijk zijn voor u. U kunt meerdere opties kiezen 
          om de perfecte raambekleding voor uw behoeften te vinden.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PURPOSES.map((purpose) => {
          const Icon = purpose.icon;
          const isSelected = data.purpose?.includes(purpose.id) || false;
          
          return (
            <Card
              key={purpose.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : purpose.color
              }`}
              onClick={() => handlePurposeToggle(purpose.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${
                  isSelected ? 'text-primary' : 'text-gray-600'
                }`} />
                <h4 className="font-semibold mb-1">{purpose.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{purpose.description}</p>
                {isSelected && (
                  <Badge className="mt-1">Geselecteerd</Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data.purpose && data.purpose.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Geselecteerde functies:</h4>
          <div className="flex flex-wrap gap-2">
            {data.purpose.map((purposeId) => {
              const purpose = PURPOSES.find(p => p.id === purposeId);
              return purpose ? (
                <Badge key={purposeId} variant="secondary">
                  {purpose.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurposeStep;