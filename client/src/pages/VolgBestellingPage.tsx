import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, XCircle, AlertCircle, Package, Truck, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface OrderDetails {
  id: number;
  molliePaymentId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  mollieStatus?: string;
  productDetails?: any;
  customerDetails?: any;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

const VolgBestellingPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { toast } = useToast();

  const { data: orderDetails, isLoading, error } = useQuery<OrderDetails>({
    queryKey: ['/api/orders/track', orderNumber],
    queryFn: async () => {
      const response = await fetch(`/api/orders/track/${orderNumber}`);
      if (!response.ok) {
        throw new Error('Order not found');
      }
      return response.json();
    },
    enabled: searchTriggered && orderNumber.length > 0,
    retry: false,
  });

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
    setSearchTriggered(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'Betaald';
      case 'pending':
        return 'In behandeling';
      case 'failed':
        return 'Mislukt';
      case 'cancelled':
        return 'Geannuleerd';
      case 'expired':
        return 'Verlopen';
      default:
        return 'Onbekend';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderSteps = (status: string) => {
    const steps = [
      { id: 1, name: 'Bestelling ontvangen', icon: Package, completed: true },
      { id: 2, name: 'Betaling verwerkt', icon: CheckCircle, completed: status === 'paid' },
      { id: 3, name: 'In productie', icon: Clock, completed: false },
      { id: 4, name: 'Verzonden', icon: Truck, completed: false },
      { id: 5, name: 'Geleverd', icon: Home, completed: false },
    ];
    return steps;
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
                disabled={isLoading}
              >
                {isLoading ? "Zoeken..." : "Toon bestelling"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Order Details */}
      {searchTriggered && (
        <div className="px-4">
          {error && (
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-700 mb-2">
                    Bestelling niet gevonden
                  </h3>
                  <p className="text-red-600">
                    Controleer uw bestelnummer en probeer opnieuw.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {orderDetails && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Bestelling #{orderDetails.id}</span>
                    <Badge className={getStatusColor(orderDetails.status)}>
                      {getStatusIcon(orderDetails.status)}
                      <span className="ml-1">{getStatusText(orderDetails.status)}</span>
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Klant</p>
                      <p className="font-medium">{orderDetails.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Totaal</p>
                      <p className="font-medium">€{orderDetails.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Besteldatum</p>
                      <p className="font-medium">
                        {format(new Date(orderDetails.createdAt), 'dd MMMM yyyy', { locale: nl })}
                      </p>
                    </div>
                    {orderDetails.paidAt && (
                      <div>
                        <p className="text-gray-600">Betaald op</p>
                        <p className="font-medium">
                          {format(new Date(orderDetails.paidAt), 'dd MMMM yyyy', { locale: nl })}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-gray-600 text-sm">Beschrijving</p>
                    <p className="font-medium">{orderDetails.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Bestelstatus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getOrderSteps(orderDetails.status).map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          step.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <step.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            step.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.name}
                          </p>
                        </div>
                        {step.completed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Details */}
              {orderDetails.productDetails && (
                <Card>
                  <CardHeader>
                    <CardTitle>Product details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm bg-gray-50 p-3 rounded-lg overflow-auto">
                      {JSON.stringify(orderDetails.productDetails, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Vragen over uw bestelling?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Heeft u vragen over uw bestelling? Neem contact met ons op:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>E-mail:</strong> info@kaniou.be</p>
                    <p><strong>Telefoon:</strong> +32 123 456 789</p>
                    <p><strong>Bestelnummer:</strong> #{orderDetails.id}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VolgBestellingPage;