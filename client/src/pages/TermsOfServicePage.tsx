import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Servicevoorwaarden | Elegant Drapes</title>
        <meta
          name="description"
          content="Servicevoorwaarden en voorwaarden voor het gebruik van onze producten en diensten."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Servicevoorwaarden
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <div className="prose prose-headings:font-display prose-headings:text-primary prose-headings:font-semibold prose-p:font-body prose-p:text-text-medium max-w-none">
              <h2 className="text-xl mb-4">SERVICEVOORWAARDEN — ELEGANT DRAPES</h2>
              
              <p className="text-sm text-neutral-500 mb-6">
                Ingangsdatum: 01-06-2025<br />
                Laatst bijgewerkt: 14-05-2025
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">1. Algemene Informatie</h3>
              <p className="mb-4">
                Deze website wordt beheerd door Elegant Drapes BV, geregistreerd in Nederland onder KvK-nummer 0123.456.789, met het hoofdkantoor gevestigd op Gordijnstraat 123, 1234 AB Amsterdam. Op de hele site verwijzen de termen "wij", "ons" en "onze" naar Elegant Drapes.
              </p>
              <p className="mb-6">
                Door het bezoeken of gebruiken van onze website gaat u akkoord met de volgende Servicevoorwaarden ("Voorwaarden"), inclusief alle aanvullende voorwaarden, beleid en kennisgevingen waarnaar hier wordt verwezen en/of die beschikbaar zijn via hyperlink.
              </p>
              <p className="mb-6">
                Als u niet akkoord gaat met deze Voorwaarden, mag u deze website of zijn diensten niet gebruiken.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">2. Websitegebruik</h3>
              <p className="mb-4">
                U stemt ermee in om deze website alleen voor wettelijke doeleinden te gebruiken. U mag niet:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>De website gebruiken op een manier die in strijd is met toepasselijke lokale, nationale of internationale wetgeving of regelgeving</li>
                <li>De website gebruiken om ongevraagde of ongeautoriseerde reclame of promotiemateriaal te verzenden of uploaden</li>
                <li>Proberen ongeautoriseerde toegang te krijgen tot onze server of een database die verbonden is met deze website</li>
                <li>Virussen, trojans, wormen of ander materiaal verzenden dat kwaadwillig of technologisch schadelijk is</li>
              </ul>
              <p className="mb-6">
                Wij behouden ons het recht voor om uw toegang tot de website naar eigen goeddunken zonder kennisgeving te beperken of te beëindigen als u deze Voorwaarden schendt.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">3. Diensten en Producten</h3>
              <p className="mb-6">
                Elegant Drapes levert op maat gemaakte raambehandelingen, waaronder maar niet beperkt tot gordijnen, jaloezieën, shutters en zonweringssystemen. Alle producten worden op maat gemaakt volgens klantspecificaties.
              </p>
              <p className="mb-6">
                De afbeeldingen en beschrijvingen op de website zijn alleen ter illustratie. Definitieve productdetails worden bevestigd via schriftelijke offerte en orderbevestiging.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">4. Offertes en Bestellingen</h3>
              <p className="mb-6">
                Alle offertes zijn vrijblijvend totdat ze schriftelijk worden bevestigd. Prijzen die op de website worden getoond, zijn indicatief en kunnen variëren op basis van exacte afmetingen, materialen, arbeid, installatie en locatie.
              </p>
              <p className="mb-6">
                Offertes zijn geldig voor maximaal 30 kalenderdagen, tenzij anders vermeld. Acceptatie van een offerte door de klant moet schriftelijk of via officiële communicatiekanalen gebeuren.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">5. Betalingsvoorwaarden</h3>
              <p className="mb-4">
                Tenzij schriftelijk anders overeengekomen:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Kan een aanbetaling vereist zijn om de productie op maat te starten</li>
                <li>Moet volledige betaling plaatsvinden vóór installatie</li>
                <li>Kunnen bij late betalingen rentekosten en administratiekosten in rekening worden gebracht</li>
              </ul>
              <p className="mb-6">
                Wij behouden ons het recht voor om een bestelling op te schorten of te annuleren als de betaling vertraagd of onvolledig is.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">6. Intellectuele Eigendomsrechten</h3>
              <p className="mb-6">
                Alle inhoud op deze website - inclusief tekst, afbeeldingen, logo's, productontwerpen, iconen en code - is het exclusieve eigendom van Elegant Drapes BV of haar licentiegevers en wordt beschermd door auteurs- en merkrechten.
              </p>
              <p className="mb-6">
                Het is niet toegestaan om inhoud van deze website te reproduceren, kopiëren, distribueren, verkopen of te gebruiken zonder voorafgaande schriftelijke toestemming.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">7. Beperking van Aansprakelijkheid</h3>
              <p className="mb-6">
                Elegant Drapes doet alle redelijke inspanningen om ervoor te zorgen dat de informatie op deze website nauwkeurig en up-to-date is. Wij garanderen echter niet de volledigheid, nauwkeurigheid of betrouwbaarheid van de inhoud.
              </p>
              <p className="mb-4">
                Wij zijn niet aansprakelijk voor:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Directe of indirecte schade veroorzaakt door het gebruik van deze site</li>
                <li>Vertragingen of fouten in informatie</li>
                <li>Incompatibiliteit met gebruikerssoftware, apparaten of browserprestaties</li>
                <li>Virussen of andere schadelijke componenten als gevolg van gebruik</li>
              </ul>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">8. Door Gebruikers Gegenereerde Inhoud</h3>
              <p className="mb-6">
                Als u recensies, foto's, getuigenissen of ander materiaal naar ons instuurt via de website of sociale media, geeft u ons het recht om die inhoud te gebruiken, reproduceren, wijzigen en publiceren voor promotiedoeleinden, zonder vergoeding.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">9. Links naar Derden</h3>
              <p className="mb-6">
                Deze website kan links naar websites van derden bevatten. Wij zijn niet verantwoordelijk voor de inhoud, het privacybeleid of de praktijken van dergelijke websites en u bezoekt ze op eigen risico.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">10. Privacy en Gegevensbescherming</h3>
              <p className="mb-6">
                Elegant Drapes behandelt uw persoonlijke gegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en de Nederlandse privacywetgeving.
              </p>
              <p className="mb-6">
                Voor volledige details kunt u ons <a href="/privacy-policy" className="text-primary hover:text-secondary underline">Privacybeleid</a> lezen, dat onderdeel uitmaakt van deze Voorwaarden.
              </p>
              <p className="mb-6">
                Door deze website te gebruiken, gaat u akkoord met de verwerking van uw persoonlijke gegevens zoals daarin beschreven.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TermsOfServicePage;