import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock, Mail, Home } from "lucide-react";
import { Link } from "wouter";

const BedanktPage = () => {
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    // Extract payment ID from URL parameters if available
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      setPaymentId(id);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Bedankt voor uw bestelling - KANIOU</title>
        <meta name="description" content="Bedankt voor uw bestelling bij KANIOU. Uw betaling is succesvol verwerkt en uw bestelling wordt binnenkort verwerkt." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Bedankt voor uw bestelling!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Uw betaling is succesvol verwerkt. We gaan direct aan de slag met uw op maat gemaakte gordijnrails.
              </p>
            </div>

            {/* Payment Confirmation */}
            {paymentId && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Betalingsbevestiging
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      <strong>Betaling ID:</strong> {paymentId}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Uw betaling is succesvol verwerkt via Mollie. U ontvangt binnenkort een bevestigingsmail.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What Happens Next */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Wat gebeurt er nu?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Bevestigingsmail</h3>
                    <p className="text-sm text-gray-600">
                      U ontvangt binnen enkele minuten een bevestigingsmail met alle details van uw bestelling.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#d5c096] rounded-full mb-4">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Productie</h3>
                    <p className="text-sm text-gray-600">
                      Uw gordijnrails worden vakkundig op maat gezaagd in ons eigen atelier volgens uw specificaties.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">3. Levering</h3>
                    <p className="text-sm text-gray-600">
                      Binnen 5-7 werkdagen ontvangt u uw bestelling zorgvuldig verpakt aan het opgegeven adres.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Vragen over uw bestelling?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Klantenservice</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>E-mail:</strong> info@kaniou.be
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Telefoon:</strong> +32 123 456 789
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Openingstijden:</strong> Ma-Vr 9:00-17:00
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Verwacht levertijd</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        5-7 werkdagen voor standaard bestellingen
                      </p>
                      <p className="text-xs text-gray-500">
                        Complexe configuraties met speciale bochten kunnen 1-2 extra werkdagen in beslag nemen.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why KANIOU */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Waarom KANIOU?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Vakkundig op maat gezaagd</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Hoogwaardig montagemateriaal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">5 jaar premium garantie</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Snelle, discrete levering</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Persoonlijke klantenservice</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Duurzame kwaliteitsproducten</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-[#d5c096] hover:bg-[#c4b183] text-white">
                    <Home className="h-4 w-4 mr-2" />
                    Terug naar hoofdpagina
                  </Button>
                </Link>
                <Link href="/producten">
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Bekijk onze producten
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-gray-500">
                Deel uw ervaring met ons op onze sociale media kanalen!
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BedanktPage;