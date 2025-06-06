import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import NewsletterSignup from "@/components/layout/NewsletterSignup";
import { Gift } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();

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
            Premium gordijnen & zonweringen op maat, afgestemd op uw
            interieurstijl en woonbehoeften.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Link href="/price-calculator">
              <Button className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded w-full sm:w-auto">
                Bekijk onze collecties & prijzen
              </Button>
            </Link>
            <Link href="/quote">
              <Button
                variant="outline"
                className="bg-white/80 hover:bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded w-full sm:w-auto mt-2 sm:mt-0"
              >
                Vrijblijvend offerte aanvragen
              </Button>
            </Link>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
