import OpenAI from "openai";
import type { ChatbotConversation, ChatbotMessage, ChatbotKnowledge, Product, Category } from "@shared/schema";
import { DUTCH_PRODUCT_KNOWLEDGE, getProductKnowledge, compareProducts, searchProducts } from "./productKnowledge";
import { buildConversationContext, findLearnedResponse, logLearnedResponseUsage, storeConversationContext } from "./conversationMemory";
import { findRelevantKnowledge, analyzeQuestionIntent, generateKnowledgeResponse } from "./knowledgeRetrieval";
import { detectUserLanguage, getMultilingualKnowledge, getPricingKeywords, getProductKeywords } from "./languageDetection";
import { getSystemMessage, SYSTEM_MESSAGES, getProductInfo } from "./multilingualResponses";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ChatbotContext {
  conversation: ChatbotConversation;
  messages: ChatbotMessage[];
  products: Product[];
  categories: Category[];
  knowledgeBase: ChatbotKnowledge[];
  language: string;
  detectedLanguage?: string;
}

export interface ChatbotResponse {
  content: string;
  requiresPricing: boolean;
  detectedProductTypes: string[];
  metadata: {
    tokensUsed: number;
    responseTime: number;
    confidence: number;
  };
}

/**
 * Generate AI response for chatbot using OpenAI GPT-4o with enhanced memory and automatic language detection
 */
export async function generateChatbotResponse(
  userMessage: string,
  context: ChatbotContext
): Promise<ChatbotResponse> {
  const startTime = Date.now();

  try {
    // Step 1: Detect user language automatically
    console.log(`🌐 LANGUAGE DETECTION: Analyzing message language...`);
    const languageDetection = await detectUserLanguage(userMessage);
    const responseLanguage = languageDetection.confidence > 0.6 ? languageDetection.detectedLanguage : context.language;
    
    console.log(`🌐 DETECTED: ${languageDetection.detectedLanguage} (confidence: ${Math.round(languageDetection.confidence * 100)}%) - Using: ${responseLanguage}`);
    
    // Update context with detected language
    const enhancedContext = { ...context, detectedLanguage: responseLanguage };

    // Step 2: Check for learned responses from previous admin training
    const conversationContext = await buildConversationContext(context.conversation.sessionId);
    const learnedResponse = await findLearnedResponse(userMessage, conversationContext, responseLanguage);
    
    if (learnedResponse && learnedResponse.confidence > 0.8) {
      console.log(`🧠 MEMORY MATCH: Using learned response (confidence: ${Math.round(learnedResponse.confidence * 100)}%)`);
      
      // Log usage of learned response
      await logLearnedResponseUsage(0, context.conversation.sessionId, userMessage);
      
      // Detect if this is still a pricing request for metadata
      const requiresPricing = detectPricingRequest(userMessage, responseLanguage);
      const extractedProducts = extractProductTypes(userMessage, context.products);
      
      return {
        content: learnedResponse.response,
        requiresPricing,
        detectedProductTypes: extractedProducts,
        metadata: {
          tokensUsed: 0,
          responseTime: Date.now() - startTime,
          confidence: learnedResponse.confidence
        }
      };
    }

    // Step 3: Build multilingual context-aware system prompt
    const systemPrompt = buildMultilingualSystemPrompt(enhancedContext, responseLanguage);
    
    // Build conversation history
    const conversationHistory = context.messages.slice(-10).map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const responseContent = response.choices[0].message.content;
    const parsedResponse = JSON.parse(responseContent || "{}");

    const endTime = Date.now();

    return {
      content: parsedResponse.message || getFallbackResponse(userMessage, responseLanguage),
      requiresPricing: parsedResponse.requiresPricing || false,
      detectedProductTypes: parsedResponse.detectedProductTypes || [],
      metadata: {
        tokensUsed: response.usage?.total_tokens || 0,
        responseTime: endTime - startTime,
        confidence: parsedResponse.confidence || 0.8
      }
    };

  } catch (error) {
    console.error("OpenAI API Error:", error);
    
    return {
      content: getFallbackResponse(userMessage, context.language),
      requiresPricing: false,
      detectedProductTypes: [],
      metadata: {
        tokensUsed: 0,
        responseTime: Date.now() - startTime,
        confidence: 0.1
      }
    };
  }
}

/**
 * Build comprehensive multilingual system prompt for the chatbot
 */
function buildMultilingualSystemPrompt(context: ChatbotContext, responseLanguage: string): string {
  const { products, categories, knowledgeBase } = context;

  const languageInstructions = getAdvancedLanguageInstructions(responseLanguage);
  const productInfo = buildMultilingualProductKnowledge(products, categories, responseLanguage);
  const knowledgeInfo = buildKnowledgeBase(knowledgeBase);
  const pricingInstructions = getMultilingualPricingInstructions(responseLanguage);

  const coreInstructions = getCoreInstructions(responseLanguage);
  const guidelines = getGuidelinesForLanguage(responseLanguage);

  return `${languageInstructions}

${coreInstructions}

PRODUCT EXPERTISE:
${productInfo}

KNOWLEDGE BASE:
${knowledgeInfo}

${pricingInstructions}

${guidelines}`;
}

/**
 * Get advanced language-specific instructions for multilingual AI behavior
 */
function getAdvancedLanguageInstructions(language: string): string {
  const instructions = {
    nl: "Je bent KANIOU's AI-assistent, een expert in raamdecoratie. Antwoord ALTIJD in perfect Nederlands, met correcte grammatica en formele toon. Gebruik uitsluitend Nederlandse terminologie en vermijd Engels of andere talen.",
    en: "You are KANIOU's AI assistant, an expert in window treatments. ALWAYS respond in perfect English, with correct grammar and professional tone. Use only English terminology and avoid mixing with other languages.",
    fr: "Vous êtes l'assistant IA de KANIOU, expert en décoration de fenêtres. Répondez TOUJOURS en français parfait, avec une grammaire correcte et un ton professionnel. Utilisez uniquement la terminologie française et évitez de mélanger avec d'autres langues.",
    tr: "KANIOU'nun AI asistanısınız, pencere dekorasyonu uzmanısınız. HER ZAMAN mükemmel Türkçe ile yanıt verin, doğru dilbilgisi ve profesyonel tonla. Sadece Türkçe terminoloji kullanın ve diğer dillerle karıştırmayın."
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Get core instructions for different languages
 */
function getCoreInstructions(language: string): string {
  const coreText = {
    nl: `BELANGRIJK: Antwoord ALTIJD met een geldig JSON object in dit exacte formaat:
{
  "message": "Je hulpzame antwoord hier",
  "requiresPricing": true/false,
  "detectedProductTypes": ["product1", "product2"],
  "confidence": 0.8
}

JE ROL:
- Geef deskundig advies over gordijnen, zonweringen en raambekleding
- Help klanten de juiste producten kiezen voor hun behoeften
- Beantwoord vragen over installatie, onderhoud en garanties
- Detecteer prijsvragen automatisch en zet requiresPricing op true
- Wees vriendelijk, professioneel en deskundig`,

    en: `IMPORTANT: ALWAYS respond with a valid JSON object in this exact format:
{
  "message": "Your helpful response here",
  "requiresPricing": true/false,
  "detectedProductTypes": ["product1", "product2"],
  "confidence": 0.8
}

YOUR ROLE:
- Provide expert advice on curtains, blinds and window treatments
- Help customers choose the right products for their needs
- Answer questions about installation, maintenance and warranties
- Automatically detect price inquiries and set requiresPricing to true
- Be friendly, professional and knowledgeable`,

    fr: `IMPORTANT : Répondez TOUJOURS avec un objet JSON valide dans ce format exact :
{
  "message": "Votre réponse utile ici",
  "requiresPricing": true/false,
  "detectedProductTypes": ["produit1", "produit2"],
  "confidence": 0.8
}

VOTRE RÔLE :
- Fournir des conseils d'expert sur les rideaux, stores et habillages de fenêtres
- Aider les clients à choisir les bons produits pour leurs besoins
- Répondre aux questions sur l'installation, la maintenance et les garanties
- Détecter automatiquement les demandes de prix et définir requiresPricing sur true
- Être amical, professionnel et compétent`,

    tr: `ÖNEMLİ: HER ZAMAN bu tam formatta geçerli bir JSON nesnesi ile yanıt verin:
{
  "message": "Yardımcı yanıtınız burada",
  "requiresPricing": true/false,
  "detectedProductTypes": ["ürün1", "ürün2"],
  "confidence": 0.8
}

ROLÜNÜZ:
- Perde, güneşlik ve pencere kaplamaları konusunda uzman tavsiyeleri verin
- Müşterilerin ihtiyaçlarına uygun ürünleri seçmelerine yardımcı olun
- Kurulum, bakım ve garantiler hakkında soruları yanıtlayın
- Fiyat sorularını otomatik olarak tespit edin ve requiresPricing'i true yapın
- Dostça, profesyonel ve bilgili olun`
  };

  return coreText[language as keyof typeof coreText] || coreText.nl;
}

/**
 * Get guidelines for specific language
 */
function getGuidelinesForLanguage(language: string): string {
  const guidelines = {
    nl: `RICHTLIJNEN:
- Altijd behulpzaam en professioneel zijn
- Geef specifieke productaanbevelingen waar passend
- Stel verhelderende vragen om klantbehoeften beter te begrijpen
- Als je iets specifieks niet weet, geef dat toe en bied aan meer informatie te zoeken
- Houd antwoorden beknopt maar informatief (max 250 woorden)
- Gebruik een warme, vriendelijke toon die KANIOU's premium merkimago weergeeft
- Gebruik alleen echte productinformatie uit de kennisbank, geen verzonnen gegevens`,

    en: `GUIDELINES:
- Always be helpful and professional
- Provide specific product recommendations where appropriate
- Ask clarifying questions to better understand customer needs
- If you don't know something specific, admit it and offer to find more information
- Keep responses concise but informative (max 250 words)
- Use a warm, friendly tone that reflects KANIOU's premium brand image
- Only use real product information from the knowledge base, no fabricated data`,

    fr: `DIRECTIVES :
- Toujours être utile et professionnel
- Fournir des recommandations de produits spécifiques le cas échéant
- Poser des questions de clarification pour mieux comprendre les besoins du client
- Si vous ne savez pas quelque chose de spécifique, admettez-le et proposez de trouver plus d'informations
- Gardez les réponses concises mais informatives (max 250 mots)
- Utilisez un ton chaleureux et amical qui reflète l'image de marque premium de KANIOU
- Utilisez uniquement de vraies informations produit de la base de connaissances, pas de données fabriquées`,

    tr: `KURAL VE İLKELER:
- Her zaman yardımcı ve profesyonel olun
- Uygun olan durumlarda özel ürün önerileri sağlayın
- Müşteri ihtiyaçlarını daha iyi anlamak için açıklayıcı sorular sorun
- Belirli bir şey bilmiyorsanız, kabul edin ve daha fazla bilgi bulmayı teklif edin
- Yanıtları kısa ama bilgilendirici tutun (maksimum 250 kelime)
- KANIOU'nun premium marka imajını yansıtan sıcak, dostça bir ton kullanın
- Sadece bilgi tabanından gerçek ürün bilgilerini kullanın, uydurma veriler kullanmayın`
  };

  return guidelines[language as keyof typeof guidelines] || guidelines.nl;
}

/**
 * Build multilingual product knowledge
 */
function buildMultilingualProductKnowledge(products: Product[], categories: Category[], language: string): string {
  const multilingualKnowledge = getMultilingualKnowledge();
  
  let knowledge = "";
  
  // Add language-specific company info
  if (multilingualKnowledge.company_info[language as keyof typeof multilingualKnowledge.company_info]) {
    knowledge += multilingualKnowledge.company_info[language as keyof typeof multilingualKnowledge.company_info] + "\n\n";
  }
  
  // Add service information
  if (multilingualKnowledge.services[language as keyof typeof multilingualKnowledge.services]) {
    knowledge += multilingualKnowledge.services[language as keyof typeof multilingualKnowledge.services] + "\n\n";
  }

  // Add comprehensive Dutch product knowledge (always include as base)
  knowledge += "KANIOU PRODUCT EXPERTISE:\n\n";
  
  DUTCH_PRODUCT_KNOWLEDGE.forEach(productInfo => {
    knowledge += `**${productInfo.name}** (${productInfo.category}):\n`;
    knowledge += `${productInfo.description}\n\n`;
    knowledge += `Benefits:\n`;
    productInfo.benefits.forEach(benefit => {
      knowledge += `• ${benefit}\n`;
    });
    knowledge += `\nFeatures:\n`;
    productInfo.keyFeatures.forEach(feature => {
      knowledge += `• ${feature}\n`;
    });
    knowledge += `\nIdeal for: ${productInfo.idealFor.join(", ")}\n`;
    knowledge += `Comparison: ${productInfo.vsOtherProducts}\n`;
    knowledge += `Materials: ${productInfo.materials.join(", ")}\n\n`;
    knowledge += "---\n\n";
  });

  // Add database products if available
  if (products.length && categories.length) {
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    knowledge += "CURRENT PRODUCTS IN OUR COLLECTION:\n\n";
    
    categories.forEach(category => {
      knowledge += `${category.name}:\n`;
      knowledge += `${category.description}\n`;
      
      const categoryProducts = products.filter(p => p.categoryId === category.id);
      categoryProducts.forEach(product => {
        knowledge += `- ${product.name}: ${product.description}\n`;
        if (product.features?.length) {
          knowledge += `  Features: ${product.features.join(", ")}\n`;
        }
        if (product.material) {
          knowledge += `  Material: ${product.material}\n`;
        }
      });
      knowledge += "\n";
    });
  }

  return knowledge;
}

/**
 * Get multilingual pricing instructions
 */
function getMultilingualPricingInstructions(language: string): string {
  const multilingualKnowledge = getMultilingualKnowledge();
  const keywords = getPricingKeywords(language);
  
  const instructions = {
    nl: `PRIJSDETECTIE:
Als een klant vraagt naar prijzen, kosten, offertes, budget of geld, zet dan "requiresPricing": true en voeg de relevante producttypes toe aan "detectedProductTypes".

PRIJSWOORDEN: ${keywords.join(", ")}

REACTIE BIJ PRIJSVRAAG:
"${multilingualKnowledge.pricing_response.nl}"`,
    
    en: `PRICE DETECTION:
If a customer asks about prices, costs, quotes, budget or money, set "requiresPricing": true and add relevant product types to "detectedProductTypes".

PRICE KEYWORDS: ${keywords.join(", ")}

PRICE RESPONSE:
"${multilingualKnowledge.pricing_response.en}"`,
    
    fr: `DÉTECTION DE PRIX:
Si un client demande des prix, coûts, devis, budget ou argent, définissez "requiresPricing": true et ajoutez les types de produits pertinents à "detectedProductTypes".

MOTS-CLÉS DE PRIX: ${keywords.join(", ")}

RÉPONSE DE PRIX:
"${multilingualKnowledge.pricing_response.fr}"`,

    tr: `FİYAT TESPİTİ:
Bir müşteri fiyat, maliyet, teklif, bütçe veya para hakkında soru sorarsa, "requiresPricing": true yapın ve ilgili ürün türlerini "detectedProductTypes"a ekleyin.

FİYAT ANAHTAR KELİMELERİ: ${keywords.join(", ")}

FİYAT YANITI:
"${multilingualKnowledge.pricing_response.tr}"`
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Get language-specific instructions
 */
function getLanguageInstructions(language: string): string {
  const instructions = {
    nl: "Antwoord altijd in het Nederlands. Je bent een Nederlandse expert in gordijnen en raambekleding.",
    en: "Always respond in English. You are an expert in curtains and window treatments.",
    fr: "Répondez toujours en français. Vous êtes un expert en rideaux et habillage de fenêtres.",
    de: "Antworten Sie immer auf Deutsch. Sie sind ein Experte für Vorhänge und Fensterbehandlungen.",
    tr: "Her zaman Türkçe yanıt verin. Perde ve pencere kaplamaları konusunda uzmansınız.",
    ar: "أجب دائماً بالعربية. أنت خبير في الستائر وعلاجات النوافذ."
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Get pricing detection instructions
 */
function getPricingInstructions(language: string): string {
  const instructions = {
    nl: `PRIJSDETECTIE:
Als een klant vraagt naar prijzen, kosten, offertes, budget of geld, zet dan "requiresPricing": true en voeg de relevante producttypes toe aan "detectedProductTypes".

PRIJSWOORDEN: prijs, kosten, budget, offerte, tarief, geld, betalen, euro, per meter, per stuk, hoeveel kost

REACTIE BIJ PRIJSVRAAG:
"Voor een accurate prijsopgave maken wij graag een afspraak voor een gratis opmeting aan huis. Onze specialist kan dan exact adviseren en een maatwerkofferte opstellen. Prijzen zijn afhankelijk van afmetingen, gekozen materialen en montagemogelijkheden."`,
    
    en: `PRICE DETECTION:
If a customer asks about prices, costs, quotes, budget or money, set "requiresPricing": true and add relevant product types to "detectedProductTypes".

PRICE KEYWORDS: price, cost, budget, quote, rate, money, pay, euro, per meter, how much

PRICE RESPONSE:
"For an accurate quote, we'd be happy to schedule a free home measurement. Our specialist can provide exact advice and create a custom quote. Prices depend on dimensions, chosen materials and installation options."`,
    
    fr: `DÉTECTION DE PRIX:
Si un client demande des prix, coûts, devis, budget ou argent, définissez "requiresPricing": true et ajoutez les types de produits pertinents à "detectedProductTypes".`
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Build comprehensive product knowledge including database and expert knowledge
 */
function buildProductKnowledge(products: Product[], categories: Category[]): string {
  let knowledge = "KANIOU PRODUCT EXPERTISE - Uitgebreide Productkennis:\n\n";
  
  // Add comprehensive Dutch product knowledge
  DUTCH_PRODUCT_KNOWLEDGE.forEach(productInfo => {
    knowledge += `**${productInfo.name}** (${productInfo.category}):\n`;
    knowledge += `${productInfo.description}\n\n`;
    knowledge += `Voordelen:\n`;
    productInfo.benefits.forEach(benefit => {
      knowledge += `• ${benefit}\n`;
    });
    knowledge += `\nKenmerken:\n`;
    productInfo.keyFeatures.forEach(feature => {
      knowledge += `• ${feature}\n`;
    });
    knowledge += `\nIdeaal voor: ${productInfo.idealFor.join(", ")}\n`;
    knowledge += `Vergelijking: ${productInfo.vsOtherProducts}\n`;
    knowledge += `Materialen: ${productInfo.materials.join(", ")}\n\n`;
    knowledge += "---\n\n";
  });

  // Add database products if available
  if (products.length && categories.length) {
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    knowledge += "HUIDIGE PRODUCTEN IN ONZE COLLECTIE:\n\n";
    
    categories.forEach(category => {
      knowledge += `${category.name}:\n`;
      knowledge += `${category.description}\n`;
      
      const categoryProducts = products.filter(p => p.categoryId === category.id);
      categoryProducts.forEach(product => {
        knowledge += `- ${product.name}: ${product.description}\n`;
        if (product.features?.length) {
          knowledge += `  Features: ${product.features.join(", ")}\n`;
        }
        if (product.material) {
          knowledge += `  Material: ${product.material}\n`;
        }
      });
      knowledge += "\n";
    });
  }

  return knowledge;
}

/**
 * Build knowledge base from database
 */
function buildKnowledgeBase(knowledgeBase: ChatbotKnowledge[]): string {
  if (!knowledgeBase.length) {
    return "Knowledge base is being loaded...";
  }

  let knowledge = "ADDITIONAL KNOWLEDGE:\n\n";
  
  const uniqueCategories: string[] = [];
  knowledgeBase.forEach(kb => {
    if (!uniqueCategories.includes(kb.category)) {
      uniqueCategories.push(kb.category);
    }
  });
  
  uniqueCategories.forEach((category: string) => {
    knowledge += `${category.toUpperCase()}:\n`;
    const categoryKnowledge = knowledgeBase
      .filter(kb => kb.category === category && kb.adminApproved)
      .sort((a, b) => (b.priority || 1) - (a.priority || 1));
    
    categoryKnowledge.forEach(kb => {
      knowledge += `- ${kb.topic}: ${kb.content}\n`;
    });
    knowledge += "\n";
  });

  return knowledge;
}

/**
 * Get fallback response when OpenAI is unavailable
 */
function getFallbackResponse(userMessage: string, language: string): string {
  return getSystemMessage('errorFallback', language);
}

/**
 * Advanced price detection with context awareness
 */
export function detectPricingRequest(message: string, language: string): boolean {
  const pricingKeywords = {
    nl: ["prijs", "kosten", "budget", "offerte", "tarief", "geld", "betalen", "euro", "per meter", "per stuk", "hoeveel kost", "wat kost", "prijsklasse", "duur", "goedkoop"],
    en: ["price", "cost", "budget", "quote", "rate", "money", "pay", "dollar", "euro", "per meter", "how much", "expensive", "cheap"],
    fr: ["prix", "coût", "budget", "devis", "tarif", "argent", "payer", "euro", "par mètre", "combien"],
    de: ["preis", "kosten", "budget", "angebot", "tarif", "geld", "zahlen", "euro", "pro meter"],
    tr: ["fiyat", "maliyet", "bütçe", "teklif", "tarife", "para", "ödeme", "euro", "metre başına"],
    ar: ["سعر", "تكلفة", "ميزانية", "عرض", "تعرفة", "مال", "دفع", "يورو", "للمتر"]
  };

  const keywords = pricingKeywords[language as keyof typeof pricingKeywords] || pricingKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  return keywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Extract product types from user message
 */
export function extractProductTypes(message: string, products: Product[]): string[] {
  const lowerMessage = message.toLowerCase();
  const detectedTypes: string[] = [];

  products.forEach(product => {
    const productName = product.name.toLowerCase();
    if (lowerMessage.includes(productName)) {
      detectedTypes.push(product.name);
    }
  });

  // Add category-based detection
  const categoryKeywords = {
    "gordijnen": ["gordijn", "curtain", "rideau", "vorhang", "perde"],
    "jalouzieën": ["jaloezieën", "blinds", "jalousies", "jalousien", "jaluzi"],
    "vouwgordijnen": ["vouwgordijn", "roman blind", "store bateau", "raffrollo"],
    "rolgordijnen": ["rolgordijn", "roller blind", "store enrouleur", "rollo"]
  };

  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      detectedTypes.push(category);
    }
  });

  // Remove duplicates
  const uniqueTypes: string[] = [];
  detectedTypes.forEach(type => {
    if (!uniqueTypes.includes(type)) {
      uniqueTypes.push(type);
    }
  });
  return uniqueTypes;
}