import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import useMobile from "@/hooks/use-mobile";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const productCategories = products.map(product => {
    const slug = product.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    
    return {
      label: product.name,
      href: `/producten/${slug}`,
      id: product.id
    };
  });

  const mainNavItems = [
    { 
      label: "COLLECTIE", 
      href: "/collectie",
      hasDropdown: true,
      dropdownItems: productCategories
    },
    { label: "HORREN", href: "/producten/horren", hasDropdown: true },
    { label: "GORDIJNEN", href: "/producten/gordijnen", hasDropdown: true },
    { label: "OPHANGSYSTEMEN", href: "/producten/ophangsystemen", hasDropdown: true },
    { label: "SCREENS", href: "/producten/screens", hasDropdown: true },
    { label: "VOUWGORDIJNEN", href: "/producten/vouwgordijnen", hasDropdown: true },
    { label: "HOUTEN SHUTTERS", href: "/producten/houten-shutters", hasDropdown: false },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setMobileMenuOpen(null);
  };

  const handleNavClick = () => {
    scrollToTop('instant');
  };

  const handleMobileNavClick = () => {
    scrollToTop('instant');
    handleCloseSheet();
  };

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const isCollectieActive = () => {
    return productCategories.some(product => location.startsWith(product.href));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white border-b border-gray-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <div 
                className="flex items-center cursor-pointer gap-3"
                onClick={() => scrollToTop('instant')}
              >
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-none">
                    KANIOU
                  </span>
                  <span className="text-[10px] md:text-xs text-[#C4A35A] font-medium tracking-wider leading-tight">
                    zilvernaald
                  </span>
                </div>
                <div className="hidden sm:block h-8 w-px bg-gray-300 mx-2"></div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs md:text-sm text-gray-700 font-medium leading-tight">
                    Gordijnen &
                  </span>
                  <span className="text-xs md:text-sm text-gray-700 font-medium leading-tight">
                    Zonweringen
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <NavigationMenu>
                <NavigationMenuList className="gap-0">
                  {/* COLLECTIE with Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C4A35A] ${
                        isCollectieActive()
                          ? "text-[#C4A35A]" 
                          : "text-gray-700 hover:text-[#C4A35A]"
                      }`}
                      data-testid="nav-collectie-dropdown"
                    >
                      COLLECTIE
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="grid grid-cols-2 gap-1 p-4 w-[450px] bg-white shadow-xl rounded-lg border border-gray-100">
                        {productsLoading ? (
                          <div className="col-span-2 p-4 text-center text-gray-500">
                            Laden...
                          </div>
                        ) : productCategories.length === 0 ? (
                          <div className="col-span-2 p-4 text-center text-gray-500">
                            Geen producten
                          </div>
                        ) : (
                          productCategories.map((product) => (
                            <Link key={product.href} href={product.href}>
                              <NavigationMenuLink
                                className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C4A35A]/10 hover:text-[#C4A35A] ${
                                  isActive(product.href)
                                    ? "bg-[#C4A35A]/5 text-[#C4A35A] font-medium"
                                    : "text-gray-700"
                                }`}
                                onClick={handleNavClick}
                                data-testid={`nav-product-${product.id}`}
                              >
                                <div className="text-sm font-medium">
                                  {product.label}
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          ))
                        )}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* HORREN with Dropdown indicator */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C4A35A] ${
                        isActive("/producten/horren")
                          ? "text-[#C4A35A]" 
                          : "text-gray-700 hover:text-[#C4A35A]"
                      }`}
                      data-testid="nav-horren-dropdown"
                    >
                      HORREN
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="p-4 w-[300px] bg-white shadow-xl rounded-lg border border-gray-100">
                        <Link href="/producten/horren">
                          <NavigationMenuLink
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C4A35A]/10 hover:text-[#C4A35A] text-gray-700"
                            onClick={handleNavClick}
                          >
                            <div className="text-sm font-medium">Bekijk Horren</div>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* GORDIJNEN with Dropdown indicator */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C4A35A] ${
                        isActive("/producten/gordijnen")
                          ? "text-[#C4A35A]" 
                          : "text-gray-700 hover:text-[#C4A35A]"
                      }`}
                      data-testid="nav-gordijnen-dropdown"
                    >
                      GORDIJNEN
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="p-4 w-[300px] bg-white shadow-xl rounded-lg border border-gray-100">
                        <Link href="/producten/gordijnen">
                          <NavigationMenuLink
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C4A35A]/10 hover:text-[#C4A35A] text-gray-700"
                            onClick={handleNavClick}
                          >
                            <div className="text-sm font-medium">Bekijk Gordijnen</div>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* OPHANGSYSTEMEN with Dropdown indicator */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C4A35A] ${
                        isActive("/producten/ophangsystemen")
                          ? "text-[#C4A35A]" 
                          : "text-gray-700 hover:text-[#C4A35A]"
                      }`}
                      data-testid="nav-ophangsystemen-dropdown"
                    >
                      OPHANGSYSTEMEN
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="p-4 w-[300px] bg-white shadow-xl rounded-lg border border-gray-100">
                        <Link href="/producten/ophangsystemen">
                          <NavigationMenuLink
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C4A35A]/10 hover:text-[#C4A35A] text-gray-700"
                            onClick={handleNavClick}
                          >
                            <div className="text-sm font-medium">Bekijk Ophangsystemen</div>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* SCREENS with Dropdown indicator */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C4A35A] ${
                        isActive("/producten/screens") || isActive("/screens")
                          ? "text-[#C4A35A]" 
                          : "text-gray-700 hover:text-[#C4A35A]"
                      }`}
                      data-testid="nav-screens-dropdown"
                    >
                      SCREENS
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="p-4 w-[300px] bg-white shadow-xl rounded-lg border border-gray-100">
                        <Link href="/producten/screens-inside">
                          <NavigationMenuLink
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C4A35A]/10 hover:text-[#C4A35A] text-gray-700"
                            onClick={handleNavClick}
                          >
                            <div className="text-sm font-medium">Screens Inside</div>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* VOUWGORDIJNEN with Dropdown indicator */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C4A35A] ${
                        isActive("/producten/vouwgordijnen")
                          ? "text-[#C4A35A]" 
                          : "text-gray-700 hover:text-[#C4A35A]"
                      }`}
                      data-testid="nav-vouwgordijnen-dropdown"
                    >
                      VOUWGORDIJNEN
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="p-4 w-[300px] bg-white shadow-xl rounded-lg border border-gray-100">
                        <Link href="/producten/vouwgordijnen">
                          <NavigationMenuLink
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C4A35A]/10 hover:text-[#C4A35A] text-gray-700"
                            onClick={handleNavClick}
                          >
                            <div className="text-sm font-medium">Bekijk Vouwgordijnen</div>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* HOUTEN SHUTTERS - no dropdown */}
                  <NavigationMenuItem>
                    <Link href="/producten/houten-shutters">
                      <div
                        className={`font-medium text-xs xl:text-sm px-2 xl:px-3 py-2 transition-colors cursor-pointer ${
                          isActive("/producten/houten-shutters")
                            ? "text-[#C4A35A]" 
                            : "text-gray-700 hover:text-[#C4A35A]"
                        }`}
                        onClick={handleNavClick}
                        data-testid="nav-houten-shutters"
                      >
                        HOUTEN SHUTTERS
                      </div>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* CTA Button */}
              <Link href="/offerte">
                <Button 
                  className="bg-[#C4A35A] hover:bg-[#B39245] text-white text-xs xl:text-sm font-semibold px-4 xl:px-6 py-2.5 h-10 transition-all duration-300 rounded-md ml-2"
                  onClick={handleNavClick}
                  data-testid="nav-offerte-button"
                >
                  OFFERTE AANVRAGEN
                </Button>
              </Link>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 min-h-[44px] min-w-[44px] text-gray-700 hover:text-[#C4A35A]"
                    data-testid="mobile-menu-button"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-[300px]">
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-gray-900 leading-none">KANIOU</span>
                          <span className="text-[9px] text-[#C4A35A] font-medium tracking-wider">zilvernaald</span>
                        </div>
                        <div className="h-6 w-px bg-gray-200 mx-1"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-600 leading-tight">Gordijnen &</span>
                          <span className="text-[10px] text-gray-600 leading-tight">Zonweringen</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCloseSheet}
                        className="h-8 w-8"
                        data-testid="mobile-menu-close"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Mobile Navigation Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {/* COLLECTIE */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileMenuOpen(mobileMenuOpen === 'collectie' ? null : 'collectie')}
                          className={`w-full flex items-center justify-between py-3 text-sm font-medium ${
                            isCollectieActive() ? "text-[#C4A35A]" : "text-gray-700"
                          }`}
                          data-testid="mobile-nav-collectie"
                        >
                          <span>COLLECTIE</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen === 'collectie' ? "rotate-180" : ""}`} />
                        </button>
                        {mobileMenuOpen === 'collectie' && (
                          <div className="pl-4 pb-3 space-y-1">
                            {productCategories.map((product) => (
                              <Link key={product.href} href={product.href}>
                                <a
                                  className={`block py-2 text-sm ${
                                    isActive(product.href) ? "text-[#C4A35A] font-medium" : "text-gray-600"
                                  }`}
                                  onClick={handleMobileNavClick}
                                >
                                  {product.label}
                                </a>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* HORREN */}
                      <div className="border-b border-gray-100">
                        <Link href="/producten/horren">
                          <a
                            className={`block py-3 text-sm font-medium ${
                              isActive("/producten/horren") ? "text-[#C4A35A]" : "text-gray-700"
                            }`}
                            onClick={handleMobileNavClick}
                          >
                            HORREN
                          </a>
                        </Link>
                      </div>

                      {/* GORDIJNEN */}
                      <div className="border-b border-gray-100">
                        <Link href="/producten/gordijnen">
                          <a
                            className={`block py-3 text-sm font-medium ${
                              isActive("/producten/gordijnen") ? "text-[#C4A35A]" : "text-gray-700"
                            }`}
                            onClick={handleMobileNavClick}
                          >
                            GORDIJNEN
                          </a>
                        </Link>
                      </div>

                      {/* OPHANGSYSTEMEN */}
                      <div className="border-b border-gray-100">
                        <Link href="/producten/ophangsystemen">
                          <a
                            className={`block py-3 text-sm font-medium ${
                              isActive("/producten/ophangsystemen") ? "text-[#C4A35A]" : "text-gray-700"
                            }`}
                            onClick={handleMobileNavClick}
                          >
                            OPHANGSYSTEMEN
                          </a>
                        </Link>
                      </div>

                      {/* SCREENS */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileMenuOpen(mobileMenuOpen === 'screens' ? null : 'screens')}
                          className={`w-full flex items-center justify-between py-3 text-sm font-medium ${
                            isActive("/producten/screens") ? "text-[#C4A35A]" : "text-gray-700"
                          }`}
                        >
                          <span>SCREENS</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen === 'screens' ? "rotate-180" : ""}`} />
                        </button>
                        {mobileMenuOpen === 'screens' && (
                          <div className="pl-4 pb-3">
                            <Link href="/producten/screens-inside">
                              <a
                                className={`block py-2 text-sm ${
                                  isActive("/producten/screens-inside") ? "text-[#C4A35A] font-medium" : "text-gray-600"
                                }`}
                                onClick={handleMobileNavClick}
                              >
                                Screens Inside
                              </a>
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* VOUWGORDIJNEN */}
                      <div className="border-b border-gray-100">
                        <Link href="/producten/vouwgordijnen">
                          <a
                            className={`block py-3 text-sm font-medium ${
                              isActive("/producten/vouwgordijnen") ? "text-[#C4A35A]" : "text-gray-700"
                            }`}
                            onClick={handleMobileNavClick}
                          >
                            VOUWGORDIJNEN
                          </a>
                        </Link>
                      </div>

                      {/* HOUTEN SHUTTERS */}
                      <div className="border-b border-gray-100">
                        <Link href="/producten/houten-shutters">
                          <a
                            className={`block py-3 text-sm font-medium ${
                              isActive("/producten/houten-shutters") ? "text-[#C4A35A]" : "text-gray-700"
                            }`}
                            onClick={handleMobileNavClick}
                          >
                            HOUTEN SHUTTERS
                          </a>
                        </Link>
                      </div>
                    </div>

                    {/* Mobile CTA */}
                    <div className="p-4 border-t border-gray-100">
                      <Link href="/offerte">
                        <Button
                          className="w-full bg-[#C4A35A] hover:bg-[#B39245] text-white font-semibold py-3 h-12"
                          onClick={handleMobileNavClick}
                          data-testid="mobile-nav-offerte"
                        >
                          OFFERTE AANVRAGEN
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
