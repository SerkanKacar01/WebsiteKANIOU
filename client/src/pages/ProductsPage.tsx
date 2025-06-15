import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { ArrowRight, Star, Eye, Ruler, Palette, Filter, SortAsc } from "lucide-react";

const ProductsPage = () => {
  const { t } = useLanguage();

  // Product categories organized by main groups
  const productCategories = {
    jaloezien: [
      {
        id: 1,
        title: "Houten Jaloezieën",
        subtitle: "Natuurlijke warmte & elegantie",
        description: "Tijdloze houten jaloezieën die warmte en stijl toevoegen aan elke ruimte.",
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
        products: [
          { name: "Houten Jaloezie 25mm", price: "€79,95", popular: true },
          { name: "Houten Jaloezie 35mm", price: "€89,95", popular: false },
          { name: "Houten Jaloezie 50mm", price: "€99,95", popular: false }
        ],
        href: "/products/houten-jaloezieen",
        badge: "Bestseller"
      },
      {
        id: 2,
        title: "Kunststof Jaloezieën",
        subtitle: "Praktisch & vochtbestendig",
        description: "Onderhoudsvriendelijke kunststof jaloezieën, perfect voor vochtige ruimtes.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        products: [
          { name: "Kunststof Jaloezie 25mm", price: "€49,95", popular: true },
          { name: "Kunststof Jaloezie 35mm", price: "€59,95", popular: false },
          { name: "Verticale Jaloezie", price: "€69,95", popular: false }
        ],
        href: "/products/kunststof-jaloezieen",
        badge: "Vochtbestendig"
      }
    ],
    gordijnen: [
      {
        id: 3,
        title: "Overgordijnen",
        subtitle: "Luxe & verduisterend",
        description: "Elegante overgordijnen voor optimale privacy en lichtcontrole.",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
        products: [
          { name: "Verduisterende Gordijnen", price: "€89,95", popular: true },
          { name: "Semi-transparante Gordijnen", price: "€69,95", popular: false },
          { name: "Luxe Overgordijnen", price: "€129,95", popular: false }
        ],
        href: "/products/overgordijnen",
        badge: "Luxe"
      },
      {
        id: 4,
        title: "Vitrages",
        subtitle: "Licht & privacy",
        description: "Subtiele vitrages die licht doorlaten terwijl ze privacy bieden.",
        image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=400&h=300&fit=crop",
        products: [
          { name: "Vitrage Gordijn Wit", price: "€34,95", popular: true },
          { name: "Vitrage Gordijn Crème", price: "€34,95", popular: false },
          { name: "Vitrage met Patroon", price: "€44,95", popular: false }
        ],
        href: "/products/vitrages",
        badge: "Lichtdoorlatend"
      }
    ],
    plisses: [
      {
        id: 5,
        title: "Plissé Gordijnen",
        subtitle: "Modern & veelzijdig",
        description: "Stijlvolle plissé gordijnen die perfect passen in moderne interieurs.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
        products: [
          { name: "Plissé Transparant", price: "€45,95", popular: false },
          { name: "Plissé Verduisterend", price: "€65,95", popular: true },
          { name: "Plissé Isolerend", price: "€55,95", popular: false }
        ],
        href: "/products/plisse",
        badge: "Energie-efficiënt"
      },
      {
        id: 6,
        title: "Opzethorren",
        subtitle: "Insectenwering & ventilatie",
        description: "Effectieve insectenwering zonder in te boeten op ventilatie en zicht.",
        image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop",
        products: [
          { name: "Opzethor Standaard", price: "€79,95", popular: true },
          { name: "Opzethor Deluxe", price: "€99,95", popular: false },
          { name: "Opzethor XXL", price: "€119,95", popular: false }
        ],
        href: "/products/opzethorren",
        badge: "Nieuw"
      }
    ],
    accessoires: [
      {
        id: 7,
        title: "Gordijnroedes",
        subtitle: "Stijlvolle ophangingen",
        description: "Hoogwaardige gordijnroedes in verschillende stijlen en materialen.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        products: [
          { name: "Aluminium Roede", price: "€29,95", popular: true },
          { name: "Houten Roede", price: "€49,95", popular: false },
          { name: "RVS Roede", price: "€39,95", popular: false }
        ],
        href: "/products/gordijnroedes",
        badge: "Compleet"
      },
      {
        id: 8,
        title: "Gordijnrails",
        subtitle: "Functionele railsystemen",
        description: "Professionele railsystemen voor een strakke en moderne uitstraling.",
        image: "https://images.unsplash.com/photo-1600210491964-1f36470bc2a7?w=400&h=300&fit=crop",
        products: [
          { name: "Enkele Rail", price: "€24,95", popular: true },
          { name: "Dubbele Rail", price: "€34,95", popular: false },
          { name: "Elektrische Rail", price: "€149,95", popular: false }
        ],
        href: "/products/gordijnrails",
        badge: "Functioneel"
      }
    ]
  };

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

  // Component for rendering product cards
  const ProductCard = ({ category }: { category: any }) => (
    <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
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
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          {category.title}
        </h4>
        
        {/* Short Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {category.description}
        </p>

        {/* Prices Section */}
        <div className="mb-6 flex-grow">
          <p className="text-sm font-medium text-gray-700 mb-3">Prijzen vanaf:</p>
          <div className="space-y-2">
            {category.products.slice(0, 3).map((product: any, index: number) => (
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
  );

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

        {/* Filters and Sorting Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <SortAsc className="h-5 w-5 text-[#d5c096]" />
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sorteer op:
                </label>
                <Select defaultValue="meest-gekozen">
                  <SelectTrigger className="w-48 border-[#d5c096]/30 focus:border-[#d5c096] focus:ring-[#d5c096]/20">
                    <SelectValue placeholder="Selecteer sortering" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meest-gekozen">Meest gekozen</SelectItem>
                    <SelectItem value="nieuwste">Nieuwste</SelectItem>
                    <SelectItem value="prijs-laag-hoog">Prijs oplopend</SelectItem>
                    <SelectItem value="prijs-hoog-laag">Prijs aflopend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter Dropdown */}
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-[#d5c096]" />
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Toon categorie:
                </label>
                <Select defaultValue="alles">
                  <SelectTrigger className="w-48 border-[#d5c096]/30 focus:border-[#d5c096] focus:ring-[#d5c096]/20">
                    <SelectValue placeholder="Selecteer categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alles">Alles</SelectItem>
                    <SelectItem value="jaloezien">Jaloezieën</SelectItem>
                    <SelectItem value="gordijnen">Gordijnen</SelectItem>
                    <SelectItem value="plisses">Plissés</SelectItem>
                    <SelectItem value="accessoires">Accessoires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              8 producten gevonden
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Onze Productcategorieën</h2>
          
          {/* Jaloezieën Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mr-4">Jaloezieën</h3>
              <div className="flex-grow h-px bg-[#d5c096]/30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {productCategories.jaloezien.map((category) => (
                <ProductCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Gordijnen Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mr-4">Gordijnen</h3>
              <div className="flex-grow h-px bg-[#d5c096]/30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {productCategories.gordijnen.map((category) => (
                <ProductCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Plissés & Horren Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mr-4">Plissés & Horren</h3>
              <div className="flex-grow h-px bg-[#d5c096]/30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {productCategories.plisses.map((category) => (
                <ProductCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Accessoires Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mr-4">Accessoires</h3>
              <div className="flex-grow h-px bg-[#d5c096]/30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productCategories.accessoires.map((category) => (
                <ProductCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner 1 - Most Popular */}
            <div className="bg-[#d5c096]/15 border border-[#d5c096]/30 rounded-xl p-6 flex items-center">
              <div className="flex items-center space-x-4 w-full">
                <div className="text-2xl">🌟</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm lg:text-base">
                    <span className="font-bold">Meest gekozen van deze maand:</span><br className="sm:hidden" />
                    <span className="ml-1 sm:ml-0">Houten Jaloezieën - vanaf €89,95</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Banner 2 - Special Offer */}
            <div className="bg-[#d5c096]/20 border border-[#d5c096]/40 rounded-xl p-6 flex items-center">
              <div className="flex items-center space-x-4 w-full">
                <div className="text-2xl">🔥</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm lg:text-base">
                    <span className="font-bold">Actie:</span><br className="sm:hidden" />
                    <span className="ml-1 sm:ml-0">10% korting op duo plissé t.e.m. 30 juni!</span>
                  </p>
                </div>
              </div>
            </div>
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