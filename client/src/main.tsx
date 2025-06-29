import { createRoot } from "react-dom/client";
import TestApp from "./TestApp";

// Initialize the React application - simplified for debugging
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<TestApp />);
} else {
  console.error("Root element not found");
}
