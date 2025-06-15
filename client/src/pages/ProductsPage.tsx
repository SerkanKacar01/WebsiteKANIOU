import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Star, Eye, Ruler, Palette } from "lucide-react";

const ProductsPage = () => {
  const { t } = useLanguage();

  // Product categories data
  const productCategories = [
    {
      id: 1,
      title: "Vliegengordijnen",
      subtitle: "Klemgordijnen & Magnetische gordijnen",
      description: "Premium vliegengordijnen die perfect passen bij elke deuropening. Eenvoudig te installeren zonder boren.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      products: [
        { name: "Klemgordijn Standaard", price: "€29,95", popular: true },
        { name: "Magnetisch Vliegengordijn", price: "€39,95", popular: false },
        { name: "Luxe Klemgordijn", price: "€49,95", popular: false }
      ],
      href: "/products/fly-screens",
      badge: "Bestseller"
    },
    {
      id: 2,
      title: "Raamdecoratie",
      subtitle: "Gordijnen & Vitragegordunen",
      description: "Elegante raamdecoratie voor elke kamer. Van moderne tot klassieke stijlen.",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
      products: [
        { name: "Vitrage Gordijn Wit", price: "€24,95", popular: false },
        { name: "Verduisterende Gordijnen", price: "€59,95", popular: true },
        { name: "Transparante Vitrages", price: "€34,95", popular: false }
      ],
      href: "/products/window-curtains",
      badge: "Nieuw"
    },
    {
      id: 3,
      title: "Jalouzieën",
      subtitle: "Horizontale & Verticale jalouzieën",
      description: "Stijlvolle jalouzieën voor optimale lichtregeling en privacy. Op maat gemaakt.",
      image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
      products: [
        { name: "Houten Jaloezie", price: "€79,95", popular: false },
        { name: "Aluminium Jaloezie", price: "€49,95", popular: true },
        { name: "Verticale Jaloezie", price: "€69,95", popular: false }
      ],
      href: "/products/blinds",
      badge: "Op maat"
    },
    {
      id: 4,
      title: "Plissé Gordijnen",
      subtitle: "Moderne plissé oplossingen",
      description: "Veelzijdige plissé gordijnen die perfect combineren met elke interieurstijl.",
      image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=400&h=300&fit=crop",
      products: [
        { name: "Plissé Transparant", price: "€45,95", popular: false },
        { name: "Plissé Verduisterend", price: "€65,95", popular: true },
        { name: "Plissé Isolerend", price: "€55,95", popular: false }
      ],
      href: "/products/pleated-curtains",
      badge: "Energie-efficiënt"
    }
  ];

  const features = [
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Op Maat Gemaakt",
      description: "Alle producten worden exact op uw maten geproduceerd"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Virtuele Preview",
      description: "Bekijk hoe uw raamdecoratie eruitziet voordat u bestelt"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Kleuradvies",
      description: "Gratis kleuradvies passend bij uw interieur"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Container>
        {/* Hero Section */}
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Raamdecoratie
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ontdek onze collectie van hoogwaardige vliegengordijnen, gordijnen en jalouzieën. 
            Allemaal op maat gemaakt voor uw perfecte interieur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Gratis Offerte Aanvragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/gallerij">
              <Button size="lg" variant="outline">
                Bekijk Galerij
                <Eye className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Onze Productcategorieën</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {productCategories.map((category) => (
              <Card key={category.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                {/* Fixed Height Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {category.badge && (
                    <Badge className="absolute top-4 left-4 bg-[#d5c096] text-white shadow-lg">
                      {category.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>

                {/* Content Section - Flex Grow */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Product Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  
                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {category.description}
                  </p>

                  {/* Prices Section */}
                  <div className="mb-6 flex-grow">
                    <p className="text-sm font-medium text-gray-700 mb-3">Prijzen vanaf:</p>
                    <div className="space-y-2">
                      {category.products.slice(0, 3).map((product, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {product.name}
                          </span>
                          <span className="text-sm font-semibold text-[#d5c096]">
                            {product.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button - Always at Bottom */}
                  <div className="mt-auto">
                    <Link href={category.href} className="w-full">
                      <Button className="w-full bg-[#d5c096] hover:bg-[#c4b183] text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                        Bekijk producten
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Hulp nodig bij uw keuze?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Onze experts helpen u graag bij het vinden van de perfecte raamdecoratie. 
            Vraag een gratis adviesgesprek aan of laat u inspireren door onze galerij.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                Gratis Adviesgesprek
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline">
                Offerte op Maat
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;