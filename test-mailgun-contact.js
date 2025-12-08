/**
 * Quick test to verify Mailgun integration for contact forms
 */

import axios from "axios";

async function testMailgunDirect() {
  const DOMAIN = process.env.MAILGUN_DOMAIN || "kaniou.be";
  const API_KEY = process.env.MAILGUN_API_KEY;

  if (!API_KEY) {
    console.error("❌ MAILGUN_API_KEY environment variable is missing");
    return;
  }

  console.log(`🔧 Testing Mailgun Direct Integration...`);
  console.log(`📧 Domain: ${DOMAIN}`);

  try {
    const emailData = {
      from: `KANIOU Zilvernaald <noreply@${DOMAIN}>`,
      to: 'info@kaniou.be',
      subject: '[KANIOU TEST] Contact Form Email Verification',
      text: `
Test van het contactformulier email systeem

Naam: Test Gebruiker
E-mail: test@example.com
Onderwerp: Contact Form Test

Bericht:
Dit is een test om te verifiëren dat contact formulier emails correct worden verzonden naar info@kaniou.be.

---
Deze test werd verzonden op ${new Date().toLocaleDateString('nl-NL')} om ${new Date().toLocaleTimeString('nl-NL')}
      `.trim()
    };

    const response = await axios.post(
      `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`,
      new URLSearchParams(emailData),
      {
        auth: {
          username: "api",
          password: API_KEY,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('📦 Mailgun Response:', response.data);
    console.log('\n🎉 CONTACT FORM EMAIL SYSTEM IS WORKING');
    console.log('📧 Check info@kaniou.be inbox for the test email');
    
  } catch (error) {
    console.error('❌ EMAIL TEST FAILED:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Troubleshooting: Invalid API key or authentication issue');
    } else if (error.response?.status === 400) {
      console.log('\n💡 Troubleshooting: Invalid request format or missing fields');
    } else if (error.message.includes('domain')) {
      console.log('\n💡 Troubleshooting: Domain configuration issue');
    }
  }
}

testMailgunDirect();