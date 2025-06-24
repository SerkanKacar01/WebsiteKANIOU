import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Ruler, Truck, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { inbetweenImage } from "@/assets/index";

const AboutCompany = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-8 md:py-16 bg-neutral-100">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-display text-[24px] md:text-3xl lg:text-4xl text-primary font-semibold mb-4">
              {t('Over KANIOU Zilvernaald')}
            </h2>
            <p className="font-body text-[14px] md:text-base text-text-medium mb-6">
              {t('Met meer dan 30 jaar ervaring is KANIOU Zilvernaald een gevestigde naam in maatwerk raamdecoratie. Wij combineren vakmanschap met stijl, afgestemd op de behoeften van iedere klant.')}
            </p>

            <p className="font-body text-[14px] md:text-base text-text-medium mb-6">
              {t('Onze missie is om woningen en werkruimtes te verrijken met functionele én esthetische oplossingen op maat, waarbij kwaliteit, service en innovatie centraal staan.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mb-8">
              <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Award className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="font-display text-[16px] md:text-lg text-primary font-medium mb-2">
                  {t('KWALITEIT')}
                </h3>
                <p className="font-body text-text-medium text-[12px] md:text-sm">
                  {t('Uitmuntende materialen en vakmanschap voor een hoogwaardige afwerking.')}
                </p>
              </div>

              <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Ruler className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="font-display text-[16px] md:text-lg text-primary font-medium mb-2">
                  {t('SERVICE')}
                </h3>
                <p className="font-body text-text-medium text-[12px] md:text-sm">
                  {t('Persoonlijke begeleiding van advies tot plaatsing.')}
                </p>
              </div>

              <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Truck className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="font-display text-[16px] md:text-lg text-primary font-medium mb-2">
                  {t('INNOVATIE')}
                </h3>
                <p className="font-body text-text-medium text-[12px] md:text-sm">
                  {t('Altijd up-to-date met de nieuwste trends en technieken.')}
                </p>
              </div>

              <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Headphones className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="font-display text-[16px] md:text-lg text-primary font-medium mb-2">
                  {t('MISSIE')}
                </h3>
                <p className="font-body text-text-medium text-[12px] md:text-sm">
                  {t('Uw ruimte verfraaien met stijlvolle, functionele maatwerkoplossingen.')}
                </p>
              </div>
            </div>

            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-accent min-h-[44px] text-[14px] md:text-base w-full sm:w-auto">
                {t('NEEM CONTACT MET ONS')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>

          <div className="relative">
            <img
              src={inbetweenImage}
              alt={t('about.showroomImage')}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-display text-lg text-primary font-medium">20+</p>
              <p className="font-body text-text-medium text-sm">
                {t('about.yearsExperience')}
              </p>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-display text-lg text-primary font-medium">
                5000+
              </p>
              <p className="font-body text-text-medium text-sm">
                {t('about.happyCustomers')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutCompany;
