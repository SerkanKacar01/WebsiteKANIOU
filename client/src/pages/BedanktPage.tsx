import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Home, Mail } from "lucide-react";

export default function BedanktPage() {
  const [location] = useLocation();


  return (
    <>
      <Helmet>
        <title>Bedankt voor uw bestelling - KANIOU</title>
        <meta
          name="description"
          content="Bedankt voor uw bestelling bij KANIOU. Uw betaling is succesvol verwerkt en u ontvangt binnenkort een bevestiging per e-mail."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl md:text-3xl text-gray-900">
                  Bedankt voor uw bestelling!
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-gray-600 space-y-3">
                  <p className="text-lg">
                    Uw betaling is succesvol verwerkt via Mollie.
                  </p>
                  <p>
                    U ontvangt binnenkort een bevestiging per e-mail met alle details van uw bestelling.
                  </p>
                  <p>
                    Onze medewerkers nemen binnen 1 werkdag contact met u op voor verdere afhandeling.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <h3 className="font-semibold text-blue-800 mb-1">Volgende stappen</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Bevestiging per e-mail binnen 15 minuten</li>
                        <li>• Persoonlijk contact binnen 1 werkdag</li>
                        <li>• Afspraak voor opmeting (indien nodig)</li>
                        <li>• Productie en levering volgens afspraak</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="bg-[#d5c096] hover:bg-[#d5c096]/90 text-gray-900">
                      <Link href="/">
                        <Home className="w-4 h-4 mr-2" />
                        Terug naar home
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline">
                      <Link href="/producten">
                        <Package className="w-4 h-4 mr-2" />
                        Bekijk producten
                      </Link>
                    </Button>
                  </div>

                  <div className="text-sm text-gray-500 pt-4 border-t">
                    <p>Vragen over uw bestelling?</p>
                    <p>
                      Bel ons op <strong>03 653 44 94</strong> of mail naar{" "}
                      <a href="mailto:info@kaniou.be" className="text-[#d5c096] hover:underline">
                        info@kaniou.be
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}