import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Heart, 
  Eye, 
  TrendingUp, 
  Users, 
  Sparkles,
  ArrowRight,
  Filter,
  SortAsc
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useGamification } from '@/hooks/useGamification';
import { useQuery } from '@tanstack/react-query';

interface ProductRecommendation {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  matchScore: number;
  reasons: string[];
  popularity: number;
  userRating: number;
  inStock: boolean;
  trending: boolean;
  newArrival: boolean;
  tags: string[];
}

interface RecommendationCategory {
  title: string;
  description: string;
  products: ProductRecommendation[];
  algorithm: 'behavioral' | 'collaborative' | 'content' | 'trending' | 'personalized';
  confidence: number;
}

export function SmartRecommendationEngine() {
  const { language, t } = useLanguage();
  const { preferences } = useUserPreferences();
  const { awardPoints } = useGamification();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'price' | 'popularity' | 'rating'>('match');

  // Fetch recommendations from the API
  const { data: recommendationsData, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['/api/recommendations', preferences?.userId],
    queryFn: async () => {
      const userId = preferences?.userId || 'anonymous';
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const response = await fetch(`/api/recommendations?userId=${userId}&sessionId=${sessionId}`);
      return response.json();
    }
  });

  const [recommendations, setRecommendations] = useState<RecommendationCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Set recommendations from API data
  useEffect(() => {
    if (recommendationsData?.recommendations) {
      setRecommendations(recommendationsData.recommendations);
      setIsLoading(false);
    }
  }, [recommendationsData]);

  const handleProductClick = (productId: string) => {
    awardPoints('PRODUCT_VIEW');
    window.location.href = `/products/${productId}`;
  };

  const getFilteredProducts = () => {
    let allProducts: ProductRecommendation[] = [];
    
    recommendations.forEach(category => {
      if (selectedCategory === 'all' || category.algorithm === selectedCategory) {
        allProducts = [...allProducts, ...category.products];
      }
    });

    switch (sortBy) {
      case 'match':
        return allProducts.sort((a, b) => b.matchScore - a.matchScore);
      case 'price':
        return allProducts.sort((a, b) => a.price - b.price);
      case 'popularity':
        return allProducts.sort((a, b) => b.popularity - a.popularity);
      case 'rating':
        return allProducts.sort((a, b) => b.userRating - a.userRating);
      default:
        return allProducts;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  if (isLoading || recommendationsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 mx-auto text-blue-500 animate-spin mb-4" />
          <h2 className="text-xl font-semibold mb-2">AI analyseert je voorkeuren...</h2>
          <p className="text-muted-foreground">We zoeken de perfecte producten voor jou</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Slimme Product Aanbevelingen</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ontdek producten die perfect bij jou passen, gebaseerd op AI-analyse van je voorkeuren en gedrag
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Filter:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">Alle aanbevelingen</option>
            <option value="personalized">Persoonlijke matches</option>
            <option value="collaborative">Populair bij anderen</option>
            <option value="trending">Trending producten</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Sorteer:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="match">Match Score</option>
            <option value="price">Prijs</option>
            <option value="popularity">Populariteit</option>
            <option value="rating">Beoordeling</option>
          </select>
        </div>
      </div>

      {/* Recommendation Categories */}
      {recommendations.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">AI Vertrouwen</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{category.confidence}%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative">
                  <img
                    src={product.imageUrl || '/api/placeholder/300/200?text=' + encodeURIComponent(product.name)}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.trending && (
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {product.newArrival && (
                      <Badge className="bg-green-500 text-white">Nieuw</Badge>
                    )}
                  </div>

                  {/* Match Score */}
                  <div className="absolute top-2 right-2">
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-bold",
                      getMatchScoreColor(product.matchScore)
                    )}>
                      {product.matchScore}% match
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-lg font-bold text-blue-600">
                      €{product.price}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Ratings and Popularity */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.userRating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-muted-foreground">{product.popularity}% populair</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-muted-foreground">Veel bekeken</span>
                    </div>
                  </div>

                  {/* Recommendation Reasons */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Waarom dit product:</h4>
                    <ul className="space-y-1">
                      {product.reasons.slice(0, 2).map((reason, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    Bekijk Product
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* AI Insights */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI Inzichten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {recommendations.length > 0 ? Math.round(recommendations[0].confidence) : 85}%
              </div>
              <div className="text-sm text-muted-foreground">Aanbeveling Nauwkeurigheid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {recommendations.reduce((sum, cat) => sum + cat.products.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Producten Geanalyseerd</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
              <div className="text-sm text-muted-foreground">AI Algoritmen Gebruikt</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}