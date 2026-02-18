import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Star, Paintbrush, Palette } from "lucide-react";

export default function ScreenPage() {
  return (
    <PageLayout
      title="Screens"
      subtitle="KANIOU Collectie"
      description="Uw screen raamdecoratie is volledig uitgewerkt en design gereed. Van concept tot technische specificaties - alles is professioneel voorbereid voor een perfecte uitvoering."
      metaDescription="Design gereed screen raamdecoratie van KANIOU Zilvernaald. Professioneel ontwikkelde designs, klaar voor productie en installatie."
      breadcrumbs={[{ label: "Producten" }, { label: "Screens" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Design <span className="font-medium italic text-[#D5B992]">Status</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">Design Voltooid</h3>
                <p className="text-gray-600">
                  Alle technische tekeningen en specificaties zijn afgerond en goedgekeurd.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">Materialen Geselecteerd</h3>
                <p className="text-gray-600">
                  Hoogwaardige materialen en kleuren zijn zorgvuldig uitgekozen voor optimaal resultaat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-3">Productie Klaar</h3>
                <p className="text-gray-600">
                  Uw screen is gereed om in productie te gaan. Snelle levering gegarandeerd.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Uw Design <span className="font-medium italic text-[#D5B992]">Voordelen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg">Professioneel uitgewerkt tot in de kleinste details</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#E6C988] rounded-full mx-auto flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Premium Kwaliteit</h3>
                <p className="text-gray-600 text-sm">Uitsluitend gebruik van hoogwaardige materialen</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-full mx-auto flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Perfecte Pasvorm</h3>
                <p className="text-gray-600 text-sm">Millimeter precies op maat gemaakt</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center mb-6">
                  <Paintbrush className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Design Excellence</h3>
                <p className="text-gray-600 text-sm">Stijlvol en functioneel ontwerp</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Snelle Levering</h3>
                <p className="text-gray-600 text-sm">Efficiënte productie en montage</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}