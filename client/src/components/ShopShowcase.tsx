import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingBag, Ruler, Truck, Star } from "lucide-react";
import type { CurtainFabric } from "@shared/schema";

interface ShopShowcaseProps {
  setLocation: (path: string) => void;
}

export default function ShopShowcase({ setLocation }: ShopShowcaseProps) {
  const { data: fabrics = [], isLoading } = useQuery<CurtainFabric[]>({
    queryKey: ["/api/shop/fabrics/featured"],
  });

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#C4A36C] text-white hover:bg-[#B39356] px-4 py-1">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Nieuw: Online Stoffenshop
          </Badge>
          <h2 
            className="text-4xl md:text-5xl font-light text-black mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Gordijnstoffen Online Bestellen
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C4A36C]/40 to-transparent mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium stoffen per meter, op maat gemaakt met professionele plooien. 
            Bestel eenvoudig vanuit huis en laat het bezorgen.
          </p>
        </div>

        {/* USPs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-[#C4A36C]/10 rounded-full flex items-center justify-center">
              <Ruler className="w-5 h-5 text-[#C4A36C]" />
            </div>
            <div>
              <p className="font-medium text-sm">Op Maat Gemaakt</p>
              <p className="text-xs text-gray-500">Elke maat in cm mogelijk</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-[#C4A36C]/10 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#C4A36C]" />
            </div>
            <div>
              <p className="font-medium text-sm">Gratis Verzending</p>
              <p className="text-xs text-gray-500">Vanaf €150 bestelling</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-[#C4A36C]/10 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-[#C4A36C]" />
            </div>
            <div>
              <p className="font-medium text-sm">Premium Kwaliteit</p>
              <p className="text-xs text-gray-500">Hoogwaardige stoffen</p>
            </div>
          </div>
        </div>

        {/* Featured Fabrics */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : fabrics.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fabrics.slice(0, 4).map((fabric) => (
              <Card 
                key={fabric.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer"
                onClick={() => setLocation(`/shop/stof/${fabric.id}`)}
              >
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
                  
                  {fabric.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-[#C4A36C] text-white text-xs">
                      Populair
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-[#C4A36C] transition-colors mb-1">
                    {fabric.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {fabric.material} • {fabric.color}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-[#C4A36C]">
                        €{fabric.pricePerMeter.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/meter</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => setLocation("/shop")}
            className="bg-[#C4A36C] hover:bg-[#B39356] text-white px-8 py-6 text-sm tracking-widest uppercase"
            data-testid="button-view-all-fabrics"
          >
            Bekijk alle stoffen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
