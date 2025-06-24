import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight, X } from "lucide-react";

interface RolgordijnIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConfiguration: () => void;
}

export const RolgordijnIntroModal = ({ isOpen, onClose, onStartConfiguration }: RolgordijnIntroModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Rolgordijnen</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero content */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Ontwerp uw perfecte rolgordijn op maat
            </h3>
          </div>

          {/* Description */}
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-700">
              Elegante rolgordijnen die perfect passen bij uw interieur en raamafmetingen.
            </p>
            <p className="text-gray-600">
              Van verduisterend tot transparant, met verschillende montage- en bedieningsopties.
            </p>
            <p className="text-gray-600">
              Volledig maatwerk voor optimale pasvorm en functionaliteit.
            </p>
          </div>

          {/* Key features */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary mb-1">Maatwerk</div>
              <div className="text-sm text-gray-600">Op maat gemaakt</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary mb-1">Kwaliteit</div>
              <div className="text-sm text-gray-600">Premium materialen</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary mb-1">Montage</div>
              <div className="text-sm text-gray-600">Professioneel</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary mb-1">Service</div>
              <div className="text-sm text-gray-600">Uitstekende support</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Button 
              onClick={onStartConfiguration}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3"
              size="lg"
            >
              <Settings className="w-5 h-5 mr-2" />
              Stel je rolgordijn samen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RolgordijnIntroModal;