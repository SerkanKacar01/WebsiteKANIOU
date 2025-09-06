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
        <title>Privacy Policy | {t('app.title')}</title>
        <meta
          name="description"
          content="Privacy Policy and information about how we handle your personal data."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Privacy Policy
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            {language === 'nl' ? (
              <>
                <h2 className="font-display text-xl text-primary font-semibold mb-4">
                  Privacyverklaring – Kaniou.be
                </h2>
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  1. Wie zijn wij?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Deze website wordt beheerd door:<br />
                  KANIOU BVBA<br />
                  Ondernemingsnummer: 0721.785.413<br />
                  Adres: Pauwengraaf 66, 3630 Maasmechelen te belgië<br />
                  E-mail: info@kaniou.be
                </p>
                <p className="font-body text-text-medium mb-6">
                  KANIOU is verantwoordelijk voor de verwerking van jouw persoonsgegevens via deze website.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  2. Welke persoonsgegevens verzamelen wij?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Wij verzamelen enkel de gegevens die jij ons zelf verstrekt of die automatisch worden gegenereerd tijdens je bezoek, zoals:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>Naam en voornaam</li>
                  <li>Adres</li>
                  <li>Telefoonnummer</li>
                  <li>E-mailadres</li>
                  <li>IP-adres</li>
                  <li>Browsergegevens</li>
                  <li>Gegevens over jouw gebruik van de website</li>
                </ul>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  3. Waarom verzamelen wij jouw gegevens?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Wij gebruiken jouw gegevens:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                  <li>Om jouw offerteaanvraag of bestelling te verwerken</li>
                  <li>Om contact met je op te nemen indien nodig</li>
                  <li>Voor klantenbeheer en boekhouding</li>
                  <li>Voor het verbeteren van onze website en service</li>
                  <li>Om te voldoen aan wettelijke verplichtingen</li>
                </ul>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  4. Met wie delen wij jouw gegevens?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Wij delen jouw gegevens enkel:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Met onze hostingpartner indien noodzakelijk voor de werking van de website</li>
                  <li>Met dienstverleners (zoals boekhouders) wanneer wettelijk verplicht</li>
                  <li>Met officiële instanties indien wettelijk vereist</li>
                </ul>
                <p className="font-body text-text-medium mb-6">
                  Wij verkopen jouw gegevens nooit aan derden.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  5. Hoe lang bewaren wij jouw gegevens?
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Wij bewaren je gegevens niet langer dan nodig is voor de doeleinden waarvoor ze zijn verzameld, of zolang dit wettelijk verplicht is.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  6. Wat zijn jouw rechten?
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Je hebt het recht om:
                </p>
                <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                  <li>Je gegevens in te zien</li>
                  <li>Onjuiste gegevens te laten corrigeren</li>
                  <li>Je gegevens te laten verwijderen</li>
                  <li>Je verzet aan te tekenen tegen het gebruik van je gegevens</li>
                  <li>Een klacht in te dienen bij de Gegevensbeschermingsautoriteit:<br />
                  <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.gegevensbeschermingsautoriteit.be</a></li>
                </ul>
                <p className="font-body text-text-medium mb-6">
                  Voor deze rechten kun je contact opnemen via: info@kaniou.be
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  7. Beveiliging
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Wij nemen passende maatregelen om je gegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  8. Cookies
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Onze website gebruikt cookies om jouw ervaring te verbeteren. Bij je eerste bezoek vragen wij je toestemming. Lees meer in ons cookiebeleid.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  9. Wijzigingen
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Wij behouden ons het recht voor om deze privacyverklaring te wijzigen. De meest recente versie is steeds raadpleegbaar op onze website.
                </p>
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
                <p className="font-body text-text-medium mb-6">
                  Our website uses cookies to improve your experience. We ask for your permission during your first visit. Read more in our cookie policy.
                </p>
                
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