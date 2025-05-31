/**
 * Loyalty Program Service for KANIOU
 * Handles all loyalty point transactions, rewards, and chatbot integration
 */

import { storage } from './storage';
import { 
  LoyaltyCustomer, 
  InsertLoyaltyCustomer, 
  InsertLoyaltyTransaction,
  InsertLoyaltyReward,
  InsertLoyaltyRedemption,
  LoyaltyReward
} from '@shared/schema';

/**
 * Point values for different actions
 */
export const LOYALTY_POINTS = {
  PURCHASE: 100,
  REVIEW: 50,
  REFERRAL: 200,
  QUOTE: 75,
  NEWSLETTER: 25
} as const;

/**
 * Get or create loyalty customer by email
 */
export async function getOrCreateLoyaltyCustomer(
  name: string, 
  email: string, 
  language: string = 'nl'
): Promise<LoyaltyCustomer> {
  let customer = await storage.getLoyaltyCustomerByEmail(email);
  
  if (!customer) {
    customer = await storage.createLoyaltyCustomer({
      name,
      email,
      language,
      totalPoints: 0,
      isActive: true
    });
  }
  
  return customer;
}

/**
 * Award loyalty points to a customer
 */
export async function awardLoyaltyPoints(
  customerId: number,
  type: keyof typeof LOYALTY_POINTS,
  description: string,
  relatedId?: string,
  language: string = 'nl'
): Promise<void> {
  const points = LOYALTY_POINTS[type];
  
  await storage.addLoyaltyPoints(customerId, {
    type: type.toLowerCase() as any,
    points,
    description,
    relatedId,
    language
  });
}

/**
 * Award points for quote submission
 */
export async function awardQuotePoints(
  name: string,
  email: string,
  quoteId: string,
  language: string = 'nl'
): Promise<LoyaltyCustomer> {
  const customer = await getOrCreateLoyaltyCustomer(name, email, language);
  
  await awardLoyaltyPoints(
    customer.id,
    'QUOTE',
    getPointsDescription('QUOTE', language),
    quoteId,
    language
  );
  
  return customer;
}

/**
 * Award points for newsletter subscription
 */
export async function awardNewsletterPoints(
  name: string,
  email: string,
  language: string = 'nl'
): Promise<LoyaltyCustomer> {
  const customer = await getOrCreateLoyaltyCustomer(name, email, language);
  
  await awardLoyaltyPoints(
    customer.id,
    'NEWSLETTER',
    getPointsDescription('NEWSLETTER', language),
    undefined,
    language
  );
  
  return customer;
}

/**
 * Get available rewards for customer
 */
export async function getAvailableRewards(
  customerId: number,
  language: string = 'nl'
): Promise<LoyaltyReward[]> {
  const customer = await storage.getLoyaltyCustomerByEmail(''); // Get by ID would be better
  const allRewards = await storage.getLoyaltyRewards(language);
  
  return allRewards.filter(reward => 
    customer && customer.totalPoints >= reward.pointsRequired
  );
}

/**
 * Redeem a loyalty reward
 */
export async function redeemReward(
  customerId: number,
  rewardId: number
): Promise<boolean> {
  try {
    const rewards = await storage.getLoyaltyRewards();
    const reward = rewards.find(r => r.id === rewardId);
    
    if (!reward) return false;
    
    await storage.redeemLoyaltyReward({
      customerId,
      rewardId,
      pointsUsed: reward.pointsRequired,
      status: 'pending'
    });
    
    return true;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    return false;
  }
}

/**
 * Get loyalty points messages in different languages
 */
export function getLoyaltyMessage(
  type: 'EARNED' | 'BALANCE' | 'REWARD_AVAILABLE' | 'REDEEMED',
  points: number,
  language: string = 'nl'
): string {
  const messages = {
    nl: {
      EARNED: `🎉 Gefeliciteerd! Je hebt ${points} loyaliteitspunten verdiend!`,
      BALANCE: `Je huidige saldo: ${points} loyaliteitspunten`,
      REWARD_AVAILABLE: `🎁 Je kunt nu een beloning inwisselen met je ${points} punten!`,
      REDEEMED: `✅ Beloning succesvol ingewisseld voor ${points} punten!`
    },
    fr: {
      EARNED: `🎉 Félicitations! Vous avez gagné ${points} points de fidélité!`,
      BALANCE: `Votre solde actuel: ${points} points de fidélité`,
      REWARD_AVAILABLE: `🎁 Vous pouvez maintenant échanger une récompense avec vos ${points} points!`,
      REDEEMED: `✅ Récompense échangée avec succès pour ${points} points!`
    },
    en: {
      EARNED: `🎉 Congratulations! You've earned ${points} loyalty points!`,
      BALANCE: `Your current balance: ${points} loyalty points`,
      REWARD_AVAILABLE: `🎁 You can now redeem a reward with your ${points} points!`,
      REDEEMED: `✅ Reward successfully redeemed for ${points} points!`
    },
    tr: {
      EARNED: `🎉 Tebrikler! ${points} sadakat puanı kazandınız!`,
      BALANCE: `Mevcut bakiyeniz: ${points} sadakat puanı`,
      REWARD_AVAILABLE: `🎁 Artık ${points} puanınızla bir ödül alabilirsiniz!`,
      REDEEMED: `✅ ${points} puan karşılığında ödül başarıyla alındı!`
    }
  };
  
  return messages[language as keyof typeof messages]?.[type] || messages.nl[type];
}

/**
 * Get points description for different actions
 */
function getPointsDescription(action: keyof typeof LOYALTY_POINTS, language: string): string {
  const descriptions = {
    nl: {
      PURCHASE: 'Aankoop voltooid',
      REVIEW: 'Review geplaatst',
      REFERRAL: 'Vriend doorverwezen',
      QUOTE: 'Offerte aangevraagd',
      NEWSLETTER: 'Nieuwsbrief geabonneerd'
    },
    fr: {
      PURCHASE: 'Achat complété',
      REVIEW: 'Avis publié',
      REFERRAL: 'Ami référé',
      QUOTE: 'Devis demandé',
      NEWSLETTER: 'Abonnement newsletter'
    },
    en: {
      PURCHASE: 'Purchase completed',
      REVIEW: 'Review submitted',
      REFERRAL: 'Friend referred',
      QUOTE: 'Quote requested',
      NEWSLETTER: 'Newsletter subscribed'
    },
    tr: {
      PURCHASE: 'Satın alma tamamlandı',
      REVIEW: 'Değerlendirme gönderildi',
      REFERRAL: 'Arkadaş yönlendirildi',
      QUOTE: 'Teklif istendi',
      NEWSLETTER: 'Bültene abone olundu'
    }
  };
  
  return descriptions[language as keyof typeof descriptions]?.[action] || descriptions.nl[action];
}

/**
 * Check if customer message is asking about loyalty points
 */
export function isLoyaltyQuery(message: string, language: string = 'nl'): boolean {
  const keywords = {
    nl: ['punt', 'punten', 'loyaliteit', 'beloning', 'saldo', 'inwisselen'],
    fr: ['point', 'points', 'fidélité', 'récompense', 'solde', 'échanger'],
    en: ['point', 'points', 'loyalty', 'reward', 'balance', 'redeem'],
    tr: ['puan', 'puanlar', 'sadakat', 'ödül', 'bakiye', 'değiştir']
  };
  
  const langKeywords = keywords[language as keyof typeof keywords] || keywords.nl;
  return langKeywords.some(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * Generate loyalty response for chatbot
 */
export async function generateLoyaltyResponse(
  email: string,
  message: string,
  language: string = 'nl'
): Promise<string> {
  try {
    const customer = await storage.getLoyaltyCustomerByEmail(email);
    
    if (!customer) {
      return getLoyaltySignupMessage(language);
    }
    
    const availableRewards = await storage.getLoyaltyRewards(language);
    const eligibleRewards = availableRewards.filter(reward => 
      customer.totalPoints >= reward.pointsRequired
    );
    
    let response = getLoyaltyMessage('BALANCE', customer.totalPoints, language);
    
    if (eligibleRewards.length > 0) {
      response += '\n\n' + getRewardsMessage(eligibleRewards, language);
    }
    
    return response;
  } catch (error) {
    console.error('Error generating loyalty response:', error);
    return getErrorMessage(language);
  }
}

/**
 * Get signup message for new customers
 */
function getLoyaltySignupMessage(language: string): string {
  const messages = {
    nl: 'Word lid van ons loyaliteitsprogramma! Verdien punten bij elke offerte en ontvang geweldige beloningen. 🎁',
    fr: 'Rejoignez notre programme de fidélité! Gagnez des points à chaque devis et recevez de superbes récompenses. 🎁',
    en: 'Join our loyalty program! Earn points with every quote and receive amazing rewards. 🎁',
    tr: 'Sadakat programımıza katılın! Her teklifle puan kazanın ve harika ödüller alın. 🎁'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

/**
 * Get rewards message
 */
function getRewardsMessage(rewards: LoyaltyReward[], language: string): string {
  const header = {
    nl: '🎁 Beschikbare beloningen:',
    fr: '🎁 Récompenses disponibles:',
    en: '🎁 Available rewards:',
    tr: '🎁 Mevcut ödüller:'
  };
  
  const rewardsList = rewards.map(reward => 
    `• ${reward.name} (${reward.pointsRequired} punten)`
  ).join('\n');
  
  return (header[language as keyof typeof header] || header.nl) + '\n' + rewardsList;
}

/**
 * Get error message
 */
function getErrorMessage(language: string): string {
  const messages = {
    nl: 'Er is een fout opgetreden bij het ophalen van je loyaliteitsinformatie. Probeer het later opnieuw.',
    fr: 'Une erreur s\'est produite lors de la récupération de vos informations de fidélité. Veuillez réessayer plus tard.',
    en: 'An error occurred while retrieving your loyalty information. Please try again later.',
    tr: 'Sadakat bilgileriniz alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}