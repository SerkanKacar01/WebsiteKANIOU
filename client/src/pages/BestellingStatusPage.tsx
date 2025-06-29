import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, Phone, Truck, Home, Package, Download, Mail, MessageCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import type { PaymentOrder } from '@shared/schema';

// Status mapping for display
const statusSteps = [
  { key: 'pending', label: 'Bestelling in verwerking', icon: Package },
  { key: 'Nieuw', label: 'Bestelling ontvangen', icon: Package },
  { key: 'Bestelling in verwerking', label: 'Bestelling in verwerking', icon: Clock },
  { key: 'Bestelling verwerkt', label: 'Bestelling verwerkt', icon: CheckCircle },
  { key: 'Bestelling in productie', label: 'Bestelling in productie', icon: Truck },
  { key: 'Bestelling is gereed', label: 'Bestelling is gereed', icon: CheckCircle },
  { key: 'U wordt gebeld voor levering', label: 'U wordt gebeld voor levering', icon: Phone },
  { key: 'Bestelling geleverd', label: 'Bestelling geleverd', icon: Home }
];

interface OrderStatus {
  id: number;
  orderNumber: string;
  bonnummer?: string;
  currentStatus: string;
  lastUpdate: string;
  productDetails: {
    productType: string;
    color?: string;
    dimensions?: string;
    quantity?: number;
  };
  businessNotes?: string;
  statuses: {
    id: number;
    name: string;
    completed: boolean;
    active: boolean;
    date?: string;
    icon: any;
  }[];
}

const BestellingStatusPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Notification preferences state
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [preferencesLoading, setPreferencesLoading] = useState(false);

  // Fetch order data from API
  const { data: order, isLoading, error } = useQuery<PaymentOrder>({
    queryKey: ['/api/orders', id],
    enabled: !!id,
    retry: false
  });

  // Helper function to format date
  const formatDate = (dateStr: string | Date | null | undefined) => {
    if (!dateStr) return "Onbekend";
    
    try {
      const date = new Date(dateStr);
      return format(date, "dd/MM/yyyy", { locale: nl });
    } catch {
      return "Onbekend";
    }
  };

  // Helper function to determine current status step
  const getCurrentStatusStep = (status: string) => {
    const currentStep = statusSteps.findIndex(step => 
      step.key === status || step.label === status
    );
    return currentStep >= 0 ? currentStep : 0;
  };

  // Helper function to extract product details
  const getProductDetails = (productDetailsStr: string | null, description: string) => {
    let productType = "Raambekledingsproduct";
    
    try {
      if (productDetailsStr) {
        const details = JSON.parse(productDetailsStr);
        productType = details.productType || details.product || "Raambekledingsproduct";
      }
    } catch {
      // Use description as fallback
      productType = description || "Raambekledingsproduct";
    }

    return {
      productType,
      color: "Volgens specificatie",
      dimensions: "Op maat",
      quantity: 1
    };
  };

  // Convert order data to display format
  const orderStatus: OrderStatus | null = order ? {
    id: order.id,
    orderNumber: order.bonnummer || order.orderNumber || `#${order.id}`,
    bonnummer: order.bonnummer,
    currentStatus: order.status || "Nieuw",
    lastUpdate: formatDate(order.updatedAt || order.createdAt),
    productDetails: getProductDetails(order.productDetails, order.description),
    businessNotes: order.clientNote || order.noteFromEntrepreneur || undefined,
    statuses: statusSteps.map((step, index) => {
      const currentStepIndex = getCurrentStatusStep(order.status || "Nieuw");
      return {
        id: index + 1,
        name: step.label,
        completed: index < currentStepIndex,
        active: index === currentStepIndex,
        date: index === currentStepIndex ? formatDate(order.updatedAt || order.createdAt) : undefined,
        icon: step.icon
      };
    })
  } : null;

  const handleDownloadInvoice = () => {
    // Mock PDF download - replace with real implementation
    const link = document.createElement('a');
    link.href = '#';
    link.download = `bestelbon-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNotificationPreferences = async () => {
    if (!notifyByEmail) {
      toast({
        title: "E-mail notificaties vereist",
        description: "E-mail is vereist voor bestellingsupdates.",
        variant: "destructive",
      });
      return;
    }

    if (notifyByEmail && !notificationEmail) {
      toast({
        title: "⚠️ E-mailadres is vereist",
        variant: "destructive",
      });
      return;
    }

    setPreferencesLoading(true);

    try {
      const response = await fetch(`/api/orders/${id}/notification-preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notifyByEmail,
          notificationEmail: notifyByEmail ? notificationEmail : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      toast({
        title: "Voorkeuren opgeslagen",
        description: "Uw notificatievoorkeuren zijn succesvol bijgewerkt.",
      });
    } catch (error) {
      toast({
        title: "Fout bij opslaan",
        description: "Er is een fout opgetreden. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setPreferencesLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#E6C988] text-white text-center py-4">
          <h1 className="text-xl font-semibold">Uw Bestelstatus</h1>
        </div>
        
        <div className="px-4 py-6 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#E6C988]" />
            <p className="text-gray-600">Bestellingsgegevens laden...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#E6C988] text-white text-center py-4">
          <h1 className="text-xl font-semibold">Uw Bestelstatus</h1>
        </div>
        
        <div className="px-4 py-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Bestelling niet gevonden</h3>
                <p className="text-gray-600">
                  Deze bestelling bestaat niet of is niet toegankelijk. 
                  Controleer het order-ID en probeer opnieuw.
                </p>
                <Button
                  onClick={() => window.history.back()}
                  className="bg-[#E6C988] hover:bg-[#D4B876] text-white"
                >
                  Terug
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main content with valid order data
  if (!orderStatus) {
    return null; // This shouldn't happen, but prevents render issues
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#E6C988] text-white text-center py-4">
        <h1 className="text-xl font-semibold">Uw Bestelstatus</h1>
      </div>
      
      <div className="px-4 py-6 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!orderStatus) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#E6C988] text-white text-center py-4">
          <h1 className="text-xl font-semibold">Uw Bestelstatus</h1>
        </div>
        
        <div className="px-4 py-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">Bestelling niet gevonden</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#E6C988] text-white text-center py-4 sticky top-0 z-30">
        <h1 className="text-xl font-semibold">Uw Bestelstatus</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order Info Box */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Bestelnummer:</span>
                <span className="text-black">{orderStatus.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Huidige status:</span>
                <Badge className="bg-[#E6C988] text-white">
                  {orderStatus.currentStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Laatste update:</span>
                <span className="text-black">{orderStatus.lastUpdate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-black mb-4">Status voortgang</h3>
            <div className="space-y-4">
              {orderStatus.statuses.map((status, index) => (
                <div key={status.id} className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    status.completed 
                      ? 'bg-green-100 text-green-600' 
                      : status.active
                        ? 'bg-[#E6C988] text-white'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {status.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <status.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className={`text-sm font-medium ${
                        status.completed || status.active ? 'text-black' : 'text-gray-500'
                      }`}>
                        {status.name}
                      </p>
                      {status.date && (
                        <span className="text-xs text-gray-500">{status.date}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-black mb-4">Bestelgegevens</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Producttype:</span>
                <span className="text-black font-medium">{orderStatus.productDetails.productType}</span>
              </div>
              <div className="flex justify-between">
                
              </div>
              <div className="flex justify-between">
                
              </div>
              <div className="flex justify-between">
                
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Notes */}
        {orderStatus.businessNotes && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-black mb-3">Opmerkingen van de ondernemer</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {orderStatus.businessNotes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Download Invoice Button */}
        <Button 
          onClick={handleDownloadInvoice}
          className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-3 flex items-center justify-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download bestelbon (PDF)</span>
        </Button>

        {/* Notification Preferences */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#E6C988]" />
              Ontvang automatische updates over uw bestelling
            </h3>
            
            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={notifyByEmail}
                    onChange={(e) => setNotifyByEmail(e.target.checked)}
                    className="rounded border-gray-300 text-[#E6C988] focus:ring-[#E6C988] h-4 w-4"
                  />
                  <Label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    📧 Ja, ik wil updates ontvangen via e-mail
                  </Label>
                </div>
                
                {notifyByEmail && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="emailInput" className="text-sm font-medium text-gray-700">
                      Uw e-mailadres
                    </Label>
                    <Input
                      id="emailInput"
                      type="email"
                      placeholder="bijv. klant@email.com"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                      className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                    />
                  </div>
                )}
              </div>



              {/* Save Button */}
              <Button
                onClick={handleSaveNotificationPreferences}
                disabled={preferencesLoading || !notifyByEmail}
                className="w-full bg-[#E6C988] hover:bg-[#D4B876] text-white rounded-lg py-2"
              >
                {preferencesLoading ? "Opslaan..." : "Voorkeuren opslaan"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-black mb-3">Vragen over uw bestelling?</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>E-mail:</strong> info@kaniou.be</p>
              <p><strong>Telefoon:</strong> +32 123 456 789</p>
              <p><strong>Bestelnummer:</strong> {orderStatus.orderNumber}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BestellingStatusPage;