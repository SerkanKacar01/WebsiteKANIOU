/**
 * Simple test to identify the exact order update issue
 */

import axios from 'axios';

const baseUrl = 'http://localhost:5000';

async function testSimpleOrderUpdate() {
  try {
    console.log('🧪 SIMPLE ORDER UPDATE TEST');
    console.log('============================\n');

    // First, try to create an order without authentication (should fail)
    console.log('1. Testing order creation without auth (should fail)...');
    try {
      const testOrder = await axios.post(`${baseUrl}/api/admin/orders`, {
        customerName: 'Test',
        customerEmail: 'test@example.com',
        amount: 100,
        description: 'test',
        bonnummer: 'TEST123'
      });
      console.log('❌ Unexpected: Order created without auth');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly rejected - authentication required');
      } else {
        console.log('❌ Different error:', error.response?.data || error.message);
      }
    }

    // Test if we can reach the order endpoints at all
    console.log('\n2. Testing order endpoint accessibility...');
    try {
      const testUpdate = await axios.patch(`${baseUrl}/api/admin/orders/999`, {
        status: 'test'
      });
      console.log('❌ Unexpected: Order update without auth');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Order update correctly requires authentication');
      } else {
        console.log('❌ Different error:', error.response?.data || error.message);
      }
    }

    // Test the health endpoint to confirm server is working
    console.log('\n3. Testing health endpoint...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log(`✅ Health check: ${healthResponse.data.status}`);

    console.log('\n📋 DIAGNOSIS:');
    console.log('The order update issue is likely due to:');
    console.log('1. Authentication failure (session expired)');
    console.log('2. Missing or invalid session cookies');
    console.log('3. Request format issues');
    console.log('\n💡 SOLUTION: The frontend needs to properly handle authentication');
    console.log('when making order update requests. The error "Fout – Er is een');
    console.log('fout opgetreden bij het opslaan." is likely caused by a 401/403');
    console.log('authentication failure being displayed as a generic error.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSimpleOrderUpdate().catch(console.error);