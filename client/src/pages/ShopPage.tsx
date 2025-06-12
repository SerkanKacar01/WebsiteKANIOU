import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Star } from "lucide-react";

const ShopPage = () => {
  const { t } = useLanguage();

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Klassieke Houten Jaloezie",
      description: "Timeless quality wooden blinds",
      price: "€89.95",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      features: ["Premium wood", "Custom sizes", "Easy installation"]
    },
    {
      id: 2,
      name: "Premium Houten Jaloezie",
      description: "Enhanced wooden blinds with superior finish",
      price: "€129.95",
      image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=300&fit=crop&crop=center",
      features: ["Premium hardwood", "Advanced UV protection", "10-year warranty"]
    },
    {
      id: 3,
      name: "Deluxe Houten Jaloezie",
      description: "Luxury wooden blinds with premium craftsmanship",
      price: "€169.95",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
      features: ["Luxury hardwood", "Motorized options", "Lifetime warranty"]
    }
  ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Shop Premium Window Coverings | Elegant Drapes</title>
        <meta 
          name="description" 
          content="Discover top-quality blinds and screens. Quick order & delivery. Premium wooden blinds starting from €89.95 with free delivery above €200." 
        />
        <meta property="og:title" content="Shop Premium Window Coverings | Elegant Drapes" />
        <meta property="og:description" content="Discover top-quality blinds and screens. Quick order & delivery." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Shop Premium Window Coverings
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover top-quality blinds and screens. Quick order & delivery.
            </p>
            <Button 
              onClick={scrollToProducts}
              className="bg-[#D9C29C] hover:bg-[#C5A572] text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Shopping
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular premium wooden blinds, crafted with exceptional quality and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-[#D9C29C] text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Premium Quality
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="font-body text-gray-600 mb-4">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 mb-1">
                        <Check className="w-4 h-4 text-[#D9C29C] mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">
                      {product.price}
                    </div>
                    <Button 
                      className="bg-[#D9C29C] hover:bg-[#C5A572] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Highlight Strip */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-700">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#D9C29C]" />
                <span className="font-body text-sm md:text-base">Free delivery above €200</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#D9C29C]" />
                <span className="font-body text-sm md:text-base">Reliable craftsmanship</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#D9C29C]" />
                <span className="font-body text-sm md:text-base">Easy ordering</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ShopPage;