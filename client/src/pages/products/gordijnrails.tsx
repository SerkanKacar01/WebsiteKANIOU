import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Check, Settings, Wrench, Euro, Phone, Mail } from "lucide-react";

const GordijnrailsPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Gordijnrails – Onmisbaar voor Functionele en Stijlvolle Raambekleding
          | KANIOU Zilvernaald
        </title>
        <meta
          name="description"
          content="Gordijnrails vormen de basis van elk gordijnsysteem. Soepele bediening en nette afwerking voor zowel lichte vitrages als zware overgordijnen. Vanaf €14,95 per meter."
        />
        <meta
          property="og:title"
          content="Gordijnrails – Onmisbaar voor Functionele en Stijlvolle Raambekleding"
        />
        <meta
          property="og:description"
          content="Gordijnrails vormen de basis van elk gordijnsysteem. Soepele bediening en nette afwerking voor zowel lichte vitrages als zware overgordijnen."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6">
                  Gordijnrails – Onmisbaar voor Functionele en Stijlvolle
                  Raambekleding
                </h1>
                <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
                  Gordijnrails vormen de basis van elk gordijnsysteem. Ze zorgen
                  voor soepele bediening en een nette afwerking, geschikt voor
                  zowel lichte vitrages als zware overgordijnen.
                </p>
              </div>

              <div className="space-y-16">
                {/* Types Section */}
                <section className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
                      Types Gordijnrails
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Standaard witte aluminium rail (meest gebruikt)
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Luxe design rail in zwart, rvs of mat wit
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Elektrische gordijnrail met afstandsbediening
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Plafond- of wandmontage mogelijk
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Materials & Finishes */}
                <section className="bg-neutral-50 rounded-xl p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">
                    Materialen & Afwerkingen
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-text-dark mb-4">
                        Materialen
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-text-medium">
                            Aluminium of staal
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-text-dark mb-4">
                        Kleuren
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-text-medium">
                            Wit, zwart, rvs, brons
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-text-dark mb-4">
                        Opties
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-text-medium">
                            Met of zonder sierlijst
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Operation Options */}
                <section className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">
                    Bediening
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-text-dark mb-4">
                        Handmatige Bediening
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-text-medium">
                            Handmatig met trekkoord of handschuif
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-text-medium">
                            Geschikt voor bochten en hoeken
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-text-dark mb-4">
                        Elektrische Bediening
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-text-medium">
                            Elektrisch bedienbaar (optioneel)
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-text-medium">
                            Afstandsbediening mogelijk
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Installation */}
                <section className="bg-neutral-50 rounded-xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
                      Montage
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 mt-1" />
                      <span className="text-text-medium">
                        Direct aan plafond of wand
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 mt-1" />
                      <span className="text-text-medium">
                        Geschikt voor alle soorten gordijnstoffen
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 mt-1" />
                      <span className="text-text-medium">
                        Inclusief bevestigingsmateriaal en runners
                      </span>
                    </div>
                  </div>
                </section>

                {/* Maintenance */}
                <section className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">
                    Onderhoud
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 mt-1" />
                      <span className="text-text-medium">
                        Regelmatig afnemen met droge doek
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 mt-1" />
                      <span className="text-text-medium">
                        Smeren van runners indien nodig voor soepele werking
                      </span>
                    </div>
                  </div>
                </section>

                {/* Price Indication */}
                <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-8 border border-amber-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
                      Prijsindicatie
                    </h2>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-lg text-text-dark mb-2">
                      <span className="font-semibold text-2xl text-amber-600">
                        Vanaf €12,95 per meter (Excl. plaatsing)
                      </span>
                    </p>
                    <p className="text-text-medium">
                      Prijs gebaseerd op U-rail De luxe__ incl. toebehoren__:
                      Behalve voor Wave Plooi
                    </p>
                  </div>
                </section>

                {/* Advice Section */}
                <section className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-6">
                    Advies op maat
                  </h2>
                  <p className="text-lg text-text-medium mb-8">
                    Onze specialisten helpen u graag met het kiezen van het
                    juiste gordijnrailsysteem. Vraag vrijblijvend een offerte
                    aan of maak een afspraak voor advies op maat.
                  </p>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">
                        Vraag een offerte aan
                      </h3>
                      <p className="text-amber-100 mb-6">
                        Ontvang binnen 24 uur een persoonlijke offerte op maat
                        voor uw gordijnrails.
                      </p>
                      <Link href="/quote">
                        <Button className="w-full bg-white text-amber-600 hover:bg-amber-50">
                          <Mail className="w-4 h-4 mr-2" />
                          Vraag een offerte aan
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">
                        Plan een gratis adviesgesprek
                      </h3>
                      <p className="text-amber-100 mb-6">
                        Maak een afspraak voor persoonlijk advies bij u thuis of
                        in onze showroom.
                      </p>
                      <Link href="/contact">
                        <Button className="w-full bg-white text-amber-600 hover:bg-amber-50">
                          <Phone className="w-4 h-4 mr-2" />
                          Plan een gratis adviesgesprek
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GordijnrailsPage;
