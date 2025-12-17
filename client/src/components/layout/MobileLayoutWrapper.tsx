import { ReactNode } from "react";
import { useLocation } from "wouter";
import useMobile from "@/hooks/use-mobile";
import Header from "./Header";
import Footer from "./Footer";
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";

interface MobileLayoutWrapperProps {
  children: ReactNode;
}

const MobileLayoutWrapper = ({ children }: MobileLayoutWrapperProps) => {
  const isMobile = useMobile();
  const [location] = useLocation();
  
  // Don't show header on admin pages or special routes
  const isAdminPage = location.includes('/admin') || location.includes('/entrepreneur-dashboard') || location.includes('/kaniouzilvernaald-dashboard');
  const showHeader = !isAdminPage;

  return (
    <div className="flex min-h-screen flex-col w-full">
      {showHeader && (
        <div className="w-full">
          <Header />
        </div>
      )}
      <main className="flex-1 w-full">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MobileLayoutWrapper;