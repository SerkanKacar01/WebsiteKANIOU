import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Users, 
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

const BusinessPage = () => {
  const { language, t } = useLanguage();
  const [showDealerForm, setShowDealerForm] = useState(false);

  const scrollToDealerForm = () => {
    setShowDealerForm(true);
    setTimeout(() => {
      const element = document.getElementById('dealerform');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const openChatbot = () => {
    const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLElement;
    if (chatButton) chatButton.click();
  };

  return (
    <>
      <Helmet>
        <title>Zakelijke Oplossingen - Business Solutions | KANIOU</title>
        <meta name="description" content="Professionele raambekleding voor bedrijven, projecten en dealers. KANIOU biedt zakelijke oplossingen met professionele voorwaarden." />
        <meta property="og:title" content="Zakelijke Oplossingen - Business Solutions" />
        <meta property="og:description" content="Professionele raambekleding voor bedrijven, projecten en dealers" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-secondary/30">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🏢 Business Solutions for Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Bent u aannemer, architect, interieurdesigner, winkel of projectstudio op zoek naar hoogwaardige raambekleding op maat voor uw klanten?
            </p>
            <p className="text-lg mb-10 max-w-3xl mx-auto text-white/80">
              KANIOU is uw betrouwbare partner voor stijlvolle en functionele oplossingen met professionele voorwaarden.
            </p>
          </div>
        </section>

        {/* Why Choose KANIOU Business Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              🎯 Waarom kiezen voor KANIOU Business?
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                  <p className="text-lg text-gray-700">Raambekleding op maat voor alle projecttypes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                  <p className="text-lg text-gray-700">Snelle afhandeling en levering, ook bij grote volumes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                  <p className="text-lg text-gray-700">Persoonlijk advies van concept tot levering</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                  <p className="text-lg text-gray-700">Transparante offertes en projectprijzen</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 font-bold text-xl mt-1">✓</div>
                  <p className="text-lg text-gray-700">Meertalige ondersteuning: Nederlands, Frans, Engels, Turks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Applications Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
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
                <p className="text-lg font-medium text-gray-800">• Kantoorgebouwen</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-lg font-medium text-gray-800">• Restaurants & hotels</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-lg font-medium text-gray-800">• Zorginstellingen</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-lg font-medium text-gray-800">• Retail showrooms</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-lg font-medium text-gray-800">• Vastgoedontwikkeling</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-lg font-medium text-gray-800">• Openbare ruimtes & meer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interested in Collaboration Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              🤝 Geïnteresseerd in Samenwerking?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Op zoek naar een betrouwbare raambekleding partner?<br />
              Dien een aanvraag in of gebruik onze chatbot om mogelijkheden te bespreken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToDealerForm}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Verstuur Aanvraag
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={openChatbot}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat met Ons
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Dealer Opportunities Section */}
        <section id="dealer-section" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                🔗 Dealer & Reseller Opportunities
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
                Bent u actief in interieurdesign, installatie of retail?
              </p>
              <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Wij bieden:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 text-lg">•</div>
                    <p className="text-gray-700">Dealervoorwaarden & volumekortingen</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 text-lg">•</div>
                    <p className="text-gray-700">White-label samenwerking mogelijk</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 text-lg">•</div>
                    <p className="text-gray-700">Persoonlijke onboarding ondersteuning</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 text-lg">•</div>
                    <p className="text-gray-700">Levering door heel België en Europa</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={scrollToDealerForm}
                className="bg-blue-600 hover:bg-blue-700"
              >
                👉 Aanmelden als Dealer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        {showDealerForm && (
          <section id="dealerform" className="py-16 px-4 bg-white">
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
                        Vul onderstaande gegevens in en wij nemen contact met u op voor meer informatie over onze dealermogelijkheden.
                      </p>
                      <p className="text-sm text-gray-500">
                        Formuliervelden: Bedrijfsnaam, Contactpersoon, E-mail, Telefoon, Type activiteit, Bericht
                      </p>
                    </div>
                    <div className="text-center pt-4">
                      <Button 
                        onClick={() => {
                          window.location.href = 'mailto:info@kaniou.be?subject=Dealer Partnership Inquiry';
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact via Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Contact Information */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">📧 Vragen? Email info@kaniou.be of gebruik onze chatbot.</h2>
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
        </section>
      </div>
    </>
  );
};

export default BusinessPage;