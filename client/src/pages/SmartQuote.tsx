import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import SmartQuoteForm from "@/components/forms/SmartQuoteForm";
import Container from "@/components/ui/container";

const SmartQuote = () => {
  const { language } = useLanguage();

  const translations = {
    nl: {
      title: "Slimme Offerte Generator - KANIOU",
      description: "Krijg direct een geschatte prijs voor uw raambekleding. Vul eenvoudig uw wensen in en ontvang binnen 24 uur een gepersonaliseerde offerte.",
      heading: "Vraag Uw Offerte Aan",
      subheading: "Eenvoudig, snel en betrouwbaar"
    },
    fr: {
      title: "Générateur de Devis Intelligent - KANIOU",
      description: "Obtenez immédiatement un prix estimé pour vos stores. Remplissez simplement vos souhaits et recevez un devis personnalisé dans les 24 heures.",
      heading: "Demandez Votre Devis",
      subheading: "Simple, rapide et fiable"
    },
    en: {
      title: "Smart Quote Generator - KANIOU",
      description: "Get instant price estimates for your window treatments. Simply fill in your preferences and receive a personalized quote within 24 hours.",
      heading: "Request Your Quote",
      subheading: "Simple, fast and reliable"
    },
    tr: {
      title: "Akıllı Teklif Üretici - KANIOU",
      description: "Perde sistemleriniz için anında fiyat tahmini alın. Tercihlerinizi doldurun ve 24 saat içinde kişiselleştirilmiş teklif alın.",
      heading: "Teklifinizi İsteyin",
      subheading: "Basit, hızlı ve güvenilir"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.nl;

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-gold-50 py-12">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.heading}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.subheading}
            </p>
          </div>
          
          <SmartQuoteForm />
        </Container>
      </div>
    </>
  );
};

export default SmartQuote;