/**
 * Complete test of the email notification flow
 * Tests order creation and status update emails with authentication
 */

import axios from 'axios';

// Create axios instance with cookie support
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

async function testCompleteEmailFlow() {
  try {
    console.log('🔧 Testing Complete Email Notification Flow...\n');

    // Step 1: Login to get authentication
    console.log('🔐 Step 1: Logging in as admin...');
    const loginResponse = await api.post('/api/admin/login', {
      email: 'admin@kaniou.be',
      password: process.env.ADMIN_PASSWORD || 'default-password'
    });

    if (loginResponse.data.success) {
      console.log('✅ Successfully logged in');
      
      // Step 2: Create a new order
      console.log('\n📦 Step 2: Creating new order with email notification...');
      const newOrderData = {
        customerName: 'Test Klant Email',
        customerEmail: 'info@kaniou.be',
        customerPhone: '+32 123 456 789',
        customerFirstName: 'Test',
        customerLastName: 'Klant',
        customerAddress: 'Teststraat 123',
        customerCity: 'Brussel',
        productType: 'Rolgordijnen Test',
        amount: 150.00,
        description: 'Test bestelling voor email notificatie verificatie',
        status: 'pending',
        notifyByEmail: true,
        customerNote: 'Test klantnotitie voor email',
        internalNote: 'Test interne notitie voor email',
        bonnummer: `EMAIL-TEST-${Date.now()}`
      };

      const createResponse = await api.post('/api/admin/orders', newOrderData);

      if (createResponse.data.success) {
        console.log('✅ Order created successfully');
        console.log(`📦 Order ID: ${createResponse.data.order.id}`);
        console.log(`🎯 Bonnummer: ${createResponse.data.order.bonnummer}`);
        
        // Step 3: Update order status to trigger status email
        console.log('\n📧 Step 3: Updating order status to trigger email...');
        const updateResponse = await api.patch(`/api/admin/orders/${createResponse.data.order.id}`, {
          status: 'Bestelling in verwerking',
          noteFromEntrepreneur: 'Uw bestelling wordt nu verwerkt door ons team. Email test successvol!'
        });

        if (updateResponse.data.success) {
          console.log('✅ Order status updated successfully');
          
          // Step 4: Update to another status
          console.log('\n📧 Step 4: Updating to final status...');
          const finalUpdateResponse = await api.patch(`/api/admin/orders/${createResponse.data.order.id}`, {
            status: 'Bestelling is gereed',
            noteFromEntrepreneur: 'Uw bestelling is gereed voor aflevering!'
          });

          if (finalUpdateResponse.data.success) {
            console.log('✅ Final status update completed');
            
            console.log('\n🎉 COMPLETE EMAIL FLOW TEST FINISHED');
            console.log('\n📋 Summary:');
            console.log('✅ Admin authentication: SUCCESS');
            console.log('✅ Order creation + confirmation email: TESTED');
            console.log('✅ Status update #1 + notification email: TESTED');
            console.log('✅ Status update #2 + notification email: TESTED');
            console.log('\n📧 Expected emails sent to info@kaniou.be:');
            console.log('1. Order confirmation email');
            console.log('2. Status update: "Bestelling in verwerking"');
            console.log('3. Status update: "Bestelling is gereed"');
            console.log('\n💡 Check server logs above for email sending confirmations');
            
          } else {
            console.log('❌ Failed final status update');
          }
        } else {
          console.log('❌ Failed to update order status');
        }
      } else {
        console.log('❌ Failed to create order');
        console.log('Response:', createResponse.data);
      }
    } else {
      console.log('❌ Login failed');
      console.log('Response:', loginResponse.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testCompleteEmailFlow();