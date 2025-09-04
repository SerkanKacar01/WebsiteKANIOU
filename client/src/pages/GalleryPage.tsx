import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GalleryItem } from "@shared/schema";
import { Button } from "@/components/ui/button";

const GalleryPage = () => {
  const { data: allGalleryItems = [], isLoading, error } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Filter items based on selected category
  const galleryItems = useMemo(() => {
    if (selectedCategory === null) return allGalleryItems;
    return allGalleryItems.filter(item => item.categoryId === selectedCategory);
  }, [allGalleryItems, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const categoryMap = new Map();
    allGalleryItems.forEach(item => {
      if (item.categoryId && !categoryMap.has(item.categoryId)) {
        categoryMap.set(item.categoryId, {
          id: item.categoryId,
          name: getCategoryName(item.categoryId)
        });
      }
    });
    return Array.from(categoryMap.values());
  }, [allGalleryItems]);

  function getCategoryName(categoryId: number): string {
    const categoryNames: Record<number, string> = {
      1: "Gordijnen",
      2: "Verticale Lamellen", 
      3: "Rolgordijnen",
      4: "Plissé",
      5: "Vitrage",
      6: "Conservatory"
    };
    return categoryNames[categoryId] || "Overige";
  }

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
            {/* Premium Badge */}
            <div className="inline-flex items-center mb-8 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-yellow-700 text-sm font-medium uppercase tracking-wider">Premium Galerij</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl text-primary font-bold mb-6 bg-gradient-to-br from-primary to-yellow-600 bg-clip-text text-transparent">
              Onze Exclusieve
            </h1>
            <h2 className="font-display text-4xl md:text-6xl text-neutral-800 font-semibold mb-8">
              Realisaties
            </h2>
            
            <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Ontdek onze mooiste projecten en laat u inspireren door de oneindige mogelijkheden van 
              <span className="text-primary font-semibold"> premium raambekleding op maat</span>.
            </p>

            {/* Premium Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{allGalleryItems.length}+</div>
                <div className="text-sm uppercase tracking-wide text-neutral-600">Projecten</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm uppercase tracking-wide text-neutral-600">Maatwerk</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm uppercase tracking-wide text-neutral-600">Jaar Ervaring</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-white">
        <Container>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Alle Projecten
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category.id)}
                className="px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <GalleryGrid items={galleryItems} isLoading={isLoading} error={error} />
        </Container>
      </div>
    </>
  );
};

export default GalleryPage;