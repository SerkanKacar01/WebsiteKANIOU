/**
 * Human Follow-Up Messages for 24/7 Chatbot
 * Multilingual responses when human assistance is needed
 */

export interface HumanFollowUpMessage {
  content: string;
  language: string;
}

/**
 * Get human follow-up message in the specified language
 */
export function getHumanFollowUpMessage(language: string): HumanFollowUpMessage {
  const messages = {
    en: "Thank you for your question. A KANIOU specialist will get back to you within 24 hours.\nFeel free to continue chatting in the meantime — I'm here to help!",
    
    nl: "Bedankt voor uw vraag. Een medewerker van KANIOU neemt binnen 24 uur contact met u op.\nU mag gerust nog meer vragen stellen — ik help u graag ondertussen verder!",
    
    fr: "Merci pour votre question. Un spécialiste KANIOU vous répondra dans un délai de 24 heures.\nN'hésitez pas à continuer la discussion — je suis là pour vous aider !",
    
    tr: "Sorunuz için teşekkür ederiz. Bir KANIOU uzmanı 24 saat içinde sizinle iletişime geçecektir.\nBu sırada sohbete devam edebilirsiniz — size yardımcı olmak için buradayım!"
  };

  const content = messages[language as keyof typeof messages] || messages.nl;
  
  return {
    content,
    language
  };
}

/**
 * Check if the user's question is asking for business hours specifically
 */
export function isAskingForBusinessHours(message: string, language: string): boolean {
  const businessHoursKeywords = {
    nl: [
      'openingstijden', 'wanneer open', 'hoe laat open', 'werkdagen',
      'openingsuren', 'tijden', 'geopend', 'bereikbaar'
    ],
    fr: [
      'heures d\'ouverture', 'horaires', 'quand ouvert', 'heures',
      'ouvert', 'disponible', 'joignable'
    ],
    en: [
      'opening hours', 'opening times', 'business hours', 'when open',
      'what time open', 'hours', 'available', 'reachable'
    ],
    tr: [
      'çalışma saatleri', 'açılış saatleri', 'ne zaman açık',
      'saatler', 'açık', 'ulaşılabilir'
    ]
  };

  const keywords = businessHoursKeywords[language as keyof typeof businessHoursKeywords] || businessHoursKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  return keywords.some(keyword => lowerMessage.includes(keyword));
}