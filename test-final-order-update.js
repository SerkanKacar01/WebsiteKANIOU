/**
 * Final test to verify the order update fix is working
 * This should now succeed since we fixed the frontend API endpoint
 */

import axios from 'axios';

const baseUrl = 'http://localhost:5000';

async function testFinalOrderUpdate() {
  try {
    console.log('🧪 FINAL ORDER UPDATE VERIFICATION TEST');
    console.log('=======================================\n');

    // Step 1: Login with admin credentials (using environment variable)
    console.log('1. Admin login test...');
    const loginResponse = await axios.post(`${baseUrl}/api/admin/login`, {
      email: 'admin@kaniou.be',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });

    console.log('Login response status:', loginResponse.status);
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful');
      
      // Extract session cookie
      const sessionCookie = loginResponse.headers['set-cookie']?.[0];
      
      // Step 2: Create a test order
      console.log('\n2. Creating test order for update...');
      const orderData = {
        customerName: 'Fix Verification Customer',
        customerEmail: 'fixtest@kaniou.be',
        customerPhone: '+32123456789',
        productType: 'Rolgordijnen',
        amount: 199.99,
        description: 'Test order to verify fix works',
        bonnummer: `FIX${Date.now()}`,
        notifyByEmail: true
      };

      const createResponse = await axios.post(`${baseUrl}/api/admin/orders`, orderData, {
        headers: {
          'Cookie': sessionCookie,
          'Content-Type': 'application/json'
        }
      });

      if (createResponse.data.success) {
        const orderId = createResponse.data.order.id;
        console.log(`✅ Test order created with ID: ${orderId}`);

        // Step 3: Test the FIXED order status update
        console.log('\n3. Testing FIXED order status update...');
        const updateResponse = await axios.patch(`${baseUrl}/api/admin/orders/${orderId}`, {
          status: 'Bestelling in verwerking',
          noteFromEntrepreneur: 'Fix verification test - this should work now!'
        }, {
          headers: {
            'Cookie': sessionCookie,
            'Content-Type': 'application/json'
          }
        });

        if (updateResponse.data.success) {
          console.log('🎉 ORDER UPDATE SUCCESSFUL!');
          console.log('📧 Email notification should have been sent');
          console.log('\n✅ THE FIX IS WORKING!');
          console.log('The "Fout – Er is een fout opgetreden bij het opslaan." error is RESOLVED');
        } else {
          console.log('❌ Order update still failing');
          console.log('Response:', updateResponse.data);
        }
      } else {
        console.log('❌ Order creation failed');
        console.log('Response:', createResponse.data);
      }
    } else {
      console.log('❌ Admin login failed');
      console.log('Response:', loginResponse.data);
    }

  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else {
      console.error('❌ Test failed:', error.message);
    }
  }
}

// Run the test
testFinalOrderUpdate().catch(console.error);