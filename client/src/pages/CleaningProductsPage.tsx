import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, Check, Package, Heart, Eye } from "lucide-react";

const CleaningProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // HTC 620 product data
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

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      
      await addToCart({
        productType: 'reiniging',
        productName: htcProduct.name,
        material: 'Vlekkenreiniger',
        color: 'Wit',
        quantity: 1,
        unitPrice: htcProduct.price,
        imageUrl: htcProduct.imageUrl,
        customizations: {
          volume: htcProduct.specifications.volume,
          brand: htcProduct.specifications.brand
        }
      });

      toast({
        title: "Product toegevoegd!",
        description: `${htcProduct.name} is toegevoegd aan uw winkelwagen.`,
      });
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het toevoegen aan de winkelwagen.",
        variant: "destructive"
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>HTC 620 Vlekkenreiniger - Professionele Reinigingsproducten | KANIOU</title>
        <meta
          name="description"
          content="HTC 620 vlekkenformule voor tapijten en textiel. Professionele kwaliteit vlekkenreiniger voor gordijnen, meubelstof en vloerbedekking. €9,95 incl. BTW."
        />
      </Helmet>

      <Container className="py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#d5c096]">Home</Link>
            <span>/</span>
            <Link href="/producten" className="hover:text-[#d5c096]">Producten</Link>
            <span>/</span>
            <span className="text-gray-900">Reiniging & Onderhoud</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reiniging & Onderhoud
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Professionele reinigingsproducten voor vloeren, stoffen en gordijnen. 
            Houd uw interieur in perfecte staat met onze kwaliteitsproducten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
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

          {/* Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header */}
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

            {/* Price and Purchase */}
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

                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Aantal:</label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">-</Button>
                      <span className="w-12 text-center">1</span>
                      <Button variant="outline" size="sm">+</Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button 
                      className="w-full bg-[#d5c096] hover:bg-[#d5c096]/90"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {isAddingToCart ? "Toevoegen..." : "In winkelwagen"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      size="lg"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Bewaren
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Features */}
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

            {/* Applications */}
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

            {/* Product Specifications */}
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

            {/* Usage Instructions */}
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
    </>
  );
};

export default CleaningProductsPage;