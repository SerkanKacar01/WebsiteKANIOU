import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Loader2, 
  LogOut, 
  Package, 
  Users, 
  Euro, 
  TrendingUp, 
  Edit, 
  Upload,
  FileText,
  Check,
  X,
  Eye
} from "lucide-react";

interface OrderStatus {
  status: string;
  date: string;
  note?: string;
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  productType: string;
  status: string;
  createdAt: string;
  clientNote?: string;
  noteFromEntrepreneur?: string;
  pdfFileName?: string;
  invoiceUrl?: string;
  notificationPreference: 'email' | 'whatsapp' | 'both';
  orderStatuses: OrderStatus[];
}

interface DashboardData {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  orders: Order[];
}

const ORDER_STATUSES = [
  'Bestelling ontvangen',
  'In productie',
  'Kwaliteitscontrole',
  'Klaar voor verzending',
  'Onderweg',
  'Geleverd'
];

export default function EntrepreneurDashboardPage() {
  const [, setLocation] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    status: '',
    clientNote: '',
    noteFromEntrepreneur: '',
    notificationPreference: 'email' as 'email' | 'whatsapp' | 'both'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedInvoiceFile, setSelectedInvoiceFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get auth status
  const { data: authStatus, isLoading: authLoading } = useQuery<{authenticated: boolean; email?: string}>({
    queryKey: ["/api/admin/auth-status"],
    retry: false,
  });

  // Get dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/admin/dashboard"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  useEffect(() => {
    if (!authLoading && !authStatus?.authenticated) {
      setLocation("/kaniouzilvernaald-dashboard");
    }
  }, [authStatus, authLoading, setLocation]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      
      if (response.ok) {
        queryClient.clear();
        setLocation("/kaniouzilvernaald-dashboard");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const updateOrderMutation = useMutation({
    mutationFn: async (data: {
      orderId: number;
      status?: string;
      clientNote?: string;
      notificationPreference?: string;
    }) => {
      const response = await fetch(`/api/admin/orders/${data.orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Bestelling bijgewerkt",
        description: "De wijzigingen zijn succesvol opgeslagen.",
      });
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het opslaan.",
        variant: "destructive",
      });
    },
  });

  const uploadPdfMutation = useMutation({
    mutationFn: async (data: { orderId: number; file: File }) => {
      const formData = new FormData();
      formData.append('pdf', data.file);
      
      const response = await fetch(`/api/admin/orders/${data.orderId}/upload-pdf`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "PDF geüpload",
        description: "Het PDF-bestand is succesvol geüpload.",
      });
      setSelectedFile(null);
    },
    onError: (error) => {
      toast({
        title: "Upload fout",
        description: "Er is een fout opgetreden bij het uploaden van het PDF-bestand.",
        variant: "destructive",
      });
    },
  });

  const uploadInvoiceMutation = useMutation({
    mutationFn: async (data: { orderId: number; file: File }) => {
      const formData = new FormData();
      formData.append('invoice', data.file);
      
      const response = await fetch(`/api/admin/orders/${data.orderId}/upload-invoice`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error('Invoice upload failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Invoice geüpload",
        description: "Het invoice PDF-bestand is succesvol geüpload.",
      });
      setSelectedInvoiceFile(null);
    },
    onError: (error) => {
      toast({
        title: "Invoice upload fout",
        description: "Er is een fout opgetreden bij het uploaden van het invoice PDF-bestand.",
        variant: "destructive",
      });
    },
  });

  const openEditModal = (order: Order) => {
    setSelectedOrder(order);
    setEditForm({
      status: order.status,
      clientNote: order.clientNote || '',
      noteFromEntrepreneur: order.noteFromEntrepreneur || '',
      notificationPreference: order.notificationPreference
    });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedOrder) return;
    
    updateOrderMutation.mutate({
      orderId: selectedOrder.id,
      status: editForm.status,
      clientNote: editForm.clientNote,
      noteFromEntrepreneur: editForm.noteFromEntrepreneur,
      notificationPreference: editForm.notificationPreference,
    });
  };

  const handleFileUpload = () => {
    if (!selectedOrder || !selectedFile) return;
    
    uploadPdfMutation.mutate({
      orderId: selectedOrder.id,
      file: selectedFile,
    });
  };

  const handleInvoiceUpload = () => {
    if (!selectedOrder || !selectedInvoiceFile) return;
    
    uploadInvoiceMutation.mutate({
      orderId: selectedOrder.id,
      file: selectedInvoiceFile,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Geleverd':
        return 'default';
      case 'Onderweg':
        return 'secondary';
      case 'Klaar voor verzending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (authLoading || dashboardLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#E6C988]" />
      </div>
    );
  }

  if (!authStatus?.authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Entrepreneur Dashboard</h1>
              <p className="text-sm text-gray-600">Welkom, {authStatus.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Uitloggen
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Orders</CardTitle>
              <Package className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.totalOrders || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Behandeling</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.pendingOrders || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale Omzet</CardTitle>
              <Euro className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{dashboardData?.totalRevenue?.toFixed(2) || '0.00'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Klanten</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.orders?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table - Desktop */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Orders Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium">Order Nummer</th>
                    <th className="text-left py-3 px-4 font-medium">Product Type</th>
                    <th className="text-left py-3 px-4 font-medium">Laatste Status</th>
                    <th className="text-left py-3 px-4 font-medium">Receipt PDF</th>
                    <th className="text-left py-3 px-4 font-medium">Invoice PDF</th>
                    <th className="text-left py-3 px-4 font-medium">Notificatie Voorkeur</th>
                    <th className="text-left py-3 px-4 font-medium">Actie</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.orders?.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td 
                        className="py-3 px-4 text-[#E6C988] font-medium cursor-pointer hover:underline"
                        onClick={() => openEditModal(order)}
                      >
                        #{order.id}
                      </td>
                      <td className="py-3 px-4">{order.productType}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {order.pdfFileName ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {order.invoiceUrl ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-1">
                            {(order.notifyByEmail ?? true) ? (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded flex items-center">
                                📧 Email ✅
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded flex items-center">
                                📧 Email ❌
                              </span>
                            )}
                            {(order.notifyByWhatsapp ?? false) ? (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded flex items-center">
                                📱 WhatsApp ✅
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded flex items-center">
                                📱 WhatsApp ❌
                              </span>
                            )}
                          </div>
                          {order.customerPhone && (
                            <span className="text-xs text-gray-600 font-mono">{order.customerPhone}</span>
                          )}
                          <div className="text-xs text-gray-400">
                            Laatste email: Nog niet verzonden
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(order)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Bewerk
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Orders Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {dashboardData?.orders?.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 
                    className="font-medium text-[#E6C988] cursor-pointer"
                    onClick={() => openEditModal(order)}
                  >
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">{order.productType}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditModal(order)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">PDF:</span>
                  {order.pdfFileName ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
                
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Notificaties:</span>
                  <div className="flex flex-col space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {(order.notifyByEmail ?? true) ? (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          📧 Email ✅
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                          📧 Email ❌
                        </span>
                      )}
                      {(order.notifyByWhatsapp ?? false) ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                          📱 WhatsApp ✅
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                          📱 WhatsApp ❌
                        </span>
                      )}
                    </div>
                    {order.customerPhone && (
                      <span className="text-xs text-gray-600 font-mono">{order.customerPhone}</span>
                    )}
                    <span className="text-xs text-gray-400">Laatste: Nog niet verzonden</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id} Bewerken</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Order Informatie</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Klant:</span>
                  <p className="font-medium">{selectedOrder?.customerName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Product:</span>
                  <p className="font-medium">{selectedOrder?.productType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Bedrag:</span>
                  <p className="font-medium">€{selectedOrder?.amount?.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Datum:</span>
                  <p className="font-medium">
                    {selectedOrder?.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString('nl-NL') : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Update */}
            <div>
              <Label htmlFor="status">Status Bijwerken</Label>
              <Select value={editForm.status} onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Client Note */}
            <div>
              <Label htmlFor="clientNote">Notitie voor Klant</Label>
              <Textarea
                id="clientNote"
                value={editForm.clientNote}
                onChange={(e) => setEditForm(prev => ({ ...prev, clientNote: e.target.value }))}
                placeholder="Voeg een notitie toe die de klant kan zien in de order tracker..."
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Entrepreneur Note */}
            <div>
              <Label htmlFor="noteFromEntrepreneur">Bericht van Ondernemer</Label>
              <Textarea
                id="noteFromEntrepreneur"
                value={editForm.noteFromEntrepreneur}
                onChange={(e) => setEditForm(prev => ({ ...prev, noteFromEntrepreneur: e.target.value }))}
                placeholder="Voeg een persoonlijk bericht toe dat klanten kunnen zien op hun tracking pagina..."
                className="mt-1"
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                Dit bericht wordt getoond aan klanten als "Bericht van de ondernemer" op hun tracking pagina.
              </p>
            </div>

            {/* Notification Preference */}
            <div>
              <Label htmlFor="notification">Notificatie Voorkeur</Label>
              <Select 
                value={editForm.notificationPreference} 
                onValueChange={(value: 'email' | 'whatsapp' | 'both') => 
                  setEditForm(prev => ({ ...prev, notificationPreference: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="both">Beide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* PDF Upload */}
            <div>
              <Label>PDF Upload</Label>
              {selectedOrder?.pdfFileName ? (
                <div className="mt-2 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    Huidige file: {selectedOrder.pdfFileName}
                  </span>
                </div>
              ) : null}
              
              <div className="mt-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="mb-2"
                />
                {selectedFile && (
                  <Button
                    onClick={handleFileUpload}
                    disabled={uploadPdfMutation.isPending}
                    className="bg-[#E6C988] hover:bg-[#D5B992] text-black"
                  >
                    {uploadPdfMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    PDF Uploaden
                  </Button>
                )}
              </div>
            </div>

            {/* Invoice PDF Upload */}
            <div>
              <Label>Invoice PDF Upload</Label>
              {selectedOrder?.invoiceUrl ? (
                <div className="mt-2 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    Huidige invoice: {selectedOrder.invoiceUrl}
                  </span>
                </div>
              ) : null}
              
              <div className="mt-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedInvoiceFile(e.target.files?.[0] || null)}
                  className="mb-2"
                />
                {selectedInvoiceFile && (
                  <Button
                    onClick={handleInvoiceUpload}
                    disabled={uploadInvoiceMutation.isPending}
                    className="bg-[#E6C988] hover:bg-[#D5B992] text-black"
                  >
                    {uploadInvoiceMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Invoice Uploaden
                  </Button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveChanges}
                disabled={updateOrderMutation.isPending}
                className="bg-[#E6C988] hover:bg-[#D5B992] text-black flex-1"
              >
                {updateOrderMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Wijzigingen Opslaan
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1"
              >
                Annuleren
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}