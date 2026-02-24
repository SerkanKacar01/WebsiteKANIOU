import PageLayout from "@/components/layout/PageLayout";

const KunststofLamellenSimplePage = () => {
  return (
    <PageLayout
      title="Kunststof Lamellen"
      subtitle="Inhoud volgt binnenkort."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Prijzen & Collecties", href: "/prijzen-collecties" },
        { label: "Kunststof Lamellen" },
      ]}
    >
      <div className="py-24 text-center">
        <p className="text-gray-400 text-lg">Inhoud volgt binnenkort.</p>
      </div>
    </PageLayout>
  );
};

export default KunststofLamellenSimplePage;
