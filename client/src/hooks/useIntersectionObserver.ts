import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

/**
 * Custom hook for intersection observer with performance optimizations
 * Gates animations to only trigger when elements are in viewport
 */
export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    enabled = true
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, immediately show content
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const element = elementRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        
        if (isVisible && !hasIntersected) {
          setIsIntersecting(true);
          setHasIntersected(true);
          
          // If triggerOnce, disconnect after first intersection
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isVisible);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, enabled, hasIntersected]);

  return {
    elementRef,
    isIntersecting: triggerOnce ? hasIntersected : isIntersecting,
    hasIntersected
  };
};

/**
 * Hook for staggered animations with intersection observer
 */
export const useStaggeredIntersection = (
  delay: number = 100,
  options: IntersectionObserverOptions = {}
) => {
  const { elementRef, isIntersecting } = useIntersectionObserver(options);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  return {
    elementRef,
    shouldAnimate,
    isIntersecting
  };
};

/**
 * Hook for content visibility optimization
 */
export const useContentVisibility = () => {
  const elementRef = useRef<HTMLElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        // Large root margin to detect elements before they enter viewport
        rootMargin: '200px 0px 200px 0px',
        threshold: 0
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    elementRef,
    isNearViewport,
    contentVisibility: isNearViewport ? 'visible' : 'auto'
  };
};