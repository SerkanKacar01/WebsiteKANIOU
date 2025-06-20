import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle, Home, Palette, Settings, Quote, Wand2 } from "lucide-react";
import { Link } from "wouter";
import RoomTypeStep from "./steps/RoomTypeStep";
import PurposeStep from "./steps/PurposeStep";
import StyleStep from "./steps/StyleStep";
import BudgetStep from "./steps/BudgetStep";
import FeaturesStep from "./steps/FeaturesStep";
import ResultStep from "./steps/ResultStep";

export interface WizardData {
  roomType: string;
  windowSize: string;
  purpose: string[];
  style: string;
  budget: string;
  features: string[];
  colors: string[];
}

const STEPS = [
  { id: 'room', title: 'Ruimte', icon: Home },
  { id: 'purpose', title: 'Gebruik', icon: Settings },
  { id: 'style', title: 'Stijl', icon: Palette },
  { id: 'budget', title: 'Budget', icon: Quote },
  { id: 'features', title: 'Opties', icon: Wand2 },
  { id: 'result', title: 'Resultaat', icon: CheckCircle }
];

const CustomizationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    roomType: '',
    windowSize: '',
    purpose: [],
    style: '',
    budget: '',
    features: [],
    colors: []
  });
  const wizardRef = useRef<HTMLDivElement>(null);

  const updateWizardData = (updates: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...updates }));
  };

  // Utility function to scroll to wizard section smoothly
  const scrollToWizard = () => {
    if (wizardRef.current) {
      wizardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      // Add small delay to ensure DOM update, then scroll
      setTimeout(() => {
        scrollToWizard();
      }, 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Add small delay to ensure DOM update, then scroll
      setTimeout(() => {
        scrollToWizard();
      }, 100);
    }
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setWizardData({
      roomType: '',
      windowSize: '',
      purpose: [],
      style: '',
      budget: '',
      features: [],
      colors: []
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return wizardData.roomType && wizardData.windowSize;
      case 1: return wizardData.purpose.length > 0;
      case 2: return wizardData.style;
      case 3: return wizardData.budget;
      case 4: return true; // Features are optional
      case 5: return true; // Result step
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <RoomTypeStep data={wizardData} updateData={updateWizardData} />;
      case 1:
        return <PurposeStep data={wizardData} updateData={updateWizardData} />;
      case 2:
        return <StyleStep data={wizardData} updateData={updateWizardData} />;
      case 3:
        return <BudgetStep data={wizardData} updateData={updateWizardData} />;
      case 4:
        return <FeaturesStep data={wizardData} updateData={updateWizardData} />;
      case 5:
        return <ResultStep data={wizardData} onReset={resetWizard} />;
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto" ref={wizardRef}>
      {/* Progress Header */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl">Stap {currentStep + 1} van {STEPS.length}</CardTitle>
            <Badge variant="outline" className="text-sm">
              {Math.round(progressPercentage)}% voltooid
            </Badge>
          </div>
          <Progress value={progressPercentage} className="w-full h-2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isCurrent ? "text-primary" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <Card className="mb-8">
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Vorige
        </Button>

        <div className="flex gap-3">
          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              Volgende
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Link href="/quote">
              <Button className="flex items-center gap-2">
                Offerte Aanvragen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationWizard;