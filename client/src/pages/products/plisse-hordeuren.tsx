import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle,
  Shield,
  Settings,
  Wrench,
  Sparkles,
  Euro,
} from "lucide-react";

const PlisseHordeurenPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          Plissé Hordeuren – Comfortabel en Stijlvol Beschermd Tegen Insecten |
          KANIOU Zilvernaald
        </title>
        <meta
          name="description"
          content="Plissé hordeuren zijn dé ideale oplossing voor schuifpuien, terrasdeuren en balkondeuren. Vanaf €159 per deur, maatwerk mogelijk."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Introduction Section */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
                  Plissé Hordeuren – Comfortabel en Stijlvol Beschermd Tegen
                  Insecten
                </h1>
                <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
                  Plissé hordeuren zijn dé ideale oplossing voor schuifpuien,
                  terrasdeuren en balkondeuren. Dankzij het geplisseerde gaas
                  schuift de deur soepel open en dicht en blijft het gaas op
                  zijn plek – zonder terugrolmechanisme.
                </p>
              </div>

              {/* Advantages Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold text-text-dark">
                    Voordelen
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-text-light">
                        Eenvoudig te bedienen, ook voor kinderen en ouderen
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-text-light">
                        Geschikt voor intensief gebruik
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-text-light">
                        Plissé gaas blijft zichtbaar – voorkomt botsen
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-text-light">
                        Geschikt voor binnen- en buitenmontage
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-text-light">
                        Compact design – ruimtebesparend
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-text-light">
                        Verkrijgbaar in enkele en dubbele uitvoering
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Frame & Mesh Options Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Settings className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold text-text-dark">
                    Frame- en Gaasopties
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-text-dark mb-3">
                      Aluminium Frame
                    </h3>
                    <p className="text-text-light">
                      Beschikbaar in wit, zwart, antraciet, crème, of elke
                      RAL-kleur naar wens
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-text-dark mb-3">
                      Gaas
                    </h3>
                    <p className="text-text-light">
                      Zwart of grijs plisségaas, UV-bestendig en vormvast voor
                      langdurige kwaliteit
                    </p>
                  </div>
                </div>
              </div>

              {/* Installation & Use Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Wrench className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold text-text-dark">
                    Montage & Gebruik
                  </h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <ul className="space-y-3 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Geschikt voor montage in het kozijn (in-de-dag) of op het
                      kozijn (op-de-dag)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Inclusief ondergeleider voor drempelloze doorgang
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Maximale hoogte tot ca. 300 cm mogelijk
                    </li>
                  </ul>
                </div>
              </div>

              {/* Maintenance Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold text-text-dark">
                    Onderhoud
                  </h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <ul className="space-y-3 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Regelmatig stofvrij maken met borstel of stofzuiger
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Vuil verwijderen met vochtige doek en milde zeep
                    </li>
                  </ul>
                </div>
              </div>

              {/* Price Indication Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Euro className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold text-text-dark">
                    Prijsindicatie
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-secondary/10 to-accent/10 p-6 rounded-lg border">
                  <p className="text-lg text-text-dark font-semibold mb-2">
                    Vanaf €225 per deur -( Excl. plaatsing
                  </p>
                  <p className="text-text-light">
                    (Prijs indicatie gebaseerd op Br. x Ho: 100 x 260 cm) <br />
                    Afhankelijk van maatvoering, kleur en uitvoering
                    (enkel/dubbel). Inclusief maatwerk.
                  </p>
                </div>
              </div>

              {/* Advice & CTA Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold text-text-dark">
                    Advies op Maat
                  </h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                  <p className="text-text-light mb-6">
                    Vraag vrijblijvend een offerte aan of plan een adviesgesprek
                    met onze hordeur-specialist. Wij komen indien gewenst bij u
                    langs voor inmeting en presentatie van mogelijkheden.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Link href="/quote">
                    <Button className="w-full bg-secondary hover:bg-accent text-white py-4 text-lg font-semibold transition-all hover:transform hover:scale-105">
                      Vraag een offerte aan
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-white py-4 text-lg font-semibold transition-all hover:transform hover:scale-105"
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

export default PlisseHordeurenPage;
