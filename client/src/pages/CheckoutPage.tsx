import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  ArrowLeft, 
  Truck,
  Shield,
  CreditCard,
  CheckCircle,
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

const checkoutSchema = z.object({
  customerEmail: z.string().email("Ongeldig e-mailadres"),
  customerFirstName: z.string().min(1, "Voornaam is verplicht"),
  customerLastName: z.string().min(1, "Achternaam is verplicht"),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(1, "Adres is verplicht"),
  shippingCity: z.string().min(1, "Stad is verplicht"),
  shippingPostalCode: z.string().min(1, "Postcode is verplicht"),
  shippingCountry: z.string().default("BE"),
  customerNote: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CartData {
  items: any[];
  itemCount: number;
  subtotal: number;
}

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const sessionId = getSessionId();
  const [orderComplete, setOrderComplete] = useState<{ orderNumber: string; totalAmount: number } | null>(null);
  
  const { data: cart, isLoading } = useQuery<CartData>({
    queryKey: ["/api/shop/cart", sessionId],
  });
  
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerEmail: "",
      customerFirstName: "",
      customerLastName: "",
      customerPhone: "",
      shippingAddress: "",
      shippingCity: "",
      shippingPostalCode: "",
      shippingCountry: "BE",
      customerNote: "",
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
  
  const checkoutMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      return apiRequest("/api/shop/checkout", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          sessionId,
        }),
      });
    },
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/shop/cart"] });
      setOrderComplete({
        orderNumber: result.order.orderNumber,
        totalAmount: result.order.totalAmount,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij bestellen",
        description: error.message || "Er is iets misgegaan. Probeer opnieuw.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: CheckoutFormData) => {
    checkoutMutation.mutate(data);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C4A36C]" />
      </div>
    );
  }
  
  if (!cart || cart.items.length === 0) {
    setLocation("/shop/winkelwagen");
    return null;
  }
  
  // Order confirmation screen
  if (orderComplete) {
    return (
      <>
        <Helmet>
          <title>Bestelling Bevestigd | KANIOU Shop</title>
        </Helmet>
        
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto text-center p-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-medium mb-2">Bedankt voor je bestelling!</h1>
              <p className="text-gray-600 mb-6">
                Je bestelling is succesvol geplaatst. Je ontvangt een bevestigingsmail.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">Bestelnummer</p>
                <p className="text-xl font-semibold text-[#C4A36C]">{orderComplete.orderNumber}</p>
              </div>
              
              <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Betaling
                </h3>
                <p className="text-sm text-gray-600">
                  Je bestelling is aangemaakt. We nemen binnen 24 uur contact met je op voor de betaling via Stripe.
                </p>
                <p className="text-lg font-semibold mt-2">
                  Totaal: €{orderComplete.totalAmount.toFixed(2)}
                </p>
              </div>
              
              <Button 
                onClick={() => setLocation("/shop")}
                className="bg-[#C4A36C] hover:bg-[#B39356]"
              >
                Verder winkelen
              </Button>
            </Card>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Afrekenen | KANIOU Shop</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => setLocation("/shop/winkelwagen")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug naar winkelwagen
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contactgegevens</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mailadres *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email" 
                                placeholder="je@email.com"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="customerFirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Voornaam *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-firstname" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="customerLastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Achternaam *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-lastname" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefoonnummer</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="+32 ..." data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Verzendadres
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="shippingAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Straat en huisnummer *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Voorbeeldstraat 123" data-testid="input-address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shippingPostalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postcode *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="1000" data-testid="input-postalcode" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="shippingCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stad *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Brussel" data-testid="input-city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Opmerkingen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="customerNote"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Speciale instructies voor je bestelling..."
                                rows={3}
                                data-testid="input-note"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Submit Button (mobile) */}
                  <div className="lg:hidden">
                    <Button 
                      type="submit"
                      className="w-full bg-[#C4A36C] hover:bg-[#B39356]"
                      size="lg"
                      disabled={checkoutMutation.isPending}
                      data-testid="button-place-order-mobile"
                    >
                      {checkoutMutation.isPending ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <CreditCard className="w-5 h-5 mr-2" />
                      )}
                      Bestelling Plaatsen - €{totalAmount.toFixed(2)}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Bestelling Overzicht</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">{item.fabric?.name}</p>
                          <p className="text-gray-500 text-xs">
                            {item.widthCm} x {item.heightCm} cm
                            {item.quantity > 1 && ` x${item.quantity}`}
                          </p>
                        </div>
                        <span>€{(item.calculatedPrice * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotaal</span>
                    <span>€{cart.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Verzending</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      <span>€{shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Totaal</span>
                    <span className="text-[#C4A36C]">€{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  {/* Submit Button (desktop) */}
                  <Button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-[#C4A36C] hover:bg-[#B39356] hidden lg:flex"
                    size="lg"
                    disabled={checkoutMutation.isPending}
                    onClick={form.handleSubmit(onSubmit)}
                    data-testid="button-place-order"
                  >
                    {checkoutMutation.isPending ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <CreditCard className="w-5 h-5 mr-2" />
                    )}
                    Bestelling Plaatsen
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    Veilig betalen met Stripe
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
