/**
 * Enhanced Knowledge Retrieval System for KANIOU Chatbot
 * Provides semantic question matching and intelligent content retrieval
 */

import type { ChatbotKnowledge } from "@shared/schema";
import { storage } from "./storage";

export interface KnowledgeMatch {
  knowledge: ChatbotKnowledge;
  relevanceScore: number;
  matchType: 'exact' | 'semantic' | 'keyword' | 'category';
  matchedTerms: string[];
}

export interface QuestionIntent {
  type: 'product_info' | 'service_inquiry' | 'pricing' | 'installation' | 'maintenance' | 'company_info' | 'general';
  confidence: number;
  detectedProducts: string[];
  keywords: string[];
}

/**
 * Enhanced semantic question matching with multi-layered approach
 */
export async function findRelevantKnowledge(
  userQuestion: string, 
  language: string = 'nl',
  limit: number = 5
): Promise<KnowledgeMatch[]> {
  const knowledgeBase = await storage.getChatbotKnowledge();
  const intent = analyzeQuestionIntent(userQuestion, language);
  
  const matches: KnowledgeMatch[] = [];
  
  // Filter by language first
  const languageKnowledge = knowledgeBase.filter(kb => 
    kb.language === language && kb.adminApproved
  );
  
  for (const knowledge of languageKnowledge) {
    const relevanceScore = calculateRelevanceScore(
      userQuestion, 
      knowledge, 
      intent, 
      language
    );
    
    if (relevanceScore > 0.3) { // Threshold for relevance
      const matchType = determineMatchType(userQuestion, knowledge, relevanceScore);
      const matchedTerms = extractMatchedTerms(userQuestion, knowledge);
      
      matches.push({
        knowledge,
        relevanceScore,
        matchType,
        matchedTerms
      });
    }
  }
  
  // Sort by relevance score and priority
  return matches
    .sort((a, b) => {
      const scoreA = a.relevanceScore * (a.knowledge.priority || 1);
      const scoreB = b.relevanceScore * (b.knowledge.priority || 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Analyze user question to understand intent
 */
export function analyzeQuestionIntent(question: string, language: string): QuestionIntent {
  const lowerQuestion = question.toLowerCase();
  
  // Define intent patterns for Dutch
  const intentPatterns = {
    nl: {
      product_info: [
        'wat is', 'wat zijn', 'vertel over', 'wat voor', 'welke', 'soorten', 
        'type', 'verschil', 'voordeel', 'nadeel', 'eigenschap', 'kenmerk'
      ],
      service_inquiry: [
        'komen jullie', 'bieden jullie', 'service', 'opmeten', 'installeren', 
        'montage', 'plaatsen', 'leveren', 'afspraak', 'bezoek'
      ],
      pricing: [
        'prijs', 'kosten', 'kost', 'budget', 'offerte', 'tarief', 'euro', 
        'duur', 'goedkoop', 'betalen', 'geld'
      ],
      installation: [
        'installatie', 'montage', 'plaatsen', 'bevestigen', 'ophangen', 
        'monteren', 'hoe installeer', 'zelf maken'
      ],
      maintenance: [
        'onderhoud', 'schoonmaken', 'wassen', 'verzorgen', 'reinigen', 
        'onderhouden', 'vervangen'
      ],
      company_info: [
        'bedrijf', 'kaniou', 'ervaring', 'geschiedenis', 'over ons', 
        'waarom', 'garantie', 'kwaliteit'
      ]
    }
  };
  
  const patterns = intentPatterns[language as keyof typeof intentPatterns] || intentPatterns.nl;
  
  let bestMatch: { type: QuestionIntent['type'], confidence: number } = { type: 'general', confidence: 0 };
  
  for (const [intentType, keywords] of Object.entries(patterns)) {
    const matchCount = keywords.filter(keyword => 
      lowerQuestion.includes(keyword)
    ).length;
    
    const confidence = matchCount / keywords.length;
    
    if (confidence > bestMatch.confidence) {
      bestMatch = {
        type: intentType as QuestionIntent['type'],
        confidence
      };
    }
  }
  
  // Detect products mentioned
  const detectedProducts = detectProductMentions(question);
  const keywords = extractKeywords(question, language);
  
  return {
    ...bestMatch,
    detectedProducts,
    keywords
  };
}

/**
 * Calculate relevance score between question and knowledge entry
 */
function calculateRelevanceScore(
  question: string, 
  knowledge: ChatbotKnowledge, 
  intent: QuestionIntent,
  language: string
): number {
  let score = 0;
  const lowerQuestion = question.toLowerCase();
  const lowerTopic = knowledge.topic.toLowerCase();
  const lowerContent = knowledge.content.toLowerCase();
  
  // 1. Exact topic match (highest weight)
  if (lowerQuestion.includes(lowerTopic) || lowerTopic.includes(lowerQuestion)) {
    score += 0.4;
  }
  
  // 2. Keyword overlap in content
  const questionWords = tokenizeText(lowerQuestion);
  const contentWords = tokenizeText(lowerContent);
  const topicWords = tokenizeText(lowerTopic);
  
  const keywordOverlap = calculateWordOverlap(questionWords, [...contentWords, ...topicWords]);
  score += keywordOverlap * 0.3;
  
  // 3. Intent-category alignment
  const categoryAlignment = calculateCategoryAlignment(intent.type, knowledge.category);
  score += categoryAlignment * 0.2;
  
  // 4. Product mention alignment
  if (intent.detectedProducts.length > 0) {
    const productAlignment = intent.detectedProducts.some(product =>
      lowerTopic.includes(product.toLowerCase()) || 
      lowerContent.includes(product.toLowerCase())
    );
    if (productAlignment) score += 0.1;
  }
  
  return Math.min(score, 1.0);
}

/**
 * Determine the type of match found
 */
function determineMatchType(
  question: string, 
  knowledge: ChatbotKnowledge, 
  score: number
): KnowledgeMatch['matchType'] {
  const lowerQuestion = question.toLowerCase();
  const lowerTopic = knowledge.topic.toLowerCase();
  
  if (lowerQuestion === lowerTopic || score > 0.8) return 'exact';
  if (score > 0.6) return 'semantic';
  if (score > 0.4) return 'keyword';
  return 'category';
}

/**
 * Extract terms that matched between question and knowledge
 */
function extractMatchedTerms(question: string, knowledge: ChatbotKnowledge): string[] {
  const questionWords = tokenizeText(question.toLowerCase());
  const topicWords = tokenizeText(knowledge.topic.toLowerCase());
  const contentWords = tokenizeText(knowledge.content.toLowerCase());
  
  const allKnowledgeWords = [...topicWords, ...contentWords];
  
  return questionWords.filter(word => 
    word.length > 3 && allKnowledgeWords.includes(word)
  );
}

/**
 * Detect product mentions in user question
 */
function detectProductMentions(question: string): string[] {
  const lowerQuestion = question.toLowerCase();
  
  // Dutch product terms
  const productKeywords = {
    'rolgordijnen': ['rolgordijn', 'rolgordijnen', 'roller blind'],
    'overgordijnen': ['overgordijn', 'overgordijnen', 'gordijn', 'gordijnen'],
    'vitrages': ['vitrage', 'vitrages', 'inbetween', 'dag gordijn'],
    'jaloezieën': ['jaloezie', 'jaloezieën', 'blind', 'blinds'],
    'plissé': ['plisse', 'plissé', 'plisse gordijn'],
    'vouwgordijnen': ['vouwgordijn', 'vouwgordijnen', 'roman blind'],
    'lamellen': ['lamel', 'lamellen', 'verticale lamellen'],
    'shutters': ['shutter', 'shutters', 'luiken'],
    'horren': ['hor', 'horren', 'insectenwering'],
    'duo systemen': ['duo', 'dag nacht', 'day night']
  };
  
  const detected: string[] = [];
  
  for (const [product, keywords] of Object.entries(productKeywords)) {
    if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
      detected.push(product);
    }
  }
  
  return detected;
}

/**
 * Extract meaningful keywords from question
 */
function extractKeywords(question: string, language: string): string[] {
  // Dutch stop words to filter out
  const stopWords = [
    'de', 'het', 'een', 'en', 'van', 'te', 'dat', 'die', 'in', 'een', 
    'hij', 'het', 'hebben', 'dit', 'met', 'niet', 'worden', 'of', 'aan',
    'wat', 'hoe', 'waar', 'wanneer', 'waarom', 'wie', 'kan', 'wil', 'zou'
  ];
  
  return tokenizeText(question.toLowerCase())
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .slice(0, 10); // Limit to most important keywords
}

/**
 * Tokenize text into meaningful words
 */
function tokenizeText(text: string): string[] {
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Calculate word overlap between two arrays
 */
function calculateWordOverlap(words1: string[], words2: string[]): number {
  if (words1.length === 0 || words2.length === 0) return 0;
  
  const intersection = words1.filter(word => words2.includes(word));
  const uniqueWords = [...new Set([...words1, ...words2])];
  
  return intersection.length / uniqueWords.length; // Jaccard similarity
}

/**
 * Calculate alignment between question intent and knowledge category
 */
function calculateCategoryAlignment(intent: QuestionIntent['type'], category: string): number {
  const alignmentMap = {
    'product_info': { 'product': 1.0, 'general': 0.7, 'faq': 0.5 },
    'service_inquiry': { 'service': 1.0, 'faq': 0.8, 'company': 0.6 },
    'pricing': { 'pricing': 1.0, 'faq': 0.7, 'product': 0.5 },
    'installation': { 'faq': 1.0, 'service': 0.8, 'product': 0.6 },
    'maintenance': { 'faq': 1.0, 'product': 0.7 },
    'company_info': { 'company': 1.0, 'service': 0.6 },
    'general': { 'general': 1.0, 'faq': 0.8 }
  };
  
  const intentMap = alignmentMap[intent];
  return intentMap ? (intentMap[category as keyof typeof intentMap] || 0.3) : 0.3;
}

/**
 * Generate contextual response using matched knowledge
 */
export function generateKnowledgeResponse(
  matches: KnowledgeMatch[], 
  intent: QuestionIntent,
  language: string = 'nl'
): string {
  if (matches.length === 0) {
    return getNoMatchResponse(intent, language);
  }
  
  // Use the best match as primary content
  const primaryMatch = matches[0];
  let response = primaryMatch.knowledge.content;
  
  // Add related information if multiple good matches
  if (matches.length > 1 && matches[1].relevanceScore > 0.6) {
    const secondaryInfo = matches[1].knowledge.content;
    if (!response.includes(secondaryInfo.substring(0, 50))) {
      response += `\n\nDaarnaast: ${secondaryInfo}`;
    }
  }
  
  // Add call-to-action based on intent
  response += getCallToAction(intent, language);
  
  return response;
}

/**
 * Get response when no knowledge matches found
 */
function getNoMatchResponse(intent: QuestionIntent, language: string): string {
  const responses = {
    nl: {
      product_info: "Ik help u graag met productinformatie. Kunt u specificeren over welk type raambekleding u meer wilt weten?",
      service_inquiry: "Voor informatie over onze services verwijs ik u graag naar onze specialists. Zij kunnen u volledig informeren over onze mogelijkheden.",
      pricing: "Voor een accurate prijsopgave plannen wij graag een gratis opmeetafspraak in. Dan kunnen we u een maatwerkofferte geven.",
      installation: "Voor installatie-advies helpen onze monteurs u graag verder. Wilt u meer specifieke informatie over een bepaald product?",
      maintenance: "Voor onderhoudstips van uw raambekleding help ik u graag. Over welk type product heeft u vragen?",
      company_info: "KANIOU heeft meer dan 30 jaar ervaring in hoogwaardige raambekleding. Voor meer informatie over ons bedrijf neem gerust contact op.",
      general: "Ik help u graag verder met uw vraag over raambekleding. Kunt u uw vraag misschien wat specifieker stellen?"
    }
  };
  
  const langResponses = responses[language as keyof typeof responses] || responses.nl;
  return langResponses[intent.type as keyof typeof langResponses] || langResponses.general;
}

/**
 * Add appropriate call-to-action based on intent
 */
function getCallToAction(intent: QuestionIntent, language: string): string {
  const actions = {
    nl: {
      pricing: "\n\nWilt u een vrijblijvende offerte? Dan plannen wij graag een opmeetafspraak in.",
      service_inquiry: "\n\nVoor meer informatie over onze services kunt u contact met ons opnemen.",
      installation: "\n\nOnze monteurs installeren professioneel en zorgeloos. Wilt u meer weten over de installatie?",
      product_info: "\n\nHeeft u nog vragen over dit product of wilt u andere opties bekijken?",
      company_info: "\n\nWilt u meer weten over KANIOU of heeft u andere vragen?",
      general: "\n\nKan ik u ergens anders mee helpen?"
    }
  };
  
  const langActions = actions[language as keyof typeof actions] || actions.nl;
  return langActions[intent.type] || langActions.general;
}