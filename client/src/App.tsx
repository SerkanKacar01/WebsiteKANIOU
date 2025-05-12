import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetail from "@/pages/ProductDetail";
import ProductPage from "@/pages/ProductPage";
import ProductCategoryPage from "@/pages/ProductCategoryPage";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:id(\d+)" component={ProductDetail} />
      
      {/* Specific product pages */}
      <Route path="/products/milano-linen-curtains" component={ProductPage} />
      <Route path="/products/nordic-roller-blinds" component={ProductPage} />
      <Route path="/products/tuscany-roman-blinds" component={ProductPage} />
      <Route path="/products/aria-sheer-curtains" component={ProductPage} />
      
      {/* Product category pages with exact URLs as specified */}
      <Route path="/products/overgordijnen" component={ProductCategoryPage} />
      <Route path="/products/vitrages" component={ProductCategoryPage} />
      <Route path="/products/rolgordijnen" component={ProductCategoryPage} />
      <Route path="/products/duo-rolgordijnen" component={ProductCategoryPage} />
      <Route path="/products/textiel-lamellen" component={ProductCategoryPage} />
      <Route path="/products/kunststof-lamellen" component={ProductCategoryPage} />
      <Route path="/products/houten-jaloezieen" component={ProductCategoryPage} />
      <Route path="/products/kunststof-jaloezieen" component={ProductCategoryPage} />
      <Route path="/products/textiel-raamfolie" component={ProductCategoryPage} />
      <Route path="/products/houten-shutters" component={ProductCategoryPage} />
      <Route path="/products/inzethorren" component={ProductCategoryPage} />
      <Route path="/products/opzethorren" component={ProductCategoryPage} />
      <Route path="/products/plisse-hordeuren" component={ProductCategoryPage} />
      <Route path="/products/plisse" component={ProductCategoryPage} />
      <Route path="/products/duo-plisse" component={ProductCategoryPage} />
      <Route path="/products/duo-plisse-dakramen" component={ProductCategoryPage} />
      <Route path="/products/dakraam-zonwering" component={ProductCategoryPage} />
      <Route path="/products/gordijnrails" component={ProductCategoryPage} />
      <Route path="/products/gordijnroedes" component={ProductCategoryPage} />
      <Route path="/products/horren" component={ProductCategoryPage} />
      <Route path="/products/squid" component={ProductCategoryPage} />
      
      <Route path="/products/:category" component={ProductsPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/quote" component={QuotePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
