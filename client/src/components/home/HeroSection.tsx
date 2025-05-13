import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background image of a bedroom with curtains */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
          filter: "brightness(0.9)",
        }}
      ></div>
      
      <Container className="h-full flex flex-col justify-center">
        <div className="max-w-md relative z-10 pl-3">
          <h1 className="font-display text-5xl text-white font-semibold leading-none mb-1">
            hero.title
          </h1>
          <p className="font-body text-lg text-white mb-4 opacity-90">
            hero.subtitle
          </p>
          <div className="flex gap-2 mt-2">
            <Link href="/products">
              <div className="bg-[#d5c096] hover:bg-[#c4b183] px-4 py-1.5 rounded-sm cursor-pointer">
                <span className="text-white text-sm">hero.cta</span>
              </div>
            </Link>
            <Link href="/quote">
              <div className="bg-white/80 hover:bg-white px-4 py-1.5 rounded-sm cursor-pointer">
                <span className="text-black text-sm">nav.quote</span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
