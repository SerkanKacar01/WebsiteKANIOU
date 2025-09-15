import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Advanced interaction hooks for luxury website interactions
 * Supports sophisticated hover effects, scroll animations, and performance optimization
 */

// Types for interaction configuration
export interface HoverEffectConfig {
  scale?: number;
  translateY?: number;
  translateX?: number;
  rotateX?: number;
  rotateY?: number;
  glow?: boolean;
  glowColor?: string;
  shadowIntensity?: number;
  duration?: number;
  easing?: string;
  stagger?: number;
  magnetic?: boolean;
  magneticRadius?: number;
}

export interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  stagger?: number;
  delay?: number;
  duration?: number;
  easing?: string;
  transform?: {
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
  };
  opacity?: {
    from?: number;
    to?: number;
  };
}

/**
 * Advanced hover effects hook with multi-layered interactions
 */
export const useAdvancedHover = (config: HoverEffectConfig = {}) => {
  const {
    scale = 1.05,
    translateY = -8,
    translateX = 0,
    rotateX = 0,
    rotateY = 0,
    glow = false,
    glowColor = '#D5B36A',
    shadowIntensity = 1,
    duration = 400,
    easing = 'cubic-bezier(0.23, 1, 0.32, 1)',
    magnetic = false,
    magneticRadius = 50
  } = config;

  const elementRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  // Check for reduced motion preference
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

  // Optimized mouse move handler with magnetic effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current || prefersReducedMotion.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (magnetic && distance < magneticRadius) {
        const strength = (magneticRadius - distance) / magneticRadius;
        const magnetX = deltaX * strength * 0.3;
        const magnetY = deltaY * strength * 0.3;
        
        setMousePosition({ x: magnetX, y: magnetY });
      } else {
        setMousePosition({ x: 0, y: 0 });
      }
    });
  }, [magnetic, magneticRadius]);

  // Mouse enter handler
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (magnetic) {
      document.addEventListener('mousemove', handleMouseMove);
    }
  }, [magnetic, handleMouseMove]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    if (magnetic) {
      document.removeEventListener('mousemove', handleMouseMove);
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [magnetic, handleMouseMove]);

  // Apply transform styles
  const getTransformStyle = () => {
    if (prefersReducedMotion.current) {
      return {
        transition: 'none',
        transform: 'none'
      };
    }

    const transforms = [];
    
    if (isHovered) {
      if (scale !== 1) transforms.push(`scale(${scale})`);
      if (translateY !== 0) transforms.push(`translateY(${translateY + mousePosition.y}px)`);
      if (translateX !== 0) transforms.push(`translateX(${translateX + mousePosition.x}px)`);
      if (rotateX !== 0) transforms.push(`rotateX(${rotateX}deg)`);
      if (rotateY !== 0) transforms.push(`rotateY(${rotateY}deg)`);
    }

    // Add magnetic positioning
    if (magnetic && (mousePosition.x !== 0 || mousePosition.y !== 0)) {
      transforms.push(`translate(${mousePosition.x}px, ${mousePosition.y}px)`);
    }

    return {
      transition: `all ${duration}ms ${easing}`,
      transform: transforms.length > 0 ? transforms.join(' ') : 'none',
      willChange: isHovered ? 'transform' : 'auto'
    };
  };

  // Get box shadow style for glow and depth effects
  const getBoxShadowStyle = () => {
    if (prefersReducedMotion.current) return {};

    const shadows = [];
    
    if (isHovered) {
      // Depth shadow
      const depthShadow = `0 ${translateY * -2}px ${Math.abs(translateY) * 4}px rgba(0, 0, 0, ${0.1 * shadowIntensity})`;
      shadows.push(depthShadow);
      
      // Enhanced depth shadow
      const enhancedShadow = `0 ${translateY * -4}px ${Math.abs(translateY) * 8}px rgba(0, 0, 0, ${0.05 * shadowIntensity})`;
      shadows.push(enhancedShadow);

      // Glow effect
      if (glow) {
        const glowShadow = `0 0 30px rgba(${hexToRgb(glowColor)}, ${0.3 * shadowIntensity})`;
        shadows.push(glowShadow);
        
        const innerGlow = `0 0 60px rgba(${hexToRgb(glowColor)}, ${0.15 * shadowIntensity})`;
        shadows.push(innerGlow);
      }
    }

    return {
      boxShadow: shadows.length > 0 ? shadows.join(', ') : 'none',
      transition: `box-shadow ${duration}ms ${easing}`
    };
  };

  return {
    elementRef,
    isHovered,
    mousePosition,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    styles: {
      ...getTransformStyle(),
      ...getBoxShadowStyle()
    }
  };
};

/**
 * Advanced scroll-triggered animations with staggering support
 */
export const useScrollAnimation = (config: ScrollAnimationConfig = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    stagger = 0,
    delay = 0,
    duration = 800,
    easing = 'cubic-bezier(0.23, 1, 0.32, 1)',
    transform = { y: 40, x: 0, scale: 0.95, rotate: 0 },
    opacity = { from: 0, to: 1 }
  } = config;

  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    if (prefersReducedMotion.current) {
      setIsIntersecting(true);
      setHasAnimated(true);
      return;
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches) {
        setIsIntersecting(true);
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
            setIsIntersecting(true);
            setHasAnimated(true);
          }, delay + stagger);
          
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay, stagger, hasAnimated]);

  const getAnimationStyle = () => {
    if (prefersReducedMotion.current) {
      return {
        opacity: opacity.to,
        transform: 'none',
        transition: 'none'
      };
    }

    const transforms = [];
    
    if (!isIntersecting) {
      if (transform.y) transforms.push(`translateY(${transform.y}px)`);
      if (transform.x) transforms.push(`translateX(${transform.x}px)`);
      if (transform.scale && transform.scale !== 1) transforms.push(`scale(${transform.scale})`);
      if (transform.rotate) transforms.push(`rotate(${transform.rotate}deg)`);
    }

    return {
      opacity: isIntersecting ? opacity.to : opacity.from,
      transform: transforms.length > 0 ? transforms.join(' ') : 'none',
      transition: `all ${duration}ms ${easing}`,
      willChange: !isIntersecting ? 'transform, opacity' : 'auto'
    };
  };

  return {
    elementRef,
    isIntersecting,
    hasAnimated,
    styles: getAnimationStyle()
  };
};

/**
 * Advanced staggered animations for groups of elements
 */
export const useStaggeredAnimation = (count: number, baseDelay: number = 100) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const elementRefs = useRef<(HTMLElement | null)[]>(new Array(count).fill(null));

  const triggerAnimations = () => {
    setIsTriggered(true);
  };

  const getElementRef = (index: number) => (el: HTMLElement | null) => {
    elementRefs.current[index] = el;
  };

  const getStaggeredStyle = (index: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'none'
      };
    }

    return {
      opacity: isTriggered ? 1 : 0,
      transform: isTriggered ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 600ms cubic-bezier(0.23, 1, 0.32, 1)`,
      transitionDelay: `${index * baseDelay}ms`,
      willChange: !isTriggered ? 'transform, opacity' : 'auto'
    };
  };

  return {
    triggerAnimations,
    getElementRef,
    getStaggeredStyle,
    isTriggered
  };
};

/**
 * Advanced ripple effect for buttons and interactive elements
 */
export const useRippleEffect = () => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const rippleIdRef = useRef(0);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y,
      size
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  // Helper function to get ripple container styles
  const getRippleContainerStyles = () => ({
    position: 'absolute' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    overflow: 'hidden' as const
  });

  // Helper function to get individual ripple styles
  const getRippleStyles = (ripple: { x: number; y: number; size: number }) => ({
    position: 'absolute' as const,
    left: ripple.x,
    top: ripple.y,
    width: ripple.size,
    height: ripple.size,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(213, 179, 106, 0.6) 0%, rgba(213, 179, 106, 0) 70%)',
    transform: 'scale(0)',
    animation: 'ripple-expand 600ms cubic-bezier(0.23, 1, 0.32, 1) forwards',
    pointerEvents: 'none' as const
  });

  return {
    createRipple,
    ripples,
    getRippleContainerStyles,
    getRippleStyles
  };
};

// Utility functions
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '213, 179, 106'; // Default gold color
  
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(', ');
};

/**
 * Custom hook for magnetic cursor effects
 */
export const useMagneticCursor = (strength: number = 0.3, radius: number = 100) => {
  const elementRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const force = (radius - distance) / radius;
        const magnetX = deltaX * force * strength;
        const magnetY = deltaY * force * strength;
        
        setPosition({ x: magnetX, y: magnetY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    });
  }, [strength, radius]);

  const handleMouseEnter = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    setPosition({ x: 0, y: 0 });
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [handleMouseMove]);

  const magneticStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
  };

  return {
    elementRef,
    position,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    },
    magneticStyle
  };
};