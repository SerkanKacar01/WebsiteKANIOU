import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronRight, 
  ChevronLeft,
  User,
  Home,
  Palette,
  Settings,
  CheckCircle,
  Sparkles,
  Target,
  Heart,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useGamification } from '@/hooks/useGamification';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface UserProfile {
  name: string;
  email: string;
  homeType: string;
  roomTypes: string[];
  stylePreferences: string[];
  budgetRange: [number, number];
  priorities: string[];
  location: string;
  newsletter: boolean;
}

interface OnboardingWizardProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const { language } = useLanguage();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    homeType: '',
    roomTypes: [],
    stylePreferences: [],
    budgetRange: [100, 500],
    priorities: [],
    location: '',
    newsletter: false
  });

  const homeTypes = [
    { id: 'apartment', label: 'Appartement', icon: '🏢' },
    { id: 'house', label: 'Huis', icon: '🏠' },
    { id: 'studio', label: 'Studio', icon: '🏨' },
    { id: 'villa', label: 'Villa', icon: '🏘️' }
  ];

  const roomTypes = [
    { id: 'living', label: 'Woonkamer', icon: '🛋️' },
    { id: 'bedroom', label: 'Slaapkamer', icon: '🛏️' },
    { id: 'kitchen', label: 'Keuken', icon: '🍳' },
    { id: 'bathroom', label: 'Badkamer', icon: '🚿' },
    { id: 'office', label: 'Kantoor', icon: '💼' },
    { id: 'dining', label: 'Eetkamer', icon: '🍽️' }
  ];

  const stylePreferences = [
    { id: 'modern', label: 'Modern', color: 'bg-blue-100 text-blue-800' },
    { id: 'classic', label: 'Klassiek', color: 'bg-purple-100 text-purple-800' },
    { id: 'minimalist', label: 'Minimalistisch', color: 'bg-gray-100 text-gray-800' },
    { id: 'rustic', label: 'Rustiek', color: 'bg-green-100 text-green-800' },
    { id: 'luxury', label: 'Luxe', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'bohemian', label: 'Bohemian', color: 'bg-pink-100 text-pink-800' }
  ];

  const priorities = [
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'light_control', label: 'Lichtregeling', icon: '💡' },
    { id: 'energy_saving', label: 'Energiebesparing', icon: '🌱' },
    { id: 'easy_maintenance', label: 'Onderhoudsvriendelijk', icon: '🧹' },
    { id: 'child_safe', label: 'Kindveilig', icon: '👶' },
    { id: 'durability', label: 'Duurzaamheid', icon: '⚡' }
  ];

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welkom bij KANIOU!',
      description: 'Laten we je ervaring personaliseren',
      icon: <Sparkles className="h-6 w-6" />,
      component: <WelcomeStep />
    },
    {
      id: 'profile',
      title: 'Vertel ons over jezelf',
      description: 'Basis informatie voor een persoonlijke ervaring',
      icon: <User className="h-6 w-6" />,
      component: <ProfileStep />
    },
    {
      id: 'home',
      title: 'Jouw woning',
      description: 'Help ons je woonsituatie te begrijpen',
      icon: <Home className="h-6 w-6" />,
      component: <HomeStep />
    },
    {
      id: 'style',
      title: 'Stijlvoorkeuren',
      description: 'Welke stijl spreekt je aan?',
      icon: <Palette className="h-6 w-6" />,
      component: <StyleStep />
    },
    {
      id: 'budget',
      title: 'Budget & Prioriteiten',
      description: 'Wat is belangrijk voor jou?',
      icon: <Target className="h-6 w-6" />,
      component: <BudgetStep />
    },
    {
      id: 'complete',
      title: 'Alles ingesteld!',
      description: 'Je bent klaar om te beginnen',
      icon: <CheckCircle className="h-6 w-6" />,
      component: <CompletionStep />
    }
  ];

  function WelcomeStep() {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Welkom bij KANIOU!</h2>
          <p className="text-muted-foreground">
            We helpen je de perfecte raambekleding te vinden die past bij jouw stijl en woning. 
            Deze wizard duurt slechts 2 minuten en geeft je een volledig gepersonaliseerde ervaring.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Persoonlijke aanbevelingen</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Maatwerkadvies</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Prijsindicaties op maat</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Directe contact hulp</span>
          </div>
        </div>
      </div>
    );
  }

  function ProfileStep() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Vertel ons over jezelf</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                value={userProfile.name}
                onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Je voornaam"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mailadres (optioneel)</Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="voor persoonlijke tips en aanbiedingen"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Locatie (optioneel)</Label>
              <Input
                id="location"
                value={userProfile.location}
                onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Stad of regio"
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={userProfile.newsletter}
                onCheckedChange={(checked) => 
                  setUserProfile(prev => ({ ...prev, newsletter: checked as boolean }))
                }
              />
              <Label htmlFor="newsletter" className="text-sm">
                Ja, ik wil tips en aanbiedingen ontvangen via e-mail
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function HomeStep() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Wat voor woning heb je?</h3>
          <div className="grid grid-cols-2 gap-3">
            {homeTypes.map((type) => (
              <Button
                key={type.id}
                variant={userProfile.homeType === type.id ? 'default' : 'outline'}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setUserProfile(prev => ({ ...prev, homeType: type.id }))}
              >
                <span className="text-2xl">{type.icon}</span>
                <span>{type.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Voor welke kamers zoek je raambekleding?</h3>
          <div className="grid grid-cols-2 gap-3">
            {roomTypes.map((room) => (
              <Button
                key={room.id}
                variant={userProfile.roomTypes.includes(room.id) ? 'default' : 'outline'}
                className="h-auto p-3 flex items-center gap-3 justify-start"
                onClick={() => {
                  setUserProfile(prev => ({
                    ...prev,
                    roomTypes: prev.roomTypes.includes(room.id)
                      ? prev.roomTypes.filter(r => r !== room.id)
                      : [...prev.roomTypes, room.id]
                  }));
                }}
              >
                <span className="text-lg">{room.icon}</span>
                <span>{room.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function StyleStep() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Welke stijl spreekt je aan?</h3>
          <p className="text-muted-foreground mb-4">Selecteer alle stijlen die je leuk vindt</p>
          <div className="grid grid-cols-2 gap-3">
            {stylePreferences.map((style) => (
              <Button
                key={style.id}
                variant="outline"
                className={cn(
                  "h-auto p-4 flex flex-col items-center gap-2 transition-all",
                  userProfile.stylePreferences.includes(style.id) && "border-2 border-blue-500 bg-blue-50"
                )}
                onClick={() => {
                  setUserProfile(prev => ({
                    ...prev,
                    stylePreferences: prev.stylePreferences.includes(style.id)
                      ? prev.stylePreferences.filter(s => s !== style.id)
                      : [...prev.stylePreferences, style.id]
                  }));
                }}
              >
                <Badge className={style.color}>{style.label}</Badge>
                {userProfile.stylePreferences.includes(style.id) && (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function BudgetStep() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Wat is je budget per raam?</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum (€)</Label>
                <Input
                  type="number"
                  value={userProfile.budgetRange[0]}
                  onChange={(e) => setUserProfile(prev => ({
                    ...prev,
                    budgetRange: [parseInt(e.target.value) || 0, prev.budgetRange[1]]
                  }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Maximum (€)</Label>
                <Input
                  type="number"
                  value={userProfile.budgetRange[1]}
                  onChange={(e) => setUserProfile(prev => ({
                    ...prev,
                    budgetRange: [prev.budgetRange[0], parseInt(e.target.value) || 1000]
                  }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              €{userProfile.budgetRange[0]} - €{userProfile.budgetRange[1]} per raam
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Wat vind je belangrijk?</h3>
          <div className="grid grid-cols-2 gap-3">
            {priorities.map((priority) => (
              <Button
                key={priority.id}
                variant={userProfile.priorities.includes(priority.id) ? 'default' : 'outline'}
                className="h-auto p-3 flex items-center gap-3 justify-start"
                onClick={() => {
                  setUserProfile(prev => ({
                    ...prev,
                    priorities: prev.priorities.includes(priority.id)
                      ? prev.priorities.filter(p => p !== priority.id)
                      : [...prev.priorities, priority.id]
                  }));
                }}
              >
                <span className="text-lg">{priority.icon}</span>
                <span className="text-sm">{priority.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function CompletionStep() {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Proficiat, {userProfile.name || 'nieuwe gebruiker'}!</h2>
          <p className="text-muted-foreground">
            Je profiel is succesvol aangemaakt. We kunnen nu gepersonaliseerde aanbevelingen 
            voor je maken op basis van je voorkeuren.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Wat je nu kunt doen:</h3>
          <div className="space-y-2 text-sm text-left">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Bekijk je persoonlijke productaanbevelingen</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Chat met onze AI-assistent voor maatwerk advies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Gebruik de kleur matcher voor perfecte matches</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Verdien punten in ons beloningssysteem</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1"
            onClick={() => window.location.href = '/recommendations'}
          >
            <Heart className="h-4 w-4 mr-2" />
            Bekijk Aanbevelingen
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.location.href = '/'}
          >
            Start Browsen
          </Button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Award points for engagement
      const currentPoints = parseInt(localStorage.getItem('kaniou_user_points') || '0');
      localStorage.setItem('kaniou_user_points', (currentPoints + 5).toString());
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save user preferences to localStorage
    const preferences = {
      name: userProfile.name,
      email: userProfile.email,
      onboardingCompleted: true,
      homeType: userProfile.homeType,
      roomTypes: userProfile.roomTypes,
      stylePreferences: userProfile.stylePreferences,
      budgetRange: userProfile.budgetRange,
      priorities: userProfile.priorities,
      location: userProfile.location,
      newsletter: userProfile.newsletter,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('kaniou_user_preferences', JSON.stringify(preferences));
    
    // Award points for completing onboarding
    const currentPoints = parseInt(localStorage.getItem('kaniou_user_points') || '0');
    localStorage.setItem('kaniou_user_points', (currentPoints + 50).toString());
    
    onComplete();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return userProfile.name.length > 0;
      case 2: return userProfile.homeType && userProfile.roomTypes.length > 0;
      case 3: return userProfile.stylePreferences.length > 0;
      case 4: return userProfile.priorities.length > 0;
      default: return true;
    }
  };

  if (isCompleted) {
    return null; // Hide wizard when completed
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {steps[currentStep].icon}
              <div>
                <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
                <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground"
            >
              Overslaan
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Stap {currentStep + 1} van {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} />
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <div className="min-h-[400px]">
            {steps[currentStep].component}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Vorige
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Voltooien
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Volgende
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}