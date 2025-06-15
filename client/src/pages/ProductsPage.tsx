import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { ArrowRight, Star, Eye, Ruler, Palette, Filter, SortAsc, Settings, RotateCcw, Search, X, Maximize2, Move, RotateCw } from "lucide-react";

const ProductsPage = () => {
  const { t } = useLanguage();
  const [selectedSort, setSelectedSort] = useState("meest-gekozen");
  const [selectedCategory, setSelectedCategory] = useState("alles");
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [hasSavedPreferences, setHasSavedPreferences] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSizeComparison, setShowSizeComparison] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Load user preferences from localStorage on component mount
  useEffect(() => {
    const savedSort = localStorage.getItem('kaniou-preferred-sort');
    const savedCategory = localStorage.getItem('kaniou-preferred-category');
    
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
      localStorage.setItem('kaniou-preferred-sort', selectedSort);
      setHasSavedPreferences(true);
      setShowSaveIndicator(true);
      const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedSort, hasSavedPreferences]);

  useEffect(() => {
    if (hasSavedPreferences || selectedCategory !== "alles") {
      localStorage.setItem('kaniou-preferred-category', selectedCategory);
      setHasSavedPreferences(true);
      setShowSaveIndicator(true);
      const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, hasSavedPreferences]);

  // Reset preferences to default
  const resetPreferences = () => {
    if (window.confirm('Weet u zeker dat u uw opgeslagen voorkeuren wilt resetten naar de standaardwaarden?')) {
      setSelectedSort("meest-gekozen");
      setSelectedCategory("alles");
      setHasSavedPreferences(false);
      localStorage.removeItem('kaniou-preferred-sort');
      localStorage.removeItem('kaniou-preferred-category');
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

  // Size comparison functions
  const addToComparison = (product: any) => {
    if (comparisonProducts.length < 3 && !comparisonProducts.find(p => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
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

    const maxWidth = Math.max(...comparisonProducts.map(p => p.dimensions?.width || 120));
    const maxHeight = Math.max(...comparisonProducts.map(p => p.dimensions?.height || 150));
    const scale = Math.min(300 / maxWidth, 200 / maxHeight, 1);

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Afmetingen Vergelijken</h2>
                <p className="text-gray-600 mt-1">Vergelijk de afmetingen van uw geselecteerde producten</p>
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
                <p className="text-gray-500 text-lg mb-2">Geen producten geselecteerd voor vergelijking</p>
                <p className="text-gray-400 text-sm">Voeg producten toe om hun afmetingen te vergelijken</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Visual Comparison */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-lg font-semibold mb-6 text-center">Visuele Vergelijking</h3>
                  <div className="flex items-end justify-center gap-8 min-h-[300px]">
                    {comparisonProducts.map((product, index) => {
                      const width = (product.dimensions?.width || 120) * scale;
                      const height = (product.dimensions?.height || 150) * scale;
                      const colors = ['bg-[#d5c096]', 'bg-blue-400', 'bg-green-400'];
                      
                      return (
                        <div key={product.id} className="flex flex-col items-center">
                          <div
                            className={`${colors[index]} border-2 border-white shadow-lg rounded-lg flex items-center justify-center relative`}
                            style={{ width: `${width}px`, height: `${height}px` }}
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
                            {product.dimensions?.width || 120} × {product.dimensions?.height || 150} cm
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Comparison Table */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b border-gray-200">Gedetailleerde Afmetingen</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Product</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Breedte (cm)</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Hoogte (cm)</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Dikte (cm)</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Oppervlak (m²)</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Actie</th>
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
                                <div className="font-medium text-gray-900">{product.title}</div>
                                <div className="text-sm text-gray-500">{product.subtitle}</div>
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">{width}</td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">{height}</td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">{depth}</td>
                              <td className="px-4 py-3 text-center text-sm text-gray-900">{area}</td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => removeFromComparison(product.id)}
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
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden">
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
        description: "Tijdloze houten jaloezieën die warmte en stijl toevoegen aan elke ruimte.",
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
        products: [
          { name: "Houten Jaloezie 25mm", price: "€79,95", popular: true, width: 120, height: 150, thickness: 2.5 },
          { name: "Houten Jaloezie 35mm", price: "€89,95", popular: false, width: 120, height: 150, thickness: 3.5 },
          { name: "Houten Jaloezie 50mm", price: "€99,95", popular: false, width: 120, height: 150, thickness: 5.0 }
        ],
        dimensions: { width: 120, height: 150, depth: 2.5 },
        href: "/products/houten-jaloezieen",
        badge: "Bestseller"
      },
      {
        id: 2,
        title: "Kunststof Jaloezieën",
        subtitle: "Praktisch & vochtbestendig",
        description: "Onderhoudsvriendelijke kunststof jaloezieën, perfect voor vochtige ruimtes.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        products: [
          { name: "Kunststof Jaloezie 25mm", price: "€49,95", popular: true, width: 120, height: 150, thickness: 2.5 },
          { name: "Kunststof Jaloezie 35mm", price: "€59,95", popular: false, width: 120, height: 150, thickness: 3.5 },
          { name: "Verticale Jaloezie", price: "€69,95", popular: false, width: 120, height: 180, thickness: 8.9 }
        ],
        dimensions: { width: 120, height: 150, depth: 2.5 },
        href: "/products/kunststof-jaloezieen",
        badge: "Vochtbestendig"
      }
    ],
    gordijnen: [
      {
        id: 3,
        title: "Overgordijnen",
        subtitle: "Luxe & verduisterend",
        description: "Elegante overgordijnen voor optimale privacy en lichtcontrole.",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
        products: [
          { name: "Verduisterende Gordijnen", price: "€89,95", popular: true, width: 200, height: 250, thickness: 0.8 },
          { name: "Semi-transparante Gordijnen", price: "€69,95", popular: false, width: 200, height: 250, thickness: 0.5 },
          { name: "Luxe Overgordijnen", price: "€129,95", popular: false, width: 300, height: 280, thickness: 1.2 }
        ],
        dimensions: { width: 200, height: 250, depth: 0.8 },
        href: "/products/overgordijnen",
        badge: "Luxe"
      },
      {
        id: 4,
        title: "Vitrages",
        subtitle: "Licht & privacy",
        description: "Subtiele vitrages die licht doorlaten terwijl ze privacy bieden.",
        image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=400&h=300&fit=crop",
        products: [
          { name: "Vitrage Gordijn Wit", price: "€34,95", popular: true, width: 150, height: 200, thickness: 0.3 },
          { name: "Vitrage Gordijn Crème", price: "€34,95", popular: false, width: 150, height: 200, thickness: 0.3 },
          { name: "Vitrage met Patroon", price: "€44,95", popular: false, width: 160, height: 210, thickness: 0.4 }
        ],
        dimensions: { width: 150, height: 200, depth: 0.3 },
        href: "/products/vitrages",
        badge: "Lichtdoorlatend"
      }
    ],
    plisses: [
      {
        id: 5,
        title: "Plissé Gordijnen",
        subtitle: "Modern & veelzijdig",
        description: "Stijlvolle plissé gordijnen die perfect passen in moderne interieurs.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
        products: [
          { name: "Plissé Transparant", price: "€45,95", popular: false, width: 100, height: 120, thickness: 2.0 },
          { name: "Plissé Verduisterend", price: "€65,95", popular: true, width: 100, height: 120, thickness: 2.2 },
          { name: "Plissé Isolerend", price: "€55,95", popular: false, width: 100, height: 120, thickness: 2.8 }
        ],
        dimensions: { width: 100, height: 120, depth: 2.0 },
        href: "/products/plisse",
        badge: "Energie-efficiënt"
      },
      {
        id: 6,
        title: "Opzethorren",
        subtitle: "Insectenwering & ventilatie",
        description: "Effectieve insectenwering zonder in te boeten op ventilatie en zicht.",
        image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop",
        products: [
          { name: "Opzethor Standaard", price: "€79,95", popular: true, width: 80, height: 100, thickness: 1.5 },
          { name: "Opzethor Deluxe", price: "€99,95", popular: false, width: 90, height: 120, thickness: 2.0 },
          { name: "Opzethor XXL", price: "€119,95", popular: false, width: 120, height: 150, thickness: 2.5 }
        ],
        dimensions: { width: 80, height: 100, depth: 1.5 },
        href: "/products/opzethorren",
        badge: "Nieuw"
      }
    ],
    accessoires: [
      {
        id: 7,
        title: "Gordijnroedes",
        subtitle: "Stijlvolle ophangingen",
        description: "Hoogwaardige gordijnroedes in verschillende stijlen en materialen.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        products: [
          { name: "Aluminium Roede", price: "€29,95", popular: true },
          { name: "Houten Roede", price: "€49,95", popular: false },
          { name: "RVS Roede", price: "€39,95", popular: false }
        ],
        href: "/products/gordijnroedes",
        badge: "Compleet"
      },
      {
        id: 8,
        title: "Gordijnrails",
        subtitle: "Functionele railsystemen",
        description: "Professionele railsystemen voor een strakke en moderne uitstraling.",
        image: "https://images.unsplash.com/photo-1600210491964-1f36470bc2a7?w=400&h=300&fit=crop",
        products: [
          { name: "Enkele Rail", price: "€24,95", popular: true },
          { name: "Dubbele Rail", price: "€34,95", popular: false },
          { name: "Elektrische Rail", price: "€149,95", popular: false }
        ],
        href: "/products/gordijnrails",
        badge: "Functioneel"
      }
    ]
  };

  const features = [
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Op Maat Gemaakt",
      description: "Alle producten worden exact op uw maten geproduceerd"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Virtuele Preview",
      description: "Bekijk hoe uw raamdecoratie eruitziet voordat u bestelt"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Kleuradvies",
      description: "Gratis kleuradvies passend bij uw interieur"
    }
  ];

  // Filter and sort products based on selections
  const getFilteredAndSortedProducts = () => {
    let allProducts: any[] = [];
    
    // Flatten all products based on category filter
    if (selectedCategory === "alles") {
      allProducts = [
        ...productCategories.jaloezien,
        ...productCategories.gordijnen,
        ...productCategories.plisses,
        ...productCategories.accessoires
      ];
    } else if (selectedCategory === "jaloezien") {
      allProducts = productCategories.jaloezien;
    } else if (selectedCategory === "gordijnen") {
      allProducts = productCategories.gordijnen;
    } else if (selectedCategory === "plisses") {
      allProducts = productCategories.plisses;
    } else if (selectedCategory === "accessoires") {
      allProducts = productCategories.accessoires;
    }

    // Apply search filter if search query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      allProducts = allProducts.filter(product => {
        // Search in product title
        const titleMatch = product.title.toLowerCase().includes(query);
        
        // Search in product description
        const descriptionMatch = product.description.toLowerCase().includes(query);
        
        // Search in product features
        const featuresMatch = product.features.some((feature: string) => 
          feature.toLowerCase().includes(query)
        );
        
        // Search in individual product names within the category
        const productNamesMatch = product.products.some((prod: any) => 
          prod.name.toLowerCase().includes(query)
        );
        
        return titleMatch || descriptionMatch || featuresMatch || productNamesMatch;
      });
    }

    // Sort products based on selection
    const sortedProducts = [...allProducts].sort((a, b) => {
      switch (selectedSort) {
        case "nieuwste":
          return b.id - a.id; // Newer products have higher IDs
        case "prijs-laag-hoog":
          const priceA = parseFloat(a.products[0].price.replace('€', '').replace(',', '.'));
          const priceB = parseFloat(b.products[0].price.replace('€', '').replace(',', '.'));
          return priceA - priceB;
        case "prijs-hoog-laag":
          const priceA2 = parseFloat(a.products[0].price.replace('€', '').replace(',', '.'));
          const priceB2 = parseFloat(b.products[0].price.replace('€', '').replace(',', '.'));
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
      jaloezien: filteredProducts.filter(p => productCategories.jaloezien.includes(p)),
      gordijnen: filteredProducts.filter(p => productCategories.gordijnen.includes(p)),
      plisses: filteredProducts.filter(p => productCategories.plisses.includes(p)),
      accessoires: filteredProducts.filter(p => productCategories.accessoires.includes(p))
    };
  };

  const groupedProducts = getGroupedProducts();

  // Component for rendering product cards
  const ProductCard = ({ category }: { category: any }) => {
    const isInComparison = comparisonProducts.find(p => p.id === category.id);
    const canAddToComparison = comparisonProducts.length < 3 && !isInComparison;
    
    return (
      <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
        {/* Fixed Height Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {category.badge && (
            <Badge className="absolute top-4 left-4 bg-[#d5c096] text-white shadow-lg">
              {category.badge}
            </Badge>
          )}
          
          {/* Size Comparison Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isInComparison ? (
              <Button
                size="sm"
                onClick={() => removeFromComparison(category.id)}
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : canAddToComparison ? (
              <Button
                size="sm"
                onClick={() => addToComparison(category)}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              >
                <Ruler className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="bg-gray-400 text-white shadow-lg cursor-not-allowed"
              >
                <Ruler className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        </div>

        {/* Content Section - Flex Grow */}
        <div className="flex flex-col flex-grow p-6">
          {/* Product Title */}
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-xl font-bold text-gray-900 flex-1">
              {category.title}
            </h4>
            {isInComparison && (
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                In vergelijking
              </Badge>
            )}
          </div>
          
          {/* Dimensions Info */}
          {category.dimensions && (
            <div className="mb-3 text-xs text-gray-500 bg-gray-50 rounded-md p-2">
              <div className="flex items-center gap-1">
                <Ruler className="h-3 w-3" />
                <span>
                  {category.dimensions.width} × {category.dimensions.height} × {category.dimensions.depth} cm
                </span>
              </div>
            </div>
          )}
          
          {/* Short Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
            {category.description}
          </p>

          {/* Prices Section */}
          <div className="mb-6 flex-grow">
            <p className="text-sm font-medium text-gray-700 mb-3">Prijzen vanaf:</p>
            <div className="space-y-2">
              {category.products.slice(0, 3).map((product: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {product.name}
                  </span>
                  <span className="text-sm font-semibold text-[#d5c096]">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
              <Link href={category.href} className="flex-1">
                <Button className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                  Bekijk producten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              {category.dimensions && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isInComparison ? removeFromComparison(category.id) : addToComparison(category)}
                  disabled={!canAddToComparison && !isInComparison}
                  className="px-3 border-[#d5c096] text-[#d5c096] hover:bg-[#d5c096]/10"
                >
                  {isInComparison ? <X className="h-4 w-4" /> : <Ruler className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Container>
        {/* Hero Section */}
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Raamdecoratie
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ontdek onze collectie van hoogwaardige vliegengordijnen, gordijnen en jalouzieën. 
            Allemaal op maat gemaakt voor uw perfecte interieur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Gratis Offerte Aanvragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/gallerij">
              <Button size="lg" variant="outline">
                Bekijk Galerij
                <Eye className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Filters and Sorting Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Search Input */}
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-[#d5c096]" />
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Zoeken:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Zoek producten..."
                    className={`w-48 px-3 py-2 border border-[#d5c096]/30 rounded-md focus:border-[#d5c096] focus:ring-[#d5c096]/20 focus:ring-1 outline-none transition-all duration-200 ${
                      isFilterLoading ? 'opacity-70 cursor-wait' : ''
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <SortAsc className="h-5 w-5 text-[#d5c096]" />
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sorteer op:
                </label>
                <Select value={selectedSort} onValueChange={handleSortChange}>
                  <SelectTrigger className={`w-48 border-[#d5c096]/30 focus:border-[#d5c096] focus:ring-[#d5c096]/20 transition-all duration-200 ${
                    isFilterLoading ? 'opacity-70 cursor-wait' : ''
                  }`}>
                    <SelectValue placeholder="Selecteer sortering" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meest-gekozen">Meest gekozen</SelectItem>
                    <SelectItem value="nieuwste">Nieuwste</SelectItem>
                    <SelectItem value="prijs-laag-hoog">Prijs oplopend</SelectItem>
                    <SelectItem value="prijs-hoog-laag">Prijs aflopend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter Dropdown */}
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-[#d5c096]" />
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Toon categorie:
                </label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className={`w-48 border-[#d5c096]/30 focus:border-[#d5c096] focus:ring-[#d5c096]/20 transition-all duration-200 ${
                    isFilterLoading ? 'opacity-70 cursor-wait' : ''
                  }`}>
                    <SelectValue placeholder="Selecteer categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alles">Alles</SelectItem>
                    <SelectItem value="jaloezien">Jaloezieën</SelectItem>
                    <SelectItem value="gordijnen">Gordijnen</SelectItem>
                    <SelectItem value="plisses">Plissés</SelectItem>
                    <SelectItem value="accessoires">Accessoires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Reset Preferences Button - Only show when user has saved preferences */}
              {hasSavedPreferences && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetPreferences}
                  className="border-[#d5c096]/30 text-[#d5c096] hover:bg-[#d5c096]/10 hover:border-[#d5c096]/50 transition-all duration-200 hover:scale-105"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset voorkeuren
                </Button>
              )}
              
              {/* Preferences Status Indicator */}
              <div className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                showSaveIndicator ? 'text-[#d5c096]' : 'text-gray-500'
              }`}>
                <Settings className={`h-3 w-3 transition-transform duration-300 ${
                  showSaveIndicator ? 'rotate-45' : ''
                }`} />
                <span>
                  {showSaveIndicator ? 'Voorkeuren opgeslagen!' : 'Voorkeuren automatisch opgeslagen'}
                </span>
              </div>
              
              {/* Results count */}
              <div className="text-sm text-gray-500">
                {searchQuery.trim() ? (
                  <>
                    {filteredProducts.length} resultaten voor "{searchQuery}"
                    {selectedCategory !== "alles" && (
                      <span className="text-[#d5c096]"> in {
                        selectedCategory === "jaloezien" ? "Jaloezieën" :
                        selectedCategory === "gordijnen" ? "Gordijnen" :
                        selectedCategory === "plisses" ? "Plissés" : "Accessoires"
                      }</span>
                    )}
                  </>
                ) : (
                  `${filteredProducts.length} producten gevonden`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {selectedCategory === "alles" ? "Onze Productcategorieën" : 
             selectedCategory === "jaloezien" ? "Jaloezieën" :
             selectedCategory === "gordijnen" ? "Gordijnen" :
             selectedCategory === "plisses" ? "Plissés & Horren" :
             selectedCategory === "accessoires" ? "Accessoires" : "Producten"
            }
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
                groupedProducts.jaloezien && groupedProducts.jaloezien.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">Jaloezieën</h3>
                      <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {groupedProducts.jaloezien.map((category) => (
                        <ProductCard key={category.id} category={category} />
                      ))}
                    </div>
                  </div>
                )
              )}

              {!isFilterLoading && groupedProducts.gordijnen && groupedProducts.gordijnen.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mr-4">Gordijnen</h3>
                    <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {groupedProducts.gordijnen.map((category) => (
                      <ProductCard key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              )}

              {!isFilterLoading && groupedProducts.plisses && groupedProducts.plisses.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mr-4">Plissés & Horren</h3>
                    <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {groupedProducts.plisses.map((category) => (
                      <ProductCard key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              )}

              {!isFilterLoading && groupedProducts.accessoires && groupedProducts.accessoires.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mr-4">Accessoires</h3>
                    <div className="flex-grow h-px bg-[#d5c096]/30"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {groupedProducts.accessoires.map((category) => (
                      <ProductCard key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Show filtered category products
            isFilterLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((category) => (
                  <ProductCard key={category.id} category={category} />
                ))}
              </div>
            )
          )}

          {!isFilterLoading && filteredProducts.length === 0 && (
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
                {searchQuery.trim() ? (
                  "Probeer een andere zoekterm of verander de categorie-instellingen."
                ) : (
                  "Pas uw filters aan om meer producten te bekijken."
                )}
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
                <div className="text-2xl">🌟</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm lg:text-base">
                    <span className="font-bold">Meest gekozen van deze maand:</span><br className="sm:hidden" />
                    <span className="ml-1 sm:ml-0">Houten Jaloezieën - vanaf €89,95</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Banner 2 - Special Offer */}
            <div className="bg-[#d5c096]/20 border border-[#d5c096]/40 rounded-xl p-6 flex items-center">
              <div className="flex items-center space-x-4 w-full">
                <div className="text-2xl">🔥</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm lg:text-base">
                    <span className="font-bold">Actie:</span><br className="sm:hidden" />
                    <span className="ml-1 sm:ml-0">10% korting op duo plissé t.e.m. 30 juni!</span>
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
            Onze experts helpen u graag bij het vinden van de perfecte raamdecoratie. 
            Vraag een gratis adviesgesprek aan of laat u inspireren door onze galerij.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                Gratis Adviesgesprek
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline">
                Offerte op Maat
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;