import { ReactNode } from "react";
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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header for all pages */}
      {isMobile ? <MobileHeader /> : <Header />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer for all pages */}
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default MobileLayoutWrapper;