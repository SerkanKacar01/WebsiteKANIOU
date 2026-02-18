import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from 'react-helmet-async';
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
  Building, 
  Crown,
  Diamond,
  Gem,
  Zap,
  FileText, 
  Package, 
  Shield, 
  TrendingUp, 
  Users, 
  Euro, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Settings,
  BarChart3,
  CheckCircle,
  Star,
  Calendar,
  Award,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronUp
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
  documentCount?: number; // Number of uploaded documents
}

interface DashboardData {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  uniqueCustomers: number;
  orders: Order[];
}

const ORDER_STATUSES = [
  "Bestelling ontvangen",
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
  "Zonwering",
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

// Individual status steps - temporarily simplified for compilation fix
const statusSteps = [
  { key: "bestelling_ontvangen", label: "Bestelling ontvangen" },
  { key: "bestelling_in_verwerking", label: "Bestelling in verwerking" },
  { key: "bestelling_verwerkt", label: "Bestelling verwerkt" },
  { key: "bestelling_in_productie", label: "Bestelling in productie" },
  { key: "bestelling_gereed", label: "Bestelling is gereed" },
  { key: "wordt_gebeld_voor_levering", label: "U wordt gebeld voor levering" },
  { key: "bestelling_geleverd", label: "Bestelling geleverd" },
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
  const [selectedInvoiceFile, setSelectedInvoiceFile] = useState<File | null>(null);
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
    orderDate: new Date().toISOString().split("T")[0],
    status: "In behandeling",
    customerNote: "",
    internalNote: "",
    bonnummer: "",
    // New fields
    productCategory: "",
    productModel: "",
    productDetails: "",
    expectedDeliveryDate: "",
    sendNotification: false,
  });

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "messages">("orders");
  const [expandedQuoteId, setExpandedQuoteId] = useState<number | null>(null);

  // Premium Animation State
  const [isAnimating, setIsAnimating] = useState(true);

  // PDF upload state for new orders
  const [newOrderPDFs, setNewOrderPDFs] = useState<File[]>([]);
  
  // PDF upload state for existing orders
  const [selectedPDFs, setSelectedPDFs] = useState<File[]>([]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [documentVisibility, setDocumentVisibility] = useState<boolean[]>([]);

  // Document viewing state
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedOrderDocuments, setSelectedOrderDocuments] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Status update state
  const [statusUpdates, setStatusUpdates] = useState<{
    [orderId: number]: string;
  }>({});

  // Individual order update tracking
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  // Update order mutation
  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, updateData }: { orderId: number, updateData: any }) => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "✨ Order Bijgewerkt",
        description: "De ordergegevens zijn succesvol aangepast.",
      });
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "❌ Update Fout",
        description: "Er is een probleem opgetreden bij het bijwerken van de order.",
        variant: "destructive",
      });
    },
  });

  // Search and filter state (Step 15.8)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roomFilter, setRoomFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    // Premium entrance animation
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Helper functions for individual status management
  const getStatusValue = (order: Order | null, statusKey: string): boolean => {
    if (!order) return false;
    const statusMap: {[key: string]: keyof Order} = {
      'bestelling_ontvangen': 'statusBestelOntvangen',
      'bestelling_in_verwerking': 'statusInVerwerking',
      'bestelling_verwerkt': 'statusVerwerkt',
      'bestelling_in_productie': 'statusInProductie',
      'bestelling_gereed': 'statusGereed',
      'wordt_gebeld_voor_levering': 'statusWordtGebeld',
      'bestelling_geleverd': 'statusGeleverd'
    };
    const field = statusMap[statusKey];
    return field ? !!(order as any)[field] : false;
  };

  const getStatusDate = (order: Order | null, statusKey: string): Date | null => {
    if (!order) return null;
    const statusMap: {[key: string]: keyof Order} = {
      'bestelling_ontvangen': 'statusBestelOntvangen',
      'bestelling_in_verwerking': 'statusInVerwerking',
      'bestelling_verwerkt': 'statusVerwerkt',
      'bestelling_in_productie': 'statusInProductie',
      'bestelling_gereed': 'statusGereed',
      'wordt_gebeld_voor_levering': 'statusWordtGebeld',
      'bestelling_geleverd': 'statusGeleverd'
    };
    const field = statusMap[statusKey];
    return field ? (order as any)[field] : null;
  };

  const formatDate = (dateStr: string | Date | null | undefined) => {
    if (!dateStr) return "Onbekend";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit", 
        year: "numeric"
      });
    } catch {
      return "Onbekend";
    }
  };

  const handleStatusToggle = async (statusKey: string, isChecked: boolean) => {
    if (!selectedOrder) return;

    const statusMap: {[key: string]: string} = {
      'bestelling_ontvangen': 'statusBestelOntvangen',
      'bestelling_in_verwerking': 'statusInVerwerking',
      'bestelling_verwerkt': 'statusVerwerkt',
      'bestelling_in_productie': 'statusInProductie',
      'bestelling_gereed': 'statusGereed',
      'wordt_gebeld_voor_levering': 'statusWordtGebeld',
      'bestelling_geleverd': 'statusGeleverd'
    };

    const updateData = {
      [statusMap[statusKey]]: isChecked ? new Date().toISOString() : null
    };

    try {
      const response = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast({
          title: "✨ Status Bijgewerkt",
          description: "Order status is succesvol aangepast.",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      }
    } catch (error) {
      toast({
        title: "❌ Fout",
        description: "Status update mislukt.",
        variant: "destructive",
      });
    }
  };

  // Check authentication status
  const { data: authStatus, isLoading: isLoadingAuth } = useQuery<{authenticated: boolean, email?: string}>({
    queryKey: ["/api/admin/auth-status"],
    retry: false,
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery<DashboardData>({
    queryKey: ["/api/admin/dashboard"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  // Fetch enterprise quotes
  const { data: enterpriseQuotes } = useQuery<any[]>({
    queryKey: ["/api/admin/enterprise-quotes"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  // Fetch contact submissions
  const { data: contactSubmissions } = useQuery<any[]>({
    queryKey: ["/api/admin/contact-submissions"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "👑 Succesvol Uitgelogd",
        description: "U bent veilig uitgelogd uit het premium dashboard.",
      });
      setLocation("/kaniouzilvernaald-dashboard");
    },
    onError: () => {
      toast({
        title: "❌ Uitlog Fout",
        description: "Er is een probleem opgetreden bij het uitloggen.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    setIsLoggingOut(true);
    logoutMutation.mutate();
  };

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: typeof newOrderForm) => {
      const apiData = {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail || `${orderData.customerName.replace(/\s+/g, "").toLowerCase()}@kaniou.be`,
        customerPhone: orderData.customerPhone || null,
        customerFirstName: orderData.customerFirstName || null,
        customerLastName: orderData.customerLastName || null,
        customerAddress: orderData.customerAddress || null,
        customerCity: orderData.customerCity || null,
        amount: 0,
        currency: "EUR",
        description: `${orderData.productCategory} - ${orderData.productModel}`,
        productType: orderData.productCategory,
        productModel: orderData.productModel,
        productDetails: orderData.productDetails || null,
        status: orderData.status || "In behandeling",
        expectedDeliveryDate: orderData.expectedDeliveryDate || null,
        sendNotification: orderData.sendNotification || false,
        notifyByEmail: orderData.sendNotification || false,
        customerNote: orderData.customerNote || null,
        internalNote: orderData.internalNote || null,
        bonnummer: orderData.bonnummer,
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
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "💎 Premium Bestelling Aangemaakt",
        description: "De nieuwe exclusieve bestelling is succesvol toegevoegd.",
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
        orderDate: new Date().toISOString().split("T")[0],
        status: "In behandeling",
        customerNote: "",
        internalNote: "",
        bonnummer: "",
        // New fields
        productCategory: "",
        productModel: "",
        productDetails: "",
        expectedDeliveryDate: "",
        sendNotification: false,
      });
    },
    onError: (error) => {
      toast({
        title: "❌ Aanmaak Fout",
        description: "Er is een probleem opgetreden bij het aanmaken van de bestelling.",
        variant: "destructive",
      });
    },
  });

  // Filter and search orders
  const filteredOrders = React.useMemo(() => {
    if (!dashboardData?.orders) return [];

    let filtered = dashboardData.orders;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customerName?.toLowerCase().includes(query) ||
          order.orderNumber?.toLowerCase().includes(query) ||
          order.productType?.toLowerCase().includes(query) ||
          order.bonnummer?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Product filter
    if (productFilter && productFilter !== "all") {
      filtered = filtered.filter((order) =>
        order.productType?.toLowerCase().includes(productFilter.toLowerCase())
      );
    }

    return filtered;
  }, [dashboardData?.orders, searchQuery, statusFilter, productFilter]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Authenticatie verificatie...</p>
        </div>
      </div>
    );
  }

  if (!authStatus?.authenticated) {
    setLocation("/kaniouzilvernaald-dashboard");
    return null;
  }

  if (isLoadingDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-xl mb-2">Premium Dashboard Laden...</p>
          <p className="text-slate-300">Exclusieve business data wordt voorbereid</p>
        </div>
      </div>
    );
  }

  const openEditModal = (order: Order) => {
    setSelectedOrder(order);
    setEditForm({
      status: order.status || "",
      clientNote: order.clientNote || "",
      noteFromEntrepreneur: order.noteFromEntrepreneur || "",
      notificationPreference: (order.notificationPreference as "email" | "whatsapp" | "both") || "email",
    });
    setCustomerNote(order.customerNote || "");
    setInternalNote(order.internalNote || "");
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>👑 Executive Dashboard | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Premium business dashboard voor KANIOU Zilvernaald. Executive overzicht van orders, klanten en omzet."
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra-Premium Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/10 via-transparent to-transparent"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-400/5 to-orange-500/5 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : 'animate-bounce'} duration-[4000ms]`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-500/5 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : 'animate-bounce'} duration-[5000ms] delay-1000`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-cyan-500/5 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : 'animate-bounce'} duration-[6000ms] delay-2000`}></div>
        </div>

        <div className="relative z-10">
          {/* Ultra-Luxe Header */}
          <div className={`transform transition-all duration-1000 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent backdrop-blur-xl"></div>
              <div className="relative px-6 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-2xl filter blur-lg animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                        <Crown className="w-12 h-12 text-amber-300 drop-shadow-lg" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent tracking-tight">
                        Executive Dashboard
                      </h1>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-slate-300 text-lg">
                          Welkom, <span className="text-amber-300 font-semibold">{authStatus.email}</span>
                        </p>
                        <div className="flex items-center gap-1 text-sm text-emerald-300">
                          <Shield className="w-4 h-4" />
                          <span>Premium Access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400/50 to-pink-500/50 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-semibold px-6 py-3 rounded-xl shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          <span>Uitloggen...</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Veilig Uitloggen</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Premium Statistics Cards */}
              <div className={`transform transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Total Orders */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/50 to-orange-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10"></div>
                      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white">
                          Totaal Orders
                        </CardTitle>
                        <div className="bg-gradient-to-br from-amber-400/20 to-orange-500/20 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                          <Package className="w-6 h-6 text-amber-300" />
                        </div>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="text-3xl font-bold text-white mb-2">
                          {dashboardData?.totalOrders || 0}
                        </div>
                        <p className="text-slate-300 text-sm flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Premium bestellingen
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Pending Orders */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-cyan-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-500/10"></div>
                      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white">
                          In Behandeling
                        </CardTitle>
                        <div className="bg-gradient-to-br from-blue-400/20 to-cyan-500/20 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                          <Zap className="w-6 h-6 text-blue-300" />
                        </div>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="text-3xl font-bold text-white mb-2">
                          {dashboardData?.pendingOrders || 0}
                        </div>
                        <p className="text-slate-300 text-sm flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          Actieve projecten
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Total Revenue */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-teal-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10"></div>
                      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white">
                          Premium Omzet
                        </CardTitle>
                        <div className="bg-gradient-to-br from-emerald-400/20 to-teal-500/20 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                          <Euro className="w-6 h-6 text-emerald-300" />
                        </div>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="text-3xl font-bold text-white mb-2">
                          €{((dashboardData?.totalRevenue || 0) / 100).toFixed(2)}
                        </div>
                        <p className="text-slate-300 text-sm flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Bruto omzet
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Unique Customers */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/50 to-pink-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10"></div>
                      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white">
                          VIP Klanten
                        </CardTitle>
                        <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                          <Users className="w-6 h-6 text-purple-300" />
                        </div>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="text-3xl font-bold text-white mb-2">
                          {dashboardData?.uniqueCustomers || 0}
                        </div>
                        <p className="text-slate-300 text-sm flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Exclusieve klanten
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className={`transform transition-all duration-1000 delay-400 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="flex gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "orders"
                        ? "bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white shadow-lg shadow-amber-500/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    Bestellingen ({dashboardData?.orders?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab("quotes")}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "quotes"
                        ? "bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white shadow-lg shadow-amber-500/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    Offerteaanvragen ({enterpriseQuotes?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "messages"
                        ? "bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white shadow-lg shadow-amber-500/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Berichten ({contactSubmissions?.length || 0})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "orders" && (
              <>
              {/* Premium Search & Filter Section */}
              <div className={`transform transition-all duration-1000 delay-500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/50 via-purple-500/50 to-pink-500/50 rounded-2xl blur opacity-30"></div>
                  <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <CardHeader className="relative pb-4">
                      <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                        <Filter className="w-6 h-6 text-indigo-300" />
                        Intelligent Search & Filtering
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative space-y-6">
                      {/* Premium Search Bar */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Search className="w-5 h-5 text-slate-300" />
                          </div>
                          <input
                            type="text"
                            placeholder="Zoek op klantnaam, ordernummer, bonnummer of product..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50 text-lg"
                          />
                        </div>
                      </div>

                      {/* Premium Filter Dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Status Filter */}
                        <div className="space-y-2">
                          <Label className="text-white font-semibold flex items-center gap-2">
                            <Gem className="w-4 h-4 text-emerald-300" />
                            Premium Status
                          </Label>
                          <div className="relative">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/30 text-white focus:bg-white/20 focus:border-amber-300/50">
                                <SelectValue placeholder="Alle statussen" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                                <SelectItem value="all" className="text-white hover:bg-white/10">Alle Statussen</SelectItem>
                                {ORDER_STATUSES.map((status) => (
                                  <SelectItem key={status} value={status} className="text-white hover:bg-white/10">
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Product Filter */}
                        <div className="space-y-2">
                          <Label className="text-white font-semibold flex items-center gap-2">
                            <Diamond className="w-4 h-4 text-blue-300" />
                            Product Categorie
                          </Label>
                          <div className="relative">
                            <Select value={productFilter} onValueChange={setProductFilter}>
                              <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/30 text-white focus:bg-white/20 focus:border-blue-300/50">
                                <SelectValue placeholder="Alle producten" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                                <SelectItem value="all" className="text-white hover:bg-white/10">Alle Producten</SelectItem>
                                {PRODUCT_CATEGORIES.map((product) => (
                                  <SelectItem key={product} value={product} className="text-white hover:bg-white/10">
                                    {product}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Reset Filters */}
                        <div className="space-y-2">
                          <Label className="text-transparent">Reset</Label>
                          <Button
                            onClick={() => {
                              setSearchQuery("");
                              setStatusFilter("all");
                              setProductFilter("all");
                            }}
                            className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white border-white/20"
                            variant="outline"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Reset Filters
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Premium Orders Overview */}
              <div className={`transform transition-all duration-1000 delay-700 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 via-cyan-500/50 to-blue-500/50 rounded-2xl blur opacity-30"></div>
                  <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <CardHeader className="relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                          <Crown className="w-7 h-7 text-amber-300" />
                          Exclusive Orders Management
                        </CardTitle>
                        <div className="flex items-center gap-6">
                          <div className="text-slate-300 font-semibold">
                            {filteredOrders.length} van {dashboardData?.orders?.length || 0} premium orders
                          </div>
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-cyan-500/50 rounded-xl blur opacity-50"></div>
                            <Button
                              onClick={() => setIsNewOrderModalOpen(true)}
                              className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold px-6 py-3 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                              <Plus className="w-5 h-5" />
                              Nieuwe Premium Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative p-0">
                      {filteredOrders.length === 0 ? (
                        <div className="text-center py-16">
                          <Package className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                          <h3 className="text-xl font-semibold text-white mb-2">Geen Orders Gevonden</h3>
                          <p className="text-slate-300">Pas uw zoekfilters aan of maak een nieuwe premium order aan.</p>
                        </div>
                      ) : (
                        /* Desktop Table View */
                        <div className="hidden lg:block overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-white/10">
                              <tr>
                                <th className="text-left py-6 px-6 font-bold text-amber-300">Order</th>
                                <th className="text-left py-6 px-6 font-bold text-emerald-300">VIP Klant</th>
                                <th className="text-left py-6 px-6 font-bold text-blue-300">Premium Product</th>
                                <th className="text-left py-6 px-6 font-bold text-purple-300">Status</th>
                                <th className="text-left py-6 px-6 font-bold text-cyan-300">Documenten</th>
                                <th className="text-left py-6 px-6 font-bold text-pink-300">Acties</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                              {filteredOrders.map((order) => (
                                <tr
                                  key={order.id}
                                  className="hover:bg-white/5 transition-all duration-300 group"
                                >
                                  <td className="py-6 px-6">
                                    <div className="flex flex-col space-y-1">
                                      <div className="flex items-center gap-3">
                                        <div className="bg-gradient-to-r from-amber-400/20 to-orange-500/20 p-2 rounded-lg">
                                          <Diamond className="w-4 h-4 text-amber-300" />
                                        </div>
                                        <span className="font-mono text-amber-300 font-bold text-lg">
                                          #{order.orderNumber}
                                        </span>
                                      </div>
                                      <span className="text-xs text-slate-400 font-mono">
                                        {order.bonnummer}
                                      </span>
                                      <span className="text-xs text-slate-400">
                                        {formatDate(order.createdAt)}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-6 px-6">
                                    <div className="flex flex-col space-y-1">
                                      <span className="font-semibold text-white text-lg">
                                        {order.customerName}
                                      </span>
                                      <span className="text-sm text-slate-300">
                                        {order.customerEmail}
                                      </span>
                                      {order.customerPhone && (
                                        <span className="text-xs text-slate-400 font-mono">
                                          {order.customerPhone}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-6 px-6">
                                    <div className="flex flex-col space-y-1">
                                      <span className="font-medium text-white">
                                        {order.productType}
                                      </span>
                                      <div className="text-lg font-bold text-emerald-300">
                                        €{((order.amount || 0) / 100).toFixed(2)}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-6 px-6">
                                    <Badge
                                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-400/30 font-semibold px-4 py-2"
                                    >
                                      {order.status}
                                    </Badge>
                                  </td>
                                  <td className="py-6 px-6">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-cyan-300" />
                                      <span className="text-slate-300">
                                        {order.documentCount || 0} docs
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-6 px-6">
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => openEditModal(order)}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-medium px-4 py-2 rounded-lg transform hover:scale-105 transition-all duration-300"
                                      >
                                        <Edit className="h-3 w-3 mr-1" />
                                        Bewerk
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Mobile Card View */}
                      <div className="lg:hidden p-4 space-y-4">
                        {filteredOrders.map((order) => (
                          <div key={order.id} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                            <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-xl rounded-xl">
                              <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Diamond className="w-5 h-5 text-amber-300" />
                                      <h3 className="text-xl font-bold text-amber-300">
                                        #{order.orderNumber}
                                      </h3>
                                    </div>
                                    <p className="text-lg font-semibold text-white">
                                      {order.customerName}
                                    </p>
                                    <p className="text-sm text-slate-300">
                                      {order.customerEmail}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-emerald-300 mb-2">
                                      €{((order.amount || 0) / 100).toFixed(2)}
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => openEditModal(order)}
                                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white"
                                    >
                                      <Edit className="h-3 w-3 mr-1" />
                                      Bewerk
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <p className="text-xs text-slate-400">Product</p>
                                    <p className="text-sm font-medium text-white">{order.productType}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-400">Status</p>
                                    <Badge className="mt-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-400/30">
                                      {order.status}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="text-xs text-slate-400">
                                  <span>Bonnummer: </span>
                                  <span className="font-mono text-amber-300">{order.bonnummer}</span>
                                  <span className="mx-2">•</span>
                                  <span>{formatDate(order.createdAt)}</span>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              </>
              )}

              {/* Offerteaanvragen Tab */}
              {activeTab === "quotes" && (
                <div className={`transform transition-all duration-500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 via-cyan-500/50 to-blue-500/50 rounded-2xl blur opacity-30"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                      <CardHeader className="relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-white/10">
                        <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                          <FileText className="w-7 h-7 text-amber-300" />
                          Offerteaanvragen
                          <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 ml-2">
                            {enterpriseQuotes?.length || 0}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative p-0">
                        {!enterpriseQuotes || enterpriseQuotes.length === 0 ? (
                          <div className="text-center py-16">
                            <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Geen Offerteaanvragen</h3>
                            <p className="text-slate-300">Er zijn nog geen offerteaanvragen ontvangen.</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-white/10">
                            {enterpriseQuotes.map((quote: any) => (
                              <div key={quote.id} className="hover:bg-white/5 transition-all duration-300">
                                <div
                                  className="p-6 cursor-pointer"
                                  onClick={() => setExpandedQuoteId(expandedQuoteId === quote.id ? null : quote.id)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="bg-gradient-to-r from-amber-400/20 to-orange-500/20 p-2 rounded-lg">
                                        <FileText className="w-5 h-5 text-amber-300" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-3">
                                          <span className="font-mono text-amber-300 font-bold">
                                            {quote.submissionId}
                                          </span>
                                          <Badge className={`${
                                            quote.status === 'nieuw' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                                            quote.status === 'in_behandeling' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                                            quote.status === 'afgerond' ? 'bg-purple-500/20 text-purple-300 border-purple-400/30' :
                                            'bg-slate-500/20 text-slate-300 border-slate-400/30'
                                          }`}>
                                            {quote.status === 'nieuw' ? 'Nieuw' : quote.status === 'in_behandeling' ? 'In behandeling' : quote.status === 'afgerond' ? 'Afgerond' : quote.status}
                                          </Badge>
                                        </div>
                                        <p className="text-white font-semibold mt-1">
                                          {quote.contact?.firstName} {quote.contact?.lastName}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-300">
                                          <span>{quote.customerType}</span>
                                          <span>•</span>
                                          <span>{quote.projectType}</span>
                                          <span>•</span>
                                          <span>{quote.planning === 'asap' ? 'Zo snel mogelijk' : quote.planning === '2-4w' ? '2-4 weken' : quote.planning === '1-2m' ? '1-2 maanden' : 'Later'}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span className="text-sm text-slate-400">
                                        {formatDate(quote.createdAt)}
                                      </span>
                                      {expandedQuoteId === quote.id ? (
                                        <ChevronUp className="w-5 h-5 text-slate-400" />
                                      ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {expandedQuoteId === quote.id && (
                                  <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                        <h4 className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                                          <Users className="w-4 h-4" />
                                          Contactgegevens
                                        </h4>
                                        <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                          <p className="text-white"><span className="text-slate-400">Naam:</span> {quote.contact?.firstName} {quote.contact?.lastName}</p>
                                          <p className="text-white"><span className="text-slate-400">Email:</span> {quote.contact?.email}</p>
                                          <p className="text-white"><span className="text-slate-400">Telefoon:</span> {quote.contact?.phone}</p>
                                          {quote.contact?.address && <p className="text-white"><span className="text-slate-400">Adres:</span> {quote.contact?.address}</p>}
                                          {quote.contact?.city && <p className="text-white"><span className="text-slate-400">Stad:</span> {quote.contact?.city}</p>}
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                                          <Settings className="w-4 h-4" />
                                          Voorkeuren
                                        </h4>
                                        <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                          <p className="text-white"><span className="text-slate-400">Producttypes:</span> {quote.preferences?.productTypes?.join(', ') || 'Niet opgegeven'}</p>
                                          {quote.preferences?.colors && <p className="text-white"><span className="text-slate-400">Kleuren:</span> {quote.preferences.colors.join(', ')}</p>}
                                          {quote.preferences?.budget && <p className="text-white"><span className="text-slate-400">Budget:</span> {quote.preferences.budget}</p>}
                                          <p className="text-white"><span className="text-slate-400">Metingen beschikbaar:</span> {quote.hasMeasurements ? 'Ja' : 'Nee'}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {quote.rooms && quote.rooms.length > 0 && (
                                      <div>
                                        <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                                          <Building className="w-4 h-4" />
                                          Ruimtes & Ramen ({quote.rooms.length})
                                        </h4>
                                        <div className="space-y-3">
                                          {quote.rooms.map((room: any, roomIdx: number) => (
                                            <div key={roomIdx} className="bg-white/5 rounded-lg p-4">
                                              <p className="text-white font-semibold mb-2">{room.name}</p>
                                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {room.windows?.map((win: any, winIdx: number) => (
                                                  <div key={winIdx} className="bg-white/5 rounded p-2 text-sm">
                                                    <p className="text-slate-300">Raam {winIdx + 1}</p>
                                                    <p className="text-white">{win.widthCm} × {win.heightCm} cm</p>
                                                    {win.productType && <p className="text-amber-300 text-xs">{win.productType}</p>}
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {quote.services && Object.keys(quote.services).length > 0 && (
                                      <div>
                                        <h4 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4" />
                                          Diensten
                                        </h4>
                                        <div className="bg-white/5 rounded-lg p-4 text-sm">
                                          <div className="flex flex-wrap gap-2">
                                            {quote.services.measurement && <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">Inmeten</Badge>}
                                            {quote.services.installation && <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Installatie</Badge>}
                                            {quote.services.removal && <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Demontage</Badge>}
                                            {quote.services.advice && <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">Advies</Badge>}
                                          </div>
                                          {quote.services.notes && <p className="text-slate-300 mt-2">{quote.services.notes}</p>}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Berichten Tab */}
              {activeTab === "messages" && (
                <div className={`transform transition-all duration-500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/50 via-pink-500/50 to-rose-500/50 rounded-2xl blur opacity-30"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                      <CardHeader className="relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-white/10">
                        <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                          <MessageSquare className="w-7 h-7 text-amber-300" />
                          Berichten
                          <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 ml-2">
                            {contactSubmissions?.length || 0}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative p-0">
                        {!contactSubmissions || contactSubmissions.length === 0 ? (
                          <div className="text-center py-16">
                            <MessageSquare className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Geen Berichten</h3>
                            <p className="text-slate-300">Er zijn nog geen berichten ontvangen.</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-white/10">
                            {contactSubmissions.map((submission: any) => (
                              <div key={submission.id} className="p-6 hover:bg-white/5 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-purple-400/20 to-pink-500/20 p-2 rounded-lg">
                                      <MessageSquare className="w-5 h-5 text-purple-300" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge className={`${
                                          submission.type === 'callback' ? 'bg-orange-500/20 text-orange-300 border-orange-400/30' :
                                          submission.type === 'question' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                                          'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                                        }`}>
                                          {submission.type === 'callback' ? 'Terugbelverzoek' : submission.type === 'question' ? 'Vraag' : 'Contact'}
                                        </Badge>
                                      </div>
                                      <p className="text-white font-semibold text-lg">{submission.name}</p>
                                      <div className="flex items-center gap-4 text-sm text-slate-300">
                                        <span>{submission.email}</span>
                                        {submission.phone && (
                                          <>
                                            <span>•</span>
                                            <span className="font-mono">{submission.phone}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-sm text-slate-400">
                                    {formatDate(submission.createdAt)}
                                  </span>
                                </div>
                                <div className="ml-14">
                                  <p className="text-amber-300 font-semibold mb-1">{submission.subject}</p>
                                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{submission.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Premium Modals would go here - Edit Modal, New Order Modal, etc. */}
        {/* For brevity, I'm including just the structure - the modals would follow the same luxury design pattern */}
        
        {/* Edit Order Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-2xl border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg"></div>
            <DialogHeader className="relative pb-6 border-b border-white/20">
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <Crown className="w-6 h-6 text-amber-300" />
                Premium Order Bewerken #{selectedOrder?.orderNumber}
              </DialogTitle>
            </DialogHeader>
            
            <div className="relative space-y-6 pt-6">
              {/* Customer Information Section */}
              <div className="border-b border-white/20 pb-6">
                <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Klantgegevens
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 mb-1">Naam</p>
                    <p className="text-white font-semibold">{selectedOrder?.customerName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Email</p>
                    <p className="text-white font-semibold">{selectedOrder?.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Telefoon</p>
                    <p className="text-white font-semibold">{selectedOrder?.customerPhone || 'Niet opgegeven'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Bonnummer</p>
                    <p className="text-amber-300 font-mono font-semibold">{selectedOrder?.bonnummer}</p>
                  </div>
                </div>
              </div>

              {/* Order Status Management */}
              <div className="border-b border-white/20 pb-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Status Beheer
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white font-semibold mb-2 block">Order Status</Label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md px-3 py-2 focus:bg-white/20 focus:border-cyan-400"
                    >
                      <option value="pending" className="bg-slate-800 text-white">In behandeling</option>
                      <option value="processing" className="bg-slate-800 text-white">In verwerking</option>
                      <option value="production" className="bg-slate-800 text-white">In productie</option>
                      <option value="ready" className="bg-slate-800 text-white">Gereed voor levering</option>
                      <option value="shipped" className="bg-slate-800 text-white">Verzonden</option>
                      <option value="delivered" className="bg-slate-800 text-white">Geleverd</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-white font-semibold mb-2 block">Notificatie voorkeur</Label>
                    <select
                      value={editForm.notificationPreference}
                      onChange={(e) => setEditForm(prev => ({ ...prev, notificationPreference: e.target.value as "email" | "whatsapp" | "both" }))}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md px-3 py-2 focus:bg-white/20 focus:border-cyan-400"
                    >
                      <option value="email" className="bg-slate-800 text-white">Email</option>
                      <option value="whatsapp" className="bg-slate-800 text-white">WhatsApp</option>
                      <option value="both" className="bg-slate-800 text-white">Email + WhatsApp</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="border-b border-white/20 pb-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Notities & Opmerkingen
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white font-semibold mb-2 block">Klant notitie (zichtbaar voor klant)</Label>
                    <Textarea
                      value={editForm.clientNote}
                      onChange={(e) => setEditForm(prev => ({ ...prev, clientNote: e.target.value }))}
                      placeholder="Voeg een notitie toe die de klant kan zien..."
                      rows={3}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-slate-300 focus:bg-white/20 focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <Label className="text-white font-semibold mb-2 block">Interne notitie (alleen voor team)</Label>
                    <Textarea
                      value={editForm.noteFromEntrepreneur}
                      onChange={(e) => setEditForm(prev => ({ ...prev, noteFromEntrepreneur: e.target.value }))}
                      placeholder="Interne opmerkingen voor het team..."
                      rows={3}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-slate-300 focus:bg-white/20 focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>

              {/* Product Information Display */}
              {selectedOrder && (
                <div className="border-b border-white/20 pb-6">
                  <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Product Informatie
                  </h3>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-white">{selectedOrder.productType || 'Geen product informatie'}</p>
                    {selectedOrder.description && (
                      <p className="text-slate-300 text-sm mt-2">{selectedOrder.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setIsEditModalOpen(false)}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Annuleren
                </Button>
                <Button
                  onClick={() => {
                    if (!selectedOrder) return;
                    
                    const updateData = {
                      status: editForm.status,
                      clientNote: editForm.clientNote,
                      noteFromEntrepreneur: editForm.noteFromEntrepreneur,
                      notificationPreference: editForm.notificationPreference,
                    };
                    
                    updateOrderMutation.mutate({ orderId: selectedOrder.id, updateData });
                  }}
                  disabled={updateOrderMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold"
                >
                  {updateOrderMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Opslaan...
                    </>
                  ) : (
                    <>
                      <Settings className="w-4 h-4 mr-2" />
                      Wijzigingen Opslaan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Order Modal */}
        <Dialog open={isNewOrderModalOpen} onOpenChange={setIsNewOrderModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-2xl border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg"></div>
            <DialogHeader className="relative pb-6 border-b border-white/20">
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <Diamond className="w-6 h-6 text-emerald-300" />
                Nieuwe Premium Bestelling
              </DialogTitle>
            </DialogHeader>
            
            <div className="relative space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-semibold">VIP Klant Naam *</Label>
                  <Input
                    value={newOrderForm.customerName}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Volledige naam"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-slate-300 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-semibold">E-mailadres *</Label>
                  <Input
                    type="email"
                    value={newOrderForm.customerEmail}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                    placeholder="klant@email.com"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-slate-300 focus:bg-white/20"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-semibold">Telefoon</Label>
                  <Input
                    value={newOrderForm.customerPhone}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="+32..."
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-slate-300 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-semibold">Premium Bonnummer</Label>
                  <Input
                    value={newOrderForm.bonnummer}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, bonnummer: e.target.value.toUpperCase() }))}
                    placeholder="KAN-25-XXXXXX-XX"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-slate-300 focus:bg-white/20 font-mono"
                  />
                </div>
              </div>

              {/* STAP 1: Nieuwe velden zoals gevraagd */}
              
              {/* Productinformatie Sectie */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Productinformatie
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Productcategorie *</Label>
                    <select
                      value={newOrderForm.productCategory}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, productCategory: e.target.value }))}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md px-3 py-2 focus:bg-white/20 focus:border-emerald-400"
                    >
                      <option value="" className="bg-slate-800 text-white">Selecteer categorie</option>
                      <option value="gordijnen" className="bg-slate-800 text-white">Gordijnen</option>
                      <option value="jalouzieën" className="bg-slate-800 text-white">Jalouzieën</option>
                      <option value="rolgordijnen" className="bg-slate-800 text-white">Rolgordijnen</option>
                      <option value="verticale-lamellen" className="bg-slate-800 text-white">Verticale Lamellen</option>
                      <option value="plissé" className="bg-slate-800 text-white">Plissé gordijnen</option>
                      <option value="shutters" className="bg-slate-800 text-white">Shutters</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Model/Type *</Label>
                    <Input
                      value={newOrderForm.productModel}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, productModel: e.target.value }))}
                      placeholder="Bijv. Premium Blackout, Luxe Houten Jaloezie"
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-slate-300 focus:bg-white/20"
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label className="text-white font-semibold">Productdetails</Label>
                  <textarea
                    value={newOrderForm.productDetails}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, productDetails: e.target.value }))}
                    placeholder="Specificaties, afmetingen, kleur, bediening, montage-instructies..."
                    rows={3}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-slate-300 rounded-md px-3 py-2 focus:bg-white/20 focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Status en Levering Sectie */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Status & Levering
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Status van bestelling *</Label>
                    <select
                      value={newOrderForm.status}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md px-3 py-2 focus:bg-white/20 focus:border-cyan-400"
                    >
                      <option value="In behandeling" className="bg-slate-800 text-white">In behandeling</option>
                      <option value="In productie" className="bg-slate-800 text-white">In productie</option>
                      <option value="Verzonden" className="bg-slate-800 text-white">Verzonden</option>
                      <option value="Geleverd" className="bg-slate-800 text-white">Geleverd</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Verwachte leverdatum</Label>
                    <Input
                      type="date"
                      value={newOrderForm.expectedDeliveryDate}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, expectedDeliveryDate: e.target.value }))}
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white focus:bg-white/20"
                    />
                  </div>
                </div>
              </div>

              {/* PDF Upload Sectie */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documenten
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Upload PDF (offerte, factuur)</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 3) {
                          toast({
                            title: "⚠️ Te veel bestanden",
                            description: "Maximaal 3 PDF-bestanden toegestaan.",
                            variant: "destructive",
                          });
                          return;
                        }
                        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
                        if (oversizedFiles.length > 0) {
                          toast({
                            title: "⚠️ Bestand te groot",
                            description: "Elk PDF-bestand mag maximaal 5MB zijn.",
                            variant: "destructive",
                          });
                          return;
                        }
                        setNewOrderPDFs(files);
                      }}
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white file:bg-emerald-500/80 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 focus:bg-white/20"
                    />
                    {newOrderPDFs.length > 0 && (
                      <div className="text-sm text-slate-300 mt-2">
                        <p>{newOrderPDFs.length} bestand(en) geselecteerd:</p>
                        <ul className="list-disc list-inside ml-2">
                          {newOrderPDFs.map((file, index) => (
                            <li key={index} className="truncate">
                              {file.name} ({Math.round(file.size / 1024)} KB)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Notificatie Checkbox */}
                  <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg border border-white/10">
                    <input
                      type="checkbox"
                      id="sendNotification"
                      checked={newOrderForm.sendNotification}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, sendNotification: e.target.checked }))}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <Label htmlFor="sendNotification" className="text-white font-semibold flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      Notificatie verzenden naar klant?
                    </Label>
                  </div>
                  {newOrderForm.sendNotification && (
                    <p className="text-sm text-emerald-300 ml-7">
                      ✅ Klant ontvangt automatisch een e-mail met bonnummer en PDF's als bijlage
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsNewOrderModalOpen(false)}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Annuleren
                </Button>
                <Button
                  onClick={() => createOrderMutation.mutate(newOrderForm)}
                  disabled={
                    createOrderMutation.isPending || 
                    !newOrderForm.customerName || 
                    !newOrderForm.customerEmail ||
                    !newOrderForm.productCategory ||
                    !newOrderForm.productModel ||
                    !newOrderForm.status
                  }
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold"
                >
                  {createOrderMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Aanmaken...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Premium Order Aanmaken
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}