import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const VolgBestellingPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast({
        title: "Bestelnummer vereist",
        description: "Voer uw bestelnummer in om de status te bekijken.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate directly to the detailed status page
    setLocation(`/bestelling-status/${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Volg uw bestelling
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Voer uw bestelnummer in om de status te bekijken
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="px-4 py-6">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Bestelnummer</Label>
                <Input
                  id="orderNumber"
                  type="number"
                  placeholder="Bijvoorbeeld: 123456"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="text-lg"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#E6C988] hover:bg-[#D5B992] text-white font-medium py-3 rounded-xl"
              >
                Toon bestelling
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Help Information */}
      <div className="px-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Hulp nodig?</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>U vindt uw bestelnummer in de bevestigingsmail die u van ons heeft ontvangen na het plaatsen van uw bestelling.</p>
              <p className="mt-4"><strong>Contact:</strong></p>
              <p>Heeft u vragen of hulp nodig? Neem gerust contact met ons op:</p>
              <p>E-mail: info@kaniou.be</p>
              <p>Telefoon: +32 467 85 64 05</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolgBestellingPage;