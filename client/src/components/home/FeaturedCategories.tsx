import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";

// Featured category IDs (manually selected)
const FEATURED_CATEGORY_IDS = [1, 2, 3, 5, 6, 8];

// Map category names to URL paths based on the official product list
const getURLPath = (categoryName: string): string => {
  const categoryMapping: Record<string, string> = {
    "Curtains": "overgordijnen",
    "Sheer Drapes": "vitrages",
    "Sunblinds": "rolgordijnen",
    "Duo Blinds": "duo-rolgordijnen",
    "Textile Vertical Blinds": "textiel-lamellen",
    "Plastic Vertical Blinds": "kunststof-lamellen",
    "Wooden Blinds": "houten-jaloezieen",
    "Plastic Blinds": "kunststof-jaloezieen",
    "Textile Window Film": "textiel-raamfolie",
    "Wooden Shutters": "houten-shutters",
    "Inset Insect Screens": "inzethorren",
    "Mount-on Insect Screens": "opzethorren",
    "Pleated Insect Doors": "plisse-hordeuren",
    "Pleated Blinds": "plisse",
    "Duo Pleated Blinds": "duo-plisse",
    "Duo Pleated Roof Window Blinds": "duo-plisse-dakramen",
    "Roof Window Shading": "dakraam-zonwering",
    "Curtain Rails": "gordijnrails",
    "Curtain Rods": "gordijnroedes",
    "SQUID": "squid"
  };
  
  return categoryMapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, "-");
};

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div className="group relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
        <h2 className="font-display text-xl sm:text-2xl text-white font-medium mb-1 sm:mb-2">
          {category.name}
        </h2>
        <p className="font-body text-white text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{category.description}</p>
        <Link href={`/products/${getURLPath(category.name)}`}>
          <a className="font-body inline-block text-white text-xs sm:text-sm border-b border-white pb-1 transition-all group-hover:border-secondary group-hover:text-secondary">
            Ontdek Onze Collectie
            <span className="sr-only"> van {category.name}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

const FeaturedCategories = () => {
  const { data: allCategories = [], isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Filter only featured categories
  const featuredCategories = allCategories.filter(category => 
    FEATURED_CATEGORY_IDS.includes(category.id)
  );

  return (
    <section 
      className="py-10 sm:py-12 md:py-16 bg-neutral-100"
      aria-labelledby="featured-categories-heading"
    >
      <Container>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 
            id="featured-categories-heading" 
            className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-semibold mb-2 sm:mb-4"
          >
            Doorzoek per Categorie
          </h2>
          <p className="font-body text-sm sm:text-base text-text-medium max-w-2xl mx-auto px-2">
            Vind de perfecte raambehandeling door hieronder een productcategorie te selecteren
          </p>
        </div>

        {isLoading ? (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            role="status"
            aria-live="polite"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 sm:h-72 md:h-80 rounded-lg bg-neutral-200 animate-pulse" aria-hidden="true"></div>
            ))}
            <div className="sr-only">Categorieën worden geladen</div>
          </div>
        ) : error ? (
          <div 
            className="text-center text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200"
            role="alert"
            aria-live="assertive"
          >
            <p className="mb-2 font-medium">Categorieën worden geladen...</p>
            <p className="text-sm">De gegevens worden verwerkt, even geduld a.u.b.</p>
          </div>
        ) : (
          <>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
              role="region"
              aria-label="Uitgelichte productcategorieën"
            >
              {featuredCategories.map((category: Category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/browse-collection">
                <a className="inline-block">
                  <Button size="lg" className="bg-primary hover:bg-accent group focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <span>Bekijk Alle Categorieën</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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

export default FeaturedCategories;
