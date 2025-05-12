import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import useMobile from "@/hooks/use-mobile";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseSheet = () => {
    setSheetOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <span className="font-display text-2xl md:text-3xl font-semibold text-primary">
                  Elegant<span className="text-secondary">Drapes</span>
                </span>
              </a>
            </Link>
          </div>

          {isMobile ? (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col space-y-3 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-xl font-semibold text-primary">
                      Elegant<span className="text-secondary">Drapes</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseSheet}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`font-body py-2 border-b border-neutral-200 ${
                          isActive(item.href)
                            ? "text-accent font-medium"
                            : "text-text-dark"
                        }`}
                        onClick={handleCloseSheet}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/quote">
                    <a className="mt-4">
                      <Button
                        className="w-full bg-secondary hover:bg-accent"
                        onClick={handleCloseSheet}
                      >
                        Get Quote
                      </Button>
                    </a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`font-body ${
                      isActive(item.href)
                        ? "text-accent font-medium"
                        : "text-text-dark hover:text-accent"
                    } transition-colors`}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <Link href="/quote">
                <a>
                  <Button className="bg-secondary hover:bg-accent">
                    Get Quote
                  </Button>
                </a>
              </Link>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
