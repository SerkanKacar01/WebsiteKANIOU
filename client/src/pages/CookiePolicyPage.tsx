import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';
import { useLanguage } from '@/context/LanguageContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight } from "lucide-react";

const CookiePolicyPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Cookiebeleid | {t('app.title')}</title>
        <meta
          name="description"
          content="Cookiebeleid van Kaniou Zilvernaald. Lees hoe wij cookies gebruiken en hoe u uw cookievoorkeuren kunt beheren."
        />
      </Helmet>
      
      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Cookiebeleid</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              🍪 Cookiebeleid
            </h1>
            <p className="text-text-medium">
              Laatst bijgewerkt op: 7 september 2025
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="font-body text-text-medium mb-6">
                Welkom op onze website. Dit Cookiebeleid legt uit hoe Kaniou Zilvernaald ("wij", "ons", of "onze") cookies en soortgelijke technologieën gebruikt wanneer u onze website bezoekt. Wij respecteren uw privacy en streven ernaar transparant te zijn over de technologieën die wij gebruiken.
              </p>
              
              <p className="font-body text-text-medium mb-8">
                Door onze website te gebruiken, stemt u in met ons gebruik van cookies zoals beschreven in dit beleid, tenzij u uw voorkeuren heeft aangepast via onze cookie-instellingen.
              </p>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                1. Wat zijn cookies?
              </h2>
              <p className="font-body text-text-medium mb-4">
                Cookies zijn kleine tekstbestanden die bij een bezoek aan een website op uw apparaat (computer, tablet of smartphone) worden geplaatst. Cookies kunnen worden gebruikt om uw voorkeuren op te slaan, de prestaties van de website te verbeteren, en u relevante advertenties te tonen.
              </p>
              
              <p className="font-body text-text-medium mb-4">
                Er bestaan verschillende soorten cookies:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-6">
                <li><strong>Noodzakelijke cookies:</strong> Vereist voor de werking van de website.</li>
                <li><strong>Voorkeurscookies:</strong> Onthouden uw voorkeuren (zoals taalinstellingen).</li>
                <li><strong>Statistische cookies:</strong> Verzamelen anonieme informatie over het gebruik van de website.</li>
                <li><strong>Marketingcookies:</strong> Worden gebruikt om surfgedrag te volgen en gepersonaliseerde advertenties te tonen.</li>
              </ul>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                2. Welke cookies gebruiken wij?
              </h2>
              <p className="font-body text-text-medium mb-4">
                Wij maken gebruik van Cookiebot by Usercentrics om uw toestemming voor cookies correct te beheren. De volgende categorieën cookies worden gebruikt:
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="font-display text-lg text-primary font-semibold mb-3">
                  🔧 Noodzakelijke cookies (functioneel)
                </h3>
                <p className="font-body text-text-medium mb-3">
                  Deze zijn nodig voor de werking van de website en kunnen niet worden uitgeschakeld.
                </p>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  ⚙️ Voorkeuren
                </h3>
                <p className="font-body text-text-medium mb-3">
                  Bijvoorbeeld uw taalkeuze of of u een popup al gezien heeft.
                </p>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  📊 Statistieken (optioneel)
                </h3>
                <p className="font-body text-text-medium mb-3">
                  Om anonieme gebruikersstatistieken te analyseren via bijvoorbeeld Google Analytics.
                </p>
                
                <h3 className="font-display text-lg text-primary font-semibold mb-3 mt-6">
                  🎯 Marketing (optioneel)
                </h3>
                <p className="font-body text-text-medium">
                  Wordt alleen gebruikt als u toestemming heeft gegeven.
                </p>
              </div>
              
              <p className="font-body text-text-medium mb-4">
                ➡️ U kunt uw cookie-instellingen op elk moment wijzigen via de cookie-instellingenpagina.
              </p>
              
              <p className="font-body text-text-medium mb-4">
                Voor meer informatie over gebruikte cookies verwijzen wij naar onze Cookieverklaring hieronder:
              </p>
              
              {/* Cookiebot Cookie Declaration Script */}
              <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg" dangerouslySetInnerHTML={{
                __html: '<script id="CookieDeclaration" src="https://consent.cookiebot.com/277bd293-9336-4f15-ba87-4c760a56129b/cd.js" type="text/javascript" async></script>'
              }} />
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                3. Uw toestemming
              </h2>
              <p className="font-body text-text-medium mb-4">
                Bij het eerste bezoek aan onze website verschijnt er een cookie-banner waarmee u:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                <li>Alle cookies kunt accepteren</li>
                <li>Slechts bepaalde categorieën kunt toestaan</li>
                <li>Uw toestemming kunt weigeren</li>
              </ul>
              
              <p className="font-body text-text-medium mb-4">
                Wij gebruiken <code className="bg-gray-100 px-2 py-1 rounded">data-blockingmode="auto"</code>, wat betekent dat alle niet-noodzakelijke cookies automatisch geblokkeerd worden totdat u expliciete toestemming geeft.
              </p>
              
              <p className="font-body text-text-medium mb-6">
                U kunt uw toestemming op elk moment intrekken of aanpassen via de instellingen.
              </p>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                4. Wie heeft toegang tot uw gegevens?
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
                Met elke derde partij is een verwerkersovereenkomst afgesloten conform de AVG. Deze externe diensten kunnen cookies op uw apparaat plaatsen. U wordt hierover geïnformeerd via Cookiebot en kunt per dienst toestemming geven of weigeren.
              </p>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                5. Hoe beheert u cookies?
              </h2>
              <p className="font-body text-text-medium mb-4">
                U kunt cookies beheren via:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                <li>De cookie-instellingen op onze website (onderaan elke pagina).</li>
                <li>Uw browserinstellingen. De meeste browsers bieden instellingen aan om cookies te beheren, verwijderen of blokkeren.</li>
                <li>Het aanpassen van uw toestemmingsniveau via het Cookiebot-icoon.</li>
              </ul>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <p className="font-body text-text-medium">
                  <strong>Let op:</strong> Het uitschakelen van cookies kan invloed hebben op de werking van bepaalde functies op onze website.
                </p>
              </div>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                6. Wettelijke grondslag
              </h2>
              <p className="font-body text-text-medium mb-6">
                Volgens de Algemene Verordening Gegevensbescherming (AVG/GDPR) mogen wij noodzakelijke cookies plaatsen zonder toestemming. Voor alle andere soorten cookies is actieve en geïnformeerde toestemming verplicht, wat wij naleven via Cookiebot.
              </p>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                7. Uw rechten
              </h2>
              <p className="font-body text-text-medium mb-4">
                U heeft het recht om:
              </p>
              <ul className="list-disc pl-6 font-body text-text-medium mb-4">
                <li>In te zien welke gegevens wij van u verzamelen via cookies.</li>
                <li>Uw toestemming op elk moment in te trekken.</li>
                <li>Klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA).</li>
              </ul>
              
              <p className="font-body text-text-medium mb-6">
                Meer informatie hierover vindt u in ons <a href="/privacy-policy" className="text-accent hover:underline">Privacybeleid</a>.
              </p>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                8. Contact
              </h2>
              <p className="font-body text-text-medium mb-4">
                Heeft u vragen over dit Cookiebeleid of onze omgang met uw gegevens?
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-display text-lg text-primary font-semibold mb-3">
                  Kaniou Zilvernaald
                </h3>
                <p className="font-body text-text-medium mb-2">
                  <strong>Adres:</strong> Pauwengraaf 66, 3630 Maasmechelen, België
                </p>
                <p className="font-body text-text-medium mb-2">
                  <strong>E-mail:</strong> <a href="mailto:info@kaniou.be" className="text-accent hover:underline">info@kaniou.be</a>
                </p>
                <p className="font-body text-text-medium">
                  <strong>Telefoon:</strong> +32 467 85 64 05
                </p>
              </div>
              
              <hr className="border-neutral-200 my-8" />
              
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                9. Wijzigingen in dit beleid
              </h2>
              <p className="font-body text-text-medium mb-6">
                Wij behouden ons het recht voor dit Cookiebeleid te wijzigen. Wij raden aan dit beleid regelmatig te raadplegen. De datum bovenaan dit document geeft aan wanneer dit beleid voor het laatst is bijgewerkt.
              </p>
              
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-body text-text-medium mb-2">
                  <strong>Cookievoorkeuren aanpassen:</strong>
                </p>
                <p className="font-body text-text-medium">
                  U kunt uw cookievoorkeuren op elk moment aanpassen door op het Cookiebot-icoon te klikken dat rechtsonder op de pagina verschijnt, of door de cookie-instellingen onderaan de website te gebruiken.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CookiePolicyPage;