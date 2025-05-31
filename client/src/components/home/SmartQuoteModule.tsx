import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Container from "@/components/ui/container";
import { Link } from "wouter";
import { 
  Calculator, 
  Clock, 
  Euro, 
  ArrowRight, 
  Zap,
  CheckCircle,
  Home,
  Ruler
} from "lucide-react";

const SmartQuoteModule = () => {
  const [roomType, setRoomType] = useState("");
  const [windowCount, setWindowCount] = useState("");
  const [productType, setProductType] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const roomTypes = [
    { value: "living", label: "Woonkamer" },
    { value: "bedroom", label: "Slaapkamer" },
    { value: "kitchen", label: "Keuken" },
    { value: "office", label: "Kantoor" },
    { value: "bathroom", label: "Badkamer" }
  ];

  const productTypes = [
    { value: "rolgordijnen", label: "Rolgordijnen", basePrice: 45 },
    { value: "overgordijnen", label: "Overgordijnen", basePrice: 85 },
    { value: "lamellen", label: "Lamellen", basePrice: 65 },
    { value: "jaloezieen", label: "Jaloezieën", basePrice: 75 },
    { value: "plisse", label: "Plissé gordijnen", basePrice: 55 }
  ];

  const calculateEstimate = () => {
    if (!roomType || !windowCount || !productType) return;
    
    const selectedProduct = productTypes.find(p => p.value === productType);
    if (!selectedProduct) return;
    
    const basePrice = selectedProduct.basePrice;
    const windows = parseInt(windowCount);
    const roomMultiplier = roomType === "living" ? 1.2 : roomType === "bedroom" ? 1.1 : 1.0;
    
    const estimate = Math.round(basePrice * windows * roomMultiplier);
    setEstimatedPrice(estimate);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-[#d5c096]/5 via-white to-primary/5">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-[#d5c096] to-[#c4b183] text-white">
              <Calculator className="h-4 w-4 mr-2" />
              Slimme Prijscalculator
            </Badge>
            <h2 className="font-display text-2xl md:text-3xl text-primary font-semibold mb-4">
              Krijg Direct Een Prijsindicatie
            </h2>
            <p className="font-body text-gray-600 max-w-2xl mx-auto text-base">
              Bereken in 30 seconden een indicatieve prijs voor uw raambekleding
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Calculator */}
            <Card className="border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2 text-[#d5c096]" />
                  Snelle Berekening
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Type ruimte
                  </label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer ruimte" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((room) => (
                        <SelectItem key={room.value} value={room.value}>
                          {room.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Aantal ramen
                  </label>
                  <Select value={windowCount} onValueChange={setWindowCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer aantal" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count} {count === 1 ? 'raam' : 'ramen'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Type product
                  </label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map((product) => (
                        <SelectItem key={product.value} value={product.value}>
                          {product.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateEstimate}
                  className="w-full bg-gradient-to-r from-[#d5c096] to-[#c4b183] hover:from-[#c4b183] hover:to-[#b3a070] text-white"
                  disabled={!roomType || !windowCount || !productType}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Bereken Prijsindicatie
                </Button>

                {estimatedPrice && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-700 font-medium">Geschatte prijs:</p>
                        <p className="text-2xl font-bold text-green-800">€{estimatedPrice},-</p>
                        <p className="text-xs text-green-600 mt-1">*Exclusief montage en BTW</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features & Benefits */}
            <Card className="border-2 border-[#d5c096]/20 bg-gradient-to-br from-[#d5c096]/5 to-white">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Euro className="h-5 w-5 mr-2 text-primary" />
                  Waarom Onze Prijscalculator?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-[#d5c096] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Instant Resultaat</h4>
                      <p className="text-sm text-gray-600">Direct een betrouwbare prijsindicatie</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Ruler className="h-5 w-5 text-[#d5c096] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Op Maat Berekend</h4>
                      <p className="text-sm text-gray-600">Gebaseerd op uw specifieke wensen</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Home className="h-5 w-5 text-[#d5c096] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Geen Verrassingen</h4>
                      <p className="text-sm text-gray-600">Transparante prijsopbouw</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link href="/price-calculator">
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Uitgebreide Calculator
                    </Button>
                  </Link>
                </div>

                <div className="pt-2">
                  <Link href="/quote">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      Gratis Offerte Aanvragen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SmartQuoteModule;