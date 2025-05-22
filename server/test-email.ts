/**
 * Email Testing Utility
 * 
 * This file provides a simple way to test your SendGrid email configuration.
 * Run it with: npx tsx server/test-email.ts
 */

import { sendEmail } from './services/email';
import { emailConfig } from './config/email';

async function testEmailService() {
  console.log('🚀 Testing email service...');
  console.log('📧 Sending a test email to:', emailConfig.notificationEmail);
  
  try {
    const result = await sendEmail({
      to: emailConfig.notificationEmail,
      from: emailConfig.senderEmail,
      subject: 'Test Email from Your Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 5px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #4a6da7; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 22px;">Email System Test</h2>
          </div>
          
          <!-- Content -->
          <div style="padding: 20px; background-color: #fff;">
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 0 0 15px 0;">This is a test email to verify that your SendGrid email integration is working correctly.</p>
              <p style="margin: 0; font-weight: bold; color: #4a6da7;">If you're seeing this, your email system is properly configured!</p>
            </div>
            
            <div style="margin-top: 25px;">
              <h3 style="color: #4a6da7; border-bottom: 1px solid #eee; padding-bottom: 10px;">Next Steps</h3>
              <ol style="margin-top: 15px; line-height: 1.6;">
                <li>Verify this email arrived in your inbox at ${emailConfig.notificationEmail}</li>
                <li>Check that the formatting looks good and is readable</li>
                <li>Submit a test contact form on your website to confirm the live implementation</li>
              </ol>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            <p style="margin: 0;">Test email sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p style="margin: 5px 0 0 0;">Kaniou Website Email System</p>
          </div>
        </div>
      `,
      text: `
Email System Test

This is a test email to verify that your SendGrid email integration is working correctly.
If you're seeing this, your email system is properly configured!

Sent at: ${new Date().toLocaleString()}
      `
    });
    
    if (result) {
      console.log('✅ Test email sent successfully!');
      console.log('📬 Please check your inbox at:', emailConfig.notificationEmail);
    } else {
      console.error('❌ Failed to send test email.');
      console.log('🔍 Check your SendGrid API key and sender verification status.');
    }
  } catch (error) {
    console.error('❌ Error sending test email:', error);
  }
}

// Run the test
testEmailService();