import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Star, Eye, Ruler, Palette, MessageCircle, FileText, Image } from "lucide-react";

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
        { name: "Klemgordijn", price: "€29,95", variant: "Standaard", popular: true },
        { name: "Magnetisch Vliegengordijn", price: "€39,95", variant: "Magnetisch", popular: false },
        { name: "Luxe Klemgordijn", price: "€49,95", variant: "Premium", popular: false }
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
        { name: "Vitrage Gordijn", price: "€24,95", variant: "Wit", popular: false },
        { name: "Verduisterende Gordijnen", price: "€59,95", variant: "Premium", popular: true },
        { name: "Transparante Vitrages", price: "€34,95", variant: "Basic", popular: false }
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
        { name: "Houten Jaloezie", price: "€79,95", variant: "Hout", popular: false },
        { name: "Aluminium Jaloezie", price: "€49,95", variant: "Aluminium", popular: true },
        { name: "Verticale Jaloezie", price: "€69,95", variant: "Verticaal", popular: false }
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
        { name: "Plissé", price: "€45,95", variant: "Transparant", popular: false },
        { name: "Plissé", price: "€65,95", variant: "Verduisterend", popular: true },
        { name: "Plissé", price: "€55,95", variant: "Isolerend", popular: false }
      ],
      href: "/products/pleated-curtains",
      badge: "Energie-efficiënt"
    }
  ];

  const assistanceFeatures = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Gratis Advies",
      description: "Persoonlijk adviesgesprek met onze experts"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Gratis Offerte",
      description: "Op maat gemaakte offerte binnen 24 uur"
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Product Galerij",
      description: "Inspiratie opdoen met onze uitgebreide galerij"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Container>
        {/* Hero Section - Shopping Focused */}
        <div className="py-8 md:py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop Premium Raamdecoratie
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover our full range of custom-made window treatments and fly screens.
          </p>
          <div className="flex justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Assistance Section - Moved up */}
        <div className="bg-primary/5 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">Hulp nodig bij uw keuze?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-center text-sm md:text-base">
            Onze experts helpen u graag bij het vinden van de perfecte raamdecoratie.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {assistanceFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#D9C29C]/10 rounded-full mb-3 text-[#D9C29C]">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white w-full sm:w-auto">
                Gratis Advies
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" className="bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white w-full sm:w-auto">
                Offerte
              </Button>
            </Link>
            <Link href="/gallerij">
              <Button size="lg" className="bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white w-full sm:w-auto">
                Galerij
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Onze Productcategorieën</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {productCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  {category.badge && (
                    <Badge className="absolute top-4 left-4 bg-[#D9C29C] text-white">
                      {category.badge}
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg md:text-xl">
                    {category.title}
                    <Star className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                  <p className="text-sm text-gray-600">{category.subtitle}</p>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-700 mb-4 text-sm md:text-base">{category.description}</p>
                  <div className="space-y-3">
                    {category.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-b-0">
                        <span className={product.popular ? "font-medium text-[#D9C29C]" : "text-gray-600"}>
                          {product.name}
                        </span>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">{product.price}</span>
                          <span className="text-xs text-gray-500 ml-1">({product.variant})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href={category.href} className="w-full">
                    <Button className="w-full bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white">
                      Shop Nu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

      </Container>
      
      {/* Footer Separator */}
      <div className="border-t border-gray-200 mt-12"></div>
    </div>
  );
};

export default ProductsPage;