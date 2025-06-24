import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";

// Import your new photos
import img1 from "@assets/IMG_9299.jpg";
import img2 from "@assets/IMG_9307.jpg";
import img3 from "@assets/IMG_9295.jpg";
import img4 from "@assets/IMG_9301.jpg";

// Gallery items with your new photos
const galleryImages = [
  {
    id: 1,
    imageUrl: img1,
    alt: "Modern living room with window treatments"
  },
  {
    id: 2,
    imageUrl: img2,
    alt: "Dining room with elegant blinds"
  },
  {
    id: 3,
    imageUrl: img3,
    alt: "Luxurious dining room with curtains"
  },
  {
    id: 4,
    imageUrl: img4,
    alt: "Contemporary living space with window coverings"
  }
];

const GalleryCard = ({ image }: { image: any }) => {
  return (
    <div className="group relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md cursor-default">
      <img
        src={image.imageUrl}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
    </div>
  );
};

const FeaturedCategories = () => {
  const { t } = useLanguage();

  return (
    <section id="featured-categories" className="py-8 md:py-16 bg-neutral-100">
      <Container className="px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-[24px] md:text-3xl lg:text-4xl text-primary font-semibold mb-4">
            Populaire raamdecoraties
          </h2>
          <p className="font-body text-[14px] md:text-base text-text-medium max-w-[90%] md:max-w-2xl mx-auto">
            Deze selectie toont onze mooiste raambekledingsprojecten,
            geliefd bij klanten vanwege hun uitstraling, functionaliteit en
            maatwerkmogelijkheden.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image) => (
            <GalleryCard key={image.id} image={image} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCategories;