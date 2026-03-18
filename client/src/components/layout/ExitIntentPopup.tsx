import { useState, useEffect } from "react";
import { X, Mail, ArrowRight, ShieldCheck, Star, Award, Home, Clock, CreditCard, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Noise grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[101] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-[#C4A36C]/40 shadow-[0_0_80px_rgba(196,163,108,0.18)] overflow-hidden rounded-3xl"
        style={{ maxHeight: '95vh', overflowY: 'auto' }}>

        {/* Grid lines background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(196,163,108,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,163,108,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating orb top-right */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(196,163,108,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate(30%, -30%)',
            animation: 'orbFloat1 8s ease-in-out infinite',
          }}
        />
        {/* Floating orb bottom-left */}
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(-30%, 30%)',
            animation: 'orbFloat2 10s ease-in-out infinite',
          }}
        />

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:text-[#C4A36C] hover:border-[#C4A36C]/60 hover:bg-[#C4A36C]/10 hover:rotate-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-2" style={{ minHeight: '520px' }}>

          {/* ── LEFT COLUMN ── */}
          <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-10 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#C4A36C]/20 overflow-hidden">
            <div className="relative z-10 space-y-7">

              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[#C4A36C]/10 border border-[#C4A36C]/20 rounded-full transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '0.2s' }}>
                <ShieldCheck className="w-4 h-4 text-[#C4A36C]" />
                <span className="text-[#C4A36C] text-[10px] font-bold tracking-[0.2em] uppercase">Premium Specialist</span>
              </div>

              {/* Main heading */}
              <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '0.4s' }}>
                <p className="text-[#8896a5] text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-3">
                  Raamdecoratie &amp; Interieur
                </p>
                <h2 className="leading-[1.05] tracking-tight">
                  <span className="block text-white text-[2.8rem] lg:text-[3.2rem]"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                    Exclusief
                  </span>
                  <span className="block text-[3rem] lg:text-[3.6rem] shimmer-gold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300 }}>
                    Maatwerk
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p className={`text-gray-300 text-base leading-relaxed max-w-sm transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '0.6s' }}>
                Uw interieur verdient de perfecte afwerking. Laat onze experts u begeleiden naar de ideale oplossing voor uw woning.
              </p>

              {/* Stats row */}
              <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '0.8s' }}>
                <div className="w-14 h-[1px] bg-[#C4A36C] mb-5" />
                <div className="flex gap-6 flex-wrap">
                  {[
                    { num: '30', suffix: '+', label: 'JAAR ERVARING' },
                    { num: '5.000', suffix: '+', label: 'TEVREDEN KLANTEN' },
                    { num: '100', suffix: '%', label: 'OP MAAT GEMAAKT' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="text-[1.9rem] font-bold leading-none"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#fff' }}>
                        {stat.num}<span className="text-[#C4A36C]">{stat.suffix}</span>
                      </span>
                      <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#8896a5] uppercase mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust / review row */}
              <div className={`pt-4 border-t border-[#C4A36C]/15 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '1.0s' }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#8896a5] uppercase">Beoordeeld</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#C4A36C] fill-[#C4A36C]" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">4.9/5</span>
                  <span className="w-[1px] h-4 bg-white/15" />
                  <span className="text-[#8896a5] text-[0.7rem]">op basis van 200+ reviews</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="p-8 lg:p-10 flex flex-col justify-between bg-[#0f172a]">
            <div className="space-y-5">

              {/* Section label */}
              <h3 className="text-white font-bold text-[0.65rem] uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="h-[1px] w-8 bg-[#C4A36C]" />
                Persoonlijke Service
              </h3>

              {/* Direct Advies */}
              <button
                onClick={() => { setLocation("/contact"); setIsVisible(false); }}
                className="service-card w-full group flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base group-hover:text-[#C4A36C] transition-colors">Direct Advies</p>
                    <p className="text-gray-400 text-xs">Stel uw vraag aan onze specialisten</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#C4A36C] transition-all group-hover:translate-x-1" />
              </button>

              {/* Telefonisch Contact */}
              <button
                onClick={() => { window.location.href = "tel:+32467856405"; }}
                className="service-card w-full group flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-base group-hover:text-[#C4A36C] transition-colors">Telefonisch Contact</p>
                    <p className="text-gray-400 text-xs">+32 467 85 64 05</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#C4A36C] transition-all group-hover:translate-x-1" />
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/32467856405"
                target="_blank"
                rel="noopener noreferrer"
                className="service-card w-full group flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base group-hover:text-[#C4A36C] transition-colors">WhatsApp</p>
                    <p className="text-gray-400 text-xs">Chat direct met ons team</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#C4A36C] transition-all group-hover:translate-x-1" />
              </a>
            </div>

            {/* CTA + dismiss */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => { setLocation("/offerte"); setIsVisible(false); }}
                className="shine-btn w-full h-14 bg-gradient-to-r from-[#C4A36C] to-[#D5B992] text-[#0f172a] rounded-2xl font-black text-[0.7rem] tracking-[0.22em] uppercase shadow-[0_8px_24px_rgba(196,163,108,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(196,163,108,0.45)] overflow-hidden relative"
              >
                <span className="relative z-10">Vrijblijvende Offerte</span>
              </button>

              <button
                onClick={() => setIsVisible(false)}
                className="w-full text-center text-gray-500 hover:text-[#C4A36C] text-[0.65rem] font-bold uppercase tracking-widest transition-colors py-1"
              >
                Nee bedankt, ik kijk nog even rond
              </button>

              {/* Guarantee badge */}
              <div className="flex items-center gap-2 justify-center px-3 py-2 rounded-xl border border-green-500/20 bg-green-500/5 mt-1">
                <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-[0.65rem] font-medium">
                  Gratis inmeting&nbsp;•&nbsp;Vrijblijvend advies&nbsp;•&nbsp;Garantie op montage
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`relative border-t border-[#C4A36C]/20 bg-[#0a0f1e]/80 backdrop-blur-sm px-6 py-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1.2s' }}>
          <div className="flex flex-wrap items-center justify-around gap-4 text-center">
            {[
              { icon: <Home className="w-4 h-4" />, text: "Aan-huis service in heel België" },
              { icon: <Clock className="w-4 h-4" />, text: "Levering binnen 2–3 weken" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "5 jaar garantie" },
              { icon: <CreditCard className="w-4 h-4" />, text: "Betaling in termijnen mogelijk" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                {i > 0 && <span className="hidden sm:block w-[1px] h-4 bg-white/10 mr-2" />}
                <span className="text-[#C4A36C]">{item.icon}</span>
                <span className="text-[0.72rem] font-medium whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(30%, -30%) scale(1); }
          50% { transform: translate(28%, -33%) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(-30%, 30%) scale(1); }
          50% { transform: translate(-27%, 33%) scale(1.06); }
        }
        @keyframes shimmerGold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-gold {
          background: linear-gradient(90deg,
            #C4A36C 0%,
            #E6C988 25%,
            #fff8e7 45%,
            #E6C988 55%,
            #C4A36C 80%,
            #C4A36C 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGold 6s linear infinite;
        }
        @keyframes shineBtn {
          0% { left: -100%; }
          60%, 100% { left: 150%; }
        }
        .shine-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          animation: shineBtn 3s ease-in-out infinite;
        }
        .service-card:hover {
          transform: translateX(4px);
          border-color: rgba(196, 163, 108, 0.4);
          background: rgba(255,255,255,0.07);
        }
      `}</style>
    </div>
  );
};

export default ExitIntentPopup;
