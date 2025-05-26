import OpenAI from "openai";
import type { ChatbotConversation, ChatbotMessage, ChatbotKnowledge, Product, Category } from "@shared/schema";

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

  return `You are KANIOU's AI assistant, an expert in curtains and window treatments. ${languageInstructions}

IMPORTANT: Always respond with a JSON object in this exact format:
{
  "message": "Your helpful response here",
  "requiresPricing": true/false,
  "detectedProductTypes": ["product1", "product2"],
  "confidence": 0.8
}

YOUR ROLE:
- Provide expert advice on curtains, blinds, and window treatments
- Help customers choose the right products for their needs
- Answer questions about installation, maintenance, and guarantees
- Detect when customers need pricing information and set requiresPricing to true
- Be friendly, professional, and knowledgeable

PRODUCT KNOWLEDGE:
${productInfo}

KNOWLEDGE BASE:
${knowledgeInfo}

PRICING DETECTION:
If a customer asks about prices, costs, quotes, or mentions budget, set "requiresPricing": true and include the relevant product types in "detectedProductTypes".

GUIDELINES:
- Always be helpful and professional
- Provide specific product recommendations when appropriate
- Ask clarifying questions to better understand customer needs
- If you don't know something specific, admit it and offer to get more information
- Keep responses concise but informative (max 200 words)
- Use a warm, friendly tone that reflects KANIOU's premium brand image`;
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
 * Build product knowledge from database
 */
function buildProductKnowledge(products: Product[], categories: Category[]): string {
  if (!products.length || !categories.length) {
    return "Product information is being loaded...";
  }

  const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
  
  let knowledge = "AVAILABLE PRODUCTS AND CATEGORIES:\n\n";
  
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
 * Detect if message contains pricing-related keywords
 */
export function detectPricingRequest(message: string, language: string): boolean {
  const pricingKeywords = {
    nl: ["prijs", "kosten", "budget", "offerte", "tarief", "geld", "betalen", "euro"],
    en: ["price", "cost", "budget", "quote", "rate", "money", "pay", "dollar", "euro"],
    fr: ["prix", "coût", "budget", "devis", "tarif", "argent", "payer", "euro"],
    de: ["preis", "kosten", "budget", "angebot", "tarif", "geld", "zahlen", "euro"],
    tr: ["fiyat", "maliyet", "bütçe", "teklif", "tarife", "para", "ödeme", "euro"],
    ar: ["سعر", "تكلفة", "ميزانية", "عرض", "تعرفة", "مال", "دفع", "يورو"]
  };

  const keywords = pricingKeywords[language as keyof typeof pricingKeywords] || pricingKeywords.en;
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