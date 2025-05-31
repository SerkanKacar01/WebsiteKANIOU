/**
 * Smart Quote Email Service for KANIOU
 * Handles all email notifications for smart quote requests
 */

import sgMail from '@sendgrid/mail';
import { SmartQuoteRequest } from '@shared/schema';

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Send smart quote notification to admin (info@kaniou.be)
 */
export async function sendSmartQuoteNotificationToAdmin(quote: SmartQuoteRequest): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('⚠️ SENDGRID_API_KEY not configured, skipping admin notification email');
    return false;
  }

  try {
    const productDisplayNames = {
      'rolgordijn': 'Rolgordijn',
      'plisse': 'Plissé',
      'jaloezie_horizontaal': 'Horizontale Jaloezie',
      'jaloezie_verticaal': 'Verticale Jaloezie',
      'gordijn': 'Gordijn',
      'vouwgordijn': 'Vouwgordijn'
    };

    const materialDisplayNames = {
      'screen': 'Screen',
      'blackout': 'Blackout',
      'light_filtering': 'Lichtfilterend',
      'transparent': 'Transparant',
      'standard': 'Standaard',
      'duette': 'Duette',
      'aluminum': 'Aluminium',
      'wood': 'Hout',
      'faux_wood': 'Kunsthout',
      'pvc': 'PVC',
      'fabric': 'Stof',
      'cotton': 'Katoen',
      'linen': 'Linnen',
      'velvet': 'Fluweel',
      'synthetic': 'Synthetisch'
    };

    const roomTypeDisplayNames = {
      'living_room': 'Woonkamer',
      'bedroom': 'Slaapkamer',
      'kitchen': 'Keuken',
      'bathroom': 'Badkamer',
      'office': 'Kantoor',
      'children_room': 'Kinderkamer',
      'dining_room': 'Eetkamer',
      'other': 'Andere'
    };

    const productName = productDisplayNames[quote.productType as keyof typeof productDisplayNames] || quote.productType;
    const materialName = materialDisplayNames[quote.material as keyof typeof materialDisplayNames] || quote.material;
    const roomName = roomTypeDisplayNames[quote.roomType as keyof typeof roomTypeDisplayNames] || quote.roomType;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; margin: 0; font-size: 24px;">Nieuwe Slimme Offerteaanvraag</h1>
            <div style="width: 50px; height: 3px; background: linear-gradient(90deg, #d4a574, #f4e4c7); margin: 10px auto;"></div>
          </div>
          
          <div style="background-color: #f8f6f3; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px;">Klantgegevens</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Naam:</td><td style="padding: 5px 0;">${quote.name}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">E-mail:</td><td style="padding: 5px 0;">${quote.email}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Telefoon:</td><td style="padding: 5px 0;">${quote.phone}</td></tr>
            </table>
          </div>

          <div style="background-color: #f0f8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px;">Productspecificaties</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Ruimte:</td><td style="padding: 5px 0;">${roomName}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Product:</td><td style="padding: 5px 0;">${productName}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Materiaal:</td><td style="padding: 5px 0;">${materialName}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Afmetingen:</td><td style="padding: 5px 0;">${quote.width}cm × ${quote.height}cm</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Installatie:</td><td style="padding: 5px 0;">${quote.installationRequired ? 'Ja, gewenst' : 'Nee, zelf installeren'}</td></tr>
            </table>
          </div>

          ${quote.colorPreference ? `
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 16px;">Kleurvoorkeur</h3>
            <p style="margin: 0; color: #333;">${quote.colorPreference}</p>
          </div>
          ` : ''}

          ${quote.stylePreference ? `
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 16px;">Stijlvoorkeur</h3>
            <p style="margin: 0; color: #333;">${quote.stylePreference}</p>
          </div>
          ` : ''}

          ${quote.additionalNotes ? `
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 16px;">Aanvullende Opmerkingen</h3>
            <p style="margin: 0; color: #333;">${quote.additionalNotes}</p>
          </div>
          ` : ''}

          <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; text-align: center;">
            <h2 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 20px;">Geschatte Prijs</h2>
            <div style="font-size: 32px; font-weight: bold; color: #d4a574; margin: 10px 0;">€${quote.estimatedPrice}</div>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">*Dit is een automatisch berekende schatting</p>
          </div>
          
          <div style="margin-top: 25px; padding: 15px; background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #d4a574;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>Actie vereist:</strong> Neem binnen 24 uur contact op met de klant voor een gepersonaliseerde offerte.
            </p>
          </div>
        </div>
      </div>
    `;

    const msg = {
      to: 'info@kaniou.be',
      from: {
        email: 'noreply@kaniou.be',
        name: 'KANIOU Slimme Offertes'
      },
      subject: `Nieuwe offerteaanvraag van ${quote.name} via KANIOU`,
      html: emailHtml,
    };

    await sgMail.send(msg);
    console.log(`📧 SMART QUOTE: Admin notification sent for quote #${quote.id}`);
    return true;
  } catch (error) {
    console.error('❌ SMART QUOTE: Failed to send admin notification:', error);
    return false;
  }
}

/**
 * Send confirmation email to customer
 */
export async function sendSmartQuoteConfirmationToCustomer(quote: SmartQuoteRequest): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('⚠️ SENDGRID_API_KEY not configured, skipping customer confirmation email');
    return false;
  }

  try {
    const translations = {
      nl: {
        subject: 'Bevestiging van uw offerteaanvraag - KANIOU',
        title: 'Bedankt voor uw offerteaanvraag!',
        message: 'Wij hebben uw aanvraag ontvangen en zullen u binnen 24 uur een gepersonaliseerde offerte sturen.',
        estimatedPrice: 'Geschatte Prijs',
        disclaimer: '*Dit is een automatisch berekende schatting. De definitieve prijs kan afwijken.',
        contact: 'Heeft u vragen? Neem gerust contact met ons op.',
        productDetails: 'Productgegevens',
        customerInfo: 'Uw Gegevens'
      },
      fr: {
        subject: 'Confirmation de votre demande de devis - KANIOU',
        title: 'Merci pour votre demande de devis!',
        message: 'Nous avons reçu votre demande et vous enverrons un devis personnalisé dans les 24 heures.',
        estimatedPrice: 'Prix Estimé',
        disclaimer: '*Ceci est une estimation automatique. Le prix final peut différer.',
        contact: 'Des questions? N\'hésitez pas à nous contacter.',
        productDetails: 'Détails du Produit',
        customerInfo: 'Vos Informations'
      },
      en: {
        subject: 'Quote Request Confirmation - KANIOU',
        title: 'Thank you for your quote request!',
        message: 'We have received your request and will send you a personalized quote within 24 hours.',
        estimatedPrice: 'Estimated Price',
        disclaimer: '*This is an automatically calculated estimate. Final price may vary.',
        contact: 'Have questions? Feel free to contact us.',
        productDetails: 'Product Details',
        customerInfo: 'Your Information'
      },
      tr: {
        subject: 'Teklif Talebiniz Onaylandı - KANIOU',
        title: 'Teklif talebiniz için teşekkürler!',
        message: 'Talebinizi aldık ve 24 saat içinde size kişiselleştirilmiş bir teklif göndereceğiz.',
        estimatedPrice: 'Tahmini Fiyat',
        disclaimer: '*Bu otomatik hesaplanmış bir tahmindir. Nihai fiyat değişebilir.',
        contact: 'Sorularınız mı var? Bizimle iletişime geçmekten çekinmeyin.',
        productDetails: 'Ürün Detayları',
        customerInfo: 'Bilgileriniz'
      }
    };

    const t = translations[quote.language as keyof typeof translations] || translations.nl;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; margin: 0; font-size: 24px;">${t.title}</h1>
            <div style="width: 50px; height: 3px; background: linear-gradient(90deg, #d4a574, #f4e4c7); margin: 10px auto;"></div>
            <p style="color: #666; margin: 15px 0 0 0;">${t.message}</p>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
            <h2 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 20px;">${t.estimatedPrice}</h2>
            <div style="font-size: 32px; font-weight: bold; color: #d4a574; margin: 10px 0;">€${quote.estimatedPrice}</div>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">${t.disclaimer}</p>
          </div>

          <div style="background-color: #f8f6f3; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 16px;">${t.productDetails}</h3>
            <p style="margin: 5px 0; color: #333;"><strong>Product:</strong> ${quote.productType}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Materiaal:</strong> ${quote.material}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Afmetingen:</strong> ${quote.width}cm × ${quote.height}cm</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; margin: 0 0 10px 0;">${t.contact}</p>
            <p style="color: #d4a574; font-weight: bold; margin: 0;">info@kaniou.be | +32 123 456 789</p>
          </div>
        </div>
      </div>
    `;

    const msg = {
      to: quote.email,
      from: {
        email: 'info@kaniou.be',
        name: 'KANIOU'
      },
      subject: t.subject,
      html: emailHtml,
    };

    await sgMail.send(msg);
    console.log(`📧 SMART QUOTE: Customer confirmation sent to ${quote.email}`);
    return true;
  } catch (error) {
    console.error('❌ SMART QUOTE: Failed to send customer confirmation:', error);
    return false;
  }
}