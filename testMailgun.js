/**
 * Test script to verify Mailgun email integration
 * Sends a test email to info@kaniou.be to confirm delivery
 */

import { sendMailgunEmail } from './server/mailgun/sendMail.js';

async function testMailgun() {
  try {
    console.log('Testing Mailgun email integration...');
    
    const result = await sendMailgunEmail(
      'info@kaniou.be',
      'Test Mailgun Email',
      'This is a test email from the TRAC_ORDR system.'
    );
    
    console.log('✅ Email sent successfully!');
    console.log('Response:', result);
    console.log('Check your inbox at info@kaniou.be and your Mailgun dashboard for confirmation.');
    
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.data || error.message);
  }
}

testMailgun();