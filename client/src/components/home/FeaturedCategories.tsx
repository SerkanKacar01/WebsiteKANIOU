import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const CategoryCard = ({ category }: { category: Category }) => {
  const { t } = useLanguage();
  
  return (
    <div className="group relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
        <h3 className="font-display text-xl sm:text-2xl text-white font-medium mb-1 sm:mb-2">
          {category.name}
        </h3>
        <p className="font-body text-white text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{category.description}</p>
        <Link href={`/products/${category.id}`}>
          <a className="font-body inline-block text-white text-xs sm:text-sm border-b border-white pb-1 transition-all group-hover:border-secondary group-hover:text-secondary">
            {t('hero.cta')}
          </a>
        </Link>
      </div>
    </div>
  );
};

const FeaturedCategories = () => {
  const { t } = useLanguage();
  const { data: categories = [], isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-neutral-100">
      <Container>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-semibold mb-2 sm:mb-4">
            Browse by Category
          </h2>
          <p className="font-body text-sm sm:text-base text-text-medium max-w-2xl mx-auto px-2">
            Find the perfect window treatment by selecting a product category below
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 sm:h-72 md:h-80 rounded-lg bg-neutral-200 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {t('common.error')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {categories.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedCategories;
