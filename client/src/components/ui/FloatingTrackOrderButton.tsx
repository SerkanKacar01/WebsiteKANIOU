import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const FloatingTrackOrderButton = () => {
  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-[9999]">
      <Link href="/track-order">
        <Button
          className="bg-[#D0B378] hover:bg-[#C5A565] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium"
          size="lg"
        >
          <Search className="h-4 w-4" />
          VOLG UW BESTELLING
        </Button>
      </Link>
    </div>
  );
};

export default FloatingTrackOrderButton;
