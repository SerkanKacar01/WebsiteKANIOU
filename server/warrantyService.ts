/**
 * Warranty Reminder Service for KANIOU
 * Handles warranty tracking, reminders, and chatbot integration
 */

import { storage } from './storage';
import { 
  CustomerWarranty, 
  InsertCustomerWarranty,
  WarrantyReminder,
  LoyaltyCustomer
} from '@shared/schema';

/**
 * Create warranty for customer after quote/purchase
 */
export async function createWarrantyForCustomer(
  customerId: number,
  productName: string,
  productType: string,
  purchaseDate: Date,
  warrantyPeriodMonths: number = 24,
  relatedQuoteId?: string,
  language: string = 'nl'
): Promise<CustomerWarranty> {
  return await storage.createCustomerWarranty({
    customerId,
    productName,
    productType,
    purchaseDate,
    warrantyPeriodMonths,
    relatedQuoteId,
    language
  });
}

/**
 * Get customer warranties
 */
export async function getCustomerWarranties(customerId: number): Promise<CustomerWarranty[]> {
  return await storage.getCustomerWarranties(customerId);
}

/**
 * Check for warranties expiring soon
 */
export async function checkExpiringWarranties(days: number = 30): Promise<CustomerWarranty[]> {
  return await storage.getExpiringWarranties(days);
}

/**
 * Process pending warranty reminders
 */
export async function processPendingReminders(): Promise<void> {
  const pendingReminders = await storage.getPendingWarrantyReminders();
  
  for (const reminder of pendingReminders) {
    try {
      // Mark as sent
      await storage.markWarrantyReminderSent(reminder.id);
      console.log(`Warranty reminder sent for reminder ID: ${reminder.id}`);
    } catch (error) {
      console.error(`Failed to process warranty reminder ${reminder.id}:`, error);
    }
  }
}

/**
 * Check if user message is asking about warranty
 */
export function isWarrantyQuery(message: string, language: string = 'nl'): boolean {
  const keywords = {
    nl: ['garantie', 'waarborg', 'warranty', 'verlengen', 'vervallen', 'geldig'],
    fr: ['garantie', 'warranty', 'prolonger', 'expirer', 'valide'],
    en: ['warranty', 'guarantee', 'extend', 'expire', 'valid', 'coverage'],
    tr: ['garanti', 'warranty', 'uzatmak', 'süresi', 'geçerli', 'kapsam']
  };
  
  const langKeywords = keywords[language as keyof typeof keywords] || keywords.nl;
  return langKeywords.some(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * Generate warranty response for chatbot
 */
export async function generateWarrantyResponse(
  email: string,
  message: string,
  language: string = 'nl'
): Promise<string> {
  try {
    // Get customer by email
    const customer = await storage.getLoyaltyCustomerByEmail(email);
    
    if (!customer) {
      return getNoWarrantyMessage(language);
    }
    
    const warranties = await storage.getCustomerWarranties(customer.id);
    
    if (warranties.length === 0) {
      return getNoWarrantyMessage(language);
    }
    
    return formatWarrantiesResponse(warranties, language);
  } catch (error) {
    console.error('Error generating warranty response:', error);
    return getErrorMessage(language);
  }
}

/**
 * Format warranties for display
 */
function formatWarrantiesResponse(warranties: CustomerWarranty[], language: string): string {
  const header = getWarrantyHeader(language);
  
  const warrantyList = warranties.map(warranty => {
    const expiryDate = new Date(warranty.warrantyExpiryDate);
    const isExpired = expiryDate < new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    const status = isExpired 
      ? getExpiredText(language)
      : daysUntilExpiry <= 30 
        ? getExpiringSoonText(daysUntilExpiry, language)
        : getValidText(expiryDate, language);
    
    return `• ${warranty.productName} - ${status}`;
  }).join('\n');
  
  return `${header}\n\n${warrantyList}\n\n${getWarrantyFooter(language)}`;
}

/**
 * Get warranty messages in different languages
 */
function getWarrantyHeader(language: string): string {
  const messages = {
    nl: '🛡️ Jouw garantie-overzicht:',
    fr: '🛡️ Aperçu de votre garantie:',
    en: '🛡️ Your warranty overview:',
    tr: '🛡️ Garanti genel bakışınız:'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

function getExpiredText(language: string): string {
  const messages = {
    nl: '❌ Verlopen',
    fr: '❌ Expiré',
    en: '❌ Expired',
    tr: '❌ Süresi dolmuş'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

function getExpiringSoonText(days: number, language: string): string {
  const messages = {
    nl: `⚠️ Verloopt over ${days} dagen`,
    fr: `⚠️ Expire dans ${days} jours`,
    en: `⚠️ Expires in ${days} days`,
    tr: `⚠️ ${days} gün içinde sona eriyor`
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

function getValidText(expiryDate: Date, language: string): string {
  const dateStr = expiryDate.toLocaleDateString();
  const messages = {
    nl: `✅ Geldig tot ${dateStr}`,
    fr: `✅ Valide jusqu'au ${dateStr}`,
    en: `✅ Valid until ${dateStr}`,
    tr: `✅ ${dateStr} tarihine kadar geçerli`
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

function getWarrantyFooter(language: string): string {
  const messages = {
    nl: '💡 Wil je je garantie verlengen? Neem contact met ons op!',
    fr: '💡 Voulez-vous prolonger votre garantie? Contactez-nous!',
    en: '💡 Want to extend your warranty? Contact us!',
    tr: '💡 Garantinizi uzatmak ister misiniz? Bizimle iletişime geçin!'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

function getNoWarrantyMessage(language: string): string {
  const messages = {
    nl: 'Je hebt momenteel geen actieve garanties. Vraag een offerte aan om automatisch garantie te krijgen op je aankoop!',
    fr: 'Vous n\'avez actuellement aucune garantie active. Demandez un devis pour obtenir automatiquement une garantie sur votre achat!',
    en: 'You currently have no active warranties. Request a quote to automatically get warranty on your purchase!',
    tr: 'Şu anda aktif garantiniz bulunmuyor. Satın alımınızda otomatik garanti almak için teklif isteyin!'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

function getErrorMessage(language: string): string {
  const messages = {
    nl: 'Er is een fout opgetreden bij het ophalen van je garantie-informatie. Probeer het later opnieuw.',
    fr: 'Une erreur s\'est produite lors de la récupération de vos informations de garantie. Veuillez réessayer plus tard.',
    en: 'An error occurred while retrieving your warranty information. Please try again later.',
    tr: 'Garanti bilgileriniz alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
  };
  
  return messages[language as keyof typeof messages] || messages.nl;
}

/**
 * Get warranty reminder messages for different scenarios
 */
export function getWarrantyReminderMessage(
  warranty: CustomerWarranty,
  reminderType: '30_days' | '7_days' | 'expired',
  language: string = 'nl'
): string {
  const productName = warranty.productName;
  
  const messages = {
    nl: {
      '30_days': `🛡️ Je garantie voor ${productName} verloopt over 30 dagen. Wil je deze verlengen?`,
      '7_days': `⚠️ Laatste kans! Je garantie voor ${productName} verloopt over 7 dagen.`,
      'expired': `❌ Je garantie voor ${productName} is verlopen. Upgrade nu met een klik!`
    },
    fr: {
      '30_days': `🛡️ Votre garantie pour ${productName} expire dans 30 jours. Voulez-vous la prolonger?`,
      '7_days': `⚠️ Dernière chance! Votre garantie pour ${productName} expire dans 7 jours.`,
      'expired': `❌ Votre garantie pour ${productName} a expiré. Mettez à niveau maintenant d'un clic!`
    },
    en: {
      '30_days': `🛡️ Your warranty for ${productName} expires in 30 days. Would you like to extend it?`,
      '7_days': `⚠️ Last chance! Your warranty for ${productName} expires in 7 days.`,
      'expired': `❌ Your warranty for ${productName} has expired. Upgrade now with a click!`
    },
    tr: {
      '30_days': `🛡️ ${productName} için garantiniz 30 gün içinde sona eriyor. Uzatmak ister misiniz?`,
      '7_days': `⚠️ Son şans! ${productName} için garantiniz 7 gün içinde sona eriyor.`,
      'expired': `❌ ${productName} için garantiniz sona erdi. Şimdi tek tıkla yükseltin!`
    }
  };
  
  return messages[language as keyof typeof messages]?.[reminderType] || messages.nl[reminderType];
}