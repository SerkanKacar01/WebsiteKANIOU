/**
 * CRITICAL EMAIL SYSTEM TEST for KANIOU
 * This will verify the complete email flow and identify exactly why emails aren't reaching info@kaniou.be
 */

import axios from 'axios';

async function criticalEmailTest() {
  console.log('🚨 CRITICAL EMAIL SYSTEM TEST - KANIOU');
  console.log('=' * 60);

  // Test 1: Environment Variables
  console.log('\n1️⃣ ENVIRONMENT VARIABLES CHECK');
  console.log('MAILGUN_API_KEY:', process.env.MAILGUN_API_KEY ? `SET (${process.env.MAILGUN_API_KEY.substring(0, 8)}...)` : '❌ NOT SET');
  console.log('MAILGUN_DOMAIN:', process.env.MAILGUN_DOMAIN || '❌ NOT SET');
  
  // Test 2: Direct Mailgun API Test
  console.log('\n2️⃣ DIRECT MAILGUN API TEST');
  try {
    const DOMAIN = process.env.MAILGUN_DOMAIN || "kaniou.be";
    const API_KEY = process.env.MAILGUN_API_KEY;
    
    if (!API_KEY) {
      console.log('❌ MAILGUN_API_KEY not found in environment');
      return;
    }

    const testEmail = {
      from: `KANIOU Test <noreply@${DOMAIN}>`,
      to: 'info@kaniou.be',
      subject: '🚨 CRITICAL TEST - KANIOU Email System',
      text: `CRITICAL EMAIL SYSTEM TEST
      
This is a direct test of the Mailgun API to verify email delivery to info@kaniou.be.

If you receive this email, the Mailgun configuration is working correctly.

Test Details:
- Sent: ${new Date().toISOString()}
- From: noreply@${DOMAIN}
- API Endpoint: https://api.eu.mailgun.net/v3/${DOMAIN}/messages
- Test Type: Direct Mailgun API call

Please confirm receipt immediately.`
    };

    console.log(`📤 Sending direct test email to info@kaniou.be via Mailgun...`);
    
    const response = await axios.post(
      `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`,
      new URLSearchParams(testEmail),
      {
        auth: {
          username: 'api',
          password: API_KEY,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('✅ DIRECT MAILGUN SUCCESS:', response.data);
    console.log(`📧 Message ID: ${response.data.id}`);
    
  } catch (error) {
    console.log('❌ DIRECT MAILGUN FAILED:', error.response?.data || error.message);
  }

  // Test 3: Quote Form API Test
  console.log('\n3️⃣ QUOTE FORM API TEST');
  try {
    const testQuote = {
      name: "CRITICAL TEST USER",
      email: "serkann.k01@gmail.com",
      phone: "+32123456789",
      productType: "CRITICAL EMAIL TEST",
      dimensions: "100x150 cm",
      requirements: "🚨 CRITICAL TEST: This email MUST reach info@kaniou.be to confirm the quote system works. Please confirm receipt immediately. Timestamp: " + new Date().toISOString(),
      website: ""
    };

    console.log('📤 Submitting test quote through API...');
    const response = await axios.post('http://localhost:5000/api/quote-requests', testQuote);
    console.log('✅ QUOTE API SUCCESS:', response.data);
    
  } catch (error) {
    console.log('❌ QUOTE API FAILED:', error.response?.data || error.message);
  }

  // Test 4: Alternative Recipient Test
  console.log('\n4️⃣ ALTERNATIVE RECIPIENT TEST');
  try {
    const DOMAIN = process.env.MAILGUN_DOMAIN || "kaniou.be";
    const API_KEY = process.env.MAILGUN_API_KEY;

    const altEmail = {
      from: `KANIOU Test <noreply@${DOMAIN}>`,
      to: 'serkann.k01@gmail.com', // Your Gmail
      subject: '✅ KANIOU Email System - Alternative Test',
      text: `ALTERNATIVE RECIPIENT TEST
      
This email was sent to serkann.k01@gmail.com to verify that the Mailgun system works.

If you receive this email:
✅ Mailgun configuration is correct
✅ Email sending code works
✅ The issue is specific to info@kaniou.be delivery

Next steps if you receive this:
1. Check spam folder of info@kaniou.be
2. Verify info@kaniou.be mailbox is active
3. Consider switching email provider temporarily

Test sent: ${new Date().toISOString()}`
    };

    console.log(`📤 Sending alternative test to serkann.k01@gmail.com...`);
    
    const response = await axios.post(
      `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`,
      new URLSearchParams(altEmail),
      {
        auth: {
          username: 'api',
          password: API_KEY,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('✅ ALTERNATIVE EMAIL SUCCESS:', response.data);
    
  } catch (error) {
    console.log('❌ ALTERNATIVE EMAIL FAILED:', error.response?.data || error.message);
  }

  console.log('\n🎯 CRITICAL NEXT STEPS:');
  console.log('1. Check spam folder in info@kaniou.be immediately');
  console.log('2. Verify if alternative email arrives at serkann.k01@gmail.com');
  console.log('3. If alternative works but info@kaniou.be doesn\'t = deliverability issue');
  console.log('4. If nothing works = API/configuration issue');
}

criticalEmailTest().catch(console.error);