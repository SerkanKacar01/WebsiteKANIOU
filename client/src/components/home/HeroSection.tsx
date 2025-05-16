import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background image of a living room with curtains */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
          filter: "brightness(0.9)",
        }}
      ></div>

      <Container className="h-full flex flex-col justify-center">
        <div className="max-w-lg relative z-10 pl-4">
          <h1 className="font-display text-6xl text-white font-semibold leading-tight mb-4">
            Verhef Elke Ruimte met Tijdloze Elegantie
          </h1>
          <p className="font-body text-xl text-white mb-8 opacity-90">
            Premium gordijnen & zonweringen op maat, afgestemd op uw
            interieurstijl en woonbehoeften.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/products">
              <Button className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-6 py-2.5 rounded">
                Onze collecties
              </Button>
            </Link>
            <Link href="/quote">
              <Button
                variant="outline"
                className="bg-white/80 hover:bg-white text-black px-6 py-2.5 rounded"
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
