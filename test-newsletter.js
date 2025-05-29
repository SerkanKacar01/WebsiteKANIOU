// Test newsletter email functionality
const { sendTestNewsletterEmail } = require('./server/newsletterService.ts');

async function testNewsletterEmail() {
  console.log('🧪 Testing newsletter email functionality...');
  
  try {
    const result = await sendTestNewsletterEmail();
    console.log('✅ Email test result:', result);
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testNewsletterEmail();