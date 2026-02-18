// SendGrid service - uses Replit Connector for credentials
import { getUncachableSendGridClient } from '../sendgrid/client';

export interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();

    const msg = {
      to: params.to,
      from: fromEmail,
      subject: params.subject,
      text: params.text,
      html: params.html || params.text.replace(/\n/g, '<br>')
    };

    await client.send(msg);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error.response?.body || error.message);
    return false;
  }
}
