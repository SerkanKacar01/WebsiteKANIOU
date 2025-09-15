import React, { useState, useRef, useEffect } from 'react';

interface LuxuryTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const LuxuryTooltip: React.FC<LuxuryTooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const elementRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      if (!prefersReducedMotion) {
        setTimeout(() => setIsVisible(true), 50);
      } else {
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsVisible(false);
    setTimeout(() => setShouldShow(false), prefersReducedMotion ? 0 : 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionClasses = () => {
    const positions = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };
    return positions[position];
  };

  const getArrowClasses = () => {
    const arrows = {
      top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[rgba(26,26,26,0.95)]',
      bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[rgba(26,26,26,0.95)]',
      left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[rgba(26,26,26,0.95)]',
      right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[rgba(26,26,26,0.95)]'
    };
    return arrows[position];
  };

  return (
    <div 
      ref={elementRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      data-testid="luxury-tooltip-wrapper"
    >
      {children}
      
      {shouldShow && (
        <div
          className={`
            absolute z-[1000] px-3 py-2 text-sm font-medium text-white
            bg-[rgba(26,26,26,0.95)] backdrop-blur-md rounded-lg
            border border-[rgba(213,179,106,0.2)]
            shadow-[0_10px_30px_rgba(0,0,0,0.2),0_0_20px_rgba(213,179,106,0.1)]
            transition-all duration-200 whitespace-nowrap
            ${getPositionClasses()}
            ${isVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-1'
            }
          `}
          role="tooltip"
          aria-hidden={!isVisible}
          data-testid="luxury-tooltip"
        >
          {/* Luxury gradient border */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D5B36A]/20 via-[#E0C188]/20 to-[#D5B36A]/20 -z-10" />
          
          {/* Content */}
          <span className="relative z-10">{content}</span>
          
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default LuxuryTooltip;