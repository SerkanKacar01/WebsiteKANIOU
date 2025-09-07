import React, { useState, useEffect } from 'react';
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
import { Search, Package, Clock, CheckCircle, Truck, Phone, Sparkles, Shield, Crown, Diamond } from 'lucide-react';

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
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Premium entrance animation
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const { data: trackingResult, isLoading, refetch } = useQuery<OrderTrackingResult>({
    queryKey: ['/api/orders/track', bonnummer],
    queryFn: async (): Promise<OrderTrackingResult> => {
      if (!bonnummer.trim()) return { success: false, error: 'Geen bonnummer' };
      
      const response = await fetch(`/api/orders/track/${bonnummer}`);
      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || 'Tracking failed' };
      }
      
      const data = await response.json();
      return {
        success: true,
        order: {
          bonnummer: data.bonnummer,
          status: data.status,
          customerName: data.customerName,
          orderDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('nl-NL') : 'Onbekend',
          statusProgress: {
            received: !!data.statusBestelOntvangen,
            processing: !!data.statusInVerwerking,
            processed: !!data.statusVerwerkt,
            production: !!data.statusInProductie,
            ready: !!data.statusGereed,
            contacted: !!data.statusWordtGebeld,
            delivered: !!data.statusGeleverd
          }
        }
      };
    },
    enabled: false, // Only run when manually triggered
    retry: false,
  });

  const handleSearch = async () => {
    if (!bonnummer.trim()) {
      toast({
        title: "🎯 Bonnummer vereist",
        description: "Voer uw unieke KANIOU bonnummer in voor exclusieve tracking.",
        variant: "destructive",
      });
      return;
    }

    setSearchAttempted(true);
    await refetch();
  };

  const getStatusIcon = (isActive: boolean, isCompleted: boolean, index: number) => {
    const icons = [Package, Clock, CheckCircle, Sparkles, Crown, Diamond, Truck];
    const IconComponent = icons[index] || CheckCircle;
    
    if (isCompleted) return <IconComponent className="w-6 h-6 text-emerald-500 drop-shadow-sm" />;
    if (isActive) return <IconComponent className="w-6 h-6 text-amber-500 animate-pulse drop-shadow-sm" />;
    return <div className="w-6 h-6 rounded-full border-2 border-slate-300/60 backdrop-blur-sm" />;
  };

  const calculateProgress = (statusProgress: any) => {
    const statuses = Object.values(statusProgress);
    const completedCount = statuses.filter(Boolean).length;
    return (completedCount / statuses.length) * 100;
  };

  const getStatusSteps = (statusProgress: any) => [
    { key: 'received', label: 'Exclusieve Bestelling Ontvangen', description: 'Uw premium order is veilig bij ons aangekomen', completed: statusProgress.received },
    { key: 'processing', label: 'Luxe Verwerking Gestart', description: 'Onze specialisten analyseren uw wensen', completed: statusProgress.processing },
    { key: 'processed', label: 'Professioneel Verwerkt', description: 'Alle details zijn zorgvuldig beoordeeld', completed: statusProgress.processed },
    { key: 'production', label: 'Ambachtelijke Productie', description: 'Uw maatwerk wordt met zorg vervaardigd', completed: statusProgress.production },
    { key: 'ready', label: 'Premium Kwaliteitscontrole', description: 'Perfectie gegarandeerd voor levering', completed: statusProgress.ready },
    { key: 'contacted', label: 'Persoonlijk Contact', description: 'We nemen exclusief contact met u op', completed: statusProgress.contacted },
    { key: 'delivered', label: 'Luxe Levering Voltooid', description: 'Uw KANIOU ervaring is compleet', completed: statusProgress.delivered },
  ];

  return (
    <>
      <Helmet>
        <title>✨ Premium Bestelling Tracking | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Exclusieve bestelling tracking voor KANIOU Zilvernaald klanten. Volg uw premium raamdecoratie met onze luxe service."
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra-Premium Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : 'animate-bounce'} duration-[3000ms]`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : 'animate-bounce'} duration-[4000ms] delay-1000`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-500/10 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : 'animate-bounce'} duration-[5000ms] delay-2000`}></div>
        </div>

        <div className="relative z-10 py-12 px-4">
          <Container>
            {/* Ultra-Luxe Header */}
            <div className={`text-center mb-16 transform transition-all duration-1000 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="flex justify-center mb-8 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full filter blur-xl animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-full shadow-2xl">
                    <Crown className="w-16 h-16 text-amber-300 drop-shadow-lg" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="font-display text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent mb-6 tracking-tight">
                  Premium Tracking
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                  Exclusieve toegang tot uw <span className="text-amber-300 font-semibold">KANIOU</span> bestelling
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Shield className="w-4 h-4" />
                  <span>Ultra-beveiligde tracking met premium service</span>
                </div>
              </div>
            </div>

            {/* Premium Search Form */}
            <div className={`max-w-3xl mx-auto mb-12 transform transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/50 via-orange-500/50 to-amber-400/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-30 group-hover:opacity-60"></div>
                
                <Card className="relative bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  
                  <CardHeader className="relative text-center pb-6 pt-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-amber-300" />
                      <CardTitle className="text-2xl font-bold text-white">Exclusieve Toegang</CardTitle>
                      <Sparkles className="w-6 h-6 text-amber-300" />
                    </div>
                    <CardDescription className="text-slate-300 text-lg">
                      Voer uw premium bonnummer in voor volledige tracking
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-8 p-8">
                    <div className="space-y-3">
                      <Label htmlFor="bonnummer" className="text-white font-semibold text-lg flex items-center gap-2">
                        <Diamond className="w-4 h-4 text-amber-300" />
                        Premium Bonnummer
                      </Label>
                      <div className="relative group">
                        <Input
                          id="bonnummer"
                          type="text"
                          placeholder="KAN-25-A7B9M3-XR"
                          value={bonnummer}
                          onChange={(e) => setBonnummer(e.target.value.toUpperCase())}
                          className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-slate-300 text-center font-mono text-xl py-4 rounded-xl focus:bg-white/20 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-300/25 transition-all duration-300 group-hover:bg-white/15"
                          maxLength={20}
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Uw unieke identificatie voor premium service
                      </p>
                    </div>


                    <div className="relative">
                      <Button
                        onClick={handleSearch}
                        disabled={isLoading || !bonnummer.trim()}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        size="lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            <span>Premium Zoeken...</span>
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Search className="w-5 h-5" />
                            <span>Exclusief Zoeken</span>
                            <Diamond className="w-5 h-5" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Premium Results */}
            {searchAttempted && trackingResult && (
              <div className={`max-w-5xl mx-auto transform transition-all duration-1000 delay-500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                {trackingResult.success && trackingResult.order ? (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 via-cyan-500/50 to-emerald-400/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-40"></div>
                    
                    <Card className="relative bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10"></div>
                      
                      <CardHeader className="relative bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-b border-white/20 p-8">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-3xl text-white flex items-center gap-3">
                              <div className="bg-emerald-400/20 p-2 rounded-full">
                                <CheckCircle className="w-8 h-8 text-emerald-300" />
                              </div>
                              Premium Bestelling Gevonden
                            </CardTitle>
                            <CardDescription className="text-slate-200 text-lg font-mono">
                              Bonnummer: <span className="font-bold text-amber-300 bg-black/20 px-3 py-1 rounded-lg">{trackingResult.order.bonnummer}</span>
                            </CardDescription>
                          </div>
                          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold px-6 py-2 text-lg rounded-full shadow-lg">
                            {trackingResult.order.status}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="relative p-10">
                        {/* Luxury Order Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-xl">
                              <Crown className="w-5 h-5 text-amber-300" />
                              VIP Klant
                            </h3>
                            <p className="text-slate-200 text-lg">{trackingResult.order.customerName}</p>
                          </div>
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-xl">
                              <Diamond className="w-5 h-5 text-emerald-300" />
                              Premium Datum
                            </h3>
                            <p className="text-slate-200 text-lg">{trackingResult.order.orderDate}</p>
                          </div>
                        </div>

                        {/* Ultra-Premium Progress */}
                        <div className="mb-12">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white text-2xl flex items-center gap-3">
                              <Sparkles className="w-6 h-6 text-amber-300" />
                              Exclusieve Voortgang
                            </h3>
                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
                              <span className="text-white font-bold text-lg">
                                {Math.round(calculateProgress(trackingResult.order.statusProgress))}% Voltooid
                              </span>
                            </div>
                          </div>
                          <div className="relative">
                            <Progress 
                              value={calculateProgress(trackingResult.order.statusProgress)} 
                              className="h-4 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden shadow-inner"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full pointer-events-none"></div>
                          </div>
                        </div>

                        {/* Luxury Status Timeline */}
                        <div>
                          <h3 className="font-bold text-white mb-8 text-2xl flex items-center gap-3">
                            <Package className="w-6 h-6 text-cyan-300" />
                            Premium Status Timeline
                          </h3>
                          <div className="space-y-6">
                            {getStatusSteps(trackingResult.order.statusProgress).map((step, index) => (
                              <div key={step.key} className={`relative group ${step.completed ? 'opacity-100' : 'opacity-60'} transition-all duration-500 hover:opacity-100`}>
                                <div className="flex items-start space-x-6 p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:scale-[1.01]" 
                                     style={{
                                       background: step.completed ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))' : 'rgba(255, 255, 255, 0.05)',
                                       borderColor: step.completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                                     }}>
                                  
                                  <div className="flex-shrink-0 relative">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                      step.completed 
                                        ? 'bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border-emerald-400/50 shadow-lg shadow-emerald-400/25' 
                                        : 'bg-white/5 border-white/20'
                                    }`}>
                                      {getStatusIcon(false, step.completed, index)}
                                    </div>
                                    {step.completed && (
                                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className={`text-lg font-semibold ${step.completed ? 'text-emerald-200' : 'text-slate-300'}`}>
                                        {step.label}
                                      </h4>
                                      {step.completed && (
                                        <Badge className="bg-emerald-400/20 text-emerald-200 border-emerald-400/30 font-semibold">
                                          ✓ Premium Service
                                        </Badge>
                                      )}
                                    </div>
                                    <p className={`text-sm leading-relaxed ${step.completed ? 'text-slate-200' : 'text-slate-400'}`}>
                                      {step.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ultra-Luxe Contact */}
                        <div className="mt-12 relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                          <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-8 border border-white/20">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                              <Phone className="w-6 h-6 text-purple-300" />
                              VIP Service & Support
                            </h3>
                            <p className="text-slate-200 mb-6 text-lg leading-relaxed">
                              Onze premium klantenservice staat 24/7 voor u klaar met exclusieve ondersteuning:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex items-center gap-3 text-purple-200">
                                <div className="bg-purple-400/20 p-2 rounded-full">
                                  <span className="text-lg">📧</span>
                                </div>
                                <span className="font-semibold">info@kaniou.be</span>
                              </div>
                              <div className="flex items-center gap-3 text-purple-200">
                                <div className="bg-purple-400/20 p-2 rounded-full">
                                  <span className="text-lg">👑</span>
                                </div>
                                <span className="font-semibold">Premium Support Line</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400/50 to-pink-500/50 rounded-2xl blur-lg opacity-30"></div>
                    <Card className="relative bg-white/10 backdrop-blur-2xl border-red-400/30 shadow-2xl rounded-2xl">
                      <CardContent className="p-10 text-center">
                        <div className="text-red-300 mb-6">
                          <Search className="w-20 h-20 mx-auto opacity-60" />
                        </div>
                        <h3 className="text-2xl font-bold text-red-200 mb-4">
                          Premium Toegang Geweigerd
                        </h3>
                        <p className="text-red-300 mb-8 text-lg">
                          {trackingResult.error || 'Het exclusieve bonnummer kon niet worden geautoriseerd.'}
                        </p>
                        <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/20 rounded-xl p-6">
                          <h4 className="font-bold text-red-200 mb-4">Verificatie Checklist:</h4>
                          <ul className="text-red-300 space-y-2 text-left">
                            <li className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Premium bonnummer correct ingevoerd?
                            </li>
                            <li className="flex items-center gap-2">
                              <Diamond className="w-4 h-4" />
                              VIP bevestigingsmail gecontroleerd?
                            </li>
                            <li className="flex items-center gap-2">
                              <Crown className="w-4 h-4" />
                              E-mailadres voor extra verificatie?
                            </li>
                            <li className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Neem contact op met onze premium service
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {/* Ultra-Premium Info Cards */}
            {!searchAttempted && (
              <div className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-700 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/50 to-cyan-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-xl rounded-2xl overflow-hidden h-full">
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <div className="bg-gradient-to-br from-blue-400/20 to-cyan-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Search className="w-10 h-10 text-blue-300" />
                        </div>
                        <h3 className="font-bold text-white mb-4 text-xl">🔍 Intelligent Search</h3>
                        <p className="text-slate-300 leading-relaxed flex-grow">
                          Geavanceerde AI-gestuurde zoektechnologie voor onmiddellijke toegang tot uw premium bestelling
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/50 to-teal-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-xl rounded-2xl overflow-hidden h-full">
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <div className="bg-gradient-to-br from-emerald-400/20 to-teal-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Sparkles className="w-10 h-10 text-emerald-300" />
                        </div>
                        <h3 className="font-bold text-white mb-4 text-xl">⚡ Real-time Intelligence</h3>
                        <p className="text-slate-300 leading-relaxed flex-grow">
                          Live updates met premium notificaties en exclusieve insights in uw KANIOU ervaring
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/50 to-orange-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-xl rounded-2xl overflow-hidden h-full">
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <div className="bg-gradient-to-br from-amber-400/20 to-orange-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Crown className="w-10 h-10 text-amber-300" />
                        </div>
                        <h3 className="font-bold text-white mb-4 text-xl">👑 VIP Experience</h3>
                        <p className="text-slate-300 leading-relaxed flex-grow">
                          Van exclusieve productie tot luxe levering - elke stap wordt met de hoogste zorg uitgevoerd
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default SecureOrderTrackingPage;