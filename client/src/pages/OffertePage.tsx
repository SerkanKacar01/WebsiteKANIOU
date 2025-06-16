import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import QuoteForm from "@/components/forms/QuoteForm";
import { CheckCircle, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const OffertePage = () => {
  return (
    <>
      <Helmet>
        <title>Request Your Free Quote | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Request a personal quote for premium curtains, blinds and window coverings from KANIOU zilvernaald. Custom solutions tailored to your needs."
        />
      </Helmet>

      <div className="py-12 bg-primary relative">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">
                Vraag vrijblijvend offerte aan
              </h1>
              <p className="font-body text-white/90 max-w-2xl mx-auto">
                Vul onderstaand formulier in en onze specialisten nemen contact
                met je op met een gepersonaliseerde offerte op maat van jouw
                wensen.
              </p>
            </div>

            <Card className="shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="font-display text-2xl text-primary font-semibold mb-6">
                      Start je offerte aanvraag hier
                    </h2>
                    <QuoteForm />
                  </div>

                  <div className="bg-neutral-100 p-6 rounded-lg">
                    <h3 className="font-display text-xl text-primary font-medium mb-4">
                      Wat je mag verwachten na je aanvraag
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">
                            Binnen 24 uur contact
                          </h4>
                          <p className="text-sm text-text-light">
                            Onze experts nemen binnen één werkdag contact met je
                            op
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">
                            Gratis adviesgesprek
                          </h4>
                          <p className="text-sm text-text-light">
                            Persoonlijk advies en inmeting bij jou thuis
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">
                            Maatwerk offerte
                          </h4>
                          <p className="text-sm text-text-light">
                            Volledig aangepaste offerte inclusief montage
                          </p>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-neutral-200">
                      <h4 className="font-medium text-primary mb-3">
                        Direct contact opnemen?
                      </h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          +32 467 85 64 05
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          info@kaniou.be
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* Benefits section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-primary font-semibold text-center mb-12">
              Waarom kiezen voor KANIOU zilvernaald?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-medium text-primary mb-2">
                  30+ jaar ervaring
                </h3>
                <p className="text-text-light">
                  Ruime ervaring in maatwerk raamdecoratie voor particulieren en
                  bedrijven
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-medium text-primary mb-2">
                  Levertijden van 3 tot 4 weken
                </h3>
                <p className="text-text-light">
                  Korte levertijden en professionele montage door prof. monteur
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-medium text-primary mb-2">
                  Persoonlijk advies
                </h3>
                <p className="text-text-light">
                  Gratis adviesgesprek en inmeting bij jou thuis of op kantoor
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default OffertePage;
