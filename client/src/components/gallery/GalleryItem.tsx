import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
type GalleryItemType = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: number;
};

interface GalleryItemProps {
  item: GalleryItemType;
}

const imageMap: Record<string, string> = {};

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
