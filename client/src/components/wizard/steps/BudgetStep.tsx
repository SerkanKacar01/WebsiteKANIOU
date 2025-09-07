import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WizardData } from "../CustomizationWizard";
import { Euro, TrendingUp, Crown, Zap } from "lucide-react";

interface BudgetStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const BUDGET_OPTIONS = [
  {
    id: 'budget',
    name: 'Budget',
    description: 'Goede kwaliteit, betaalbaar',
    range: '€50 - €150 per m²',
    icon: Euro,
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
    features: ['Basis materialen', 'Standaard kleuren', 'Eenvoudige montage']
  },
  {
    id: 'mid',
    name: 'Midden',
    description: 'Uitstekende prijs-kwaliteit',
    range: '€150 - €300 per m²',
    icon: TrendingUp,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    features: ['Hoogwaardige materialen', 'Meer kleuropties', 'Extra functies']
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxe en duurzaamheid',
    range: '€300 - €500 per m²',
    icon: Crown,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    features: ['Premium materialen', 'Alle kleuren mogelijk', 'Motorisatie opties']
  },
  {
    id: 'luxury',
    name: 'Luxe',
    description: 'Het allerbeste voor uw huis',
    range: '€500+ per m²',
    icon: Zap,
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
    features: ['Exclusieve materialen', 'Smart home integratie', 'Lifetime garantie']
  }
];

const BudgetStep = ({ data, updateData }: BudgetStepProps) => {
  const handleBudgetSelect = (budgetId: string) => {
    updateData({ budget: budgetId });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Wat is uw gewenste budget?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Selecteer het budget dat bij u past. We bieden kwaliteitsoplossingen 
          voor elk budget, van betaalbaar tot luxe. Alle prijzen zijn inclusief montage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BUDGET_OPTIONS.map((budget) => {
          const Icon = budget.icon;
          const isSelected = data.budget === budget.id;
          
          return (
            <Card
              key={budget.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5 scale-105' 
                  : budget.color
              }`}
              onClick={() => handleBudgetSelect(budget.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Icon className={`h-8 w-8 mb-2 ${
                      isSelected ? 'text-primary' : 'text-gray-600'
                    }`} />
                    <h3 className="text-xl font-semibold mb-1">{budget.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{budget.description}</p>
                    <p className="text-lg font-bold text-primary">{budget.range}</p>
                  </div>
                  {isSelected && (
                    <Badge className="bg-primary">
                      Geselecteerd
                    </Badge>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Wat krijgt u:</h4>
                  <ul className="space-y-1">
                    {budget.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data.budget && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">
            Uitstekende keuze!
          </h4>
          <p className="text-green-700 text-sm">
            {BUDGET_OPTIONS.find(b => b.id === data.budget)?.name} budget geselecteerd. 
            We zullen producten aanbevelen die perfect binnen dit budget passen en 
            de beste waarde voor uw geld bieden.
          </p>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-700 text-sm">
          <strong>💡 Tip:</strong> Alle prijzen zijn inclusief professionele montage en 
          <strong>5 jaar</strong> garantie. We bieden altijd een gratis vrijblijvend adviesgesprek aan huis.
          <br /><small className="text-blue-600">op de geselecteerde collectie</small>
        </p>
      </div>
    </div>
  );
};

export default BudgetStep;