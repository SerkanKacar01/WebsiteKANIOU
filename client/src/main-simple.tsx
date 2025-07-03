import { createRoot } from "react-dom/client";
import "./index.css";

// Minimal working React app to get product pages visible immediately
const SimpleApp = () => {
  const path = window.location.pathname;
  
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

  // Check if current path is a product page
  const currentCategory = productCategories.find(cat => 
    path === `/producten/${cat.urlPath}`
  );

  if (currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <a href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <a href="/producten" className="text-gray-500 hover:text-gray-700">
                    Producten
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">{currentCategory.label}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {currentCategory.label}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                Ontdek onze uitgebreide collectie {currentCategory.label.toLowerCase()} van premium kwaliteit. 
                Professioneel advies, op maat gemaakt en vakkundige montage.
              </p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 md:px-8 py-3 rounded-lg transition-colors">
                Bekijk Collectie
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              Onze {currentCategory.label} Collectie
            </h2>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {/* Applications Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Toepassingen
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Woonkamer
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Slaapkamer
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Kantoor
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Badkamer
                  </li>
                </ul>
              </div>

              {/* Benefits Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Voordelen
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Premium kwaliteit
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Op maat gemaakt
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Professionele montage
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Uitstekende service
                  </li>
                </ul>
              </div>

              {/* Features Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Kenmerken
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Diverse kleuren
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Hoogwaardige materialen
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Eenvoudige bediening
                  </li>
                  <li className="text-gray-600 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Onderhoudsarm
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Interesse in {currentCategory.label}?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Neem contact met ons op voor een vrijblijvende offerte of kom langs in onze showroom voor persoonlijk advies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/offerte" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-3 rounded-lg transition-colors"
                >
                  Vraag Offerte Aan
                </a>
                <a 
                  href="/contact" 
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 md:px-8 py-3 rounded-lg transition-colors"
                >
                  Neem Contact Op
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home page or other pages
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">KANIOU</h1>
        <p className="text-lg text-gray-600 mb-8">
          Premium Raamdecoratie & Window Treatments
        </p>
        <div className="space-y-4">
          <a 
            href="/producten" 
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Bekijk Onze Producten
          </a>
          <a 
            href="/contact" 
            className="block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

// Initialize the simple React application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<SimpleApp />);
} else {
  console.error("Root element not found");
}