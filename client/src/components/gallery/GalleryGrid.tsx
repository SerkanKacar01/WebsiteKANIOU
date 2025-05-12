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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GalleryGrid;
