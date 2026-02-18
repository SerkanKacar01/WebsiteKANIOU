import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import Container from "@/components/ui/container";
import PageLayout from "@/components/layout/PageLayout";

const BusinessPage = () => {
  const { language, t } = useLanguage();
  const [showDealerForm, setShowDealerForm] = useState(false);
  const [, setLocation] = useLocation();

  const scrollToDealerForm = () => {
    setShowDealerForm(true);
    setTimeout(() => {
      const element = document.getElementById("dealerform");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <PageLayout
      title="Zakelijke Oplossingen"
      subtitle="Voor Bedrijven"
      description="Professionele raambekleding voor bedrijven, projecten en dealers met professionele voorwaarden."
      metaDescription="Professionele raambekleding voor bedrijven, projecten en dealers. KANIOU biedt zakelijke oplossingen met professionele voorwaarden."
      breadcrumbs={[{ label: "Zakelijk" }]}
      showCTA={true}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            🎯 Waarom kiezen voor KANIOU Business?
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                <p className="text-lg text-gray-700">
                  Raambekleding op maat voor alle projecttypes
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                <p className="text-lg text-gray-700">
                  Snelle afhandeling en levering, ook bij grote volumes
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                <p className="text-lg text-gray-700">
                  Persoonlijk advies van concept tot levering
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                <p className="text-lg text-gray-700">
                  Transparante offertes en projectprijzen
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                <p className="text-lg text-gray-700">
                  Meertalige ondersteuning: Nederlands, Frans, Engels, Turks
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-[#FAFAF8]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              📂 Professionele Toepassingen
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Wij leveren raambekleding voor:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-lg font-medium text-gray-800">
                • Kantoorgebouwen
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-lg font-medium text-gray-800">
                • Restaurants & hotels
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-lg font-medium text-gray-800">
                • Zorginstellingen
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-lg font-medium text-gray-800">
                • Retail showrooms
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-lg font-medium text-gray-800">
                • Vastgoedontwikkeling
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-lg font-medium text-gray-800">
                • Openbare ruimtes & meer
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              🤝 Geïnteresseerd in Samenwerking?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Op zoek naar een betrouwbare raambekleding partner?
              <br />
              Dien een aanvraag in of neem contact met ons op om mogelijkheden te
              bespreken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToDealerForm}
                className="bg-primary hover:bg-primary/90"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Verstuur Aanvraag
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Separator className="my-0" />

      <section
        id="dealer-section"
        className="py-16 lg:py-20 bg-[#FAFAF8]"
      >
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              🔗 Dealer & Reseller Opportunities
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
              Bent u actief in interieurdesign, installatie of retail?
            </p>
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Wij bieden:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-primary text-lg">•</div>
                  <p className="text-gray-700">
                    Dealervoorwaarden & volumekortingen
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-primary text-lg">•</div>
                  <p className="text-gray-700">
                    White-label samenwerking mogelijk
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-primary text-lg">•</div>
                  <p className="text-gray-700">
                    Persoonlijke onboarding ondersteuning
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-primary text-lg">•</div>
                  <p className="text-gray-700">
                    Levering door heel België en Europa
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              onClick={scrollToDealerForm}
              className="bg-primary hover:bg-primary/90"
            >
              👉 Aanmelden als Dealer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Container>
      </section>

      {showDealerForm && (
        <section id="dealerform" className="py-16 lg:py-20 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Card className="w-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    Dealer Aanmeldingsformulier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Vul onderstaande gegevens in en wij nemen contact met u
                        op voor meer informatie over onze dealermogelijkheden.
                      </p>
                      <p className="text-sm text-gray-500">
                        Formuliervelden: Bedrijfsnaam, Contactpersoon, E-mail,
                        Telefoon, Type activiteit, Bericht
                      </p>
                    </div>
                    <div className="text-center pt-4">
                      <Button
                        onClick={() => {
                          setLocation("/contact");
                          window.scrollTo(0, 0);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        📧 Contact via Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 lg:py-20 bg-gray-900 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">
              📧 Vragen? Email info@kaniou.be of gebruik ons contactformulier.
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <Mail className="h-6 w-6 mr-3" />
                <span>info@kaniou.be</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-6 w-6 mr-3" />
                <span>+32 (0)11 XX XX XX</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-6 w-6 mr-3" />
                <span>België</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default BusinessPage;
