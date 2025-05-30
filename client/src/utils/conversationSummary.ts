/**
 * Smart Conversation Summary System
 * Monitors conversations and generates intelligent summaries
 */

export interface ConversationMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  metadata?: any;
}

export interface ConversationSummary {
  keyTopics: string[];
  totalMessages: number;
  duration: string;
  language: string;
  summary: string;
}

export interface ConversationEndIndicators {
  isEnding: boolean;
  confidence: number;
  reason: 'thank_you' | 'goodbye' | 'completion' | 'inactivity';
}

/**
 * Detect if conversation is ending based on user message
 */
export function detectConversationEnd(message: string, language: string): ConversationEndIndicators {
  const endingPhrases = {
    nl: [
      'dank je', 'dank u', 'bedankt', 'thanks', 'thx',
      'dag', 'doei', 'tot ziens', 'vaarwel',
      'dat is alles', 'dat was alles', 'meer niet',
      'prima', 'oké', 'ok', 'goed zo', 'perfect',
      'dat helpt', 'dat is genoeg', 'klaar'
    ],
    fr: [
      'merci', 'merci beaucoup', 'je vous remercie',
      'au revoir', 'à bientôt', 'salut', 'bye',
      'c\'est tout', 'ça suffit', 'parfait',
      'très bien', 'excellent', 'ça aide'
    ],
    en: [
      'thank you', 'thanks', 'thx', 'ty',
      'goodbye', 'bye', 'see you', 'farewell',
      'that\'s all', 'that\'s it', 'no more',
      'perfect', 'great', 'excellent', 'ok',
      'that helps', 'good enough', 'done'
    ],
    tr: [
      'teşekkür ederim', 'teşekkürler', 'sağol',
      'hoşça kal', 'görüşürüz', 'bay bay',
      'bu kadar', 'yeter', 'tamam',
      'mükemmel', 'harika', 'yardımcı oldu'
    ]
  };

  const messageLower = message.toLowerCase().trim();
  const phrases = endingPhrases[language as keyof typeof endingPhrases] || endingPhrases.nl;
  
  // Check for exact matches or phrases contained in message
  const hasEndingPhrase = phrases.some(phrase => 
    messageLower === phrase || 
    messageLower.includes(phrase) ||
    messageLower.startsWith(phrase) ||
    messageLower.endsWith(phrase)
  );

  if (hasEndingPhrase) {
    const confidence = phrases.some(phrase => messageLower === phrase) ? 0.9 : 0.7;
    const reason = messageLower.includes('dank') || messageLower.includes('thank') || messageLower.includes('merci') 
      ? 'thank_you' as const
      : messageLower.includes('dag') || messageLower.includes('bye') || messageLower.includes('au revoir')
      ? 'goodbye' as const
      : 'completion' as const;
    
    return { isEnding: true, confidence, reason };
  }

  return { isEnding: false, confidence: 0, reason: 'completion' as const };
}

/**
 * Generate conversation summary from messages
 */
export function generateConversationSummary(
  messages: ConversationMessage[], 
  language: string,
  startTime: Date
): ConversationSummary {
  const userMessages = messages.filter(m => m.role === 'user');
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  
  // Calculate duration
  const endTime = new Date();
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationMinutes = Math.round(durationMs / 60000);
  const duration = durationMinutes > 0 ? `${durationMinutes} minutes` : 'Less than a minute';

  // Extract key topics from conversation
  const keyTopics = extractKeyTopics(messages, language);
  
  // Generate summary text
  const summary = buildSummaryText(keyTopics, language);

  return {
    keyTopics,
    totalMessages: messages.length,
    duration,
    language,
    summary
  };
}

/**
 * Extract key topics discussed in the conversation
 */
function extractKeyTopics(messages: ConversationMessage[], language: string): string[] {
  const topics: string[] = [];
  const userMessages = messages.filter(m => m.role === 'user');
  const assistantMessages = messages.filter(m => m.role === 'assistant');

  // Topic detection patterns
  const topicPatterns = {
    pricing: {
      nl: /\b(prijs|kost|euro|€|budget|tarief|offerte)\b/i,
      fr: /\b(prix|coût|euro|€|budget|tarif|devis)\b/i,
      en: /\b(price|cost|euro|€|budget|rate|quote)\b/i,
      tr: /\b(fiyat|maliyet|euro|€|bütçe|ücret|teklif)\b/i
    },
    products: {
      nl: /\b(gordijn|rolgordijn|vouwgordijn|jaloezie|shutter|zonwering|plissé)\b/i,
      fr: /\b(rideau|store|volet|jalousie|plissé)\b/i,
      en: /\b(curtain|blind|shutter|roller|pleated|roman)\b/i,
      tr: /\b(perde|stor|jaluz|plise)\b/i
    },
    installation: {
      nl: /\b(installatie|montage|plaatsen|ophangen)\b/i,
      fr: /\b(installation|montage|poser)\b/i,
      en: /\b(installation|mounting|install|fitting)\b/i,
      tr: /\b(kurulum|montaj|yerleştirme)\b/i
    },
    measurement: {
      nl: /\b(opmeten|meten|afmeting|maat)\b/i,
      fr: /\b(mesure|mesurer|dimension|taille)\b/i,
      en: /\b(measure|measuring|dimension|size)\b/i,
      tr: /\b(ölçüm|ölçmek|boyut|ölçü)\b/i
    },
    warranty: {
      nl: /\b(garantie|waarborg)\b/i,
      fr: /\b(garantie|assurance)\b/i,
      en: /\b(warranty|guarantee)\b/i,
      tr: /\b(garanti|güvence)\b/i
    },
    delivery: {
      nl: /\b(levering|leveren|bezorgen|verzending)\b/i,
      fr: /\b(livraison|livrer|expédition)\b/i,
      en: /\b(delivery|deliver|shipping)\b/i,
      tr: /\b(teslimat|kargo|gönderim)\b/i
    }
  };

  const allText = messages.map(m => m.content).join(' ');

  Object.entries(topicPatterns).forEach(([topic, patterns]) => {
    const pattern = patterns[language as keyof typeof patterns] || patterns.nl;
    if (pattern.test(allText)) {
      topics.push(topic);
    }
  });

  // Extract specific mentions from messages
  const specificTopics = extractSpecificTopics(userMessages, assistantMessages, language);
  topics.push(...specificTopics);

  // Remove duplicates
  const uniqueTopics: string[] = [];
  topics.forEach(topic => {
    if (uniqueTopics.indexOf(topic) === -1) {
      uniqueTopics.push(topic);
    }
  });
  return uniqueTopics;
}

/**
 * Extract specific topics mentioned in conversation
 */
function extractSpecificTopics(
  userMessages: ConversationMessage[], 
  assistantMessages: ConversationMessage[], 
  language: string
): string[] {
  const topics: string[] = [];

  userMessages.forEach(msg => {
    const content = msg.content.toLowerCase();
    
    // Detect specific product questions
    if (content.includes('price') || content.includes('prijs') || content.includes('prix')) {
      if (content.includes('roller') || content.includes('rol')) {
        topics.push('roller_blind_prices');
      } else if (content.includes('curtain') || content.includes('gordijn')) {
        topics.push('curtain_prices');
      }
    }

    // Detect service questions
    if (content.includes('install') || content.includes('montage') || content.includes('installation')) {
      topics.push('installation_service');
    }

    if (content.includes('measure') || content.includes('opmeten') || content.includes('mesure')) {
      topics.push('measurement_service');
    }
  });

  return topics;
}

/**
 * Build summary text based on extracted topics
 */
function buildSummaryText(topics: string[], language: string): string {
  const summaryTemplates = {
    nl: {
      header: "Samenvatting van uw gesprek:",
      pricing: "• U vroeg naar prijzen",
      products: "• We bespraken onze producten",
      installation: "• We bespraken installatieservice",
      measurement: "• We bespraken opmetingservice", 
      warranty: "• We bespraken garantievoorwaarden",
      delivery: "• We bespraken levering en bezorging",
      roller_blind_prices: "• U vroeg naar rolgordijn prijzen",
      curtain_prices: "• U vroeg naar gordijn prijzen",
      installation_service: "• We bevestigden installatieservice",
      measurement_service: "• We bevestigden gratis opmeting",
      general: "• We beantwoordden uw vragen over raambekleding"
    },
    fr: {
      header: "Résumé de votre conversation:",
      pricing: "• Vous avez demandé les prix",
      products: "• Nous avons discuté de nos produits",
      installation: "• Nous avons discuté du service d'installation",
      measurement: "• Nous avons discuté du service de mesure",
      warranty: "• Nous avons discuté des conditions de garantie",
      delivery: "• Nous avons discuté de la livraison",
      roller_blind_prices: "• Vous avez demandé les prix des stores enrouleurs",
      curtain_prices: "• Vous avez demandé les prix des rideaux",
      installation_service: "• Nous avons confirmé le service d'installation",
      measurement_service: "• Nous avons confirmé la mesure gratuite",
      general: "• Nous avons répondu à vos questions sur les traitements de fenêtres"
    },
    en: {
      header: "Summary of your conversation:",
      pricing: "• You asked about prices",
      products: "• We discussed our products",
      installation: "• We discussed installation service",
      measurement: "• We discussed measurement service",
      warranty: "• We discussed warranty conditions",
      delivery: "• We discussed delivery options",
      roller_blind_prices: "• You asked about roller blind prices",
      curtain_prices: "• You asked about curtain prices",
      installation_service: "• We confirmed installation service",
      measurement_service: "• We confirmed free measurement",
      general: "• We answered your questions about window treatments"
    },
    tr: {
      header: "Konuşmanızın özeti:",
      pricing: "• Fiyatları sordunuz",
      products: "• Ürünlerimizi konuştuk",
      installation: "• Kurulum hizmetini konuştuk",
      measurement: "• Ölçüm hizmetini konuştuk",
      warranty: "• Garanti koşullarını konuştuk", 
      delivery: "• Teslimat seçeneklerini konuştuk",
      roller_blind_prices: "• Stor fiyatlarını sordunuz",
      curtain_prices: "• Perde fiyatlarını sordunuz",
      installation_service: "• Kurulum hizmetini onayladık",
      measurement_service: "• Ücretsiz ölçümü onayladık",
      general: "• Pencere kaplamaları hakkındaki sorularınızı yanıtladık"
    }
  };

  const templates = summaryTemplates[language as keyof typeof summaryTemplates] || summaryTemplates.nl;
  
  let summary = templates.header + "\n";
  
  if (topics.length === 0) {
    summary += templates.general;
  } else {
    topics.forEach(topic => {
      const topicText = templates[topic as keyof typeof templates];
      if (topicText) {
        summary += topicText + "\n";
      }
    });
  }

  return summary.trim();
}

/**
 * Get email prompt text based on language
 */
export function getEmailPromptText(language: string): string {
  const prompts = {
    nl: "Wilt u deze samenvatting per e-mail ontvangen?",
    fr: "Souhaitez-vous recevoir ce résumé par e-mail?",
    en: "Would you like to receive this summary via email?",
    tr: "Bu özeti e-posta ile almak ister misiniz?"
  };

  return prompts[language as keyof typeof prompts] || prompts.nl;
}

/**
 * Check if enough time has passed since last message for inactivity detection
 */
export function checkInactivityTimeout(lastMessageTime: Date, timeoutMinutes: number = 3): boolean {
  const now = new Date();
  const timeDiff = now.getTime() - lastMessageTime.getTime();
  const minutesDiff = timeDiff / (1000 * 60);
  return minutesDiff >= timeoutMinutes;
}