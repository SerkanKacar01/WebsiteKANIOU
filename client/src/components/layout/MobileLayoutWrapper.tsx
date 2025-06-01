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

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col">
        <MobileHeader />
        <main className="flex-1 pt-20 pb-4">
          {children}
        </main>
        <MobileFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MobileLayoutWrapper;