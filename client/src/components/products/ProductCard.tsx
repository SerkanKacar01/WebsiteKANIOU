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
    <Card className="group overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isBestSeller && (
          <div className="absolute top-4 right-4 bg-secondary text-white text-sm py-1 px-3 rounded-full">
            Best Seller
          </div>
        )}
        {product.isNewArrival && (
          <div className="absolute top-4 right-4 bg-accent text-white text-sm py-1 px-3 rounded-full">
            New Arrival
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
          <h3 className="text-title-lg text-primary font-bold text-shadow-luxury-soft animate-text-reveal-up">
            <span className="text-gradient-subtle">{product.name}</span>
          </h3>
          <div className="text-body font-bold text-gradient-luxury text-shadow-luxury-medium animate-text-reveal-scale text-reveal-delay-1">€{product.price.toFixed(2)}</div>
        </div>
        <p className="text-body text-text-medium mb-4 line-clamp-3 leading-relaxed animate-text-reveal-up text-reveal-delay-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {product.material && (
            <span className="text-caption bg-neutral-100 text-text-medium px-2 py-1 rounded text-shadow-luxury-soft">
              {product.material}
            </span>
          )}
          {product.features &&
            product.features.map((feature, index) => (
              <span
                key={index}
                className="text-caption bg-neutral-100 text-text-medium px-2 py-1 rounded text-shadow-luxury-soft"
              >
                {feature}
              </span>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex gap-2">
            {colorSwatches.map((swatch, index) => (
              <button
                key={index}
                className={`w-5 h-5 rounded-full border ${
                  selectedColor === swatch.color
                    ? "border-accent ring-2 ring-offset-1 ring-accent"
                    : "border-neutral-300"
                } cursor-pointer`}
                style={{ backgroundColor: swatch.color }}
                onClick={() => setSelectedColor(swatch.color)}
                aria-label={`Select color ${swatch.name || swatch.color}`}
              />
            ))}
          </div>
          <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <a className="text-body inline-flex items-center font-semibold text-gradient-elegant hover:text-gradient-luxury transition-all duration-300 text-shadow-luxury-soft">
              View Details →
            </a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
