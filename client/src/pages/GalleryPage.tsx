import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryItem, Category } from "@shared/schema";
import { 
  galleryImage1, 
  galleryImage2, 
  galleryImage3, 
  galleryImage4, 
  galleryImage5, 
  galleryImage6 
} from "@/assets";

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const {
    data: galleryItems = [],
    isLoading,
    error,
    refetch,
  } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery", activeTab],
    queryFn: async () => {
      if (activeTab === "all") {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery items");
        return res.json();
      } else {
        const categoryId = parseInt(activeTab);
        const res = await fetch(`/api/gallery?categoryId=${categoryId}`);
        if (!res.ok) throw new Error("Failed to fetch gallery items");
        return res.json();
      }
    },
  });

  // When the active tab changes, refetch the data
  useEffect(() => {
    refetch();
  }, [activeTab, refetch]);

  // Create local gallery items for the new photos
  const newGalleryItems: GalleryItem[] = [
    {
      id: 1001,
      title: "Premium Window Treatment",
      description: "Elegant curtain installation with premium fabric",
      imageUrl: galleryImage1,
      categoryId: 1
    },
    {
      id: 1002,
      title: "Custom Blinds Design",
      description: "Contemporary blinds solution for modern interiors",
      imageUrl: galleryImage2,
      categoryId: 1
    },
    {
      id: 1003,
      title: "Luxury Drapes",
      description: "Luxurious drapes with high-quality materials",
      imageUrl: galleryImage3,
      categoryId: 2
    },
    {
      id: 1004,
      title: "Modern Window Solutions",
      description: "Sleek and functional window treatment design",
      imageUrl: galleryImage4,
      categoryId: 2
    },
    {
      id: 1005,
      title: "Stylish Interior Curtains",
      description: "Stylish curtain design enhancing the living space",
      imageUrl: galleryImage5,
      categoryId: 3
    },
    {
      id: 1006,
      title: "Contemporary Window Decor",
      description: "Contemporary window decoration for elegant homes",
      imageUrl: galleryImage6,
      categoryId: 3
    }
  ];

  // Combine database items with new items or just use new items if database fetch fails
  const displayItems = error ? newGalleryItems : [...newGalleryItems, ...galleryItems];

  return (
    <>
      <Helmet>
        <title>Gallerij || KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Explore our installation gallery showcasing our premium curtains, blinds, and window treatments in beautiful interior spaces."
        />
      </Helmet>

      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Galerij van producten installaties
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Blader door ons portfolio van gerealiseerde installaties en laat u
              inspireren door stijlvolle en functionele toepassingen in diverse
              interieurs. Ontdek hoe onze hoogwaardige raamdecoratieoplossingen
              – van gordijnen en jaloezieën tot zonweringen op maat – ruimtes
              transformeren tot evenwichtige, elegante leefomgevingen. Gebruik
              de filterfunctie om te zoeken op productcategorie en bekijk hoe
              elke oplossing tot zijn recht komt in uiteenlopende woon- en
              werkruimtes.
            </p>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="mb-8"
          >
            <TabsList className="w-full justify-center flex-wrap">
              <TabsTrigger value="all">All Products</TabsTrigger>
              {(categories || []).map((category: Category) => (
                <TabsTrigger key={category.id} value={category.id.toString()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <GalleryGrid
            items={displayItems}
            isLoading={isLoading}
            error={null}
          />

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="font-display text-2xl text-primary font-semibold mb-4">
              Bent u enthousiast over wat u ziet?
            </h2>
            <p className="font-body text-text-medium max-w-2xl mx-auto mb-6">
              Onze interieurontwerpers helpen u graag om de perfecte uitstraling
              voor uw woning te realiseren. Neem contact met ons op voor een
              persoonlijk adviesgesprek of vraag vandaag nog een vrijblijvende
              offerte aan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quote" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-secondary hover:bg-accent text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Offerte aanvragen
                </button>
              </a>
              <a href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Contacteer ons
                </button>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GalleryPage;
