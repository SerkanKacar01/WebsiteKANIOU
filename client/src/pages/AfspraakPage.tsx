import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const AfspraakPage = () => {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Plan een Afspraak | KANIOU Zilvernaald</title>
        <meta name="description" content="Plan eenvoudig een persoonlijke afspraak met onze experts voor een vrijblijvend advies over uw raamdecoratie." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                📅 Plan een Afspraak
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Plan eenvoudig een persoonlijke afspraak met onze experts voor een vrijblijvend advies over uw raamdecoratie.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📞 Contact Informatie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Telefonisch</h3>
                    <p className="text-gray-600 mb-1">Bel ons voor een directe afspraak:</p>
                    <a href="tel:+32123456789" className="text-[#E67E22] font-semibold hover:underline">
                      +32 12 34 56 789
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-1">Stuur ons een email:</p>
                    <a href="mailto:info@kaniou.be" className="text-[#E67E22] font-semibold hover:underline">
                      info@kaniou.be
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Openingstijden</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Ma - Vr: 09:00 - 18:00</p>
                      <p>Zaterdag: 09:00 - 17:00</p>
                      <p>Zondag: Gesloten</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🏠 Afspraak Opties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">📐 Thuismeting</h3>
                    <p className="text-gray-600 mb-3">
                      Onze expert komt bij u thuis voor een professionele inmeting en persoonlijk advies.
                    </p>
                    <p className="text-sm text-[#E67E22] font-medium">Gratis bij bestelling</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">🏢 Showroom Bezoek</h3>
                    <p className="text-gray-600 mb-3">
                      Bezoek onze showroom om alle materialen en kleuren te bekijken en te voelen.
                    </p>
                    <p className="text-sm text-[#E67E22] font-medium">Op afspraak</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">💻 Online Consultatie</h3>
                    <p className="text-gray-600 mb-3">
                      Videocall voor initieel advies en planning van uw project.
                    </p>
                    <p className="text-sm text-[#E67E22] font-medium">Gratis</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="space-y-4">
                <Button
                  onClick={() => setLocation("/contact")}
                  className="bg-gradient-to-r from-[#E67E22] to-[#D5B992] hover:from-[#cc6f1f] hover:to-[#c4a885] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  📞 Contact Opnemen
                </Button>
                <p className="text-gray-600">
                  Of vraag eerst een{" "}
                  <button
                    onClick={() => setLocation("/offerte")}
                    className="text-[#E67E22] font-semibold hover:underline"
                  >
                    vrijblijvende offerte
                  </button>{" "}
                  aan
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AfspraakPage;