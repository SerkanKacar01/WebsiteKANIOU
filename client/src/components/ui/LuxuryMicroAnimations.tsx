import React from 'react';

// Floating Action Button with enhanced animations
interface LuxuryFABProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  'data-tooltip'?: string;
}

export const LuxuryFAB: React.FC<LuxuryFABProps> = ({ 
  icon, 
  onClick, 
  className = '', 
  'data-tooltip': tooltip 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        fab-luxury fixed z-50 w-14 h-14 rounded-full
        bg-gradient-to-r from-[#D5B36A] to-[#E0C188]
        text-white shadow-lg hover:shadow-xl
        flex items-center justify-center
        focus-luxury texture-premium-grain
        luxury-element cursor-premium
        ${className}
      `}
      data-tooltip={tooltip}
      data-cursor="premium"
      data-testid="luxury-fab"
    >
      <div className="absolute inset-0 gradient-luxury-animated opacity-50 rounded-full" />
      <span className="relative z-10">{icon}</span>
    </button>
  );
};

// Enhanced micro-bounce component
interface MicroBounceProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export const MicroBounce: React.FC<MicroBounceProps> = ({ 
  children, 
  intensity = 'medium',
  className = '' 
}) => {
  const intensityClasses = {
    subtle: 'hover:translate-y-[-1px]',
    medium: 'hover:translate-y-[-2px]',
    strong: 'hover:translate-y-[-4px]'
  };

  return (
    <div 
      className={`
        micro-bounce transition-transform duration-150 
        cubic-bezier(0.68, -0.55, 0.265, 1.55)
        ${intensityClasses[intensity]}
        active:translate-y-0
        ${className}
      `}
      data-testid="micro-bounce"
    >
      {children}
    </div>
  );
};

// Luxury glow effect component
interface LuxuryGlowProps {
  children: React.ReactNode;
  color?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export const LuxuryGlow: React.FC<LuxuryGlowProps> = ({ 
  children, 
  color = '#D5B36A',
  intensity = 'medium',
  className = '' 
}) => {
  const intensityValues = {
    subtle: '0.2',
    medium: '0.3',
    strong: '0.5'
  };

  const glowStyles = {
    '--glow-color': color,
    '--glow-intensity': intensityValues[intensity]
  } as React.CSSProperties;

  return (
    <div 
      className={`
        relative transition-all duration-300
        hover:drop-shadow-[0_0_20px_var(--glow-color,#D5B36A)]
        ${className}
      `}
      style={glowStyles}
      data-testid="luxury-glow"
    >
      {children}
    </div>
  );
};

// Pulse animation component
interface PulseProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export const LuxuryPulse: React.FC<PulseProps> = ({ 
  children, 
  duration = 2000,
  className = '' 
}) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div 
      className={`
        ${!prefersReducedMotion ? 'animate-pulse' : ''}
        ${className}
      `}
      style={{ 
        animationDuration: `${duration}ms`,
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)'
      }}
      data-testid="luxury-pulse"
    >
      {children}
    </div>
  );
};

// Stagger animation container
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({ 
  children, 
  staggerDelay = 100,
  className = '' 
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className} data-testid="stagger-container">
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="animate-on-view"
          style={{ 
            animationDelay: `${index * staggerDelay}ms`,
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Enhanced ripple button
interface RippleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export const RippleButton: React.FC<RippleButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
  const nextRippleId = React.useRef(0);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: nextRippleId.current++,
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick();
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#D5B36A] to-[#E0C188] text-white',
    secondary: 'bg-white border-2 border-[#D5B36A] text-[#D5B36A]',
    ghost: 'bg-transparent hover:bg-[#D5B36A]/10 text-[#D5B36A]'
  };

  return (
    <button
      onClick={createRipple}
      className={`
        relative overflow-hidden px-6 py-3 rounded-xl
        transition-all duration-300 focus-luxury
        ${variantClasses[variant]}
        ${className}
      `}
      data-testid="ripple-button"
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute inset-0 rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            animationDuration: '600ms'
          }}
        />
      ))}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};