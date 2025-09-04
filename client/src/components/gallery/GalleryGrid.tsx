import { GalleryItem as GalleryItemType } from "@shared/schema";
import GalleryItem from "./GalleryItem";

interface GalleryGridProps {
  items: GalleryItemType[];
  isLoading: boolean;
  error: Error | null;
}

const GalleryGrid = ({ items, isLoading, error }: GalleryGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-neutral-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-8">
        Failed to load gallery items. Please try again later.
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center my-8 p-8 bg-neutral-100 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No Gallery Items Found</h3>
        <p className="text-text-medium">
          Check back later for new installations and projects.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="break-inside-avoid mb-6"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animation: 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          <GalleryItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
