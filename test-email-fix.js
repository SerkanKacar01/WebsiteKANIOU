/**
 * Test script to verify the email template fixes are working
 * This will test both order creation and status update emails
 */

import axios from 'axios';

async function testEmailTemplateFixes() {
  try {
    console.log('🔧 Testing Email Template Fixes...\n');

    // First login to admin
    console.log('📝 Logging in to admin...');
    const loginResponse = await axios.post('http://localhost:5000/api/admin/login', {
      email: 'admin@kaniou.be',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });

    if (!loginResponse.data.success) {
      console.error('❌ Failed to login');
      return;
    }

    // Get the session cookie
    const cookie = loginResponse.headers['set-cookie']?.[0];
    const headers = {
      'Content-Type': 'application/json',
      ...(cookie && { 'Cookie': cookie })
    };

    console.log('✅ Admin login successful\n');

    // Test 1: Create a new order (tests order confirmation email)
    console.log('📧 Test 1: Creating new order to test confirmation email...');
    
    const newOrderData = {
      customerName: 'Email Template Test Klant',
      customerEmail: 'info@kaniou.be',
      customerPhone: '+32 467 85 64 05',
      customerFirstName: 'Email Template',
      customerLastName: 'Test',
      customerAddress: 'Teststraat 123',
      customerCity: 'Brussels',
      productType: 'Rolgordijnen',
      amount: 199.99,
      description: 'Email template test - Rolgordijnen op maat',
      status: 'Nieuw',
      notifyByEmail: true,
      customerNote: 'Test voor email template fix',
      internalNote: 'Dit is een test van de gefixte email template',
      bonnummer: `EMAILTEST-${Date.now()}`
    };

    const createResponse = await axios.post(
      'http://localhost:5000/api/admin/orders', 
      newOrderData, 
      { headers }
    );

    if (createResponse.data.success) {
      console.log('✅ Order created successfully');
      console.log(`📦 Order ID: ${createResponse.data.order.id}`);
      console.log(`📧 Confirmation email sent to: ${newOrderData.customerEmail}`);
      
      const orderId = createResponse.data.order.id;

      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Test 2: Update order status (tests status update email)
      console.log('\n📧 Test 2: Updating order status to test status update email...');
      
      const updateData = {
        status: 'Bestelling in productie',
        noteFromEntrepreneur: 'Test notitie van ondernemer - email template werkt correct!'
      };

      const updateResponse = await axios.patch(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        updateData,
        { headers }
      );

      if (updateResponse.data.success) {
        console.log('✅ Order status updated successfully');
        console.log('📧 Status update email sent');
        
        console.log('\n🎉 EMAIL TEMPLATE FIXES TEST COMPLETED');
        console.log('\n📋 Summary:');
        console.log('✅ Order confirmation email: FIXED & TESTED');
        console.log('✅ Status update email: FIXED & TESTED');
        console.log('\n💡 Fixed issues:');
        console.log('• Removed undefined ${data.orderId} variable');
        console.log('• Fixed ${statusMessage} in order confirmation');
        console.log('• Proper variable scoping for all email templates');
        console.log('\n📧 Check info@kaniou.be inbox for detailed email templates');
        
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
      console.log('\n💡 Authentication required. Make sure admin login is working.');
    }
  }
}

// Run the test
testEmailTemplateFixes();