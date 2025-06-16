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
          content="Gordijnrails vormen de basis van elk gordijnsysteem. KS & DS rails op maat vanaf €8,95 per meter. Soepele bediening en nette afwerking voor zowel lichte vitrages als zware overgordijnen."
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
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
                      Types Gordijnrails
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Standaard witte aluminium rail (meest gebruikt)
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Luxe design rail in zwart, rvs of mat wit
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Elektrische gordijnrail met afstandsbediening
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-text-medium">
                          Plafond- of wandmontage mogelijk
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Custom Rails Section - NEW */}
                <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 border-2 border-primary/20">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
                      <Settings className="w-5 h-5 text-primary" />
                      <span className="text-primary font-medium">Op Maat Gemaakt</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">
                      Gordijnrails KS & DS op Maat
                    </h2>
                    <p className="text-lg text-text-light max-w-2xl mx-auto">
                      Professionele gordijnrails, op maat gezaagd en inclusief accessoires. 
                      Perfecte pasvorm, optimale kwaliteit en stil glijdend systeem.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* KS Rail */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">KS</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-text-dark">KS Rail</h3>
                          <p className="text-sm text-text-light">Functioneel & Stil</p>
                        </div>
                      </div>
                      <p className="text-text-medium mb-4">
                        Populaire keuze voor dagelijks gebruik. Betrouwbaar systeem met 
                        geruisloze bediening en duurzame aluminium constructie.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-medium">Stil en soepel glijdend</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-medium">Verkrijgbaar in wit en zwart</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-medium">Inclusief alle accessoires</span>
                        </div>
                      </div>
                    </div>

                    {/* DS Rail */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">DS</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-text-dark">DS Rail</h3>
                          <p className="text-sm text-text-light">Modern Design</p>
                        </div>
                      </div>
                      <p className="text-text-medium mb-4">
                        Stijlvolle uitvoering met moderne esthetiek. Design-gericht systeem 
                        dat functionaliteit combineert met elegante vormgeving.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-medium">Modern en strak design</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-medium">Verkrijgbaar in wit en zwart</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-medium">Premium afwerking</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Configuration Options */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                    <h3 className="text-xl font-semibold text-text-dark mb-6 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-primary" />
                      Configuratie Opties
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-medium text-text-dark mb-2">Lengte</h4>
                        <p className="text-sm text-text-medium">100 - 600 cm<br />Op maat gezaagd</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-dark mb-2">Montage</h4>
                        <p className="text-sm text-text-medium">Plafond of wand<br />Inclusief steunen</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-dark mb-2">Bochten</h4>
                        <p className="text-sm text-text-medium">0, 1 of 2 stuks<br />(optioneel)</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-dark mb-2">Kleuren</h4>
                        <p className="text-sm text-text-medium">Wit of zwart<br />Aluminium profiel</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                      <Euro className="w-5 h-5 text-primary" />
                      <span className="text-primary font-semibold">Vanaf €8,95 per meter</span>
                    </div>
                    <p className="text-text-medium mb-6">
                      Inclusief eindstops, steunen en runners. Meerprijs voor extra bochten.
                    </p>
                    <Link href="/offerte">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4">
                        Stel jouw rail samen
                        <Settings className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
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
                      <Check className="w-5 h-5 text-primary mt-1" />
                      <span className="text-text-medium">
                        Direct aan plafond of wand
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-1" />
                      <span className="text-text-medium">
                        Geschikt voor alle soorten gordijnstoffen
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-1" />
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
                      <Check className="w-5 h-5 text-primary mt-1" />
                      <span className="text-text-medium">
                        Regelmatig afnemen met droge doek
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-1" />
                      <span className="text-text-medium">
                        Smeren van runners indien nodig voor soepele werking
                      </span>
                    </div>
                  </div>
                </section>

                {/* Price Indication */}
                <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-8 border border-amber-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
                      Prijsindicatie
                    </h2>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-lg text-text-dark mb-2">
                      <span className="font-semibold text-2xl text-primary">
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
                    <div className="bg-gradient-to-r from-primary to-primary text-white p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">
                        Vraag een offerte aan
                      </h3>
                      <p className="text-primary-foreground mb-6">
                        Ontvang binnen 24 uur een persoonlijke offerte op maat
                        voor uw gordijnrails.
                      </p>
                      <Link href="/quote">
                        <Button className="w-full bg-white text-primary hover:bg-primary/10">
                          <Mail className="w-4 h-4 mr-2" />
                          Vraag een offerte aan
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-gradient-to-r from-primary to-primary text-white p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">
                        Plan een gratis adviesgesprek
                      </h3>
                      <p className="text-primary-foreground mb-6">
                        Maak een afspraak voor persoonlijk advies bij u thuis of
                        in onze showroom.
                      </p>
                      <Link href="/contact">
                        <Button className="w-full bg-white text-primary hover:bg-primary/10">
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
