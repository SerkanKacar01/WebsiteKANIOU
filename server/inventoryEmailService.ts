/**
 * Inventory Email Service for KANIOU
 * Handles all inventory alert email notifications
 */

import { sendEmail } from "./emailService";

interface InventoryEmailData {
  type: 'back_in_stock' | 'admin_notification';
  email: string;
  productName: string;
  productVariant?: string | null;
  customerEmail?: string;
  language: string;
}

/**
 * Send inventory alert email notification
 */
export async function sendInventoryAlertEmail(data: InventoryEmailData): Promise<boolean> {
  try {
    if (data.type === 'back_in_stock') {
      return await sendBackInStockNotification(data);
    } else if (data.type === 'admin_notification') {
      return await sendAdminInventoryNotification(data);
    }
    return false;
  } catch (error) {
    console.error('Error sending inventory alert email:', error);
    return false;
  }
}

/**
 * Send back-in-stock notification to customer
 */
async function sendBackInStockNotification(data: InventoryEmailData): Promise<boolean> {
  const productDisplay = data.productVariant 
    ? `${data.productName} (${data.productVariant})`
    : data.productName;

  const subjects = {
    nl: `🎉 Goed nieuws! ${productDisplay} is weer beschikbaar bij KANIOU`,
    fr: `🎉 Bonne nouvelle ! ${productDisplay} est de nouveau disponible chez KANIOU`,
    en: `🎉 Great news! ${productDisplay} is back in stock at KANIOU`,
    tr: `🎉 Müjde! ${productDisplay} KANIOU'da tekrar stokta`
  };

  const htmlContent = {
    nl: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Goed nieuws!</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Je gewenste product is weer beschikbaar!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin: 0 0 10px 0;">${productDisplay}</h3>
            <p style="color: #666; margin: 0;">Dit product is nu weer op voorraad en beschikbaar voor bestelling.</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Geweldig nieuws! Het product waar je naar op zoek was, is nu weer beschikbaar. 
            Als een van onze gewaardeerde klanten wilde we je als eerste laten weten.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://kaniou.be" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Bekijk Product
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Heeft u vragen of wilt u meer informatie? Aarzel niet om contact met ons op te nemen.
          </p>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">KANIOU - Uw specialist in raamdecoratie</p>
          <p style="margin: 5px 0 0 0;">info@kaniou.be | www.kaniou.be</p>
        </div>
      </div>
    `,
    fr: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Bonne nouvelle !</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Votre produit souhaité est de nouveau disponible !</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin: 0 0 10px 0;">${productDisplay}</h3>
            <p style="color: #666; margin: 0;">Ce produit est maintenant de nouveau en stock et disponible à la commande.</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Excellente nouvelle ! Le produit que vous recherchiez est maintenant de nouveau disponible. 
            En tant que client privilégié, nous voulions vous en informer en premier.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://kaniou.be" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Voir le Produit
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Vous avez des questions ou souhaitez plus d'informations ? N'hésitez pas à nous contacter.
          </p>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">KANIOU - Votre spécialiste en décoration de fenêtres</p>
          <p style="margin: 5px 0 0 0;">info@kaniou.be | www.kaniou.be</p>
        </div>
      </div>
    `,
    en: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Great news!</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Your desired product is back in stock!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin: 0 0 10px 0;">${productDisplay}</h3>
            <p style="color: #666; margin: 0;">This product is now back in stock and available for ordering.</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Great news! The product you were looking for is now available again. 
            As one of our valued customers, we wanted to let you know first.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://kaniou.be" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              View Product
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Have questions or want more information? Feel free to contact us.
          </p>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">KANIOU - Your window decoration specialist</p>
          <p style="margin: 5px 0 0 0;">info@kaniou.be | www.kaniou.be</p>
        </div>
      </div>
    `,
    tr: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Müjde!</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">İstediğiniz ürün tekrar stokta!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin: 0 0 10px 0;">${productDisplay}</h3>
            <p style="color: #666; margin: 0;">Bu ürün şimdi tekrar stokta ve sipariş verebilirsiniz.</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Harika haber! Aradığınız ürün şimdi tekrar mevcut. 
            Değerli müşterilerimizden biri olarak size ilk haber vermek istedik.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://kaniou.be" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Ürünü Görüntüle
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Sorularınız mı var veya daha fazla bilgi mi istiyorsunuz? Bizimle iletişime geçmekten çekinmeyin.
          </p>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">KANIOU - Pencere dekorasyon uzmanınız</p>
          <p style="margin: 5px 0 0 0;">info@kaniou.be | www.kaniou.be</p>
        </div>
      </div>
    `
  };

  const subject = subjects[data.language as keyof typeof subjects] || subjects.nl;
  const html = htmlContent[data.language as keyof typeof htmlContent] || htmlContent.nl;

  return await sendEmail(data.email, subject, html);
}

/**
 * Send admin notification about new inventory alert subscription
 */
async function sendAdminInventoryNotification(data: InventoryEmailData): Promise<boolean> {
  const productDisplay = data.productVariant 
    ? `${data.productName} (${data.productVariant})`
    : data.productName;

  const subject = `📦 Nieuwe voorraadmelding aanvraag - ${productDisplay}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">📦 Nieuwe Voorraadmelding</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f8f9fa;">
        <h2 style="color: #333; margin-bottom: 20px;">Klant wil voorraadmelding ontvangen</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
          <h3 style="color: #667eea; margin: 0 0 15px 0;">Product Details</h3>
          <p style="margin: 5px 0;"><strong>Product:</strong> ${productDisplay}</p>
          <p style="margin: 5px 0;"><strong>Klant Email:</strong> ${data.customerEmail}</p>
          <p style="margin: 5px 0;"><strong>Taal:</strong> ${data.language.toUpperCase()}</p>
          <p style="margin: 5px 0;"><strong>Datum:</strong> ${new Date().toLocaleString('nl-BE')}</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <p style="margin: 0; color: #856404;">
            <strong>Actie vereist:</strong> Wanneer dit product weer op voorraad is, wordt automatisch een e-mail verstuurd naar de klant.
          </p>
        </div>
        
        <p style="color: #333; line-height: 1.6;">
          Deze klant heeft zich aangemeld voor voorraadmeldingen. Zorg ervoor dat de voorraadstatus 
          wordt bijgewerkt wanneer het product weer beschikbaar is.
        </p>
      </div>
      
      <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
        <p style="margin: 0;">KANIOU Inventory Alert System</p>
      </div>
    </div>
  `;

  return await sendEmail(data.email, subject, html);
}