/**
 * Comprehensive Knowledge Integration System
 * Ensures chatbot has access to ALL website content without limitations
 */

import { storage } from "./storage";
import type { 
  ChatbotKnowledge, 
  Product, 
  Category, 
  GalleryItem, 
  Testimonial,
  QuoteRequest,
  WebsiteContentIndex 
} from "@shared/schema";
import { 
  generateSmartFilteredResponse,
  type FilteredResponse 
} from "./smartResponseFilter";
import { getComprehensiveWebsiteKnowledge } from "./websiteCrawler";

export interface ComprehensiveResponse {
  content: string;
  confidence: number;
  sources: string[];
  language: string;
  usedFallback: boolean;
}

/**
 * Get ALL website content for chatbot knowledge - ENHANCED WITH STEP 1 INDEXING
 */
export async function buildComprehensiveKnowledge(language: string = 'nl'): Promise<string> {
  try {
    // Gather ALL data sources in parallel INCLUDING indexed website content
    const [
      knowledgeBase,
      products,
      categories,
      galleryItems,
      testimonials,
      websiteContent
    ] = await Promise.all([
      storage.getChatbotKnowledge(),
      storage.getProducts(),
      storage.getCategories(),
      storage.getGalleryItems(),
      storage.getTestimonials(),
      storage.getWebsiteContentIndex(language)
    ]);

    let comprehensiveKnowledge = "";
    
    // STEP 1: Include comprehensive website content if available
    if (websiteContent.length > 0) {
      comprehensiveKnowledge += "=== COMPLETE WEBSITE CONTENT (STEP 1 INDEXED) ===\n";
      const contentByCategory: Record<string, WebsiteContentIndex[]> = {};
      
      websiteContent.forEach(content => {
        if (!contentByCategory[content.category]) {
          contentByCategory[content.category] = [];
        }
        contentByCategory[content.category].push(content);
      });
      
      Object.entries(contentByCategory).forEach(([category, contents]) => {
        comprehensiveKnowledge += `\n${category.toUpperCase()} CONTENT:\n`;
        contents.forEach(content => {
          comprehensiveKnowledge += `${content.pageTitle}: ${content.bodyContent.substring(0, 800)}\n`;
          if (content.keywords && Array.isArray(content.keywords)) {
            comprehensiveKnowledge += `Keywords: ${content.keywords.slice(0, 8).join(', ')}\n`;
          }
          comprehensiveKnowledge += "---\n";
        });
      });
      comprehensiveKnowledge += "\n";
    }

    // Language-specific instructions
    const languageInstructions = {
      nl: "JE BENT EEN EXPERT RAAMBEKLEDING ADVISEUR. Gebruik ALTIJD de volgende complete website informatie om vragen te beantwoorden. Geef NOOIT generieke antwoorden - gebruik altijd de echte data hieronder:",
      en: "YOU ARE AN EXPERT WINDOW TREATMENT ADVISOR. ALWAYS use the following complete website information to answer questions. NEVER give generic answers - always use the real data below:",
      fr: "VOUS ÊTES UN CONSEILLER EXPERT EN HABILLAGE DE FENÊTRES. Utilisez TOUJOURS les informations complètes du site web suivantes pour répondre aux questions. Ne donnez JAMAIS de réponses génériques - utilisez toujours les vraies données ci-dessous :",
      tr: "SİZ PENCERE KAPLAMA UZMAN DANIŞMANISINIZ. Soruları yanıtlamak için aşağıdaki tam web sitesi bilgilerini HER ZAMAN kullanın. HİÇBİR ZAMAN genel cevaplar vermeyin - her zaman aşağıdaki gerçek verileri kullanın:",
      ar: "أنت مستشار خبير في معالجات النوافذ. استخدم دائماً معلومات الموقع الشاملة التالية للإجابة على الأسئلة. لا تعطي أبداً إجابات عامة - استخدم دائماً البيانات الحقيقية أدناه:"
    };

    comprehensiveKnowledge += languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.nl;
    comprehensiveKnowledge += "\n\n";

    // 1. KNOWLEDGE BASE CONTENT
    if (knowledgeBase.length > 0) {
      comprehensiveKnowledge += "=== COMPLETE KNOWLEDGE BASE ===\n";
      
      const categorizedKnowledge = knowledgeBase.reduce((acc, kb) => {
        if (!acc[kb.category]) acc[kb.category] = [];
        acc[kb.category].push(kb);
        return acc;
      }, {} as Record<string, ChatbotKnowledge[]>);

      Object.entries(categorizedKnowledge).forEach(([category, items]) => {
        comprehensiveKnowledge += `\n${category.toUpperCase()}:\n`;
        items.forEach(item => {
          comprehensiveKnowledge += `• ${item.topic}: ${item.content}\n`;
        });
      });
      comprehensiveKnowledge += "\n";
    }

    // 2. COMPLETE PRODUCT CATALOG
    if (products.length > 0 && categories.length > 0) {
      comprehensiveKnowledge += "=== COMPLETE PRODUCT CATALOG ===\n";
      
      categories.forEach(category => {
        const categoryProducts = products.filter(p => p.categoryId === category.id);
        if (categoryProducts.length > 0) {
          comprehensiveKnowledge += `\n${category.name.toUpperCase()} (${category.description}):\n`;
          
          categoryProducts.forEach(product => {
            comprehensiveKnowledge += `• ${product.name}: ${product.description}\n`;
            if (product.features?.length) {
              comprehensiveKnowledge += `  Kenmerken: ${product.features.join(", ")}\n`;
            }
            if (product.material) {
              comprehensiveKnowledge += `  Materiaal: ${product.material}\n`;
            }
            if (product.dimensions) {
              comprehensiveKnowledge += `  Afmetingen: ${product.dimensions}\n`;
            }
            if (product.colors?.length) {
              comprehensiveKnowledge += `  Kleuren: ${product.colors.join(", ")}\n`;
            }
            if (product.price) {
              comprehensiveKnowledge += `  Prijs: €${product.price}\n`;
            }
          });
        }
      });
      comprehensiveKnowledge += "\n";
    }

    // 3. COMPLETE GALLERY/PORTFOLIO
    if (galleryItems.length > 0) {
      comprehensiveKnowledge += "=== COMPLETE PORTFOLIO/GALLERY ===\n";
      galleryItems.forEach(item => {
        comprehensiveKnowledge += `• ${item.title}: ${item.description}\n`;
      });
      comprehensiveKnowledge += "\n";
    }

    // 4. ALL CUSTOMER TESTIMONIALS
    if (testimonials.length > 0) {
      comprehensiveKnowledge += "=== CUSTOMER TESTIMONIALS ===\n";
      testimonials.forEach(testimonial => {
        comprehensiveKnowledge += `• ${testimonial.name} (${testimonial.location}): "${testimonial.content}"\n`;
        if (testimonial.rating) {
          comprehensiveKnowledge += `  Rating: ${testimonial.rating}/5 sterren\n`;
        }
      });
      comprehensiveKnowledge += "\n";
    }

    // 5. COMPREHENSIVE PRICING DATA
    comprehensiveKnowledge += "=== COMPLETE PRICING INFORMATION ===\n";
    comprehensiveKnowledge += buildCompletePricingKnowledge(language);

    // 6. SERVICE INFORMATION
    comprehensiveKnowledge += "\n=== COMPLETE SERVICE INFORMATION ===\n";
    comprehensiveKnowledge += buildServiceKnowledge(language);

    // 7. COMPANY INFORMATION
    comprehensiveKnowledge += "\n=== COMPANY INFORMATION ===\n";
    comprehensiveKnowledge += buildCompanyKnowledge(language);

    return comprehensiveKnowledge;

  } catch (error) {
    console.error("Error building comprehensive knowledge:", error);
    return getFallbackKnowledge(language);
  }
}

/**
 * Build complete pricing knowledge from all sources
 */
function buildCompletePricingKnowledge(language: string): string {
  const pricingData = {
    nl: {
      rolgordijn: "Rolgordijnen: €85-€250. Standaard verduisterend 100x200cm vanaf €85. Prijs afhankelijk van afmetingen, stofkeuze (basic/premium/designer), bediening (koord/veer/motor).",
      jaloezie: "Houten Jaloeziën: €120-€350. 100x150cm met 50mm lamellen vanaf €120. Premium houtsoorten (bamboe/eiken) duurder. Prijs per lameldikte en houtsoort.",
      overgordijn: "Overgordijnen: €150-€450. Maatwerk 200x250cm vanaf €150. Luxe stoffen, plooitechnieken en motorisering verhogen prijs. Inclusief rails.",
      plisse: "Plissé Gordijnen: €95-€280. 80x120cm vanaf €95. Duette (isolerend) en top-down/bottom-up duurder. Ideaal voor speciale raamvormen.",
      screen: "Screen Zonwering: €140-€380. 150x200cm vanaf €140. Verschillende openheidspercentages (1%/3%/5%/10%) bepalen prijs.",
      dakraam: "Dakraam Zonwering: €180-€450. Standaard Velux 78x118cm vanaf €180. Prijs per raamtype en montagewijze."
    },
    en: {
      rolgordijn: "Roller Blinds: €85-€250. Standard blackout 100x200cm from €85. Price depends on dimensions, fabric choice (basic/premium/designer), operation (cord/spring/motor).",
      jaloezie: "Wooden Venetian Blinds: €120-€350. 100x150cm with 50mm slats from €120. Premium woods (bamboo/oak) cost more. Price per slat thickness and wood type.",
      overgordijn: "Curtains: €150-€450. Custom 200x250cm from €150. Luxury fabrics, pleating techniques and motorization increase price. Including rails.",
      plisse: "Pleated Blinds: €95-€280. 80x120cm from €95. Duette (insulating) and top-down/bottom-up more expensive. Ideal for special window shapes.",
      screen: "Screen Shades: €140-€380. 150x200cm from €140. Different openness percentages (1%/3%/5%/10%) determine price.",
      dakraam: "Skylight Shades: €180-€450. Standard Velux 78x118cm from €180. Price per window type and installation method."
    }
  };

  const langData = pricingData[language as keyof typeof pricingData] || pricingData.nl;
  return Object.values(langData).join("\n") + "\n";
}

/**
 * Build complete service knowledge
 */
function buildServiceKnowledge(language: string): string {
  const services = {
    nl: [
      "GRATIS THUISMETING: Professionele opname van alle afmetingen",
      "MONTAGE SERVICE: Vakkundige installatie door gecertificeerde monteurs",
      "MAATWERK PRODUCTIE: Alle producten op maat gemaakt in eigen atelier",
      "ADVIES OP MAAT: Persoonlijk kleur- en stijladvies",
      "GARANTIE: Uitgebreide garantie op alle producten en montage",
      "ONDERHOUD: Tips en service voor langdurig gebruik",
      "SMART HOME: Integratie met domotica systemen mogelijk",
      "SNELLE LEVERING: Korte levertijden voor standaard producten"
    ],
    en: [
      "FREE HOME MEASUREMENT: Professional measurement of all dimensions",
      "INSTALLATION SERVICE: Expert installation by certified fitters",
      "CUSTOM PRODUCTION: All products made to measure in our own workshop",
      "PERSONALIZED ADVICE: Individual color and style consultation",
      "WARRANTY: Comprehensive warranty on all products and installation",
      "MAINTENANCE: Tips and service for long-term use",
      "SMART HOME: Integration with home automation systems possible",
      "FAST DELIVERY: Short delivery times for standard products"
    ]
  };

  const langServices = services[language as keyof typeof services] || services.nl;
  return langServices.join("\n") + "\n";
}

/**
 * Build company knowledge
 */
function buildCompanyKnowledge(language: string): string {
  const company = {
    nl: [
      "KANIOU - Premium raambekleding specialist",
      "Ervaring: Jarenlange expertise in maatwerk raambekleding",
      "Kwaliteit: Hoogwaardige materialen en vakkundige verwerking",
      "Service: Persoonlijke benadering en uitstekende nazorg",
      "Bereik: Actief in heel België",
      "Openingstijden: Maandag-Zaterdag 10:00-18:00",
      "Contact: Gratis offerte en adviesgesprek mogelijk"
    ],
    en: [
      "KANIOU - Premium window treatment specialist", 
      "Experience: Years of expertise in custom window treatments",
      "Quality: High-quality materials and expert craftsmanship",
      "Service: Personal approach and excellent aftercare",
      "Coverage: Active throughout Belgium",
      "Opening hours: Monday-Saturday 10:00-18:00",
      "Contact: Free quote and consultation available"
    ]
  };

  const langCompany = company[language as keyof typeof company] || company.nl;
  return langCompany.join("\n") + "\n";
}

/**
 * Enhanced question answering using comprehensive knowledge with filtering
 */
export async function answerWithComprehensiveKnowledge(
  question: string,
  language: string = 'nl',
  conversationContext?: string[]
): Promise<ComprehensiveResponse> {
  try {
    // Use STEP 2 smart filtering system for precise responses
    const smartResponse = await generateSmartFilteredResponse(question, language);
    
    return {
      content: smartResponse.content,
      confidence: smartResponse.confidence,
      sources: [smartResponse.sourceCategory],
      language: smartResponse.language,
      usedFallback: smartResponse.confidence < 0.5
    };

  } catch (error) {
    console.error("Error in STEP 2 smart filtering system:", error);
    return {
      content: getFallbackKnowledge(language),
      confidence: 0.5,
      sources: ["fallback"],
      language,
      usedFallback: true
    };
  }
}

// Legacy functions removed - now using STEP 2 smart filtering system

/**
 * Extract relevant content from comprehensive knowledge
 */
function extractRelevantContent(question: string, knowledge: string, language: string): string[] {
  const questionWords = question.toLowerCase().split(/\s+/);
  const knowledgeLines = knowledge.split('\n');
  
  const relevantLines: Array<{line: string, score: number}> = [];
  
  knowledgeLines.forEach(line => {
    if (line.trim().length < 10) return;
    
    let score = 0;
    const lineLower = line.toLowerCase();
    
    questionWords.forEach(word => {
      if (word.length > 2 && lineLower.includes(word)) {
        score += word.length > 4 ? 2 : 1;
      }
    });
    
    if (score > 0) {
      relevantLines.push({ line: line.trim(), score });
    }
  });
  
  return relevantLines
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(item => item.line);
}

/**
 * Generate intelligent response from relevant content
 */
function generateIntelligentResponse(
  question: string,
  relevantContent: string[],
  language: string,
  analysis: any
): string {
  // Combine most relevant information
  const combinedInfo = relevantContent.slice(0, 5).join(" ");
  
  // Generate contextual response based on question type
  if (analysis.intents.includes('pricing')) {
    return generatePricingResponse(combinedInfo, language);
  } else if (analysis.intents.includes('product')) {
    return generateProductResponse(combinedInfo, language);
  } else if (analysis.intents.includes('service')) {
    return generateServiceResponse(combinedInfo, language);
  }
  
  return generateGeneralResponse(combinedInfo, language);
}

/**
 * Generate pricing-specific response
 */
function generatePricingResponse(content: string, language: string): string {
  const responses = {
    nl: `Op basis van onze prijsinformatie: ${content}. Voor een exacte prijsopgave plannen we graag een gratis thuismeting in. Zo kunnen we rekening houden met uw specifieke wensen en afmetingen.`,
    en: `Based on our pricing information: ${content}. For an exact quote, we'd like to schedule a free home measurement. This way we can take into account your specific wishes and dimensions.`
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Generate product-specific response
 */
function generateProductResponse(content: string, language: string): string {
  const responses = {
    nl: `Wat betreft onze producten: ${content}. Wilt u meer weten over specifieke eigenschappen, montage of prijzen? Ik help u graag verder met gedetailleerde informatie.`,
    en: `Regarding our products: ${content}. Would you like to know more about specific features, installation or pricing? I'd be happy to help you with detailed information.`
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Generate service-specific response
 */
function generateServiceResponse(content: string, language: string): string {
  const responses = {
    nl: `Onze service omvat: ${content}. We staan voor kwaliteit en persoonlijke benadering. Heeft u specifieke vragen over onze service of garantievoorwaarden?`,
    en: `Our service includes: ${content}. We stand for quality and personal approach. Do you have specific questions about our service or warranty conditions?`
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Generate general response
 */
function generateGeneralResponse(content: string, language: string): string {
  const responses = {
    nl: `${content}. Kan ik u ergens anders mee helpen? Ik beschik over uitgebreide informatie over onze producten, prijzen en services.`,
    en: `${content}. Can I help you with anything else? I have extensive information about our products, prices and services.`
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Generate helpful guidance when no specific content is found
 */
function generateHelpfulGuidance(question: string, language: string): string {
  const guidance = {
    nl: "Ik help u graag met informatie over onze raambekleding. U kunt mij vragen stellen over producten (rolgordijnen, jaloeziën, plissé, overgordijnen), prijzen, montage, of onze service. Wat zou u precies willen weten?",
    en: "I'd be happy to help you with information about our window treatments. You can ask me questions about products (roller blinds, venetian blinds, pleated blinds, curtains), prices, installation, or our service. What exactly would you like to know?"
  };
  
  return guidance[language as keyof typeof guidance] || guidance.nl;
}

/**
 * Extract keywords from question
 */
function extractKeywords(question: string, language: string): string[] {
  const words = question.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  return Array.from(new Set(words));
}

/**
 * Determine question type
 */
function determineQuestionType(question: string, language: string): string {
  const questionStarters = {
    what: /^(wat|what|que|co)/i,
    how: /^(hoe|how|comment|nasıl)/i,
    when: /^(wanneer|when|quand|ne zaman)/i,
    where: /^(waar|where|où|nerede)/i,
    why: /^(waarom|why|pourquoi|neden)/i
  };
  
  for (const [type, pattern] of Object.entries(questionStarters)) {
    if (pattern.test(question)) return type;
  }
  
  return 'statement';
}

/**
 * Fallback knowledge when system fails
 */
function getFallbackKnowledge(language: string): string {
  const fallbacks = {
    nl: "Ik ben uw KANIOU raambekleding specialist. Voor specifieke vragen over onze producten, prijzen of service, help ik u graag verder. Wat kan ik voor u betekenen?",
    en: "I'm your KANIOU window treatment specialist. For specific questions about our products, prices or service, I'm happy to help you. What can I do for you?"
  };
  
  return fallbacks[language as keyof typeof fallbacks] || fallbacks.nl;
}