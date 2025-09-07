import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import LanguageSelector from "@/components/layout/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const DisclaimerPage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>📢 Disclaimer | {t("app.title")}</title>
        <meta
          name="description"
          content="Disclaimer en uitsluiting van aansprakelijkheid voor KANIOU Zilvernaald website en diensten."
        />
      </Helmet>

      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              📢 Disclaimer – KANIOU Zilvernaald
            </h1>
            <p className="text-text-medium">
              Laatst bijgewerkt op: 7 september 2025
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="font-body text-text-medium mb-8">
                Door de website https://kaniou.be te bezoeken en te gebruiken, stemt u in met onderstaande bepalingen. Indien u niet akkoord gaat met deze disclaimer, wordt u verzocht de website niet verder te gebruiken.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                1. Algemeen
              </h2>
              <p className="font-body text-text-medium mb-4">
                Deze website is eigendom van en wordt beheerd door KANIOU Zilvernaald.
                Alle informatie, afbeeldingen, productbeschrijvingen en documenten die u op deze website vindt, zijn uitsluitend bedoeld voor algemene informatiedoeleinden. Hoewel wij uiterste zorg besteden aan de inhoud van deze website, kunnen wij niet garanderen dat de verstrekte informatie steeds actueel, volledig of correct is.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                2. Uitsluiting van aansprakelijkheid
              </h2>
              <p className="font-body text-text-medium mb-4">
                KANIOU Zilvernaald is op geen enkele wijze aansprakelijk voor:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                <li>Directe of indirecte schade die voortvloeit uit het gebruik van de website of de onmogelijkheid om de website te gebruiken;</li>
                <li>Fouten of onvolledigheden in de informatie op de website;</li>
                <li>Technische storingen, onderbrekingen of vertragingen in het functioneren van de website;</li>
                <li>Beslissingen of acties genomen op basis van informatie op deze website;</li>
                <li>Schade aan software of hardware van gebruikers als gevolg van gebruik van deze website, waaronder virussen of malware.</li>
              </ul>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <p className="font-body text-text-medium font-semibold">
                  Gebruik van deze website is volledig op eigen risico.
                </p>
              </div>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                3. Productinformatie en prijzen
              </h2>
              <p className="font-body text-text-medium mb-4">
                Hoewel wij de grootst mogelijke zorg besteden aan correcte productinformatie en prijsweergave:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                <li>Kunnen prijzen, beschikbaarheid en producteigenschappen zonder voorafgaande kennisgeving worden gewijzigd.</li>
                <li>Druk- en typfouten zijn voorbehouden.</li>
                <li>Geen rechten kunnen worden ontleend aan foutieve informatie.</li>
              </ul>
              <p className="font-body text-text-medium mb-6">
                Voor de meest accurate en up-to-date informatie raden wij u aan direct contact met ons op te nemen via e-mail of telefoon.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                4. Intellectueel eigendom
              </h2>
              <p className="font-body text-text-medium mb-4">
                Alle teksten, foto's, logo's, huisstijl, grafische elementen, en andere content op deze website zijn eigendom van KANIOU Zilvernaald, tenzij anders vermeld. Deze inhoud is beschermd door het auteursrecht en andere intellectuele eigendomsrechten.
              </p>
              <p className="font-body text-text-medium mb-4">
                Zonder voorafgaande schriftelijke toestemming is het niet toegestaan om enige inhoud van deze website:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                <li>Te kopiëren, verspreiden of op enige wijze openbaar te maken</li>
                <li>Te bewerken of gebruiken voor commerciële doeleinden</li>
                <li>Te integreren in andere websites, documenten of marketingmateriaal</li>
              </ul>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                5. Externe links
              </h2>
              <p className="font-body text-text-medium mb-6">
                Op deze website kunnen links voorkomen naar externe websites van derden. KANIOU Zilvernaald is niet verantwoordelijk voor de inhoud, beschikbaarheid of juistheid van deze websites, noch voor schade die ontstaat door het bezoeken of gebruiken van dergelijke externe bronnen.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                6. Beschikbaarheid van de website
              </h2>
              <p className="font-body text-text-medium mb-6">
                Wij streven ernaar de website altijd online te houden, maar garanderen geen continue beschikbaarheid. De website kan tijdelijk of permanent onbeschikbaar zijn wegens onderhoud, updates of technische storingen.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                7. Toepasselijk recht
              </h2>
              <p className="font-body text-text-medium mb-6">
                Op deze disclaimer is het Belgisch recht van toepassing.
                In geval van geschillen zijn uitsluitend de rechtbanken van het arrondissement waarin KANIOU Zilvernaald gevestigd is bevoegd.
              </p>

              <hr className="border-neutral-200 my-8" />

              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                8. Contact
              </h2>
              <p className="font-body text-text-medium mb-4">
                Voor vragen of opmerkingen over deze disclaimer kunt u contact opnemen via:
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="font-body text-text-medium mb-2">
                  📧 <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                </p>
                <p className="font-body text-text-medium">
                  📍 Pauwengraaf 66, 3630 Maasmechelen, België
                </p>
              </div>

              <hr className="border-neutral-200 my-8" />

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-body text-text-medium">
                  📌 <strong>Opmerking:</strong> Door gebruik te maken van deze website verklaart u deze disclaimer gelezen en begrepen te hebben, en ermee akkoord te gaan.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DisclaimerPage;
