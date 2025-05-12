import { Product } from "@shared/schema";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

const ProductGrid = ({ products, isLoading, error }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-96 bg-neutral-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-8">
        Failed to load products. Please try again later.
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center my-8 p-8 bg-neutral-100 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No Products Found</h3>
        <p className="text-text-medium">
          Try adjusting your filter criteria or check back later for new
          arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
