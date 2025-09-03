import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Truck, Users, Award, Clock, ArrowRight, Eye, Quote, Star, Percent, Tag, Ruler, Zap, Phone, Mail, MapPin, Instagram, MessageCircle, Globe } from "lucide-react";
// Product and gallery images
const interiorImage = "/images/Overgordijnen.jpeg";
const duoPlisseImage = "/images/Duoplisse.jpeg";
const duoRolgordijnenImage = "/images/Duorolgordijnen.jpeg";
const overgordijnenImage = "/images/Overgordijnen.jpeg";
const plisseImage = "/images/Plisse.jpeg";
const rolgordijnenImage = "/images/Rolgordijnen.jpeg";
const opzethorrenImage = "/images/Opzethorren.jpeg";
// Gallery images for real installations
const gallery1 = "/images/IMG_9192.jpeg";
const gallery2 = "/images/IMG_9204.jpeg";
const gallery3 = "/images/IMG_9217.jpeg";
const gallery4 = "/images/IMG_9219.jpeg";
const gallery5 = "/images/IMG_9220.jpeg";
const gallery6 = "/images/IMG_9221.jpeg";

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

      {/* Product Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Product Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of window treatments designed to transform any space
            </p>
          </div>

          {/* Product Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Duo Plissé */}
            <div 
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setLocation("/producten/duo-plisse")}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={duoPlisseImage}
                  alt="Duo Plissé Blinds"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-[#d5b36a]/20 transition-all duration-300"></div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#d5b36a] transition-colors duration-300">
                  Duo Plissé
                </h3>
                <p className="text-gray-600 mt-2">
                  Perfect light control with elegant pleated design
                </p>
              </div>
            </div>

            {/* Duo Rolgordijnen */}
            <div 
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setLocation("/producten/duo-rolgordijnen")}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={duoRolgordijnenImage}
                  alt="Duo Roller Blinds"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-[#d5b36a]/20 transition-all duration-300"></div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#d5b36a] transition-colors duration-300">
                  Duo Roller Blinds
                </h3>
                <p className="text-gray-600 mt-2">
                  Versatile light filtering with modern appeal
                </p>
              </div>
            </div>

            {/* Overgordijnen */}
            <div 
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setLocation("/producten/overgordijnen")}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={overgordijnenImage}
                  alt="Curtains"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-[#d5b36a]/20 transition-all duration-300"></div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#d5b36a] transition-colors duration-300">
                  Curtains
                </h3>
                <p className="text-gray-600 mt-2">
                  Classic elegance for timeless interior style
                </p>
              </div>
            </div>

            {/* Plissé */}
            <div 
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setLocation("/producten/plisse")}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={plisseImage}
                  alt="Plissé Blinds"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-[#d5b36a]/20 transition-all duration-300"></div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#d5b36a] transition-colors duration-300">
                  Plissé Blinds
                </h3>
                <p className="text-gray-600 mt-2">
                  Sophisticated pleated window coverings
                </p>
              </div>
            </div>

            {/* Rolgordijnen */}
            <div 
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setLocation("/producten/rolgordijnen")}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={rolgordijnenImage}
                  alt="Roller Blinds"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-[#d5b36a]/20 transition-all duration-300"></div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#d5b36a] transition-colors duration-300">
                  Roller Blinds
                </h3>
                <p className="text-gray-600 mt-2">
                  Clean, modern lines for contemporary spaces
                </p>
              </div>
            </div>

            {/* Opzethorren */}
            <div 
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setLocation("/producten/opzethorren")}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={opzethorrenImage}
                  alt="Fly Screens"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-[#d5b36a]/20 transition-all duration-300"></div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#d5b36a] transition-colors duration-300">
                  Fly Screens
                </h3>
                <p className="text-gray-600 mt-2">
                  Fresh air protection with invisible barriers
                </p>
              </div>
            </div>
          </div>

          {/* View All Categories Button */}
          <div className="text-center">
            <Button
              onClick={() => setLocation("/producten")}
              className="
                px-8 py-4 
                text-lg font-semibold
                bg-[#d5b36a] hover:bg-[#c4a55a] 
                text-white 
                border-0
                rounded-lg
                transition-all duration-300 
                transform hover:scale-105 hover:-translate-y-1
                shadow-lg hover:shadow-xl
                group
              "
            >
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Inspiration Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Work in Real Homes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our window treatments transform living spaces with style and functionality
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Gallery Image 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={gallery1}
                alt="KANIOU window treatment installation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              
              {/* Hover overlay with view button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Gallery Image 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={gallery2}
                alt="KANIOU window treatment installation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Gallery Image 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={gallery3}
                alt="KANIOU window treatment installation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Gallery Image 4 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={gallery4}
                alt="KANIOU window treatment installation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Gallery Image 5 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={gallery5}
                alt="KANIOU window treatment installation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Gallery Image 6 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={gallery6}
                alt="KANIOU window treatment installation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d5b36a] transition-all duration-300 rounded-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* View Full Gallery Button */}
          <div className="text-center">
            <Button
              onClick={() => setLocation("/gallery")}
              className="
                px-8 py-4 
                text-lg font-semibold
                bg-[#d5b36a] hover:bg-[#c4a55a] 
                text-white 
                border-0
                rounded-lg
                transition-all duration-300 
                transform hover:scale-105 hover:-translate-y-1
                shadow-lg hover:shadow-xl
                group
              "
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from satisfied customers who transformed their homes with KANIOU
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-8 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d5b36a]/30" />
              
              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#d5b36a] fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Perfect service from start to finish! The roller blinds fit exactly and look amazing. The installation was quick and professional. Highly recommend KANIOU for quality window treatments."
              </p>

              {/* Customer Info */}
              <div>
                <p className="font-semibold text-gray-900">Maria Van Der Berg</p>
                <p className="text-sm text-gray-600">Brussels</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-8 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d5b36a]/30" />
              
              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#d5b36a] fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Excellent quality plissé blinds that completely transformed our living room. The consultation was thorough and the advice was spot-on. 30 years of experience really shows!"
              </p>

              {/* Customer Info */}
              <div>
                <p className="font-semibold text-gray-900">Johan Pieters</p>
                <p className="text-sm text-gray-600">Antwerp</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-xl p-8 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d5b36a]/30" />
              
              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#d5b36a] fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Fast delivery and beautiful curtains that exceeded our expectations. The fabric quality is outstanding and the fit is perfect. KANIOU truly delivers premium window solutions."
              </p>

              {/* Customer Info */}
              <div>
                <p className="font-semibold text-gray-900">Sophie Martens</p>
                <p className="text-sm text-gray-600">Ghent</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Ready to transform your space with premium window treatments?
            </p>
            <Button
              onClick={() => setLocation("/quote")}
              className="
                px-8 py-4 
                text-lg font-semibold
                bg-[#d5b36a] hover:bg-[#c4a55a] 
                text-white 
                border-0
                rounded-lg
                transition-all duration-300 
                transform hover:scale-105 hover:-translate-y-1
                shadow-lg hover:shadow-xl
                group
              "
            >
              Get Your Free Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>



    </>
  );
};

export default Home;
