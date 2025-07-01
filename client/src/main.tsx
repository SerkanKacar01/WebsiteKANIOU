import { createRoot } from "react-dom/client";
import TestApp from "./TestApp";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";

// Initialize the React application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <HelmetProvider>
      <Helmet>
        <title>KANIOU | Premium Raamdecoratie & Window Treatments</title>
        <meta name="description" content="Premium raamdecoratie op maat bij KANIOU. Ontdek onze collectie rolgordijnen, plissé gordijnen, jaloezieen en meer. Gratis advies en montage." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Helmet>
      <LanguageProvider>
        <TestApp />
      </LanguageProvider>
    </HelmetProvider>
  );
} else {
  console.error("Root element not found");
}
