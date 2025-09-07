import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { CheckCircle, Target, Grid3x3, Square, DoorOpen, RotateCcw, Settings, Recycle, Shield, Ruler, Phone, Mail, MapPin } from 'lucide-react';

export default function HorrenPage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <Helmet>
        <title>Horren op Maat - Comfort en Bescherming in Stijl | KANIOU Zilvernaald</title>
        <meta 
          name="description" 
          content="Horren op maat van KANIOU Zilvernaald. Inzethorren, opzethorren, plissé hordeuren en meer. 5 jaar garantie, professionele montage. Frisse lucht binnen, insecten buiten." 
        />
        <meta name="keywords" content="horren op maat, inzethorren, opzethorren, plissé hordeuren, insectengaas, België" />
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
              <BreadcrumbPage>Horren</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6">
          {/* Hero Section */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-4xl font-bold text-[#2C3E50] mb-2">
                Horren op Maat
              </CardTitle>
              <p className="text-xl text-[#2C3E50] font-medium">
                Comfort en Bescherming in Stijl
              </p>
              <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                Bij KANIOU Zilvernaald geloven we dat frisse lucht naar binnen mag, maar ongewenste insecten buiten moeten blijven. 
                Onze horren op maat combineren subtiele vormgeving met betrouwbare bescherming, perfect afgestemd op jouw ramen en deuren. 
                Of je nu kiest voor een vaste, draaibare of plissévariant – wij leveren altijd een nauwkeurige pasvorm en hoogwaardige afwerking.
              </p>
            </CardHeader>
          </Card>

          {/* Waarom kiezen voor onze horren */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Target className="h-6 w-6 text-[#D5B992]" />
                Waarom kiezen voor onze horren?
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Producttypes */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Grid3x3 className="h-6 w-6 text-[#D5B992]" />
                Producttypes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#F8F9FA] p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Square className="h-6 w-6 text-[#D5B992]" />
                      <h4 className="font-semibold text-[#2C3E50] text-lg">Inzethorren</h4>
                    </div>
                    <p className="text-gray-700">
                      Ideaal voor kunststof draaikiepramen. Montage zonder schroeven. Snel te plaatsen en te verwijderen.
                    </p>
                  </div>
                  
                  <div className="bg-[#F8F9FA] p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-[#D5B992]" />
                      <h4 className="font-semibold text-[#2C3E50] text-lg">Opzethorren</h4>
                    </div>
                    <p className="text-gray-700">
                      Voor ramen zonder draaifunctie. Worden op het kozijn geplaatst, geschikt voor vaste montage.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#F8F9FA] p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <DoorOpen className="h-6 w-6 text-[#D5B992]" />
                      <h4 className="font-semibold text-[#2C3E50] text-lg">Plissé Hordeuren</h4>
                    </div>
                    <p className="text-gray-700">
                      Perfect voor schuifpuien, balkondeuren en terrasdeuren. De plisséstof vouwt stijlvol op en neemt minimale ruimte in beslag.
                    </p>
                  </div>
                  
                  <div className="bg-[#F8F9FA] p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <RotateCcw className="h-6 w-6 text-[#D5B992]" />
                      <h4 className="font-semibold text-[#2C3E50] text-lg">Rolhorren</h4>
                    </div>
                    <p className="text-gray-700">
                      Horizontaal of verticaal oprolbaar. Zeer geschikt voor ramen waar flexibiliteit gewenst is.
                    </p>
                  </div>
                  
                  <div className="bg-[#F8F9FA] p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Settings className="h-6 w-6 text-[#D5B992]" />
                      <h4 className="font-semibold text-[#2C3E50] text-lg">Scharnierende Hordeuren</h4>
                    </div>
                    <p className="text-gray-700">
                      Stevige deuren met scharnieren, ideaal voor dagelijks gebruik met magnetische sluiting.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Montage en Afwerking */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Settings className="h-6 w-6 text-[#D5B992]" />
                Montage en Afwerking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Al onze horren zijn verkrijgbaar in verschillende kleuren, waaronder wit, crème, antraciet en zwart. 
                Dankzij ons eigen montageteam ben je verzekerd van een perfecte plaatsing zonder beschadigingen. 
                De afwerking wordt steeds aangepast aan jouw kozijnen en gebruiksgemak.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Onderhoud */}
            <Card className="bg-white shadow-sm border-[#E6C988]/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#2C3E50] flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-[#D5B992]" />
                  Onderhoud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Onze horren zijn eenvoudig schoon te maken met een zachte borstel of vochtige doek. 
                  Het gaas is UV-bestendig en vormvast, waardoor het jarenlang meegaat zonder verkleuring of uitzakking.
                </p>
              </CardContent>
            </Card>

            {/* Garantie */}
            <Card className="bg-white shadow-sm border-[#E6C988]/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#2C3E50] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#D5B992]" />
                  Garantie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Wij bieden standaard 5 jaar garantie op al onze horren – inclusief frame, gaas en mechaniek. 
                  Kwaliteit en duurzaamheid staan bij ons voorop.
                </p>
              </CardContent>
            </Card>

            {/* Made-to-Measure */}
            <Card className="bg-white shadow-sm border-[#E6C988]/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#2C3E50] flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-[#D5B992]" />
                  Made-to-Measure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Elke hor wordt 100% op maat geproduceerd in onze ateliers. 
                  Wij nemen zelf de afmetingen op bij jou thuis of begeleiden je in het correct meten, zodat je altijd zeker bent van een perfecte pasvorm.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">Vraag een vrijblijvende offerte aan</CardTitle>
              <p className="text-lg">
                Wil je weten welke hor het best past bij jouw ramen of deuren?
              </p>
              <p className="text-base mt-2">
                Klik hieronder voor gratis advies of een vrijblijvende offerte.
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