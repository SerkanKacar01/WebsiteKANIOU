import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { ColorSwatch } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  // Convert the color hex values to ColorSwatch objects
  const colorSwatches: ColorSwatch[] = product.colors
    ? product.colors.map((color) => ({ color }))
    : [];

  return (
    <div className="group relative">
      {/* Premium Card Container */}
      <div className="card-ultra-luxury overflow-hidden transform transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-professional">
        {/* Premium Image Container */}
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" aria-hidden="true"></div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Luxury Badges */}
          {product.isBestSeller && (
            <div className="absolute top-6 right-6 z-20">
              <div className="bg-gradient-to-r from-[#D5B36A] to-[#E0C188] text-white text-caption font-bold py-2 px-4 rounded-full shadow-professional border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                  Best Seller
                </div>
              </div>
            </div>
          )}
          {product.isNewArrival && (
            <div className="absolute top-6 right-6 z-20">
              <div className="bg-gradient-to-r from-[#E0C188] to-[#D5B36A] text-white text-caption font-bold py-2 px-4 rounded-full shadow-professional border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"/>
                  </svg>
                  New Arrival
                </div>
              </div>
            </div>
          )}
          
          {/* Premium Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/5 via-transparent to-[#E0C188]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
        </div>
        
        {/* Premium Content Section */}
        <div className="p-luxury-lg space-y-6 relative">
          {/* Header Section with Price */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-title-lg text-[#2C3E50] font-bold leading-tight text-shadow-luxury-soft group-hover:text-gradient-luxury transition-all duration-300">
                {product.name}
              </h3>
              <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/5 px-3 py-1 rounded-lg border border-[#D5B36A]/20">
                €{product.price.toFixed(2)}
              </div>
            </div>
            
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full group-hover:w-24 transition-all duration-500"></div>
          </div>
          
          {/* Description */}
          <p className="text-body text-[#2C3E50]/80 leading-relaxed line-clamp-3 group-hover:text-[#2C3E50] transition-colors duration-300">
            {product.description}
          </p>
          
          {/* Premium Feature Tags */}
          <div className="flex flex-wrap gap-2">
            {product.material && (
              <span className="bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/5 text-[#2C3E50] text-caption font-medium px-3 py-1.5 rounded-full border border-[#D5B36A]/20 text-shadow-luxury-soft hover:shadow-professional transition-all duration-300">
                {product.material}
              </span>
            )}
            {product.features &&
              product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-[#E0C188]/10 to-[#D5B36A]/5 text-[#2C3E50] text-caption font-medium px-3 py-1.5 rounded-full border border-[#E0C188]/20 text-shadow-luxury-soft hover:shadow-professional transition-all duration-300"
                >
                  {feature}
                </span>
              ))}
            {product.features && product.features.length > 2 && (
              <span className="bg-gradient-to-r from-[#D5B36A]/5 to-[#E0C188]/5 text-[#2C3E50]/60 text-caption font-medium px-3 py-1.5 rounded-full border border-[#D5B36A]/10">
                +{product.features.length - 2} meer
              </span>
            )}
          </div>
          
          {/* Premium Color Swatches & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#D5B36A]/10">
            {/* Enhanced Color Swatches */}
            <div className="flex items-center gap-3">
              {colorSwatches.length > 0 && (
                <span className="text-caption text-[#2C3E50]/60 font-medium">Kleuren:</span>
              )}
              <div className="flex gap-2">
                {colorSwatches.slice(0, 4).map((swatch, index) => (
                  <button
                    key={index}
                    className={`group/swatch relative w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                      selectedColor === swatch.color
                        ? "border-[#D5B36A] ring-2 ring-[#D5B36A]/30 ring-offset-2 shadow-professional"
                        : "border-white hover:border-[#E0C188] shadow-md hover:shadow-lg"
                    } cursor-pointer overflow-hidden`}
                    style={{ backgroundColor: swatch.color }}
                    onClick={() => setSelectedColor(swatch.color)}
                    aria-label={`Select color ${swatch.name || swatch.color}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover/swatch:from-white/40 transition-all duration-300"></div>
                  </button>
                ))}
                {colorSwatches.length > 4 && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#D5B36A]/10 to-[#E0C188]/5 border border-[#D5B36A]/20 text-caption text-[#2C3E50]/60 font-medium">
                    +{colorSwatches.length - 4}
                  </div>
                )}
              </div>
            </div>
            
            {/* Premium CTA Button */}
            <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <button className="btn-luxury-secondary-sm group/btn">
                <span className="relative z-10 flex items-center gap-2">
                  <span>Details</span>
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Premium Floating Shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/10 to-[#E0C188]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 scale-95 group-hover:scale-100" aria-hidden="true"></div>
    </div>
  );
};

export default ProductCard;
