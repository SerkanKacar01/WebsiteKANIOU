import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, ArrowRight } from "lucide-react";
import RolgordijnIntroModal from "@/components/rolgordijn/RolgordijnIntroModal";
import RolgordijnConfigurationModal, { RolgordijnConfiguration } from "@/components/rolgordijn/RolgordijnConfigurationModal";

export const RolgordijnenCategoryButton = () => {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleConfigurationComplete = (configuration: RolgordijnConfiguration) => {
    console.log('Rolgordijn configuration from category:', configuration);
    // Here you would typically add to cart or save the configuration
  };

  const startConfiguration = () => {
    setShowIntroModal(false);
    setShowConfigModal(true);
  };

  return (
    <>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-secondary/30 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
          
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <Badge className="bg-secondary text-white">
              Populair
            </Badge>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
            <Settings className="h-8 w-8 text-secondary" />
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
            Rolgordijnen
          </h3>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            Praktisch & stijlvol op maat
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6 text-left">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Verduisterend tot transparant
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Verschillende montage-opties
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Volledig maatwerk
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => setShowIntroModal(true)}
            className="w-full bg-secondary hover:bg-secondary/90 text-white group-hover:shadow-lg transition-all duration-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Stel samen
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Price indication */}
          <p className="text-sm text-gray-500 mt-3">
            Vanaf €89,95
          </p>
        </CardContent>
      </Card>

      {/* Modals */}
      <RolgordijnIntroModal
        isOpen={showIntroModal}
        onClose={() => setShowIntroModal(false)}
        onStartConfiguration={startConfiguration}
      />

      <RolgordijnConfigurationModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onComplete={handleConfigurationComplete}
      />
    </>
  );
};

export default RolgordijnenCategoryButton;