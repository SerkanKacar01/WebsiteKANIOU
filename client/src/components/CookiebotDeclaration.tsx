import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const CookiebotDeclaration = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Only load Cookiebot declaration on specific pages
    const shouldShowDeclaration = 
      location.includes('/privacy') || 
      location.includes('/cookie') || 
      location.includes('/beleid');

    if (shouldShowDeclaration) {
      // Check if script is already loaded
      const existingScript = document.getElementById('CookieDeclaration');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'CookieDeclaration';
        script.src = 'https://consent.cookiebot.com/277bd293-9336-4f15-ba87-4c760a56129b/cd.js';
        script.type = 'text/javascript';
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      // Remove script if not needed on current page
      const existingScript = document.getElementById('CookieDeclaration');
      if (existingScript) {
        existingScript.remove();
      }
    }

    // Cleanup on unmount
    return () => {
      const script = document.getElementById('CookieDeclaration');
      if (script) {
        script.remove();
      }
    };
  }, [location]);

  // Only render the container on pages that need the declaration
  const shouldShowDeclaration = 
    location.includes('/privacy') || 
    location.includes('/cookie') || 
    location.includes('/beleid');

  if (!shouldShowDeclaration) {
    return null;
  }

  return (
    <div id="cookiebot-declaration-container" className="my-8">
      {/* The actual declaration content will be injected here by Cookiebot script */}
    </div>
  );
};