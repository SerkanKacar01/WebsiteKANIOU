import { useState, useEffect } from "react";
import { X, MessageSquare, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user has already seen it in this session
    const shown = sessionStorage.getItem("exit_popup_shown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves the top of the viewport (indicating intent to close tab/navigate away)
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="relative w-full max-w-2xl bg-[#1a1a2e] border-[#C4A36C]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A36C]/10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full translate-y-24 -translate-x-24 blur-3xl"></div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            {/* Left side - Visual/Message */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2C3E50] p-8 flex flex-col justify-center border-r border-[#C4A36C]/10">
              <div className="mb-6 inline-flex p-3 bg-[#C4A36C]/20 rounded-2xl">
                <MessageSquare className="w-8 h-8 text-[#C4A36C]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                Wacht even! <br />
                <span className="text-[#C4A36C]">Heeft u gevonden wat u zocht?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Raamdecoratie is maatwerk en vraagt om specialistische kennis. Onze experts staan voor u klaar om al uw vragen te beantwoorden.
              </p>
            </div>

            {/* Right side - Actions */}
            <div className="p-8 flex flex-col justify-center space-y-6 bg-[#1a1a2e]/50">
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest border-l-2 border-[#C4A36C] pl-3 mb-6">
                  Kies uw voorkeur
                </h3>
                
                <button 
                  onClick={() => {
                    setLocation("/contact");
                    setIsVisible(false);
                  }}
                  className="w-full group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Stel een vraag</p>
                      <p className="text-gray-500 text-xs">Direct antwoord via e-mail</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </button>

                <button 
                  onClick={() => {
                    window.location.href = "tel:+32467856405";
                  }}
                  className="w-full group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Direct bellen</p>
                      <p className="text-gray-500 text-xs">+32 467 85 64 05</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => {
                    setLocation("/offerte");
                    setIsVisible(false);
                  }}
                  className="w-full bg-[#C4A36C] hover:bg-[#b08f56] text-white py-6 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#C4A36C]/10"
                >
                  Vrijblijvende offerte aanvragen
                </Button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="w-full text-center mt-4 text-gray-500 hover:text-white text-xs transition-colors"
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
