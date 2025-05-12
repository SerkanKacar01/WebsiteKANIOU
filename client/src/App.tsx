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
      <Route path="/products/overgordijnen" component={ProductCategoryPage} />
      <Route path="/products/vitrages" component={ProductCategoryPage} />
      <Route path="/products/rolgordijnen" component={ProductCategoryPage} />
      <Route path="/products/duo-rolgordijnen" component={ProductCategoryPage} />
      <Route path="/products/textiel-lamellen" component={ProductCategoryPage} />
      <Route path="/products/kunststof-lamellen" component={ProductCategoryPage} />
      <Route path="/products/houten-jaloezieën" component={ProductCategoryPage} />
      <Route path="/products/kunststof-jaloezieën" component={ProductCategoryPage} />
      <Route path="/products/textiel-raamfolie" component={ProductCategoryPage} />
      <Route path="/products/houten-shutters" component={ProductCategoryPage} />
      <Route path="/products/inzethorren" component={ProductCategoryPage} />
      <Route path="/products/opzethorren" component={ProductCategoryPage} />
      <Route path="/products/plissé-hordeuren" component={ProductCategoryPage} />
      <Route path="/products/plissé" component={ProductCategoryPage} />
      <Route path="/products/duo-plissé" component={ProductCategoryPage} />
      <Route path="/products/duo-plissé-voor-dakramen" component={ProductCategoryPage} />
      <Route path="/products/dakraam-zonweringen" component={ProductCategoryPage} />
      <Route path="/products/gordijnrails" component={ProductCategoryPage} />
      <Route path="/products/gordijnroedes" component={ProductCategoryPage} />
      <Route path="/products/horren" component={ProductCategoryPage} />
      <Route path="/products/squid-textiel-folie" component={ProductCategoryPage} />
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
