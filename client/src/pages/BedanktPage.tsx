import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

const BedanktPage = () => {
  return (
    <>
      <Helmet>
        <title>Bedankt voor je bestelling - KANIOU</title>
        <meta name="description" content="Bedankt voor je bestelling bij KANIOU. Je betaling is succesvol verwerkt en we gaan direct aan de slag met je op maat gemaakte gordijnrails." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="py-16">
            <div className="max-w-2xl mx-auto">
              {/* Success Icon */}
              <div className="text-center mb-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Bedankt voor je bestelling!
                </h1>
                <p className="text-lg text-gray-600">
                  Je betaling is succesvol verwerkt
                </p>
              </div>

              {/* Order Confirmation Card */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-center text-[#d5c096]">
                    Wat gebeurt er nu?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#d5c096] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold">Bevestiging per email</h3>
                        <p className="text-sm text-gray-600">
                          Je ontvangt binnen enkele minuten een bevestiging van je bestelling per email.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#d5c096] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold">Productie start</h3>
                        <p className="text-sm text-gray-600">
                          We gaan direct aan de slag met het op maat zagen van je gordijnrails in ons eigen atelier.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#d5c096] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold">Levering</h3>
                        <p className="text-sm text-gray-600">
                          Binnen 5-7 werkdagen ontvang je je op maat gemaakte gordijnrails thuis bezorgd.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-center">
                    Vragen over je bestelling?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#d5c096]" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">info@kaniou.be</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#d5c096]" />
                      <div>
                        <p className="font-medium">Telefoon</p>
                        <p className="text-sm text-gray-600">+32 123 456 789</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Home className="h-4 w-4 mr-2" />
                    Terug naar homepage
                  </Button>
                </Link>
                
                <Link href="/products">
                  <Button className="w-full sm:w-auto bg-[#d5c096] hover:bg-[#c4b183]">
                    Bekijk andere producten
                  </Button>
                </Link>
              </div>

              {/* Guarantee Information */}
              <div className="mt-12 bg-[#d5c096]/10 border border-[#d5c096]/30 rounded-lg p-6">
                <h3 className="font-semibold text-[#d5c096] mb-3 text-center">
                  Jouw KANIOU garanties
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>✓ 5 jaar garantie op kwaliteit & werking</p>
                    <p>✓ Vakkundig op maat gezaagd</p>
                  </div>
                  <div>
                    <p>✓ Inclusief professioneel montagemateriaal</p>
                    <p>✓ Snelle en zorgvuldige levering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BedanktPage;