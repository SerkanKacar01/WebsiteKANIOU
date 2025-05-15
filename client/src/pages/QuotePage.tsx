import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import QuoteForm from "@/components/forms/QuoteForm";
import { CheckCircle } from "lucide-react";

const QuotePage = () => {
  return (
    <>
      <Helmet>
        <title>Request a Quote | Elegant Drapes</title>
        <meta
          name="description"
          content="Request a personalized quote for premium curtains, blinds, and window treatments from Elegant Drapes. Custom solutions tailored to your needs."
        />
      </Helmet>

      <div className="py-12 bg-primary relative">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">
                Vraag een GRATIS offerte aan
              </h1>
              <p className="font-body text-white/90 max-w-2xl mx-auto">
                Vul onderstaand formulier in en onze specialisten nemen contact
                met u op met een persoonlijke offerte, volledig afgestemd op uw
                wensen.
              </p>
            </div>

            <Card className="shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="font-display text-2xl text-primary font-semibold mb-6">
                      Offerte aanvraag formulier
                    </h2>
                    <QuoteForm />
                  </div>

                  <div className="bg-neutral-100 p-6 rounded-lg">
                    <h3 className="font-display text-xl text-primary font-medium mb-4">
                      Wat je mag verwachten na de aanvraag
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          Uw offerteaanvraag wordt binnen 24 uur zorgvuldig
                          beoordeeld
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          Een interieuradviseur neemt persoonlijk contact met je
                          op, om je wensen en verwachtingen te bespreken
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          Indien van toepassing wordt er een afspraak ingepland
                          voor een professionele opmeting aan huis.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          Je ontvangt vervolgens een gedetailleerde en
                          vrijblijvende offerte, inclusief passende oplossingen
                          en prijsopties
                        </span>
                      </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-neutral-300">
                      <h4 className="font-medium mb-2">Heb je vragen?</h4>
                      <p className="text-text-medium text-sm mb-2">
                        Neem direct telefonisch contact met ons op via:
                      </p>
                      <a
                        href="tel:+15551234567"
                        className="text-accent font-medium text-lg"
                      >
                        +32 467 85 64 05
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
                Wat onze tevreden klanten over ons vertellen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-100 p-6 rounded-lg">
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-text-medium italic mb-4">
                    "Zonder afspraak binnen gewandeld en toen direct netjes
                    geholpen . Thuisbezoek gehad voor opnemen maten en om te
                    zien of stoffen ook daadwerkelijk passen bij de ruimtes.
                    Steeds netjes contact geweest ; offerte snel gemaakt ,
                    afspraken worden nagekomen . Vandaag de gordijnen in onze
                    woonkamer mogen ontvangen en we zijn zo content ! Heel snel
                    en vakkundig werk geleverd . We laten het hele huis doen ,
                    bovenverdieping volgende maand . We kijken er naar uit !
                    Voornaam : Kwaliteit en service voor een eerlijke prijs !"
                  </p>
                  <p className="font-medium">Mrs. Buelles,</p>
                  <p className="text-text-light text-sm">België</p>
                </div>

                <div className="bg-neutral-100 p-6 rounded-lg">
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-text-medium italic mb-4">
                    "Zeer vriendelijke en uitermate professioneel bedrijf.
                    Prachtige gordijnen aangeschaft hier. Service uitstekend.
                    Komt netjes aan huis met verschillende modellen en kleuren.
                    Alles wordt gemeten en we kregen passend advies. Binnen 3
                    weken waren de gordijnen op maat gemaakt, besteld en
                    gemonteerd!"
                  </p>
                  <p className="font-medium">Mr. T.</p>
                  <p className="text-text-light text-sm">Nederland</p>
                </div>

                <div className="bg-neutral-100 p-6 rounded-lg">
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-text-medium italic mb-4">
                    "Houdt zich aan de afspraken, is heel netjes met praten,
                    legt alles goed uit, goede kwaliteit van de materialen, komt
                    alles zelf goed meten en komt het later zelf ophangen. Top
                    bedrijf en als ik iemand weet, die iets moet hebben wat zij
                    verkopen, stuur ik hun naar dit bedrijf. Dhr. Serkan heeft
                    afgelopen zaterdag 5 zonweringen opgehangen onder het afdak,
                    omdat de tuin op het zuiden ligt en wij dus niet onder het
                    afdak kunnen zitten als het warm weer is. Hij heeft alles
                    komen meten en toen alles klaar was heeft hij het komen
                    ophangen. Hij houdt zich aan zijn afspraken en als er iets
                    niet goed is, gaat hij niet eerder weg dan dat het in orde
                    is en na zijn kwaliteit van materiaal, ook al moet hij iets
                    anders bestellen op zijn eigen kosten, maar hij is niet
                    eerder tevreden, dan als alles prima in orde is en het ook
                    zijn kwaliteit van afleveren heeft. Dhr. Serkan, bedankt
                    voor de mooie zonwering en voor de goede kwaliteit van
                    materialen. "
                  </p>
                  <p className="font-medium">Mrs. Spee.</p>
                  <p className="text-text-light text-sm">Nederland</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default QuotePage;
