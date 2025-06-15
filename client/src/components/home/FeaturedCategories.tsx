import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Shield, Wrench } from "lucide-react";

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
    <div className="group relative h-80 rounded-lg overflow-hidden shadow-md cursor-default">
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
    <section id="featured-categories" className="py-16 bg-neutral-100">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Populaire raamdecoraties
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Deze selectie toont onze mooiste raambekledingsprojecten,
            geliefd bij klanten vanwege hun uitstraling, functionaliteit en
            maatwerkmogelijkheden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {galleryImages.map((image) => (
            <GalleryCard key={image.id} image={image} />
          ))}
        </div>

        {/* Featured Product Section - Fly Screens */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  Nieuw Product
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Custom Fly Screen Frames
              </h3>
              <p className="text-lg mb-4 opacity-90">
                Perfect for tilt-and-turn windows – no drilling required
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Wrench className="h-4 w-4" />
                  <span>Tool-free installation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>2-year warranty</span>
                </div>
              </div>
              <Link href="/quote">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Request Quote
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Fly Screen with Clamp System" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-sm">
                Vanaf €49,95
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCategories;