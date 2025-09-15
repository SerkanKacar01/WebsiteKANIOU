import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Palette, Wrench, CheckCircle } from "lucide-react";
import { overgordijnenImage } from "@/assets";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Over ons | Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Ontdek het verhaal achter Kaniou Zilvernaald – specialist in gordijnen, zonweringen en maatwerkoplossingen met meer dan 30 jaar ervaring."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-[#f9f7f3] py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero text-[#2C3E50] font-bold mb-8 text-center animate-text-reveal-scale">
              <span className="text-gradient-elegant text-shadow-luxury-medium">Wie wij zijn</span>
            </h1>
            <div className="section-divider-luxury mb-12"></div>
            <p className="text-body-lg text-[#2C3E50] leading-relaxed text-center animate-text-reveal-up text-reveal-delay-1">
              Bij <span className="text-gradient-luxury font-semibold">Kaniou Zilvernaald</span> draait alles om perfectie in <span className="text-gradient-subtle font-semibold">maatwerk raamdecoratie</span>.
            </p>
          </div>
        </Container>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={overgordijnenImage}
                alt="Kaniou Zilvernaald atelier"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-title-xl text-[#2C3E50] font-bold mb-10 animate-text-reveal-scale">
                <span className="text-gradient-subtle text-shadow-luxury-soft">Meer dan 30 jaar ervaring in elegantie en vakmanschap</span>
              </h2>
              <div className="space-y-8 text-[#2C3E50] leading-relaxed">
                <p className="text-body leading-relaxed animate-text-reveal-up text-reveal-delay-2">
                  <span className="text-gradient-premium font-semibold">Kaniou Zilvernaald</span> is opgericht vanuit een passie voor stoffen, lichtinval en interieurarchitectuur.
                  Wat begon als een kleine atelier is uitgegroeid tot een vertrouwd adres voor <span className="text-gradient-subtle font-medium">verfijnde raamdecoratie</span> 
                  in heel België en Nederland.
                </p>
                <p className="text-body leading-relaxed animate-text-reveal-up text-reveal-delay-3">
                  Wij combineren <span className="text-gradient-elegant font-medium">traditioneel vakmanschap</span> met moderne technieken om unieke oplossingen op maat te bieden – 
                  van klassieke overgordijnen tot <span className="text-gradient-luxury font-medium">innovatieve zonweringssystemen</span>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-[#f9f7f3]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-title-xl text-[#2C3E50] font-bold mb-8 text-center animate-text-reveal-scale">
              <span className="text-gradient-luxury text-shadow-luxury-medium">Waar we voor staan</span>
            </h2>
            <div className="section-divider-luxury mb-12"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6C988] rounded-full mb-6">
                <Search className="w-8 h-8 text-[#2C3E50]" />
              </div>
              <h3 className="text-title-lg text-[#2C3E50] font-bold mb-4 text-shadow-luxury-soft animate-text-reveal-up text-reveal-delay-2">
                Precisie
              </h3>
              <p className="text-body text-[#2C3E50] leading-relaxed animate-text-reveal-up text-reveal-delay-3">
                Elk detail telt bij ons.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6C988] rounded-full mb-6">
                <Palette className="w-8 h-8 text-[#2C3E50]" />
              </div>
              <h3 className="text-title-lg text-[#2C3E50] font-bold mb-4 text-shadow-luxury-soft animate-text-reveal-up text-reveal-delay-2">
                Stijlvol Advies
              </h3>
              <p className="text-body text-[#2C3E50] leading-relaxed animate-text-reveal-up text-reveal-delay-3">
                Wij helpen u kiezen wat <span className="text-gradient-luxury font-medium">écht bij uw ruimte past</span>.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6C988] rounded-full mb-6">
                <Wrench className="w-8 h-8 text-[#2C3E50]" />
              </div>
              <h3 className="text-title-lg text-[#2C3E50] font-bold mb-4 text-shadow-luxury-soft animate-text-reveal-up text-reveal-delay-2">
                Maatwerk
              </h3>
              <p className="text-body text-[#2C3E50] leading-relaxed animate-text-reveal-up text-reveal-delay-3">
                Geen standaardoplossingen, enkel <span className="text-gradient-premium font-medium">uniek resultaat</span>.
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-title-lg text-[#2C3E50] font-bold mb-8 text-center animate-text-reveal-scale text-reveal-delay-4">
              <span className="text-gradient-elegant text-shadow-luxury-medium">Visie</span>
            </h3>
            <p className="text-body-lg text-[#2C3E50] leading-relaxed text-center animate-text-reveal-up text-reveal-delay-5">
              Onze missie is om <span className="text-gradient-luxury font-semibold">luxe en functionaliteit</span> samen te brengen.
              We willen dat elke klant trots kan zijn op zijn interieur, dankzij <span className="text-gradient-premium font-medium">perfecte lichtregeling, sfeer en afwerking</span>.
            </p>
          </div>
        </Container>
      </div>

      {/* Why Choose Kaniou Section */}
      <div className="py-20 bg-[#f5f5f5]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl text-[#2C3E50] font-semibold mb-6">
              Waarom kiezen voor Kaniou?
            </h2>
            <div className="w-24 h-0.5 bg-[#D5B992] mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#D5B992] flex-shrink-0 mt-1" />
                <p className="font-body text-[#2C3E50] leading-relaxed">
                  Persoonlijke aanpak met gratis advies
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#D5B992] flex-shrink-0 mt-1" />
                <p className="font-body text-[#2C3E50] leading-relaxed">
                  Snelle service & eigen ateliers
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#D5B992] flex-shrink-0 mt-1" />
                <p className="font-body text-[#2C3E50] leading-relaxed">
                  Enkel kwaliteitsmaterialen en duurzame stoffen
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#D5B992] flex-shrink-0 mt-1" />
                <p className="font-body text-[#2C3E50] leading-relaxed">
                  Elegante afwerking op maat
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-[#2C3E50] font-semibold mb-6">
              Maak kennis met Kaniou Zilvernaald.
            </h2>
            <p className="font-body text-lg text-[#2C3E50] leading-relaxed mb-10">
              Wij staan klaar om uw visie tot leven te brengen. Vraag vandaag nog vrijblijvend advies aan.
            </p>
            <Link href="/quote">
              <Button
                size="lg"
                className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Vrijblijvend Offerte aanvragen
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutPage;