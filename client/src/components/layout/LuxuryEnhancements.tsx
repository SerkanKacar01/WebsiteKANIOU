import React from 'react';
import LuxuryTooltip from '@/components/ui/LuxuryTooltip';
import { MicroBounce, LuxuryGlow, LuxuryFAB } from '@/components/ui/LuxuryMicroAnimations';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';

// Enhanced floating action buttons with luxury styling
const LuxuryFloatingElements: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContact = () => {
    window.location.href = '/contact';
  };

  const openPhone = () => {
    window.location.href = 'tel:+32123456789';
  };

  return (
    <>
      {/* Luxury floating action buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <LuxuryTooltip content="Scroll naar boven" position="left">
          <LuxuryFAB
            icon={<ArrowUp className="w-5 h-5" />}
            onClick={scrollToTop}
            data-tooltip="Scroll naar boven"
            className="bottom-20"
          />
        </LuxuryTooltip>

        <LuxuryTooltip content="Contact opnemen" position="left">
          <LuxuryFAB
            icon={<MessageCircle className="w-5 h-5" />}
            onClick={openContact}
            data-tooltip="Contact opnemen"
            className="bottom-6"
          />
        </LuxuryTooltip>

        <LuxuryTooltip content="Direct bellen" position="left">
          <LuxuryFAB
            icon={<Phone className="w-5 h-5" />}
            onClick={openPhone}
            data-tooltip="Direct bellen"
            className="bottom-6"
          />
        </LuxuryTooltip>
      </div>

      {/* Luxury decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Floating particles for premium feel */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#D5B36A]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '6s'}} />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-[#E0C188]/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '8s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#D5B36A]/15 rounded-full animate-bounce" style={{animationDelay: '4s', animationDuration: '10s'}} />
        
        {/* Ambient light effects */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#D5B36A]/5 via-[#E0C188]/3 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#D5B36A]/5 via-[#E0C188]/3 to-transparent" />
      </div>
    </>
  );
};

// Enhanced page wrapper with luxury effects
interface LuxuryPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const LuxuryPageWrapper: React.FC<LuxuryPageWrapperProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Premium background textures */}
      <div className="fixed inset-0 texture-luxury-noise pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed inset-0 gradient-mesh-luxury pointer-events-none z-0" aria-hidden="true" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Luxury floating elements */}
      <LuxuryFloatingElements />
    </div>
  );
};

// Enhanced section wrapper with luxury effects
interface LuxurySectionProps {
  children: React.ReactNode;
  className?: string;
  premium?: boolean;
}

export const LuxurySection: React.FC<LuxurySectionProps> = ({ 
  children, 
  className = '',
  premium = false 
}) => {
  return (
    <section 
      className={`
        relative overflow-hidden
        ${premium ? 'luxury-element surface-embossed' : ''}
        ${className}
      `}
      data-cursor={premium ? 'premium' : undefined}
    >
      {premium && (
        <>
          {/* Premium section background */}
          <div className="absolute inset-0 gradient-overlay-premium" aria-hidden="true" />
          <div className="absolute inset-0 texture-premium-grain" aria-hidden="true" />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default LuxuryFloatingElements;