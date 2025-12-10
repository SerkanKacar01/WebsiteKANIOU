import { useState } from "react";
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
  galleryImage17,
  galleryImage18,
  galleryImage19,
  galleryImage20,
  galleryImage21,
  galleryImage22,
  galleryImage23,
  galleryImage24,
  galleryImage25,
  galleryImage26,
  galleryImage27,
  galleryImage28,
  galleryImage29,
  galleryImage30,
  galleryImage31,
  galleryImage32,
  galleryImage33,
  galleryImage34,
  galleryImage35,
  galleryImage36,
  galleryImage37,
  galleryImage38,
  galleryImage39,
  galleryImage40,
} from "@/assets/fallback";

interface GalleryItemProps {
  item: GalleryItemType;
}

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
  '/gallery/premium-17': galleryImage17,
  '/gallery/premium-18': galleryImage18,
  '/gallery/premium-19': galleryImage19,
  '/gallery/premium-20': galleryImage20,
  '/gallery/premium-21': galleryImage21,
  '/gallery/premium-22': galleryImage22,
  '/gallery/premium-23': galleryImage23,
  '/gallery/premium-24': galleryImage24,
  '/gallery/premium-25': galleryImage25,
  '/gallery/premium-26': galleryImage26,
  '/gallery/premium-27': galleryImage27,
  '/gallery/premium-28': galleryImage28,
  '/gallery/premium-29': galleryImage29,
  '/gallery/premium-30': galleryImage30,
  '/gallery/premium-31': galleryImage31,
  '/gallery/premium-32': galleryImage32,
  '/gallery/premium-33': galleryImage33,
  '/gallery/premium-34': galleryImage34,
  '/gallery/premium-35': galleryImage35,
  '/gallery/premium-36': galleryImage36,
  '/gallery/premium-37': galleryImage37,
  '/gallery/premium-38': galleryImage38,
  '/gallery/premium-39': galleryImage39,
  '/gallery/premium-40': galleryImage40,
};

const GalleryItem = ({ item }: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const imageUrl = imageMap[item.imageUrl] || item.imageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="gallery-item group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-80">
          <div className="w-full h-full overflow-hidden">
            <img
              src={imageUrl}
              alt="Realisatie"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
            />
          </div>
          
          <div className="absolute inset-0 border border-[#D5B36A]/20 group-hover:border-[#D5B36A]/60 transition-all duration-500 rounded-xl"></div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-black/95 border-[#D5B36A]/30">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt="Realisatie"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItem;
