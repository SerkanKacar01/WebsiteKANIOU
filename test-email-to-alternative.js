/**
 * Test email delivery to alternative address
 * This helps determine if the issue is with info@kaniou.be specifically
 * or with the email system in general
 */

import axios from 'axios';

async function testAlternativeEmail() {
  console.log('🔍 Testing email delivery to alternative address...');
  
  const altEmail = process.argv[2];
  
  if (!altEmail) {
    console.log('❌ Please provide an alternative email address to test:');
    console.log('   node test-email-to-alternative.js your-email@gmail.com');
    return;
  }

  // Temporarily modify the email endpoint to send to alternative address
  console.log(`📤 Sending test quote to: ${altEmail}`);
  
  try {
    const testData = {
      name: "Alternative Email Test",
      email: altEmail,
      phone: "0123456789",
      productType: "Rolgordijnen", 
      dimensions: "120 x 150 cm",
      requirements: `TEST EMAIL: This is a test to verify email delivery works. If you receive this at ${altEmail}, then the email system is working correctly and the issue is specifically with info@kaniou.be deliverability.`,
      website: ""
    };

    const response = await axios.post('http://localhost:5000/api/quote-requests', testData);
    
    if (response.data.success) {
      console.log(`✅ Test email queued successfully to ${altEmail}`);
      console.log('📧 Check your inbox in the next 5-10 minutes');
      console.log('💡 If this email arrives but info@kaniou.be doesn\'t receive emails:');
      console.log('   - The technical system works perfectly');
      console.log('   - info@kaniou.be has a spam filter or blocking issue');
      console.log('   - Check spam folder in info@kaniou.be');
      console.log('   - Contact your email provider about Mailgun delivery');
    } else {
      console.log('❌ Test email failed to send');
    }

  } catch (error) {
    console.log('❌ Error sending test email:', error.response?.data || error.message);
  }
}

testAlternativeEmail().catch(console.error);