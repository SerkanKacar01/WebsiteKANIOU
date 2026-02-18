import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Package } from "lucide-react";
import { Link } from "wouter";

const CleaningProductsPage = () => {

  const htcProduct = {
    id: 1,
    name: 'HTC 620 Vlekkenformule',
    price: 16.95,
    imageUrl: '/attached_assets/Scherm­afbeelding 2025-07-02 om 21.20.31_1751486071504.png',
    description: `Verwijdert eenvoudig vlekken uit textiel, meubelstof en tapijt. Direct toepasbaar met handige sprayflacon. Niet geschikt voor leder.`,
    features: [
      'Professionele kwaliteit',
      'Geschikt voor alle textielsoorten', 
      'Milieuvriendelijke formule',
      'Snelle werking',
      'Geen residu',
      'Levertijd 2 - 3 dagen'
    ],
    applications: [
      'Tapijt',
      'Gordijnen', 
      'Meubelstof',
      'Autointerieur'
    ],
    specifications: {
      volume: '0,5 liter',
      type: 'Vlekkenreiniger',
      brand: 'HTC',
      pH: '7-8 (mild alkalisch)',
      Artikel: 'HTC 620 vlekkenformule à 0,5 liter - tapijt & textiel vlekkenreiniger',
      biodegradable: true
    },
    instructions: [
      'Spray direct op de vlek',
      'Laat 2-3 minuten inwerken',
      'Dep voorzichtig met een schone doek',
      '*** Kleding, meubelstof en autobekleding ***',
      '● HTC 620 middels een witte schone doek (denk aan badstof washandje) aanbrengen op de vlek.',
      '● Voorzichtig de vlek verwijderen.',
      '● Niet geschikt voor leder bekleding.',

        '*** Tapijt ***',
        '● HTC 620 direct opsprayen',
        '● Voorkom "te nat" worden van de backing (rug van het tapijt, deze kan anders niet goed meer drogen als deze te nat wordt), dus spaarzaam toepassen (Het is beter een vlek in tweemaal te verwijderen dan deze teveel in te sprayen)',
        '● Even laten inwerken.',
        '● Vlek verwijderen met een witte, schone en goed absorberende doek.'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 127
  };

  return (
    <PageLayout
      title="Reinigingsproducten"
      subtitle="Onderhoud"
      breadcrumbs={[{ label: "Producten", href: "/producten" }, { label: "Reiniging" }]}
      showCTA={true}
    >
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <Package className="h-32 w-32 text-gray-400" />
                  </div>
                  {htcProduct.inStock && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white">Op voorraad</Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white">Professionele kwaliteit</Badge>
                  </div>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {htcProduct.name}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(htcProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {htcProduct.rating} ({htcProduct.reviewCount} beoordelingen)
                    </span>
                  </div>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-[#d5c096]">
                        €{htcProduct.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        incl. 21% BTW
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">
                      Voor bestellingen en meer informatie:
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link href="/contact">
                        <Button 
                          className="w-full bg-[#d5c096] hover:bg-[#d5c096]/90"
                          size="lg"
                        >
                          Neem Contact Op
                        </Button>
                      </Link>
                      <Link href="/offerte">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          size="lg"
                        >
                          Vraag Offerte Aan
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Belangrijkste voordelen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {htcProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toepassingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {htcProduct.applications.map((application, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {application}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technische specificaties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Volume:</span>
                        <span className="text-sm font-medium">{htcProduct.specifications.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className="text-sm font-medium">{htcProduct.specifications.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Merk:</span>
                        <span className="text-sm font-medium">{htcProduct.specifications.brand}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">pH-waarde:</span>
                        <span className="text-sm font-medium">{htcProduct.specifications.pH}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Biologisch afbreekbaar:</span>
                        <span className="text-sm font-medium">
                          {htcProduct.specifications.biodegradable ? 'Ja' : 'Nee'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gebruiksaanwijzing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {htcProduct.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-[#d5c096] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default CleaningProductsPage;
