import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("Warning: SENDGRID_API_KEY environment variable is not set. Email functionality will not work.");
}

const mailService = new MailService();

// Set the API key if available
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Sends an email using SendGrid
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // Create email message object with required fields
    const msg: any = {
      to: params.to,
      from: params.from, // This should be a verified sender in your SendGrid account
      subject: params.subject,
    };
    
    // Add optional fields if they exist
    if (params.text) msg.text = params.text;
    if (params.html) msg.html = params.html;
    
    await mailService.send(msg);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

/**
 * Creates HTML content for contact form submissions
 */
export function createContactEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 5px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #4a6da7; padding: 20px; text-align: center;">
        <h2 style="color: white; margin: 0; font-size: 22px;">New Contact Form Message</h2>
      </div>
      
      <!-- Content -->
      <div style="padding: 20px; background-color: #fff;">
        <div style="background-color: #f9f9f9; border-left: 4px solid #4a6da7; padding: 15px; margin-bottom: 20px;">
          <p style="margin: 0 0 5px 0;"><strong>From:</strong> ${data.name}</p>
          <p style="margin: 0 0 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #4a6da7; text-decoration: none;">${data.email}</a></p>
          <p style="margin: 0;"><strong>Subject:</strong> ${data.subject}</p>
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #4a6da7; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Message Content:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; line-height: 1.6;">
            <p style="white-space: pre-line; margin: 0;">${data.message}</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">This message was sent from your website contact form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        <p style="margin: 5px 0 0 0;">To respond, simply reply to this email.</p>
      </div>
    </div>
  `;
}

/**
 * Creates HTML content for quote request submissions
 */
export function createQuoteRequestEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  productType: string;
  dimensions?: string;
  requirements?: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 5px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #4a6da7; padding: 20px; text-align: center;">
        <h2 style="color: white; margin: 0; font-size: 22px;">New Quote Request</h2>
      </div>
      
      <!-- Content -->
      <div style="padding: 20px; background-color: #fff;">
        <!-- Customer Information -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #4a6da7; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Customer Information</h3>
          <div style="background-color: #f9f9f9; border-left: 4px solid #4a6da7; padding: 15px; border-radius: 0 4px 4px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #4a6da7; text-decoration: none;">${data.email}</a></p>
            <p style="margin: 0;"><strong>Phone:</strong> ${data.phone}</p>
          </div>
        </div>
        
        <!-- Project Details -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #4a6da7; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Project Details</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
            <p style="margin: 0 0 8px 0;"><strong>Product Type:</strong> ${data.productType}</p>
            ${data.dimensions ? `<p style="margin: 0 0 8px 0;"><strong>Dimensions:</strong> ${data.dimensions}</p>` : ''}
            
            ${data.requirements ? `
            <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">
              <p style="margin: 0 0 8px 0;"><strong>Special Requirements:</strong></p>
              <div style="background-color: #fff; padding: 10px; border: 1px solid #eee; border-radius: 4px;">
                <p style="white-space: pre-line; margin: 0; line-height: 1.6;">${data.requirements}</p>
              </div>
            </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Action Button -->
        <div style="text-align: center; margin: 25px 0;">
          <table cellspacing="0" cellpadding="0" style="margin: 0 auto;">
            <tr>
              <td style="border-radius: 4px; background-color: #4a6da7; text-align: center;">
                <a href="mailto:${data.email}" style="border: 1px solid #4a6da7; padding: 12px 25px; color: #ffffff; text-decoration: none; display: inline-block; font-weight: bold; font-size: 16px; border-radius: 4px;">
                  Contact Customer
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">This quote request was submitted from your website on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        <p style="margin: 5px 0 0 0;">To prepare a quote, contact the customer directly.</p>
      </div>
    </div>
  `;
}