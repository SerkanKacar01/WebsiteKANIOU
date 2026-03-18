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
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Clock,
  Phone,
  Mail,
  Package,
  Ruler
} from "lucide-react";

export default function EntrepreneurDashboardPage() {
  const [, setLocation] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"quotes" | "messages" | "security">("quotes");
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);
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

  const { data: quoteRequests } = useQuery<any[]>({
    queryKey: ["/api/admin/quote-requests"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  const { data: smartQuoteRequests } = useQuery<any[]>({
    queryKey: ["/api/admin/smart-quote-requests"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  const { data: contactSubmissions } = useQuery<any[]>({
    queryKey: ["/api/admin/contact-submissions"],
    enabled: !!authStatus?.authenticated,
    retry: false,
  });

  const { data: securityAudits, isLoading: isLoadingSecurity } = useQuery<any[]>({
    queryKey: ["/api/admin/security-audits"],
    enabled: !!authStatus?.authenticated && activeTab === "security",
    retry: false,
  });

  const totalQuotes = (enterpriseQuotes?.length || 0) + (quoteRequests?.length || 0) + (smartQuoteRequests?.length || 0);

  const runAuditMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/security-audits/run");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/security-audits"] });
      toast({ title: "Beveiligingscontrole Voltooid", description: "Een nieuwe beveiligingsscan is succesvol uitgevoerd." });
    },
    onError: () => {
      toast({ title: "Scan Mislukt", description: "Er is een probleem opgetreden bij de beveiligingsscan.", variant: "destructive" });
    },
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

  const deleteEnterpriseQuoteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/enterprise-quotes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/enterprise-quotes"] });
      toast({ title: "Verwijderd", description: "De offerteaanvraag is verwijderd." });
    },
    onError: () => {
      toast({ title: "Fout", description: "Verwijderen mislukt.", variant: "destructive" });
    },
  });

  const deleteQuoteRequestMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/quote-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quote-requests"] });
      toast({ title: "Verwijderd", description: "De offerteaanvraag is verwijderd." });
    },
    onError: () => {
      toast({ title: "Fout", description: "Verwijderen mislukt.", variant: "destructive" });
    },
  });

  const deleteSmartQuoteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/smart-quote-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/smart-quote-requests"] });
      toast({ title: "Verwijderd", description: "De offerteaanvraag is verwijderd." });
    },
    onError: () => {
      toast({ title: "Fout", description: "Verwijderen mislukt.", variant: "destructive" });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: number) => {
      await apiRequest("DELETE", `/api/admin/contact-submissions/${messageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({ title: "Bericht Verwijderd", description: "Het bericht is succesvol verwijderd." });
    },
    onError: () => {
      toast({ title: "Verwijder Fout", description: "Er is een probleem opgetreden bij het verwijderen.", variant: "destructive" });
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
        <meta name="description" content="Business dashboard voor KANIOU Zilvernaald." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
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
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-semibold px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
                >
                  {isLoggingOut ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /><span>Uitloggen...</span></>
                  ) : (
                    <><Shield className="w-4 h-4" /><span>Veilig Uitloggen</span></>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="px-6 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">

              {/* Tab Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setActiveTab("quotes")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 border-2 ${
                    activeTab === "quotes"
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105"
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
                    ({totalQuotes} totaal)
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("messages")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 border-2 ${
                    activeTab === "messages"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-105"
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
                    ({contactSubmissions?.length || 0} berichten)
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 border-2 ${
                    activeTab === "security"
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <div className={`p-4 rounded-xl mb-3 ${activeTab === 'security' ? 'bg-white/20' : 'bg-amber-500/10'}`}>
                    <ShieldCheck className={`w-8 h-8 ${activeTab === 'security' ? 'text-white' : 'text-amber-400'}`} />
                  </div>
                  <span className={`text-xl font-bold ${activeTab === 'security' ? 'text-white' : 'text-slate-300'}`}>
                    Beveiliging
                  </span>
                  <span className={`text-sm mt-1 ${activeTab === 'security' ? 'text-white/80' : 'text-slate-500'}`}>
                    Dagelijkse scan
                  </span>
                </button>
              </div>

              {/* QUOTES TAB */}
              {activeTab === "quotes" && (
                <div className="space-y-6">

                  {/* Simple Quote Requests */}
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-800/50 to-indigo-900/50 border-b border-white/10">
                      <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-300" />
                        Offerte Aanvragen (Contactformulier)
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 ml-2">
                          {quoteRequests?.length || 0}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {!quoteRequests || quoteRequests.length === 0 ? (
                        <div className="text-center py-10">
                          <FileText className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                          <p className="text-slate-300">Geen aanvragen ontvangen.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-white/10">
                          {quoteRequests.map((q: any) => {
                            const key = `qr-${q.id}`;
                            return (
                              <div key={q.id} className="hover:bg-white/5 transition-all duration-300">
                                <div
                                  className="p-5 cursor-pointer"
                                  onClick={() => setExpandedQuoteId(expandedQuoteId === key ? null : key)}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                      <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                                        <Users className="w-5 h-5 text-blue-300" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-white font-semibold text-lg">{q.name}</p>
                                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-300">
                                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{q.email}</span>
                                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{q.phone}</span>
                                          <span className="flex items-center gap-1"><Package className="w-3 h-3" />{q.productType}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-1">{formatDate(q.createdAt)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (window.confirm('Weet u zeker dat u deze aanvraag wilt verwijderen?')) {
                                            deleteQuoteRequestMutation.mutate(q.id);
                                          }
                                        }}
                                        disabled={deleteQuoteRequestMutation.isPending}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                      {expandedQuoteId === key ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                    </div>
                                  </div>
                                </div>
                                {expandedQuoteId === key && (
                                  <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                        <h4 className="text-blue-300 font-semibold mb-2">Contactgegevens</h4>
                                        <p className="text-white"><span className="text-slate-400">Naam: </span>{q.name}</p>
                                        <p className="text-white"><span className="text-slate-400">Email: </span>{q.email}</p>
                                        <p className="text-white"><span className="text-slate-400">Telefoon: </span>{q.phone}</p>
                                        <p className="text-white"><span className="text-slate-400">Product: </span>{q.productType}</p>
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                        <h4 className="text-blue-300 font-semibold mb-2">Details</h4>
                                        {q.dimensions && <p className="text-white"><span className="text-slate-400">Afmetingen: </span>{q.dimensions}</p>}
                                        {q.requirements && <p className="text-white"><span className="text-slate-400">Wensen: </span>{q.requirements}</p>}
                                        {!q.dimensions && !q.requirements && <p className="text-slate-400">Geen extra details opgegeven.</p>}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Smart Quote Requests */}
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-800/50 to-violet-900/50 border-b border-white/10">
                      <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                        <Ruler className="w-6 h-6 text-purple-300" />
                        Smart Configurator Aanvragen
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 ml-2">
                          {smartQuoteRequests?.length || 0}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {!smartQuoteRequests || smartQuoteRequests.length === 0 ? (
                        <div className="text-center py-10">
                          <Ruler className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                          <p className="text-slate-300">Geen smart aanvragen ontvangen.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-white/10">
                          {smartQuoteRequests.map((q: any) => {
                            const key = `sq-${q.id}`;
                            return (
                              <div key={q.id} className="hover:bg-white/5 transition-all duration-300">
                                <div
                                  className="p-5 cursor-pointer"
                                  onClick={() => setExpandedQuoteId(expandedQuoteId === key ? null : key)}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                      <div className="bg-purple-500/20 p-2 rounded-lg mt-1">
                                        <Ruler className="w-5 h-5 text-purple-300" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-white font-semibold text-lg">{q.name}</p>
                                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-300">
                                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{q.email}</span>
                                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{q.phone}</span>
                                          <span className="flex items-center gap-1"><Package className="w-3 h-3" />{q.productType}</span>
                                          <span className="text-amber-300 font-semibold">€{q.estimatedPrice?.toFixed(2)}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-1">{formatDate(q.createdAt)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (window.confirm('Weet u zeker dat u deze aanvraag wilt verwijderen?')) {
                                            deleteSmartQuoteMutation.mutate(q.id);
                                          }
                                        }}
                                        disabled={deleteSmartQuoteMutation.isPending}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                      {expandedQuoteId === key ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                    </div>
                                  </div>
                                </div>
                                {expandedQuoteId === key && (
                                  <div className="px-5 pb-5 border-t border-white/10 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                        <h4 className="text-purple-300 font-semibold mb-2">Contactgegevens</h4>
                                        <p className="text-white"><span className="text-slate-400">Naam: </span>{q.name}</p>
                                        <p className="text-white"><span className="text-slate-400">Email: </span>{q.email}</p>
                                        <p className="text-white"><span className="text-slate-400">Telefoon: </span>{q.phone}</p>
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                        <h4 className="text-purple-300 font-semibold mb-2">Product Details</h4>
                                        <p className="text-white"><span className="text-slate-400">Product: </span>{q.productType}</p>
                                        <p className="text-white"><span className="text-slate-400">Ruimte: </span>{q.roomType}</p>
                                        <p className="text-white"><span className="text-slate-400">Materiaal: </span>{q.material}</p>
                                        <p className="text-white"><span className="text-slate-400">Afmeting: </span>{q.width} x {q.height} cm</p>
                                        {q.colorPreference && <p className="text-white"><span className="text-slate-400">Kleur: </span>{q.colorPreference}</p>}
                                        {q.stylePreference && <p className="text-white"><span className="text-slate-400">Stijl: </span>{q.stylePreference}</p>}
                                        <p className="text-white"><span className="text-slate-400">Installatie: </span>{q.installationRequired ? 'Ja' : 'Nee'}</p>
                                        <p className="text-amber-300 font-semibold"><span className="text-slate-400">Geschatte prijs: </span>€{q.estimatedPrice?.toFixed(2)}</p>
                                        {q.additionalNotes && <p className="text-white"><span className="text-slate-400">Notities: </span>{q.additionalNotes}</p>}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Enterprise Quote Requests */}
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-amber-800/50 to-orange-900/50 border-b border-white/10">
                      <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                        <Building className="w-6 h-6 text-amber-300" />
                        Uitgebreide Offerteaanvragen (Formulier)
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 ml-2">
                          {enterpriseQuotes?.length || 0}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {!enterpriseQuotes || enterpriseQuotes.length === 0 ? (
                        <div className="text-center py-10">
                          <Building className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                          <p className="text-slate-300">Geen uitgebreide aanvragen ontvangen.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-white/10">
                          {enterpriseQuotes.map((quote: any) => {
                            const key = `eq-${quote.id}`;
                            return (
                              <div key={quote.id} className="hover:bg-white/5 transition-all duration-300">
                                <div
                                  className="p-5 cursor-pointer"
                                  onClick={() => setExpandedQuoteId(expandedQuoteId === key ? null : key)}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                      <div className="bg-amber-500/20 p-2 rounded-lg mt-1">
                                        <Building className="w-5 h-5 text-amber-300" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                          <span className="font-mono text-amber-300 font-bold text-sm">{quote.submissionId}</span>
                                          <Badge className={`text-xs ${
                                            quote.status === 'nieuw' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                                            quote.status === 'in_behandeling' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                                            'bg-purple-500/20 text-purple-300 border-purple-400/30'
                                          }`}>
                                            {quote.status === 'nieuw' ? 'Nieuw' : quote.status === 'in_behandeling' ? 'In behandeling' : quote.status === 'afgerond' ? 'Afgerond' : quote.status}
                                          </Badge>
                                        </div>
                                        <p className="text-white font-semibold mt-1">{quote.contact?.firstName} {quote.contact?.lastName}</p>
                                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-300">
                                          {quote.contact?.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{quote.contact.email}</span>}
                                          {quote.contact?.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{quote.contact.phone}</span>}
                                          <span>{quote.customerType} • {quote.projectType}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-1">{formatDate(quote.createdAt)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (window.confirm('Weet u zeker dat u deze aanvraag wilt verwijderen?')) {
                                            deleteEnterpriseQuoteMutation.mutate(quote.id);
                                          }
                                        }}
                                        disabled={deleteEnterpriseQuoteMutation.isPending}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                      {expandedQuoteId === key ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                    </div>
                                  </div>
                                </div>
                                {expandedQuoteId === key && (
                                  <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                        <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2"><Users className="w-4 h-4" />Contactgegevens</h4>
                                        <p className="text-white"><span className="text-slate-400">Naam: </span>{quote.contact?.firstName} {quote.contact?.lastName}</p>
                                        <p className="text-white"><span className="text-slate-400">Email: </span>{quote.contact?.email}</p>
                                        <p className="text-white"><span className="text-slate-400">Telefoon: </span>{quote.contact?.phone}</p>
                                        {quote.contact?.street && <p className="text-white"><span className="text-slate-400">Adres: </span>{quote.contact.street}, {quote.contact.postalCode} {quote.contact.city}</p>}
                                        {quote.contact?.companyName && <p className="text-white"><span className="text-slate-400">Bedrijf: </span>{quote.contact.companyName}</p>}
                                        {quote.contact?.vatNumber && <p className="text-white"><span className="text-slate-400">BTW: </span>{quote.contact.vatNumber}</p>}
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                        <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2"><Settings className="w-4 h-4" />Projectdetails</h4>
                                        <p className="text-white"><span className="text-slate-400">Type klant: </span>{quote.customerType}</p>
                                        <p className="text-white"><span className="text-slate-400">Project: </span>{quote.projectType}</p>
                                        <p className="text-white"><span className="text-slate-400">Planning: </span>{quote.planning === 'asap' ? 'Zo snel mogelijk' : quote.planning === '2-4w' ? '2-4 weken' : quote.planning === '1-2m' ? '1-2 maanden' : quote.planning}</p>
                                        <p className="text-white"><span className="text-slate-400">Metingen: </span>{quote.hasMeasurements ? 'Beschikbaar' : 'Nog niet'}</p>
                                        {quote.preferences?.productTypes && <p className="text-white"><span className="text-slate-400">Producten: </span>{quote.preferences.productTypes.join(', ')}</p>}
                                        {quote.preferences?.budget && <p className="text-white"><span className="text-slate-400">Budget: </span>{quote.preferences.budget}</p>}
                                        {quote.preferences?.extraNotes && <p className="text-white"><span className="text-slate-400">Wensen: </span>{quote.preferences.extraNotes}</p>}
                                      </div>
                                    </div>
                                    {quote.rooms && quote.rooms.length > 0 && (
                                      <div>
                                        <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2"><Building className="w-4 h-4" />Ruimtes ({quote.rooms.length})</h4>
                                        <div className="space-y-2">
                                          {quote.rooms.map((room: any, i: number) => (
                                            <div key={i} className="bg-white/5 rounded-lg p-3">
                                              <p className="text-white font-semibold">{room.name}</p>
                                              {room.notes && <p className="text-slate-300 text-sm">{room.notes}</p>}
                                              {room.windows?.length > 0 && (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                                  {room.windows.map((win: any, wi: number) => (
                                                    <div key={wi} className="bg-white/5 rounded p-2 text-xs">
                                                      <p className="text-slate-300">{win.label || `Raam ${wi + 1}`}</p>
                                                      <p className="text-white">{win.widthCm} x {win.heightCm} cm</p>
                                                      {win.productType && <p className="text-amber-300">{win.productType}</p>}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === "messages" && (
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-800/50 to-teal-900/50 border-b border-white/10">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-emerald-300" />
                      Berichten & Contactformulieren
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 ml-2">
                        {contactSubmissions?.length || 0}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {!contactSubmissions || contactSubmissions.length === 0 ? (
                      <div className="text-center py-16">
                        <MessageSquare className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Geen Berichten</h3>
                        <p className="text-slate-300">Er zijn nog geen berichten ontvangen.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {contactSubmissions.map((msg: any) => {
                          const key = `msg-${msg.id}`;
                          return (
                            <div key={msg.id} className="hover:bg-white/5 transition-all duration-300">
                              <div
                                className="p-5 cursor-pointer"
                                onClick={() => setExpandedQuoteId(expandedQuoteId === key ? null : key)}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-4 flex-1">
                                    <div className="bg-emerald-500/20 p-2 rounded-lg mt-1">
                                      <MessageSquare className="w-5 h-5 text-emerald-300" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-white font-semibold text-lg">{msg.name}</p>
                                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-300">
                                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{msg.email}</span>
                                        {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{msg.phone}</span>}
                                        {msg.subject && <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/20 text-xs">{msg.subject}</Badge>}
                                      </div>
                                      <p className="text-slate-400 text-xs mt-1">{formatDate(msg.createdAt)}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('Weet u zeker dat u dit bericht wilt verwijderen?')) {
                                          deleteMessageMutation.mutate(msg.id);
                                        }
                                      }}
                                      disabled={deleteMessageMutation.isPending}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                    {expandedQuoteId === key ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                  </div>
                                </div>
                              </div>
                              {expandedQuoteId === key && (
                                <div className="px-5 pb-5 border-t border-white/10 pt-4">
                                  <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                                    <p className="text-white"><span className="text-slate-400">Naam: </span>{msg.name}</p>
                                    <p className="text-white"><span className="text-slate-400">Email: </span>{msg.email}</p>
                                    {msg.phone && <p className="text-white"><span className="text-slate-400">Telefoon: </span>{msg.phone}</p>}
                                    {msg.subject && <p className="text-white"><span className="text-slate-400">Onderwerp: </span>{msg.subject}</p>}
                                    {msg.message && (
                                      <div>
                                        <p className="text-slate-400 mb-1">Bericht:</p>
                                        <p className="text-white bg-white/5 rounded p-3">{msg.message}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Beveiligingsrapporten</h2>
                    <Button
                      onClick={() => runAuditMutation.mutate()}
                      disabled={runAuditMutation.isPending}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-2"
                    >
                      {runAuditMutation.isPending ? (
                        <><RefreshCw className="w-4 h-4 animate-spin" /><span>Scannen...</span></>
                      ) : (
                        <><RefreshCw className="w-4 h-4" /><span>Nieuwe Scan</span></>
                      )}
                    </Button>
                  </div>
                  {isLoadingSecurity ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white">Beveiligingsdata laden...</p>
                    </div>
                  ) : !securityAudits || securityAudits.length === 0 ? (
                    <div className="text-center py-16">
                      <ShieldCheck className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                      <p className="text-slate-300">Nog geen beveiligingsscans uitgevoerd. Start een nieuwe scan.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {securityAudits.slice(0, 5).map((audit: any) => (
                        <Card key={audit.id} className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {audit.overallStatus === 'VEILIG' ? (
                                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                                ) : audit.overallStatus === 'WAARSCHUWING' ? (
                                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                                ) : (
                                  <XCircle className="w-8 h-8 text-red-400" />
                                )}
                                <div>
                                  <p className="text-white font-bold text-lg">{audit.overallStatus}</p>
                                  <p className="text-slate-400 text-sm">{formatDate(audit.createdAt)}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-bold text-white">{audit.score}%</p>
                                <div className="flex items-center gap-2 text-sm mt-1">
                                  <span className="text-emerald-400">✓{audit.passed}</span>
                                  <span className="text-amber-400">⚠{audit.warnings}</span>
                                  <span className="text-red-400">✗{audit.failed}</span>
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  audit.score >= 90 ? 'bg-emerald-400' :
                                  audit.score >= 70 ? 'bg-amber-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${audit.score}%` }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
