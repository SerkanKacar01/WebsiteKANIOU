import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Category, GalleryItem } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import CategoryGrid from "@/components/categories/CategoryGrid";

const ProductsPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();
  
  // Fetch all categories for the browse collection page
  const { 
    data: categories = [], 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch gallery items to use as fallback for categories without images
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  // Enhance categories with gallery image for those without an image
  const enhancedCategories = categories.map(category => {
    // Clone the category
    const enhancedCategory = { ...category };
    
    // Replace the imageUrl with a gallery image if needed
    if (!enhancedCategory.imageUrl || enhancedCategory.imageUrl.trim() === '') {
      // Find a random gallery item to use for the category
      const randomIndex = category.id % galleryItems.length;
      const galleryItem = galleryItems[randomIndex] || galleryItems[0];
      
      if (galleryItem) {
        enhancedCategory.imageUrl = galleryItem.imageUrl;
      }
    }
    
    return enhancedCategory;
  });

  // Determine if we're in a loading state
  const isLoading = categoriesLoading || galleryLoading;

  return (
    <>
      <Helmet>
        <title>Browse Collection | Elegant Drapes</title>
        <meta
          name="description"
          content="Browse our extensive collection of premium window treatments including curtains, blinds, shades, and more. Find the perfect solution for any style and budget."
        />
      </Helmet>
      
      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Browse Our Collection
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Discover our extensive range of premium window treatments and solutions for every room in your home
            </p>
          </div>
          
          <CategoryGrid 
            categories={enhancedCategories} 
            isLoading={isLoading} 
            error={categoriesError as Error}
          />
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;
