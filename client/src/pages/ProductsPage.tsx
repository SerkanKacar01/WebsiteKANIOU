import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import gordijnrailsImage from "@assets/Ontwerp zonder titel (4)_1750199510374.png";
import squidCoverImage from "@assets/SQUID cover_1750792481675.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import {
  ArrowRight,
  Star,
  Eye,
  Ruler,
  Palette,
  Filter,
  SortAsc,
  Settings,
  RotateCcw,
  Search,
  X,
  Maximize2,
  Move,
  RotateCw,
  Sparkles,
  Heart,
  ShoppingCart,
  Info,
} from "lucide-react";

const ProductsPage = () => {
  const { t } = useLanguage();
  const [selectedSort, setSelectedSort] = useState("meest-gekozen");
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("kaniou-selected-category") || "alles";
    }
    return "alles";
  });
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [hasSavedPreferences, setHasSavedPreferences] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSizeComparison, setShowSizeComparison] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedProductGroup, setSelectedProductGroup] = useState<
    string | null
  >(null);

  // Handle URL parameters for filtering
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get("filter");
      
      if (filterParam === "squid") {
        setSelectedCategory("squid");
        setIsFilterLoading(true);
        
        // Scroll to SQUID section after products load
        setTimeout(() => {
          const squidSection = document.querySelector("[data-squid-section]");
          
          if (squidSection) {
            squidSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          setIsFilterLoading(false);
        }, 800);
      }
    }
  }, []);

  // Load user preferences from localStorage on component mount
  useEffect(() => {
    const savedSort = localStorage.getItem("kaniou-preferred-sort");
    const savedCategory = localStorage.getItem("kaniou-preferred-category");

    if (savedSort || savedCategory) {
      setHasSavedPreferences(true);
    }

    if (savedSort) {
      setSelectedSort(savedSort);
    }
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  // Save user preferences to localStorage when they change
  useEffect(() => {
    if (hasSavedPreferences || selectedSort !== "meest-gekozen") {
      localStorage.setItem("kaniou-preferred-sort", selectedSort);
      setHasSavedPreferences(true);
      setShowSaveIndicator(true);
      const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedSort, hasSavedPreferences]);

  useEffect(() => {
    if (hasSavedPreferences || selectedCategory !== "alles") {
      localStorage.setItem("kaniou-preferred-category", selectedCategory);
      setHasSavedPreferences(true);
      setShowSaveIndicator(true);
      const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, hasSavedPreferences]);

  // Reset preferences to default
  const resetPreferences = () => {
    if (
      window.confirm(
        "Weet u zeker dat u uw opgeslagen voorkeuren wilt resetten naar de standaardwaarden?",
      )
    ) {
      setSelectedSort("meest-gekozen");
      setSelectedCategory("alles");
      setHasSavedPreferences(false);
      localStorage.removeItem("kaniou-preferred-sort");
      localStorage.removeItem("kaniou-preferred-category");
    }
  };

  // Handle filter changes with loading state
  const handleSortChange = (value: string) => {
    setIsFilterLoading(true);
    setSelectedSort(value);
    setTimeout(() => setIsFilterLoading(false), 300);
  };

  const handleCategoryChange = (value: string) => {
    setIsFilterLoading(true);
    setSelectedCategory(value);
    setTimeout(() => setIsFilterLoading(false), 300);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setIsFilterLoading(true);
      setTimeout(() => setIsFilterLoading(false), 300);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsFilterLoading(true);
    setTimeout(() => setIsFilterLoading(false), 300);
  };

  // Category button handler with auto-scroll and filtering
  const handleCategoryButtonClick = (categoryId: string) => {
    setIsFilterLoading(true);
    setSelectedCategory(categoryId);

    // Save selected category to localStorage
    localStorage.setItem("kaniou-selected-category", categoryId);

    // Auto-scroll to product view if user is far down the page
    const productSection = document.querySelector(".product-grid-section");
    if (productSection && window.scrollY > 400) {
      productSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setTimeout(() => setIsFilterLoading(false), 300);
  };

  // Size comparison functions
  const addToComparison = (product: any) => {
    if (
      comparisonProducts.length < 3 &&
      !comparisonProducts.find((p) => p.id === product.id)
    ) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparisonProducts(comparisonProducts.filter((p) => p.id !== productId));
  };

  const openSizeComparison = () => {
    setShowSizeComparison(true);
  };

  const closeSizeComparison = () => {
    setShowSizeComparison(false);
  };

  const clearAllComparisons = () => {
    setComparisonProducts([]);
  };

  // Size Comparison Overlay Component
  const SizeComparisonOverlay = () => {
    if (!showSizeComparison) return null;

    const maxWidth = Math.max(
      ...comparisonProducts.map((p) => p.dimensions?.width || 120),
    );
    const maxHeight = Math.max(
      ...comparisonProducts.map((p) => p.dimensions?.height || 150),
    );
    const scale = Math.min(300 / maxWidth, 200 / maxHeight, 1);

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Afmetingen Vergelijken
                </h2>
                <p className="text-gray-600 mt-1">
                  Vergelijk de afmetingen van uw geselecteerde producten
                </p>
              </div>
              <button
                onClick={closeSizeComparison}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {comparisonProducts.length === 0 ? (
              <div className="text-center py-12">
                <Ruler className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  Geen producten geselecteerd voor vergelijking
                </p>
                <p className="text-gray-400 text-sm">
                  Voeg producten toe om hun afmetingen te vergelijken
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Visual Comparison */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-lg font-semibold mb-6 text-center">
                    Visuele Vergelijking
                  </h3>
                  <div className="flex items-end justify-center gap-8 min-h-[300px]">
                    {comparisonProducts.map((product, index) => {
                      const width = (product.dimensions?.width || 120) * scale;
                      const height =
                        (product.dimensions?.height || 150) * scale;
                      const colors = [
                        "bg-[#d5c096]",
                        "bg-blue-400",
                        "bg-green-400",
                      ];

                      return (
                        <div
                          key={product.id}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={`${colors[index]} border-2 border-white shadow-lg rounded-lg flex items-center justify-center relative`}
                            style={{
                              width: `${width}px`,
                              height: `${height}px`,
                            }}
                          >
                            <div className="text-white text-xs font-medium text-center p-2">
                              {product.title}
                            </div>
                            <button
                              onClick={() => removeFromComparison(product.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 text-center">
                            {product.dimensions?.width || 120} ×{" "}
                            {product.dimensions?.height || 150} cm
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Comparison Table */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b border-gray-200">
                    Gedetailleerde Afmetingen
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Product
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                            Breedte (cm)
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                            Hoogte (cm)
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                            Dikte (cm)
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                            Oppervlak (m²)
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                            Actie
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {comparisonProducts.map((product, index) => {
                          const width = product.dimensions?.width || 120;
                          const height = product.dimensions?.height || 150;
                          const depth = product.dimensions?.depth || 2.5;
                          const area = ((width * height) / 10000).toFixed(2);

                          return (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="font-medium text-gray-900">
                                  {product.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.subtitle}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">
                                {width}
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">
                                {height}
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">
                                {depth}
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">
                                {area}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() =>
                                    removeFromComparison(product.id)
                                  }
                                  className="text-red-600 hover:text-red-800 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={clearAllComparisons}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Wis alle vergelijkingen
                  </Button>
                  <Button
                    onClick={closeSizeComparison}
                    className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                  >
                    Sluiten
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Product Card Skeleton Component with shimmer effect
  const ProductSkeleton = () => (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#d5c096]/20 relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-3 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-4 w-3/4 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="w-full h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  );

  // Product categories organized by main groups
  const productCategories = {
    jaloezien: [
      {
        id: 1,
        title: "Houten Jaloezieën",
        subtitle: "Natuurlijke warmte & elegantie",
        description:
          "Tijdloze houten jaloezieën die warmte en stijl toevoegen aan elke ruimte.",
        image:
          "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
        products: [
          {
            name: "Houten Jaloezie 50mm",
            price: "€ 179",
            popular: false,
          },
        ],

        href: "/products/houten-jaloezieen",
        badge: "Bestseller",
      },
      {
        id: 2,
        title: "Kunststof Jaloezieën",
        subtitle: "Praktisch & vochtbestendig",
        description:
          "Onderhoudsvriendelijke kunststof jaloezieën, perfect voor vochtige ruimtes.",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        products: [
          {},
          {
            name: "Kunststof Jaloezie 35 mm (Basic met Ladderkoord)",
            price: "v.a € 110",
            popular: false,
          },
          {
            name: "Kunststof Jaloezie 50 mm (Basic met Ladderkoord)",
            price: "v.a € 110",
            popular: false,
          },
          {},
        ],
        href: "/products/kunststof-jaloezieen",
        badge: "Vochtbestendig",
      },
    ],
    rolgordijnen: [
      {
        id: 3,
        title: "Rolgordijnen",
        subtitle: "Praktisch & stijlvol",
        description: "Hoogwaardige rolgordijnen voor elke ruimte en smaak.",
        image:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
        products: [
          {
            name: "Rolgordijn Verduisterend",
            price: "€89,95",
            popular: true,
            width: 200,
            height: 250,
            thickness: 0.8,
          },
          {
            name: "Rolgordijn Semi-transparant",
            price: "€69,95",
            popular: false,
            width: 200,
            height: 250,
            thickness: 0.5,
          },
          {
            name: "Rolgordijn op Maat",
            price: "€129,95",
            popular: false,
            width: 300,
            height: 280,
            thickness: 1.2,
          },
        ],
        dimensions: { width: 200, height: 250, depth: 0.8 },
        href: "/products/rolgordijnen",
        badge: "Populair",
      },
    ],
    vitrages: [
      {
        id: 4,
        title: "Vitrages",
        subtitle: "Licht & privacy",
        description:
          "Subtiele vitrages die licht doorlaten terwijl ze privacy bieden.",
        image:
          "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=400&h=300&fit=crop",
        products: [
          {
            name: "Vitrage Gordijn Wit",
            price: "€34,95",
            popular: true,
            width: 150,
            height: 200,
            thickness: 0.3,
          },
          {
            name: "Vitrage Gordijn Crème",
            price: "€34,95",
            popular: false,
            width: 150,
            height: 200,
            thickness: 0.3,
          },
          {
            name: "Vitrage met Patroon",
            price: "€44,95",
            popular: false,
            width: 160,
            height: 210,
            thickness: 0.4,
          },
        ],
        dimensions: { width: 150, height: 200, depth: 0.3 },
        href: "/products/vitrages",
        badge: "Lichtdoorlatend",
      },
    ],
    shutters: [
      {
        id: 8,
        title: "Shutters",
        subtitle: "Klassiek & duurzaam",
        description:
          "Hoogwaardige shutters voor tijdloze elegantie en lichtcontrole.",
        image:
          "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop",
        products: [
          {
            name: "Houten Shutters",
            price: "€189,95",
            popular: true,
            width: 120,
            height: 200,
            thickness: 2.5,
          },
          {
            name: "PVC Shutters",
            price: "€149,95",
            popular: false,
            width: 120,
            height: 200,
            thickness: 2.0,
          },
          {
            name: "Plantation Shutters",
            price: "€229,95",
            popular: false,
            width: 140,
            height: 220,
            thickness: 3.0,
          },
        ],
        dimensions: { width: 120, height: 200, depth: 2.5 },
        href: "/products/shutters",
        badge: "Premium",
      },
    ],
    plisses: [
      {
        id: 5,
        title: "Plissé Gordijnen",
        subtitle: "Modern & veelzijdig",
        description:
          "Stijlvolle plissé gordijnen die perfect passen in moderne interieurs.",
        image:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
        products: [
          {
            name: "Plissé Transparant",
            price: "€45,95",
            popular: false,
            width: 100,
            height: 120,
            thickness: 2.0,
          },
          {
            name: "Plissé Verduisterend",
            price: "€65,95",
            popular: true,
            width: 100,
            height: 120,
            thickness: 2.2,
          },
          {
            name: "Plissé Isolerend",
            price: "€55,95",
            popular: false,
            width: 100,
            height: 120,
            thickness: 2.8,
          },
        ],
        dimensions: { width: 100, height: 120, depth: 2.0 },
        href: "/products/plisse",
        badge: "Energie-efficiënt",
      },
      {
        id: 6,
        title: "Opzethorren",
        subtitle: "Insectenwering & ventilatie",
        description:
          "Effectieve insectenwering zonder in te boeten op ventilatie en zicht.",
        image:
          "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop",
        products: [
          {
            name: "Opzethor Standaard",
            price: "€79,95",
            popular: true,
          },
          {
            name: "Opzethor Deluxe",
            price: "€99,95",
            popular: false,
          },
          {
            name: "Opzethor XXL",
            price: "€119,95",
          },
        ],
        dimensions: { width: 80, height: 100, depth: 1.5 },
        href: "/products/opzethorren",
        badge: "Nieuw",
      },
    ],
    // TEMPORARILY REMOVED - horren section can be restored later by Serkan
    horren: [] as any[], // Empty array to maintain type compatibility
    // horren: [
    //   {
    //     id: 9,
    //     title: "Horren",
    //     subtitle: "Insectenwering & frisse lucht",
    //     description:
    //       "Hoogwaardige horren die insecten buiten houden en tegelijkertijd frisse lucht binnenlaten.",
    //     image:
    //       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    //     products: [
    //       {
    //         name: "Inzethorren",
    //         price: " v.a € 45",
    //         popular: true,
    //       },
    //       {
    //         name: "Opzethorren",
    //         price: "v.a € 45",
    //         popular: false,
    //       },
    //       {
    //         name: "Plissé Hordeur",
    //         price: "v.a € 165",
    //         popular: false,
    //       },
    //     ],

    //     href: "/producten/horren",
    //     badge: "Essential",
    //   },
    // ],
    accessoires: [
      {
        id: 6,
        title: "Rolgordijnen",
        subtitle: "Verduisterend, stijlvol en volledig op maat",
        description:
          "Verduisterend, stijlvol en volledig op maat. Beschikbaar in diverse stoffen en systemen.",
        image:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
        products: [
          {
            name: "Rolgordijn Verduisterend",
            price: "v.a. € 89,95",
            popular: true,
          },
          {
            name: "Rolgordijn Semi-transparant",
            price: "v.a. € 69,95",
            popular: true,
          },
          {
            name: "Rolgordijn Transparant",
            price: "v.a. € 59,95",
            popular: false,
          },
          {
            name: "Rolgordijn Op Maat",
            price: "v.a. € 99,95",
            popular: false,
          },
        ],
        href: "/producten/rolgordijnen/configurator",
        badge: "Op Maat",
      },
      {
        id: 7,
        title: "Gordijnroedes",
        subtitle: "Stijlvolle ophangingen",
        description:
          "Hoogwaardige gordijnroedes in verschillende stijlen en materialen.",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        products: [
          { name: "Aluminium Roede", price: "€29,95", popular: true },
          { name: "Houten Roede", price: "€49,95", popular: false },
          { name: "RVS Roede", price: "€39,95", popular: false },
        ],
        href: "/products/gordijnroedes",
        badge: "Compleet",
      },
      {
        id: 8,
        title: "Gordijnrails",
        subtitle:
          "KS & DS profielen (verkrijgbaar in wit [ mat ] of zwart [ mat ])",
        description:
          "Onze gordijnrails combineren stijl met functionaliteit en worden op maat gemaakt voor elk type gordijn. Ideaal voor zowel particuliere als zakelijke toepassingen.",
        image: gordijnrailsImage,
        products: [
          {
            name: "Gordijnrail KS - Wit",
            price: "v.a. € 9,95 per meter",
            popular: true,
          },
          {
            name: "Gordijnrail KS - Zwart",
            price: "v.a. € 9,95 per meter",
            popular: true,
          },
          {
            name: "Gordijnrail DS - Wit",
            price: "v.a. € 11,95 per meter",
            popular: false,
          },
          {
            name: "Gordijnrail DS - Zwart",
            price: "v.a. € 11,95 per meter",
            popular: false,
          },
        ],
        href: "/producten/gordijnrails/configurator",
        badge: "Op Maat",
      },
      {
        id: 10,
        title: "SQUID Textile Foil",
        subtitle: "Elegant Privacy with a Natural Look",
        description:
          "Squid is a self-adhesive transparent textile that lets daylight in, but blocks unwanted views from outside. It gives your windows a warm, linen-like appearance while maintaining privacy during the day.",
        image: squidCoverImage,
        products: [
          {
            name: "SQUID Chalk",
            price: "€34,95",
            popular: true,
            width: 100,
            height: 150,
            thickness: 0.1,
          },
          {
            name: "SQUID Oak",
            price: "€34,95",
            popular: true,
            width: 100,
            height: 150,
            thickness: 0.1,
          },
          {
            name: "SQUID Ash",
            price: "€34,95",
            popular: false,
            width: 100,
            height: 150,
            thickness: 0.1,
          },
          {
            name: "SQUID Rock",
            price: "€34,95",
            popular: false,
            width: 100,
            height: 150,
            thickness: 0.1,
          },
          {
            name: "SQUID Coal",
            price: "€34,95",
            popular: false,
            width: 100,
            height: 150,
            thickness: 0.1,
          },
        ],
        dimensions: { width: 100, height: 150, depth: 0.1 },
        href: "/producten/squid",
        badge: "Premium",
        isSquid: true,
      },
    ],
  };

  const features = [
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Op Maat Gemaakt",
      description: "Alle producten worden exact op uw maten geproduceerd",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Virtuele Preview",
      description: "Bekijk hoe uw raamdecoratie eruitziet voordat u bestelt",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Kleuradvies",
      description: "Gratis kleuradvies passend bij uw interieur",
    },
  ];

  // Filter and sort products based on selections
  const getFilteredAndSortedProducts = () => {
    let allProducts: any[] = [];

    // Flatten all products based on category filter
    if (selectedCategory === "alles") {
      allProducts = [
        // horren temporarily excluded
        // rolgordijnen temporarily excluded - coming soon
        ...productCategories.accessoires.filter(item => item.title !== "Rolgordijnen"),
      ];
    } else if (selectedCategory === "horren") {
      allProducts = []; // Empty - horren temporarily hidden
    } else if (selectedCategory === "rolgordijnen") {
      allProducts = []; // Empty - rolgordijnen temporarily hidden - coming soon
    } else if (selectedCategory === "gordijnrails") {
      allProducts = productCategories.accessoires.filter(
        (item) => item.title === "Gordijnrails",
      );
    } else if (selectedCategory === "squid") {
      allProducts = productCategories.accessoires.filter(
        (item) => item.isSquid === true,
      );
    } else if (selectedCategory === "accessoires") {
      allProducts = productCategories.accessoires;
    }

    // Apply search filter if search query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      allProducts = allProducts.filter((product) => {
        // Search in product title
        const titleMatch = product.title.toLowerCase().includes(query);

        // Search in product description
        const descriptionMatch = product.description
          .toLowerCase()
          .includes(query);

        // Search in product features
        const featuresMatch = product.features.some((feature: string) =>
          feature.toLowerCase().includes(query),
        );

        // Search in individual product names within the category
        const productNamesMatch = product.products.some((prod: any) =>
          prod.name.toLowerCase().includes(query),
        );

        return (
          titleMatch || descriptionMatch || featuresMatch || productNamesMatch
        );
      });
    }

    // Sort products based on selection
    const sortedProducts = [...allProducts].sort((a, b) => {
      switch (selectedSort) {
        case "nieuwste":
          return b.id - a.id; // Newer products have higher IDs
        case "populair":
          // Sort by popularity based on badges and popular items
          const popularityScoreA =
            (a.badge ? 1 : 0) +
            (a.products.some((p: any) => p.popular) ? 1 : 0);
          const popularityScoreB =
            (b.badge ? 1 : 0) +
            (b.products.some((p: any) => p.popular) ? 1 : 0);
          return popularityScoreB - popularityScoreA;
        case "prijs-laag-hoog":
          const priceA = parseFloat(
            a.products[0].price.replace("€", "").replace(",", "."),
          );
          const priceB = parseFloat(
            b.products[0].price.replace("€", "").replace(",", "."),
          );
          return priceA - priceB;
        case "prijs-hoog-laag":
          const priceA2 = parseFloat(
            a.products[0].price.replace("€", "").replace(",", "."),
          );
          const priceB2 = parseFloat(
            b.products[0].price.replace("€", "").replace(",", "."),
          );
          return priceB2 - priceA2;
        case "meest-gekozen":
        default:
          // Sort by popularity (products with "popular: true" items first)
          const popularityA = a.products.some((p: any) => p.popular) ? 1 : 0;
          const popularityB = b.products.some((p: any) => p.popular) ? 1 : 0;
          return popularityB - popularityA;
      }
    });

    return sortedProducts;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Group filtered products by category for display
  const getGroupedProducts = () => {
    if (selectedCategory !== "alles") {
      return { [selectedCategory]: filteredProducts };
    }

    return {
      horren: [], // Temporarily empty - horren section hidden
      accessoires: filteredProducts.filter((p) =>
        productCategories.accessoires.includes(p),
      ),
    };
  };

  const groupedProducts = getGroupedProducts();

  // SQUID Specialized Product Card Component
  const SquidProductCard = ({ category }: { category: any }) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side: Image */}
          <div className="relative overflow-hidden">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#d5c096] text-white px-3 py-1 rounded-full text-sm font-medium">
                {category.badge}
              </span>
            </div>
          </div>

          {/* Right side: Content */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                SQUID Textielfolie – Discrete Privacy met Elegantie
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Breng stijl, comfort en privacy samen in één oplossing met SQUID
                – de zelfklevende textielfolie die zicht blokkeert van buitenaf,
                maar daglicht perfect doorlaat. Deze innovatieve raamfolie heeft
                een warme, linnenachtige uitstraling en is geschikt voor elk
                interieur. Geen lijm, geen gereedschap – gewoon elegantie,
                eenvoud en effectiviteit.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Waarom kiezen voor SQUID?
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Stijlvol en minimalistisch: </strong> Past perfect
                    bij moderne en klassieke interieurs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Privacy overdag:</strong>Geniet van het daglicht
                    zonder inkijk
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Eenvoudige montage:</strong> Zelfklevend textiel
                    zonder boren of lijm
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Hitte- en vochtbestendig:</strong> Ideaal voor
                    badkamers, keukens en dakramen
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Verwijderbaar en herpositioneerbaar:</strong> Laat
                    geen lijmsporen achter
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Veelzijdig toepasbaar:</strong> Woningen,
                    kantoren, vitrines & showrooms
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d5c096] mr-2">•</span>
                  <span>
                    <strong>• Perfect op maat leverbaar: </strong> Gesneden
                    volgens jouw exacte raamafmetingen
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Verkrijgbaar in 5 tijdloze kleuren:
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Chalk",
                  "Oak",
                  "Ash",
                  "Rock",
                  "Coal",
                  "Transparant & Opaque",
                  "Levertijd 14 werkdagen",
                  "Standaard breedte 137 cm",
                  "Min. aankoop >1m",
                  
                ].map((color) => (
                  <span
                    key={color}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Perfect voor:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Woonkamers & slaapkamers</div>
                <div>• Dakramen & lichtkoepels</div>
                <div>• Badkamers & keukens</div>
                <div>• Etalages en kantoorruimtes</div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/shop/squid-samenstellen">
                <Button 
                  className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-8 py-3 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d5c096]/50 focus:ring-offset-2"
                  aria-label="Bestellen SQUID textielfolie - Ga naar productconfigurator"
                >
                  Bestel nu SQUID
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component for rendering product cards
  const ProductCard = ({ category }: { category: any }) => {
    const isInComparison = comparisonProducts.find((p) => p.id === category.id);
    const canAddToComparison = comparisonProducts.length < 3 && !isInComparison;

    return (
      <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#d5c096]/15 transition-all duration-300 group flex flex-col h-full">
        {/* Fixed Height Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-64 object-cover transition-all duration-300 group-hover:brightness-105"
          />

          {/* Floating Sparkles Animation */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-6 left-6 animate-sparkle animation-delay-100">
              <Sparkles className="h-4 w-4 text-[#d5c096]" />
            </div>
            <div className="absolute top-12 right-8 animate-sparkle animation-delay-300">
              <Sparkles className="h-3 w-3 text-yellow-400" />
            </div>
            <div className="absolute bottom-16 left-8 animate-sparkle animation-delay-500">
              <Sparkles className="h-3 w-3 text-blue-400" />
            </div>
            <div className="absolute bottom-8 right-6 animate-sparkle animation-delay-700">
              <Sparkles className="h-4 w-4 text-pink-400" />
            </div>
            <div className="absolute top-20 left-1/2 animate-sparkle animation-delay-200">
              <Sparkles className="h-2 w-2 text-purple-400" />
            </div>
            <div className="absolute bottom-20 right-1/3 animate-sparkle animation-delay-600">
              <Sparkles className="h-3 w-3 text-green-400" />
            </div>
          </div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#d5c096]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Badge with Bounce Animation */}
          {category.badge && (
            <Badge className="absolute top-4 left-4 bg-[#d5c096] text-white shadow-lg transition-all duration-300">
              {category.badge}
            </Badge>
          )}

          {/* Interactive Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            {/* Favorite Button */}
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm border-none shadow-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* Size Comparison Button */}
            {isInComparison ? (
              <Button
                size="sm"
                onClick={() => removeFromComparison(category.id)}
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : canAddToComparison ? (
              <Button
                size="sm"
                onClick={() => addToComparison(category)}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all duration-300"
              >
                <Ruler className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="bg-gray-400 text-white shadow-lg cursor-not-allowed transition-all duration-300"
              >
                <Ruler className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Floating Quick View Button */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Button
              size="sm"
              className="bg-[#d5c096] hover:bg-[#c4b183] text-white shadow-lg transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-1" />
              Bekijk
            </Button>
          </div>

          {/* Magical Floating Elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#d5c096] rounded-full animate-ping animation-delay-300"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-500"></div>
            <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping animation-delay-700"></div>
          </div>

          {/* Animated Border Glow */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d5c096]/50 rounded-t-xl transition-all duration-500"></div>
        </div>

        {/* Content Section - Flex Grow */}
        <div className="flex flex-col flex-grow p-6 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-[#d5c096]/5 transition-all duration-500">
          {/* Product Title with Wiggle Animation */}
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-xl font-bold text-gray-900 flex-1 group-hover:text-[#d5c096] transition-colors duration-300">
              {category.title}
            </h4>
            {isInComparison && (
              <Badge
                variant="secondary"
                className="ml-2 bg-blue-100 text-blue-700 transition-colors duration-300"
              >
                In vergelijking
              </Badge>
            )}
          </div>

          {/* Animated Subtitle */}
          <p className="text-sm text-[#d5c096] font-medium mb-2 group-hover:animate-pulse">
            {category.subtitle}
          </p>

          {/* Dimensions Info with Slide Animation */}
          {category.dimensions && (
            <div className="mb-3 text-xs text-gray-500 bg-gray-50 rounded-md p-2 group-hover:bg-[#d5c096]/10 group-hover:text-[#d5c096] transition-all duration-300">
              <div className="flex items-center gap-1">
                <Ruler className="h-3 w-3" />
                <span className="group-hover:font-medium transition-all duration-300">
                  {category.dimensions.width} × {category.dimensions.height} ×{" "}
                  {category.dimensions.depth} cm
                </span>
              </div>
            </div>
          )}

          {/* Short Description with Fade In */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem] group-hover:text-gray-700 transition-colors duration-300">
            {category.description}
          </p>

          {/* Prices Section with Staggered Animation */}
          <div className="mb-6 flex-grow">
            <p className="text-sm font-medium text-gray-700 mb-3 group-hover:text-[#d5c096] transition-colors duration-300">
              Prijzen vanaf:
            </p>
            <div className="space-y-2">
              {category.products
                .slice(0, 3)
                .map((product: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center group-hover:transform group-hover:translate-x-1 transition-all duration-300 hover:bg-[#d5c096]/10 rounded-md p-1 -mx-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {product.name}
                    </span>
                    <span className="text-sm font-semibold text-[#d5c096] transition-colors duration-300">
                      {product.price}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Action Buttons with Bounce Effect */}
          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
              <Link href={category.href} className="flex-1">
                <Button className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d5c096]/30 relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Bekijk producten
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {/* Animated Background Shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </Link>

              {category.dimensions && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    isInComparison
                      ? removeFromComparison(category.id)
                      : addToComparison(category)
                  }
                  disabled={!canAddToComparison && !isInComparison}
                  className="px-3 border-[#d5c096] text-[#d5c096] hover:bg-[#d5c096]/10 transition-all duration-300"
                >
                  {isInComparison ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Ruler className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {/* Fun Interactive Elements */}
            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <button className="p-1 rounded-full hover:bg-[#d5c096]/20 transition-all duration-300 hover:scale-125 hover-jello animate-slideInUp animation-delay-100">
                <Star className="h-3 w-3 text-[#d5c096] hover:text-yellow-500 transition-colors duration-300 hover:animate-spin" />
              </button>
              <button className="p-1 rounded-full hover:bg-[#d5c096]/20 transition-all duration-300 hover:scale-125 hover-bounce animate-slideInUp animation-delay-200">
                <ShoppingCart className="h-3 w-3 text-[#d5c096] hover:text-green-500 transition-colors duration-300 hover:animate-bounce" />
              </button>
              <button className="p-1 rounded-full hover:bg-[#d5c096]/20 transition-all duration-300 hover:scale-125 hover-wiggle animate-slideInUp animation-delay-300">
                <Palette className="h-3 w-3 text-[#d5c096] hover:text-purple-500 transition-colors duration-300 hover:animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="pt-8">
          {/* Header Text Section */}
          <div className="text-center mb-8 px-4">
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-4">
              Kwaliteit op Maat voor Elke Woning
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Bij KANIOU vindt u hoogwaardige raamdecoratie die perfect aansluit
              op uw stijl en wensen. Elke oplossing wordt met zorg samengesteld,
              volledig op maat en volgens de hoogste afwerkingsnormen. Blader
              door onze productgroepen en ontdek de ideale combinatie van
              design, comfort en functionaliteit.
            </p>
          </div>

          {/* Product Count - More Prominent */}
          <div className="mb-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-lg font-bold text-gray-900">
                {searchQuery.trim() ? (
                  <>
                    {filteredProducts.length} resultaten voor "{searchQuery}"
                    {selectedCategory !== "alles" && (
                      <span className="text-[#d5c096]">
                        {" "}
                        in{" "}
                        {selectedCategory === "horren"
                          ? "Horren"
                          : selectedCategory === "gordijnrails"
                            ? "Gordijnrails"
                            : selectedCategory === "squid"
                              ? "SQUID textile foil"
                              : "Accessoires"}
                      </span>
                    )}
                  </>
                ) : (
                  `${filteredProducts.length} producten gevonden`
                )}
              </div>
            </div>
          </div>

          {/* Filters and Sorting Controls - Mobile Optimized */}
          <div className="mb-8">
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
              <div className="space-y-4 md:space-y-0">
                {/* Top Row: Search (full width on mobile) */}
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Search className="h-5 w-5 text-[#d5c096] flex-shrink-0" />
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        Zoeken:
                      </label>
                    </div>
                    <div className="relative w-full sm:w-auto sm:min-w-[250px]">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Typ productnaam of trefwoord..."
                        className={`w-full h-11 px-3 py-2 border border-[#d5c096]/30 rounded-md focus:border-[#d5c096] focus:ring-[#d5c096]/20 focus:ring-1 outline-none transition-all duration-200 ${
                          isFilterLoading ? "opacity-70 cursor-wait" : ""
                        }`}
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Sort and Category (side by side on mobile, horizontal on desktop) */}
                <div className="flex flex-col sm:flex-row gap-4 md:justify-between md:items-center">
                  {/* Sort Dropdown */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-5 w-5 text-[#d5c096] flex-shrink-0" />
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        Sorteer op:
                      </label>
                    </div>
                    <Select
                      value={selectedSort}
                      onValueChange={handleSortChange}
                    >
                      <SelectTrigger
                        className={`w-full sm:w-48 h-11 border-[#d5c096]/30 focus:border-[#d5c096] focus:ring-[#d5c096]/20 transition-all duration-200 ${
                          isFilterLoading ? "opacity-70 cursor-wait" : ""
                        }`}
                      >
                        <SelectValue placeholder="Selecteer sortering" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meest-gekozen">
                          Meest gekozen
                        </SelectItem>
                        <SelectItem value="nieuwste">
                          Nieuwste producten
                        </SelectItem>
                        <SelectItem value="populair">Populair</SelectItem>
                        <SelectItem value="prijs-laag-hoog">
                          Prijs: Laag naar Hoog
                        </SelectItem>
                        <SelectItem value="prijs-hoog-laag">
                          Prijs: Hoog naar Laag
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Side: Reset and Save Indicator */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {/* Reset Preferences Button with Tooltip */}
                  {hasSavedPreferences && (
                    <div className="relative group">
                      <Button
                        onClick={resetPreferences}
                        variant="outline"
                        size="sm"
                        className="h-11 border-[#d5c096]/50 text-[#d5c096] hover:bg-[#d5c096]/10 hover:border-[#d5c096] transition-all duration-200"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset Voorkeuren
                      </Button>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#d5c096] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                        Herstel filters naar standaardwaarden
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#d5c096]"></div>
                      </div>
                    </div>
                  )}

                  {/* Save indicator */}
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-[#d5c096]" />
                    <span
                      className={`text-xs transition-colors duration-200 ${
                        showSaveIndicator
                          ? "text-[#d5c096] font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {showSaveIndicator
                        ? "Voorkeuren opgeslagen!"
                        : "Voorkeuren automatisch opgeslagen"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stylish Horizontal Category Button Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-center">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide smooth-horizontal-scroll max-w-full pb-2">
                {[
                  { id: "alles", label: "Show All" },
                  // { id: "horren", label: "Horren" }, // TEMPORARILY REMOVED
                  // { id: "rolgordijnen", label: "Rolgordijnen" }, // TEMPORARILY REMOVED - COMING SOON
                  { id: "gordijnrails", label: "Gordijnrails" },
                  { id: "squid", label: "SQUID textile foil" },
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryButtonClick(category.id)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#d5c096]/50 focus:ring-offset-2 ${
                      selectedCategory === category.id
                        ? "bg-[#d5c096] text-white shadow-lg transform scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-[#d5c096]/20 hover:text-[#d5c096] hover:shadow-md hover:transform hover:scale-102"
                    }`}
                    aria-label={`Filter products by ${category.label}`}
                    aria-pressed={selectedCategory === category.id}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16 product-grid-section">
          <h2 className="text-3xl font-bold text-center mb-12">
            {selectedCategory === "alles"
              ? "Onze Productcategorieën"
              : selectedCategory === "horren"
                ? "Horren"
                : selectedCategory === "rolgordijnen"
                  ? "Rolgordijnen"
                  : selectedCategory === "gordijnrails"
                    ? "Gordijnrails"
                    : selectedCategory === "squid"
                      ? "SQUID Textile Foil"
                      : selectedCategory === "accessoires"
                        ? "Accessoires"
                        : "Producten"}
          </h2>

          {selectedCategory === "alles" ? (
            // Show all categories with section headers
            <>
              {isFilterLoading ? (
                <div className="mb-16">
                  <div className="flex items-center mb-8">
                    <div className="h-8 bg-gray-200 rounded w-32 mr-4 animate-pulse"></div>
                    <div className="flex-grow h-px bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                groupedProducts.horren &&
                groupedProducts.horren.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">
                        Horren
                      </h3>
                      <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 product-fade-in">
                      {groupedProducts.horren.map((category: any) => (
                        <div key={category.id} className="product-card">
                          <ProductCard category={category} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              {!isFilterLoading &&
                groupedProducts.accessoires &&
                groupedProducts.accessoires.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">
                        Accessoires
                      </h3>
                      <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 product-fade-in">
                      {groupedProducts.accessoires
                        .filter((category: any) => !category.isSquid)
                        .map((category: any) => (
                          <div 
                            key={category.id} 
                            className={`product-card ${
                              category.title === "Gordijnroedes" ? "hidden md:block" : ""
                            }`}
                          >
                            <ProductCard category={category} />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {!isFilterLoading &&
                groupedProducts.accessoires &&
                groupedProducts.accessoires.length > 0 && (
                  <div className="mb-16" data-squid-section>
                    <div className="flex items-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">
                        SQUID Textile Foil
                      </h3>
                      <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                    </div>
                    <div className="product-fade-in">
                      {groupedProducts.accessoires
                        .filter((category: any) => category.isSquid)
                        .map((category: any) => (
                          <div key={category.id} className="product-card">
                            <SquidProductCard category={category} />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {!isFilterLoading &&
                groupedProducts.accessoires &&
                groupedProducts.accessoires.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">
                        Accessoires
                      </h3>
                      <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 product-fade-in">
                      {groupedProducts.accessoires
                        .filter((category: any) => !category.isSquid)
                        .map((category: any) => (
                          <div 
                            key={category.id} 
                            className={`product-card ${
                              category.title === "Gordijnroedes" ? "hidden md:block" : ""
                            }`}
                          >
                            <ProductCard category={category} />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </>
          ) : // Show filtered category products
          isFilterLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : selectedCategory === "squid" ? (
            <div className="max-w-full">
              {filteredProducts.map((category) => (
                <SquidProductCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((category) => (
                <div 
                  key={category.id} 
                  className={`${
                    category.title === "Gordijnroedes" ? "hidden md:block" : ""
                  }`}
                >
                  <ProductCard category={category} />
                </div>
              ))}
            </div>
          )}

          {!isFilterLoading &&
            filteredProducts.length === 0 &&
            selectedCategory !== "squid" && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  {searchQuery.trim() ? (
                    <>Geen resultaten gevonden voor "{searchQuery}"</>
                  ) : (
                    "Geen producten gevonden voor de geselecteerde filters."
                  )}
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  {searchQuery.trim()
                    ? "Probeer een andere zoekterm of verander de categorie-instellingen."
                    : "Pas uw filters aan om meer producten te bekijken."}
                </p>
                <div className="flex gap-3 justify-center">
                  {searchQuery.trim() && (
                    <Button
                      onClick={clearSearch}
                      variant="outline"
                      className="border-[#d5c096] text-[#d5c096] hover:bg-[#d5c096]/10"
                    >
                      Wis zoekopdracht
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setSelectedCategory("alles");
                      setSelectedSort("meest-gekozen");
                      setSearchQuery("");
                    }}
                    className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                  >
                    Reset alle filters
                  </Button>
                </div>
              </div>
            )}
        </div>

        {/* Promotional Banners */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner 1 - Most Popular */}
            <div className="bg-[#d5c096]/15 border border-[#d5c096]/30 rounded-xl p-6 flex items-center">
              <div className="flex items-center space-x-4 w-full">
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm lg:text-base">
                    <span className="font-bold"></span>
                    <br className="sm:hidden" />
                    <span className="ml-1 sm:ml-0"></span>
                  </p>
                </div>
              </div>
            </div>

            {/* Banner 2 - Special Offer */}
            <div className="bg-[#d5c096]/20 border border-[#d5c096]/40 rounded-xl p-6 flex items-center">
              <div className="flex items-center space-x-4 w-full">
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm lg:text-base">
                    <span className="font-bold"></span>
                    <br className="sm:hidden" />
                    <span className="ml-1 sm:ml-0"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Hulp nodig bij uw keuze?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Onze experts helpen u graag bij het vinden van de perfecte
            raamdecoratie. Vraag een gratis adviesgesprek aan of laat u
            inspireren door onze galerij.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Gratis Adviesgesprek</Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline">
                Offerte op Maat
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Floating Comparison Panel */}
      {comparisonProducts.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-40 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">
              Vergelijking ({comparisonProducts.length}/3)
            </h3>
            <button
              onClick={clearAllComparisons}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {comparisonProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700 truncate flex-1">
                  {product.title}
                </span>
                <button
                  onClick={() => removeFromComparison(product.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={openSizeComparison}
            className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white text-sm"
            disabled={comparisonProducts.length === 0}
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Vergelijk Afmetingen
          </Button>
        </div>
      )}

      {/* Size Comparison Overlay */}
      <SizeComparisonOverlay />
    </div>
  );
};

export default ProductsPage;
