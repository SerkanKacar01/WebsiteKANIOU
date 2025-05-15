import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialSection from "@/components/home/TestimonialSection";
import GallerySection from "@/components/home/GallerySection";
import AboutCompany from "@/components/home/AboutCompany";
import QuoteRequestSection from "@/components/home/QuoteRequestSection";
import ContactSection from "@/components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Elegant Drapes | Premium Curtains & Window Treatments</title>
        <meta
          name="description"
          content="Transform your space with Elegant Drapes' premium curtains, blinds, and window treatments. Custom solutions tailored to your style and needs."
        />
      </Helmet>
      
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <TestimonialSection />
      <GallerySection />
      <AboutCompany />
      <QuoteRequestSection />
      <ContactSection />
    </>
  );
};

export default Home;
