/**
 * Newsletter Service for Managing Subscriptions
 * Handles newsletter signups and sends confirmation emails
 */

import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface NewsletterSignupData {
  name?: string;
  email: string;
  language: string;
}

/**
 * Send welcome email to new newsletter subscribers
 */
export async function sendNewsletterWelcomeEmail(data: NewsletterSignupData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('📧 SendGrid not configured - would send welcome email to:', data.email);
      return false;
    }

    const welcomeEmail = {
      to: data.email,
      from: {
        email: 'info@kaniou.be',
        name: 'KANIOU Zilvernaald'
      },
      subject: data.language === 'nl' ? 
        'Welkom bij KANIOU - Je bent ingeschreven voor onze exclusieve aanbiedingen!' :
        'Welcome to KANIOU - You\'re subscribed to our exclusive offers!',
      html: generateWelcomeEmailHtml(data),
    };

    await sgMail.send(welcomeEmail);
    console.log('📧 Welcome email sent to:', data.email);
    return true;
    
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return false;
  }
}

/**
 * Send notification to admin about new newsletter signup
 */
export async function sendNewsletterNotificationToAdmin(data: NewsletterSignupData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('📧 SendGrid not configured - would notify admin about new signup');
      return false;
    }

    const adminEmail = {
      to: 'info@kaniou.be',
      from: {
        email: 'info@kaniou.be',
        name: 'KANIOU Website'
      },
      subject: '[Website] Nieuwe nieuwsbrief inschrijving',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Nieuwe Nieuwsbrief Inschrijving</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #d97706;">📬 Nieuwe Nieuwsbrief Inschrijving</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Gegevens van nieuwe abonnee:</h3>
              <p><strong>Naam:</strong> ${data.name || 'Niet opgegeven'}</p>
              <p><strong>E-mail:</strong> ${data.email}</p>
              <p><strong>Taal:</strong> ${data.language}</p>
              <p><strong>Datum:</strong> ${new Date().toLocaleString('nl-BE')}</p>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Deze melding is automatisch gegenereerd door de KANIOU website.
            </p>
          </div>
        </body>
        </html>
      `,
    };

    await sgMail.send(adminEmail);
    console.log('📧 Admin notification sent for new newsletter signup');
    return true;
    
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    return false;
  }
}

/**
 * Generate welcome email HTML content
 */
function generateWelcomeEmailHtml(data: NewsletterSignupData): string {
  const isNL = data.language === 'nl';
  const name = data.name || (isNL ? 'Beste klant' : 'Dear customer');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${isNL ? 'Welkom bij KANIOU' : 'Welcome to KANIOU'}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            ${isNL ? '🎉 Welkom bij KANIOU!' : '🎉 Welcome to KANIOU!'}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
            ${isNL ? 'Premium raamdecoratie & zonwering' : 'Premium window treatments & sun protection'}
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            ${isNL ? `Beste ${name},` : `Dear ${name},`}
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            ${isNL ? 
              'Bedankt voor je inschrijving op onze nieuwsbrief! Je bent nu op de hoogte van onze exclusieve aanbiedingen, kortingen en productnieuws.' :
              'Thank you for subscribing to our newsletter! You\'ll now be the first to know about our exclusive offers, discounts, and product news.'
            }
          </p>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #f59e0b; margin-top: 0; font-size: 18px;">
              ${isNL ? '🎁 Wat kun je verwachten?' : '🎁 What to expect?'}
            </h3>
            <ul style="margin: 15px 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">
                ${isNL ? 'Exclusieve kortingen en acties' : 'Exclusive discounts and promotions'}
              </li>
              <li style="margin-bottom: 8px;">
                ${isNL ? 'Nieuwe productlanceringen' : 'New product launches'}
              </li>
              <li style="margin-bottom: 8px;">
                ${isNL ? 'Design tips en inspiratie' : 'Design tips and inspiration'}
              </li>
              <li style="margin-bottom: 8px;">
                ${isNL ? 'Seizoensaanbiedingen' : 'Seasonal offers'}
              </li>
            </ul>
          </div>

          <p style="font-size: 16px; margin-bottom: 30px;">
            ${isNL ? 
              'Heb je vragen over onze producten of wil je een offerte aanvragen? Neem gerust contact met ons op!' :
              'Have questions about our products or want to request a quote? Feel free to contact us!'
            }
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://kaniou.be/contact" style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              ${isNL ? 'Neem Contact Op' : 'Contact Us'}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            KANIOU Zilvernaald<br>
            ${isNL ? 'Premium raamdecoratie op maat' : 'Premium custom window treatments'}<br>
            <a href="https://kaniou.be" style="color: #f59e0b;">www.kaniou.be</a>
          </p>
          
          <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">
            ${isNL ? 
              'Je ontvangt deze e-mail omdat je je hebt ingeschreven voor onze nieuwsbrief.' :
              'You\'re receiving this email because you subscribed to our newsletter.'
            }
            <br>
            <a href="#" style="color: #999;">
              ${isNL ? 'Uitschrijven' : 'Unsubscribe'}
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send test email to verify configuration
 */
export async function sendTestNewsletterEmail(): Promise<boolean> {
  try {
    const testData: NewsletterSignupData = {
      name: "Test Gebruiker",
      email: "test@example.com",
      language: "nl",
    };

    console.log('📧 Testing newsletter email functionality...');
    
    // Test welcome email
    const welcomeResult = await sendNewsletterWelcomeEmail(testData);
    
    // Test admin notification
    const adminResult = await sendNewsletterNotificationToAdmin(testData);
    
    return welcomeResult && adminResult;
    
  } catch (error) {
    console.error('❌ Newsletter email test failed:', error);
    return false;
  }
}