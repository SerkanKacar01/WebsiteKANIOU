import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Ruler, Scissors, ChevronRight, Star, Truck, Shield, RefreshCw } from "lucide-react";
import type { CurtainFabric } from "@shared/schema";

const categoryLabels: Record<string, string> = {
  overgordijn: "Overgordijnen",
  vitrage: "Vitrages",
  inbetween: "Inbetweens",
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: fabrics = [], isLoading } = useQuery<CurtainFabric[]>({
    queryKey: ["/api/shop/fabrics"],
  });

  const filteredFabrics = activeCategory === "all" 
    ? fabrics 
    : fabrics.filter(f => f.category === activeCategory);

  const categories = ["all", ...new Set(fabrics.map(f => f.category))];

  return (
    <>
      <Helmet>
        <title>Gordijnstoffen Shop | KANIOU Zilvernaald</title>
        <meta name="description" content="Bestel hoogwaardige gordijnstoffen per meter. Kies uit linnen, velours, katoen en meer. Op maat gemaakt met professionele plooien." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-[#C4A36C] text-white hover:bg-[#B39356]">
                Nieuw: Online Stoffenshop
              </Badge>
              <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                Gordijnstoffen Online Bestellen
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 font-light">
                Premium kwaliteit stoffen per meter. Kies je afmetingen, plooi en laat het op maat maken.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Truck className="w-4 h-4" />
                  <span>Gratis verzending vanaf €150</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span>Veilig betalen met Stripe</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <RefreshCw className="w-4 h-4" />
                  <span>14 dagen retourrecht</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#C4A36C] data-[state=active]:text-white">
                Alle Stoffen
              </TabsTrigger>
              {categories.filter(c => c !== "all").map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-[#C4A36C] data-[state=active]:text-white"
                >
                  {categoryLabels[category] || category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredFabrics.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Geen stoffen gevonden in deze categorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFabrics.map((fabric) => (
                <FabricCard key={fabric.id} fabric={fabric} />
              ))}
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="bg-white py-16 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-light text-center mb-12">Hoe werkt het?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C4A36C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ruler className="w-8 h-8 text-[#C4A36C]" />
                  </div>
                  <h3 className="font-medium mb-2">1. Kies je maten</h3>
                  <p className="text-gray-600 text-sm">
                    Voer de breedte en hoogte in centimeters in. Minimaal 30 cm breed.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C4A36C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scissors className="w-8 h-8 text-[#C4A36C]" />
                  </div>
                  <h3 className="font-medium mb-2">2. Selecteer een plooi</h3>
                  <p className="text-gray-600 text-sm">
                    Kies uit wave, enkele, dubbele of andere plooistijlen.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C4A36C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-[#C4A36C]" />
                  </div>
                  <h3 className="font-medium mb-2">3. Bestel en betaal</h3>
                  <p className="text-gray-600 text-sm">
                    Veilig afrekenen via Stripe. Levering binnen 5-7 werkdagen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function FabricCard({ fabric }: { fabric: CurtainFabric }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {fabric.imageUrl ? (
          <img 
            src={fabric.imageUrl} 
            alt={fabric.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm">{fabric.name}</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {fabric.isFeatured && (
            <Badge className="bg-[#C4A36C] text-white text-xs">
              <Star className="w-3 h-3 mr-1" />
              Populair
            </Badge>
          )}
          {fabric.stockStatus === "low_stock" && (
            <Badge variant="destructive" className="text-xs">
              Bijna uitverkocht
            </Badge>
          )}
        </div>
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link href={`/shop/stof/${fabric.id}`}>
            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
              Configureren
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-[#C4A36C] transition-colors">
              {fabric.name}
            </h3>
            <p className="text-xs text-gray-500">
              {categoryLabels[fabric.category] || fabric.category} • {fabric.material}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {fabric.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-[#C4A36C]">
              €{fabric.pricePerMeter.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 ml-1">/meter</span>
          </div>
          
          <Link href={`/shop/stof/${fabric.id}`}>
            <Button 
              size="sm" 
              variant="outline"
              className="border-[#C4A36C] text-[#C4A36C] hover:bg-[#C4A36C] hover:text-white"
              data-testid={`button-configure-${fabric.id}`}
            >
              Bestellen
            </Button>
          </Link>
        </div>
        
        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
          Max. hoogte: {fabric.maxHeight} cm • {fabric.washable ? "Wasbaar" : "Stomen"}
        </div>
      </CardContent>
    </Card>
  );
}
