import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HomeIcon,
  ChevronRight,
  Settings,
  Wrench,
  Palette,
  Shield,
} from "lucide-react";

const GordijnroedesPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          Gordijnroedes – Decoratieve Oplossing met Praktische Functionaliteit |
          KANIOU Zilvernaald
        </title>
        <meta
          name="description"
          content="Gordijnroedes zijn niet alleen functioneel, maar ook een belangrijk onderdeel van uw interieur. Ze bieden een decoratieve manier om gordijnen op te hangen en zijn beschikbaar in diverse stijlen, materialen en kleuren."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Gordijnroedes</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6">
                  Gordijnroedes – Decoratieve Oplossing met Praktische
                  Functionaliteit
                </h1>
                <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
                  Gordijnroedes zijn niet alleen functioneel, maar ook een
                  belangrijk onderdeel van uw interieur. Ze bieden een
                  decoratieve manier om gordijnen op te hangen en zijn
                  beschikbaar in diverse stijlen, materialen en kleuren.
                </p>
              </div>

              {/* Types of Curtain Rods */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 flex items-center">
                  <Settings className="mr-3 h-8 w-8 text-accent" />
                  Types Gordijnroedes
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">
                      Klassieke ronde staaf
                    </h3>
                    <p className="text-text-light">
                      Smeedijzeren of houten uitvoering
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">
                      Dubbele staaf
                    </h3>
                    <p className="text-text-light">
                      Roedes met dubbele staaf voor overgordijnen + vitrage
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">
                      Uitschuifbaar
                    </h3>
                    <p className="text-text-light">
                      Uitschuifbare of vaste lengte
                    </p>
                  </div>
                </div>
              </section>

              {/* Finials and Accessories */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 flex items-center">
                  <Palette className="mr-3 h-8 w-8 text-accent" />
                  Sierknoppen & Accessoires
                </h2>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-text-dark mb-3">
                        Eindknoppen
                      </h3>
                      <ul className="space-y-2 text-text-light">
                        <li>• Klassiek</li>
                        <li>• Modern</li>
                        <li>• Industrieel</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-dark mb-3">
                        Bevestiging
                      </h3>
                      <ul className="space-y-2 text-text-light">
                        <li>• Ringen en steunen</li>
                        <li>• Wand- of plafondbevestiging</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-dark mb-3">
                        Accessoires
                      </h3>
                      <ul className="space-y-2 text-text-light">
                        <li>• Bijpassende tiebacks</li>
                        <li>• Gordijnhaken</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Materials and Colors */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 flex items-center">
                  <Palette className="mr-3 h-8 w-8 text-accent" />
                  Materialen & Kleuren
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">
                      Metaal
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Zwart
                      </span>
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Messing
                      </span>
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Brons
                      </span>
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        RVS
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">
                      Hout
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Wit
                      </span>
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Eiken
                      </span>
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Noten
                      </span>
                      <span className="bg-neutral-100 px-3 py-2 rounded text-sm">
                        Zwart gebeitst
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-neutral-50 p-6 rounded-lg">
                  <p className="text-text-light text-center">
                    <strong>Afwerking:</strong> mat, glanzend of geborsteld
                  </p>
                </div>
              </section>

              {/* Mounting & Operation */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 flex items-center">
                  <Wrench className="mr-3 h-8 w-8 text-accent" />
                  Montage & Bediening
                </h2>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <ul className="space-y-4 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      Eenvoudige wand- of plafondmontage
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      Geschikt voor lichte tot zware gordijnen
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      Te combineren met standaard of wave-plooi
                    </li>
                  </ul>
                </div>
              </section>

              {/* Maintenance */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8 flex items-center">
                  <Shield className="mr-3 h-8 w-8 text-accent" />
                  Onderhoud
                </h2>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <ul className="space-y-4 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      Regelmatig afstoffen
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      Controleer bevestigingen periodiek op stevigheid
                    </li>
                  </ul>
                </div>
              </section>

              {/* Price Information */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">
                  Prijsindicatie
                </h2>
                <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-lg border">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-text-dark mb-2">
                      Vanaf €48 per meter
                    </p>
                    <p className="text-text-light">
                      Afhankelijk van materiaal, afwerking en accessoires
                    </p>
                  </div>
                </div>
              </section>

              {/* Personal Advice */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">
                  Persoonlijk advies
                </h2>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <p className="text-text-light text-center mb-8 text-lg">
                    Vraag vrijblijvend een offerte aan of maak een afspraak met
                    een adviseur om de juiste roede en bijpassende afwerking te
                    bepalen voor uw ruimte.
                  </p>
                </div>
              </section>

              {/* CTA Section */}
              <section className="text-center">
                <div className="bg-gradient-to-r from-secondary to-accent p-8 rounded-lg text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Klaar voor uw nieuwe gordijnroedes?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Link href="/quote" className="flex-1">
                      <Button className="w-full bg-white text-secondary hover:bg-neutral-100">
                        Vraag een offerte aan
                      </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary">
                        Plan een gratis adviesgesprek
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GordijnroedesPage;
