/**
 * Enhanced email deliverability test with multiple checks
 * This will help identify why emails aren't reaching info@kaniou.be
 */

import axios from 'axios';

async function testEmailDeliverability() {
  console.log('🔍 Email Deliverability Investigation for info@kaniou.be');
  console.log('='.repeat(60));

  // Test 1: Basic quote form submission
  console.log('\n📤 Test 1: Standard Quote Form Submission');
  try {
    const testData = {
      name: "Email Test User",
      email: "emailtest@example.com",
      phone: "0123456789", 
      productType: "Rolgordijnen",
      dimensions: "120 x 150 cm",
      requirements: "Email deliverability test - checking if this reaches info@kaniou.be inbox.",
      website: ""
    };

    const response = await axios.post('http://localhost:5000/api/quote-requests', testData);
    console.log('✅ Email API Response:', response.data);
    
  } catch (error) {
    console.log('❌ Quote form submission failed:', error.response?.data || error.message);
  }

  // Test 2: Contact form submission (different endpoint)
  console.log('\n📤 Test 2: Contact Form Submission (Alternative Path)');
  try {
    const contactData = {
      name: "Contact Test User",
      email: "contacttest@example.com", 
      subject: "Email Deliverability Test",
      message: "Testing contact form email delivery to info@kaniou.be. This should arrive in your inbox.",
      website: ""
    };

    const response = await axios.post('http://localhost:5000/api/contact-submissions', contactData);
    console.log('✅ Contact API Response:', response.data);
    
  } catch (error) {
    console.log('❌ Contact form submission failed:', error.response?.data || error.message);
  }

  // Test 3: Check email configuration
  console.log('\n🔧 Test 3: Email Configuration Check');
  console.log('Expected recipient: info@kaniou.be');
  console.log('Expected sender domain: kaniou.be');
  console.log('Email service: Mailgun EU endpoint');
  
  console.log('\n🚨 POSSIBLE CAUSES IF EMAILS NOT RECEIVED:');
  console.log('1. 📧 Spam/Junk Folder - Check spam folder in info@kaniou.be');
  console.log('2. 🔐 Domain Authentication - Verify SPF/DKIM records for kaniou.be');
  console.log('3. 📬 Email Provider Blocking - Some providers block Mailgun emails');
  console.log('4. 🎯 Wrong Email Address - Verify info@kaniou.be is correct and active');
  console.log('5. ⏰ Delivery Delay - Some emails take 5-15 minutes to arrive');

  console.log('\n💡 TROUBLESHOOTING STEPS:');
  console.log('1. Check spam/junk folder in info@kaniou.be');
  console.log('2. Add an alternative test email (e.g., Gmail) to verify delivery');
  console.log('3. Check Mailgun dashboard for delivery logs');
  console.log('4. Verify domain DNS settings (SPF, DKIM, DMARC)');
  
  console.log('\n🎯 NEXT ACTION: Please check your spam folder and confirm email address');
}

// Run the test
testEmailDeliverability().catch(console.error);