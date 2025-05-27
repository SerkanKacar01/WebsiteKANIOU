import OpenAI from "openai";
import type { ChatbotConversation, ChatbotMessage, ChatbotKnowledge, Product, Category } from "@shared/schema";
import { DUTCH_PRODUCT_KNOWLEDGE, getProductKnowledge, compareProducts, searchProducts } from "./productKnowledge";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ChatbotContext {
  conversation: ChatbotConversation;
  messages: ChatbotMessage[];
  products: Product[];
  categories: Category[];
  knowledgeBase: ChatbotKnowledge[];
  language: string;
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
 * Generate AI response for chatbot using OpenAI GPT-4o
 */
export async function generateChatbotResponse(
  userMessage: string,
  context: ChatbotContext
): Promise<ChatbotResponse> {
  const startTime = Date.now();

  try {
    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(context);
    
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
      content: parsedResponse.message || "I apologize, but I'm having trouble processing your request right now. Please try again.",
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
 * Build comprehensive system prompt for the chatbot
 */
function buildSystemPrompt(context: ChatbotContext): string {
  const { language, products, categories, knowledgeBase } = context;

  const languageInstructions = getLanguageInstructions(language);
  const productInfo = buildProductKnowledge(products, categories);
  const knowledgeInfo = buildKnowledgeBase(knowledgeBase);
  const pricingInstructions = getPricingInstructions(language);

  return `Je bent KANIOU's AI-assistent, een expert in gordijnen en raambekleding. ${languageInstructions}

BELANGRIJK: Antwoord ALTIJD met een geldig JSON object in dit exacte formaat:
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
- Wees vriendelijk, professioneel en deskundig

PRODUCT KENNIS:
${productInfo}

KENNISBANK:
${knowledgeInfo}

${pricingInstructions}

RICHTLIJNEN:
- Altijd behulpzaam en professioneel zijn
- Geef specifieke productaanbevelingen waar passend
- Stel verhelderende vragen om klantbehoeften beter te begrijpen
- Als je iets specifieks niet weet, geef dat toe en bied aan meer informatie te zoeken
- Houd antwoorden beknopt maar informatief (max 250 woorden)
- Gebruik een warme, vriendelijke toon die KANIOU's premium merkimago weergeeft
- Gebruik alleen echte productinformatie uit de kennisbank, geen verzonnen gegevens`;
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
  
  const categories = [...new Set(knowledgeBase.map(kb => kb.category))];
  
  categories.forEach(category => {
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
  const fallbacks = {
    nl: "Bedankt voor uw bericht! Ik ben momenteel niet beschikbaar, maar onze experts helpen u graag verder. Neem contact met ons op voor persoonlijke assistentie.",
    en: "Thank you for your message! I'm currently unavailable, but our experts are happy to help you. Please contact us for personal assistance.",
    fr: "Merci pour votre message ! Je ne suis pas disponible actuellement, mais nos experts sont heureux de vous aider. Veuillez nous contacter pour une assistance personnalisée.",
    de: "Vielen Dank für Ihre Nachricht! Ich bin derzeit nicht verfügbar, aber unsere Experten helfen Ihnen gerne weiter. Bitte kontaktieren Sie uns für persönliche Beratung.",
    tr: "Mesajınız için teşekkür ederim! Şu anda müsait değilim, ancak uzmanlarımız size yardımcı olmaktan mutluluk duyar. Kişisel yardım için lütfen bizimle iletişime geçin.",
    ar: "شكراً لرسالتك! أنا غير متاح حالياً، لكن خبراؤنا سعداء لمساعدتك. يرجى الاتصال بنا للحصول على المساعدة الشخصية."
  };

  return fallbacks[language as keyof typeof fallbacks] || fallbacks.nl;
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

  return Array.from(new Set(detectedTypes)); // Remove duplicates
}