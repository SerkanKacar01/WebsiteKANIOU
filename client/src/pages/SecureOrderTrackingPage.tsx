import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Container from '@/components/ui/container';
import { Search, Package, Clock, CheckCircle, Truck, Phone } from 'lucide-react';

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
  const [bonnummer, setBonnummer] = useState('');
  const [email, setEmail] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast();

  const { data: trackingResult, isLoading, refetch } = useQuery<OrderTrackingResult>({
    queryKey: ['/api/orders/track', bonnummer, email],
    enabled: false, // Only run when manually triggered
    retry: false,
  });

  const handleSearch = async () => {
    if (!bonnummer.trim()) {
      toast({
        title: "Bonnummer vereist",
        description: "Voer een geldig bonnummer in.",
        variant: "destructive",
      });
      return;
    }

    setSearchAttempted(true);
    await refetch();
  };

  const getStatusIcon = (isActive: boolean, isCompleted: boolean) => {
    if (isCompleted) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (isActive) return <Clock className="w-5 h-5 text-blue-600" />;
    return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
  };

  const calculateProgress = (statusProgress: any) => {
    const statuses = Object.values(statusProgress);
    const completedCount = statuses.filter(Boolean).length;
    return (completedCount / statuses.length) * 100;
  };

  const getStatusSteps = (statusProgress: any) => [
    { key: 'received', label: 'Bestelling ontvangen', completed: statusProgress.received },
    { key: 'processing', label: 'In verwerking', completed: statusProgress.processing },
    { key: 'processed', label: 'Verwerkt', completed: statusProgress.processed },
    { key: 'production', label: 'In productie', completed: statusProgress.production },
    { key: 'ready', label: 'Gereed', completed: statusProgress.ready },
    { key: 'contacted', label: 'Contact voor levering', completed: statusProgress.contacted },
    { key: 'delivered', label: 'Geleverd', completed: statusProgress.delivered },
  ];

  return (
    <>
      <Helmet>
        <title>🔍 Bestelling Volgen | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Volg uw bestelling bij KANIOU Zilvernaald. Voer uw bonnummer in om de status van uw gordijnen en raamdecoratie te bekijken."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Package className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
              🔍 Bestelling Volgen
            </h1>
            <p className="text-lg text-text-medium max-w-2xl mx-auto">
              Volg de status van uw KANIOU bestelling met uw unieke bonnummer
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">🎯 Bestelling Opzoeken</CardTitle>
                <CardDescription>
                  Voer uw bonnummer in om uw bestelling te volgen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="bonnummer" className="text-sm font-medium">
                    Bonnummer *
                  </Label>
                  <Input
                    id="bonnummer"
                    type="text"
                    placeholder="bijv. KAN-25-A7B9M3-XR"
                    value={bonnummer}
                    onChange={(e) => setBonnummer(e.target.value.toUpperCase())}
                    className="mt-1 text-center font-mono text-lg"
                    maxLength={20}
                  />
                  <p className="text-xs text-text-medium mt-1">
                    Het bonnummer staat op uw bevestigingsmail
                  </p>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    E-mailadres (optioneel)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="uw.email@voorbeeld.be"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-text-medium mt-1">
                    Voor extra verificatie (aanbevolen)
                  </p>
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={isLoading || !bonnummer.trim()}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Zoeken...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Bestelling Zoeken
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {searchAttempted && trackingResult && (
            <div className="max-w-4xl mx-auto">
              {trackingResult.success && trackingResult.order ? (
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-green-50 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-green-800 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Bestelling Gevonden
                        </CardTitle>
                        <CardDescription className="text-green-700 mt-1">
                          Bonnummer: <span className="font-mono font-bold">{trackingResult.order.bonnummer}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-white text-green-700 border-green-300">
                        {trackingResult.order.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {/* Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">👤 Klantgegevens</h3>
                        <p className="text-text-medium">{trackingResult.order.customerName}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">📅 Besteldatum</h3>
                        <p className="text-text-medium">{trackingResult.order.orderDate}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-800">📊 Voortgang</h3>
                        <span className="text-sm font-medium text-primary">
                          {Math.round(calculateProgress(trackingResult.order.statusProgress))}% voltooid
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(trackingResult.order.statusProgress)} 
                        className="h-2"
                      />
                    </div>

                    {/* Status Timeline */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">🚚 Status Timeline</h3>
                      <div className="space-y-4">
                        {getStatusSteps(trackingResult.order.statusProgress).map((step, index) => (
                          <div key={step.key} className="flex items-center space-x-4">
                            {getStatusIcon(false, step.completed)}
                            <div className="flex-1">
                              <p className={`font-medium ${step.completed ? 'text-green-700' : 'text-gray-500'}`}>
                                {step.label}
                              </p>
                            </div>
                            {step.completed && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                ✓ Voltooid
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Vragen over uw bestelling?
                      </h3>
                      <p className="text-blue-700 mb-2">
                        Neem contact met ons op voor meer informatie:
                      </p>
                      <div className="space-y-1">
                        <p className="text-blue-700">📧 info@kaniou.be</p>
                        <p className="text-blue-700">📱 Bel ons tijdens kantooruren</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-lg border-0 border-red-200">
                  <CardContent className="p-8 text-center">
                    <div className="text-red-500 mb-4">
                      <Search className="w-16 h-16 mx-auto opacity-50" />
                    </div>
                    <h3 className="text-xl font-semibold text-red-700 mb-2">
                      Bestelling niet gevonden
                    </h3>
                    <p className="text-red-600 mb-6">
                      {trackingResult.error || 'Het opgegeven bonnummer kon niet worden gevonden.'}
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2">Controleer het volgende:</h4>
                      <ul className="text-sm text-red-700 space-y-1 text-left">
                        <li>• Is het bonnummer correct ingevoerd?</li>
                        <li>• Staat het bonnummer op uw bevestigingsmail?</li>
                        <li>• Probeer het e-mailadres toe te voegen voor verificatie</li>
                        <li>• Neem contact op als het probleem aanhoudt</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Info Section */}
          {!searchAttempted && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">🔍 Eenvoudig Zoeken</h3>
                    <p className="text-text-medium text-sm">
                      Voer uw bonnummer in om direct de status van uw bestelling te zien
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">📊 Real-time Updates</h3>
                    <p className="text-text-medium text-sm">
                      Zie de actuele status en voortgang van uw KANIOU bestelling
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">🚚 Levering Tracking</h3>
                    <p className="text-text-medium text-sm">
                      Van productie tot levering - volg elke stap van het proces
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default SecureOrderTrackingPage;