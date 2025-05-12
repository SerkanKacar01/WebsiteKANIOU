import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryItem } from "@shared/schema";

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: galleryItems, isLoading, error } = useQuery({
    queryKey: ["/api/gallery"],
  });

  // Filter gallery items based on the active tab
  const filteredItems = galleryItems
    ? activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item: GalleryItem) => {
          // This is just a simple example, in a real implementation,
          // you'd have a category field on gallery items
          switch (activeTab) {
            case "living":
              return item.title.toLowerCase().includes("living");
            case "bedroom":
              return item.title.toLowerCase().includes("bedroom");
            case "kitchen":
              return item.title.toLowerCase().includes("kitchen");
            case "office":
              return item.title.toLowerCase().includes("office");
            default:
              return true;
          }
        })
    : [];

  return (
    <>
      <Helmet>
        <title>Gallery | Elegant Drapes</title>
        <meta
          name="description"
          content="Explore our installation gallery showcasing our premium curtains, blinds, and window treatments in beautiful interior spaces."
        />
      </Helmet>
      
      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Our Installation Gallery
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Browse through our portfolio of completed projects to find inspiration for your own space.
              See how our premium window treatments transform interiors across various styles.
            </p>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="mb-8"
          >
            <TabsList className="w-full justify-center">
              <TabsTrigger value="all">All Spaces</TabsTrigger>
              <TabsTrigger value="living">Living Rooms</TabsTrigger>
              <TabsTrigger value="bedroom">Bedrooms</TabsTrigger>
              <TabsTrigger value="kitchen">Kitchens</TabsTrigger>
              <TabsTrigger value="office">Home Offices</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <GalleryGrid 
            items={filteredItems} 
            isLoading={isLoading} 
            error={error as Error} 
          />
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="font-display text-2xl text-primary font-semibold mb-4">
              Love What You See?
            </h2>
            <p className="font-body text-text-medium max-w-2xl mx-auto mb-6">
              Our designers can help you achieve the perfect look for your home. 
              Contact us for a consultation or request a quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quote" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-secondary hover:bg-accent text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Request a Quote
                </button>
              </a>
              <a href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Contact Us
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
