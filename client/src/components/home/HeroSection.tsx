import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import NewsletterSignup from "@/components/layout/NewsletterSignup";
import { Gift, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    const element = document.getElementById('featured-categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Beautiful curtain showcase background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')",
          filter: "brightness(0.85)",
        }}
      ></div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

      <Container className="h-full flex flex-col justify-center">
        <div className="max-w-lg relative z-10 pl-4 mx-4 sm:mx-0">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-4">
            Verhef Elke Ruimte met Tijdloze Elegantie
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 opacity-90">
            Jaloezieën op maat – stijlvol, functioneel en betaalbaar
          </p>
          
          {/* Dual Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center sm:justify-start">
            <Button 
              onClick={scrollToProducts}
              className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              Bekijk alle producten
            </Button>
            <Button
              onClick={scrollToQuote}
              variant="outline"
              className="bg-transparent border-2 border-[#d5c096] text-white hover:bg-[#d5c096] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              Direct offerte aanvragen
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
