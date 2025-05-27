/**
 * Smart AI-Driven Price Assistant for KANIOU Chatbot
 * Handles price request detection, notifications, and learned responses
 */

import { db } from "./db";
import { 
  priceRequestNotifications, 
  priceResponseKnowledge, 
  priceResponseLogs,
  chatbotConversations 
} from "../shared/schema";
import { eq, and, sql } from "drizzle-orm";

// Price request keywords in multiple languages
export const PRICE_KEYWORDS = {
  dutch: [
    'prijs', 'prijzen', 'kost', 'kosten', 'offerte', 'hoeveel kost', 'wat kost',
    'tarief', 'tarieven', 'budget', 'euro', '€', 'betalen', 'betaling',
    'gratis', 'duur', 'goedkoop', 'voordelig', 'aanbieding', 'korting',
    'prijslijst', 'kostenplaatje', 'investering', 'uitgave'
  ],
  english: [
    'price', 'prices', 'cost', 'costs', 'quote', 'quotation', 'how much',
    'what does it cost', 'rate', 'rates', 'budget', 'euro', '€', 'pay', 'payment',
    'free', 'expensive', 'cheap', 'affordable', 'offer', 'discount',
    'price list', 'investment', 'expense'
  ],
  french: [
    'prix', 'coût', 'coûts', 'devis', 'combien', 'tarif', 'tarifs',
    'budget', 'euro', '€', 'payer', 'paiement', 'gratuit', 'cher',
    'pas cher', 'abordable', 'offre', 'remise', 'liste de prix'
  ],
  turkish: [
    'fiyat', 'fiyatlar', 'maliyet', 'ne kadar', 'teklif', 'ücret',
    'ödeme', 'euro', '€', 'bedava', 'ücretsiz', 'pahalı', 'ucuz'
  ],
  arabic: [
    'سعر', 'أسعار', 'تكلفة', 'كم', 'عرض', 'أجرة', 'دفع', 'يورو', 'مجاني', 'غالي', 'رخيص'
  ]
};

export interface PriceDetectionResult {
  isPriceRequest: boolean;
  detectedKeywords: string[];
  confidence: number;
  language: string;
  extractedProducts: string[];
}

export interface LearnedResponse {
  response: string;
  matchedKeywords: string[];
  knowledgeId: number;
}

/**
 * Enhanced price request detection with context awareness
 */
export function detectPriceRequest(message: string, language: string = 'dutch'): PriceDetectionResult {
  const lowercaseMessage = message.toLowerCase();
  const detectedKeywords: string[] = [];
  let confidence = 0;
  
  // Get keywords for the specified language and fallback to dutch
  const languageKey = language === 'nl' ? 'dutch' : 
                     language === 'en' ? 'english' :
                     language === 'fr' ? 'french' :
                     language === 'tr' ? 'turkish' :
                     language === 'ar' ? 'arabic' : 'dutch';
  
  const keywords = PRICE_KEYWORDS[languageKey] || PRICE_KEYWORDS.dutch;
  
  // Check for direct keyword matches
  keywords.forEach(keyword => {
    if (lowercaseMessage.includes(keyword.toLowerCase())) {
      detectedKeywords.push(keyword);
      confidence += 0.2;
    }
  });
  
  // Context-based detection patterns
  const pricePatterns = [
    /\b(how much|hoeveel|combien|ne kadar|كم)\b.*\b(cost|kost|coût|maliyet|تكلفة)\b/i,
    /\b(what.*price|wat.*prijs|quel.*prix|hangi.*fiyat|ما.*سعر)\b/i,
    /\b(quote|offerte|devis|teklif|عرض)\b.*\b(for|voor|pour|için|لـ)\b/i,
    /\€\s*\d+|\d+\s*euro/i,
    /\b(budget|budget|budget|bütçe|ميزانية)\b/i,
    /\b(free|gratis|gratuit|ücretsiz|مجاني)\b/i
  ];
  
  pricePatterns.forEach(pattern => {
    if (pattern.test(lowercaseMessage)) {
      confidence += 0.3;
    }
  });
  
  // Extract potential product mentions
  const productKeywords = [
    'rolgordijn', 'overgordijn', 'vitrage', 'jaloezie', 'lamellen', 'plissé',
    'vouwgordijn', 'shutters', 'hor', 'screen', 'folie', 'duo',
    'roller blind', 'curtain', 'shutter', 'vertical blind', 'venetian blind',
    'rideau', 'store', 'volet', 'jalousie',
    'perde', 'stor', 'jalezi',
    'ستارة', 'مصراع', 'حاجب'
  ];
  
  const extractedProducts = productKeywords.filter(product => 
    lowercaseMessage.includes(product.toLowerCase())
  );
  
  // Boost confidence if products are mentioned with price keywords
  if (extractedProducts.length > 0 && detectedKeywords.length > 0) {
    confidence += 0.4;
  }
  
  // Cap confidence at 1.0
  confidence = Math.min(confidence, 1.0);
  
  return {
    isPriceRequest: confidence >= 0.3,
    detectedKeywords,
    confidence,
    language: languageKey,
    extractedProducts
  };
}

/**
 * Check if we have a learned response for this query
 */
export async function checkLearnedResponse(message: string, language: string = 'nl'): Promise<LearnedResponse | null> {
  try {
    const lowercaseMessage = message.toLowerCase();
    
    // Get all active knowledge entries for the language
    const knowledgeEntries = await db
      .select()
      .from(priceResponseKnowledge)
      .where(and(
        eq(priceResponseKnowledge.language, language),
        eq(priceResponseKnowledge.isActive, true)
      ));
    
    // Find the best matching response
    let bestMatch: LearnedResponse | null = null;
    let highestScore = 0;
    
    for (const entry of knowledgeEntries) {
      const triggerKeywords = entry.triggerKeywords || [];
      let matchScore = 0;
      const matchedKeywords: string[] = [];
      
      // Calculate match score based on keyword presence
      triggerKeywords.forEach(keyword => {
        if (lowercaseMessage.includes(keyword.toLowerCase())) {
          matchScore += 1;
          matchedKeywords.push(keyword);
        }
      });
      
      // Normalize score by number of keywords
      const normalizedScore = triggerKeywords.length > 0 ? matchScore / triggerKeywords.length : 0;
      
      // Require at least 50% keyword match
      if (normalizedScore >= 0.5 && normalizedScore > highestScore) {
        highestScore = normalizedScore;
        bestMatch = {
          response: entry.response,
          matchedKeywords,
          knowledgeId: entry.id
        };
      }
    }
    
    return bestMatch;
  } catch (error) {
    console.error('Error checking learned responses:', error);
    return null;
  }
}

/**
 * Log usage of a learned response
 */
export async function logResponseUsage(
  knowledgeId: number,
  conversationId: number,
  customerQuestion: string,
  responseUsed: string,
  matchedKeywords: string[]
): Promise<void> {
  try {
    // Insert usage log
    await db.insert(priceResponseLogs).values({
      knowledgeId,
      conversationId,
      customerQuestion,
      responseUsed,
      matchedKeywords
    });
    
    // Update usage count and last used timestamp
    await db
      .update(priceResponseKnowledge)
      .set({
        usageCount: sql`${priceResponseKnowledge.usageCount} + 1`,
        lastUsedAt: new Date()
      })
      .where(eq(priceResponseKnowledge.id, knowledgeId));
      
  } catch (error) {
    console.error('Error logging response usage:', error);
  }
}

/**
 * Create a price request notification for admin
 */
export async function createPriceRequestNotification(
  conversationId: number,
  userMessage: string,
  detectedKeywords: string[],
  userEmail?: string,
  userName?: string
): Promise<number | null> {
  try {
    const result = await db.insert(priceRequestNotifications).values({
      conversationId,
      userMessage,
      userEmail,
      userName,
      detectedKeywords,
      isResponded: false
    }).returning({ id: priceRequestNotifications.id });
    
    return result[0]?.id || null;
  } catch (error) {
    console.error('Error creating price request notification:', error);
    return null;
  }
}

/**
 * Get fallback response for price requests in multiple languages
 */
export function getPriceRequestFallback(language: string = 'nl'): string {
  const responses: Record<string, string> = {
    nl: "Dank je voor je interesse in onze producten! Voor een accurate prijsopgave neem ik graag contact op met onze specialist. Je ontvangt binnen 24 uur een persoonlijk advies op maat. Kan je ondertussen je contactgegevens delen?",
    en: "Thank you for your interest in our products! For an accurate price quote, I'd like to connect you with our specialist. You'll receive personalized advice within 24 hours. Could you share your contact details in the meantime?",
    fr: "Merci pour votre intérêt pour nos produits ! Pour un devis précis, j'aimerais vous mettre en contact avec notre spécialiste. Vous recevrez des conseils personnalisés dans les 24 heures. Pourriez-vous partager vos coordonnées ?",
    tr: "Ürünlerimize gösterdiğiniz ilgi için teşekkür ederiz! Doğru bir fiyat teklifi için sizi uzmanımızla buluşturmak istiyorum. 24 saat içinde kişiselleştirilmiş tavsiye alacaksınız. Bu arada iletişim bilgilerinizi paylaşabilir misiniz?",
    ar: "شكراً لاهتمامك بمنتجاتنا! للحصول على عرض سعر دقيق، أود أن أوصلك بأخصائينا. ستتلقى نصائح شخصية خلال 24 ساعة. هل يمكنك مشاركة بيانات الاتصال الخاصة بك؟"
  };
  
  return responses[language] || responses.nl;
}

/**
 * Rate limiting for price request notifications (max 3 per minute)
 */
const notificationRateLimit = new Map<string, number[]>();

export function checkNotificationRateLimit(identifier: string = 'global'): boolean {
  const now = Date.now();
  const minute = 60 * 1000;
  
  if (!notificationRateLimit.has(identifier)) {
    notificationRateLimit.set(identifier, []);
  }
  
  const timestamps = notificationRateLimit.get(identifier)!;
  
  // Remove timestamps older than 1 minute
  const recentTimestamps = timestamps.filter(timestamp => now - timestamp < minute);
  
  // Check if under rate limit (max 3 per minute)
  if (recentTimestamps.length >= 3) {
    return false;
  }
  
  // Add current timestamp
  recentTimestamps.push(now);
  notificationRateLimit.set(identifier, recentTimestamps);
  
  return true;
}