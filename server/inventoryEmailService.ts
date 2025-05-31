import { sendEmail } from "./emailService";

interface InventoryAlert {
  id: number;
  email: string;
  productType: string;
  alertType: 'out_of_stock' | 'back_in_stock' | 'low_stock';
  isActive: boolean;
  createdAt: string;
}

interface ProductStock {
  productType: string;
  currentStock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export async function sendInventoryAlertToUser(alert: InventoryAlert, stock: ProductStock): Promise<boolean> {
  const subject = getAlertSubject(alert.alertType, alert.productType);
  const content = getAlertContent(alert, stock);

  try {
    const success = await sendEmail({
      to: alert.email,
      from: 'info@kaniou.be',
      subject,
      html: content,
      text: stripHtml(content)
    });

    console.log(`📧 Inventory alert sent to ${alert.email} for ${alert.productType} (${alert.alertType}): ${success ? 'Success' : 'Failed'}`);
    return success;
  } catch (error) {
    console.error('Error sending inventory alert email:', error);
    return false;
  }
}

export async function sendInventoryAlertToAdmin(alert: InventoryAlert): Promise<boolean> {
  const subject = `New Inventory Alert Subscription - ${alert.productType}`;
  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Inventory Alert Subscription</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Alert Details</h3>
        <p><strong>Customer Email:</strong> ${alert.email}</p>
        <p><strong>Product Type:</strong> ${alert.productType}</p>
        <p><strong>Alert Type:</strong> ${alert.alertType}</p>
        <p><strong>Created:</strong> ${new Date(alert.createdAt).toLocaleString('nl-NL')}</p>
      </div>
      
      <p>A customer has subscribed to receive notifications about this product's availability.</p>
      
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This notification was sent automatically from the KANIOU inventory alert system.
      </p>
    </div>
  `;

  try {
    const success = await sendEmail({
      to: 'info@kaniou.be',
      from: 'info@kaniou.be',
      subject,
      html: content,
      text: stripHtml(content)
    });

    console.log(`📧 Inventory alert admin notification sent: ${success ? 'Success' : 'Failed'}`);
    return success;
  } catch (error) {
    console.error('Error sending inventory alert admin email:', error);
    return false;
  }
}

function getAlertSubject(alertType: string, productType: string): string {
  switch (alertType) {
    case 'back_in_stock':
      return `🎉 ${productType} is weer op voorraad - KANIOU`;
    case 'low_stock':
      return `⚠️ Beperkte voorraad ${productType} - KANIOU`;
    case 'out_of_stock':
      return `📦 ${productType} is uitverkocht - KANIOU`;
    default:
      return `Voorraad update ${productType} - KANIOU`;
  }
}

function getAlertContent(alert: InventoryAlert, stock: ProductStock): string {
  const productName = translateProductName(alert.productType);
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a4d3a; color: white; padding: 20px; text-align: center;">
        <h1>KANIOU Zilvernaald</h1>
        <h2>Voorraad Update</h2>
      </div>
      
      <div style="padding: 30px 20px;">
        ${getAlertMessage(alert.alertType, productName, stock)}
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Product Details</h3>
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Huidige voorraad:</strong> ${stock.currentStock} stuks</p>
          <p><strong>Status:</strong> ${getStatusText(stock.status)}</p>
        </div>
        
        ${getCallToAction(alert.alertType)}
        
        <hr style="margin: 30px 0;">
        <p>Wilt u geen voorraadmeldingen meer ontvangen? U kunt uw voorkeuren aanpassen door contact met ons op te nemen.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p><strong>KANIOU Zilvernaald</strong></p>
          <p>info@kaniou.be | www.kaniou.be</p>
        </div>
      </div>
    </div>
  `;
}

function getAlertMessage(alertType: string, productName: string, stock: ProductStock): string {
  switch (alertType) {
    case 'back_in_stock':
      return `
        <h3 style="color: #28a745;">🎉 Goed nieuws!</h3>
        <p>Het product <strong>${productName}</strong> dat u in de gaten hield is weer op voorraad!</p>
        <p>We hebben momenteel <strong>${stock.currentStock} stuks</strong> beschikbaar.</p>
      `;
    case 'low_stock':
      return `
        <h3 style="color: #ffc107;">⚠️ Beperkte voorraad</h3>
        <p>Het product <strong>${productName}</strong> heeft nog maar beperkte voorraad.</p>
        <p>Er zijn nog slechts <strong>${stock.currentStock} stuks</strong> beschikbaar.</p>
      `;
    case 'out_of_stock':
      return `
        <h3 style="color: #dc3545;">📦 Uitverkocht</h3>
        <p>Het product <strong>${productName}</strong> is helaas uitverkocht.</p>
        <p>We verwachten binnen enkele weken nieuwe voorraad.</p>
      `;
    default:
      return `<p>Er is een update voor het product <strong>${productName}</strong>.</p>`;
  }
}

function getCallToAction(alertType: string): string {
  switch (alertType) {
    case 'back_in_stock':
      return `
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.kaniou.be" style="background-color: #1a4d3a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Bekijk Product
          </a>
        </div>
        <p>Bestel snel, want op=op!</p>
      `;
    case 'low_stock':
      return `
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.kaniou.be" style="background-color: #ffc107; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Bestel Nu
          </a>
        </div>
        <p>Bestel tijdig om teleurstelling te voorkomen!</p>
      `;
    case 'out_of_stock':
      return `
        <p>Wilt u een offerte aanvragen voor wanneer het product weer beschikbaar is? Neem dan contact met ons op.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.kaniou.be/contact" style="background-color: #1a4d3a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Neem Contact Op
          </a>
        </div>
      `;
    default:
      return '';
  }
}

function translateProductName(productType: string): string {
  const translations = {
    'rolgordijnen': 'Rolgordijnen',
    'plisse': 'Plissé Gordijnen',
    'overgordijnen': 'Overgordijnen',
    'houten-jaloezieen': 'Houten Jaloezieën',
    'kunststof-jaloezieen': 'Kunststof Jaloezieën',
    'duo-rolgordijnen': 'Duo Rolgordijnen',
    'vouwgordijnen': 'Vouwgordijnen',
    'textiel-lamellen': 'Textiel Lamellen'
  };
  return translations[productType as keyof typeof translations] || productType;
}

function getStatusText(status: string): string {
  switch (status) {
    case 'in_stock': return 'Op voorraad';
    case 'low_stock': return 'Beperkte voorraad';
    case 'out_of_stock': return 'Uitverkocht';
    default: return 'Onbekend';
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}