import { useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  ArrowRight,
  Minus,
  Plus,
  Package,
  Truck,
  Loader2
} from "lucide-react";

function getSessionId(): string {
  let sessionId = localStorage.getItem("kaniou_shop_session");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("kaniou_shop_session", sessionId);
  }
  return sessionId;
}

interface CartData {
  items: any[];
  itemCount: number;
  subtotal: number;
}

export default function CartPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const sessionId = getSessionId();
  
  const { data: cart, isLoading } = useQuery<CartData>({
    queryKey: ["/api/shop/cart", sessionId],
  });
  
  const removeItemMutation = useMutation({
    mutationFn: async (itemId: number) => {
      return apiRequest(`/api/shop/cart/${itemId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shop/cart"] });
      toast({ title: "Item verwijderd" });
    },
  });
  
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      return apiRequest(`/api/shop/cart/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shop/cart"] });
    },
  });
  
  const shippingCost = useMemo(() => {
    if (!cart) return 0;
    return cart.subtotal >= 150 ? 0 : 9.95;
  }, [cart?.subtotal]);
  
  const totalAmount = useMemo(() => {
    if (!cart) return 0;
    return cart.subtotal + shippingCost;
  }, [cart?.subtotal, shippingCost]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C4A36C]" />
      </div>
    );
  }
  
  const isEmpty = !cart || cart.items.length === 0;
  
  return (
    <>
      <Helmet>
        <title>Winkelwagen | KANIOU Shop</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => setLocation("/shop")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Verder winkelen
            </Button>
            <h1 className="text-2xl font-light">Winkelwagen</h1>
          </div>
          
          {isEmpty ? (
            <Card className="max-w-md mx-auto text-center p-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Je winkelwagen is leeg</h2>
              <p className="text-gray-500 mb-6">
                Ontdek onze collectie gordijnstoffen en vind de perfecte stof voor jouw interieur.
              </p>
              <Button onClick={() => setLocation("/shop")} className="bg-[#C4A36C] hover:bg-[#B39356]">
                Bekijk onze stoffen
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.fabric?.imageUrl ? (
                            <img 
                              src={item.fabric.imageUrl} 
                              alt={item.fabric.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <Package className="w-8 h-8 text-gray-300" />
                            </div>
                          )}
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.fabric?.name || 'Stof'}</h3>
                              <p className="text-sm text-gray-500">
                                {item.widthCm} x {item.heightCm} cm
                                {item.pleat && ` • ${item.pleat.name}`}
                              </p>
                              {item.isMadeToMeasure && (
                                <span className="text-xs text-[#C4A36C]">Op maat gemaakt</span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => removeItemMutation.mutate(item.id)}
                              disabled={removeItemMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantityMutation.mutate({ 
                                  itemId: item.id, 
                                  quantity: Math.max(1, (item.quantity || 1) - 1) 
                                })}
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity || 1}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantityMutation.mutate({ 
                                  itemId: item.id, 
                                  quantity: (item.quantity || 1) + 1 
                                })}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <span className="font-semibold text-[#C4A36C]">
                              €{(item.calculatedPrice * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Overzicht</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotaal ({cart.itemCount} items)</span>
                      <span>€{cart.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Verzending
                      </span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        <span>€{shippingCost.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {shippingCost > 0 && (
                      <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded">
                        Nog €{(150 - cart.subtotal).toFixed(2)} voor gratis verzending
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Totaal</span>
                      <span className="text-[#C4A36C]">€{totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#C4A36C] hover:bg-[#B39356]"
                      size="lg"
                      onClick={() => setLocation("/shop/checkout")}
                      data-testid="button-checkout"
                    >
                      Afrekenen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Veilig betalen met Stripe
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
