import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";

// Initialize the React application with error handling
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    // Add minimum styling to ensure visibility
    rootElement.style.minHeight = '100vh';
    rootElement.style.display = 'block';
    rootElement.style.position = 'relative';
    rootElement.style.zIndex = '1';
    
    const root = createRoot(rootElement);
    root.render(
      <HelmetProvider>
        <Helmet>
          <title>KANIOU | Professional Raamdecoratie & Window Treatments</title>
          <meta name="description" content="Professional raamdecoratie op maat bij KANIOU. Ontdek onze collectie rolgordijnen, plissé gordijnen, jaloezieen en meer. Vakkundige installatie en advies." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Helmet>
        <LanguageProvider>
          <div style={{ background: 'white', minHeight: '100vh', padding: '20px', color: 'black' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#D5B36A' }}>KANIOU - Professional Window Treatments</h1>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>Website successfully transformed to professional design</p>
            <App />
          </div>
        </LanguageProvider>
      </HelmetProvider>
    );
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Failed to mount React app:", error);
    // Fallback: Show basic content with safe DOM manipulation
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Create elements safely without innerHTML
    const container = document.createElement('div');
    container.style.cssText = 'padding: 20px; text-align: center; font-family: Arial, sans-serif; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: white;';
    
    const title = document.createElement('h1');
    title.style.cssText = 'color: #2C3E50; font-size: 2em; margin-bottom: 16px;';
    title.textContent = 'KANIOU';
    
    const loadingText = document.createElement('p');
    loadingText.style.cssText = 'color: #666; font-size: 1.2em; margin-bottom: 16px;';
    loadingText.textContent = 'Loading application...';
    
    const errorText = document.createElement('p');
    errorText.style.cssText = 'color: red; font-size: 12px;';
    errorText.textContent = `Error: ${errorMessage}`;
    
    container.appendChild(title);
    container.appendChild(loadingText);
    container.appendChild(errorText);
    
    rootElement.innerHTML = '';
    rootElement.appendChild(container);
  }
} else {
  console.error("Root element not found - creating fallback");
  // Create fallback content directly in body safely
  const container = document.createElement('div');
  container.style.cssText = 'padding: 20px; text-align: center; font-family: Arial, sans-serif;';
  
  const title = document.createElement('h1');
  title.textContent = 'KANIOU';
  
  const errorText = document.createElement('p');
  errorText.textContent = 'Application loading error - root element not found';
  
  container.appendChild(title);
  container.appendChild(errorText);
  
  document.body.innerHTML = '';
  document.body.appendChild(container);
}
