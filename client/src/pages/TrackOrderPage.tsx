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
  Bell,
  CheckCircle2
} from 'lucide-react';
import type { PaymentOrder } from '@shared/schema';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrderNumber, setSearchedOrderNumber] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
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
  const { data: order, isLoading, error } = useQuery<PaymentOrder>({
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
    
    // Clear any existing validation errors
    setValidationError('');
    
    if (!orderNumber.trim()) {
      setValidationError('Vul uw bestelnummer in om verder te gaan.');
      // Focus the input field
      const inputElement = document.getElementById('order-number-input');
      if (inputElement) {
        inputElement.focus();
      }
      return;
    }
    
    setSearchedOrderNumber(orderNumber.trim());
  };

  // Handle input change to clear errors
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(e.target.value);
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
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

  // Check if notification was sent for current status
  const wasNotificationSent = (order: PaymentOrder, currentStatus: string) => {
    if (!order.notificationLogs || !currentStatus) return false;
    const logs = order.notificationLogs as { [key: string]: { emailSent?: boolean; whatsappSent?: boolean; sentAt?: string } };
    return logs[currentStatus] && (logs[currentStatus].emailSent || logs[currentStatus].whatsappSent);
  };

  // Get notification methods that were used
  const getNotificationMethods = (order: PaymentOrder, currentStatus: string) => {
    if (!order.notificationLogs || !currentStatus) return [];
    const logs = order.notificationLogs as { [key: string]: { emailSent?: boolean; whatsappSent?: boolean; sentAt?: string } };
    const statusLog = logs[currentStatus];
    if (!statusLog) return [];
    
    const methods = [];
    if (statusLog.emailSent) methods.push('E-mail');
    if (statusLog.whatsappSent) methods.push('WhatsApp');
    return methods;
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
                    id="order-number-input"
                    type="text"
                    placeholder="Bijv. 20240623-001"
                    value={orderNumber}
                    onChange={handleInputChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`w-full transition-colors ${
                      validationError ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  
                  {/* Validation Error Message */}
                  {validationError && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md animate-in fade-in duration-200">
                      <p className="text-sm text-red-600 font-medium">
                        {validationError}
                      </p>
                    </div>
                  )}
                  
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

        {/* Error State - Order Not Found */}
        {error && searchedOrderNumber && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <h3 className="font-medium text-red-800">Bestelling niet gevonden</h3>
            </div>
            <p className="text-red-700 mb-4 leading-relaxed">
              Het ingevoerde bestelnummer is niet gevonden. Controleer het nummer en probeer opnieuw.
            </p>
            <Button 
              onClick={() => {
                setSearchedOrderNumber('');
                setOrderNumber('');
                setValidationError('');
                // Focus the input field after clearing
                setTimeout(() => {
                  const inputElement = document.getElementById('order-number-input');
                  if (inputElement) {
                    inputElement.focus();
                  }
                }, 100);
              }}
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
            >
              Opnieuw zoeken
            </Button>
          </div>
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
                    const statusMap: { [key: string]: number } = {
                      'pending': 0,
                      'processing': 1,
                      'production': 2,
                      'ready': 3,
                      'delivery': 4
                    };
                    const currentIndex = statusMap[order.status || 'pending'] || 0;
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
                          
                          {/* Notification Confirmation Box - Only show for active status if notification was sent */}
                          {isActive && wasNotificationSent(order, step.key) && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <p className="text-sm text-green-800 font-medium">
                                  U bent over deze update geïnformeerd via {getNotificationMethods(order, step.key).join(' en ')}.
                                </p>
                              </div>
                            </div>
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