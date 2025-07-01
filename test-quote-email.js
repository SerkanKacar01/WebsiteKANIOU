/**
 * Test script to verify quote form email delivery to info@kaniou.be
 * This will test the complete email flow for quote submissions
 */

import axios from 'axios';

async function testQuoteEmail() {
  console.log('🔄 Testing quote form email delivery to info@kaniou.be...');
  
  try {
    // Test quote form submission with correct schema
    const testData = {
      name: "Test User",
      email: "test@example.com", 
      phone: "0123456789",
      productType: "Rolgordijnen",
      dimensions: "120 x 150 cm",
      requirements: "Dit is een test offerteaanvraag om te controleren of emails correct aankomen bij info@kaniou.be.",
      website: "" // Honeypot field
    };

    console.log('📤 Submitting test quote request...');
    
    const response = await axios.post('http://localhost:5000/api/quote-requests', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Quote form submission response:', response.status, response.data);
    
    if (response.data.success) {
      console.log('✅ SUCCESS: Quote email should have been sent to info@kaniou.be');
      console.log('📧 Check your inbox at info@kaniou.be for the test quote request');
      console.log('📱 Also check spam/junk folder if not in main inbox');
    } else {
      console.log('❌ FAILED: Quote submission did not succeed');
    }

  } catch (error) {
    console.error('❌ ERROR during quote email test:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('💡 TIP: This might be a validation error. Check the form data requirements.');
    } else if (error.response?.status === 500) {
      console.log('💡 TIP: This is likely an email sending error. Check Mailgun configuration.');
    }
  }
}

// Run the test
testQuoteEmail().catch(console.error);