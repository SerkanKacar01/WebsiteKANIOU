import { useLocation } from "wouter";
import { useState } from "react";

const FloatingActionButtons = () => {
  const [, setLocation] = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <div className="hidden md:block">
        <div 
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Sidebar Container */}
          <div 
            className={`bg-gradient-to-b from-[#E67E22] to-[#D5B992] shadow-2xl rounded-l-2xl transition-all duration-300 ease-in-out ${
              isHovered ? 'w-64 pr-4' : 'w-12'
            }`}
          >
            {/* Collapsed State - Icon Only */}
            <div className={`${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 absolute inset-0 flex items-center justify-center`}>
              <div className="text-white text-2xl transform rotate-90 whitespace-nowrap font-medium tracking-wider">
                💬
              </div>
              {/* Vertical Label */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-white text-xs font-medium tracking-wider transform rotate-90 origin-center whitespace-nowrap">
                Contact
              </div>
            </div>

            {/* Expanded State - Full Content */}
            <div className={`${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} transition-all duration-300 ease-in-out p-4 flex flex-col gap-3`}>
              {/* Header */}
              <div className="text-white text-center mb-2">
                <div className="text-lg mb-1">💬</div>
                <div className="text-sm font-medium">Contactmogelijkheden</div>
              </div>

              {/* Button 1: Plan een Afspraak */}
              <button
                onClick={() => setLocation("/afspraak")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 flex items-center gap-3"
              >
                <span className="text-lg">📅</span>
                <span className="text-sm">Plan een Afspraak</span>
              </button>

              {/* Button 2: Vrijblijvende Offerte */}
              <button
                onClick={() => setLocation("/offerte")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 flex items-center gap-3"
              >
                <span className="text-lg">📑</span>
                <span className="text-sm">Vrijblijvende Offerte</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="md:hidden">
        <div className="fixed right-4 bottom-20 z-50">
          <div className="group relative">
            {/* FAB Button */}
            <button 
              className="bg-gradient-to-r from-[#E67E22] to-[#D5B992] text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl"
              onClick={() => {/* Toggle mobile menu logic would go here */}}
            >
              <span className="group-hover:rotate-45 transition-transform duration-300">💬</span>
            </button>

            {/* Mobile Menu (appears on tap) */}
            <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-gradient-to-b from-[#E67E22] to-[#D5B992] rounded-2xl p-3 shadow-2xl w-48 space-y-2">
                <button
                  onClick={() => setLocation("/afspraak")}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <span>📅</span>
                  <span>Plan een Afspraak</span>
                </button>
                <button
                  onClick={() => setLocation("/offerte")}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <span>📑</span>
                  <span>Vrijblijvende Offerte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButtons;