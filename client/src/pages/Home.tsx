import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/HeroSection";
import SmartWelcomeButtons from "@/components/home/SmartWelcomeButtons";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import AIStyleGuide from "@/components/home/AIStyleGuide";
import TestimonialSection from "@/components/home/TestimonialSection";
import GallerySection from "@/components/home/GallerySection";
import AboutCompany from "@/components/home/AboutCompany";
import InteractiveFeaturesSection from "@/components/home/InteractiveFeaturesSection";
import SmartQuoteModule from "@/components/home/SmartQuoteModule";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import OrderTrackingSearchBar from "@/components/home/OrderTrackingSearchBar";

import QuoteRequestSection from "@/components/home/QuoteRequestSection";
import ContactSection from "@/components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>KANIOU zilvernaald | Premium Gordijnen & Zonweringen</title>
        <meta
          name="description"
          content="Transform your space with Elegant Drapes' premium curtains, blinds, and window treatments. Custom solutions tailored to your style and needs."
        />
      </Helmet>
      
      <HeroSection />
      
      {/* Order Tracking Search Bar */}
      <div className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <OrderTrackingSearchBar />
        </div>
      </div>
      
      <SmartWelcomeButtons />
      <FeaturedCategories />
      <AIStyleGuide />
      <InteractiveFeaturesSection />
      <SmartQuoteModule />
      <TestimonialSection />
      <GallerySection />

      <AboutCompany />
      <QuoteRequestSection />
      <ContactSection />
      
      {/* Newsletter Subscription Banner */}
      <NewsletterBanner />
    </>
  );
};

export default Home;
