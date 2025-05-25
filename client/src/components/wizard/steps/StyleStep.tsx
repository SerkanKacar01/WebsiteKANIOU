import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WizardData } from "../CustomizationWizard";
import { Sparkles, Home, Square, Triangle, Circle, Zap } from "lucide-react";

interface StyleStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const STYLES = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Strak, minimalistisch en tijdloos',
    icon: Square,
    image: '/api/placeholder/300/200',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD'],
    characteristics: ['Strakke lijnen', 'Neutrale kleuren', 'Minimalistisch']
  },
  {
    id: 'classic',
    name: 'Klassiek',
    description: 'Elegant, tijdloos en verfijnd',
    icon: Circle,
    image: '/api/placeholder/300/200',
    colors: ['#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8'],
    characteristics: ['Warme tinten', 'Traditioneel', 'Verfijnd']
  },
  {
    id: 'rustic',
    name: 'Landelijk',
    description: 'Natuurlijk, warm en gezellig',
    icon: Home,
    image: '/api/placeholder/300/200',
    colors: ['#8BC34A', '#689F38', '#558B2F', '#33691E'],
    characteristics: ['Natuurlijke materialen', 'Warme sfeer', 'Gezellig']
  },
  {
    id: 'industrial',
    name: 'Industrieel',
    description: 'Stoer, robuust en karakteristiek',
    icon: Triangle,
    image: '/api/placeholder/300/200',
    colors: ['#424242', '#616161', '#757575', '#9E9E9E'],
    characteristics: ['Donkere tinten', 'Robuust', 'Karakteristiek']
  },
  {
    id: 'scandinavian',
    name: 'Scandinavisch',
    description: 'Licht, functioneel en gezellig',
    icon: Sparkles,
    image: '/api/placeholder/300/200',
    colors: ['#F5F5F5', '#E8F5E8', '#FFF8E1', '#E3F2FD'],
    characteristics: ['Lichte kleuren', 'Functioneel', 'Hygge gevoel']
  },
  {
    id: 'contemporary',
    name: 'Eigentijds',
    description: 'Trendy, veelzijdig en dynamisch',
    icon: Zap,
    image: '/api/placeholder/300/200',
    colors: ['#FF5722', '#FF7043', '#FF8A65', '#FFAB91'],
    characteristics: ['Trendy kleuren', 'Veelzijdig', 'Dynamisch']
  }
];

const StyleStep = ({ data, updateData }: StyleStepProps) => {
  const handleStyleSelect = (styleId: string) => {
    const selectedStyle = STYLES.find(s => s.id === styleId);
    updateData({ 
      style: styleId,
      colors: selectedStyle?.colors || []
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Welke stijl past bij uw interieur?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kies de stijl die het beste bij uw woning en persoonlijke smaak past. 
          Dit helpt ons de juiste kleuren en materialen voor u te selecteren.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STYLES.map((style) => {
          const Icon = style.icon;
          const isSelected = data.style === style.id;
          
          return (
            <Card
              key={style.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleStyleSelect(style.id)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Icon className={`h-12 w-12 mx-auto mb-3 ${
                    isSelected ? 'text-primary' : 'text-gray-600'
                  }`} />
                  <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
                  <p className="text-gray-600 text-sm">{style.description}</p>
                </div>

                {/* Color Palette */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Kleurenpalet:</p>
                  <div className="flex justify-center space-x-2">
                    {style.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Characteristics */}
                <div>
                  <p className="text-sm font-medium mb-2">Kenmerken:</p>
                  <div className="flex flex-wrap gap-1">
                    {style.characteristics.map((char, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <Badge className="w-full justify-center">
                      Geselecteerd
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data.style && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            Perfecte keuze! {STYLES.find(s => s.id === data.style)?.name} stijl geselecteerd
          </h4>
          <p className="text-blue-700 text-sm">
            We hebben automatisch een passend kleurenpalet voor u geselecteerd dat perfect 
            bij deze stijl past. U kunt dit later nog aanpassen.
          </p>
        </div>
      )}
    </div>
  );
};

export default StyleStep;