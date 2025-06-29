import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { PaymentOrder } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Eye,
  EyeOff,
  Save,
  Lock as LockIcon,
  Search,
  Download,
  Trash2,
  RotateCcw,
} from "lucide-react";

interface OrderStatus {
  status: string;
  date: string;
  note?: string;
}

// Use PaymentOrder from schema and add client-specific fields
interface Order extends PaymentOrder {
  orderStatuses: OrderStatus[];
  productType: string; // Simplified product description for dashboard
}

interface DashboardData {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  orders: Order[];
}

const ORDER_STATUSES = [
  "Bestelling in verwerking",
  "Bestelling verwerkt",
  "Bestelling in productie",
  "Bestelling is gereed",
  "U wordt gebeld voor de levering",
  "Geleverd",
];

const PRODUCT_CATEGORIES = [
  "Rolgordijnen",
  "Houten jaloezieën",
  "Verticale lamellen",
  "Duorolgordijnen",
  "Plissé gordijnen",
  "Overgordijnen",
  "Inbetween gordijnen",
  "Luxaflex",
  "Shutters",
  "Horren",
];

const ROOM_TYPES = [
  "Woonkamer",
  "Slaapkamer",
  "Keuken",
  "Badkamer",
  "Kantoor",
  "Kinderkamer",
  "Eetkamer",
  "Studeerkamer",
  "Gang",
];

export default function EntrepreneurDashboardPage() {
  const [, setLocation] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    status: "",
    clientNote: "",
    noteFromEntrepreneur: "",
    notificationPreference: "email" as "email" | "whatsapp" | "both",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedInvoiceFile, setSelectedInvoiceFile] = useState<File | null>(
    null,
  );
  const [customerNote, setCustomerNote] = useState<string>("");
  const [internalNote, setInternalNote] = useState<string>("");
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerFirstName: "",
    customerLastName: "",
    customerAddress: "",
    customerCity: "",
    productCategory: "",
    dimensions: "",
    price: "",
    orderDate: new Date().toISOString().split("T")[0],
    roomType: "",
    status: "pending",
    customerNote: "",
    internalNote: "",
    notifyByEmail: true,
    bonnummer: "",
  });

  // PDF upload state
  const [selectedPDFs, setSelectedPDFs] = useState<File[]>([]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [documentVisibility, setDocumentVisibility] = useState<boolean[]>([]);

  // Document viewing state
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedOrderDocuments, setSelectedOrderDocuments] = useState<any[]>(
    [],
  );
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Status update state
  const [statusUpdates, setStatusUpdates] = useState<{
    [orderId: number]: string;
  }>({});
  
  // Individual order update tracking
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  // Search and filter state (Step 15.8)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roomFilter, setRoomFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get auth status
  const { data: authStatus, isLoading: authLoading } = useQuery<{
    authenticated: boolean;
    email?: string;
  }>({
    queryKey: ["/api/admin/auth-status"],
    retry: false,
  });

  // Get dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["/api/admin/dashboard"],
      enabled: !!authStatus?.authenticated,
      retry: false,
    });

  // Filter orders based on search and filter criteria (Step 15.8)
  const filteredOrders = React.useMemo(() => {
    if (!dashboardData?.orders) return [];

    let filtered = dashboardData.orders;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (order) =>
          order.customerName?.toLowerCase().includes(query) ||
          order.customerEmail?.toLowerCase().includes(query) ||
          order.orderNumber?.toLowerCase().includes(query) ||
          order.id.toString().includes(query) ||
          order.productType?.toLowerCase().includes(query) ||
          order.description?.toLowerCase().includes(query),
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Apply room filter
    if (roomFilter && roomFilter !== "all") {
      filtered = filtered.filter((order) => {
        const customerDetails = order.customerDetails as any;
        return customerDetails?.room === roomFilter;
      });
    }

    // Apply product filter
    if (productFilter && productFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.productType === productFilter,
      );
    }

    return filtered;
  }, [
    dashboardData?.orders,
    searchQuery,
    statusFilter,
    roomFilter,
    productFilter,
  ]);

  // Reset filters function
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setRoomFilter("all");
    setProductFilter("all");
  };

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
      formData.append("pdf", data.file);
      formData.append("orderId", data.orderId.toString());

      const response = await fetch(`/api/orders/upload-pdf`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Upload failed");
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
        description:
          "Er is een fout opgetreden bij het uploaden van het PDF-bestand.",
        variant: "destructive",
      });
    },
  });

  const uploadInvoiceMutation = useMutation({
    mutationFn: async (data: { orderId: number; file: File }) => {
      const formData = new FormData();
      formData.append("invoice", data.file);

      const response = await fetch(
        `/api/admin/orders/${data.orderId}/upload-invoice`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Invoice upload failed");
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
        description:
          "Er is een fout opgetreden bij het uploaden van het invoice PDF-bestand.",
        variant: "destructive",
      });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: typeof newOrderForm) => {
      // Transform form data to API format
      const apiData = {
        customerName: orderData.customerName,
        customerEmail:
          orderData.customerEmail ||
          `${orderData.customerName.replace(/\s+/g, "").toLowerCase()}@kaniou.be`,
        customerPhone: orderData.customerPhone || null,
        customerFirstName: orderData.customerFirstName || null,
        customerLastName: orderData.customerLastName || null,
        customerAddress: orderData.customerAddress || null,
        customerCity: orderData.customerCity || null,
        amount: parseFloat(orderData.price || "0"),
        currency: "EUR",
        description: `${orderData.productCategory} - ${orderData.dimensions}`,
        productType: orderData.productCategory,
        status: orderData.status || "pending",
        notifyByEmail: true,
        customerNote: orderData.customerNote || null,
        internalNote: orderData.internalNote || null,
        bonnummer: orderData.bonnummer, // CRITICAL FIX: Add the missing bonnummer field
      };

      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Bestelling aangemaakt",
        description: "De nieuwe bestelling is succesvol toegevoegd.",
      });
      setIsNewOrderModalOpen(false);
      setNewOrderForm({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerFirstName: "",
        customerLastName: "",
        customerAddress: "",
        customerCity: "",
        productCategory: "",
        dimensions: "",
        price: "",
        orderDate: new Date().toISOString().split("T")[0],
        roomType: "",
        status: "pending",
        customerNote: "",
        internalNote: "",
        notifyByEmail: true,

        bonnummer: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Fout bij aanmaken",
        description:
          "Er is een fout opgetreden bij het aanmaken van de bestelling.",
        variant: "destructive",
      });
    },
  });

  // Customer note mutation (Step 15.4)
  const saveCustomerNoteMutation = useMutation({
    mutationFn: async (data: { orderId: number; noteText: string }) => {
      const response = await fetch("/api/orders/add-customer-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Customer note save failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Notitie opgeslagen",
        description: "De klantnotitie is succesvol opgeslagen.",
      });
    },
    onError: (error) => {
      toast({
        title: "Fout bij opslaan",
        description:
          "Er is een fout opgetreden bij het opslaan van de notitie.",
        variant: "destructive",
      });
    },
  });

  // Internal note mutation (Step 15.5) - Admin Only
  const saveInternalNoteMutation = useMutation({
    mutationFn: async (data: { orderId: number; noteText: string }) => {
      const response = await fetch("/api/orders/add-internal-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Internal note save failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Interne notitie opgeslagen",
        description: "De interne notitie is succesvol opgeslagen.",
      });
    },
    onError: (error) => {
      toast({
        title: "Fout bij opslaan",
        description:
          "Er is een fout opgetreden bij het opslaan van de interne notitie.",
        variant: "destructive",
      });
    },
  });

  // Status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
    }: {
      orderId: number;
      newStatus: string;
    }) => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      return { orderId, ...await response.json() };
    },
    onSuccess: (data) => {
      // Clear the specific order's status from local state after successful update
      setStatusUpdates((prev) => {
        const updated = { ...prev };
        delete updated[data.orderId];
        return updated;
      });
      
      // Clear the updating state
      setUpdatingOrderId(null);
      
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Status bijgewerkt",
        description: "De orderstatus is succesvol bijgewerkt.",
      });
    },
    onError: (error) => {
      // Clear the updating state on error
      setUpdatingOrderId(null);
      
      toast({
        title: "Fout bij bijwerken",
        description:
          "Er is een fout opgetreden bij het bijwerken van de status.",
        variant: "destructive",
      });
    },
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: number) => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Order verwijderd",
        description: "De order is succesvol verwijderd.",
      });
    },
    onError: (error) => {
      console.error("Delete order error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Er is een fout opgetreden bij het verwijderen van de order.";
      toast({
        title: "Fout bij verwijderen",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleDeleteOrder = (orderId: number, customerName: string) => {
    if (
      confirm(
        `Weet je zeker dat je de order van ${customerName} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.`,
      )
    ) {
      deleteOrderMutation.mutate(orderId);
    }
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleStatusSave = (orderId: number) => {
    const newStatus = statusUpdates[orderId];
    if (newStatus) {
      setUpdatingOrderId(orderId);
      updateStatusMutation.mutate({ orderId, newStatus });
    }
  };

  const handleCreateOrder = async () => {
    // Basic validation
    if (
      !newOrderForm.customerName ||
      !newOrderForm.productCategory ||
      !newOrderForm.price ||
      !newOrderForm.bonnummer
    ) {
      toast({
        title: "Vereiste velden",
        description:
          "Vul tenminste klantnaam, productcategorie, prijs en bonnummer in.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    if (newOrderForm.notifyByEmail && !newOrderForm.customerEmail) {
      toast({
        title: "E-mailadres vereist",
        description: "E-mailadres is vereist voor bestellingsupdates.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create the order first
      const orderResponse = await createOrderMutation.mutateAsync(newOrderForm);

      // If PDFs are selected, upload them
      if (selectedPDFs.length > 0) {
        const formData = new FormData();

        selectedPDFs.forEach((file, index) => {
          formData.append("documents", file);
          formData.append("documentTypes", documentTypes[index] || "document");
          formData.append(
            "documentVisibility",
            documentVisibility[index] ? "true" : "false",
          );
        });

        const uploadResponse = await fetch(
          `/api/orders/${orderResponse.id}/upload-documents`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          },
        );

        if (!uploadResponse.ok) {
          throw new Error("Document upload failed");
        }

        toast({
          title: "Bestelling aangemaakt",
          description: `Bestelling en ${selectedPDFs.length} documenten succesvol geüpload`,
        });
      } else {
        toast({
          title: "Bestelling aangemaakt",
          description: "De bestelling is succesvol aangemaakt",
        });
      }

      // Reset form and close modal
      setNewOrderForm({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerFirstName: "",
        customerLastName: "",
        customerAddress: "",
        customerCity: "",
        productCategory: "",
        dimensions: "",
        price: "",
        orderDate: new Date().toISOString().split("T")[0],
        roomType: "",
        status: "pending",
        customerNote: "",
        internalNote: "",
        notifyByEmail: true,

        bonnummer: "",
      });
      setSelectedPDFs([]);
      setDocumentTypes([]);
      setDocumentVisibility([]);
      setIsNewOrderModalOpen(false);
    } catch (error) {
      toast({
        title: "Fout",
        description:
          "Er is een fout opgetreden bij het aanmaken van de bestelling",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (order: Order) => {
    setSelectedOrder(order);
    setEditForm({
      status: order.status || "Nieuw",
      clientNote: order.clientNote || "",
      noteFromEntrepreneur: order.noteFromEntrepreneur || "",
      notificationPreference:
        (order.notificationPreference as "email" | "whatsapp" | "both") ||
        "email",
    });
    setCustomerNote(order.customerNote || "");
    setInternalNote((order as any).internalNote || "");
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedOrder) return;

    updateOrderMutation.mutate({
      orderId: selectedOrder.id,
      status: editForm.status,
      clientNote: editForm.clientNote,
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

  const handleSaveCustomerNote = () => {
    if (!selectedOrder) return;

    saveCustomerNoteMutation.mutate({
      orderId: selectedOrder.id,
      noteText: customerNote,
    });
  };

  const handleSaveInternalNote = () => {
    if (!selectedOrder) return;

    saveInternalNoteMutation.mutate({
      orderId: selectedOrder.id,
      noteText: internalNote,
    });
  };

  const handleViewDocuments = async (orderId: number) => {
    try {
      setSelectedOrderId(orderId);
      // Fetch documents for this order
      const response = await fetch(`/api/orders/${orderId}/documents`, {
        credentials: "include",
      });

      if (response.ok) {
        const documents = await response.json();
        setSelectedOrderDocuments(documents);
        setIsDocumentModalOpen(true);
      } else {
        toast({
          title: "Fout",
          description: "Kan documenten niet ophalen",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het ophalen van documenten",
        variant: "destructive",
      });
    }
  };

  const toggleDocumentVisibility = async (
    documentId: number,
    isVisible: boolean,
  ) => {
    try {
      const response = await fetch(
        `/api/orders/documents/${documentId}/visibility`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isVisible }),
        },
      );

      if (response.ok) {
        // Refresh the document list
        if (selectedOrderId) {
          handleViewDocuments(selectedOrderId);
        }
        toast({
          title: "Document bijgewerkt",
          description: `Document is nu ${isVisible ? "zichtbaar" : "verborgen"} voor klanten`,
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast({
        title: "Fout",
        description: "Document zichtbaarheid kon niet worden bijgewerkt",
        variant: "destructive",
      });
    }
  };

  const deleteDocument = async (documentId: number) => {
    if (!confirm("Weet je zeker dat je dit document wilt verwijderen?")) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/documents/${documentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Refresh the document list
        if (selectedOrderId) {
          handleViewDocuments(selectedOrderId);
        }
        toast({
          title: "Document verwijderd",
          description: "Het document is succesvol verwijderd",
        });
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      toast({
        title: "Fout",
        description: "Document kon niet worden verwijderd",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Geleverd":
        return "default";
      case "Onderweg":
        return "secondary";
      case "Klaar voor verzending":
        return "outline";
      default:
        return "secondary";
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
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E6C988] rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">
                  Business Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Welkom, {authStatus.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-[#E6C988] shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Totaal Orders
              </CardTitle>
              <div className="w-8 h-8 bg-[#E6C988] rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-black" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {dashboardData?.totalOrders || 0}
              </div>
              <p className="text-xs text-gray-600 mt-1">Alle bestellingen</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-400 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                In Behandeling
              </CardTitle>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {dashboardData?.pendingOrders || 0}
              </div>
              <p className="text-xs text-gray-600 mt-1">Actieve orders</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-400 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Totale Omzet
              </CardTitle>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Euro className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                €{((dashboardData?.totalRevenue || 0) / 100).toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 mt-1">Bruto omzet</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-400 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Klanten
              </CardTitle>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {dashboardData?.orders?.length || 0}
              </div>
              <p className="text-xs text-gray-600 mt-1">Unieke klanten</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section (Step 15.8) */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-black">
              Zoeken en Filteren
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Zoek op klantnaam, ordernummer of productnaam..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E6C988] focus:border-[#E6C988] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                    <SelectValue placeholder="Alle statussen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bestelling in verwerking">
                      In verwerking
                    </SelectItem>
                    <SelectItem value="Bestelling verwerkt">
                      Verwerkt
                    </SelectItem>
                    <SelectItem value="Bestelling in productie">
                      In productie
                    </SelectItem>
                    <SelectItem value="Bestelling is gereed">Gereed</SelectItem>
                    <SelectItem value="U wordt gebeld voor de levering">
                      Wachten op levering
                    </SelectItem>
                    <SelectItem value="Bestelling is geleverd">
                      Geleverd
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ruimte
                </label>
                <Select value={roomFilter} onValueChange={setRoomFilter}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                    <SelectValue placeholder="Alle ruimtes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    {ROOM_TYPES.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product type
                </label>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                    <SelectValue placeholder="Alle producten" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="Rolgordijn">Rolgordijn</SelectItem>
                    <SelectItem value="Plissé">Plissé</SelectItem>
                    <SelectItem value="Shutters">Shutters</SelectItem>
                    <SelectItem value="Overgordijnen">Overgordijnen</SelectItem>
                    <SelectItem value="Inbetweens">Inbetweens</SelectItem>
                    <SelectItem value="Houten Jaloezieën">
                      Houten Jaloezieën
                    </SelectItem>
                    <SelectItem value="Textiel Lamellen">
                      Textiel Lamellen
                    </SelectItem>
                    <SelectItem value="Horren">Horren</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">
                {filteredOrders.length} van {dashboardData?.orders?.length || 0}{" "}
                orders weergegeven
              </span>
              {(searchQuery || statusFilter || roomFilter || productFilter) && (
                <span className="text-sm text-[#E6C988] font-medium">
                  Actieve filters toegepast
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Orders Table - Desktop */}
        <Card className="hidden lg:block shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-black">
                Orders Overzicht
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {filteredOrders.length} van{" "}
                  {dashboardData?.orders?.length || 0} orders totaal
                </div>
                <Button
                  onClick={() => setIsNewOrderModalOpen(true)}
                  className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Package className="h-4 w-4" />+ Nieuwe Order
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Order
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Klant
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Documenten
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Notificaties
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Actie
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span
                            className="font-medium text-[#E6C988] cursor-pointer hover:underline"
                            onClick={() => openEditModal(order)}
                          >
                            #{order.orderNumber || order.id}
                          </span>
                          <span className="text-xs text-gray-500">
                            €{((order.amount || 0) / 100).toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {order.customerName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {order.customerEmail}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {order.productType}
                          </span>
                          <span className="text-xs text-gray-500">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString(
                                  "nl-NL",
                                )
                              : ""}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Select
                            value={
                              statusUpdates[order.id] || order.status || "Nieuw"
                            }
                            onValueChange={(value) =>
                              handleStatusChange(order.id, value)
                            }
                          >
                            <SelectTrigger className="w-48 h-8 text-xs border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bestelling in verwerking">
                                Bestelling in verwerking
                              </SelectItem>
                              <SelectItem value="Bestelling verwerkt">
                                Bestelling verwerkt
                              </SelectItem>
                              <SelectItem value="Bestelling in productie">
                                Bestelling in productie
                              </SelectItem>
                              <SelectItem value="Bestelling is gereed">
                                Bestelling is gereed
                              </SelectItem>
                              <SelectItem value="U wordt gebeld voor de levering">
                                U wordt gebeld voor de levering
                              </SelectItem>
                              <SelectItem value="Bestelling is geleverd">
                                Bestelling is geleverd
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            onClick={() => handleStatusSave(order.id)}
                            disabled={updatingOrderId === order.id}
                            className="h-8 w-8 p-0 bg-[#E6C988] hover:bg-[#D5B992] text-black"
                            title="Status opslaan"
                          >
                            {updatingOrderId === order.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Save className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDocuments(order.id)}
                          className="flex items-center gap-2 text-[#E6C988] border-[#E6C988] hover:bg-[#E6C988] hover:text-black"
                        >
                          <FileText className="h-3 w-3" />
                          {/* For now showing legacy PDF count - will be replaced with actual document count */}
                          {(order.pdfFileName ? 1 : 0) +
                            (order.invoiceUrl ? 1 : 0)}{" "}
                          PDF
                          {(order.pdfFileName ? 1 : 0) +
                            (order.invoiceUrl ? 1 : 0) !==
                          1
                            ? "s"
                            : ""}
                        </Button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {(order.notifyByEmail ?? true) ? (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                                📧 Email ✅
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                                📧 Email ❌
                              </span>
                            )}
                          </div>
                          {order.customerPhone && (
                            <span className="text-xs text-gray-600 font-mono">
                              {order.customerPhone}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => openEditModal(order)}
                            className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Bewerk
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleDeleteOrder(order.id, order.customerName)
                            }
                            disabled={deleteOrderMutation.isPending}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium"
                          >
                            {deleteOrderMutation.isPending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Orders Cards - Mobile & Tablet */}
        <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">
              Orders Overzicht
            </h3>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                {filteredOrders.length} van {dashboardData?.orders?.length || 0}{" "}
                orders
              </div>
              <Button
                onClick={() => setIsNewOrderModalOpen(true)}
                size="sm"
                className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium px-3 py-2 rounded-lg flex items-center gap-1"
              >
                <Package className="h-3 w-3" />+ Nieuw
              </Button>
            </div>
          </div>
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="shadow-sm border-l-4 border-l-[#E6C988] hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-[#E6C988] cursor-pointer hover:underline text-lg"
                      onClick={() => openEditModal(order)}
                    >
                      #{order.orderNumber || order.id}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-black">
                      €{((order.amount || 0) / 100).toFixed(2)}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => openEditModal(order)}
                        className="bg-[#E6C988] hover:bg-[#D5B992] text-black"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Bewerk
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleDeleteOrder(order.id, order.customerName)
                        }
                        disabled={deleteOrderMutation.isPending}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {deleteOrderMutation.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Product:
                    </span>
                    <p className="text-sm text-gray-900 mt-1">
                      {order.productType}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Datum:
                    </span>
                    <p className="text-sm text-gray-900 mt-1">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("nl-NL")
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Customer Information (Step 15.6) - Mobile Card */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4 text-[#E6C988]" />
                    Klantgegevens
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-600">Naam:</span>
                      <p className="text-gray-900 font-medium">
                        {order.customerFirstName && order.customerLastName
                          ? `${order.customerFirstName} ${order.customerLastName}`
                          : order.customerName || "Niet opgegeven"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Telefoon:</span>
                      <p className="text-gray-900 font-medium">
                        {order.customerPhone || "Niet opgegeven"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">E-mail:</span>
                      <p className="text-gray-900 font-medium">
                        {order.customerEmail}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Adres:</span>
                      <p className="text-gray-900 font-medium">
                        {order.customerAddress || "Niet opgegeven"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Woonplaats:</span>
                      <p className="text-gray-900 font-medium">
                        {order.customerCity || "Niet opgegeven"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Status:
                    </span>
                    <div className="flex items-center gap-2">
                      <Select
                        value={
                          statusUpdates[order.id] || order.status || "Nieuw"
                        }
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-40 h-7 text-xs border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bestelling in verwerking">
                            Bestelling in verwerking
                          </SelectItem>
                          <SelectItem value="Bestelling verwerkt">
                            Bestelling verwerkt
                          </SelectItem>
                          <SelectItem value="Bestelling in productie">
                            Bestelling in productie
                          </SelectItem>
                          <SelectItem value="Bestelling is gereed">
                            Bestelling is gereed
                          </SelectItem>
                          <SelectItem value="U wordt gebeld voor de levering">
                            U wordt gebeld voor de levering
                          </SelectItem>
                          <SelectItem value="Bestelling is geleverd">
                            Bestelling is geleverd
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => handleStatusSave(order.id)}
                        disabled={updatingOrderId === order.id}
                        className="h-7 w-7 p-0 bg-[#E6C988] hover:bg-[#D5B992] text-black"
                        title="Status opslaan"
                      >
                        {updatingOrderId === order.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Save className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Documenten:
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {order.pdfFileName ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs text-gray-600">Receipt</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {order.invoiceUrl ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs text-gray-600">Invoice</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-700">
                        Notificaties:
                      </span>
                      <div className="flex flex-col space-y-2 items-end">
                        <div className="flex flex-wrap gap-1 justify-end">
                          {(order.notifyByEmail ?? true) ? (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                              📧 Email ✅
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                              📧 Email ❌
                            </span>
                          )}
                        </div>
                        {order.customerPhone && (
                          <span className="text-xs text-gray-600 font-mono">
                            {order.customerPhone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-t-4 border-t-[#E6C988]">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E6C988] rounded flex items-center justify-center">
                <Edit className="h-3 w-3 text-black" />
              </div>
              Order #{selectedOrder?.orderNumber || selectedOrder?.id} Bewerken
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Order Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-4 text-black flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#E6C988]" />
                Order Informatie
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Klant:</span>
                    <p className="font-semibold text-black mt-1">
                      {selectedOrder?.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedOrder?.customerEmail}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Product:</span>
                    <p className="font-semibold text-black mt-1">
                      {selectedOrder?.productType}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Bedrag:</span>
                    <p className="font-semibold text-black mt-1 text-lg">
                      €{((selectedOrder?.amount || 0) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Datum:</span>
                    <p className="font-semibold text-black mt-1">
                      {selectedOrder?.createdAt
                        ? new Date(selectedOrder.createdAt).toLocaleDateString(
                            "nl-NL",
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update */}
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-semibold text-gray-700"
              >
                Status Bijwerken
              </Label>
              <Select
                value={editForm.status}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
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
            <div className="space-y-2">
              <Label
                htmlFor="clientNote"
                className="text-sm font-semibold text-gray-700"
              >
                Notitie voor Klant
              </Label>
              <Textarea
                id="clientNote"
                value={editForm.clientNote}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    clientNote: e.target.value,
                  }))
                }
                placeholder="Voeg een notitie toe die de klant kan zien in de order tracker..."
                className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988] resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-500">
                Deze notitie is zichtbaar voor klanten in hun order tracking.
              </p>
            </div>

            {/* Entrepreneur Note */}
            <div>
              <Label htmlFor="noteFromEntrepreneur">
                Bericht van Ondernemer
              </Label>
              <Textarea
                id="noteFromEntrepreneur"
                value={editForm.noteFromEntrepreneur}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    noteFromEntrepreneur: e.target.value,
                  }))
                }
                placeholder="Voeg een persoonlijk bericht toe dat klanten kunnen zien op hun tracking pagina..."
                className="mt-1"
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                Dit bericht wordt getoond aan klanten als "Bericht van de
                ondernemer" op hun tracking pagina.
              </p>
            </div>

            {/* Notification Preference */}
            <div className="space-y-2">
              <Label
                htmlFor="notification"
                className="text-sm font-semibold text-gray-700"
              >
                Notificatie Voorkeur
              </Label>
              <Select
                value={editForm.notificationPreference}
                onValueChange={(value: "email" | "whatsapp" | "both") =>
                  setEditForm((prev) => ({
                    ...prev,
                    notificationPreference: value,
                  }))
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">📧 Email</SelectItem>
                  <SelectItem value="whatsapp">📱 WhatsApp</SelectItem>
                  <SelectItem value="both">📧📱 Beide</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 rounded">
                  📧 <span className="text-blue-700">Email notificaties</span>
                </div>
                <div className="flex items-center gap-1 text-xs px-2 py-1 bg-green-50 rounded">
                  📱 <span className="text-green-700">WhatsApp berichten</span>
                </div>
              </div>
            </div>

            {/* PDF Upload Section */}
            <div className="space-y-6">
              {/* Main PDF Upload for Customer */}
              <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#E6C988]" />
                  PDF-bestand uploaden
                </Label>
                <p className="text-xs text-gray-600">
                  Offerte of factuur voor de klant
                </p>

                {selectedOrder?.pdfFileName ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">
                          {selectedOrder.pdfFileName}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `/api/orders/${selectedOrder.id}/download-pdf`,
                            "_blank",
                          )
                        }
                        className="text-green-700 border-green-300 hover:bg-green-100"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Bekijk
                      </Button>
                    </div>
                    <p className="text-xs text-green-700 font-medium">
                      ✅ Offerte of factuur beschikbaar voor de klant
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
                    <X className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Geen PDF geüpload
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                  <p className="text-xs text-gray-500">
                    Alleen PDF bestanden, max 5MB
                  </p>
                  {selectedFile && (
                    <Button
                      onClick={handleFileUpload}
                      disabled={uploadPdfMutation.isPending}
                      className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium w-full"
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

              {/* Additional Document Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Receipt PDF Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#E6C988]" />
                    Receipt PDF Upload (Intern)
                  </Label>
                  {selectedOrder?.pdfFileName ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800 font-medium">
                        {selectedOrder.pdfFileName}
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
                      <X className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Geen PDF geüpload
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                    />
                    {selectedFile && (
                      <Button
                        onClick={handleFileUpload}
                        disabled={uploadPdfMutation.isPending}
                        className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium w-full"
                      >
                        {uploadPdfMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        Receipt PDF Uploaden
                      </Button>
                    )}
                  </div>
                </div>

                {/* Invoice PDF Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#E6C988]" />
                    Invoice PDF Upload
                  </Label>
                  {selectedOrder?.invoiceUrl ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800 font-medium">
                        Invoice beschikbaar
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
                      <X className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Geen invoice geüpload
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setSelectedInvoiceFile(e.target.files?.[0] || null)
                      }
                      className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                    />
                    {selectedInvoiceFile && (
                      <Button
                        onClick={handleInvoiceUpload}
                        disabled={uploadInvoiceMutation.isPending}
                        className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium w-full"
                      >
                        {uploadInvoiceMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        Invoice PDF Uploaden
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information Section (Step 15.6) */}
            <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#E6C988]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Klantgegevens
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Voornaam
                  </Label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                    {selectedOrder?.customerFirstName || "Niet opgegeven"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Achternaam
                  </Label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                    {selectedOrder?.customerLastName || "Niet opgegeven"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    E-mailadres
                  </Label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                    {selectedOrder?.customerEmail || "Niet opgegeven"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Telefoonnummer
                  </Label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                    {selectedOrder?.customerPhone || "Niet opgegeven"}
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Adres
                  </Label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                    {selectedOrder?.customerAddress || "Niet opgegeven"}
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Woonplaats
                  </Label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                    {selectedOrder?.customerCity || "Niet opgegeven"}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Note Section (Step 15.4) */}
            <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">
                  Notitie voor klant
                </h3>
              </div>
              <p className="text-sm text-blue-700">
                Deze notitie wordt getoond aan de klant op de bestelstatus
                pagina.
              </p>

              <div className="space-y-3">
                <Textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Voeg een bericht toe dat zichtbaar is voor de klant..."
                  className="min-h-20 border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  maxLength={500}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600">
                    {customerNote.length}/500 karakters
                  </span>
                  <Button
                    onClick={handleSaveCustomerNote}
                    disabled={saveCustomerNoteMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2"
                  >
                    {saveCustomerNoteMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Notitie opslaan
                  </Button>
                </div>
              </div>
            </div>

            {/* Internal Note Section (Step 15.5) - Admin Only */}
            <div className="space-y-4 p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <div className="flex items-center gap-2">
                <LockIcon className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Interne notitie
                </h3>
                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded font-medium">
                  Alleen zichtbaar voor admin
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Deze notitie is alleen zichtbaar voor beheerders en wordt nooit
                getoond aan klanten.
              </p>

              <div className="space-y-3">
                <Textarea
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Voeg een interne notitie toe die alleen voor admin zichtbaar is..."
                  className="min-h-20 border-gray-300 focus:border-gray-500 focus:ring-gray-500 bg-white"
                  maxLength={500}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {internalNote.length}/500 karakters
                  </span>
                  <Button
                    onClick={handleSaveInternalNote}
                    disabled={saveInternalNoteMutation.isPending}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2"
                  >
                    {saveInternalNoteMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <LockIcon className="h-4 w-4 mr-2" />
                    )}
                    Interne notitie opslaan
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button
                onClick={handleSaveChanges}
                disabled={updateOrderMutation.isPending}
                className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-semibold flex-1 h-12"
              >
                {updateOrderMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Wijzigingen Opslaan
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Annuleren
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Order Creation Modal */}
      <Dialog open={isNewOrderModalOpen} onOpenChange={setIsNewOrderModalOpen}>
        <DialogContent className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">
              Nieuwe Bestelling Toevoegen
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Customer Information Section */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Klantgegevens
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Customer Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customerName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Volledige Naam *
                  </Label>
                  <Input
                    id="customerName"
                    value={newOrderForm.customerName}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    placeholder="Volledige naam van de klant"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                    required
                  />
                </div>

                {/* Customer Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customerEmail"
                    className="text-sm font-medium text-gray-700"
                  >
                    E-mailadres *
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={newOrderForm.customerEmail}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        customerEmail: e.target.value,
                      }))
                    }
                    placeholder="klant@email.com"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                    required
                  />
                </div>

                {/* Customer Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customerPhone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Telefoonnummer
                  </Label>
                  <Input
                    id="customerPhone"
                    value={newOrderForm.customerPhone}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        customerPhone: e.target.value,
                      }))
                    }
                    placeholder="+32 xxx xx xx xx"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                </div>

                {/* Customer Address */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customerAddress"
                    className="text-sm font-medium text-gray-700"
                  >
                    Adres
                  </Label>
                  <Input
                    id="customerAddress"
                    value={newOrderForm.customerAddress}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        customerAddress: e.target.value,
                      }))
                    }
                    placeholder="Straat en nummer"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                </div>

                {/* Customer City */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customerCity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Stad
                  </Label>
                  <Input
                    id="customerCity"
                    value={newOrderForm.customerCity}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        customerCity: e.target.value,
                      }))
                    }
                    placeholder="Stad"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                </div>
              </div>
            </div>

            {/* Order Information Section */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Bestellingsinformatie
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Product Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Product Categorie *
                  </Label>
                  <Select
                    value={newOrderForm.productCategory}
                    onValueChange={(value) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        productCategory: value,
                      }))
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]">
                      <SelectValue placeholder="Selecteer product categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-700"
                  >
                    Prijs (EUR) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newOrderForm.price}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                    required
                  />
                </div>

                {/* Bonnummer (Unique Order Reference) */}
                <div className="space-y-2 col-span-2">
                  <Label
                    htmlFor="bonnummer"
                    className="text-sm font-medium text-gray-700"
                  >
                    Bonnummer / Referentienummer *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="bonnummer"
                      value={newOrderForm.bonnummer}
                      onChange={(e) =>
                        setNewOrderForm((prev) => ({
                          ...prev,
                          bonnummer: e.target.value.toUpperCase(),
                        }))
                      }
                      placeholder="bijv. BON123456"
                      className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988] flex-1"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        const timestamp = Date.now().toString().slice(-6);
                        const randomStr = Math.random()
                          .toString(36)
                          .substring(2, 5)
                          .toUpperCase();
                        const generatedBonnummer = `BON${timestamp}${randomStr}`;
                        setNewOrderForm((prev) => ({
                          ...prev,
                          bonnummer: generatedBonnummer,
                        }));
                      }}
                      variant="outline"
                      className="px-4"
                    >
                      Genereer
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Vul hier een uniek bonnummer in. Dit nummer zal gebruikt
                    worden om de bestelling op te volgen.
                  </p>
                </div>

                {/* Dimensions */}
                <div className="space-y-2 col-span-2">
                  <Label
                    htmlFor="dimensions"
                    className="text-sm font-medium text-gray-700"
                  >
                    Afmetingen
                  </Label>
                  <Input
                    id="dimensions"
                    value={newOrderForm.dimensions}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        dimensions: e.target.value,
                      }))
                    }
                    placeholder="bijv. 120 x 250 cm"
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences Section */}
            <div className="space-y-4 border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Notificatievoorkeur
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Selecteer hoe de klant bestellingsupdates wil ontvangen.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notifyByEmail"
                    checked={newOrderForm.notifyByEmail}
                    onChange={(e) =>
                      setNewOrderForm((prev) => ({
                        ...prev,
                        notifyByEmail: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300 text-[#E6C988] focus:ring-[#E6C988] h-4 w-4"
                  />
                  <Label
                    htmlFor="notifyByEmail"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    📧 E-mail
                  </Label>
                </div>
              </div>

              {/* Validation messages */}
              {newOrderForm.notifyByEmail && !newOrderForm.customerEmail && (
                <p className="text-sm text-red-600 mt-2">
                  ⚠️ E-mailadres is vereist voor e-mailnotificaties
                </p>
              )}
            </div>

            {/* Additional Notes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Aanvullende Informatie
              </h3>

              {/* Customer Note */}
              <div className="space-y-2">
                <Label
                  htmlFor="customerNote"
                  className="text-sm font-medium text-gray-700"
                >
                  Klantnotitie (zichtbaar voor klant)
                </Label>
                <Textarea
                  id="customerNote"
                  value={newOrderForm.customerNote}
                  onChange={(e) =>
                    setNewOrderForm((prev) => ({
                      ...prev,
                      customerNote: e.target.value,
                    }))
                  }
                  placeholder="Notitie die de klant kan zien..."
                  className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988] min-h-[80px]"
                />
              </div>

              {/* Internal Note */}
              <div className="space-y-2">
                <Label
                  htmlFor="internalNote"
                  className="text-sm font-medium text-gray-700"
                >
                  Interne notitie (alleen admin)
                </Label>
                <Textarea
                  id="internalNote"
                  value={newOrderForm.internalNote}
                  onChange={(e) =>
                    setNewOrderForm((prev) => ({
                      ...prev,
                      internalNote: e.target.value,
                    }))
                  }
                  placeholder="Interne opmerkingen..."
                  className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988] min-h-[80px]"
                />
              </div>

              {/* PDF Documents Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="pdfDocuments"
                  className="text-sm font-medium text-gray-700"
                >
                  PDF Documenten (optioneel)
                </Label>
                <div className="space-y-3">
                  <Input
                    id="pdfDocuments"
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 3) {
                        toast({
                          title: "Te veel bestanden",
                          description: "Maximum 3 PDF bestanden toegestaan",
                          variant: "destructive",
                        });
                        return;
                      }
                      setSelectedPDFs(files);
                      setDocumentTypes(
                        new Array(files.length).fill("document"),
                      );
                      setDocumentVisibility(
                        new Array(files.length).fill(false),
                      );
                    }}
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                  <p className="text-xs text-gray-500">
                    Alleen PDF bestanden. Maximum 3 bestanden per bestelling.
                  </p>

                  {/* Document Configuration */}
                  {selectedPDFs.length > 0 && (
                    <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700">
                        Document Instellingen
                      </h4>
                      {selectedPDFs.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-white rounded border"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Select
                            value={documentTypes[index] || "document"}
                            onValueChange={(value) => {
                              const newTypes = [...documentTypes];
                              newTypes[index] = value;
                              setDocumentTypes(newTypes);
                            }}
                          >
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quote">Offerte</SelectItem>
                              <SelectItem value="invoice">Factuur</SelectItem>
                              <SelectItem value="measurement">
                                Opmeting
                              </SelectItem>
                              <SelectItem value="instruction">
                                Instructie
                              </SelectItem>
                              <SelectItem value="document">Document</SelectItem>
                            </SelectContent>
                          </Select>
                          <label className="flex items-center gap-1 text-xs">
                            <input
                              type="checkbox"
                              checked={documentVisibility[index] || false}
                              onChange={(e) => {
                                const newVisibility = [...documentVisibility];
                                newVisibility[index] = e.target.checked;
                                setDocumentVisibility(newVisibility);
                              }}
                              className="rounded border-gray-300"
                            />
                            Zichtbaar voor klant
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button
                onClick={handleCreateOrder}
                disabled={createOrderMutation.isPending}
                className="bg-[#E6C988] hover:bg-[#D5B992] text-black font-semibold flex-1 h-12"
              >
                {createOrderMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Package className="h-4 w-4 mr-2" />
                )}
                Bestelling Aanmaken
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsNewOrderModalOpen(false)}
                className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Annuleren
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Viewing Modal */}
      <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-black flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#E6C988]" />
              Order Documenten
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedOrderDocuments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Geen documenten beschikbaar voor deze order</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {selectedOrderDocuments.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-[#E6C988]" />
                          <span className="font-medium text-gray-900">
                            {doc.originalName}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {doc.documentType}
                          </Badge>
                          {doc.isVisibleToCustomer && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              <Eye className="h-3 w-3 mr-1" />
                              Zichtbaar
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Geüpload:{" "}
                          {new Date(doc.createdAt).toLocaleDateString("nl-NL")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(
                              `/api/orders/documents/${doc.id}/download`,
                              "_blank",
                            )
                          }
                          className="text-[#E6C988] border-[#E6C988] hover:bg-[#E6C988] hover:text-black"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toggleDocumentVisibility(
                              doc.id,
                              !doc.isVisibleToCustomer,
                            )
                          }
                          className="border-gray-300 hover:bg-gray-50"
                        >
                          {doc.isVisibleToCustomer ? (
                            <EyeOff className="h-3 w-3 mr-1" />
                          ) : (
                            <Eye className="h-3 w-3 mr-1" />
                          )}
                          {doc.isVisibleToCustomer ? "Verbergen" : "Tonen"}
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteDocument(doc.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Verwijderen
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
