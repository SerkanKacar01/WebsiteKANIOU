/**
 * Advanced Language Detection and Response Generation
 * Automatically detects user language and generates appropriate multilingual responses
 */

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface LanguageDetectionResult {
  detectedLanguage: string;
  confidence: number;
  suggestedResponse?: string;
}

export interface MultilingualKnowledge {
  nl: string;
  fr: string;
  en: string;
  tr: string;
  ar?: string;
}

/**
 * Detect language from user input using OpenAI
 */
export async function detectUserLanguage(userMessage: string): Promise<LanguageDetectionResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a language detection expert. Analyze the given text and determine the language.
          
          Respond with a JSON object in this exact format:
          {
            "language": "language_code",
            "confidence": confidence_score_0_to_1
          }
          
          Supported languages:
          - nl (Dutch/Nederlands)
          - fr (French/Français) 
          - en (English)
          - tr (Turkish/Türkçe)
          - ar (Arabic)
          
          For mixed language input, choose the primary language.
          Confidence should be 0.8+ for clear detection, 0.5-0.8 for uncertain cases.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.1,
      max_tokens: 100,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      detectedLanguage: result.language || 'nl',
      confidence: result.confidence || 0.5
    };

  } catch (error) {
    console.error("Language detection error:", error);
    // Fallback to simple keyword detection
    return detectLanguageKeywords(userMessage);
  }
}

/**
 * Simple keyword-based language detection as fallback
 */
function detectLanguageKeywords(message: string): LanguageDetectionResult {
  const lowerMessage = message.toLowerCase();
  
  const languageKeywords = {
    fr: ['bonjour', 'merci', 'comment', 'voulez', 'pouvez', 'est-ce', 'vous', 'store', 'rideau', 'fenêtre'],
    en: ['hello', 'thank', 'please', 'could', 'would', 'install', 'blind', 'curtain', 'window'],
    tr: ['merhaba', 'teşekkür', 'lütfen', 'nasıl', 'nedir', 'perde', 'güneşlik', 'pencere'],
    ar: ['مرحبا', 'شكرا', 'من فضلك', 'كيف', 'ماذا', 'ستارة', 'نافذة']
  };

  let bestMatch = { language: 'nl', score: 0 };

  Object.entries(languageKeywords).forEach(([lang, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (lowerMessage.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > bestMatch.score) {
      bestMatch = { language: lang, score };
    }
  });

  return {
    detectedLanguage: bestMatch.language,
    confidence: bestMatch.score > 0 ? 0.7 : 0.3
  };
}

/**
 * Get comprehensive knowledge base in multiple languages
 */
export function getMultilingualKnowledge(): Record<string, MultilingualKnowledge> {
  return {
    company_info: {
      nl: "KANIOU is een premium specialist in gordijnen, zonwering en raambekleding. Wij bieden maatwerkoplossingen met gratis thuisopmeting en professionele installatie.",
      fr: "KANIOU est un spécialiste premium des rideaux, stores et habillages de fenêtres. Nous offrons des solutions sur mesure avec prise de mesures gratuite à domicile et installation professionnelle.",
      en: "KANIOU is a premium specialist in curtains, blinds and window treatments. We offer custom solutions with free home measurement and professional installation.",
      tr: "KANIOU, perde, güneşlik ve pencere kaplamaları konusunda premium bir uzmandır. Ücretsiz ev ölçümü ve profesyonel kurulum ile özel çözümler sunuyoruz.",
      ar: "كانيو متخصص متميز في الستائر والمظلات وعلاجات النوافذ. نقدم حلول مخصصة مع قياس منزلي مجاني وتركيب احترافي."
    },
    
    services: {
      nl: "Onze diensten omvatten: gratis thuisopmeting, professioneel advies, maatwerk gordijnen en zonwering, installatie door vakspecialisten, nazorg en onderhoud.",
      fr: "Nos services comprennent : prise de mesures gratuite à domicile, conseils professionnels, rideaux et stores sur mesure, installation par des spécialistes, suivi et entretien.",
      en: "Our services include: free home measurement, professional advice, custom curtains and blinds, installation by specialists, aftercare and maintenance.",
      tr: "Hizmetlerimiz şunları içerir: ücretsiz ev ölçümü, profesyonel danışmanlık, özel perde ve güneşlikler, uzmanlar tarafından kurulum, bakım ve destek.",
      ar: "تشمل خدماتنا: قياس منزلي مجاني، استشارة احترافية، ستائر ومظلات مخصصة، تركيب بواسطة متخصصين، رعاية وصيانة."
    },

    pricing_response: {
      nl: "Voor een accurate prijsopgave maken wij graag een afspraak voor een gratis opmeting aan huis. Onze specialist kan dan exact adviseren en een maatwerkofferte opstellen. Prijzen zijn afhankelijk van afmetingen, gekozen materialen en montagemogelijkheden.",
      fr: "Pour un devis précis, nous aimerions prendre rendez-vous pour une prise de mesures gratuite à domicile. Notre spécialiste pourra alors vous conseiller exactement et établir un devis sur mesure. Les prix dépendent des dimensions, des matériaux choisis et des possibilités de montage.",
      en: "For an accurate quote, we'd be happy to schedule a free home measurement. Our specialist can provide exact advice and create a custom quote. Prices depend on dimensions, chosen materials and installation options.",
      tr: "Doğru bir fiyat teklifi için ücretsiz bir ev ölçümü randevusu almaktan mutluluk duyarız. Uzmanımız size tam olarak tavsiyelerde bulunabilir ve özel bir teklif oluşturabilir. Fiyatlar boyutlara, seçilen malzemelere ve kurulum seçeneklerine bağlıdır.",
      ar: "للحصول على عرض أسعار دقيق، نود جدولة قياس منزلي مجاني. يمكن لأخصائينا تقديم نصائح دقيقة وإنشاء عرض أسعار مخصص. تعتمد الأسعار على الأبعاد والمواد المختارة وخيارات التركيب."
    }
  };
}

/**
 * Get language-specific pricing keywords for detection
 */
export function getPricingKeywords(language: string): string[] {
  const keywords = {
    nl: ["prijs", "kosten", "budget", "offerte", "tarief", "geld", "betalen", "euro", "per meter", "per stuk", "hoeveel kost", "wat kost", "prijsklasse", "duur", "goedkoop"],
    en: ["price", "cost", "budget", "quote", "rate", "money", "pay", "dollar", "euro", "per meter", "how much", "expensive", "cheap", "pricing"],
    fr: ["prix", "coût", "budget", "devis", "tarif", "argent", "payer", "euro", "par mètre", "combien", "cher", "pas cher"],
    tr: ["fiyat", "maliyet", "bütçe", "teklif", "tarife", "para", "ödeme", "euro", "metre başına", "ne kadar", "pahalı", "ucuz"],
    ar: ["سعر", "تكلفة", "ميزانية", "عرض", "تعرفة", "مال", "دفع", "يورو", "للمتر", "كم", "غالي", "رخيص"]
  };

  return keywords[language as keyof typeof keywords] || keywords.nl;
}

/**
 * Get product keywords in different languages
 */
export function getProductKeywords(language: string): Record<string, string[]> {
  const keywords = {
    nl: {
      "gordijnen": ["gordijn", "gordijnen", "overgordijn", "vitrage"],
      "jalouzieën": ["jaloezieën", "jaloezie", "lamellen"],
      "rolgordijnen": ["rolgordijn", "rolgordijnen", "rol"],
      "vouwgordijnen": ["vouwgordijn", "vouwgordijnen", "plissé"],
      "zonwering": ["zonwering", "zonnescherm", "markies"]
    },
    en: {
      "curtains": ["curtain", "curtains", "drape", "drapes"],
      "blinds": ["blind", "blinds", "venetian", "slat"],
      "roller_blinds": ["roller", "roller blind", "roll"],
      "roman_blinds": ["roman", "roman blind", "fold"],
      "awnings": ["awning", "shade", "sun protection"]
    },
    fr: {
      "rideaux": ["rideau", "rideaux", "draperie"],
      "stores": ["store", "stores", "jalousie"],
      "stores_enrouleurs": ["store enrouleur", "enrouleur"],
      "stores_bateau": ["store bateau", "bateau"],
      "protection_solaire": ["protection solaire", "store banne"]
    },
    tr: {
      "perdeler": ["perde", "perdeler", "fon perde"],
      "jaluzi": ["jaluzi", "ahşap jaluzi"],
      "stor_perde": ["stor", "stor perde"],
      "güneşlik": ["güneşlik", "tente", "markiz"]
    }
  };

  return keywords[language as keyof typeof keywords] || keywords.nl;
}