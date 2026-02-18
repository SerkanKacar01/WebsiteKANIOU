import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Palette, Settings, Package, HelpCircle } from "lucide-react";

export default function GordijnroedesPage() {
  return (
    <PageLayout
      title="Gordijnroedes"
      subtitle="KANIOU Collectie"
      description="Een gordijnroede is meer dan een functioneel ophangsysteem — het is een belangrijk onderdeel van jouw interieurstijl. Bij Kaniou Zilvernaald bieden we een zorgvuldig samengestelde collectie gordijnroedes op maat."
      metaDescription="Gordijnroedes op maat van KANIOU Zilvernaald. Volledig maatwerk in hout, metaal en designafwerkingen. Professionele montage en advies op locatie. 30+ jaar ervaring."
      breadcrumbs={[{ label: "Producten" }, { label: "Gordijnroedes" }]}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Kenmerken</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Belangrijkste <span className="font-medium italic text-[#D5B992]">Kenmerken</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Volledig op maat gezaagd tot op de centimeter nauwkeurig</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Geschikt voor lichte tot zware overgordijnen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Keuze uit wand- of plafondmontage</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Verkrijgbaar in hout, metaal of combinaties</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Ruime keuze in eindknoppen, steunen en ringen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Compatibel met ringen, glijders of lussen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Perfecte combinatie mogelijk met waveplooi of ringen-gordijnen</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
              <Palette className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Materialen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Materialen & <span className="font-medium italic text-[#D5B992]">Afwerkingen</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Onze gordijnroedes zijn verkrijgbaar in verschillende materialen en stijlen
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h4 className="font-semibold text-[#2C3E50] text-lg mb-4">Metalen Roedes</h4>
                <div className="space-y-2">
                  {["RVS", "Mat zwart", "Geborsteld staal", "Messing"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h4 className="font-semibold text-[#2C3E50] text-lg mb-4">Houten Roedes</h4>
                <div className="space-y-2">
                  {["Wit gelakt", "Eiken", "Notelaar", "Walnoot", "Naturel"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h4 className="font-semibold text-[#2C3E50] text-lg mb-4">Designlijnen</h4>
                <div className="space-y-2">
                  {["Verfijnt eindkappen", "Klassiek tot Modern"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mt-4 italic text-sm">
                  Elke roede wordt met precisie afgewerkt voor een duurzaam en esthetisch resultaat.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Montage</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Montage & <span className="font-medium italic text-[#D5B992]">Compatibiliteit</span>
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Afhankelijk van het gekozen gordijntype en het gewicht bieden wij
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Eenvoudige wandbeugels of luxe designsteunen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Dubbele roedesystemen voor vitrage + overgordijn</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Extra stevige steunen voor brede ramen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Bochtsets voor erkers of speciale vormen (op aanvraag)</p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mt-8 italic text-center max-w-4xl mx-auto">
            Onze specialisten adviseren je graag bij het kiezen van het juiste bevestigingssysteem voor jouw ruimte.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-4 py-2 rounded-full mb-6 shadow-sm">
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Waarom Kaniou</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
              Waarom kiezen voor <span className="font-medium italic text-[#D5B992]">Kaniou</span>?
            </h2>
            <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Meer dan 30+ jaar ervaring in gordijnoplossingen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Maatwerk + advies op locatie</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Combinatie met bijpassende gordijnen mogelijk</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D5B992] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Gegarandeerde kwaliteit en duurzaamheid</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#f8f6f0] text-[#8B7355] px-4 py-2 rounded-full mb-6">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Veelgestelde vragen</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-light mb-6">
                Heeft u <span className="font-medium italic text-[#D5B992]">vragen</span>?
              </h2>
              <div className="w-24 h-px bg-[#D5B992] mx-auto"></div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-[#f8f6f0]/50 transition-colors duration-300">
                  <span className="font-display text-lg font-semibold text-[#2C3E50]">Past dit bij elk gordijn?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-[#8B7355] font-body leading-relaxed">
                  Ja, of je nu overgordijnen met ringen, waveplooi of lussen hebt – we hebben geschikte roedesystemen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-[#f8f6f0]/50 transition-colors duration-300">
                  <span className="font-display text-lg font-semibold text-[#2C3E50]">Kan ik de kleur van de roede zelf kiezen?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-[#8B7355] font-body leading-relaxed">
                  Zeker. We bieden een ruim palet van kleuren en afwerkingen aan. Stalen zijn op aanvraag beschikbaar.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-[#f8f6f0]/50 transition-colors duration-300">
                  <span className="font-display text-lg font-semibold text-[#2C3E50]">Wat is het verschil tussen een roede en een rail?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-[#8B7355] font-body leading-relaxed">
                  Een roede is meestal zichtbaar en decoratief, terwijl een rail subtiel weggewerkt is in het plafond of achter de gordijnen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-[#f8f6f0]/50 transition-colors duration-300">
                  <span className="font-display text-lg font-semibold text-[#2C3E50]">Is montage inbegrepen?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-[#8B7355] font-body leading-relaxed">
                  Ja, onze vakmensen zorgen voor professionele installatie met oog voor symmetrie en stevigheid.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}