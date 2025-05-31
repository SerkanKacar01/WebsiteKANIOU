/**
 * Product Gallery Flow for Step 4 Smart Suggestion Buttons
 * Handles product gallery requests through chatbot interactions
 */

import { storage } from './storage';

// Product gallery detection keywords
const galleryKeywords = {
  nl: [
    'galerij', 'gallery', 'voorbeelden', 'examples', 'foto', 'photos', 'afbeeldingen', 'images',
    'toon', 'laat zien', 'bekijk', 'see', 'view', 'collection', 'collectie', 'portfolio',
    'inspiratie', 'inspiration', 'projecten', 'projects', 'realisaties', 'realizations'
  ],
  fr: [
    'galerie', 'gallery', 'exemples', 'examples', 'photos', 'images', 
    'montrer', 'voir', 'regarder', 'collection', 'portfolio',
    'inspiration', 'projets', 'réalisations'
  ],
  en: [
    'gallery', 'examples', 'photos', 'images', 'pictures',
    'show', 'see', 'view', 'look', 'collection', 'portfolio',
    'inspiration', 'projects', 'work', 'showcase'
  ],
  tr: [
    'galeri', 'örnekler', 'fotoğraflar', 'resimler',
    'göster', 'gör', 'bak', 'koleksiyon', 'portföy',
    'ilham', 'projeler', 'çalışmalar', 'sergileme'
  ]
};

/**
 * Detect if user message contains product gallery request
 */
export function detectProductGalleryRequest(message: string, language: string = 'nl'): boolean {
  const keywords = galleryKeywords[language as keyof typeof galleryKeywords] || galleryKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  // Check for gallery keywords
  const hasGalleryKeyword = keywords.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
  
  // Additional product-related keywords
  const hasProductKeywords = /\b(product|raambekleding|store|blind|curtain|perde|gordijn|jaloezie)\b/i.test(message);
  
  return hasGalleryKeyword && hasProductKeywords;
}

/**
 * Generate product gallery response with category options
 */
export function generateProductGalleryResponse(language: string = 'nl'): {
  content: string;
  showGalleryOptions: boolean;
  metadata: any;
} {
  const responses = {
    nl: {
      content: `🖼️ **KANIOU Productgalerij**

Hier zijn onze hoofdproductcategorieën met voorbeelden:

**🪟 Rolgordijnen & Screens**
• Blackout rolgordijnen voor slaapkamers
• Lichtdoorlatende screens voor woonkamers  
• Zonneschermen voor buitenruimtes

**🏠 Plissé & Vouwgordijnen**
• Dubbel plissé voor privacy en licht
• Honingraat plissé voor isolatie
• Top-down bottom-up systemen

**🎨 Luxe Gordijnen**
• Elektrische gordijnrails
• Designer stoffen collectie
• Maatwerk gordijnen

**🔧 Jaloeziëen**
• Houten jaloeziëen 
• Aluminium jaloeziëen
• Verticale lamellen

Welke categorie interesseert u het meest? Dan kan ik specifieke voorbeelden van onze projecten tonen!`,
      showGalleryOptions: true
    },
    fr: {
      content: `🖼️ **Galerie Produits KANIOU**

Voici nos principales catégories de produits avec exemples:

**🪟 Stores Enrouleurs & Screens**
• Stores occultants pour chambres
• Screens filtrants pour salons
• Stores solaires pour espaces extérieurs

**🏠 Stores Plissés**
• Double plissé pour intimité et lumière
• Plissé nid d'abeille pour isolation
• Systèmes top-down bottom-up

**🎨 Rideaux Luxe**
• Rails électriques
• Collection de tissus design
• Rideaux sur mesure

**🔧 Stores Vénitiens**
• Stores en bois
• Stores en aluminium
• Lames verticales

Quelle catégorie vous intéresse le plus? Je peux vous montrer des exemples spécifiques de nos projets!`,
      showGalleryOptions: true
    },
    en: {
      content: `🖼️ **KANIOU Product Gallery**

Here are our main product categories with examples:

**🪟 Roller Blinds & Screens**
• Blackout roller blinds for bedrooms
• Light-filtering screens for living rooms
• Solar screens for outdoor spaces

**🏠 Pleated & Cellular Shades**
• Double pleated for privacy and light
• Honeycomb pleated for insulation
• Top-down bottom-up systems

**🎨 Luxury Curtains**
• Electric curtain tracks
• Designer fabric collection
• Custom-made curtains

**🔧 Venetian Blinds**
• Wooden venetian blinds
• Aluminum venetian blinds
• Vertical slats

Which category interests you most? I can show specific examples of our projects!`,
      showGalleryOptions: true
    },
    tr: {
      content: `🖼️ **KANIOU Ürün Galerisi**

Ana ürün kategorilerimiz ve örnekleri:

**🪟 Stor Perdeler & Ekranlar**
• Yatak odaları için blackout stor perdeler
• Oturma odaları için ışık geçiren ekranlar
• Dış mekanlar için güneş ekranları

**🏠 Plise & Katlamalı Perdeler**
• Mahremiyet ve ışık için çift plise
• Yalıtım için bal peteği plise
• Yukarıdan aşağıya sistemler

**🎨 Lüks Perdeler**
• Elektrikli perde rayları
• Tasarımcı kumaş koleksiyonu
• Özel yapım perdeler

**🔧 Jaluzi**
• Ahşap jaluziler
• Alüminyum jaluziler
• Dikey lamel

Hangi kategori sizi en çok ilgilendiriyor? O zaman projelerimizden özel örnekler gösterebilirim!`,
      showGalleryOptions: true
    }
  };

  const response = responses[language as keyof typeof responses] || responses.nl;
  
  return {
    content: response.content,
    showGalleryOptions: response.showGalleryOptions,
    metadata: {
      type: 'product_gallery',
      hasCategories: true,
      categories: ['roller_blinds', 'pleated_shades', 'luxury_curtains', 'venetian_blinds']
    }
  };
}

/**
 * Generate specific category gallery response
 */
export function generateCategoryGalleryResponse(category: string, language: string = 'nl'): {
  content: string;
  metadata: any;
} {
  const categoryResponses = {
    roller_blinds: {
      nl: `🪟 **Rolgordijnen & Screens Galerij**

**Onze Meest Populaire Projecten:**

✨ **Project Moderne Villa Antwerpen**
• Blackout rolgordijnen in master bedroom
• Kleur: Antraciet grijs
• Elektrische bediening met app

🌅 **Project Penthouse Brussel**  
• Lichtdoorlatende screens in living
• UV-bescherming 95%
• Brandvertragend materiaal

🏡 **Project Gezinswoning Gent**
• Combinatie blackout + screen
• Kindveilige bediening
• 10 jaar garantie

**Interesse in meer details?** Vraag een gratis inmeetafspraak aan!`,
      en: `🪟 **Roller Blinds & Screens Gallery**

**Our Most Popular Projects:**

✨ **Modern Villa Antwerp Project**
• Blackout roller blinds in master bedroom
• Color: Anthracite grey
• Electric operation with app

🌅 **Brussels Penthouse Project**
• Light-filtering screens in living room
• 95% UV protection
• Fire-retardant material

🏡 **Ghent Family Home Project**
• Combination blackout + screen
• Child-safe operation
• 10-year warranty

**Interested in more details?** Request a free measurement appointment!`,
      fr: `🪟 **Galerie Stores Enrouleurs & Screens**

**Nos Projets Les Plus Populaires:**

✨ **Projet Villa Moderne Anvers**
• Stores occultants dans la chambre principale
• Couleur: Gris anthracite
• Commande électrique avec app

🌅 **Projet Penthouse Bruxelles**
• Screens filtrants dans le salon
• Protection UV 95%
• Matériau ignifuge

🏡 **Projet Maison Familiale Gand**
• Combinaison occultant + screen
• Commande sécurisée enfants
• Garantie 10 ans

**Intéressé par plus de détails?** Demandez un rendez-vous de mesure gratuit!`
    },
    pleated_shades: {
      nl: `🏠 **Plissé & Vouwgordijnen Galerij**

**Uitgelichte Projecten:**

🌟 **Project Luxe Appartement Leuven**
• Dubbel plissé systeem
• Perfect lichtcontrole
• Energiebesparing 30%

🎯 **Project Design Studio Mechelen**
• Top-down bottom-up plissé
• Privacy behoud met daglicht
• Maatwerk op elke raamvorm

🏢 **Project Kantoorgebouw Hasselt**
• Honingraat plissé voor isolatie
• Geluidsdemping
• Brandveilig gecertificeerd

Alle projecten komen met **gratis 3D visualisatie** vooraf!`,
      en: `🏠 **Pleated & Cellular Shades Gallery**

**Featured Projects:**

🌟 **Luxury Apartment Leuven Project**
• Double pleated system
• Perfect light control
• 30% energy savings

🎯 **Design Studio Mechelen Project**
• Top-down bottom-up pleated
• Privacy with natural light
• Custom fit for any window shape

🏢 **Office Building Hasselt Project**
• Honeycomb pleated for insulation
• Sound dampening
• Fire safety certified

All projects include **free 3D visualization** beforehand!`
    }
  };

  const categoryData = categoryResponses[category as keyof typeof categoryResponses];
  if (!categoryData) {
    return generateProductGalleryResponse(language);
  }

  const response = categoryData[language as keyof typeof categoryData] || categoryData.nl || categoryData.en;
  
  return {
    content: response,
    metadata: {
      type: 'category_gallery',
      category: category,
      hasProjects: true
    }
  };
}

/**
 * Check if user is asking about specific product category
 */
export function detectCategoryRequest(message: string, language: string = 'nl'): string | null {
  const lowerMessage = message.toLowerCase();
  
  // Category keywords
  const categoryKeywords = {
    roller_blinds: ['rolgordijn', 'roller blind', 'screen', 'store enrouleur', 'stor perde'],
    pleated_shades: ['plissé', 'pleated', 'vouwgordijn', 'cellular', 'honingraat'],
    luxury_curtains: ['gordijn', 'curtain', 'rideau', 'perde', 'luxe', 'luxury'],
    venetian_blinds: ['jaloezie', 'venetian', 'vénitien', 'jaluzi', 'lamel']
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
      return category;
    }
  }
  
  return null;
}