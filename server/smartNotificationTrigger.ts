/**
 * Smart Email Notification Trigger System
 * Sends notifications to website owner only when specific conditions are met
 */

import { storage } from "./storage";
import { sendConversationSummaryEmail } from "./emailSummary";

export interface TriggerAnalysis {
  shouldTrigger: boolean;
  triggerReason: 'fallback_response' | 'explicit_contact_request' | 'multiple_complex_intents' | 'none';
  confidence: number;
  metadata: {
    intentCount: number;
    hasContactKeywords: boolean;
    hasFallbackResponse: boolean;
    conversationComplexity: 'simple' | 'moderate' | 'complex';
  };
}

export interface NotificationContent {
  customerQuestion: string;
  fullConversation: string;
  language: string;
  triggerReason: string;
  timestamp: string;
  conversationId: string;
}

/**
 * Analyze conversation to determine if notification should be triggered
 */
export function analyzeTriggerConditions(
  currentMessage: string,
  conversationHistory: Array<{role: string, content: string}>,
  responseConfidence: number,
  language: string
): TriggerAnalysis {
  
  // 1. Check for fallback response or low confidence
  const hasFallbackResponse = responseConfidence < 0.5 || 
    currentMessage.toLowerCase().includes('i don\'t know') ||
    currentMessage.toLowerCase().includes('ik weet het niet') ||
    currentMessage.toLowerCase().includes('je ne sais pas') ||
    currentMessage.toLowerCase().includes('bilmiyorum');

  // 2. Check for explicit contact requests
  const contactKeywords = {
    nl: [
      'kan ik iemand bellen', 'kun je me terugbellen', 'wil ik een afspraak',
      'kan ik met iemand praten', 'menselijke hulp', 'echte persoon',
      'telefonisch contact', 'persoonlijk contact', 'live chat'
    ],
    fr: [
      'puis-je appeler quelqu\'un', 'pouvez-vous me rappeler', 'je veux un rendez-vous',
      'puis-je parler à quelqu\'un', 'aide humaine', 'vraie personne',
      'contact téléphonique', 'contact personnel'
    ],
    en: [
      'can i call someone', 'can you call me back', 'want to schedule appointment',
      'can i speak to someone', 'human help', 'real person',
      'phone contact', 'personal contact', 'live support'
    ],
    tr: [
      'birini arayabilir miyim', 'beni geri arayabilir misiniz', 'randevu almak istiyorum',
      'biriyle konuşabilir miyim', 'insan yardımı', 'gerçek kişi',
      'telefon iletişimi', 'kişisel iletişim'
    ]
  };

  const currentKeywords = contactKeywords[language as keyof typeof contactKeywords] || contactKeywords.nl;
  const hasContactKeywords = currentKeywords.some(keyword => 
    currentMessage.toLowerCase().includes(keyword)
  );

  // 3. Analyze conversation complexity and intent count
  const intents = extractConversationIntents(conversationHistory, language);
  const intentCount = intents.length;
  
  // Determine complexity
  let conversationComplexity: 'simple' | 'moderate' | 'complex' = 'simple';
  if (intentCount >= 4 || conversationHistory.length > 10) {
    conversationComplexity = 'complex';
  } else if (intentCount >= 2 || conversationHistory.length > 6) {
    conversationComplexity = 'moderate';
  }

  // 4. Determine if trigger should activate
  let shouldTrigger = false;
  let triggerReason: TriggerAnalysis['triggerReason'] = 'none';
  let confidence = 0;

  if (hasFallbackResponse) {
    shouldTrigger = true;
    triggerReason = 'fallback_response';
    confidence = 0.9;
  } else if (hasContactKeywords) {
    shouldTrigger = true;
    triggerReason = 'explicit_contact_request';
    confidence = 0.95;
  } else if (intentCount >= 3 && conversationComplexity === 'complex') {
    shouldTrigger = true;
    triggerReason = 'multiple_complex_intents';
    confidence = 0.7;
  }

  return {
    shouldTrigger,
    triggerReason,
    confidence,
    metadata: {
      intentCount,
      hasContactKeywords,
      hasFallbackResponse,
      conversationComplexity
    }
  };
}

/**
 * Extract intents from conversation history
 */
function extractConversationIntents(
  conversationHistory: Array<{role: string, content: string}>,
  language: string
): string[] {
  const intents: string[] = [];
  
  const intentPatterns = {
    pricing: {
      nl: /\b(prijs|kost|euro|budget|tarief|offerte)\b/i,
      fr: /\b(prix|coût|euro|budget|tarif|devis)\b/i,
      en: /\b(price|cost|euro|budget|rate|quote)\b/i,
      tr: /\b(fiyat|maliyet|euro|bütçe|ücret|teklif)\b/i
    },
    products: {
      nl: /\b(gordijn|rolgordijn|vouwgordijn|jaloezie|shutter|zonwering)\b/i,
      fr: /\b(rideau|store|volet|jalousie)\b/i,
      en: /\b(curtain|blind|shutter|roller)\b/i,
      tr: /\b(perde|stor|jaluz)\b/i
    },
    installation: {
      nl: /\b(installatie|montage|plaatsen)\b/i,
      fr: /\b(installation|montage)\b/i,
      en: /\b(installation|mounting|install)\b/i,
      tr: /\b(kurulum|montaj)\b/i
    },
    delivery: {
      nl: /\b(levering|bezorgen|verzending)\b/i,
      fr: /\b(livraison|expédition)\b/i,
      en: /\b(delivery|shipping)\b/i,
      tr: /\b(teslimat|kargo)\b/i
    },
    customization: {
      nl: /\b(maatwerk|aangepast|speciaal)\b/i,
      fr: /\b(sur mesure|personnalisé|spécial)\b/i,
      en: /\b(custom|bespoke|personalized)\b/i,
      tr: /\b(özel|kişiselleştirilmiş)\b/i
    }
  };

  const userMessages = conversationHistory.filter(msg => msg.role === 'user');
  const allUserText = userMessages.map(msg => msg.content).join(' ');

  Object.entries(intentPatterns).forEach(([intent, patterns]) => {
    const pattern = patterns[language as keyof typeof patterns] || patterns.nl;
    if (pattern.test(allUserText)) {
      intents.push(intent);
    }
  });

  return intents;
}

/**
 * Send smart notification email to website owner
 */
export async function sendSmartNotification(
  notificationData: NotificationContent
): Promise<boolean> {
  try {
    const { customerQuestion, fullConversation, language, triggerReason, timestamp, conversationId } = notificationData;

    // Email content for website owner
    const emailSubject = `🤖 KANIOU Chatbot: Human Assistance Required`;
    
    const reasonDescriptions = {
      fallback_response: {
        nl: 'Chatbot kon geen passend antwoord vinden',
        fr: 'Le chatbot n\'a pas pu trouver de réponse appropriée',
        en: 'Chatbot could not find appropriate answer',
        tr: 'Chatbot uygun bir cevap bulamadı'
      },
      explicit_contact_request: {
        nl: 'Klant vraagt expliciet om persoonlijk contact',
        fr: 'Le client demande explicitement un contact personnel',
        en: 'Customer explicitly requests personal contact',
        tr: 'Müşteri açıkça kişisel iletişim talep ediyor'
      },
      multiple_complex_intents: {
        nl: 'Complexe conversatie met meerdere onderwerpen',
        fr: 'Conversation complexe avec plusieurs sujets',
        en: 'Complex conversation with multiple topics',
        tr: 'Birden fazla konulu karmaşık konuşma'
      }
    };

    const reasonText = reasonDescriptions[triggerReason as keyof typeof reasonDescriptions]?.en || 'Unknown trigger';

    const emailContent = `
KANIOU Chatbot Notification
==========================

Trigger Reason: ${reasonText}
Language: ${language.toUpperCase()}
Date & Time: ${timestamp}
Conversation ID: ${conversationId}

Customer's Latest Question:
---------------------------
${customerQuestion}

Full Conversation:
-----------------
${fullConversation}

Action Required:
---------------
Please review this conversation and consider reaching out to the customer for personalized assistance.

Customer may benefit from:
- Direct phone consultation
- In-home measurement appointment  
- Personalized product recommendation
- Complex pricing discussion

---
This notification was automatically generated by the KANIOU AI Chatbot system.
    `.trim();

    // HTML version for better formatting
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
        .section { background: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #dc2626; }
        .conversation { background: #f1f5f9; padding: 15px; font-family: monospace; white-space: pre-wrap; border-radius: 4px; }
        .urgent { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; color: #991b1b; }
        .footer { background: #1e293b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 KANIOU Chatbot Alert</h1>
            <p>Human Assistance Required</p>
        </div>
        
        <div class="content">
            <div class="urgent">
                <h3>🚨 Action Required</h3>
                <p><strong>Trigger:</strong> ${reasonText}</p>
                <p><strong>Language:</strong> ${language.toUpperCase()}</p>
                <p><strong>Time:</strong> ${timestamp}</p>
                <p><strong>Conversation ID:</strong> ${conversationId}</p>
            </div>
            
            <div class="section">
                <h3>📝 Customer's Latest Question</h3>
                <p><em>${customerQuestion}</em></p>
            </div>
            
            <div class="section">
                <h3>💬 Full Conversation</h3>
                <div class="conversation">${fullConversation}</div>
            </div>
            
            <div class="section">
                <h3>✅ Recommended Actions</h3>
                <ul>
                    <li>Review conversation for context</li>
                    <li>Contact customer within 2-4 hours</li>
                    <li>Offer personalized consultation</li>
                    <li>Consider in-home measurement if applicable</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>KANIOU AI Chatbot Notification System</p>
            <p>This alert was automatically generated based on conversation analysis</p>
        </div>
    </div>
</body>
</html>
    `;

    // Send email using the existing email service
    const emailSent = await sendConversationSummaryEmail({
      email: 'admin@kaniou.be', // Website owner email
      summary: emailContent,
      language: 'en'
    });

    if (emailSent) {
      console.log(`📧 Smart notification sent for conversation ${conversationId}: ${triggerReason}`);
    }

    return emailSent;

  } catch (error) {
    console.error('Error sending smart notification:', error);
    return false;
  }
}

/**
 * Format conversation history for email
 */
export function formatConversationForEmail(
  messages: Array<{role: string, content: string, createdAt?: string}>
): string {
  return messages.map(msg => {
    const timestamp = msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : '';
    const role = msg.role === 'user' ? 'Customer' : 'AI Assistant';
    return `[${timestamp}] ${role}: ${msg.content}`;
  }).join('\n\n');
}