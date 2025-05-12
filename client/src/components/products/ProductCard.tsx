import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { ArrowRight } from "lucide-react";
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
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl text-primary font-medium">
            {product.name}
          </h3>
          <div className="text-accent font-semibold">${product.price.toFixed(2)}</div>
        </div>
        <p className="font-body text-text-medium text-sm mb-4">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
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
        <div className="flex justify-between items-center">
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
          <Link href={`/products/${product.id}`}>
            <a className="font-body inline-flex items-center text-primary hover:text-accent">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
