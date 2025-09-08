import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Container from "@/components/ui/container";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
  Calendar,
  User,
} from "lucide-react";

interface OrderTrackingResult {
  success: boolean;
  order?: {
    bonnummer: string;
    status: string;
    customerName: string;
    orderDate: string;
    statusProgress: {
      received: boolean;
      processing: boolean;
      processed: boolean;
      production: boolean;
      ready: boolean;
      contacted: boolean;
      delivered: boolean;
    };
  };
  message?: string;
  error?: string;
}

const SecureOrderTrackingPage = () => {
  const [bonnummer, setBonnummer] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast();

  const {
    data: trackingResult,
    isLoading,
    refetch,
  } = useQuery<OrderTrackingResult>({
    queryKey: ["/api/orders/track", bonnummer],
    queryFn: async (): Promise<OrderTrackingResult> => {
      if (!bonnummer.trim()) return { success: false, error: "Geen bonnummer" };

      const response = await fetch(`/api/orders/track/${bonnummer}`);
      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Tracking failed" };
      }

      const data = await response.json();
      return {
        success: true,
        order: {
          bonnummer: data.bonnummer,
          status: data.status,
          customerName: data.customerName,
          orderDate: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("nl-NL")
            : "Onbekend",
          statusProgress: {
            received: !!data.statusBestelOntvangen,
            processing: !!data.statusInVerwerking,
            processed: !!data.statusVerwerkt,
            production: !!data.statusInProductie,
            ready: !!data.statusGereed,
            contacted: !!data.statusWordtGebeld,
            delivered: !!data.statusGeleverd,
          },
        },
      };
    },
    enabled: false,
    retry: false,
  });

  const handleSearch = async () => {
    if (!bonnummer.trim()) {
      toast({
        title: "Bonnummer vereist",
        description: "Voer uw KANIOU bonnummer in om uw bestelling te volgen.",
        variant: "destructive",
      });
      return;
    }

    setSearchAttempted(true);
    await refetch();
  };

  const getStatusIcon = (
    isActive: boolean,
    isCompleted: boolean,
    index: number,
  ) => {
    const icons = [
      Package,
      Clock,
      CheckCircle,
      Package,
      CheckCircle,
      Truck,
      CheckCircle,
      Clock,
    ];
    const IconComponent = icons[index] || CheckCircle;

    if (isCompleted)
      return <IconComponent className="w-5 h-5 text-[#D5B36A]" />;
    if (isActive)
      return <IconComponent className="w-5 h-5 text-[#D5B36A] animate-pulse" />;
    return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
  };

  const calculateProgress = (statusProgress: any) => {
    const statuses = Object.values(statusProgress);
    const completedCount = statuses.filter(Boolean).length;
    return (completedCount / statuses.length) * 100;
  };

  const getStatusSteps = (statusProgress: any) => [
    {
      key: "received",
      label: "Ontvangen",
      description: "Je bestelling is succesvol ontvangen.",
      completed: statusProgress.received,
    },
    {
      key: "processing",
      label: "In Behandeling",
      description: "We zijn je bestelling aan het controleren.",
      completed: statusProgress.processing,
    },
    {
      key: "processed",
      label: "Goedgekeurd & Bevestigd",
      description: "Alles is bevestigd en gaat naar productie.",
      completed: statusProgress.processed,
    },
    {
      key: "production",
      label: "In Productie",
      description: "Je bestelling is in productie.",
      completed: statusProgress.production,
    },
    {
      key: "delayed",
      label: "Vertraagd",
      description: "Er is een kleine vertraging, we houden je op de hoogte.",
      completed: false,
    },
    {
      key: "quality",
      label: "Kwaliteitscontrole",
      description: "We controleren of alles in perfecte staat is.",
      completed: statusProgress.ready,
    },
    {
      key: "ready",
      label: "Klaar voor Levering",
      description: "De bestelling is verpakt en klaar om te leveren.",
      completed: statusProgress.contacted,
    },
    {
      key: "delivered",
      label: "Geleverd",
      description: "Je bestelling is bezorgd of opgehaald.",
      completed: statusProgress.delivered,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bestelling Volgen | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Volg eenvoudig uw bestelling bij KANIOU Zilvernaald. Elke klant is uniek en verdient persoonlijke service."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Clean Header Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
          <Container>
            <div className="py-16 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D5B36A] to-[#C4A55A] rounded-full shadow-lg mb-6">
                  <Search className="w-10 h-10 text-white" />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Volg Uw Bestelling
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Elke klant is uniek. Volg hier eenvoudig de voortgang van uw
                KANIOU bestelling.
              </p>
            </div>
          </Container>
        </div>

        <Container>
          <div className="py-12">
            {/* Search Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-2">
                    <MapPin className="w-6 h-6 text-[#D5B36A]" />
                    Bonnummer Invoeren
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Voer uw bonnummer in om de status te bekijken
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="bonnummer"
                      className="text-gray-900 font-medium text-lg"
                    >
                      KANIOU Bonnummer
                    </Label>
                    <Input
                      id="bonnummer"
                      type="text"
                      placeholder="KAN-25-A7B9M3-XR"
                      value={bonnummer}
                      onChange={(e) =>
                        setBonnummer(e.target.value.toUpperCase())
                      }
                      className="text-center font-mono text-lg py-3 border-gray-300 focus:border-[#D5B36A] focus:ring-[#D5B36A]"
                      maxLength={20}
                    />
                    <p className="text-gray-500 text-sm text-center">
                      Uw unieke identificatie voor bestelling tracking
                    </p>
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={isLoading || !bonnummer.trim()}
                    className="w-full bg-gradient-to-r from-[#D5B36A] to-[#C4A55A] hover:from-[#C4A55A] hover:to-[#B8941F] text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Zoeken...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Search className="w-5 h-5" />
                        <span>Bestelling Zoeken</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {searchAttempted && trackingResult && (
              <div className="max-w-4xl mx-auto">
                {trackingResult.success && trackingResult.order ? (
                  <Card className="border-gray-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#D5B36A] to-[#C4A55A] text-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl flex items-center gap-3">
                            <CheckCircle className="w-7 h-7" />
                            Bestelling Gevonden
                          </CardTitle>
                          <CardDescription className="text-white/90 text-lg font-mono">
                            Bonnummer: {trackingResult.order.bonnummer}
                          </CardDescription>
                        </div>
                        <Badge className="bg-white text-[#D5B36A] font-bold px-4 py-2 text-lg">
                          {trackingResult.order.status}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8">
                      {/* Order Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <User className="w-5 h-5 text-[#D5B36A]" />
                            Klant
                          </h3>
                          <p className="text-gray-700 text-lg">
                            {trackingResult.order.customerName}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#D5B36A]" />
                            Besteldatum
                          </h3>
                          <p className="text-gray-700 text-lg">
                            {trackingResult.order.orderDate}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-900 text-xl">
                            Voortgang
                          </h3>
                          <div className="bg-[#D5B36A] text-white rounded-full px-4 py-2">
                            <span className="font-medium">
                              {Math.round(
                                calculateProgress(
                                  trackingResult.order.statusProgress,
                                ),
                              )}
                              % Voltooid
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={calculateProgress(
                            trackingResult.order.statusProgress,
                          )}
                          className="h-3 bg-gray-200"
                        />
                      </div>

                      {/* Status Timeline */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-6 text-xl flex items-center gap-2">
                          <Package className="w-6 h-6 text-[#D5B36A]" />
                          Status Overzicht
                        </h3>
                        <div className="space-y-4">
                          {getStatusSteps(
                            trackingResult.order.statusProgress,
                          ).map((step, index) => (
                            <div
                              key={step.key}
                              className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-200 ${
                                step.completed
                                  ? "bg-green-50 border-green-200"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                  step.completed
                                    ? "bg-[#D5B36A] border-[#D5B36A]"
                                    : "bg-white border-gray-300"
                                }`}
                              >
                                {getStatusIcon(false, step.completed, index)}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4
                                    className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-600"}`}
                                  >
                                    {step.label}
                                  </h4>
                                  {step.completed && (
                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                      ✓ Voltooid
                                    </Badge>
                                  )}
                                </div>
                                <p
                                  className={`text-sm ${step.completed ? "text-gray-700" : "text-gray-500"}`}
                                >
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-[#D5B36A]" />
                          Contact & Ondersteuning
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Heeft u vragen over uw bestelling? Ons team staat voor
                          u klaar.
                        </p>
                        <div className="flex items-center gap-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <span>📧</span>
                            <span className="font-medium">info@kaniou.be</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📞</span>
                            <span className="font-medium">
                              Persoonlijke Service
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-red-200 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <div className="text-red-400 mb-6">
                        <Search className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Bestelling Niet Gevonden
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {trackingResult.error ||
                          "Het bonnummer kon niet worden gevonden."}
                      </p>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-left">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Tips:
                        </h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                          <li>
                            • Controleer of het bonnummer correct is ingevoerd
                          </li>
                          <li>
                            • Bonnummers bestaan uit letters en cijfers (bijv.
                            KAN-25-A7B9M3-XR)
                          </li>
                          <li>
                            • Neem contact op als het probleem blijft bestaan
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Information Card */}
            {!searchAttempted && (
              <div className="max-w-3xl mx-auto mt-12">
                <Card className="border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Waarom KANIOU Bestelling Tracking?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-[#D5B36A] rounded-full flex items-center justify-center mx-auto">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">
                          Persoonlijke Service
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Elke klant krijgt individuele aandacht
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-[#D5B36A] rounded-full flex items-center justify-center mx-auto">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">
                          Real-time Updates
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Altijd op de hoogte van de status
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-[#D5B36A] rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">
                          Transparantie
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Duidelijke communicatie en voortgang
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default SecureOrderTrackingPage;
