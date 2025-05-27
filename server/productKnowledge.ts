/**
 * Comprehensive Dutch Product Knowledge Base for KANIOU Window Treatments
 * This module provides detailed product information for the AI assistant
 */

export interface ProductKnowledge {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  keyFeatures: string[];
  idealFor: string[];
  vsOtherProducts: string;
  materials: string[];
  maintenanceTips: string[];
}

export const DUTCH_PRODUCT_KNOWLEDGE: ProductKnowledge[] = [
  {
    name: "Overgordijnen",
    category: "Gordijnen",
    description: "Klassieke gordijnen die zowel functioneel als decoratief zijn. Ze bieden privacy, lichtcontrole en warmte-isolatie terwijl ze uw interieur een luxe uitstraling geven.",
    benefits: [
      "Volledige privacy en lichtcontrole",
      "Uitstekende warmte- en geluidsisolatie", 
      "Grote variëteit in stoffen en stijlen",
      "Tijdloze elegantie voor elke kamer"
    ],
    keyFeatures: [
      "Verschillende plooistijlen beschikbaar",
      "Op maat gemaakt voor perfecte pasvorm",
      "Keuze uit blackout of lichtdoorlatende stoffen",
      "Diverse ophangmogelijkheden (roede, rail, lussen)"
    ],
    idealFor: [
      "Woonkamers en slaapkamers",
      "Grote ramen en schuifpuien",
      "Klassieke en moderne interieurs",
      "Ruimtes waar warmte-isolatie belangrijk is"
    ],
    vsOtherProducts: "Overgordijnen bieden meer isolatie dan vitrages en meer stijlopties dan rolgordijnen, maar nemen meer ruimte in beslag.",
    materials: ["Katoen", "Linnen", "Polyester", "Velours", "Zijde", "Gemengde stoffen"],
    maintenanceTips: [
      "Regelmatig stofzuigen met zachte borstel",
      "Chemisch reinigen voor hoogwaardige stoffen",
      "Sommige kunnen in de wasmachine op lage temperatuur"
    ]
  },
  {
    name: "Vitrages",
    category: "Gordijnen", 
    description: "Lichtdoorlatende gordijnen die privacy bieden overdag terwijl ze natuurlijk licht doorlaten. Perfect voor een zachte, elegante uitstraling.",
    benefits: [
      "Privacy overdag behouden",
      "Natuurlijk licht optimaal benutten",
      "Zachte lichtverspreiding in de ruimte",
      "Elegante basis voor elke raamdecoratie"
    ],
    keyFeatures: [
      "Semi-transparante stoffen",
      "Verschillende structuren en patronen",
      "Eenvoudige montage en onderhoud",
      "Combineerbaar met overgordijnen"
    ],
    idealFor: [
      "Woonkamers en eetkamers",
      "Ruimtes met veel natuurlijk licht",
      "Als basis onder overgordijnen",
      "Moderne en minimalistische interieurs"
    ],
    vsOtherProducts: "Vitrages geven meer privacy dan geen raamdecoratie maar minder verduistering dan overgordijnen of rolgordijnen.",
    materials: ["Voile", "Organza", "Linnen", "Polyester", "Katoen-polyester mix"],
    maintenanceTips: [
      "Regelmatig wassen op lage temperatuur", 
      "Niet in de droger, ophangen terwijl nog vochtig",
      "Strijken op lage temperatuur indien nodig"
    ]
  },
  {
    name: "Rolgordijnen",
    category: "Zonwering",
    description: "Praktische en strakke raamdecoratie die compact oprolt. Biedt uitstekende lichtcontrole en past in elke moderne ruimte.",
    benefits: [
      "Zeer goede lichtcontrole",
      "Compact en ruimtebesparend",
      "Eenvoudige bediening",
      "Moderne, strakke uitstraling"
    ],
    keyFeatures: [
      "Keuze uit blackout, dimout of transparant",
      "Verschillende bedieningsmogelijkheden",
      "Op maat gemaakt voor perfecte pasvorm",
      "Grote kleur- en dessinkeuze"
    ],
    idealFor: [
      "Moderne interieurs",
      "Kleine ruimtes",
      "Kantoren en werkruimtes", 
      "Slaapkamers (blackout versie)"
    ],
    vsOtherProducts: "Rolgordijnen zijn compacter dan gordijnen en eenvoudiger dan jaloezieën, maar bieden minder isolatie dan overgordijnen.",
    materials: ["Polyester", "PVC", "Aluminium coating", "Natuurlijke vezels", "Blackout materialen"],
    maintenanceTips: [
      "Afnemen met vochtige doek",
      "Stofzuigen met zachte borstel",
      "Niet onderdompelen in water"
    ]
  },
  {
    name: "Duo Rolgordijnen",
    category: "Zonwering",
    description: "Innovatieve rolgordijnen met afwisselende transparante en ondoorzichtige stroken. Biedt flexibele licht- en privacycontrole in één product.",
    benefits: [
      "Flexibele licht- en privacycontrole",
      "Moderne, stijlvolle uitstraling",
      "Eenvoudige bediening",
      "Energiebesparend door lichtregulatie"
    ],
    keyFeatures: [
      "Twee lagen stof met verschillende doorzichtigheid",
      "Traploos instelbaar voor gewenste lichtinval",
      "Verschillende kleurcombinaties mogelijk",
      "Geschikt voor grote ramen"
    ],
    idealFor: [
      "Moderne woonkamers",
      "Kantoorruimtes",
      "Ruimtes waar flexibiliteit belangrijk is",
      "Grote raampartijen"
    ],
    vsOtherProducts: "Duo rolgordijnen bieden meer flexibiliteit dan gewone rolgordijnen en zijn moderner dan traditionele jaloezieën.",
    materials: ["Polyester", "Gemengde stoffen", "UV-bestendige materialen"],
    maintenanceTips: [
      "Voorzichtig afnemen met droge doek",
      "Vermijd teveel vocht tussen de lagen",
      "Regelmatig controleren of mechanisme soepel loopt"
    ]
  },
  {
    name: "Vouwgordijnen",
    category: "Zonwering", 
    description: "Elegante gordijnen die in horizontale plooien omhoog vouwen. Combineren de warmte van stof met de functionaliteit van zonwering.",
    benefits: [
      "Luxe uitstraling door stofgebruik",
      "Goede isolatie-eigenschappen",
      "Variabele lichtinval door verschillende hoogtes",
      "Geschikt voor verschillende raamvormen"
    ],
    keyFeatures: [
      "Horizontale plooien voor elegant effect",
      "Handmatige of elektrische bediening mogelijk",
      "Grote keuze in stoffen en kleuren",
      "Maatwerk voor bijzondere raamvormen"
    ],
    idealFor: [
      "Klassieke en landelijke interieurs",
      "Slaapkamers en studeerkamers",
      "Bijzondere raamvormen",
      "Ruimtes waar isolatie belangrijk is"
    ],
    vsOtherProducts: "Vouwgordijnen bieden meer isolatie dan rolgordijnen en zijn eleganter dan jaloezieën, maar duurder dan basale zonwering.",
    materials: ["Katoen", "Linnen", "Polyester", "Blackout stoffen", "Natuurlijke vezels"],
    maintenanceTips: [
      "Stofzuigen met zachte borstel",
      "Professionele reiniging aanbevolen",
      "Vermijd trekken aan de stof"
    ]
  },
  {
    name: "Houten Jaloezieën", 
    category: "Jaloezieën",
    description: "Natuurlijke houten lamellen die warmte en karakter aan uw interieur toevoegen. Bieden uitstekende lichtcontrole met een tijdloze uitstraling.",
    benefits: [
      "Natuurlijke, warme uitstraling",
      "Uitstekende lichtcontrole door draaibare lamellen",
      "Duurzaam en milieuvriendelijk",
      "Verhoogt waarde van het interieur"
    ],
    keyFeatures: [
      "Echte houten lamellen van 25, 35 of 50mm",
      "Verschillende houtsoorten beschikbaar",
      "Precisie lichtcontrole door kantelen",
      "Handmatige of elektrische bediening"
    ],
    idealFor: [
      "Klassieke en warme interieurs",
      "Woonkamers en studeerkamers",
      "Ruimtes waar natuurlijke materialen gewenst zijn",
      "Landelijke en moderne stijlen"
    ],
    vsOtherProducts: "Houten jaloezieën zijn luxer en natuurlijker dan kunststof, maar zwaarder en duurder. Beter bestand tegen tijd dan aluminium.",
    materials: ["Basswood", "Bamboe", "Eiken", "Abachi", "Gelakt hout"],
    maintenanceTips: [
      "Afnemen met droge doek in richting van de houtnerf",
      "Vermijd teveel vocht",
      "Periodiek behandelen met houten onderhoudsmiddel"
    ]
  },
  {
    name: "Kunststof Jaloezieën",
    category: "Jaloezieën",
    description: "Praktische en onderhoudsvriendelijke jaloezieën van hoogwaardig kunststof. Perfect voor vochtige ruimtes en moderne interieurs.",
    benefits: [
      "Zeer onderhoudsvriendelijk",
      "Bestand tegen vocht en temperatuurschommelingen",
      "Betaalbare zonweringsoptie",
      "Goede lichtcontrole"
    ],
    keyFeatures: [
      "Kunststof lamellen van 25 of 50mm",
      "UV-bestendig materiaal",
      "Eenvoudige reiniging",
      "Diverse kleuren beschikbaar"
    ],
    idealFor: [
      "Keukens en badkamers",
      "Moderne en minimalistische interieurs",
      "Ruimtes met veel vocht",
      "Budget-bewuste keuzes"
    ],
    vsOtherProducts: "Kunststof jaloezieën zijn goedkoper en onderhoudsvriendelijker dan hout, maar minder luxe dan houten of aluminium versies.",
    materials: ["PVC", "Gerecycled kunststof", "UV-bestendige compounds"],
    maintenanceTips: [
      "Eenvoudig schoonmaken met vochtige doek",
      "Lamellen individueel afnemen",
      "Desgewenst afspoelen onder de douche"
    ]
  },
  {
    name: "Textiel Lamellen",
    category: "Lamellen",
    description: "Verticale stoffen lamellen die draaibaar zijn voor optimale lichtcontrole. Combineren de zachtheid van stof met functionaliteit van lamellen.",
    benefits: [
      "Zachte, elegante uitstraling door stofgebruik",
      "Uitstekende lichtcontrole door draaibare lamellen",
      "Geschikt voor grote raampartijen",
      "Geluidsabsorberend effect"
    ],
    keyFeatures: [
      "Verticale stoffen lamellen van 89 of 127mm",
      "180° draaibaar voor optimale lichtcontrole",
      "Verschillende stoffentypes beschikbaar",
      "Op maat gemaakt voor perfecte pasvorm"
    ],
    idealFor: [
      "Grote raampartijen en schuifpuien",
      "Kantoorruimtes",
      "Moderne woonkamers",
      "Ruimtes waar geluidsdemping gewenst is"
    ],
    vsOtherProducts: "Textiel lamellen zijn zachter dan kunststof lamellen en geschikter voor grote ramen dan traditionele gordijnen.",
    materials: ["Polyester", "Katoen-polyester mix", "Blackout stoffen", "Semi-transparante stoffen"],
    maintenanceTips: [
      "Stofzuigen met zachte borstel",
      "Sommige lamellen kunnen in wasmachine",
      "Professionele reiniging voor hoogwaardige stoffen"
    ]
  }
];

/**
 * Get product knowledge by name
 */
export function getProductKnowledge(productName: string): ProductKnowledge | null {
  const normalizedName = productName.toLowerCase().trim();
  return DUTCH_PRODUCT_KNOWLEDGE.find(product => 
    product.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(product.name.toLowerCase())
  ) || null;
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): ProductKnowledge[] {
  return DUTCH_PRODUCT_KNOWLEDGE.filter(product =>
    product.category.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * Search products by keywords
 */
export function searchProducts(keywords: string): ProductKnowledge[] {
  const searchTerms = keywords.toLowerCase().split(' ');
  return DUTCH_PRODUCT_KNOWLEDGE.filter(product => {
    const searchableText = `${product.name} ${product.description} ${product.benefits.join(' ')} ${product.keyFeatures.join(' ')}`.toLowerCase();
    return searchTerms.some(term => searchableText.includes(term));
  });
}

/**
 * Get comprehensive product comparison
 */
export function compareProducts(product1: string, product2: string): string {
  const p1 = getProductKnowledge(product1);
  const p2 = getProductKnowledge(product2);
  
  if (!p1 || !p2) {
    return "Een van de producten kon niet gevonden worden in onze database.";
  }

  return `**${p1.name} vs ${p2.name}:**

**${p1.name}:**
${p1.description}
Hoofdvoordelen: ${p1.benefits.slice(0, 3).join(', ')}

**${p2.name}:**
${p2.description}  
Hoofdvoordelen: ${p2.benefits.slice(0, 3).join(', ')}

**Vergelijking:**
${p1.vsOtherProducts}
${p2.vsOtherProducts}`;
}