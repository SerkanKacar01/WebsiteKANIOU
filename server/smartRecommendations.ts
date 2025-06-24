export const recommendationService = {
  async getRecommendations(params: {
    userId?: string;
    category?: string;
    priceRange?: string;
  }) {
    // Simple recommendation logic - can be enhanced later
    return {
      products: [],
      message: "Recommendations feature coming soon"
    };
  }
};