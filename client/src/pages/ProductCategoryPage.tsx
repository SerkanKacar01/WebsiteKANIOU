import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, Check } from "lucide-react";
import { Product, Category } from "@shared/schema";

// Product categories with their display labels and URL paths - Updated per requirements
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },
  { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen" },
  { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
  { label: "Houten shutters", urlPath: "houten-shutters" },
  { label: "Inzethorren", urlPath: "inzethorren" },
  { label: "Opzethorren", urlPath: "opzethorren" },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
  { label: "Plissé", urlPath: "plisse" },
  { label: "Duo plissé", urlPath: "duo-plisse" },
  { label: "Dakraam zonweringen", urlPath: "dakraam-zonweringen" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
];

const ProductCategoryPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();

  // Check if the current category is valid
  const isValidCategory = productCategories.some(cat => cat.urlPath === category);

  // If category doesn't exist, redirect to shop
  useEffect(() => {
    if (!isValidCategory && category) {
      setLocation('/shop');
    }
  }, [category, isValidCategory, setLocation]);

  // Fetch categories and products
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // If no valid category, return null (will redirect)
  if (!isValidCategory || !category) {
    return null;
  }

  // Map specific URL segments to their corresponding categories
  const urlToCategoryMap: Record<string, string> = {
    overgordijnen: "Overgordijnen",
    vitrages: "Vitrages", 
    "duo-rolgordijnen": "Duo rolgordijnen",
    "textiel-lamellen": "Textiel lamellen",
    "kunststof-lamellen": "Kunststof lamellen",
    "houten-jaloezieen": "Houten jaloezieën",
    "kunststof-jaloezieen": "Kunststof jaloezieën",
    "textiel-raamfolie": "Textiel raamfolie",
    "houten-shutters": "Houten shutters",
    inzethorren: "Inzethorren",
    opzethorren: "Opzethorren",
    "plisse-hordeuren": "Plissé hordeuren",
    plisse: "Plissé",
    "duo-plisse": "Duo plissé",
    "dakraam-zonweringen": "Dakraam zonweringen",
    gordijnrails: "Gordijnrails",
    gordijnroedes: "Gordijnroedes",
  };

  // Get the matching category name or default to the first one
  const categoryName = urlToCategoryMap[category as string];

  // Generate specific product information based on category
  const getProductInfo = (categoryKey: string) => {
    const productInfo: Record<string, {
      name: string;
      description: string;
      detailedDescription: string;
      applications: string[];
      benefits: string[];
      colors?: string[];
      materials?: string[];
    }> = {
      "overgordijnen": {
        name: "Overgordijnen",
        description: "Luxueuze overgordijnen die stijl en functionaliteit perfect combineren",
        detailedDescription: "Onze overgordijnen zijn meer dan alleen raamdecoratie - ze zijn een statement van elegantie en comfort. Gemaakt van de fijnste stoffen en met oog voor detail afgewerkt, transformeren zij elke ruimte tot een warm en uitnodigend thuis.",
        applications: ["Woonkamer", "Slaapkamer", "Eetkamer", "Studeerkamer", "Hotelkamers"],
        benefits: ["Lichtregulatie", "Privacy", "Geluidsdemping", "Isolerend vermogen", "Decoratief element"],
        colors: ["Crème", "Beige", "Grijs", "Navy", "Bordeaux", "Groen", "Goud"],
        materials: ["Zijde", "Linnen", "Katoen", "Polyester", "Fluweel", "Jacquard"]
      },
      "vitrages": {
        name: "Vitrages",
        description: "Elegante vitrages voor privacy met behoud van natuurlijk licht",
        detailedDescription: "Vitrages bieden de perfecte balans tussen privacy en lichtdoorval. Onze collectie varieert van klassiek wit tot moderne patronen, allemaal ontworpen om uw ramen elegant aan te kleden zonder het daglicht te blokkeren.",
        applications: ["Woonkamer", "Keuken", "Badkamer", "Kantoor", "Praktijkruimtes"],
        benefits: ["Privacy overdag", "Lichtdoorlatend", "Decoratief", "Gemakkelijk onderhoud", "Diverse patronen"],
        colors: ["Wit", "Crème", "Lichtgrijs", "Beige", "Ecru"],
        materials: ["Katoen", "Polyester", "Linnen mix", "Voile", "Organza"]
      },
      "duo-rolgordijnen": {
        name: "Duo Rolgordijnen",
        description: "Innovatieve duo rolgordijnen met dubbele functionaliteit",
        detailedDescription: "Duo rolgordijnen combineren de voordelen van transparante en verduisterende banen in één product. Door de banen te verschuiven, regelt u eenvoudig de lichtinval en privacy naar uw wens.",
        applications: ["Slaapkamer", "Woonkamer", "Werkkamer", "Kinderkamer", "Mediakamer"],
        benefits: ["Variabele lichtregulatie", "Privacy op maat", "Moderne uitstraling", "Ruimtebesparend", "Eenvoudige bediening"],
        colors: ["Wit", "Grijs", "Beige", "Zwart", "Taupe", "Antraciet"],
        materials: ["Polyester", "PVC-vrij materiaal", "Brandvertragende stoffen"]
      },
      "textiel-lamellen": {
        name: "Textiel Lamellen",
        description: "Stijlvolle textiel lamellen voor optimale licht- en privacycontrole",
        detailedDescription: "Textiel lamellen verenigen de elegantie van gordijnen met de functionaliteit van lamellen. De verticale lamellen kunnen individueel worden gedraaid voor perfecte lichtregulatie.",
        applications: ["Kantoor", "Woonkamer", "Slaapkamer", "Vergaderruimtes", "Showrooms"],
        benefits: ["Perfecte lichtcontrole", "Privacy naar wens", "Grote raampartijen", "Professionele uitstraling", "Duurzaam"],
        colors: ["Wit", "Crème", "Grijs", "Beige", "Blauw", "Groen", "Bordeaux"],
        materials: ["Polyester", "Katoen blend", "Brandvertragend textiel", "Anti-statisch"]
      },
      "kunststof-lamellen": {
        name: "Kunststof Lamellen",
        description: "Praktische kunststof lamellen voor vochtige ruimtes",
        detailedDescription: "Onze kunststof lamellen zijn ideaal voor ruimtes waar vocht en praktisch onderhoud belangrijk zijn. Ze zijn volledig wasbaar en behouden hun vorm en kleur.",
        applications: ["Badkamer", "Keuken", "Wasruimte", "Kantoor", "Praktijkruimtes"],
        benefits: ["Vochtbestendig", "Gemakkelijk schoon te maken", "Vormvast", "Kleurvast", "Betaalbaar"],
        colors: ["Wit", "Crème", "Grijs", "Beige", "Blauw", "Groen"],
        materials: ["PVC", "Kunststof composiet", "UV-bestendige coating"]
      },
      "houten-jaloezieen": {
        name: "Houten Jaloezieën",
        description: "Natuurlijke houten jaloezieën voor een warme uitstraling",
        detailedDescription: "Houten jaloezieën brengen natuurlijke warmte en elegantie in uw interieur. Elk stuk hout is uniek en draagt bij aan de karakteristieke uitstraling.",
        applications: ["Woonkamer", "Slaapkamer", "Studeerkamer", "Eetkamer", "Kantoor"],
        benefits: ["Natuurlijk materiaal", "Warme uitstraling", "Isolerend", "Duurzaam", "Tijdloos design"],
        colors: ["Naturel", "Wit", "Crème", "Honing", "Noten", "Mahonie", "Ebben"],
        materials: ["Basswood", "Bamboe", "Eiken", "Gelakt hout", "Gebeitst hout"]
      },
      "kunststof-jaloezieen": {
        name: "Kunststof Jaloezieën",
        description: "Onderhoudsarme kunststof jaloezieën voor elke ruimte",
        detailedDescription: "Kunststof jaloezieën combineren praktisch gebruik met moderne esthetiek. Ze zijn licht van gewicht, gemakkelijk schoon te maken en geschikt voor alle ruimtes.",
        applications: ["Badkamer", "Keuken", "Kinderkamer", "Kantoor", "Praktijkruimtes"],
        benefits: ["Onderhoudsarm", "Vochtbestendig", "Lichtgewicht", "Betaalbaar", "Kleurvast"],
        colors: ["Wit", "Crème", "Grijs", "Beige", "Zilver", "Antraciet"],
        materials: ["PVC", "Kunststof composiet", "UV-bestendige afwerking"]
      },
      "textiel-raamfolie": {
        name: "Textiel Raamfolie",
        description: "Decoratieve textiel raamfolie voor privacy en stijl",
        detailedDescription: "Textiel raamfolie is een innovatieve oplossing die privacy biedt zonder het natuurlijke licht te blokkeren. Perfect voor moderne interieurs.",
        applications: ["Kantoor", "Badkamer", "Keuken", "Praktijkruimtes", "Showrooms"],
        benefits: ["Privacy", "Lichtdoorlatend", "Decoratief", "Gemakkelijke applicatie", "Herbruikbaar"],
        colors: ["Wit", "Crème", "Grijs", "Patronen", "Frosted effect"],
        materials: ["Textiel composiet", "Zelfklevende backing", "UV-filter"]
      },
      "houten-shutters": {
        name: "Houten Shutters",
        description: "Klassieke houten shutters voor ultieme stijl en functionaliteit",
        detailedDescription: "Houten shutters zijn de ultieme combinatie van functionaliteit en elegantie. Ze bieden volledige controle over licht en privacy en voegen waarde toe aan uw woning.",
        applications: ["Woonkamer", "Slaapkamer", "Eetkamer", "Studeerkamer", "Luxe interieurs"],
        benefits: ["Complete lichtcontrole", "Excellent isolerend", "Waardevermeerdering", "Duurzaam", "Tijdloos"],
        colors: ["Wit", "Crème", "Naturel", "Grijs", "Custom kleuren"],
        materials: ["Massief hout", "MDF gelakt", "Waterbestendig gelakt"]
      },
      "inzethorren": {
        name: "Inzethorren",
        description: "Praktische inzethorren voor ramen en deuren",
        detailedDescription: "Inzethorren bieden een eenvoudige en effectieve oplossing tegen insecten. Ze zijn gemakkelijk te plaatsen en te verwijderen zonder permanente bevestiging.",
        applications: ["Ramen", "Deuren", "Balkons", "Terrassen", "Veranda's"],
        benefits: ["Insectenwering", "Gemakkelijk plaatsen", "Seizoensgebonden", "Kosteneffectief", "Geen permanente bevestiging"],
        colors: ["Wit", "Bruin", "Antraciet", "Grijs"],
        materials: ["Aluminium frame", "Kunststof hoeken", "Glasvezel gaas", "Polyester gaas"]
      },
      "opzethorren": {
        name: "Opzethorren",
        description: "Professionele opzethorren voor permanente bescherming",
        detailedDescription: "Opzethorren worden professioneel gemonteerd en bieden permanente bescherming tegen insecten. Ze zijn op maat gemaakt en perfect geïntegreerd in uw kozijn.",
        applications: ["Woonhuizen", "Appartementen", "Kantoren", "Horecagelegenheden"],
        benefits: ["Permanente bescherming", "Op maat gemaakt", "Professionele montage", "Duurzaam", "Esthetisch geïntegreerd"],
        colors: ["Wit", "Bruin", "Antraciet", "Custom RAL kleuren"],
        materials: ["Aluminium profiel", "RVS bevestiging", "Hoogwaardig gaas"]
      },
      "plisse-hordeuren": {
        name: "Plissé Hordeuren",
        description: "Stijlvolle plissé hordeuren voor grote openingen",
        detailedDescription: "Plissé hordeuren zijn perfect voor grote deuropeningen zoals schuifpuien. Ze vouwen compact op en bieden volledige toegang wanneer geopend.",
        applications: ["Schuifpuien", "Grote deuropeningen", "Terrasdeuren", "Balkons", "Veranda's"],
        benefits: ["Groot bereik", "Compact opvouwbaar", "Stijlvol design", "Soepele werking", "Op maat"],
        colors: ["Wit", "Antraciet", "Bruin", "Custom kleuren"],
        materials: ["Aluminium rails", "Plissé doek", "Magneetstrip"]
      },
      "plisse": {
        name: "Plissé",
        description: "Veelzijdige plissé gordijnen voor elke raam",
        detailedDescription: "Plissé gordijnen bieden oneindige mogelijkheden voor lichtregulatie. Ze kunnen op elke gewenste hoogte worden gepositioneerd voor optimale privacy en lichtinval.",
        applications: ["Slaapkamer", "Badkamer", "Keuken", "Dakramen", "Driehoekige ramen"],
        benefits: ["Flexibele positionering", "Compact design", "Geschikt voor speciale raamvormen", "Energiebesparend", "Strak design"],
        colors: ["Wit", "Crème", "Grijs", "Beige", "Diverse kleuren"],
        materials: ["Polyester", "Non-woven", "Gepleated fabric"]
      },
      "duo-plisse": {
        name: "Duo Plissé",
        description: "Innovatieve duo plissé met dubbele functionaliteit",
        detailedDescription: "Duo plissé combineert transparante en verduisterende delen in één product. Perfect voor wanneer u zowel privacy als licht wilt kunnen reguleren.",
        applications: ["Slaapkamer", "Woonkamer", "Kinderkamer", "Studeerkamer", "Mediakamer"],
        benefits: ["Dag- en nachtfunctionaliteit", "Variabele privacy", "Energiebesparend", "Modern design", "Eenvoudige bediening"],
        colors: ["Wit/Grijs", "Crème/Beige", "Diverse combinaties"],
        materials: ["Polyester transparant", "Verduisterend weefsel"]
      },
      "dakraam-zonweringen": {
        name: "Dakraam Zonweringen",
        description: "Gespecialiseerde zonweringen voor dakramen (Fakro, Velux)",
        detailedDescription: "Dakraam zonweringen zijn speciaal ontworpen voor de unieke uitdagingen van dakramen. Ze bieden bescherming tegen warmte en verblinding van bovenaf.",
        applications: ["Zolderkamers", "Dakkapellen", "Lichtkoepels", "Velux ramen", "Fakro ramen"],
        benefits: ["UV-bescherming", "Warmteregulatie", "Verblindingspreventie", "Perfecte pasvorm", "Eenvoudige montage"],
        colors: ["Wit", "Crème", "Grijs", "Donkere tinten"],
        materials: ["Gecoat doek", "Aluminium geleiders", "UV-bestendige afwerking"]
      },
      "gordijnrails": {
        name: "Gordijnrails",
        description: "Professionele gordijnrails voor elke toepassing",
        detailedDescription: "Onze gordijnrails zijn ontworpen voor soepele werking en duurzaamheid. Van eenvoudige tot complexe configuraties, wij hebben de juiste rail voor elke situatie.",
        applications: ["Woonruimtes", "Kantoren", "Hotels", "Theaters", "Ziekenhuizen"],
        benefits: ["Soepele werking", "Stil", "Duurzaam", "Diverse configuraties", "Professionele montage"],
        colors: ["Wit", "Zilver", "Zwart", "Custom RAL"],
        materials: ["Aluminium", "RVS", "Kunststof componenten"]
      },
      "gordijnroedes": {
        name: "Gordijnroedes",
        description: "Decoratieve gordijnroedes in verschillende stijlen",
        detailedDescription: "Gordijnroedes combineren functionaliteit met decoratieve waarde. Ze zijn verkrijgbaar in verschillende materialen en stijlen om perfect aan te sluiten bij uw interieur.",
        applications: ["Woonkamer", "Slaapkamer", "Eetkamer", "Studeerkamer", "Decoratieve toepassingen"],
        benefits: ["Decoratief element", "Diverse stijlen", "Kwalitatieve materialen", "Maatwerk mogelijk", "Compleet systeem"],
        colors: ["Naturel hout", "Wit", "Zwart", "Chroom", "Antiek brons"],
        materials: ["Hout", "Metaal", "Combinatiematerialen", "Decoratieve eindknoppen"]
      }
    };

    return productInfo[categoryKey] || {
      name: categoryName || "Product",
      description: `Ontdek onze ${categoryName || "product"} collectie`,
      detailedDescription: `Professionele ${categoryName || "producten"} van hoge kwaliteit voor uw interieur.`,
      applications: ["Woonruimtes", "Kantoren", "Commerciële ruimtes"],
      benefits: ["Kwaliteit", "Duurzaamheid", "Professionele service", "Op maat"],
      colors: ["Wit", "Crème", "Grijs", "Beige"],
      materials: ["Hoogwaardige materialen"]
    };
  };

  const productInfo = getProductInfo(category || "");

  // Find category data
  const foundCategory = categories.find(
    (cat: Category) => cat.name === categoryName,
  );

  // If category not found in database, create a default one with specific info
  const categoryData = foundCategory || {
    id: 0,
    name: productInfo.name,
    description: productInfo.description,
    imageUrl: "/placeholder-category.jpg",
  };

  // Filter products for this category
  const categoryProducts = foundCategory
    ? products.filter(
        (product: Product) => product.categoryId === foundCategory.id,
      )
    : [];

  return (
    <>
      <Helmet>
        <title>{categoryData.name} - KANIOU</title>
        <meta
          name="description"
          content={`${categoryData.description} - Premium kwaliteit raamdecoratie van KANIOU`}
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
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
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/products/${category}`}>
                  {productCategories.find(
                    (cat) => cat.urlPath === category,
                  )?.label || categoryData.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Standard Category Hero Section */}
      <div
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${categoryData.imageUrl})`,
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {categoryData.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {productInfo.detailedDescription}
            </p>
            <Button
              size="lg"
              className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
            >
              Bekijk Collectie
            </Button>
          </div>
        </Container>
      </div>

      {/* Products Grid Section */}
      <div className="py-16 bg-gray-50">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Onze {categoryData.name} Collectie
          </h2>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={product.imageUrl || "/placeholder-product.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-primary mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text-medium mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        €{product.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                      >
                        Bekijk Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Binnenkort beschikbaar
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                We werken hard aan het toevoegen van producten voor deze categorie.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#d5c096] hover:bg-[#c4b183] text-white"
                >
                  Neem Contact Op
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Waarom Kiezen voor KANIOU?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">
                Premium Kwaliteit
              </h3>
              <p className="text-text-medium">
                Alleen de beste materialen en vakmanschap voor duurzame raamdecoratie.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">
                Op Maat Gemaakt
              </h3>
              <p className="text-text-medium">
                Elke bestelling wordt perfect afgestemd op uw specifieke wensen en afmetingen.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">
                Professionele Service
              </h3>
              <p className="text-text-medium">
                Van advies tot installatie, wij begeleiden u door het hele proces.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Specifications Section */}
      <div className="py-16 bg-gray-50">
        <Container>
          <h2 className="font-display text-3xl text-primary font-semibold text-center mb-12">
            Specificaties
          </h2>

          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  Toepassingen
                </h3>
                <ul className="space-y-2">
                  {productInfo.applications.map((application, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{application}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  Voordelen
                </h3>
                <ul className="space-y-2">
                  {productInfo.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-medium mb-4">
                  {productInfo.colors && productInfo.colors.length > 0 ? "Beschikbare Kleuren" : "Materialen"}
                </h3>
                <ul className="space-y-2">
                  {(productInfo.colors && productInfo.colors.length > 0 ? productInfo.colors : productInfo.materials || []).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold mb-6">
              Klaar om uw interieur te transformeren?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Neem vandaag nog contact met ons op voor een vrijblijvende offerte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Vraag Offerte Aan
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Contact Opnemen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductCategoryPage;