import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Grid3x3, Square, DoorOpen, RotateCcw, Settings, Recycle, Shield, Ruler } from "lucide-react";

export default function HorrenPage() {
  return (
    <PageLayout
      title="Horren op Maat"
      subtitle="KANIOU Collectie"
      description="Bij KANIOU Zilvernaald geloven we dat frisse lucht naar binnen mag, maar ongewenste insecten buiten moeten blijven. Onze horren op maat combineren subtiele vormgeving met betrouwbare bescherming."
      metaDescription="Horren op maat van KANIOU Zilvernaald. Inzethorren, opzethorren, plissé hordeuren en meer. 5 jaar garantie, professionele montage. Frisse lucht binnen, insecten buiten."
      breadcrumbs={[{ label: "Producten" }, { label: "Horren" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">onze horren</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Volledig op maat gemaakt – tot op de millimeter nauwkeurig</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Geruisloze bediening – geen storende geluiden bij openen of sluiten</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Duurzame materialen – weerbestendig en kleurvast</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Subtiel design – past perfect bij ieder interieur of kozijnkleur</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Oplossingen voor elke situatie – ook voor dakramen, schuifdeuren en draaikiepramen</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              <span className="font-medium italic text-[#D5B992]">Producttypes</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Square className="h-6 w-6 text-[#D5B992]" />
                    <h4 className="font-semibold text-[#2C3E50] text-lg">Inzethorren</h4>
                  </div>
                  <p className="text-gray-700">
                    Ideaal voor kunststof draaikiepramen. Montage zonder schroeven. Snel te plaatsen en te verwijderen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-[#D5B992]" />
                    <h4 className="font-semibold text-[#2C3E50] text-lg">Opzethorren</h4>
                  </div>
                  <p className="text-gray-700">
                    Voor ramen zonder draaifunctie. Worden op het kozijn geplaatst, geschikt voor vaste montage.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <DoorOpen className="h-6 w-6 text-[#D5B992]" />
                    <h4 className="font-semibold text-[#2C3E50] text-lg">Plissé Hordeuren</h4>
                  </div>
                  <p className="text-gray-700">
                    Perfect voor schuifpuien, balkondeuren en terrasdeuren. De plisséstof vouwt stijlvol op en neemt minimale ruimte in beslag.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <RotateCcw className="h-6 w-6 text-[#D5B992]" />
                    <h4 className="font-semibold text-[#2C3E50] text-lg">Rolhorren</h4>
                  </div>
                  <p className="text-gray-700">
                    Horizontaal of verticaal oprolbaar. Zeer geschikt voor ramen waar flexibiliteit gewenst is.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="h-6 w-6 text-[#D5B992]" />
                    <h4 className="font-semibold text-[#2C3E50] text-lg">Scharnierende Hordeuren</h4>
                  </div>
                  <p className="text-gray-700">
                    Stevige deuren met scharnieren, ideaal voor dagelijks gebruik met magnetische sluiting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Montage en <span className="font-medium italic text-[#D5B992]">Afwerking</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg text-center">
              Al onze horren zijn verkrijgbaar in verschillende kleuren, waaronder wit, crème, antraciet en zwart. 
              Dankzij ons eigen montageteam ben je verzekerd van een perfecte plaatsing zonder beschadigingen. 
              De afwerking wordt steeds aangepast aan jouw kozijnen en gebruiksgemak.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Recycle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">Onderhoud</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Onze horren zijn eenvoudig schoon te maken met een zachte borstel of vochtige doek. 
                  Het gaas is UV-bestendig en vormvast, waardoor het jarenlang meegaat zonder verkleuring of uitzakking.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">Garantie</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Wij bieden standaard 5 jaar garantie op al onze horren – inclusief frame, gaas en mechaniek. 
                  Kwaliteit en duurzaamheid staan bij ons voorop.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ruler className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">Made-to-Measure</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Elke hor wordt 100% op maat geproduceerd in onze ateliers. 
                  Wij nemen zelf de afmetingen op bij jou thuis of begeleiden je in het correct meten, zodat je altijd zeker bent van een perfecte pasvorm.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}