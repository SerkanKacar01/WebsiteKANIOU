import PageLayout from "@/components/layout/PageLayout";

const DuoRolgordijnenPage = () => {
  return (
    <PageLayout
      title="Duo Rolgordijnen"
      subtitle="Inhoud volgt binnenkort."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Prijzen & Collecties", href: "/prijzen-collecties" },
        { label: "Duo Rolgordijnen" },
      ]}
    >
      <div className="py-24 text-center">
        <p className="text-gray-400 text-lg">Inhoud volgt binnenkort.</p>
      </div>
    </PageLayout>
  );
};

export default DuoRolgordijnenPage;
