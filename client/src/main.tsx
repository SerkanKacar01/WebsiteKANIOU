import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <HelmetProvider>
        <Helmet>
          <title>Elegant Drapes | Premium Gordijnen & Raambehandelingen</title>
          <meta name="description" content="Verfraai uw interieur met Elegant Drapes' premium raambehandelingen, waaronder gordijnen, jaloezieën en overgordijnen. Transformeer uw ruimte met onze maatwerkoplossingen." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Helmet>
        <App />
      </HelmetProvider>
    </LanguageProvider>
  </QueryClientProvider>
);
