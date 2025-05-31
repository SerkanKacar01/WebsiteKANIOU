/**
 * Inventory Alert Service for KANIOU
 * Handles smart inventory notifications and stock management integration
 */

import { inventoryStorage } from "./inventoryStorage";
import { sendInventoryAlertEmail } from "./inventoryEmailService";
import { 
  InventoryAlert, 
  InsertInventoryAlert, 
  ProductStock,
  InsertProductStock 
} from "@shared/schema";

/**
 * Detect if user message contains out-of-stock product inquiry
 */
export function detectOutOfStockInquiry(message: string, language: string = 'nl'): boolean {
  const outOfStockKeywords = {
    nl: [
      'niet beschikbaar', 'uitverkocht', 'op voorraad', 'leverbaar', 
      'wanneer weer', 'terug beschikbaar', 'niet meer', 'uitgeput'
    ],
    fr: [
      'pas disponible', 'en rupture', 'épuisé', 'en stock', 
      'quand disponible', 'plus disponible', 'stock vide'
    ],
    en: [
      'out of stock', 'not available', 'unavailable', 'sold out', 
      'when available', 'back in stock', 'no stock', 'restocked'
    ],
    tr: [
      'stokta yok', 'mevcut değil', 'satıldı', 'ne zaman', 
      'tekrar mevcut', 'stok yok', 'bitmiş'
    ]
  };

  const keywords = outOfStockKeywords[language as keyof typeof outOfStockKeywords] || outOfStockKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
}

/**
 * Generate inventory alert prompt based on language
 */
export function generateInventoryAlertPrompt(productName: string, language: string = 'nl'): string {
  const prompts = {
    nl: `Het spijt me, maar "${productName}" is momenteel niet beschikbaar. Wil je een melding ontvangen zodra dit product weer op voorraad is? Je kunt je e-mailadres achterlaten en ik zorg ervoor dat je als eerste wordt geïnformeerd!`,
    fr: `Désolé, mais "${productName}" n'est actuellement pas disponible. Souhaitez-vous recevoir une notification dès que ce produit est de nouveau en stock ? Vous pouvez laisser votre adresse e-mail et je m'assurerai que vous soyez informé en premier !`,
    en: `Sorry, but "${productName}" is currently not available. Would you like to receive a notification when this product is back in stock? You can leave your email address and I'll make sure you're the first to know!`,
    tr: `Üzgünüm, "${productName}" şu anda mevcut değil. Bu ürün tekrar stoka girdiğinde bildirim almak ister misiniz? E-posta adresinizi bırakabilirsiniz ve ilk siz haberdar olacaksınız!`
  };

  return prompts[language as keyof typeof prompts] || prompts.nl;
}

/**
 * Generate low stock urgency message
 */
export function generateLowStockMessage(productName: string, stockLevel: number, language: string = 'nl'): string {
  const messages = {
    nl: `⚠️ Laatste kans! Er zijn nog maar ${stockLevel} stuks van "${productName}" op voorraad. Wil je een prioriteitsmelding als er nieuwe voorraad binnenkomt?`,
    fr: `⚠️ Dernière chance ! Il ne reste que ${stockLevel} pièces de "${productName}" en stock. Voulez-vous une notification prioritaire quand de nouveaux stocks arrivent ?`,
    en: `⚠️ Last chance! Only ${stockLevel} pieces of "${productName}" left in stock. Want a priority notification when new stock arrives?`,
    tr: `⚠️ Son şans! "${productName}" ürününden sadece ${stockLevel} adet kaldı. Yeni stok geldiğinde öncelikli bildirim ister misiniz?`
  };

  return messages[language as keyof typeof messages] || messages.nl;
}

/**
 * Create inventory alert subscription
 */
export async function createInventoryAlertSubscription(
  email: string,
  productName: string,
  productVariant: string | undefined,
  language: string,
  conversationId?: number,
  userAgent?: string
): Promise<InventoryAlert> {
  try {
    // Check if subscription already exists
    const existingAlerts = await inventoryStorage.getInventoryAlertsByProduct(productName, productVariant);
    const alreadySubscribed = existingAlerts.find(alert => 
      alert.email === email && alert.isActive && !alert.notificationSent
    );

    if (alreadySubscribed) {
      return alreadySubscribed;
    }

    // Create new subscription
    const alertData: InsertInventoryAlert = {
      email,
      productName,
      productVariant,
      language: language as "nl" | "fr" | "en" | "tr",
      conversationId,
      userAgent,
      isActive: true,
      notificationSent: false
    };

    const newAlert = await inventoryStorage.createInventoryAlert(alertData);

    // Send admin notification
    await sendInventoryAlertEmail({
      type: 'admin_notification',
      email: 'info@kaniou.be',
      productName,
      productVariant,
      customerEmail: email,
      language
    });

    console.log(`📧 INVENTORY ALERT: New subscription created for ${productName} - ${email}`);
    
    return newAlert;
  } catch (error) {
    console.error('Error creating inventory alert subscription:', error);
    throw error;
  }
}

/**
 * Get confirmation message after subscription
 */
export function getInventoryAlertConfirmation(productName: string, language: string = 'nl'): string {
  const confirmations = {
    nl: `✅ Perfect! Je bent nu aangemeld voor voorraadmeldingen voor "${productName}". Je ontvangt een e-mail zodra dit product weer beschikbaar is. Bedankt voor je interesse!`,
    fr: `✅ Parfait ! Vous êtes maintenant inscrit aux notifications de stock pour "${productName}". Vous recevrez un e-mail dès que ce produit sera de nouveau disponible. Merci pour votre intérêt !`,
    en: `✅ Perfect! You're now subscribed to stock notifications for "${productName}". You'll receive an email as soon as this product becomes available again. Thanks for your interest!`,
    tr: `✅ Mükemmel! "${productName}" için stok bildirimlerine abone oldunuz. Bu ürün tekrar mevcut olur olmaz size e-posta göndereceğiz. İlginiz için teşekkürler!`
  };

  return confirmations[language as keyof typeof confirmations] || confirmations.nl;
}

/**
 * Check product stock status and generate appropriate response
 */
export async function checkProductAvailability(productName: string, productVariant?: string): Promise<{
  isAvailable: boolean;
  stockLevel: number;
  isLowStock: boolean;
  message?: string;
}> {
  try {
    const stock = await inventoryStorage.getProductStock(productName, productVariant);
    
    if (!stock) {
      // Product not in stock system - assume available but unknown stock
      return {
        isAvailable: true,
        stockLevel: 0,
        isLowStock: false
      };
    }

    const isLowStock = stock.stockLevel <= stock.lowStockThreshold && stock.stockLevel > 0;
    
    return {
      isAvailable: stock.isAvailable && stock.stockLevel > 0,
      stockLevel: stock.stockLevel,
      isLowStock,
      message: isLowStock ? generateLowStockMessage(productName, stock.stockLevel) : undefined
    };
  } catch (error) {
    console.error('Error checking product availability:', error);
    // Return safe default
    return {
      isAvailable: true,
      stockLevel: 0,
      isLowStock: false
    };
  }
}

/**
 * Notify all subscribers when product is back in stock
 */
export async function notifyProductBackInStock(productName: string, productVariant?: string): Promise<number> {
  try {
    const alerts = await inventoryStorage.getInventoryAlertsByProduct(productName, productVariant);
    const activeAlerts = alerts.filter(alert => alert.isActive && !alert.notificationSent);
    
    let notificationsSent = 0;

    for (const alert of activeAlerts) {
      try {
        // Send back-in-stock email
        const emailSent = await sendInventoryAlertEmail({
          type: 'back_in_stock',
          email: alert.email,
          productName: alert.productName,
          productVariant: alert.productVariant,
          language: alert.language
        });

        if (emailSent) {
          // Mark notification as sent
          await storage.updateInventoryAlert(alert.id, {
            notificationSent: true,
            notifiedAt: new Date()
          });
          notificationsSent++;
        }
      } catch (error) {
        console.error(`Error sending notification to ${alert.email}:`, error);
      }
    }

    console.log(`📧 INVENTORY ALERT: Sent ${notificationsSent} back-in-stock notifications for ${productName}`);
    return notificationsSent;
  } catch (error) {
    console.error('Error notifying subscribers:', error);
    return 0;
  }
}

/**
 * Extract product name from user message
 */
export function extractProductName(message: string): string | null {
  // Common KANIOU product names
  const productNames = [
    'rolgordijnen', 'plissé', 'jaloeziën', 'overgordijnen', 'vouwgordijnen',
    'duo plissé', 'houten jaloeziën', 'aluminium jaloeziën', 'textiel lamellen',
    'hordeuren', 'opzethorren', 'gordijnroedes', 'gordijnrails',
    'dakraam zonweringen', 'shutters', 'inbetween gordijnen'
  ];

  const lowerMessage = message.toLowerCase();
  
  for (const product of productNames) {
    if (lowerMessage.includes(product.toLowerCase())) {
      return product;
    }
  }

  return null;
}