import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Category, GalleryItem } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import CategoryGrid from "@/components/categories/CategoryGrid";

// Official list of 20 product categories from the requirements
const officialCategories = [
  "Overgordijnen",
  "Vitrages",
  "Rolgordijnen",
  "Duo rolgordijnen",
  "Textiel lamellen",
  "Kunststof lamellen",
  "Houten jaloezieën",
  "Kunststof jaloezieën",
  "Textiel raamfolie",
  "Houten shutters",
  "Inzethorren",
  "Opzethorren",
  "Plissé hordeuren",
  "Plissé",
  "Duo plissé",
  "Duo plissé dakramen",
  "Dakraam zonwering",
  "Gordijnrails",
  "Gordijnroedes",
  "SQUID"
];

const ProductsPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();
  
  // Fetch all categories for the browse collection page
  const { 
    data: categoriesFromDb = [], 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch gallery items to use as fallback for categories without images
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  // Create a mapping from Dutch category names to their details
  const categoryDetailsMap = categoriesFromDb.reduce((acc, category) => {
    acc[category.name] = category;
    return acc;
  }, {} as Record<string, Category>);
  
  // Create categories array based on the official list
  const categories = officialCategories.map((categoryName: string, index: number) => {
    // Look for an existing category with this name
    const existingCategory = categoriesFromDb.find(
      c => c.name === categoryName || 
           categoryName === categoryDetailsMap[c.name]?.name
    );
    
    if (existingCategory) {
      return existingCategory;
    }
    
    // If not found, create a placeholder with gallery image
    const randomIndex = index % galleryItems.length;
    const galleryItem = galleryItems[randomIndex] || galleryItems[0];
    
    return {
      id: 1000 + index, // Use high IDs to avoid conflicts
      name: categoryName,
      description: `Ontdek onze collectie ${categoryName.toLowerCase()} voor elk interieur en budget.`,
      imageUrl: galleryItem?.imageUrl || '',
    } as Category;
  });

  // Determine if we're in a loading state
  const isLoading = categoriesLoading || galleryLoading;

  return (
    <>
      <Helmet>
        <title>Onze Productcategorieën | Elegant Drapes</title>
        <meta
          name="description"
          content="Bekijk onze uitgebreide collectie van premium raambehandelingen, gordijnen, jaloezieën en meer. Vind de perfecte oplossing voor elke stijl en budget."
        />
      </Helmet>
      
      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Onze Productcategorieën
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Ontdek ons uitgebreide assortiment premium raambehandelingen en oplossingen voor elke ruimte in uw huis
            </p>
          </div>
          
          <CategoryGrid 
            categories={categories} 
            isLoading={isLoading} 
            error={categoriesError as Error}
          />
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;
