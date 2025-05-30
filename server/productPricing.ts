/**
 * Product-Specific Pricing Logic for KANIOU Chatbot
 * Uses real website knowledge base to provide detailed product pricing information
 */

export interface ProductPricingInfo {
  productName: string;
  basePrice: number;
  priceRange: string;
  factors: string[];
  sampleSizing: string;
  description: string;
  language: string;
}

/**
 * Comprehensive product pricing database based on KANIOU's actual offerings
 */
export const PRODUCT_PRICING_KNOWLEDGE = {
  nl: {
    rolgordijn: {
      productName: "Rolgordijn",
      basePrice: 85,
      priceRange: "€85 - €250",
      factors: ["breedte", "hoogte", "materiaalkeuze", "bediening"],
      sampleSizing: "100x200 cm",
      description: "Een standaard verduisterend rolgordijn van 100x200 cm begint rond €85. Prijzen variëren afhankelijk van afmetingen, stofkeuze (basic, premium, designer) en bediening (koord, veer, motor). Gebruik onze online calculator voor een exacte prijs."
    },
    jaloezie: {
      productName: "Houten Jaloezie",
      basePrice: 120,
      priceRange: "€120 - €350",
      factors: ["breedte", "hoogte", "houtsoort", "lameldikte"],
      sampleSizing: "100x150 cm",
      description: "Een houten jaloezie van 100x150 cm met 50mm lamellen begint rond €120. Premium houtsoorten zoals bamboe of eiken kosten meer. Prijs wordt bepaald door afmetingen, houtsoort en lameldikte."
    },
    overgordijn: {
      productName: "Overgordijn",
      basePrice: 150,
      priceRange: "€150 - €450",
      factors: ["breedte", "hoogte", "stofkeuze", "plooimaat", "ophangwijze"],
      sampleSizing: "200x250 cm",
      description: "Een maatwerk overgordijn van 200x250 cm begint vanaf €150. Luxe stoffen, speciale plooitechnieken en motorisering verhogen de prijs. Inclusief rails en ophangmateriaal."
    },
    plisse: {
      productName: "Plissé Gordijn",
      basePrice: 95,
      priceRange: "€95 - €280",
      factors: ["breedte", "hoogte", "stoftype", "bediening"],
      sampleSizing: "80x120 cm",
      description: "Een plissé gordijn van 80x120 cm begint rond €95. Duette (isolerend) en top-down/bottom-up varianten kosten meer. Ideaal voor speciale raamvormen."
    },
    dakraamzonwering: {
      productName: "Dakraam Zonwering",
      basePrice: 180,
      priceRange: "€180 - €450",
      factors: ["raamtype", "afmetingen", "stofkeuze", "montagewijze"],
      sampleSizing: "78x118 cm (standaard Velux)",
      description: "Dakraam zonwering voor een standaard Velux raam (78x118 cm) begint rond €180. Prijs hangt af van raamtype, gewenste lichtfiltering en montagewijze (clips of schroeven)."
    },
    screen: {
      productName: "Screen Zonwering",
      basePrice: 140,
      priceRange: "€140 - €380",
      factors: ["breedte", "hoogte", "openheid percentage", "kleur"],
      sampleSizing: "150x200 cm",
      description: "Een screen zonwering van 150x200 cm begint rond €140. Verschillende openheidspercentages (1%, 3%, 5%, 10%) bepalen de prijs en lichtdoorlatendheid."
    }
  },
  en: {
    rolgordijn: {
      productName: "Roller Blind",
      basePrice: 85,
      priceRange: "€85 - €250",
      factors: ["width", "height", "fabric choice", "operation"],
      sampleSizing: "100x200 cm",
      description: "A standard blackout roller blind of 100x200 cm starts around €85. Prices vary depending on dimensions, fabric choice (basic, premium, designer) and operation (cord, spring, motor). Use our online calculator for exact pricing."
    },
    jaloezie: {
      productName: "Wooden Venetian Blind",
      basePrice: 120,
      priceRange: "€120 - €350", 
      factors: ["width", "height", "wood type", "slat thickness"],
      sampleSizing: "100x150 cm",
      description: "A wooden venetian blind of 100x150 cm with 50mm slats starts around €120. Premium wood types like bamboo or oak cost more. Price determined by dimensions, wood type and slat thickness."
    },
    overgordijn: {
      productName: "Curtains",
      basePrice: 150,
      priceRange: "€150 - €450",
      factors: ["width", "height", "fabric choice", "pleating", "hanging method"],
      sampleSizing: "200x250 cm", 
      description: "A custom curtain of 200x250 cm starts from €150. Luxury fabrics, special pleating techniques and motorization increase the price. Including rails and hanging hardware."
    },
    plisse: {
      productName: "Pleated Blind",
      basePrice: 95,
      priceRange: "€95 - €280",
      factors: ["width", "height", "fabric type", "operation"],
      sampleSizing: "80x120 cm",
      description: "A pleated blind of 80x120 cm starts around €95. Duette (insulating) and top-down/bottom-up variants cost more. Ideal for special window shapes."
    },
    dakraamzonwering: {
      productName: "Skylight Shade",
      basePrice: 180,
      priceRange: "€180 - €450",
      factors: ["window type", "dimensions", "fabric choice", "installation method"],
      sampleSizing: "78x118 cm (standard Velux)",
      description: "Skylight shading for a standard Velux window (78x118 cm) starts around €180. Price depends on window type, desired light filtering and installation method (clips or screws)."
    },
    screen: {
      productName: "Screen Shade",
      basePrice: 140,
      priceRange: "€140 - €380",
      factors: ["width", "height", "openness percentage", "color"],
      sampleSizing: "150x200 cm",
      description: "A screen shade of 150x200 cm starts around €140. Different openness percentages (1%, 3%, 5%, 10%) determine price and light transmission."
    }
  },
  fr: {
    rolgordijn: {
      productName: "Store Enrouleur",
      basePrice: 85,
      priceRange: "€85 - €250",
      factors: ["largeur", "hauteur", "choix du tissu", "mécanisme"],
      sampleSizing: "100x200 cm",
      description: "Un store enrouleur occultant standard de 100x200 cm commence autour de €85. Les prix varient selon les dimensions, le choix du tissu (basique, premium, designer) et le mécanisme (cordon, ressort, moteur). Utilisez notre calculateur en ligne pour un prix exact."
    },
    jaloezie: {
      productName: "Store Vénitien Bois",
      basePrice: 120,
      priceRange: "€120 - €350",
      factors: ["largeur", "hauteur", "type de bois", "épaisseur des lames"],
      sampleSizing: "100x150 cm",
      description: "Un store vénitien en bois de 100x150 cm avec lames de 50mm commence autour de €120. Les essences premium comme le bambou ou le chêne coûtent plus cher. Prix déterminé par les dimensions, type de bois et épaisseur des lames."
    },
    overgordijn: {
      productName: "Rideaux",
      basePrice: 150,
      priceRange: "€150 - €450",
      factors: ["largeur", "hauteur", "choix du tissu", "plis", "système d'accroche"],
      sampleSizing: "200x250 cm",
      description: "Un rideau sur mesure de 200x250 cm commence à partir de €150. Les tissus luxueux, techniques de plis spéciaux et motorisation augmentent le prix. Rails et quincaillerie inclus."
    },
    plisse: {
      productName: "Store Plissé",
      basePrice: 95,
      priceRange: "€95 - €280",
      factors: ["largeur", "hauteur", "type de tissu", "mécanisme"],
      sampleSizing: "80x120 cm",
      description: "Un store plissé de 80x120 cm commence autour de €95. Les variantes Duette (isolantes) et top-down/bottom-up coûtent plus cher. Idéal pour les formes de fenêtres spéciales."
    },
    dakraamzonwering: {
      productName: "Store Velux",
      basePrice: 180,
      priceRange: "€180 - €450",
      factors: ["type de fenêtre", "dimensions", "choix du tissu", "méthode d'installation"],
      sampleSizing: "78x118 cm (Velux standard)",
      description: "Store pour fenêtre de toit Velux standard (78x118 cm) commence autour de €180. Prix dépend du type de fenêtre, filtrage lumineux souhaité et méthode d'installation (clips ou vis)."
    },
    screen: {
      productName: "Store Screen",
      basePrice: 140,
      priceRange: "€140 - €380",
      factors: ["largeur", "hauteur", "pourcentage d'ouverture", "couleur"],
      sampleSizing: "150x200 cm",
      description: "Un store screen de 150x200 cm commence autour de €140. Différents pourcentages d'ouverture (1%, 3%, 5%, 10%) déterminent le prix et la transmission lumineuse."
    }
  },
  tr: {
    rolgordijn: {
      productName: "Stor Perde",
      basePrice: 85,
      priceRange: "€85 - €250",
      factors: ["genişlik", "yükseklik", "kumaş seçimi", "mekanizma"],
      sampleSizing: "100x200 cm",
      description: "100x200 cm standart karartma stor perde €85 civarında başlar. Fiyatlar boyutlara, kumaş seçimine (temel, premium, tasarımcı) ve mekanizmaya (kordon, yay, motor) göre değişir. Tam fiyat için online hesaplayıcımızı kullanın."
    },
    jaloezie: {
      productName: "Ahşap Jaluzi",
      basePrice: 120,
      priceRange: "€120 - €350",
      factors: ["genişlik", "yükseklik", "ahşap türü", "kanat kalınlığı"],
      sampleSizing: "100x150 cm",
      description: "100x150 cm 50mm kanatlı ahşap jaluzi €120 civarında başlar. Bambu veya meşe gibi premium ahşap türleri daha pahalıdır. Fiyat boyutlar, ahşap türü ve kanat kalınlığına göre belirlenir."
    },
    overgordijn: {
      productName: "Perde",
      basePrice: 150,
      priceRange: "€150 - €450",
      factors: ["genişlik", "yükseklik", "kumaş seçimi", "pile", "asma yöntemi"],
      sampleSizing: "200x250 cm",
      description: "200x250 cm özel perde €150'den başlar. Lüks kumaşlar, özel pile teknikleri ve motorlu sistemler fiyatı artırır. Ray ve askı donanımı dahildir."
    },
    plisse: {
      productName: "Plise Perde",
      basePrice: 95,
      priceRange: "€95 - €280",
      factors: ["genişlik", "yükseklik", "kumaş türü", "mekanizma"],
      sampleSizing: "80x120 cm",
      description: "80x120 cm plise perde €95 civarında başlar. Duette (yalıtımlı) ve yukarıdan-aşağıya/aşağıdan-yukarıya varyantları daha pahalıdır. Özel pencere şekilleri için idealdir."
    },
    dakraamzonwering: {
      productName: "Çatı Penceresi Güneşliği",
      basePrice: 180,
      priceRange: "€180 - €450",
      factors: ["pencere türü", "boyutlar", "kumaş seçimi", "montaj yöntemi"],
      sampleSizing: "78x118 cm (standart Velux)",
      description: "Standart Velux penceresi (78x118 cm) için çatı güneşliği €180 civarında başlar. Fiyat pencere türü, istenen ışık filtreleme ve montaj yöntemine (klips veya vida) bağlıdır."
    },
    screen: {
      productName: "Screen Güneşlik",
      basePrice: 140,
      priceRange: "€140 - €380",
      factors: ["genişlik", "yükseklik", "açıklık yüzdesi", "renk"],
      sampleSizing: "150x200 cm",
      description: "150x200 cm screen güneşlik €140 civarında başlar. Farklı açıklık yüzdeleri (1%, 3%, 5%, 10%) fiyat ve ışık geçirgenliğini belirler."
    }
  }
};

/**
 * Get specific product pricing information in the requested language
 */
export function getProductPricingInfo(productKey: string, language: string): ProductPricingInfo | null {
  const langKey = language === 'nl' ? 'nl' : 
                 language === 'en' ? 'en' :
                 language === 'fr' ? 'fr' :
                 language === 'tr' ? 'tr' : 'nl';
  
  const productData = PRODUCT_PRICING_KNOWLEDGE[langKey];
  
  // Try exact match first
  if (productData[productKey as keyof typeof productData]) {
    return {
      ...productData[productKey as keyof typeof productData],
      language: langKey
    };
  }
  
  // Try partial matches for product variations
  const matchingProduct = Object.keys(productData).find(key => 
    key.includes(productKey) || productKey.includes(key)
  );
  
  if (matchingProduct) {
    return {
      ...productData[matchingProduct as keyof typeof productData],
      language: langKey
    };
  }
  
  return null;
}

/**
 * Extract product types from user message
 */
export function extractProductTypes(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const productPatterns = [
    'rolgordijn', 'overgordijn', 'vitrage', 'jaloezie', 'jaluzi', 'lamellen',
    'plissé', 'plise', 'vouwgordijn', 'shutters', 'luiken', 'hor', 'screen',
    'folie', 'duo', 'dakraam', 'velux', 'zonwering', 'markies',
    'roller blind', 'venetian blind', 'vertical blind', 'curtain', 'drape',
    'awning', 'canopy', 'shutter', 'blind',
    'rideau', 'store', 'volet', 'banne', 'jalousie',
    'perde', 'stor', 'güneşlik', 'tente', 'jalezi'
  ];
  
  return productPatterns.filter(product => 
    lowerMessage.includes(product.toLowerCase())
  );
}

/**
 * Generate intelligent pricing response based on detected products
 */
export function generateProductPricingResponse(
  detectedProducts: string[], 
  language: string, 
  userMessage: string
): string {
  if (detectedProducts.length === 0) {
    return getGenericPricingResponse(language);
  }
  
  const primaryProduct = detectedProducts[0];
  const pricingInfo = getProductPricingInfo(primaryProduct, language);
  
  if (!pricingInfo) {
    return getGenericPricingResponse(language);
  }
  
  // Check if user mentioned specific dimensions
  const dimensionMatch = userMessage.match(/(\d+)\s*[x×]\s*(\d+)/);
  let customSizing = "";
  
  if (dimensionMatch) {
    const width = dimensionMatch[1];
    const height = dimensionMatch[2];
    customSizing = language === 'nl' ? ` voor een ${width}x${height} cm` :
                  language === 'en' ? ` for a ${width}x${height} cm` :
                  language === 'fr' ? ` pour un ${width}x${height} cm` :
                  language === 'tr' ? ` ${width}x${height} cm için` : '';
  }
  
  return pricingInfo.description + customSizing;
}

/**
 * Fallback generic pricing response by language
 */
function getGenericPricingResponse(language: string): string {
  const responses = {
    nl: "Voor een nauwkeurige prijsopgave plannen we graag een gratis thuismeting in. Onze specialist kan u dan exact adviseren en een maatwerkofferte opstellen. Prijzen zijn afhankelijk van afmetingen, gekozen materialen en installatiemogelijkheden.",
    en: "For an accurate quote, we'd like to schedule a free home measurement. Our specialist can then provide exact advice and create a custom quote. Prices depend on dimensions, chosen materials and installation options.",
    fr: "Pour un devis précis, nous aimerions planifier une prise de mesures gratuite à domicile. Notre spécialiste pourra alors vous conseiller exactement et établir un devis sur mesure. Les prix dépendent des dimensions, des matériaux choisis et des options d'installation.",
    tr: "Doğru bir fiyat teklifi için ücretsiz bir ev ölçümü planlamak istiyoruz. Uzmanımız size tam olarak tavsiyelerde bulunabilir ve özel bir teklif oluşturabilir. Fiyatlar boyutlara, seçilen malzemelere ve kurulum seçeneklerine bağlıdır."
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}