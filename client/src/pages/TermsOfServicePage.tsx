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
          📄 Gebruiksvoorwaarden | {t("app.title")}
        </title>
        <meta
          name="description"
          content="Gebruiksvoorwaarden voor het gebruik van Kaniou.be website en diensten."
        />
      </Helmet>

      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              📄 Gebruiksvoorwaarden – Kaniou.be
            </h1>
            <p className="text-text-medium">
              Laatst bijgewerkt op: 07-09-2025
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="font-body text-text-medium mb-8">
                Welkom op Kaniou.be, de officiële website van KANIOU Zilvernaald. Door deze website te bezoeken of te gebruiken, verklaar je je akkoord met de onderstaande gebruiksvoorwaarden. Lees deze voorwaarden zorgvuldig door voordat je gebruikmaakt van onze website.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                1. Toepasselijkheid
              </h2>
              <p className="font-body text-text-medium mb-4">
                Deze gebruiksvoorwaarden zijn van toepassing op iedere bezoeker of gebruiker van Kaniou.be, ongeacht of er een bestelling of aanvraag wordt geplaatst. Door onze website te gebruiken, stem je in met deze voorwaarden.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <p className="font-body text-text-medium font-semibold">
                  Indien je niet akkoord gaat, verzoeken wij je deze website niet te gebruiken.
                </p>
              </div>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                2. Gebruik van de website
              </h2>
              <p className="font-body text-text-medium mb-4">
                Je mag deze website uitsluitend gebruiken voor persoonlijke en niet-commerciële doeleinden.
              </p>
              <p className="font-body text-text-medium mb-4">
                Het is niet toegestaan om:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                <li>Inhoud te kopiëren, distribueren, wijzigen of hergebruiken zonder schriftelijke toestemming.</li>
                <li>De website te gebruiken op een manier die de werking ervan schaadt of verstoort.</li>
                <li>Geautomatiseerde systemen (zoals bots, scrapers of spiders) te gebruiken voor het verzamelen van data.</li>
                <li>Pogingen te doen om beveiligingsmaatregelen te omzeilen of ongeautoriseerde toegang te verkrijgen.</li>
              </ul>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                3. Intellectuele eigendom
              </h2>
              <p className="font-body text-text-medium mb-4">
                Alle inhoud op deze website – waaronder teksten, afbeeldingen, logo's, foto's, productomschrijvingen en ontwerpen – is eigendom van KANIOU Zilvernaald of haar licentiegevers en wordt beschermd door auteursrechten, merkenrechten en andere intellectuele eigendomsrechten.
              </p>
              <p className="font-body text-text-medium mb-6">
                Zonder voorafgaande schriftelijke toestemming mag geen enkel onderdeel van de website worden gebruikt voor andere doeleinden dan het bekijken van de website.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                4. Beschikbaarheid en wijzigingen
              </h2>
              <p className="font-body text-text-medium mb-4">
                We streven ernaar om de website 24/7 beschikbaar te houden, maar we kunnen geen garantie geven op ononderbroken toegang of foutloze werking.
              </p>
              <p className="font-body text-text-medium mb-4">
                KANIOU Zilvernaald behoudt zich het recht voor om:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                <li>De inhoud van de website op elk moment te wijzigen of te verwijderen zonder voorafgaande kennisgeving.</li>
                <li>Functionaliteiten tijdelijk of permanent stop te zetten.</li>
              </ul>
              <p className="font-body text-text-medium mb-6">
                Wij zijn niet aansprakelijk voor schade als gevolg van het niet beschikbaar zijn van (onderdelen van) de website.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                5. Externe links
              </h2>
              <p className="font-body text-text-medium mb-4">
                Deze website kan links bevatten naar websites van derden. Deze links worden enkel ter informatie aangeboden. KANIOU Zilvernaald heeft geen controle over de inhoud van deze externe websites en is niet verantwoordelijk of aansprakelijk voor hun inhoud of praktijken.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <p className="font-body text-text-medium font-semibold">
                  Het gebruik van externe websites is geheel op eigen risico.
                </p>
              </div>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                6. Aansprakelijkheid
              </h2>
              <p className="font-body text-text-medium mb-4">
                Wij doen ons best om correcte en actuele informatie aan te bieden, maar wij geven geen garanties met betrekking tot de volledigheid, nauwkeurigheid of actualiteit van de inhoud.
              </p>
              <p className="font-body text-text-medium mb-4">
                KANIOU Zilvernaald is niet aansprakelijk voor:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                <li>Directe of indirecte schade door gebruik of onmogelijkheid tot gebruik van de website.</li>
                <li>Fouten in prijzen, afbeeldingen of specificaties.</li>
                <li>Virussen, bugs of andere technische problemen die via deze website worden verkregen.</li>
              </ul>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                7. Beveiliging en privacy
              </h2>
              <p className="font-body text-text-medium mb-6">
                Jouw gegevens worden met zorg behandeld. Raadpleeg hiervoor ons <a href="/privacybeleid" className="text-accent hover:underline">Privacybeleid</a> voor meer informatie over hoe wij jouw persoonsgegevens verwerken, beveiligen en opslaan in overeenstemming met de Algemene Verordening Gegevensbescherming (GDPR).
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                8. Wijzigingen in deze voorwaarden
              </h2>
              <p className="font-body text-text-medium mb-4">
                KANIOU Zilvernaald behoudt zich het recht voor om deze gebruiksvoorwaarden op elk moment aan te passen. De meest recente versie is altijd beschikbaar op deze pagina.
              </p>
              <p className="font-body text-text-medium mb-6">
                Wij raden je aan deze voorwaarden regelmatig opnieuw te bekijken. Bij wezenlijke wijzigingen zullen wij dit duidelijk aankondigen op de website.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                9. Toepasselijk recht en geschillen
              </h2>
              <p className="font-body text-text-medium mb-6">
                Op deze gebruiksvoorwaarden is het Belgisch recht van toepassing. In geval van een geschil zijn enkel de rechtbanken van Limburg (België) bevoegd.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                10. Contact
              </h2>
              <p className="font-body text-text-medium mb-4">
                Voor vragen over deze gebruiksvoorwaarden kun je contact met ons opnemen via:
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-display text-lg text-primary font-semibold mb-3">
                  KANIOU Zilvernaald
                </h3>
                <p className="font-body text-text-medium mb-2">
                  E-mail: <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                </p>
                <p className="font-body text-text-medium mb-2">
                  Adres: Pauwengraaf 66 - 3630 Maasmechelen te België
                </p>
                <p className="font-body text-text-medium">
                  Website: <a href="https://kaniou.be" className="text-accent hover:underline">https://kaniou.be</a>
                </p>
              </div>

              <hr className="border-neutral-200 my-8" />

              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="font-body text-text-medium">
                  🔐 <strong>Gebruik deze website op een veilige, respectvolle en eerlijke manier. Bedankt voor je vertrouwen in KANIOU.</strong>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TermsOfServicePage;