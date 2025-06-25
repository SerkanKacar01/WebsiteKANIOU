import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Phone, Truck, Home, Package, Download } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface OrderStatus {
  id: number;
  orderNumber: string;
  currentStatus: string;
  lastUpdate: string;
  productDetails: {
    productType: string;
    color: string;
    dimensions: string;
    quantity: number;
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
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration - replace with real API call
    const mockOrderStatus: OrderStatus = {
      id: parseInt(id || "123456"),
      orderNumber: `#${id || "123456"}`,
      currentStatus: "IN PRODUCTIE",
      lastUpdate: "25/06/2025",
      productDetails: {
        productType: "Rolgordijnen",
        color: "Lichtgrijs",
        dimensions: "120cm x 180cm",
        quantity: 2
      },
      businessNotes: "Uw bestelling wordt op maat gemaakt met hoogwaardige materialen. Verwachte levertijd is 2-3 weken.",
      statuses: [
        {
          id: 1,
          name: "Bestelling in verwerking",
          completed: true,
          active: false,
          date: "20/06/2025",
          icon: Package
        },
        {
          id: 2,
          name: "Bestelling verwerkt",
          completed: true,
          active: false,
          date: "22/06/2025",
          icon: CheckCircle
        },
        {
          id: 3,
          name: "Bestelling in productie",
          completed: true,
          active: true,
          date: "25/06/2025",
          icon: Clock
        },
        {
          id: 4,
          name: "Bestelling is gereed",
          completed: false,
          active: false,
          icon: Package
        },
        {
          id: 5,
          name: "U wordt gebeld voor de levering",
          completed: false,
          active: false,
          icon: Phone
        },
        {
          id: 6,
          name: "Bestelling geleverd",
          completed: false,
          active: false,
          icon: Home
        }
      ]
    };

    setTimeout(() => {
      setOrderStatus(mockOrderStatus);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownloadInvoice = () => {
    // Mock PDF download - replace with real implementation
    const link = document.createElement('a');
    link.href = '#';
    link.download = `bestelbon-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#E6C988] text-white text-center py-4">
          <h1 className="text-xl font-semibold">Uw Bestelstatus</h1>
        </div>
        
        <div className="px-4 py-6">
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
                <span className="text-gray-600">Kleur:</span>
                <span className="text-black font-medium">{orderStatus.productDetails.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Afmetingen:</span>
                <span className="text-black font-medium">{orderStatus.productDetails.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aantal:</span>
                <span className="text-black font-medium">{orderStatus.productDetails.quantity}</span>
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