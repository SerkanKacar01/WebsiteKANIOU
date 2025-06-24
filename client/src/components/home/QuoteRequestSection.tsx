import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import QuoteForm from "@/components/forms/QuoteForm";
import { useLanguage } from "@/context/LanguageContext";

const QuoteRequestSection = () => {
  const { t } = useLanguage();

  return (
    <section id="quote" className="py-8 md:py-16 bg-primary relative">
      <Container className="relative z-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-4 md:p-8 lg:p-10">
              <h2 className="font-display text-[20px] md:text-2xl lg:text-3xl text-primary font-semibold mb-4 text-center">
                {t("Vrijblijvende Offerte aanvragen")}
              </h2>
              <p className="font-body text-[14px] md:text-base text-text-medium mb-6 md:mb-8 text-center max-w-[90%] mx-auto">
                {t(
                  "Vul het onderstaande formulier in en ontvang binnen 24 uur een persoonlijke offerte, volledig afgestemd op uw wensen en specificaties.",
                )}
              </p>

              <QuoteForm />
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default QuoteRequestSection;
