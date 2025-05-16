import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import GalleryItem from "@/components/gallery/GalleryItem";
import { GalleryItem as GalleryItemType } from "@shared/schema";

const GallerySection = () => {
  const {
    data: galleryItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/gallery"],
  });

  // Display only the first 6 items on the home page
  const displayItems = galleryItems ? galleryItems.slice(0, 6) : [];

  return (
    <section id="gallery" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Onze Installatiegalerij
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto"></p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-neutral-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Niet gelukt om galerij-items te laden. Probeer het later opnieuw.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayItems.map((item: GalleryItemType) => (
                <GalleryItem key={item.id} item={item} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/gallery">
                <a>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Bekijk onze afgeronde projecten en laat u inspireren voor uw
                    eigen interieur.
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Button>
                </a>
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default GallerySection;
