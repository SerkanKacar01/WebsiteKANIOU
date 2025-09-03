import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Truck, Users, Award, Clock } from "lucide-react";
import interiorImage from "@assets/image00001.jpeg";

const Home = () => {
  const [, setLocation] = useLocation();

  const handleExploreProducts = () => {
    setLocation("/producten");
  };

  const handleRequestQuote = () => {
    setLocation("/quote");
  };

  return (
    <>
      <Helmet>
        <title>KANIOU | Tailor-made Window Decor That Elevates Every Space</title>
        <meta
          name="description"
          content="Over 30 years of expertise in curtains & sun protection. Premium custom window treatments that transform your space with style and functionality."
        />
        <meta
          property="og:title"
          content="KANIOU | Tailor-made Window Decor That Elevates Every Space"
        />
        <meta
          property="og:description"
          content="Over 30 years of expertise in curtains & sun protection. Premium custom window treatments that transform your space with style and functionality."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={interiorImage}
            alt="Modern interior with elegant window treatments"
            className="w-full h-full object-cover"
          />
          {/* Elegant transparent overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-16">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Tailor-made Window Decor That Elevates Every Space
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-body leading-relaxed max-w-3xl mx-auto">
            Over 30 years of expertise in curtains & sun protection.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <Button
              onClick={handleExploreProducts}
              className="
                w-full sm:w-auto
                px-8 py-4 
                text-lg font-semibold
                bg-[#d5b36a] hover:bg-[#c4a55a] 
                text-white 
                border-0
                rounded-lg
                transition-all duration-300 
                transform hover:scale-105 hover:-translate-y-1
                shadow-lg hover:shadow-xl
                min-w-[200px]
              "
            >
              Explore Products
            </Button>

            {/* Secondary Button */}
            <Button
              onClick={handleRequestQuote}
              variant="outline"
              className="
                w-full sm:w-auto
                px-8 py-4 
                text-lg font-semibold
                bg-white/10 backdrop-blur-sm
                hover:bg-white/20 
                text-white 
                border-2 border-[#d5b36a] hover:border-[#c4a55a]
                rounded-lg
                transition-all duration-300 
                transform hover:scale-105 hover:-translate-y-1
                shadow-lg hover:shadow-xl
                min-w-[200px]
              "
            >
              Request a Free Quote
            </Button>
          </div>

          {/* Elegant Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose KANIOU - USP Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose KANIOU?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference that three decades of craftsmanship and dedication make
            </p>
          </div>

          {/* USP Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Perfect Fit */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#d5b36a]/10 rounded-full flex items-center justify-center group-hover:bg-[#d5b36a]/20 transition-all duration-300">
                  <Shield className="w-8 h-8 text-[#d5b36a]" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                Perfect Fit
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is measured and crafted precisely for your windows
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#d5b36a]/10 rounded-full flex items-center justify-center group-hover:bg-[#d5b36a]/20 transition-all duration-300">
                  <Truck className="w-8 h-8 text-[#d5b36a]" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quick turnaround times without compromising on quality
              </p>
            </div>

            {/* Expert Advice */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#d5b36a]/10 rounded-full flex items-center justify-center group-hover:bg-[#d5b36a]/20 transition-all duration-300">
                  <Users className="w-8 h-8 text-[#d5b36a]" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                Expert Advice
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Professional guidance to help you choose the perfect solution
              </p>
            </div>

            {/* Premium Quality */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#d5b36a]/10 rounded-full flex items-center justify-center group-hover:bg-[#d5b36a]/20 transition-all duration-300">
                  <Award className="w-8 h-8 text-[#d5b36a]" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Top-grade materials and meticulous attention to detail
              </p>
            </div>

            {/* 30+ Years Experience */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#d5b36a]/10 rounded-full flex items-center justify-center group-hover:bg-[#d5b36a]/20 transition-all duration-300">
                  <Clock className="w-8 h-8 text-[#d5b36a]" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                30+ Years Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted expertise built over three decades of excellence
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
