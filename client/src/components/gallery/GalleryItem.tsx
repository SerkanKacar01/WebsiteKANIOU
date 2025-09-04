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
  galleryImage_IMG9320,
  galleryImage_IMG9321,
  galleryImage_IMG9272,
  galleryImage_IMG9237,
  galleryImage_IMG9236,
  galleryImage_IMG9235,
  galleryImage_IMG9233,
  galleryImage_IMG9230,
  galleryImage_IMG9231,
  galleryImage_IMG9232,
  galleryImage_IMG9228,
  galleryImage_IMG9227,
  galleryImage_IMG9222,
  galleryImage_IMG9221,
  galleryImage_IMG9220,
  galleryImage_IMG9217,
  galleryImage_IMG9204,
  galleryImage_IMG9192,
  galleryImage_new1,
  galleryImage_new2,
  galleryImage_new3,
  galleryImage_new4,
  galleryImage_new5,
  galleryImage_new6,
  galleryImage_premium1,
  galleryImage_premium2,
  galleryImage_premium3,
  galleryImage_premium4,
  galleryImage_premium5,
  galleryImage_premium6,
  galleryImage_luxury1,
  galleryImage_luxury2,
  galleryImage_luxury3,
  galleryImage_luxury4,
  galleryImage_luxury5,
} from "@/assets/fallback";

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
  '/src/assets/IMG_9320.png': galleryImage_IMG9320,
  '/src/assets/IMG_9321.jpeg': galleryImage_IMG9321,
  '/src/assets/IMG_9272.jpeg': galleryImage_IMG9272,
  '/src/assets/IMG_9237.jpeg': galleryImage_IMG9237,
  '/src/assets/IMG_9236.jpeg': galleryImage_IMG9236,
  '/src/assets/IMG_9235.jpeg': galleryImage_IMG9235,
  '/src/assets/IMG_9233.jpeg': galleryImage_IMG9233,
  '/src/assets/IMG_9230.jpeg': galleryImage_IMG9230,
  '/src/assets/IMG_9231.jpeg': galleryImage_IMG9231,
  '/src/assets/IMG_9232.jpeg': galleryImage_IMG9232,
  '/src/assets/IMG_9228.jpeg': galleryImage_IMG9228,
  '/src/assets/IMG_9227.jpeg': galleryImage_IMG9227,
  '/src/assets/IMG_9222.jpeg': galleryImage_IMG9222,
  '/src/assets/IMG_9221.jpeg': galleryImage_IMG9221,
  '/src/assets/IMG_9220.jpeg': galleryImage_IMG9220,
  '/src/assets/IMG_9217.jpeg': galleryImage_IMG9217,
  '/src/assets/IMG_9204.jpeg': galleryImage_IMG9204,
  '/src/assets/IMG_9192.jpeg': galleryImage_IMG9192,
  // High-end gallery images - First batch
  '/assets/new-gallery-1': galleryImage_new1,
  '/assets/new-gallery-2': galleryImage_new2,
  '/assets/new-gallery-3': galleryImage_new3,
  '/assets/new-gallery-4': galleryImage_new4,
  '/assets/new-gallery-5': galleryImage_new5,
  '/assets/new-gallery-6': galleryImage_new6,
  // Premium gallery images - Second batch
  '/assets/premium-gallery-1': galleryImage_premium1,
  '/assets/premium-gallery-2': galleryImage_premium2,
  '/assets/premium-gallery-3': galleryImage_premium3,
  '/assets/premium-gallery-4': galleryImage_premium4,
  '/assets/premium-gallery-5': galleryImage_premium5,
  '/assets/premium-gallery-6': galleryImage_premium6,
  // Luxury gallery images - Third batch
  '/assets/luxury-gallery-1': galleryImage_luxury1,
  '/assets/luxury-gallery-2': galleryImage_luxury2,
  '/assets/luxury-gallery-3': galleryImage_luxury3,
  '/assets/luxury-gallery-4': galleryImage_luxury4,
  '/assets/luxury-gallery-5': galleryImage_luxury5,
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
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-xl transition-all duration-500"></div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-display text-lg font-semibold mb-1 text-shadow">
              {item.title}
            </h3>
            <p className="font-body text-sm opacity-90 line-clamp-2">
              {item.description}
            </p>
          </div>
          
          {/* Premium indicator */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-5xl p-0 overflow-hidden bg-black/95 border-yellow-400/20">
        <div className="relative">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full object-contain max-h-[85vh] mx-auto"
          />
          
          {/* Enhanced modal overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="font-display text-2xl text-white font-semibold mb-3 text-shadow-lg">
                {item.title}
              </h3>
              <p className="font-body text-white/90 text-base leading-relaxed">
                {item.description}
              </p>
              
              {/* Premium badge */}
              <div className="inline-flex items-center mt-4 px-3 py-1 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-yellow-400 text-xs font-medium uppercase tracking-wide">Premium Kwaliteit</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItem;
