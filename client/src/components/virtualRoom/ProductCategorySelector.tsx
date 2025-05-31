import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCategory {
  id: string;
  name: string;
  icon: string;
}

interface ProductCategorySelectorProps {
  categories: ProductCategory[];
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string | null;
}

export const ProductCategorySelector = ({ 
  categories, 
  onCategorySelect, 
  selectedCategory 
}: ProductCategorySelectorProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  // Popular categories (most commonly used)
  const popularCategories = [
    'overgordijnen',
    'rolgordijnen', 
    'vitrages',
    'vouwgordijnen',
    'houten-jaloezieen'
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group categories
  const popularCategoriesData = categories.filter(cat => popularCategories.includes(cat.id));
  const otherCategories = filteredCategories.filter(cat => !popularCategories.includes(cat.id));

  const CategoryCard = ({ category, isPopular = false }: { category: ProductCategory, isPopular?: boolean }) => (
    <Card 
      key={category.id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
        selectedCategory === category.id 
          ? 'ring-2 ring-yellow-500 bg-yellow-50' 
          : 'hover:border-yellow-300'
      }`}
      onClick={() => onCategorySelect(category.id)}
    >
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>
        {isPopular && (
          <Badge variant="secondary" className="mb-2">
            <Star className="w-3 h-3 mr-1" />
            {t('virtualRoom.popular', 'Popular')}
          </Badge>
        )}
        <div className="text-sm text-gray-500">
          {t('virtualRoom.premiumQuality', 'Premium quality window treatment')}
        </div>
        {selectedCategory === category.id && (
          <div className="mt-3">
            <ArrowRight className="w-5 h-5 mx-auto text-yellow-600" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('virtualRoom.searchProducts', 'Search products...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Popular Categories */}
      {!searchTerm && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="mr-2 w-5 h-5" />
            {t('virtualRoom.popularCategories', 'Popular Categories')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {popularCategoriesData.map(category => (
              <CategoryCard key={category.id} category={category} isPopular />
            ))}
          </div>
        </div>
      )}

      {/* All Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {searchTerm 
            ? t('virtualRoom.searchResults', 'Search Results')
            : t('virtualRoom.allCategories', 'All Categories')
          }
        </h3>
        
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              {t('virtualRoom.noResults', 'No products found')}
            </div>
            <div className="text-sm text-gray-500">
              {t('virtualRoom.tryDifferentSearch', 'Try a different search term')}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(searchTerm ? filteredCategories : otherCategories).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>

      {/* Continue Button */}
      {selectedCategory && (
        <div className="flex justify-center pt-6">
          <Button 
            size="lg"
            onClick={() => onCategorySelect(selectedCategory)}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {t('virtualRoom.continue', 'Continue to Customization')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Category Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          {t('virtualRoom.categoryInfo', 'About Our Products')}
        </h4>
        <p className="text-sm text-gray-600">
          {t('virtualRoom.categoryDescription', 'All KANIOU products are made-to-measure with premium materials. Our virtual preview shows realistic representations of how each product will look in your space.')}
        </p>
      </div>
    </div>
  );
};