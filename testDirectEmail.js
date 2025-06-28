/**
 * Direct test of Mailgun email functionality
 * This tests the core email sending capability without authentication
 */

import { sendMailgunEmail } from './server/mailgun/sendMail.js';

async function testDirectEmail() {
  try {
    console.log('🔧 Testing Direct Mailgun Email Functionality...\n');

    const testEmail = 'info@kaniou.be';
    const subject = 'KANIOU - Test Email Notification System';
    const body = `
Test email van KANIOU systeem

Dit is een test om te bevestigen dat email notificaties werken.

📧 Email systeem: FUNCTIONEEL
⏰ Tijd: ${new Date().toLocaleString('nl-NL')}
🔧 Test: Direct Mailgun integratie

Met vriendelijke groet,
KANIOU Email System
    `.trim();

    console.log(`📧 Sending test email to: ${testEmail}`);
    console.log(`📋 Subject: ${subject}`);
    
    const result = await sendMailgunEmail(testEmail, subject, body);
    
    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('📦 Mailgun Response:', result);
    console.log('\n🎉 EMAIL NOTIFICATION SYSTEM IS WORKING');
    console.log('📧 Check info@kaniou.be inbox for the test email');
    
  } catch (error) {
    console.error('❌ EMAIL TEST FAILED:', error.message);
    
    if (error.message.includes('MAILGUN_API_KEY')) {
      console.log('\n💡 Troubleshooting: MAILGUN_API_KEY environment variable issue');
    } else if (error.message.includes('401')) {
      console.log('\n💡 Troubleshooting: Authentication issue with Mailgun API');
    } else if (error.message.includes('domain')) {
      console.log('\n💡 Troubleshooting: Domain configuration issue');
    }
  }
}

// Run the test
testDirectEmail();