import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import GalleryGrid from "@/components/gallery/GalleryGrid";

const GalleryPage = () => {
  const { data: galleryItems = [], isLoading, error } = useQuery({
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

      <div className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-primary font-semibold mb-4">
              Onze Galerij
            </h1>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Bekijk onze mooiste realisaties en laat u inspireren door de
              mogelijkheden van maatwerk raambekleding.
            </p>
          </div>

          <GalleryGrid items={galleryItems} isLoading={isLoading} error={error} />
        </Container>
      </div>
    </>
  );
};

export default GalleryPage;