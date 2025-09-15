import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Advanced scroll animation system for luxury website interactions
 * Provides comprehensive scroll-triggered animations with performance optimizations
 */

export interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  stagger?: number;
  delay?: number;
  duration?: number;
  easing?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'custom';
  customTransform?: {
    from: string;
    to: string;
  };
  opacity?: {
    from?: number;
    to?: number;
  };
}

/**
 * Advanced scroll animations hook with luxury effects
 */
export const useAdvancedScrollAnimation = (config: ScrollAnimationConfig = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    stagger = 0,
    delay = 0,
    duration = 800,
    easing = 'cubic-bezier(0.23, 1, 0.32, 1)',
    animationType = 'fadeUp',
    customTransform,
    opacity = { from: 0, to: 1 }
  } = config;

  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    if (prefersReducedMotion.current) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion.current) return;

    const element = elementRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay + stagger);
          
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay, stagger, hasAnimated]);

  const getAnimationTransform = () => {
    if (customTransform) {
      return isVisible ? customTransform.to : customTransform.from;
    }

    switch (animationType) {
      case 'fadeUp':
        return isVisible ? 'translateY(0)' : 'translateY(40px)';
      case 'fadeIn':
        return 'none';
      case 'slideLeft':
        return isVisible ? 'translateX(0)' : 'translateX(-40px)';
      case 'slideRight':
        return isVisible ? 'translateX(0)' : 'translateX(40px)';
      case 'scale':
        return isVisible ? 'scale(1)' : 'scale(0.9)';
      case 'rotate':
        return isVisible ? 'rotate(0deg)' : 'rotate(-5deg)';
      default:
        return isVisible ? 'translateY(0)' : 'translateY(40px)';
    }
  };

  const getAnimationStyle = () => {
    if (prefersReducedMotion.current) {
      return {
        opacity: opacity.to,
        transform: 'none',
        transition: 'none'
      };
    }

    return {
      opacity: isVisible ? opacity.to : opacity.from,
      transform: getAnimationTransform(),
      transition: `all ${duration}ms ${easing}`,
      willChange: !isVisible ? 'transform, opacity' : 'auto'
    };
  };

  return {
    elementRef,
    isVisible,
    hasAnimated,
    styles: getAnimationStyle()
  };
};

/**
 * Advanced staggered scroll animations for groups of elements
 */
export const useStaggeredScrollAnimation = (
  count: number, 
  baseDelay: number = 100,
  config: Omit<ScrollAnimationConfig, 'stagger' | 'delay'> = {}
) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const elementRefs = useRef<(HTMLElement | null)[]>(new Array(count).fill(null));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    if (prefersReducedMotion.current) {
      setIsTriggered(true);
      return;
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches) setIsTriggered(true);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTriggered) {
            setIsTriggered(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { 
        threshold: config.threshold || 0.1,
        rootMargin: config.rootMargin || '0px 0px -50px 0px'
      }
    );

    elementRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isTriggered, config.threshold, config.rootMargin]);

  const getElementRef = (index: number) => (el: HTMLElement | null) => {
    elementRefs.current[index] = el;
  };

  const getStaggeredStyle = (index: number) => {
    if (prefersReducedMotion.current) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'none'
      };
    }

    const duration = config.duration || 600;
    const easing = config.easing || 'cubic-bezier(0.23, 1, 0.32, 1)';
    const animationType = config.animationType || 'fadeUp';

    let transform = '';
    switch (animationType) {
      case 'fadeUp':
        transform = isTriggered ? 'translateY(0)' : 'translateY(30px)';
        break;
      case 'slideLeft':
        transform = isTriggered ? 'translateX(0)' : 'translateX(-30px)';
        break;
      case 'slideRight':
        transform = isTriggered ? 'translateX(0)' : 'translateX(30px)';
        break;
      case 'scale':
        transform = isTriggered ? 'scale(1)' : 'scale(0.95)';
        break;
      default:
        transform = isTriggered ? 'translateY(0)' : 'translateY(30px)';
    }

    return {
      opacity: isTriggered ? (config.opacity?.to || 1) : (config.opacity?.from || 0),
      transform,
      transition: `all ${duration}ms ${easing}`,
      transitionDelay: `${index * baseDelay}ms`,
      willChange: !isTriggered ? 'transform, opacity' : 'auto'
    };
  };

  return {
    getElementRef,
    getStaggeredStyle,
    isTriggered,
    triggerAnimations: () => setIsTriggered(true)
  };
};

/**
 * Advanced parallax scroll effects
 */
export const useParallaxScroll = (speed: number = 0.5, offset: number = 0) => {
  const elementRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>();
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleScroll = useCallback(() => {
    if (!elementRef.current || prefersReducedMotion.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollPosition = window.pageYOffset;
      setScrollY(scrollPosition);
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const parallaxStyle = {
    transform: prefersReducedMotion.current 
      ? 'none' 
      : `translateY(${(scrollY * speed) + offset}px)`,
    willChange: prefersReducedMotion.current ? 'auto' : 'transform'
  };

  return {
    elementRef,
    parallaxStyle,
    scrollY
  };
};

/**
 * Advanced scroll progress indicator
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Calculate initial progress

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return progress;
};

/**
 * Advanced text reveal animations
 */
export const useTextRevealAnimation = (
  text: string,
  config: ScrollAnimationConfig = {}
) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    if (prefersReducedMotion.current) {
      setIsVisible(true);
      return;
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches) setIsVisible(true);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (config.triggerOnce !== false) {
            observer.disconnect();
          }
        } else if (config.triggerOnce === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: config.threshold || 0.2,
        rootMargin: config.rootMargin || '0px 0px -50px 0px'
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [config.threshold, config.rootMargin, config.triggerOnce]);

  const words = text.split(' ');
  
  const getWordStyle = (index: number) => {
    if (prefersReducedMotion.current) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'none'
      };
    }

    const delay = (config.delay || 0) + (index * (config.stagger || 100));
    const duration = config.duration || 600;
    const easing = config.easing || 'cubic-bezier(0.23, 1, 0.32, 1)';

    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all ${duration}ms ${easing}`,
      transitionDelay: `${delay}ms`,
      willChange: !isVisible ? 'transform, opacity' : 'auto'
    };
  };

  return {
    containerRef,
    isVisible,
    words,
    getWordStyle
  };
};