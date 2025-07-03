import express, { type Express } from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
import { productPageHTML, productCategories } from "./static-pages";

const app: Express = express();

// Parse JSON requests
app.use(express.json());

// Priority: Static HTML Product Pages - Immediate Solution for Product Visibility
productCategories.forEach(category => {
  app.get(`/producten/${category.urlPath}`, (req, res) => {
    console.log(`✅ Serving static product page for: ${category.label}`);
    res.send(productPageHTML(category.label));
  });
});

// Register all other routes
const server = await registerRoutes(app);

// Setup Vite for non-product pages
await setupVite(app, server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`🎯 Product pages available at:`);
  productCategories.forEach(category => {
    console.log(`   - http://localhost:${PORT}/producten/${category.urlPath}`);
  });
});

export default app;