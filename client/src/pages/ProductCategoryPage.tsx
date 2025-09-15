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

// Product categories with their display labels and URL paths - Complete list per user requirements
const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },
  { label: "Rolgordijnen", urlPath: "rolgordijnen" },
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
  { label: "Vouwgordijnen", urlPath: "vouwgordijnen" },
  { label: "Dakraam zonweringen", urlPath: "dakraam-zonweringen" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
  { label: "SQUID textile folie", urlPath: "squid-textile-foil" },
  { label: "Horren", urlPath: "horren" },
  { label: "Screen", urlPath: "screen" },
];

const ProductCategoryPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { category } = params;
  const { t } = useLanguage();

  // Check if the current category is valid
  const isValidCategory = productCategories.some(cat => cat.urlPath === category);

  // If category doesn't exist, redirect to home
  useEffect(() => {
    if (!isValidCategory && category) {
      setLocation('/');
    }
  }, [category, isValidCategory, setLocation]);

  // If no valid category, return null (will redirect)
  if (!isValidCategory || !category) {
    return null;
  }

  // Map specific URL segments to their corresponding categories
  const urlToCategoryMap: Record<string, string> = {
    overgordijnen: "Overgordijnen",
    vitrages: "Vitrages",
    rolgordijnen: "Rolgordijnen", 
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
    "squid-textile-foil": "SQUID textile folie",
    horren: "Horren",
    screen: "Screen",
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
      "rolgordijnen": {
        name: "Rolgordijnen",
        description: "Praktische rolgordijnen voor optimale lichtregulatie",
        detailedDescription: "Rolgordijnen zijn een klassieke en veelzijdige keuze voor raamdecoratie. Ze bieden uitstekende lichtcontrole en privacy, terwijl ze een strakke, moderne uitstraling behouden. Perfect voor elke ruimte in huis.",
        applications: ["Slaapkamer", "Woonkamer", "Keuken", "Badkamer", "Kantoor", "Kinderkamer"],
        benefits: ["Eenvoudige bediening", "Lichtregulatie", "Privacy", "Compact design", "Onderhoudsarm"],
        colors: ["Wit", "Crème", "Beige", "Grijs", "Zwart", "Taupe", "Diverse kleuren"],
        materials: ["Polyester", "Blackout weefsel", "Zonwerend doek", "Brandvertragende stoffen"]
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
      },
      "squid-textile-foil": {
        name: "SQUID Textile Folie",
        description: "Innovatieve SQUID textile folie voor moderne raamoplossingen",
        detailedDescription: "SQUID textile folie is een geavanceerde raamfolie die privacy combineert met lichtdoorval. Deze innovatieve technologie biedt een moderne oplossing voor stijlvolle en functionele raamdecoratie.",
        applications: ["Kantoorruimtes", "Badkamer", "Keuken", "Praktijkruimtes", "Moderne interieurs", "Showrooms"],
        benefits: ["Privacy zonder lichtbeperking", "Innovatieve technologie", "Eenvoudige applicatie", "Modern design", "Herbruikbaar", "Onderhoudsarm"],
        colors: ["Transparant", "Wit", "Grijs", "Frosted effect", "Custom patronen"],
        materials: ["SQUID textile composiet", "Zelfklevende backing", "UV-filter", "Anti-statisch materiaal"]
      },
      "horren": {
        name: "Horren",
        description: "Horren op maat voor comfort en bescherming in stijl",
        detailedDescription: "Onze horren op maat combineren subtiele vormgeving met betrouwbare bescherming. Frisse lucht naar binnen, ongewenste insecten buiten. Perfect afgestemd op jouw ramen en deuren.",
        applications: ["Draaikiepramen", "Vaste ramen", "Schuifpuien", "Balkondeuren", "Terrasdeuren", "Dakramen"],
        benefits: ["Tot op de millimeter nauwkeurig", "Geruisloze bediening", "Duurzame materialen", "Subtiel design", "Eenvoudig onderhoud"],
        colors: ["Wit", "Crème", "Antraciet", "Zwart"],
        materials: ["UV-bestendig gaas", "Aluminium frames", "Kunststof profielen"]
      },
      "screen": {
        name: "Screen - Buiten Zonwering", 
        description: "Moderne buitenzonwering voor optimale bescherming",
        detailedDescription: "Screen buiten zonwering biedt stijlvolle bescherming tegen zon en wind. Perfect voor moderne woningen en bedrijven die zoeken naar hoogwaardige buitenzonwering.",
        applications: ["Moderne woningen", "Bedrijfspanden", "Terrasdeuren", "Grote raampartijen", "Kantoren"],
        benefits: ["Optimale zonwering", "Windbescherming", "Energiebesparing", "UV-bescherming", "Moderne uitstraling"],
        colors: ["Antraciet", "Wit", "Grijs", "Zwart", "Crème"],
        materials: ["Screendoek", "Aluminium profielen", "Weerbestendige coating"]
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

  // Create category data object using static content (e-commerce system was removed)
  const categoryData = {
    id: 0,
    name: productInfo.name,
    description: productInfo.description,
    imageUrl: "/placeholder-category.jpg",
  };

  // Since e-commerce was removed, show informational content instead of products
  const categoryProducts: Product[] = [];

  return (
    <>
      <Helmet>
        <title>{categoryData.name} - KANIOU</title>
        <meta
          name="description"
          content={`${categoryData.description} - Premium kwaliteit raamdecoratie van KANIOU`}
        />
      </Helmet>

      {/* Premium Breadcrumb Navigation */}
      <div className="bg-gradient-to-r from-[#fafaf9] via-[#f9f7f3] to-[#fafaf9] py-luxury-sm border-b border-[#D5B36A]/10">
        <div className="container-luxury">
          <Breadcrumb className="luxury-breadcrumb">
            <BreadcrumbList className="flex items-center gap-3 text-[#2C3E50]/70">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2 text-gradient-subtle hover:text-gradient-luxury transition-all duration-300 group">
                  <HomeIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-[#D5B36A]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/producten" className="text-gradient-elegant hover:text-gradient-luxury transition-all duration-300">
                  Producten
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-[#D5B36A]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="text-gradient-luxury font-semibold text-shadow-luxury-soft">
                  {productCategories.find(
                    (cat) => cat.urlPath === category,
                  )?.label || categoryData.name}
                </span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Sophisticated Asymmetrical Hero Section */}
      <div className="section-asymmetrical-top bg-gradient-to-br from-[#fafaf9] via-[#f9f7f3] to-[#fdfcf8] relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#D5B36A]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-[#E0C188]/3 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C8A85B]/3 to-transparent rounded-full"></div>
          </div>
        </div>
        
        <div className="container-luxury-wide relative z-10">
          <div className="grid-asymmetrical-hero items-center min-h-[80vh]">
            {/* Left Column - Premium Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="luxury-section-badge">
                  <div className="luxury-badge-glow"></div>
                  <div className="luxury-badge-text flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span className="text-caption">Premium Collectie</span>
                  </div>
                </div>
                
                <h1 className="text-display-1 text-[#2C3E50] font-black leading-none animate-text-reveal-scale">
                  <span className="text-gradient-luxury text-glow-hero block">{categoryData.name}</span>
                </h1>
                
                <div className="w-32 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A] rounded-full my-luxury-lg"></div>
              </div>
              
              <div className="space-y-6 max-w-2xl">
                <p className="text-subtitle text-[#2C3E50] leading-relaxed animate-text-reveal-up text-reveal-delay-1">
                  {productInfo.detailedDescription}
                </p>
                
                <div className="pt-6 animate-text-reveal-up text-reveal-delay-2">
                  <Link href="/quote">
                    <button className="btn-luxury-primary group">
                      <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                        </svg>
                        Bekijk Collectie
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column - Premium Visual Showcase */}
            <div className="relative animate-fade-in-up text-reveal-delay-3">
              <div className="relative">
                {/* Premium Showcase Card */}
                <div className="card-ultra-luxury p-luxury-xl">
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full mb-6 shadow-professional">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-title-xl text-gradient-luxury font-bold text-shadow-luxury-soft mb-4">Premium Kwaliteit</h3>
                      <p className="text-body text-[#2C3E50]/70 leading-relaxed">Ontdek de perfecte combinatie van stijl en functionaliteit</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">30+</div>
                        <div className="text-caption text-[#2C3E50]/60">Jaar Ervaring</div>
                      </div>
                      <div className="text-center">
                        <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">100%</div>
                        <div className="text-caption text-[#2C3E50]/60">Op Maat</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full"></div>
                        <span className="text-body text-[#2C3E50]/70">Gratis advies op locatie</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full"></div>
                        <span className="text-body text-[#2C3E50]/70">Professionele installatie</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full"></div>
                        <span className="text-body text-[#2C3E50]/70">Jarenlange garantie</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#E0C188] to-[#D5B36A] rounded-full flex items-center justify-center shadow-professional animate-float-luxury">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Products Information Section */}
      <div className="section-luxury bg-white relative">
        <div className="container-luxury">
          {/* Premium Section Header */}
          <div className="text-center mb-luxury-2xl">
            <div className="luxury-section-badge mb-8">
              <div className="luxury-badge-glow"></div>
              <div className="luxury-badge-text flex items-center gap-2">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <span className="text-caption">Product Details</span>
              </div>
            </div>
            
            <h2 className="text-display-2 text-[#2C3E50] font-bold text-center mb-8 animate-text-reveal-scale">
              <span className="text-gradient-luxury text-glow-premium">Onze {categoryData.name}</span>
              <span className="block text-gradient-elegant text-shadow-luxury-strong mt-2">Collectie</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A] rounded-full mx-auto"></div>
          </div>

          {/* Enhanced Feature Grid Layout */}
          <div className="grid-feature-showcase">
            {/* Main Feature Card - Applications */}
            <div className="card-ultra-luxury group animate-fade-in-up">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-title-xl text-gradient-luxury font-bold text-shadow-luxury-soft">
                    Toepassingen
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productInfo.applications.map((app, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#D5B36A]/5 to-[#E0C188]/3 rounded-lg border border-[#D5B36A]/10">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full flex-shrink-0"></div>
                      <span className="text-body text-[#2C3E50] font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary Feature Cards */}
            <div className="card-luxury group animate-fade-in-up text-reveal-delay-1">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E0C188] to-[#D5B36A] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-title-lg text-gradient-elegant font-bold text-shadow-luxury-soft">
                    Voordelen
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {productInfo.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-body text-[#2C3E50]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card-luxury group animate-fade-in-up text-reveal-delay-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-title-lg text-gradient-premium font-bold text-shadow-luxury-soft">
                    {productInfo.colors ? "Beschikbare Kleuren" : "Materialen"}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {(productInfo.colors || productInfo.materials || []).map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-body text-[#2C3E50]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Call to Action Section */}
          <div className="mt-luxury-2xl">
            <div className="card-showcase p-luxury-2xl text-center animate-fade-in-up text-reveal-delay-3">
              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <h3 className="text-title-xl text-gradient-luxury font-bold text-shadow-luxury-medium">
                    Interesse in {categoryData.name}?
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] rounded-full mx-auto"></div>
                </div>
                
                <p className="text-body-lg text-[#2C3E50] leading-relaxed max-w-3xl mx-auto">
                  Neem contact met ons op voor een vrijblijvende offerte of kom langs in onze showroom voor persoonlijk advies. 
                  Onze experts staan klaar om u te helpen met de perfecte raamdecoratie op maat.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                  <Link href="/quote">
                    <button className="btn-luxury-primary group">
                      <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                        </svg>
                        Vraag Offerte Aan
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </Link>
                  
                  <Link href="/contact">
                    <button className="btn-luxury-secondary group">
                      <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Neem Contact Op
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
                
                {/* Premium Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#D5B36A]/20">
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">Gratis</div>
                    <div className="text-caption text-[#2C3E50]/60">Thuisadvies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">100%</div>
                    <div className="text-caption text-[#2C3E50]/60">Op Maat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-title-lg font-bold text-gradient-luxury text-shadow-luxury-medium mb-2">5 Jaar</div>
                    <div className="text-caption text-[#2C3E50]/60">Garantie</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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