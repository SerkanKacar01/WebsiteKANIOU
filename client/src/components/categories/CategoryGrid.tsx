import { Category } from "@shared/schema";
import { Link } from "wouter";

interface CategoryGridProps {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

// List of official product categories - Now defined directly in ProductsPage.tsx 
const officialCategoriesList = [
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

// Map category names to URL paths based on the official product list
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

// Map Dutch display names for each category
const dutchNameMapping: Record<string, string> = {
  "overgordijnen": "Overgordijnen",
  "vitrages": "Vitrages",
  "rolgordijnen": "Rolgordijnen",
  "duo-rolgordijnen": "Duo Rolgordijnen",
  "textiel-lamellen": "Textiel Lamellen",
  "kunststof-lamellen": "Kunststof Lamellen",
  "houten-jaloezieen": "Houten Jaloezieën",
  "kunststof-jaloezieen": "Kunststof Jaloezieën",
  "textiel-raamfolie": "Textiel Raamfolie",
  "houten-shutters": "Houten Shutters",
  "inzethorren": "Inzethorren",
  "opzethorren": "Opzethorren",
  "plisse-hordeuren": "Plissé Hordeuren",
  "plisse": "Plissé",
  "duo-plisse": "Duo Plissé",
  "duo-plisse-dakramen": "Duo Plissé Dakramen",
  "dakraam-zonwering": "Dakraam Zonwering",
  "gordijnrails": "Gordijnrails",
  "gordijnroedes": "Gordijnroedes",
  "squid": "SQUID"
};

// Map the official Dutch names to URL-friendly paths
const officialCategoryUrlMapping: Record<string, string> = {
  "Overgordijnen": "overgordijnen",
  "Vitrages": "vitrages",
  "Rolgordijnen": "rolgordijnen",
  "Duo rolgordijnen": "duo-rolgordijnen",
  "Textiel lamellen": "textiel-lamellen",
  "Kunststof lamellen": "kunststof-lamellen",
  "Houten jaloezieën": "houten-jaloezieen",
  "Kunststof jaloezieën": "kunststof-jaloezieen",
  "Textiel raamfolie": "textiel-raamfolie",
  "Houten shutters": "houten-shutters",
  "Inzethorren": "inzethorren",
  "Opzethorren": "opzethorren",
  "Plissé hordeuren": "plisse-hordeuren",
  "Plissé": "plisse",
  "Duo plissé": "duo-plisse",
  "Duo plissé dakramen": "duo-plisse-dakramen",
  "Dakraam zonwering": "dakraam-zonwering",
  "Gordijnrails": "gordijnrails",
  "Gordijnroedes": "gordijnroedes",
  "SQUID": "squid"
};

const getURLPath = (categoryName: string): string => {
  // First try to use the official mapping for Dutch category names
  if (officialCategoryUrlMapping[categoryName]) {
    return officialCategoryUrlMapping[categoryName];
  }
  
  // If not found in official mapping, try the existing English-to-Dutch mapping 
  // (for backward compatibility with existing English category names)
  if (categoryMapping[categoryName]) {
    return categoryMapping[categoryName];
  }
  
  // Fall back to a slugified version of the category name
  return categoryName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
};

// Component for each category card
const CategoryCard = ({ category }: { category: Category }) => {
  // Get the Dutch name for display based on the URL path
  const getDutchName = (englishName: string): string => {
    // Get the URL path for this category
    const urlPath = getURLPath(englishName);
    
    // Return the corresponding Dutch name from the mapping
    return dutchNameMapping[urlPath] || englishName;
  };

  const dutchName = getDutchName(category.name);
  
  return (
    <div className="group relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
        <h3 className="font-display text-xl sm:text-2xl text-white font-medium mb-1 sm:mb-2">
          {dutchName}
        </h3>
        <p className="font-body text-white text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {category.description}
        </p>
        <Link href={`/products/${getURLPath(category.name)}`} className="font-body inline-block text-white text-sm border-b border-white pb-1 transition-all group-hover:border-secondary group-hover:text-secondary">
          Ontdek Onze Collectie
        </Link>
      </div>
    </div>
  );
};

const CategoryGrid = ({ categories, isLoading, error }: CategoryGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 sm:h-72 md:h-80 rounded-lg bg-neutral-200 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        Er is een fout opgetreden bij het laden van de categorieën.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;