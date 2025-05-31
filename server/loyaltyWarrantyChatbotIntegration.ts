/**
 * Loyalty Program & Warranty Chatbot Integration for KANIOU
 * Handles chatbot interactions for loyalty points and warranty queries
 */

import { storage } from './storage';
import { 
  isLoyaltyQuery, 
  generateLoyaltyResponse, 
  awardQuotePoints, 
  awardNewsletterPoints,
  getLoyaltyMessage,
  LOYALTY_POINTS
} from './loyaltyService';
import { 
  isWarrantyQuery, 
  generateWarrantyResponse,
  createWarrantyForCustomer,
  getWarrantyReminderMessage
} from './warrantyService';

/**
 * Process loyalty and warranty queries in chatbot
 */
export async function processLoyaltyWarrantyQuery(
  message: string,
  email: string,
  language: string = 'nl'
): Promise<string | null> {
  const lowerMessage = message.toLowerCase();
  
  // Check for loyalty points queries
  if (isLoyaltyQuery(message, language)) {
    return await generateLoyaltyResponse(email, message, language);
  }
  
  // Check for warranty queries
  if (isWarrantyQuery(message, language)) {
    return await generateWarrantyResponse(email, message, language);
  }
  
  return null;
}

/**
 * Award points after quote submission and create warranty
 */
export async function processQuoteSubmissionRewards(
  name: string,
  email: string,
  quoteId: string,
  productType: string,
  language: string = 'nl'
): Promise<void> {
  try {
    // Award loyalty points for quote submission
    const customer = await awardQuotePoints(name, email, quoteId, language);
    
    // Create warranty record (assuming 2-year warranty)
    const purchaseDate = new Date();
    await createWarrantyForCustomer(
      customer.id,
      productType,
      productType,
      purchaseDate,
      24, // 2 years
      quoteId,
      language
    );
    
    console.log(`Loyalty points and warranty created for customer: ${email}`);
  } catch (error) {
    console.error('Error processing quote submission rewards:', error);
  }
}

/**
 * Award points for newsletter subscription
 */
export async function processNewsletterRewards(
  name: string,
  email: string,
  language: string = 'nl'
): Promise<void> {
  try {
    await awardNewsletterPoints(name, email, language);
    console.log(`Newsletter loyalty points awarded to: ${email}`);
  } catch (error) {
    console.error('Error awarding newsletter points:', error);
  }
}

/**
 * Generate chatbot notifications for loyalty milestones
 */
export function generateLoyaltyNotification(
  totalPoints: number,
  language: string = 'nl'
): string | null {
  // Check for milestone rewards
  if (totalPoints >= 200 && totalPoints < 250) {
    return getLoyaltyMessage('REWARD_AVAILABLE', totalPoints, language);
  }
  
  if (totalPoints >= 500 && totalPoints < 550) {
    return getLoyaltyMessage('REWARD_AVAILABLE', totalPoints, language);
  }
  
  if (totalPoints >= 800 && totalPoints < 850) {
    return getLoyaltyMessage('REWARD_AVAILABLE', totalPoints, language);
  }
  
  return null;
}

/**
 * Detect specific loyalty/warranty intents in user messages
 */
export function detectLoyaltyWarrantyIntent(
  message: string,
  language: string = 'nl'
): 'loyalty_balance' | 'loyalty_redeem' | 'warranty_check' | 'warranty_extend' | null {
  const intents = {
    nl: {
      loyalty_balance: ['saldo', 'punten check', 'hoeveel punten'],
      loyalty_redeem: ['inwisselen', 'beloning', 'rewards gebruiken'],
      warranty_check: ['garantie check', 'geldig tot', 'warranty status'],
      warranty_extend: ['garantie verlengen', 'warranty extend', 'langer geldig']
    },
    fr: {
      loyalty_balance: ['solde', 'vérifier points', 'combien de points'],
      loyalty_redeem: ['échanger', 'récompense', 'utiliser rewards'],
      warranty_check: ['vérifier garantie', 'valide jusqu', 'statut warranty'],
      warranty_extend: ['prolonger garantie', 'étendre warranty', 'plus longtemps']
    },
    en: {
      loyalty_balance: ['balance', 'check points', 'how many points'],
      loyalty_redeem: ['redeem', 'reward', 'use rewards'],
      warranty_check: ['warranty check', 'valid until', 'warranty status'],
      warranty_extend: ['extend warranty', 'warranty extend', 'longer valid']
    },
    tr: {
      loyalty_balance: ['bakiye', 'puan kontrol', 'kaç puan'],
      loyalty_redeem: ['kullan', 'ödül', 'rewards kullan'],
      warranty_check: ['garanti kontrol', 'geçerli süre', 'warranty durum'],
      warranty_extend: ['garanti uzat', 'warranty extend', 'daha uzun']
    }
  };
  
  const langIntents = intents[language as keyof typeof intents] || intents.nl;
  const lowerMessage = message.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(langIntents)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return intent as any;
    }
  }
  
  return null;
}

/**
 * Generate smart suggestion buttons for loyalty and warranty
 */
export function getLoyaltyWarrantySuggestions(language: string = 'nl'): string[] {
  const suggestions = {
    nl: [
      'Controleer mijn loyaliteitspunten',
      'Bekijk mijn garanties',
      'Inwisselbare beloningen',
      'Garantie verlengen'
    ],
    fr: [
      'Vérifier mes points de fidélité',
      'Voir mes garanties',
      'Récompenses disponibles',
      'Prolonger la garantie'
    ],
    en: [
      'Check my loyalty points',
      'View my warranties',
      'Available rewards',
      'Extend warranty'
    ],
    tr: [
      'Sadakat puanlarımı kontrol et',
      'Garantilerimi görüntüle',
      'Mevcut ödüller',
      'Garantiyi uzat'
    ]
  };
  
  return suggestions[language as keyof typeof suggestions] || suggestions.nl;
}

/**
 * Process automatic warranty reminders
 */
export async function processWarrantyReminders(): Promise<void> {
  try {
    const pendingReminders = await storage.getPendingWarrantyReminders();
    
    for (const reminder of pendingReminders) {
      const warranties = await storage.getCustomerWarranties(reminder.warrantyId);
      const warranty = warranties[0];
      
      if (warranty) {
        const reminderMessage = getWarrantyReminderMessage(
          warranty, 
          reminder.reminderType as any, 
          reminder.language || 'nl'
        );
        
        // Mark reminder as sent
        await storage.markWarrantyReminderSent(reminder.id);
        
        console.log(`Warranty reminder sent: ${reminderMessage}`);
      }
    }
  } catch (error) {
    console.error('Error processing warranty reminders:', error);
  }
}

/**
 * Initialize default loyalty rewards in multiple languages
 */
export async function initializeLoyaltyRewards(): Promise<void> {
  const languages = ['nl', 'fr', 'en', 'tr'];
  
  const rewardTemplates = [
    {
      pointsRequired: 200,
      rewardValue: 10,
      rewardType: 'discount',
      names: {
        nl: '€10 Korting',
        fr: '€10 de Réduction',
        en: '€10 Discount',
        tr: '€10 İndirim'
      },
      descriptions: {
        nl: 'Ontvang €10 korting op je volgende aankoop',
        fr: 'Recevez €10 de réduction sur votre prochain achat',
        en: 'Get €10 discount on your next purchase',
        tr: 'Bir sonraki alışverişinizde €10 indirim kazanın'
      }
    },
    {
      pointsRequired: 500,
      rewardValue: 0,
      rewardType: 'service',
      names: {
        nl: 'Gratis Meetservice',
        fr: 'Service de Mesure Gratuit',
        en: 'Free Measurement Service',
        tr: 'Ücretsiz Ölçüm Hizmeti'
      },
      descriptions: {
        nl: 'Gratis professionele meetservice aan huis',
        fr: 'Service de mesure professionnel gratuit à domicile',
        en: 'Free professional home measurement service',
        tr: 'Ücretsiz profesyonel ev ölçüm hizmeti'
      }
    },
    {
      pointsRequired: 800,
      rewardValue: 0,
      rewardType: 'priority',
      names: {
        nl: 'Prioriteit Levering',
        fr: 'Livraison Prioritaire',
        en: 'Priority Delivery',
        tr: 'Öncelikli Teslimat'
      },
      descriptions: {
        nl: 'Voorrang bij levering en installatie',
        fr: 'Priorité pour la livraison et l\'installation',
        en: 'Priority for delivery and installation',
        tr: 'Teslimat ve kurulum için öncelik'
      }
    }
  ];
  
  try {
    for (const template of rewardTemplates) {
      for (const language of languages) {
        const existingRewards = await storage.getLoyaltyRewards(language);
        const exists = existingRewards.some(reward => 
          reward.pointsRequired === template.pointsRequired && 
          reward.language === language
        );
        
        if (!exists) {
          await storage.createLoyaltyReward({
            name: template.names[language as keyof typeof template.names],
            description: template.descriptions[language as keyof typeof template.descriptions],
            pointsRequired: template.pointsRequired,
            rewardValue: template.rewardValue,
            rewardType: template.rewardType as any,
            language,
            isActive: true
          });
        }
      }
    }
    
    console.log('Loyalty rewards initialized successfully');
  } catch (error) {
    console.error('Error initializing loyalty rewards:', error);
  }
}