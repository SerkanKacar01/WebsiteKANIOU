import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Package, 
  Settings, 
  Wrench, 
  CheckCircle, 
  Phone,
  Download,
  Bell
} from 'lucide-react';
import type { Order } from '@shared/schema';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrderNumber, setSearchedOrderNumber] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Status timeline configuration
  const statusSteps = [
    { key: 'pending', label: 'Bestelling in verwerking', icon: Package },
    { key: 'processing', label: 'Bestelling verwerkt', icon: Settings },
    { key: 'production', label: 'Bestelling in productie', icon: Wrench },
    { key: 'ready', label: 'Bestelling is gereed', icon: CheckCircle },
    { key: 'delivery', label: 'U wordt gebeld voor levering', icon: Phone }
  ];

  // Fetch order details
  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ['/api/orders/track', searchedOrderNumber],
    enabled: !!searchedOrderNumber,
    retry: false
  });

  // Update notification preferences
  const updatePreferencesMutation = useMutation({
    mutationFn: async (preferences: { orderNumber: string; notificationPreference: string }) => {
      return apiRequest('/api/orders/update-preferences', 'POST', preferences);
    },
    onSuccess: () => {
      toast({
        title: "Voorkeur opgeslagen",
        description: "Uw notificatie voorkeur is bijgewerkt.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/orders/track', searchedOrderNumber] });
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het opslaan van uw voorkeur.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast({
        title: "Bestelnummer vereist",
        description: "Voer uw bestelnummer in om verder te gaan.",
        variant: "destructive"
      });
      return;
    }
    setSearchedOrderNumber(orderNumber.trim());
  };

  const handleDownloadPdf = () => {
    if (order && order.pdfFileName) {
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
    if (!order || !order.orderNumber) return;

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
    const statusMap: { [key: string]: number } = {
      'pending': 0,
      'processing': 1,
      'production': 2,
      'ready': 3,
      'delivery': 4,
      'completed': 4
    };
    return statusMap[status] || 0;
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Initialize notification preferences when order is loaded
  React.useEffect(() => {
    if (order && order.notificationPreference) {
      setEmailNotifications(order.notificationPreference === 'email' || order.notificationPreference === 'both');
      setWhatsappNotifications(order.notificationPreference === 'whatsapp' || order.notificationPreference === 'both');
    }
  }, [order]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Volg uw bestelling
          </h1>
        </div>

        {/* Order Lookup Form */}
        {!searchedOrderNumber && (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Bijv. 20240623-001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    U vindt uw bestelnummer in uw bevestigingsmail of WhatsApp-bericht.
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#E6C988] hover:bg-[#D5B876] text-black"
                  disabled={isLoading}
                >
                  {isLoading ? 'Zoeken...' : 'Bestelling bekijken'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && searchedOrderNumber && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-red-600 mb-4">
                  Bestelling niet gevonden. Controleer uw bestelnummer en probeer opnieuw.
                </p>
                <Button 
                  onClick={() => {
                    setSearchedOrderNumber('');
                    setOrderNumber('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Opnieuw zoeken
                </Button>
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
                  <span>Bestelling {order.orderNumber || `KAN-${order.id}`}</span>
                  <Badge variant="outline" className="bg-[#E6C988] text-black">
                    €{order.amount.toFixed(2)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Besteld op {formatDate(order.createdAt)}
                </p>
                <Button 
                  onClick={() => {
                    setSearchedOrderNumber('');
                    setOrderNumber('');
                  }}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  Andere bestelling zoeken
                </Button>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Bestelling Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const currentIndex = getCurrentStatusIndex(order.status || 'pending');
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
                          {isActive && order.updatedAt && (
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

            {/* Entrepreneur Note */}
            {order.clientNote && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📝 Update van de ondernemer</CardTitle>
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
                  <CardTitle className="text-lg">📎 Documenten</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleDownloadPdf}
                    className="w-full bg-[#E6C988] hover:bg-[#D5B876] text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Bestelbon downloaden
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔔 Ontvang meldingen via:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={emailNotifications}
                      onCheckedChange={(checked) => setEmailNotifications(checked === true)}
                    />
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={whatsappNotifications}
                      onCheckedChange={(checked) => setWhatsappNotifications(checked === true)}
                    />
                    <label htmlFor="whatsapp" className="text-sm font-medium">
                      WhatsApp
                    </label>
                  </div>
                  <Button 
                    onClick={handleUpdatePreferences}
                    disabled={updatePreferencesMutation.isPending}
                    className="w-full bg-[#E6C988] hover:bg-[#D5B876] text-black"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    {updatePreferencesMutation.isPending ? 'Opslaan...' : 'Voorkeur opslaan'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}