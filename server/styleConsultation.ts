/**
 * Interior Style Consultation Engine for KANIOU
 * Intelligent conversation flow for window treatment recommendations
 */

export interface ConsultationStep {
  step: string;
  question: string;
  options?: string[];
  allowCustomInput?: boolean;
  nextStep?: string;
}

export interface StyleRecommendation {
  productType: string;
  productName: string;
  description: string;
  priceRange: string;
  features: string[];
  materials: string[];
  colors: string[];
  suitability: string;
  installationType: string;
  maintenanceLevel: string;
  reasons: string[];
}

export interface ConsultationResponse {
  message: string;
  step: string;
  options?: string[];
  allowCustomInput?: boolean;
  isCompleted?: boolean;
  recommendations?: StyleRecommendation[];
  visualMockup?: string;
  nextSteps?: string[];
}

// Question structure interface
interface QuestionData {
  question: string;
  options: string[];
  allowCustomInput?: boolean;
}

// Multilingual consultation questions
const CONSULTATION_QUESTIONS: Record<string, Record<string, QuestionData>> = {
  nl: {
    room_type: {
      question: "Voor welke ruimte zoekt u raambekleding?",
      options: [
        "Woonkamer",
        "Slaapkamer", 
        "Keuken",
        "Badkamer",
        "Kinderkamer",
        "Kantoor/Studeerkamer",
        "Hal/Gang",
        "Zolder/Dakraam",
        "Anders"
      ]
    },
    primary_goal: {
      question: "Wat is uw belangrijkste doel met deze raambekleding?",
      options: [
        "Privacy",
        "Verduistering (slaap)",
        "Lichtfiltering",
        "Warmteregulatie",
        "Decoratie/stijl",
        "Combinatie van functies"
      ]
    },
    style_preference: {
      question: "Welke interieurstijl past het beste bij uw ruimte?",
      options: [
        "Modern/Minimalistisch",
        "Klassiek/Traditioneel",
        "Japandi/Scandinavisch",
        "Industrieel",
        "Landelijk/Rustiek",
        "Luxe/Elegant",
        "Bohemian/Eclectisch"
      ]
    },
    color_material: {
      question: "Heeft u voorkeur voor bepaalde kleuren of materialen?",
      options: [
        "Neutrale tinten (wit, grijs, beige)",
        "Warme kleuren (bruin, crème, goud)",
        "Koele kleuren (blauw, groen, zilver)",
        "Natuurlijke materialen (hout, bamboe)",
        "Moderne materialen (aluminium, polyester)",
        "Geen specifieke voorkeur"
      ],
      allowCustomInput: true
    },
    budget: {
      question: "Wat is uw geschatte budget per raam?",
      options: [
        "€50 - €150 (basis)",
        "€150 - €300 (gemiddeld)", 
        "€300 - €500 (premium)",
        "€500+ (luxe)",
        "Budget niet belangrijk"
      ]
    }
  },
  fr: {
    room_type: {
      question: "Pour quelle pièce cherchez-vous des stores ou rideaux?",
      options: [
        "Salon",
        "Chambre",
        "Cuisine", 
        "Salle de bain",
        "Chambre d'enfant",
        "Bureau",
        "Couloir/Entrée",
        "Combles/Fenêtre de toit",
        "Autre"
      ]
    },
    primary_goal: {
      question: "Quel est votre objectif principal avec ces stores/rideaux?",
      options: [
        "Intimité",
        "Obscurcissement (sommeil)",
        "Filtrage de lumière", 
        "Régulation thermique",
        "Décoration/style",
        "Combinaison de fonctions"
      ]
    },
    style_preference: {
      question: "Quel style d'intérieur correspond le mieux à votre espace?",
      options: [
        "Moderne/Minimaliste",
        "Classique/Traditionnel",
        "Japandi/Scandinave",
        "Industriel",
        "Campagnard/Rustique", 
        "Luxe/Élégant",
        "Bohème/Éclectique"
      ]
    },
    color_material: {
      question: "Avez-vous des préférences pour certaines couleurs ou matériaux?",
      options: [
        "Tons neutres (blanc, gris, beige)",
        "Couleurs chaudes (brun, crème, or)",
        "Couleurs froides (bleu, vert, argent)",
        "Matériaux naturels (bois, bambou)",
        "Matériaux modernes (aluminium, polyester)",
        "Pas de préférence spécifique"
      ],
      allowCustomInput: true
    },
    budget: {
      question: "Quel est votre budget estimé par fenêtre?",
      options: [
        "€50 - €150 (basique)",
        "€150 - €300 (moyen)",
        "€300 - €500 (premium)", 
        "€500+ (luxe)",
        "Budget pas important"
      ]
    }
  },
  en: {
    room_type: {
      question: "Which room are you looking to decorate with window treatments?",
      options: [
        "Living Room",
        "Bedroom",
        "Kitchen",
        "Bathroom",
        "Child's Room",
        "Office/Study",
        "Hallway",
        "Attic/Skylight",
        "Other"
      ]
    },
    primary_goal: {
      question: "What is your primary goal with these window treatments?",
      options: [
        "Privacy",
        "Blackout (sleep)",
        "Light filtering",
        "Heat control", 
        "Decoration/style",
        "Combination of functions"
      ]
    },
    style_preference: {
      question: "Which interior style best fits your space?",
      options: [
        "Modern/Minimalist",
        "Classic/Traditional",
        "Japandi/Scandinavian", 
        "Industrial",
        "Country/Rustic",
        "Luxury/Elegant",
        "Bohemian/Eclectic"
      ]
    },
    color_material: {
      question: "Do you have preferences for certain colors or materials?",
      options: [
        "Neutral tones (white, grey, beige)",
        "Warm colors (brown, cream, gold)",
        "Cool colors (blue, green, silver)",
        "Natural materials (wood, bamboo)",
        "Modern materials (aluminum, polyester)",
        "No specific preference"
      ],
      allowCustomInput: true
    },
    budget: {
      question: "What is your estimated budget per window?",
      options: [
        "€50 - €150 (basic)",
        "€150 - €300 (average)",
        "€300 - €500 (premium)",
        "€500+ (luxury)", 
        "Budget not important"
      ]
    }
  },
  tr: {
    room_type: {
      question: "Hangi oda için perde veya stor arıyorsunuz?",
      options: [
        "Oturma Odası",
        "Yatak Odası",
        "Mutfak",
        "Banyo", 
        "Çocuk Odası",
        "Ofis/Çalışma Odası",
        "Koridor",
        "Çatı Katı/Çatı Penceresi",
        "Diğer"
      ]
    },
    primary_goal: {
      question: "Bu perde/stor ile ana hedefiniz nedir?",
      options: [
        "Mahremiyet",
        "Karartma (uyku)",
        "Işık filtreleme",
        "Sıcaklık kontrolü",
        "Dekorasyon/stil", 
        "Fonksiyon kombinasyonu"
      ]
    },
    style_preference: {
      question: "Hangi iç mekan stili alanınıza en uygun?",
      options: [
        "Modern/Minimalist",
        "Klasik/Geleneksel",
        "Japandi/İskandinav",
        "Endüstriyel",
        "Kırsal/Rustik",
        "Lüks/Zarif",
        "Bohem/Eklektik"
      ]
    },
    color_material: {
      question: "Belirli renkler veya malzemeler için tercihiniz var mı?",
      options: [
        "Nötr tonlar (beyaz, gri, bej)",
        "Sıcak renkler (kahverengi, krem, altın)",
        "Soğuk renkler (mavi, yeşil, gümüş)",
        "Doğal malzemeler (ahşap, bambu)",
        "Modern malzemeler (alüminyum, polyester)",
        "Özel tercih yok"
      ],
      allowCustomInput: true
    },
    budget: {
      question: "Pencere başına tahmini bütçeniz nedir?",
      options: [
        "€50 - €150 (temel)",
        "€150 - €300 (ortalama)",
        "€300 - €500 (premium)",
        "€500+ (lüks)",
        "Bütçe önemli değil"
      ]
    }
  }
};

// Product recommendation engine
const PRODUCT_RECOMMENDATIONS = {
  // Living Room recommendations
  "Woonkamer": {
    "Modern/Minimalistisch": {
      "Privacy": [
        {
          productType: "Duo Rolgordijnen",
          productName: "Duo Roller Blinds - Modern Collection",
          description: "Elegante duo rolgordijnen die privacy en lichtcontrole perfect combineren",
          priceRange: "€95 - €180 per raam",
          features: ["Dag/nacht functie", "Lichtfiltering", "Privacy", "Moderne look"],
          materials: ["Polyester", "Lichtfilterend weefsel"],
          colors: ["Wit", "Lichtgrijs", "Antraciet", "Taupe"],
          suitability: "Perfect voor moderne woonkamers",
          installationType: "Muurmontage of plafonmontage",
          maintenanceLevel: "Laag onderhoud",
          reasons: ["Strakke, minimalistische uitstraling", "Flexibele lichtcontrole", "Ideaal voor grote ramen"]
        }
      ],
      "Verduistering (slaap)": [
        {
          productType: "Blackout Rolgordijnen", 
          productName: "Blackout Roller Blinds Premium",
          description: "Volledige verduistering voor optimale privacy en slaapkwaliteit",
          priceRange: "€85 - €160 per raam",
          features: ["100% verduistering", "Geluidsdemping", "Energiebesparend"],
          materials: ["Blackout polyester", "Thermische coating"],
          colors: ["Wit", "Crème", "Antraciet"],
          suitability: "Uitstekend voor slaapkamers en media ruimtes",
          installationType: "Binnen het raamkozijn",
          maintenanceLevel: "Zeer laag onderhoud", 
          reasons: ["Volledige lichtblokkering", "Energiebesparend", "Moderne esthetiek"]
        }
      ]
    },
    "Klassiek/Traditioneel": {
      "Decoratie/stijl": [
        {
          productType: "Overgordijnen",
          productName: "Classic Curtains - Traditional Line",
          description: "Luxueuze overgordijnen die warmte en elegantie uitstralen",
          priceRange: "€120 - €280 per raam",
          features: ["Rijke texturen", "Plooien", "Warmte-isolatie", "Tijdloze elegantie"],
          materials: ["Velours", "Zijde-look", "Linnenmix"],
          colors: ["Bordeaux", "Diepblauw", "Goud", "Smaragdgroen"],
          suitability: "Perfect voor klassieke en traditionele interieurs",
          installationType: "Gordijnroede of rails",
          maintenanceLevel: "Gemiddeld onderhoud",
          reasons: ["Klassieke uitstraling", "Luxueuze texturen", "Warmte en gezelligheid"]
        }
      ]
    }
  },
  
  // Bedroom recommendations  
  "Slaapkamer": {
    "Modern/Minimalistisch": {
      "Verduistering (slaap)": [
        {
          productType: "Duo Rolgordijnen",
          productName: "Blackout Duo Rollers - Sleep Collection", 
          description: "Speciale duo rolgordijnen met blackout functie voor perfecte nachtrust",
          priceRange: "€110 - €195 per raam",
          features: ["100% verduistering", "Geluidsisolatie", "Dag/nacht optie"],
          materials: ["Blackout polyester", "Thermisch weefsel"],
          colors: ["Wit", "Lichtgrijs", "Taupe", "Antraciet"],
          suitability: "Ideaal voor slaapkamers die volledige duisternis vereisen",
          installationType: "Plafond- of wandmontage",
          maintenanceLevel: "Zeer laag onderhoud",
          reasons: ["Optimale slaapkwaliteit", "Moderne uitstraling", "Flexibele lichtcontrole"]
        }
      ]
    }
  },

  // Kitchen recommendations
  "Keuken": {
    "Industrieel": {
      "Lichtfiltering": [
        {
          productType: "Aluminium Jaloezieen",
          productName: "Slimline Aluminum Venetian Blinds",
          description: "Praktische aluminium jaloezieen perfect voor keukenomgevingen",
          priceRange: "€65 - €130 per raam", 
          features: ["Vocht bestendig", "Gemakkelijk schoon te maken", "Flexibele lichtcontrole"],
          materials: ["Aluminium", "Roestvrij"],
          colors: ["Zilver", "Wit", "Antraciet", "Brons"],
          suitability: "Perfect voor keukens en vochtige ruimtes",
          installationType: "Binnen het raamkozijn",
          maintenanceLevel: "Zeer laag onderhoud",
          reasons: ["Hygiënisch en gemakkelijk schoon", "Industriële look", "Vocht resistent"]
        }
      ]
    }
  },

  // Bathroom recommendations
  "Badkamer": {
    "*": {
      "Privacy": [
        {
          productType: "Aluminium Jaloezieen",
          productName: "Bathroom Safe Aluminum Blinds",
          description: "Speciaal ontwikkelde jaloezieen voor badkamers",
          priceRange: "€70 - €140 per raam",
          features: ["100% vocht bestendig", "Privacy", "Schimmelvrij", "Anti-bacterieel"],
          materials: ["Geanodiseerd aluminium", "Polyester koorden"],
          colors: ["Wit", "Zilver", "Lichtgrijs"],
          suitability: "Speciaal ontwikkeld voor badkamers",
          installationType: "Muurmontage (vocht veilig)",
          maintenanceLevel: "Zeer laag onderhoud",
          reasons: ["Volledig vochtbestendig", "Hygiënisch", "Privacy behoud"]
        }
      ]
    }
  }
};

/**
 * Generate consultation question based on current step and language
 */
export function getConsultationQuestion(step: string, language: string = 'nl'): ConsultationStep | null {
  const questions = CONSULTATION_QUESTIONS[language as keyof typeof CONSULTATION_QUESTIONS];
  if (!questions || !questions[step as keyof typeof questions]) {
    return null;
  }

  const questionData = questions[step as keyof typeof questions];
  return {
    step,
    question: questionData.question,
    options: questionData.options,
    allowCustomInput: 'allowCustomInput' in questionData ? questionData.allowCustomInput : false,
    nextStep: getNextStep(step)
  };
}

/**
 * Determine next step in consultation flow
 */
function getNextStep(currentStep: string): string {
  const stepOrder = ['room_type', 'primary_goal', 'style_preference', 'color_material', 'budget', 'recommendations'];
  const currentIndex = stepOrder.indexOf(currentStep);
  return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : 'recommendations';
}

/**
 * Generate product recommendations based on consultation data
 */
export function generateRecommendations(
  roomType: string,
  primaryGoal: string, 
  stylePreference: string,
  colorMaterial?: string,
  budget?: string,
  language: string = 'nl'
): StyleRecommendation[] {
  
  console.log(`🎨 GENERATING RECOMMENDATIONS: Room: ${roomType}, Goal: ${primaryGoal}, Style: ${stylePreference}`);
  
  // Get recommendations for the specific room and style
  const roomRecommendations = PRODUCT_RECOMMENDATIONS[roomType as keyof typeof PRODUCT_RECOMMENDATIONS];
  
  if (!roomRecommendations) {
    return getGenericRecommendations(primaryGoal, stylePreference, language);
  }

  // Look for specific style match
  let recommendations = roomRecommendations[stylePreference as keyof typeof roomRecommendations];
  
  // Fallback to generic style if not found
  if (!recommendations) {
    recommendations = roomRecommendations["*" as keyof typeof roomRecommendations] || 
                     Object.values(roomRecommendations)[0];
  }

  if (!recommendations) {
    return getGenericRecommendations(primaryGoal, stylePreference, language);
  }

  // Get recommendations for the primary goal
  const goalRecommendations = recommendations[primaryGoal as keyof typeof recommendations];
  
  if (!goalRecommendations) {
    // Fallback to first available goal
    const firstGoal = Object.values(recommendations)[0];
    return Array.isArray(firstGoal) ? firstGoal : [];
  }

  return goalRecommendations;
}

/**
 * Generate generic recommendations when specific combinations are not available
 */
function getGenericRecommendations(primaryGoal: string, stylePreference: string, language: string): StyleRecommendation[] {
  const generic: StyleRecommendation[] = [
    {
      productType: "Duo Rolgordijnen",
      productName: "Universal Duo Roller Collection",
      description: language === 'nl' ? 
        "Veelzijdige duo rolgordijnen geschikt voor verschillende ruimtes en stijlen" :
        "Versatile duo roller blinds suitable for various rooms and styles",
      priceRange: "€95 - €180",
      features: [
        language === 'nl' ? "Flexibele lichtcontrole" : "Flexible light control",
        language === 'nl' ? "Privacy" : "Privacy", 
        language === 'nl' ? "Moderne uitstraling" : "Modern appearance"
      ],
      materials: ["Polyester", language === 'nl' ? "Lichtfilterend weefsel" : "Light filtering fabric"],
      colors: [
        language === 'nl' ? "Wit" : "White",
        language === 'nl' ? "Grijs" : "Grey", 
        language === 'nl' ? "Beige" : "Beige"
      ],
      suitability: language === 'nl' ? "Geschikt voor de meeste ruimtes" : "Suitable for most rooms",
      installationType: language === 'nl' ? "Flexibele montage" : "Flexible installation",
      maintenanceLevel: language === 'nl' ? "Laag onderhoud" : "Low maintenance",
      reasons: [
        language === 'nl' ? "Universele toepassing" : "Universal application",
        language === 'nl' ? "Goede prijs-kwaliteit verhouding" : "Good price-quality ratio"
      ]
    }
  ];

  return generic;
}

/**
 * Generate final consultation response with recommendations
 */
export function generateConsultationSummary(
  recommendations: StyleRecommendation[],
  roomType: string,
  language: string = 'nl'
): string {
  
  const translations = {
    nl: {
      summary: "Gebaseerd op uw voorkeuren heb ik de perfecte raambekleding voor uw",
      found: "gevonden. Hier zijn mijn aanbevelingen:",
      quote: "Wilt u een gratis, gepersonaliseerde offerte ontvangen op basis van uw keuzes?",
      contact: "Een KANIOU interieurspecialist neemt binnen 24 uur contact met u op voor advies op maat."
    },
    fr: {
      summary: "Basé sur vos préférences, j'ai trouvé les stores parfaits pour votre",
      found: ". Voici mes recommandations:",
      quote: "Souhaitez-vous recevoir un devis gratuit et personnalisé basé sur vos choix?",
      contact: "Un spécialiste en décoration KANIOU vous contactera dans les 24 heures pour des conseils personnalisés."
    },
    en: {
      summary: "Based on your preferences, I found the perfect window treatments for your",
      found: ". Here are my recommendations:",
      quote: "Would you like to receive a free, personalized quote based on your choices?",
      contact: "A KANIOU interior specialist will contact you within 24 hours with tailored advice."
    },
    tr: {
      summary: "Tercihlerinize göre, sizin için mükemmel perde/stor çözümlerini",
      found: "buldum. İşte önerilerim:",
      quote: "Seçimlerinize göre ücretsiz, kişiselleştirilmiş bir teklif almak ister misiniz?",
      contact: "Bir KANIOU iç mekan uzmanı 24 saat içinde özel tavsiyeler için sizinle iletişime geçecektir."
    }
  };

  const t = translations[language as keyof typeof translations] || translations.nl;
  
  let summary = `${t.summary} ${roomType.toLowerCase()} ${t.found}\n\n`;
  
  recommendations.forEach((rec, index) => {
    summary += `**${index + 1}. ${rec.productName}**\n`;
    summary += `${rec.description}\n`;
    summary += `💰 ${rec.priceRange}\n`;
    summary += `✨ ${rec.features.join(', ')}\n\n`;
  });
  
  summary += `\n${t.quote}\n\n${t.contact}`;
  
  return summary;
}

/**
 * Detect if user wants to start style consultation
 */
export function isStyleConsultationRequest(message: string, language: string = 'nl'): boolean {
  const consultationKeywords = {
    nl: [
      'stijladvies', 'interieuradvies', 'raambekleding kiezen', 'wat past bij',
      'welke rolgordijn', 'welke gordijn', 'interieur hulp', 'decoratie advies',
      'raam decoratie', 'stijl consultatie', 'design advies', 'welke past',
      'help met kiezen', 'advies nodig', 'wat raad je aan'
    ],
    fr: [
      'conseil style', 'conseil décoration', 'choisir stores', 'choisir rideaux', 
      'décoration fenêtre', 'aide choix', 'conseil intérieur', 'que recommandez',
      'quel style', 'consultation design', 'aide décoration'
    ],
    en: [
      'style advice', 'interior advice', 'choose blinds', 'choose curtains',
      'window decoration', 'help choosing', 'design consultation', 'what recommend',
      'style consultation', 'interior help', 'decoration advice'
    ],
    tr: [
      'stil danışmanlığı', 'iç mekan tavsiye', 'perde seçimi', 'stor seçimi',
      'dekorasyon yardım', 'tasarım danışmanlık', 'ne önerirsin', 'stil yardım',
      'pencere dekorasyon', 'seçim yardımı'
    ]
  };

  const keywords = consultationKeywords[language as keyof typeof consultationKeywords] || consultationKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  return keywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Generate welcome message for style consultation
 */
export function getConsultationWelcomeMessage(language: string = 'nl'): string {
  const welcomeMessages = {
    nl: `🎨 **Welkom bij de KANIOU Stijl Consultatie!**

Ik help u graag de perfecte raambekleding te vinden die past bij uw ruimte, stijl en behoeften. 

Door een paar simpele vragen te beantwoorden, krijgt u expert aanbevelingen die perfect aansluiten bij uw interieur.

Laten we beginnen! 👇`,
    
    fr: `🎨 **Bienvenue dans la Consultation Style KANIOU !**

Je serais ravi de vous aider à trouver les stores ou rideaux parfaits qui correspondent à votre espace, style et besoins.

En répondant à quelques questions simples, vous recevrez des recommandations d'experts parfaitement adaptées à votre intérieur.

Commençons ! 👇`,
    
    en: `🎨 **Welcome to KANIOU Style Consultation!**

I'd be happy to help you find the perfect window treatments that match your space, style and needs.

By answering a few simple questions, you'll get expert recommendations that perfectly fit your interior.

Let's get started! 👇`,
    
    tr: `🎨 **KANIOU Stil Danışmanlığına Hoş Geldiniz!**

Alanınıza, stilinize ve ihtiyaçlarınıza uygun mükemmel perde/stor çözümlerini bulmanıza yardımcı olmaktan mutluluk duyarım.

Birkaç basit soruyu yanıtlayarak, iç mekanınıza mükemmel uyum sağlayan uzman öneriler alacaksınız.

Hadi başlayalım! 👇`
  };

  return welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.nl;
}