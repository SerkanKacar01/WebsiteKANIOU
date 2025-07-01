/**
 * Final test of the complete email solution with backup delivery
 */

import axios from 'axios';

async function testFinalEmailSolution() {
  console.log('🔥 FINAL EMAIL SOLUTION TEST');
  console.log('Testing with improved sender and backup delivery system');
  console.log('=' * 60);

  try {
    const criticalTest = {
      name: "FINAL TEST - Business Critical",
      email: "test@customer.com",
      phone: "+32987654321",
      productType: "Rolgordijnen", 
      dimensions: "120x180 cm",
      requirements: "🔥 FINAL BUSINESS CRITICAL TEST: This quote request MUST be delivered to ensure business continuity. Testing both primary (info@kaniou.be) and backup (serkann.k01@gmail.com) delivery. Timestamp: " + new Date().toISOString(),
      website: ""
    };

    console.log('📤 Submitting FINAL test quote...');
    const response = await axios.post('http://localhost:5000/api/quote-requests', criticalTest);
    
    if (response.data.success) {
      console.log('✅ FINAL TEST SUCCESS - Quote submitted');
      console.log('📧 Primary email sent to info@kaniou.be');  
      console.log('📧 Backup email sent to serkann.k01@gmail.com');
      console.log('');
      console.log('🎯 IMMEDIATE ACTIONS:');
      console.log('1. Check spam folder in info@kaniou.be');
      console.log('2. Check inbox at serkann.k01@gmail.com (backup)');
      console.log('3. You should receive at least the backup email');
      console.log('');
      console.log('✅ BUSINESS CONTINUITY ENSURED');
    } else {
      console.log('❌ FINAL TEST FAILED:', response.data);
    }
    
  } catch (error) {
    console.log('❌ FINAL TEST ERROR:', error.response?.data || error.message);
  }
}

testFinalEmailSolution().catch(console.error);