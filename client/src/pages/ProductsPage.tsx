import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

const ProductsPage = () => {
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "jaloezien",
      name: "🪞 Jaloezieën",
      subcategories: [
        { id: "houten-jaloezien", name: "Houten Jaloezieën" }
      ]
    }
  ];

  const houtenJaloezienenProducts = [
    {
      id: 1,
      name: "Klassieke Houten Jaloezie",
      description: "Tijdloze houten jaloezieën van hoogwaardige kwaliteit. Perfect voor elke ruimte.",
      price: "€89.95",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      alt: "Klassieke Houten Jaloezie"
    },
    {
      id: 2,
      name: "Premium Houten Jaloezie",
      description: "Luxe houten jaloezieën met extra brede lamellen. Duurzaam en stijlvol.",
      price: "€129.95",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      alt: "Premium Houten Jaloezie"
    },
    {
      id: 3,
      name: "Deluxe Houten Jaloezie",
      description: "Exclusieve houten jaloezieën met speciale behandeling. Top kwaliteit en design.",
      price: "€169.95",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop",
      alt: "Deluxe Houten Jaloezie"
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedCategory(subcategoryId);
    setSidebarOpen(false); // Close mobile sidebar
  };

  const filteredProducts = selectedCategory 
    ? houtenJaloezienenProducts.filter(product => {
        // Filter products based on selected category
        if (selectedCategory === "houten-jaloezien") return true;
        return false;
      })
    : houtenJaloezienenProducts;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white p-2"
          size="sm"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-0 left-0 h-screen w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🛍️ Alle Producten</h2>
            
            {/* Category Navigation */}
            <nav className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <span className="font-medium">{category.name}</span>
                    {expandedCategories.includes(category.id) ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </button>
                  
                  {/* Subcategories */}
                  {expandedCategories.includes(category.id) && (
                    <div className="ml-4 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => handleSubcategoryClick(subcategory.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedCategory === subcategory.id
                              ? 'bg-[#D9C29C] text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Clear Filter Button */}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full mt-4 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200"
                >
                  Toon Alle Producten
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <Container>
            <>
              {/* Shop Header */}
              <section className="text-center py-12 px-4 lg:px-0">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {selectedCategory ? 
                    `Producten: ${categories.find(cat => 
                      cat.subcategories.some(sub => sub.id === selectedCategory)
                    )?.subcategories.find(sub => sub.id === selectedCategory)?.name || 'Geselecteerd'}` :
                    'Ontdek Onze Premium Houten Jaloezieën'
                  }
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {selectedCategory ? 
                    'Gefilterde producten op basis van uw selectie.' :
                    'Hoogwaardige houten jaloezieën die perfect passen bij elke interieurstijl.'
                  }
                </p>
              </section>

              {/* Product Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-6 py-10">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white font-semibold py-3"
                        size="lg"
                      >
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </section>

              {/* No Products Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">Geen producten gevonden voor deze categorie.</p>
                </div>
              )}
            </>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;