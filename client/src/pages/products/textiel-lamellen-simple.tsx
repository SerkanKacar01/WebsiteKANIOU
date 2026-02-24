import PageLayout from "@/components/layout/PageLayout";

const TextielLamellenSimplePage = () => {
  return (
    <PageLayout
      title="Textiel Lamellen"
      subtitle="Inhoud volgt binnenkort."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Prijzen & Collecties", href: "/prijzen-collecties" },
        { label: "Textiel Lamellen" },
      ]}
    >
      <div className="py-24 text-center">
        <p className="text-gray-400 text-lg">Inhoud volgt binnenkort.</p>
      </div>
    </PageLayout>
  );
};

export default TextielLamellenSimplePage;
