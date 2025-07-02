import { Link } from "wouter";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";

// Product categories with their display labels and URL paths (same as in ProductCategoryPage)
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },

  { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
  { label: "Houten shutters", urlPath: "houten-shutters" },
  { label: "Fly Screens", urlPath: "fly-screens" },
  { label: "Inzethorren", urlPath: "inzethorren" },
  { label: "Opzethorren", urlPath: "opzethorren" },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
  { label: "Plissé", urlPath: "plisse" },
  { label: "Duo plissé", urlPath: "duo-plisse" },
  { label: "Dakraam zonweringen (Fakro, Velux)", urlPath: "dakraam-zonwering" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
  { label: "Horren", urlPath: "horren" },

];

const ProductButton = ({ category }: { category: { label: string; urlPath: string } }) => {
  return (
    <Link href={`/products/${category.urlPath}`}>
      <div className="bg-white rounded-lg shadow-md p-6 h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] border border-neutral-200">
        <h3 className="font-display text-xl font-medium text-primary mb-2">
          {category.label}
        </h3>
        <p className="text-sm text-text-medium mb-4">
          Bekijk collectie
        </p>
        <div className="mt-auto text-primary text-sm font-medium">
          Meer info →
        </div>
      </div>
    </Link>
  );
};

const ProductButtons = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Ontdek Onze Collectie
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Bekijk onze uitgebreide collectie raamdecoraties en vind de perfecte oplossing voor uw woning of kantoor.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {productCategories.map((category) => (
            <ProductButton key={category.urlPath} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductButtons;