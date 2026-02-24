import PageLayout from "@/components/layout/PageLayout";

const HoutenJaloezieeenSimplePage = () => {
  return (
    <PageLayout
      title="Houten Jaloezieën"
      subtitle="Inhoud volgt binnenkort."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Prijzen & Collecties", href: "/prijzen-collecties" },
        { label: "Houten Jaloezieën" },
      ]}
    >
      <div className="py-24 text-center">
        <p className="text-gray-400 text-lg">Inhoud volgt binnenkort.</p>
      </div>
    </PageLayout>
  );
};

export default HoutenJaloezieeenSimplePage;
