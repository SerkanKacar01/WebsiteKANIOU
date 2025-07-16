import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";

// Initialize the React application with error handling
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
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
          <App />
        </LanguageProvider>
      </HelmetProvider>
    );
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Failed to mount React app:", error);
    // Fallback: Show basic content
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h1>KANIOU</h1>
        <p>Loading application...</p>
        <p style="color: red; font-size: 12px;">Error: ${errorMessage}</p>
      </div>
    `;
  }
} else {
  console.error("Root element not found - creating fallback");
  // Create fallback content directly in body
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>KANIOU</h1>
      <p>Application loading error - root element not found</p>
    </div>
  `;
}
