import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WizardData } from "../CustomizationWizard";
import { Home, Bed, UtensilsCrossed, Briefcase, Baby, Bath, Users } from "lucide-react";

interface RoomTypeStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const ROOM_TYPES = [
  {
    id: 'living',
    name: 'Woonkamer',
    description: 'Voor comfort en sfeer',
    icon: Home,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'bedroom',
    name: 'Slaapkamer',
    description: 'Voor rust en privacy',
    icon: Bed,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'kitchen',
    name: 'Keuken',
    description: 'Voor praktisch gebruik',
    icon: UtensilsCrossed,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  },
  {
    id: 'office',
    name: 'Kantoor',
    description: 'Voor concentratie',
    icon: Briefcase,
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'bathroom',
    name: 'Badkamer',
    description: 'Voor privacy en vocht',
    icon: Bath,
    color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200'
  },
  {
    id: 'nursery',
    name: 'Kinderkamer',
    description: 'Voor veiligheid en plezier',
    icon: Baby,
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
  },
  {
    id: 'dining',
    name: 'Eetkamer',
    description: 'Voor gezelligheid',
    icon: Users,
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  }
];

const WINDOW_SIZES = [
  { id: 'small', name: 'Klein', description: 'Tot 1,5m breed' },
  { id: 'medium', name: 'Middel', description: '1,5m - 3m breed' },
  { id: 'large', name: 'Groot', description: '3m - 5m breed' },
  { id: 'xlarge', name: 'Extra Groot', description: 'Meer dan 5m breed' }
];

const RoomTypeStep = ({ data, updateData }: RoomTypeStepProps) => {
  const handleRoomSelect = (roomType: string) => {
    updateData({ roomType });
  };

  const handleWindowSizeSelect = (windowSize: string) => {
    updateData({ windowSize });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Voor welke ruimte zoekt u raambekleding?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Selecteer het type ruimte waar u de raambekleding wilt plaatsen. 
          Dit helpt ons de beste producten en eigenschappen voor uw specifieke behoeften te vinden.
        </p>
      </div>

      {/* Room Type Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Type Ruimte</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ROOM_TYPES.map((room) => {
            const Icon = room.icon;
            const isSelected = data.roomType === room.id;
            
            return (
              <Card
                key={room.id}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : room.color
                }`}
                onClick={() => handleRoomSelect(room.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${
                    isSelected ? 'text-primary' : 'text-gray-600'
                  }`} />
                  <h4 className="font-semibold mb-1">{room.name}</h4>
                  <p className="text-sm text-gray-600">{room.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Window Size Selection */}
      {data.roomType && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Raamgrootte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WINDOW_SIZES.map((size) => {
              const isSelected = data.windowSize === size.id;
              
              return (
                <Card
                  key={size.id}
                  className={`cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleWindowSizeSelect(size.id)}
                >
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold mb-1">{size.name}</h4>
                    <p className="text-sm text-gray-600">{size.description}</p>
                    {isSelected && (
                      <Badge className="mt-2">Geselecteerd</Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTypeStep;