import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem as GalleryItemType } from "@shared/schema";
import {
  galleryImage_IMG9293,
  galleryImage_IMG9294,
  galleryImage_IMG9295,
  galleryImage_IMG9296,
  galleryImage_IMG9297,
  galleryImage_IMG9298,
  galleryImage_IMG9299,
  galleryImage_IMG9300,
  galleryImage_IMG9301,
  galleryImage_IMG9302,
  galleryImage_IMG9303,
  galleryImage_IMG9304,
  galleryImage_IMG9305,
  galleryImage_IMG9306,
  galleryImage_IMG9308,
  galleryImage_IMG9309,
  galleryImage_IMG9310,
  galleryImage5,
  galleryImage6,
  galleryImage7,
  galleryImage10,
  overgordijnenImage,
  galleryImage_duoplisse,
  inbetweenImage,
} from "@/assets";

interface GalleryItemProps {
  item: GalleryItemType;
}

// Image mapping to convert database paths to actual imported images
const imageMap: Record<string, string> = {
  '/src/assets/IMG_9293.jpg': galleryImage_IMG9293,
  '/src/assets/IMG_9294.jpg': galleryImage_IMG9294,
  '/src/assets/IMG_9295.jpg': galleryImage_IMG9295,
  '/src/assets/IMG_9296.jpg': galleryImage_IMG9296,
  '/src/assets/IMG_9297.jpg': galleryImage_IMG9297,
  '/src/assets/IMG_9298.jpg': galleryImage_IMG9298,
  '/src/assets/IMG_9299.jpg': galleryImage_IMG9299,
  '/src/assets/IMG_9300.jpg': galleryImage_IMG9300,
  '/src/assets/IMG_9301.jpg': galleryImage_IMG9301,
  '/src/assets/IMG_9302.jpg': galleryImage_IMG9302,
  '/src/assets/IMG_9303.jpg': galleryImage_IMG9303,
  '/src/assets/IMG_9304.jpg': galleryImage_IMG9304,
  '/src/assets/IMG_9305.jpg': galleryImage_IMG9305,
  '/src/assets/IMG_9306.jpg': galleryImage_IMG9306,
  '/src/assets/IMG_9308.jpg': galleryImage_IMG9308,
  '/src/assets/IMG_9309.jpg': galleryImage_IMG9309,
  '/src/assets/IMG_9310.jpg': galleryImage_IMG9310,
  '/src/assets/image00001.jpeg': galleryImage5,
  '/src/assets/image00002.jpeg': galleryImage6,
  '/src/assets/image00003.jpeg': galleryImage7,
  '/src/assets/image00004.jpeg': galleryImage10,
  '/src/assets/image00007.jpeg': galleryImage7,
  '/src/assets/image00010.jpeg': galleryImage10,
  '/src/assets/Overgordijnen.jpeg': overgordijnenImage,
  '/src/assets/Duoplisse.jpeg': galleryImage_duoplisse,
  '/src/assets/Inbetween.jpeg': inbetweenImage,
};

const GalleryItem = ({ item }: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get the actual image URL from the mapping, or fallback to the original URL
  const imageUrl = imageMap[item.imageUrl] || item.imageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer h-64">
          <img
            src={imageUrl}
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
            src={imageUrl}
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
