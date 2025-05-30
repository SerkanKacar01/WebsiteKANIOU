import { Request, Response } from 'express';
import { storage } from './storage';

interface UserBehavior {
  viewedProducts: string[];
  viewedCategories: string[];
  searchQueries: string[];
  priceRange: [number, number];
  sessionDuration: number;
  chatbotInteractions: number;
}

interface ProductScore {
  productId: string;
  score: number;
  reasons: string[];
  algorithm: 'collaborative' | 'content' | 'behavioral' | 'trending' | 'personalized';
}

export class SmartRecommendationService {
  
  // Content-based filtering using product attributes
  private async getContentBasedRecommendations(userBehavior: UserBehavior): Promise<ProductScore[]> {
    const products = await storage.getProducts();
    const scores: ProductScore[] = [];

    for (const product of products) {
      let score = 0;
      const reasons: string[] = [];

      // Category preference scoring
      if (userBehavior.viewedCategories.includes(product.category)) {
        score += 25;
        reasons.push('Matches your browsed categories');
      }

      // Price range scoring
      const [minPrice, maxPrice] = userBehavior.priceRange;
      if (product.price >= minPrice && product.price <= maxPrice) {
        score += 20;
        reasons.push('Within your price range');
      }

      // Featured product bonus
      if (product.featured) {
        score += 10;
        reasons.push('Featured product');
      }

      // Stock availability
      if (product.inStock) {
        score += 5;
        reasons.push('In stock');
      }

      if (score > 0) {
        scores.push({
          productId: product.id.toString(),
          score,
          reasons,
          algorithm: 'content'
        });
      }
    }

    return scores.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  // Collaborative filtering based on similar user behavior
  private async getCollaborativeRecommendations(userBehavior: UserBehavior): Promise<ProductScore[]> {
    const products = await storage.getProducts();
    const scores: ProductScore[] = [];

    // Simulate collaborative filtering by analyzing popular products
    // In a real implementation, this would analyze other users with similar behavior
    for (const product of products) {
      let score = 0;
      const reasons: string[] = [];

      // Popularity-based scoring (simulated)
      const popularityScore = Math.random() * 30 + 40; // 40-70 range
      score += popularityScore;
      reasons.push('Popular among similar customers');

      // Category correlation
      if (userBehavior.viewedCategories.length > 0) {
        const categoryMatch = userBehavior.viewedCategories.includes(product.category);
        if (categoryMatch) {
          score += 15;
          reasons.push('Customers with similar interests liked this');
        }
      }

      scores.push({
        productId: product.id.toString(),
        score,
        reasons,
        algorithm: 'collaborative'
      });
    }

    return scores.sort((a, b) => b.score - a.score).slice(0, 4);
  }

  // Behavioral analysis recommendations
  private async getBehavioralRecommendations(userBehavior: UserBehavior): Promise<ProductScore[]> {
    const products = await storage.getProducts();
    const scores: ProductScore[] = [];

    for (const product of products) {
      let score = 0;
      const reasons: string[] = [];

      // High engagement bonus
      if (userBehavior.sessionDuration > 300) { // 5+ minutes
        score += 15;
        reasons.push('Based on your browsing behavior');
      }

      // Chatbot interaction bonus
      if (userBehavior.chatbotInteractions > 2) {
        score += 10;
        reasons.push('You seem interested in detailed information');
      }

      // Search query matching (simplified)
      const productName = product.name.toLowerCase();
      const hasSearchMatch = userBehavior.searchQueries.some(query => 
        productName.includes(query.toLowerCase()) || 
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      if (hasSearchMatch) {
        score += 20;
        reasons.push('Matches your search interests');
      }

      if (score > 0) {
        scores.push({
          productId: product.id.toString(),
          score,
          reasons,
          algorithm: 'behavioral'
        });
      }
    }

    return scores.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // Trending products based on recent activity
  private async getTrendingRecommendations(): Promise<ProductScore[]> {
    const products = await storage.getProducts();
    const scores: ProductScore[] = [];

    // Simulate trending analysis
    for (const product of products) {
      const trendingScore = Math.random() * 40 + 30; // 30-70 range
      const reasons = ['Trending this month', 'High demand product'];

      scores.push({
        productId: product.id.toString(),
        score: trendingScore,
        reasons,
        algorithm: 'trending'
      });
    }

    return scores.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // Main recommendation engine
  public async generateRecommendations(userId: string, sessionId: string): Promise<any> {
    try {
      // Analyze user behavior from stored data
      const userBehavior = await this.analyzeUserBehavior(userId, sessionId);

      // Get recommendations from different algorithms
      const [contentBased, collaborative, behavioral, trending] = await Promise.all([
        this.getContentBasedRecommendations(userBehavior),
        this.getCollaborativeRecommendations(userBehavior),
        this.getBehavioralRecommendations(userBehavior),
        this.getTrendingRecommendations()
      ]);

      // Get actual product data
      const products = await storage.getProducts();
      const productMap = new Map(products.map(p => [p.id.toString(), p]));

      // Format recommendations by category
      const recommendations = [
        {
          title: 'Perfect Match voor Jou',
          description: 'Op basis van je voorkeuren en gedrag',
          algorithm: 'personalized',
          confidence: this.calculateConfidence(contentBased, behavioral),
          products: this.formatProducts(contentBased.slice(0, 3), productMap)
        },
        {
          title: 'Trending bij Anderen',
          description: 'Populaire keuzes van vergelijkbare klanten',
          algorithm: 'collaborative',
          confidence: this.calculateConfidence(collaborative),
          products: this.formatProducts(collaborative.slice(0, 2), productMap)
        },
        {
          title: 'Nieuw & Trending',
          description: 'Nieuwste trends en populaire producten',
          algorithm: 'trending',
          confidence: this.calculateConfidence(trending),
          products: this.formatProducts(trending.slice(0, 2), productMap)
        }
      ].filter(category => category.products.length > 0);

      return {
        recommendations,
        userBehavior: {
          totalProducts: products.length,
          analyzedCategories: userBehavior.viewedCategories.length,
          confidenceScore: Math.round(recommendations.reduce((sum, cat) => sum + cat.confidence, 0) / recommendations.length)
        }
      };

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return {
        recommendations: [],
        userBehavior: { totalProducts: 0, analyzedCategories: 0, confidenceScore: 0 }
      };
    }
  }

  private async analyzeUserBehavior(userId: string, sessionId: string): Promise<UserBehavior> {
    // In a real implementation, this would analyze stored user behavior data
    // For now, we'll use some default behavior patterns
    
    return {
      viewedProducts: [],
      viewedCategories: ['Rolgordijnen', 'Overgordijnen'], // Default interests
      searchQueries: [],
      priceRange: [50, 300],
      sessionDuration: 180, // 3 minutes
      chatbotInteractions: 1
    };
  }

  private calculateConfidence(scores: ProductScore[], additionalScores?: ProductScore[]): number {
    if (scores.length === 0) return 60;
    
    const avgScore = scores.reduce((sum, score) => sum + score.score, 0) / scores.length;
    const baseConfidence = Math.min(Math.max(avgScore, 60), 95);
    
    if (additionalScores && additionalScores.length > 0) {
      const additionalAvg = additionalScores.reduce((sum, score) => sum + score.score, 0) / additionalScores.length;
      return Math.round((baseConfidence + additionalAvg) / 2);
    }
    
    return Math.round(baseConfidence);
  }

  private formatProducts(scores: ProductScore[], productMap: Map<string, any>): any[] {
    return scores.map(score => {
      const product = productMap.get(score.productId);
      if (!product) return null;

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description || 'Premium kwaliteit raambekleding',
        price: product.price,
        imageUrl: product.imageUrl,
        matchScore: Math.round(score.score),
        reasons: score.reasons,
        popularity: Math.floor(Math.random() * 30) + 70,
        userRating: 4.0 + Math.random() * 1.0,
        inStock: product.inStock || true,
        trending: score.algorithm === 'trending' || Math.random() > 0.7,
        newArrival: Math.random() > 0.8,
        tags: this.generateProductTags(product)
      };
    }).filter(Boolean);
  }

  private generateProductTags(product: any): string[] {
    const baseTags = ['kwaliteit', 'maatwerk', 'duurzaam'];
    const categoryTags: Record<string, string[]> = {
      'Rolgordijnen': ['lichtdoorlatend', 'modern', 'eenvoudig'],
      'Overgordijnen': ['luxe', 'elegant', 'warmte-isolerend'],
      'Jaloeziën': ['verstelbaar', 'privacy', 'lichtregeling'],
      'Plissé': ['veelzijdig', 'energiebesparend', 'dag-nacht']
    };

    const specificTags = categoryTags[product.category] || ['populair', 'veelzijdig'];
    return [...baseTags, ...specificTags].slice(0, 3);
  }
}

export const recommendationService = new SmartRecommendationService();