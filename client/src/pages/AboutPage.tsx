import { Search, Palette, Wrench, CheckCircle } from "lucide-react";
import { overgordijnenImage } from "@/assets";
import Container from "@/components/ui/container";
import PageLayout from "@/components/layout/PageLayout";

const AboutPage = () => {
  return (
    <PageLayout
      title="Over Ons"
      subtitle="Ons Verhaal"
      description="Meer dan 30 jaar ervaring in elegantie en vakmanschap voor verfijnde raamdecoratie."
      metaDescription="Ontdek het verhaal achter Kaniou Zilvernaald – specialist in gordijnen, zonweringen en maatwerkoplossingen met meer dan 30 jaar ervaring."
      breadcrumbs={[{ label: "Over Ons" }]}
      showCTA={true}
    >
      <section className="py-16 lg:py-20 bg-white">
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
              <h2 className="font-display text-3xl text-[#2C3E50] font-semibold mb-8">
                Meer dan 30 jaar ervaring in elegantie en vakmanschap
              </h2>
              <div className="space-y-6 text-[#2C3E50] font-body leading-relaxed">
                <p>
                  Kaniou Zilvernaald is opgericht vanuit een passie voor stoffen, lichtinval en interieurarchitectuur.
                  Wat begon als een kleine atelier is uitgegroeid tot een vertrouwd adres voor verfijnde raamdecoratie 
                  in heel België en Nederland.
                </p>
                <p>
                  Wij combineren traditioneel vakmanschap met moderne technieken om unieke oplossingen op maat te bieden – 
                  van klassieke overgordijnen tot innovatieve zonweringssystemen.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-[#FAFAF8]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl text-[#2C3E50] font-semibold mb-6">
              Waar we voor staan
            </h2>
            <div className="w-24 h-0.5 bg-[#D5B992] mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6C988] rounded-full mb-6">
                <Search className="w-8 h-8 text-[#2C3E50]" />
              </div>
              <h3 className="font-display text-xl text-[#2C3E50] font-semibold mb-4">
                Precisie
              </h3>
              <p className="font-body text-[#2C3E50] leading-relaxed">
                Elk detail telt bij ons.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6C988] rounded-full mb-6">
                <Palette className="w-8 h-8 text-[#2C3E50]" />
              </div>
              <h3 className="font-display text-xl text-[#2C3E50] font-semibold mb-4">
                Stijlvol Advies
              </h3>
              <p className="font-body text-[#2C3E50] leading-relaxed">
                Wij helpen u kiezen wat écht bij uw ruimte past.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6C988] rounded-full mb-6">
                <Wrench className="w-8 h-8 text-[#2C3E50]" />
              </div>
              <h3 className="font-display text-xl text-[#2C3E50] font-semibold mb-4">
                Maatwerk
              </h3>
              <p className="font-body text-[#2C3E50] leading-relaxed">
                Geen standaardoplossingen, enkel uniek resultaat.
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h3 className="font-display text-2xl text-[#2C3E50] font-semibold mb-6">
              Visie
            </h3>
            <p className="font-body text-lg text-[#2C3E50] leading-relaxed">
              Onze missie is om luxe en functionaliteit samen te brengen.
              We willen dat elke klant trots kan zijn op zijn interieur, dankzij perfecte lichtregeling, sfeer en afwerking.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
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
      </section>
    </PageLayout>
  );
};

export default AboutPage;
