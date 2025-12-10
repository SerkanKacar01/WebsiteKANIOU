// SendGrid Email Client - Replit Integration
import sgMail from '@sendgrid/mail';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email };
}

export async function getUncachableSendGridClient() {
  const { apiKey, email } = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

export async function sendQuoteRequestEmail(quoteData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productType: string;
  width?: string;
  height?: string;
  message?: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center;">
          <h1 style="color: #C8A85B; margin: 0; font-size: 28px;">KANIOU</h1>
          <p style="color: #999; margin: 5px 0 0 0; font-size: 14px;">Nieuwe Offerte Aanvraag</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #C8A85B; padding-bottom: 10px;">Klantgegevens</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; width: 150px;"><strong>Naam:</strong></td>
              <td style="padding: 10px 0; color: #333;">${quoteData.firstName} ${quoteData.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>E-mail:</strong></td>
              <td style="padding: 10px 0; color: #333;"><a href="mailto:${quoteData.email}" style="color: #C8A85B;">${quoteData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Telefoon:</strong></td>
              <td style="padding: 10px 0; color: #333;"><a href="tel:${quoteData.phone}" style="color: #C8A85B;">${quoteData.phone}</a></td>
            </tr>
          </table>
          
          <h2 style="color: #333; border-bottom: 2px solid #C8A85B; padding-bottom: 10px; margin-top: 30px;">Product Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; width: 150px;"><strong>Product:</strong></td>
              <td style="padding: 10px 0; color: #333;">${quoteData.productType}</td>
            </tr>
            ${quoteData.width ? `
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Breedte:</strong></td>
              <td style="padding: 10px 0; color: #333;">${quoteData.width} cm</td>
            </tr>
            ` : ''}
            ${quoteData.height ? `
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Hoogte:</strong></td>
              <td style="padding: 10px 0; color: #333;">${quoteData.height} cm</td>
            </tr>
            ` : ''}
          </table>
          
          ${quoteData.message ? `
          <h2 style="color: #333; border-bottom: 2px solid #C8A85B; padding-bottom: 10px; margin-top: 30px;">Bericht</h2>
          <p style="color: #333; line-height: 1.6; background: white; padding: 15px; border-radius: 5px;">${quoteData.message}</p>
          ` : ''}
        </div>
        
        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">&copy; 2025 KANIOU Zilvernaald - Premium Gordijnen & Zonweringen</p>
        </div>
      </div>
    `;

    const msg = {
      to: 'info@kaniou.be',
      from: fromEmail,
      subject: `Nieuwe Offerte Aanvraag - ${quoteData.productType} - ${quoteData.firstName} ${quoteData.lastName}`,
      html: htmlContent,
      replyTo: quoteData.email
    };

    await client.send(msg);
    console.log('✅ SendGrid email sent successfully for quote request');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid email error:', error);
    throw error;
  }
}
