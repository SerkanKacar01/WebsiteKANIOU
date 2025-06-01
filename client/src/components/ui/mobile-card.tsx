import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MobileCard = ({ children, className, onClick }: MobileCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100 p-4 active:scale-[0.98] transition-transform duration-100",
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MobileCard;