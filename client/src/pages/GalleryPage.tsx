import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageLayout from "@/components/layout/PageLayout";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: number;
};

const GalleryPage = () => {
  const { data: galleryItems = [], isLoading, error } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  return (
    <PageLayout
      title="Onze Realisaties"
      subtitle="Premium Galerij"
      description="Ontdek onze mooiste projecten en laat u inspireren door de oneindige mogelijkheden van premium raambekleding op maat."
      metaDescription="Ontdek onze galerij met prachtige realisaties van rolgordijnen, plissé gordijnen en andere raambekleding op maat."
      breadcrumbs={[{ label: "Galerij" }]}
      showCTA={true}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <GalleryGrid items={galleryItems} isLoading={isLoading} error={error} />
        </Container>
      </section>
    </PageLayout>
  );
};

export default GalleryPage;
