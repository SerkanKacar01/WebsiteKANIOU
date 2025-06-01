import { Link } from "wouter";
import MobileCard from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface MobileProductGridProps {
  products: Array<{
    id: number;
    title: string;
    href: string;
    image: string;
    price?: string;
    rating?: number;
    isPopular?: boolean;
  }>;
}

const MobileProductGrid = ({ products }: MobileProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4">
      {products.map((product) => (
        <MobileCard key={product.id} className="overflow-hidden p-0">
          <Link href={product.href}>
            <div className="flex space-x-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
                {product.isPopular && (
                  <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Populair
                  </div>
                )}
              </div>
              
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  {product.rating && (
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  )}
                  
                  {product.price && (
                    <p className="text-primary font-medium">{product.price}</p>
                  )}
                </div>
                
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="ghost" className="p-1">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </MobileCard>
      ))}
    </div>
  );
};

export default MobileProductGrid;