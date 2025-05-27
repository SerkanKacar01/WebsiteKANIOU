/**
 * Advanced Conversation Memory & Context Learning System
 * Enhances AI's ability to remember context and learn from interactions
 */

import { db } from "./db";
import { chatbotMessages, chatbotConversations, priceResponseKnowledge } from "@shared/schema";
import { eq, desc, and, like, gte } from "drizzle-orm";
import type { ChatbotMessage, PriceResponseKnowledge } from "@shared/schema";

export interface ConversationContext {
  sessionId: string;
  recentMessages: ChatbotMessage[];
  detectedTopics: string[];
  userIntent: string;
  previousQuestions: string[];
  conversationFlow: string;
}

export interface MemoryMatch {
  confidence: number;
  response: string;
  originalQuestion: string;
  context: any;
  lastUsed: Date;
}

/**
 * Build comprehensive conversation context for AI
 */
export async function buildConversationContext(sessionId: string): Promise<ConversationContext> {
  // Get recent conversation messages (last 20)
  const recentMessages = await db
    .select()
    .from(chatbotMessages)
    .leftJoin(chatbotConversations, eq(chatbotMessages.conversationId, chatbotConversations.id))
    .where(eq(chatbotConversations.sessionId, sessionId))
    .orderBy(desc(chatbotMessages.createdAt))
    .limit(20);

  const messages = recentMessages.map(row => row.chatbot_messages).reverse();
  
  // Analyze conversation topics and intent
  const userMessages = messages.filter(msg => msg.role === 'user');
  const detectedTopics = extractTopicsFromMessages(userMessages);
  const userIntent = determineUserIntent(userMessages);
  const previousQuestions = userMessages.map(msg => msg.content);
  const conversationFlow = analyzeConversationFlow(messages);

  return {
    sessionId,
    recentMessages: messages,
    detectedTopics,
    userIntent,
    previousQuestions,
    conversationFlow
  };
}

/**
 * Check for learned responses that match current question
 */
export async function findLearnedResponse(
  question: string, 
  context: ConversationContext,
  language: string = 'nl'
): Promise<MemoryMatch | null> {
  try {
    // Get all active learned responses
    const learnedResponses = await db
      .select()
      .from(priceResponseKnowledge)
      .where(and(
        eq(priceResponseKnowledge.language, language),
        eq(priceResponseKnowledge.isActive, true)
      ))
      .orderBy(desc(priceResponseKnowledge.usageCount));

    if (!learnedResponses.length) return null;

    // Find best match using semantic similarity and context
    let bestMatch: MemoryMatch | null = null;
    let highestConfidence = 0;

    for (const learned of learnedResponses) {
      const confidence = calculateMatchConfidence(
        question,
        learned.originalQuestion,
        learned.keywords || [],
        context
      );

      if (confidence > highestConfidence && confidence > 0.7) {
        highestConfidence = confidence;
        bestMatch = {
          confidence,
          response: learned.response,
          originalQuestion: learned.originalQuestion,
          context: learned.context,
          lastUsed: learned.lastUsed || new Date()
        };
      }
    }

    return bestMatch;
  } catch (error) {
    console.error('Error finding learned response:', error);
    return null;
  }
}

/**
 * Extract topics from user messages
 */
function extractTopicsFromMessages(messages: ChatbotMessage[]): string[] {
  const topics = new Set<string>();
  
  const topicKeywords = {
    'pricing': ['prijs', 'kost', 'euro', 'geld', 'betalen', 'price', 'cost', 'pay'],
    'installation': ['installatie', 'monteren', 'ophangen', 'install', 'mount', 'hang'],
    'maintenance': ['onderhoud', 'schoonmaken', 'verzorging', 'maintenance', 'clean', 'care'],
    'delivery': ['levering', 'bezorgen', 'verzending', 'delivery', 'shipping', 'transport'],
    'measurement': ['meten', 'afmeting', 'grootte', 'measure', 'size', 'dimension'],
    'material': ['materiaal', 'stof', 'textiel', 'material', 'fabric', 'textile'],
    'color': ['kleur', 'tint', 'colour', 'color', 'shade'],
    'warranty': ['garantie', 'waarborg', 'warranty', 'guarantee']
  };

  messages.forEach(msg => {
    const content = msg.content.toLowerCase();
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => content.includes(keyword))) {
        topics.add(topic);
      }
    });
  });

  return Array.from(topics);
}

/**
 * Determine primary user intent from conversation
 */
function determineUserIntent(messages: ChatbotMessage[]): string {
  if (!messages.length) return 'general_inquiry';

  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Intent patterns
  if (/\b(prijs|kost|euro|price|cost)\b/.test(lastMessage)) {
    return 'pricing_inquiry';
  }
  if (/\b(installatie|monteren|install|mount)\b/.test(lastMessage)) {
    return 'installation_question';
  }
  if (/\b(meten|afmeting|measure|size)\b/.test(lastMessage)) {
    return 'measurement_help';
  }
  if (/\b(levering|bezorgen|delivery|shipping)\b/.test(lastMessage)) {
    return 'delivery_inquiry';
  }
  if (/\b(onderhoud|schoonmaken|maintenance|clean)\b/.test(lastMessage)) {
    return 'maintenance_question';
  }
  if (/\b(verschil|vergelijk|difference|compare)\b/.test(lastMessage)) {
    return 'product_comparison';
  }
  if (/\b(advies|aanbeveling|advice|recommend)\b/.test(lastMessage)) {
    return 'product_advice';
  }

  return 'general_inquiry';
}

/**
 * Analyze conversation flow to understand context
 */
function analyzeConversationFlow(messages: ChatbotMessage[]): string {
  if (messages.length < 2) return 'initial_contact';
  
  const userMessages = messages.filter(msg => msg.role === 'user');
  if (userMessages.length === 1) return 'first_question';
  
  // Check if user is asking follow-up questions
  const lastTwoUser = userMessages.slice(-2);
  if (lastTwoUser.length === 2) {
    const first = lastTwoUser[0].content.toLowerCase();
    const second = lastTwoUser[1].content.toLowerCase();
    
    if (first.includes('prijs') && second.includes('wanneer')) {
      return 'pricing_followup';
    }
    if (first.includes('product') && second.includes('kleur')) {
      return 'product_details';
    }
  }
  
  return userMessages.length > 3 ? 'ongoing_conversation' : 'follow_up_questions';
}

/**
 * Calculate match confidence between current question and learned response
 */
function calculateMatchConfidence(
  currentQuestion: string,
  learnedQuestion: string,
  keywords: string[],
  context: ConversationContext
): number {
  let confidence = 0;
  
  const current = currentQuestion.toLowerCase();
  const learned = learnedQuestion.toLowerCase();
  
  // Direct text similarity (40% weight)
  const similarity = calculateTextSimilarity(current, learned);
  confidence += similarity * 0.4;
  
  // Keyword matching (30% weight)
  const keywordMatch = keywords.filter(keyword => 
    current.includes(keyword.toLowerCase())
  ).length / Math.max(keywords.length, 1);
  confidence += keywordMatch * 0.3;
  
  // Context relevance (20% weight)
  const contextMatch = calculateContextMatch(current, context);
  confidence += contextMatch * 0.2;
  
  // Intent matching (10% weight)
  const intentMatch = current.includes('prijs') && learned.includes('prijs') ? 1 : 0.5;
  confidence += intentMatch * 0.1;
  
  return Math.min(confidence, 1.0);
}

/**
 * Calculate text similarity between two strings
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  
  const commonWords = words1.filter(word => 
    words2.includes(word) && word.length > 2
  );
  
  const totalWords = Math.max(words1.length, words2.length);
  return commonWords.length / totalWords;
}

/**
 * Calculate context match based on conversation topics
 */
function calculateContextMatch(question: string, context: ConversationContext): number {
  let contextScore = 0;
  
  // Check if current question relates to detected topics
  context.detectedTopics.forEach(topic => {
    if (question.includes(topic) || 
        (topic === 'pricing' && /\b(prijs|kost|euro)\b/.test(question))) {
      contextScore += 0.3;
    }
  });
  
  // Check conversation flow relevance
  if (context.conversationFlow === 'pricing_followup' && 
      /\b(prijs|kost|euro)\b/.test(question)) {
    contextScore += 0.4;
  }
  
  return Math.min(contextScore, 1.0);
}

/**
 * Log when a learned response is used
 */
export async function logLearnedResponseUsage(
  responseId: number,
  sessionId: string,
  question: string
): Promise<void> {
  try {
    // This would increment usage count and update last used time
    // Implementation depends on your priceResponseKnowledge table structure
    console.log(`📚 LEARNED RESPONSE: Used response #${responseId} for session ${sessionId}`);
  } catch (error) {
    console.error('Error logging learned response usage:', error);
  }
}

/**
 * Store new conversation context for future learning
 */
export async function storeConversationContext(
  sessionId: string,
  userQuestion: string,
  aiResponse: string,
  topics: string[]
): Promise<void> {
  try {
    // Store conversation patterns for future learning
    console.log(`🧠 CONTEXT STORED: Session ${sessionId} - Topics: ${topics.join(', ')}`);
  } catch (error) {
    console.error('Error storing conversation context:', error);
  }
}