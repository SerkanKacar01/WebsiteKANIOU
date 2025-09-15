import React from 'react';

// Sophisticated loading spinner component
export const LuxurySpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className={`spinner-luxury ${sizes[size]}`}
      role="status"
      aria-label="Loading"
      data-testid={`spinner-${size}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Premium skeleton loader component
interface SkeletonProps {
  className?: string;
  lines?: number;
  avatar?: boolean;
  width?: string;
  height?: string;
}

export const LuxurySkeleton: React.FC<SkeletonProps> = ({ 
  className = '',
  lines = 1,
  avatar = false,
  width = '100%',
  height = '1rem'
}) => {
  return (
    <div className={`space-y-3 ${className}`} data-testid="skeleton-loader">
      {avatar && (
        <div className="skeleton-luxury w-12 h-12 rounded-full" style={{ height: '3rem' }} />
      )}
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton-luxury"
          style={{
            width: index === lines - 1 ? '75%' : width,
            height
          }}
        />
      ))}
    </div>
  );
};

// Sophisticated progress bar component
interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export const LuxuryProgress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  showLabel = false,
  label = 'Progress'
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`space-y-2 ${className}`} data-testid="progress-bar">
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-neutral-700 font-medium">{label}</span>
          <span className="text-[#D5B36A] font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-luxury h-3">
        <div 
          className="progress-luxury-fill h-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
    </div>
  );
};

// Card skeleton loader for product grids
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="card-ultra-luxury p-6 space-y-4" data-testid="product-skeleton">
      <div className="skeleton-luxury w-full h-48 rounded-xl" />
      <div className="space-y-3">
        <div className="skeleton-luxury w-3/4 h-6" />
        <div className="skeleton-luxury w-1/2 h-4" />
        <div className="flex justify-between items-center">
          <div className="skeleton-luxury w-1/3 h-5" />
          <div className="skeleton-luxury w-20 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Full page loading overlay
interface PageLoadingProps {
  message?: string;
  isVisible: boolean;
}

export const PageLoadingOverlay: React.FC<PageLoadingProps> = ({ 
  message = 'Loading...', 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="page-transition-overlay flex items-center justify-center"
      data-testid="page-loading"
      role="alert"
      aria-live="polite"
    >
      <div className="text-center space-y-6">
        <LuxurySpinner size="lg" />
        <div className="text-white text-lg font-medium tracking-wide">
          {message}
        </div>
      </div>
    </div>
  );
};

// Luxury loading button state
interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const LuxuryLoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading,
  className = '',
  disabled = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative inline-flex items-center justify-center px-6 py-3
        bg-gradient-to-r from-[#D5B36A] to-[#E0C188]
        text-white font-semibold rounded-xl
        transition-all duration-300 ease-out
        hover:shadow-luxury focus-luxury
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
      data-testid="loading-button"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LuxurySpinner size="sm" />
        </div>
      )}
      <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
};

// Gallery skeleton grid
export const GallerySkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4" data-testid={`gallery-skeleton-${index}`}>
          <div className="skeleton-luxury w-full h-64 rounded-xl" />
          <div className="space-y-2">
            <div className="skeleton-luxury w-3/4 h-5" />
            <div className="skeleton-luxury w-1/2 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};