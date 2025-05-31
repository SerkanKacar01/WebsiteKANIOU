/**
 * Email Service for Price Request Notifications
 * Sends notifications to admin when customers request pricing information
 */

import sgMail from '@sendgrid/mail';
import { PriceDetectionResult } from './priceAssistant';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface PriceRequestEmailData {
  userMessage: string;
  detectedKeywords: string[];
  timestamp: Date;
  conversationId: number;
  sessionId: string;
  userEmail?: string;
  userName?: string;
  language: string;
  extractedProducts: string[];
  confidence: number;
}

/**
 * Send price request notification email to admin
 */
export async function sendPriceRequestNotification(data: PriceRequestEmailData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('📧 SendGrid not configured - would send price request notification');
      return false;
    }

    const adminEmail = 'info@kaniou.be';
    const baseUrl = process.env.REPLIT_DOMAINS ? 
      `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : 
      'http://localhost:5000';
    
    const adminPanelUrl = `${baseUrl}/admin/price-responses`;
    
    // Format the email content
    const subject = `[Chatbot] Nieuwe Prijsvraag van Klant - ${formatDate(data.timestamp)}`;
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
            .footer { background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #2563eb; }
            .keyword { background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px; margin: 2px; display: inline-block; }
            .product { background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 4px; margin: 2px; display: inline-block; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .confidence { font-weight: bold; color: ${data.confidence >= 0.8 ? '#065f46' : data.confidence >= 0.5 ? '#d97706' : '#dc2626'}; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 Nieuwe Prijsvraag Gedetecteerd</h1>
                <p>Er is een klant die om prijsinformatie vraagt via de chatbot</p>
            </div>
            
            <div class="content">
                <div class="info-box">
                    <h3>📝 Klantvraag</h3>
                    <p><strong>"${data.userMessage}"</strong></p>
                </div>
                
                <div class="info-box">
                    <h3>🔍 Detectie Details</h3>
                    <p><strong>Taal:</strong> ${getLanguageName(data.language)}</p>
                    <p><strong>Betrouwbaarheid:</strong> <span class="confidence">${Math.round(data.confidence * 100)}%</span></p>
                    <p><strong>Tijd:</strong> ${formatDateTime(data.timestamp)}</p>
                    <p><strong>Conversatie ID:</strong> ${data.conversationId}</p>
                </div>
                
                ${data.detectedKeywords.length > 0 ? `
                <div class="info-box">
                    <h3>🎯 Gedetecteerde Prijswoorden</h3>
                    <p>
                        ${data.detectedKeywords.map(keyword => `<span class="keyword">${keyword}</span>`).join(' ')}
                    </p>
                </div>
                ` : ''}
                
                ${data.extractedProducts.length > 0 ? `
                <div class="info-box">
                    <h3>🏠 Mogelijke Producten</h3>
                    <p>
                        ${data.extractedProducts.map(product => `<span class="product">${product}</span>`).join(' ')}
                    </p>
                </div>
                ` : ''}
                
                ${data.userName || data.userEmail ? `
                <div class="info-box">
                    <h3>👤 Klantgegevens</h3>
                    ${data.userName ? `<p><strong>Naam:</strong> ${data.userName}</p>` : ''}
                    ${data.userEmail ? `<p><strong>Email:</strong> ${data.userEmail}</p>` : ''}
                </div>
                ` : ''}
                
                <div class="info-box">
                    <h3>⚡ Actie Vereist</h3>
                    <p>Beantwoord deze prijsvraag in het admin panel en help de AI leren voor toekomstige vragen.</p>
                    <a href="${adminPanelUrl}" class="button">Open Admin Panel</a>
                </div>
            </div>
            
            <div class="footer">
                <p>KANIOU Chatbot Price Assistant | Automatisch gegenereerd op ${formatDateTime(new Date())}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const textContent = `
    NIEUWE PRIJSVRAAG GEDETECTEERD
    
    Klantvraag: "${data.userMessage}"
    
    Details:
    - Taal: ${getLanguageName(data.language)}
    - Betrouwbaarheid: ${Math.round(data.confidence * 100)}%
    - Tijd: ${formatDateTime(data.timestamp)}
    - Conversatie ID: ${data.conversationId}
    
    Gedetecteerde woorden: ${data.detectedKeywords.join(', ')}
    ${data.extractedProducts.length > 0 ? `Mogelijke producten: ${data.extractedProducts.join(', ')}` : ''}
    
    ${data.userName ? `Klant naam: ${data.userName}` : ''}
    ${data.userEmail ? `Klant email: ${data.userEmail}` : ''}
    
    Beantwoord deze vraag in het admin panel: ${adminPanelUrl}
    
    KANIOU Chatbot Price Assistant
    `;

    const msg = {
      to: adminEmail,
      from: 'info@kaniou.be', // Official KANIOU email address
      subject,
      text: textContent,
      html: htmlContent,
    };

    await sgMail.send(msg);
    console.log(`📧 Price request notification sent to ${adminEmail}`);
    return true;

  } catch (error) {
    console.error('❌ Failed to send price request notification:', error);
    return false;
  }
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Format date and time for display
 */
function formatDateTime(date: Date): string {
  return date.toLocaleString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Brussels'
  });
}

/**
 * Get language name in Dutch
 */
function getLanguageName(languageCode: string): string {
  const languages: Record<string, string> = {
    'dutch': 'Nederlands',
    'english': 'Engels',
    'french': 'Frans',
    'turkish': 'Turks',
    'arabic': 'Arabisch',
    'nl': 'Nederlands',
    'en': 'Engels',
    'fr': 'Frans',
    'tr': 'Turks',
    'ar': 'Arabisch'
  };
  
  return languages[languageCode] || 'Onbekend';
}

/**
 * Send general email
 */
export async function sendEmail(emailData: { to: string; subject: string; html: string; text?: string }): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('📧 SendGrid not configured - would send email to:', emailData.to);
      return false;
    }

    const msg = {
      to: emailData.to,
      from: 'noreply@kaniou.be',
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || emailData.html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    await sgMail.send(msg);
    console.log(`📧 Email sent to ${emailData.to}`);
    return true;

  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

/**
 * Send test email to verify configuration
 */
export async function sendTestEmail(): Promise<boolean> {
  try {
    const testData: PriceRequestEmailData = {
      userMessage: "Hoeveel kost een wit rolgordijn van 2 meter breed?",
      detectedKeywords: ["hoeveel kost", "rolgordijn"],
      timestamp: new Date(),
      conversationId: 999,
      sessionId: "test_session",
      language: "dutch",
      extractedProducts: ["rolgordijn"],
      confidence: 0.85,
      userName: "Test Klant",
      userEmail: "test@example.com"
    };
    
    return await sendPriceRequestNotification(testData);
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return false;
  }
}