import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
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
    <>
      <Helmet>
        <title>Galerij - KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Ontdek onze galerij met prachtige realisaties van rolgordijnen, plissé gordijnen en andere raambekleding op maat."
        />
      </Helmet>

      {/* Premium Hero Section */}
      <div className="relative bg-gradient-to-br from-neutral-50 via-white to-yellow-50/30 pt-20 pb-16">
        <Container>
          <div className="text-center mb-16">
            {/* Premium Badge with enhanced typography */}
            <div className="luxury-section-badge mb-12">
              <div className="luxury-badge-glow"></div>
              <div className="luxury-badge-text flex items-center gap-2">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <span className="text-caption">Premium Galerij</span>
              </div>
            </div>
            
            <h1 className="text-display-2 font-bold mb-6 text-center animate-text-reveal-scale">
              <span className="text-gradient-luxury text-glow-premium">Onze Exclusieve</span>
            </h1>
            <h2 className="text-hero text-neutral-800 font-semibold mb-10 text-center animate-text-reveal-scale text-reveal-delay-1">
              <span className="text-gradient-subtle text-shadow-luxury-medium">Realisaties</span>
            </h2>
            
            <p className="text-body-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-16 text-center animate-text-reveal-up text-reveal-delay-2">
              Ontdek onze mooiste projecten en laat u inspireren door de oneindige mogelijkheden van 
              <span className="text-gradient-premium font-semibold text-glow-subtle"> premium raambekleding op maat</span>.
            </p>

            {/* Premium Stats with enhanced typography */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
              <div className="text-center animate-text-reveal-up text-reveal-delay-3">
                <div className="text-title-xl font-bold text-gradient-luxury text-shadow-luxury-medium animate-text-glow-pulse">{galleryItems.length}+</div>
                <div className="text-caption text-neutral-600 mt-2">Projecten</div>
              </div>
              <div className="text-center animate-text-reveal-up text-reveal-delay-4">
                <div className="text-title-xl font-bold text-gradient-luxury text-shadow-luxury-medium animate-text-glow-pulse">100%</div>
                <div className="text-caption text-neutral-600 mt-2">Maatwerk</div>
              </div>
              <div className="text-center animate-text-reveal-up text-reveal-delay-5">
                <div className="text-title-xl font-bold text-gradient-luxury text-shadow-luxury-medium animate-text-glow-pulse">30+</div>
                <div className="text-caption text-neutral-600 mt-2">Jaar Ervaring</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-white">
        <Container>
          {/* Gallery Grid */}
          <GalleryGrid items={galleryItems} isLoading={isLoading} error={error} />
        </Container>
      </div>
    </>
  );
};

export default GalleryPage;