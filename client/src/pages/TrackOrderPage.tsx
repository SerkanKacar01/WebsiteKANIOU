import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Search, Download, CheckCircle, Clock, Package, Truck, Phone, MessageSquare } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  clientNote?: string;
  pdfFileName?: string;
  notificationPreference: 'email' | 'whatsapp' | 'both';
}

const statusSteps = [
  { key: 'pending', label: 'Bestelling in behandeling', icon: Clock },
  { key: 'confirmed', label: 'Bestelling bevestigd', icon: CheckCircle },
  { key: 'production', label: 'In productie', icon: Package },
  { key: 'ready_for_delivery', label: 'Klaar voor levering', icon: Truck },
  { key: 'contact_customer', label: 'U wordt gecontacteerd', icon: Phone },
  { key: 'completed', label: 'Voltooid', icon: CheckCircle }
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrderNumber, setSearchedOrderNumber] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch order details
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['/api/orders/track', searchedOrderNumber],
    enabled: !!searchedOrderNumber,
    retry: false
  });

  // Update notification preferences
  const updatePreferencesMutation = useMutation({
    mutationFn: async (preferences: { orderNumber: string; notificationPreference: string }) => {
      return apiRequest('/api/orders/update-preferences', {
        method: 'POST',
        body: JSON.stringify(preferences)
      });
    },
    onSuccess: () => {
      toast({
        title: "Voorkeuren bijgewerkt",
        description: "Uw notificatie voorkeuren zijn succesvol opgeslagen.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/orders/track', searchedOrderNumber] });
    },
    onError: () => {
      toast({
        title: "Fout bij bijwerken",
        description: "Er ging iets mis bij het opslaan van uw voorkeuren.",
        variant: "destructive"
      });
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast({
        title: "Bestelnummer vereist",
        description: "Voer uw bestelnummer in om de status te bekijken.",
        variant: "destructive"
      });
      return;
    }
    setSearchedOrderNumber(orderNumber.trim());
  };

  const handleDownloadPdf = () => {
    if (order?.pdfFileName) {
      // Create download link for PDF
      const link = document.createElement('a');
      link.href = `/api/orders/${order.id}/pdf`;
      link.download = order.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUpdatePreferences = () => {
    if (!order) return;

    let preference = 'email';
    if (emailNotifications && whatsappNotifications) {
      preference = 'both';
    } else if (whatsappNotifications) {
      preference = 'whatsapp';
    } else if (emailNotifications) {
      preference = 'email';
    }

    updatePreferencesMutation.mutate({
      orderNumber: order.orderNumber,
      notificationPreference: preference
    });
  };

  const getCurrentStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Initialize notification preferences when order is loaded
  React.useEffect(() => {
    if (order) {
      setEmailNotifications(order.notificationPreference === 'email' || order.notificationPreference === 'both');
      setWhatsappNotifications(order.notificationPreference === 'whatsapp' || order.notificationPreference === 'both');
    }
  }, [order]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volg uw bestelling</h1>
          <p className="text-gray-600">Voer uw bestelnummer in om de status te bekijken</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Bestelnummer
                </label>
                <Input
                  id="orderNumber"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Bijv. KAN-2024-001"
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-2">
                  U vindt uw bestelnummer in de bevestigingsmail of WhatsApp bericht.
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#E6C988] hover:bg-[#d4b876] text-black"
                disabled={isLoading}
              >
                <Search className="w-4 h-4 mr-2" />
                Zoek bestelling
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="mb-8">
            <CardContent className="p-6 text-center">
              <div className="text-red-600 mb-2">
                <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-medium">Bestelling niet gevonden</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Controleer uw bestelnummer en probeer opnieuw.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Bestelling {order.orderNumber}</span>
                  <Badge variant="outline" className="bg-[#E6C988] text-black">
                    €{order.amount.toFixed(2)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Besteld op {formatDate(order.createdAt)}
                </p>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const currentIndex = getCurrentStatusIndex(order.status);
                    const isActive = index === currentIndex;
                    const isCompleted = index < currentIndex;
                    const isPending = index > currentIndex;

                    const IconComponent = step.icon;

                    return (
                      <div key={step.key} className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive 
                            ? 'bg-[#E6C988] text-black' 
                            : isCompleted 
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isActive ? 'text-black' : isPending ? 'text-gray-400' : 'text-gray-700'
                          }`}>
                            {step.label}
                          </p>
                          {isActive && (
                            <p className="text-sm text-gray-500">
                              Bijgewerkt op {formatDate(order.updatedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Client Note */}
            {order.clientNote && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Update van de ondernemer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {order.clientNote}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* PDF Download */}
            {order.pdfFileName && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documenten</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleDownloadPdf}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download bestelling samenvatting
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hoe wilt u updates ontvangen?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={emailNotifications}
                      onCheckedChange={(checked) => setEmailNotifications(checked as boolean)}
                    />
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      E-mail
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={whatsappNotifications}
                      onCheckedChange={(checked) => setWhatsappNotifications(checked as boolean)}
                    />
                    <label htmlFor="whatsapp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      WhatsApp
                    </label>
                  </div>
                </div>
                <Button 
                  onClick={handleUpdatePreferences}
                  disabled={updatePreferencesMutation.isPending}
                  className="w-full bg-[#E6C988] hover:bg-[#d4b876] text-black"
                >
                  Voorkeuren opslaan
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {isLoading && searchedOrderNumber && (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E6C988] mx-auto mb-4"></div>
              <p className="text-gray-600">Bestelling wordt gezocht...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}