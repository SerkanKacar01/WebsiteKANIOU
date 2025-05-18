import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, ChevronsUp, ChevronsDown, Check, ArrowRight } from "lucide-react";
import { Category } from "@shared/schema";

// Product categories
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen", basePrice: 35 },
  { label: "Vitrages", urlPath: "vitrages", basePrice: 25 },
  { label: "Rolgordijnen", urlPath: "rolgordijnen", basePrice: 40 },
  { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen", basePrice: 55 },
  { label: "Textiel lamellen", urlPath: "textiel-lamellen", basePrice: 45 },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen", basePrice: 38 },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen", basePrice: 52 },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen", basePrice: 42 },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie", basePrice: 30 },
  { label: "Houten shutters", urlPath: "houten-shutters", basePrice: 65 },
  { label: "Inzethorren", urlPath: "inzethorren", basePrice: 45 },
  { label: "Opzethorren", urlPath: "opzethorren", basePrice: 40 },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren", basePrice: 60 },
  { label: "Plissé", urlPath: "plisse", basePrice: 48 },
  { label: "Duo plissé", urlPath: "duo-plisse", basePrice: 58 },
  { label: "Dakraam zonweringen (Fakro, Velux)", urlPath: "dakraam-zonwering", basePrice: 70 },
  { label: "Gordijnrails", urlPath: "gordijnrails", basePrice: 20 },
  { label: "Gordijnroedes", urlPath: "gordijnroedes", basePrice: 25 },
  { label: "Horren", urlPath: "horren", basePrice: 38 },
  { label: "SQUID textiel folie", urlPath: "squid", basePrice: 32 },
];

// Optional features
const optionalFeatures = [
  { id: "motorized", label: "Gemotoriseerd", price: 120 },
  { id: "blackout", label: "Verduisterend", price: 25 },
  { id: "thermal", label: "Thermisch isolerend", price: 30 },
  { id: "premium_fabric", label: "Premium stof", price: 40 },
  { id: "custom_color", label: "Kleur op maat", price: 15 },
  { id: "remote_control", label: "Afstandsbediening", price: 35 },
];

// Calculator form values interface
interface CalculatorFormValues {
  category: string;
  width: number;
  height: number;
  features: string[];
}

const PriceCalculatorPage = () => {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Form state
  const [formValues, setFormValues] = useState<CalculatorFormValues>({
    category: "",
    width: 100,
    height: 100,
    features: [],
  });

  // Calculation result
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Get API categories for reference
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "width" || name === "height" ? Number(value) : value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormValues({
      ...formValues,
      category: value,
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormValues((prev) => {
      const newFeatures = prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId];

      return {
        ...prev,
        features: newFeatures,
      };
    });
  };

  const calculatePrice = () => {
    if (!formValues.category || formValues.width <= 0 || formValues.height <= 0) {
      toast({
        title: "Ontbrekende gegevens",
        description: "Vul alle verplichte velden in om een schatting te krijgen.",
        variant: "destructive",
      });
      return;
    }

    // Find base price for selected category
    const selectedCategory = productCategories.find(
      (cat) => cat.urlPath === formValues.category
    );

    if (!selectedCategory) {
      toast({
        title: "Categorie fout",
        description: "Selecteer een geldige productcategorie.",
        variant: "destructive",
      });
      return;
    }

    // Calculate area in square meters (convert from cm)
    const area = (formValues.width / 100) * (formValues.height / 100);
    
    // Base calculation (minimum 0.5 sq meters)
    const effectiveArea = Math.max(area, 0.5);
    let totalPrice = selectedCategory.basePrice * effectiveArea;

    // Add optional features
    formValues.features.forEach((featureId) => {
      const feature = optionalFeatures.find((f) => f.id === featureId);
      if (feature) {
        totalPrice += feature.price;
      }
    });

    // Set the calculated price (round to nearest whole number)
    setCalculatedPrice(Math.round(totalPrice));
    setShowResult(true);
  };

  return (
    <>
      <Helmet>
        <title>Calculate Price Estimate | Veneta Zonwering</title>
        <meta
          name="description"
          content="Get an instant price estimate for custom window treatments based on your measurements and preferences."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Bereken een richtprijs</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Bereken een richtprijs
            </h1>
            <p className="font-body text-lg opacity-90 mb-0">
              Krijg een schatting van de kosten voor uw op maat gemaakte raamdecoratie
              op basis van uw afmetingen en voorkeuren.
            </p>
          </div>
        </Container>
      </div>

      {/* Calculator Form */}
      <div className="py-12 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="border-neutral-200 shadow-sm">
              <CardHeader>
                <CardTitle>Vul uw specificaties in</CardTitle>
                <CardDescription>
                  Geef de afmetingen en voorkeuren op voor uw raamdecoratie om een prijsindicatie te krijgen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Productcategorie</Label>
                    <Select
                      value={formValues.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecteer een producttype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Producten</SelectLabel>
                          {productCategories.map((category) => (
                            <SelectItem key={category.urlPath} value={category.urlPath}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Width */}
                  <div className="space-y-2">
                    <Label htmlFor="width">Breedte (cm)</Label>
                    <div className="flex items-center">
                      <Input
                        id="width"
                        name="width"
                        type="number"
                        min="10"
                        max="500"
                        value={formValues.width}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                      <div className="flex flex-col ml-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setFormValues(prev => ({...prev, width: prev.width + 1}))}
                        >
                          <ChevronsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 mt-1"
                          onClick={() => setFormValues(prev => ({...prev, width: Math.max(10, prev.width - 1)}))}
                        >
                          <ChevronsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="space-y-2">
                    <Label htmlFor="height">Hoogte (cm)</Label>
                    <div className="flex items-center">
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        min="10"
                        max="500"
                        value={formValues.height}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                      <div className="flex flex-col ml-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setFormValues(prev => ({...prev, height: prev.height + 1}))}
                        >
                          <ChevronsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 mt-1"
                          onClick={() => setFormValues(prev => ({...prev, height: Math.max(10, prev.height - 1)}))}
                        >
                          <ChevronsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Optional Features */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>Optionele kenmerken</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {optionalFeatures.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature.id}
                            checked={formValues.features.includes(feature.id)}
                            onCheckedChange={() => handleFeatureToggle(feature.id)}
                          />
                          <Label htmlFor={feature.id} className="cursor-pointer text-sm">
                            {feature.label} (+€{feature.price})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  type="button"
                  onClick={calculatePrice}
                  className="bg-[#d5c096] hover:bg-[#c4b183] text-white px-8 py-3"
                >
                  Bereken richtprijs
                </Button>
              </CardFooter>
            </Card>

            {/* Price Result */}
            {showResult && calculatedPrice !== null && (
              <Card className="border-neutral-200 shadow-sm mt-8 bg-neutral-50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center">Uw prijsindicatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Geschatte prijs:</p>
                      <p className="text-4xl font-bold text-primary">€{calculatedPrice}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Deze prijs is een indicatie en kan variëren afhankelijk van specifieke vereisten.
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/quote">
                        <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                          Vrijblijvende offerte aanvragen
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                        >
                          Terug naar homepagina
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default PriceCalculatorPage;