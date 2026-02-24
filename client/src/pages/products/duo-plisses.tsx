import PageLayout from "@/components/layout/PageLayout";

const DuoPlissesPage = () => {
  return (
    <PageLayout
      title="Duo Plissés"
      subtitle="Inhoud volgt binnenkort."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Prijzen & Collecties", href: "/prijzen-collecties" },
        { label: "Duo Plissés" },
      ]}
    >
      <div className="py-24 text-center">
        <p className="text-gray-400 text-lg">Inhoud volgt binnenkort.</p>
      </div>
    </PageLayout>
  );
};

export default DuoPlissesPage;
