import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Ruler, Truck, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AboutCompany = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-16 bg-neutral-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              {t('about.title')}
            </h2>
            <p className="font-body text-text-medium mb-6">
              {t('about.paragraph1')}
            </p>

            <p className="font-body text-text-medium mb-6">
              {t('about.paragraph2')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  {t('about.values.quality')}
                </h3>
                <p className="font-body text-text-medium text-sm">
                  {t('about.values.qualityText')}
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Ruler className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  {t('about.values.service')}
                </h3>
                <p className="font-body text-text-medium text-sm">
                  {t('about.values.serviceText')}
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  {t('about.values.innovation')}
                </h3>
                <p className="font-body text-text-medium text-sm">
                  {t('about.values.innovationText')}
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-2">
                  <Headphones className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  {t('about.mission.title')}
                </h3>
                <p className="font-body text-text-medium text-sm">
                  {t('about.mission.text')}
                </p>
              </div>
            </div>

            <Link href="/contact">
              <a>
                <Button size="lg" className="bg-secondary hover:bg-accent">
                  {t('contact.title')}
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
              </a>
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://pixabay.com/get/g356064e5e472162ea3bdf7db76831017a205df5f1807a09d7636efef6f9b054d4c9aaf47b9c21d1c58d3c45cc428f1f1560cf1e2a2d0ead5771100045f79d161_1280.jpg"
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
