import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import newCurtainsImage from "@assets/IMG_9294.jpg";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HomeIcon,
  ChevronRight,
  Check,
  Palette,
  Ruler,
  Shield,
  Layers,
  Home,
  Thermometer,
  Volume2,
  Eye,
  Moon,
  Waves,
  Tag,
  Settings,
  Sparkles,
  Droplets,
  Wind,
  Star,
} from "lucide-react";

const OvergordijnenPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Overgordijnen op Maat - Warmte, Stijl en Functionaliteit | KANIOU
          zilvernaald
        </title>
        <meta
          name="description"
          content="Overgordijnen met verduistering en extra isolatie. Katoen, linnen, velours stoffen op maat. Professionele montage vanaf €129,99. Gratis advies en opmeting."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Overgordijnen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4F1E8' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <Container>
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="font-display text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              Overgordijnen
            </h1>
            <p className="text-2xl text-primary/80 mb-8 font-medium">
              Sfeer, privacy en isolatie in één stijlvolle oplossing
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Overgordijnen zorgen voor een warme uitstraling in elke ruimte. Ze zijn ideaal voor het creëren van privacy, het tegenhouden van licht en het verbeteren van de akoestiek. Verkrijgbaar in diverse stoffen, kleuren en plooistijlen.
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span>📋</span>
                <span className="font-medium">Offerte aanvragen</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <span>🔧</span>
                <span className="font-medium">Op maat gemaakt</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                <span>🚚</span>
                <span className="font-medium">Levering in België & Nederland</span>
              </div>
            </div>

            {/* CTA Block */}
            <div className="bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl p-8 mb-8 shadow-xl">
              <p className="text-center text-gray-800 font-semibold mb-4">
                Online op maat bestellen – eenvoudig & snel!
              </p>
              <div className="text-center">
                <Button size="lg" asChild className="text-lg px-12 py-6 bg-white text-gray-800 hover:bg-gray-50 shadow-lg">
                  <Link href="/configurator/overgordijnen">🔧 Stel jouw overgordijnen samen</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-10 py-6 bg-primary hover:bg-primary/90">
                <Link href="/quote">📋 Vraag offerte aan</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-10 py-6">
                <Link href="/contact">💬 Gratis advies</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Why Choose Our Overgordijnen Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Waarom kiezen voor onze overgordijnen?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Verduisterend of lichtdempend mogelijk</h3>
              <p className="text-gray-600">Kies tussen verschillende niveaus van lichtregulatie</p>
            </div>

            <div className="text-center p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Check className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Akoestische en isolerende werking</h3>
              <p className="text-gray-600">Verbeterde geluidsisolatie en energiebesparing</p>
            </div>

            <div className="text-center p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Check className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Diverse plooien: enkele, dubbele, wave-plooien</h3>
              <p className="text-gray-600">Keuze uit verschillende plooistijlen voor elke smaak</p>
            </div>

            <div className="text-center p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Check className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Op maat gemaakt voor elk interieur</h3>
              <p className="text-gray-600">Perfecte pasvorm voor elke raam- en deuropening</p>
            </div>

            <div className="text-center p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Combineerbaar met vitrages of inbetween</h3>
              <p className="text-gray-600">Flexibele combinatiemogelijkheden</p>
            </div>

            <div className="text-center p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                <Check className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Professionele afwerking en plaatsing</h3>
              <p className="text-gray-600">Vakkundige montage en perfecte afwerking</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Personaliseer uw overgordijnen Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Personaliseer uw overgordijnen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Velours stoffen</h3>
              <p className="text-gray-600 text-sm text-center">Luxueuze velours stoffen voor een rijke uitstraling en warme sfeer.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Linnenlook stoffen</h3>
              <p className="text-gray-600 text-sm text-center">Natuurlijke linnenlook voor een casual maar elegante uitstraling.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Dimout stoffen</h3>
              <p className="text-gray-600 text-sm text-center">Lichtdimmende stoffen die het meeste licht tegenhouden maar niet volledig verduisteren.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Blackout stoffen</h3>
              <p className="text-gray-600 text-sm text-center">Volledig verduisterende stoffen voor optimale rust en privacy.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Kleuren</h3>
              <p className="text-gray-600 text-sm text-center">Uitgebreide kleurenkeuze van subtiele tinten tot statement kleuren.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Bevestiging</h3>
              <p className="text-gray-600 text-sm text-center">Verschillende bevestigingsmogelijkheden voor elke interieurstijl.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">Voering (optioneel)</h3>
              <p className="text-gray-600 text-sm text-center">Extra voering voor verbeterde verduistering en isolatie.</p>
            </div>
          </div>

          {/* Bestelproces uitleg */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-blue-900">
                📋 Offerte aanvragen - Zo eenvoudig is het!
              </h3>
              <p className="text-lg text-blue-800 leading-relaxed max-w-3xl mx-auto">
                U kunt uw overgordijnen volledig op maat samenstellen en online bestellen via onze eenvoudige configurator. 
                Kies uw gewenste stof, plooi, kleur en afwerking – en ontvang direct een prijs en levertermijn. 
                Wij zorgen voor een perfecte afwerking en snelle levering.
              </p>
              <div className="mt-6">
                <Button size="lg" asChild className="text-lg px-10 py-4 bg-blue-600 hover:bg-blue-700">
                  <Link href="/configurator/overgordijnen">🔧 Start online configurator</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Onderhoud & Advies Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Zorg voor langdurige schoonheid
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Regelmatig uitkloppen of zacht stofzuigen</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sommige stoffen zijn wasbaar of stoomreinbaar</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professionele reiniging voor optimaal resultaat</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Vermijd direct zonlicht bij het drogen</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 text-center text-blue-900">
                Professionele reiniging aanbevolen
              </h3>
              <p className="text-blue-700 text-sm text-center">
                Voor optimaal resultaat adviseren wij professionele reiniging die de kwaliteit en kleur van uw gordijnen behoudt.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary font-semibold mb-6">
              Veelgestelde vragen over overgordijnen
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="bg-white rounded-lg mb-4 px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Wat is het verschil tussen enkele en dubbele plooi?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Enkele plooi geeft een strakke, minimalistische uitstraling, terwijl dubbele plooi meer volume en een rijkere, elegantere uitstraling biedt. Dubbele plooi is populair omdat het meer body aan de gordijnen geeft.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg mb-4 px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Wat zijn wave-plooi gordijnen?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Wave-plooi gordijnen hebben moderne, vloeiende lijnen die een golfbeweging creëren. Dit geeft een eigentijdse, luxueuze uitstraling die perfect past bij moderne interieurstijlen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg mb-4 px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Kunnen overgordijnen gecombineerd worden met andere raamdecoratie?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Ja, overgordijnen kunnen uitstekend gecombineerd worden met vitrages voor privacy overdag, of met inbetween gordijnen voor een gelaagde look en optimale lichtregulatie.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg mb-4 px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Hoe verbeteren overgordijnen de akoestiek?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Overgordijnen, vooral met voering, absorberen geluid en verminderen echo's in de ruimte. Ze helpen ook om geluid van buitenaf te dempen, wat resulteert in een rustiger en comfortabeler woonklimaat.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </div>

      {/* Bottom CTA Section */}
      <div className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Klaar voor uw perfecte overgordijnen?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Ontdek uw overgordijnen op maat en zie hoe ze uw interieur kunnen transformeren met sfeer, privacy en isolatie. Bekijk onze opties!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="text-lg px-10 py-6 bg-amber-500 hover:bg-amber-600">
                <Link href="/quote">📋 Vraag offerte aan</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-10 py-6 border-white text-white hover:bg-white hover:text-gray-800">
                <Link href="/quote">📋 Vraag offerte aan</Link>
              </Button>
            </div>
            <p className="text-slate-400 text-sm mt-4">📞 Gratis advies • Persoonlijke service • Vakmanschap</p>
          </div>
        </Container>
      </div>

      {/* Sticky Mobile Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary p-4 shadow-lg md:hidden">
        <Button asChild className="w-full text-lg py-4 bg-amber-500 hover:bg-amber-600">
          <Link href="/quote">📋 Offerte aanvragen</Link>
        </Button>
      </div>
    </>
  );
};

export default OvergordijnenPage;