/**
 * Email Summary Service for Smart Conversation Summary
 * Sends conversation summaries via email using SendGrid
 */

import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

export interface EmailSummaryRequest {
  email: string;
  summary: string;
  language: string;
}

/**
 * Send conversation summary via email
 */
export async function sendConversationSummaryEmail(
  emailData: EmailSummaryRequest
): Promise<boolean> {
  try {
    const { email, summary, language } = emailData;

    // Email templates for different languages
    const emailTemplates = {
      nl: {
        subject: "Uw KANIOU Gesprek Samenvatting",
        greeting: "Beste klant,",
        intro: "Hierbij ontvangt u de samenvatting van uw gesprek met onze KANIOU AI assistent:",
        closing: "Heeft u nog vragen? Neem gerust contact met ons op via onze website of bel ons.",
        signature: "Met vriendelijke groet,\nTeam KANIOU\nwww.kaniou.be"
      },
      fr: {
        subject: "Votre Résumé de Conversation KANIOU",
        greeting: "Cher client,",
        intro: "Voici le résumé de votre conversation avec notre assistant IA KANIOU:",
        closing: "Avez-vous encore des questions? N'hésitez pas à nous contacter via notre site web ou appelez-nous.",
        signature: "Cordialement,\nÉquipe KANIOU\nwww.kaniou.be"
      },
      en: {
        subject: "Your KANIOU Conversation Summary",
        greeting: "Dear customer,",
        intro: "Here is the summary of your conversation with our KANIOU AI assistant:",
        closing: "Do you have any more questions? Feel free to contact us via our website or give us a call.",
        signature: "Best regards,\nKANIOU Team\nwww.kaniou.be"
      },
      tr: {
        subject: "KANIOU Konuşma Özetiniz",
        greeting: "Sayın müşterimiz,",
        intro: "KANIOU AI asistanımız ile yaptığınız konuşmanın özeti:",
        closing: "Başka sorularınız var mı? Web sitemiz üzerinden bize ulaşın veya bizi arayın.",
        signature: "Saygılarımızla,\nKANIOU Ekibi\nwww.kaniou.be"
      }
    };

    const template = emailTemplates[language as keyof typeof emailTemplates] || emailTemplates.nl;

    // Compose email content
    const emailContent = `
${template.greeting}

${template.intro}

${summary}

${template.closing}

${template.signature}
    `.trim();

    // HTML version for better formatting
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .summary { background: white; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>KANIOU</h1>
            <p>${template.subject}</p>
        </div>
        
        <div class="content">
            <p>${template.greeting}</p>
            <p>${template.intro}</p>
            
            <div class="summary">
                <pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${summary}</pre>
            </div>
            
            <p>${template.closing}</p>
        </div>
        
        <div class="footer">
            <p>${template.signature.replace(/\n/g, '<br>')}</p>
        </div>
    </div>
</body>
</html>
    `;

    // Send email using SendGrid
    await mailService.send({
      to: email,
      from: 'noreply@kaniou.be', // Should be a verified sender domain
      subject: template.subject,
      text: emailContent,
      html: htmlContent
    });

    console.log(`Conversation summary email sent to: ${email}`);
    return true;

  } catch (error) {
    console.error('Error sending conversation summary email:', error);
    return false;
  }
}