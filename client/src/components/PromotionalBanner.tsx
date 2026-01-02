import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Check, X } from "lucide-react";
import bannerImage from "@assets/buitenscreen-banner.png";

const BANNER_STORAGE_KEY = "kaniou_promo_banner_shown";

const PromotionalBanner = () => {
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check for debug mode via URL parameter
    const params = new URLSearchParams(window.location.search);
    const forceShow = params.get("showBanner") === "true";
    
    const hasSeenBanner = localStorage.getItem(BANNER_STORAGE_KEY);
    
    if (!hasSeenBanner || forceShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    localStorage.setItem(BANNER_STORAGE_KEY, "true");
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleCTA = () => {
    localStorage.setItem(BANNER_STORAGE_KEY, "true");
    setIsVisible(false);
    setLocation("/offerte");
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      data-testid="promotional-banner-overlay"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          data-testid="banner-close-button"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="relative min-h-[400px] md:min-h-[500px] flex items-center">
          <div className="absolute inset-0">
            <img
              src={bannerImage}
              alt="Buitenscreens op maat"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
          </div>

          <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-12">
            <div className="max-w-xl">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Heeft u vragen of twijfels?
              </h2>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4 max-w-lg">
                Laat uw e-mail achter en één van onze specialisten neemt contact met u op.
              </p>

              <p className="text-[#C4A36C] text-base md:text-lg font-medium mb-8">
                Geen verplichtingen, enkel eerlijk advies.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <button
                  onClick={handleCTA}
                  className="group inline-flex items-center justify-center gap-2 bg-[#C4A36C] hover:bg-[#B39356] text-white px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-2xl hover:scale-105"
                  data-testid="banner-cta-contact"
                >
                  <span>Neem contact op</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button
                  onClick={handleClose}
                  className="inline-flex items-center justify-center px-6 py-3 text-white/80 hover:text-white text-xs md:text-sm tracking-wider transition-colors duration-300"
                  data-testid="banner-close-text"
                >
                  Misschien later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
