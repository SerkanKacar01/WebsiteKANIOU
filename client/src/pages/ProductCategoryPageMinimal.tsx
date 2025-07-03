import { useParams, Link } from "wouter";

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

const ProductCategoryPageMinimal = () => {
  const params = useParams();
  const { category } = params;

  // Find the current category
  const currentCategory = productCategories.find(cat => cat.urlPath === category);
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Pagina niet gevonden</h1>
            <p className="text-gray-600 mb-8">Deze productcategorie bestaat niet.</p>
            <Link href="/producten">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Terug naar producten</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li>
                <Link href="/producten" className="text-gray-500 hover:text-gray-700">
                  Producten
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li>
                <span className="text-gray-900">{currentCategory.label}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {currentCategory.label}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Ontdek onze uitgebreide collectie {currentCategory.label.toLowerCase()} van premium kwaliteit.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg">
              Bekijk Collectie
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Onze {currentCategory.label} Collectie
          </h2>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Applications Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                ✓ Toepassingen
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-600">✓ Woonkamer</li>
                <li className="text-gray-600">✓ Slaapkamer</li>
                <li className="text-gray-600">✓ Kantoor</li>
                <li className="text-gray-600">✓ Badkamer</li>
              </ul>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                ✓ Voordelen
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-600">✓ Premium kwaliteit</li>
                <li className="text-gray-600">✓ Op maat gemaakt</li>
                <li className="text-gray-600">✓ Professionele montage</li>
                <li className="text-gray-600">✓ Uitstekende service</li>
              </ul>
            </div>

            {/* Colors Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                ✓ Beschikbare Kleuren
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-600">✓ Wit</li>
                <li className="text-gray-600">✓ Crème</li>
                <li className="text-gray-600">✓ Grijs</li>
                <li className="text-gray-600">✓ Beige</li>
              </ul>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Interesse in {currentCategory.label}?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Neem contact met ons op voor een vrijblijvende offerte of kom langs in onze showroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg">
                  Vraag Offerte Aan
                </button>
              </Link>
              <Link href="/contact">
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg">
                  Neem Contact Op
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPageMinimal;