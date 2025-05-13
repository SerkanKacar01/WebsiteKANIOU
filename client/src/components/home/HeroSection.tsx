import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-[70vh] overflow-hidden bg-[#e5e7e6]">
      {/* Using a light gray background color to match the image */}
      
      <Container className="h-full flex flex-col justify-center">
        <div className="max-w-xl relative z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#333333] font-semibold leading-tight mb-4">
            {t('hero.title')}
          </h1>
          <p className="font-body text-lg md:text-xl text-[#333333] mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <div>
                <Button size="lg" className="w-full sm:w-auto bg-[#d5c096] hover:bg-[#c4b183] text-white">
                  Browse collection
                </Button>
              </div>
            </Link>
            <Link href="/quote">
              <div>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-[#333333]">
                  Get quote
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
