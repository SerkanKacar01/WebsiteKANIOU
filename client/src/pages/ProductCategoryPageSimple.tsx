import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Product categories mapping
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },
  { label: "Rolgordijnen", urlPath: "rolgordijnen" },
  { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen" },
  { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
  { label: "Houten shutters", urlPath: "houten-shutters" },
  { label: "Inzethorren", urlPath: "inzethorren" },
  { label: "Opzethorren", urlPath: "opzethorren" },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
  { label: "Plissé", urlPath: "plisse" },
  { label: "Duo plissé", urlPath: "duo-plisse" },
  { label: "Dakraam zonweringen", urlPath: "dakraam-zonweringen" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
  { label: "SQUID textile folie", urlPath: "squid-textile-foil" },
];

// Product information data
const productData: Record<string, any> = {
  "overgordijnen": {
    name: "Overgordijnen",
    description: "Luxueuze overgordijnen die stijl en functionaliteit perfect combineren",
    detailedDescription: "Onze overgordijnen zijn meer dan alleen raamdecoratie - ze zijn een statement van elegantie en comfort. Gemaakt van de fijnste stoffen en met oog voor detail afgewerkt, transformeren zij elke ruimte tot een warm en uitnodigend thuis.",
    applications: ["Woonkamer", "Slaapkamer", "Eetkamer", "Studeerkamer", "Hotelkamers"],
    benefits: ["Lichtregulatie", "Privacy", "Geluidsdemping", "Isolerend vermogen", "Decoratief element"],
    colors: ["Crème", "Beige", "Grijs", "Navy", "Bordeaux", "Groen", "Goud"],
    materials: ["Zijde", "Linnen", "Katoen", "Polyester", "Fluweel", "Jacquard"]
  },
  "vitrages": {
    name: "Vitrages",
    description: "Elegante vitrages voor privacy met behoud van natuurlijk licht",
    detailedDescription: "Vitrages bieden de perfecte balans tussen privacy en lichtdoorval. Onze collectie varieert van klassiek wit tot moderne patronen, allemaal ontworpen om uw ramen elegant aan te kleden zonder het daglicht te blokkeren.",
    applications: ["Woonkamer", "Keuken", "Badkamer", "Kantoor", "Praktijkruimtes"],
    benefits: ["Privacy overdag", "Lichtdoorlatend", "Decoratief", "Gemakkelijk onderhoud", "Diverse patronen"],
    colors: ["Wit", "Crème", "Lichtgrijs", "Beige", "Ecru"],
    materials: ["Katoen", "Polyester", "Linnen mix", "Voile", "Organza"]
  },
  "rolgordijnen": {
    name: "Rolgordijnen",
    description: "Praktische rolgordijnen voor optimale lichtregulatie",
    detailedDescription: "Rolgordijnen zijn een klassieke en veelzijdige keuze voor raamdecoratie. Ze bieden uitstekende lichtcontrole en privacy, terwijl ze een strakke, moderne uitstraling behouden.",
    applications: ["Slaapkamer", "Woonkamer", "Keuken", "Badkamer", "Kantoor", "Kinderkamer"],
    benefits: ["Eenvoudige bediening", "Lichtregulatie", "Privacy", "Compact design", "Onderhoudsarm"],
    colors: ["Wit", "Crème", "Beige", "Grijs", "Zwart", "Taupe", "Diverse kleuren"],
    materials: ["Polyester", "Blackout weefsel", "Zonwerend doek", "Brandvertragende stoffen"]
  }
};

const ProductCategoryPageSimple = () => {
  const params = useParams();
  const { category } = params;

  // Find the current category
  const currentCategory = productCategories.find(cat => cat.urlPath === category);
  
  if (!currentCategory) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Pagina niet gevonden</h1>
          <p className="text-gray-600 mb-8">Deze productcategorie bestaat niet.</p>
          <Link href="/producten">
            <Button>Terug naar producten</Button>
          </Link>
        </div>
      </Container>
    );
  }

  // Get product information or default
  const productInfo = productData[category || ""] || {
    name: currentCategory.label,
    description: `Ontdek onze ${currentCategory.label} collectie`,
    detailedDescription: `Professionele ${currentCategory.label} van hoge kwaliteit voor uw interieur.`,
    applications: ["Woonruimtes", "Kantoren", "Commerciële ruimtes"],
    benefits: ["Kwaliteit", "Duurzaamheid", "Professionele service", "Op maat"],
    colors: ["Wit", "Crème", "Grijs", "Beige"],
    materials: ["Hoogwaardige materialen"]
  };

  return (
    <>
      <Helmet>
        <title>{productInfo.name} - KANIOU</title>
        <meta
          name="description"
          content={`${productInfo.description} - Premium kwaliteit raamdecoratie van KANIOU`}
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/producten">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/producten/${category}`}>
                  {currentCategory.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2C3E50] to-[#34495E] py-24">
        <Container>
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {productInfo.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {productInfo.detailedDescription}
            </p>
            <Button
              size="lg"
              className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
            >
              Bekijk Collectie
            </Button>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-50">
        <Container>
          <h2 className="font-display text-3xl text-[#2C3E50] font-semibold text-center mb-12">
            Onze {productInfo.name} Collectie
          </h2>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Applications Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-4 flex items-center">
                <Check className="h-5 w-5 mr-2 text-[#d5c096]" />
                Toepassingen
              </h3>
              <ul className="space-y-2">
                {productInfo.applications.map((app: string, index: number) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-[#d5c096]" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-4 flex items-center">
                <Check className="h-5 w-5 mr-2 text-[#d5c096]" />
                Voordelen
              </h3>
              <ul className="space-y-2">
                {productInfo.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-[#d5c096]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors/Materials Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-display text-xl font-semibold text-[#2C3E50] mb-4 flex items-center">
                <Check className="h-5 w-5 mr-2 text-[#d5c096]" />
                {productInfo.colors ? "Beschikbare Kleuren" : "Materialen"}
              </h3>
              <ul className="space-y-2">
                {(productInfo.colors || productInfo.materials || []).map((item: string, index: number) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-[#d5c096]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-12 py-8 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Interesse in {productInfo.name}?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Neem contact met ons op voor een vrijblijvende offerte of kom langs in onze showroom voor persoonlijk advies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte">
                <Button
                  size="lg"
                  className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                >
                  Vraag Offerte Aan
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#d5c096] text-[#d5c096] hover:bg-[#d5c096] hover:text-white"
                >
                  Neem Contact Op
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductCategoryPageSimple;