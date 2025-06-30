import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Clock,
  Phone,
  Truck,
  Home,
  Package,
  Download,
  Mail,
  MessageCircle,
  Loader2,
} from "lucide-react";
// Date formatting removed to fix compilation issues
import { useToast } from "@/hooks/use-toast";
import type { PaymentOrder } from "@shared/schema";

// Individual status steps - each can be independently activated
const statusSteps = [
  { key: "bestelling_ontvangen", label: "Bestelling ontvangen", icon: Package },
  { key: "bestelling_in_verwerking", label: "Bestelling in verwerking", icon: Clock },
  { key: "bestelling_verwerkt", label: "Bestelling verwerkt", icon: CheckCircle },
  { key: "bestelling_in_productie", label: "Bestelling in productie", icon: Truck },
  { key: "bestelling_gereed", label: "Bestelling is gereed", icon: CheckCircle },
  { key: "wordt_gebeld_voor_levering", label: "U wordt gebeld voor levering", icon: Phone },
  { key: "bestelling_geleverd", label: "Bestelling geleverd", icon: Home },
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

// Helper functions for individual status management
const getStatusValue = (order: PaymentOrder | null, statusKey: string): boolean => {
  if (!order) return false;
  const statusMap: {[key: string]: keyof PaymentOrder} = {
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

const getStatusDate = (order: PaymentOrder | null, statusKey: string): Date | null => {
  if (!order) return null;
  const statusMap: {[key: string]: keyof PaymentOrder} = {
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

// Removed duplicate formatDate function

const BestellingStatusPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Notification preferences state
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [preferencesLoading, setPreferencesLoading] = useState(false);

  // Smart order lookup - try by ID first, then by bonnummer
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<PaymentOrder>({
    queryKey: ["/api/orders", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      
      // First try to parse as numeric ID and fetch by internal ID
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        try {
          const response = await fetch(`/api/orders/${numericId}`);
          if (response.ok) {
            return await response.json();
          }
          // If ID lookup fails, fall through to bonnummer lookup
        } catch (error) {
          console.log("ID lookup failed, trying bonnummer lookup");
        }
      }
      
      // Try to fetch by bonnummer (custom reference number)
      const response = await fetch(`/api/orders/track/bonnummer/${id}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      return await response.json();
    },
    enabled: !!id,
    retry: false,
  });

  // Helper function to format date
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

  // Helper function to determine current status step
  const getCurrentStatusStep = (status: string) => {
    const currentStep = statusSteps.findIndex(
      (step) => step.key === status || step.label === status,
    );
    return currentStep >= 0 ? currentStep : 0;
  };

  // Helper function to extract product details
  const getProductDetails = (
    productDetailsStr: string | null,
    description: string,
  ) => {
    let productType = "Raambekledingsproduct";

    try {
      if (productDetailsStr) {
        const details = JSON.parse(productDetailsStr);
        productType =
          details.productType || details.product || "Raambekledingsproduct";
      }
    } catch {
      // Use description as fallback
      productType = description || "Raambekledingsproduct";
    }

    return {
      productType,
      color: "Volgens specificatie",
      dimensions: "Op maat",
      quantity: 1,
    };
  };

  // Convert order data to display format
  const orderStatus: OrderStatus | null = order
    ? {
        id: order.id,
        orderNumber: order.bonnummer || order.orderNumber || `#${order.id}`,
        bonnummer: order.bonnummer,
        currentStatus: order.status || "Nieuw",
        lastUpdate: formatDate(order.updatedAt || order.createdAt),
        productDetails: getProductDetails(
          typeof order.productDetails === "string"
            ? order.productDetails
            : null,
          order.description || "",
        ),
        businessNotes:
          order.clientNote || order.noteFromEntrepreneur || undefined,
        statuses: statusSteps.map((step, index) => {
          // Map status keys to order field values
          const statusDateMap: {[key: string]: Date | null} = {
            'bestelling_ontvangen': order.statusBestelOntvangen,
            'bestelling_in_verwerking': order.statusInVerwerking,
            'bestelling_verwerkt': order.statusVerwerkt,
            'bestelling_in_productie': order.statusInProductie,
            'bestelling_gereed': order.statusGereed,
            'wordt_gebeld_voor_levering': order.statusWordtGebeld,
            'bestelling_geleverd': order.statusGeleverd
          };
          
          const statusDate = statusDateMap[step.key];
          const isCompleted = statusDate !== null && statusDate !== undefined;
          
          return {
            id: index + 1,
            name: step.label,
            completed: isCompleted,
            active: false, // No active state - each status is independent
            date: isCompleted ? formatDate(statusDate) : undefined,
            icon: step.icon,
          };
        }),
      }
    : null;

  const handleDownloadInvoice = () => {
    if (order && order.pdfFileName && order.id) {
      // Open PDF in new tab or download based on browser settings
      const pdfUrl = `/api/orders/${order.id}/download-pdf`;
      window.open(pdfUrl, "_blank");
    }
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
      const response = await fetch(
        `/api/orders/${id}/notification-preferences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notifyByEmail,
            notificationEmail: notifyByEmail ? notificationEmail : null,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save preferences");
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
                <h3 className="text-lg font-semibold text-gray-900">
                  Bestelling niet gevonden
                </h3>
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
                <span className="text-black font-mono">
                  {orderStatus.orderNumber}
                </span>
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
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      status.completed
                        ? "bg-green-100 text-green-600"
                        : status.active
                          ? "bg-[#E6C988] text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {status.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <status.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-sm font-medium ${
                          status.completed || status.active
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {status.name}
                      </p>
                      {status.date && (
                        <span className="text-xs text-gray-500">
                          {status.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PDF Documents Section - Product details available in uploaded PDF */}
        {order?.pdfFileName && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-[#E6C988]" />
                Bestelgegevens
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    Alle product- en prijsinformatie is beschikbaar in het geüploade document.
                  </p>
                  <Button
                    onClick={() => window.open(`/api/orders/pdf/${order.pdfFileName}`, '_blank')}
                    className="w-full bg-[#E6C988] hover:bg-[#D5B992] text-black font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Besteldocument
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Notes */}
        {orderStatus.businessNotes && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-black mb-3">
                Opmerkingen van de ondernemer
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {orderStatus.businessNotes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* PDF Download */}
        {order.pdfFileName && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-black mb-3">Documenten</h3>
              <Button
                onClick={handleDownloadInvoice}
                className="w-full bg-[#E6C988] hover:bg-[#D4B876] text-white rounded-lg py-2 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download bestelbon</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Email Notification Preferences */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-black mb-3 flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>E-mail notificaties</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={notifyByEmail}
                  onChange={(e) => setNotifyByEmail(e.target.checked)}
                  className="rounded border-gray-300 text-[#E6C988] focus:ring-[#E6C988]"
                />
                <Label
                  htmlFor="email-notifications"
                  className="text-sm text-gray-700"
                >
                  Ik wil e-mail notificaties ontvangen over deze bestelling
                </Label>
              </div>

              {notifyByEmail && (
                <div className="space-y-2">
                  <Label
                    htmlFor="notification-email"
                    className="text-sm font-medium text-gray-700"
                  >
                    E-mailadres voor notificaties
                  </Label>
                  <Input
                    id="notification-email"
                    type="email"
                    placeholder="uw-email@voorbeeld.be"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                  />
                </div>
              )}

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
            <h3 className="font-semibold text-black mb-3">
              Vragen over uw bestelling?
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>E-mail:</strong> info@kaniou.be
              </p>
              <p>
                <strong>Telefoon:</strong> +32 467 85 64 05
              </p>
              <p>
                <strong>Bestelnummer:</strong>{" "}
                <span className="font-mono">{orderStatus.orderNumber}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BestellingStatusPage;
