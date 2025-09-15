import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CursorState {
  x: number;
  y: number;
  isPointer: boolean;
  isHidden: boolean;
  isActive: boolean;
  scale: number;
  type: 'default' | 'pointer' | 'text' | 'grab' | 'zoom' | 'premium';
}

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

const LuxuryCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const trailRafRef = useRef<number>();
  const trailsRef = useRef<CursorTrail[]>([]);
  const trailIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isPointer: false,
    isHidden: false,
    isActive: false,
    scale: 1,
    type: 'default'
  });

  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion and mobile
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    
    setPrefersReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    mobileQuery.addEventListener('change', handleMobileChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  // Detect element types for context-aware cursor
  const getElementCursorType = useCallback((element: Element): CursorState['type'] => {
    // Check for data attributes first
    const cursorType = element.getAttribute('data-cursor');
    if (cursorType) return cursorType as CursorState['type'];

    // Check element types and classes
    if (element.tagName === 'A' || element.tagName === 'BUTTON') return 'pointer';
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return 'text';
    if (element.classList.contains('cursor-grab')) return 'grab';
    if (element.classList.contains('cursor-zoom')) return 'zoom';
    if (element.classList.contains('cursor-premium')) return 'premium';
    if (element.classList.contains('clickable') || element.hasAttribute('onclick')) return 'pointer';

    // Check for interactive roles
    const role = element.getAttribute('role');
    if (role === 'button' || role === 'link') return 'pointer';

    return 'default';
  }, []);

  // Optimized mouse move handler with velocity calculation
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || isMobile) return;

    const currentTime = performance.now();
    const deltaX = e.clientX - lastPositionRef.current.x;
    const deltaY = e.clientY - lastPositionRef.current.y;
    
    // Calculate velocity for dynamic effects
    velocityRef.current = {
      x: deltaX * 0.1,
      y: deltaY * 0.1
    };

    lastPositionRef.current = { x: e.clientX, y: e.clientY };

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      // Detect element under cursor
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const cursorType = elementUnderCursor ? getElementCursorType(elementUnderCursor) : 'default';
      
      // Check for premium elements
      const isPremium = elementUnderCursor?.closest('.luxury-element, .premium-element, .card-ultra-luxury');
      const isButton = elementUnderCursor?.closest('button, a, [role="button"], [role="link"]');
      
      setCursor(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isPointer: isButton !== null,
        type: isPremium ? 'premium' : cursorType,
        scale: isPremium ? 1.2 : isButton ? 1.1 : 1,
        isActive: isButton !== null
      }));

      // Create trail effect for premium elements
      if (isPremium && !prefersReducedMotion) {
        const newTrail: CursorTrail = {
          id: trailIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 0.6,
          scale: 1
        };

        trailsRef.current.push(newTrail);
        
        // Limit trail length
        if (trailsRef.current.length > 8) {
          trailsRef.current.shift();
        }

        setTrails([...trailsRef.current]);

        // Animate and remove trails
        setTimeout(() => {
          trailsRef.current = trailsRef.current.filter(trail => trail.id !== newTrail.id);
          setTrails([...trailsRef.current]);
        }, 600);
      }
    });
  }, [prefersReducedMotion, isMobile, getElementCursorType]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (!prefersReducedMotion && !isMobile) {
      setCursor(prev => ({ ...prev, isHidden: true }));
    }
  }, [prefersReducedMotion, isMobile]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion && !isMobile) {
      setCursor(prev => ({ ...prev, isHidden: false }));
    }
  }, [prefersReducedMotion, isMobile]);

  // Mouse down/up handlers for active state
  const handleMouseDown = useCallback(() => {
    if (!prefersReducedMotion && !isMobile) {
      setCursor(prev => ({ ...prev, isActive: true, scale: prev.scale * 0.9 }));
    }
  }, [prefersReducedMotion, isMobile]);

  const handleMouseUp = useCallback(() => {
    if (!prefersReducedMotion && !isMobile) {
      setCursor(prev => ({ ...prev, isActive: false, scale: prev.isPointer ? 1.1 : 1 }));
    }
  }, [prefersReducedMotion, isMobile]);

  // Setup event listeners
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor on body
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion, isMobile, handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseDown, handleMouseUp]);

  // Don't render on mobile or reduced motion
  if (prefersReducedMotion || isMobile) {
    return null;
  }

  // Get cursor styles based on type and state
  const getCursorStyles = () => {
    const baseStyles = {
      transform: `translate3d(${cursor.x - 12}px, ${cursor.y - 12}px, 0) scale(${cursor.scale})`,
      opacity: cursor.isHidden ? 0 : 1,
      mixBlendMode: (cursor.type === 'premium' ? 'difference' : 'normal') as React.CSSProperties['mixBlendMode']
    };

    const typeStyles = {
      default: {
        background: 'radial-gradient(circle, #D5B36A 40%, transparent 70%)',
        border: '2px solid rgba(213, 179, 106, 0.8)',
      },
      pointer: {
        background: 'radial-gradient(circle, #E0C188 40%, transparent 70%)',
        border: '2px solid rgba(224, 193, 136, 0.9)',
        boxShadow: '0 0 20px rgba(224, 193, 136, 0.4)',
      },
      premium: {
        background: 'radial-gradient(circle, #FFD700 40%, transparent 70%)',
        border: '2px solid rgba(255, 215, 0, 0.9)',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
      },
      text: {
        background: 'transparent',
        border: '1px solid rgba(213, 179, 106, 0.6)',
        borderRadius: '2px',
        width: '2px',
        height: '20px',
      },
      grab: {
        background: 'radial-gradient(circle, #D5B36A 60%, transparent 80%)',
        border: '2px solid rgba(213, 179, 106, 0.8)',
        borderRadius: '50%',
      },
      zoom: {
        background: 'radial-gradient(circle, transparent 40%, #D5B36A 45%, transparent 50%)',
        border: '2px solid rgba(213, 179, 106, 0.8)',
      }
    };

    return { ...baseStyles, ...typeStyles[cursor.type] };
  };

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="luxury-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: cursor.type === 'text' ? '2px' : '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform, opacity',
          ...getCursorStyles()
        }}
        aria-hidden="true"
        data-testid="luxury-cursor"
      />

      {/* Cursor Trails for Premium Elements */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="luxury-cursor-trail"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            background: `radial-gradient(circle, rgba(255, 215, 0, ${trail.opacity}) 40%, transparent 70%)`,
            transform: `translate3d(${trail.x - 6}px, ${trail.y - 6}px, 0) scale(${trail.scale})`,
            opacity: trail.opacity * (1 - index * 0.1),
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            willChange: 'transform, opacity'
          }}
          aria-hidden="true"
        />
      ))}

      {/* Cursor Ring for Premium Interactive Elements */}
      {cursor.type === 'premium' && (
        <div
          className="luxury-cursor-ring"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            border: '1px solid rgba(255, 215, 0, 0.3)',
            transform: `translate3d(${cursor.x - 24}px, ${cursor.y - 24}px, 0) scale(${cursor.isActive ? 0.8 : 1})`,
            opacity: cursor.isHidden ? 0 : 0.6,
            transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            willChange: 'transform, opacity',
            animation: 'pulse 2s ease-in-out infinite'
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default LuxuryCursor;