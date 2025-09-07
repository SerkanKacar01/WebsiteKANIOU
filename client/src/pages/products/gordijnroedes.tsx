import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Palette, Settings, Package, Phone, MapPin, Mail } from 'lucide-react';

export default function GordijnroedesPage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <Helmet>
        <title>Gordijnroedes op Maat - Stijlvolle Ondersteuning | KANIOU Zilvernaald</title>
        <meta 
          name="description" 
          content="Gordijnroedes op maat van KANIOU Zilvernaald. Volledig maatwerk in hout, metaal en designafwerkingen. Professionele montage en advies op locatie. 30+ jaar ervaring." 
        />
        <meta name="keywords" content="gordijnroedes op maat, gordijnroede hout, gordijnroede metaal, maatwerk gordijnroedes, België" />
      </Helmet>
      
      <Container className="py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/producten">Producten</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gordijnroedes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6">
          {/* Hero Section */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-4xl font-bold text-[#2C3E50] mb-2">
                Gordijnroedes op Maat
              </CardTitle>
              <p className="text-xl text-[#2C3E50] font-medium">
                Stijlvolle ondersteuning voor elk gordijn
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Een gordijnroede is meer dan een functioneel ophangsysteem — het is een belangrijk onderdeel van jouw interieurstijl. 
                Bij Kaniou Zilvernaald bieden we een zorgvuldig samengestelde collectie gordijnroedes op maat, passend bij elk type gordijn, interieur en persoonlijke voorkeur.
              </p>
            </CardHeader>
          </Card>

          {/* Belangrijkste Kenmerken */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-[#D5B992]" />
                Belangrijkste Kenmerken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          {/* Materialen & Afwerkingen */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Palette className="h-6 w-6 text-[#D5B992]" />
                Materialen & Afwerkingen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Onze gordijnroedes zijn verkrijgbaar in verschillende materialen en stijlen:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#2C3E50] text-lg">Metalen Roedes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">RVS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Mat zwart</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Geborsteld staal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Messing</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#2C3E50] text-lg">Houten Roedes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Wit gelakt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Eiken</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Notelaar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Walnoot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Naturel</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#2C3E50] text-lg">Designlijnen</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Kubusvormige eindstukken</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D5B992] rounded-full"></div>
                      <span className="text-gray-700">Klassieke eindstukken</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mt-6 italic">
                Elke roede wordt met precisie afgewerkt voor een duurzaam en esthetisch resultaat.
              </p>
            </CardContent>
          </Card>

          {/* Montage & Compatibiliteit */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Settings className="h-6 w-6 text-[#D5B992]" />
                Montage & Compatibiliteit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Afhankelijk van het gekozen gordijntype en het gewicht bieden wij:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
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
              
              <p className="text-gray-600 mt-6 italic">
                Onze specialisten adviseren je graag bij het kiezen van het juiste bevestigingssysteem voor jouw ruimte.
              </p>
            </CardContent>
          </Card>

          {/* Waarom Kaniou */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Package className="h-6 w-6 text-[#D5B992]" />
                Waarom kiezen voor Kaniou?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50]">
                Veelgestelde Vragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[#2C3E50] font-medium">
                    Past dit bij elk gordijn?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Ja, of je nu overgordijnen met ringen, waveplooi of lussen hebt – we hebben geschikte roedesystemen.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-[#2C3E50] font-medium">
                    Kan ik de kleur van de roede zelf kiezen?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Zeker. We bieden een ruim palet van kleuren en afwerkingen aan. Stalen zijn op aanvraag beschikbaar.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-[#2C3E50] font-medium">
                    Wat is het verschil tussen een roede en een rail?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Een roede is meestal zichtbaar en decoratief, terwijl een rail subtiel weggewerkt is in het plafond of achter de gordijnen.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-[#2C3E50] font-medium">
                    Is montage inbegrepen?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Ja, onze vakmensen zorgen voor professionele installatie met oog voor symmetrie en stevigheid.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">Interesse?</CardTitle>
              <p className="text-lg">
                Vraag vandaag nog vrijblijvend een offerte aan of bezoek onze showroom voor inspiratie en advies.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <MapPin className="h-8 w-8 text-[#E6C988]" />
                  <p className="text-sm">Pauwengraaf 66, Maasmechelen</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Mail className="h-8 w-8 text-[#E6C988]" />
                  <p className="text-sm">info@kaniou.be</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Phone className="h-8 w-8 text-[#E6C988]" />
                  <p className="text-sm">+32 467 85 64 05</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}