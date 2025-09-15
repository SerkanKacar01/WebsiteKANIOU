import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { ColorSwatch } from "@/lib/types";
import { useIntersectionObserver, useContentVisibility } from "@/hooks/useIntersectionObserver";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  // Intersection observer for entrance animations
  const { elementRef: cardRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  // Content visibility optimization
  const { elementRef: contentRef, contentVisibility } = useContentVisibility();

  // Convert the color hex values to ColorSwatch objects
  const colorSwatches: ColorSwatch[] = product.colors
    ? product.colors.map((color) => ({ color }))
    : [];

  return (
    <div 
      ref={cardRef}
      className="group relative"
      style={{ contentVisibility }}
      data-testid={`card-product-${product.id}`}
    >
      {/* Enhanced Link wrapper for full keyboard accessibility */}
      <Link 
        href={`/products/${product.slug || product.name.toLowerCase().replace(/\s+/g, "-")}`}
        className="block focus:outline-none focus:ring-2 focus:ring-[#D5B36A] focus:ring-offset-2 rounded-3xl"
        aria-label={`View details for ${product.name}`}
        data-testid={`link-product-${product.id}`}
      >
        {/* Advanced Luxury Card Container with GPU acceleration */}
        <div className={`card-ultra-luxury glass-luxury-hover overflow-hidden transform transition-all duration-700 group-hover:-translate-y-6 group-hover:shadow-depth-5 hover:scale-[1.03] relative gpu-accelerated ${
          isIntersecting ? 'animate-luxury-fade-in' : 'opacity-0'
        }`}>
          {/* Optimized Glassmorphism Background */}
          <div className="absolute inset-0 glass-luxury-medium opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl" aria-hidden="true" />
          
          {/* Premium Image Container with Enhanced Effects */}
          <div className="relative h-80 overflow-hidden rounded-t-3xl">
            {/* Consolidated overlay for better performance */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#D5B36A]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" aria-hidden="true"></div>
            
            {/* Lazy-loaded optimized image */}
            <img
              src={product.imageUrl}
              alt={`${product.name} - Premium window covering`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 group-hover:brightness-110 group-hover:contrast-105 gpu-accelerated"
              loading="lazy"
              decoding="async"
              data-testid={`img-product-${product.id}`}
            />
            
            {/* Advanced Luxury Badges with Glassmorphism */}
            {product.isBestSeller && (
              <div className="absolute top-6 right-6 z-20 animate-luxury-fade-in">
                <div className="glass-luxury-gold bg-gradient-to-r from-[#D5B36A] to-[#E0C188] text-white text-caption font-bold py-3 px-5 rounded-full shadow-gold-strong border border-white/30 backdrop-blur-lg group-hover:shadow-gold-strong group-hover:scale-110 transition-all duration-300"
                     data-testid={`badge-bestseller-${product.id}`}
                     role="img"
                     aria-label="Best Seller Product">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-luxury-glow" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                    Best Seller
                  </div>
                </div>
              </div>
            )}
            {product.isNewArrival && (
              <div className="absolute top-6 right-6 z-20 animate-luxury-fade-in">
                <div className="glass-luxury-gold bg-gradient-to-r from-[#E0C188] to-[#D5B36A] text-white text-caption font-bold py-3 px-5 rounded-full shadow-gold-strong border border-white/30 backdrop-blur-lg group-hover:shadow-gold-strong group-hover:scale-110 transition-all duration-300"
                     data-testid={`badge-newarrival-${product.id}`}
                     role="img"
                     aria-label="New Arrival Product">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-luxury-glow" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"/>
                    </svg>
                    New Arrival
                  </div>
                </div>
              </div>
            )}
            
            {/* Performance-optimized Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 delay-200 gpu-accelerated" aria-hidden="true"></div>
          </div>
          
          {/* Premium Content Section */}
          <div ref={contentRef} className="p-luxury-lg space-y-6 relative">
            {/* Header Section with Price */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-title-lg text-[#2C3E50] font-bold leading-tight text-shadow-luxury-soft group-hover:text-gradient-luxury transition-all duration-300"
                    data-testid={`title-product-${product.id}`}>
                  {product.name}
                </h3>
                <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/5 px-3 py-1 rounded-lg border border-[#D5B36A]/20"
                     data-testid={`price-product-${product.id}`}
                     aria-label={`Price: ${product.price.toFixed(2)} euros`}>
                  €{product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full group-hover:w-24 transition-all duration-500" aria-hidden="true"></div>
            </div>
            
            {/* Description */}
            <p className="text-body text-[#2C3E50]/80 leading-relaxed line-clamp-3 group-hover:text-[#2C3E50] transition-colors duration-300"
               data-testid={`description-product-${product.id}`}>
              {product.description}
            </p>
            
            {/* Enhanced Premium Feature Tags */}
            <div className="flex flex-wrap gap-3 animate-luxury-slide-up" data-testid={`features-product-${product.id}`}>
              {product.material && (
                <span className="glass-luxury-light bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/5 text-[#2C3E50] text-caption font-medium px-4 py-2 rounded-full border border-[#D5B36A]/20 text-shadow-luxury-soft hover:shadow-gold-soft hover:scale-105 hover:bg-gradient-to-r hover:from-[#D5B36A]/15 hover:to-[#E0C188]/10 transition-all duration-300 cursor-default"
                      data-testid={`tag-material-${product.id}`}>
                  {product.material}
                </span>
              )}
              {product.features &&
                product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="glass-luxury-light bg-gradient-to-r from-[#E0C188]/10 to-[#D5B36A]/5 text-[#2C3E50] text-caption font-medium px-4 py-2 rounded-full border border-[#E0C188]/20 text-shadow-luxury-soft hover:shadow-gold-soft hover:scale-105 hover:bg-gradient-to-r hover:from-[#E0C188]/15 hover:to-[#D5B36A]/10 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`tag-feature-${product.id}-${index}`}
                  >
                    {feature}
                  </span>
                ))}
              {product.features && product.features.length > 2 && (
                <span className="glass-luxury-light bg-gradient-to-r from-[#D5B36A]/5 to-[#E0C188]/5 text-[#2C3E50]/60 text-caption font-medium px-4 py-2 rounded-full border border-[#D5B36A]/10 hover:shadow-depth-2 hover:scale-105 transition-all duration-300 cursor-default"
                      data-testid={`tag-more-features-${product.id}`}>
                  +{product.features.length - 2} meer
                </span>
              )}
            </div>
            
            {/* Premium Color Swatches & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D5B36A]/10">
              {/* Enhanced Color Swatches */}
              <div className="flex items-center gap-3" data-testid={`colors-product-${product.id}`}>
                {colorSwatches.length > 0 && (
                  <span className="text-caption text-[#2C3E50]/60 font-medium">Kleuren:</span>
                )}
                <div className="flex gap-2">
                  {colorSwatches.slice(0, 4).map((swatch, index) => (
                    <button
                      key={index}
                      className={`group/swatch relative w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D5B36A] focus:ring-offset-1 ${
                        selectedColor === swatch.color
                          ? "border-[#D5B36A] ring-2 ring-[#D5B36A]/30 ring-offset-2 shadow-professional"
                          : "border-white hover:border-[#E0C188] shadow-md hover:shadow-lg"
                      } cursor-pointer overflow-hidden`}
                      style={{ backgroundColor: swatch.color }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedColor(swatch.color);
                      }}
                      aria-label={`Select color ${swatch.name || swatch.color}`}
                      data-testid={`color-swatch-${product.id}-${index}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover/swatch:from-white/40 transition-all duration-300" aria-hidden="true"></div>
                    </button>
                  ))}
                  {colorSwatches.length > 4 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/5 border border-[#D5B36A]/20 text-caption text-[#2C3E50]/60 font-medium"
                         data-testid={`color-more-${product.id}`}
                         aria-label={`${colorSwatches.length - 4} more colors available`}>
                      +{colorSwatches.length - 4}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced Premium CTA Button */}
              <button 
                className="glass-luxury-medium bg-gradient-to-r from-[#D5B36A] to-[#C4A55A] text-white font-semibold px-6 py-3 rounded-xl shadow-gold-medium hover:shadow-gold-strong hover:translate-y-[-2px] hover:scale-105 active:translate-y-[-1px] active:scale-102 transition-all duration-300 group/btn overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#D5B36A]"
                data-testid={`button-details-${product.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Link navigation is handled by parent Link wrapper
                }}
                aria-label={`View details for ${product.name}`}
              >
                {/* Luxury shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 group-hover/btn:translate-x-full gpu-accelerated" aria-hidden="true" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Details</span>
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Premium Floating Shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/10 to-[#E0C188]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 scale-95 group-hover:scale-100 gpu-accelerated" aria-hidden="true"></div>
    </div>
  );
};

export default ProductCard;
