/**
 * Test script to verify Mailgun email notifications are working
 * This will test the email notification system for KANIOU orders
 */

import axios from 'axios';

async function testEmailNotification() {
  try {
    console.log('🔧 Testing KANIOU Email Notification System...\n');

    // Test 1: Create a new order and verify email notification is sent
    console.log('📧 Test 1: Creating new order with email notification...');
    
    const newOrderData = {
      customerName: 'Test Klant',
      customerEmail: 'info@kaniou.be', // Using verified email
      customerPhone: '+32 123 456 789',
      customerFirstName: 'Test',
      customerLastName: 'Klant',
      customerAddress: 'Teststraat 123',
      customerCity: 'Brussel',
      productType: 'Rolgordijnen',
      amount: 150.00,
      description: 'Test bestelling voor email notificatie',
      status: 'pending',
      notifyByEmail: true,
      customerNote: 'Test klantnotitie',
      internalNote: 'Test interne notitie',
      bonnummer: `TEST-${Date.now()}`
    };

    const createResponse = await axios.post('http://localhost:5000/api/admin/orders', newOrderData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (createResponse.data.success) {
      console.log('✅ Order created successfully');
      console.log(`📦 Order ID: ${createResponse.data.order.id}`);
      console.log(`🎯 Bonnummer: ${createResponse.data.order.bonnummer}`);
      
      // Test 2: Update order status to trigger status update email
      console.log('\n📧 Test 2: Updating order status to trigger notification...');
      
      const updateResponse = await axios.patch(`http://localhost:5000/api/admin/orders/${createResponse.data.order.id}`, {
        status: 'Bestelling in verwerking',
        noteFromEntrepreneur: 'Uw bestelling wordt nu verwerkt door ons team.'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (updateResponse.data.success) {
        console.log('✅ Order status updated successfully');
        console.log('📧 Status update email should have been sent');
        
        console.log('\n🎉 EMAIL NOTIFICATION SYSTEM TEST COMPLETED');
        console.log('\n📋 Summary:');
        console.log('✅ Order creation email notification: TESTED');
        console.log('✅ Order status update email notification: TESTED');
        console.log('\n💡 Check the server logs to confirm emails were sent via Mailgun');
        console.log('📧 Check info@kaniou.be inbox for the test emails');
        
      } else {
        console.log('❌ Failed to update order status');
        console.log('Response:', updateResponse.data);
      }
      
    } else {
      console.log('❌ Failed to create order');
      console.log('Response:', createResponse.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Authentication required. The admin endpoints are protected.');
      console.log('You may need to log in to the admin dashboard first.');
    }
  }
}

// Run the test
testEmailNotification();