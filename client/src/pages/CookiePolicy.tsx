import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type SupportedLanguage = 'nl' | 'fr' | 'de' | 'en';

export default function CookiePolicy() {
  const { language } = useLanguage();

  const content: Record<SupportedLanguage, {
    title: string;
    description: string;
    intro: string;
    cookieDeclaration: string;
    cookieDeclarationDesc: string;
    manageCookies: string;
    manageCookiesDesc: string;
    whatAreCookies: string;
    whatAreCookiesDesc: string;
    typesOfCookies: string;
    necessary: string;
    preferences: string;
    statistics: string;
    marketing: string;
  }> = {
    nl: {
      title: "Cookie Beleid",
      description: "Informatie over hoe wij cookies gebruiken op onze website",
      intro: "Deze website gebruikt cookies om uw ervaring te verbeteren en om aan wettelijke vereisten te voldoen. Hieronder vindt u gedetailleerde informatie over alle cookies die worden gebruikt.",
      cookieDeclaration: "Cookie Overzicht",
      cookieDeclarationDesc: "Hieronder vindt u een live overzicht van alle cookies die op deze website worden gebruikt:",
      manageCookies: "Cookie Instellingen Beheren",
      manageCookiesDesc: "U kunt uw cookie voorkeuren op elk moment wijzigen door op de onderstaande knop te klikken.",
      whatAreCookies: "Wat zijn cookies?",
      whatAreCookiesDesc: "Cookies zijn kleine tekstbestanden die door websites op uw apparaat worden geplaatst om informatie over uw browsersessie op te slaan.",
      typesOfCookies: "Soorten cookies die wij gebruiken",
      necessary: "Noodzakelijke cookies: Deze zijn essentieel voor het functioneren van de website",
      preferences: "Voorkeur cookies: Deze onthouden uw keuzes en voorkeuren",
      statistics: "Statistiek cookies: Deze helpen ons begrijpen hoe bezoekers onze website gebruiken",
      marketing: "Marketing cookies: Deze worden gebruikt voor gepersonaliseerde advertenties"
    },
    fr: {
      title: "Politique des Cookies",
      description: "Informations sur l'utilisation des cookies sur notre site web",
      intro: "Ce site web utilise des cookies pour améliorer votre expérience et respecter les exigences légales. Vous trouverez ci-dessous des informations détaillées sur tous les cookies utilisés.",
      cookieDeclaration: "Aperçu des Cookies",
      cookieDeclarationDesc: "Vous trouverez ci-dessous un aperçu en direct de tous les cookies utilisés sur ce site web:",
      manageCookies: "Gérer les Paramètres des Cookies",
      manageCookiesDesc: "Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur le bouton ci-dessous.",
      whatAreCookies: "Que sont les cookies?",
      whatAreCookiesDesc: "Les cookies sont de petits fichiers texte placés sur votre appareil par les sites web pour stocker des informations sur votre session de navigation.",
      typesOfCookies: "Types de cookies que nous utilisons",
      necessary: "Cookies nécessaires: Ils sont essentiels au fonctionnement du site web",
      preferences: "Cookies de préférence: Ils mémorisent vos choix et préférences",
      statistics: "Cookies statistiques: Ils nous aident à comprendre comment les visiteurs utilisent notre site web",
      marketing: "Cookies marketing: Ils sont utilisés pour la publicité personnalisée"
    },
    de: {
      title: "Cookie-Richtlinie",
      description: "Informationen über die Verwendung von Cookies auf unserer Website",
      intro: "Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern und gesetzliche Anforderungen zu erfüllen. Unten finden Sie detaillierte Informationen über alle verwendeten Cookies.",
      cookieDeclaration: "Cookie-Übersicht",
      cookieDeclarationDesc: "Unten finden Sie eine Live-Übersicht aller auf dieser Website verwendeten Cookies:",
      manageCookies: "Cookie-Einstellungen verwalten",
      manageCookiesDesc: "Sie können Ihre Cookie-Präferenzen jederzeit ändern, indem Sie auf die Schaltfläche unten klicken.",
      whatAreCookies: "Was sind Cookies?",
      whatAreCookiesDesc: "Cookies sind kleine Textdateien, die von Websites auf Ihrem Gerät platziert werden, um Informationen über Ihre Browser-Sitzung zu speichern.",
      typesOfCookies: "Arten von Cookies, die wir verwenden",
      necessary: "Notwendige Cookies: Diese sind für das Funktionieren der Website unerlässlich",
      preferences: "Präferenz-Cookies: Diese merken sich Ihre Auswahl und Präferenzen",
      statistics: "Statistik-Cookies: Diese helfen uns zu verstehen, wie Besucher unsere Website nutzen",
      marketing: "Marketing-Cookies: Diese werden für personalisierte Werbung verwendet"
    },
    en: {
      title: "Cookie Policy",
      description: "Information about how we use cookies on our website",
      intro: "This website uses cookies to improve your experience and comply with legal requirements. Below you will find detailed information about all cookies used.",
      cookieDeclaration: "Cookie Overview",
      cookieDeclarationDesc: "Below you will find a live overview of all cookies used on this website:",
      manageCookies: "Manage Cookie Settings",
      manageCookiesDesc: "You can change your cookie preferences at any time by clicking the button below.",
      whatAreCookies: "What are cookies?",
      whatAreCookiesDesc: "Cookies are small text files placed on your device by websites to store information about your browsing session.",
      typesOfCookies: "Types of cookies we use",
      necessary: "Necessary cookies: These are essential for the website to function",
      preferences: "Preference cookies: These remember your choices and preferences",
      statistics: "Statistics cookies: These help us understand how visitors use our website",
      marketing: "Marketing cookies: These are used for personalized advertising"
    }
  };

  const supportedLang = (['nl', 'fr', 'de', 'en'] as const).includes(language as SupportedLanguage) 
    ? language as SupportedLanguage 
    : 'en';
  const t = content[supportedLang];

  return (
    <>
      <Helmet>
        <title>{t.title} | Kaniou</title>
        <meta name="description" content={t.description} />
        <script 
          id="CookieDeclaration" 
          src="https://consent.cookiebot.com/277bd293-9336-4f15-ba87-4c760a56129b/cd.js" 
          type="text/javascript" 
          async
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.title}</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.intro}
            </p>
          </div>

          <div className="grid gap-8">
            {/* Cookie Declaration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">
                  {t.cookieDeclaration}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  {t.cookieDeclarationDesc}
                </p>
                {/* Cookiebot Declaration will appear here automatically */}
                <div className="min-h-[200px] border rounded-lg p-4 bg-white">
                  <div className="text-center text-slate-500 py-8">
                    <p className="mb-2">Cookie Declaration Loading...</p>
                    <p className="text-sm">The live cookie overview will appear here once the page loads completely.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">
                  {t.manageCookies}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  {t.manageCookiesDesc}
                </p>
                <button
                  onClick={() => {
                    // Trigger Cookiebot consent dialog
                    if (window.Cookiebot) {
                      window.Cookiebot.show();
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Open Cookie Settings
                </button>
              </CardContent>
            </Card>

            {/* Information about cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">
                  {t.whatAreCookies}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  {t.whatAreCookiesDesc}
                </p>
                
                <Separator className="my-6" />
                
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {t.typesOfCookies}
                </h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-slate-700">{t.necessary}</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-slate-700">{t.preferences}</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-slate-700">{t.statistics}</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-slate-700">{t.marketing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}