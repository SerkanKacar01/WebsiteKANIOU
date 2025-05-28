import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import NewsletterSignup from "./NewsletterSignup";
import { kaniouLogo } from "@/assets";

const productCategories = [
  { label: "Overgordijnen", href: "/products/overgordijnen" },
  { label: "Vitrages", href: "/products/vitrages" },
  { label: "Rolgordijnen", href: "/products/rolgordijnen" },
  { label: "Vouwgordijnen", href: "/products/vouwgordijnen" },
  { label: "Duo rolgordijnen", href: "/products/duo-rolgordijnen" },
  { label: "Textiel lamellen", href: "/products/textiel-lamellen" },
  { label: "Kunststof lamellen", href: "/products/kunststof-lamellen" },
  { label: "Houten jaloezieën", href: "/products/houten-jaloezieen" },
  { label: "Kunststof jaloezieën", href: "/products/kunststof-jaloezieen" },
  { label: "Houten shutters", href: "/products/houten-shutters" },
  { label: "Inzethorren", href: "/products/inzethorren" },
  { label: "Opzethorren", href: "/products/opzethorren" },
  { label: "Plissé hordeuren", href: "/products/plisse-hordeuren" },
  { label: "Plissé", href: "/products/plisse" },
  { label: "Duo plissé", href: "/products/duo-plisse" },
  {
    label: "Dakraam zonweringen (Fakro, Velux)",
    href: "/products/dakraam-zonwering",
  },
  { label: "Gordijnrails", href: "/products/gordijnrails" },
  { label: "Gordijnroedes", href: "/products/gordijnroedes" },
  { label: "SQUID textiel folie", href: "/products/squid" },
];

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const { t } = useLanguage();

  // Define navigation items
  const navItems = [
    { label: t("PRODUCTEN"), href: "/producten", hasDropdown: true },
    { label: t("GALLERIJ"), href: "/gallerij" },
    { label: t("OVER ONS"), href: "/overons" },
    { label: t("CONTACT"), href: "/contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setShowMobileSubmenu(false);
  };

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileSubmenu = () => {
    setShowMobileSubmenu(!showMobileSubmenu);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white md:py-1.5 py-1 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src={kaniouLogo}
                  alt="KANIOU zilvernaald"
                  className="h-12 md:h-14"
                />
              </div>
            </Link>
          </div>

          {isMobile ? (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary p-1"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col space-y-3 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <img
                        src={kaniouLogo}
                        alt="KANIOU zilvernaald"
                        className="h-10"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseSheet}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {navItems.map((item) =>
                    item.hasDropdown ? (
                      <div
                        key={item.href}
                        className="py-2 border-b border-neutral-200"
                      >
                        <div
                          className={`font-body flex items-center justify-between py-2 ${
                            isActive(item.href)
                              ? "text-accent font-medium"
                              : "text-text-dark"
                          } cursor-pointer text-base`}
                          onClick={toggleMobileSubmenu}
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-5 w-5 ml-1 transition-transform ${showMobileSubmenu ? "rotate-180" : ""}`}
                          />
                        </div>

                        {showMobileSubmenu && (
                          <div className="mt-3 ml-2 space-y-1 max-h-80 overflow-y-auto border-l-2 border-neutral-200 pl-3">
                            {productCategories.map((category) => (
                              <div key={category.href}>
                                <Link href={category.href}>
                                  <div
                                    className="font-body text-sm block py-2.5 text-text-dark hover:text-accent transition-colors cursor-pointer"
                                    onClick={handleCloseSheet}
                                  >
                                    {category.label}
                                  </div>
                                </Link>
                              </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-neutral-200">
                              <div>
                                <Link href="/products">
                                  <div
                                    className="font-body text-sm block py-1.5 text-accent font-medium cursor-pointer"
                                    onClick={handleCloseSheet}
                                  >
                                    View All Products
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href}>
                        <a
                          className={`font-body py-3 border-b border-neutral-200 block text-base ${
                            isActive(item.href)
                              ? "text-accent font-medium"
                              : "text-text-dark"
                          }`}
                          onClick={handleCloseSheet}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ),
                  )}

                  <div className="mt-4 space-y-3">
                    <NewsletterSignup variant="default">
                      <Button
                        variant="outline"
                        className="w-full border-amber-500 text-amber-600 hover:bg-amber-50"
                        onClick={handleCloseSheet}
                      >
                        Acties & Kortingen
                      </Button>
                    </NewsletterSignup>
                    <Link href="/quote">
                      <a>
                        <Button
                          className="w-full bg-secondary hover:bg-accent"
                          onClick={handleCloseSheet}
                        >
                          {t("OFFERTE AANVRAGEN")}
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <div
                      className={`font-body text-sm flex items-center cursor-pointer ${
                        isActive(item.href) || showDropdown
                          ? "text-accent font-medium"
                          : "text-text-dark hover:text-accent"
                      } transition-colors`}
                      onClick={toggleDropdown}
                      onMouseEnter={() => setShowDropdown(true)}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3 w-3 ml-1 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                      />
                    </div>

                    {showDropdown && (
                      <div
                        className="absolute left-0 mt-2 w-64 bg-white rounded-md py-2 z-[100] max-h-96 overflow-y-auto dropdown-menu shadow-md"
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        {productCategories.map((category) => (
                          <div
                            key={category.href}
                            className="dropdown-menu-item"
                          >
                            <Link href={category.href}>
                              <div className="block px-4 py-2 text-sm text-text-dark hover:text-accent cursor-pointer">
                                {category.label}
                              </div>
                            </Link>
                          </div>
                        ))}
                        <div className="border-t border-neutral-200 mt-2 pt-2">
                          <div className="dropdown-menu-item">
                            <Link href="/products">
                              <div className="block px-4 py-2 text-sm text-accent font-medium cursor-pointer">
                                View All Products
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`font-body text-sm ${
                        isActive(item.href)
                          ? "text-accent font-medium"
                          : "text-text-dark hover:text-accent"
                      } transition-colors cursor-pointer`}
                    >
                      {item.label}
                    </div>
                  </Link>
                ),
              )}
              <div className="flex items-center gap-3">
                <NewsletterSignup variant="header" />
                <Link href="/quote">
                  <Button className="bg-secondary hover:bg-accent text-xs md:text-xs px-3 py-1 h-8">
                    {t("OFFERTE AANVRAGEN")}
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
