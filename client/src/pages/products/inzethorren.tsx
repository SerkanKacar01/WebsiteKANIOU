import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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
  Check,
  MessageCircle,
  Calculator,
} from "lucide-react";

const InzethorrenPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Inzethorren - De Praktische Oplossing voor Draai-Kiepramen | Elegant
          Drapes
        </title>
        <meta
          name="description"
          content="Inzethorren ideaal voor draai-kiepramen. Geen schroeven of boren nodig, snel te plaatsen en verwijderen. Op maat gemaakt vanaf €45 per stuk."
        />
        <meta
          property="og:title"
          content="Inzethorren - De Praktische Oplossing voor Draai-Kiepramen | Elegant Drapes"
        />
        <meta
          property="og:description"
          content="Inzethorren ideaal voor draai-kiepramen. Geen schroeven nodig, op maat gemaakt. Vanaf €45 per stuk."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Container className="py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <HomeIcon className="h-4 w-4" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Producten</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="font-semibold">Inzethorren</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Inzethorren
            </h1>
            <p className="font-body text-xl md:text-2xl text-text-medium max-w-4xl mx-auto leading-relaxed">
              De Praktische Oplossing voor Draai-Kiepramen
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <p className="font-body text-lg text-text-medium leading-relaxed max-w-4xl mx-auto text-center">
                Inzethorren zijn ideaal voor draai-kiepramen. Ze worden zonder
                schroeven of boren in het kozijn geplaatst en zijn eenvoudig te
                verwijderen. Perfect voor wie insecten buiten wil houden zonder
                het zicht te belemmeren.
              </p>
            </div>
          </section>

          {/* Advantages Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4">
                Voordelen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Geen schroeven of boren nodig",
                "Snel te plaatsen en te verwijderen",
                "Op maat gemaakt voor ieder raam",
                "Slank en onopvallend profiel",
                "Geschikt voor houten, aluminium en kunststof kozijnen",
                "In diverse RAL-kleuren leverbaar",
              ].map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-body text-text-dark leading-relaxed">
                      {advantage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Frame and Mesh Options */}
          <section className="mb-16">
            <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-8 text-center">
                Frame- en Gaassoorten
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-primary mb-4">
                    Aluminium Frame
                  </h3>
                  <p className="font-body text-text-medium">
                    Verkrijgbaar in wit, antraciet, bruin of zwart - & RAL-kleur
                    op meerprijs
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-primary mb-4">
                    Gaasopties
                  </h3>
                  <ul className="font-body text-text-medium space-y-2">
                    <li>• Grijs gaas</li>
                    <li>• Zwart gaas</li>
                    <li>• Petscreen (extra stevig)</li>
                    <li>• Pollenwerend (allergievriendelijk)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Installation Method */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4">
                Montage
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Klemmen in het kozijn zonder schade",
                "Zowel binnen- als buitendraaiende ramen",
                "Geschikt voor vaste of draaiende hor",
              ].map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="font-body text-text-dark leading-relaxed">
                    {method}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Maintenance */}
          <section className="mb-16">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-8 text-center">
                Onderhoud
              </h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-primary mb-3">
                    Frame onderhoud
                  </h3>
                  <p className="font-body text-text-medium">
                    Afneembaar met vochtige doek of stofzuiger met borstelkop
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-primary mb-3">
                    Gaas onderhoud
                  </h3>
                  <p className="font-body text-text-medium">
                    Gaas kan gereinigd worden met lauw water en zachte borstel
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Price Range */}
          <section className="mb-16">
            <div className="bg-accent/10 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-6">
                Prijsindicatie
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="font-body text-xl text-text-dark mb-4">
                  <span className="font-semibold text-accent">
                    Vanaf €45 per stuk
                  </span>
                </p>
                <p className="font-body text-text-medium">
                  Afhankelijk van afmeting, type gaas en framekleur. Altijd
                  maatwerk inbegrepen.
                </p>
              </div>
            </div>
          </section>

          {/* Personal Advice */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4">
                Persoonlijk advies
              </h2>
              <p className="font-body text-lg text-text-medium max-w-3xl mx-auto">
                Onze hor-specialisten helpen u graag verder met een passend
                advies. Vraag een offerte aan of maak een afspraak in onze
                showroom.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Klaar voor uw nieuwe inzethorren?
              </h2>
              <p className="font-body text-xl mb-8 opacity-90">
                Vraag vandaag nog een vrijblijvende offerte aan of plan een
                gratis adviesgesprek
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  <Link href="/quote">
                    <Calculator className="w-5 h-5 mr-2" />
                    Vraag een offerte aan
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3"
                >
                  <Link href="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Plan een gratis adviesgesprek
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default InzethorrenPage;
