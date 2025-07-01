/**
 * Test script to verify quote form validation fixes
 * Tests both frontend validation and backend handling
 */

import axios from 'axios';

async function testQuoteFormValidation() {
  console.log('\n🔧 Testing Quote Form Validation Fixes...\n');
  
  const baseUrl = 'http://localhost:5000';
  
  // Test 1: Requirements field with less than 10 characters (should fail)
  console.log('📝 Test 1: Requirements with less than 10 characters');
  try {
    const shortRequirementsData = {
      name: "Test User",
      email: "test@example.com", 
      phone: "0123456789",
      productType: "curtains",
      dimensions: "100 x 150 cm",
      requirements: "Jajabaab", // Only 8 characters - should fail
      website: ""
    };
    
    const response = await axios.post(`${baseUrl}/api/quote-requests`, shortRequirementsData);
    console.log('❌ Test 1 FAILED: Short requirements should have been rejected');
    console.log('Response:', response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Test 1 PASSED: Short requirements correctly rejected');
      console.log('Error message:', error.response.data.error);
    } else {
      console.log('❌ Test 1 FAILED: Unexpected error:', error.message);
    }
  }
  
  // Test 2: Requirements field with 10+ characters (should pass)
  console.log('\n📝 Test 2: Requirements with 10+ characters');
  try {
    const validRequirementsData = {
      name: "Test User Valid",
      email: "testvalid@example.com",
      phone: "0123456789", 
      productType: "curtains",
      dimensions: "100 x 150 cm",
      requirements: "Dit is een langere tekst met meer dan 10 karakters voor de aanvraag", // 70+ characters
      website: ""
    };
    
    const response = await axios.post(`${baseUrl}/api/quote-requests`, validRequirementsData);
    console.log('✅ Test 2 PASSED: Valid requirements accepted');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Test 2 FAILED: Valid requirements should have been accepted');
    console.log('Error:', error.response ? error.response.data : error.message);
  }
  
  // Test 3: Empty requirements field (should pass - optional)
  console.log('\n📝 Test 3: Empty requirements field (optional)');
  try {
    const emptyRequirementsData = {
      name: "Test User Empty",
      email: "testempty@example.com",
      phone: "0123456789",
      productType: "blinds", 
      dimensions: "120 x 180 cm",
      requirements: "", // Empty - should be valid since optional
      website: ""
    };
    
    const response = await axios.post(`${baseUrl}/api/quote-requests`, emptyRequirementsData);
    console.log('✅ Test 3 PASSED: Empty requirements accepted (optional field)');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Test 3 FAILED: Empty requirements should have been accepted');
    console.log('Error:', error.response ? error.response.data : error.message);
  }
  
  // Test 4: No requirements field at all (should pass)
  console.log('\n📝 Test 4: No requirements field provided');
  try {
    const noRequirementsData = {
      name: "Test User No Field",
      email: "testnofield@example.com",
      phone: "0123456789",
      productType: "shades",
      dimensions: "80 x 120 cm",
      website: ""
      // No requirements field at all
    };
    
    const response = await axios.post(`${baseUrl}/api/quote-requests`, noRequirementsData);
    console.log('✅ Test 4 PASSED: Missing requirements field accepted (optional)');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Test 4 FAILED: Missing requirements field should have been accepted');
    console.log('Error:', error.response ? error.response.data : error.message);
  }
  
  console.log('\n🎯 Quote Form Validation Testing Complete!\n');
  console.log('Summary:');
  console.log('- Short requirements (< 10 chars): Should be rejected ❌');
  console.log('- Valid requirements (≥ 10 chars): Should be accepted ✅');
  console.log('- Empty requirements: Should be accepted ✅ (optional field)');
  console.log('- Missing requirements: Should be accepted ✅ (optional field)');
}

// Run the test
testQuoteFormValidation().catch(console.error);