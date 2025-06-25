import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Package, Mail, MessageSquare, TrendingUp, Users, Euro } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface DashboardData {
  orders: any[];
  quotes: any[];
  contacts: any[];
  stats: {
    totalOrders: number;
    totalQuotes: number;
    totalContacts: number;
  };
}

export default function EntrepreneurDashboardPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Check authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/status"],
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
      });

      if (response.ok) {
        toast({
          title: "Succesvol uitgelogd",
          description: "U wordt doorgestuurd naar de inlogpagina...",
        });
        
        setTimeout(() => {
          setLocation("/kaniouzilvernaald-dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Fout bij uitloggen",
        description: "Er is een fout opgetreden. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (authLoading || dashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E6C988] mx-auto"></div>
          <p className="mt-2 text-gray-600">Dashboard wordt geladen...</p>
        </div>
      </div>
    );
  }

  if (!authStatus?.authenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Entrepreneur Dashboard</h1>
            <p className="text-gray-600">Welkom terug, {authStatus.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="border-gray-300 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isLoggingOut ? "Bezig..." : "Uitloggen"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Bestellingen</CardTitle>
              <Package className="h-4 w-4 text-[#E6C988]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.stats.totalOrders || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offerte Aanvragen</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#E6C988]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.stats.totalQuotes || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Berichten</CardTitle>
              <Mail className="h-4 w-4 text-[#E6C988]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.stats.totalContacts || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for detailed data */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Recente Bestellingen</TabsTrigger>
            <TabsTrigger value="quotes">Offerte Aanvragen</TabsTrigger>
            <TabsTrigger value="contacts">Contact Berichten</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recente Bestellingen</CardTitle>
                <CardDescription>Overzicht van de laatste bestellingen</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData?.orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Geen bestellingen gevonden</p>
                ) : (
                  <div className="space-y-4">
                    {dashboardData?.orders.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerEmail}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('nl-NL')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">€{order.amount.toFixed(2)}</p>
                          <Badge variant={order.status === 'paid' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Offerte Aanvragen</CardTitle>
                <CardDescription>Overzicht van offerte aanvragen</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData?.quotes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Geen offerte aanvragen gevonden</p>
                ) : (
                  <div className="space-y-4">
                    {dashboardData?.quotes.map((quote: any) => (
                      <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{quote.name}</p>
                          <p className="text-sm text-gray-600">{quote.email}</p>
                          <p className="text-sm text-gray-500">{quote.productType}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(quote.createdAt).toLocaleDateString('nl-NL')}
                          </p>
                        </div>
                        <div>
                          <Badge variant="outline">Nieuw</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Berichten</CardTitle>
                <CardDescription>Overzicht van contact formulier inzendingen</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData?.contacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Geen contact berichten gevonden</p>
                ) : (
                  <div className="space-y-4">
                    {dashboardData?.contacts.map((contact: any) => (
                      <div key={contact.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(contact.createdAt).toLocaleDateString('nl-NL')}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm font-medium mt-1">{contact.subject}</p>
                        <p className="text-sm text-gray-700 mt-2">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}