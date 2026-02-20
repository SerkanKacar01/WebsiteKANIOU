import { useState, useEffect } from "react";
import { X, MessageSquare, Phone, Mail, ArrowRight, ShieldCheck, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const shown = sessionStorage.getItem("exit_popup_shown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <Card className="relative w-full max-w-4xl bg-[#0f172a] border-[#C4A36C]/40 shadow-[0_0_80px_rgba(196,163,108,0.15)] overflow-hidden rounded-3xl">
        {/* Enterprise Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A36C]/10 rounded-full -translate-y-32 translate-x-32 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full translate-y-40 -translate-x-40 blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 text-white/40 hover:text-[#C4A36C] transition-all z-20 hover:rotate-90 duration-300"
        >
          <X className="w-8 h-8" />
        </button>

        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 min-h-[500px]">
            {/* Left side - Brand Authority */}
            <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-12 flex flex-col justify-center border-r border-[#C4A36C]/20 overflow-hidden">
              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 bg-[#C4A36C]/10 border border-[#C4A36C]/20 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#C4A36C]" />
                  <span className="text-[#C4A36C] text-[10px] font-bold tracking-[0.2em] uppercase">Premium Specialist</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                  Exclusief <br />
                  <span className="bg-gradient-to-r from-[#C4A36C] via-[#E6C988] to-[#C4A36C] bg-clip-text text-transparent">Maatwerk</span>
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-sm">
                  Uw interieur verdient de perfecte afwerking. Laat onze experts u begeleiden naar de ideale oplossing voor uw woning.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <div className="flex text-[#C4A36C] gap-0.5">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <p className="text-white text-xs font-bold uppercase tracking-widest">Top Rated</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Award className="w-4 h-4 text-[#C4A36C]" />
                    <p className="text-white text-xs font-bold uppercase tracking-widest">15+ Jaar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Seamless Interaction */}
            <div className="p-12 flex flex-col justify-center space-y-8 bg-[#0f172a]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="h-[1px] w-8 bg-[#C4A36C]"></span>
                    Persoonlijke Service
                  </h3>
                </div>
                
                <button 
                  onClick={() => {
                    setLocation("/contact");
                    setIsVisible(false);
                  }}
                  className="w-full group flex items-center justify-between p-6 bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#C4A36C]/40 rounded-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-5 text-left">
                    <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                      <Mail className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg tracking-wide group-hover:text-[#C4A36C] transition-colors">Direct Advies</p>
                      <p className="text-gray-400 text-xs">Stel uw vraag aan onze specialisten</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                </button>

                <button 
                  onClick={() => {
                    window.location.href = "tel:+32467856405";
                  }}
                  className="w-full group flex items-center justify-between p-6 bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#C4A36C]/40 rounded-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-5 text-left">
                    <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                      <Phone className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg tracking-wide group-hover:text-[#C4A36C] transition-colors">Telefonisch Contact</p>
                      <p className="text-gray-400 text-xs">+32 467 85 64 05</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                </button>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={() => {
                    setLocation("/offerte");
                    setIsVisible(false);
                  }}
                  className="w-full h-16 bg-gradient-to-r from-[#C4A36C] to-[#D5B992] hover:from-[#D5B992] hover:to-[#C4A36C] text-white rounded-2xl font-black text-xs tracking-[0.25em] uppercase shadow-[0_10px_30px_rgba(196,163,108,0.3)] hover:shadow-[0_15px_40px_rgba(196,163,108,0.4)] transition-all duration-500 transform hover:scale-[1.02]"
                >
                  Vrijblijvende Offerte
                </Button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="w-full text-center mt-6 text-gray-500 hover:text-[#C4A36C] text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Nee bedankt, ik kijk nog even rond
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;

