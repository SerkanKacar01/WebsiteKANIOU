import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  ShoppingCart, 
  Ruler, 
  ArrowLeft, 
  Check, 
  Info,
  Minus,
  Plus,
  Loader2
} from "lucide-react";
import type { CurtainFabric, PleatType } from "@shared/schema";

// Generate or retrieve session ID
function getSessionId(): string {
  let sessionId = localStorage.getItem("kaniou_shop_session");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("kaniou_shop_session", sessionId);
  }
  return sessionId;
}

export default function FabricConfiguratorPage() {
  const [, params] = useRoute("/shop/stof/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fabricId = params?.id ? parseInt(params.id) : null;
  
  // Form state
  const [widthCm, setWidthCm] = useState<number>(100);
  const [heightCm, setHeightCm] = useState<number>(200);
  const [selectedPleatId, setSelectedPleatId] = useState<number | null>(null);
  const [isMadeToMeasure, setIsMadeToMeasure] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  
  // Fetch fabric details
  const { data: fabric, isLoading: fabricLoading } = useQuery<CurtainFabric>({
    queryKey: ["/api/shop/fabrics", fabricId],
    enabled: !!fabricId,
  });
  
  // Fetch pleat types
  const { data: pleats = [] } = useQuery<PleatType[]>({
    queryKey: ["/api/shop/pleats"],
  });
  
  // Set default pleat (first one - no pleat)
  useEffect(() => {
    if (pleats.length > 0 && selectedPleatId === null) {
      setSelectedPleatId(pleats[0].id);
    }
  }, [pleats]);
  
  // Calculate price
  const selectedPleat = pleats.find(p => p.id === selectedPleatId);
  
  const calculatedPrice = useMemo(() => {
    if (!fabric) return 0;
    
    const widthM = widthCm / 100;
    const heightM = heightCm / 100;
    const fabricMultiplier = selectedPleat?.fabricMultiplier || 1.0;
    const fabricWidthNeeded = widthM * fabricMultiplier;
    
    const fabricCost = fabricWidthNeeded * heightM * fabric.pricePerMeter;
    const pleatCost = fabricWidthNeeded * (selectedPleat?.pricePerMeter || 0);
    const madeToMeasureSurcharge = isMadeToMeasure ? (fabricCost + pleatCost) * 0.15 : 0;
    
    return Math.round((fabricCost + pleatCost + madeToMeasureSurcharge) * quantity * 100) / 100;
  }, [fabric, widthCm, heightCm, selectedPleat, isMadeToMeasure, quantity]);
  
  // Validation
  const minWidth = fabric?.minWidth || 30;
  const maxHeight = fabric?.maxHeight || 300;
  const widthError = widthCm < minWidth ? `Minimale breedte is ${minWidth} cm` : null;
  const heightError = heightCm > maxHeight ? `Maximale hoogte is ${maxHeight} cm` : null;
  const isValid = !widthError && !heightError && widthCm > 0 && heightCm > 0;
  
  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("/api/shop/cart", {
        method: "POST",
        body: JSON.stringify({
          sessionId: getSessionId(),
          fabricId: fabric?.id,
          pleatId: selectedPleatId,
          widthCm,
          heightCm,
          quantity,
          isMadeToMeasure,
          notes: notes || undefined,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shop/cart"] });
      toast({
        title: "Toegevoegd aan winkelwagen",
        description: `${fabric?.name} is toegevoegd aan je winkelwagen.`,
      });
      setLocation("/shop/winkelwagen");
    },
    onError: (error: any) => {
      toast({
        title: "Fout",
        description: error.message || "Kon niet toevoegen aan winkelwagen",
        variant: "destructive",
      });
    },
  });
  
  if (fabricLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C4A36C]" />
      </div>
    );
  }
  
  if (!fabric) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Stof niet gevonden</p>
        <Button onClick={() => setLocation("/shop")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar shop
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{fabric.name} Configureren | KANIOU Shop</title>
        <meta name="description" content={`Bestel ${fabric.name} op maat. ${fabric.description}`} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setLocation("/shop")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug naar shop
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Product Info */}
            <div>
              <Card className="overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100">
                  {fabric.imageUrl ? (
                    <img 
                      src={fabric.imageUrl} 
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-gray-400">{fabric.name}</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-light mb-1">{fabric.name}</h1>
                      <p className="text-gray-500">{fabric.material} • {fabric.color}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-semibold text-[#C4A36C]">
                        €{fabric.pricePerMeter.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 block">/meter</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{fabric.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Max. hoogte: {fabric.maxHeight} cm</Badge>
                    <Badge variant="outline">{fabric.washable ? "Wasbaar" : "Stomen"}</Badge>
                    <Badge variant="outline">{fabric.weight}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right: Configurator */}
            <div className="space-y-6">
              {/* Dimensions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Ruler className="w-5 h-5 mr-2 text-[#C4A36C]" />
                    Afmetingen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Breedte (cm)</Label>
                      <Input
                        id="width"
                        type="number"
                        min={minWidth}
                        value={widthCm}
                        onChange={(e) => setWidthCm(parseInt(e.target.value) || 0)}
                        className={widthError ? "border-red-500" : ""}
                        data-testid="input-width"
                      />
                      {widthError && <p className="text-red-500 text-xs mt-1">{widthError}</p>}
                      <p className="text-xs text-gray-500 mt-1">Min. {minWidth} cm</p>
                    </div>
                    <div>
                      <Label htmlFor="height">Hoogte (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        min={30}
                        max={maxHeight}
                        value={heightCm}
                        onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
                        className={heightError ? "border-red-500" : ""}
                        data-testid="input-height"
                      />
                      {heightError && <p className="text-red-500 text-xs mt-1">{heightError}</p>}
                      <p className="text-xs text-gray-500 mt-1">Max. {maxHeight} cm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Pleat Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Plooi Selecteren</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={selectedPleatId?.toString()} 
                    onValueChange={(v) => setSelectedPleatId(parseInt(v))}
                    className="space-y-3"
                  >
                    {pleats.map((pleat) => (
                      <div
                        key={pleat.id}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPleatId === pleat.id 
                            ? "border-[#C4A36C] bg-[#C4A36C]/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPleatId(pleat.id)}
                      >
                        <RadioGroupItem value={pleat.id.toString()} id={`pleat-${pleat.id}`} />
                        <div className="flex-1">
                          <Label htmlFor={`pleat-${pleat.id}`} className="cursor-pointer font-medium">
                            {pleat.name}
                          </Label>
                          {pleat.description && (
                            <p className="text-xs text-gray-500">{pleat.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          {pleat.pricePerMeter > 0 ? (
                            <span className="text-sm font-medium">+€{pleat.pricePerMeter.toFixed(2)}/m</span>
                          ) : (
                            <span className="text-sm text-gray-400">Inbegrepen</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
              
              {/* Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Opties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="made-to-measure" className="font-medium">Op maat gemaakt</Label>
                      <p className="text-xs text-gray-500">
                        Professioneel afgewerkt door onze specialisten (+15%)
                      </p>
                    </div>
                    <Switch
                      id="made-to-measure"
                      checked={isMadeToMeasure}
                      onCheckedChange={setIsMadeToMeasure}
                      data-testid="switch-made-to-measure"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="quantity">Aantal</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center"
                        data-testid="input-quantity"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Opmerkingen (optioneel)</Label>
                    <Input
                      id="notes"
                      placeholder="Speciale wensen..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      data-testid="input-notes"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Price Summary & Add to Cart */}
              <Card className="bg-gray-900 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">Subtotaal</span>
                    <span className="text-3xl font-semibold">€{calculatedPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Stof ({widthCm} x {heightCm} cm)</span>
                      <span>€{fabric.pricePerMeter.toFixed(2)}/m</span>
                    </div>
                    {selectedPleat && selectedPleat.pricePerMeter > 0 && (
                      <div className="flex justify-between">
                        <span>{selectedPleat.name}</span>
                        <span>+€{selectedPleat.pricePerMeter.toFixed(2)}/m</span>
                      </div>
                    )}
                    {isMadeToMeasure && (
                      <div className="flex justify-between">
                        <span>Op maat gemaakt</span>
                        <span>+15%</span>
                      </div>
                    )}
                    {quantity > 1 && (
                      <div className="flex justify-between">
                        <span>Aantal</span>
                        <span>x{quantity}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    className="w-full bg-[#C4A36C] hover:bg-[#B39356] text-white"
                    size="lg"
                    disabled={!isValid || addToCartMutation.isPending}
                    onClick={() => addToCartMutation.mutate()}
                    data-testid="button-add-to-cart"
                  >
                    {addToCartMutation.isPending ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-5 h-5 mr-2" />
                    )}
                    Toevoegen aan Winkelwagen
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center mt-3">
                    <Info className="w-3 h-3 inline mr-1" />
                    Gratis verzending vanaf €150
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
