import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://pixabay.com/get/ge1b0bd2a58bc087af5a183393f59af6069457d6847b1138080076ba2fed8732ba996cead471a0bbab0e606d3bba35573549f25f83d1859e8945b79670be0610d_1280.jpg')",
          filter: "brightness(0.85)",
        }}
      ></div>
      
      <div className="absolute inset-0 bg-primary opacity-20"></div>
      
      <Container className="h-full flex flex-col justify-center">
        <div className="max-w-xl relative z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-4">
            Transform Your Space With Elegant Window Treatments
          </h1>
          <p className="font-body text-lg md:text-xl text-white mb-8">
            Premium curtains, blinds, and drapes tailored to your style and needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <div>
                <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-accent text-white">
                  Browse Collection
                </Button>
              </div>
            </Link>
            <Link href="/quote">
              <div>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-primary">
                  Request Quote
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
