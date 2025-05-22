import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import LanguageSelector from "@/components/layout/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const CookiePolicyPage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Cookie Policy | {t('app.title')}</title>
        <meta
          name="description"
          content="Cookie Policy and information about how we use cookies on our website."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Cookie Policy
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            {language === 'nl' ? (
              <>
                <h2 className="font-display text-xl text-primary font-semibold mb-4">
                  Cookiebeleid
                </h2>
                
                <p className="font-body text-text-medium mb-6">
                  Deze website maakt gebruik van cookies om uw surfervaring te verbeteren, het gebruik van de website te analyseren en u gepersonaliseerde inhoud aan te bieden, conform de bepalingen van de Algemene Verordening Gegevensbescherming (AVG - GDPR) en de Belgische wet van 30 juli 2018 betreffende de bescherming van natuurlijke personen met betrekking tot de verwerking van persoonsgegevens.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  Wat zijn cookies?
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Cookies zijn kleine tekstbestanden die op uw apparaat (computer, tablet of smartphone) worden geplaatst wanneer u een website bezoekt. Ze bevatten informatie over uw surfgedrag en maken het mogelijk om uw voorkeuren te onthouden, de prestaties van de website te verbeteren en gebruiksstatistieken te verzamelen.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  Welke soorten cookies gebruiken wij?
                </h3>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6 space-y-3">
                  <li>
                    <strong>Strikt noodzakelijke cookies:</strong> Deze cookies zijn essentieel voor de technische werking van de website en kunnen niet worden uitgeschakeld. Ze zorgen ervoor dat u veilig kunt navigeren en gebruik kunt maken van de basisfunctionaliteiten.
                  </li>
                  <li>
                    <strong>Functionele cookies:</strong> Deze cookies onthouden uw voorkeuren (zoals taalkeuze) om uw gebruikservaring te verbeteren. Ze kunnen optioneel zijn, afhankelijk van hun impact op privacy.
                  </li>
                  <li>
                    <strong>Analytische cookies:</strong> Deze cookies worden gebruikt om geanonimiseerde statistieken te verzamelen over het gebruik van de website (bijvoorbeeld via Google Analytics), zodat wij onze inhoud en structuur kunnen verbeteren.
                  </li>
                  <li>
                    <strong>Marketing- en trackingcookies:</strong> Deze cookies worden alleen geplaatst als u hiervoor voorafgaand expliciete toestemming geeft. Ze volgen uw surfgedrag over verschillende websites heen om u gepersonaliseerde advertenties of inhoud te tonen.
                  </li>
                </ul>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  Cookie-toestemming en -beheer
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Bij uw eerste bezoek aan onze website verschijnt er een cookiebanner waarin u uw voorkeuren kunt instellen. Enkel strikt noodzakelijke cookies worden automatisch geplaatst. Alle andere cookies worden pas geactiveerd nadat u hiervoor expliciet toestemming geeft.
                </p>
                <p className="font-body text-text-medium mb-6">
                  U kunt uw toestemming op elk moment intrekken of wijzigen via de instellingen van uw browser of door op de cookie-instellingenlink onderaan onze website te klikken.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  Meer informatie
                </h3>
                <p className="font-body text-text-medium mb-4">
                  Voor meer informatie over hoe wij uw persoonsgegevens verwerken, raadpleeg ons Privacybeleid.
                </p>
                <p className="font-body text-text-medium mb-6">
                  Door deze website verder te gebruiken na het instellen van uw voorkeuren, verklaart u zich akkoord met het gebruik van cookies zoals omschreven in dit cookiebeleid.
                </p>
              </>
            ) : (
              // English version
              <>
                <h2 className="font-display text-xl text-primary font-semibold mb-4">
                  Cookie Policy
                </h2>
                
                <p className="font-body text-text-medium mb-6">
                  This website uses cookies to improve your browsing experience, analyze website usage, and offer you personalized content, in accordance with the provisions of the General Data Protection Regulation (GDPR) and Belgian law of July 30, 2018 regarding the protection of natural persons with regard to the processing of personal data.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  What are cookies?
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Cookies are small text files that are placed on your device (computer, tablet or smartphone) when you visit a website. They contain information about your browsing behavior and make it possible to remember your preferences, improve website performance and collect usage statistics.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  What types of cookies do we use?
                </h3>
                <ul className="list-disc pl-6 font-body text-text-medium mb-6 space-y-3">
                  <li>
                    <strong>Strictly necessary cookies:</strong> These cookies are essential for the technical operation of the website and cannot be disabled. They ensure that you can navigate safely and use the basic functionalities.
                  </li>
                  <li>
                    <strong>Functional cookies:</strong> These cookies remember your preferences (such as language choice) to improve your user experience. They may be optional, depending on their impact on privacy.
                  </li>
                  <li>
                    <strong>Analytical cookies:</strong> These cookies are used to collect anonymized statistics about website usage (for example via Google Analytics), so that we can improve our content and structure.
                  </li>
                  <li>
                    <strong>Marketing and tracking cookies:</strong> These cookies are only placed if you give prior explicit consent. They track your browsing behavior across different websites to show you personalized advertisements or content.
                  </li>
                </ul>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  Cookie consent and management
                </h3>
                <p className="font-body text-text-medium mb-4">
                  During your first visit to our website, a cookie banner appears where you can set your preferences. Only strictly necessary cookies are automatically placed. All other cookies are only activated after you give explicit consent.
                </p>
                <p className="font-body text-text-medium mb-6">
                  You can withdraw or change your consent at any time through your browser settings or by clicking on the cookie settings link at the bottom of our website.
                </p>
                
                <hr className="border-neutral-200 my-6" />
                
                <h3 className="font-display text-lg text-primary font-semibold mt-8 mb-3">
                  More information
                </h3>
                <p className="font-body text-text-medium mb-4">
                  For more information about how we process your personal data, please consult our Privacy Policy.
                </p>
                <p className="font-body text-text-medium mb-6">
                  By continuing to use this website after setting your preferences, you agree to the use of cookies as described in this cookie policy.
                </p>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CookiePolicyPage;