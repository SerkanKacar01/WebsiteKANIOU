import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>Elegant Drapes | Premium Curtains & Window Treatments</title>
      <meta name="description" content="Elevate your home decor with Elegant Drapes' premium window treatments, including curtains, blinds, and drapes. Transform your space with our custom solutions." />
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
