import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Palette, Settings, Wrench, Euro, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const HoutenJaloezieen = () => {
  const benefits = [
    "Gemaakt van echt hout of bamboe",
    "Warme en natuurlijke uitstraling",
    "Beschikbaar in lamelbreedtes van 25, 50 en 65 mm",
    "Duurzaam, sterk en vormvast",
    "Leverbaar in diverse houtsoorten en kleuren",
    "Ook geschikt voor vochtige ruimtes bij keuze voor bamboe of behandeld hout"
  ];

  const materials = [
    { name: "Populierenhout", description: "Duurzaam en lichtgewicht" },
    { name: "Abachi", description: "Tropisch hardhout" },
    { name: "Bamboe", description: "Duurzaam en vochtbestendig" }
  ];

  const colors = [
    "Natuurlijke houtkleuren",
    "Wit",
    "Zwart", 
    "Antraciet",
    "Taupe"
  ];

  const finishes = [
    "Mat afwerking",
    "Zijdeglans afwerking",
    "Geborstelde afwerking"
  ];

  const operations = [
    { name: "Ladderkoord", description: "Standaard uitvoering" },
    { name: "Ladderband", description: "+10% meerprijs" },
    { name: "Handmatige bediening", description: "Met trekkoord of ketting" },
    { name: "Elektrische uitvoering", description: "Met afstandsbediening (optioneel)" }
  ];

  const mounting = [
    "In-de-dag montage",
    "Op-de-dag montage",
    "Cassette uitvoering",
    "Open profiel",
    "Losse steunen"
  ];

  const maintenance = [
    "Afstoffen met plumeau of zachte borstel",
    "Af en toe reinigen met licht vochtige doek"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-100 to-orange-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <Badge variant="secondary" className="mb-4 bg-amber-200 text-amber-800">
                  Premium Houten Raamdecoratie
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Houten Jaloezieën
                  <span className="block text-3xl lg:text-4xl text-amber-700 mt-2">
                    Natuurlijke Warmte & Tijdloze Luxe
                  </span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Houten jaloezieën voegen een elegante en natuurlijke sfeer toe aan elk interieur. 
                  Ze combineren stijl, functionaliteit en duurzaamheid, en zijn geschikt voor zowel 
                  moderne als klassieke ruimtes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  <Mail className="mr-2 h-5 w-5" />
                  Vraag een offerte aan
                </Button>
                <Button size="lg" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  Plan een gratis adviesgesprek
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Houten Jaloezieën in moderne woonkamer"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Euro className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-600">Vanaf</p>
                    <p className="text-xl font-bold text-gray-900">€79,95 per m²</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Belangrijkste voordelen
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Materials & Colors Section */}
      <section className="py-16 bg-amber-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Materialen & Kleuren
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Materials */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Wrench className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Materialen</h3>
                </div>
                <div className="space-y-4">
                  {materials.map((material, index) => (
                    <div key={index} className="border-l-4 border-amber-200 pl-4">
                      <h4 className="font-medium text-gray-900">{material.name}</h4>
                      <p className="text-sm text-gray-600">{material.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Palette className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Kleuren</h3>
                </div>
                <div className="space-y-3">
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-200 to-amber-300 border-2 border-amber-400"></div>
                      <span className="text-gray-700">{color}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Finishes */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Settings className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Afwerking</h3>
                </div>
                <div className="space-y-3">
                  {finishes.map((finish, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{finish}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Operation & Options Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Bediening & Opties
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {operations.map((operation, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{operation.name}</h3>
                      <p className="text-sm text-gray-600">{operation.description}</p>
                    </div>
                    <Settings className="h-5 w-5 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Installation & Finishing Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Montage & Afwerking</h2>
              <div className="grid gap-4">
                {mounting.map((option, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{option}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Inclusief:</strong> bevestigingsmateriaal en montagehandleiding
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Onderhoud</h2>
              <div className="space-y-4">
                {maintenance.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Tip:</strong> Regelmatig onderhoud verlengt de levensduur van uw houten jaloezieën aanzienlijk.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Prijsindicatie
            </h2>
          </div>
          
          <Card className="max-w-2xl mx-auto border-none shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-amber-600 mb-2">€79,95</div>
                <div className="text-lg text-gray-600">per m²</div>
              </div>
              <Separator className="my-6" />
              <p className="text-gray-700 leading-relaxed">
                Inclusief maatwerk en standaard montageprofiel. 
                Prijs afhankelijk van houtsoort, lamelbreedte en opties.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Personal Advice & CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Persoonlijk advies
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Onze specialisten staan klaar om u te begeleiden in uw keuze. 
              Vraag een offerte aan of plan een gratis adviesgesprek voor professioneel advies op maat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3">
                <Mail className="mr-2 h-5 w-5" />
                Vraag een offerte aan
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Plan een gratis adviesgesprek
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HoutenJaloezieen;;