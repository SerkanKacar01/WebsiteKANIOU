import PageLayout from "@/components/layout/PageLayout";

const DakraamZonweringenPage = () => {
  return (
    <PageLayout
      title="Dakraam Zonweringen"
      subtitle="Inhoud volgt binnenkort."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Prijzen & Collecties", href: "/prijzen-collecties" },
        { label: "Dakraam Zonweringen" },
      ]}
    >
      <div className="py-24 text-center">
        <p className="text-gray-400 text-lg">Inhoud volgt binnenkort.</p>
      </div>
    </PageLayout>
  );
};

export default DakraamZonweringenPage;
