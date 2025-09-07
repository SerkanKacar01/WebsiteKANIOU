import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TermsOfServicePage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>📄 Algemene Voorwaarden | {t("app.title")}</title>
        <meta
          name="description"
          content="Algemene Gebruiksvoorwaarden en Verkoopvoorwaarden van KANIOU Zilvernaald. Lees de volledige voorwaarden voor het gebruik van www.kaniou.be."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  🏠 Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                →
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Algemene Voorwaarden</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              📄 ALGEMENE VOORWAARDEN
            </h1>
            <p className="text-text-medium">
              Laatst geüpdatet op 7 september 2025
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              
              {/* Company Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <p className="font-body text-text-medium mb-2">
                  <strong>De website:</strong> www.kaniou.be (hierna het "Platform")
                </p>
                <p className="font-body text-text-medium mb-2">
                  <strong>Is een initiatief van:</strong> KANIOU zilvernaald
                </p>
                <p className="font-body text-text-medium mb-2">
                  <strong>Adres:</strong> Pauwengraaf 66, 3630 Maasmechelen, België
                </p>
                <p className="font-body text-text-medium mb-2">
                  <strong>Ondernemingsnummer (KBO-nummer):</strong> 0785.273.582
                </p>
                <p className="font-body text-text-medium mb-2">
                  <strong>E-mail:</strong> <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                </p>
                <p className="font-body text-text-medium">
                  <strong>Telefoon:</strong> +32 467 85 64 05
                </p>
                <p className="font-body text-text-medium mt-2 text-sm">
                  (hierna "wij" of "KANIOU zilvernaald" of de "Verkoper")
                </p>
              </div>

              <hr className="border-neutral-200 my-8" />

              {/* I. ALGEMENE GEBRUIKSVOORWAARDEN */}
              <h2 className="font-display text-3xl text-primary font-bold mb-6">
                I. ALGEMENE GEBRUIKSVOORWAARDEN
              </h2>

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                1. Toepassingsgebied
              </h3>
              <p className="font-body text-text-medium mb-4">
                Deze Algemene Gebruiksvoorwaarden zijn van toepassing op elk bezoek of gebruik van het Platform door een internetgebruiker (hierna de "Gebruiker" genoemd).
              </p>
              <p className="font-body text-text-medium mb-4">
                Door het Platform te bezoeken of te gebruiken, erkent de Gebruiker dat hij/zij deze Algemene Gebruiksvoorwaarden heeft gelezen en aanvaardt hij/zij uitdrukkelijk de daarin vermelde rechten en plichten.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <p className="font-body text-text-medium">
                  Bij wijze van uitzondering kan bij schriftelijke overeenkomst afstand worden gedaan van de bepalingen van de Algemene Gebruiksvoorwaarden. Dergelijke afwijkingen kunnen bestaan in de wijziging, aanvulling of schrapping van de bepalingen waarop zij betrekking hebben en laten de toepassing van de overige bepalingen van de Algemene Gebruiksvoorwaarden onverlet.
                </p>
              </div>
              <p className="font-body text-text-medium mb-6">
                Wij behouden ons het recht voor om onze Algemene Gebruiksvoorwaarden te allen tijde en zonder voorafgaande kennisgeving te wijzigen, maar wij verbinden ons ertoe ten opzichte van een Gebruiker de bepalingen toe te passen die van kracht waren op het moment dat de Gebruiker het Platform gebruikte.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                2. Platform
              </h3>
              
              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                a. Toegankelijkheid en navigatie
              </h4>
              <p className="font-body text-text-medium mb-4">
                Wij nemen alle redelijke en noodzakelijke maatregelen om de goede werking, veiligheid en toegankelijkheid van ons Platform te waarborgen. Wij kunnen echter geen absolute werkingsgarantie bieden en onze handelingen moeten daarom worden beschouwd als zijnde gedekt door een middelenverbintenis.
              </p>
              <p className="font-body text-text-medium mb-4">
                Elk gebruik van het Platform is altijd op eigen risico van de Gebruiker. Wij zijn dus niet aansprakelijk voor schade die het gevolg kan zijn van eventuele storingen, onderbrekingen, defecten of zelfs schadelijke elementen op het Platform.
              </p>
              <p className="font-body text-text-medium mb-6">
                Wij behouden ons het recht voor om de toegang tot het Platform te beperken of de werking ervan te allen tijde te onderbreken, zonder voorafgaande kennisgeving.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                b. Inhoud
              </h4>
              <p className="font-body text-text-medium mb-4">
                KANIOU zilvernaald bepaalt grotendeels de inhoud van het Platform en draagt grote zorg voor de informatie erop. Wij nemen alle mogelijke maatregelen om ons Platform zo volledig, accuraat en up-to-date mogelijk te houden, zelfs wanneer de informatie erover door derden wordt verstrekt. Wij behouden ons het recht voor om het Platform en de inhoud ervan op elk moment te wijzigen, aan te vullen of te verwijderen, zonder daartoe enige aansprakelijkheid te dragen.
              </p>
              <p className="font-body text-text-medium mb-4">
                KANIOU zilvernaald kan geen absolute garantie bieden met betrekking tot de kwaliteit van de informatie op het Platform. Als gevolg hiervan is het mogelijk dat deze informatie niet altijd volledig, accuraat, voldoende accuraat of actueel is. Bijgevolg kan KANIOU zilvernaald niet aansprakelijk worden gesteld voor enige schade, rechtstreeks of onrechtstreeks, die de Gebruiker zou kunnen lijden als gevolg van de op het Platform verstrekte informatie.
              </p>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="font-body text-text-medium">
                  <strong>Belangrijk:</strong> Als bepaalde inhoud van het Platform in strijd is met de wet of met de rechten van derden of in strijd is met de goede zeden, verzoeken wij elke Gebruiker ons zo snel mogelijk per e-mail op de hoogte te stellen, zodat we gepaste maatregelen kunnen nemen.
                </p>
              </div>
              <p className="font-body text-text-medium mb-6">
                Elke download vanaf het Platform is altijd op eigen risico van de Gebruiker. KANIOU zilvernaald is niet aansprakelijk voor schade, rechtstreeks of onrechtstreeks, die het gevolg is van dergelijke downloads, zoals het verlies van gegevens of schade aan het computersysteem van de Gebruiker, die de enige en exclusieve verantwoordelijkheid van de Gebruiker zijn.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                c. Inhoud gepubliceerd door de Gebruiker
              </h4>
              <p className="font-body text-text-medium mb-4">
                De Gebruiker verbindt zich ertoe alle geldende en toepasselijke wetgeving (met inbegrip van, doch niet beperkt tot, de wetgeving inzake privacy en auteursrechten) na te leven via elk van zijn publicaties op het Platform. De Gebruiker zal bijzondere aandacht besteden aan de belangen van derden, aanstootgevende inhoud en inhoud die strijdig kan zijn met de openbare orde of de goede zeden. De Gebruiker blijft verantwoordelijk voor elke inhoud die op het Platform wordt gepubliceerd.
              </p>
              <p className="font-body text-text-medium mb-4">
                Het Platform kan gematigdheid betrachten bij elke publicatie en weigeren om de inhoud online te publiceren zonder opgave van redenen. Op dezelfde manier kan de inhoud die door een Gebruiker wordt gepubliceerd, zonder enige reden of termijn worden gewijzigd of verwijderd.
              </p>
              <p className="font-body text-text-medium mb-6">
                Door het publiceren op het Platform verleent de Gebruiker gratis en op niet-exclusieve basis aan KANIOU zilvernaald het recht om de gepubliceerde inhoud te vertegenwoordigen, te reproduceren, te bewerken, aan te passen, te wijzigen, te verwijderen, te distribueren en te verspreiden, rechtstreeks of onrechtstreeks, op elk medium en over de hele wereld.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                3. Links naar andere websites
              </h3>
              <p className="font-body text-text-medium mb-4">
                Het Platform kan links of hyperlinks naar externe websites bevatten. Dergelijke links impliceren niet automatisch dat er een relatie bestaat tussen KANIOU zilvernaald en de externe website of zelfs dat er een impliciete overeenkomst bestaat met de inhoud van deze externe websites.
              </p>
              <p className="font-body text-text-medium mb-4">
                KANIOU zilvernaald heeft geen controle over dergelijke externe websites van derden.
              </p>
              <p className="font-body text-text-medium mb-6">
                Wij zijn daarom niet verantwoordelijk voor de veilige en correcte werking van de hyperlinks en hun eindbestemming. Zodra de gebruiker op de hyperlink klikt, verlaat hij/zij het Platform. Wij kunnen dus niet aansprakelijk worden gesteld voor verdere schade.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                4. Intellectuele eigendom
              </h3>
              <p className="font-body text-text-medium mb-4">
                De structuur van het Platform, evenals de inhoud, teksten, grafieken, beelden, foto's, geluiden, video's, databanken, computertoepassingen, enz. waaruit het Platform is samengesteld of die toegankelijk zijn via het Platform, zijn eigendom van de KANIOU zilvernaald of KANIOU zilvernaald heeft de nodige rechten bekomen, en worden als zodanig beschermd door de geldende en toepasselijke wetgeving inzake intellectuele eigendom.
              </p>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="font-body text-text-medium">
                  <strong>Verbod:</strong> Elke weergave, reproductie, aanpassing of gedeeltelijke of volledige exploitatie van de inhoud, merken en diensten aangeboden door het Platform, op welke wijze dan ook, zonder voorafgaande, uitdrukkelijke en schriftelijke toestemming van KANIOU zilvernaald, is strikt verboden, met uitzondering van elementen die uitdrukkelijk als 'royalty-vrij' op het Platform zijn aangeduid.
                </p>
              </div>
              <p className="font-body text-text-medium mb-4">
                De Gebruiker van het Platform krijgt een beperkt recht op toegang, gebruik en weergave van het Platform en de inhoud ervan. Dit recht wordt verleend op niet-exclusieve, niet-overdraagbare basis en mag alleen worden gebruikt voor persoonlijke en niet-commerciële doeleinden. Tenzij vooraf schriftelijk anders is overeengekomen, is het de Gebruiker niet toegestaan de beschermde elementen geheel of gedeeltelijk te wijzigen, te reproduceren, te vertalen, te distribueren, te verkopen of te communiceren aan het publiek.
              </p>
              <p className="font-body text-text-medium mb-6">
                Het is de Gebruiker verboden om op het Platform gegevens in te voeren die de inhoud of het uiterlijk van het Platform zouden wijzigen of kunnen wijzigen.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                5. Bescherming van persoonsgegevens
              </h3>
              <p className="font-body text-text-medium mb-4">
                Wij verzekeren de Gebruikers ervan dat wij het grootste belang hechten aan de bescherming van hun privacy en persoonsgegevens, en dat wij er altijd naar streven om op dit punt duidelijk en transparant te communiceren.
              </p>
              <p className="font-body text-text-medium mb-4">
                De persoonsgegevens die door de Gebruiker tijdens zijn bezoek of het gebruik van het Platform worden verstrekt, worden uitsluitend voor interne doeleinden verzameld en verwerkt door KANIOU zilvernaald.
              </p>
              <p className="font-body text-text-medium mb-4">
                KANIOU zilvernaald verbindt zich ertoe om te voldoen aan de toepasselijke wetgeving op dit gebied, in het bijzonder de Verordening (EU) 2016/679 van 27 april 2016 betreffende de bescherming van natuurlijke personen in verband met de verwerking van persoonsgegevens en betreffende het vrije verkeer van die gegevens (de 'Algemene Verordening Gegevensbescherming' of 'GDPR') en de Wet van 30 juli 2018 betreffende de bescherming van natuurlijke personen met betrekking tot de verwerking van persoonsgegevens.
              </p>
              <p className="font-body text-text-medium mb-6">
                De persoonsgegevens van de Gebruiker worden verwerkt in overeenstemming met het <a href="/privacy-policy" className="text-accent hover:underline">Privacybeleid</a> dat beschikbaar is op het Platform.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                6. Toepasselijk recht en bevoegde jurisdictie
              </h3>
              <p className="font-body text-text-medium mb-4">
                Deze Algemene Gebruiksvoorwaarden worden beheerst door het Belgische recht.
              </p>
              <p className="font-body text-text-medium mb-6">
                In geval van geschil en bij gebreke van een minnelijke oplossing tussen de partijen wordt het geschil aanhangig gemaakt bij de rechtbanken van het gerechtelijk arrondissement waar KANIOU zilvernaald haar maatschappelijke zetel heeft.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                7. Overige bepalingen
              </h3>
              <p className="font-body text-text-medium mb-4">
                KANIOU zilvernaald behoudt zich het recht voor om het Platform en de bijhorende diensten op elk moment, zonder voorafgaande kennisgeving en zonder aansprakelijkheid, te wijzigen, uit te breiden, te verwijderen, te beperken of te onderbreken.
              </p>
              <p className="font-body text-text-medium mb-4">
                In het geval van een inbreuk op de Algemene Gebruiksvoorwaarden door de Gebruiker, behoudt KANIOU zilvernaald zich het recht voor om passende sancties en compensatiemaatregelen te nemen. KANIOU zilvernaald behoudt zich het recht voor om de Gebruiker de toegang tot het Platform of onze diensten tijdelijk of permanent te weigeren. Deze maatregelen kunnen zonder opgaaf van redenen en zonder voorafgaande kennisgeving worden genomen. Zij kunnen de aansprakelijkheid van KANIOU zilvernaald niet met zich meebrengen, noch aanleiding geven tot enige vorm van schadevergoeding.
              </p>
              <p className="font-body text-text-medium mb-8">
                De onwettigheid of volledige of gedeeltelijke ongeldigheid van een bepaling van onze Algemene Gebruiksvoorwaarden zal geen invloed hebben op de geldigheid en toepassing van de andere bepalingen. In een dergelijk geval hebben we het recht om de bepaling te vervangen door een andere geldige bepaling die hetzelfde doel dient.
              </p>

              <hr className="border-primary my-8 border-2" />

              {/* II. ALGEMENE VERKOOPVOORWAARDEN */}
              <h2 className="font-display text-3xl text-primary font-bold mb-6">
                II. ALGEMENE VERKOOPVOORWAARDEN
              </h2>

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                1. Toepassingsgebied
              </h3>
              <p className="font-body text-text-medium mb-4">
                Deze Algemene Verkoopvoorwaarden definiëren de wederzijdse rechten en verplichtingen in geval van de aankoop van producten of diensten op het Platform door een Gebruiker (die, voor wat betreft de Algemene Verkoopvoorwaarden, hierna "Klant" wordt genoemd).
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <p className="font-body text-text-medium">
                  <strong>Belangrijk:</strong> De Algemene Verkoopvoorwaarden drukken alle verplichtingen van de partijen uit. De Klant wordt geacht deze zonder voorbehoud te aanvaarden, bij gebreke waarvan zijn bestelling niet zal worden gevalideerd.
                </p>
              </div>
              <p className="font-body text-text-medium mb-6">
                KANIOU zilvernaald behoudt zich het recht voor om de Algemene Verkoopvoorwaarden van tijd tot tijd te wijzigen. De wijzigingen zullen van toepassing zijn zodra ze online worden gezet voor elke aankoop na die datum.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                2. Online winkel
              </h3>
              <p className="font-body text-text-medium mb-4">
                Via het Platform stelt de Verkoper de Klant een online webshop ter beschikking die de aangeboden producten of diensten voorstelt. De voorstelling van de aangeboden producten of diensten (bv. via foto's) hebben geen contractuele waarde.
              </p>
              <p className="font-body text-text-medium mb-4">
                De producten of diensten worden met de grootst mogelijke nauwkeurigheid beschreven en gepresenteerd. In geval van fouten of nalatigheden in de presentatie kan de Verkoper hier echter niet aansprakelijk voor worden gesteld.
              </p>
              <p className="font-body text-text-medium mb-4">
                De producten en diensten worden aangeboden binnen de grenzen van hun beschikbaarheid.
              </p>
              <p className="font-body text-text-medium mb-6">
                De prijzen en belastingen zijn vermeld in de online winkel.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                3. Prijs
              </h3>
              <p className="font-body text-text-medium mb-4">
                De Verkoper behoudt zich het recht voor zijn prijzen te allen tijde te wijzigen door ze online te publiceren.
              </p>
              <p className="font-body text-text-medium mb-4">
                Enkel de aangegeven prijzen en de belastingen die van kracht zijn op het moment van de bestelling zijn van toepassing, onder voorbehoud van beschikbaarheid op die datum.
              </p>
              <p className="font-body text-text-medium mb-4">
                De prijzen zijn aangegeven in euro en houden geen rekening met eventuele leveringskosten, die bovendien worden aangegeven en gefactureerd vóór de validatie van de bestelling door de Klant.
              </p>
              <p className="font-body text-text-medium mb-6">
                Het totale bedrag van de bestelling (alle belastingen inbegrepen) en, indien van toepassing, de leveringskosten worden vermeld vóór de definitieve validatie van de bestelling.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                4. Online bestellen
              </h3>
              <p className="font-body text-text-medium mb-4">
                De Klant heeft de mogelijkheid om online een bestelling te vervolledigen met behulp van een elektronisch formulier. Door het invullen van het elektronische formulier aanvaardt de Klant de prijs en beschrijving van de producten of diensten.
              </p>
              <p className="font-body text-text-medium mb-4">
                Om zijn bestelling te valideren, moet de Klant deze Algemene Verkoopvoorwaarden aanvaarden door op de aangegeven plaats te klikken.
              </p>
              <p className="font-body text-text-medium mb-4">
                De Klant moet een geldig e-mailadres, factuurgegevens en, indien van toepassing, een geldig afleveradres opgeven. Elke communicatie met de Verkoper kan plaatsvinden via dit e-mailadres.
              </p>
              <p className="font-body text-text-medium mb-4">
                Bovendien moet de Klant de leveringswijze kiezen en de betalingswijze valideren.
              </p>
              <p className="font-body text-text-medium mb-6">
                De Verkoper behoudt zich het recht voor om de bestelling van de Klant te blokkeren in geval van niet-betaling, onjuist adres of enig ander probleem in hoofde van de Klant totdat het probleem is opgelost.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                5. Bevestiging en betaling van de bestelling
              </h3>
              <p className="font-body text-text-medium mb-4">
                De Verkoper blijft eigenaar van de bestelde artikelen totdat de volledige betaling van de bestelling is ontvangen.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                a. Betaling
              </h4>
              <p className="font-body text-text-medium mb-4">
                De Klant verricht de betaling op het moment van de definitieve validatie van de bestelling met behulp van de gekozen betaalmethode. Deze validatie geldt in plaats van een handtekening.
              </p>
              <p className="font-body text-text-medium mb-4">
                De Klant garandeert de Verkoper dat hij over de nodige toelatingen beschikt om deze betalingswijze te gebruiken en erkent dat de daartoe verstrekte informatie het bewijs vormt van zijn instemming met de verkoop en de betaling van de in het kader van de bestelling verschuldigde bedragen.
              </p>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <p className="font-body text-text-medium">
                  <strong>Fraudecontrole:</strong> De Verkoper heeft een procedure ingesteld om bestellingen en betaalmiddelen te controleren om hem redelijkerwijs te garanderen tegen elk frauduleus gebruik van een betaalmiddel, onder meer door identificatiegegevens op te vragen bij de Klant.
                </p>
              </div>
              <p className="font-body text-text-medium mb-6">
                In geval van weigering van toestemming tot betaling per kredietkaart door geaccrediteerde organisaties of in geval van niet-betaling, behoudt de Verkoper zich het recht voor om de bestelling en de levering ervan op te schorten of te annuleren. De Verkoper behoudt zich tevens het recht voor om een bestelling te weigeren van een Klant die een eerdere bestelling niet of slechts gedeeltelijk heeft afgehandeld of bij wie een betalingsgeschil aanhangig is.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                b. Bevestiging
              </h4>
              <p className="font-body text-text-medium mb-4">
                Na ontvangst van de validatie van de aankoop met betaling, zal de Verkoper de aankoop aan de Klant sturen, evenals een factuur, tenzij deze laatste bij de bestelling wordt geleverd.
              </p>
              <p className="font-body text-text-medium mb-4">
                De Klant kan vragen dat de factuur naar een ander adres dan het leveringsadres wordt verzonden door vóór de levering een verzoek daartoe te richten aan de klantendienst (zie onderstaande contactgegevens).
              </p>
              <p className="font-body text-text-medium mb-6">
                In geval van onbeschikbaarheid van een dienst of product, zal de Verkoper de Klant zo snel mogelijk per e-mail op de hoogte houden om de bestelling van dit product te vervangen of te annuleren en eventueel de betreffende prijs terug te betalen, waarbij de rest van de bestelling vast en definitief blijft.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                6. Bewijs
              </h3>
              <p className="font-body text-text-medium mb-4">
                De communicatie, bestellingen en betalingen tussen de Klant en de Verkoper kunnen worden bewezen door middel van geautomatiseerde records, die in de computersystemen van de Verkoper onder redelijke veiligheidsomstandigheden worden bewaard.
              </p>
              <p className="font-body text-text-medium mb-6">
                De bestellingen en facturen worden gearchiveerd op een betrouwbare en duurzame drager die in het bijzonder als bewijsmiddel wordt beschouwd.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                7. Levering
              </h3>
              <p className="font-body text-text-medium mb-4">
                De levering gebeurt pas na bevestiging van betaling door de bank van de Verkoper.
              </p>
              <p className="font-body text-text-medium mb-4">
                De producten worden geleverd op het adres dat door de Klant is aangegeven op het online bestelformulier. Bijkomende kosten als gevolg van onvolledige of onjuiste informatie van de Klant zullen aan de Klant in rekening worden gebracht.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="font-display text-lg text-primary font-semibold mb-3">
                  📦 Leveringstermijnen
                </h4>
                <ul className="list-disc pl-6 font-body text-text-medium">
                  <li><strong>Standaard levering:</strong> 21-28 werkdagen</li>
                  <li><strong>Versnelde levering:</strong> 7-14 werkdagen</li>
                  <li><strong>Spoedlevering (optioneel):</strong> binnen 48 uur indien op voorraad</li>
                  <li><strong>Afhaling in showroom (indien van toepassing):</strong> binnen 5 werkdagen na bevestiging</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <p className="font-body text-text-medium">
                  <strong>Let op:</strong> De leveringstermijnen zijn indicatief. Bij laattijdige levering kan geen schadevergoeding worden geëist van de Verkoper of de vervoerder. Indien de leveringstermijnen meer dan dertig dagen na de datum van de bestelling bedragen, kan de verkoopovereenkomst echter worden opgezegd en kan de Klant worden terugbetaald.
                </p>
              </div>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                a. Controle van de bestelling
              </h4>
              <p className="font-body text-text-medium mb-4">
                Bij ontvangst van de producten controleert de Klant of de ontvanger de goede staat van het geleverde product of de conformiteit van de geleverde dienst.
              </p>
              <p className="font-body text-text-medium mb-4">
                In het geval dat een of meer van de bestelde producten ontbreken of beschadigd zijn, moet de Klant of de ontvanger de nodige voorbehouden aan de vervoerder formuleren op het moment van levering en de Verkoper onmiddellijk op de hoogte brengen.
              </p>
              <p className="font-body text-text-medium mb-6">
                Elke reservering die niet volgens de hierboven gedefinieerde regels en binnen de gestelde termijnen wordt gemaakt, kan niet in aanmerking worden genomen en ontslaat de Verkoper van elke aansprakelijkheid jegens de Klant.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                b. Fout in de levering
              </h4>
              <p className="font-body text-text-medium mb-4">
                In geval van een leveringsfout of niet-conformiteit van de producten met de informatie op de bestelbon, zal de Klant de Verkoper hiervan binnen de drie werkdagen na de leveringsdatum op de hoogte brengen.
              </p>
              <p className="font-body text-text-medium mb-6">
                Elke klacht die niet binnen de termijn wordt ingediend, kan niet in aanmerking worden genomen en ontslaat de Verkoper van elke aansprakelijkheid jegens de Klant.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                c. Retourzendingen en omruilingen
              </h4>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <p className="font-body text-text-medium mb-4">
                  <strong>BELANGRIJK - Op maat gemaakt:</strong> Retourneren is niet mogelijk, aangezien alle producten van KANIOU Zilvernaald volledig op maat worden gemaakt volgens de specifieke wensen van de klant (zoals afmetingen, kleur, stof en uitvoering). Het wettelijk herroepingsrecht van 14 dagen is daarom <strong>niet van toepassing</strong>, conform artikel VI.53 van het Belgische Wetboek van Economisch Recht.
                </p>
                <p className="font-body text-text-medium">
                  <strong>Uitzonderingen kunnen enkel worden gemaakt bij:</strong>
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium">
                  <li>aantoonbare fabricagefouten, of</li>
                  <li>beschadiging tijdens levering</li>
                </ul>
                <p className="font-body text-text-medium mt-4">
                  In zulke gevallen dient de klant ons <strong>binnen 48 uur na levering</strong> per e-mail te contacteren.
                </p>
              </div>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                8. Garanties
              </h3>
              <p className="font-body text-text-medium mb-6">
                De Verkoper garandeert de conformiteit van de producten of diensten met het contract in overeenstemming met de op het moment van het sluiten van het contract geldende wetgeving.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                a. Garantie van overeenstemming
              </h4>
              <p className="font-body text-text-medium mb-4">
                Als de Klant een consument is, heeft hij twee jaar vanaf de levering van het product om de wettelijke garantie van overeenstemming te implementeren.
              </p>
              <p className="font-body text-text-medium mb-4">
                Niettegenstaande, als het gekochte product een tweedehands goed was, is de garantieperiode één jaar.
              </p>
              <p className="font-body text-text-medium mb-6">
                Het gebrek aan overeenstemming moet zo spoedig mogelijk en in ieder geval uiterlijk twee maanden na de ontdekking van de verkoop worden gemeld aan de Verkoper.
              </p>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                b. Commerciële garantie
              </h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h5 className="font-display text-lg text-primary font-semibold mb-3">
                  🛡️ 5 Jaar Garantie op Mechaniek
                </h5>
                <p className="font-body text-text-medium mb-4">
                  De mechaniek van onze rolgordijnen, jaloezieën en andere raamdecoraties wordt gegarandeerd voor een periode van <strong>5 jaar</strong> tegen fabricagefouten, constructieproblemen en mechanische defecten bij normaal huishoudelijk gebruik.
                </p>
                <p className="font-body text-text-medium mb-4">
                  <strong>Gebieden:</strong> België, Nederland, Duitsland
                </p>
                <p className="font-body text-text-medium mb-2">
                  <strong>Niet gedekt:</strong>
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Schade door verkeerd gebruik</li>
                  <li>Foutieve montage door de klant</li>
                  <li>Contact met water</li>
                  <li>Andere invloeden van buitenaf</li>
                </ul>
                <p className="font-body text-text-medium">
                  <strong>Let op:</strong> Vervanging van onderdelen valt onder garantie, maar werkuren, transport of installatiekosten worden niet gedekt.
                </p>
              </div>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                9. Herroepingsrecht
              </h3>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <p className="font-body text-text-medium">
                  <strong>Let op:</strong> Dit artikel is enkel van toepassing voor zover de Klant een consument is. Is dat het geval, dan kan de Klant zijn wettelijk herroepingsrecht uitoefenen en de overeenkomst ontbinden binnen 14 werkdagen na de levering (de inbezitneming) van de goederen of binnen 14 dagen na het sluiten van de dienstenovereenkomst.
                </p>
              </div>

              <h4 className="font-display text-xl text-primary font-semibold mb-3">
                b. Uitzonderingen op het herroepingsrecht
              </h4>
              <p className="font-body text-text-medium mb-4">
                Elke herroeping die niet overeenkomstig de regels en termijnen van dit artikel en de toepasselijke wetgeving wordt uitgevoerd, kan niet in aanmerking worden genomen en ontslaat de Verkoper van elke aansprakelijkheid jegens de Klant.
              </p>
              <p className="font-body text-text-medium mb-6">
                Indien de bestelling geheel of gedeeltelijk betrekking heeft op de levering van diensten, dan stemt de Klant er uitdrukkelijk mee in dat de Verkoper de diensten meteen kan uitvoeren. De Klant erkent hierbij afstand te doen van zijn herroepingsrecht van zodra de Verkoper de overeenkomst volledig heeft uitgevoerd.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                10. Gegevensbescherming
              </h3>
              <p className="font-body text-text-medium mb-4">
                De Verkoper zal in zijn computersystemen en onder redelijke veiligheidsvoorwaarden het bewijs van de transactie, met inbegrip van de aankooporder en de factuur, bewaren.
              </p>
              <p className="font-body text-text-medium mb-6">
                De Verkoper garandeert zijn Klant de bescherming van zijn persoonlijke gegevens in overeenstemming met het <a href="/privacy-policy" className="text-accent hover:underline">Privacybeleid</a> dat beschikbaar is op het Platform.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                11. Overmacht
              </h3>
              <p className="font-body text-text-medium mb-4">
                Indien de Verkoper geheel of gedeeltelijk verhinderd is de bestelling uit te voeren door een onvoorziene omstandigheid buiten zijn wil, is er sprake van overmacht.
              </p>
              <p className="font-body text-text-medium mb-4">
                In geval van overmacht heeft de Verkoper het recht om de uitvoering van de bestelling geheel of gedeeltelijk op te schorten voor de duur van de overmacht. De Verkoper zal de Klant hiervan onmiddellijk op de hoogte brengen.
              </p>
              <p className="font-body text-text-medium mb-6">
                Indien de overmacht langer dan 90 dagen zonder onderbreking voortduurt, heeft elk van de partijen het recht om het contract eenzijdig op te zeggen, per aangetekende brief aan de andere partij. De reeds door de Verkoper verrichte diensten zullen niettemin naar evenredigheid aan de Klant worden gefactureerd.
              </p>

              <hr className="border-neutral-200 my-6" />

              <h3 className="font-display text-2xl text-primary font-semibold mb-4">
                12. Onafhankelijkheid van de bepalingen
              </h3>
              <p className="font-body text-text-medium mb-6">
                Indien een of meer bepalingen van deze Algemene Verkoopvoorwaarden onwettig of nietig worden verklaard, blijven de overige bepalingen volledig van kracht. De onwettigheid of de gehele of gedeeltelijke ongeldigheid van een bepaling van deze Algemene Verkoopvoorwaarden zal geen invloed hebben op de geldigheid en toepassing van de andere bepalingen.
              </p>

              <hr className="border-neutral-200 my-8" />

              {/* Contact Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                <h3 className="font-display text-2xl text-primary font-bold mb-4">
                  📞 Contact & Vragen
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Voor vragen over deze Algemene Voorwaarden kunt u contact met ons opnemen:
                </p>
                <div className="space-y-2">
                  <p className="font-body text-text-medium">
                    <strong>KANIOU Zilvernaald</strong>
                  </p>
                  <p className="font-body text-text-medium">
                    Pauwengraaf 66, 3630 Maasmechelen, België
                  </p>
                  <p className="font-body text-text-medium">
                    KBO-nummer: 0785.273.582
                  </p>
                  <p className="font-body text-text-medium">
                    <strong>E-mail:</strong> <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                  </p>
                  <p className="font-body text-text-medium">
                    <strong>Telefoon:</strong> +32 467 85 64 05
                  </p>
                </div>
              </div>

              <hr className="border-neutral-200 my-8" />

              <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="font-body text-text-medium text-sm">
                  <strong>📜 Laatste update:</strong> 7 september 2025<br />
                  Deze voorwaarden zijn opgesteld in overeenstemming met de Belgische wetgeving en de GDPR/AVG verordening.
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