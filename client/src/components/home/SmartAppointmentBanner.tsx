import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Link } from "wouter";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  Star,
  Gift
} from "lucide-react";

const SmartAppointmentBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    "Gratis thuisadvies",
    "Persoonlijk stijladvies", 
    "Direct meten & monteren",
    "15% korting bij afname"
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-primary via-primary/95 to-blue-600 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card 
            className="border-0 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-gradient-to-r from-[#d5c096] to-[#c4b183] text-white px-3 py-1">
                      <Gift className="h-4 w-4 mr-1" />
                      Gratis Advies
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1">
                      <Star className="h-4 w-4 mr-1" />
                      15% Korting
                    </Badge>
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary mb-2">
                    Plan Uw Gratis Thuisadvies & Ontvang Direct 15% Korting
                  </h3>
                  
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Onze interieurspecialisten komen gratis bij u thuis voor persoonlijk advies, 
                    opmeten en directe montage. Boek nu en profiteer van 15% korting op uw gehele bestelling.
                  </p>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-[#d5c096]" />
                      <span className="font-medium">Direct bereikbaar</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-[#d5c096]" />
                      <span>Heel Nederland</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-[#d5c096]" />
                      <span>7 dagen per week</span>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="space-y-4 text-center lg:text-left">
                  <div className="space-y-3">
                    <Link href="/appointment">
                      <Button 
                        className={`w-full bg-gradient-to-r from-[#d5c096] to-[#c4b183] hover:from-[#c4b183] hover:to-[#b3a070] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg' : ''}`}
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        Plan Gratis Afspraak
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                    
                    <Link href="/contact">
                      <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Direct Bellen
                      </Button>
                    </Link>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    <p>📞 Binnen 2 uur teruggebeld</p>
                    <p>🏠 Gratis thuisbezoek</p>
                    <p>💰 Geen verborgen kosten</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default SmartAppointmentBanner;