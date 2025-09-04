import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
type GalleryItemType = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: number;
};
import {
  galleryImage1,
  galleryImage2,
  galleryImage3,
  galleryImage4,
  galleryImage5,
  galleryImage6,
  galleryImage7,
  galleryImage8,
  galleryImage9,
  galleryImage10,
  galleryImage11,
  galleryImage12,
  galleryImage13,
  galleryImage14,
  galleryImage15,
  galleryImage16,
} from "@/assets/fallback";

interface GalleryItemProps {
  item: GalleryItemType;
}

// Image mapping for premium gallery collection
const imageMap: Record<string, string> = {
  '/gallery/premium-1': galleryImage1,
  '/gallery/premium-2': galleryImage2,
  '/gallery/premium-3': galleryImage3,
  '/gallery/premium-4': galleryImage4,
  '/gallery/premium-5': galleryImage5,
  '/gallery/premium-6': galleryImage6,
  '/gallery/premium-7': galleryImage7,
  '/gallery/premium-8': galleryImage8,
  '/gallery/premium-9': galleryImage9,
  '/gallery/premium-10': galleryImage10,
  '/gallery/premium-11': galleryImage11,
  '/gallery/premium-12': galleryImage12,
  '/gallery/premium-13': galleryImage13,
  '/gallery/premium-14': galleryImage14,
  '/gallery/premium-15': galleryImage15,
  '/gallery/premium-16': galleryImage16,
};

const GalleryItem = ({ item }: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get the actual image URL from the mapping, or fallback to the original URL
  const imageUrl = imageMap[item.imageUrl] || item.imageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="gallery-item group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-80">
          <div className="w-full h-full overflow-hidden">
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
            />
          </div>
          
          {/* Premium overlay with golden accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Golden border effect */}
          <div className="absolute inset-0 border border-[#D5B36A]/20 group-hover:border-[#D5B36A]/60 transition-all duration-500 rounded-xl"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2 text-shadow drop-shadow-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-200 drop-shadow">
                {item.description}
              </p>
            </div>
          </div>

          {/* Premium badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D5B36A] to-[#E6C988] text-black px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            PREMIUM
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-black/95 border-[#D5B36A]/30">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={item.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          
          {/* Image info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2 text-[#D5B36A]">
                {item.title}
              </h2>
              <p className="text-gray-200 text-lg">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItem;