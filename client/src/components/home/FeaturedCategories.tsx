import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

// Default category images
const defaultImages = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1532372320572-cda25653a58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
];

// Hardcoded popular categories for when the database isn't available
const popularCategories = [
  { 
    id: 1, 
    name: "Overgordijnen", 
    description: "Elegant overgordijnen bieden privacy en stijl voor elke kamer in uw huis.",
    imageUrl: defaultImages[0]
  },
  { 
    id: 2, 
    name: "Rolgordijnen", 
    description: "Functionele rolgordijnen voor optimale lichtregeling en bescherming tegen inkijk.",
    imageUrl: defaultImages[1]
  },
  { 
    id: 3, 
    name: "Houten jaloezieën", 
    description: "Natuurlijke houten jaloezieën geven uw woning een warme, luxueuze uitstraling.",
    imageUrl: defaultImages[2]
  },
  { 
    id: 4, 
    name: "Duo rolgordijnen", 
    description: "Innovatieve duo rolgordijnen met afwisselende transparante en ondoorzichtige banen.",
    imageUrl: defaultImages[3]
  },
  { 
    id: 5, 
    name: "Plissé", 
    description: "Stijlvolle plissé gordijnen die perfect passen bij moderne interieurs.",
    imageUrl: defaultImages[4]
  },
  { 
    id: 6, 
    name: "Houten shutters", 
    description: "Elegante houten shutters voor een tijdloze en stijlvolle raamdecoratie.",
    imageUrl: defaultImages[5]
  }
];

const CategoryCard = ({ category }: { category: Category | any }) => {
  const { t } = useLanguage();

  return (
    <div className="group relative h-80 rounded-lg overflow-hidden shadow-md">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <h3 className="font-display text-xl sm:text-2xl text-white font-medium mb-2">
          {category.name}
        </h3>
        <p className="font-body text-white text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
          {category.description}
        </p>
        <Link href={`/products/${category.urlPath || category.id}`}>
          <a className="font-body inline-block text-white text-sm border-b border-white pb-1 transition-all group-hover:border-secondary group-hover:text-secondary">
            {t("hero.cta") || "Bekijk meer"}
          </a>
        </Link>
      </div>
    </div>
  );
};

const FeaturedCategories = () => {
  const { t } = useLanguage();
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Use either database categories or our hardcoded ones if there was an error
  const displayCategories = error || categories.length === 0 ? popularCategories : categories;

  return (
    <section className="py-16 bg-neutral-100">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Populaire raamdecoraties
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Deze selectie toont onze 6 meest gekozen raambekledingsproducten,
            geliefd bij klanten vanwege hun uitstraling, functionaliteit en
            maatwerkmogelijkheden.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-lg bg-neutral-200 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCategories
              .slice(0, 6)
              .map((category, index) => (
                <CategoryCard key={category.id || index} category={category} />
              ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedCategories;
