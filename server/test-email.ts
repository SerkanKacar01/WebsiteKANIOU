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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email System Test</h2>
          <p>This is a test email to verify that your SendGrid email integration is working correctly.</p>
          <p>If you're seeing this, your email system is properly configured!</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #777; font-size: 12px;">
            Sent at: ${new Date().toLocaleString()}
          </p>
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