import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem as GalleryItemType } from "@shared/schema";

interface GalleryItemProps {
  item: GalleryItemType;
}

const GalleryItem = ({ item }: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer h-64">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Removed text content to keep only the hover effect */}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full object-contain max-h-[80vh]"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="font-display text-xl text-white font-medium mb-1">
              {item.title}
            </h3>
            <p className="font-body text-white/90 text-sm">{item.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItem;
