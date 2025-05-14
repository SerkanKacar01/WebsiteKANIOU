import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacybeleid | Elegant Drapes</title>
        <meta
          name="description"
          content="Privacybeleid en informatie over hoe wij omgaan met uw persoonlijke gegevens."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Privacybeleid
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <h2 className="font-display text-xl text-primary font-semibold mb-4">
              Privacyverklaring – Elegant Drapes
            </h2>
            
            <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
              1. Wie zijn wij?
            </h3>
            <p className="font-body text-text-medium mb-4">
              Deze website wordt beheerd door:<br />
              Elegant Drapes BV<br />
              Ondernemingsnummer: 0123.456.789<br />
              Adres: Gordijnstraat 123, 1234 AB Amsterdam<br />
              E-mail: info@elegantdrapes.com
            </p>
            <p className="font-body text-text-medium mb-6">
              Elegant Drapes is verantwoordelijk voor de verwerking van jouw persoonsgegevens via deze website.
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
              <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
            </ul>
            <p className="font-body text-text-medium mb-6">
              Voor deze rechten kun je contact opnemen via: info@elegantdrapes.com
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
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;