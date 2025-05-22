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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
      
      <div style="margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
          <h3 style="color: #555;">Message:</h3>
          <p style="line-height: 1.5; white-space: pre-line;">${data.message}</p>
        </div>
      </div>
      
      <div style="color: #777; font-size: 12px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
        <p>This email was sent from your website contact form.</p>
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Quote Request</h2>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #555;">Customer Information:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
          <h3 style="color: #555;">Project Details:</h3>
          <p><strong>Product Type:</strong> ${data.productType}</p>
          ${data.dimensions ? `<p><strong>Dimensions:</strong> ${data.dimensions}</p>` : ''}
          
          ${data.requirements ? `
          <div style="margin-top: 15px;">
            <h4 style="color: #666;">Special Requirements:</h4>
            <p style="line-height: 1.5; white-space: pre-line;">${data.requirements}</p>
          </div>
          ` : ''}
        </div>
      </div>
      
      <div style="color: #777; font-size: 12px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
        <p>This quote request was submitted from your website on ${new Date().toLocaleDateString()}.</p>
      </div>
    </div>
  `;
}