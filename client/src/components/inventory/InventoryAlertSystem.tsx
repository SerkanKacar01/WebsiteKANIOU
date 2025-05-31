import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, BellOff, Package, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/context/LanguageContext";

interface InventoryAlert {
  id: number;
  email: string;
  productType: string;
  alertType: 'out_of_stock' | 'back_in_stock' | 'low_stock';
  isActive: boolean;
  createdAt: string;
}

interface ProductStock {
  id: number;
  productType: string;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export default function InventoryAlertSystem() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [alertType, setAlertType] = useState<'out_of_stock' | 'back_in_stock' | 'low_stock'>('back_in_stock');

  // Fetch user's alerts
  const { data: userAlerts, isLoading: alertsLoading } = useQuery({
    queryKey: ['/api/inventory/alerts', email],
    enabled: !!email,
  });

  // Fetch product stock levels
  const { data: stockLevels, isLoading: stockLoading } = useQuery({
    queryKey: ['/api/inventory/stock'],
  });

  // Create alert mutation
  const createAlertMutation = useMutation({
    mutationFn: (alertData: any) => apiRequest('/api/inventory/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    }),
    onSuccess: () => {
      toast({
        title: t('Alert Created'),
        description: t('You will be notified when this product status changes.'),
      });
      queryClient.invalidateQueries({ queryKey: ['/api/inventory/alerts'] });
      setEmail("");
      setSelectedProduct("");
    },
    onError: (error: any) => {
      toast({
        title: t('Error'),
        description: error.message || t('Failed to create alert'),
        variant: 'destructive',
      });
    }
  });

  // Remove alert mutation
  const removeAlertMutation = useMutation({
    mutationFn: (alertId: number) => apiRequest(`/api/inventory/alerts/${alertId}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      toast({
        title: t('Alert Removed'),
        description: t('You will no longer receive notifications for this product.'),
      });
      queryClient.invalidateQueries({ queryKey: ['/api/inventory/alerts'] });
    }
  });

  const productTypes = [
    'rolgordijnen',
    'plisse',
    'overgordijnen',
    'houten-jaloezieen',
    'kunststof-jaloezieen',
    'duo-rolgordijnen',
    'vouwgordijnen',
    'textiel-lamellen'
  ];

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedProduct) return;

    createAlertMutation.mutate({
      email,
      productType: selectedProduct,
      alertType
    });
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-500';
      case 'low_stock': return 'bg-yellow-500';
      case 'out_of_stock': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'in_stock': return t('In Stock');
      case 'low_stock': return t('Low Stock');
      case 'out_of_stock': return t('Out of Stock');
      default: return t('Unknown');
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Stock Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>{t('Current Stock Levels')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stockLoading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stockLevels?.map((stock: ProductStock) => (
                <div key={stock.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{t(stock.productType)}</h4>
                    <Badge className={`${getStockStatusColor(stock.status)} text-white`}>
                      {getStockStatusText(stock.status)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Current: {stock.currentStock} units</div>
                    <div>Min: {stock.minThreshold} units</div>
                  </div>
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {t('No stock information available')}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>{t('Create Stock Alert')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAlert} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('Email Address')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('your@email.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">{t('Product Type')}</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select product type')} />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alertType">{t('Alert Type')}</Label>
              <Select value={alertType} onValueChange={(value: any) => setAlertType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="back_in_stock">{t('Back in Stock')}</SelectItem>
                  <SelectItem value="low_stock">{t('Low Stock Warning')}</SelectItem>
                  <SelectItem value="out_of_stock">{t('Out of Stock')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={createAlertMutation.isPending || !email || !selectedProduct}
              className="w-full md:w-auto"
            >
              {createAlertMutation.isPending ? t('Creating...') : t('Create Alert')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* User's Active Alerts */}
      {email && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>{t('Your Active Alerts')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alertsLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : userAlerts?.length > 0 ? (
              <div className="space-y-3">
                {userAlerts.map((alert: InventoryAlert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">{t(alert.productType)}</div>
                        <div className="text-sm text-gray-500">
                          {t(alert.alertType)} • {t('Active')}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeAlertMutation.mutate(alert.id)}
                      disabled={removeAlertMutation.isPending}
                    >
                      <BellOff className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('No active alerts found')}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}