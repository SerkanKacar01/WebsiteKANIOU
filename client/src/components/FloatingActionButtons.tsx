import { useLocation } from "wouter";

const FloatingActionButtons = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:right-6">
      {/* Button 1: Plan een Afspraak */}
      <div className="group relative">
        <button
          onClick={() => setLocation("/afspraak")}
          className="relative px-4 py-3 bg-gradient-to-r from-[#E67E22] to-[#D5B992] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-2 text-sm md:text-base md:px-6 md:py-3"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-[#D5B992] opacity-75 rounded-lg blur-sm"></div>
          
          {/* Content */}
          <div className="relative flex items-center gap-2 z-10">
            <span>📅</span>
            <span className="hidden md:inline">Plan een Afspraak</span>
            <span className="md:hidden">Afspraak</span>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -left-full group-hover:left-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 transform skew-x-12"></div>
        </button>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span>Persoonlijke afspraak maken</span>
          {/* Arrow */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </div>

      {/* Button 2: Vrijblijvende Offerte */}
      <div className="group relative">
        <button
          onClick={() => setLocation("/offerte")}
          className="relative px-4 py-3 bg-gradient-to-r from-[#E67E22] to-[#D5B992] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-2 text-sm md:text-base md:px-6 md:py-3"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-[#D5B992] opacity-75 rounded-lg blur-sm"></div>
          
          {/* Content */}
          <div className="relative flex items-center gap-2 z-10">
            <span>📑</span>
            <span className="hidden md:inline">Vrijblijvende Offerte</span>
            <span className="md:hidden">Offerte</span>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -left-full group-hover:left-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 transform skew-x-12"></div>
        </button>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span>Vraag vrijblijvend uw offerte aan</span>
          {/* Arrow */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButtons;