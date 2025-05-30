/**
 * STEP 2: Smart Response Filtering & Structured Chatbot Responses
 * Implements precise content filtering, controlled tone, and structured formatting
 */

import { storage } from "./storage";
import type { WebsiteContentIndex, ChatbotKnowledge } from "@shared/schema";

export interface FilteredResponse {
  content: string;
  confidence: number;
  sourceCategory: string;
  language: string;
  followUpSuggestion?: string;
  usedTestimonials: boolean;
}

export interface QuestionAnalysis {
  intent: string;
  category: string;
  keywords: string[];
  language: string;
  needsTestimonials: boolean;
  complexity: 'simple' | 'detailed' | 'complex';
}

/**
 * Main function for STEP 2: Generate smart filtered responses
 */
export async function generateSmartFilteredResponse(
  question: string,
  language: string,
  sessionId?: string
): Promise<FilteredResponse> {
  
  // Step 1: Analyze the user's question
  const analysis = analyzeUserQuestion(question, language);
  
  // Step 2: Get relevant content based on analysis
  const relevantContent = await getRelevantContent(analysis);
  
  // Step 3: Apply smart filtering rules
  const filteredContent = applySmartFiltering(relevantContent, analysis);
  
  // Step 4: Structure the response according to STEP 2 requirements
  const structuredResponse = structureResponse(filteredContent, analysis);
  
  return {
    content: structuredResponse.content,
    confidence: structuredResponse.confidence,
    sourceCategory: analysis.category,
    language: analysis.language,
    followUpSuggestion: structuredResponse.followUp,
    usedTestimonials: analysis.needsTestimonials
  };
}

/**
 * Analyze user question to determine intent and filtering requirements
 */
function analyzeUserQuestion(question: string, language: string): QuestionAnalysis {
  const questionLower = question.toLowerCase();
  
  // Determine if testimonials are explicitly requested
  const testimonialsKeywords = {
    nl: ['review', 'ervaring', 'mening', 'testimonial', 'klant', 'tevreden'],
    fr: ['avis', 'expérience', 'témoignage', 'client', 'satisfait'],
    en: ['review', 'experience', 'testimonial', 'customer', 'satisfied'],
    tr: ['deneyim', 'müşteri', 'memnun', 'görüş']
  };
  
  const needsTestimonials = testimonialsKeywords[language as keyof typeof testimonialsKeywords]?.some(
    keyword => questionLower.includes(keyword)
  ) || false;
  
  // Determine main category
  let category = 'general';
  let intent = 'information';
  
  if (questionLower.includes('prijs') || questionLower.includes('kost') || questionLower.includes('prix')) {
    category = 'pricing';
    intent = 'pricing_inquiry';
  } else if (questionLower.includes('installat') || questionLower.includes('monter') || questionLower.includes('montage')) {
    category = 'installation';
    intent = 'service_inquiry';
  } else if (questionLower.includes('opmeten') || questionLower.includes('meten') || questionLower.includes('mesure')) {
    category = 'services';
    intent = 'service_inquiry';
  } else if (questionLower.includes('gordijn') || questionLower.includes('rideau') || questionLower.includes('curtain')) {
    category = 'products';
    intent = 'product_inquiry';
  } else if (questionLower.includes('vouwgordijn') || questionLower.includes('plissé') || questionLower.includes('blinds')) {
    category = 'products';
    intent = 'product_inquiry';
  } else if (questionLower.includes('rolgordijn') || questionLower.includes('rouleau') || questionLower.includes('roller')) {
    category = 'products';
    intent = 'product_inquiry';
  } else if (questionLower.includes('shutter')) {
    category = 'products';
    intent = 'product_inquiry';
  } else if (questionLower.includes('garantie') || questionLower.includes('warranty')) {
    category = 'warranty';
    intent = 'warranty_inquiry';
  } else if (questionLower.includes('onderhoud') || questionLower.includes('maintenance')) {
    category = 'maintenance';
    intent = 'maintenance_inquiry';
  } else if (questionLower.includes('contact') || questionLower.includes('bereikbaar')) {
    category = 'support';
    intent = 'contact_inquiry';
  }
  
  // Extract keywords
  const keywords = extractQuestionKeywords(question, language);
  
  // Determine complexity
  const complexity = questionLower.split(' ').length > 10 ? 'complex' : 
                    questionLower.split(' ').length > 5 ? 'detailed' : 'simple';
  
  return {
    intent,
    category,
    keywords,
    language,
    needsTestimonials,
    complexity
  };
}

/**
 * Get relevant content based on question analysis
 */
async function getRelevantContent(analysis: QuestionAnalysis): Promise<{
  websiteContent: WebsiteContentIndex[];
  knowledgeBase: ChatbotKnowledge[];
}> {
  
  // Get website content by category and language
  const websiteContent = await storage.getWebsiteContentIndex(analysis.language, analysis.category);
  
  // Get knowledge base content
  const knowledgeBase = await storage.getChatbotKnowledge(analysis.language);
  
  return { websiteContent, knowledgeBase };
}

/**
 * Apply smart filtering rules - STEP 2 core logic
 */
function applySmartFiltering(
  content: { websiteContent: WebsiteContentIndex[]; knowledgeBase: ChatbotKnowledge[] },
  analysis: QuestionAnalysis
): { filteredContent: string; confidence: number } {
  
  let filteredContent = '';
  let confidence = 0;
  
  // Rule 1: Strict content filtering - only show matching content
  const relevantWebContent = content.websiteContent.filter(item => {
    const contentText = `${item.pageTitle} ${item.bodyContent}`.toLowerCase();
    return analysis.keywords.some(keyword => contentText.includes(keyword.toLowerCase()));
  });
  
  const relevantKnowledge = content.knowledgeBase.filter(item => {
    if (item.category !== analysis.category && analysis.category !== 'general') return false;
    const contentText = `${item.topic} ${item.content}`.toLowerCase();
    return analysis.keywords.some(keyword => contentText.includes(keyword.toLowerCase()));
  });
  
  // Rule 2: Priority system - website content first, then knowledge base
  if (relevantWebContent.length > 0) {
    const bestMatch = relevantWebContent[0];
    filteredContent = bestMatch.bodyContent;
    confidence = 0.9;
  } else if (relevantKnowledge.length > 0) {
    const bestMatch = relevantKnowledge.find(item => (item.priority || 0) >= 8) || relevantKnowledge[0];
    filteredContent = bestMatch.content;
    confidence = 0.8;
  } else {
    // Rule 6: No fallback unless knowledge is truly missing
    filteredContent = getFallbackResponse(analysis);
    confidence = 0.3;
  }
  
  return { filteredContent, confidence };
}

/**
 * Structure response according to STEP 2 requirements
 */
function structureResponse(
  filteredData: { filteredContent: string; confidence: number },
  analysis: QuestionAnalysis
): { content: string; confidence: number; followUp?: string } {
  
  const { filteredContent, confidence } = filteredData;
  
  // Rule 2: Answer structure - direct and clear
  let structuredContent = '';
  
  if (analysis.intent === 'service_inquiry') {
    structuredContent = formatServiceResponse(filteredContent, analysis);
  } else if (analysis.intent === 'pricing_inquiry') {
    structuredContent = formatPricingResponse(filteredContent, analysis);
  } else if (analysis.intent === 'product_inquiry') {
    structuredContent = formatProductResponse(filteredContent, analysis);
  } else {
    structuredContent = formatGeneralResponse(filteredContent, analysis);
  }
  
  // Rule 3: Length limits - 3-5 lines maximum
  const lines = structuredContent.split('\n').filter(line => line.trim());
  if (lines.length > 5) {
    structuredContent = lines.slice(0, 3).join('\n');
    const followUp = getFollowUpSuggestion(analysis.language);
    return { content: structuredContent, confidence, followUp };
  }
  
  return { content: structuredContent, confidence };
}

/**
 * Format service-related responses
 */
function formatServiceResponse(content: string, analysis: QuestionAnalysis): string {
  const language = analysis.language;
  
  if (analysis.category === 'installation') {
    const responses = {
      nl: "Ja, wij verzorgen professionele montage aan huis voor alle raambekleding. Deze service is beschikbaar in heel België.",
      fr: "Oui, nous assurons une installation professionnelle à domicile pour tous nos traitements de fenêtres. Ce service est disponible dans toute la Belgique.",
      en: "Yes, we provide professional in-home installation for all our window treatments. This service is available throughout Belgium.",
      tr: "Evet, tüm pencere kaplamaları için evde profesyonel kurulum hizmeti sunuyoruz. Bu hizmet Belçika genelinde mevcuttur."
    };
    return responses[language as keyof typeof responses] || responses.nl;
  }
  
  if (analysis.category === 'services') {
    const responses = {
      nl: "Wij bieden gratis opmetingservice aan huis. Een vakkundige adviseur komt langs voor exacte maten en persoonlijk advies.",
      fr: "Nous offrons un service de mesure gratuit à domicile. Un conseiller expert viendra pour des mesures précises et des conseils personnalisés.",
      en: "We offer free in-home measuring service. An expert advisor will visit for precise measurements and personal advice.",
      tr: "Ücretsiz evde ölçüm hizmeti sunuyoruz. Uzman bir danışman kesin ölçümler ve kişisel tavsiyeler için ziyaret edecek."
    };
    return responses[language as keyof typeof responses] || responses.nl;
  }
  
  return extractKeyInfo(content, 150);
}

/**
 * Format pricing-related responses
 */
function formatPricingResponse(content: string, analysis: QuestionAnalysis): string {
  const language = analysis.language;
  
  const responses = {
    nl: "Onze prijzen starten vanaf €45 per meter voor gordijnen en €85 per m² voor vouwgordijnen. De exacte prijs hangt af van materiaal en afmetingen.\n\nWilt u een gratis offerte aanvragen?",
    fr: "Nos prix commencent à partir de 45€ par mètre pour les rideaux et 85€ par m² pour les stores plissés. Le prix exact dépend du matériau et des dimensions.\n\nSouhaitez-vous demander un devis gratuit?",
    en: "Our prices start from €45 per meter for curtains and €85 per m² for pleated blinds. The exact price depends on material and dimensions.\n\nWould you like to request a free quote?",
    tr: "Fiyatlarımız perdeler için metre başına 45€'dan, plise perdeler için m² başına 85€'dan başlıyor. Kesin fiyat malzeme ve boyutlara bağlıdır.\n\nÜcretsiz teklif almak ister misiniz?"
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Format product-related responses
 */
function formatProductResponse(content: string, analysis: QuestionAnalysis): string {
  const firstSentence = content.split('.')[0] + '.';
  const secondSentence = content.split('.')[1] ? content.split('.')[1].trim() + '.' : '';
  
  return secondSentence ? `${firstSentence}\n${secondSentence}` : firstSentence;
}

/**
 * Format general responses
 */
function formatGeneralResponse(content: string, analysis: QuestionAnalysis): string {
  return extractKeyInfo(content, 200);
}

/**
 * Extract key information with length limit
 */
function extractKeyInfo(content: string, maxLength: number): string {
  if (content.length <= maxLength) return content;
  
  const sentences = content.split('.');
  let result = '';
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed && (result + trimmed + '.').length <= maxLength) {
      result += (result ? ' ' : '') + trimmed + '.';
    } else {
      break;
    }
  }
  
  return result || content.substring(0, maxLength) + '...';
}

/**
 * Get follow-up suggestion
 */
function getFollowUpSuggestion(language: string): string {
  const suggestions = {
    nl: "Wilt u meer details hierover?",
    fr: "Souhaitez-vous plus de détails à ce sujet?",
    en: "Would you like more details about this?",
    tr: "Bu konuda daha fazla ayrıntı ister misiniz?"
  };
  
  return suggestions[language as keyof typeof suggestions] || suggestions.nl;
}

/**
 * Extract keywords from question
 */
function extractQuestionKeywords(question: string, language: string): string[] {
  const stopWords = {
    nl: ['de', 'het', 'een', 'van', 'in', 'op', 'voor', 'met', 'is', 'zijn', 'wat', 'hoe', 'waar', 'wanneer'],
    fr: ['le', 'la', 'un', 'une', 'de', 'du', 'des', 'et', 'ou', 'est', 'sont', 'que', 'qui', 'quoi', 'comment'],
    en: ['the', 'a', 'an', 'of', 'in', 'on', 'for', 'with', 'is', 'are', 'what', 'how', 'where', 'when'],
    tr: ['bir', 'bu', 'şu', 'de', 'da', 've', 'ile', 'için', 'ne', 'nasıl', 'nerede', 'ne zaman']
  };
  
  const words = question.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  const languageStopWords = stopWords[language as keyof typeof stopWords] || stopWords.nl;
  
  return words.filter(word => !languageStopWords.includes(word));
}

/**
 * Fallback response when no relevant content is found
 */
function getFallbackResponse(analysis: QuestionAnalysis): string {
  const responses = {
    nl: "Ik kan u hiermee helpen. Kunt u uw vraag iets specifieker stellen?",
    fr: "Je peux vous aider avec cela. Pouvez-vous préciser davantage votre question?",
    en: "I can help you with that. Could you make your question more specific?",
    tr: "Bu konuda size yardımcı olabilirim. Sorunuzu biraz daha spesifik hale getirebilir misiniz?"
  };
  
  return responses[analysis.language as keyof typeof responses] || responses.nl;
}