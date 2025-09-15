import React, { useEffect, useState, useRef } from 'react';

interface ScrollIndicatorProps {
  className?: string;
  showPercentage?: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  className = '',
  showPercentage = false 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate total scrollable distance
      const totalScrollableDistance = documentHeight - windowHeight;
      
      if (totalScrollableDistance <= 0) {
        setScrollProgress(0);
        setIsVisible(false);
        return;
      }

      // Calculate progress as percentage
      const progress = (scrollTop / totalScrollableDistance) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      
      // Show indicator when user has scrolled at least 50px
      setIsVisible(scrollTop > 50);
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(calculateScrollProgress);
    };

    // Initial calculation
    calculateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScrollProgress);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Don't render if not visible or user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!isVisible || prefersReducedMotion) {
    return null;
  }

  return (
    <>
      {/* Main scroll indicator bar */}
      <div 
        className={`scroll-indicator ${className}`}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        data-testid="scroll-indicator"
      >
        <div 
          className="scroll-indicator-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Optional percentage display */}
      {showPercentage && (
        <div 
          className="fixed top-4 right-4 z-[1001] glass-luxury-medium rounded-lg px-3 py-2"
          data-testid="scroll-percentage"
        >
          <span className="text-sm font-medium text-[#D5B36A]">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}
    </>
  );
};

export default ScrollIndicator;