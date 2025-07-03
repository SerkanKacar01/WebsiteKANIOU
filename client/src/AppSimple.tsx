import { Switch, Route } from "wouter";

// Import only essential components
import ProductCategoryPageMinimal from "@/pages/ProductCategoryPageMinimal";

const AppSimple = () => {
  return (
    <div className="min-h-screen">
      <Switch>
          <Route path="/">
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-900">KANIOU</h1>
                <p className="text-lg text-blue-700">Premium Raamdecoratie</p>
              </div>
            </div>
          </Route>
          <Route path="/producten/:category" component={ProductCategoryPageMinimal} />
          <Route path="/producten/overgordijnen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/vitrages" component={ProductCategoryPageMinimal} />
          <Route path="/producten/rolgordijnen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/duo-rolgordijnen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/textiel-lamellen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/kunststof-lamellen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/houten-jaloezieen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/kunststof-jaloezieen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/textiel-raamfolie" component={ProductCategoryPageMinimal} />
          <Route path="/producten/houten-shutters" component={ProductCategoryPageMinimal} />
          <Route path="/producten/inzethorren" component={ProductCategoryPageMinimal} />
          <Route path="/producten/opzethorren" component={ProductCategoryPageMinimal} />
          <Route path="/producten/plisse-hordeuren" component={ProductCategoryPageMinimal} />
          <Route path="/producten/plisse" component={ProductCategoryPageMinimal} />
          <Route path="/producten/duo-plisse" component={ProductCategoryPageMinimal} />
          <Route path="/producten/dakraam-zonweringen" component={ProductCategoryPageMinimal} />
          <Route path="/producten/gordijnrails" component={ProductCategoryPageMinimal} />
          <Route path="/producten/gordijnroedes" component={ProductCategoryPageMinimal} />
          <Route path="/producten/squid-textile-foil" component={ProductCategoryPageMinimal} />
          <Route>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Pagina niet gevonden</h1>
                <p>De pagina die u zoekt bestaat niet.</p>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
  );
};

export default AppSimple;