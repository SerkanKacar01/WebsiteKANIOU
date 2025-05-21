import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import GalleryItem from "@/components/gallery/GalleryItem";
import { GalleryItem as GalleryItemType } from "@shared/schema";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Fallback gallery items for when database connection fails
const fallbackGalleryItems = [
  {
    id: 1,
    title: "Moderne woonkamer met overgordijnen",
    description: "Elegante overgordijnen perfect afgestemd op moderne meubels",
    imageUrl: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
    categoryId: 1,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Luxe slaapkamer met dubbele rolgordijnen",
    description: "Stijlvolle duo rolgordijnen voor optimale lichtregeling",
    imageUrl: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    categoryId: 2,
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Strakke kantoorruimte met jaloezieën",
    description: "Functionele aluminium jaloezieën voor een professionele uitstraling",
    imageUrl: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
    categoryId: 3,
    createdAt: new Date()
  },
  {
    id: 4,
    title: "Scandinavisch interieur met lichte gordijnen",
    description: "Lichtdoorlatende vitrages die perfect aansluiten bij een licht interieur",
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    categoryId: 4,
    createdAt: new Date()
  },
  {
    id: 5,
    title: "Kinderkamer met kleurrijke rolgordijnen",
    description: "Speelse rolgordijnen op maat gemaakt voor een kindvriendelijke omgeving",
    imageUrl: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1747&q=80",
    categoryId: 5,
    createdAt: new Date()
  },
  {
    id: 6,
    title: "Stijlvol dakterras met zonwering",
    description: "Op maat gemaakte zonwering voor optimaal buitencomfort",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    categoryId: 6,
    createdAt: new Date()
  }
];

// Create a component for fallback gallery items
const FallbackGalleryItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer h-64">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center">
              <h3 className="font-display text-xl text-white font-medium mb-2">
                {item.title}
              </h3>
              <p className="font-body text-white text-sm">{item.description}</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full object-contain max-h-[80vh]"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="font-display text-xl text-white font-medium mb-1">
              {item.title}
            </h3>
            <p className="font-body text-white/90 text-sm">{item.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const GallerySection = () => {
  const {
    data: galleryItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/gallery"],
  });

  // Use database items if available, otherwise use fallback items
  const displayItems = !error && galleryItems ? galleryItems.slice(0, 6) : fallbackGalleryItems;

  return (
    <section id="gallery" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Onze Installatiegalerij
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Ontdek hoe onze raamdecoraties ruimtes transformeren tot elegante en comfortabele leefomgevingen.
          </p>
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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {error ? (
                // Use fallback items when there's an error
                fallbackGalleryItems.map(item => (
                  <FallbackGalleryItem key={item.id} item={item} />
                ))
              ) : (
                // Use database items when available
                displayItems.map((item: GalleryItemType) => (
                  <GalleryItem key={item.id} item={item} />
                ))
              )}
            </div>

            <div className="text-center mt-10">
              <Link href="/gallery">
                <a>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-3 max-w-[300px] sm:max-w-none mx-auto text-center"
                  >
                    <span className="line-clamp-2 sm:line-clamp-1">
                      Bekijk onze afgeronde projecten en laat u inspireren voor uw
                      eigen interieur.
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4 flex-shrink-0"
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
