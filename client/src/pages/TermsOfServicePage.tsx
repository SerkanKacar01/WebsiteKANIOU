import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/layout/LanguageSelector";

const TermsOfServicePage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          Algemene voorwaarden - KANIOU zilvernaald {t("app.title")}
        </title>
        <meta
          name="description"
          content="Terms of Service and conditions for using our products and services."
        />
      </Helmet>

      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Algemene voorwaarden - KANIOU zilvernaald
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            {/* For now, only English version is implemented */}
            <div className="prose prose-headings:font-display prose-headings:text-primary prose-headings:font-semibold prose-p:font-body prose-p:text-text-medium max-w-none">
              <h2 className="text-xl mb-4">Algemene voorwaarden</h2>

              <p className="text-sm text-neutral-500 mb-6">
                INGANGSDATUM: 20-05-2025
                <br />
                LAATSTE WIJZIGING: 20-05-2025
              </p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">
                1. Identiteit van de onderneming
              </h3>
              <p className="mb-4">
                KANIOU Zilvernaald Ondernemingsnummer: BE 0721.785.413
                Vestigingsadres: Pauwengraaf 66, 3630 Maasmechelen, België
                E-mailadres: info@kaniou.be Telefoon: +32 467 85 64 05
              </p>
              <p className="mb-6"></p>
              <p className="mb-6"></p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">2. Toepasselijkheid</h3>
              <p className="mb-4">
                Deze algemene voorwaarden zijn van toepassing op elk bezoek aan
                en gebruik van de website www.kaniou.be, alsook op alle
                offertes, overeenkomsten, aankopen, leveringen en diensten van
                KANIOU Zilvernaald, zowel online als offline. Door gebruik te
                maken van onze diensten of website verklaart u zich akkoord met
                deze voorwaarden.
              </p>
              <ul className="list-disc pl-6 mb-6"></ul>
              <p className="mb-6"></p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">3. Aanbod en informatie</h3>
              <p className="mb-6">
                Wij doen er alles aan om de informatie op deze website correct,
                volledig en actueel te houden. Toch kunnen onopzettelijke fouten
                of onvolledigheden voorkomen. Prijzen, producten en voorwaarden
                zijn steeds indicatief en kunnen zonder voorafgaande melding
                worden aangepast. Aan kennelijke fouten in prijs- of
                productweergave kunnen geen rechten worden ontleend.
              </p>
              <p className="mb-6"></p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">
                4. Bestellingen en overeenkomstens
              </h3>
              <p className="mb-6">
                Een bestelling is pas bindend nadat u een schriftelijke
                orderbevestiging of offertebevestiging van ons heeft ontvangen.
                De overeenkomst komt pas tot stand na onze expliciete
                aanvaarding. Bij maatwerk is herroepingsrecht uitgesloten
                conform artikel VI.53 van het Belgische Wetboek van Economisch
                Recht (WER) en Europese richtlijn 2011/83/EU.
              </p>
              <p className="mb-6"></p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">
                5. Herroepingsrecht (voor niet-maatwerk)
              </h3>
              <p className="mb-4"> </p>
              <ul className="list-disc pl-6 mb-6"></ul>
              <p className="mb-6">
                Indien u als consument een niet op maat gemaakt product bestelt
                via de website, heeft u recht op een herroepingstermijn van 14
                kalenderdagen vanaf de dag van levering. U dient ons binnen die
                termijn per e-mail op de hoogte te stellen van uw beslissing. U
                dient het product binnen 14 dagen na melding op eigen kosten
                terug te zenden in originele staat en verpakking. Het
                herroepingsrecht geldt niet voor: • Maatwerkproducten (bv.
                gordijnen, jaloezieën, shutters op maat) • Beschadigde of
                gebruikte producten
              </p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">6. Betaling</h3>
              <p className="mb-6">
                Betaling kan geschieden via overschrijving of betaalmethodes
                aangeboden op de website. Bestellingen worden pas verwerkt na
                volledige betaling, tenzij anders overeengekomen. Bij
                laattijdige betaling behouden wij ons het recht voor om de
                levering of installatie uit te stellen.
              </p>
              <p className="mb-6"></p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">7. Levering en plaatsingy</h3>
              <p className="mb-6">
                Levertermijnen zijn indicatief en niet bindend. Vertraging kan
                geen aanleiding geven tot schadevergoeding of annulering, tenzij
                schriftelijk overeengekomen. Indien installatie of plaatsing
                inbegrepen is, wordt een datum in overleg met de klant
                afgesproken. De klant dient de ruimte toegankelijk en klaar te
                maken voor plaatsing.
              </p>
              <p className="mb-4">We are not liable for:</p>
              <ul className="list-disc pl-6 mb-6"></ul>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">8. Aansprakelijkheid</h3>
              <p className="mb-6">
                <li>
                  {" "}
                  Wij zijn niet aansprakelijk voor: • Indirecte schade (zoals
                  verlies van gebruik, winst, of gegevens)
                </li>
                <li>
                  {" "}
                  Schade ontstaan door verkeerd gebruik of foutieve montage
                </li>
                <li> Gebrek aan onderhoud of wijziging door derden</li>
                Onze aansprakelijkheid is in elk geval beperkt tot het bedrag
                van de bestelling.
              </p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">9. Garantie</h3>
              <p className="mb-6">
                Wij leveren conform de wettelijke garantie van 2 jaar op
                fabricagefouten of gebreken bij normaal gebruik. Voor maatwerk
                geldt deze garantie ook, mits normaal onderhoud. Defecten
                ontstaan door onoordeelkundig gebruik, vocht, onjuiste
                installatie of overmacht vallen buiten garantie.
              </p>

              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">10. Intellectuele eigendom</h3>
              <p className="mb-6">
                Alle teksten, foto’s, logo’s, grafisch werk en codering op deze
                site zijn beschermd door intellectuele eigendomsrechten. Zonder
                schriftelijke toestemming is het verboden om materiaal van deze
                website geheel of gedeeltelijk te kopiëren, verspreiden of
                hergebruiken. Overtredingen worden juridisch vervolgd op basis
                van de Belgische Auteurswet en het EU-recht.
              </p>
              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">11. Klachten en geschillen</h3>
              <p className="mb-6">
                Klachten kunnen schriftelijk worden ingediend via
                info@kaniou.be. Wij trachten klachten binnen 7 werkdagen
                inhoudelijk te beantwoorden. In geval van geschil is uitsluitend
                het Belgisch recht van toepassing. Geschillen vallen onder de
                bevoegdheid van de rechtbanken van het arrondissement waarin
                onze maatschappelijke zetel is gevestigd. Als consument kan u
                ook terecht bij het Europees ODR-platform:
                https://ec.europa.eu/consumers/odr
              </p>
              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">
                12. Gegevensbescherming (GDPR)
              </h3>
              <p className="mb-6">
                Uw persoonsgegevens worden verwerkt conform de Algemene
                Verordening Gegevensbescherming (EU 2016/679). Raadpleeg ons
                [Privacybeleid] voor meer informatie over hoe wij uw gegevens
                verwerken, bewaren en beschermen.
              </p>
              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">13. Overmacht</h3>
              <p className="mb-6">
                In geval van overmacht (zoals brand, staking, pandemie, oorlog,
                elektriciteitsuitval, overstroming, vertraging bij leveranciers)
                behouden wij het recht om de levering op te schorten of de
                overeenkomst te beëindigen zonder enige schadevergoeding.
              </p>
              <hr className="my-6" />

              <h3 className="text-lg mt-8 mb-3">14. Slotbepalingen</h3>
              <p className="mb-6">
                Indien een bepaling uit deze algemene voorwaarden nietig of
                onafdwingbaar blijkt, blijven de overige bepalingen volledig van
                kracht. Wij behouden ons het recht voor deze voorwaarden op elk
                moment te wijzigen. De actuele versie is steeds raadpleegbaar op
                onze website.
              </p>
              <p className="mb-6">
                {" "}
                <a
                  href="/privacy-policy"
                  className="text-primary hover:text-secondary underline"
                ></a>
              </p>
              <p className="mb-6"></p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TermsOfServicePage;
