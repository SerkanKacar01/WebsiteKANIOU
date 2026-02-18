import PageLayout from "@/components/layout/PageLayout";
import QuoteWizard from "@/components/forms/QuoteWizard";

const OffertePage = () => {
  return (
    <PageLayout
      title="Offerte Aanvragen"
      subtitle="Vrijblijvend"
      description="Ontvang een vrijblijvende offerte op maat voor uw raamdecoratie. Vul het formulier in en wij nemen binnen 24 uur contact met u op."
      metaDescription="Vraag een vrijblijvende offerte aan voor gordijnen, rolgordijnen, shutters en meer. KANIOU Zilvernaald - 30+ jaar ervaring in maatwerk raamdecoratie."
      breadcrumbs={[{ label: "Offerte" }]}
      showCTA={false}
    >
      <QuoteWizard />
    </PageLayout>
  );
};

export default OffertePage;
