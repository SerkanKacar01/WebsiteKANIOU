import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Custom Tooltip Component for Track Order button
const CustomTooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowTooltip(false);
    }
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setShowTooltip(true);
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setTimeout(() => setShowTooltip(false), 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipClasses = `
    absolute z-[9999] bg-[#f9f3e6] text-[#333] text-xs px-2.5 py-1.5 rounded-md
    transition-opacity duration-200 ease-in-out whitespace-nowrap max-w-[180px] text-center
    shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
    ${isMobile ? 
      'bottom-full mb-2 left-1/2 -translate-x-1/2' : 
      'right-full mr-2 top-1/2 -translate-y-1/2'
    }
  `;

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="inline-block"
      >
        {children}
      </div>
      <div className={tooltipClasses} style={{ fontSize: '13px' }}>
        {text}
      </div>
    </div>
  );
};

const FloatingTrackOrderButton = () => {
  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-[9999]">
      <CustomTooltip text="Volg uw bestelling">
        <Link href="/track-order">
          <Button
            className="bg-[#D0B378] hover:bg-[#C5A565] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium"
            size="lg"
          >
            <Search className="h-4 w-4" />
            VOLG UW BESTELLING
          </Button>
        </Link>
      </CustomTooltip>
    </div>
  );
};

export default FloatingTrackOrderButton;
