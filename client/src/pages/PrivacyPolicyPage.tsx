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
              Laatst bijgewerkt op: 7 september 2025
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            {language === 'nl' ? (
              <>
                <p className="font-body text-text-medium mb-8">
                  Bij KANIOU Zilvernaald hechten wij veel waarde aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom we dat doen, hoe lang we deze bewaren, en welke rechten u heeft volgens de Algemene Verordening Gegevensbescherming (AVG/GDPR).
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
                    Website: https://kaniou.be
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    E-mail: info@kaniou.be
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    Ondernemingsnummer: (optioneel invullen)
                  </p>
                  <p className="font-body text-text-medium mb-2">
                    Vestigingsadres: (optioneel invullen)
                  </p>
                  <p className="font-body text-text-medium">
                    Verantwoordelijke voor gegevensverwerking: KANIOU
                  </p>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  2. Welke persoonsgegevens verzamelen wij?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij verzamelen en verwerken alleen de gegevens die strikt noodzakelijk zijn voor het leveren van onze diensten:
                </p>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  a. Gegevens via contact- of offerteformulieren:
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
                  c. Klantgegevens bij bestelling of dienst:
                </h3>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>Bestelgegevens</li>
                  <li>Betalingsstatus (geen creditcardgegevens)</li>
                  <li>Bezorgadres</li>
                  <li>Correspondentiegeschiedenis</li>
                </ul>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  3. Waarvoor gebruiken wij deze gegevens?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij gebruiken uw gegevens voor de volgende doeleinden:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>Om uw aanvraag of bestelling te verwerken</li>
                  <li>Voor het beantwoorden van uw vragen</li>
                  <li>Voor het leveren van onze producten en diensten</li>
                  <li>Voor het beheren van klantrelaties</li>
                  <li>Voor het verbeteren van onze website en gebruikerservaring</li>
                  <li>Om te voldoen aan wettelijke verplichtingen (boekhouding, facturatie)</li>
                </ul>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  4. Cookies en trackingtechnologieën
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij maken gebruik van Cookiebot by Usercentrics om uw toestemming voor cookies correct te beheren.
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="font-display text-lg text-primary font-semibold mb-3">
                    🔧 Noodzakelijke cookies (functioneel):
                  </h3>
                  <p className="font-body text-text-medium mb-4">
                    Deze zijn nodig voor de werking van de website.
                  </p>
                  
                  <h3 className="font-display text-lg text-primary font-semibold mb-3">
                    ⚙️ Voorkeuren:
                  </h3>
                  <p className="font-body text-text-medium mb-4">
                    Bijvoorbeeld uw taalkeuze of of u een popup al gezien heeft.
                  </p>
                  
                  <h3 className="font-display text-lg text-primary font-semibold mb-3">
                    📊 Statistieken (optioneel):
                  </h3>
                  <p className="font-body text-text-medium mb-4">
                    Om anonieme gebruikersstatistieken te analyseren via bijvoorbeeld Google Analytics.
                  </p>
                  
                  <h3 className="font-display text-lg text-primary font-semibold mb-3">
                    🎯 Marketing (optioneel):
                  </h3>
                  <p className="font-body text-text-medium">
                    Wordt alleen gebruikt als u toestemming heeft gegeven.
                  </p>
                </div>
                
                <p className="font-body text-text-medium mb-4">
                  ➡️ U kunt uw cookie-instellingen op elk moment wijzigen via de cookie-instellingenpagina.
                </p>
                
                <p className="font-body text-text-medium mb-4">
                  Voor meer informatie over gebruikte cookies verwijzen wij naar onze Cookieverklaring.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  5. Wie heeft toegang tot uw gegevens?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Uw gegevens worden nooit verkocht. Ze worden enkel gedeeld met de volgende partijen indien noodzakelijk:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Onze websitehostingpartner(s)</li>
                  <li>Cloudflare (beveiliging en CDN)</li>
                  <li>Replit (ontwikkeling backend + frontend site)</li>
                  <li>Mailverzending via SendGrid of SMTP-server</li>
                  <li>Eventuele boekhoudkundige software (bij betalingen)</li>
                  <li>Bezorgdiensten indien levering van toepassing is</li>
                </ul>
                <p className="font-body text-text-medium mb-6">
                  Met elke derde partij is een verwerkersovereenkomst afgesloten conform de AVG.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  6. Hoe lang bewaren wij uw gegevens?
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-display text-base text-primary font-semibold mb-2">
                        Type gegevens
                      </h3>
                      <p className="font-body text-text-medium mb-2">Contactaanvragen</p>
                      <p className="font-body text-text-medium mb-2">Bestel- en klantgegevens</p>
                      <p className="font-body text-text-medium mb-2">Cookiegegevens</p>
                      <p className="font-body text-text-medium">Nieuwsbriefabonnement</p>
                    </div>
                    <div>
                      <h3 className="font-display text-base text-primary font-semibold mb-2">
                        Bewaartermijn
                      </h3>
                      <p className="font-body text-text-medium mb-2">Max. 12 maanden</p>
                      <p className="font-body text-text-medium mb-2">Tot 7 jaar (wettelijke bewaartermijn)</p>
                      <p className="font-body text-text-medium mb-2">Volgens opgegeven vervaldatum in cookies</p>
                      <p className="font-body text-text-medium">Tot afmelding</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  7. Uw rechten als betrokkene
                </h2>
                <p className="font-body text-text-medium mb-4">
                  U heeft als gebruiker de volgende rechten:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Recht op inzage in uw persoonsgegevens</li>
                  <li>Recht op rectificatie (aanpassing)</li>
                  <li>Recht op verwijdering (recht om vergeten te worden)</li>
                  <li>Recht op beperking van de verwerking</li>
                  <li>Recht op bezwaar tegen verwerking</li>
                  <li>Recht op gegevensoverdraagbaarheid</li>
                </ul>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <p className="font-body text-text-medium">
                    Wilt u gebruik maken van uw rechten? Stuur dan een e-mail naar <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a> met als onderwerp "Privacyverzoek".
                  </p>
                </div>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  8. Beveiliging van uw gegevens
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>SSL-encryptie via HTTPS</li>
                  <li>Firewallbescherming via Cloudflare</li>
                  <li>Regelmatige updates en beveiligingspatches</li>
                  <li>Interne toegangsbeperking tot klantgegevens</li>
                  <li>Versleutelde opslag van persoonsgegevens indien nodig</li>
                </ul>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  9. Minderjarigen
                </h2>
                <p className="font-body text-text-medium mb-6">
                  Onze website en diensten zijn niet gericht op kinderen onder de 16 jaar. Wij verzamelen bewust geen gegevens van minderjarigen. Indien we er per ongeluk toch gegevens van een minderjarige ontvangen, zullen wij deze verwijderen zodra we dit vaststellen.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  10. Klachten of vragen?
                </h2>
                <p className="font-body text-text-medium mb-4">
                  Heeft u vragen over dit privacybeleid of wilt u een klacht indienen? Neem contact met ons op via:
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                  <p className="font-body text-text-medium mb-2">
                    📧 <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                  </p>
                  <p className="font-body text-text-medium">
                    📍 Eventueel adres hier invullen
                  </p>
                </div>
                
                <p className="font-body text-text-medium mb-6">
                  U heeft ook het recht een klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit (GBA):
                  <br />
                  <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.gegevensbeschermingsautoriteit.be</a>
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                  11. Wijzigingen
                </h2>
                <p className="font-body text-text-medium mb-6">
                  Wij behouden ons het recht voor dit privacybeleid te wijzigen. Raadpleeg deze pagina regelmatig voor updates. Bij substantiële wijzigingen zullen wij u hierover informeren via e-mail of pop-up.
                </p>
                
                <hr className="border-neutral-200 my-8" />
                
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="font-body text-text-medium mb-2">
                    🛡️ <strong>Wij nemen privacy serieus. Uw gegevens zijn bij ons in veilige handen.</strong>
                  </p>
                  <p className="font-body text-text-medium">
                    Bij KANIOU Zilvernaald staat transparantie, vertrouwen en veiligheid centraal.
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