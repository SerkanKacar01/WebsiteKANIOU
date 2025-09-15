import { Product } from "@shared/schema";
import ProductCard from "./ProductCard";
import { useStaggeredIntersection } from "@/hooks/useIntersectionObserver";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

const ProductGrid = ({ products, isLoading, error }: ProductGridProps) => {
  // Intersection observer for grid container
  const { elementRef: gridRef, shouldAnimate } = useStaggeredIntersection(0, {
    threshold: 0.1,
    triggerOnce: true
  });

  if (isLoading) {
    return (
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-luxury-lg"
        data-testid="grid-loading-skeleton"
      >
        {[...Array(6)].map((_, i) => {
          // Finite animation variant for skeleton cards
          const animationClass = shouldAnimate 
            ? 'animate-luxury-fade-in' 
            : 'opacity-0';
          
          return (
            <div
              key={i}
              className={`relative h-[500px] glass-luxury-light rounded-3xl overflow-hidden group content-auto gpu-accelerated ${animationClass}`}
              style={{ 
                animationDelay: shouldAnimate ? `${i * 100}ms` : '0ms',
                contentVisibility: 'auto',
                containIntrinsicSize: '320px 500px'
              }}
              data-testid={`skeleton-card-${i}`}
            >
              {/* Optimized skeleton loading with reduced repaints */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/8 via-transparent to-[#E0C188]/8" aria-hidden="true" />
              <div className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-t-3xl" />
              <div className="p-luxury-lg space-y-4">
                <div className="h-6 bg-gradient-to-r from-[#D5B36A]/15 to-[#E0C188]/15 rounded-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4" />
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/10 rounded-full" />
                  <div className="h-8 w-20 bg-gradient-to-r from-[#E0C188]/10 to-[#D5B36A]/10 rounded-full" />
                </div>
              </div>
              {/* Performance-optimized shimmer for reduced motion users */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] shimmer-gpu rounded-3xl" aria-hidden="true" />
            </div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="glass-luxury-medium border border-red-200 text-center my-luxury-xl p-luxury-xl rounded-3xl shadow-depth-3 animate-luxury-fade-in"
        role="alert"
        aria-live="polite"
        data-testid="grid-error-state"
      >
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-title-lg text-red-700 font-bold mb-3 text-shadow-luxury-soft" data-testid="error-title">
          Fout bij laden
        </h3>
        <p className="text-body text-red-600/80 leading-relaxed" data-testid="error-message">
          Er is een fout opgetreden bij het laden van de producten. Probeer het later opnieuw.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div 
        className="glass-luxury-medium text-center my-luxury-xl p-luxury-xl rounded-3xl shadow-depth-3 animate-luxury-fade-in"
        data-testid="grid-empty-state"
        role="status"
        aria-live="polite"
      >
        <div className="text-[#D5B36A] mb-luxury-md">
          <svg className="w-20 h-20 mx-auto mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-title-xl text-gradient-luxury font-bold mb-luxury-md text-shadow-luxury-medium" data-testid="empty-title">
          Geen producten gevonden
        </h3>
        <p className="text-body text-[#2C3E50]/70 leading-relaxed max-w-md mx-auto" data-testid="empty-message">
          Pas uw filtercriteria aan of kom later terug voor nieuwe aankomensten.
        </p>
        <div className="mt-luxury-lg">
          <div className="w-24 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mx-auto" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-luxury-lg mobile-optimized ${
        shouldAnimate ? 'animate-luxury-fade-in' : 'opacity-0'
      }`}
      data-testid="grid-products"
      role="grid"
      aria-label="Product grid"
    >
      {products.map((product, index) => {
        // Finite animation variants with viewport gating
        const animationClass = shouldAnimate 
          ? 'animate-on-scroll-stagger' 
          : 'opacity-0';
        
        return (
          <div 
            key={product.id} 
            className={`${animationClass} content-auto gpu-accelerated`}
            style={{ 
              animationDelay: shouldAnimate ? `${index * 80}ms` : '0ms',
              contentVisibility: 'auto',
              containIntrinsicSize: '320px 600px'
            }}
            role="gridcell"
            data-testid={`grid-item-${product.id}`}
          >
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
