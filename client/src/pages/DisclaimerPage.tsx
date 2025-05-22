import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import LanguageSelector from "@/components/layout/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const DisclaimerPage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Legal Disclaimer | {t('app.title')}</title>
        <meta
          name="description"
          content="Legal disclaimer and terms of use for KANIOU Zilvernaald website and services."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Legal Disclaimer
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-display text-xl text-primary font-semibold mb-4">
                Juridische Disclaimer
              </h2>
              
              <p className="font-body text-text-medium mb-6">
                De inhoud van deze website wordt uitsluitend aangeboden voor algemene informatieve doeleinden. 
                Hoewel KANIOU Zilvernaald ernaar streeft de informatie correct en actueel te houden, kunnen wij 
                geen garanties geven met betrekking tot de volledigheid, nauwkeurigheid, betrouwbaarheid of 
                geschiktheid van de verstrekte informatie.
              </p>
              
              <p className="font-body text-text-medium mb-6">
                Het gebruik van informatie op deze website is volledig op eigen risico. KANIOU Zilvernaald kan 
                niet aansprakelijk worden gesteld voor enige directe, indirecte, incidentele of gevolgschade die 
                voortvloeit uit het gebruik van deze website of het vertrouwen op de inhoud ervan.
              </p>
              
              <p className="font-body text-text-medium mb-6">
                Wij behouden ons het recht voor om de website en de inhoud ervan op elk moment te wijzigen, 
                zonder voorafgaande kennisgeving.
              </p>
              
              <p className="font-body text-text-medium mb-6">
                Deze website kan links bevatten naar externe websites. Deze links worden uitsluitend ter 
                informatie en voor uw gemak aangeboden. KANIOU Zilvernaald heeft geen controle over de inhoud 
                van externe websites en aanvaardt geen enkele verantwoordelijkheid voor hun juistheid, 
                wettigheid of werking.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DisclaimerPage;