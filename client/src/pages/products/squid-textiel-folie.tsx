import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import squidImage from "@assets/Scherm­afbeelding 2025-09-07 om 15.54.00_1757253521535.png";
import squidImage2 from "@assets/Scherm­afbeelding 2025-09-07 om 16.25.28_1757255147991.png";
import squidImage3 from "@assets/Scherm­afbeelding 2025-09-07 om 16.28.01_1757255311483.png";

const SquidTextielFoliePage = () => {
  const features = [
    "Elegante textieluitstraling, in verschillende neutrale kleuren",
    "Eenvoudige montage – zonder boren of schroeven",
    "Ideaal voor moderne interieurs, kantoren of monumentale panden",
    "UV-werend en warmte-regulerend",
    "Kan op maat gesneden worden voor elk raamtype",
    "Perfect voor badkamers, leefruimtes, kantoren en etalages",
    "Compatibel met draai-kiepramen, dakramen, ramen met onregelmatige vormen",
    "Zowel voor tijdelijke als permanente toepassingen",
    "Beschikbaar in kleuren: Chalk, Bone, Coal, Ash, Oak, Rock",
    "Beschikbaar in twee transparantietypes: Transparant en Opaque",
  ];

  return (
    <PageLayout
      title="Squid Textiel Folie"
      subtitle="KANIOU Collectie"
      description="SQUID® is een revolutionaire zelfklevende textielfolie voor ramen die privacy combineert met stijl. Het materiaal is semi-transparant, kleeft rechtstreeks op het raam, en biedt overdag voldoende privacy zonder het zicht volledig te blokkeren."
      metaDescription="SQUID® raamtextiel van KANIOU Zilvernaald. Revolutionaire zelfklevende textielfolie voor ramen. Privacy met stijl, eenvoudige montage zonder boren. Vanaf €69,90 per lopende meter."
      breadcrumbs={[{ label: "Producten" }, { label: "Squid Textiel Folie" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={squidImage}
                alt="SQUID® raamtextiel"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[#2C3E50] font-light mb-6">
                SQUID® <span className="font-medium italic text-[#D5B992]">Raamtextiel</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Minimalistische privacy met een luxueuze look - SQUID® is een premium product en enkel geschikt voor gladde ramen zonder structuurglas. We adviseren steeds een professionele plaatsing of gedetailleerde instructie bij zelfplaatsing.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-[#f8f6f0] rounded-xl p-6">
                  <p className="text-sm text-[#8B7355] mb-1">Vanaf</p>
                  <p className="text-3xl font-bold text-[#2C3E50]">€69,90</p>
                  <p className="text-sm text-gray-500">per lopende meter - SQUID Transparant</p>
                </div>
                <div className="bg-[#f8f6f0] rounded-xl p-6">
                  <p className="text-sm text-[#8B7355] mb-1">Vanaf</p>
                  <p className="text-3xl font-bold text-[#2C3E50]">€79,90</p>
                  <p className="text-sm text-gray-500">per lopende meter - SQUID Opaak</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Kenmerken</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">SQUID®</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-body text-[#2C3E50] text-lg leading-relaxed">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={squidImage2}
                alt="SQUID® textielfolie toepassing"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={squidImage3}
                alt="SQUID® textielfolie detail"
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default SquidTextielFoliePage;