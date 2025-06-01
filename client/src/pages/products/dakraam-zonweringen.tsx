import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle,
  Settings,
  Palette,
  Wrench,
  Sparkles,
  Euro,
} from "lucide-react";

const DakraamZonweringenPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          Dakraam Zonweringen - Op Maat voor Fakro en Velux | KANIOU Zilvernaald
        </title>
        <meta
          name="description"
          content="Dakraam zonweringen voor Fakro en Velux dakramen. Optimale licht- en warmtewering, verkrijgbaar in verduisterend, lichtdoorlatend en reflecterend doek. Vanaf €89."
        />
        <meta
          property="og:title"
          content="Dakraam Zonweringen - Op Maat voor Fakro en Velux | KANIOU Zilvernaald"
        />
        <meta
          property="og:description"
          content="Dakraam zonweringen voor Fakro en Velux dakramen. Optimale licht- en warmtewering, verkrijgbaar in verduisterend, lichtdoorlatend en reflecterend doek."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
                  Dakraam Zonwering – Op Maat voor Fakro en Velux Ramen
                </h1>
                <p className="text-xl text-text-light max-w-4xl mx-auto leading-relaxed">
                  Dakraam zonweringen zorgen voor optimale licht- en
                  warmtewering in ruimtes met dakramen. Speciaal ontworpen voor
                  plaatsing op Fakro- en Velux-ramen, bieden ze comfort, privacy
                  en energie-efficiëntie in elke kamer onder het dak.
                </p>
              </div>

              {/* System Compatibility Section */}
              <div className="mb-16">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold text-text-dark">
                      Systeemcompatibiliteit
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-text-dark mb-2">
                          Geschikt voor Fakro en Velux dakramen
                        </h3>
                        <p className="text-text-light">
                          Perfect passend voor alle gangbare dakraammodellen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-text-dark mb-2">
                          Standaardmaten beschikbaar
                        </h3>
                        <p className="text-text-light">
                          Op basis van raamtype en code voor perfecte pasvorm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-text-dark mb-2">
                          Handmatig & elektrisch
                        </h3>
                        <p className="text-text-light">
                          Bedienbaar via afstandsbediening of app
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits & Features Section */}
              <div className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">
                    Voordelen
                  </h2>
                  <p className="text-lg text-text-light max-w-2xl mx-auto">
                    Ontdek waarom onze dakraam zonweringen de perfecte keuze
                    zijn voor uw woning
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-text-dark mb-3">
                          Effectieve warmte- en lichtregulatie
                        </h3>
                        <p className="text-text-light">
                          Optimale controle over temperatuur en lichtinval in uw
                          zolderkamer
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <Palette className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-text-dark mb-3">
                          Keuze uit verschillende materialen
                        </h3>
                        <p className="text-text-light">
                          Beschikbaar in verduisterend, lichtdoorlatend en
                          reflecterend doek
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <Settings className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-text-dark mb-3">
                          Compacte cassette met zijgeleiding
                        </h3>
                        <p className="text-text-light">
                          Voor volledige afsluiting en optimale lichtblokkering
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <Palette className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-text-dark mb-3">
                          Verschillende kleuren en materialen
                        </h3>
                        <p className="text-text-light">
                          Passend bij elke interieurstijl en persoonlijke
                          voorkeur
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fabric Types Section */}
              <div className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">
                    Stoffen
                  </h2>
                  <p className="text-lg text-text-light max-w-2xl mx-auto">
                    Kies het juiste doektype voor optimaal comfort in elke
                    ruimte
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-2xl">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-amber-900">
                        Verduisterend doek
                      </h3>
                      <p className="text-primary">Perfect voor slaapkamers</p>
                    </div>
                    <p className="text-primary text-center">
                      Blokkeert 100% van het licht voor optimale slaapkwaliteit
                      en complete duisternis
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-2xl">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-amber-900">
                        Lichtdoorlatend doek
                      </h3>
                      <p className="text-primary">Ideaal voor leefruimtes</p>
                    </div>
                    <p className="text-primary text-center">
                      Filtert het licht voor een aangename sfeer terwijl privacy
                      behouden blijft
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-2xl">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-amber-900">
                        Reflecterend doek
                      </h3>
                      <p className="text-primary">Extra warmtewering</p>
                    </div>
                    <p className="text-primary text-center">
                      Reflecteert zonnestralen voor maximale koeling en
                      energiebesparing
                    </p>
                  </div>
                </div>
              </div>

              {/* Installation & Operation Section */}
              <div className="mb-16">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border">
                  <div className="flex items-center gap-3 mb-8">
                    <Wrench className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold text-text-dark">
                      Montage & Bediening
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-semibold text-text-dark mb-4">
                        Montage
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light">
                            Snelle montage via kliksysteem in bestaande
                            raamconstructie
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light">
                            Geen beschadiging van het dakraam
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light">
                            Professionele installatie door onze specialisten
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-dark mb-4">
                        Bediening
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light">
                            Handmatig met greep of trekkoord
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light">
                            Elektrisch mogelijk bij motorisatie (optioneel)
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light">
                            App-bediening voor slimme woningen
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Section */}
              <div className="mb-16">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold text-text-dark">
                      Onderhoud
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🧹</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-dark mb-2">
                          Afstoffen met zachte doek
                        </h3>
                        <p className="text-text-light">
                          Regelmatig stof verwijderen voor optimale werking
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💧</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-dark mb-2">
                          Reiniging met licht vochtige doek
                        </h3>
                        <p className="text-text-light">
                          Indien nodig voor grondige reiniging
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Overview Section */}
              <div className="mb-16">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 md:p-12 border border-amber-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Euro className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold text-text-dark">
                      Prijsindicatie
                    </h2>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold text-primary">
                        €245
                      </span>
                      <span className="text-xl text-text-light">per stuk</span>
                    </div>
                    <p className="text-lg text-text-light max-w-2xl mx-auto">
                      Vanaf €245 per stuk, afhankelijk van type doek, bediening
                      en raamtype (Fakro/Velux). Inclusief maatwerk voor
                      perfecte pasvorm.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-primary to-primary rounded-2xl p-8 md:p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Advies op maat</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                  Vraag vrijblijvend een offerte aan of plan een adviesgesprek
                  voor hulp bij het kiezen van het juiste type zonwering voor uw
                  dakraam.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link href="/quote">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-primary hover:bg-primary/10 font-semibold"
                    >
                      Vraag een offerte aan
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary font-semibold"
                    >
                      Plan een gratis adviesgesprek
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DakraamZonweringenPage;
