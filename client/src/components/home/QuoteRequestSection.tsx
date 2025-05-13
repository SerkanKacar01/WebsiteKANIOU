import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import QuoteForm from "@/components/forms/QuoteForm";
import { useLanguage } from "@/context/LanguageContext";

const QuoteRequestSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="quote" className="py-16 bg-primary relative">
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl text-primary font-semibold mb-4 text-center">
                {t('quote.title')}
              </h2>
              <p className="font-body text-text-medium mb-8 text-center">
                {t('quote.subtitle')}
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
