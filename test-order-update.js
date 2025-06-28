/**
 * Test script to verify the order update functionality is working
 * This will test the order update API that was failing with "Fout – Er is een fout opgetreden bij het opslaan."
 */

import axios from 'axios';

const baseUrl = 'http://localhost:5000';

async function testOrderUpdate() {
  try {
    console.log('🧪 TESTING ORDER UPDATE FUNCTIONALITY');
    console.log('=====================================\n');

    // Step 1: Admin login
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post(`${baseUrl}/api/admin/login`, {
      email: 'admin@kaniou.be',
      password: process.env.ADMIN_PASSWORD || 'defaultAdminPassword'
    });

    if (!loginResponse.data.success) {
      throw new Error('Admin login failed');
    }

    const sessionCookie = loginResponse.headers['set-cookie']?.[0];
    console.log('✅ Admin login successful');

    // Step 2: Create a test order first
    console.log('\n2. Creating a test order...');
    const orderData = {
      customerName: 'Test Update Customer',
      customerEmail: 'testupdate@kaniou.be',
      customerPhone: '+32123456789',
      customerFirstName: 'Test',
      customerLastName: 'Update',
      customerAddress: 'Test Street 123',
      customerCity: 'Brussels',
      productType: 'Rolgordijnen',
      amount: 299.99,
      description: 'Test order for update functionality',
      bonnummer: `UPD${Date.now()}`,
      notifyByEmail: true
    };

    const createResponse = await axios.post(`${baseUrl}/api/admin/orders`, orderData, {
      headers: {
        'Cookie': sessionCookie,
        'Content-Type': 'application/json'
      }
    });

    if (!createResponse.data.success) {
      throw new Error('Order creation failed: ' + JSON.stringify(createResponse.data));
    }

    const orderId = createResponse.data.order.id;
    console.log(`✅ Test order created with ID: ${orderId}`);

    // Step 3: Test order status update (this was failing)
    console.log('\n3. Testing order status update (previously failing)...');
    const updateData = {
      status: 'Bestelling in verwerking',
      noteFromEntrepreneur: 'Test update - verifying functionality works',
      clientNote: 'Internal test note'
    };

    const updateResponse = await axios.patch(`${baseUrl}/api/admin/orders/${orderId}`, updateData, {
      headers: {
        'Cookie': sessionCookie,
        'Content-Type': 'application/json'
      }
    });

    if (updateResponse.data.success) {
      console.log('✅ Order status update SUCCESSFUL');
      console.log(`📧 Email notification should have been sent to ${orderData.customerEmail}`);
    } else {
      console.log('❌ Order status update FAILED');
      console.log('Response:', updateResponse.data);
    }

    // Step 4: Test another update to ensure it's consistently working
    console.log('\n4. Testing second update...');
    const secondUpdateData = {
      status: 'Bestelling is gereed',
      noteFromEntrepreneur: 'Second test update - order ready for delivery',
      notificationPreference: 'email'
    };

    const secondUpdateResponse = await axios.patch(`${baseUrl}/api/admin/orders/${orderId}`, secondUpdateData, {
      headers: {
        'Cookie': sessionCookie,
        'Content-Type': 'application/json'
      }
    });

    if (secondUpdateResponse.data.success) {
      console.log('✅ Second order update SUCCESSFUL');
      console.log('📧 Second email notification should have been sent');
    } else {
      console.log('❌ Second order update FAILED');
      console.log('Response:', secondUpdateResponse.data);
    }

    console.log('\n🎉 ORDER UPDATE TEST COMPLETED');
    console.log('\n📋 Summary:');
    console.log('✅ Admin authentication: SUCCESS');
    console.log('✅ Order creation: SUCCESS');
    console.log(`✅ First order update: ${updateResponse.data.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`✅ Second order update: ${secondUpdateResponse.data.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`✅ Email notifications: ${updateResponse.data.success && secondUpdateResponse.data.success ? 'SHOULD BE WORKING' : 'CHECK LOGS'}`);

    if (updateResponse.data.success && secondUpdateResponse.data.success) {
      console.log('\n🎯 CONCLUSION: Order update functionality is WORKING');
      console.log('The "Fout – Er is een fout opgetreden bij het opslaan." error should be resolved');
    } else {
      console.log('\n⚠️ CONCLUSION: Order update functionality still has issues');
      console.log('Further investigation needed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Authentication issue detected');
      console.log('This might be the root cause of the "Fout – Er is een fout opgetreden" error');
    }
  }
}

// Run the test
testOrderUpdate().catch(console.error);