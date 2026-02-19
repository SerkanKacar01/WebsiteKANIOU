import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Building, 
  Crown,
  FileText, 
  Shield, 
  Users, 
  Trash2, 
  Settings,
  CheckCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function EntrepreneurDashboardPage() {
  const [, setLocation] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"quotes" | "messages">("quotes");
  const [expandedQuoteId, setExpandedQuoteId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateStr: string | Date | null | undefined) => {
    if (!dateStr) return "Onbekend";
    try {
      const date = new Date(dateStr);
      const day = date.toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit", 
        year: "numeric"
      });
      const time = date.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit"
      });
      return `${day} om ${time}`;
    } catch {
      return "Onbekend";
    }
  };

  const { data: authStatus, isLoading: isLoadingAuth } = useQuery<{authenticated: boolean, email?: string}>({
    queryKey: ["/api/admin/auth-status"],
    retry: false,
  });

  const { data: enterpriseQuotes } = useQuery<any[]>({
    queryKey: ["/api/admin/enterprise-quotes"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  const { data: contactSubmissions } = useQuery<any[]>({
    queryKey: ["/api/admin/contact-submissions"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

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
        title: "Succesvol Uitgelogd",
        description: "U bent veilig uitgelogd uit het dashboard.",
      });
      setLocation("/kaniouzilvernaald-dashboard");
    },
    onError: () => {
      toast({
        title: "Uitlog Fout",
        description: "Er is een probleem opgetreden bij het uitloggen.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    setIsLoggingOut(true);
    logoutMutation.mutate();
  };

  const deleteQuoteMutation = useMutation({
    mutationFn: async (quoteId: number) => {
      await apiRequest("DELETE", `/api/admin/enterprise-quotes/${quoteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/enterprise-quotes"] });
      toast({
        title: "Offerte Verwijderd",
        description: "De offerteaanvraag is succesvol verwijderd.",
      });
    },
    onError: () => {
      toast({
        title: "Verwijder Fout",
        description: "Er is een probleem opgetreden bij het verwijderen van de offerte.",
        variant: "destructive",
      });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: number) => {
      await apiRequest("DELETE", `/api/admin/contact-submissions/${messageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({
        title: "Bericht Verwijderd",
        description: "Het bericht is succesvol verwijderd.",
      });
    },
    onError: () => {
      toast({
        title: "Verwijder Fout",
        description: "Er is een probleem opgetreden bij het verwijderen van het bericht.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!isLoadingAuth && authStatus && !authStatus.authenticated) {
      setLocation("/kaniouzilvernaald-dashboard");
    }
  }, [authStatus, isLoadingAuth, setLocation]);

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
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Executive Dashboard | KANIOU Zilvernaald</title>
        <meta
          name="description"
          content="Business dashboard voor KANIOU Zilvernaald. Overzicht van offerteaanvragen en berichten."
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/10 via-transparent to-transparent"></div>
        </div>
        
        <div className="fixed inset-0 overflow-hidden">
          <div className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-400/5 to-orange-500/5 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : ''}`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-500/5 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-cyan-500/5 rounded-full filter blur-3xl ${isAnimating ? 'animate-pulse' : ''}`}></div>
        </div>

        <div className="relative z-10">
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
              <div className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setActiveTab("quotes")}
                    className={`group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 border-2 ${
                      activeTab === "quotes"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105 z-10"
                        : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className={`p-4 rounded-xl mb-3 ${activeTab === 'quotes' ? 'bg-white/20' : 'bg-blue-500/10'}`}>
                      <FileText className={`w-8 h-8 ${activeTab === 'quotes' ? 'text-white' : 'text-blue-400'}`} />
                    </div>
                    <span className={`text-xl font-bold ${activeTab === 'quotes' ? 'text-white' : 'text-slate-300'}`}>
                      Offerteaanvragen
                    </span>
                    <span className={`text-sm mt-1 ${activeTab === 'quotes' ? 'text-white/80' : 'text-slate-500'}`}>
                      ({enterpriseQuotes?.length || 0} nieuw)
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 border-2 ${
                      activeTab === "messages"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-105 z-10"
                        : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className={`p-4 rounded-xl mb-3 ${activeTab === 'messages' ? 'bg-white/20' : 'bg-emerald-500/10'}`}>
                      <MessageSquare className={`w-8 h-8 ${activeTab === 'messages' ? 'text-white' : 'text-emerald-400'}`} />
                    </div>
                    <span className={`text-xl font-bold ${activeTab === 'messages' ? 'text-white' : 'text-slate-300'}`}>
                      Berichten
                    </span>
                    <span className={`text-sm mt-1 ${activeTab === 'messages' ? 'text-white/80' : 'text-slate-500'}`}>
                      ({contactSubmissions?.length || 0} vragen)
                    </span>
                  </button>
                </div>
              </div>

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
                                        Ontvangen: {formatDate(quote.createdAt)}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (window.confirm('Weet u zeker dat u deze offerteaanvraag wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
                                            deleteQuoteMutation.mutate(quote.id);
                                          }
                                        }}
                                        disabled={deleteQuoteMutation.isPending}
                                      >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Verwijder
                                      </Button>
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
                                          {quote.contact?.street && <p className="text-white"><span className="text-slate-400">Straat:</span> {quote.contact?.street}</p>}
                                          {quote.contact?.address && <p className="text-white"><span className="text-slate-400">Adres:</span> {quote.contact?.address}</p>}
                                          {quote.contact?.postalCode && <p className="text-white"><span className="text-slate-400">Postcode:</span> {quote.contact?.postalCode}</p>}
                                          {quote.contact?.city && <p className="text-white"><span className="text-slate-400">Stad:</span> {quote.contact?.city}</p>}
                                          {quote.contact?.country && <p className="text-white"><span className="text-slate-400">Land:</span> {quote.contact?.country}</p>}
                                          {quote.contact?.companyName && <p className="text-white"><span className="text-slate-400">Bedrijfsnaam:</span> {quote.contact?.companyName}</p>}
                                          {quote.contact?.vatNumber && <p className="text-white"><span className="text-slate-400">BTW-nummer:</span> {quote.contact?.vatNumber}</p>}
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
                                          {quote.preferences?.lightControl && <p className="text-white"><span className="text-slate-400">Lichtinval:</span> {quote.preferences.lightControl}</p>}
                                          {quote.preferences?.style && <p className="text-white"><span className="text-slate-400">Stijl:</span> {quote.preferences.style}</p>}
                                          {quote.preferences?.colorPref && <p className="text-white"><span className="text-slate-400">Kleurvoorkeur:</span> {quote.preferences.colorPref}</p>}
                                          <p className="text-white"><span className="text-slate-400">Metingen beschikbaar:</span> {quote.hasMeasurements ? 'Ja' : 'Nee'}</p>
                                          {quote.preferences?.extraNotes && <p className="text-white"><span className="text-slate-400">Extra wensen/opmerkingen:</span> {quote.preferences.extraNotes}</p>}
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
                                              {room.notes && <p className="text-slate-300 text-sm mb-2"><span className="text-slate-400">Notities:</span> {room.notes}</p>}
                                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {room.windows?.map((win: any, winIdx: number) => (
                                                  <div key={winIdx} className="bg-white/5 rounded p-2 text-sm">
                                                    <p className="text-slate-300">{win.label || `Raam ${winIdx + 1}`}</p>
                                                    <p className="text-white">{win.widthCm} x {win.heightCm} cm</p>
                                                    {win.productType && <p className="text-amber-300 text-xs">{win.productType}</p>}
                                                    {win.mountType && <p className="text-white text-xs"><span className="text-slate-400">Montagetype:</span> {win.mountType}</p>}
                                                    {win.quantity && <p className="text-white text-xs"><span className="text-slate-400">Aantal:</span> {win.quantity}</p>}
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
                                        <div className="bg-white/5 rounded-lg p-4 text-sm space-y-2">
                                          {quote.services.selected && quote.services.selected.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                              {quote.services.selected.map((service: string, idx: number) => (
                                                <Badge key={idx} className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">{service}</Badge>
                                              ))}
                                            </div>
                                          )}
                                          {quote.services.measurement && <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">Inmeten</Badge>}
                                          {quote.services.installation && <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Installatie</Badge>}
                                          {quote.services.removal && <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Demontage</Badge>}
                                          {quote.services.advice && <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">Advies</Badge>}
                                          {quote.services.contactPref && <p className="text-white"><span className="text-slate-400">Contact voorkeur:</span> {quote.services.contactPref}</p>}
                                          {quote.services.preferredTime && <p className="text-white"><span className="text-slate-400">Voorkeur tijdstip:</span> {quote.services.preferredTime}</p>}
                                          {quote.services.region && <p className="text-white"><span className="text-slate-400">Regio:</span> {quote.services.region}</p>}
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
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-400">
                                      {formatDate(submission.createdAt)}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                      onClick={() => {
                                        if (window.confirm('Weet u zeker dat u dit bericht wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
                                          deleteMessageMutation.mutate(submission.id);
                                        }
                                      }}
                                      disabled={deleteMessageMutation.isPending}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Verwijder
                                    </Button>
                                  </div>
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
      </div>
    </>
  );
}
