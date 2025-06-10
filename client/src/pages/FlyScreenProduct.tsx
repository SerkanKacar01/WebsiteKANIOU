import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/ui/container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertFlyScreenOrderSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Check, Clock, Shield, Truck, Settings, Phone, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type FlyScreenOrderForm = z.infer<typeof insertFlyScreenOrderSchema>;

interface PriceCalculation {
  success: boolean;
  basePrice: number;
  totalPrice: number;
  breakdown: {
    base: number;
    extraWidth: number;
    extraHeight: number;
    blackMesh: number;
  };
}

export default function FlyScreenProduct() {
  const [currentPrice, setCurrentPrice] = useState<number>(49.95);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FlyScreenOrderForm>({
    resolver: zodResolver(insertFlyScreenOrderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      width: 80,
      height: 120,
      frameColor: "white",
      meshColor: "grey",
      notes: "",
      deliveryAddress: "",
      deliveryZipCode: "",
      deliveryCity: "",
    },
  });

  const watchedFields = form.watch(["width", "height", "meshColor"]);

  // Calculate price when dimensions or mesh color changes
  const { data: priceData } = useQuery<PriceCalculation>({
    queryKey: ["/api/fly-screen-price", watchedFields[0], watchedFields[1], watchedFields[2]],
    queryFn: async () => {
      const response = await fetch("/api/fly-screen-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          width: watchedFields[0],
          height: watchedFields[1],
          meshColor: watchedFields[2]
        })
      });
      if (!response.ok) throw new Error('Failed to calculate price');
      return response.json();
    },
    enabled: !!(watchedFields[0] && watchedFields[1]),
  });

  useEffect(() => {
    if (priceData?.totalPrice) {
      setCurrentPrice(priceData.totalPrice);
    }
  }, [priceData]);

  const orderMutation = useMutation({
    mutationFn: async (data: FlyScreenOrderForm) => {
      const response = await fetch("/api/fly-screen-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to place order');
      }
      return response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Bestelling succesvol geplaatst!",
        description: `Uw bestelnummer is: ${response.order.orderNumber}`,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/fly-screen-orders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij bestelling",
        description: error.message || "Er is een fout opgetreden",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FlyScreenOrderForm) => {
    orderMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">
                Nieuw Product
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Custom Fly Screen Frame – Snap-On Inset Model
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Install without screws or damage – perfectly fitting fly screen frames 
                custom-made for your windows.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">€{currentPrice.toFixed(2)}</div>
                  <div className="text-sm opacity-75">vanaf</div>
                </div>
                <div className="h-12 w-px bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>7-10 werkdagen</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Fly Screen with Clamp System" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Specifications */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader className="text-center">
                <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Eenvoudige Installatie</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Gereedschapsvrije installatie met geïntegreerde veerbeugels – 
                  geen boren vereist
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>2 Jaar Garantie</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Volledige fabrieksgarantie op materialen en vakmanschap
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Op Maat Gemaakt</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  100% op maat gemaakt in België voor perfecte pasvorm
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">Product Specificaties</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Producttype</h3>
                  <p className="text-muted-foreground">Op maat gemaakte klembevestigde vliegengordijn (Opzet/Inzet hor)</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Kadermateriaal</h3>
                  <p className="text-muted-foreground">Duurzaam, gepoedercoat aluminium voor langdurig gebruik</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Installatiemethode</h3>
                  <p className="text-muted-foreground">Gereedschapsvrije installatie met geïntegreerde veerbeugels — geen boren vereist</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Raamcompatibiliteit</h3>
                  <p className="text-muted-foreground">Specifiek ontworpen voor draai-kiep ramen (PVC en aluminium frames)</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Beschikbare Kaderkleuren</h3>
                  <div className="flex gap-4">
                    <Badge variant="outline">Wit</Badge>
                    <Badge variant="outline">Zwart</Badge>
                    <Badge variant="outline">Antraciet</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Gaasopties</h3>
                  <div className="flex gap-4">
                    <Badge variant="outline">Standaard: Grijs (inbegrepen)</Badge>
                    <Badge variant="outline">Optioneel: Zwart gaas (+€5 toeslag)</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Bestel Nu</CardTitle>
                  <p className="text-muted-foreground">
                    Vul de afmetingen en uw gegevens in om uw vliegengordijn te bestellen
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Dimensions */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="width"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Breedte (cm)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="30"
                                  max="200"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hoogte (cm)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="30"
                                  max="200"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Colors */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="frameColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kaderkleur</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecteer kleur" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="white">Wit</SelectItem>
                                  <SelectItem value="black">Zwart</SelectItem>
                                  <SelectItem value="anthracite">Antraciet</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="meshColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gaaskleur</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecteer gaas" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="grey">Grijs (standaard)</SelectItem>
                                  <SelectItem value="black">Zwart (+€5)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Price Display */}
                      {priceData && (
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Prijsoverzicht</h3>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Basisprijs:</span>
                              <span>€{priceData.breakdown.base.toFixed(2)}</span>
                            </div>
                            {priceData.breakdown.extraWidth > 0 && (
                              <div className="flex justify-between">
                                <span>Extra breedte:</span>
                                <span>€{priceData.breakdown.extraWidth.toFixed(2)}</span>
                              </div>
                            )}
                            {priceData.breakdown.extraHeight > 0 && (
                              <div className="flex justify-between">
                                <span>Extra hoogte:</span>
                                <span>€{priceData.breakdown.extraHeight.toFixed(2)}</span>
                              </div>
                            )}
                            {priceData.breakdown.blackMesh > 0 && (
                              <div className="flex justify-between">
                                <span>Zwart gaas:</span>
                                <span>€{priceData.breakdown.blackMesh.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="border-t pt-1 flex justify-between font-semibold">
                              <span>Totaal:</span>
                              <span>€{priceData.totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Customer Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Voornaam</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Achternaam</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mailadres</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefoonnummer (optioneel)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Delivery Address */}
                      <FormField
                        control={form.control}
                        name="deliveryAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Leveradres</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="deliveryZipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postcode</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="deliveryCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Plaats</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Opmerkingen (optioneel)</FormLabel>
                            <FormControl>
                              <Textarea rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={orderMutation.isPending}
                      >
                        {orderMutation.isPending ? "Bestelling plaatsen..." : "Bestellen & Betalen"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-center mb-12">
            Veelgestelde Vragen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Wat is het verschil tussen opzet en inzet frames?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Opzet frames worden aan de buitenkant van het raam geplaatst, 
                  terwijl inzet frames in de raamopening worden geplaatst. 
                  Ons systeem is geschikt voor beide toepassingen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hoe meet ik mijn raam op?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Meet de breedte en hoogte van uw raamopening op drie punten. 
                  Gebruik de kleinste maat voor een perfecte pasvorm. 
                  Bij twijfel kunt u contact met ons opnemen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kan ik het zelf installeren?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ja! Onze vliegengordijnen zijn ontworpen voor eenvoudige 
                  doe-het-zelf installatie zonder gereedschap. 
                  Instructies worden meegeleverd.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wat als het niet past?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aangezien elk vliegengordijn op maat wordt gemaakt, 
                  adviseren we om zorgvuldig te meten. Bij problemen 
                  kunt u contact opnemen voor een oplossing.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold mb-6">
              Hulp Nodig?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Onze experts staan klaar om u te helpen met uw vliegengordijn bestelling. 
              Neem contact op voor persoonlijk advies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Bel Ons
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}