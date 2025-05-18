import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Ruler, Truck, Headphones, CheckCircle } from "lucide-react";
import { overgordijnenImage } from "@/assets";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Elegant Drapes</title>
        <meta
          name="description"
          content="Learn about Elegant Drapes' 20+ years of experience creating premium window treatments. Discover our story, values, and commitment to quality."
        />
      </Helmet>

      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Over KANIOU zilvernaald || Gordijnen & Zonweringen
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Al meer dan 30 jaar creëren wij hoogwaardige raambekleding op maat
              die gewone ruimtes transformeert tot verfijnde interieurs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                Ons verhaal
              </h2>
              <p className="font-body text-text-medium mb-6">
                Opgericht in 1991 begon KANIOU zilvernaald met een duidelijke
                missie: het creëren van stijlvolle, hoogwaardige raambekleding
                die naadloos aansluit bij de persoonlijke stijl van elke klant.
                Wat startte als een kleinschalige familiale onderneming, is
                inmiddels uitgegroeid tot een toonaangevende leverancier van
                premium maatwerkoplossingen voor raamdecoratie in de regio. Onze
                reis begon met een eenvoudige overtuiging: iedereen verdient
                prachtige, duurzame raambekleding die niet alleen functioneel
                is, maar ook de esthetiek en persoonlijkheid van de ruimte
                weerspiegelt. Vandaag de dag zijn wij trots dat wij jaarlijks
                duizenden klanten mogen begeleiden in het transformeren van hun
                interieur, dankzij ons vakmanschap en verfijnd oog voor design.
                Wij onderscheiden ons door een persoonlijke aanpak: wij
                luisteren aandachtig naar de wensen en voorkeuren van elke klant
                en vertalen die naar oplossingen die verwachtingen overtreffen.
                Ons team van ervaren interieurontwerpers en installateurs werkt
                met passie, precisie en oog voor detail — en dat ziet u terug in
                elk gerealiseerd project.
              </p>
              <p className="font-body text-text-medium mb-6">
                Onze reis begon met een eenvoudige overtuiging: iedereen
                verdient stijlvolle, hoogwaardige raambekleding die aansluit bij
                zijn of haar persoonlijke stijl. Vandaag zijn we trots dat we
                jaarlijks duizenden klanten mogen begeleiden bij het
                transformeren van hun leefruimtes, dankzij ons vakmanschap en
                oog voor verfijnd design.
              </p>
              <p className="font-body text-text-medium">
                Wij hechten grote waarde aan een persoonlijke aanpak. We werken
                nauw samen met elke klant om hun wensen en voorkeuren volledig
                te begrijpen, en leveren maatwerkoplossingen die de
                verwachtingen telkens weer overtreffen. Ons team van ervaren
                ontwerpers en installateurs is gepassioneerd over hun vak, en
                dat komt tot uiting in de kwaliteit van elk gerealiseerd
                project.
              </p>
            </div>

            <div className="relative">
              <img
                src={overgordijnenImage}
                alt="KANIOU zilvernaald Showroom"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-display text-lg text-primary font-medium">
                  30+
                </p>
                <p className="font-body text-text-medium text-sm">
                  Years of Excellence
                </p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-display text-lg text-primary font-medium">
                  5000+
                </p>
                <p className="font-body text-text-medium text-sm">
                  Tevreden klanten
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
              Over KANIOU Zilvernaald
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Premium kwaliteit
                </h3>
                <p className="font-body text-text-medium">
                  Alleen de beste materialen en vakmanschap in elk product, voor
                  een perfecte combinatie van schoonheid en duurzaamheid.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Ruler className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Maatwerkoplossingen
                </h3>
                <p className="font-body text-text-medium">
                  Volledig afgestemd op uw exacte specificaties en wensen, voor
                  een perfecte pasvorm tot in het kleinste detail.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Professionele installatie
                </h3>
                <p className="font-body text-text-medium">
                  Vakkundige plaatsingsservice met een gegarandeerd perfect
                  resultaat en minimale overlast in uw woning.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Headphones className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Deskundig advies
                </h3>
                <p className="font-body text-text-medium">
                  Persoonlijk advies van onze specialisten in raambekleding,
                  zodat u altijd de juiste keuze maakt voor uw interieur.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-16">
            <h2
              className="font-display text-2xl text-primary font-semibold mb-6"
              id="measure-guide"
            >
              Meet- en Installatiehandleidingen
            </h2>

            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="measure-curtains">
                <AccordionTrigger className="text-lg font-medium">
                  Hoe meet ik mijn ramen voor gordijnen?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p>
                      Om een perfecte pasvorm van uw gordijnen te garanderen,
                      volgt u onderstaande stappen:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        Meet de breedte van het raam of de rails. Voor een
                        vollere uitstraling voegt u aan beide zijden 15 tot 20
                        cm toe.
                      </li>
                      <li>
                        Meet vanaf de bovenkant van de rail of gordijnroede tot
                        aan het gewenste eindpunt van het gordijn (bijvoorbeeld
                        tot aan de vensterbank, net onder de vensterbank of tot
                        op de vloer).
                      </li>
                      <li>
                        Bij railsystemen telt u 2 à 3 cm extra bij de hoogte op
                        om ruimte te voorzien voor de plooiband of het kopstuk.
                      </li>
                      <li>
                        Bij roedegemonteerde gordijnen meet u vanaf de bovenkant
                        van de roede tot het gewenste eindpunt en telt u 2 à 3
                        cm extra voor de ringen.
                      </li>
                    </ol>
                    <p className="text-accent">
                      Professionele tip: Geef bij het plaatsen van uw bestelling
                      altijd de exacte maten door zoals u ze heeft opgemeten.
                      Ons team past deze vervolgens nauwkeurig aan op basis van
                      het gekozen type kopafwerking.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="measure-blinds">
                <AccordionTrigger className="text-lg font-medium">
                  Hoe meet ik mijn ramen voor zonweringen?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p>Hoe zonweringen correct opmeten</p>
                    <h4 className="font-medium">
                      In-de-dag (in het kozijn gemonteerd):
                    </h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        Meet de exacte breedte aan de boven-, midden- en
                        onderzijde van de raamnis.
                      </li>
                      <li>
                        Gebruik de kleinste breedtemaat om te verzekeren dat de
                        zonwering zonder belemmering past.
                      </li>
                      <li>
                        Meet vervolgens de hoogte aan de linker-, midden- en
                        rechterzijde van de nis.
                      </li>
                      <li>
                        Gebruik de langste hoogtemaat om volledige bedekking te
                        garanderen.
                      </li>
                    </ol>
                    <h4 className="font-medium">
                      Op-de-dag (op de muur of kozijn gemonteerd):
                    </h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        Meet de gewenste breedte van het te bedekken gebied. Tel
                        aan beide zijden 5 tot 10 cm extra op voor een optimale
                        afscherming tegen lichtinval.
                      </li>
                      <li>
                        Meet de hoogte vanaf het gewenste beginpunt van de
                        jaloezie tot het gewenste eindpunt.
                      </li>
                    </ol>
                    <p className="text-accent">
                      Opmerking: Bij rol- of kettingbediende jaloezieën is het
                      belangrijk om duidelijk aan te geven aan welke zijde u de
                      bediening wenst (links of rechts).
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="installation">
                <AccordionTrigger
                  className="text-lg font-medium"
                  id="installation-guide"
                >
                  Installatie tips!
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p>
                      Hoewel wij professionele installatieservice aanbieden,
                      kunt u ervoor kiezen om de plaatsing zelf uit te voeren.
                      Volg dan onderstaande richtlijnen:
                    </p>
                    <h4 className="font-medium">Voor Gordijnroedes:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Plaats de roedesteunen ongeveer 15 cm boven het raam en
                        15 à 20 cm buiten de raamopening aan beide zijden.
                      </li>
                      <li>
                        Gebruik steeds geschikte pluggen en
                        bevestigingsmaterialen, aangepast aan het type muur
                        (gips, beton, baksteen, enz.).
                      </li>
                      <li>
                        Controleer of de roede waterpas hangt vóór het
                        definitief vastzetten.
                      </li>
                    </ul>
                    <h4 className="font-medium">Voor Gordijnrails:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Monteer de rail ongeveer 10 cm boven het raam.</li>
                      <li>
                        Zorg ervoor dat de bevestigingen om de 50 à 60 cm
                        geplaatst worden en stevig vastzitten.
                      </li>
                      <li>
                        Controleer of de rail vlot en soepel werkt alvorens de
                        gordijnen te bevestigen.
                      </li>
                    </ul>
                    <h4 className="font-medium">Voor de zonweringen:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Markeer de positie van de beugels en controleer dat deze
                        perfect waterpas zijn.
                      </li>
                      <li>
                        Bij op-de-dag montage: plaats de beugels op de muur of
                        het raamkozijn, buiten de nis.
                      </li>
                      <li>
                        Bij in-de-dag montage: bevestig de beugels aan de
                        binnenzijde van de raamnis.
                      </li>
                      <li>
                        Test de werking van het systeem vóór definitieve
                        bevestiging.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2
              className="font-display text-2xl text-primary font-semibold mb-6"
              id="care-instructions"
            >
              Onderhoudsinstructies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Gordijnen & Overgordijnen
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Regelmatig afstoffen met een plumeau of stofzuigen met een
                      zachte meubelborstel.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Raadpleeg altijd het wasetiket voor specifieke
                      onderhoudsinstructies — de meeste stoffen zijn geschikt
                      voor een fijnwasprogramma in de wasmachine
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Voor het beste resultaat kunt u de gordijnen licht vochtig
                      strijken op lage temperatuur.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Voor zijde of gevoerde gordijnen wordt professionele
                      reiniging sterk aanbevolen.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Zonweringen</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Stof regelmatig af met een microvezeldoek of een zachte
                      plumeau.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Reinig plaatselijk met een mild reinigingsmiddel en lauw
                      water indien nodig.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Gebruik voor houten jaloezieën af en toe een speciale
                      houtreiniger om de afwerking te behouden.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Houd het bedieningsmechanisme stofvrij voor een soepele en
                      duurzame werking
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <h2
              className="font-display text-2xl text-primary font-semibold mb-6"
              id="faq"
            >
              Veelgestelde vragen
            </h2>

            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>
                  Hoelang duurt het voordat op maat gemaakte raamdecoratie
                  geleverd en geplaatst wordt?
                </AccordionTrigger>
                <AccordionContent>
                  In de meeste gevallen bedraagt de levertijd van op maat
                  gemaakte raamdecoratie 3 tot 4 weken vanaf het moment van
                  bestelling tot en met de installatie. Dit is afhankelijk van
                  de complexiteit van het ontwerp, de beschikbaarheid van
                  stoffen en onze actuele productieplanning. Bij het plaatsen
                  van uw bestelling ontvangt u van ons een duidelijke en
                  specifieke tijdsinschatting op maat van uw project.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  Biedt u ook advies aan huis aan?
                </AccordionTrigger>
                <AccordionContent>
                  Ja, wij bieden kosteloze adviesafspraken aan huis. Onze
                  interieuradviseurs komen bij u langs met stalen, nemen
                  professionele maatmetingen en geven persoonlijk advies op
                  basis van uw ruimte, stijl en wensen. Neem gerust contact met
                  ons op om een afspraak in te plannen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>Wat is uw retourbeleid?</AccordionTrigger>
                <AccordionContent>
                  <div id="return-policy">
                    Kant-en-klare producten in onbeschadigde, originele staat
                    kunnen binnen 14 dagen na ontvangst worden geretourneerd
                    voor een volledige terugbetaling of omruiling. Op maat
                    gemaakte producten kunnen niet geretourneerd worden, tenzij
                    er sprake is van een fabrieksfout of productiefout. Heeft u
                    vragen of opmerkingen over uw bestelling? Neem dan gerust
                    contact met ons op — wij helpen u graag verder.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  Welke garantie bieden jullie aan?
                </AccordionTrigger>
                <AccordionContent>
                  <div id="warranty">
                    Al onze producten worden geleverd met een garantie van 2
                    jaar tegen fabricagefouten. Deze garantie dekt problemen met
                    stoffen, stiksels, bevestigingsmaterialen en
                    bedieningsmechanismen bij normaal gebruik. De garantie geldt
                    niet voor schade veroorzaakt door onjuiste installatie,
                    ongelukken, onoordeelkundig gebruik of normale slijtage.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  Kunnen jullie gordijnen afstemmen op mijn bestaande interieur?
                </AccordionTrigger>
                <AccordionContent>
                  Zeker! Wij bieden een uitgebreide selectie stoffen, patronen
                  en kleuren die volledig kunnen worden afgestemd op uw
                  bestaande interieurstijl. Tijdens een adviesgesprek helpen wij
                  u graag bij het kiezen van de perfecte combinaties die uw
                  ruimte aanvullen en versterken.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl text-primary font-semibold mb-4">
              Klaar om uw ruimte te transformeren?
            </h2>
            <p className="font-body text-text-medium max-w-2xl mx-auto mb-6">
              Neem contact op met ons team voor deskundig advies of vraag een
              offerte aan voor uw raamdecoratie op maat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <a>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-secondary hover:bg-accent"
                  >
                    Offerte aanvragen
                  </Button>
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Contacteer ons
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutPage;
