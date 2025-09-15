import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

/**
 * Advanced page transition system for luxury website
 * Provides smooth transitions between routes with sophisticated effects
 */

export interface PageTransitionConfig {
  duration?: number;
  easing?: string;
  type?: 'fade' | 'slide' | 'slideUp' | 'slideDown' | 'scale' | 'luxury';
  loading?: boolean;
  preloader?: boolean;
  stagger?: number;
}

/**
 * Main page transition hook
 */
export const usePageTransition = (config: PageTransitionConfig = {}) => {
  const {
    duration = 500,
    easing = 'cubic-bezier(0.23, 1, 0.32, 1)',
    type = 'luxury',
    loading = true,
    preloader = true,
    stagger = 100
  } = config;

  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const previousLocation = useRef(location);
  const transitionTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip transitions for accessibility
      return;
    }

    if (location !== previousLocation.current) {
      // Start transition sequence
      setIsTransitioning(true);
      setIsExiting(true);
      
      if (loading) {
        setShowLoader(true);
      }

      // Clear any existing timeout
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }

      // Handle exit transition
      transitionTimeout.current = setTimeout(() => {
        setIsExiting(false);
        setIsEntering(true);
        
        // Complete transition
        setTimeout(() => {
          setIsEntering(false);
          setIsTransitioning(false);
          setShowLoader(false);
          previousLocation.current = location;
        }, duration / 2);
      }, duration / 2);
    }

    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, [location, duration, loading]);

  const getTransitionStyles = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'none'
      };
    }

    let transform = '';
    let opacity = 1;

    if (isExiting) {
      switch (type) {
        case 'fade':
          opacity = 0;
          break;
        case 'slide':
          transform = 'translateX(-100%)';
          break;
        case 'slideUp':
          transform = 'translateY(-100%)';
          break;
        case 'slideDown':
          transform = 'translateY(100%)';
          break;
        case 'scale':
          transform = 'scale(0.95)';
          opacity = 0;
          break;
        case 'luxury':
          transform = 'translateY(30px) scale(0.98)';
          opacity = 0;
          break;
      }
    } else if (isEntering) {
      switch (type) {
        case 'fade':
          opacity = 0;
          break;
        case 'slide':
          transform = 'translateX(100%)';
          break;
        case 'slideUp':
          transform = 'translateY(100%)';
          break;
        case 'slideDown':
          transform = 'translateY(-100%)';
          break;
        case 'scale':
          transform = 'scale(1.05)';
          opacity = 0;
          break;
        case 'luxury':
          transform = 'translateY(-30px) scale(1.02)';
          opacity = 0;
          break;
      }
    }

    return {
      opacity,
      transform,
      transition: `all ${duration}ms ${easing}`,
      willChange: isTransitioning ? 'transform, opacity' : 'auto'
    };
  };

  return {
    isTransitioning,
    isExiting,
    isEntering,
    showLoader,
    transitionStyles: getTransitionStyles()
  };
};

/**
 * Luxury preloader component hook
 */
export const usePagePreloader = (duration: number = 1000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    // Simulate loading progress
    let currentProgress = 0;
    const increment = 100 / (duration / 50); // Update every 50ms

    intervalRef.current = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setTimeout(() => setIsLoading(false), 200);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setProgress(currentProgress);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration]);

  const preloaderStyles = {
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? 'visible' : 'hidden' as 'visible' | 'hidden',
    transition: 'opacity 300ms ease, visibility 300ms ease'
  };

  return {
    isLoading,
    progress,
    preloaderStyles
  };
};

/**
 * Smooth scroll behavior hook
 */
export const useSmoothScroll = () => {
  const scrollToElement = (
    elementId: string, 
    offset: number = 0, 
    duration: number = 800
  ) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Instant scroll for accessibility
      window.scrollTo(0, targetPosition);
      return;
    }

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollToTop = (duration: number = 600) => {
    scrollToElement('root', 0, duration);
  };

  return {
    scrollToElement,
    scrollToTop
  };
};

/**
 * Advanced modal transition hook
 */
export const useModalTransition = (isOpen: boolean, config: PageTransitionConfig = {}) => {
  const {
    duration = 400,
    easing = 'cubic-bezier(0.23, 1, 0.32, 1)',
    type = 'scale'
  } = config;

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(isOpen);
      setIsAnimating(false);
      return;
    }

    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    } else {
      setIsAnimating(true);
      
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, duration]);

  const getModalStyles = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return {
        opacity: isVisible ? 1 : 0,
        transform: 'none',
        transition: 'none'
      };
    }

    let transform = '';
    let opacity = isVisible && !isAnimating ? 1 : 0;

    if (isVisible && isAnimating) {
      switch (type) {
        case 'scale':
          transform = isOpen ? 'scale(0.9)' : 'scale(1.1)';
          break;
        case 'slide':
          transform = isOpen ? 'translateY(20px)' : 'translateY(-20px)';
          break;
        case 'fade':
          opacity = isOpen ? 0 : 1;
          break;
        case 'luxury':
          transform = isOpen ? 'scale(0.95) translateY(20px)' : 'scale(1.05) translateY(-20px)';
          break;
      }
    }

    return {
      opacity,
      transform,
      transition: `all ${duration}ms ${easing}`,
      willChange: isAnimating ? 'transform, opacity' : 'auto'
    };
  };

  const getBackdropStyles = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      opacity: isVisible && !isAnimating ? 1 : 0,
      transition: prefersReducedMotion ? 'none' : `opacity ${duration}ms ease`,
      willChange: isAnimating ? 'opacity' : 'auto'
    };
  };

  return {
    isVisible,
    isAnimating,
    modalStyles: getModalStyles(),
    backdropStyles: getBackdropStyles()
  };
};

/**
 * Advanced route transition wrapper component
 */
export const useRouteTransition = () => {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'entering' | 'exiting' | 'idle'>('idle');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || location === displayLocation) {
      setDisplayLocation(location);
      setTransitionStage('idle');
      return;
    }

    setTransitionStage('exiting');
    
    const timeout = setTimeout(() => {
      setDisplayLocation(location);
      setTransitionStage('entering');
      
      setTimeout(() => {
        setTransitionStage('idle');
      }, 300);
    }, 300);

    return () => clearTimeout(timeout);
  }, [location, displayLocation]);

  const getPageStyles = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'none'
      };
    }

    switch (transitionStage) {
      case 'exiting':
        return {
          opacity: 0,
          transform: 'translateX(-20px)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        };
      case 'entering':
        return {
          opacity: 0,
          transform: 'translateX(20px)',
          transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)'
        };
      default:
        return {
          opacity: 1,
          transform: 'translateX(0)',
          transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)'
        };
    }
  };

  return {
    displayLocation,
    transitionStage,
    pageStyles: getPageStyles()
  };
};