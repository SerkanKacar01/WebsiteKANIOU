import { useLocation } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import bannerImage from "@assets/Scherm­afbeelding_2025-12-09_om_00.33.44_1765404349756.png";

const PromotionalBanner = () => {
  const [, setLocation] = useLocation();

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="relative min-h-[500px] md:min-h-[600px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={bannerImage}
              alt="Buitenscreens op maat"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-16">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#C4A36C] text-white px-4 py-2 text-sm tracking-widest uppercase mb-6">
                <span className="font-semibold">20% Korting</span>
                <span className="text-white/80">|</span>
                <span>Beperkte actie</span>
              </div>

              {/* Title */}
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Buitenscreens op Maat
              </h2>
              
              {/* Subtitle */}
              <p className="text-[#C4A36C] text-lg md:text-xl font-medium mb-6">
                Exclusief voor de eerste 10 klanten.
              </p>

              {/* Description */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Profiteer van maximale warmtewering, strak design en premium kwaliteit.
                Upgrade uw woning met de beste zonwering van dit moment.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-10">
                {[
                  "Perfect voor grote ramen",
                  "Tot 90% warmtewering",
                  "Luxe ZIP-screens beschikbaar",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C4A36C] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setLocation("/offerte")}
                className="group inline-flex items-center gap-3 bg-[#C4A36C] hover:bg-[#B39356] text-white px-8 md:px-10 py-4 md:py-5 text-sm md:text-base tracking-widest uppercase transition-all duration-500 hover:shadow-2xl hover:scale-105"
                data-testid="banner-cta-offerte"
              >
                <span>Vraag vandaag uw vrijblijvende offerte aan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
