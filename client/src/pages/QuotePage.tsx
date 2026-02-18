import PageLayout from "@/components/layout/PageLayout";
import QuoteWizard from "@/components/forms/QuoteWizard";

const QuotePage = () => {
  return (
    <PageLayout
      title="Offerte Aanvragen"
      subtitle="Vrijblijvend"
      description="Ontvang een vrijblijvende offerte op maat voor uw raamdecoratie."
      breadcrumbs={[{ label: "Offerte" }]}
      showCTA={false}
    >
      <QuoteWizard />
    </PageLayout>
  );
};

export default QuotePage;
