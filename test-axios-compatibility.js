#!/usr/bin/env node
import axios from 'axios';

async function testAxiosCompatibility() {
  console.log('🧪 Testing axios compatibility after update...\n');
  
  // Test 1: Check if axios is properly imported and functions exist
  console.log('1️⃣ Testing axios import and basic functionality...');
  try {
    console.log('✅ Axios imported successfully');
    console.log(`📦 Axios version: ${axios.VERSION || 'version not available'}`);
    
    // Test basic axios functionality with a simple request to our local server
    const testResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Basic axios HTTP request works');
    console.log(`🌐 Server response status: ${testResponse.status}`);
  } catch (error) {
    console.log('❌ Axios import or basic functionality failed:', error.message);
    return false;
  }

  // Test 2: Test POST request functionality (like what email service uses)
  console.log('\n2️⃣ Testing axios POST functionality...');
  try {
    // Test a POST request with URLSearchParams (like Mailgun uses)
    const testData = new URLSearchParams({
      test: 'data',
      message: 'axios compatibility test'
    });
    
    // This will likely fail with 404, but that's OK - we just want to test axios works
    try {
      const postResponse = await axios.post('http://localhost:5000/api/test-endpoint', testData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (requestError) {
      if (requestError.response) {
        console.log('✅ Axios POST functionality works (got expected HTTP error response)');
        console.log(`🔄 Response status: ${requestError.response.status}`);
      } else {
        throw requestError;
      }
    }
  } catch (error) {
    console.log('❌ Axios POST functionality failed:', error.message);
    return false;
  }

  // Test 3: Check environment variables for email service
  console.log('\n3️⃣ Checking email service environment...');
  const hasApiKey = !!process.env.MAILGUN_API_KEY;
  const hasDomain = !!process.env.MAILGUN_DOMAIN;
  
  console.log(`📧 MAILGUN_API_KEY: ${hasApiKey ? 'Present' : 'Missing'}`);
  console.log(`🌐 MAILGUN_DOMAIN: ${hasDomain ? 'Present' : 'Missing'}`);
  
  if (!hasApiKey) {
    console.log('ℹ️ Email service would fail due to missing API key (expected in dev environment)');
  }

  console.log('\n✅ Axios compatibility test completed successfully!');
  return true;
}

// Run the test
testAxiosCompatibility()
  .then((success) => {
    if (success) {
      console.log('\n🎉 All axios compatibility tests passed!');
      process.exit(0);
    } else {
      console.log('\n❌ Some axios compatibility tests failed!');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('\n💥 Test runner failed:', error.message);
    process.exit(1);
  });