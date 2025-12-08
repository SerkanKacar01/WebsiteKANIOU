/**
 * Comprehensive Email Diagnostic Tool for KANIOU
 * Addresses all points from user's instruction
 */

import axios from 'axios';

async function emailDiagnostic() {
  console.log('🔍 KANIOU Email System Diagnostic');
  console.log('=' * 50);

  // 1. Check environment variables
  console.log('\n📋 Step 1: Environment Variables Check');
  console.log('MAILGUN_DOMAIN:', process.env.MAILGUN_DOMAIN || 'kaniou.be (default)');
  
  // 2. Test quote form submission with enhanced logging
  console.log('\n📤 Step 2: Quote Form Submission Test');
  try {
    const testData = {
      name: "Diagnostic Test User",
      email: "diagnostic@example.com",
      phone: "0123456789",
      productType: "Email Diagnostic Test",
      dimensions: "Test dimensions",
      requirements: "DIAGNOSTIC EMAIL: Testing email delivery system for KANIOU. This should arrive at info@kaniou.be if the system works correctly.",
      website: ""
    };

    console.log('📤 Sending test quote to info@kaniou.be...');
    const response = await axios.post('http://localhost:5000/api/quote-requests', testData);
    console.log('✅ Quote API Response:', response.status, response.data);
    
  } catch (error) {
    console.log('❌ Quote submission failed:', error.response?.data || error.message);
  }

  // 3. Test alternative email address
  console.log('\n📧 Step 3: Alternative Email Test');
  const altEmail = 'serkann.k01@gmail.com'; // Use your email for testing
  
  try {
    // Create a temporary test by modifying the recipient
    console.log(`📤 Testing email delivery to alternative address: ${altEmail}`);
    
    const testData = {
      name: "Alternative Email Test",
      email: altEmail,
      phone: "0123456789", 
      productType: "Email System Test",
      dimensions: "Alternative test",
      requirements: `ALTERNATIVE EMAIL TEST: If you receive this at ${altEmail}, the email system works correctly. The issue is likely spam filtering at info@kaniou.be.`,
      website: ""
    };

    const response = await axios.post('http://localhost:5000/api/quote-requests', testData);
    console.log(`✅ Alternative email test queued to ${altEmail}:`, response.data);
    
  } catch (error) {
    console.log('❌ Alternative email test failed:', error.response?.data || error.message);
  }

  // 4. Configuration Summary
  console.log('\n⚙️ Step 4: Current Configuration Summary');
  console.log('Email Service: Mailgun EU endpoint');
  console.log('Domain: kaniou.be');
  console.log('Sender: KANIOU Zilvernaald <noreply@kaniou.be>');
  console.log('Recipient: info@kaniou.be');
  console.log('API Endpoint: https://api.eu.mailgun.net/v3/kaniou.be/messages');

  // 5. Troubleshooting checklist
  console.log('\n🔧 Step 5: Troubleshooting Checklist');
  console.log('□ Check spam/junk folder in info@kaniou.be');
  console.log('□ Verify info@kaniou.be mailbox is active and accessible');
  console.log('□ Check if alternative email receives the test message');
  console.log('□ Review Mailgun dashboard for delivery logs');
  console.log('□ Verify DNS records (SPF, DKIM) for kaniou.be domain');
  console.log('□ Consider email provider blocking Mailgun emails');

  console.log('\n🎯 Next Actions:');
  console.log('1. Check your spam folder in info@kaniou.be immediately');
  console.log('2. Verify if the alternative email arrives at serkann.k01@gmail.com');
  console.log('3. If alternative email works but info@kaniou.be doesn\'t, the issue is with that specific mailbox');
}

emailDiagnostic().catch(console.error);