import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/layout/LanguageSelector';

const PrivacyPolicyPage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>📄 Privacybeleid | {t('app.title')}</title>
        <meta
          name="description"
          content="Privacybeleid van KANIOU Zilvernaald. Lees hoe wij uw persoonsgegevens beschermen volgens de AVG/GDPR."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              📄 Privacybeleid – KANIOU Zilvernaald
            </h1>
            <p className="text-text-medium">
              Bij KANIOU Zilvernaald hechten wij veel waarde aan de bescherming van uw persoonsgegevens
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            {language === 'nl' ? (
              <>
                <p className="font-body text-text-medium mb-8">
                  Bij KANIOU Zilvernaald hechten wij veel waarde aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij dat doen, hoe lang wij deze bewaren, en welke rechten u heeft onder de Algemene Verordening Gegevensbescherming (AVG/GDPR).
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  1. Wie zijn wij?
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <p className="font-body text-text-medium mb-2">
                    <strong>KANIOU Zilvernaald</strong>
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    🌐 Website: https://kaniou.be
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    ✉️ E-mail: info@kaniou.be
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    📍 Vestigingsadres: Pauwengraaf 66, 3630 Maasmechelen - België
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    🧾 Ondernemingsnummer: 0785.273.582
                  </p>
                  <p className="font-body text-text-medium">
                    🛡️ Verantwoordelijke voor gegevensverwerking: KANIOU
                  </p>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  2. Welke persoonsgegevens verzamelen wij?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij verwerken enkel de gegevens die noodzakelijk zijn voor het verlenen van onze diensten.
                </p>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  a. Ingevulde formulieren (contact, offerte, bestelling):
                </h3>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Voor- en achternaam</li>
                  <li>E-mailadres</li>
                  <li>Telefoonnummer</li>
                  <li>Adresgegevens (indien opgegeven)</li>
                  <li>Details van het project of bestelling</li>
                </ul>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  b. Technische gegevens (via cookies en logbestanden):
                </h3>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>IP-adres</li>
                  <li>Browser en apparaat type</li>
                  <li>Bezochte pagina's</li>
                  <li>Taalvoorkeur</li>
                  <li>Sessieduur en klikgedrag</li>
                  <li>Cookie-ID's (via Cookiebot, Replit, Cloudflare)</li>
                </ul>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  c. Bestellingen en klantrelaties:
                </h3>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>Bestelgegevens</li>
                  <li>Bezorgadres</li>
                  <li>Betalingsstatus (geen creditcardgegevens)</li>
                  <li>Correspondentiegeschiedenis</li>
                </ul>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  3. Waarvoor gebruiken wij deze gegevens?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij gebruiken uw gegevens uitsluitend voor:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>Het verwerken van uw offerteaanvraag of bestelling</li>
                  <li>Communicatie en klantenservice</li>
                  <li>Het leveren van onze producten en diensten</li>
                  <li>Interne administratie en boekhouding</li>
                  <li>Het verbeteren van de website en gebruikerservaring</li>
                  <li>Naleving van wettelijke verplichtingen</li>
                </ul>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  4. Cookies en tracking
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij gebruiken Cookiebot by Usercentrics voor het beheer van uw cookietoestemming, in overeenstemming met de GDPR.
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="font-display text-lg text-primary font-semibold mb-3">
                    🍪 Cookiecategorieën:
                  </h3>
                  <p className="font-body text-text-medium mb-2">
                    <strong>• Noodzakelijk:</strong> voor basisfunctionaliteit van de website
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    <strong>• Voorkeuren:</strong> zoals taalkeuze of pop-ups
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    <strong>• Statistieken (optioneel):</strong> geanonimiseerde bezoekanalyse via o.a. Google Analytics
                  </p>
                  <p className="font-body text-text-medium">
                    <strong>• Marketing (optioneel):</strong> enkel indien expliciet goedgekeurd
                  </p>
                </div>
                
                <p className="font-body text-text-medium mb-4">
                  ➡️ U kunt uw toestemming op elk moment wijzigen via de cookie-instellingen.
                </p>
                
                <p className="font-body text-text-medium mb-4">
                  Voor gedetailleerde informatie, raadpleeg onze Cookieverklaring.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  5. Met wie delen wij uw gegevens?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Uw gegevens worden nooit verkocht. Ze worden uitsluitend gedeeld met onderstaande verwerkers indien noodzakelijk:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Onze websitehostingpartner(s)</li>
                  <li>Replit (back- en frontendontwikkeling)</li>
                  <li>Cloudflare (beveiliging en CDN)</li>
                  <li>SendGrid / SMTP-server (mailverzending)</li>
                  <li>Boekhoudsoftware (voor facturatie)</li>
                  <li>Bezorgdiensten indien van toepassing</li>
                </ul>
                <p className="font-body text-text-medium mb-6">
                  📃 Met elk van deze partijen is een verwerkersovereenkomst afgesloten conform de AVG.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  6. Hoe lang bewaren wij uw gegevens?
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-display text-base text-primary font-semibold mb-2">
                        Gegevenstype
                      </h3>
                      <p className="font-body text-text-medium mb-2">Contactaanvragen</p>
                      <p className="font-body text-text-medium mb-2">Bestel- en klantgegevens</p>
                      <p className="font-body text-text-medium mb-2">Cookiegegevens</p>
                      <p className="font-body text-text-medium">Nieuwsbriefinschrijvingen</p>
                    </div>
                    <div>
                      <h3 className="font-display text-base text-primary font-semibold mb-2">
                        Bewaartermijn
                      </h3>
                      <p className="font-body text-text-medium mb-2">Max. 12 maanden</p>
                      <p className="font-body text-text-medium mb-2">Tot 7 jaar (wettelijke verplichting)</p>
                      <p className="font-body text-text-medium mb-2">Volgens cookie-vervaldatum</p>
                      <p className="font-body text-text-medium">Tot uitschrijving</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  7. Uw rechten
                </h2>
                <p className="font-body text-text-medium mb-4">
                  U heeft als betrokkene de volgende rechten:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Recht op inzage</li>
                  <li>Recht op correctie</li>
                  <li>Recht op verwijdering</li>
                  <li>Recht op beperking van verwerking</li>
                  <li>Recht op bezwaar</li>
                  <li>Recht op dataportabiliteit</li>
                </ul>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <p className="font-body text-text-medium">
                    📧 Uitoefenen? Stuur een e-mail naar <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a> met onderwerp "Privacyverzoek".
                  </p>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  8. Beveiliging van uw gegevens
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij nemen passende technische en organisatorische maatregelen:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>SSL-encryptie (HTTPS)</li>
                  <li>Firewall via Cloudflare</li>
                  <li>Regelmatige updates en patches</li>
                  <li>Interne toegangsbeperkingen</li>
                  <li>Gegevensversleuteling indien nodig</li>
                </ul>
                
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <h3 className="font-display text-lg text-primary font-semibold mb-3">
                    🛡️ Bestelvolgsysteem
                  </h3>
                  <p className="font-body text-text-medium">
                    Wij gebruiken een veilig en cryptografisch gegenereerd bestelnummer. Gegevens worden afgeschermd, brute-force aanvallen worden geblokkeerd en sessies zijn beveiligd tegen onderschepping.
                  </p>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  9. Minderjarigen
                </h2>
                <p className="font-body text-text-medium mb-6">
                  Onze diensten zijn niet gericht op personen jonger dan 16 jaar. Indien wij onbewust gegevens van een minderjarige verwerken, verwijderen wij deze onmiddellijk.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  10. Klachten of vragen?
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                  <p className="font-body text-text-medium mb-2">
                    📧 <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                  </p>
                  <p className="font-body text-text-medium">
                    📍 (adres optioneel invullen)
                  </p>
                </div>
                
                <p className="font-body text-text-medium mb-6">
                  U heeft tevens het recht een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA):
                  <br />
                  🔗 <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.gegevensbeschermingsautoriteit.be</a>
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  11. Wijzigingen
                </h2>
                <p className="font-body text-text-medium mb-6">
                  Wij behouden ons het recht voor om dit beleid aan te passen. Controleer deze pagina regelmatig. Bij belangrijke wijzigingen informeren wij u via pop-up of e-mail.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="font-body text-text-medium mb-2">
                    🔒 <strong>Uw privacy is onze prioriteit.</strong>
                  </p>
                  <p className="font-body text-text-medium">
                    Bij KANIOU Zilvernaald staan transparantie, vertrouwen en veiligheid centraal.
                  </p>
                </div>
              </>
            ) : (
              // English version by default (placeholder - to be replaced with actual English content)
              <>
                <h2 className="font-display text-xl text-primary font-semibold mb-4">
                  Privacy Policy – Kaniou.be
                </h2>
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  1. Who are we?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  This website is managed by:<br />
                  KANIOU BVBA<br />
                  Business number: 0721.785.413<br />
                  Address: Pauwengraaf 66, 3630 Maasmechelen, Belgium<br />
                  Email: info@kaniou.be
                </p>
                <p className="font-body text-text-medium mb-6">
                  KANIOU is responsible for processing your personal data through this website.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  2. What personal data do we collect?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  We only collect the data that you provide us yourself or that is automatically generated during your visit, such as:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>First and last name</li>
                  <li>Address</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>IP address</li>
                  <li>Browser data</li>
                  <li>Data about your use of the website</li>
                </ul>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  3. Why do we collect your data?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  We use your data:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>To process your quote request or order</li>
                  <li>To contact you if necessary</li>
                  <li>For customer management and accounting</li>
                  <li>To improve our website and service</li>
                  <li>To comply with legal obligations</li>
                </ul>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  4. With whom do we share your data?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  We only share your data:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>With our hosting partner if necessary for the operation of the website</li>
                  <li>With service providers (such as accountants) when legally required</li>
                  <li>With official authorities if legally required</li>
                </ul>
                <p className="font-body text-text-medium mb-6">
                  We never sell your data to third parties.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  5. How long do we store your data?
                </h3>
                <p className="font-body text-text-medium mb-6">
                  We do not store your data longer than necessary for the purposes for which they were collected, or as long as legally required.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  6. What are your rights?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Access your data</li>
                  <li>Have incorrect data corrected</li>
                  <li>Have your data deleted</li>
                  <li>Object to the use of your data</li>
                  <li>File a complaint with the Data Protection Authority:<br />
                  <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.dataprotectionauthority.be</a></li>
                </ul>
                <p className="font-body text-text-medium mb-6">
                  To exercise these rights, you can contact us via: info@kaniou.be
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  7. Security
                </h3>
                <p className="font-body text-text-medium mb-6">
                  We take appropriate measures to protect your data against unauthorized access, loss, or misuse.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  8. Cookies
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Our website uses cookies to improve your experience. We ask for your permission during your first visit.
                </p>
                
                <h4 className="font-display text-base text-primary font-semibold mt-6 mb-3">
                  Cookie Declaration
                </h4>
                <p className="font-body text-text-medium mb-4">
                  Below you will find a complete overview of all cookies used on our website:
                </p>
                
                {/* Cookiebot Cookie Declaration Script */}
                <div className="my-6" dangerouslySetInnerHTML={{
                  __html: '<script id="CookieDeclaration" src="https://consent.cookiebot.com/277bd293-9336-4f15-ba87-4c760a56129b/cd.js" type="text/javascript" async></script>'
                }} />
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-body text-text-medium mb-2">
                    <strong>Adjust Cookie Preferences:</strong>
                  </p>
                  <p className="font-body text-text-medium">
                    You can adjust your cookie preferences at any time by clicking on the Cookiebot icon that appears in the bottom-left or bottom-right corner of the page.
                  </p>
                </div>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  9. Changes
                </h3>
                <p className="font-body text-text-medium mb-6">
                  We reserve the right to modify this privacy policy. The most recent version is always available on our website.
                </p>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;