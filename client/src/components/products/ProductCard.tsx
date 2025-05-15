import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { ArrowRight } from "lucide-react";
import { ColorSwatch } from "@/lib/types";
import { getAssetUrl } from "@/lib/imageUtils";

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
    <Card 
      className="group overflow-hidden shadow-md transition-shadow hover:shadow-lg rounded-2xl"
      tabIndex={0}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={getAssetUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-display text-xl text-primary font-medium">
            {product.name}
          </h2>
          <div 
            className="text-accent font-semibold"
            aria-label={`Price: $${product.price.toFixed(2)}`}
          >
            ${product.price.toFixed(2)}
          </div>
        </div>
        <p className="font-body text-text-medium text-sm mb-4">
          {product.description}
        </p>
        
        {(product.material || (product.features && product.features.length > 0)) && (
          <div 
            className="flex flex-wrap gap-2 mb-4"
            aria-label="Product specifications"
          >
            {product.material && (
              <span className="text-xs bg-neutral-100 text-text-medium px-2 py-1 rounded">
                {product.material}
              </span>
            )}
            {product.features &&
              product.features.map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-neutral-100 text-text-medium px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          {colorSwatches.length > 0 && (
            <div 
              className="flex gap-2"
              role="group"
              aria-label="Available colors"
            >
              {colorSwatches.map((swatch, index) => {
                const colorName = swatch.name || swatch.color;
                const isSelected = selectedColor === swatch.color;
                return (
                  <button
                    key={index}
                    className={`w-5 h-5 rounded-full border ${
                      isSelected
                        ? "border-accent ring-2 ring-offset-1 ring-accent"
                        : "border-neutral-300"
                    } cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent`}
                    style={{ backgroundColor: swatch.color }}
                    onClick={() => setSelectedColor(swatch.color)}
                    aria-label={`${isSelected ? 'Selected color:' : 'Select color:'} ${colorName}`}
                    aria-pressed={isSelected}
                  />
                );
              })}
            </div>
          )}
          <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <a 
              className="font-body inline-flex items-center text-primary hover:text-accent focus:outline-none focus:underline"
              aria-label={`View details of ${product.name}`}
            >
              View Details <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
